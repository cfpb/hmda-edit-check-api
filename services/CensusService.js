'use strict';

var Census = require('../models/census');

module.exports = {
    isValidMSA: function(activityYear, msa, callback) {
        Census.find({ 'activity_year': activityYear, 'code' : msa }, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            var result = { result: false };
            if (data.length>0) {
                result.result = true;
            }
            return callback(null, result);
        });
    }
};
