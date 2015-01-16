/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var mockgoose = require('mockgoose');
var mongoose = require('mongoose');

var CraReportersService = require('../../services/CraReportersService');

describe('CraReportersService', function() {
    describe('isCraReporter', function() {
        it('should return a result of true if the respondent ID is present for the activity year', function(done) {
            CraReportersService.isCraReporter('2013', '0000000001', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return a result of false if the respondent ID is not present for the activity year', function(done) {
            CraReportersService.isCraReporter('2013', '0000000002', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return err when there is a mongo error', function(done) {
            mockgoose.setMockReadyState(mongoose.connection, 0);

            CraReportersService.isCraReporter('2013', '0000000001', function(err, result) {
                expect(err).to.have.property('name');
                expect(err.name).to.be('MongoError');
                expect(result).to.be.null();
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done();
            });
        });
    });
});
