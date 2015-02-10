'use strict';

var mongoose = require('mongoose');

var censusSchema = mongoose.Schema({
    'type': String,
    'activity_year': String,
    'code': String,
    'name': String,
    'small_county': String,
    'state': [{
        'fips_code': String,
        'name': String
    }],
    'county': [{
        'fips_code': String,
        'name': String,
        'small_county': String
    }],
    'tract': [String]
});
censusSchema.index({'activity_year': 1, 'code': 1, 'type': 1, 'tract': 1});
censusSchema.index({'activity_year': 1, 'code': 1, 'type': 1, 'small_county': 1});
module.exports = mongoose.model('Census', censusSchema, 'census');
