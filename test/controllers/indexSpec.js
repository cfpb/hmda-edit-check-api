/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/
'use strict';

describe('/', function() {
    it('should say "hello"', function(done) {
        request(mock)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/"name": "index"/)

            .end(function(err, res) {
                done(err);
            });
    });
});
