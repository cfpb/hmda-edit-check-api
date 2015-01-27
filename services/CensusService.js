/*jshint maxparams: 6 */
'use strict';

var Census = require('../models/census');

var count = require('../lib/queryUtil').count;

var isValidCensusTractForCounty = function(activityYear, countyCode, tract, callback) {
    var query = { 'activity_year': activityYear, 'type': 'county', 'code': countyCode, 'tract': tract };
    count('Census', query, callback);
};

var isSmallCounty = function(activityYear, countyCode, callback) {
    var query = { 'activity_year': activityYear, 'type': 'county', 'code': countyCode, 'small_county': '1' };
    count('Census', query, callback);
};

var handleMSAStateCounty = function(censusparams, result, err, data) {
    if (data.state.length === 1 && data.county.length === 1) {
        result.result = true;
    } else {
        result.reason = 'msa/md, state, county combination not found';
    }
};

var handleMSAStateCountyTract = function(censusparams, result, err, data) {
    if (data.county.length === 1 && data.county[0].small_county === '1') {
        if (censusparams.tract !== 'NA') {
            result.reason = 'tract should equal \'NA\'';
        } else {
            result.result = true;
        }
    } else {
        if (data.tract.length === 1) {
            result.result = true;
        } else {
            result.reason = 'state, county, tract combination not found';
        }
    }
};

module.exports = {
    isValidMSA: function(activityYear, msa, callback) {
        Census.find({ 'activity_year': activityYear, 'code' : msa }, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            var result = { result: false };
            if (data.length>0) {
                result.result = true;
            }
            return callback(null, result);
        });
    },

    isValidStateCounty: function(activityYear, state, county, callback) {
        var result = {result: false};
        var query = {'activity_year': activityYear, 'type': 'state', 'code': state};
        var projection = {county: {$elemMatch: {fips_code: county}}};

        Census.findOne(query, projection, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            if (data === null) {
                result.reason = 'state does not exist';
                return callback(null, result);
            }
            if (data.county.length === 1) {
                result.result = true;
            } else {
                result.reason = 'county does not exist';
            }
            return callback(null, result);
        });
    },

    isValidCensusCombination: function(activityYear, censusparams, callback) {
        var result = {result: false};
        var resultFunc = handleMSAStateCountyTract;

        var query = {'activity_year': activityYear, 'type': 'state',
                     'code' : censusparams.state};
        var projection = {county: {$elemMatch: { fips_code: censusparams.county}},
                          tract: {$elemMatch: { '$eq': censusparams.tract}}};

        if (censusparams.msa !== undefined) {
            query.type = 'msa';
            query.code = censusparams.msa;
            projection = {state: {$elemMatch: { fips_code: censusparams.state}},
                          county: {$elemMatch: { fips_code: censusparams.county}}
                         };

            if (censusparams.tract !== undefined) {
                projection.tract = {$elemMatch: {'$eq': censusparams.tract}};
            } else {
                resultFunc = handleMSAStateCounty;
            }
        }

        // check that state, county exist
        Census.findOne(query, projection, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            if (data === null) {
                result.reason = 'state or msa doesnt exist';
                return callback(null, result);
            }
            resultFunc(censusparams, result, err, data);
            return callback(null, result);
        });
    },

    isValidCensusTractCombo: function(activityYear, state, county, metroArea, tract, callback) {
        if (metroArea === 'NA') {
            if (tract === 'NA') {
                return callback(null, {result: true});
            }
            isValidCensusTractForCounty(activityYear, state + county, tract, callback);
        } else if (tract === 'NA') {
            isSmallCounty(activityYear, state + county, callback);
        } else {
            var query = { 'activity_year': activityYear, 'type': 'msa', 'code': metroArea, 'state.fips_code': state, 'county.fips_code': county, 'tract': tract };
            count('Census', query, callback);
        }
    }
};
