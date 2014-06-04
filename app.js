/*var cluster = require('cluster'),
    osInfo = require('os');


//Run server on several CPUs
if (cluster.isMaster) {
    for (var i = 1; i < osInfo.cpus().length; i++) {
        cluster.fork();
    }
} else {
    require('./src/server.js');
}*/
require('./src/server.js');
