/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var mockgoose = require('mockgoose'),
    mongoose = require('mongoose'),

    CensusService = require('../../services/CensusService'),

    rewire = require('rewire'),
    rewiredCensusService = rewire('../../services/CensusService');

describe('CensusService', function() {
    describe('isValidMSA', function() {
        it('should return a result of true if the msa exists', function(done) {
            CensusService.isValidMSA('2013', '35100', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return a result of false if the msa doesnt exist', function(done) {
            CensusService.isValidMSA('2013', '35200', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return a result of false if the msa exists in a different activity year', function(done) {
            CensusService.isValidMSA('2012', '35100', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isValidCensusTractCombo', function() {
        it('should return true if metroArea is \'NA\' and tract is \'NA\'', function(done) {
            CensusService.isValidCensusTractCombo('2013', '37', '050', 'NA', 'NA', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return true if the tract is \'NA\' and the county has the small_county flag', function(done) {
            CensusService.isValidCensusTractCombo('2013', '37', '050', '35100', 'NA', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false if the tract is \'NA\' and the county does not have the small_county flag', function(done) {
            CensusService.isValidCensusTractCombo('2013', '37', '049', '35100', 'NA', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return true if the tract exists and the metroArea is \'NA\'', function(done) {
            CensusService.isValidCensusTractCombo('2013', '37', '050', 'NA', '96.1100', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false if the tract does not exist and the metroArea is \'NA\'', function(done) {
            CensusService.isValidCensusTractCombo('2013', '37', '050', 'NA', '0000.00', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return true if the tract exists and the metroArea is not \'NA\'', function(done) {
            CensusService.isValidCensusTractCombo('2013', '37', '050', '35100', '96.1100', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false if the tract does not exist and the metroArea is not \'NA\'', function(done) {
            CensusService.isValidCensusTractCombo('2013', '37', '050', '35100', '0000.00', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });
});
