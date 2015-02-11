/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false, async:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

describe('/isValidNumLoans/fannieMae', function() {
    it('should return true for a small number of current Fannie Loans with percentage within -10% of last year', function(done) {
        request(mock)
            .get('/isValidNumLoans/fannieMae/2013/0000413208/6/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return true for a large number of current Fannie Loans with high percentage(>20) within -10% of last year', function(done) {
        request(mock)
            .get('/isValidNumLoans/fannieMae/2013/0000413208/10000/2100')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false for a large number of current Fannie Loans within -10% of last year but with current percentage < 20%', function(done) {
        request(mock)
            .get('/isValidNumLoans/fannieMae/2013/0000413208/10000/167')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false for current Fannie Loans with percentage not within -10%', function(done) {
        request(mock)
            .get('/isValidNumLoans/fannieMae/2013/0000413208/100/3')
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
                    .get('/isValidNumLoans/fannieMae/2013/0000413208/3')
                    .expect(404)

                    .end(function (err, res) {
                        cb();
                    });
            },
            function(cb) {
                request(mock)
                    .get('/isValidNumLoans/fannieMae/2013')
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
            .get('/isValidNumLoans/fannieMae/2013/0000413208/1000/750')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});