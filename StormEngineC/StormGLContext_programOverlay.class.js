/*----------------------------------------------------------------------------------------
     									PICK
----------------------------------------------------------------------------------------*/
/**
 * @private 
 */
StormGLContext.prototype.initShader_Overlay = function() {
	var sourceVertex = this.precision+
		'attribute vec3 aVertexPosition;\n'+
		
		'uniform mat4 u_nodeWMatrix;\n'+
		'uniform mat4 u_cameraWMatrix;\n'+
		'uniform mat4 uPMatrix;\n'+
		
		'uniform mat4 u_matrixNodeTranform;\n'+
		
		'uniform float uNodeId;\n'+
		'uniform float uFar;\n'+
		'float LinearDepthConstant = 1.0/uFar;'+
		
		'void main(void) {\n'+
			'vec4 scaleVec = u_cameraWMatrix * u_nodeWMatrix * u_matrixNodeTranform * vec4(aVertexPosition, 1.0);\n'+
			'float scale = (length(scaleVec) * LinearDepthConstant)*100.0;'+
			'vec4 pos;'+
			'if(uNodeId == 0.1 || uNodeId == 0.2 || uNodeId == 0.3) {'+
				'pos = vec4(0.0,-0.5,0.0,1.0)+vec4(vec3(aVertexPosition.x,aVertexPosition.y,aVertexPosition.z), 1.0);'+
				'gl_Position = uPMatrix * u_cameraWMatrix * u_nodeWMatrix * u_matrixNodeTranform * vec4(vec3(pos.x*scale*0.1,pos.y*scale,pos.z*scale*0.1), 1.0);\n'+
			'} else if(uNodeId == 0.4 || uNodeId == 0.5 || uNodeId == 0.6) {'+
				'pos = vec4(vec3(aVertexPosition.x,aVertexPosition.y,aVertexPosition.z), 1.0);'+
				'gl_Position = uPMatrix * u_cameraWMatrix * u_nodeWMatrix * u_matrixNodeTranform * vec4(vec3(pos.x*scale,pos.y*scale,pos.z*scale), 1.0);\n'+
			'} else {'+
				'pos = vec4(0.0,-1.0,0.0,1.0)+vec4(vec3(aVertexPosition.x,aVertexPosition.y,aVertexPosition.z), 1.0);'+
				'gl_Position = uPMatrix * u_cameraWMatrix * u_nodeWMatrix * u_matrixNodeTranform * vec4(vec3(pos.x*scale,pos.y*scale,pos.z*scale), 1.0);\n'+
			'}'+
		'}';
	var sourceFragment = this.precision+
		'uniform int uOverlaySelected;\n'+
		'uniform float uNodeId;\n'+
		'void main(void) {\n'+
			'vec4 highlight = vec4(1.0, 0.862, 0.533, 1.0);'+
			'if(uNodeId == 0.1) {'+ // posX
				'if(uOverlaySelected == 1 || uOverlaySelected == 7) gl_FragColor = highlight;\n'+
				'else gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'+
			'} else if(uNodeId == 0.2) {'+ // posY
				'if(uOverlaySelected == 2 || uOverlaySelected == 8) gl_FragColor = highlight;\n'+
				'else gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n'+
			'} else if(uNodeId == 0.3) {'+ // posZ
				'if(uOverlaySelected == 3 || uOverlaySelected == 9) gl_FragColor = highlight;\n'+
				'else gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);\n'+
			'} else if(uNodeId == 0.4) {'+ // rotX
				'if(uOverlaySelected == 4) gl_FragColor = highlight;\n'+
				'else gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'+
			'} else if(uNodeId == 0.5) {'+ // rotY
				'if(uOverlaySelected == 5) gl_FragColor = highlight;\n'+
				'else gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n'+
			'} else if(uNodeId == 0.6) {'+ // rotZ
				'if(uOverlaySelected == 6) gl_FragColor = highlight;\n'+
				'else gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);\n'+
			'} else if(uNodeId == 0.7) {'+ // scaX
				'if(uOverlaySelected == 7) gl_FragColor = highlight;\n'+
				'else gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'+
			'} else if(uNodeId == 0.8) {'+ // scaY
				'if(uOverlaySelected == 8) gl_FragColor = highlight;\n'+
				'else gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n'+
			'} else if(uNodeId == 0.9) {'+ // scaZ
				'if(uOverlaySelected == 9) gl_FragColor = highlight;\n'+
				'else gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);\n'+
			'} else gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n'+
		'}';
	this.shader_Overlay = this.gl.createProgram();
	this.createShader(this.gl, "OVERLAY", sourceVertex, sourceFragment, this.shader_Overlay, this.pointers_Overlay.bind(this));
};
/**
 * @private 
 */
