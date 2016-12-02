'use strict';

function PMDIK(id) {
	this.id = id;
	this.index = null;
	this.targetBoneIndex = null;
	this.chainLength = null;
	this.iteration = null;
	this.limitation = null;
	this.childBoneIndices = null;
}
PMDIK.STRUCTURE = {
	index: {type: 'uint16'},
	targetBoneIndex: {type: 'uint16'},
	chainLength: {type: 'uint8'},
	iteration: {type: 'uint16'},
	limitation: {type: 'float'},
	childBoneIndices: {type: 'uint16', isArray: true, size: 'chainLength'}
};
module.exports = PMDIK;
