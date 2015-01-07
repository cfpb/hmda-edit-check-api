'use strict';

var mongoose = require('mongoose');

var censusSchema = mongoose.Schema({
    'type': String,
    'activity_year': String,
    'code': String,
    'name': String,
    'state': [{
        'fips_code': String,
        'name': String
    }],
    'county': [{
        'fips_code': String,
        'name': String
    }],
    'tract': [String]
});

module.exports = mongoose.model('Census', censusSchema, 'census');
