/*jshint maxparams: 6 */
'use strict';

var LAR = require('../models/lar');

var compareYearTotals = function(newLoans, oldLoans, percentage) {
    var diff = (newLoans - oldLoans) / oldLoans;
    var result = {
        'Previous Year Total Loans': oldLoans,
        'Current Year Total Loans': newLoans,
        '% Difference': (diff * 100).toFixed(2),
        result: false
    };
    if (isNaN(diff) || (diff > -percentage && diff < percentage)) {
        result.result = true;
    }
    return result;
};

var comparePercentages = function(newPercentage, oldPercentage, threshold, range) {
    var diff = (newPercentage - oldPercentage).toFixed(2);

    if (!range && diff < threshold) {
        return false;
    } else if (range && Math.abs(diff) >= threshold) {
        return false;
    }
    return true;
};

var checkValue = function(data, label) {
    if (data) {
        return data[label];
    } else {
        return 0;
    }
};

var calculateYearOnYearLoans = function(respondentInfo, currentLoans, currentSoldLoans,
            labels, loanParameters, callback) {
    var previousYearLoans,
        previousYearSoldLoans;

    LAR.findOne(respondentInfo).exec()
    .then(function(data) {
        previousYearLoans = checkValue(data, labels.total);
        previousYearSoldLoans = checkValue(data, labels.compare);
        var previousYearPercent = previousYearSoldLoans / previousYearLoans,
            currentPercent = currentSoldLoans / currentLoans;
        if (isNaN(previousYearPercent)) {
            previousYearPercent = 0;
        }
        if (isNaN(currentPercent)) {
            currentPercent = 0;
        }
        var result = {
            'Previous Year Loans': previousYearLoans,
            'Previous Year Sold Loans': previousYearSoldLoans,
            'Previous Year Percentage': (previousYearPercent * 100).toFixed(2),
            'Current Year Loans': currentLoans,
            'Current Year Sold Loans': currentSoldLoans,
            'Current Year Percentage': (currentPercent * 100).toFixed(2),
            '% Difference': ((currentPercent - previousYearPercent) * 100).toFixed(2),
            result: false
        };

        // diff year to year can't be more than threshold, if over largeNum,
        // then currentPercentage should be greater than minPercent
        if (loanParameters.threshold === undefined &&
                comparePercentages(currentPercent, previousYearPercent, loanParameters.diffPercent, true)) {
            result.result = true;
        } else if (comparePercentages(currentPercent, previousYearPercent, loanParameters.diffPercent, false) &&
            ((currentLoans >= loanParameters.threshold && currentPercent > loanParameters.minPercent) || currentLoans < loanParameters.threshold)) {
            result.result = true;
        }

        return callback(null, result);

    })
    .then(null, function(err) {
        return callback(err, null);
    });
};

module.exports = {
    isValidNumHomePurchaseLoans: function(activityYear, agencyCode, respondentID, currentLoans, currentSoldLoans, callback) {
        activityYear -= 1;
        var labels = {total:'totalHomePurchaseLoans', compare: 'soldHomePurchaseLoans'};

        var loanParameters = {
            diffPercent: 0.2
        };
        var respondentInfo = {
            activity_year: activityYear,
            respondent_id: respondentID,
            agency_code: agencyCode
        };

        return calculateYearOnYearLoans (respondentInfo, currentLoans, currentSoldLoans,
            labels, loanParameters, callback);
    },
    isValidNumLoans: function(activityYear, agencyCode, respondentID, newLoans, callback) {
        activityYear -= 1;
        var respondentInfo = {
            activity_year: activityYear,
            respondent_id: respondentID,
            agency_code: agencyCode
        };

        LAR.findOne(respondentInfo, function(err, previousYearTotals) {
            if (err) {
                return callback(err, null);
            }
            if (!previousYearTotals) {
                previousYearTotals = 0;
            }

            // Return a passing result if neither year has >= 500 loans
            if (previousYearTotals.totalLoans < 500 && newLoans < 500) {
                return callback(null, {result: true});
            }
            var result = compareYearTotals(newLoans, previousYearTotals.totalLoans, 0.2);
            return callback(null, result);
        });
    },
    isValidNumRefinanceLoans: function(activityYear, agencyCode, respondentID, currentLoans, currentSoldLoans, callback) {
        activityYear -= 1;
        var labels = {total:'totalRefinanceLoans', compare: 'soldRefinanceLoans'};

        var loanParameters = {
            diffPercent: 0.2
        };
        var respondentInfo = {
            activity_year: activityYear,
            respondent_id: respondentID,
            agency_code: agencyCode
        };

        return calculateYearOnYearLoans (respondentInfo, currentLoans, currentSoldLoans,
            labels, loanParameters, callback);
    },
    isValidNumFannieLoans: function(activityYear, agencyCode, respondentID, currentLoans, currentFannieLoans, callback) {
        activityYear -= 1;
        var labels = {total:'totalQ70', compare: 'compareQ70'};

        var loanParameters = {
            diffPercent: -0.1,
            threshold: 10000,
            minPercent: 0.2
        };
        var respondentInfo = {
            activity_year: activityYear,
            respondent_id: respondentID,
            agency_code: agencyCode
        };

        return calculateYearOnYearLoans (respondentInfo, currentLoans, currentFannieLoans,
            labels, loanParameters, callback);
    },
    isValidNumGinnieMaeFHALoans: function(activityYear, agencyCode, respondentID, currentLoans, currentGinnieLoans, callback) {
        activityYear -= 1;
        var labels = {total:'totalQ71', compare: 'compareQ71'};

        var loanParameters = {
            diffPercent: -0.1,
            threshold: 2500,
            minPercent: 0.3
        };
        var respondentInfo = {
            activity_year: activityYear,
            respondent_id: respondentID,
            agency_code: agencyCode
        };

        return calculateYearOnYearLoans (respondentInfo, currentLoans, currentGinnieLoans,
            labels, loanParameters, callback);
    },
    isValidNumGinnieMaeVALoans: function(activityYear, agencyCode, respondentID, currentLoans, currentGinnieLoans, callback) {
        activityYear -= 1;
        var labels = {total:'totalQ72', compare: 'compareQ72'};

        var loanParameters = {
            diffPercent: -0.1,
            threshold: 2000,
            minPercent: 0.3
        };
        var respondentInfo = {
            activity_year: activityYear,
            respondent_id: respondentID,
            agency_code: agencyCode
        };

        return calculateYearOnYearLoans (respondentInfo, currentLoans, currentGinnieLoans,
            labels, loanParameters, callback);
    }
};
