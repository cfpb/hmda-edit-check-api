'use strict';

var LARService = require('../../services/LARService');

module.exports = function(router) {

    /**
     * @api {get} /isValidNumLoans/ginnieMaeVA/:activityYear/:agencyCode/:respondentId ginnieMaeVA
     * @apiDescription checks whether or not the percentage of Ginnie Mae VA loans vs total loans meeting the following criteria (purpose of loan = 1, action
taken type = 1 or 6, property type = 1 or 2, and loan type = 2 or 3) meet year-on-year standards.
     * @apiGroup LAR
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} agencyCode Code to identify the supervisory/regulatory agency of the HMDA reporting institution
     * @apiParam {String} respondentId Ten-digit number used to identify a HMDA reporting institution
     * @apiParam {String} numLoans the number of loans meeting the criteria listed in the description
     * @apiParam {String} numGinnieLoans the number of Ginnie Mae VA loans meeting the criteria listed in the description
     */
    router.get('/:activityYear/:agencyCode/:respondentID/:numLoans/:numGinnieLoans', function(req, res) {
        LARService.isValidNumGinnieMaeVALoans(req.params.activityYear, req.params.agencyCode, req.params.respondentID, req.params.numLoans, req.params.numGinnieLoans, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
