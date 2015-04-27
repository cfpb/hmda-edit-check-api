/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

describe('/isValidCensusInMSA', function() {
    it('should return false for a regular county with a tract that doesnt exist', function(done) {
        request(mock)
            .get('/isValidCensusInMSA/2013/35100/37/049/0000.00')
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
            .get('/isValidCensusInMSA/2013/35100/37/103/NA')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function(err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});
