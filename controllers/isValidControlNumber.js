'use strict';

var PanelService = require('../services/PanelService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} agencyCode, {String} respondentId
     * @return {json}
     */
     router.get('/:activityYear/:agencyCode/:respondentId', function(req, res) {
         PanelService.isValidControlNumber(req.params.activityYear, req.params.agencyCode, req.params.respondentId, function(err, result) {
             if (err) {
                 res.json(500, err);
             } else {
                 res.json(result);
             }
         });
     });
};
