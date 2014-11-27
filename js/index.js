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
    canvas = this.__canvas = new fabric.Canvas('canvas');
    canvas.selection = false

    for(var i = 0; i < pieceData.length ; i++){
      createPieces(pieceData[i]);
    }
    for(var i = 0; i < pieceData.length ; i++){
      createPrototypes(pieceData[i]);
    }

    // cache();

    canvas.on({
      'object:moving': checkSelectedObject
    });

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

  //scale = screenWidth / canvasWidth
  //newPieceWidth = originalPieceWidth * scale
  // scale = cw/ow;

}

//------createPrototypes- Initially create puzzle pieces position prototype-----//

function createPrototypes(data){

  data.prototype = new fabric.Path(data.path);
  data.prototype.set({
    index:data.index,
    selectable:false,
    hasControls:false,
    hasRotatingPoint:false,
    isSolved:false,
    fill:'rgba(255,255,255,0)'
  });

  canvas.add(data.prototype);
}

//------createPieces- Initially create and display puzzle pieces-----//

function createPieces(data){

  var random_l = Math.random();
  var random_t = Math.random();
  var _left = Math.floor(random_l*100)+750;
  var _top = Math.floor(random_t*400)+100;

  fabric.Image.fromURL(data.textureUrl, function(img) {
    img.scale(1).set({
      index: data.index,
      left: _left,
      top: _top,
      hasControls:false,
      hasRotatingPoint:false,
      hasBorders:false,
      isSolved:false
    });
    canvas.add(img).setActiveObject(img);
  });


}

//------cache- cache SVG as a image object for performance-----//


function cache() {
  console.log("in chache");

  canvas.forEachObject(function(obj, i) {
    // console.log(canvas);
    if (obj.type === 'image') return;

    var scaleX = obj.scaleX;
    var scaleY = obj.scaleY;

    canvas.remove(obj);
    obj.scale(1).cloneAsImage(function(clone) {
      clone.set({
        left: obj.left,
        top: obj.top,
        scaleX: scaleX,
        scaleY: scaleY
      });
      canvas.insertAt(clone, i);
    });
  });
}

function adjustSize() {
  console.log(canvas.getActiveObject());
}

function checkSelectedObject(options) {
  selectedObject = options.target;
  selectedObject.setCoords();
  canvas.forEachObject(function(obj) {
    if(!obj.selectable && !obj.isSolved && selectedObject.index === obj.index) {
      selectedPrototype=obj;
    }
  });
  //console.log("selectedObject: "+ selectedObject);
  //console.log("selectedPrototype: "+ selectedPrototype);
  checkIntersect(selectedObject, selectedPrototype);
}


function checkIntersect(obj, objPrototype){

  var checkRect = new fabric.Rect({
    left: objPrototype.left,
    top: objPrototype.top+objPrototype.height/3,
    width: objPrototype.width/3,
    height: objPrototype.height/3,
    visible: false,
    selectable:false,
    hasControls:false,
    hasRotatingPoint:false
  });

  checkObjectCanvas = new fabric.StaticCanvas();
  checkObjectCanvas.add(checkRect);

  if(obj.intersectsWithObject(checkRect)){
    console.log("intersected");
    checkObjectCanvas.clear();

    successAnimation(obj, objPrototype);

    // canvas.on({
    //   'mouse:down': successAnimation(obj, objPrototype)
    // });
  }


}

function successAnimation(obj, objPrototype){
  obj.left = objPrototype.left;
  obj.top = objPrototype.top;
  obj.selectable = false;
  obj.isSolved = true;
  objPrototype.isSolved = true;
  // obj.animate('left',objPrototype.left,{
  //   duration:2000
  // });

}
