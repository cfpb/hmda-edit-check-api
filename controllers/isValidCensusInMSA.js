'use strict';

var CensusService = require('../services/CensusService');

module.exports = function(router) {

    /**
     * @param {String} activityYear, {String} msa, {String} state, {String} county, {String} tract
     * @return {json}
     */
    router.get('/:activityYear/:msa/:state/:county/:tract', function(req, res) {
        var censusparams = {};
        censusparams.msa = req.params.msa;
        censusparams.state = req.params.state;
        censusparams.county = req.params.county;
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
