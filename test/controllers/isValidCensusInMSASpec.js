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

    it('should return false for a regular county with a tract that doesnt exist', function(done) {
        request(mock)
            .get('/isValidCensusInMSA/2013/35100/37/049/9552.02')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)
            .expect(/"reason":"state,county,tract combination not found"/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false if state,county combo doesnt exist for a small county', function(done) {
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

    it('should return false if msa doesnt exist', function(done) {
	        request(mock)
	            .get('/isValidCensusInMSA/2013/35200/437/103/9502.02')
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
            .get('/isValidCensusInMSA/2013/35100/37/103/NA')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

});
