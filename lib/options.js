'use strict';

var db = require('./database');

module.exports = function options(app) {

    return {
        onconfig: function(config, next) {
            db.configure(config.get('mongoConfig'));
            next(null, config);
        }
    };
};
