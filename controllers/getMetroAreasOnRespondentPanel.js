'use strict';

var MsaBranchesService = require('../services/MsaBranchesService');

module.exports = function(router) {

    /**
     * @api {get} /getMetroAreasOnRespondentPanel/:activityYear/:agencyCode/:respondentId getMetroAreasOnRespondentPanel
     * @apiDescription returns a list of the metro areas where the respondent has a home or branch office
     * @apiGroup MSA Branches
     * @apiParam {String} activityYear The year for which the HMDA data are being collected
     * @apiParam {String} agencyCode Code to identify the supervisory/regulatory agency of the HMDA reporting institution
     * @apiParam {String} respondentId Ten-digit number used to identify a HMDA reporting institution
     */
    router.get('/:activityYear/:agencyCode/:respondentId', function(req, res) {
        MsaBranchesService.getMetroAreasOnRespondentPanel(req.params.activityYear, req.params.agencyCode,
            req.params.respondentId, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
