/* jshint multistr: true */
'use strict';

/* WebGL layer */

var glMatrix = require('gl-matrix');
var mat4 = glMatrix.mat4;

var SHADERS = {};

SHADERS['shader-vs'] = {
	type: 'x-shader/x-vertex',
};
SHADERS['shader-fs'] = {
	type: 'x-shader/x-fragment',
};
// https://github.com/takahirox/mmd-viewer-js/blob/c67664dfa3c7a719beda2521d536b2c32e855a5b/src/WebGL.js#L46
SHADERS['shader-vs'].src = '\
  attribute vec3 aVertexPosition;\
  attribute vec3 aVertexPosition1;\
  attribute vec3 aVertexPosition2;\
  attribute vec3 aVertexNormal;\
  attribute vec3 aVertexMorph;\
  attribute float aVertexEdge;\
  attribute vec2 aBoneIndices;\
  attribute float aBoneWeight;\
  attribute vec3 aMotionTranslation1;\
  attribute vec3 aMotionTranslation2;\
  attribute vec4 aMotionRotation1;\
  attribute vec4 aMotionRotation2;\
  attribute vec2 aTextureCoordinates;\
\
  uniform mat4 uMVMatrix;\
  uniform mat4 uPMatrix;\
  uniform mat4 uMVPMatrix;\
  uniform mat3 uNMatrix;\
  uniform vec3 uLightColor;\
  uniform vec3 uLightDirection;\
  uniform vec4 uDiffuseColor;\
  uniform vec3 uAmbientColor;\
  uniform vec3 uSpecularColor;\
  uniform float uShininess;\
  uniform int uSkinningType;\
  uniform int uLightingType;\
  uniform int uVTFWidth;\
  uniform sampler2D uVTF;\
  uniform sampler2D uToonTexture;\
  uniform bool uUseToon;\
  uniform bool uEdge;\
  uniform bool uShadow;\
  uniform mat4 uLightMatrix;\
  uniform bool uShadowGeneration;\
  uniform bool uShadowMapping;\
\
  varying vec2 vTextureCoordinates;\
  varying vec4 vLightWeighting;\
  varying vec3 vNormal;\
  varying vec4 vShadowDepth;\
\
  highp float binary32(vec4 rgba) {\
    rgba = floor(255.0 * rgba + 0.5);\
    highp float val;\
    val  = rgba[0];\
    val += rgba[1] / (256.0);\
    val += rgba[2] / (256.0 * 256.0);\
    val += rgba[3] / (256.0 * 256.0 * 256.0);\
    return rgba[0] >= 128.0 ? -(val - 128.0) : val;\
  }\
\
  float getU(float index) {\
    float unit = 1.0 / float(uVTFWidth);\
    return fract(index * unit + unit * 0.5);\
  }\
\
  float getV(float index) {\
    float unit = 1.0 / float(uVTFWidth);\
    return floor(index * unit) * unit + unit * 0.5;\
  }\
\
  vec2 getUV(float index) {\
    float u = getU(index);\
    float v = getV(index);\
    return vec2(u, v);\
  }\
\
  vec4 getVTF(float index) {\
    return texture2D(uVTF, getUV(index));\
  }\
\
  vec3 getMotionTranslation(float bn) {\
    float index = bn * 7.0 + 0.0;\
    highp float x = binary32(getVTF(index+0.0));\
    highp float y = binary32(getVTF(index+1.0));\
    highp float z = binary32(getVTF(index+2.0));\
    return vec3(x, y, z);\
  }\
\
  vec4 getMotionRotation(float bn) {\
    float index = bn * 7.0 + 3.0;\
    highp float x = binary32(getVTF(index+0.0));\
    highp float y = binary32(getVTF(index+1.0));\
    highp float z = binary32(getVTF(index+2.0));\
    highp float w = binary32(getVTF(index+3.0));\
    return vec4(x, y, z, w);\
  }\
\
  vec3 qtransform(vec3 v, vec4 q) {\
    return v + 2.0 * cross(cross(v, q.xyz) - q.w*v, q.xyz);\
  }\
\
  void main() {\
    vec3 pos;\
    vec3 norm;\
    if(uSkinningType == 2) {\
      vec3 v1 = aVertexPosition1 + aVertexMorph;\
      v1 = qtransform(v1, aMotionRotation1) + aMotionTranslation1;\
      norm = qtransform(aVertexNormal, aMotionRotation1);\
      if(aBoneWeight < 0.99) {\
        vec3 v2 = aVertexPosition2 + aVertexMorph;\
        v2 = qtransform(v2, aMotionRotation2) + aMotionTranslation2;\
        pos = mix(v2, v1, aBoneWeight);\
        vec3 n2 = qtransform(aVertexNormal, aMotionRotation2);\
        norm = normalize(mix(n2, norm, aBoneWeight));\
      } else {\
        pos = v1;\
      }\
    } else if(uSkinningType == 1) {\
      float b1 = floor(aBoneIndices.x + 0.5);\
      vec3 v1 = aVertexPosition1 + aVertexMorph;\
      v1 = qtransform(v1, getMotionRotation(b1)) + getMotionTranslation(b1);\
      norm = qtransform(aVertexNormal, getMotionRotation(b1));\
      if(aBoneWeight < 0.99) {\
        float b2 = floor(aBoneIndices.y + 0.5);\
        vec3 v2 = aVertexPosition2 + aVertexMorph;\
        v2 = qtransform(v2, getMotionRotation(b2)) + getMotionTranslation(b2);\
        pos = mix(v2, v1, aBoneWeight);\
        vec3 n2 = qtransform(aVertexNormal, getMotionRotation(b2));\
        norm = normalize(mix(n2, norm, aBoneWeight));\
      } else {\
        pos = v1;\
      }\
    } else {\
      pos = aVertexPosition + aVertexMorph;\
      norm = normalize(aVertexNormal);\
    }\
\
    gl_Position = uMVPMatrix * vec4(pos, 1.0);\
\
    if(uShadowGeneration) {\
      vShadowDepth = gl_Position;\
      return;\
    }\
\
    vTextureCoordinates = aTextureCoordinates;\
    vNormal = normalize(norm);\
\
    if(uShadowMapping) {\
      vShadowDepth = uLightMatrix * vec4(pos, 1.0);\
    }\
\
    if(! uEdge && uLightingType > 0) {\
      vec4 vertexPositionEye4 = uMVMatrix * vec4(pos, 1.0);\
      vec3 vertexPositionEye3 = vertexPositionEye4.xyz / vertexPositionEye4.w;\
      vec3 vectorToLightSource = normalize(uLightDirection -\
                                           vertexPositionEye3);\
      vec3 normalEye = normalize(uNMatrix * norm);\
      float diffuseLightWeightning = (uShadow)\
                                       ? max(dot(normalEye,\
                                                 vectorToLightSource), 0.0)\
                                       : 1.0;\
      vec3 reflectionVector = normalize(reflect(-vectorToLightSource,\
                                                 normalEye));\
      vec3 viewVectorEye = -normalize(vertexPositionEye3);\
      float rdotv = max(dot(reflectionVector, viewVectorEye), 0.0);\
      float specularLightWeightning = pow(rdotv, uShininess);\
\
      vec3 vLight = uAmbientColor + \
                    uLightColor *\
                      (uDiffuseColor.rgb * diffuseLightWeightning +\
                       uSpecularColor * specularLightWeightning);\
\
      vLightWeighting = clamp(vec4(vLight, uDiffuseColor.a), 0.0, 1.0);\
\
      if(uLightingType == 2 && uUseToon) {\
        vec2 toonCoord = vec2(0.0, 0.5 * (1.0 - dot(uLightDirection,\
                                                    normalEye)));\
        vLightWeighting.rgb *= texture2D(uToonTexture, toonCoord).rgb;\
      }\
    } else {\
      vLightWeighting = uDiffuseColor;\
    }\
\
    /* just copied from MMD.js */\
    if(uEdge) {\
      const float thickness = 0.003;\
      vec4 epos = gl_Position;\
      vec4 epos2 = uMVPMatrix * vec4(pos + norm, 1.0);\
      vec4 enorm = normalize(epos2 - epos);\
      gl_Position = epos + enorm * thickness * aVertexEdge * epos.w;\
    }\
  }\
';

