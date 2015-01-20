/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/

'use strict';

describe('/isRespondentMBS', function() {

    it('should return a result if the request is valid', function(done) {
        request(mock)
            .get('/isRespondentMBS/2013/0000000001')
            .expect(200)
            .expect('Content-Type', /json/)

                .expect(/"result":/)

            .end(function (err, res) {
                done(err);
            });
    });

});
