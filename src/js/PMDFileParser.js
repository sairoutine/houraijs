'use strict';

var VERTICES_STRUCTURE = {
	count: {type: 'uint32'},
	vertices: {type: 'object', isArray: true, size: 'count'}
};

var VERTEX_INDICES_STRUCTURE = {
	count: {type: 'uint32'},
	indices: {type: 'object', isArray: true, size: 'count'}
};


var MATERIALS_STRUCTURE = {
	count: {type: 'uint32'},
	materials: {type: 'object', isArray: true, size: 'count'}
};

var BONES_STRUCTURE = {
	count: {type: 'uint16'},
	bones: {type: 'object', isArray: true, size: 'count'}
};

var IKS_STRUCTURE = {
	count: {type: 'uint16'},
	iks: {type: 'object', isArray: true, size: 'count'}
};

var FACES_STRUCTURE = {
	count: {type: 'uint16'},
	faces: {type: 'object', isArray: true, size: 'count'}
};

var FACE_DISPLAYS_STRUCTURE = {
	count: {type: 'uint8'},
	indices: {type: 'object', isArray: true, size: 'count'}
};

var BONE_FRAME_NAMES_STRUCTURE = {
	count: {type: 'uint8'},
	names: {type: 'object', isArray: true, size: 'count'}
};

var BONE_DISPLAYS_STRUCTURE = {
	count: {type: 'uint32'},
	displays: {type: 'object', isArray: true, size: 'count'}
};

var RIGID_BODIES_STRUCTURE = {
	count: {type: 'uint32'},
	bodies: {type: 'object', isArray: true, size: 'count'}
};

var JOINTS_STRUCTURE = {
	count: {type: 'uint32'},
	joints: {type: 'object', isArray: true, size: 'count'}
};



var PMD = require('./PMD');
var PMDHeader               = require('./PMD/Header');
var PMDVertex               = require('./PMD/Vertex');
var PMDVertexIndex          = require('./PMD/VertexIndex');
var PMDMaterial             = require('./PMD/Material');
var PMDBone                 = require('./PMD/Bone');
var PMDIK                   = require('./PMD/Ik');
var PMDFace                 = require('./PMD/Face');
var PMDFaceVertex           = require('./PMD/FaceVertex');
var PMDFaceDisplay          = require('./PMD/FaceDisplay');
var PMDBoneFrameName        = require('./PMD/BoneFrameName');
var PMDBoneDisplay          = require('./PMD/BoneDisplay');
var PMDEnglishHeader        = require('./PMD/EnglishHeader');
var PMDEnglishBoneName      = require('./PMD/EnglishBoneName');
var PMDEnglishBoneFrameName = require('./PMD/EnglishBoneFrameName');
var PMDEnglishFaceName      = require('./PMD/EnglishFaceName');
var PMDToonTexture          = require('./PMD/ToonTexture');
var PMDRigidBody            = require('./PMD/RigidBody');
var PMDJoint                = require('./PMD/Joint');






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

	this._parseHeader(pmd);
	this._parseVertices(pmd);
	this._parseVertexIndices(pmd);
	this._parseMaterials(pmd);
	this._parseBones(pmd);
	this._parseIKs(pmd);
	this._parseFaces(pmd);
	this._parseFaceDisplays(pmd);
	this._parseBoneFrameNames(pmd);
	this._parseBoneDisplays(pmd);
	this._parseEnglishHeader(pmd);
	if(this.englishCompatibility) {
		this._parseEnglishBoneNames(pmd);
		this._parseEnglishFaceNames(pmd);
		this._parseEnglishBoneFrameNames(pmd);
	}
	this._parseToonTextures(pmd);
	this._parseRigidBodies(pmd);
	this._parseJoints(pmd);

	return pmd;
};

PMDFileParser.prototype._parseHeader = function(pmd) {
	pmd.header = new PMDHeader();
	this._parseObject(pmd.header, PMDHeader.HEADER_STRUCTURE);
};

PMDFileParser.prototype._parseVertices = function(pmd) {
	var structure = VERTICES_STRUCTURE;
	pmd.vertexCount = this._getValue(structure.count, this.offset);
	this.offset += this._sizeof(structure.count);

	pmd.vertices.length = 0;
	for(var i = 0; i < pmd.vertexCount; i++) {
		this._parseVertex(pmd, i);
	}
};


PMDFileParser.prototype._parseVertex = function(pmd, i) {
	var structure = PMDVertex.STRUCTURE;
	var vertex = new PMDVertex(i);
	this._parseObject(vertex, structure);
	pmd.vertices[i] = vertex;
};


PMDFileParser.prototype._parseVertexIndices = function(pmd) {
	var structure = VERTEX_INDICES_STRUCTURE;
	pmd.vertexIndexCount = this._getValue(structure.count, this.offset);
	this.offset += this._sizeof(structure.count);

	pmd.vertexIndices.length = 0;
	for(var i = 0; i < pmd.vertexIndexCount; i++) {
		this._parseVertexIndex(pmd, i);
	}
};