// https://github.com/takahirox/mmd-viewer-js/blob/c67664dfa3c7a719beda2521d536b2c32e855a5b/src/WebGL.js#L234
SHADERS['shader-fs'].src = '\
  precision mediump float;\
  varying vec2 vTextureCoordinates;\
  uniform sampler2D uSampler;\
  uniform bool uEdge;\
  uniform bool uUseSphereMap;\
  uniform bool uUseSphereMapAddition;\
  uniform bool uShadowGeneration;\
  uniform bool uShadowMapping;\
  uniform sampler2D uSphereTexture;\
  uniform sampler2D uShadowTexture;\
  varying vec4 vLightWeighting;\
  varying vec3 vNormal;\
  varying vec4 vShadowDepth;\
\
  vec4 packDepth(const in float depth) {\
    const vec4 bitShift = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);\
    const vec4 bitMask  = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);\
    vec4 res = fract(depth * bitShift);\
    res -= res.xxyz * bitMask;\
    return res;\
  }\
\
  float unpackDepth(const in vec4 rgba) {\
    const vec4 bitShift = vec4(1.0/(256.0*256.0*256.0),\
                               1.0/(256.0*256.0), 1.0/256.0, 1.0);\
    float depth = dot(rgba, bitShift);\
    return depth;\
  }\
\
  void main() {\
\
    if(uEdge) {\
      gl_FragColor = vec4(vec3(0.0), vLightWeighting.a);\
      return;\
    }\
\
    if(uShadowGeneration) {\
/*      gl_FragColor = packDepth(gl_FragCoord.z);*/\
      vec3 lightCoord = vShadowDepth.xyz / vShadowDepth.w;\
      gl_FragColor = packDepth(lightCoord.z);\
      return;\
    }\
\
    vec4 textureColor = texture2D(uSampler, vTextureCoordinates);\
\
    /* just copied from MMD.js */\
    if(uUseSphereMap) {\
      vec2 sphereCood = 0.5 * (1.0 + vec2(1.0, -1.0) * vNormal.xy);\
      vec3 sphereColor = texture2D(uSphereTexture, sphereCood).rgb;\
      if(uUseSphereMapAddition) {\
        textureColor.rgb += sphereColor;\
      } else {\
        textureColor.rgb *= sphereColor;\
      }\
    }\
\
    vec4 color = vLightWeighting * textureColor;\
\
    if(uShadowMapping) {\
      vec3 lightCoord = vShadowDepth.xyz / vShadowDepth.w;\
      vec4 rgbaDepth = texture2D(uShadowTexture, \
                                 lightCoord.xy*0.5+0.5);\
      float depth = unpackDepth(rgbaDepth);\
/*      float depth2 = unpackDepth(packDepth(lightCoord.z));*/\
      float depth2 = lightCoord.z;\
      if(depth2 - 0.00002 > depth) {\
        color.rgb *= 0.7;\
      }\
    }\
\
    gl_FragColor = color;\
  }\
';













