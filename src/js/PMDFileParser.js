'use strict';

var PMD = require('./PMD');

var PMDFileParser = function() {

};

// is valid pmd file?
PMDFileParser.prototype.valid = function() {

	return true;
};

// parse pmd file
PMDFileParser.prototype.parse = function () {

	return new PMD();
};


module.exports = PMDFileParser;
