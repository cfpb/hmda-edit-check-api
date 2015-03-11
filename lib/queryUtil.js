'use strict';

var mongoose = require('mongoose'),
    _ = require('underscore');

var _CHUNK_SIZE = 5000;

var stringify = function(chunks) {
    return _.map(chunks, function(bit) {
        return JSON.stringify(bit);
    });
};

var chunks = function(array, size) {
  var results = [];
  while (array.length) {
    var chunk = stringify(array.splice(0, size));
    results.push(chunk);
  }
  return results;
};

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
        return chunks(_.map(data, function(row) {
            var ob = { type: 'put', key: keyPrefix, value: {} };
            _.each(keyParams, function(param) {
                ob.key += '/' + param + '/' + row._id[param];
            });
            _.each(valueParams, function(param) {
                ob.value[param] = row._id[param];
            });
            return ob;
        }), _CHUNK_SIZE);
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
