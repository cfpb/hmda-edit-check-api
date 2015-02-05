'use strict';

var Transmittal = require('../models/transmittal');

module.exports = {
    isValidTimestamp: function(activityYear, respondentID, timestamp, callback) {
        Transmittal.findOne({'activity_year': activityYear - 1, 'respondent_id': respondentID}, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            var result = {result: false};

            if (data !== null) {
                var year = timestamp.substring(0,4),
                    month = timestamp.substring(4,6),
                    day = timestamp.substring(6,8),
                    hour = timestamp.substring(8,10),
                    minute = timestamp.substring(10,12);
           
                var timestampDate = new Date(year, month - 1, day - 1, hour, minute);
          
                if (timestampDate > data.timestamp) {
                    result.result = true;
                }
            } 
            
            return callback(null, result);
        });
    },
    isTaxIDTheSameAsLastYear: function(activityYear, respondentID, taxID, callback) {
        Transmittal.findOne({'activity_year': activityYear - 1, 'respondent_id': respondentID, 'tax_id': taxID}, function(err, data) {
            if (err) {
                return callback(err, null);
            }

            if (data !== null) {
                return callback(null, {'result': true});
            }
            return callback(null, {'result': false});
        }); 
    }
};