var Layer = function(canvas) {
	this.canvas = canvas;
	this.gl = this._initWebGL(canvas);
	this.shader = this._initShader(this.gl);

	this.mvMatrix = mat4.create(); // model and view matrix
	this.pMatrix = mat4.create(); // projection matrix
	//var mvpMatrix = mat4.create();
};


Layer.prototype._initWebGL = function(canvas) {
	var NAMES = ['webgl', 'experimental-webgl'];
	var context = null;

	for (var i = 0; i < NAMES.length; i++) {
		try {
			context = canvas.getContext(NAMES[i], {antialias: true});

		}
		catch(e) {}
	}

	if(context) {
		context.viewportWidth = canvas.width;
		context.viewportHeight = canvas.height;
	}
	else {
		window.alert("Failed to get WebGL context.");
	}

	return context;
};

Layer.prototype._initShader = function(gl) {
	var vertexShader   = this._initVertexShader(gl);
	var fragmentShader = this._initFragmentShader(gl);

	// 5. create program object
	var program = gl.createProgram();

	// 6. allocate shaders to program object
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	// 7. link shaders and program object
	gl.linkProgram(program);


	// 8. check whether the link has succeeded
	if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		window.alert(gl.getProgramInfoLog(program));
		return null;
	}

	// 9. use program
	gl.useProgram(program);

	// 10. get attributeLocation
	program.vertexPositionAttribute =
		gl.getAttribLocation(program, 'aVertexPosition');
	program.vertexPositionAttribute1 =
		gl.getAttribLocation(program, 'aVertexPosition1');
	program.vertexPositionAttribute2 =
		gl.getAttribLocation(program, 'aVertexPosition2');
	program.vertexMorphAttribute =
		gl.getAttribLocation(program, 'aVertexMorph');
	program.vertexEdgeAttribute =
		gl.getAttribLocation(program, 'aVertexEdge');
	program.vertexNormalAttribute =
		gl.getAttribLocation(program, 'aVertexNormal');
	program.boneWeightAttribute =
		gl.getAttribLocation(program, 'aBoneWeight');
	program.boneIndicesAttribute =
		gl.getAttribLocation(program, 'aBoneIndices');

	program.motionTranslationAttribute1 =
		gl.getAttribLocation(program, 'aMotionTranslation1');
	program.motionTranslationAttribute2 =
		gl.getAttribLocation(program, 'aMotionTranslation2');
	program.motionRotationAttribute1 =
		gl.getAttribLocation(program, 'aMotionRotation1');
	program.motionRotationAttribute2 =
		gl.getAttribLocation(program, 'aMotionRotation2');

	program.textureCoordAttribute =
		gl.getAttribLocation(program, 'aTextureCoordinates');

	// 11. get UniformLocation
	program.pMatrixUniform =
		gl.getUniformLocation(program, 'uPMatrix');
	program.mvMatrixUniform =
		gl.getUniformLocation(program, 'uMVMatrix');
	program.mvpMatrixUniform =
		gl.getUniformLocation(program, 'uMVPMatrix');
	program.nMatrixUniform =
		gl.getUniformLocation(program, 'uNMatrix');

	program.lightColorUniform =
		gl.getUniformLocation(program, 'uLightColor');
	program.lightDirectionUniform =
		gl.getUniformLocation(program, 'uLightDirection');
	program.diffuseColorUniform =
		gl.getUniformLocation(program, 'uDiffuseColor');
	program.ambientColorUniform =
		gl.getUniformLocation(program, 'uAmbientColor');
	program.specularColorUniform =
		gl.getUniformLocation(program, 'uSpecularColor');
	program.shininessUniform =
		gl.getUniformLocation(program, 'uShininess');

	program.uSamplerUniform =
		gl.getUniformLocation(program, 'uSampler');

	program.uSkinningTypeUniform =
		gl.getUniformLocation(program, 'uSkinningType');
	program.uLightingTypeUniform =
		gl.getUniformLocation(program, 'uLightingType');

	program.uVTFUniform =
		gl.getUniformLocation(program, 'uVTF');
	program.uVTFWidthUniform =
		gl.getUniformLocation(program, 'uVTFWidth');

	program.useToonUniform =
		gl.getUniformLocation(program, 'uUseToon');
	program.toonTextureUniform =
		gl.getUniformLocation(program, 'uToonTexture');

	program.edgeUniform =
		gl.getUniformLocation(program, 'uEdge');
	program.shadowUniform =
		gl.getUniformLocation(program, 'uShadow');

	program.sphereTextureUniform =
		gl.getUniformLocation(program, 'uSphereTexture');
	program.useSphereMapUniform =
		gl.getUniformLocation(program, 'uUseSphereMap');
	program.useSphereMapAdditionUniform =
		gl.getUniformLocation(program, 'uUseSphereMapAddition');

	program.shadowGenerationUniform =
		gl.getUniformLocation(program, 'uShadowGeneration');
	program.shadowMappingUniform =
		gl.getUniformLocation(program, 'uShadowMapping');
	program.shadowTextureUniform =
		gl.getUniformLocation(program, 'uShadowTexture');
	program.lightMatrixUniform =
		gl.getUniformLocation(program, 'uLightMatrix');

	return program;
};

