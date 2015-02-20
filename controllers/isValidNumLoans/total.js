'use strict';

var LARService = require('../../services/LARService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} agencyCode, {String} respondentID, {String} numLoans
     * @return {json}
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
