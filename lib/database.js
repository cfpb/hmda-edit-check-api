'use strict';

var mongoose = require('mongoose');

var db = {
    configure: function (conf) {
        var uri = 'mongodb://' + conf.host + ':' + conf.port + '/' + conf.database;
        var opts = {};
        if (conf.username) {
            opts.user = conf.username;
        }
        if (conf.password) {
            opts.pass = conf.password;
        }
        mongoose.connect(uri, opts);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'mongodb connection error:'));
        db.once('open', function callback() {
            console.log('mongodb connection open');
        });
    }
};


module.exports = db;