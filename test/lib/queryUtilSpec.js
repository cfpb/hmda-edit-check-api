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

        it('should convert for single keyParams and single valueParams', function(done) {
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
                    value: {
                        msa_name: 'Oak Hill, WV'
                    }
                },
                {
                    type: 'put',
                    key: 'census/msa_code/43220',
                    value: {
                        msa_name: 'Shelton, WA'
                    }
                }
            ];
            var keyParams = ['msa_code'];
            var valueParams = ['msa_name'];
            var result = queryUtil.convertToKeyValue('census', data, keyParams, valueParams);
            expect(_.isEqual(result, expected)).to.be(true);
            done();
        });
        it('should convert for single keyParams and multiple valueParams', function(done) {
            var data = [
                {
                    _id: {
                        msa_code: '36060',
                        msa_name: 'Oak Hill, WV',
                        small_county: '1'
                    }
                },
                {
                    _id: {
                        msa_code: '43220',
                        msa_name: 'Shelton, WA',
                        small_county: '0'
                    }
                }
            ];
            var expected = [
                {
                    type: 'put',
                    key: 'census/msa_code/36060',
                    value: {
                        msa_name: 'Oak Hill, WV',
                        small_county: '1'
                    }
                },
                {
                    type: 'put',
                    key: 'census/msa_code/43220',
                    value: {
                        msa_name: 'Shelton, WA',
                        small_county: '0'
                    }
                }
            ];
            var keyParams = ['msa_code'];
            var valueParams = ['msa_name', 'small_county'];
            var result = queryUtil.convertToKeyValue('census', data, keyParams, valueParams);
            expect(_.isEqual(result, expected)).to.be(true);
            done();
        });
        it('should convert for multiple keyParams and single valueParams', function(done) {
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
                    value:  {
                        msa_name: 'Oak Hill, WV'
                    }
                },
                {
                    type: 'put',
                    key: 'census/state_code/03/county_code/02/tract/01/msa_code/43220',
                    value: {
                        msa_name: 'Shelton, WA'
                    }
                }
            ];
            var keyParams = ['state_code', 'county_code', 'tract', 'msa_code'];
            var valueParams = ['msa_name'];
            var result = queryUtil.convertToKeyValue('census', data, keyParams, valueParams);
            expect(_.isEqual(result, expected)).to.be(true);
            done();
        });
        it('should convert for multiple keyParams and multiple values', function(done) {
            var data = [
                {
                    _id: {
                        state_code: '01',
                        county_code: '02',
                        tract: '03',
                        msa_code: '36060',
                        msa_name: 'Oak Hill, WV',
                        small_county: '1'
                    }
                },
                {
                    _id: {
                        state_code: '03',
                        county_code: '02',
                        tract: '01',
                        msa_code: '43220',
                        msa_name: 'Shelton, WA',
                        small_county: '0'
                    }
                }
            ];
            var expected = [
                {
                    type: 'put',
                    key: 'census/state_code/01/county_code/02/tract/03/msa_code/36060',
                    value:  {
                        msa_name: 'Oak Hill, WV',
                        small_county: '1'
                    }
                },
                {
                    type: 'put',
                    key: 'census/state_code/03/county_code/02/tract/01/msa_code/43220',
                    value: {
                        msa_name: 'Shelton, WA',
                        small_county: '0'
                    }
                }
            ];
            var keyParams = ['state_code', 'county_code', 'tract', 'msa_code'];
            var valueParams = ['msa_name', 'small_county'];
            var result = queryUtil.convertToKeyValue('census', data, keyParams, valueParams);
            expect(_.isEqual(result, expected)).to.be(true);
            done();
        });
    });

    describe('buildAggregateQuery', function() {
        it('should build proper query for single keyParams and single valueParams', function(done) {
            var expected = [
                {
                    $match: {
                        activity_year: '2013',
                        msa_code: {$ne: ''}
                    }
                },
                {
                    $group: {
                        _id: {
                            msa_code: '$msa_code',
                            msa_name: '$msa_name'
                        }
                    }
                }
            ];
            var keyParams = ['msa_code'];
            var valueParams = ['msa_name'];
            var result = queryUtil.buildAggregateQuery('2013', keyParams, valueParams);
            expect(_.isEqual(result, expected)).to.be(true);
            done();
        });

        it('should build proper query for multiple keyParams and single valueParams', function(done) {
            var expected = [
                {
                    $match: {
                        activity_year: '2013',
                        state_code: {$ne: ''},
                        county_code: {$ne: ''},
                        tract: {$ne: ''},
                        msa_code: {$ne: ''}
                    }
                },
                {
                    $group: {
                        _id: {
                            state_code: '$state_code',
                            county_code: '$county_code',
                            tract: '$tract',
                            msa_code: '$msa_code',
                            small_county: '$small_county'
                        }
                    }
                }
            ];
            var keyParams = ['state_code', 'county_code', 'tract', 'msa_code'];
            var valueParams = ['small_county'];
            var result = queryUtil.buildAggregateQuery('2013', keyParams, valueParams);
            expect(_.isEqual(result, expected)).to.be(true);
            done();
        });

        it('should build proper query for multiple keyParams and multiple valueParams', function(done) {
            var expected = [
                {
                    $match: {
                        activity_year: '2013',
                        state_code: {$ne: ''},
                        county_code: {$ne: ''},
                        tract: {$ne: ''}
                    }
                },
                {
                    $group: {
                        _id: {
                            state_code: '$state_code',
                            county_code: '$county_code',
                            tract: '$tract',
                            msa_code: '$msa_code',
                            small_county: '$small_county'
                        }
                    }
                }
            ];
            var keyParams = ['state_code', 'county_code', 'tract'];
            var valueParams = ['msa_code', 'small_county'];
            var result = queryUtil.buildAggregateQuery('2013', keyParams, valueParams);
            expect(_.isEqual(result, expected)).to.be(true);
            done();
        });
        it('should build proper query for multiple keyParams and multiple valueParams, with overlapping key/value params', function(done) {
            var expected = [
                {
                    $match: {
                        activity_year: '2013',
                        state_code: {$ne: ''},
                        county_code: {$ne: ''},
                        tract: {$ne: ''},
                        msa_code: {$ne: ''}
                    }
                },
                {
                    $group: {
                        _id: {
                            state_code: '$state_code',
                            county_code: '$county_code',
                            tract: '$tract',
                            msa_code: '$msa_code',
                            small_county: '$small_county'
                        }
                    }
                }
            ];
            var keyParams = ['state_code', 'county_code', 'tract', 'msa_code'];
            var valueParams = ['msa_code', 'small_county'];
            var result = queryUtil.buildAggregateQuery('2013', keyParams, valueParams);
            expect(_.isEqual(result, expected)).to.be(true);
            done();
        });
    });
});
