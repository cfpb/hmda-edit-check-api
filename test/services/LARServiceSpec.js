/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var LARService = require('../../services/LARService');

describe('LARService', function() {
    describe('isValidNumHomePurchaseLoans', function() {
        it('should return true for a valid number of home purchase loans', function(done) {
            LARService.isValidNumHomePurchaseLoans('2013', 9, '0002590037', function(err, result) {
                expect(result.result).to.be.true();
            });
            LARService.isValidNumHomePurchaseLoans('2013', 11, '0002590037', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false an invalid number of home purchase loans', function(done) {
            LARService.isValidNumHomePurchaseLoans('2013', 3, '0002590037', function(err, result) {
                expect(result.result).to.be.false();
            });
            LARService.isValidNumHomePurchaseLoans('2013', 17, '0002590037', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false when the percentage is exactly +/- 20%', function(done) {
            LARService.isValidNumHomePurchaseLoans('2013', 8, '0002590037', function(err, result) {
                expect(result.result).to.be.false();
            });
            LARService.isValidNumHomePurchaseLoans('2013', 12, '0002590037', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return true when there are no home purchase loans for either year', function(done) {
            LARService.isValidNumHomePurchaseLoans('2013', 0, '0002590058', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when the percentage increase is infinite (n / 0)', function(done) {
            LARService.isValidNumHomePurchaseLoans('2013', 5, '0002590058', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isValidNumLoans', function() {
        it('should return true for a valid total number of loans', function(done) {
            LARService.isValidNumLoans('2013', 921, '0201590731', function(err, result) {
                expect(result.result).to.be.true();
            });
            LARService.isValidNumLoans('2013', 1147, '0201590731', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false for an invalid total number of loans', function(done) {
            LARService.isValidNumLoans('2013', 751, '0201590731', function(err, result) {
                expect(result.result).to.be.false();
            });
            LARService.isValidNumLoans('2013', 1532, '0201590731', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return true when neither year has 500 loans', function(done) {
            LARService.isValidNumLoans('2013', 359, '1201547730', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return true for a valid percent when only one year has > 500 loans', function(done) {
           LARService.isValidNumLoans('2013', 501, '1201547730', function(err, result) {
                expect(result.result).to.be.true();
                done();
            }); 
        });

        it('should return false when the percentage is exactly +/- 20%', function(done) {
            LARService.isValidNumLoans('2013', 800, '0201590731', function(err, result) {
                expect(result.result).to.be.false();
            });
            LARService.isValidNumLoans('2013', 1200, '0201590731', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });
});
