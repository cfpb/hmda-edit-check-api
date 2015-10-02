'use strict';

var server,
    ip,
    port,
    app = require('./index'),
    http = require('http');

/*
 * Create and start HTTP server.
 */

ip = process.env.NODE_PILOT_IP || '0.0.0.0';
port = process.env.PILOT_PORT || 8000;
server = http.createServer(app);
server.listen(port, ip);
server.on('listening', function () {
    console.log('Server listening on http://%s:%d', this.address().address, this.address().port);
});
