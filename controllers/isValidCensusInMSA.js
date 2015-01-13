'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} msa, {String} state, {String} county, {String} tract
     * @return {json}
     */
     router.get('/:activityYear/:msa/:state/:county/:tract', function(req, res) {
		 // first we check if county is small, if not, we don't have to check tract
		 CensusService.isCountySmall(req.params.activityYear, req.params.state+req.params.county, function(err, result) {
             if (err) {
                 res.json(500, err);
             } else {
		        // check that state, county, and tract are in msa
				var censusparams = {};
				censusparams.state = req.params.state;
				censusparams.county = req.params.county;
				censusparams.tract = req.params.tract;

		        if (result.result<0) {
					result.reason = 'county was not found';
					result.result = false;
					return res.json(result);
				}

				// tract should equal 'NA' otherwise return false
                 if (result.result==='1') {
					if (req.params.tract!=='NA') {
						result.reason = 'tract should equal \'NA\'';
						result.result = false;
						return res.json(result);
					} else {
						// check that state and county are both in msa
						CensusService.isValidCensusInMSA(req.params.activityYear,
						    req.params.msa, censusparams, function(err, result) {
							var cleanRes = {result: false};
							if (err) {
							    res.json(500, err);
             				}
             				if (result.state && result.county) {
                                cleanRes.result = true;
							} else {
								cleanRes.reason = 'state and county combination not found in msa';
							}
							return res.json(cleanRes);
						});
					}
				} else {
					CensusService.isValidCensusInMSA(req.params.activityYear,
						req.params.msa,censusparams, function(err, result) {
						var cleanRes = {result: false};
						if (err) {
							res.json(500, err);
						}
             			if (result.state && result.county && result.tract) {
                            cleanRes.result = true;
						} else {
							cleanRes.reason = 'state,county,tract combination not found in msa';
						}
						return res.json(cleanRes);
					});
				}
             }
         });
     });
};
