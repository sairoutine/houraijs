'use strict';
function PMDHeader() {
	this.magic = null;
	this.version = null;
	this.modelName = null;
	this.comment = null;
}


PMDHeader.prototype.valid = function() {
	return (this.magic === 'Pmd');
};


module.exports = PMDHeader;
