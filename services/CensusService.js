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
    isCountySmall: function(activityYear, fips_county, callback) {
	    Census.findOne({ 'activity_year': activityYear, 'type': 'county', 'code' : fips_county }, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            var result = { result: false };
            if (data===null) {
				result.result = '-1';
			} else {
				result.result = data.small_county;
            }
            return callback(null, result);
	    });
    },
    isValidCensusInMSA: function(activityYear, msa, censusparams, callback) {
        Census.findOne({ 'activity_year': activityYear, 'type': 'msa', 'code' : msa },
            {state: {$elemMatch: { fips_code: censusparams.state}},
             county: {$elemMatch: { fips_code: censusparams.county}},
             tract: {$elemMatch: { '$eq': censusparams.tract}}}, function(err, data) {
		    if (err) {
		        return callback(err, null);
		    }
		    var result = { result: false };

		    if (data===null) {
				return callback(null, result);
			}

			if (data.state.length===1) {
				result.state = true;
			}
			if (data.county.length===1) {
				result.county = true;
			}
			if (data.tract.length===1) {
				result.tract = true;
			}
			console.log(result);

			return callback(null, result);

		});
    },
    isCountyTractInState: function(activityYear, censusparams, callback) {
        Census.findOne({ 'activity_year': activityYear, 'type': 'state', 'code' : censusparams.state },
            {county: {$elemMatch: { fips_code: censusparams.county}},
             tract: {$elemMatch: { '$eq': censusparams.tract}}}, function(err, data) {
		    if (err) {
		        return callback(err, null);
		    }
		    var result = { result: false };

		    if (data===null) {
				return callback(null, result);
			}

			if (data.county.length===1) {
				result.county = true;
			}
			if (data.tract.length===1) {
				result.tract = true;
			}

			return callback(null, result);

		});
    }
};
