require('should');

var net = require('net');
var client = require('../lib/snpp');

var options = {
    host: 'localhost',
    port: 4444
};

describe('Basic functionality', function () {
    it('opens a connection', function () {
        
        // create a test server
        var server = net.createServer(function (socket) {
            socket.end("221 OK, Goodbye\n");
        });

        // start server
        server.listen(4444, function () {
            console.log('test server started');

            // now try to connect
            client.connect(options, function (code, message) {
                code.should.equal(221);
            });

        });
    });
});

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
