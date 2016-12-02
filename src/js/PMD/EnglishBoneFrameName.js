'use strict';


function PMDEnglishBoneFrameName(id) {
	this.id = id;
	this.name = null;
}
PMDEnglishBoneFrameName.STRUCTURE = {
	name: {type: 'char', isArray: true, size: 50}
};
module.exports = PMDEnglishBoneFrameName;
