'use strict';


function PMDFaceVertex(id, type) {
	this.id = id;
	this.type = type;
	this.index = null;
	this.position = null;
}
PMDFaceVertex.FACE_VERTEX_STRUCTURE = {
	index: {type: 'uint32'},
	position: {type: 'float', isArray: true, size: 3}
};
/*
PMDFaceVertex.prototype.toRight = function() {
  this.position[2] = -this.position[2];
};
*/
module.exports = PMDFaceVertex;
