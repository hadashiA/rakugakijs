var clc = require('cli-color');

function plain(str) {
  return str;
}

module.exports = function(tokens, req, res) {
  var util   = require('util'),
      method = req.method,
      status = res.statusCode,
      style  = plain,
      color  = clc.green,
      params = '';
  
  if (!req.url.match(/\.(css|js|jpg|png|gif)$/)) {
    // style = clc.bold;
    style = clc.bgMagenta;
  }
  
  if (status >= 500) color = clc.red;
  else if (status >= 400) color = clc.yellow;
  else if (status >= 300) color = clc.cyan;
  
  if (method == 'POST') params = req.body;
  if (params) params = '\n  \033[90m' + util.inspect(params) + '\033[0m';
  
  // return '\033[90m' + method
  return style(
    method + ' ' + req.originalUrl + ' '
    + color(res.statusCode) + ' '
    + clc.underline(new Date - req._startTime)
    + 'ms'
    + params
    );
};

