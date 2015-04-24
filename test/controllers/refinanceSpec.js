/*global describe:false, it:false, beforeEach:false, afterEach:false, request:false, mock:false, async:false*/
'use strict';

var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

describe('/isValidNumLoans/refinance', function() {
    it('should return false for an invalid number of refinance loans', function(done) {
        request(mock)
            .get('/isValidNumLoans/refinance/2013/9/1035818356/10/3')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/"result":false/)

            .end(function(err, res) {
                done(err);
            });
    });

    it('should return a 500 if there is a problem', function(done) {
        mockgoose.setMockReadyState(mongoose.connection, 0);

        request(mock)
            .get('/isValidNumLoans/refinance/2013/9/0002590037/10/5')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(/"code":/)
            .end(function(err, res) {
                mockgoose.setMockReadyState(mongoose.connection, 1);
                done(err);
            });
    });
});
