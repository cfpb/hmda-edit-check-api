'use strict';

var mongoose = require('mongoose');

module.exports = {
    count: function(domain, query, callback) {
        mongoose.model(domain).count(query, function(err, count) {
            if (err) {
                return callback(err, null);
            }
            var result = { result: false };
            if (count) {
                result.result = true;
            }
            return callback(null, result);
        });
    },

    exists: function(domain, query, callback) {
        mongoose.model(domain).findOne(query, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            if (data === null) {
                return callback(null, {result: false});
            }
            return callback(null, {result: true});
        });
    }
};
