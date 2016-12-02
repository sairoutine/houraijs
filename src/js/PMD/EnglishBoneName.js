'use strict';

function PMDEnglishBoneName(id) {
	this.id = id;
	this.name = null;
}
PMDEnglishBoneName.STRUCTURE = {
	name: {type: 'char', isArray: true, size: 20}
};
module.exports = PMDEnglishBoneName;
