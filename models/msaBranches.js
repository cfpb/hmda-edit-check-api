'use strict';

var mongoose = require('mongoose');

var msaBranchesSchema = mongoose.Schema({
    activity_year: String,
    respondent_id: String,
    respondent_name: String,
    msa: [String],
    agency_code: String
});
msaBranchesSchema.index({activity_year: 1, respondent_id: 1, agency_code: 1, msa: 1});
module.exports = mongoose.model('MsaBranches', msaBranchesSchema, 'msa_branches');
