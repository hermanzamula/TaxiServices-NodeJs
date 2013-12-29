var mongoose = require('mongoose');
var config = require(global.root(global.appConfig));

mongoose.connect(config.mongoose.uri);

module.exports = mongoose;