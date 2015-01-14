/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/

'use strict';

describe('/isValidCensusInMSA', function() {

    it('should return false if smallcounty=1 and doesnt have tract==NA', function(done) {
        request(mock)
            .get('/isValidCensusInMSA/2013/35100/37/103/9502.02')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)
            .expect(/"reason":"tract should equal \'NA\'"/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false if county doesnt exist', function(done) {
        request(mock)
            .get('/isValidCensusInMSA/2013/35100/37/102/9502.02')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)
            .expect(/"reason":"county was not found"/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false if state,county,tract combo doesnt exist in MSA, small county = 0', function(done) {
        request(mock)
            .get('/isValidCensusInMSA/2013/35100/01/039/9502.02')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)
            .expect(/"reason":"state,county,tract combination not found in msa"/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false if state,county combo doesnt exist in MSA, small county = 1', function(done) {
        request(mock)
            .get('/isValidCensusInMSA/2013/35100/01/035/9502.02')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)
            .expect(/"reason":"tract should equal \'NA\'"/)

            .end(function (err, res) {
                done(err);
            });
    });


    it('should return true if state,county combo exist in MSA, tract=NA, small county = 1', function(done) {
        request(mock)
            .get('/isValidCensusInMSA/2013/35100/37/103/NA')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    /*it('should return true if state,county,tract combo exist in MSA, small county = 0', function(done) {
        request(mock)
            .get('/isValidCensusInMSA/2013/35100/37/049/9611.00')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });*/

});
