/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var CensusService = require('../../services/CensusService');

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
});
