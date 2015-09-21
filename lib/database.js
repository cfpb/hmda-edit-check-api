'use strict';

var mongoose = require('mongoose');

var ENV_HOST = process.env.HMDA_PILOT_MONGODB_HOST || process.env.HMDA_PILOT_MONGODB_PORT_27017_TCP_ADDR;
var ENV_PORT = process.env.HMDA_PILOT_MONGODB_PORT || process.env.HMDA_PILOT_MONGODB_PORT_27017_TCP_PORT;

var db = {
    configure: function(conf) {
        var HOST = ENV_HOST || conf.host;
        var PORT = ENV_PORT || conf.port;
        var DB = conf.database || 'hmda';
        var uri = 'mongodb://' + HOST + ':' + PORT + '/' + DB;
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
