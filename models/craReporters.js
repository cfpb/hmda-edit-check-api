'use strict';

var mongoose = require('mongoose');

var craReportersSchema = mongoose.Schema({
    'activity_year': String,
    'data': [{
        'respondent_id': String,
        'agency_code': String,
        'respondent_name': String
    }]
});

module.exports = mongoose.model('CraReporters', craReportersSchema, 'cra_reporters');
