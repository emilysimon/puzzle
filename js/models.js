var PuzzlePiece = fabric.util.createClass(fabric.Object, fabric.Observable, {
  originX: 'center',
  originY: 'center',
  initialize: function(src, options) {
    this.callSuper('initialize', options);
    this.image = new Image();
    this.image.src = src;
    this.image.onload = (function() {
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
      console.log('*** piece selected ***');
      this.bringToFront();
    });
  },
  checkStatus: function(){
    this.on('modified', function() {
      console.log('*** check piece status ***');
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
        console.log("*** piece intersected ***");
        this.success(p);
      }
    });
  },
  success: function(p){
    console.log("///////// \n piece Solved \n /////////");
    this.isSolved = true;
    this.originX = 'left';
    this.originY = 'top';
    this.left = p.left;
    this.top = p.top;
    this.selectable = false;

    console.log(canvas);
  }
});


var Prototype = fabric.util.createClass(fabric.Path, fabric.Observable, {
  initialize: function(paths, options) {
    this.callSuper('initialize', paths, options);
  }
});
