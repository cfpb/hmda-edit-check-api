'use strict';

var Panel = require('../models/panel');

var exists = require('../lib/queryUtil').exists;

module.exports = {
    isChildFI: function(activityYear, respondentId, callback) {
        var query = { 'activity_year': activityYear, 'respondent_id': respondentId, 'parent_name': { '$ne': '' }, 'other_lender_code': '0' };
        exists('Panel', query, callback);
    },

    isRespondentMBS: function(activityYear, respondentId, callback) {
        var query = { 'activity_year': activityYear, 'respondent_id': respondentId, 'parent_name': { '$ne': '' }, 'other_lender_code': { '$in': ['1', '2', '3'] } };
        exists('Panel', query, callback);
    },

    isValidControlNumber: function(activityYear, agencyCode, respondentId, callback) {
        var query = { 'activity_year': activityYear, 'agency_code': agencyCode, 'respondent_id': respondentId };
        exists('Panel', query, callback);
    }
};
