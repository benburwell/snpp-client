var sys = require('sys');
var net = require('net');

var defaults = {
    port: 444,
    host: 'localhost'
};

module.exports.page = function (options, callback) {

    // validate parameters
    if (options === undefined || options === null) {
        callback({
            status: 'error',
            message: 'message not defined'
        });

        return;
    }

    // create the network client
    var client = new net.Socket();
    var port = options.port || defaults.port;
    var host = options.host || defaults.host;

    // connect to the server
    client.connect(port, host, function () {});

    client.on('data', function (data) {
        var code = data.toString().substring(0, 3);
        var response = data.toString().substring(4);

        console.log(code + ': ' + response);
        
        if (code == 220) {
            client.write('PAGE ' + options.message.pager_id + "\r\n");
            client.write('MESS ' + options.message.text + "\r\n");
            client.write('SEND' + "\r\n");
            client.write('QUIT' + "\r\n");
        }

        if (code == 221) {
            client.destroy();
            callback({
                status: 'success',
                message: 'message sent'
            });
        }
    });
};
