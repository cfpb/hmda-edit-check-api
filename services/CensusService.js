'use strict';

var Census = require('../models/census');

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
    }
};
