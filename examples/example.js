// Include our local copy of the SNPP client
var client = require('../lib/snpp');

// now we'll send a "page"
client.page({
    host: '127.0.0.1',
    port: 4444,
    message: {
        pager_id: '12345',
        text: 'Hello'
    }
}, function (result) {
    if (result.status === 'success') {
        console.log('Page succeeded!');
    } else {
        console.log('Error: ' + result.message);
    }
});
