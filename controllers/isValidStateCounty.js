'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @api {get} /isValidMSAStateCounty/:activityYear/:msa isValidMSAStateCounty
     * @apiDescription checks whether or not the FIPS state and county codes are a valid combination
     * @apiGroup Census
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} state 2-digit FIPS code that identifies the state
     * @apiParam {String} county 3-digit FIPS code that identifies the county
     */
    router.get('/:activityYear/:state/:county', function(req, res) {
        CensusService.isValidStateCounty(req.params.activityYear, req.params.state, req.params.county, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
