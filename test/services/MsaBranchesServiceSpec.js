/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var MsaBranchesService = require('../../services/MsaBranchesService');

describe('MsaBranchesService', function() {
    describe('isMetroAreaOnRespondentPanel', function() {
        it('should return a result of true if the msa exists for the respondent', function(done) {
            MsaBranchesService.isMetroAreaOnRespondentPanel('2013', '1', '0000000001', '00001', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return a result of false if the msa does not exist for the respondent', function(done) {
            MsaBranchesService.isMetroAreaOnRespondentPanel('2013', '1', '0000000001', '00002', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return a result of false if the respondent is not found', function(done) {
            MsaBranchesService.isMetroAreaOnRespondentPanel('2013', '1', '0000000009', '00001', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });

    describe('getMetroAreasOnRespondentPanel', function() {
        it('should return a list of msa codes if the respondent has a list of msa branches', function(done) {
            MsaBranchesService.getMetroAreasOnRespondentPanel('2013', '1', '0000000001', function(err, result) {
                expect(result.msa.length).to.be(5);
                expect(result.msa[1]).to.be('00003');
                done();
            });
        });

        it('should return an empty list if the respondent does not exist in the msa branch data', function(done) {
            MsaBranchesService.getMetroAreasOnRespondentPanel('2013', '1', '0000000003', function(err, result) {
                expect(result.msa.length).to.be(0);
                done();
            });
        });
    });
});
