'use strict';
function PMDVertex(id) {
	this.id = id;
	this.position = null;
	this.normal = null;
	this.uv = null;
	this.boneIndices = null;
	this.boneWeight = null;
	this.edgeFlag = null;

	//this.boneWeightFloat1 = null;
	//this.boneWeightFloat2 = null;
}
PMDVertex.STRUCTURE = {
	position: {type: 'float', isArray: true, size: 3},
	normal: {type: 'float', isArray: true, size: 3},
	uv: {type: 'float', isArray: true, size: 2},
	boneIndices: {type: 'uint16', isArray: true, size: 2},
	boneWeight: {type: 'uint8'},
	edgeFlag: {type: 'uint8'}
};
/*
PMDVertex.prototype.setup = function() {
  this.boneWeightFloat1 = this.boneWeight/100;
  this.boneWeightFloat2 = (100-this.boneWeight)/100;
};


PMDVertex.prototype.toRight = function() {
  this.position[2] = -this.position[2];
  this.normal[2] = -this.normal[2];
};
*/
module.exports = PMDVertex;
