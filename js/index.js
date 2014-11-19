var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var canvas;
var piece1, piece2, piece3;
var texture1, texture2, texture3;

var pieceData = [
  {
    'index':'1',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/test.png',
    'path':'M 310.807 252.303 L 291.308 383.546 L 268.809 383.546 L 78.318 388.796 L 73.068 388.796 L 53.569 228.304 L 53.569 220.055 L 176.563 220.055 L 178.813 238.054 z'
  },
  {
    'index':'2',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/test2.png',
    'path':'M 268.809 383.546 L 78.318 388.796 L 74.568 433.794 L 40.07 436.794 L 63.319 652.783 L 313.807 635.533 L 268.809 383.546 z'
  },
  {
    'index':'3',
    'pieceObj':'',
    'textureObj':'',
    'textureUrl':'./assets/test3.png',
    'path':'M 268.809 383.546 L 291.308 383.546 L 310.807 252.303 L 367.054 252.303 L 367.054 264.302 L 526.046 276.302 L 533.546 302.551 L 722.536 324.299 L 722.536 405 L 754.035 412.795 L 763.784 648.283 L 313.807 635.533 z'
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
    adjustCanvasSize();
    canvas = new fabric.Canvas('canvas');
  });

  $(window).load(function() {
    adjustCanvasSize();
    canvas = this.__canvas = new fabric.Canvas('canvas');
    for(var i = 0; i < pieceData.length ; i++){
      createPieces(pieceData[i]);
    }
  });

});

function adjustCanvasSize(){
  //original pic size: width="1080" height="810"
  var cw = width-30;
  var ch = height*0.92;

  $('canvas').attr('width',cw+"px").attr('height',ch+"px");

}


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
  data.pieceObj.set({hasControls:false, hasBorders:false});

  data.pieceObj.fill = data.textureObj;
  // console.log(data.pieceObj);
  canvas.add(data.pieceObj);

  });

}
