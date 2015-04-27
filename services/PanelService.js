'use strict';

var Panel = require('../models/panel');

var exists = require('../lib/queryUtil').exists;

module.exports = {
    isChildFI: function(activityYear, agencyCode, respondentId, callback) {
        var query = {activity_year: activityYear, respondent_id: respondentId, agency_code: agencyCode, parent_name: {$ne: ''}, other_lender_code: {$ne: '5'}};
        exists('Panel', query, callback);
    },

    isRespondentMBS: function(activityYear, agencyCode, respondentId, callback) {
        var query = {activity_year: activityYear, respondent_id: respondentId, agency_code: agencyCode, parent_name: {$ne: ''}, other_lender_code: {$in: ['1', '2', '3']}};
        exists('Panel', query, callback);
    },

    isValidControlNumber: function(activityYear, agencyCode, respondentId, callback) {
        var query = {activity_year: activityYear, respondent_id: respondentId, agency_code: agencyCode};
        exists('Panel', query, callback);
    },

    isNotIndependentMortgageCoOrMBS: function(activityYear, agencyCode, respondentId, callback) {
        var query = { activity_year: activityYear, agency_code: agencyCode, respondent_id: respondentId, other_lender_code: { $in: ['0', '5'] } };
        exists('Panel', query, callback);
    }
};
