'use strict';

var mongoose = require('mongoose');

var larSchema = mongoose.Schema({
    activity_year: String,
    agency_code: String,
    respondent_id: String,
    totalLoans: String,
    totalHomePurchaseLoans: String,
    soldHomePurchaseLoans: String,
    totalRefinanceLoans: String,
    soldRefinanceLoans: String,
    totalQ70: String,
    compareQ70: String,
    totalQ71: String,
    compareQ71: String,
    totalQ72: String,
    compareQ72: String
});
larSchema.index({activity_year: 1, respondent_id: 1, agency_code: 1});
module.exports = mongoose.model('Lar', larSchema, 'lar');
