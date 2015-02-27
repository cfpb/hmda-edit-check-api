/*global describe:false, expect:false, it:false, beforeEach:false, afterEach:false, _:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose'),

    queryUtil = require('../../lib/queryUtil');

describe('queryUtil', function() {
    describe('exists', function() {
        it('should return err when there is a mongo error', function(done) {
            mockgoose.setMockReadyState(mongoose.connection, 0);

            queryUtil.exists('Panel', {}, function(err, result) {
                expect(err).to.have.property('name');
                expect(err.name).to.be('MongoError');
                expect(result).to.be.null();
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done();
            });
        });
    });

    describe('convertToKeyValue', function() {
        it('should use 0 for value when value is empty, since values are required in local db', function(done) {
            var data = [
                {
                    _id: {
                        msa_code: '36060',
                        msa_name: ''
                    }
                }
            ];
            var expected = [
                {
                    type: 'put',
                    key: 'census/msa_code/36060',
                    value: '0'
                }
            ];
            var keyParams = ['msa_code'];
            var value = 'msa_name';
            var result = queryUtil.convertToKeyValue('census', data, keyParams, value);
            expect(_.isEqual(result, expected)).to.be(true);
            done();
        });

        it('should convert for one keyParams and value', function(done) {
            var data = [
                {
                    _id: {
                        msa_code: '36060',
                        msa_name: 'Oak Hill, WV'
                    }
                },
                {
                    _id: {
                        msa_code: '43220',
                        msa_name: 'Shelton, WA'
                    }
                }
            ];
            var expected = [
                {
                    type: 'put',
                    key: 'census/msa_code/36060',
                    value: 'Oak Hill, WV'
                },
                {
                    type: 'put',
                    key: 'census/msa_code/43220',
                    value: 'Shelton, WA'
                }
            ];
            var keyParams = ['msa_code'];
            var value = 'msa_name';
            var result = queryUtil.convertToKeyValue('census', data, keyParams, value);
            expect(_.isEqual(result, expected)).to.be(true);
            done();
        });
        it('should convert for multiple keyParams and value', function(done) {
            var data = [
                {
                    _id: {
                        state_code: '01',
                        county_code: '02',
                        tract: '03',
                        msa_code: '36060',
                        msa_name: 'Oak Hill, WV'
                    }
                },
                {
                    _id: {
                        state_code: '03',
                        county_code: '02',
                        tract: '01',
                        msa_code: '43220',
                        msa_name: 'Shelton, WA'
                    }
                }
            ];
            var expected = [
                {
                    type: 'put',
                    key: 'census/state_code/01/county_code/02/tract/03/msa_code/36060',
                    value: 'Oak Hill, WV'
                },
                {
                    type: 'put',
                    key: 'census/state_code/03/county_code/02/tract/01/msa_code/43220',
                    value: 'Shelton, WA'
                }
            ];
            var keyParams = ['state_code', 'county_code', 'tract', 'msa_code'];
            var value = 'msa_name';
            var result = queryUtil.convertToKeyValue('census', data, keyParams, value);
            expect(_.isEqual(result, expected)).to.be(true);
            done();
        });
    });
});
