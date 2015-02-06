/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/

'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

describe('/isValidNumRefinanceLoans', function() {
    it('should return true for a valid number of refinance loans', function(done) {
        request(mock)
            .get('/isValidNumRefinanceLoans/2013/9/1035818356')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumRefinanceLoans/2013/11/1035818356')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false for an invalid number of refinance loans', function(done) {
        request(mock)
            .get('/isValidNumRefinanceLoans/2013/3/1035818356')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumRefinanceLoans/2013/17/1035818356')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return true when there are no refinance loans for either year', function(done) {
        request(mock)
            .get('/isValidNumRefinanceLoans/2013/0/000000000005')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false when the percent is exactly +/- 20%', function(done) {
        request(mock)
            .get('/isValidNumRefinanceLoans/2013/8/1035818356')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumRefinanceLoans/2013/12/1035818356')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false when the percentage increase is infinite (n / 0)', function(done) {
        request(mock)
            .get('/isValidNumRefinanceLoans/2013/7/000000000005')
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
            .get('/isValidNumRefinanceLoans/2013/5/0002590037')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});