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

module.exports = mongoose.model('Lar', larSchema, 'lar');
