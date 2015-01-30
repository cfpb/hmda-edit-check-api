/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/

'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

describe('/isValidTimestamp', function() {
    it('should return true for a valid timestamp more than one day after January 1, 2014', function(done) {
        request(mock)
            .get('/isValidTimestamp/2014/0000000001/201401100000')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":true/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false for an timestamp less than one day after January 1, 2014', function(done) {
        request(mock)
            .get('/isValidTimestamp/2014/0000000001/201401011800')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

    it('should return false for an timestamp before January 1, 2014', function(done) {
        request(mock)
            .get('/isValidTimestamp/2014/0000000001/201311011800')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function (err, res) {
                done(err);
            });
    });

});