StormGLContext.prototype.pointers_Overlay = function() {
	this.attr_Overlay_pos = this.gl.getAttribLocation(this.shader_Overlay, "aVertexPosition");
	
	this.u_Overlay_far = this.gl.getUniformLocation(this.shader_Overlay, "uFar");
	this.u_Overlay_overlaySelected = this.gl.getUniformLocation(this.shader_Overlay, "uOverlaySelected");
	this.u_Overlay_nodeId = this.gl.getUniformLocation(this.shader_Overlay, "uNodeId");
	
	this.u_Overlay_PMatrix = this.gl.getUniformLocation(this.shader_Overlay, "uPMatrix");
	this.u_Overlay_cameraWMatrix = this.gl.getUniformLocation(this.shader_Overlay, "u_cameraWMatrix");
	this.u_Overlay_nodeWMatrix = this.gl.getUniformLocation(this.shader_Overlay, "u_nodeWMatrix");
	this.u_Overlay_matrixNodeTranform = this.gl.getUniformLocation(this.shader_Overlay, "u_matrixNodeTranform");
	this.Shader_Overlay_READY = true;
};



/** @private */
StormGLContext.prototype.render_Overlay = function() {	
	if(this._sec.editMode &&	this._sec.getSelectedNode() != undefined) {
		for(var n = 0, f = this.nodes.length; n < f; n++) { 			
			if(	this.nodes[n].visibleOnContext &&
				this.nodes[n].objectType != 'light' &&
				this.nodes[n] == this._sec.getSelectedNode()) {
					this.render_OverlayAux(this.nodes[n]);
					return;
			}
		}
		for(var n = 0, f = this.polarityPoints.length; n < f; n++) { 
			if(	this.polarityPoints[n].visibleOnContext &&
				this.polarityPoints[n] == this._sec.getSelectedNode()) { 
					this.render_OverlayAux(this.polarityPoints[n]);
					return;
			}
		}
	}
};
/** @private */
StormGLContext.prototype.render_OverlayAux = function(node) {	
	this.gl.enable(this.gl.BLEND);
	this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA); 
	this.gl.useProgram(this.shader_Overlay);
	
	//this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
	this.gl.disable(this.gl.DEPTH_TEST);
	
	this.gl.uniform1f(this.u_Overlay_far, this.far);
	this.gl.uniform1i(this.u_Overlay_overlaySelected, this._sec.stormGLContext.transformOverlaySelected);
	this.gl.uniformMatrix4fv(this.u_Overlay_PMatrix, false, this._sec.defaultCamera.mPMatrix.transpose().e);
	this.gl.uniformMatrix4fv(this.u_Overlay_cameraWMatrix, false, this._sec.defaultCamera.MPOS.transpose().e);
	
	this.gl.enableVertexAttribArray(this.attr_Overlay_pos);
	
	if(this._sec.defaultTransformMode == 0) // world
		this.gl.uniformMatrix4fv(this.u_Overlay_nodeWMatrix, false, node.MPOS.transpose().e); 
	else // local
		this.gl.uniformMatrix4fv(this.u_Overlay_nodeWMatrix, false, node.MPOSFrame.transpose().e); 
		
	if(this._sec.defaultTransform == 0 || (this._sec.defaultTransform == 2 && this._sec.defaultTransformMode == 1)) {
		// overlay pos X
		this.gl.uniform1f(this.u_Overlay_nodeId, 0.1); 
			
		this.gl.uniformMatrix4fv(this.u_Overlay_matrixNodeTranform, false, this.nodeOverlayPosX.MPOS.x(this.nodeOverlayPosX.MROTXYZ).transpose().e);
				
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.nodeOverlayPosX.buffersObjects[0].nodeMeshVertexBuffer);
		this.gl.vertexAttribPointer(this.attr_Overlay_pos, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.nodeOverlayPosX.buffersObjects[0].nodeMeshIndexBuffer);
		
		this.gl.drawElements(this.gl.TRIANGLES, this.nodeOverlayPosX.buffersObjects[0].nodeMeshIndexBufferNumItems, this.gl.UNSIGNED_SHORT, 0);	
		
		// overlay pos Y
		this.gl.uniform1f(this.u_Overlay_nodeId, 0.2); 
		this.gl.uniformMatrix4fv(this.u_Overlay_matrixNodeTranform, false, this.nodeOverlayPosY.MPOS.x(this.nodeOverlayPosY.MROTXYZ).transpose().e);
				
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.nodeOverlayPosY.buffersObjects[0].nodeMeshVertexBuffer);
		this.gl.vertexAttribPointer(this.attr_Overlay_pos, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.nodeOverlayPosY.buffersObjects[0].nodeMeshIndexBuffer);
		
		this.gl.drawElements(this.gl.TRIANGLES, this.nodeOverlayPosY.buffersObjects[0].nodeMeshIndexBufferNumItems, this.gl.UNSIGNED_SHORT, 0);	
		
		// overlay pos Z
		this.gl.uniform1f(this.u_Overlay_nodeId, 0.3); 
		this.gl.uniformMatrix4fv(this.u_Overlay_matrixNodeTranform, false, this.nodeOverlayPosZ.MPOS.x(this.nodeOverlayPosZ.MROTXYZ).transpose().e);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.nodeOverlayPosZ.buffersObjects[0].nodeMeshVertexBuffer);
		this.gl.vertexAttribPointer(this.attr_Overlay_pos, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.nodeOverlayPosZ.buffersObjects[0].nodeMeshIndexBuffer);
		
		this.gl.drawElements(this.gl.TRIANGLES, this.nodeOverlayPosZ.buffersObjects[0].nodeMeshIndexBufferNumItems, this.gl.UNSIGNED_SHORT, 0);	
	}
	if(this._sec.defaultTransform == 1) {
		// overlay rot X
		this.gl.uniform1f(this.u_Overlay_nodeId, 0.4); 
		this.gl.uniformMatrix4fv(this.u_Overlay_matrixNodeTranform, false, this.nodeOverlayRotX.MPOS.x(this.nodeOverlayRotX.MROTXYZ).transpose().e);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.nodeOverlayRotX.buffersObjects[0].nodeMeshVertexBuffer);
		this.gl.vertexAttribPointer(this.attr_Overlay_pos, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.nodeOverlayRotX.buffersObjects[0].nodeMeshIndexBuffer);
		
		this.gl.drawElements(this.gl.TRIANGLES, this.nodeOverlayRotX.buffersObjects[0].nodeMeshIndexBufferNumItems, this.gl.UNSIGNED_SHORT, 0);	
		
		// overlay rot Y
		this.gl.uniform1f(this.u_Overlay_nodeId, 0.5); 
		this.gl.uniformMatrix4fv(this.u_Overlay_matrixNodeTranform, false, this.nodeOverlayRotY.MPOS.x(this.nodeOverlayRotY.MROTXYZ).transpose().e);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.nodeOverlayRotY.buffersObjects[0].nodeMeshVertexBuffer);
		this.gl.vertexAttribPointer(this.attr_Overlay_pos, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.nodeOverlayRotY.buffersObjects[0].nodeMeshIndexBuffer);
		
		this.gl.drawElements(this.gl.TRIANGLES, this.nodeOverlayRotY.buffersObjects[0].nodeMeshIndexBufferNumItems, this.gl.UNSIGNED_SHORT, 0);	
		
		// overlay rot Z
		this.gl.uniform1f(this.u_Overlay_nodeId, 0.6); 
		this.gl.uniformMatrix4fv(this.u_Overlay_matrixNodeTranform, false, this.nodeOverlayRotZ.MPOS.x(this.nodeOverlayRotZ.MROTXYZ).transpose().e);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.nodeOverlayRotZ.buffersObjects[0].nodeMeshVertexBuffer);
		this.gl.vertexAttribPointer(this.attr_Overlay_pos, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.nodeOverlayRotZ.buffersObjects[0].nodeMeshIndexBuffer);
		
		this.gl.drawElements(this.gl.TRIANGLES, this.nodeOverlayRotZ.buffersObjects[0].nodeMeshIndexBufferNumItems, this.gl.UNSIGNED_SHORT, 0);	
	}
	if(this._sec.defaultTransform == 2 && this._sec.defaultTransformMode == 1) {
		// overlay scale X
		this.gl.uniform1f(this.u_Overlay_nodeId, 0.7); 
		this.gl.uniformMatrix4fv(this.u_Overlay_matrixNodeTranform, false, this.nodeOverlayScaX.MPOS.x(this.nodeOverlayScaX.MROTXYZ).transpose().e);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.nodeOverlayScaX.buffersObjects[0].nodeMeshVertexBuffer);
		this.gl.vertexAttribPointer(this.attr_Overlay_pos, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.nodeOverlayScaX.buffersObjects[0].nodeMeshIndexBuffer);
		
		this.gl.drawElements(this.gl.TRIANGLES, this.nodeOverlayScaX.buffersObjects[0].nodeMeshIndexBufferNumItems, this.gl.UNSIGNED_SHORT, 0);	
		
		// overlay scale Y
		this.gl.uniform1f(this.u_Overlay_nodeId, 0.8); 
		this.gl.uniformMatrix4fv(this.u_Overlay_matrixNodeTranform, false, this.nodeOverlayScaY.MPOS.x(this.nodeOverlayScaY.MROTXYZ).transpose().e);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.nodeOverlayScaY.buffersObjects[0].nodeMeshVertexBuffer);
		this.gl.vertexAttribPointer(this.attr_Overlay_pos, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.nodeOverlayScaY.buffersObjects[0].nodeMeshIndexBuffer);
		
		this.gl.drawElements(this.gl.TRIANGLES, this.nodeOverlayScaY.buffersObjects[0].nodeMeshIndexBufferNumItems, this.gl.UNSIGNED_SHORT, 0);	
		
		// overlay scale Z
		this.gl.uniform1f(this.u_Overlay_nodeId, 0.9); 
		this.gl.uniformMatrix4fv(this.u_Overlay_matrixNodeTranform, false, this.nodeOverlayScaZ.MPOS.x(this.nodeOverlayScaZ.MROTXYZ).transpose().e);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.nodeOverlayScaZ.buffersObjects[0].nodeMeshVertexBuffer);
		this.gl.vertexAttribPointer(this.attr_Overlay_pos, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.nodeOverlayScaZ.buffersObjects[0].nodeMeshIndexBuffer);
		
		this.gl.drawElements(this.gl.TRIANGLES, this.nodeOverlayScaZ.buffersObjects[0].nodeMeshIndexBufferNumItems, this.gl.UNSIGNED_SHORT, 0);	
	}
	
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.disable(this.gl.BLEND);
};