'use strict';

function PMDJoint(id) {
	this.id = id;
	this.name = null;
	this.rigidBody1 = null;
	this.rigidBody2 = null;
	this.position = null;
	this.rotation = null;
	this.translationLimitation1 = null;
	this.translationLimitation2 = null;
	this.rotationLimitation1 = null;
	this.rotationLimitation2 = null;
	this.springPosition = null;
	this.springRotation = null;
}

PMDJoint.STRUCTURE = {
	name: {type: 'strings', isArray: true, size: 20},
	rigidBody1: {type: 'uint32'},
	rigidBody2: {type: 'uint32'},
	position: {type: 'float', isArray: true, size: 3},
	rotation: {type: 'float', isArray: true, size: 3},
	translationLimitation1: {type: 'float', isArray: true, size: 3},
	translationLimitation2: {type: 'float', isArray: true, size: 3},
	rotationLimitation1: {type: 'float', isArray: true, size: 3},
	rotationLimitation2: {type: 'float', isArray: true, size: 3},
	springPosition: {type: 'float', isArray: true, size: 3},
	springRotation: {type: 'float', isArray: true, size: 3}
};
/*
PMDJoint.prototype.toRight = function() {
  this.position[2] = -this.position[2];
  this.rotation[0] = -this.rotation[0];
  this.rotation[1] = -this.rotation[1];
};
*/

module.exports = PMDJoint;
