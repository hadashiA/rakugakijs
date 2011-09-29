function isSmartPhone() {
  return (navigator.userAgent.match(/(iP(hone|od))|(Android)/));
}

function getMousePosOnElement(event) {
  var rect = event.target.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

var RGBAColor = function(colorKeyword, alpha) { 
  if (arguments.length >= 3) {
    this.r = arguments[0];
    this.g = arguments[1];
    this.b = arguments[2];
    this.a = arguments[3];
    return;
  }

  var rgba, m;

  var basicColors = {
    aliceblue: 'f0f8ff',
    antiquewhite: 'faebd7',
    aqua: '00ffff',
    aquamarine: '7fffd4',
    azure: 'f0ffff',
    beige: 'f5f5dc',
    bisque: 'ffe4c4',
    black: '000000',
    blanchedalmond: 'ffebcd',
    blue: '0000ff',
    blueviolet: '8a2be2',
    brown: 'a52a2a',
    burlywood: 'deb887',
    cadetblue: '5f9ea0',
    chartreuse: '7fff00',
    chocolate: 'd2691e',
    coral: 'ff7f50',
    cornflowerblue: '6495ed',
    cornsilk: 'fff8dc',
    crimson: 'dc143c',
    cyan: '00ffff',
    darkblue: '00008b',
    darkcyan: '008b8b',
    darkgoldenrod: 'b8860b',
    darkgray: 'a9a9a9',
    darkgreen: '006400',
    darkkhaki: 'bdb76b',
    darkmagenta: '8b008b',
    darkolivegreen: '556b2f',
    darkorange: 'ff8c00',
    darkorchid: '9932cc',
    darkred: '8b0000',
    darksalmon: 'e9967a',
    darkseagreen: '8fbc8f',
    darkslateblue: '483d8b',
    darkslategray: '2f4f4f',
    darkturquoise: '00ced1',
    darkviolet: '9400d3',
    deeppink: 'ff1493',
    deepskyblue: '00bfff',
    dimgray: '696969',
    dodgerblue: '1e90ff',
    feldspar: 'd19275',
    firebrick: 'b22222',
    floralwhite: 'fffaf0',
    forestgreen: '228b22',
    fuchsia: 'ff00ff',
    gainsboro: 'dcdcdc',
    ghostwhite: 'f8f8ff',
    gold: 'ffd700',
    goldenrod: 'daa520',
    gray: '808080',
    green: '008000',
    greenyellow: 'adff2f',
    honeydew: 'f0fff0',
    hotpink: 'ff69b4',
    indianred : 'cd5c5c',
    indigo : '4b0082',
    ivory: 'fffff0',
    khaki: 'f0e68c',
    lavender: 'e6e6fa',
    lavenderblush: 'fff0f5',
    lawngreen: '7cfc00',
    lemonchiffon: 'fffacd',
    lightblue: 'add8e6',
    lightcoral: 'f08080',
    lightcyan: 'e0ffff',
    lightgoldenrodyellow: 'fafad2',
    lightgrey: 'd3d3d3',
    lightgreen: '90ee90',
    lightpink: 'ffb6c1',
    lightsalmon: 'ffa07a',
    lightseagreen: '20b2aa',
    lightskyblue: '87cefa',
    lightslateblue: '8470ff',
    lightslategray: '778899',
    lightsteelblue: 'b0c4de',
    lightyellow: 'ffffe0',
    lime: '00ff00',
    limegreen: '32cd32',
    linen: 'faf0e6',
    magenta: 'ff00ff',
    maroon: '800000',
    mediumaquamarine: '66cdaa',
    mediumblue: '0000cd',
    mediumorchid: 'ba55d3',
    mediumpurple: '9370d8',
    mediumseagreen: '3cb371',
    mediumslateblue: '7b68ee',
    mediumspringgreen: '00fa9a',
    mediumturquoise: '48d1cc',
    mediumvioletred: 'c71585',
    midnightblue: '191970',
    mintcream: 'f5fffa',
    mistyrose: 'ffe4e1',
    moccasin: 'ffe4b5',
    navajowhite: 'ffdead',
    navy: '000080',
    oldlace: 'fdf5e6',
    olive: '808000',
    olivedrab: '6b8e23',
    orange: 'ffa500',
    orangered: 'ff4500',
    orchid: 'da70d6',
    palegoldenrod: 'eee8aa',
    palegreen: '98fb98',
    paleturquoise: 'afeeee',
    palevioletred: 'd87093',
    papayawhip: 'ffefd5',
    peachpuff: 'ffdab9',
    peru: 'cd853f',
    pink: 'ffc0cb',
    plum: 'dda0dd',
    powderblue: 'b0e0e6',
    purple: '800080',
    red: 'ff0000',
    rosybrown: 'bc8f8f',
    royalblue: '4169e1',
    saddlebrown: '8b4513',
    salmon: 'fa8072',
    sandybrown: 'f4a460',
    seagreen: '2e8b57',
    seashell: 'fff5ee',
    sienna: 'a0522d',
    silver: 'c0c0c0',
    skyblue: '87ceeb',
    slateblue: '6a5acd',
    slategray: '708090',
    snow: 'fffafa',
    springgreen: '00ff7f',
    steelblue: '4682b4',
    tan: 'd2b48c',
    teal: '008080',
    thistle: 'd8bfd8',
    tomato: 'ff6347',
    turquoise: '40e0d0',
    violet: 'ee82ee',
    violetred: 'd02090',
    wheat: 'f5deb3',
    white: 'ffffff',
    whitesmoke: 'f5f5f5',
    yellow: 'ffff00',
    yellowgreen: '9acd32'
  };

  colorKeyword = colorKeyword.replace(/[#\s]/g, '').toLowerCase();
  if (colorKeyword in basicColors) 
    colorKeyword = basicColors[colorKeyword];
  
  if (colorKeyword.match(/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([\d\.]{1,3})\)$/)) {
    rgba = [
      parseInt(RegExp.$1),
      parseInt(RegExp.$2),
      parseInt(RegExp.$3),
      parseFloat(RegExp.$4)
    ];
  } else if (colorKeyword.match(/^(\w{2})(\w{2})(\w{2})$/)) {
    rgba = $.map([1,2,3], function(i) {
      return parseInt(RegExp['$' + i], 16);
    });
  } else if (colorKeyword.match(/^(\w{1})(\w{1})(\w{1})$/)) { 
    rgba = $.map([1,2,3], function(i) {
      var num = RegExp['$' + i];
      return parseInt(num + num, 16);
    });
  }
  
  $.map(rgba, function(num) {
    return (num < 0 || isNaN(num) ? 0 : (num > 255) ? 255 : num);
  });

  this.r = rgba[0];
  this.g = rgba[1];
  this.b = rgba[2];
  this.a = rgba[3] || alpha || 1;
};

RGBAColor.prototype.rgba = function() {
  return 'rgba('
    + this.r + ','
    + this.g + ','
    + this.b + ','
    + this.a + ')';
};

RGBAColor.prototype.hex = function() {
  var r = this.r.toString(16),
      g = this.g.toString(16),
      b = this.b.toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  return '#' + r + g + b;
};

RGBAColor.prototype.json = function() {
  return {
    r: this.r,
    g: this.g,
    b: this.b,
    a: this.a
  };
};

var RGBAColorDummy = function(rgba) {
  var _rgba = rgba;
  this.rgba = function() { return _rgba; };
};

var RakugakiWall = function(area, options) {
  if (!options) options = {};
  area = $(area);

  var wall   = this,
      left   = area.position().left,
      top    = area.position().top,
      width  = parseInt(area.css('width')),
      height = parseInt(area.css('height'));

  this.screenRect = {
    left: left,
    top: top,
    width: width,
    height: height
  };

  this.layers = new (function(maxDepth) {
    var Layer = function(z) {
      this.canvas = document.createElement('canvas');
      this.left   = left;
      this.top    = top;
      this.width  = width;
      this.height = height;

      $(this.canvas)
        .attr({
          width: this.width,
          height: this.height
        })
        .css({
          position: 'absolute',
          left: this.left + 'px',
          top: this.top + 'px',
          zIndex: (90 - z * 2)
        })
        .appendTo($('body'));
      
      this.backCanvas = document.createElement('canvas');
      $(this.backCanvas).attr({
        width: this.width,
        height: this.height
      });
    };

    this.buffers = new Array(maxDepth);
    for (var i = 0; i < maxDepth; ++i) {
      this.buffers[i] = new Layer(i);
    }

    this.size = function() {
      return this.buffers.length;
    };

    this.at = function(i) {
      return this.buffers[i];
    };

    this.put = function() {
      var length = this.buffers.length,
          layer  = new Layer(length);
      this.buffers[length] = layer;

      return layer;
    };
  })(3);

  this.bgColor = options.bgColor || new RGBAColor('white');

  // $(this.layers.at(this.layers.size() - 1).canvas)
  //   .css('background-color', this.bgColor.hex());
};

RakugakiWall.prototype.canPaintThisBrowser = function() {
  return !!this.localLayer().canvas.getContext;
};

RakugakiWall.prototype.localLayer = function() {
  return this.layers.at(0);
};

RakugakiWall.prototype.frontImageLayer = function() {
  return this.layers.at(1);
};

RakugakiWall.prototype.remoteLayer = function() {
  return this.layers.at(2);
};

RakugakiWall.prototype.localContext = function() {
  return this.localLayer().canvas.getContext('2d');
};

RakugakiWall.prototype.frontImageContext = function() {
  return this.frontImageLayer().canvas.getContext('2d');
};

RakugakiWall.prototype.remoteContext = function() {
  return this.remoteLayer().canvas.getContext('2d');
};

RakugakiWall.prototype.generateIntegratedCanvas = function() {
  var canvas  = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      width   = this.screenRect.width,
      height  = this.screenRect.height;

  $(canvas).attr({ width: width, height: height });

  // context.fillStyle = this.bgColor.rgba();
  // context.fillRect(0, 0, width, height);

  // for (var i = this.layers.size() - 1; i >= 0; --i) {
  //   context.drawImage(this.layers.at(i).canvas, 0, 0);
  // }

  context.drawImage(this.remoteLayer().canvas, 0, 0);
  context.drawImage(this.localLayer().canvas, 0, 0);
  context.drawImage(this.frontImageLayer().canvas, 0, 0);

  return canvas;
};

var UndoBuffer = function(layer, undoMax) {
  this.layer = layer;
  this.undoMax = undoMax;
  this.bufferIndex = 0;
  this.bufferIndexStart = 0;

  this.buffers = new Array(undoMax);
  for (var i = 0; i < undoMax; ++i) 
    this.buffers[i] = {};
};

UndoBuffer.prototype.push = function(area) {
  var buffer      = this.buffers[this.bufferIndex],
      layer       = this.layer,
      context     = layer.canvas.getContext('2d'),
      backContext = layer.backCanvas.getContext('2d'),
      left   = 0,
      top    = 0,
      width  = layer.width,
      height = layer.height;

  if (area) {
    buffer.area = area;
    left   = area.left;
    top    = area.top;
    width  = area.width;
    height = area.height;
  } else {
    buffer.area = { left: left, top: top, width: width, height: height };
  }

  buffer.imageData = backContext.getImageData(left, top, width, height);

  backContext.save();
  backContext.putImageData(
    context.getImageData(left, top, width, height), left, top
  );
  backContext.restore();
  
  this.bufferIndex = (this.bufferIndex + 1) % this.undoMax;
  if (this.bufferIndex == this.bufferIndexStart) 
    this.bufferIndexStart = (this.bufferIndexStart + 1) % this.undoMax;
};

UndoBuffer.prototype.canUndo = function() {
  return this.bufferIndex != this.bufferIndexStart;
};

UndoBuffer.prototype.pop = function() {
  if (!this.canUndo()) return;

  this.bufferIndex = this.bufferIndex ? this.bufferIndex - 1 : this.undoMax - 1;

  var buffer      = this.buffers[this.bufferIndex],
      context     = this.layer.canvas.getContext('2d'),
      backContext = this.layer.backCanvas.getContext('2d'),
      left = buffer.area.left,
      top  = buffer.area.top;
  
  context.putImageData(buffer.imageData, left, top);
  backContext.putImageData(buffer.imageData, left, top);
  
  delete buffer.imageData;
};

UndoBuffer.prototype.clear = function() {
  while (this.canUndo()) {
    this.bufferIndex = this.bufferIndex ? this.undoCycle - 1 : this.max - 1;
    delete this.buffers[this.bufferIndex].imageData;
  }
};

var Palette = function(context) {
  this.context   = context;
  this.tools     = {};
  this.color    = new RGBAColor('#333', 0.5);
  this.drawSize = 3;

  for (var i = 0; i < Palette.tools.length; i++) {
    var tool = new Palette.tools[i](this);
    if (i == 0) this.currentToolName = tool.name;
    this.tools[tool.name] = tool;
  }
};

Palette.tools = [];

Palette.addTool = function(tool) {
  this.tools.push(tool);
};

Palette.prototype.selectToolByName = function(name) {
  if (this.currentToolName != name && name in this.tools) {
    this.currentToolName = name;
  }
};

Palette.prototype.tool = function(key) {
  if (!key || !(key in this.tools)) {
    key = this.currentToolName;
  } 
  return this.tools[key];
};

var PaintToolBase = function() {
  this.name = 'tool';
  this.stroking = false;
  this.updated = false;

  var _area = null;
  this.area = function(val) {
    if (val) {
      if (_area) {
        _area.left   = _area.left   > val.left   ? val.left   : _area.left;
        _area.top    = _area.top    > val.top    ? val.top    : _area.top;
        _area.right  = _area.right  < val.right  ? val.right  : _area.right;
        _area.bottom = _area.bottom < val.bottom ? val.bottom : _area.bottom;
      } else {
        _area = val;
      }
    }
    return _area;
  };
};

// var Pencil = function(palette) {
//   this.palette = palette;
//   this.name = 'pencil';
// };

// Pencil.prototype = new PaintToolBase();

// Pencil.prototype.startStroke = function(point) {
//   var palette = this.palette,
//       context = palette.context;

//   this.stroking = true;
//   this.prevPoint = point;
// };

// Pencil.prototype.connectStroke = function(point) {
//   if (!this.stroking) return false;

//   var palette = this.palette,
//       context = palette.context,
//       color   = point.c || palette.color,
//       size    = point.s || palette.drawSize;

//   context.save();
//   context.strokeStyle = color.rgba();
//   context.lineWidth = size;
//   context.beginPath();
//   context.moveTo(this.prevPoint.x, this.prevPoint.y);
//   context.lineTo(point.x, point.y);
//   context.stroke();
//   context.closePath();
//   context.restore();

//   this.prevPoint = point;

//   return true;
// };

// Pencil.prototype.endStroke = function(point) {
//   this.stroking = false;
// };

// Palette.addTool(Pencil);

var Brush = function(palette) {
  this.palette = palette;
  this.name = 'brush';
};

Brush.prototype = new PaintToolBase();

Brush.prototype.drawParticle = function(point) {
  var context  = this.palette.context,
      x        = point.x,
      y        = point.y,
      size     = point.s,
      color    = point.c;

  context.save();
  context.fillStyle = 'rgba('
    + color.r + ','
    + color.g + ','
    + color.b + ','
    + color.a + ')';
  context.beginPath();
  context.arc(x, y, size, 0, Math.PI * 2, false);
  context.fill();
  context.restore();

  this.area({
    left: x - size - 1,
    top: y - size - 1,
    right: x + size + 1,
    bottom: y + size + 1
  });
};

Brush.prototype.startStroke = function(point) {
  var palette  = this.palette,
      context  = palette.context;

  if (!point.s) point.s = palette.drawSize;
  if (!point.c) point.c = palette.color;

  point.alpha = 1;
  if(point.s < .5){
    point.alpha = point.s * point.s * 4;
    point.s = .5;
  }

  this.drawParticle(point);
  this.stroking = true;
  this.prevPoint = point;
};

Brush.prototype.connectStroke = function(point) {
  if (!this.stroking) return false;

  if (!point.c) point.c = this.palette.color;
  if (!point.s) point.s = this.palette.drawSize;

  point.alpha = 1;
  if (point.s < 0.5) {
    point.alpha = point.s * point.s * 4;
    point.s  = 0.5;
  }

  var palette = this.palette,
      x       = point.x,
      y       = point.y,
      size    = point.s,
      alpha   = point.alpha,
      dx      = this.prevPoint.x - x,
      dy      = this.prevPoint.y - y,
      dsize   = this.prevPoint.s - size,
      dalpha  = this.prevPoint.c.a - alpha,
      length  = Math.sqrt(dx * dx + dy * dy),
      step    = (size + dsize) / 2.5 + 0.75;

  for (var i = 0; i < length; ++i) {
    var progress = i / length;
    
    this.drawParticle({
      x: x + dx * progress,
      y: y + dy * progress,
      s: size + dsize * progress,
      c: point.c,
      alpha: alpha + dalpha * progress
    });
  }

  this.prevPoint = point;

  return true;
};

Brush.prototype.endStroke = function(point) {
  if (this.stroking && this.area()) this.updated = true;

  this.stroking = false;
};

Palette.addTool(Brush);

var AirBrush = function(palette) {
  this.palette = palette;
  this.name = 'airBrush';
};

AirBrush.prototype = new Brush();

AirBrush.prototype.drawParticle = function(point) {
  var palette = this.palette,
      context = palette.context,
      x       = point.x,
      y       = point.y,
      size    = point.s || palette.drawSize,
      color   = point.c || palette.color;
  
  if (size < 20) size = 20;

  context.save();
  context.beginPath();

  var grad = context.createRadialGradient(x, y, 0, x, y, size);

  grad.addColorStop(
    0,
    'rgba('
      + color.r + ','
      + color.g + ','
      + color.b + ','
      + color.a * 0.5 * point.alpha + ')'
  );

  grad.addColorStop(
    1,
    'rgba('
      + color.r + ','
      + color.g + ','
      + color.b + ','
      + 0 + ')'
  );

  context.fillStyle = grad;
  context.arc(x, y, size, 0, Math.PI * 2, false);
  context.fill();
  context.restore();

  this.area({
    left: x - size - 1,
    top: y - size - 1,
    right: x + size + 1,
    bottom: y + size + 1
  });
};

Palette.addTool(AirBrush);

var Eraser = function(palette) {
  this.palette = palette;
  this.name = 'eraser';
};

Eraser.prototype = new Brush();

Eraser.prototype.drawParticle = function(point) {
  var context  = this.palette.context,
      x = point.x,
      y = point.y,
      size = point.s < 20 ? 20 : point.s;

  context.save();
  context.beginPath();
  context.globalCompositeOperation = 'destination-out';
  context.fillStyle = 'rgba(0,0,0,1)';
  context.arc(x, y, size, 0, Math.PI * 2, false);
  context.fill();
  context.restore();

  this.area({
    left: x - size - 1,
    top: y - size - 1,
    right: x + size + 1,
    bottom: y + size + 1
  });
};

Palette.addTool(Eraser);

$(function() {
  var namespace = '/rakugaki' + location.pathname.replace(/\/(\..+)?$/, ''),
      area = $('#rakugaki');

  if (namespace.match(/\/rakugaki\/?/))
    namespace = '/rakugaki/index';

  if (isSmartPhone() && parseInt(area.css('height')) > 2000) {
    return;
  }
  
  var wall = new RakugakiWall(area);
  
  if (!wall.canPaintThisBrowser()) {
    var prevSource = area.html();
    area.html(
      $(document.createElement('img'))
        .attr('src', namespace + '.png')
        .error(function() {
          $(this).hide();
          area.html(prevSource);
        })
    );

    return;
  }

  var palette    = new Palette(wall.localContext()),
      undoBuffer = new UndoBuffer(wall.localLayer(), 20),
      socket        = io.connect(socketIOUrl + namespace),
      remotePalette = new Palette(wall.remoteContext()),
      timerID;

  area.find('img').each(function() {
    var imgTag   = $(this),
        offset   = imgTag.offset(),
        position = imgTag.position(),
        wallPos  = wall.screenRect,
        left     = parseInt(offset.left - wallPos.left - position.left),
        top      = parseInt(offset.top - wallPos.top - position.top),
        img      = new Image(),
        context  = wall.frontImageContext();

    // imgTag.load(function() {
    //   context.drawImage(this, left, top);
    // });

    img.src = imgTag.attr('src');
    img.onload = function() {
      context.drawImage(img, left, top);
    };
  });

  var img = new Image(),
      indicator = $(document.createElement('img'))
        .appendTo('body')
        .attr('src', '/images/loading.gif')
        .css({
          position: 'absolute',
          left: wall.screenRect.left + wall.screenRect.width / 2 + 'px',
          top: wall.screenRect.top + 'px',
          zIndex: 100
        });
  
  img.src = namespace + '.png';
  img.onerror = function() {
    indicator.hide();
  };
  img.onload = function() {
    indicator.hide();
    wall.remoteContext().drawImage(img, 0, 0);
  };

  socket.on('painters count update', function(count) {
    $('.paintersCount').text(count);
  });

  socket.on('stroke start', function(point) {
    remotePalette.tool(point.t).startStroke(point);
  });

  socket.on('stroke connect', function(point) {
    remotePalette.tool(point.t).connectStroke(point);
  });

  socket.on('stroke end', function(point) {
    remotePalette.tool(point.t).endStroke(point);
  });

  // palette.currentToolName = 'pencil';
  palette.currentToolName = 'brush';

  $.each(['mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout'],
    function() {
      $(wall.localLayer().canvas)[this](function(event) {
        var tool  = palette.tool(),
            pos   = getMousePosOnElement(event),
            point = {
              t: tool.name,
              x: pos.x,
              y: pos.y,
              s: palette.drawSize,
              c: palette.color.json()
            };
        
        switch (event.type) {
        case 'mousedown':
          tool.startStroke(point);
          socket.json.emit('stroke start', point);
          break;
        case 'mouseover':
          break;
        case 'mouseout':
        case 'mouseup':
          tool.endStroke(point);
          socket.json.emit('stroke end', point);
          break;
        case 'mousemove':
          tool.connectStroke(point)
            && socket.json.emit('stroke connect', point);
        }
        
        if (tool.updated) {
          var layer = undoBuffer.layer,
              area   = tool.area(),
              left   = Math.floor(area.left),
              top    = Math.floor(area.top),
              right  = Math.floor(area.right),
              bottom = Math.floor(area.bottom);

          if (left < 0) left = 0;
          if (left > layer.width) left = layer.width;
          
          if (top < 0) top = 0;
          if (top > layer.height) top = layer.height;
          
          if (right < 0) right = 0;
          if (right > layer.width) right = layer.width;
          
          if (bottom < 0) bottom = 0;
          if (bottom > layer.height) bottom = layer.height;
          
          var width  = right - left,
              height = bottom - top;
          
          if (width && height) {
            undoBuffer.push({
              left: left,
              top: top,
              width: width,
              height: height
            });
          }
          
          tool.updated = false;
          tool.area(null);

          // save
          clearTimeout(timerID);
          timerID = setTimeout(function() {
            var dataURL = wall.generateIntegratedCanvas().toDataURL();
            socket.emit('save', dataURL);
          }, 2000);
        }
        
        event.cancelBubble = true;
        return false;
      });
    });
  
  // Menu
  if (isSmartPhone()) return;

  var menu = $(document.createElement('div'))
        .appendTo($('body'))
        .css({
          position: 'absolute',
          left: wall.screenRect.left + wall.screenRect.width + 'px',
          top: wall.screenRect.top + 'px'
        });
  //
  $(document.createElement('p'))
    .appendTo(menu)
    .html('現在落書きしている人:<span class="paintersCount">0</span>人');

  var buttons = $(document.createElement('table'))
        .appendTo(menu)
        .addClass('tools');

  $.each([
    '333333',
    'dcdddd',
    '9ea1a3',
    'd9333f',
    '762f07',
    'f5b199',
    'ffdb4f',
    '7ebeab',
    '2f5d50',
    '89c3eb',
    '706caa'
    ], function(colorIndex, hex) {
      var color   = new RGBAColor(hex),
          wrapper = $(document.createElement('tr'))
            .appendTo(buttons)
            .addClass('color-' + hex);

      $.each(['brush', 'airBrush'], function(toolIndex, toolName) {
        var button = $(document.createElement('td'))
              .appendTo(wrapper)
              .addClass(toolName),
            iconPath = '/images/rakugaki/' + toolName + '_' + hex,
            icon = $(document.createElement('img'))
              .appendTo(button)
              .attr('src', iconPath + '.png')
              .click(function(event) {
                var paletteColor = new RGBAColor(hex);
                paletteColor.a = palette.color.a;
                palette.color = paletteColor;
                
                palette.selectToolByName(toolName);
                
                buttons.find('.selected').removeClass('selected');
                $(this).addClass('selected');

                $(wall.localLayer().canvas)
                  .css('cursor', "url('" + iconPath + ".cur') 6 32, crosshair");
              });
        
        if (colorIndex == 0 && toolName == palette.currentToolName) {
          var paletteColor = new RGBAColor(hex);
          paletteColor.a = palette.color.a;
          palette.color = paletteColor;
          buttons.find('.selected').removeClass('selected');
          icon.addClass('selected');
          $(wall.localLayer().canvas)
            .css('cursor', "url('" + iconPath + ".cur') 6 32, crosshair");
        }
      });
    });

  var wrapper = $(document.createElement('tr'))
        .appendTo(buttons),
      button = $(document.createElement('td'))
        .appendTo(wrapper),
      icon = $(document.createElement('img'))
        .appendTo(button)
        .attr('src', '/images/rakugaki/eraser.png')
          .click(function() {
            buttons.find('.selected').removeClass('selected');
            $(this).addClass('selected');
            palette.selectToolByName('eraser');
            $(wall.localLayer().canvas)
              .css('cursor', "url('/images/rakugaki/eraser.cur') 6 32, crosshair");
        });

  // Undo Button
  $(document.createElement('button'))
    .appendTo(menu)
    .addClass('undo')
    .text('取り消す')
    .click(function() {
      undoBuffer.pop();

      clearTimeout(timerID);
      timerID = setTimeout(function() {
        var dataURL = wall.generateIntegratedCanvas().toDataURL();
        socket.emit('save', dataURL);
      }, 1500);

      return true;
    });
});
