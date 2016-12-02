'use strict';

function PMDToonTexture(id) {
	this.id = id;
	this.fileName = null;
}
PMDToonTexture.TOON_TEXTURE_STRUCTURE = {
	fileName: {type: 'char', isArray: true, size: 100}
};
module.exports = PMDToonTexture;
