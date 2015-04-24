'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @api {get} /isValidCensusInMSA/:activityYear/:msa/:state/:county/:tract isValidCensusInMSA
     * @apiDescription checks whether or not the Census CBSA tract number is within the given Metropolitan Statistical Area/Metropolitan Division
     * @apiGroup Census
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} msa 5-digit code to identify the Metropolitan Statistical Authority/Metropolitan Division
     * @apiParam {String} state 2-digit FIPS code that identifies the state
     * @apiParam {String} county 3-digit FIPS code that identifies the county
     * @apiParam {String} tract 6-digit census tract number
     */
    router.get('/:activityYear/:msa/:state/:county/:tract', function(req, res) {
        var censusparams = {};
        censusparams.msa_code = req.params.msa;
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
