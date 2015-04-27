'use strict';

var mongoose = require('mongoose');

var panelSchema = mongoose.Schema({
    activity_year: String,
    respondent_id: String,
    agency_code: String,
    respondent_name: String,
    parent_name: String,
    parent_city: String,
    parent_state: String,
    other_lender_code: String
});
panelSchema.index({activity_year: 1, respondent_id: 1, agency_code: 1, other_lender_code: 1, parent_name: 1});
module.exports = mongoose.model('Panel', panelSchema, 'panel');
