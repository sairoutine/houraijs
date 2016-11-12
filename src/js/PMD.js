'use strict';

var PMD = function() {
	this.header = null;
	this.englishHeader = null;
	this.vertexCount = null;
	this.vertexIndexCount = null;
	this.materialCount = null;
	this.boneCount = null;
	this.ikCount = null;
	this.faceCount = null;
	this.faceDisplayCount = null;
	this.boneFrameNameCount = null;
	this.boneDisplayCount = null;
	this.toonTextureCount = null;
	this.rigidBodyCount = null;
	this.jointCount = null;

	this.vertices = [];
	this.vertexIndices = []
	this.materials = [];
	this.bones = [];
	this.iks = [];
	this.faces = [];
	this.faceDisplays = [];
	this.boneFrameNames = [];
	this.boneDisplays = [];
	this.englishBoneNames = [];
	this.englishFaceNames = [];
	this.englishBoneFrameNames = [];
	this.toonTextures = [];
	this.rigidBodies = [];
	this.joints = [];

	this.bonesHash = {};
	this.facesHash = {};

	this.images = [];
	this.toonImages = [];
	this.sphereImages = [];

	this.centerBone = {};
	this.leftFootBone = {};
	this.rightFootBone = {};
	this.leftEyeBone = {};
	this.rightEyeBone = {};
};

PMD.prototype.setup = function () {

};

PMD.prototype.loadImages = function (image_base_url, callback) {

	return callback();
};

PMD.prototype.dump = function () {
	console.log(this);
};




module.exports = PMD;
