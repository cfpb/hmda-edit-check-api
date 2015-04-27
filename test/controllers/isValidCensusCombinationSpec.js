/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

describe('/isValidCensusCombination', function() {
    it('should return true if smallcounty=1 and tract==NA', function(done) {
        request(mock)
            .get('/isValidCensusCombination/2013/37/050/NA')
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
            .get('/isValidCensusCombination/2013/37/50/NA')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function(err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});
