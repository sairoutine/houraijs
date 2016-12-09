'use strict';

var glMatrix = require('gl-matrix');
var vec3 = glMatrix.vec3;

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

PMDView.prototype.update = function (addition_frame) {
	if(addition_frame === 0) return;

	for(var i = 0, len = this.modelViews.length; i < len; i++) {
		this.modelViews[i].update(addition_frame);
	}
};

PMDView.prototype.draw = function (addition_frame) {
	if(addition_frame === 0) return;

	var layer = this.layer;
	var gl = layer.gl;
	var shader = layer.shader;

	gl.uniform1i(shader.shadowMappingUniform, 0);

	// set camera params
	layer.viewport();
	layer.perspective(60); // camera angle

	layer.identity();

	var eye = [0, 0, 0];
	var center = [0, 0, 0];
	var up = [0, 0, 0];
	//this._getCalculatedCameraParams(eye, center, up);
	layer.lookAt(eye, center, up);

	// set draw params
	gl.uniform1i(shader.uSkinningTypeUniform, 2); // SKINNING_CPU_AND_GPU
	gl.uniform1i(shader.uLightingTypeUniform, 1); // LIGHTING_ON
	gl.uniform3fv(shader.lightColorUniform, [1.0, 1.0, 1.0]); // light color

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.uniform1i(shader.shadowGenerationUniform, 0);

	gl.bindFramebuffer(gl.FRAMEBUFFER, null);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	for(var i = 0, len = this.modelViews.length; i < len; i++) {
		this.modelViews[i].draw(addition_frame);
	}

	gl.flush();
};
/*
PMDView.prototype._getCalculatedCameraParams = function(eye, center, up) {
  this.vec3.set(this.eye, eye);
  this.vec3.set(this.center, center);
  this.vec3.set(this.up, up);
  this.quat4.multiplyVec3(this.cameraQuaternion, eye, eye);
  this.quat4.multiplyVec3(this.cameraQuaternion, up, up);

  var t = [0, 0, 0];
  this.vec3.set(this.cameraTranslation, t);
  this.quat4.multiplyVec3(this.cameraQuaternion, t, t);

  this.vec3.add(eye, t, eye);
  this.vec3.add(center, t, center);

  var d = [0, 0, 0];
  this.vec3.subtract(eye, center, d);
  eye[0] += d[0] * this.cameraDistance * 0.01;
  eye[1] += d[1] * this.cameraDistance * 0.01;
  eye[2] += d[2] * this.cameraDistance * 0.01;
};
*/







PMDView.prototype.run = function () {
	var self = this;
	var addition_frame = self.calcAdditionFrame();

	self.update(addition_frame);
	self.draw(addition_frame);

	self.requestID = requestAnimationFrame(self.run.bind(self));
};


PMDView.prototype.calcAdditionFrame = function () {
	return 1;
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
