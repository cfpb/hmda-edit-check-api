'use strict';

var mongoose = require('mongoose');

var transmittalSchema = mongoose.Schema({
    'activity_year': String,
    'respondent_id': String,
    'tax_id': String,
    'timestamp': Date
});
transmittalSchema.index({'activity_year': 1, 'respondent_id': 1, 'tax_id': 1});
module.exports = mongoose.model('Transmittal', transmittalSchema, 'transmittal');
