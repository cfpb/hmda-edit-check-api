/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var EngineService = require('../../services/EngineService');

describe('EngineService', function() {
    var lar = '200010000529ABCDE12345ABCDE12345ABCDE201301179999000001620130217NY   NANA 9512.00251 6  8    250010211 NA   11                                                                                                                                                                                                                                                                              ';

    describe('runLarType', function() {
        it('should return empty errors for a passing lar check', function(done) {
            EngineService.runLarType('2013', 'syntactical', lar, function(result) {
                done();
            });
        });
    });
});