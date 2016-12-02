'use strict';

function PMDBoneFrameName(id) {
	this.id = id;
	this.name = null;
}

PMDBoneFrameName.STRUCTURE = {
	name: {type: 'strings', isArray: true, size: 50}
};



/*
PMDBoneFrameName.prototype.dump = function() {
  var str = '';
  str += 'id: '   + this.id   + '\n';
  str += 'name: ' + this.name + '\n';
  return str;
};
*/
module.exports = PMDBoneFrameName;
