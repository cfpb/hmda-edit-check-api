/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

describe('/isMetroAreaOnRespondentPanel', function() {
    it('should return a result if the request is valid', function(done) {
        request(mock)
            .get('/isMetroAreaOnRespondentPanel/2013/1/0000000001/00001')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":/)
            .end(function(err, res) {
                done(err);
            });
    });

    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/isMetroAreaOnRespondentPanel/2013/1/0000000001/00001')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function(err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});
