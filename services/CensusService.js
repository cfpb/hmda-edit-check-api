/*jshint maxparams: 6 */
'use strict';

var Census = require('../models/census'),
    queryUtil = require('../lib/queryUtil');

var isValidCombination = function(activityYear, censusparams, callback) {
    var query = {activity_year: activityYear};

    for (var param in censusparams) {
        if (censusparams[param] !== undefined && censusparams[param] !== 'NA') {
            query[param] = censusparams[param];
        }
    }

    // check that state, county exist
    Census.findOne(query, function(err, data) {
        if (err) {
            return callback(err, null);
        }
        if (data === null || (censusparams.tract === 'NA' && data.small_county !== '1')) {
            return callback(null, {result: false});
        }
        return callback(null, {result: true, msa_code: data.msa_code});
    });
};

module.exports = {
    isValidMSA: function(activityYear, msa, callback) {
        var query = { activity_year: activityYear, msa_code: msa };
        return queryUtil.exists('Census', query, callback);
    },

    isValidStateCounty: function(activityYear, state, county, callback) {
        return isValidCombination(activityYear, {state_code: state, county_code: county}, callback);
    },

    isValidCensusCombination: function(activityYear, censusparams, callback) {
        isValidCombination(activityYear, censusparams, callback);
    },

    isValidCensusTractCombo: function(activityYear, state, county, metroArea, tract, callback) {
        return isValidCombination(activityYear, {msa_code: metroArea, tract: tract,
            state_code: state, county_code: county}, callback);
    },

    getMSAName: function(activityYear, msaCode, callback) {
        var query = {activity_year: activityYear, msa_code: msaCode};
        Census.findOne(query, function(err, data) {
            if (err) {
                return callback(err, null);
            }

            if (data) {
                return callback(null, {msaName: data.msa_name});
            }

            return callback(null, {msaName: ''});
        });
    },

    getKeyValueData: function(activityYear, keyParams, valueParams, callback) {
        var aggregateQuery = queryUtil.buildAggregateQuery(activityYear, keyParams, valueParams);
        Census.aggregate(aggregateQuery, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            var result = queryUtil.convertToKeyValue('/census', data, keyParams, valueParams);
            return callback(null, result);
        });
    }
};
