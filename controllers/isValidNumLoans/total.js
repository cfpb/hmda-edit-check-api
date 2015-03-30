'use strict';

var LARService = require('../../services/LARService');

module.exports = function(router) {

    /**
     * @api {get} /isValidNumLoans/total/:activityYear/:agencyCode/:respondentId total
     * @apiDescription checks whether the total number of loan applications for the current year are within (+ or -) 20% of the previous year's total.
     * @apiGroup LAR
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} agencyCode Code to identify the supervisory/regulatory agency of the HMDA reporting institution
     * @apiParam {String} respondentId Ten-digit number used to identify a HMDA reporting institution
     * @apiParam {String} numLoans the total number of loans for the current activity year
     */
    router.get('/:activityYear/:agencyCode/:respondentID/:numLoans/', function(req, res) {
        LARService.isValidNumLoans(req.params.activityYear, req.params.agencyCode, req.params.respondentID, req.params.numLoans, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
