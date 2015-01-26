'use strict';

var Panel = require('../models/panel');

var count = require('../lib/queryUtil').count;

module.exports = {
    isChildFI: function(activityYear, respondentId, callback) {
        var query = { 'activity_year': activityYear, 'respondent_id': respondentId, 'parent_name': { '$ne': '' }, 'other_lender_code': '0' };
        count('Panel', query, callback);
    },

    isRespondentMBS: function(activityYear, respondentId, callback) {
        var query = { 'activity_year': activityYear, 'respondent_id': respondentId, 'parent_name': { '$ne': '' }, 'other_lender_code': { '$in': ['1', '2', '3'] } };
        count('Panel', query, callback);
    },

    isValidControlNumber: function(activityYear, agencyCode, respondentId, callback) {
        var query = { 'activity_year': activityYear, 'agency_code': agencyCode, 'respondent_id': respondentId };
        count('Panel', query, callback);
    }
};
