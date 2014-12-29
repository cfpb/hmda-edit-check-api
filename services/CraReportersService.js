'use strict';

var CraReporters = require('../models/craReporters');

module.exports = {
    isCraReporter: function(activityYear, respondentId, callback) {
        CraReporters.count({ 'activity_year': activityYear, 'data.respondent_id': respondentId }, function(err, count) {
            if (err) {
                return callback(err, null);
            }
            var result = { result: false };
            if (count) {
                result.result = true;
            }
            return callback(null, result);
        });
    }
};
