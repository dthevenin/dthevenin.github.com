/**
 * Copyright (C) 2009-2015. David Thevenin, ViniSketch (c), and
 * contributors. All rights reserved
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

var iconsTemplate =
"<div class='shortcuts vs_ui_view'> \
  <div> \
    <img src='assets/News.png'></img> \
    <span>Apps</span> \
  </div> \
  <div> \
    <img src='assets/Websearch.png'></img> \
    <span>Voice</span> \
  </div> \
  <div> \
    <img src='assets/Images.png'></img> \
    <span>Goggles</span> \
  </div> \
</div>"

var Animations = vs.core.createClass ({

  /** parent class */
  parent: vs.ui.Application,

  initComponent : function () {
    this._super ();
        
    this.googleView = new vs.ui.View ({
      id:'googleView',
      layout: vs.ui.View.ABSOLUTE_LAYOUT,
      magnet: vs.ui.View.MAGNET_CENTER
    }).init ();
    this.add (this.googleView);
    
    this.buildGoogleNowView ();
    this.buildGoogleSearchView ();
    this.configDataflow ();
  },
  
  buildGoogleNowView : function () {
      
    this.backImage = new vs.ui.ImageView ({
      src : "assets/header-bg.jpg",
      position: [0,0],
      size: [320, 200]
    }).init ();
    
    this.googleView.add (this.backImage);

    this.logoImageWhite = new vs.ui.ImageView ({
      src : "assets/google_logo_white.png",
      position: [70, 40],
      size: [180, 60],
      transformOrigin: [90, 0]
    }).init ();
    
    this.googleView.add (this.logoImageWhite);
  },

  buildGoogleSearchView : function () {

    this.logoImageColor = new vs.ui.ImageView ({
      src : "assets/google_logo_color.png",
      position: [70, 40],
      size: [180, 60],
      transformOrigin: [90, 0]
    }).init ();
    
    this.googleView.add (this.logoImageColor);

    this.searchInput = new vs.ui.InputField ({
      position: [20, 120],
      size: [280, 40],
    }).init ();
    
    this.googleView.add (this.searchInput);
    
    this.shortCuts = new vs.ui.View ({
      position: [10, 340],
      template: iconsTemplate,
      layout: vs.ui.View.HORIZONTAL_LAYOUT
    }).init ();
    
    this.googleView.add (this.shortCuts);
  },

  configDataflow: function () {
  
    // Animate Google Color log
    var trajPos = new vs.ext.fx.Vector2D ({values: [[0,0], [0, 90]]}).init ();
    var trajScale = new vs.ext.fx.Vector1D ({values: [1, 1.3]}).init ();
    var trajOpacity = new vs.ext.fx.Vector1D ({values: [0, 1]}).init ();

    var chrono = new BidirectionalChrono ({duration: 200}).init ();

    this.searchInput.bind ("focus", this, function () {
      chrono.invert = false;
      chrono.start ();
    });

    this.searchInput.bind ("blur", this, function () {
      chrono.invert = true;
      chrono.start ();
    });

    chrono.connect ("tick")
      .to (trajPos, "tick")
      .to (trajScale, "tick")
      .to (trajOpacity, "tick");

    trajPos.connect ("out").to (this.logoImageColor, "translation");
    trajScale.connect ("out").to (this.logoImageColor, "scaling");
    trajOpacity.connect ("out").to (this.logoImageColor, "opacity");    
    
    // Animate Google White logo
    var trajOpacityTer = new vs.ext.fx.Vector1D ({values: [1, 0]}).init ();

    chrono.connect ("tick").to (trajOpacityTer, "tick");
    trajPos.connect ("out").to (this.logoImageWhite, "translation");
    trajScale.connect ("out").to (this.logoImageWhite, "scaling");
    trajOpacityTer.connect ("out").to (this.logoImageWhite, "opacity");    

    // Animate search field
    var trajPosBis = new vs.ext.fx.Vector2D ({values: [[0,0], [0, 90]]}).init ();
    chrono.connect ("tick").to (trajPosBis, "tick");
    trajPosBis.connect ("out").to (this.searchInput, "translation");

    // Animate short cuts
    var trajOpacityBis = new vs.ext.fx.Vector1D ({values: [0, 1]}).init ();
    chrono.connect ("tick").to (trajOpacityBis, "tick");
    trajOpacityBis.connect ("out").to (this.shortCuts, "opacity");
   
    // Animate background image
    trajOpacityTer.connect ("out").to (this.backImage, "opacity");

    // Compile the dataflow
    vs._default_df_.build ();
  },
  
  applicationStarted : function (event) { }
});

function loadApplication () {
  new Animations ({id:"animations", layout:vs.ui.View.ABSOLUTE_LAYOUT}).init ();

  vs.ui.Application.start ();
}