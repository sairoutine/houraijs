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
PMDRigidBody.prototype.dump = function() {
  var str = '';
  str += 'id: '          + this.id          + '\n';
  str += 'name: '        + this.name        + '\n';
  str += 'boneIndex: '   + this.boneIndex   + '\n';
  str += 'groupIndex: '  + this.groupIndex  + '\n';
  str += 'groupTarget: ' + this.groupTarget + '\n';
  str += 'shapeType: '   + this.shapeType   + '\n';
  str += 'width: '       + this.width       + '\n';
  str += 'height: '      + this.height      + '\n';
  str += 'depth: '       + this.depth       + '\n';
  str += 'position: '    + this.position    + '\n';
  str += 'rotation: '    + this.rotation    + '\n';
  str += 'weight: '      + this.weight      + '\n';
  str += 'positionDim: ' + this.positionDim + '\n';
  str += 'rotationDim: ' + this.rotationDim + '\n';
  str += 'recoil: '      + this.recoil      + '\n';
  str += 'friction: '    + this.friction    + '\n';
  str += 'type: '        + this.type        + '\n';
  return str;
};


PMDRigidBody.prototype.toRight = function() {
  this.position[2] = -this.position[2];
  this.rotation[0] = -this.rotation[0];
  this.rotation[1] = -this.rotation[1];
};
*/
module.exports = PMDRigidBody;
