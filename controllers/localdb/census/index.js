'use strict';

var CensusService = require('../../../services/CensusService');

var sendResponse = function(req, res, keyParams, valueParams) {
    CensusService.getKeyValueData(req.params.activityYear, keyParams, valueParams, function(err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.setHeader('Content-Type', 'application/json; charset=UTF-8');
            res.setHeader('Transfer-Encoding', 'chunked');
            res.write('[');
            for (var i=0; i < result.length; i++) {
                res.write(result[i].join(','));
                if (i < result.length-1) {
                    res.write(',');
                }
            }
            res.end(']');
        }
    });
};

module.exports = function(router) {

    /**
     * @param {String} activityYear
     * @return {json}
     */
    router.get('/msaCodes/:activityYear', function(req, res) {
        var keyParams = ['msa_code'];
        var valueParams = ['msa_name'];
        sendResponse(req, res, keyParams, valueParams);
    });

    /**
     * @param {String} activityYear
     * @return {json}
     */
    router.get('/stateCounty/:activityYear', function(req, res) {
        var keyParams = ['state_code', 'county_code'];
        var valueParams = ['small_county', 'msa_code'];
        sendResponse(req, res, keyParams, valueParams);
    });

    /**
     * @param {String} activityYear
     * @return {json}
     */
    router.get('/stateCountyMSA/:activityYear', function(req, res) {
        var keyParams = ['state_code', 'county_code', 'msa_code'];
        var valueParams = ['small_county'];
        sendResponse(req, res, keyParams, valueParams);
    });

    /**
     * @param {String} activityYear
     * @return {json}
     */
    router.get('/stateCountyTract/:activityYear', function(req, res) {
        var keyParams = ['state_code', 'county_code', 'tract'];
        var valueParams = ['small_county', 'msa_code'];
        sendResponse(req, res, keyParams, valueParams);
    });

    /**
     * @param {String} activityYear
     * @return {json}
     */
    router.get('/stateCountyTractMSA/:activityYear', function(req, res) {
        var keyParams = ['state_code', 'county_code', 'tract', 'msa_code'];
        var valueParams = ['small_county'];
        sendResponse(req, res, keyParams, valueParams);
    });

};
