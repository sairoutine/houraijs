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
/*
PMDEnglishHeader.prototype.dump = function() {
  var str = '';
  str += 'compatibility: ' + this.compatibility + '\n';
  str += 'modelName:     ' + this.modelName     + '\n';
  str += 'comment: '       + this.comment       + '\n';
  return str;
};
*/
module.exports = PMDEnglishHeader;
