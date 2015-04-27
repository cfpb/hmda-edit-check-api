'use strict';

var mongoose = require('mongoose');

var craReportersSchema = mongoose.Schema({
    activity_year: String,
    respondent_id: String,
    agency_code: String,
    respondent_name: String
});
craReportersSchema.index({activity_year: 1, respondent_id: 1, agency_code: 1});
module.exports = mongoose.model('CraReporters', craReportersSchema, 'cra_reporters');
