/*----------------------------------------------------------------------------------------
										LINES
----------------------------------------------------------------------------------------*/
/**
 * @private 
 */
StormGLContext.prototype.initShader_Lines = function() {
	var sourceVertex = 	this.precision+
		'attribute vec3 aVertexPosition;\n'+
		'attribute vec3 aVertexLocPosition;\n'+
		
		'uniform mat4 u_cameraWMatrix;\n'+
		'uniform mat4 uPMatrix;\n'+
			
		'varying vec3 vVertexLocPosition;\n'+
		
		'void main(void) {\n'+
			'gl_Position = uPMatrix * u_cameraWMatrix * vec4(aVertexPosition, 1.0);\n'+
			
			'vVertexLocPosition = aVertexLocPosition;\n'+
		'}';
	var sourceFragment = this.precision+
		
		'varying vec3 vVertexLocPosition;\n'+
		
		'void main(void) {\n'+
			'gl_FragColor = vec4(vec3(vVertexLocPosition[0], vVertexLocPosition[1], vVertexLocPosition[2]), 1.0);\n'+
		'}';
	this.shader_Lines = this.gl.createProgram();
	this.createShader(this.gl, "LINES", sourceVertex, sourceFragment, this.shader_Lines, this.pointers_Lines.bind(this));
};
/**
 * @private 
 */
StormGLContext.prototype.pointers_Lines = function() {
	this.attr_Lines_pos = this.gl.getAttribLocation(this.shader_Lines, "aVertexPosition");
	this.attr_Lines_posLoc = this.gl.getAttribLocation(this.shader_Lines, "aVertexLocPosition");
	
	
	this.u_Lines_PMatrix = this.gl.getUniformLocation(this.shader_Lines, "uPMatrix");
	this.u_Lines_cameraWMatrix = this.gl.getUniformLocation(this.shader_Lines, "u_cameraWMatrix");
	this.Shader_Lines_READY = true;
};
/**
 * @private 
 */
StormGLContext.prototype.render_Lines = function() {
	if(this.view_SceneNoDOF || this._sec.defaultCamera.DOFenable == false) {
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
	} else {
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fBuffer); 
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.textureObject_DOF, 0);
		//this.gl.enable(this.gl.BLEND);
		//this.gl.blendFunc(this.gl.ONE_MINUS_DST_COLOR, this.gl.ONE);
	}
	this.gl.useProgram(this.shader_Lines);
	
	this.gl.uniformMatrix4fv(this.u_Lines_PMatrix, false, this._sec.defaultCamera.mPMatrix.transpose().e);
	this.gl.uniformMatrix4fv(this.u_Lines_cameraWMatrix, false, this._sec.defaultCamera.MPOS.transpose().e);
	
	for(var n = 0, f = this.lines.length; n < f; n++) {
		this.gl.enableVertexAttribArray(this.attr_Lines_pos);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lines[n].vertexBuffer);
		this.gl.vertexAttribPointer(this.attr_Lines_pos, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.enableVertexAttribArray(this.attr_Lines_posLoc);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lines[n].vertexLocBuffer);
		this.gl.vertexAttribPointer(this.attr_Lines_posLoc, 3, this.gl.FLOAT, false, 0, 0);
	
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.lines[n].indexBuffer);
		
		
		//this.gl.drawArrays(this.gl.LINES, 0, this.lines.length*2);
		this.gl.drawElements(this.gl.LINES, 2, this.gl.UNSIGNED_SHORT, 0);
	}
	
	if(this.view_SceneNoDOF || this._sec.defaultCamera.DOFenable == false) {
	} else {
		//this.gl.disable(this.gl.BLEND);
	}
};