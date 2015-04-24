'use strict';

var TransmittalService = require('../services/TransmittalService');

module.exports = function(router) {

    /**
     * @api {get} /isValidTimestamp/:activityYear/:agencyCode/:respondentId isValidTimestamp
     * @apiDescription checks whether or not the timestamp on the submittal is valid (meaning that the last previous submittal was more than 24 hours prior)
     * @apiGroup Transmittal
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} agencyCode Code to identify the supervisory/regulatory agency of the HMDA reporting institution
     * @apiParam {String} respondentId Ten-digit number used to identify a HMDA reporting institution
     */
    router.get('/:activityYear/:agencyCode/:respondentID/:timestamp', function(req, res) {
        TransmittalService.isValidTimestamp(req.params.activityYear, req.params.agencyCode, req.params.respondentID, req.params.timestamp, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
