'use strict';

var Census = require('../models/census');

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

        var query= { 'activity_year': activityYear, 'type': 'state',
                     'code' : censusparams.state };
        var projection = {county: {$elemMatch: { fips_code: censusparams.county}},
                          tract: {$elemMatch: { '$eq': censusparams.tract}}};

        if (censusparams.msa!==undefined) {
            query.type = 'msa';
            query.code = censusparams.msa;
            projection = {state: {$elemMatch: { fips_code: censusparams.state}},
                          county: {$elemMatch: { fips_code: censusparams.county}},
                          tract: {$elemMatch: { '$eq': censusparams.tract}}};
        }                

        // check that state, county exist
        Census.findOne(query,projection,
            function(err, data) {
                if (err) {
                   return callback(err,null);
                }
                if (data===null) {
                    result.reason = 'state or msa doesnt exist';
                    return callback(null,result);
                }
                if (data.county.length===1 && data.county[0].small_county==='1') {
                    if (censusparams.tract!=='NA') {
                        result.reason = 'tract should equal \'NA\'';
                    } else {
                        result.result = true;
                    }
                } else {
                    if (data.tract.length===1) {
                        result.result = true;
                    } else {
                        result.reason = 'state,county,tract combination not found';
                    }
                } 
                return callback(null,result);
            }
        );
    }
};
