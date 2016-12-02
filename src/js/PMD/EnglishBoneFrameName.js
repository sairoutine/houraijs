'use strict';


function PMDEnglishBoneFrameName(id) {
	this.id = id;
	this.name = null;
}
PMDEnglishBoneFrameName.STRUCTURE = {
	name: {type: 'char', isArray: true, size: 50}
};


/*
PMDEnglishBoneFrameName.prototype.dump = function() {
  var str = '';
  str += 'id: '   + this.id   + '\n';
  str += 'name: ' + this.name + '\n';
  return str;
};
*/
module.exports = PMDEnglishBoneFrameName;
