'use strict';

var MsaBranchesService = require('../services/MsaBranchesService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} agencyCode, {String} respondentId, {String} metroArea
     * @return {json}
     */
    router.get('/:activityYear/:agencyCode/:respondentId/:metroArea', function(req, res) {
        MsaBranchesService.isMetroAreaOnRespondentPanel(req.params.activityYear, req.params.agencyCode, req.params.respondentId, req.params.metroArea, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
