var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var scale;
var canvas;
var piece1, piece2, piece3;
var texture1, texture2, texture3;

var pieceData = [
  {
    'index':'11',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/1-1.png',
    'path':'M 196.192 122 L 56 122 L 56 263.5 L 172 263.5 z'
  },
  {
    'index':'12',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/1-2.png',
    'path':'M 295 284.5 L 302.169 122 L 196.192 122 L 172 263.5 L 172 272.5 z'
  },
  {
    'index':'13',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/1-3.png',
    'path':'M 399 301.5 L 414.236 122 L 302.169 122 L 295 284.5 L 295 294 z'
  },
  {
    'index':'14',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/1-4.png',
    'path':'M 606 236.75 L 603.295 122 L 414.236 122 L 404.731 233.979 L 529.5 240.5 z'
  },
  {
    'index':'15',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/1-5.png',
    'path':'M 603.295 122 L 606 236.75 L 609 259 L 656 268.5 L 760 268.5 L 760 122 z'
  },
  {
    'index':'21',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/2-1.png',
    'path':'M 109.425 373.725 L 102 374 L 89.934 263.5 L 56 263.5 L 56 407.708 L 104.667 403.333 z'
  },
  {
    'index':'22',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/2-2.png',
    'path':'M 246 368.667 L 259.208 281.008 L 172 272.5 L 172 263.5 L 89.934 263.5 L 102 374 z'

  },
  {
    'index':'23',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/2-3.png',
    'path':'M 527.615 332.25 L 529.5 240.5 L 404.731 233.979 L 399 301.5 L 404.731 319 z'
  },
  {
    'index':'24',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/2-4.png',
    'path':'M 644 396 L 656 268.5 L 609 259 L 606 236.75 L 529.5 240.5 L 526.5 386.5 z'

  },
  {
    'index':'25',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/2-5.png',
    'path':'M 656 268.5 L 644 396 L 760 396 L 760 268.5 z'
  },
  {
    'index':'31',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/3-1.png',
    'path':'M 98.123 547.197 L 95.333 547.333 L 80.34 405.52 L 56 407.708 L 56 554.25 L 98 547.333 z'

  },
  {
    'index':'32',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/3-2.png',
    'path':'M 259.208 539.333 L 230.975 369.223 L 109.425 373.725 L 104.667 403.333 L 80.34 405.52 L 95.333 547.333 z'

  },
  {
    'index':'33',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/3-3.png',
    'path':'M 580 564 L 674.667 558 L 681.068 396 L 644 396 L 548.13 388.249 L 551.333 559.333 z'
  },
  {
    'index':'34',
    'prototype':'',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/3-4.png',
    'path':'M 695.333 564 L 760 560.306 L 760 396 L 681.068 396 L 674.815 554.249 L 674.815 554.25 z'
  }
];

$(document).ready(function(){
  $(window).resize(function () {
    if (this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function () {
        $(this).trigger('resizeEnd');
    }, 500);
  });
  $(window).bind('resizeEnd', function () {

  });

  $(window).load(function() {
    adjustCanvasSize();
    canvas = this.__canvas = new fabric.Canvas('canvas');
    for(var i = 0; i < pieceData.length ; i++){
      createPrototypes(pieceData[i]);
    }
    for(var i = 0; i < pieceData.length ; i++){
      createPieces(pieceData[i]);
    }
    canvas.on({
      'object:moving': onChange
    });
  });

});

//------adjustCanvasSize- Initially set canvas width and height for being respoinsive-----//

function adjustCanvasSize(){
  //original pic size: width="1080" height="810"
  var cw = 1024; //width-30;
  var ch = 768; //height*0.92;
  var ow = 1892;
  $('canvas').attr('width',cw+"px").attr('height',ch+"px");

  //scale = screenWidth / canvasWidth
  //newPieceWidth = originalPieceWidth * scale
  scale = cw/ow;

}

function createPrototypes(data){

  data.prototype = new fabric.Path(data.path);
  // var offsetX = data.prototype.getWidth()*scale - data.prototype.getWidth();
  // offsetX = offsetX + data.prototype.getLeft();
  // var offsetY = data.prototype.getHeight()*scale - data.prototype.getHeight();
  // offsetY = offsetY + data.prototype.getTop();
  // console.log(data.prototype.getTop()+","+data.prototype.getLeft());
  data.prototype.set({selectable:false, hasControls:false, fill: 'rgba(255,255,255,0.2)'});

  canvas.add(data.prototype);
}

//------createPieces- Initially create and display puzzle pieces-----//

function createPieces(data){

  fabric.Image.fromURL(data.textureUrl, function(img) {

  // img.scaleToWidth(100);

  var patternSourceCanvas = new fabric.StaticCanvas();
  patternSourceCanvas.add(img);

  data.textureObj = new fabric.Pattern({
  source: function() {
    patternSourceCanvas.setDimensions({
      width: img.getWidth(),
      height: img.getHeight()
    });
    return patternSourceCanvas.getElement();
  }
  });

  data.pieceObj = new fabric.Path(data.path);
  // var offsetX = data.pieceObj.getWidth()*scale - data.pieceObj.getWidth();
  // offsetX = offsetX + data.pieceObj.getLeft();
  // var offsetY = data.pieceObj.getHeight()*scale - data.pieceObj.getHeight();
  // offsetY = offsetY + data.pieceObj.getTop();
  // console.log(data.pieceObj.getWidth());
  // console.log(data.pieceObj.getWidth()*scale);
  data.pieceObj.set({hasControls:false, hasBorders:false});
  // console.log(data.pieceObj.getWidth());

  data.pieceObj.fill = data.textureObj;
  // console.log(data.pieceObj);
  canvas.add(data.pieceObj);
  });

}

function adjustSize() {
  console.log(canvas.getActiveObject());
}

function onChange(options) {
  // console.log(options.target.path);
  // console.log(options.target);
  var that = options.target;
  var thatPrototype;


  that.setCoords();
  canvas.forEachObject(function(obj) {

    if(!obj.selectable && obj.width === that.width && obj.height === that.height) {
      thatPrototype=obj;
    }
  });

  thatPrototype.setOptions(that.intersectsWithObject(thatPrototype) ? {fill:'rgba(255,0,0,0.2)' } : {fill:'rgba(255,255,255,0.2)'});
  // alert("You got it!");
}
