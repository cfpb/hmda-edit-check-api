'use strict';

var fs = require('fs');
var _ = require('underscore'),
    superagent = require('superagent'),
    Promise = require('bluebird');

var dataGET = Promise.promisify(superagent.get);

function poll(url) {  
    return dataGET(url)
    .then(function(data) {
        if (data.body.results.length>0) {
            return data;
        }  
        return Promise.delay(url, 10000).then(poll);
    });
}

function buildDataAPIURI (activityYear,queryParams) {
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

var dataURI = 'https://api.consumerfinance.gov/data/hmda/slice/hmda_lar.json?&$where=as_of_year=';

var larAggregates = [
{dbLabel: 'totalLoans', queryParams: {}},
{dbLabel: 'totalHomePurchaseLoans', queryParams: {property_type:['1','2'], loan_purpose: '1', action_taken: ['1','6']}},
{dbLabel: 'soldHomePurchaseLoans', queryParams: {purchaser_type:{type: '>', value:'0'}, property_type:['1','2'], loan_purpose: '1', action_taken: ['1','6']}},
{dbLabel: 'ginnieQ72', queryParams: {property_type:['1','2'], loan_purpose: ['1','3'], loan_type: '3', action_taken: ['1','6'], purchaser_type: '2'}},
{dbLabel: 'totalRefinanceLoans', queryParams: {property_type:['1','2'], loan_purpose: '3', action_taken: ['1','6']}},
{dbLabel: 'soldRefinanceLoans', queryParams: {purchaser_type:{type: '>', value:'0'}, property_type:['1','2'], loan_purpose: '3', action_taken: ['1','6']}},
{dbLabel: 'totalQ70', queryParams: {property_type:['1','2'], loan_purpose: ['1','3'], loan_type: '1', action_taken: ['1','6']}},
{dbLabel: 'fannieQ70', queryParams: {property_type:['1','2'], loan_purpose: ['1','3'], loan_type: '1', action_taken: ['1','6'], purchaser_type: ['1','3']}},
{dbLabel: 'totalQ71', queryParams: {property_type:['1','2'], loan_purpose: ['1','3'], loan_type: '2', action_taken: ['1','6']}},
{dbLabel: 'ginnieQ71', queryParams: {property_type:['1','2'], loan_purpose: ['1','3'], loan_type: '2', action_taken: ['1','6'], purchaser_type: '2'}},
{dbLabel: 'totalQ72', queryParams: {property_type:['1','2'], loan_purpose: ['1','3'], loan_type: '3', action_taken: ['1','6']}}
];

Promise.map(larAggregates, function(aggregate) {
    var uri = buildDataAPIURI ('2013',aggregate.queryParams);
    return poll(uri);
}, { concurrency: 10 })
.then(function(result) {
    for (int i=0; i<larAggregates.length; i++) {
        console.log (result[0].body.results);
});

