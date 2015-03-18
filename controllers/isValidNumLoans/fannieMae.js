'use strict';

var LARService = require('../../services/LARService');

module.exports = function(router) {

    /**
     * @api {get} /isValidNumLoans/fannieMae/:activityYear/:agencyCode/:respondentId fannieMae
     * @apiDescription checks whether or not the percentage of Fannie Mae loans vs total loans meeting the following criteria (action taken type = 1 or 6, purpose of loan = 1 or 3, property type =
1 or 2, loan type = 1) meet year-on-year standards.
     * @apiGroup LAR
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} agencyCode Code to identify the supervisory/regulatory agency of the HMDA reporting institution
     * @apiParam {String} respondentId Ten-digit number used to identify a HMDA reporting institution
     * @apiParam {String} numLoans the number of loans meeting the criteria listed in the description
     * @apiParam {String} numFannieLoans the number of Fannie Mae loans meeting the criteria listed in the description
     */
    router.get('/:activityYear/:agencyCode/:respondentID/:numLoans/:numFannieLoans', function(req, res) {
        LARService.isValidNumFannieLoans(req.params.activityYear, req.params.agencyCode, req.params.respondentID, req.params.numLoans, req.params.numFannieLoans, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
