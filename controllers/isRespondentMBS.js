'use strict';

var PanelService = require('../services/PanelService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} respondentId
     * @return {json}
     */
     router.get('/:activityYear/:respondentId', function(req, res) {
         PanelService.isRespondentMBS(req.params.activityYear, req.params.respondentId, function(err, result) {
             if (err) {
                 res.status(500).json(err);
             } else {
                 res.json(result);
             }
         });
     });
};
