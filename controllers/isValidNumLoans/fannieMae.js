'use strict';

var LARService = require('../../services/LARService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} agencyCode, {String} respondentID, {String} numLoans, {String} numFannieLoans
     * @return {json}
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
