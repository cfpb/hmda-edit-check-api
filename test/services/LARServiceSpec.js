/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var LARService = require('../../services/LARService');

describe('LARService', function() {
    describe('isValidNumHomePurchaseLoans', function() {
        it('should return true for a valid number of home purchase loans', function(done) {
            LARService.isValidNumHomePurchaseLoans('2013', 5, '0002590037', function(err, result) {
                expect(result.result).to.be.true();
            });
            LARService.isValidNumHomePurchaseLoans('2013', 7, '0002590037', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false an invalid number of home purchase loans', function(done) {
            LARService.isValidNumHomePurchaseLoans('2013', 3, '0002590037', function(err, result) {
                expect(result.result).to.be.false();
            });
            LARService.isValidNumHomePurchaseLoans('2013', 9, '0002590037', function(err, result) {
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
});
