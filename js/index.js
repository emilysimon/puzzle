var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var scale;

var canvas;
var checkObjectCanvas;
var selectedObject, selectedPrototype;

var pieceData = [{
    'index':'11',
    'textureUrl':'./assets/11.png',
    'successTextureUrl':'./assets/11-g.png',
    'path':'M 34 40 L 54 40 L 34 60 L 34 40 Z'
  },
  {
    'index':'12',
    'textureUrl':'./assets/12.png',
    'successTextureUrl':'./assets/12-g.png',
    'path':'M 168 42 L 188 42 L 168 64 L 168 42 Z'
  },
  {
    'index':'13',
    'textureUrl':'./assets/13.png',
    'successTextureUrl':'./assets/13-g.png',
    'path':'M 271 41 L 291 41 L 271 61 L 271 41 Z'
  },
  {
    'index':'14',
    'textureUrl':'./assets/14.png',
    'successTextureUrl':'./assets/14-g.png',
    'path':'M 362 41 L 382 41 L 362 61 L 362 41 Z'
  },
  {
    'index':'15',
    'textureUrl':'./assets/15.png',
    'successTextureUrl':'./assets/15-g.png',
    'path':'M 533 41 L 553 41 L 533 61 L 533 41 Z'
  },
  {
    'index':'21',
    'textureUrl':'./assets/21.png',
    'successTextureUrl':'./assets/21-g.png',
    'path':'M 34 155 L 54 155 L 34 175 L 34 155 Z'
  },
  {
    'index':'22',
    'textureUrl':'./assets/22.png',
    'successTextureUrl':'./assets/22-g.png',
    'path':'M 97 157 L 117 157 L 97 177 L 97 157 Z'
  },
  {
    'index':'23',
    'textureUrl':'./assets/23.png',
    'successTextureUrl':'./assets/23-g.png',
    'path':'M 361 130 L 381 130 L 361 150 L 361 130 Z'
  },
  {
    'index':'24',
    'textureUrl':'./assets/24.png',
    'successTextureUrl':'./assets/24-g.png',
    'path':'M 466 127 L 486 127 L 466 147 L 466 127 Z'
  },
  {
    'index':'25',
    'textureUrl':'./assets/25.png',
    'successTextureUrl':'./assets/25-g.png',
    'path':'M 566 157 L 586 157 L 566 177 L 566 157 Z'
  },
  {
    'index':'31',
    'textureUrl':'./assets/31.png',
    'successTextureUrl':'./assets/31-g.png',
    'path':'M 34 312 L 54 312 L 34 332 L 34 312 Z'
  },
  {
    'index':'32',
    'textureUrl':'./assets/32.png',
    'successTextureUrl':'./assets/32-g.png',
    'path':'M 160 314 L 180 314 L 160 334 L 160 314 Z'
  },
  {
    'index':'33',
    'textureUrl':'./assets/33.png',
    'successTextureUrl':'./assets/33-g.png',
    'path':'M 484 263 L 484 283 L 504 263 L 484 263 Z'
  },
  {
    'index':'34',
    'textureUrl':'./assets/34.png',
    'successTextureUrl':'./assets/34-g.png',
    'path':'M 592 265 L 612 265 L 592 285 L 592 265 Z'
  },
  {
    'index':'41',
    'textureUrl':'./assets/41.png',
    'successTextureUrl':'./assets/41-g.png',
    'path':'M 35 422 L 55 422 L 35 442 L 35 422 Z'
  },
  {
    'index':'42',
    'textureUrl':'./assets/42.png',
    'successTextureUrl':'./assets/42-g.png',
    'path':'M 202 389 L 202 409 L 222 389 L 202 389 Z'
  },
  {
    'index':'43',
    'textureUrl':'./assets/43.png',
    'successTextureUrl':'./assets/43-g.png',
    'path':'M 375 393 L 395 393 L 375 413 L 375 393 Z'
  },
  {
    'index':'44',
    'textureUrl':'./assets/44.png',
    'successTextureUrl':'./assets/44-g.png',
    'path':'M 464 392 L 484 392 L 464 412 L 464 392 Z'
  },
  {
    'index':'45',
    'textureUrl':'./assets/45.png',
    'successTextureUrl':'./assets/45-g.png',
    'path':'M 555 404 L 575 404 L 555 424 L 555 404 Z'
  }];

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
      var piece = new PuzzlePiece(pieceData[i].textureUrl,pieceData[i].successTextureUrl,{
        index : pieceData[i].index
      });

      var prototype = new Prototype(pieceData[i].path,{
        index : pieceData[i].index
      });

      piece.on('image:loaded', canvas.renderAll.bind(canvas));
      canvas.add(piece, prototype);
      canvas.renderAll();
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
