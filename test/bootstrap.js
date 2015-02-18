/*global before:false, after:false, expect:false, request:false, mock:false*/

/*
 * This will bootstrap our test environment
 */

'use strict';

global.expect = require('must');
global.request = require('supertest');
global.async = require('async');

var kraken = require('kraken-js'),
    express = require('express'),
    testdata = require('./testdata'),
    options = require('../lib/options'),
    mockgoose = require('mockgoose'),
    mongoose = require('mongoose');

function _setupTestData(done) {
    mockgoose.reset();
    testdata.build(done);
}

before(function(done) {
    mockgoose(mongoose);

    var app = express();
    app.use(kraken({
        basedir: process.cwd(),
        onconfig: options(app).onconfig
    }));

    global.mock = app.listen(1337);
    app.on('start', function() {
        _setupTestData(done);
    });

});


after(function(done){
    mock.close(done);
});
