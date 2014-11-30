var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var scale;

var canvas;
var checkObjectCanvas;
var selectedObject, selectedPrototype;
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

    fabric.Object.prototype.transparentCorners = false;
    canvas = this.__canvas = new fabric.Canvas('piece-canvas');
    canvas.selection = false;

    for(var i = 0; i < pieceData.length ; i++){
      var piece = new PuzzlePiece(pieceData[i].textureUrl,{
        left : Math.floor(Math.random()*100)+820, //this.image.width;
        top : Math.floor(Math.random()*500)+100, //this.image.height;
        index : pieceData[i].index,
        type : "piece",
        hasControls : false,
        hasRotatingPoint : false,
        hasBorders : false,
        isSolved : false
      });

      var prototype = new Prototype(pieceData[i].path,{
        index : pieceData[i].index,
        type : "prototype",
        selectable: false,
        hasControls : false,
        hasRotatingPoint : false,
        hasBorders : false,
        isSolved : false,
        // fill:'rgba(255,0,0,0.2)'
        visible: false
      });

      piece.on('image:loaded', canvas.renderAll.bind(canvas));
      canvas.add(piece, prototype);
      // console.log(prototype);

    }
    canvas.renderAll();
  });

});

//------adjustCanvasSize- Initially set canvas width and height for being respoinsive  -----//
//------For a better canvas performance,
//------it is fixed in iPad screen resolution for now.


function adjustCanvasSize(){
  //original pic size: width="1080" height="810"
  var cw = 1024; //width-30;
  var ch = 768; //height*0.92;
  var ow = 1892;
  $('canvas').attr('width',cw+"px").attr('height',ch+"px");

}
