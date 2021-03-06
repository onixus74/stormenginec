/*----------------------------------------------------------------------------------------
     									DOF
----------------------------------------------------------------------------------------*/
/**
 * @private 
 */
StormGLContext.prototype.initShader_DOF = function() {
	var sourceVertex = 	this.precision+
		'attribute vec3 aVertexPosition;\n'+
		'attribute vec2 aTextureCoord;\n'+
		
		'varying vec2 vTextureCoord;\n'+ 
		
		'void main(void) {\n'+
			'gl_Position = vec4(aVertexPosition, 1.0);\n'+
			'vTextureCoord = aTextureCoord;\n'+
		'}';
	var sourceFragment = this.precision+
		
		'uniform float uFar;\n'+
		'uniform int uAutofocus;\n'+
		'varying vec2 vTextureCoord;\n'+
		
		'uniform sampler2D sampler_2D;\n'+
		'uniform sampler2D sampler_textureFBNormals;\n'+
		
		'uniform float uViewportWidth;\n'+
		'uniform float uViewportHeight;\n'+
		'uniform float uFocus;\n'+
		'uniform float uFNumber;\n'+
		
		'float unpack (vec4 colour) {'+
			'const vec4 bitShifts = vec4(1.0,'+
							'1.0 / 255.0,'+
							'1.0 / (255.0 * 255.0),'+
							'1.0 / (255.0 * 255.0 * 255.0));'+
			'return dot(colour, bitShifts);'+
		'}'+
		'float LinearDepthConstant = 1.0/uFar;'+
		
		'void main(void) {\n'+
			'vec2 vecRandomA[36];\n'+
			'vecRandomA[0] = vec2(0.009, 1.0);\n'+
			'vecRandomA[1] = vec2(0.87, 0.492);\n'+
			'vecRandomA[2] = vec2(0.862, -0.508);\n'+
			'vecRandomA[3] = vec2(-0.009, -1.0);\n'+
			'vecRandomA[4] = vec2(-0.87, -0.492);\n'+
			'vecRandomA[5] = vec2(-0.862, 0.508);\n'+
			
			'vecRandomA[6] = vec2(0.508, 0.862);\n'+
			'vecRandomA[7] = vec2(1.0, -0.009);\n'+
			'vecRandomA[8] = vec2(0.492, -0.87);\n'+
			'vecRandomA[9] = vec2(-0.508, -0.862);\n'+
			'vecRandomA[10] = vec2(-1.0, 0.009);\n'+
			'vecRandomA[11] = vec2(-0.492, 0.87);\n'+
			
			'vecRandomA[12] = vec2(0.182, 0.983);\n'+
			'vecRandomA[13] = vec2(0.943, 0.334);\n'+
			'vecRandomA[14] = vec2(0.76, -0.649);\n'+
			'vecRandomA[15] = vec2(-0.182, -0.983);\n'+
			'vecRandomA[16] = vec2(-0.943, -0.334);\n'+
			'vecRandomA[17] = vec2(-0.76, 0.649);\n'+

			'vecRandomA[18] = vec2(0.35, 0.937);\n'+
			'vecRandomA[19] = vec2(0.986, 0.165);\n'+
			'vecRandomA[20] = vec2(0.636, -0.772);\n'+
			'vecRandomA[21] = vec2(-0.35, -0.937);\n'+
			'vecRandomA[22] = vec2(-0.986, -0.165);\n'+
			'vecRandomA[23] = vec2(-0.636, 0.772);\n'+
			
			'vecRandomA[24] = vec2(0.649, 0.76);\n'+
			'vecRandomA[25] = vec2(0.983, -0.182);\n'+
			'vecRandomA[26] = vec2(0.334, -0.943);\n'+
			'vecRandomA[27] = vec2(-0.649, -0.76);\n'+
			'vecRandomA[28] = vec2(-0.983, 0.182);\n'+
			'vecRandomA[29] = vec2(-0.334, 0.943);\n'+
			
			'vecRandomA[30] = vec2(0.772, 0.636);\n'+
			'vecRandomA[31] = vec2(0.937, -0.35);\n'+
			'vecRandomA[32] = vec2(0.165, -0.986);\n'+
			'vecRandomA[33] = vec2(-0.772, -0.636);\n'+
			'vecRandomA[34] = vec2(-0.937, 0.35);\n'+
			'vecRandomA[35] = vec2(-0.165, 0.986);\n'+
			
			'vec2 noiseCoord = vec2(vTextureCoord.x*(uViewportWidth/32.0),vTextureCoord.y*(uViewportHeight/32.0));\n'+ // 32px map noise
			
			'vec4 textureFBCameraDepth = texture2D(sampler_textureFBNormals, vTextureCoord.xy);\n'+
			'float depth = textureFBCameraDepth.a;\n'+
			'float focusdepth;\n'+
			'if(uAutofocus == 0)\n'+
				'focusdepth = uFocus*LinearDepthConstant;\n'+
			'else\n'+
				'focusdepth = texture2D(sampler_textureFBNormals, vec2(0.5,0.5)).a;\n'+
			'float fStop = focusdepth/uFNumber;\n'+
			'float currDifference = focusdepth-depth;\n'+
			'float mulDOF;\n'+
			'if(currDifference <= 0.0) mulDOF = smoothstep(0.0, fStop, abs(currDifference))*0.008;\n'+  // front
				'else mulDOF = (smoothstep(0.0, fStop*0.5, abs(currDifference)))*0.008;\n'+  // back
			
			'vec2 vecTextureCoordB;\n'+
			
			'int h = 0;\n'+
			'vec3 acum = vec3(0.0,0.0,0.0);\n'+
			'vec3 tot = vec3(0.0,0.0,0.0);\n'+
			'vec2 vecRandomB;\n'+
			'const int f = 36;\n'+
			'for(int i =0; i < f; i++) {\n'+
				//'vecRandomB = texture2D(sampler_2D, noiseCoord+(vecRandomA[i].xy)).xy;\n'+
				//'vecRandomB = vecRandomA[i].xy*vecRandomB.xy;\n'+
				'vecRandomB = vecRandomA[i].xy;\n'+
				
				'if(i < 6) {\n'+
					'vecTextureCoordB = vecRandomB*(0.5*mulDOF);\n'+
				'} else if(i >= 6 && i < 12) {\n'+
					'vecTextureCoordB = vecRandomB*(1.0*mulDOF);\n'+
				'} else if(i >= 12 && i < 18) {\n'+
					'vecTextureCoordB = vecRandomB*(2.0*mulDOF);\n'+
				'} else if(i >= 18 && i < 24) {\n'+
					'vecTextureCoordB = vecRandomB*(3.0*mulDOF);\n'+
				'} else if(i >= 24 && i < 30) {\n'+
					'vecTextureCoordB = vecRandomB*(4.5*mulDOF);\n'+
				'} else if(i >= 30 && i < 36) {\n'+
					'vecTextureCoordB = vecRandomB*(5.0*mulDOF);\n'+
				'}\n'+
				
				'vec4 BFragment = texture2D(sampler_2D, vTextureCoord.xy+(vecTextureCoordB.xy));\n'+
				'acum += BFragment.xyz;\n'+
				'h++;\n'+
			'}\n'+
			'tot = (acum/float(h));\n'+
			
			'vec4 texture = texture2D(sampler_2D, vTextureCoord.xy);\n'+
			'gl_FragColor = vec4(tot.r, tot.g, tot.b, texture.a);\n'+
			//'gl_FragColor = vec4(texture.r, texture.g, texture.b, texture.a);\n'+
		'}';
	this.shader_DOF = this.gl.createProgram();
	this.createShader(this.gl, "DOF", sourceVertex, sourceFragment, this.shader_DOF, this.pointers_DOF.bind(this));
};
/**
 * @private 
 */
