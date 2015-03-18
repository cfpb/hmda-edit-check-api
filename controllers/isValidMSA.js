'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @api {get} /isValidMSA/:activityYear/:msa isValidMSA
     * @apiDescription checks whether or not the Metropolitan Statistical Area/Metropolitan Division code given is valid
     * @apiGroup Census
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} msa 5-digit code to identify the Metropolitan Statistical Authority/Metropolitan Division
     */
    router.get('/:activityYear/:msa', function(req, res) {
        CensusService.isValidMSA(req.params.activityYear, req.params.msa, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
