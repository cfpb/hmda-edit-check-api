'use strict';

var CensusService = require('../../../services/CensusService');

var sendResponse = function(req, res, keyParams, value) {
    CensusService.getKeyValueData(req.params.activityYear, keyParams, value, function(err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
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
        var value = 'msa_name';
        sendResponse(req, res, keyParams, value);
    });

    /**
     * @param {String} activityYear
     * @return {json}
     */
    router.get('/stateCounty/:activityYear', function(req, res) {
        var keyParams = ['state_code', 'county_code'];
        var value = 'small_county';
        sendResponse(req, res, keyParams, value);
    });

    /**
     * @param {String} activityYear
     * @return {json}
     */
    router.get('/stateCountyMSA/:activityYear', function(req, res) {
        var keyParams = ['state_code', 'county_code', 'msa_code'];
        var value = 'small_county';
        sendResponse(req, res, keyParams, value);
    });

    /**
     * @param {String} activityYear
     * @return {json}
     */
    router.get('/stateCountyTract/:activityYear', function(req, res) {
        var keyParams = ['state_code', 'county_code', 'tract'];
        var value = 'small_county';
        sendResponse(req, res, keyParams, value);
    });

    /**
     * @param {String} activityYear
     * @return {json}
     */
    router.get('/stateCountyTractMSA/:activityYear', function(req, res) {
        var keyParams = ['state_code', 'county_code', 'tract', 'msa_code'];
        var value = 'small_county';
        sendResponse(req, res, keyParams, value);
    });

};
