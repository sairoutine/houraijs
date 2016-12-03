'use strict';

function PMDMaterial(id) {
  this.id = id;
  this.color = null;
  this.specularity = null;
  this.specularColor = null;
  this.mirrorColor = null;
  this.tuneIndex = null;
  this.edgeFlag = null;
  this.vertexCount = null;
  this.fileName = null;
}
PMDMaterial.STRUCTURE = {
	color: {type: 'float', isArray: true, size: 4},
	specularity: {type: 'float'},
	specularColor: {type: 'float', isArray: true, size: 3},
	mirrorColor: {type: 'float', isArray: true, size: 3},
	tuneIndex: {type: 'uint8'},
	edgeFlag: {type: 'uint8'},
	vertexCount: {type: 'uint32'},
	fileName: {type: 'char', isArray: true, size: 20}
};

PMDMaterial.prototype.hasSphereTexture = function() {
	if(this.fileName.lastIndexOf('.sph') >= 0 || this.fileName.lastIndexOf('.spa') >= 0) {
		return true;
	}
	return false;
};

PMDMaterial.prototype.getSphereMapFileName = function() {
	var filename = this.fileName;
	var index;
	if((index = filename.lastIndexOf('*')) >= 0) {
		filename = filename.slice(index+1);
	}
	if((index = filename.lastIndexOf('+')) >= 0) {
		filename = filename.slice(index+1);
	}
	return filename;
};

PMDMaterial.prototype.getImageFileName = function() {
	var filename = this.fileName;
	// NOTE: many browser can't show tga file, so convert tga ext to png ext
	filename = filename.replace('.tga', '.png');

	var index = filename.lastIndexOf('*');
	if(index >= 0) {
		// ignore file name of sphere map
		filename = filename.substring(0, index);
	}

	return filename;
};





/*
PMDMaterial.prototype.isSphereMapAddition = function() {
  var filename = this.fileName;

  if(filename.lastIndexOf('.spa') >= 0)
    return true;

  return false;
};



PMDMaterial.prototype.hasToon = function() {
  return this.tuneIndex >= 10 ? false : true;
};


*/
module.exports = PMDMaterial;
