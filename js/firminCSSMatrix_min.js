(function(){"undefined"===typeof exports&&(exports=this);FirminCSSMatrix=function(a){this.m11=this.m22=this.m33=this.m44=1;this.m12=this.m13=this.m14=this.m21=this.m23=this.m24=this.m31=this.m32=this.m34=this.m41=this.m42=this.m43=0;"string"==typeof a&&this.setMatrixValue(a)};FirminCSSMatrix.displayName="FirminCSSMatrix";FirminCSSMatrix.degreesToRadians=function(a){return a*Math.PI/180};FirminCSSMatrix.determinant2x2=function(a,b,c,d){return a*d-b*c};FirminCSSMatrix.determinant3x3=function(a,b,c,
d,e,f,g,h,i){var j=FirminCSSMatrix.determinant2x2;return a*j(e,f,h,i)-d*j(b,c,h,i)+g*j(b,c,e,f)};FirminCSSMatrix.determinant4x4=function(a){var b=FirminCSSMatrix.determinant3x3,c=a.m21,d=a.m31,e=a.m41,f=a.m12,g=a.m22,h=a.m32,i=a.m42,j=a.m13,k=a.m23,l=a.m33,m=a.m43,n=a.m14,o=a.m24,p=a.m34,q=a.m44;return a.m11*b(g,k,o,h,l,p,i,m,q)-c*b(f,j,n,h,l,p,i,m,q)+d*b(f,j,n,g,k,o,i,m,q)-e*b(f,j,n,g,k,o,h,l,p)};[["m11","a"],["m12","b"],["m21","c"],["m22","d"],["m41","e"],["m42","f"]].forEach(function(a){var b=
a[0];Object.defineProperty(FirminCSSMatrix.prototype,a[1],{set:function(a){this[b]=a},get:function(){return this[b]}})});FirminCSSMatrix.prototype.isAffine=function(){return 0===this.m13&&0===this.m14&&0===this.m23&&0===this.m24&&0===this.m31&&0===this.m32&&1===this.m33&&0===this.m34&&0===this.m43&&1===this.m44};FirminCSSMatrix.prototype.multiply=function(a){var b=new FirminCSSMatrix;b.m11=a.m11*this.m11+a.m12*this.m21+a.m13*this.m31+a.m14*this.m41;b.m12=a.m11*this.m12+a.m12*this.m22+a.m13*this.m32+
a.m14*this.m42;b.m13=a.m11*this.m13+a.m12*this.m23+a.m13*this.m33+a.m14*this.m43;b.m14=a.m11*this.m14+a.m12*this.m24+a.m13*this.m34+a.m14*this.m44;b.m21=a.m21*this.m11+a.m22*this.m21+a.m23*this.m31+a.m24*this.m41;b.m22=a.m21*this.m12+a.m22*this.m22+a.m23*this.m32+a.m24*this.m42;b.m23=a.m21*this.m13+a.m22*this.m23+a.m23*this.m33+a.m24*this.m43;b.m24=a.m21*this.m14+a.m22*this.m24+a.m23*this.m34+a.m24*this.m44;b.m31=a.m31*this.m11+a.m32*this.m21+a.m33*this.m31+a.m34*this.m41;b.m32=a.m31*this.m12+a.m32*
this.m22+a.m33*this.m32+a.m34*this.m42;b.m33=a.m31*this.m13+a.m32*this.m23+a.m33*this.m33+a.m34*this.m43;b.m34=a.m31*this.m14+a.m32*this.m24+a.m33*this.m34+a.m34*this.m44;b.m41=a.m41*this.m11+a.m42*this.m21+a.m43*this.m31+a.m44*this.m41;b.m42=a.m41*this.m12+a.m42*this.m22+a.m43*this.m32+a.m44*this.m42;b.m43=a.m41*this.m13+a.m42*this.m23+a.m43*this.m33+a.m44*this.m43;b.m44=a.m41*this.m14+a.m42*this.m24+a.m43*this.m34+a.m44*this.m44;return b};FirminCSSMatrix.prototype.isIdentityOrTranslation=function(){return 1===
this.m11&&0===this.m12&&0===this.m13&&0===this.m14&&0===this.m21&&1===this.m22&&0===this.m23&&0===this.m24&&0===this.m31&&0===this.m31&&1===this.m33&&0===this.m34&&1===this.m44};FirminCSSMatrix.prototype.adjoint=function(){var a=new FirminCSSMatrix,b=FirminCSSMatrix.determinant3x3,c=this.m11,d=this.m12,e=this.m13,f=this.m14,g=this.m21,h=this.m22,i=this.m23,j=this.m24,k=this.m31,l=this.m32,m=this.m33,n=this.m34,o=this.m41,p=this.m42,q=this.m43,r=this.m44;a.m11=b(h,l,p,i,m,q,j,n,r);a.m21=-b(g,k,o,i,
m,q,j,n,r);a.m31=b(g,k,o,h,l,p,j,n,r);a.m41=-b(g,k,o,h,l,p,i,m,q);a.m12=-b(d,l,p,e,m,q,f,n,r);a.m22=b(c,k,o,e,m,q,f,n,r);a.m32=-b(c,k,o,d,l,p,f,n,r);a.m42=b(c,k,o,d,l,p,e,m,q);a.m13=b(d,h,p,e,i,q,f,j,r);a.m23=-b(c,g,o,e,i,q,f,j,r);a.m33=b(c,g,o,d,h,p,f,j,r);a.m43=-b(c,g,o,d,h,p,e,i,q);a.m14=-b(d,h,l,e,i,m,f,j,n);a.m24=b(c,g,k,e,i,m,f,j,n);a.m34=-b(c,g,k,d,h,l,f,j,n);a.m44=b(c,g,k,d,h,l,e,i,m);return a};FirminCSSMatrix.prototype.inverse=function(){var a,b,c,d;if(this.isIdentityOrTranslation())return a=
new FirminCSSMatrix,0===this.m41&&0===this.m42&&0===this.m43||(a.m41=-this.m41,a.m42=-this.m42,a.m43=-this.m43),a;b=this.adjoint();a=FirminCSSMatrix.determinant4x4(this);if(1.0E-8>Math.abs(a))return null;for(c=1;5>c;c++)for(d=1;5>d;d++)b["m"+c+d]/=a;return b};FirminCSSMatrix.prototype.rotate=function(a,b,c){var d=FirminCSSMatrix.degreesToRadians;if("number"!=typeof a||isNaN(a))a=0;if(("number"!=typeof b||isNaN(b))&&("number"!=typeof c||isNaN(c)))c=a,b=a=0;if("number"!=typeof b||isNaN(b))b=0;if("number"!=
typeof c||isNaN(c))c=0;var a=d(a),b=d(b),c=d(c),d=new FirminCSSMatrix,e=new FirminCSSMatrix,f=new FirminCSSMatrix,g,c=c/2;g=Math.sin(c);c=Math.cos(c);f.m11=f.m22=1-2*g*g;f.m12=f.m21=2*g*c;f.m21*=-1;b/=2;g=Math.sin(b);c=Math.cos(b);e.m11=e.m33=1-2*g*g;e.m13=e.m31=2*g*c;e.m13*=-1;a/=2;g=Math.sin(a);c=Math.cos(a);d.m22=d.m33=1-2*g*g;d.m23=d.m32=2*g*c;d.m32*=-1;return f.multiply(e).multiply(d).multiply(this)};FirminCSSMatrix.prototype.rotateAxisAngle=function(a,b,c,d){if("number"!=typeof a||isNaN(a))a=
0;if("number"!=typeof b||isNaN(b))b=0;if("number"!=typeof c||isNaN(c))c=0;if("number"!=typeof d||isNaN(d))d=0;0===a&&0===b&&0===c&&(c=1);var e=new FirminCSSMatrix,f=Math.sqrt(a*a+b*b+c*c),g,h,i,d=(FirminCSSMatrix.degreesToRadians(d)||0)/2;g=Math.cos(d);h=Math.sin(d);d=h*h;0===f?(b=a=0,c=1):1!==f&&(a/=f,b/=f,c/=f);1===a&&0===b&&0===c?(e.m22=e.m33=1-2*d,e.m23=e.m32=2*g*h,e.m32*=-1):0===a&&1===b&&0===c?(e.m11=e.m33=1-2*d,e.m13=e.m31=2*g*h,e.m13*=-1):0===a&&0===b&&1===c?(e.m11=e.m22=1-2*d,e.m12=e.m21=
2*g*h,e.m21*=-1):(f=h*g,g=a*a,h=b*b,i=c*c,e.m11=1-2*(h+i)*d,e.m12=2*(a*b*d+c*f),e.m13=2*(a*c*d-b*f),e.m21=2*(b*a*d-c*f),e.m22=1-2*(i+g)*d,e.m23=2*(b*c*d+a*f),e.m31=2*(c*a*d+b*f),e.m32=2*(c*b*d-a*f),e.m33=1-2*(g+h)*d);return this.multiply(e)};FirminCSSMatrix.prototype.scale=function(a,b,c){var d=new FirminCSSMatrix;if("number"!=typeof a||isNaN(a))a=1;if("number"!=typeof b||isNaN(b))b=a;if("number"!=typeof c||isNaN(c))c=1;d.m11=a;d.m22=b;d.m33=c;return this.multiply(d)};FirminCSSMatrix.prototype.translate=
function(a,b,c){var d=new FirminCSSMatrix;if("number"!=typeof a||isNaN(a))a=0;if("number"!=typeof b||isNaN(b))b=0;if("number"!=typeof c||isNaN(c))c=0;d.m41=a;d.m42=b;d.m43=c;return this.multiply(d)};FirminCSSMatrix.prototype.setMatrixValue=function(a){var a=a.trim(),b=a.match(/^matrix(3d)?\(\s*(.+)\s*\)$/),c,d,e,f;if(b&&(a=!!b[1],b=b[2].split(/\s*,\s*/),c=b.length,d=Array(c),!(a&&16!==c)&&(a||6===c))){for(e=0;e<c;e++)if(f=b[e],f.match(/^-?\d+(\.\d+)?$/))d[e]=parseFloat(f);else return;for(e=0;e<c;e++)point=
a?"m"+(Math.floor(e/4)+1)+(e%4+1):String.fromCharCode(e+97),this[point]=d[e]}};FirminCSSMatrix.prototype.toString=function(){var a=this,b,c;this.isAffine()?(c="matrix(",b="a,b,c,d,e,f".split(",")):(c="matrix3d(",b="m11,m12,m13,m14,m21,m22,m23,m24,m31,m32,m33,m34,m41,m42,m43,m44".split(","));return c+b.map(function(b){return a[b].toFixed(6)}).join(", ")+")"};exports.FirminCSSMatrix=FirminCSSMatrix}).call(this);
