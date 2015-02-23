'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} msa
     * @return {json}
     */
    router.get('/:activityYear/:msaCode', function(req, res) {
        CensusService.getMSAName(req.params.activityYear, req.params.msaCode, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
