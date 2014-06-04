var orm = require('orm');
var config = require(global.root(global.appConfig));


module.exports = function(options) {
    orm.connect(config.mysql.uri, options);
};