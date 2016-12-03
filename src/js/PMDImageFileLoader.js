'use strict';

function PMDImageFileLoader(pmd, image_base_url) {
	this.pmd = pmd;
	this.image_base_url = image_base_url;

	this.image_num = 0;

	this.callback_of_done = null;
}


PMDImageFileLoader.prototype.load = function(callback) {
	var self = this;
	var pmd = self.pmd;

	self.image_num = 0;
	self.callback_of_done = callback;

	pmd.resetImages();

	var i, len, fileName;

	// load materials
	for(i = 0, len = pmd.materialCount; i < len; i++) {
		fileName = pmd.materials[i].getImageFileName();

		if(fileName === '') { // NOTE: may need to add conditions of spa or sph
			// dummy texture
			self._loadPixelImage(pmd.images, i, fileName);
		}
		else {
			self._loadImage(pmd.images, i, fileName);
		}
	}

	// load sphere map image
	for(i = 0, len = pmd.materialCount; i < len; i++) {
		if( ! pmd.materials[i].hasSphereTexture()) {
			// dummy texture
			self._loadPixelImage(pmd.sphereImages, i, fileName);
		}
		else {
			var sphereMapFileName = pmd.materials[i].getSphereMapFileName();
			self._loadImage(pmd.sphereImages, i, sphereMapFileName);
		}
	}

	// load toon texture
	for(i = 0, len = pmd.toonTextureCount; i < len; i++) {
		fileName = pmd.toonTextures[i].fileName;

		self._loadImage(pmd.toonImages, i, fileName);
	}

};

PMDImageFileLoader.prototype._loadImage = function (array, i, fileName) {
	var self = this;

	array[i] = new Image();
	array[i].onerror = function(event) {
		self.image_num++;
		return self.checkLoadingIsDone();
	};

	array[i].onload = function(event) {
		self.image_num++;
		return self.checkLoadingIsDone();
	};
	array[i].src = self.image_base_url + '/' + fileName;
};

PMDImageFileLoader.prototype._loadPixelImage = function (array, i) {
	var self = this;
	array[i] = self.generatePixelImage();
	self.image_num++;
	return self.checkLoadingIsDone();
};




PMDImageFileLoader.prototype.checkLoadingIsDone = function() {
	var callback = this.callback_of_done;

	if(this.image_num >= this.pmd.materialCount * 2 + this.pmd.toonTextureCount) {
		return callback();
	}
};

PMDImageFileLoader.prototype.generatePixelImage = function() {
	var cvs = document.createElement('canvas');
	cvs.width = 1;
	cvs.height = 1;
	var ctx = cvs.getContext('2d');

	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fillRect(0, 0, 1, 1);
	return cvs;
};





module.exports = PMDImageFileLoader;
