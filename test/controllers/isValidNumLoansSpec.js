/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/

'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

describe('/isValidNumLoans', function() {
    it('should return true for a valid total number of loans', function(done) {
        request(mock)
            .get('/isValidNumLoans/2013/0201590731/879')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumLoans/2013/0201590731/1091')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false for an invalid total number of loans', function(done) {
        request(mock)
            .get('/isValidNumLoans/2013/0201590731/134')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumLoans/2013/0201590731/1341')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return true when neither year has more than 500 loans', function(done) {
        request(mock)
            .get('/isValidNumLoans/2013/1201547730/273')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return true for a valid percent when only one year has > 500 loans', function(done) {
        request(mock)
            .get('/isValidNumLoans/2013/1201547730/510')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            }); 
    });

    it('should return false when the percentage is exactly +/- 20%', function(done) {
        request(mock)
            .get('/isValidNumLoans/2013/0201590731/800')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {});

        request(mock)
            .get('/isValidNumLoans/2013/0201590731/1200')
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
            .get('/isValidNumLoans/2013/0201590731/1091')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});