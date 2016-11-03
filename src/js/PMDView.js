'use strict';

var PMDView = function() {
	this.requestID = null;
};

PMDView.prototype.addModelView = function () {

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
