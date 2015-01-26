/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var mockgoose = require('mockgoose');
var mongoose = require('mongoose');

var CensusService = require('../../services/CensusService');

var rewire = require('rewire');
var rewiredCensusService = rewire('../../services/CensusService');

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
            CensusService.isValidCensusTractCombo('2013', '37', '103', 'NA', 'NA', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return true if the tract is \'NA\' and the county has the small_county flag', function(done) {
            CensusService.isValidCensusTractCombo('2013', '37', '103', '35100', 'NA', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false if the tract is \'NA\' and the county does not have the small_county flag', function(done) {
            CensusService.isValidCensusTractCombo('2013', '37', '109', '35100', 'NA', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return true if the tract exists and the metroArea is \'NA\'', function(done) {
            CensusService.isValidCensusTractCombo('2013', '01', '035', 'NA', '9603.00', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false if the tract does not exist and the metroArea is \'NA\'', function(done) {
            CensusService.isValidCensusTractCombo('2013', '01', '035', 'NA', '0000.00', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return true if the tract exists and the metroArea is not \'NA\'', function(done) {
            CensusService.isValidCensusTractCombo('2013', '37', '103', '35100', '9502.01', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false if the tract does not exist and the metroArea is not \'NA\'', function(done) {
            CensusService.isValidCensusTractCombo('2013', '37', '103', '35100', '0000.00', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isSmallCounty', function() {
        var isSmallCounty = rewiredCensusService.__get__('isSmallCounty');

        it('should return true if the given county has the small_county flag', function(done) {
            isSmallCounty('2013', '01035', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false if the given county does not have the small_county flag', function(done) {
            isSmallCounty('2013', '01039', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isValidCensusTractForCounty', function() {
        var isValidCensusTractForCounty = rewiredCensusService.__get__('isValidCensusTractForCounty');

        it('should return true if the tract exists for the state+county', function(done) {
            isValidCensusTractForCounty('2013', '01035', '9603.00', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false if the tract does not exist for the state+county', function(done) {
            isValidCensusTractForCounty('2013', '01035', '0000.00', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });
});
