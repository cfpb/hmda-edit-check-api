'use strict';

var TransmittalService = require('../services/TransmittalService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} msa
     * @return {json}
     */
     router.get('/:activityYear/:respondentID/:timestamp', function(req, res) {
         TransmittalService.isValidTimestamp(req.params.activityYear, req.params.respondentID, req.params.timestamp, function(err, result) {
             if (err) {
                 res.json(500, err);
             } else {
                 res.json(result);
             }
         });
     });
};
