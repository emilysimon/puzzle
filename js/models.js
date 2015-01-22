var debug = false;
var successCount = 0;
var activeShadowColor = 'rgba(0,0,0,0.3)';
var activeShadowOffset = 20;

var PuzzlePiece = fabric.util.createClass(fabric.Object, fabric.Observable, {
  originX: 'left',
  originY: 'top',
  initialize: function(src, successSrc, options) {
    this.callSuper('initialize', options);
    this.image = new Image();
    this.image.src = src;
    this.type = "piece";
    this.hasControls = false;
    this.hasRotatingPoint = false;
    this.hasBorders = false;
    this.isSolved = false;
    this.successImage =successSrc;
    this.image.onload = (function() {
      this.left = Math.floor(Math.random()*100)+720; //this.image.width;
      this.top = Math.floor(Math.random()*450)+50; //this.image.height;
      this.width = this.image.width;
      this.height = this.image.height;
      this.loaded = true;
      this.setCoords();
      this.active();
      this.inactive();
      this.checkStatus();
      this.fire('image:loaded');
    }).bind(this);
  },
  _render: function(ctx) {
    if (this.loaded) {
      ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
    }
  },
  active: function(){
    this.on('selected', function() {
      canvas.forEachObject(function(obj) {
        if(obj != this) {
          obj.setShadow({ color: 'rgba(0,0,0,0)', offsetX: 0, offsetY: 0});
        }
      });
      if(debug) console.log('*** piece selected ***');
      this.bringToFront();
      this.setShadow({ color: activeShadowColor, offsetX: activeShadowOffset, offsetY: activeShadowOffset});


    });
  },
  inactive: function(obj){

  },
  checkStatus: function(){
    this.on('modified', function() {
      if(debug)  console.log('*** check piece status ***');
      var p;
      var t = this;
      canvas.forEachObject(function(obj) {
        if(obj.index === t.index && obj.type === "prototype") {
            p = obj;
        }
      });

      if(t.intersectsWithObject(p)){
        if(debug) console.log("*** piece intersected ***");
        t.success(p);
      }
    });
  },
  success: function(p){
    if(debug) console.log("///////// \n piece Solved \n /////////");

    this.set({originX: 'left', originY: 'top', left: p.left, top: p.top, isSolved: true, selectable: false});
    this.animate({
      // opacity: 1,
      'shadow.offsetX' : 0,
      'shadow.offsetY' : 0,
    }, {
      easing: fabric.util.ease.easeOutCubic,
      duration: 500,
      onChange: canvas.renderAll.bind(canvas)
    });

    this.drawSuccessImage();
    successCount++;
    // console.log(successCount);
    if(successCount == 19) this.checkAllSolved();

  },
  drawSuccessImage: function(){
    if(debug) console.log("///////// \n draw goldish piece top of the original piece \n /////////");
    // console.log(this);
    var successPiece = new SuccessPiece(this.successImage);

    successPiece.set({left:this.left, top:this.top, index: this.index, selectable: false});
    canvas.add(successPiece);
    canvas.renderAll();
    // console.log(successPiece);

    successPiece.animate({
      opacity: 1
    }, {
      easing: fabric.util.ease.easeOutCubic,
      duration: 2000,
      onChange: canvas.renderAll.bind(canvas)
    });

  },
  checkAllSolved: function(){
    if(debug) console.log("///////// \n draw key stone after all pieces solved \n /////////");
    var keyStone = new SuccessPiece('./assets/key.png');

    keyStone.set({left:218, top:174, index: this.index, selectable: false});
    canvas.add(keyStone);
    canvas.renderAll();
    // console.log(successPiece);

    keyStone.animate({
      opacity: 1
    }, {
      easing: fabric.util.ease.easeOutCubic,
      duration: 4000,
      onChange: canvas.renderAll.bind(canvas)
    });
  }
});


var Prototype = fabric.util.createClass(fabric.Path, fabric.Observable, {
  initialize: function(paths, options) {
    this.callSuper('initialize', paths, options);
    this.type = "prototype";
    this.selectable = false;
    this.hasControls = false;
    this.hasRotatingPoint = false;
    this.hasBorders = false;
    this.isSolved = false;
    this.fill = 'red';
    this.visible = false;

  }
});

var SuccessPiece = fabric.util.createClass(fabric.Object, fabric.Observable, {
  originX: 'left',
  originY: 'top',
  opacity: 0,
  initialize: function(src, successSrc, options) {
    this.callSuper('initialize', options);
    this.image = new Image();
    this.image.src = src;
    this.type = "success-piece";
    this.hasControls = false;
    this.hasRotatingPoint = false;
    this.hasBorders = false;
    this.isSolved = false;
    this.image.onload = (function() {
      this.width = this.image.width;
      this.height = this.image.height;
      this.loaded = true;
      this.fire('image:loaded');
    }).bind(this);
  },
  _render: function(ctx) {
    if (this.loaded) {
      ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
    }
  }
});
