'use strict';

var PanelService = require('../services/PanelService');

module.exports = function(router) {

    /**
     * @api {get} /isNotIndependentMortgageCoOrMBS/:activityYear/:agencyCode/:respondentId isNotIndependentMortgageCoOrMBS
     * @apiDescription checks whether or not the respondent is a mortgage banking subsidiary or independent mortgage company
     * @apiGroup Panel
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     * @apiParam {String} agencyCode Code to identify the supervisory/regulatory agency of the HMDA reporting institution
     * @apiParam {String} respondentId Ten-digit number used to identify a HMDA reporting institution
     */
    router.get('/:activityYear/:agencyCode/:respondentId', function(req, res) {
        PanelService.isNotIndependentMortgageCoOrMBS(req.params.activityYear, req.params.agencyCode, req.params.respondentId, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
