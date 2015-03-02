/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var TransmittalService = require('../../services/TransmittalService');

describe('TransmittalService', function() {
    describe('isValidTimestamp', function() {
        it('should return true for a valid timestamp more than one day after January 1, 2014', function(done) {
            TransmittalService.isValidTimestamp('2014', '1', '0000000001', '201401100000', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false for an timestamp less than one day after January 1, 2014', function(done) {
            TransmittalService.isValidTimestamp('2014', '1', '0000000001', '201401011800', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false for an timestamp before January 1, 2014', function(done) {
            TransmittalService.isValidTimestamp('2014', '1', '0000000001', '201311011800', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false when this respondent does not have a previous filing', function(done) {
            TransmittalService.isValidTimestamp('2014', '1', '0000005001', '201401100000', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false for a year that doesnt exist', function(done) {
            TransmittalService.isValidTimestamp('2010', '1', '0000000001', '201311011800', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isTaxIDTheSameAsLastYear', function() {
        it('should return true when taxID is the same as last year', function(done) {
            TransmittalService.isTaxIDTheSameAsLastYear('2014', '1', '0000000001', '23-0916895', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when taxID is not the same as last year', function(done) {
            TransmittalService.isTaxIDTheSameAsLastYear('2014', '1', '0000000001', '22-0916895', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false when this respondent does not have a previous filing', function(done) {
            TransmittalService.isTaxIDTheSameAsLastYear('2014', '1', '0000005001', '22-0916895', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false for a year that doesnt exist', function(done) {
            TransmittalService.isTaxIDTheSameAsLastYear('2010', '1', '0000000001', '22-0916895', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });
});
