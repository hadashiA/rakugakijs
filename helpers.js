module.exports = function(app) {
  app.helpers({
    socketIOIncludeTag: function(host) {
      var socketIOUrl = 'http://' + host;
      return ''
        + '<script type="text/javascript">'
        + "var socketIOUrl = '" + socketIOUrl + "';"
        + '</script>'
        + '<script src="' + socketIOUrl + '/socket.io/socket.io.js"></script>';
    }
  });
};

