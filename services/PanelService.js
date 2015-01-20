'use strict';

var Panel = require('../models/panel');

var count = function(query, callback) {
    Panel.count(query, function(err, count) {
        if (err) {
            return callback(err, null);
        }
        var result = { result: false };
        if (count) {
            result.result = true;
        }
        return callback(null, result);
    });
};

module.exports = {
    isChildFI: function(activityYear, respondentId, callback) {
        var query = { 'activity_year': activityYear, 'respondent_id': respondentId, 'parent_name': { '$ne': '' }, 'other_lender_code': '0' };
        count(query, callback);
    },

    isRespondentMBS: function(activityYear, respondentId, callback) {
        var query = { 'activity_year': activityYear, 'respondent_id': respondentId, 'parent_name': { '$ne': '' }, 'other_lender_code': { '$in': ['1', '2', '3'] } };
        count(query, callback);
    },

    isValidControlNumber: function(activityYear, agencyCode, respondentId, callback) {
        var query = { 'activity_year': activityYear, 'agency_code': agencyCode, 'respondent_id': respondentId };
        count(query, callback);
    }
};
