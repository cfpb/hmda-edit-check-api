/*jshint maxparams: 6 */
'use strict';

var LAR = require('../models/lar');

module.exports = {
    isValidNumHomePurchaseLoans: function(activityYear, loanCounts, respondentID, callback) {
        var query = {'activity_year': activityYear, 'respondent_id': respondentID};
        var queryPurchase = {
            'activity_year': activityYear, 
            'respondent_id': respondentID,
            'loan_purpose': '1',
            'action_type': {$in: ['1', '6']},
            'property_type': {$in: ['1', '2']}
        };

        var oldLoanCounts = {};
        LAR.count(query, function(err, result) {
            oldLoanCounts.numLoans = result;
        }).count(queryPurchase, function(err, result) {
            oldLoanCounts.numPurchaseLoans = result;
            var oldPercent = oldLoanCounts.numPurchaseLoans / oldLoanCounts.numLoans,
                newPercent = loanCounts.numPurchaseLoans / loanCounts.numLoans;

            if ((newPercent - oldPercent) > 0.2 || (newPercent - oldPercent < -0.2)) {
                return callback(null, {'result': false});
            }
            return callback(null, {'result': true});
        });
    }
};