/* global -Promise */
'use strict';

var _ = require('lodash'),
    Promise = require('bluebird');

var CensusService = require('../../services/CensusService');

var promiseCallback = function(deferred) {
    return function(err, result) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(result);
        }
    };
};

var promisifyService = function(method, args) {
    var deferred = Promise.defer();

    args.push(promiseCallback(deferred));
    method.apply(null, args);

    return deferred.promise;
};

var EngineCustomDataLookupConditions = (function() {
    return function() {

        /* lar-validity */
        this.isValidMetroArea = function(metroArea) {
            if (metroArea === 'NA') {
                return true;
            }
            return promisifyService(CensusService.isValidMSA, [this.getRuleYear(), metroArea])
            .then(function(response) {
                return response.result;
            });
        };

        this.isValidMsaMdStateAndCountyCombo = function(metroArea, fipsState, fipsCounty) {
            var censusParams = {
                msa_code: metroArea,
                state_code: fipsState,
                county_code: fipsCounty
            };
            return promisifyService(CensusService.isValidCensusCombination, [this.getRuleYear(), censusParams])
            .then(function(response) {
                return response.result;
            });
        };

        this.isValidStateAndCounty = function(fipsState, fipsCounty) {
            if (fipsState === 'NA' || fipsCounty === 'NA') {
                return Promise.resolve()
                .then(function() {
                    return false;
                });
            }
            return promisifyService(CensusService.isValidStateCounty, [this.getRuleYear(), fipsState, fipsCounty])
            .then(function(response) {
                return response.result;
            });
        };

        this.isValidCensusTractCombo = function(censusTract, metroArea, fipsState, fipsCounty) {
            if (censusTract === 'NA' && metroArea === 'NA' && fipsState === 'NA' && fipsCounty === 'NA') {
                return true;
            }
            return promisifyService(CensusService.isValidCensusTractCombo, [this.getRuleYear(), fipsState, fipsCounty, metroArea, censusTract])
            .then(function(response) {
                return response.result;
            });
        };

        return this;
    };
})();

module.exports = EngineCustomDataLookupConditions;
