'use strict';

var HEADER_STRUCTURE = {
	magic: {type: 'char', isArray: true, size: 3},
	version: {type: 'float'},
	modelName: {type: 'char', isArray: true, size: 20},
	comment: {type: 'char', isArray: true, size: 256}
};



var PMD = require('./PMD');
var PMDHeader = require('./PMDHeader');

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
	this.offset = 0;
	var pmd = new PMD();

	// TODO: parser
	this._parseHeader(pmd);

	return pmd;
};

PMDFileParser.prototype._parseHeader = function(pmd) {
	pmd.header = new PMDHeader();
	this._parseObject(pmd.header, HEADER_STRUCTURE);
};

PMDFileParser.prototype._parseObject = function(obj, structure) {
	var o = this.offset;
	for(var key in structure) {
		obj[key] = this._getValue(structure[key], this.offset);
		this.offset += this._sizeof(structure[key]);
	}
};

PMDFileParser.prototype._getValue = function(param, offset) {
	if(param.isArray) {
		return this._getValueArray(param, offset);
	}
	else {
		return this._getValueScalar(param, offset);
	}
};

// TODO: use DataView class
PMDFileParser.prototype._getValueScalar = function(param, offset) {
	switch(param.type) {
		case 'char':
			return this._getChars(offset, 1);
		case 'strings':
			return this._getStrings(offset, 1);
		case 'uint8':
			return this._getUint8(offset);
		case 'uint16':
			return this._getUint16(offset);
		case 'uint32':
			return this._getUint32(offset);
		case 'float':
			return this._getFloat(offset);
		default:
			throw new Error('error: undefined type ' + param.type);
	}
};

PMDFileParser.prototype._getValueArray = function(param, offset) {
	if(param.type === 'char') {
		return this._getChars(offset, param.size);
	}

	else if(param.type === 'strings') {
		return this._getStrings(offset, param.size);
	}
	else {
		var array = [];
		var size = this._sizeofScalar(param);

		for(var i = 0; i < param.size; i++) {
			array[i] = this._getValueScalar(param, offset);
			offset += size;
		}

		return array;
	}
};

PMDFileParser.prototype._getUint8 = function(pos) {
	return this.uint8[pos];
};


PMDFileParser.prototype._getUint16 = function(pos) {
	return this._getValueWithReverseByteOrder(pos, 2);
};


PMDFileParser.prototype._getUint32 = function(pos) {
	return this._getValueWithReverseByteOrder(pos, 4);
};


PMDFileParser.prototype._getFloat = function(pos) {
	return this._toBinary32(this._getValueWithReverseByteOrder(pos, 4));
};


PMDFileParser.prototype._getValueWithReverseByteOrder = function(pos, size) {
	var value = 0;
	for(var i = 0; i < size; i++) {
		value = (value << 8) | this.uint8[pos + size - i - 1];
	}
	return value;
};


PMDFileParser.prototype._toBinary32 = function(uint32) {
	var sign = (uint32 >> 31) & 1;
	var exponent = (uint32 >> 23) & 0xFF;
	var fraction = uint32 & 0x7FFFFF;

	if(exponent === 0 && fraction === 0) {
		return 0.0;
	}
	else if(exponent === 255 && fraction === 0) {
		return Infinity;
	}
	else if(exponent === 255 && fraction !== 0) {
		return NaN;
	}
	else {
		var tmp = 1;

		if(exponent === 0 && fraction !== 0) {
			exponent = 1;
			tmp = 0;
		}

		for(var i = 0; i < 23; i++) {
			if((fraction >> (22-i)) & 1) {
			  tmp += Math.pow(2, -(i+1));
			}
		}

		tmp = tmp * Math.pow(2, (exponent-127));
		if(sign) {
			tmp = -tmp;
		}
		return tmp;
	}
};

PMDFileParser.prototype._getChars = function(pos, size) {
	var str = '';
	for(var i = 0; i < size; i++) {
		var index = pos + i;
		if(this.uint8[index] === 0) {
			break;
		}
		str += String.fromCharCode(this.uint8[index]);
	}
	return str;
};


PMDFileParser.prototype._getStrings = function(pos, size) {
	var str = '';
	for(var i = 0; i < size; i++) {
		var index = pos + i;
		if(this.uint8[index] === 0) {
			break;
		}
		str += this._toString(16, this.uint8[index], 2);
	}
	return str;
};

PMDFileParser.prototype._toString = function(type, num, figure) {
	var base = '';
	var prefix = '';
	var minus = '';

	if(type === 8)
		prefix = '0';
	else if(type === 16)
		prefix = '0x';

	for(var i = 0; i < figure; i++)
		base += '0' ;

	return prefix + (base + num.toString(type)).substr(-1 * figure);
};




PMDFileParser.prototype._sizeof = function(param) {
	if(param.isArray) {
		return this._sizeofArray(param);
	}
	else {
		return this._sizeofScalar(param);
	}
};

PMDFileParser.prototype._sizeofScalar = function(param) {
	switch(param.type) {
		case 'char':
			return 1;
		case 'strings':
			return 1;
		case 'uint8':
			return 1;
		case 'uint16':
			return 2;
		case 'uint32':
			return 4;
		case 'float':
			return 4;
		default:
			throw new Error('error: undefined type ' + param.type);
	}
};


PMDFileParser.prototype._sizeofArray = function(param) {
	return this._sizeofScalar(param) * param.size;
};

module.exports = PMDFileParser;
