/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/

'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

describe('/isValidCensusCombination', function() {

    it('should return false if smallcounty=1 and doesnt have tract==NA', function(done) {
        request(mock)
            .get('/isValidCensusCombination/2013/37/103/9502.02')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)
            .expect(/"reason":"tract should equal \'NA\'"/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false for a regular county with a tract that doesnt exist', function(done) {
        request(mock)
            .get('/isValidCensusCombination/2013/37/049/9552.02')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)
            .expect(/"reason":"state, county, tract combination not found"/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false if state,county combo doesnt exist for a small county', function(done) {
        request(mock)
            .get('/isValidCensusCombination/2013/37/103/9502.02')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)
            .expect(/"reason":"tract should equal \'NA\'"/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false if state doesnt exist', function(done) {
        request(mock)
            .get('/isValidCensusCombination/2013/437/103/9502.02')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)
            .expect(/"reason":"state or msa doesnt exist"/)

            .end(function (err, res) {
                done(err);
            });
    });


    it('should return true if state,county combo exists, tract=NA, small county = 1', function(done) {
        request(mock)
            .get('/isValidCensusCombination/2013/37/103/NA')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/isValidCensusCombination/2013/37/103/NA')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });

});
