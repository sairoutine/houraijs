'use strict';
function PMDBone(id) {
	this.id = id;
	this.name = null;
	this.parentIndex = null;
	this.tailIndex = null;
	this.type = null;
	this.ikIndex = null;
	this.position = null;

	this.motionIndex = null; // used by VMD
}

PMDBone.STRUCTURE = {
	name: {type: 'strings', isArray: true, size: 20},
	parentIndex: {type: 'uint16'},
	tailIndex: {type: 'uint16'},
	type: {type: 'uint8'},
	ikIndex: {type: 'uint16'},
	position: {type: 'float', isArray: true, size: 3}
};




/*
PMDBone.prototype.isKnee = function() {
  // TODO: change this parameter if name type changes.
  return this.name.indexOf('0x820xd00x820xb4') >= 0;
};

PMDBone.prototype.toRight = function() {
  this.position[2] = -this.position[2];
};
*/


module.exports = PMDBone;
