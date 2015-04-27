/*global describe:false, expect:false, it:false, before:false, after:false, beforeEach:false, afterEach:false, async:false*/
'use strict';

var LARService = require('../../services/LARService');

var testdata = require('../testdata'),
    mockgoose = require('mockgoose');

describe('LARService', function() {
    after(function(done) {
        mockgoose.reset();
        testdata.build(done);
    });

    describe('isValidNumHomePurchaseLoans', function() {
        it('should return true for a valid number of home purchase loans', function(done) {
            async.series([
                function(cb) {
                    LARService.isValidNumHomePurchaseLoans('2013', '9', '0002590037', 10, 7, function(err, result) {
                        expect(result.result).to.be.true();
                        cb();
                    });
                },
                function(cb) {
                    LARService.isValidNumHomePurchaseLoans('2013', '9', '0002590037', 11, 8, function(err, result) {
                        expect(result.result).to.be.true();
                        cb();
                    });
                }
            ], function(err, results) {
                done();
            });
        });

        it('should return false an invalid number of home purchase loans', function(done) {
            async.series([
                function(cb) {
                    LARService.isValidNumHomePurchaseLoans('2013', '9', '0002590037', 10, 3, function(err, result) {
                        expect(result.result).to.be.false();
                        cb();
                    });
                },
                function(cb) {
                    LARService.isValidNumHomePurchaseLoans('2013', '9', '0002590037', 10, 9, function(err, result) {
                        expect(result.result).to.be.false();
                        cb();
                    });
                }
            ], function(err, results) {
                done();
            });
        });

        it('should return false when the percentage is exactly +/- 20%', function(done) {
            async.series([
                function(cb) {
                    LARService.isValidNumHomePurchaseLoans('2013', '9', '0002590037', 10, 8, function(err, result) {
                        expect(result.result).to.be.false();
                        cb();
                    });
                },
                function(cb) {
                    LARService.isValidNumHomePurchaseLoans('2013', '9', '0002590037', 10, 4, function(err, result) {
                        expect(result.result).to.be.false();
                        cb();
                    });
                }
            ], function(err, results) {
                done();
            });
        });

        it('should return true when there are no home purchase loans for either year', function(done) {
            LARService.isValidNumHomePurchaseLoans('2013', '9', '0002590058', 0, 0, function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when the percentage increase is infinite (n / 0)', function(done) {
            LARService.isValidNumHomePurchaseLoans('2013', '9', '0002590058', 5, 4, function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isValidNumLoans', function() {
        it('should return true for a valid total number of loans', function(done) {
            async.series([
                function(cb) {
                    LARService.isValidNumLoans('2013', '9', '0201590731', 921, function(err, result) {
                        expect(result.result).to.be.true();
                        cb();
                    });
                },
                function(cb) {
                    LARService.isValidNumLoans('2013', '9', '0201590731', 1147, function(err, result) {
                        expect(result.result).to.be.true();
                        cb();
                    });
                }
            ], function(err, results) {
                done();
            });
        });

        it('should return false for an invalid total number of loans', function(done) {
            async.series([
                function(cb) {
                    LARService.isValidNumLoans('2013', '9', '0201590731', 751, function(err, result) {
                        expect(result.result).to.be.false();
                        cb();
                    });
                },
                function(cb) {
                    LARService.isValidNumLoans('2013', '9', '0201590731', 1532, function(err, result) {
                        expect(result.result).to.be.false();
                        done();
                    });
                }
            ], function(err, results) {
                done();
            });
        });

        it('should return true when neither year has 500 loans', function(done) {
            LARService.isValidNumLoans('2013', '9', '1201547730', 359, function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return true when previous year does not exist and this year has < 500 loans', function(done) {
            LARService.isValidNumLoans('2013', '9', '1201347730', 359, function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return true when previous year does not exist and this year has > 500 loans', function(done) {
            LARService.isValidNumLoans('2013', '9', '12012347730', 750, function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return true for a valid percent when only one year has > 500 loans', function(done) {
            LARService.isValidNumLoans('2013', '9', '1201547730', 501, function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when the percentage is exactly +/- 20%', function(done) {
            async.series([
                function(cb) {
                    LARService.isValidNumLoans('2013', '9', '0201590731', 800, function(err, result) {
                        expect(result.result).to.be.false();
                        cb();
                    });
                },
                function(cb) {
                    LARService.isValidNumLoans('2013', '9', '0201590731', 1200, function(err, result) {
                        expect(result.result).to.be.false();
                        cb();
                    });
                }
            ], function(err, results) {
                done();
            });
        });
    });

    describe('isValidNumRefinanceLoans', function() {
        it('should return true when there are a valid number of refinance loans', function(done) {
            async.series([
                function(cb) {
                    LARService.isValidNumRefinanceLoans('2013', '9', '1035818356', 10, 5, function(err, result) {
                        expect(result.result).to.be.true();
                        cb();
                    });
                },
                function(cb) {
                    LARService.isValidNumRefinanceLoans('2013', '9', '1035818356', 10, 6, function(err, result) {
                        expect(result.result).to.be.true();
                        cb();
                    });
                }
            ], function(err, results) {
                done();
            });
        });

        it('should return false when there are an invalid number of refinance loans', function(done) {
            async.series([
                function(cb) {
                    LARService.isValidNumRefinanceLoans('2013', '9', '1035818356', 10, 8, function(err, result) {
                        expect(result.result).to.be.false();
                        cb();
                    });
                },
                function(cb) {
                    LARService.isValidNumRefinanceLoans('2013', '9', '1035818356', 10, 2, function(err, result) {
                        expect(result.result).to.be.false();
                        cb();
                    });
                }
            ], function(err, results) {
                done();
            });
        });

        it('should return false when the percentage is exactly +/- 20%', function(done) {
            async.series([
                function(cb) {
                    LARService.isValidNumRefinanceLoans('2013', '9', '1035818356', 10, 7, function(err, result) {
                        expect(result.result).to.be.false();
                        cb();
                    });
                },
                function(cb) {
                    LARService.isValidNumRefinanceLoans('2013', '9', '1035818356', 10, 3, function(err, result) {
                        expect(result.result).to.be.false();
                        cb();
                    });
                }
            ], function(err, results) {
                done();
            });
        });

        it('should return true when there are no home purchase loans for either year', function(done) {
            LARService.isValidNumRefinanceLoans('2013', '9', '000000000005', 0, 0, function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });
    });

    describe('isValidNumFannieLoans', function() {
        it('should return true when percentage Fannie loans is within 10 percent', function(done) {
            LARService.isValidNumFannieLoans('2013', '9', '0000413208', '6', '1', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return true when there are high number of eligible loans with good percent of fannie mae', function(done) {
            LARService.isValidNumFannieLoans('2013', '9', '0000413208', '10000', '2500', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when there is a difference of more than -10%', function(done) {
            LARService.isValidNumFannieLoans('2013', '9', '0000413208', '100', '3', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return true when there is a difference of more than 10%', function(done) {
            LARService.isValidNumFannieLoans('2013', '9', '0000413208', '100', '28', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when there are high number of eligible loans with low percent of fannie mae', function(done) {
            LARService.isValidNumFannieLoans('2013', '9', '0000413208', '10000', '1500', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false when there are zero current eligible loans', function(done) {
            LARService.isValidNumFannieLoans('2013', '9', '0000413208', '0', '0', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isValidNumGinnieMaeFHALoans', function() {
        it('should return true when percentage Ginnie Mae FHA loans is within 10 percent', function(done) {
            LARService.isValidNumGinnieMaeFHALoans('2013', '9', '0050413703', '4', '1', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return true when there are high number of eligible loans with high percent of Ginnie Mae FHA', function(done) {
            LARService.isValidNumGinnieMaeFHALoans('2013', '9', '0050413703', '2500', '834', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when there is a difference of more than -10%', function(done) {
            LARService.isValidNumGinnieMaeFHALoans('2013', '9', '0050413703', '100', '3', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return true when there is a difference of more than 10%', function(done) {
            LARService.isValidNumGinnieMaeFHALoans('2013', '9', '0050413703', '100', '36', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when there are high number of eligible loans with low percent of Ginnie Mae FHA', function(done) {
            LARService.isValidNumGinnieMaeFHALoans('2013', '9', '0050413703', '2500', '416', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false when there are zero current eligible loans', function(done) {
            LARService.isValidNumGinnieMaeFHALoans('2013', '9', '0050413703', '0', '0', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('isValidNumGinnieMaeVALoans', function() {
        it('should return true when percentage Ginnie loans is within -10 percent', function(done) {
            LARService.isValidNumGinnieMaeVALoans('2013', '9', '0000413209', '100', '16', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return true when there are high number of eligible loans with good percent of ginnie mae', function(done) {
            LARService.isValidNumGinnieMaeVALoans('2013', '9', '0000413209', '2000', '700', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when there is a difference of more than -10%', function(done) {
            LARService.isValidNumGinnieMaeVALoans('2013', '9', '0000413209', '100', '14', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return true when the difference is more than 10%', function(done) {
            LARService.isValidNumGinnieMaeVALoans('2013', '9', '0000413209', '100', '48', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false when there are high number of eligible loans with low percent of ginnie mae (within 10%)', function(done) {
            LARService.isValidNumGinnieMaeVALoans('2013', '9', '0000413209', '2000', '400', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false when there are zero current eligible loans', function(done) {
            LARService.isValidNumGinnieMaeVALoans('2013', '9', '0000413209', '0', '0', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return true when there are zero previous eligible loans', function(done) {
            LARService.isValidNumGinnieMaeVALoans('2013', '9', '0000413210', '100', '30', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });
    });
});
