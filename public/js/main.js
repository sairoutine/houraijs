(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],3:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],4:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],5:[function(require,module,exports){
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
var PMDModelView = require('./PMDModelView');


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
			var layer = new Layer(canvas);

			var pmd_view = new PMDView(layer);

			var pmd_model_view = new PMDModelView(layer, pmd, pmd_view);
			pmd_model_view.setup();

			pmd_view.addModelView(pmd_model_view);

			// set position
			__setModelsBasePosition(pmd_view.modelViews);

			pmd_view.run(function(){
				pmd_view.update();
				pmd_view.draw();

				requestAnimationFrame(function() {
					pmd_view.run();
				});
			});
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

var __setModelsBasePosition = function(pmdModelViews) {
  switch(pmdModelViews.length) {
    case 1:
      pmdModelViews[0].setBasePosition(0, 0, 0);
      break;
    case 2:
      pmdModelViews[0].setBasePosition(-10, 0, 0);
      pmdModelViews[1].setBasePosition( 10, 0, 0);
      break;
    case 3:
      pmdModelViews[0].setBasePosition(  0, 0,  0);
      pmdModelViews[1].setBasePosition( 10, 0, 10);
      pmdModelViews[2].setBasePosition(-10, 0, 10);
      break;
    case 4:
      pmdModelViews[0].setBasePosition(  5, 0,  0);
      pmdModelViews[1].setBasePosition( -5, 0,  0);
      pmdModelViews[2].setBasePosition( 15, 0, 10);
      pmdModelViews[3].setBasePosition(-15, 0, 10);
      break;
    case 5:
      pmdModelViews[0].setBasePosition(  0, 0,  0);
      pmdModelViews[1].setBasePosition( 10, 0, 10);
      pmdModelViews[2].setBasePosition(-10, 0, 10);
      pmdModelViews[3].setBasePosition( 20, 0, 20);
      pmdModelViews[4].setBasePosition(-20, 0, 20);
      break;
    default:
      break;
  }
};



},{"./Layer":1,"./PMDFileParser":2,"./PMDModelView":3,"./PMDView":4}]},{},[5]);
