'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @api {get} /isValidCensusInMSA/:activityYear/:msa/:state/:county/:tract isValidCensusInMSA
     * @apiDescription checks whether or not the FIPS state and county codes, Metropolitan Statistical Area/Metropolitan division code and Census CBSA tract number are a valid combination
     * @apiGroup Census
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} state 2-digit FIPS code that identifies the state
     * @apiParam {String} county 3-digit FIPS code that identifies the county
     * @apiParam {String} metroArea 5-digit code to identify the Metropolitan Statistical Authority/Metropolitan Division
     * @apiParam {String} tract 6-digit census tract number
     */
    router.get('/:activityYear/:state/:county/:metroArea/:tract', function(req, res) {
        CensusService.isValidCensusTractCombo(req.params.activityYear, req.params.state, req.params.county, req.params.metroArea, req.params.tract, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
