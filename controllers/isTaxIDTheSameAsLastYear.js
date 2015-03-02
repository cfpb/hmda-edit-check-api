'use strict';

var TransmittalService = require('../services/TransmittalService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} agencyCode, {String} respondentID, {String} taxID
     * @return {json}
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
