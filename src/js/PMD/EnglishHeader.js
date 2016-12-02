'use strict';

function PMDEnglishHeader() {
	this.compatibility = null;
	this.modelName = null;
	this.comment = null;
}

PMDEnglishHeader.STRUCTURE = {
	compatibility: {type: 'uint8'},
	modelName: {type: 'char', isArray: true, size: 20},
	comment: {type: 'char', isArray: true, size: 256}
};
module.exports = PMDEnglishHeader;
