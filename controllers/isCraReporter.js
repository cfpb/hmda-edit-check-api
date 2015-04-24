'use strict';

var CraReportersService = require('../services/CraReportersService');

module.exports = function(router) {

    /**
     * @api {get} /isCraReporter/:activityYear/:agencyCode/:respondentId isCraReporter
     * @apiDescription checks whether or not the respondent is on the list of organizations required to file Community Reinvestment Act (CRA) information
     * @apiGroup CRA Reporters
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} agencyCode Code to identify the supervisory/regulatory agency of the HMDA reporting institution
     * @apiParam {String} respondentId Ten-digit number used to identify a HMDA reporting institution
     */
    router.get('/:activityYear/:agencyCode/:respondentId', function(req, res) {
        CraReportersService.isCraReporter(req.params.activityYear, req.params.agencyCode, req.params.respondentId, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