PMDFileParser.prototype._parseVertexIndex = function(pmd, i) {
	var structure = PMDVertexIndex.STRUCTURE;
	var v = new PMDVertexIndex(i);
	this._parseObject(v, structure);
	pmd.vertexIndices[i] = v;
};


PMDFileParser.prototype._parseMaterials = function(pmd) {
	var structure = MATERIALS_STRUCTURE;
	pmd.materialCount = this._getValue(structure.count, this.offset);
	this.offset += this._sizeof(structure.count);

	pmd.materials.length = 0;
	for(var i = 0; i < pmd.materialCount; i++) {
		this._parseMaterial(pmd, i);
	}
};


PMDFileParser.prototype._parseMaterial = function(pmd, i) {
	var structure = PMDMaterial.STRUCTURE;
	var material = new PMDMaterial(i);
	this._parseObject(material, structure);
	pmd.materials[i] = material;
};


PMDFileParser.prototype._parseBones = function(pmd) {
	var structure = BONES_STRUCTURE;
	pmd.boneCount = this._getValue(structure.count, this.offset);
	this.offset += this._sizeof(structure.count);

	pmd.bones.length = 0;
	for(var i = 0; i < pmd.boneCount; i++) {
		this._parseBone(pmd, i);
	}
};

PMDFileParser.prototype._parseBone = function(pmd, i) {
	var structure = PMDBone.STRUCTURE;
	var bone = new PMDBone(i);
	this._parseObject(bone, structure);
	pmd.bones[i] = bone;
};

PMDFileParser.prototype._parseIKs = function(pmd) {
	var structure = IKS_STRUCTURE;
	pmd.ikCount = this._getValue(structure.count, this.offset);
	this.offset += this._sizeof(structure.count);

	pmd.iks.length = 0;
	for(var i = 0; i < pmd.ikCount; i++) {
		this._parseIK(pmd, i);
	}
};


PMDFileParser.prototype._parseIK = function(pmd, i) {
	var structure = PMDIK.STRUCTURE;
	var ik = new PMDIK(i);
	for(var key in structure) {
		// childBoneIndices are variable length array
		if(key === 'childBoneIndices') continue;

		ik[key] = this._getValue(structure[key], this.offset);
		this.offset += this._sizeof(structure[key]);
	}


	// TODO: refactor
	ik.childBoneIndices = [];
	var size = this._sizeofScalar(structure.childBoneIndices);
	for(var j = 0; j < ik.chainLength; j++) {
		ik.childBoneIndices[j] = this._getValueScalar(structure.childBoneIndices, this.offset);
		this.offset += size;
	}
	pmd.iks[i] = ik;
};


PMDFileParser.prototype._parseFaces = function(pmd) {
	var structure = FACES_STRUCTURE;
	pmd.faceCount = this._getValue(structure.count, this.offset);
	this.offset += this._sizeof(structure.count);

	pmd.faces.length = 0;
	for(var i = 0; i < pmd.faceCount; i++) {
		this._parseFace(pmd, i);
	}
};


PMDFileParser.prototype._parseFace = function(pmd, i) {
	var structure = PMDFace.FACE_STRUCTURE;
	var face = new PMDFace(i);

	for(var key in structure) {
		// variable length array
		if(key === 'vertices') continue;

		face[key] = this._getValue(structure[key], this.offset);
		this.offset += this._sizeof(structure[key]);
	}

	face.vertices = [];
	for(var j = 0; j < face.vertexCount; j++) {
		this._parseFaceVertex(face, j, face.type);
	}
	pmd.faces[i] = face;
};


PMDFileParser.prototype._parseFaceVertex = function(face, i, type) {
	var structure = PMDFaceVertex.FACE_VERTEX_STRUCTURE;
	var face_vertex = new PMDFaceVertex(i, type);
	this._parseObject(face_vertex, structure);
	face.vertices[i] = face_vertex;
};


PMDFileParser.prototype._parseFaceDisplays = function(pmd) {
	var structure = FACE_DISPLAYS_STRUCTURE;
	pmd.faceDisplayCount = this._getValue(structure.count, this.offset);
	this.offset += this._sizeof(structure.count);

	pmd.faceDisplays.length = 0;
	for(var i = 0; i < pmd.faceDisplayCount; i++) {
		this._parseFaceDisplay(pmd, i);
	}
};

PMDFileParser.prototype._parseFaceDisplay = function(pmd, i) {
	var structure = PMDFaceDisplay.FACE_DISPLAY_STRUCTURE;
	var face_display = new PMDFaceDisplay(i);
	this._parseObject(face_display, structure);
	pmd.faceDisplays[i] = face_display;
};


PMDFileParser.prototype._parseBoneFrameNames = function(pmd) {
	var structure = BONE_FRAME_NAMES_STRUCTURE;
	pmd.boneFrameNameCount = this._getValue(structure.count, this.offset);
	this.offset += this._sizeof(structure.count);

	pmd.boneFrameNames.length = 0;
	for(var i = 0; i < pmd.boneFrameNameCount; i++) {
		this._parseBoneFrameName(pmd, i);
	}
};


