'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} msa, {String} state, {String} county
     * @return {json}
     */
    router.get('/:activityYear/:msa/:state/:county', function(req, res) {
        var censusparams = {};
        censusparams.msa_code = req.params.msa;
        censusparams.state_code = req.params.state;
        censusparams.county_code = req.params.county;

        CensusService.isValidCensusCombination(req.params.activityYear, censusparams, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
