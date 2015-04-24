'use strict';

var engine = require('hmda-rule-engine');
var EngineCustomDataLookupConditions = require('../lib/engine/engineCustomDataLookupConditions');

module.exports = {
    runLar: function(activityYear, lar, callback) {
        var currEngine = new engine.constructor();
        EngineCustomDataLookupConditions.call(currEngine);

        currEngine.runLar(activityYear, lar)
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err.message, null);
        });
    },
    runLarType: function(activityYear, editType, lar, callback) {
        var currEngine = new engine.constructor();
        EngineCustomDataLookupConditions.call(currEngine);

        currEngine.runLarType(activityYear, editType, lar)
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err.message, null);
        });
    }
};
