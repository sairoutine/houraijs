'use strict';

function PMDEnglishFaceName(id) {
	this.id = id;
	this.name = null;
}

PMDEnglishFaceName.STRUCTURE = {
	name: {type: 'char', isArray: true, size: 20}
};
module.exports = PMDEnglishFaceName;
