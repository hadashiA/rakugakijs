var fs     = require('fs'),
    path   = require('path'),
    mkdirp = require('mkdirp'),
    log4js = require('log4js'),
    logger = log4js.getLogger('debug');

(function() {
  var pngBase64Header = 'data:image/png;base64,';

  var ImageData = function(data) {
    this.data = data;
  };

  ImageData.prototype.isPNGBase64Encoded = function() {
    return this.data && this.data.lastIndexOf(pngBase64Header, 0) == 0;
  };

  ImageData.prototype.decode = function(data) {
    return new Buffer(this.data.substr(pngBase64Header.length), 'base64');
  };

  module.exports = function(app, io, paths) {
    function sendPNGByVersion(version, req, res) {
      list.get(version, 1, function(err, values) {
        var data = new ImageData(values[0]);

        if (!err && data.isPNGBase64Encoded()) {
          res.contentType('png');
          res.header('Content-Disposition: attachment;');
          res.send(data.decode());
        } else {
          res.send(404);
        }
      });
    }

    app.get('/rakugaki/:version([0-9]+)/*.png', function(req, res) {
      sendPNGByVersion(req.params.version, req, res);
    });

    paths.forEach(function(ns, i) {
      ns = '/rakugaki/' + ns;

      var paintersCount = 0,
          timerID;

      (function(io) {
        io.on('connection', function(socket) {
          paintersCount++;
          io.emit('painters count update', paintersCount);

          socket.on('stroke start', function(point) {
            socket.broadcast.volatile.json.emit('stroke start', point);
          });

          socket.on('stroke connect', function(point) {
            socket.broadcast.volatile.json.emit('stroke connect', point);
          });

          socket.on('stroke end', function(point) {
            socket.broadcast.volatile.json.emit('stroke end', point);
          });

          socket.on('save', function(dataURL) {
            var data = new ImageData(dataURL);

            if (data.isPNGBase64Encoded()) {
              clearTimeout(timerID);
              timerID = setTimeout(function() {
                var pngPath = path.resolve(path.join('public', ns)) + '.png';
                mkdirp(path.dirname(pngPath), 0755, function(err) {
                  if (err) {
                    logger.info(err);
                    return;
                  }
                  fs.writeFile(pngPath, data.decode());
                });
              }, 2000);
            }
          });

          socket.on('disconnect', function() {
            if (paintersCount > 0) paintersCount--;
            io.emit('painters count update', paintersCount);
          });
        });
      })(io.of(ns));  
    });
  };
})();
