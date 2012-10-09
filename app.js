
/**
 * Module dependencies.
 */

var express = require('express'),
    log4js  = require('log4js'),
    io      = require('socket.io'),
    fs      = require('fs');

var app = module.exports = express();

// Configuration


log4js.configure({
  appenders: [
    { type: 'file', filename: 'log/debug.log', category: 'debug' }
  , { type: 'file', filename: 'log/access.log', category: 'access'  }
  , { type: 'file', filename: 'log/error.log', category: 'error'  }
  ]
});

app.configure('development', function(){
  app.set('listen', 3000);
  app.set('socket.io', {
    url: 'localhost:3001',
    listen: 3001
  });

  app.use(express.logger(require('./debugLogger')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.set('listen', './tmp/sockets/express.sock');
  app.set('socket.io', {
    url: 'hadashikick.jp:3100',
    listen: 3101
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

// Routes

app.get('/', function(req, res){
  res.render('index', {
  });
});

console.log(app.listen(app.settings.listen, function() {
  if (typeof(app.settings.listen) == 'string') {
    fs.chmodSync(app.settings.listen, '777');
  }
}));

console.log("Express server listening on %s in %s mode",
            app.settings.listen, app.settings.env);
