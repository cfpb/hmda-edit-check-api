/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var TransmittalService = require('../../services/TransmittalService');

describe('TransmittalService', function() {
    describe('isValidTimestamp', function() {

        it('should return true for a valid timestamp more than one day after January 1, 2014', function(done) {
            TransmittalService.isValidTimestamp('2014', '0000000001', '201401100000', function(err, result) {
                expect(result.result).to.be.true();
                done();
            });
        });

        it('should return false for an timestamp less than one day after January 1, 2014', function(done) {
            TransmittalService.isValidTimestamp('2014', '0000000001', '201401011800', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });

        it('should return false for an timestamp before January 1, 2014', function(done) {
            TransmittalService.isValidTimestamp('2014', '0000000001', '201311011800', function(err, result) {
                expect(result.result).to.be.false();
                done();
            });
        });
    });
});