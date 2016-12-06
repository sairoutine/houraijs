'use strict';

/* WebGL layer */
var Layer = function(canvas) {
	this.canvas = canvas;
	this.gl = this._initWebGL(canvas);

};


Layer.prototype._initWebGL = function(canvas) {
	var NAMES = ['webgl', 'experimental-webgl'];
	var context = null;

	for (var i = 0; i < NAMES.length; i++) {
		try {
			context = canvas.getContext(NAMES[i], {antialias: true});

		}
		catch(e) {}
	}

	if(context) {
		context.viewportWidth = canvas.width;
		context.viewportHeight = canvas.height;
	}
	else {
		window.alert("Failed to get WebGL context.");
	}

	return context;
};



module.exports = Layer;
