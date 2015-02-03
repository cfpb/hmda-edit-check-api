/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/

'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

describe('/isValidNumHomePurchaseLoans', function() {
    it('should return true for a valid number of home purchase loans', function(done) {
        request(mock)
            .get('/isValidNumHomePurchaseLoans/2013/5/0002590037')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumHomePurchaseLoans/2013/7/0002590037')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false for an invalid number of home purchase loans', function(done) {
        request(mock)
            .get('/isValidNumHomePurchaseLoans/2013/3/0002590037')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumHomePurchaseLoans/2013/9/0002590037')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return true when there are no home purchase loans for either year', function(done) {
        request(mock)
            .get('/isValidNumHomePurchaseLoans/2013/0/0002590058')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false when the percentage increase is infinite (n / 0)', function(done) {
        request(mock)
            .get('/isValidNumHomePurchaseLoans/2013/7/0002590058')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/isValidNumHomePurchaseLoans/2013/5/0002590037')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});