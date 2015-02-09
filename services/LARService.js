/*jshint maxparams: 6 */
'use strict';

var LAR = require('../models/lar');

var compareYearTotals = function(newLoans, oldLoans, percentage) {
    var diff = (newLoans - oldLoans) / oldLoans;
    if (isNaN(diff)) {
        return {'result': true};
    }
    if (diff > -percentage && diff < percentage) {
        return {'result': true};
    }
    return {'result': false};
};

var comparePercentages = function (newPercentage, oldPercentage, threshold) {
    var diff = Math.abs(newPercentage - oldPercentage);
    if (isNaN(diff)) {
        return false;
    }
    if (diff < threshold) {
        return true;
    }
    return false;
};

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
            var result = compareYearTotals(newLoans, oldLoans, 0.2);
            return callback(null, result);
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
            var result = compareYearTotals(newLoans, oldLoans, 0.2);
            return callback(null, result);
        });
    },
    isValidNumRefinanceLoans: function(activityYear, newLoans, respondentID, callback) {
        activityYear -= 1;
        var query = {
            'activity_year': activityYear, 
            'respondent_id': respondentID,
            'loan_purpose': '3',
            'action_type': {$in: ['1', '6']},
            'property_type': {$in: ['1', '2']},
            'purchaser_type': {$ne: '0'}
        };

        LAR.count(query, function(err, oldLoans) {
            if (err) {
                return callback(err, null);
            }

            var result = compareYearTotals(newLoans, oldLoans, 0.2);
            return callback(null, result);
        });
    },
    isValidNumFannieLoans: function(activityYear, newLoans, newFannieLoans, respondentID, callback) {
        activityYear -= 1;
        var query = {
            'activity_year': activityYear,
            'respondent_id': respondentID,
        };

        LAR.count(query, function(err, oldLoans) {
            if (err) {
                return callback(err, null);
            }
            
            // check that the percentage is 20% of last years
            if (oldLoans < 500 && newLoans < 500) {
                return callback(null, {'result': true});
            }
            var result = compareYearTotals(newLoans, oldLoans, 0.2);
            return callback(null, result);
        });
    }
};