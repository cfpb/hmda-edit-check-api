'use strict';

var LARService = require('../../services/LARService');

module.exports = function(router) {

    /**
     * @api {get} /isValidNumLoans/homePurchase/:activityYear/:agencyCode/:respondentId homePurchase
     * @apiDescription checks whether or not the percentage of sold homePurchase loans vs total loans meeting the following criteria (purpose of loan = 1, action
taken type = 1 or 6, property type = 1 or 2, and loan type = 2 or 3) meet year-on-year standards.
     * @apiGroup LAR
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} agencyCode Code to identify the supervisory/regulatory agency of the HMDA reporting institution
     * @apiParam {String} respondentId Ten-digit number used to identify a HMDA reporting institution
     * @apiParam {String} numLoans the total number of loans meeting the criteria listed in the description
     * @apiParam {String} numSoldLoans the number of sold loans meeting the criteria listed in the description
     */
    router.get('/:activityYear/:agencyCode/:respondentID/:numLoans/:numSoldLoans', function(req, res) {
        LARService.isValidNumHomePurchaseLoans(req.params.activityYear, req.params.agencyCode, req.params.respondentID, req.params.numLoans, req.params.numSoldLoans, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
