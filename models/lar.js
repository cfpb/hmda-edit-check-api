'use strict';

var mongoose = require('mongoose');

var larSchema = mongoose.Schema({
    'activity_year': String,
    'respondent_id': String,
    'agency_code': String,
    'loan_type': String,
    'loan_purpose': String,
    'loan_amount': String,
    'action_type': String,
    'purchaser_type': String,
    'property_type': String
});
larSchema.index({'activity_year': 1, 'respondent_id': 1, 'agency_code': 1, 'loan_purpose': 1, 'action_type': 1, 'property_type': 1});
module.exports = mongoose.model('Lar', larSchema, 'lar');
