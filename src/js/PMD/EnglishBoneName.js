'use strict';

function PMDEnglishBoneName(id) {
	this.id = id;
	this.name = null;
}
PMDEnglishBoneName.STRUCTURE = {
	name: {type: 'char', isArray: true, size: 20}
};


/*
PMDEnglishBoneName.prototype.dump = function() {
  var str = '';
  str += 'id: '   + this.id   + '\n';
  str += 'name: ' + this.name + '\n';
  return str;
};
*/

module.exports = PMDEnglishBoneName;
