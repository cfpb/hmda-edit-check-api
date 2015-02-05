/*jshint maxparams: 6 */
'use strict';

var LAR = require('../models/lar');

module.exports = {
    isValidNumHomePurchaseLoans: function(activityYear, newLoans, respondentID, callback) {
        activityYear -= 1;
        var query = {
            'activity_year': activityYear, 
            'respondent_id': respondentID,
            'loan_purpose': '1',
            'action_type': {$in: ['1', '6']},
            'property_type': {$in: ['1', '2']},
            'purchaser_type': {$ne: '0'}
        };

        LAR.count(query, function(err, oldLoans) {
            if (err) {
                return callback(err, null);
            }

            var diff = (newLoans - oldLoans) / oldLoans;
            if (isNaN(diff)) {
                return callback(null, {'result': true});
            }
            if (diff > -0.2 && diff < 0.2) {
                return callback(null, {'result': true});
            }
            return callback(null, {'result': false});
        });
    },
    isValidNumLoans: function(activityYear, newLoans, respondentID, callback) {
        activityYear -= 1;
        var query = {
            'activity_year': activityYear,
            'respondent_id': respondentID,
        };

        LAR.count(query, function(err, oldLoans) {
            if (err) {
                return callback(err, null);
            }

            // Return a passing result if neither year has >= 500 loans
            if (oldLoans < 500 && newLoans < 500) {
                return callback(null, {'result': true});
            }

            var diff = (newLoans - oldLoans) / oldLoans;
            if (isNaN(diff)) {
                return callback(null, {'result': true});
            }
            if (diff > -0.2 && diff < 0.2) {
                return callback(null, {'result': true});
            }
            return callback(null, {'result': false});
        });
    }
};