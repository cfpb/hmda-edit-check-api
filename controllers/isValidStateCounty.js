'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} msa, {String} state, {String} county, {String} tract
     * @return {json}
     */
    router.get('/:activityYear/:state/:county', function(req, res) {
        
        CensusService.isValidStateCounty(req.params.activityYear, req.params.state, req.params.county, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
