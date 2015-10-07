'use strict';

var mongoose = require('mongoose');
var fs = require('fs');
var _ = require('lodash');
var Promise = require('bluebird');
var larAggregates = require('./laraggregates.js');
var ENV_HOST = process.env.HMDA_PILOT_MONGODB_HOST || process.env.HMDA_PILOT_MONGODB_PORT_27017_TCP_ADDR;
var ENV_PORT = process.env.HMDA_PILOT_MONGODB_PORT || process.env.HMDA_PILOT_MONGODB_PORT_27017_TCP_PORT;

var config;

var env = process.env.NODE_ENV;
if (env === 'test') {
    config = require('../config/test.json');
} else if (env === 'sandbox') {
    config = require('../config/sandbox.json');
} else if (env === 'dev' || env === 'development') {
    config = require('../config/development.json');
} else {
    config = require('../config/config.json');
}

var insertData = function(key, docs) {
    var deferred = Promise.defer();

    var batch = mongoose.model(key).collection.initializeOrderedBulkOp();
    _.each(docs, function(doc) {
        batch.insert(doc);
    });

    // Batch insert
    batch.execute(function(err, result) {
        if (err) {
            console.log('ERROR: could not insert data for ' + key);
            console.log(err);
            deferred.reject(err);
        } else {
            console.log('inserted ' + result.nInserted + ' records for ' + key);
            deferred.resolve();
        }
    });
    return deferred.promise;
};
var HOST = ENV_HOST || config.mongoConfig.host || '127.0.0.1';
var PORT = ENV_PORT || config.mongoConfig.port || '21717';
var DB = config.mongoConfig.database || 'hmda';
var uri = 'mongodb://' + HOST + ':' + PORT + '/' + DB;
var opts = {};
if (config.mongoConfig.username) {
    opts.user = config.mongoConfig.username;
}
if (config.mongoConfig.password) {
    opts.pass = config.mongoConfig.password;
}
mongoose.connect(uri, opts);
mongoose.connection.on('error', console.error.bind(console, 'mongodb connection error:'));
mongoose.connection.once('open', function(callback) {
    console.log('dropping database..');
    mongoose.connection.db.command( {dropDatabase:1}, function(err, result) {
        if (err) {
            console.log(err);
            process.exit(-1);
        }

        // Kill the current connection, then re-establish it after we've dropped the db
        // so it will recreate it on connect
        mongoose.connection.close();
        mongoose.connect(uri, opts);
        mongoose.connection.on('error', console.error.bind(console, 'mongodb connection error:'));
        mongoose.connection.once('open', function(callback) {
            console.log('adding data..');

            // Load the mongoose models so they get created
            var modelsPath = __dirname + '/../models';
            fs.readdirSync(modelsPath).forEach(function (file) {
                require(modelsPath + '/' + file);
            });

            // Now loop through the loaded models
            Promise.map(_.keys(mongoose.connections[0].base.modelSchemas), function(key) {
                var docs;
                if (key.toLowerCase() === 'lar') {
                    return larAggregates.retrieveData()
                    .then(function(data) {
                        return insertData(key, data);
                    });
                } else {
                    var filename = key.toLowerCase() + '.json';
                    var lines = fs.readFileSync(__dirname + '/' + filename, 'utf8').split('\n');
                    docs = lines.map(function(line) {
                        if (line) {
                            var data = JSON.parse(line);
                            delete data._id;
                            for (var prop in data) {
                                if (typeof data[prop] === 'object' && data[prop].$date !== undefined) {
                                    data[prop] = data[prop].$date;
                                }
                            }
                            return data;
                        } else {
                            return {};
                        }
                    });
                    return insertData(key, docs);
                }
            }, { concurrency: 10 })
            .then(function(result) {
                console.log('Done...');
                process.exit();
            });
        });
    });
});
