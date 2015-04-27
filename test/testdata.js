'use strict';

var fs = require('fs');
var async = require('async');
var mongoose = require('mongoose');

var modelsPath = __dirname + '/../models';
fs.readdirSync(modelsPath).forEach(function(file) {
    require(modelsPath + '/' + file);
});

var TestData = {
    build: function(done) {
        console.log('Inserting test data...');
        async.series([
            function(cb) {
                mongoose.model('CraReporters').create(
                    {activity_year: '2013', respondent_id: '0000000001', agency_code: '1', respondent_name: 'foo'},
                function(err, item) {
                    cb();
                });
            },
            function(cb) {
                mongoose.model('Transmittal').create(
                    {activity_year: '2013', respondent_id: '0000000001', agency_code: '1', tax_id: '23-0916895',
                     timestamp: '2014-01-01T05:00:00Z'},
                function(err, item) {
                    cb();
                });
            },
            function(cb) {
                mongoose.model('Panel').create([
                    {activity_year: '2013', respondent_id: '0000000001', other_lender_code: '0', parent_name: 'foo', agency_code: '1'},
                    {activity_year: '2013', respondent_id: '0000000002', other_lender_code: '0', parent_name: '', agency_code: '1'},
                    {activity_year: '2013', respondent_id: '0000000003', other_lender_code: '1', parent_name: 'foo', agency_code: '2'},
                    {activity_year: '2013', respondent_id: '0000000004', other_lender_code: '1', parent_name: '', agency_code: '2'}
                ],
                function(err, item) {
                    cb();
                });
            },
            function(cb) {
                mongoose.model('Census').create([
                    {activity_year: '2013', msa_name: 'New Bern, NC', state_code: '37', county_code: '049', tract: '96.0600', msa_code: '35100', small_county: '0'},
                    {activity_year: '2013', msa_name: 'New Bern, NC', state_code: '37', county_code: '049', tract: '96.0700', msa_code: '35100', small_county: '0'},
                    {activity_year: '2013', msa_name: 'New Bern, NC', state_code: '37', county_code: '049', tract: '96.0800', msa_code: '35100', small_county: '0'},
                    {activity_year: '2013', msa_name: 'New Bern, NC', state_code: '37', county_code: '049', tract: '96.0900', msa_code: '35100', small_county: '0'},
                    {activity_year: '2013', msa_name: 'New Bern, NC', state_code: '37', county_code: '049', tract: '96.1001', msa_code: '35100', small_county: '0'},
                    {activity_year: '2013', msa_name: 'New Bern, NC', state_code: '37', county_code: '049', tract: '96.1002', msa_code: '35100', small_county: '0'},
                    {activity_year: '2013', msa_name: 'New Bern, NC', state_code: '37', county_code: '050', tract: '96.1100', msa_code: '35100', small_county: '1'},
                    {activity_year: '2013', msa_name: 'New Bern, NC', state_code: '37', county_code: '050', tract: '96.1201', msa_code: '35100', small_county: '1'},
                    {activity_year: '2013', msa_name: 'New Bern, NC', state_code: '37', county_code: '050', tract: '96.1202', msa_code: '35100', small_county: '1'},
                    {activity_year: '2013', msa_name: 'New Bern, NC', state_code: '37', county_code: '050', tract: '96.1301', msa_code: '35100', small_county: '1'},
                    {activity_year: '2013', msa_name: 'New Bern, NC', state_code: '37', county_code: '050', tract: '96.1302', msa_code: '35100', small_county: '1'}
                ],
                function(err, item) {
                    cb();
                });
            },
            function(cb) {
                mongoose.model('Lar').create([
                    {
                        activity_year: '2012',
                        respondent_id: '0201590731',
                        agency_code: '9',
                        totalLoans: '1000',
                        totalHomePurchaseLoans: '0',
                        soldHomePurchaseLoans: '0',
                        totalRefinanceLoans: '0',
                        soldRefinanceLoans: '0',
                        totalQ70: '0',
                        compareQ70: '0',
                        totalQ71: '0',
                        compareQ71: '0',
                        totalQ72: '0',
                        compareQ72: '0'
                    },
                    {
                        activity_year: '2012',
                        respondent_id: '1201547730',
                        agency_code: '9',
                        totalLoans: '499',
                        totalHomePurchaseLoans: '0',
                        soldHomePurchaseLoans: '0',
                        totalRefinanceLoans: '0',
                        soldRefinanceLoans: '0',
                        totalQ70: '0',
                        compareQ70: '0',
                        totalQ71: '0',
                        compareQ71: '0',
                        totalQ72: '0',
                        compareQ72: '0'
                    },
                    {
                        activity_year: '2012',
                        respondent_id: '0002590037',
                        agency_code: '9',
                        totalLoans: '10',
                        totalHomePurchaseLoans: '10',
                        soldHomePurchaseLoans: '6',
                        totalRefinanceLoans: '0',
                        soldRefinanceLoans: '0',
                        totalQ70: '0',
                        compareQ70: '0',
                        totalQ71: '0',
                        compareQ71: '0',
                        totalQ72: '0',
                        compareQ72: '0'
                    },
                    {
                        activity_year: '2012',
                        respondent_id: '1035818356',
                        agency_code: '9',
                        totalLoans: '10',
                        totalHomePurchaseLoans: '0',
                        soldHomePurchaseLoans: '0',
                        totalRefinanceLoans: '10',
                        soldRefinanceLoans: '5',
                        totalQ70: '0',
                        compareQ70: '0',
                        totalQ71: '0',
                        compareQ71: '0',
                        totalQ72: '0',
                        compareQ72: '0'
                    },
                    {
                        activity_year: '2012',
                        respondent_id: '0000413208',
                        agency_code: '9',
                        totalLoans: '10',
                        totalHomePurchaseLoans: '0',
                        soldHomePurchaseLoans: '0',
                        totalRefinanceLoans: '0',
                        soldRefinanceLoans: '0',
                        totalQ70: '10',
                        compareQ70: '2',
                        totalQ71: '0',
                        compareQ71: '0',
                        totalQ72: '0',
                        compareQ72: '0'
                    },
                    {
                        activity_year: '2012',
                        respondent_id: '0050413703',
                        agency_code: '9',
                        totalLoans: '4',
                        totalHomePurchaseLoans: '0',
                        soldHomePurchaseLoans: '0',
                        totalRefinanceLoans: '0',
                        soldRefinanceLoans: '0',
                        totalQ70: '0',
                        compareQ70: '0',
                        totalQ71: '4',
                        compareQ71: '1',
                        totalQ72: '0',
                        compareQ72: '0'
                    },
                    {
                        activity_year: '2012',
                        respondent_id: '0000413209',
                        agency_code: '9',
                        totalLoans: '4',
                        totalHomePurchaseLoans: '0',
                        soldHomePurchaseLoans: '0',
                        totalRefinanceLoans: '0',
                        soldRefinanceLoans: '0',
                        totalQ70: '0',
                        compareQ70: '0',
                        totalQ71: '0',
                        compareQ71: '0',
                        totalQ72: '4',
                        compareQ72: '1'
                    }
                ],
                function(err, item) {
                    cb();
                });
            },
            function(cb) {
                mongoose.model('MsaBranches').create([
                    {activity_year: '2013', agency_code: '1',  respondent_id: '0000000001', msa: ['00001', '00003', '00005', '00007', '00009']},
                    {activity_year: '2013', agency_code: '1',  respondent_id: '0000000002', msa: ['00002', '00004', '00006', '00008', '00010']}
                ],
                function(err, item) {
                    cb();
                });
            }
        ],
        function() {
            console.log('..done inserting test data');
            done();
        });
    }
};

module.exports = TestData;
