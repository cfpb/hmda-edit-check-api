'use strict';

var TransmittalService = require('../services/TransmittalService');

module.exports = function(router) {

    /**
     * @api {get} /isTaxIDTheSameAsLastYear/:activityYear/:agencyCode/:respondentId/:taxID isTaxIDTheSameAsLastYear
     * @apiDescription checks whether or not the respondent's reported tax ID is the same they used for last year's submittal
     * @apiGroup Transmittal
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} agencyCode Code to identify the supervisory/regulatory agency of the HMDA reporting institution
     * @apiParam {String} respondentId Ten-digit number used to identify a HMDA reporting institution
     * @apiParam {String} taxID Federal Tax ID number
     */
    router.get('/:activityYear/:agencyCode/:respondentID/:taxID', function(req, res) {
        TransmittalService.isTaxIDTheSameAsLastYear(req.params.activityYear, req.params.agencyCode, req.params.respondentID, req.params.taxID, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
