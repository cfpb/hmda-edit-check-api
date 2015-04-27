/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false, async:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

describe('/isValidNumLoans/total', function() {
    it('should return false for an invalid total number of loans', function(done) {
        request(mock)
            .get('/isValidNumLoans/total/2013/9/0201590731/751')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function(err, res) {
                done(err);
            });
    });

    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/isValidNumLoans/total/2013/9/0201590731/1091')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function(err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});
