'use strict';

var CraReportersService = require('../services/CraReportersService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} agencyCode, {String} respondentId
     * @return {json}
     */
    router.get('/:activityYear/:agencyCode/:respondentId', function(req, res) {
        CraReportersService.isCraReporter(req.params.activityYear, req.params.agencyCode, req.params.respondentId, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
