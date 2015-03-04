'use strict';

var fs = require('fs');
var async = require('async');
var mongoose = require('mongoose');

var models_path = __dirname + '/../models';
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
});

var TestData = {
    build: function(done) {
        console.log('Inserting test data...');
        async.series([
            function(cb) {
                mongoose.model('CraReporters').create(
                    {'activity_year': '2013', 'respondent_id': '0000000001', 'agency_code': '1', 'respondent_name': 'foo' },
                function(err, item) {
                    cb();
                });
            },
            function(cb) {
                mongoose.model('Transmittal').create(
                    {'activity_year': '2013', 'respondent_id': '0000000001', 'agency_code': '1', 'tax_id': '23-0916895',
                     'timestamp': '2014-01-01T05:00:00Z'},
                function(err, item) {
                    cb();
                });
            },
            function(cb) {
                mongoose.model('Panel').create([
                    { 'activity_year': '2013', 'respondent_id': '0000000001', 'other_lender_code': '0', 'parent_name': 'foo', 'agency_code': '1' },
                    { 'activity_year': '2013', 'respondent_id': '0000000002', 'other_lender_code': '0', 'parent_name': '', 'agency_code': '1' },
                    { 'activity_year': '2013', 'respondent_id': '0000000003', 'other_lender_code': '1', 'parent_name': 'foo', 'agency_code': '2' },
                    { 'activity_year': '2013', 'respondent_id': '0000000004', 'other_lender_code': '1', 'parent_name': '', 'agency_code': '2' }
                ],
                function(err, item) {
                    cb();
                });
            },
            function(cb) {
                mongoose.model('Census').create([
                  {  'activity_year' : '2013', 'msa_name' : 'New Bern, NC', 'state_code' : '37', 'county_code' : '049', 'tract' : '96.0600', 'msa_code' : '35100', 'small_county' : '0' },
{  'activity_year' : '2013', 'msa_name' : 'New Bern, NC', 'state_code' : '37', 'county_code' : '049', 'tract' : '96.0700', 'msa_code' : '35100', 'small_county' : '0' },
{  'activity_year' : '2013', 'msa_name' : 'New Bern, NC', 'state_code' : '37', 'county_code' : '049', 'tract' : '96.0800', 'msa_code' : '35100', 'small_county' : '0' },
{  'activity_year' : '2013', 'msa_name' : 'New Bern, NC', 'state_code' : '37', 'county_code' : '049', 'tract' : '96.0900', 'msa_code' : '35100', 'small_county' : '0' },
{  'activity_year' : '2013', 'msa_name' : 'New Bern, NC', 'state_code' : '37', 'county_code' : '049', 'tract' : '96.1001', 'msa_code' : '35100', 'small_county' : '0' },
{  'activity_year' : '2013', 'msa_name' : 'New Bern, NC', 'state_code' : '37', 'county_code' : '049', 'tract' : '96.1002', 'msa_code' : '35100', 'small_county' : '0' },
{  'activity_year' : '2013', 'msa_name' : 'New Bern, NC', 'state_code' : '37', 'county_code' : '050', 'tract' : '96.1100', 'msa_code' : '35100', 'small_county' : '1' },
{  'activity_year' : '2013', 'msa_name' : 'New Bern, NC', 'state_code' : '37', 'county_code' : '050', 'tract' : '96.1201', 'msa_code' : '35100', 'small_county' : '1' },
{  'activity_year' : '2013', 'msa_name' : 'New Bern, NC', 'state_code' : '37', 'county_code' : '050', 'tract' : '96.1202', 'msa_code' : '35100', 'small_county' : '1' },
{  'activity_year' : '2013', 'msa_name' : 'New Bern, NC', 'state_code' : '37', 'county_code' : '050', 'tract' : '96.1301', 'msa_code' : '35100', 'small_county' : '1' },
{  'activity_year' : '2013', 'msa_name' : 'New Bern, NC', 'state_code' : '37', 'county_code' : '050', 'tract' : '96.1302', 'msa_code' : '35100', 'small_county' : '1' }
                ],
                function(err, item) {
                  cb();
                });
            },
            function(cb) {
              mongoose.model('Lar').create([
                {
                  'activity_year': '2012',
                  'respondent_id': '0002590037',
                  'agency_code': '9',
                  'loan_type': '1',
                  'loan_purpose': '1',
                  'loan_amount': '00110',
                  'action_type': '6',
                  'purchaser_type': '0',
                  'property_type': '1'
                },
                {
                  'activity_year': '2012',
                  'respondent_id': '0002590037',
                  'agency_code': '9',
                  'loan_type': '1',
                  'loan_purpose': '1',
                  'loan_amount': '00110',
                  'action_type': '6',
                  'purchaser_type': '0',
                  'property_type': '1'
                },
                {
                  'activity_year': '2012',
                  'respondent_id': '0002590037',
                  'agency_code': '9',
                  'loan_type': '1',
                  'loan_purpose': '1',
                  'loan_amount': '00110',
                  'action_type': '6',
                  'purchaser_type': '0',
                  'property_type': '1'
                },
                {
                  'activity_year': '2012',
                  'respondent_id': '0002590037',
                  'agency_code': '9',
                  'loan_type': '1',
                  'loan_purpose': '1',
                  'loan_amount': '00110',
                  'action_type': '6',
                  'purchaser_type': '0',
                  'property_type': '1'
                },
                {
                  'activity_year': '2012',
                  'respondent_id': '0002590037',
                  'agency_code': '9',
                  'loan_type': '1',
                  'loan_purpose': '1',
                  'loan_amount': '00110',
                  'action_type': '6',
                  'purchaser_type': '1',
                  'property_type': '1'
                },
                {
                  'activity_year': '2012',
                  'respondent_id': '0002590037',
                  'agency_code': '9',
                  'loan_type': '1',
                  'loan_purpose': '1',
                  'loan_amount': '00110',
                  'action_type': '1',
                  'purchaser_type': '2',
                  'property_type': '2'
                },
                {
                  'activity_year': '2012',
                  'respondent_id': '0002590037',
                  'agency_code': '9',
                  'loan_type': '1',
                  'loan_purpose': '1',
                  'loan_amount': '00110',
                  'action_type': '1',
                  'purchaser_type': '2',
                  'property_type': '2'
                },
                {
                  'activity_year': '2012',
                  'respondent_id': '0002590037',
                  'agency_code': '9',
                  'loan_type': '1',
                  'loan_purpose': '1',
                  'loan_amount': '00110',
                  'action_type': '1',
                  'purchaser_type': '2',
                  'property_type': '2'
                },
                {
                  'activity_year': '2012',
                  'respondent_id': '0002590037',
                  'agency_code': '9',
                  'loan_type': '1',
                  'loan_purpose': '1',
                  'loan_amount': '00110',
                  'action_type': '1',
                  'purchaser_type': '2',
                  'property_type': '2'
                },
                {
                  'activity_year': '2012',
                  'respondent_id': '0002590037',
                  'agency_code': '9',
                  'loan_type': '1',
                  'loan_purpose': '1',
                  'loan_amount': '00110',
                  'action_type': '1',
                  'purchaser_type': '2',
                  'property_type': '2'
                }
              ],
              function(err, item) {
                cb();
              });
            },
            function (cb) {
              var sampleLar = {
                'activity_year': '2012',
                'respondent_id': '0000413208',
                'agency_code': '9',
                'loan_type': '1',
                'loan_purpose': '3',
                'loan_amount': '00110',
                'action_type': '1',
                'purchaser_type': '2',
                'property_type': '2'
              };
              var sampleLar2 = {
                'activity_year': '2012',
                'respondent_id': '0000413208',
                'agency_code': '9',
                'loan_type': '1',
                'loan_purpose': '3',
                'loan_amount': '00110',
                'action_type': '1',
                'purchaser_type': '3',
                'property_type': '2'
              };
              var lars = [];
              for (var i = 0; i < 5; i++) {
                lars.push(sampleLar);
              }
              lars.push(sampleLar2);

              mongoose.model('Lar').create(lars, function(err, item) {});

              sampleLar.respondent_id = '0050413703';
              sampleLar.loan_type = '2';
              sampleLar2.respondent_id = '0050413703';
              sampleLar2.loan_type = '2';
              lars = [];

              for (var j = 0; j < 3; j++) {
                lars.push(sampleLar2);
              }
              lars.push(sampleLar);

              mongoose.model('Lar').create(lars, function(err, item) {});

              sampleLar.respondent_id = '0000413209';
              sampleLar.loan_type = '3';
              sampleLar2.respondent_id = '0000413209';
              sampleLar2.loan_type = '3';
              lars = [];

              for (j = 0; j < 3; j++) {
                lars.push(sampleLar2);
              }
              lars.push(sampleLar);

              mongoose.model('Lar').create(lars, function(err, item) {
                cb();
              });
            },
            function(cb) {
                mongoose.model('MsaBranches').create([
                    {'activity_year': '2013', 'agency_code': '1',  'respondent_id': '0000000001', 'msa': ['00001']},
                    {'activity_year': '2013', 'agency_code': '1',  'respondent_id': '0000000002', 'msa': ['00002']}
                ],
                function(err, item) {
                    cb();
                });
            }
        ], function() {
              console.log('..done inserting test data');
              done();
           }
        );
    },
    addLargeSets: function(done) {
        console.log('Inserting large test data...');
        async.series([
          function(cb) {
              var lars = [],
                  sampleLar = {
                    'activity_year': '2012',
                    'respondent_id': '0201590731',
                    'agency_code': '9',
                    'loan_type': '1',
                    'loan_purpose': '1',
                    'loan_amount': '00110',
                    'action_type': '1',
                    'purchaser_type': '2',
                    'property_type': '2'
                  },
                  sampleLar2 = {
                    'activity_year': '2012',
                    'respondent_id': '0201590731',
                    'agency_code': '9',
                    'loan_type': '1',
                    'loan_purpose': '1',
                    'loan_amount': '00110',
                    'action_type': '1',
                    'purchaser_type': '0',
                    'property_type': '2'
                  };

              for (var i = 0; i < 1000; i++) {
                lars.push(sampleLar);
              }
              mongoose.model('Lar').create(lars, function(err, item) {});

              sampleLar.respondent_id = '1201547730';
              lars = [];

              for (var j = 0; j < 499; j++) {
                lars.push(sampleLar);
              }

              mongoose.model('Lar').create(lars, function(err, item) {});

              sampleLar.respondent_id = '1035818356';
              sampleLar.loan_purpose = '3';
              sampleLar2.respondent_id = '1035818356';
              sampleLar2.loan_purpose = '3';
              lars = [];

              for (var k = 0; k < 5; k++) {
                lars.push(sampleLar);
                lars.push(sampleLar2);
              }

              mongoose.model('Lar').create(lars, function(err, item) {
                cb();
              });
            }
        ], function() {
            console.log('Done inserting large test data');
            done();
        });
    }
};

module.exports = TestData;
