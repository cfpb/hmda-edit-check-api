'use strict';

var mongoose = require('mongoose');

var transmittalSchema = mongoose.Schema({
    'activity_year': String,
    'data': [{
        'respondent_id': String,
        'tax_id': String
    }]
});

module.exports = mongoose.model('Transmittal', transmittalSchema, 'transmittal');
