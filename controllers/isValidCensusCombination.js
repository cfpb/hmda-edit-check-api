'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @api {get} /isValidCensusCombination/:activityYear/:state/:county/:tract isValidCensusCombination
     * @apiDescription checks whether or not the FIPS state and county codes, and Census CBSA tract number are a valid combination
     * @apiGroup Census
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} state 2-digit FIPS code that identifies the state
     * @apiParam {String} county 3-digit FIPS code that identifies the county
     * @apiParam {String} tract 6-digit census tract number
     */
    router.get('/:activityYear/:state/:county/:tract', function(req, res) {
        var censusparams = {};
        censusparams.state_code = req.params.state;
        censusparams.county_code = req.params.county;
        censusparams.tract = req.params.tract;

        CensusService.isValidCensusCombination(req.params.activityYear, censusparams, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
