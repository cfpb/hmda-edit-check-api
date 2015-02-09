'use strict';

var LARService = require('../../services/LARService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} respondentID, {String} numLoans
     * @return {json}
     */
    router.get('/:activityYear/:respondentID/:numLoans/', function(req, res) {
        LARService.isValidNumLoans(req.params.activityYear, req.params.numLoans, req.params.respondentID, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
