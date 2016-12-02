'use strict';

function PMDEnglishFaceName(id) {
	this.id = id;
	this.name = null;
}

PMDEnglishFaceName.STRUCTURE = {
	name: {type: 'char', isArray: true, size: 20}
};




/*
PMDEnglishFaceName.prototype.dump = function() {
  var str = '';
  str += 'id: '   + this.id   + '\n';
  str += 'name: ' + this.name + '\n';
  return str;
};
*/
module.exports = PMDEnglishFaceName;
