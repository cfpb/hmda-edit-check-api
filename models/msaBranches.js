'use strict';

var mongoose = require('mongoose');

var msaBranchesSchema = mongoose.Schema({
    'activity_year': String,
    'respondent_id': String,
    'respondent_name': String,
    'msa': [String]
});

module.exports = mongoose.model('MsaBranches', msaBranchesSchema, 'msa_branches');
