/*jshint maxparams: 6 */
'use strict';

var LAR = require('../models/lar');

module.exports = {
    isValidNumHomePurchaseLoans: function(activityYear, newLoans, respondentID, callback) {
        activityYear = String(+activityYear - 1);
        var query = {
            'activity_year': activityYear, 
            'respondent_id': respondentID,
            'loan_purpose': '1',
            'action_type': {$in: ['1', '6']},
            'property_type': {$in: ['1', '2']},
            'purchaser_type': {$ne: '0'}
        };

        LAR.count(query, function(err, result) {
            if (err) {
                return callback(err, null);
            }

            var diff = (newLoans - result) / result;
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