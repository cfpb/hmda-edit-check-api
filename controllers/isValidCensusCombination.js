'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} state, {String} county, {String} tract
     * @return {json}
     */
     router.get('/:activityYear/:state/:county/:tract', function(req, res) {
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
						// check that state and county exist
						CensusService.isCountyTractInState(req.params.activityYear,censusparams,
						  function(err, result) {
							var cleanRes = {result: false};
							if (err) {
							    res.json(500, err);
             				}
             				if (result.county) {
                                cleanRes.result = true;
							} else {
								cleanRes.reason = 'state and county combination not found';
							}
							return res.json(cleanRes);
						});
					}
				} else {
					CensusService.isCountyTractInState(req.params.activityYear,
					  censusparams, function(err, result) {
						var cleanRes = {result: false};
						if (err) {
							res.json(500, err);
						}
             			if (result.county && result.tract) {
                            cleanRes.result = true;
						} else {
							cleanRes.reason = 'state,county,tract combination not found';
						}
						return res.json(cleanRes);
					});
				}
             }
         });
     });
};
