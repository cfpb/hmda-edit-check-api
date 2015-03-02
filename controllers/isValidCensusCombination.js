'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} state, {String} county, {String} tract
     * @return {json}
     */
    router.get('/:activityYear/:state/:county/:tract', function(req, res) {
        var censusparams = {};
        censusparams.state_code = req.params.state;
        censusparams.county_code = req.params.county;
        censusparams.tract = req.params.tract;

        CensusService.isValidCensusCombination(req.params.activityYear, censusparams, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
