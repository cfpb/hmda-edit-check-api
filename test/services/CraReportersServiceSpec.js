/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var mockgoose = require('mockgoose'),
    mongoose = require('mongoose'),

    CraReportersService = require('../../services/CraReportersService');

describe('CraReportersService', function() {
    describe('isCraReporter', function() {
        it('should return a result of true if the respondent ID is present for the activity year', function(done) {
            CraReportersService.isCraReporter('2013', '1', '0000000001', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return a result of false if the respondent ID is not present for the activity year', function(done) {
            CraReportersService.isCraReporter('2013', '1', '0000000002', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });
});
