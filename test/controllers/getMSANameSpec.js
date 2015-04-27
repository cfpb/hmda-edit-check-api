/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

describe('/getMSAName', function() {
    it('should return a msaName if the request is valid', function(done) {
        request(mock)
            .get('/getMSAName/2013/35100')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"msaName":/)
            .end(function(err, res) {
                done(err);
            });
    });

    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/getMSAName/2013/35100')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function(err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});
