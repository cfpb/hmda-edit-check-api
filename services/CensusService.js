/*jshint maxparams: 6 */
'use strict';

var Census = require('../models/census');

var count = require('../lib/queryUtil').count;

var handleCensusQuery = function (query, callback) {
    Census.findOne(query, function(err, data) {
        if (err) {
            return callback(err, null);
        }
        if (data === null) {
            return callback(null, {result: false});
        }
        return callback(null, {result: true});
    });
};

module.exports = {
    isValidMSA: function(activityYear, msa, callback) {
        var query = { 'activity_year': activityYear, 'msa_code' : msa };
        return handleCensusQuery (query, callback);
    },

    isValidStateCounty: function(activityYear, state, county, callback) {
        var query = {'activity_year': activityYear, 'state_code': state, 'county_code': county};
        return handleCensusQuery (query, callback);
    },

    isValidCensusCombination: function(activityYear, censusparams, callback) {
        var query = {'activity_year': activityYear, 'state_code': censusparams.state, 'county_code':censusparams.county};

        if (censusparams.msa !== undefined && censusparams.msa!=='NA') {
            query.msa_code = censusparams.msa;
        }
        if (censusparams.tract !== undefined && censusparams.tract!=='NA') {
            query.tract = censusparams.tract;
        }

        // check that state, county exist
        Census.findOne(query, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            if (data === null || (censusparams.tract === 'NA' && data.small_county!=='1')) {
                return callback(null, {result: false});
            }
            return callback(null, {result: true});
        });
    },

    isValidCensusTractCombo: function(activityYear, state, county, metroArea, tract, callback) {
        if (metroArea === 'NA') {
            if (tract === 'NA') {
                return callback(null, {result: true});
            }
            var query = { 'activity_year': activityYear,  'state_code': state, 'county_code': county, 'tract': tract };
            return handleCensusQuery (query, callback);
        } else if (tract === 'NA') {
            var query2 = { 'activity_year': activityYear, 'state_code': state, 'county_code': county, 'small_county': '1' };
            return handleCensusQuery (query2, callback);
        } else {
            var query3 = { 'activity_year': activityYear, 'msa_code': metroArea, 'state_code': state, 'county_code': county, 'tract': tract };
            count('Census', query3, callback);
        }
    }
};
