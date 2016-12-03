'use strict';

var PMDImageFileLoader = require('./PMDImageFileLoader');

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
	this.vertexIndices = [];
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

	// set by PMDImageFileLoader
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
	var loader = new PMDImageFileLoader(this, image_base_url);
	return loader.load(callback);
};


PMD.prototype.resetImages = function () {
	this.images.length = 0;
	this.toonImages.length = 0;
	this.sphereImages.length = 0;
};


module.exports = PMD;
