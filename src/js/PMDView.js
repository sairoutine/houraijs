'use strict';

var PMDView = function(layer) {
	this.layer = layer;
	this.requestID = null;

	this.modelViews = [];
};

PMDView.prototype.addModelView = function (model_view) {
	this.modelViews.push(model_view);
};

PMDView.prototype.update = function () {

};

PMDView.prototype.draw = function () {

};

PMDView.prototype.run = function () {
	var self = this;
	self.update();
	self.draw();

	self.requestID = requestAnimationFrame(self.run.bind(self));
};


module.exports = PMDView;
