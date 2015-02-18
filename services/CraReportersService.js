'use strict';

var CraReporters = require('../models/craReporters');

var count = require('../lib/queryUtil').count;

module.exports = {
    isCraReporter: function(activityYear, agencyCode, respondentId, callback) {
        var query = {'activity_year': activityYear, 'respondent_id': respondentId, 'agency_code': agencyCode};
        count('CraReporters', query, callback);
    }
};
