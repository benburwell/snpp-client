require('should');

var client = require('../lib/snpp');

describe('Paging', function () {
    describe('level one connection', function () {
        it('should succeed', function () {
            client.page({
                host: 'localhost',
                port: '444'
            }, {
                id: '12345',
                message: 'This is a test message'
            }, function (result) {
                result.should.be.true;
            });
        });
    });
});
