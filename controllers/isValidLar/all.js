'use strict';

var EngineService = require('../../services/EngineService');

module.exports = function(router) {

    /**
     * @api {post} /isValidLar/all/:activityYear isValidLar
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
};
