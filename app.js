function root(path) {
    return __dirname + "/" + path;
}
global.root = root;
global.appConfig = "config";

var express = require('express');
var http = require('http');
var config = require(root(global.appConfig));

var app = express();

// all environments
app.set('port', config.port);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require(root("controller/driver-controller"))(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


