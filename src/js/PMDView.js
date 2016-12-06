'use strict';

var PMDModelView = require('./PMDModelView');

var PMDView = function(layer) {
	this.layer = layer;
	this.requestID = null;

	this.modelViews = [];
};

PMDView.prototype.addPMD = function (pmd) {
	var pmd_model_view = new PMDModelView(this, pmd);
	pmd_model_view.setup();

	this.modelViews.push(pmd_model_view);
	// TODO: set position
	//__setModelsBasePosition(pmd_view.modelViews);
};

PMDView.prototype.update = function () {
	var addition_frame = 1;
	for(var i = 0, len = this.modelViews.length; i < len; i++) {
		this.modelViews[i].update(addition_frame);
	}
};

PMDView.prototype.draw = function () {

};

PMDView.prototype.run = function () {
	var self = this;
	self.update();
	self.draw();

	self.requestID = requestAnimationFrame(self.run.bind(self));
};

/*
PMDView.prototype.__setModelsBasePosition = function () {
	vat pmdModelViews = this.modelViews;
var  = function(pmdModelViews) {
  switch(pmdModelViews.length) {
    case 1:
      pmdModelViews[0].setBasePosition(0, 0, 0);
      break;
    case 2:
      pmdModelViews[0].setBasePosition(-10, 0, 0);
      pmdModelViews[1].setBasePosition( 10, 0, 0);
      break;
    case 3:
      pmdModelViews[0].setBasePosition(  0, 0,  0);
      pmdModelViews[1].setBasePosition( 10, 0, 10);
      pmdModelViews[2].setBasePosition(-10, 0, 10);
      break;
    case 4:
      pmdModelViews[0].setBasePosition(  5, 0,  0);
      pmdModelViews[1].setBasePosition( -5, 0,  0);
      pmdModelViews[2].setBasePosition( 15, 0, 10);
      pmdModelViews[3].setBasePosition(-15, 0, 10);
      break;
    case 5:
      pmdModelViews[0].setBasePosition(  0, 0,  0);
      pmdModelViews[1].setBasePosition( 10, 0, 10);
      pmdModelViews[2].setBasePosition(-10, 0, 10);
      pmdModelViews[3].setBasePosition( 20, 0, 20);
      pmdModelViews[4].setBasePosition(-20, 0, 20);
      break;
    default:
      break;
  }
};
*/

module.exports = PMDView;
