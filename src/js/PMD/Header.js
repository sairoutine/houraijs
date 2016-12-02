'use strict';
function PMDHeader() {
	this.magic = null;
	this.version = null;
	this.modelName = null;
	this.comment = null;
}
PMDHeader.HEADER_STRUCTURE = {
	magic: {type: 'char', isArray: true, size: 3},
	version: {type: 'float'},
	modelName: {type: 'char', isArray: true, size: 20},
	comment: {type: 'char', isArray: true, size: 256}
};

PMDHeader.prototype.valid = function() {
	return (this.magic === 'Pmd');
};

module.exports = PMDHeader;
