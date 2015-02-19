'use strict';

var exists = require('../lib/queryUtil').exists;

module.exports = {
    isMetroAreaOnRespondentPanel: function(activityYear, agencyCode, respondentId, metroArea, callback) {
        var query = { 'activity_year': activityYear, 'agency_code': agencyCode, 'respondent_id': respondentId, 'msa': metroArea };
        return exists('MsaBranches', query, callback);
    }
};
