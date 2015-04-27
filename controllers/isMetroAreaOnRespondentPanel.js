'use strict';

var MsaBranchesService = require('../services/MsaBranchesService');

module.exports = function(router) {

    /**
     * @api {get} /isMetroAreaOnRespondentPanel/:activityYear/:agencyCode/:respondentId/:metroArea isMetroAreaOnRespondentPanel
     * @apiDescription checks whether or not the metro area is listed as a branch for the respondent
     * @apiGroup MSA Branches
     * @apiParam {String} activityYear The year for which the HMDA data are being collected
     * @apiParam {String} agencyCode Code to identify the supervisory/regulatory agency of the HMDA reporting institution
     * @apiParam {String} respondentId Ten-digit number used to identify a HMDA reporting institution
     * @apiParam {String} metroArea 5-digit code for the Metropolitan Statistical Authority/Metropolitan Division
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
