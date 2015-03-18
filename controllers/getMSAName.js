'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @api {get} /getMSAName/:activityYear/:msaCode getMSAName
     * @apiDescription returns the full name of a Metropolitan Statistical Authority (MSA)
     * @apiGroup Census
     * @apiName getMSAName
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} msaCode Code to identify the Metropolitan Statistical Authority/Metropolitan Division
     */
    router.get('/:activityYear/:msaCode', function(req, res) {
        CensusService.getMSAName(req.params.activityYear, req.params.msaCode, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
