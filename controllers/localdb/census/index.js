'use strict';

var CensusService = require('../../../services/CensusService');

var sendResponse = function(req, res, keyParams, valueParams) {
    CensusService.getKeyValueData(req.params.activityYear, keyParams, valueParams, function(err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
};

module.exports = function(router) {

    /**
     * @api {get} /localdb/census/msaCodes/:activityYear msaCodes
     * @apiDescription returns msa code/name key-value pairs for use in localDB
     * @apiGroup Local DB
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     */
    router.get('/msaCodes/:activityYear', function(req, res) {
        var keyParams = ['msa_code'];
        var valueParams = ['msa_name'];
        sendResponse(req, res, keyParams, valueParams);
    });

    /**
     * @api {get} /localdb/census/stateCounty/:activityYear stateCounty
     * @apiDescription returns state/county smallCounty key-value pairs for use in localDB
     * @apiGroup Local DB
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     */
    router.get('/stateCounty/:activityYear', function(req, res) {
        var keyParams = ['state_code', 'county_code'];
        var valueParams = ['small_county', 'msa_code'];
        sendResponse(req, res, keyParams, valueParams);
    });

    /**
     * @api {get} /localdb/census/stateCountyMSA/:activityYear stateCountyMSA
     * @apiDescription returns state/county/msa smallCounty key-value pairs for use in localDB
     * @apiGroup Local DB
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     */
    router.get('/stateCountyMSA/:activityYear', function(req, res) {
        var keyParams = ['state_code', 'county_code', 'msa_code'];
        var valueParams = ['small_county'];
        sendResponse(req, res, keyParams, valueParams);
    });

    /**
     * @api {get} /localdb/census/stateCountyTract/:activityYear stateCountyTract
     * @apiDescription returns state/county/census tract smallCounty key-value pairs for use in localDB
     * @apiGroup Local DB
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     */
    router.get('/stateCountyTract/:activityYear', function(req, res) {
        var keyParams = ['state_code', 'county_code', 'tract'];
        var valueParams = ['small_county', 'msa_code'];
        sendResponse(req, res, keyParams, valueParams);
    });

    /**
     * @api {get} /localdb/census/stateCountyTractMSA/:activityYear stateCountyTractMSA
     * @apiDescription returns state/county/census tract/msa smallCounty key-value pairs for use in localDB
     * @apiGroup Local DB
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     */
    router.get('/stateCountyTractMSA/:activityYear', function(req, res) {
        var keyParams = ['state_code', 'county_code', 'tract', 'msa_code'];
        var valueParams = ['small_county'];
        sendResponse(req, res, keyParams, valueParams);
    });

};