StormGLContext.prototype.pointers_DOF = function() {
	this.u_DOF_far = this.gl.getUniformLocation(this.shader_DOF, "uFar");
	
	this.u_DOF_viewportWidth = this.gl.getUniformLocation(this.shader_DOF, "uViewportWidth");
	this.u_DOF_viewportHeight = this.gl.getUniformLocation(this.shader_DOF, "uViewportHeight");
	this.u_DOF_focus = this.gl.getUniformLocation(this.shader_DOF, "uFocus");
	this.u_DOF_autofocus = this.gl.getUniformLocation(this.shader_DOF, "uAutofocus");
	this.u_DOF_fNumber = this.gl.getUniformLocation(this.shader_DOF, "uFNumber");
	
	
	this.attr_DOF_pos = this.gl.getAttribLocation(this.shader_DOF, "aVertexPosition");
	this.attr_DOF_tex = this.gl.getAttribLocation(this.shader_DOF, "aTextureCoord");
	
	this.sampler_DOF_2D = this.gl.getUniformLocation(this.shader_DOF, "sampler_2D");
	this.sampler_DOF_textureFBNormals = this.gl.getUniformLocation(this.shader_DOF, "sampler_textureFBNormals");
	this.Shader_DOF_READY = true;
};
/**
 * @private 
 */
StormGLContext.prototype.render_DOF = function() {	
	//this.gl.enable(this.gl.BLEND);
	//this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA); 
	
	this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
	this.gl.useProgram(this.shader_DOF);
	
	this.gl.uniform1f(this.u_DOF_far, this.far);
	
	this.gl.uniform1f(this.u_DOF_viewportWidth, this.viewportWidth);
	this.gl.uniform1f(this.u_DOF_viewportHeight, this.viewportHeight);
	this.gl.uniform1f(this.u_DOF_focus, this._sec.defaultCamera.focusExtern);
	this.gl.uniform1i(this.u_DOF_autofocus, (this._sec.defaultCamera.autofocus)?1:0);
	this.gl.uniform1f(this.u_DOF_fNumber, this._sec.defaultCamera.fNumber);
	
	this.gl.activeTexture(this.gl.TEXTURE0);
	this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureObject_DOF);
	this.gl.uniform1i(this.sampler_DOF_2D, 0);
	
	this.gl.activeTexture(this.gl.TEXTURE1); 
	this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureFB_Normals); // RT2 rgba depth camera
	this.gl.uniform1i(this.sampler_DOF_textureFBNormals, 1);
	
	
	this.gl.enableVertexAttribArray(this.attr_DOF_pos);
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer_QUAD);
	this.gl.vertexAttribPointer(this.attr_DOF_pos, 3, this.gl.FLOAT, false, 0, 0);
	
	this.gl.enableVertexAttribArray(this.attr_DOF_tex);
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureBuffer_QUAD);
	this.gl.vertexAttribPointer(this.attr_DOF_tex, 3, this.gl.FLOAT, false, 0, 0);
	
	this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer_QUAD);
	this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);	
	
	//this.gl.disable(this.gl.BLEND);
};