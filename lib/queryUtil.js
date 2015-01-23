'use strict';

module.exports = {
    count: function(domain, query, callback) {
        var domainModel = require('../models/' + domain);
        domainModel.count(query, function(err, count) {
            if (err) {
                return callback(err, null);
            }
            var result = { result: false };
            if (count) {
                result.result = true;
            }
            return callback(null, result);
        });
    }
};
