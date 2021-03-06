 
define ('ListItem', [], function () {

var ListItem = vs.core.createClass ({

  /** parent class */
  parent: vs.ui.GLView,
  
  properties: {
    "imageUrl": "imageView#src",
    "title": "titleView#text",
    "description": "infoView#text",
    "rating": {
      set: function (v) {
        v = parseFloat (v);
        if (isNaN (v) || v < 0) { v = 0; }
        if (v > 5) { v = 5; }
        
        this._rating = v;
        this.setRating (v);
      }
    }
  },
  
  initComponent: function () {
    this._super ();
    
    var size = this.__config__.size;
    if (!size) {
      size = [300, 70]
    }
    
    this.imageView = new vs.ui.GLImage ({
      position: [5, 5],
      size: [60, 60]
    }).init ();
    this.add (this.imageView);
    this.imageView.style.backgroundColor = GLColor.transparent;


    this.titleView = new vs.ui.GLText ({
      size: [size [0] - 80, 20],
      position: [70, 5]
    }).init ();
    
    this.titleView.style.fontSize = "18px";
    this.titleView.style.fontFamily = "arial";
    this.titleView.style.color = GLColor.black;
    this.titleView.style.textAlign = "left";

    this.add (this.titleView);

    this.infoView = new vs.ui.GLText ({
      size: [size [0] - 80, 20],
      position: [70, 25]
    }).init ();
    
    this.infoView.style.fontSize = "12px";
    this.infoView.style.fontFamily = "arial";
    this.infoView.style.color = GLColor.black;
    this.infoView.style.textAlign = "left";

    this.add (this.infoView);

    this.ratingView = new vs.ui.GLText ({
      size: [100, 15],
      position: [size [0] - 120, size[1] - 15]
    }).init ();
    
    this.ratingView.style.fontSize = "10px";
    this.ratingView.style.fontFamily = "FontAwesome";
    this.ratingView.style.color = new GLColor (100, 100, 100);
    this.ratingView.style.textAlign = "right";

    this.add (this.ratingView);
  },

  setRating : function (rating) {
    var text = rating + ": ";

    for (var i = 1; i < 6; i++) {
      if (rating >= i)
        text += "\uf005";
      else if (rating < i && rating > i - 1)
        text += "\uf123";
      else
        text += "\uf006";
    }
    
    this.ratingView.text = text;
  }
});

return ListItem;
});