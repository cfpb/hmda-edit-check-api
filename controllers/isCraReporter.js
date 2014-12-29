'use strict';

var CraReportersService = require('../services/CraReportersService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} respondentId
     * @return {json}
     */
     router.get('/:activityYear/:respondentId', function(req, res) {
         CraReportersService.isCraReporter(req.params.activityYear, req.params.respondentId, function(err, result) {
             if (err) {
                 res.json(500, err);
             } else {
                 res.json(result);
             }
         });
     });
};
