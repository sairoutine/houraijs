'use strict';

function PMDBoneDisplay(id) {
	this.id = id;
	this.index = null;
	this.frameIndex = null;
}
PMDBoneDisplay.STRUCTURE = {
	index: {type: 'uint16'},
	frameIndex: {type: 'uint8'}
};
module.exports = PMDBoneDisplay;