PMDFileParser.prototype._parseBoneFrameName = function(pmd, i) {
	var structure = PMDBoneFrameName.STRUCTURE;
	var bone_frame_name = new PMDBoneFrameName(i);
	this._parseObject(bone_frame_name, structure);
	pmd.boneFrameNames[i] = bone_frame_name;
};


PMDFileParser.prototype._parseBoneDisplays = function(pmd) {
	var structure = BONE_DISPLAYS_STRUCTURE;
	pmd.boneDisplayCount = this._getValue(structure.count, this.offset);
	this.offset += this._sizeof(structure.count);

	pmd.boneDisplays.length = 0;
	for(var i = 0; i < pmd.boneDisplayCount; i++) {
		this._parseBoneDisplay(pmd, i);
	}
};


PMDFileParser.prototype._parseBoneDisplay = function(pmd, i) {
	var structure = PMDBoneDisplay.STRUCTURE;
	var bone_display = new PMDBoneDisplay(i);
	this._parseObject(bone_display, structure);
	pmd.boneDisplays[i] = bone_display;
};


PMDFileParser.prototype._parseEnglishHeader = function(pmd) {
	var structure = PMDEnglishHeader.STRUCTURE;
	pmd.englishHeader = new PMDEnglishHeader();
	this._parseObject(pmd.englishHeader, structure);

	if(pmd.englishHeader.compatibility === 0) {
		this.offset -= this._sizeofObject(structure);
		this.offset += this._sizeof(structure.compatibility);
		this.englishCompatibility = false;
	}
	else {
		this.englishCompatibility = true;
	}
};


PMDFileParser.prototype._parseEnglishBoneNames = function(pmd) {
	var structure = PMDEnglishBoneName.STRUCTURE;
	pmd.englishBoneNames.length = 0;

	for(var i = 0; i < pmd.boneCount; i++) {
		var bone_name = new PMDEnglishBoneName(i);
		this._parseObject(bone_name, structure);
		pmd.englishBoneNames[i] = bone_name;
	}
};


PMDFileParser.prototype._parseEnglishFaceNames = function(pmd) {
	var structure = PMDEnglishFaceName.STRUCTURE;
	pmd.englishFaceNames.length = 0;
	for(var i = 0; i < pmd.faceCount-1; i++) {
		var e_face_name = new PMDEnglishFaceName(i);
		this._parseObject(e_face_name, structure);
		pmd.englishFaceNames[i] = e_face_name;
	}
};


PMDFileParser.prototype._parseEnglishBoneFrameNames = function(pmd) {
	var structure = PMDEnglishBoneFrameName.STRUCTURE;
	pmd.englishBoneFrameNames.length = 0;
	for(var i = 0; i < pmd.boneFrameNameCount; i++) {
		var e_bone_frame_name = new PMDEnglishBoneFrameName(i);
		this._parseObject(e_bone_frame_name, structure);
		pmd.englishBoneFrameNames[i] = e_bone_frame_name;
	}
};


PMDFileParser.prototype._parseToonTextures = function(pmd) {
	var structure = PMDToonTexture.TOON_TEXTURE_STRUCTURE;
	pmd.toonTextureCount = 10; // TODO: const
	pmd.toonTextures.length = 0;
	for(var i = 0; i < pmd.toonTextureCount; i++) {
		var toon_texture = new PMDToonTexture(i);
		this._parseObject(toon_texture, structure);
		pmd.toonTextures[i] = toon_texture;
	}
};


PMDFileParser.prototype._parseRigidBodies = function(pmd) {
	var structure = RIGID_BODIES_STRUCTURE;
	pmd.rigidBodyCount = this._getValue(structure.count, this.offset);
	this.offset += this._sizeof(structure.count);

	pmd.rigidBodies.length = 0;
	for(var i = 0; i < pmd.rigidBodyCount; i++) {
		this._parseRigidBody(pmd, i);
	}
};


PMDFileParser.prototype._parseRigidBody = function(pmd, i) {
	var structure = PMDRigidBody.STRUCTURE;
	var rigid_body = new PMDRigidBody(i);
	this._parseObject(rigid_body, structure);
	pmd.rigidBodies[i] = rigid_body;
};


PMDFileParser.prototype._parseJoints = function(pmd) {
	var structure = JOINTS_STRUCTURE;
	pmd.jointCount = this._getValue(structure.count, this.offset);
	this.offset += this._sizeof(structure.count);

	pmd.joints.length = 0;
	for(var i = 0; i < pmd.jointCount; i++) {
		this._parseJoint(pmd, i);
	}
};


PMDFileParser.prototype._parseJoint = function(pmd, i) {
	var structure = PMDJoint.STRUCTURE;
	var joint = new PMDJoint(i);
	this._parseObject(joint, structure);
	pmd.joints[i] = joint;
};


PMDFileParser.prototype._parseObject = function(obj, structure) {
	if(!structure) throw new Error("structure arguments must be set");

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
