'use strict';

var mongoose = require('mongoose'),
    _ = require('underscore');

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
    convertToKeyValue: function(keyPrefix, data, keyParams, value) {
        return _.map(data, function(row) {
            var ob = { type: 'put', key: keyPrefix, value: ''};
            _.each(keyParams, function(param) {
                ob.key += '/' + param + '/' + row._id[param];
            });
            ob.value = row._id[value] ? row._id[value] : '0';
            return ob;
        });
    },
    buildAggregateQuery: function(year, keyParams, value) {
        var group = { _id: {} };
        _.each(keyParams, function(param) {
            group._id[param] = '$' + param;
        });
        group._id[value] = '$' + value;
        return [
            { $match: { activity_year: year } },
            { $group: group }
        ];
    }
};
