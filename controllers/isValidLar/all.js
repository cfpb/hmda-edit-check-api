'use strict';

module.exports = function(router) {

    /**
     * @api {get} /isValidLar/all/:activityYear isValidLar
     * @apiDescription runs all applicable checks against the supplied lar.
     * @apiGroup Engine
     * @apiParam {String} activityYear The year for which the HMDA data is being collected
     */
    router.post('/:activityYear', function(req, res) {
        res.json({'result': false});
    });
};