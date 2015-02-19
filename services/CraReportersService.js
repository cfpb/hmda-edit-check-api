'use strict';

var CraReporters = require('../models/craReporters');

var exists = require('../lib/queryUtil').exists;

module.exports = {
    isCraReporter: function(activityYear, respondentId, callback) {
        var query = { 'activity_year': activityYear, 'respondent_id': respondentId };
        exists('CraReporters', query, callback);
    }
};
