'use strict';

var MsaBranches = require('../models/msaBranches');

var exists = require('../lib/queryUtil').exists;

module.exports = {
    isMetroAreaOnRespondentPanel: function(activityYear, agencyCode, respondentId, metroArea, callback) {
        var query = { activity_year: activityYear, agency_code: agencyCode, respondent_id: respondentId, msa: metroArea };
        return exists('MsaBranches', query, callback);
    },

    getMetroAreasOnRespondentPanel: function(activityYear, agencyCode, respondentId, callback) {
        var query = { activity_year: activityYear, agency_code: agencyCode, respondent_id: respondentId };

        return MsaBranches.findOne(query, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            if (data) {
                return callback(null, { msa: data.msa });
            }

            return callback(null, {msa: []});
        });
    }
};
