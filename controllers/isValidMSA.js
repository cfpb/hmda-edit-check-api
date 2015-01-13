'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} msa
     * @return {json}
     */
     router.get('/:activityYear/:msa', function(req, res) {
         CensusService.isValidMSA(req.params.activityYear, req.params.msa, function(err, result) {
             if (err) {
                 res.json(500, err);
             } else {
                 res.json(result);
             }
         });
     });
};
