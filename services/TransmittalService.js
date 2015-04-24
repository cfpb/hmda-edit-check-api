'use strict';

var Transmittal = require('../models/transmittal'),
        moment = require('moment');

module.exports = {
    isValidTimestamp: function(activityYear, agencyCode, respondentID, timestamp, callback) {
        Transmittal.findOne({activity_year: activityYear - 1, agency_code: agencyCode, respondent_id: respondentID}, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            var result = {result: false};

            if (data !== null) {
                var timestampDate = moment(timestamp, 'YYYYMMDDHHmm', true).subtract(1, 'days').toDate();

                if (timestampDate > data.timestamp) {
                    result.result = true;
                }
            }

            return callback(null, result);
        });
    },
    isTaxIDTheSameAsLastYear: function(activityYear, agencyCode, respondentID, taxID, callback) {
        Transmittal.findOne({activity_year: activityYear - 1, agency_code: agencyCode, respondent_id: respondentID}, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            var result = {
                agencyCode: agencyCode,
                respondentID: respondentID,
                taxID: taxID,
                'Previous Year Tax ID': '',
                result: false
            };
            if (data !== null) {
                result['Previous Year Tax ID'] = data.tax_id;
                if (data.tax_id === taxID) {
                    result.result = true;
                }
            }
            return callback(null, result);
        });
    }
};
