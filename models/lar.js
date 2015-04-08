'use strict';

var mongoose = require('mongoose');

var larSchema = mongoose.Schema({
    'activity_year': String,
    'respondent_id': String,
    'totalLoans' : String,
    'soldHomePurchaseLoans' : String,
    'totalRefinanceLoans' : String,
    'soldRefinanceLoans' : String,
    'totalQ70' : String, 
    'fannieQ70' : String, 
    'totalQ71' : String, 
    'ginnieQ71' : String,
    'totalQ72' : String, 
    'ginnieQ72' : String
});
larSchema.index({'activity_year': 1, 'respondent_id': 1, 'agency_code': 1});
module.exports = mongoose.model('Lar', larSchema, 'lar');
