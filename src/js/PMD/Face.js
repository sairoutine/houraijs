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
PMDFace.prototype.dump = function() {
  var str = '';
  str += 'id: ' + this.id + '\n';
  str += 'name: ' + this.name + '\n';
  str += 'vertexCount: ' + this.vertexCount + '\n';
  str += 'type: ' + this.type + '\n';

  for(var i = 0; i < this.vertices.length; i++) {
    str += this.vertices[i].dump();
  }

  return str;
};


PMDFace.prototype.toRight = function() {
  for(var i = 0; i < this.vertices.length; i++) {
    this.vertices[i].toRight();
  }
};
*/

module.exports = PMDFace;
