/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false, _:false*/
'use strict';

var EngineService = require('../../services/EngineService');

describe('EngineService', function() {
    describe('runLarType', function() {
        var lar = '201234567899ABCDEFGHIJKLMNOPQRSTUVWXY201301174321100001520130119351003705096.1100457432187654129000098701.0524B                                                                                                                                                                                                                                                                            x ';

        it('should return empty errors for a passing lar check', function(done) {
            var emptyErrors = {
                syntactical: {},
                validity: {},
                quality: {},
                macro: {},
                special: {}
            };

            EngineService.runLarType('2013', 'syntactical', lar, function(err, result) {
                expect(_.isEqual(result, emptyErrors)).to.be.true();
                done();
            });
        });

        it('should return an errors object for a non-passing lar check', function(done) {
            var expectedResult = JSON.parse(JSON.stringify(require('../errors-single')));
            expectedResult.quality = {};

            EngineService.runLarType('2013', 'validity', lar, function(err, result) {
                expect(_.isEqual(JSON.parse(JSON.stringify(result)), expectedResult)).to.be.true();
                done();
            });
        });
    });

    describe('runLar', function(done) {
        var lar = '20001000052945144446706399300000000002013011711310003931201301193510037050NA     225    5    1200220   01.5421                                                                                                                                                                                                                                                                              ';

        it('should return empty errors for a passing lar check', function(done) {
            var emptyErrors = {
                syntactical: {},
                validity: {},
                quality: {},
                macro: {},
                special: {}
            };

            EngineService.runLar('2013', lar, function(err, result) {
                expect(_.isEqual(result, emptyErrors)).to.be.true();
                done();
            });
        });

        it('should return an errors object for a non-passing lar check', function(done) {
            var lar = '201234567899ABCDEFGHIJKLMNOPQRSTUVWXY201301174321100001520130119351003705096.1100457432187654129000098701.0524B                                                                                                                                                                                                                                                                            x ';
            var expectedResult = JSON.parse(JSON.stringify(require('../errors-single')));

            EngineService.runLar('2013', lar, function(err, result) {
                expect(_.isEqual(JSON.parse(JSON.stringify(result)), expectedResult)).to.be.true();
                done();
            });
        });
    });
});
