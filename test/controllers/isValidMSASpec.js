/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/

'use strict';

describe('/isValidMSA', function() {

    it('should return true if a msa is valid', function(done) {
        request(mock)
            .get('/isValidMSA/2013/35100')
            .expect(200)
            .expect('Content-Type', /json/)

                .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false if a msa is invalid', function(done) {
        request(mock)
            .get('/isValidMSA/2013/35200')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

});
