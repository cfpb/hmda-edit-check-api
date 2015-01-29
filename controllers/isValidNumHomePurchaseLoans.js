'use strict';

var LARService = require('../services/LARService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} numPurchaseLoans, {String} numLoans, {String} respondentID
     * @return {json}
     */
    router.get('/:activityYear/:numPurchaseLoans/:numLoans/:respondentID', function(req, res) {
        var loanCounts = {
            'numPurchaseLoans': req.params.numPurchaseLoans, 
            'numLoans': req.params.numLoans
        };

        LARService.isValidNumHomePurchaseLoans(req.params.activityYear, loanCounts, req.params.respondentID, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
