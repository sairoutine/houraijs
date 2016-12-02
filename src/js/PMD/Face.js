'use strict';
function PMDFace(id) {
	this.id = id;
	this.name = null;
	this.vertexCount = null;
	this.type = null;
	this.vertices = null;

	//this.done = false;

	this.motionIndex = null; // used by VMD;
}
PMDFace.FACE_STRUCTURE = {
	name: {type: 'strings', isArray: true, size: 20},
	vertexCount: {type: 'uint32'},
	type: {type: 'uint8'},
	vertices: {type: 'object', isArray: true, size: 'vertexCount'}
};

/*
PMDFace.prototype.toRight = function() {
  for(var i = 0; i < this.vertices.length; i++) {
    this.vertices[i].toRight();
  }
};
*/

module.exports = PMDFace;
