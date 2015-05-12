'use strict';

var EngineService = require('../services/EngineService');

module.exports = function(router) {

    /**
     * @api {post} /isValidLar/:activityYear all
     * @apiDescription runs all applicable checks against the supplied lar.
     * @apiGroup Engine
     * @apiParam {String} activityYear  The year for which the HMDA data is being collected
     */
    router.post('/:activityYear', function(req, res) {
        EngineService.runLar(req.params.activityYear, req.body, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });

    /**
     * @api {post} /isValidLar/:activityYear/:editType type
     * @apiDescription runs all applicable checks of the supplied type against the supplied lar.
     * @apiGroup Engine
     * @apiParam {String} activityYear  The year for which the HMDA data is being collected
     * @apiParam {String} editType      The type of edits to run
     */
    router.post('/:activityYear/:editType', function(req, res) {
        EngineService.runLarType(req.params.activityYear, req.params.editType, req.body, function(err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    });
};
