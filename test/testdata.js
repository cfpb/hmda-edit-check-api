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
                mongoose.model('CraReporters').create({'activity_year': '2013',
                 'respondent_id': '0000000001', 'agency_code': '1', 'respondent_name': 'foo'
                 }, function(err, item) {
                    cb();
                });
            }
        ], function() {
              console.log('..done inserting test data');
              done();
           }
        );
    }
};

module.exports = TestData;
