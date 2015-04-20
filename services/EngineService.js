'use strict';

var engine = require('hmda-rule-engine');
engine.setAPIURL('http://localhost:' + (process.env.PORT || '8000'));

module.exports = {
    runLar: function(activityYear, lar, callback) {
        engine.runLar(activityYear, lar)
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
    },
    runLarType: function(activityYear, lar, editType, callback) {
        engine.runLar(activityYear, editType, lar)
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
    }
};