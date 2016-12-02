'use strict';

function PMDRigidBody(id) {
	this.id = id;
	this.name = null;
	this.boneIndex = null;
	this.groupIndex = null;
	this.groupTarget = null;
	this.shapeType = null;
	this.width = null;
	this.height = null;
	this.depth = null;
	this.position = null;
	this.rotation = null;
	this.weight = null;
	this.positionDim = null;
	this.rotationDim = null;
	this.recoil = null;
	this.friction = null;
	this.type = null;
}
PMDRigidBody.STRUCTURE = {
	name: {type: 'strings', isArray: true, size: 20},
	boneIndex: {type: 'uint16'},
	groupIndex: {type: 'uint8'},
	groupTarget: {type: 'uint16'},
	shapeType: {type: 'uint8'},
	width: {type: 'float'},
	height: {type: 'float'},
	depth: {type: 'float'},
	position: {type: 'float', isArray: true, size: 3},
	rotation: {type: 'float', isArray: true, size: 3},
	weight: {type: 'float'},
	positionDim: {type: 'float'},
	rotationDim: {type: 'float'},
	recoil: {type: 'float'},
	friction: {type: 'float'},
	type: {type: 'uint8'}
};
/*

PMDRigidBody.prototype.toRight = function() {
  this.position[2] = -this.position[2];
  this.rotation[0] = -this.rotation[0];
  this.rotation[1] = -this.rotation[1];
};
*/
module.exports = PMDRigidBody;
