'use strict';

var LARService = require('../../services/LARService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} respondentID, {String} numLoans, {String} numGinnieLoans
     * @return {json}
     */
    router.get('/:activityYear/:respondentID/:numLoans/:numGinnieLoans', function(req, res) {
        LARService.isValidNumGinnieMaeLoans(req.params.activityYear, req.params.respondentID, req.params.numLoans, req.params.numGinnieLoans, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
