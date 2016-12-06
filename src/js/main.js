'use strict';

// configurations
var modelBaseURL = './model';
var motionBaseURL = './vmd';

var model = {name: 'Alice', url:  modelBaseURL + '/alice/alice.pmd'};

var motion = {name: 'Sweet Magic', url: [
	   motionBaseURL + '/sweetmagic-lip.vmd',
	   motionBaseURL + '/sweetmagic-left.vmd',
]};

var PMDFileParser = require('./PMDFileParser');
var Layer = require('./Layer');
var PMDView = require('./PMDView');


window.onload = function() {
	var canvas = document.getElementById('mainCanvas');

	var model_url = model.url;

	_getBinary(model_url, function(buffer){
		var pfp = new PMDFileParser(buffer);

		if(!pfp.valid()) {
			console.error("its not pmd file");
			return;
		}

		var pmd = pfp.parse();

		pmd.setup();

		var image_base_url = model_url.substring(0, model_url.lastIndexOf('/'));

		pmd.loadImages(image_base_url, function(){
			// WebGL layer
			var layer = new Layer(canvas);

			var pmd_view = new PMDView(layer);

			pmd_view.addPMD(pmd);

			pmd_view.run();

			console.log(pmd);
		});
	});
};
function _getBinary(url, callback) {
	var request = new XMLHttpRequest();
	request.responseType = 'arraybuffer';
	request.onload = function() {
		callback(request.response);
	};
	request.open('GET', url, true);
	request.send(null);
}


