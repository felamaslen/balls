/**
 * Entry point for server
 */

require('./server')().then(server => {
    console.log('Server running on port', server.port);
});

