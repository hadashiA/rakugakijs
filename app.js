
/**
 * Module dependencies.
 */

var express  = require('express'),
    http     = require('http'),
    log4js   = require('log4js'),
    fs       = require('fs');

var app = module.exports = express();
var server = http.createServer(app);

// Configuration

log4js.configure({
  appenders: [
    { type: 'file', filename: 'log/debug.log', category: 'debug' }
  , { type: 'file', filename: 'log/access.log', category: 'access'  }
  , { type: 'file', filename: 'log/error.log', category: 'error'  }
  ]
});

app.engine('html', require('hogan-express'));

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.set('layout', 'layout');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.logger(require('./debugLogger')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.locals({
    host: 'localhost'
  });
});

app.configure('production', function(){
  app.use(log4js.connectLogger(log4js.getLogger('access'), {
    level: log4js.levels.INFO
  }));
  app.use(express.errorHandler());
  app.locals({
    host: 'hadashikick.jp'
  });
});


// socket.io

var io = require('socket.io').listen(server);
io.enable('browser client minification');

io.configure('production', function() {
  io.enable('browser client etag');;
  io.set('log level', 1);
});

io.configure('development', function() {
  io.set('log level', 2);
});

// libs

require('./rakugaki')(app, io, ['index']);

// Routes

app.get('/', function(req, res){
  res.render('index', {
  });
});

server.listen(3000, function() {
  console.log("Express server listening onport:3000");
});
