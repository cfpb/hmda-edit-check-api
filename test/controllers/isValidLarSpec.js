/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

describe('/isValidLar/all', function() {
    var lar = '284-15426429304320874623954000000000020130117111100256212013012019740080590098.40255    8    2500508   NA   21                                                                                                                                                                                                                                                                              ';

    it('should return a result if the request is valid', function(done) {
        request(mock)
            .post('/isValidLar/2013')
            .set('Content-Type', 'text/plain')
            .send(lar)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                done(err);
            });
    });

    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .post('/isValidLar/2013')
            .set('Content-Type', 'text/plain')
            .send(lar)
            .expect(500)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});

describe('/isValidLar/type', function() {
    var lar = '284-15426429304320874623954000000000020130117111100256212013012019740080590098.40255    8    2500508   NA   21                                                                                                                                                                                                                                                                              ';

    it('should return a result if the request is valid', function(done) {
        request(mock)
            .post('/isValidLar/2013/validity')
            .set('Content-Type', 'text/plain')
            .send(lar)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                done(err);
            });
    });

    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .post('/isValidLar/2013/validity')
            .set('Content-Type', 'text/plain')
            .send(lar)
            .expect(500)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});
