/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/

'use strict';

describe('/isCraReporter', function() {

    it('should return true if a reporter is valid', function(done) {
        request(mock)
            .get('/isCraReporter/2013/0000000001')
            .expect(200)
            .expect('Content-Type', /json/)

                .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

});
