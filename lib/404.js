'use strict';

module.exports = function(template) {

    return function fileNotFound(req, res, next) {
        var globalError = { result: false };
        res.status(200).send(globalError);
    };

};
