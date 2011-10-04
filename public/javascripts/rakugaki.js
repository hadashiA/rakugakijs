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

var RakugakiWall = function(div, options) {
  if (!options) options = {};
  var $div = $(div);

  var wall   = this,
      left   = $div.position().left,
      top    = $div.position().top,
      width  = parseInt($div.css('width')),
      height = parseInt($div.css('height'));

  this.namespace = '/rakugaki' + location.pathname.replace(/\/(\..+)?$/, '');
  if (this.namespace.match(/\/rakugaki\/?/))
    this.namespace = '/rakugaki/index';

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

  this.panels = new (function (screenWidth, screenHeight) {
    var rowHeight = 200,
        colWidth  = 200,
        _panels   = [];
    
    var Panel = function(row, col, rect) {
      this.row = row;
      this.col = col;

      this.rect   = rect;
      this.left   = rect.left;
      this.top    = rect.top;
      this.width  = rect.width;
      this.height = rect.height;

      this.right  = rect.left + rect.width;
      this.bottom = rect.top + rect.height;

      this.name = this.row + '-' + this.col;
    };

    Panel.prototype.load = function() {
      var self = this,
          img = new Image();
      // var indicator = $(document.createElement('img'))
      //   .appendTo('body')
      //   .attr('src', '/images/loading.gif')
      //   .css({
      //     position: 'absolute',
      //     left: wall.screenRect.left + wall.screenRect.width / 2 + 'px',
      //     top: wall.screenRect.top + 'px',
      //     zIndex: 100
      //   });
  
      img.src = wall.namespace + '/' + this.name + '.png';
      img.onerror = function(e) {
        // indicator.hide();
      };
      img.onload = function() {
        // indicator.hide();
        wall.remoteContext().drawImage(img, self.left, self.top);
      };
    };

    for (var top = 0, row = 0; top < screenHeight; top += rowHeight, row++) {
      var height = Math.min(rowHeight, screenHeight - top);
      _panels[row] = [];

      for (var left = 0, col = 0; left < screenWidth; left += colWidth, col++) {
        var width = Math.min(colWidth, screenWidth - left);

        _panels[row][col] = new Panel(row, col, {
          top: top,
          left: left,
          width: width,
          height: height
        });
      }
    }

    this.rows = _panels.length;
    this.cols = _panels[0].length;

    this.forEach = function(callback) {
      for (var row = 0; row < this.rows; row++) {
        for (var col = 0; col < this.cols; col++) {
          callback(_panels[row][col], row, col);
        }
      }
    };

    this.forEachInRect = function(rect, callback) {
      var drawnLeft   = rect.left,
          drawnRight  = drawnLeft + rect.width,
          drawnTop    = rect.top,
          drawnBottom = drawnTop + rect.height;

      this.forEach(function(panel, row, col) {
        if (panel.left   < drawnRight &&
            panel.right  > drawnLeft &&
            panel.top    < drawnBottom &&
            panel.bottom > drawnTop) {
          callback(panel, row, col);
        }
      });
    };
  })(width, height);

  this.bgColor = options.bgColor || new RGBAColor('white');

  // $(this.layers.at(this.layers.size() - 1).canvas)
  //   .css('background-color', this.bgColor.hex());

  this.panels.forEach(function(panel, row, col) {
    panel.load();
  });
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

RakugakiWall.prototype.generateIntegratedCanvas = function(rect) {
  if (!rect)
    rect = {
      left: 0,
      top: 0,
      width: this.screenRect.width,
      height: this.screenRect.height
    };

  var saveBufCanvas  = document.createElement('canvas'),
      saveBufContext = saveBufCanvas.getContext('2d');

  $(saveBufCanvas).attr({ width: rect.width, height: rect.height });

  // context.fillStyle = this.bgColor.rgba();
  // context.fillRect(rect.left, rect.top, rect.width, rect.height);

  $.each([
    this.remoteContext(),
    this.localContext(),
    this.frontImageContext()
  ], function(i, context) {
    var layerBufCanvas  = document.createElement('canvas'),
        layerBufContext = layerBufCanvas.getContext('2d'),
        layerImageData = context.getImageData(
          rect.left, rect.top,
          rect.width, rect.height
        );

    $(layerBufCanvas).attr({ width: rect.width, height: rect.height });
    layerBufContext.putImageData(layerImageData, 0, 0);
    saveBufContext.drawImage(layerBufCanvas, 0, 0);
  });

  return saveBufCanvas;
};

RakugakiWall.prototype.save = function(rect, stream) {
  var self = this;

  console.log(rect);
  this.panels.forEachInRect(rect, function(panel, row, col) {
    clearTimeout(panel.timerId);
    panel.timerId = setTimeout(function() {
      var dataURL = self.generateIntegratedCanvas(panel.rect).toDataURL();
      stream.emit('save', panel.name, dataURL);
    }, 1500);
  });
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

UndoBuffer.prototype.push = function(rect) {
  var buffer      = this.buffers[this.bufferIndex],
      layer       = this.layer,
      context     = layer.canvas.getContext('2d'),
      backContext = layer.backCanvas.getContext('2d'),
      left   = 0,
      top    = 0,
      width  = layer.width,
      height = layer.height;

  if (rect) {
    buffer.rect = rect;
    left   = rect.left;
    top    = rect.top;
    width  = rect.width;
    height = rect.height;
  } else {
    buffer.rect = { left: left, top: top, width: width, height: height };
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
  if (!this.canUndo()) return null;

  this.bufferIndex = this.bufferIndex ? this.bufferIndex - 1 : this.undoMax - 1;

  var buffer      = this.buffers[this.bufferIndex],
      context     = this.layer.canvas.getContext('2d'),
      backContext = this.layer.backCanvas.getContext('2d'),
      rect = buffer.rect,
      left = rect.left,
      top  = rect.top;
  
  context.putImageData(buffer.imageData, left, top);
  backContext.putImageData(buffer.imageData, left, top);
  
  delete buffer.imageData;

  return rect;
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

  var _drawnArea = null;
  this.drawnArea = function(val) {
    if (val) {
      if (_drawnArea) {
        _drawnArea.left   = _drawnArea.left   > val.left   ? val.left   : _drawnArea.left;
        _drawnArea.top    = _drawnArea.top    > val.top    ? val.top    : _drawnArea.top;
        _drawnArea.right  = _drawnArea.right  < val.right  ? val.right  : _drawnArea.right;
        _drawnArea.bottom = _drawnArea.bottom < val.bottom ? val.bottom : _drawnArea.bottom;
      } else {
        _drawnArea = val;
      }
    }
    return _drawnArea;
  };
};

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

  this.drawnArea({
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
  if (this.stroking && this.drawnArea()) this.updated = true;

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

  this.drawnArea({
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

  this.drawnArea({
    left: x - size - 1,
    top: y - size - 1,
    right: x + size + 1,
    bottom: y + size + 1
  });
};

Palette.addTool(Eraser);

$(function() {
  var $div = $('#rakugaki');

  var wall = new RakugakiWall($div);
  
  var palette    = new Palette(wall.localContext()),
      undoBuffer = new UndoBuffer(wall.localLayer(), 20),
      socket        = io.connect(socketIOUrl + wall.namespace),
      remotePalette = new Palette(wall.remoteContext());

  $div.find('img').each(function() {
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
              drawnArea = tool.drawnArea(),
              left   = Math.floor(drawnArea.left),
              top    = Math.floor(drawnArea.top),
              right  = Math.floor(drawnArea.right),
              bottom = Math.floor(drawnArea.bottom);

          if (left < 0) left = 0;
          if (left > layer.width) left = layer.width;
          
          if (top < 0) top = 0;
          if (top > layer.height) top = layer.height;
          
          if (right < 0) right = 0;
          if (right > layer.width) right = layer.width;
          
          if (bottom < 0) bottom = 0;
          if (bottom > layer.height) bottom = layer.height;
          
          var width  = right - left,
              height = bottom - top,
              drawnRect = { left: left, top: top, width: width, height: height };
          
          if (width && height) {
            undoBuffer.push(drawnRect);
            wall.save(drawnRect, socket);
          }
          
          tool.updated = false;
          tool.drawnArea(null);
        }
        
        event.cancelBubble = true;
        return false;
      });
    });
  
  // Menu
  if (isSmartPhone()) return;

  var $menu = $(document.createElement('div'))
        .appendTo($('body'))
        .css({
          position: 'absolute',
          left: wall.screenRect.left + wall.screenRect.width + 'px',
          top: wall.screenRect.top + 'px'
        });
  //
  $(document.createElement('p'))
    .appendTo($menu)
    .html('現在落書きしている人:<span class="paintersCount">0</span>人');

  var $buttons = $(document.createElement('table'))
        .appendTo($menu)
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
          $wrapper = $(document.createElement('tr'))
            .appendTo($buttons)
            .addClass('color-' + hex);

      $.each(['brush', 'airBrush'], function(toolIndex, toolName) {
        var $button = $(document.createElement('td'))
              .appendTo($wrapper)
              .addClass(toolName),
            iconPath = '/images/rakugaki/' + toolName + '_' + hex,
            $icon = $(document.createElement('img'))
              .appendTo($button)
              .attr('src', iconPath + '.png')
              .click(function(event) {
                var paletteColor = new RGBAColor(hex);
                paletteColor.a = palette.color.a;
                palette.color = paletteColor;
                
                palette.selectToolByName(toolName);
                
                $buttons.find('.selected').removeClass('selected');
                $(this).addClass('selected');

                $(wall.localLayer().canvas)
                  .css('cursor', "url('" + iconPath + ".cur') 6 32, crosshair");
              });
        
        if (colorIndex == 0 && toolName == palette.currentToolName) {
          var paletteColor = new RGBAColor(hex);
          paletteColor.a = palette.color.a;
          palette.color = paletteColor;
          $buttons.find('.selected').removeClass('selected');
          $icon.addClass('selected');
          $(wall.localLayer().canvas)
            .css('cursor', "url('" + iconPath + ".cur') 6 32, crosshair");
        }
      });
    });

  var $wrapper = $(document.createElement('tr'))
        .appendTo($buttons),
      $button = $(document.createElement('td'))
        .appendTo($wrapper),
      $icon = $(document.createElement('img'))
        .appendTo($button)
        .attr('src', '/images/rakugaki/eraser.png')
          .click(function() {
            $buttons.find('.selected').removeClass('selected');
            $(this).addClass('selected');
            palette.selectToolByName('eraser');
            $(wall.localLayer().canvas)
              .css('cursor', "url('/images/rakugaki/eraser.cur') 6 32, crosshair");
        });

  // Undo Button
  $(document.createElement('button'))
    .appendTo($menu)
    .addClass('undo')
    .text('取り消す')
    .click(function() {
      var rect = undoBuffer.pop();
      if (rect) wall.save(rect, socket);

      return true;
    });
});
