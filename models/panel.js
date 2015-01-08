'use strict';

var mongoose = require('mongoose');

var panelSchema = mongoose.Schema({
    'activity_year': String,
    'data': [{
        'respondent_id': String,
        'agency_code': String,
        'respondent_name': String,
        'parent_name': String,
        'parent_city': String,
        'parent_state': String,
        'other_lender_code': String
    }]
});

module.exports = mongoose.model('Panel', panelSchema, 'panel');
