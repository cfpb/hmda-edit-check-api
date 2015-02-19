'use strict';

var mongoose = require('mongoose');

module.exports = {
    exists: function(domain, query, callback) {
        mongoose.model(domain).count(query, function(err, count) {
            if (err) {
                return callback(err, null);
            }
            if (count) {
                return callback(null, {result: true});
            }
            return callback(null, {result: false});
        });
    }
};
