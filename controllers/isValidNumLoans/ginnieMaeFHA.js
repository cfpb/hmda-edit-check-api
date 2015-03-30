'use strict';

var LARService = require('../../services/LARService');

module.exports = function(router) {

    /**
     * @api {get} /isValidNumLoans/ginnieMaeFHA/:activityYear/:agencyCode/:respondentId ginnieMaeFHA
     * @apiDescription checks whether or not the percentage of Ginnie Mae FHA loans vs total loans meeting the following criteria (action taken type = 1 or 6, purpose of loan = 1 or 3, property type =
1 or 2, loan type = 2) meet year-on-year standards.
     * @apiGroup LAR
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} agencyCode Code to identify the supervisory/regulatory agency of the HMDA reporting institution
     * @apiParam {String} respondentId Ten-digit number used to identify a HMDA reporting institution
     * @apiParam {String} numLoans the number of loans meeting the criteria listed in the description
     * @apiParam {String} numGinnieLoans the number of Ginnie Mae FHA loans meeting the criteria listed in the description
     */
    router.get('/:activityYear/:agencyCode/:respondentID/:numLoans/:numGinnieLoans', function(req, res) {
        LARService.isValidNumGinnieMaeFHALoans(req.params.activityYear, req.params.agencyCode, req.params.respondentID, req.params.numLoans, req.params.numGinnieLoans, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
