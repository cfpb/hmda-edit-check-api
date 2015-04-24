/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

describe('/isValidTimestamp', function() {
    it('should return true for a valid timestamp more than one day after January 1, 2014', function(done) {
        request(mock)
            .get('/isValidTimestamp/2014/1/0000000001/201401100000')
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
            .get('/isValidTimestamp/2014/1/0000000001/201401100000')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function(err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});
