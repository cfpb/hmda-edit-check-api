'use strict';

var mongoose = require('mongoose');

var censusSchema = mongoose.Schema({
    activity_year: String,
    msa_code: String,
    msa_name: String,
    state_code: String,
    county_code: String,
    small_county: String,
    tract: String
});
censusSchema.index({activity_year: 1, msa_code: 1, state_code: 1, county_code: 1, tract: 1});
censusSchema.index({activity_year: 1, state_code: 1, county_code: 1, tract: 1});
censusSchema.index({activity_year: 1, state_code: 1, county_code: 1, small_county: 1});
module.exports = mongoose.model('Census', censusSchema, 'census');
