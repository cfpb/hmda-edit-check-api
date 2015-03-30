'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @api {get} /isValidMSAStateCounty/:activityYear/:msa isValidMSAStateCounty
     * @apiDescription checks whether or not the FIPS state and county codes, and Metropolitan Statistical Area/Metropolis Division code are a valid combination
     * @apiGroup Census
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} msa 5-digit code to identify the Metropolitan Statistical Authority/Metropolitan Division
     * @apiParam {String} state 2-digit FIPS code that identifies the state
     * @apiParam {String} county 3-digit FIPS code that identifies the county
     */
    router.get('/:activityYear/:msa/:state/:county', function(req, res) {
        var censusparams = {};
        censusparams.msa_code = req.params.msa;
        censusparams.state_code = req.params.state;
        censusparams.county_code = req.params.county;

        CensusService.isValidCensusCombination(req.params.activityYear, censusparams, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
