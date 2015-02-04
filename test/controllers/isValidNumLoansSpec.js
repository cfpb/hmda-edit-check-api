/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/

'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

describe('/isValidNumLoans', function() {
    it('should return true for a valid total number of loans', function(done) {
        request(mock)
            .get('/isValidNumLoans/2013/879/0201590731')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumLoans/2013/1091/0201590731')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false for an invalid total number of loans', function(done) {
        request(mock)
            .get('/isValidNumLoans/2013/134/0201590731')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumLoans/2013/1341/0201590731')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return true when neither year has more than 500 loans', function(done) {
        request(mock)
            .get('/isValidNumLoans/2013/273/1201547730')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return true for a valid percent when only one year has > 500 loans', function(done) {
        request(mock)
            .get('/isValidNumLoans/2013/510/1201547730')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            }); 
    });

    it('should return false when the percentage is exactly +/- 20%', function(done) {
        request(mock)
            .get('/isValidNumLoans/2013/800/0201590731')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumLoans/2013/1200/0201590731')
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
            .get('/isValidNumLoans/2013/1091/0201590731')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});