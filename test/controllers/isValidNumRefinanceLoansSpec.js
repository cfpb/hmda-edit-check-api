/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/

'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

describe('/isValidNumRefinanceLoans', function() {
    it('should return true for a valid number of refinance loans', function(done) {
        request(mock)
            .get('/isValidNumRefinanceLoans/2013/1035818356/9')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumRefinanceLoans/2013/1035818356/11')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false for an invalid number of refinance loans', function(done) {
        request(mock)
            .get('/isValidNumRefinanceLoans/2013/1035818356/3')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumRefinanceLoans/2013/1035818356/17')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return true when there are no refinance loans for either year', function(done) {
        request(mock)
            .get('/isValidNumRefinanceLoans/2013/000000000005/0')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false when the percent is exactly +/- 20%', function(done) {
        request(mock)
            .get('/isValidNumRefinanceLoans/2013/1035818356/8')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumRefinanceLoans/2013/1035818356/12')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false when the percentage increase is infinite (n / 0)', function(done) {
        request(mock)
            .get('/isValidNumRefinanceLoans/2013/000000000005/7')
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
            .get('/isValidNumRefinanceLoans/2013/0002590037/5')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});