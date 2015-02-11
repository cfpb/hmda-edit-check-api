/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false, async:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

describe('/isValidNum/ginnieMaeFHA', function() {
    it('should return true for a small number of current Ginnie Loans with percentage within -10% of last year', function(done) {
        request(mock)
            .get('/isValidNumLoans/ginnieMaeFHA/2013/0050413703/4/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return true for a large number of current Ginnie Loans with high percentage(>30) within -10% of last year', function(done) {
        request(mock)
            .get('/isValidNumLoans/ginnieMaeFHA/2013/0050413703/2500/834')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false for a large number of current Ginnie Loans within -10% of last year but with current percentage < 30%', function(done) {
        request(mock)
            .get('/isValidNumLoans/ginnieMaeFHA/2013/0050413703/2500/416')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false for current Ginnie Loans with percentage not within -10%', function(done) {
        request(mock)
            .get('/isValidNumLoans/ginnieMaeFHA/2013/0050413703/100/3')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return 404 for an invalid number of current year loans', function(done) {
        async.series([
            function(cb) {
                request(mock)
                    .get('/isValidNumLoans/ginnieMaeFHA/2013/0050413703/3')
                    .expect(404)

                    .end(function (err, res) {
                        cb();
                    });
            },
            function(cb) {
                request(mock)
                    .get('/isValidNumLoans/ginnieMaeFHA/2013')
                    .expect(404)

                    .end(function (err, res) {
                        cb();
                    });
            }
        ], function(err, results) {
            done();
        });
    });

    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/isValidNumLoans/ginnieMaeFHA/2013/0050413703/1000/750')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});