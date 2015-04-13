'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash');

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
    },
    convertToKeyValue: function(keyPrefix, data, keyParams, valueParams) {
        return _.map(data, function(row) {
            var ob = { type: 'put', key: keyPrefix, value: {} };
            _.each(keyParams, function(param) {
                ob.key += '/' + param + '/' + row._id[param];
            });
            _.each(valueParams, function(param) {
                ob.value[param] = row._id[param];
            });
            return ob;
        });
    },
    buildAggregateQuery: function(year, keyParams, valueParams) {
        var match = { activity_year: year };
        var group = { _id: {} };
        _.each(keyParams, function(param) {
            match[param] = { $ne: '' };
            group._id[param] = '$' + param;
        });
        _.each(valueParams, function(param) {
            group._id[param] = '$' + param;
        });
        return [
            { $match: match },
            { $group: group }
        ];
    }
};
