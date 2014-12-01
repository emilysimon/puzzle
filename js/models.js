var debug = false;

var PuzzlePiece = fabric.util.createClass(fabric.Object, fabric.Observable, {
  originX: 'center',
  originY: 'center',
  initialize: function(src, options) {
    this.callSuper('initialize', options);
    this.image = new Image();
    this.image.src = src;
    this.type = "piece";
    this.hasControls = false;
    this.hasRotatingPoint = false;
    this.hasBorders = false;
    this.isSolved = false;
    this.image.onload = (function() {
      this.left = Math.floor(Math.random()*100)+820; //this.image.width;
      this.top = Math.floor(Math.random()*500)+100; //this.image.height;
      this.width = this.image.width;
      this.height = this.image.height;
      this.loaded = true;
      this.setCoords();
      this.active();
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
      if(debug) console.log('*** piece selected ***');
      this.bringToFront();
      this.setShadow({ color: 'rgba(0,0,0,0.3)', offsetX: 20, offsetY: 20});
    });
  },
  checkStatus: function(){
    this.on('modified', function() {
      if(debug)  console.log('*** check piece status ***');
      // console.log(this.index);
      var t, st;
      var p, sp;
      var t = this;

      canvas.forEachObject(function(obj) {
        if(obj.index === t.index && obj.type === "prototype") {
          // console.log(obj);
          p = obj;
          sp = p.clone();

          sp.set({
            type: "intersect-checkbox",
            width: p.width / 3,
            height: p.height / 3,
          });
          canvas.add(sp);
          // console.log(sp);
          // console.log(p);
        }
      });

      if(t.intersectsWithObject(sp)){
        if(debug) console.log("*** piece intersected ***");
        this.success(p);
      }
    });
  },
  success: function(p){
    if(debug) console.log("///////// \n piece Solved \n /////////");
    this.isSolved = true;
    this.originX = 'left';
    this.originY = 'top';
    this.left = p.left;
    this.top = p.top;
    this.selectable = false;
    // this.opacity = 0.3;


    var options = {
      easing: fabric.util.ease.easeOutCubic,
      duration: 500,
      onChange: canvas.renderAll.bind(canvas)
    };
    this.animate({
      // opacity: 1,
      'shadow.offsetX' : 0,
      'shadow.offsetY' : 0,
    }, options);
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
    // fill:'rgba(255,0,0,0.2)'
    this.visible = false;
    // this.stroke = "white";
    // this.strokeWidth = 20;
  }
});
