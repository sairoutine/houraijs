'use strict';
function PMDVertexIndex(id) {
	this.id = id;
	this.index = null;
}
PMDVertexIndex.STRUCTURE = {
	index: {type: 'uint16'}
};
module.exports = PMDVertexIndex;
