'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} state, {String} county, {String} metroArea, {String} tract
     * @return {json}
     */
    router.get('/:activityYear/:state/:county/:metroArea/:tract', function(req, res) {
        CensusService.isValidCensusTractCombo(req.params.activityYear, req.params.state, req.params.county, req.params.metroArea, req.params.tract, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
