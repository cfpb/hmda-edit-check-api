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
    var diff = newPercentage - oldPercentage;
    if (diff < threshold) {
        return false;
    }
    return true;
};

var calculateYearOnYearLoans = function (currentLoans, currentSoldLoans,
            totalQuery, purchaserQuery, loanParameters, callback) {
    var previousYearLoans,
        previousYearSoldLoans;

    LAR.count(totalQuery).exec()
    .then(function (data) {
        previousYearLoans = data;
        return LAR.count(purchaserQuery).exec();
    })
    .then(function (data) {
        previousYearSoldLoans = data;
        var previousYearPercent = previousYearSoldLoans/previousYearLoans,
            currentPercent = currentSoldLoans/currentLoans;

        if (isNaN(previousYearPercent)) {
            previousYearPercent = 0;
        }
        if (isNaN(currentPercent)) {
            currentPercent = 0;
        }
        var result = {
            'Previous Year Loans': previousYearLoans,
            'Previous Year Sold Loans': previousYearSoldLoans,
            'Previous Year Percentage' : previousYearPercent,
            'Current Year Loans': currentLoans,
            'Current Year Sold Loans': currentSoldLoans,
            'Current Year Percentage' : currentPercent,
            'result': false
        };

        // diff year to year can't be more than threshold, if over largeNum, 
        // then currentPercentage should be greater than minPercent
        if (comparePercentages(currentPercent, previousYearPercent, loanParameters.diffPercent) && 
            ((currentLoans>=loanParameters.threshold && currentPercent> loanParameters.minPercent) || currentLoans<loanParameters.threshold)) {
            result.result = true;
        } 
        return callback(null, result);
                
    })
    .then(null, function (err) {
        return callback(err, null);
    });
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
            'loan_type': '1',
            'loan_purpose': {$in: ['1', '3']},
            'action_type': {$in: ['1', '6']},
            'property_type': {$in: ['1', '2']}
        };
        var fannieQuery = _.clone(totalQuery);
        fannieQuery.purchaser_type = {$in: ['1', '3']};

        var loanParameters = {
            diffPercent: -0.1,
            threshold: 10000,
            minPercent: 0.2
        };

        return calculateYearOnYearLoans (currentLoans, currentFannieLoans,
            totalQuery, fannieQuery, loanParameters, callback);
    },
    isValidNumGinnieMaeFHALoans: function(activityYear, respondentID, currentLoans, currentGinnieLoans, callback) {
        activityYear -= 1;
        var totalQuery = {
            'activity_year': activityYear, 
            'respondent_id': respondentID,
            'loan_type': '2',   
            'loan_purpose': {$in: ['1', '3']},
            'action_type': {$in: ['1', '6']},
            'property_type': {$in: ['1', '2']}
        };
        var ginnieQuery = _.clone(totalQuery);
        ginnieQuery.purchaser_type = '2';

        var loanParameters = {
            diffPercent: -0.1,
            threshold: 2500,
            minPercent: 0.3
        };

        return calculateYearOnYearLoans (currentLoans, currentGinnieLoans,
            totalQuery, ginnieQuery, loanParameters, callback);
    },
    isValidNumGinnieMaeVALoans: function(activityYear, respondentID, currentLoans, currentGinnieLoans, callback) {
        activityYear -= 1;
        var totalQuery = {
            'activity_year': activityYear, 
            'respondent_id': respondentID,
            'loan_purpose': {$in: ['1', '3']},
            'action_type': {$in: ['1', '6']},
            'property_type': {$in: ['1', '2']},
            'loan_type': '3'
        };
        var ginnieQuery = _.clone(totalQuery);
        ginnieQuery.purchaser_type = '2';

        var loanParameters = {
            diffPercent: -0.1,
            threshold: 2000,
            minPercent: 0.3
        };

        return calculateYearOnYearLoans (currentLoans, currentGinnieLoans,
            totalQuery, ginnieQuery, loanParameters, callback);
    }
};