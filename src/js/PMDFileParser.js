'use strict';

var PMD = require('./PMD');

var PMDFileParser = function(buffer) {
	this.uint8 = new Uint8Array(buffer);
	this.offset = 0;
};

// is valid pmd file?
PMDFileParser.prototype.valid = function() {
	// TODO: 
	return true;
};

// parse pmd file
PMDFileParser.prototype.parse = function () {

	return new PMD();
};


module.exports = PMDFileParser;
