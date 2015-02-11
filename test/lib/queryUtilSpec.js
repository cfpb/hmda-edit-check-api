/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose'),

    queryUtil = require('../../lib/queryUtil');

describe('queryUtil', function() {
    describe('count', function() {
        it('should return err when there is a mongo error', function(done) {
            mockgoose.setMockReadyState(mongoose.connection, 0);

            queryUtil.count('Panel', {}, function(err, result) {
                expect(err).to.have.property('name');
                expect(err.name).to.be('MongoError');
                expect(result).to.be.null();
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done();
            });
        });
    });
});
