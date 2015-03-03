/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var PanelService = require('../../services/PanelService');

describe('PanelService', function() {
    describe('isChildFI', function() {
        it('should return a result of true if the respondent has an other lender code of 0 and a non-blank parent name', function(done) {
            PanelService.isChildFI('2013', '1', '0000000001', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return a result of false if the respondent has an other lender code of 0 but a blank parent name', function(done) {
            PanelService.isChildFI('2013', '1', '0000000002', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return a result of false if the respondent has an other lender code of 5 and a non-blank parent name', function(done) {
            PanelService.isChildFI('2013', '2', '0000000005', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return a result of false if the respondent has an other lender code of 5 and a blank parent name', function(done) {
            PanelService.isChildFI('2013', '2', '0000000006', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return a result of false if the respondent is not on the panel', function(done) {
            PanelService.isChildFI('2013', '3', '0000000005', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isRespondentMBS', function() {
        it('should return a result of true if the respondent has an other lender code of 1 and a non-blank parent name', function(done) {
            PanelService.isRespondentMBS('2013', '2', '0000000003', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return a result of false if the respondent has an other lender code of 0 but a blank parent name', function(done) {
            PanelService.isRespondentMBS('2013', '1', '0000000002', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return a result of false if the respondent has an other lender code of 0 and a non-blank parent name', function(done) {
            PanelService.isRespondentMBS('2013', '1', '0000000001', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return a result of false if the respondent has an other lender code of 1 and a blank parent name', function(done) {
            PanelService.isRespondentMBS('2013', '2', '0000000004', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return a result of false if the respondent is not on the panel', function(done) {
            PanelService.isRespondentMBS('2013', '3', '0000000005', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isValidControlNumber', function() {
        it('should return a result of true if the agency code and respondent id are a valid combination', function(done) {
            PanelService.isValidControlNumber('2013', '1', '0000000001', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return a result of false if the agency code and respondent id are not a valid combination', function(done) {
            PanelService.isValidControlNumber('2013', '2', '0000000001', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isNotIndependentMortgageCoOrMBS', function() {
        it('should return a result of true if the respondent has an other lender code of 0', function(done) {
            PanelService.isNotIndependentMortgageCoOrMBS('2013', '1', '0000000001', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return a result of false if the respondent has an other lender code of 1', function(done) {
            PanelService.isNotIndependentMortgageCoOrMBS('2013', '2', '0000000003', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return a result of false if the respondent is not on the panel', function(done) {
            PanelService.isNotIndependentMortgageCoOrMBS('2013', '1', '0000000005', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });
});
