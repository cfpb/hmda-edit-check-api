/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

describe('/localdb/census/msaCodes', function() {
    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/localdb/census/msaCodes/2013')
            .expect(500)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});

describe('/localdb/census/stateCounty', function() {
    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/localdb/census/stateCounty/2013')
            .expect(500)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});

describe('/localdb/census/stateCountyMSA', function() {
    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/localdb/census/stateCountyMSA/2013')
            .expect(500)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});

describe('/localdb/census/stateCountyTract', function() {
    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/localdb/census/stateCountyTract/2013')
            .expect(500)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});

describe('/localdb/census/stateCountyTractMSA', function() {
    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/localdb/census/stateCountyTractMSA/2013')
            .expect(500)
            .end(function (err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});