
/**
 * Module dependencies.
 */

var express = require('express'),
    log4js  = require('log4js'),
    io      = require('socket.io'),
    fs      = require('fs');

var app = module.exports = express.createServer();

// Configuration


log4js.addAppender(log4js.fileAppender('log/debug.log'), 'debug');
log4js.addAppender(log4js.fileAppender('log/access.log'), 'access');
log4js.addAppender(log4js.fileAppender('log/system.log'), 'error');

app.configure('development', function(){
  app.set('listen', 3000);
  app.set('socket.io', {
    host: 'localhost:' + app.settings.listen,
    listen: app
  });

  app.use(express.logger(require('./debugLogger')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.set('listen', './tmp/sockets/express.sock');
  app.set('socket.io', {
    host: 'hadashikick.jp:6000',
    listen: 6001
  });

  app.use(log4js.connectLogger(log4js.getLogger('access'), {
    level: log4js.levels.INFO
  }));
  app.use(express.errorHandler()); 
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// socket.io

io = io.listen(app.settings['socket.io']['listen']);
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
require('./helpers')(app);

// Routes

app.get('/', function(req, res){
  res.render('index', {
  });
});

app.listen(app.settings.listen, function() {
  if (typeof(app.settings.listen) == 'string') {
    fs.chmodSync(app.settings.listen, '777');
  }
});

console.log("Express server listening on %s in %s mode",
            app.settings.port, app.settings.env);
