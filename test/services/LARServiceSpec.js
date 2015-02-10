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

    describe('isValidNumRefinanceLoans', function() {
        it('should return true when there are a valid number of refinance loans', function(done) {
            LARService.isValidNumRefinanceLoans('2013', 9, '1035818356', function(err, result) {
                expect(result.result).to.be.true();
            });
            LARService.isValidNumRefinanceLoans('2013', 11, '1035818356', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when there are an invalid number of refinance loans', function(done) {
            LARService.isValidNumRefinanceLoans('2013', 7, '1035818356', function(err, result) {
                expect(result.result).to.be.false();
            });
            LARService.isValidNumRefinanceLoans('2013', 13, '1035818356', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false when the percentage is exactly +/- 20%', function(done) {
            LARService.isValidNumRefinanceLoans('2013', 8, '1035818356', function(err, result) {
                expect(result.result).to.be.false();
            });
            LARService.isValidNumRefinanceLoans('2013', 12, '1035818356', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return true when there are no home purchase loans for either year', function(done) {
            LARService.isValidNumRefinanceLoans('2013', 0, '000000000005', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when the percentage increase is infinite (n / 0)', function(done) {
            LARService.isValidNumRefinanceLoans('2013', 8, '000000000005', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isValidNumFannieLoans', function() {
        it('should return true when percentage Fannie loans is within 10 percent', function(done) {
            LARService.isValidNumFannieLoans('2013', '0000413208', '6','1',function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return true when there are high number of eligible loans with good percent of fannie mae', function(done) {
            LARService.isValidNumFannieLoans('2013','0000413208','10000','2500', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when there is a difference of more than -10%', function(done) {
            LARService.isValidNumFannieLoans('2013','0000413208','100','3', function(err, result) {
                expect(result.result).to.be.false();
                done();
            }); 
        });

        it('should return true when there is a difference of more than 10%', function(done) {
            LARService.isValidNumFannieLoans('2013','0000413208','100','28', function(err, result) {
                expect(result.result).to.be.true();
                done();
            }); 
        });

        it('should return false when there are high number of eligible loans with low percent of fannie mae', function(done) {
            LARService.isValidNumFannieLoans('2013','0000413208','10000','1500', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false when there are zero current eligible loans', function(done) {
            LARService.isValidNumFannieLoans('2013','0000413208','0','0', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isValidNumGinnieMaeFHALoans', function() {
        it('should return true when percentage Ginnie Mae FHA loans is within 10 percent', function(done) {
            LARService.isValidNumGinnieMaeFHALoans('2013', '0050413703', '4','1', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return true when there are high number of eligible loans with high percent of Ginnie Mae FHA', function(done) {
            LARService.isValidNumGinnieMaeFHALoans('2013','0050413703','2500','834', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when there is a difference of more than -10%', function(done) {
            LARService.isValidNumGinnieMaeFHALoans('2013','0050413703','100','3', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return true when there is a difference of more than 10%', function(done) {
            LARService.isValidNumGinnieMaeFHALoans('2013','0050413703','100','36', function(err, result) {
                expect(result.result).to.be.true();
                done();
            }); 
        });

        it('should return false when there are high number of eligible loans with low percent of Ginnie Mae FHA', function(done) {
            LARService.isValidNumGinnieMaeFHALoans('2013','0050413703','2500','416', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false when there are zero current eligible loans', function(done) {
            LARService.isValidNumGinnieMaeFHALoans('2013','0050413703','0','0', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });
});
