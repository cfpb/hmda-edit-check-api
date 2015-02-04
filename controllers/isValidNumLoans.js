'use strict';

var LARService = require('../services/LARService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} numLoans, {String} respondentID
     * @return {json}
     */
    router.get('/:activityYear/:numLoans/:respondentID', function(req, res) {
        LARService.isValidNumLoans(req.params.activityYear, req.params.numLoans, req.params.respondentID, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
