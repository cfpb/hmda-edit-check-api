'use strict';

var fs = require('fs');
var _ = require('lodash'),
    superagent = require('superagent'),
    Promise = require('bluebird');

var dataGET = Promise.promisify(superagent.get);

var poll = function(url) { 
    return dataGET(url)
    .then(function(data) {
        if (data.body.results && data.body.results.length>0) {
            return data;
        }  
        return Promise.delay(url, 10000).then(poll);
    });
}

var buildDataAPIURI = function (activityYear,queryParams) {
    var uri = [];
    for (var key in queryParams) {
        if (queryParams[key] instanceof Array) {
            uri.push(key + '+IN+(' + queryParams[key].join() + ')');
        } else if (queryParams[key] instanceof Object) {
            uri.push(key + queryParams[key].type + queryParams[key].value);
        } else {
            uri.push(key + '=' + queryParams[key]);
        }
    }
    var finalURI = dataURI + activityYear;
    if (uri.length>0) {
        finalURI += '+AND+';
    }
    return finalURI + uri.join('+AND+') 
        + '&$select=respondent_id,agency_code,COUNT(sequence_number)&$group=respondent_id,agency_code&$limit=0&$orderBy=count_sequence_number+DESC';         
}

var getData = function (activityYear) {
    return Promise.map(larAggregates, function(aggregate) {
        var uri = buildDataAPIURI (activityYear,aggregate.queryParams);
        return poll(uri);
    }, { concurrency: 10 })
    .then(function(result) {
        // merge all the results from this year into a single array of results
        _.each(result, function (larResult, index) {
            _.each(larResult.body.results, function (respondentTotal) {
                var aggregateObj = {};
                var key = respondentTotal.respondent_id + '|' + respondentTotal.agency_code;
                aggregateObj[key] = {};
                aggregateObj[key][larAggregates[index].dbLabel] = respondentTotal.count_sequence_number.toString();
                _.merge(roughLARData,aggregateObj);
            });
        });
        // clean up the result a bit for putting into mongo
        _.each(roughLARData, function (respondentTotals, key) {
            var newObj = _.clone(respondentTotals);
            var keyVals = key.split('|');
            newObj['respondent_id'] = keyVals[0];
            newObj['agency_code'] = keyVals[1];
            newObj['activity_year'] = activityYear;
            for (var index=0; index<larAggregates.length; index++) {
                // fill with zeroes for missing entries for convenience of queries
                if (!_.has(newObj, larAggregates[index].dbLabel)) {
                    newObj[larAggregates[index].dbLabel] = '0';
                }
            }
            finalLARCollection.push(newObj);
        });
    });
}

var dataURI = 'http://api.consumerfinance.gov/data/hmda/slice/hmda_lar.json?&$where=as_of_year=';
var roughLARData = {};
var finalLARCollection;
var activityYears = ['2012', '2013'];
var larAggregates = [
    {dbLabel: 'totalLoans', queryParams: {}},
    {dbLabel: 'totalHomePurchaseLoans', queryParams: {property_type:['1','2'], loan_purpose: '1', action_taken: ['1','6']}},
    {dbLabel: 'soldHomePurchaseLoans', queryParams: {purchaser_type:{type: '>', value:'0'}, property_type:['1','2'], loan_purpose: '1', action_taken: ['1','6']}},
    {dbLabel: 'totalRefinanceLoans', queryParams: {property_type:['1','2'], loan_purpose: '3', action_taken: ['1','6']}},
    {dbLabel: 'soldRefinanceLoans', queryParams: {purchaser_type:{type: '>', value:'0'}, property_type:['1','2'], loan_purpose: '3', action_taken: ['1','6']}},
    {dbLabel: 'totalQ70', queryParams: {property_type:['1','2'], loan_purpose: ['1','3'], loan_type: '1', action_taken: ['1','6']}},
    {dbLabel: 'compareQ70', queryParams: {property_type:['1','2'], loan_purpose: ['1','3'], loan_type: '1', action_taken: ['1','6'], purchaser_type: ['1','3']}},
    {dbLabel: 'totalQ71', queryParams: {property_type:['1','2'], loan_purpose: ['1','3'], loan_type: '2', action_taken: ['1','6']}},
    {dbLabel: 'compareQ71', queryParams: {property_type:['1','2'], loan_purpose: ['1','3'], loan_type: '2', action_taken: ['1','6'], purchaser_type: '2'}},
    {dbLabel: 'totalQ72', queryParams: {property_type:['1','2'], loan_purpose: ['1','3'], loan_type: '3', action_taken: ['1','6']}},
    {dbLabel: 'compareQ72', queryParams: {property_type:['1','2'], loan_purpose: ['1','3'], loan_type: '3', action_taken: ['1','6'], purchaser_type: '2'}}
];


module.exports = {
    // retrieve individual aggregate results for every respondent and then merge into a single mongo collection
    retrieveData: function() {
        finalLARCollection = [];
        return Promise.map(activityYears, function(activityYear) {
            return getData(activityYear);
        })
        .then (function() {
            return finalLARCollection;
        })
    }
};