Layer.prototype._initVertexShader = function(gl) {
	var params = SHADERS['shader-vs'];

	return this._compileShader(gl, params.src, params.type);
};

Layer.prototype._initFragmentShader = function(gl) {
	var params = SHADERS['shader-fs'];
	return this._compileShader(gl, params.src, params.type);
};

Layer.prototype._compileShader = function(gl, source, type) {
	// 1. create shader
	var shader;
	if(type === 'x-shader/x-fragment') {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	}
	else if(type === 'x-shader/x-vertex') {
		shader = gl.createShader(gl.VERTEX_SHADER);
	}
	else {
		console.error("Unknown shader type: " + type);
		return null;
	}

	// 2. allocate source to generated shader
	gl.shaderSource(shader, source);

	// 3. compile shader source
	gl.compileShader(shader);

	// 4. check whether the compile has succeeded
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		window.alert(gl.getShaderInfoLog(shader));
		return null;
	}
	return shader;
};

Layer.prototype.viewport = function() {
	this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
};

Layer.prototype.perspective = function(angle) {
	var viewNear = 0.1;
	var viewFar = 2000.0;


	mat4.perspective(this.pMatrix, angle, this.gl.viewportWidth / this.gl.viewportHeight, viewNear, viewFar);
	//pMatrix[0] *= -1;
};

Layer.prototype.identity = function() {
	mat4.identity(this.mvMatrix);
};

Layer.prototype.lookAt = function(eye, center, up) {
	mat4.lookAt(eye, center, up, this.mvMatrix);
};





module.exports = Layer;
