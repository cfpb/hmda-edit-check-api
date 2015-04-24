/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false, async:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

describe('/isValidNumLoans/ginnieMaeVA', function() {
    it('should return true for a small number of current Ginnie Loans with percentage within -10% of last year', function(done) {
        request(mock)
            .get('/isValidNumLoans/ginnieMaeVA/2013/9/0000413209/100/16')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function(err, res) {
                done(err);
            });
    });

    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/isValidNumLoans/ginnieMaeVA/2013/9/0000413209/1000/750')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function(err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});
