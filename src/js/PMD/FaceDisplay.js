'use strict';

function PMDFaceDisplay(id) {
	this.id = id;
	this.index = null;
}
PMDFaceDisplay.FACE_DISPLAY_STRUCTURE = {
	index: {type: 'uint16'}
};
module.exports = PMDFaceDisplay;
