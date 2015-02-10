/*jshint maxparams: 6 */
'use strict';

var LAR = require('../models/lar'),
    _ = require('underscore');

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
    isValidNumFannieLoans: function(activityYear, respondentID, currentLoans, currentFannieLoans, callback) {
        activityYear -= 1;
        var totalQuery = {
            'activity_year': activityYear, 
            'respondent_id': respondentID,
            'loan_purpose': {$in: ['1', '3']},
            'action_type': {$in: ['1', '6']},
            'property_type': {$in: ['1', '2']}
        };
        var fannieQuery = _.clone(totalQuery);
        fannieQuery.purchaser_type = {$in: ['1', '3']};

        var previousYearLoans,
            previousYearFannieLoans;

        LAR.count(totalQuery).exec()
        .then(function (data) {
            previousYearLoans = data;
            return LAR.count(fannieQuery).exec();
        })
        .then(function (data) {
            previousYearFannieLoans = data;
            var previousYearPercent = previousYearFannieLoans/previousYearLoans,
                currentPercent = currentFannieLoans/currentLoans;

            if (isNaN(previousYearPercent)) {
                previousYearPercent = 0;
            }
            if (isNaN(currentPercent)) {
                currentPercent = 0;
            }
            var result = {
                'previousYearLoans': previousYearLoans,
                'previousYearFannieLoans': previousYearFannieLoans,
                'result': false
            };

            // diff year to year can't be more than 10 percent, if over 10,000, 
            // then currentPercentage should be greater than 20 percent
            if (comparePercentages(previousYearPercent, currentPercent, 0.1) && 
                ((currentLoans>=10000 && currentPercent> 0.2) || currentLoans<10000)) {
                result.result = true;
            } 
            return callback(null, result);
                
        })
        .then(null, function (err) {
            return callback(err, null);
        });
    }
};