'use strict';

function PMDBoneFrameName(id) {
	this.id = id;
	this.name = null;
}

PMDBoneFrameName.STRUCTURE = {
	name: {type: 'strings', isArray: true, size: 50}
};
module.exports = PMDBoneFrameName;
