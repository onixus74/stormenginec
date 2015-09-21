/**
* @class
* @constructor
*/
StormEngineC_PanelBottomMenu = function(sec) {
	this._sec = sec;
};

/**
* @type Void
* @private
*/
StormEngineC_PanelBottomMenu.prototype.loadPanel = function() {
	var strBtns = ''+
	"<div id='TABLEID_STORMMENU' style='display:table;background-color:#262626;font-size:11px;color:#FFF;'>"+
		"<div style='display:table-cell'>"+ 
			"<div style='padding:2px'>LOCAL<input type='checkbox' id='CHECKID_STOMTOOLBAR_LOCAL' /></div>"+
		"</div>"+
		"<div style='display:table-cell'>"+
			"<div id='STORMMENU0' data-menucontent>"+  
				"<div><a id='STORMMENUBTN_C0_01'>Import Wavefront (.obj)..</a> <input id='INPUTID_StormFileImport' type='file' style='display:none;'/></div>"+
				"<div><a id='STORMMENUBTN_C0_02'>Import Collada (.DAE)..</a> <input id='INPUTID_StormFileImportCollada' type='file' style='display:none;'/></div>"+
			"</div>"+
			"<div>File</div>"+
		"</div>"+
		"<div style='display:table-cell'>"+
			"<div id='STORMMENU1' data-menucontent>"+
				"<div><a id='STORMMENUBTN_C1_01'>List Objects..</a></div>"+
				"<div><a id='STORMMENUBTN_C1_02'>Edit object..</a></div>"+
				"<div><a id='STORMMENUBTN_C1_03'>Environment..</a></div>"+
			"</div>"+
			"<div>Edit</div>"+
		"</div>"+
		"<div style='display:table-cell'>"+
			"<div id='STORMMENU2' data-menucontent>"+
				"<div data-menucontent>"+
					"<div><a id='STORMMENUBTN_C2_01_PE'>PERSPECTIVE</a></div>"+
					"<div><a id='STORMMENUBTN_C2_01_OR'>ORTHOGRAPHIC</a></div>"+
					"<div><div style='height:2px;background-color:#FFF;'></div></div>"+
					"<div><a id='STORMMENUBTN_C2_01_MAINCAMERA'>MAIN CAMERA</a></div>"+
					"<div><a id='STORMMENUBTN_C2_01_LEFT'>LEFT</a></div>"+
					"<div><a id='STORMMENUBTN_C2_01_RIGHT'>RIGHT</a></div>"+ 
					"<div><a id='STORMMENUBTN_C2_01_FRONT'>FRONT</a></div>"+
					"<div><a id='STORMMENUBTN_C2_01_BACK'>BACK</a></div>"+ 
					"<div><a id='STORMMENUBTN_C2_01_TOP'>TOP</a></div>"+
					"<div><a id='STORMMENUBTN_C2_01_BOTTOM'>BOTTOM</a></div>"+  
					"<div><div style='height:2px;background-color:#FFF;'></div></div>"+
					"<div><a id='STORMMENUBTN_C2_01_01'>TRIANGLES</a></div>"+
					"<div><a id='STORMMENUBTN_C2_01_02'>TRIANGLE_FAN</a></div>"+
					"<div><a id='STORMMENUBTN_C2_01_03'>TRIANGLE_STRIP</a></div>"+
					"<div><a id='STORMMENUBTN_C2_01_04'>LINES</a></div>"+
					"<div><a id='STORMMENUBTN_C2_01_05'>LINE_LOOP</a></div>"+
					"<div><a id='STORMMENUBTN_C2_01_06'>LINE_STRIP</a></div>"+
					"<div><a id='STORMMENUBTN_C2_01_07'>POINTS</a></div>"+
				"</div>"+
				"<div><a id='STORMMENU_C2_01'>View</a></div>"+
				"<div><a id='STORMMENUBTN_C2_02'>Pause viewport</a></div>"+
				"<div><a id='STORMMENUBTN_C2_03'>Timeline</a></div>"+
			"</div>"+
			"<div>View</div>"+
		"</div>"+
		"<div style='display:table-cell'>"+
			"<div id='STORMMENU3' data-menucontent>"+
				"<div><span style='color:#CCC'>PRIMITIVES</span></div>"+
				"<div><a id='STORMMENUBTN_C3_Triangle'>Triangle</a></div>"+
				"<div><a id='STORMMENUBTN_C3_Box'>Box</a></div>"+
				"<div><a id='STORMMENUBTN_C3_Quad'>Quad</a></div>"+
				"<div><a id='STORMMENUBTN_C3_Tube'>Tube</a></div>"+
				"<div><a id='STORMMENUBTN_C3_Sphere'>Sphere</a></div>"+
				
				"<div><div style='height:2px;background-color:#FFF;'></div></div>"+
				"<div><span style='color:#CCC'>LIGHTS</span></div>"+
				"<div><a id='STORMMENUBTN_C3_SpotLight'>Spot light</a></div>"+
				"<div><a id='STORMMENUBTN_C3_SunLight'>Sun light</a></div>"+
				
				"<div><div style='height:2px;background-color:#FFF;'></div></div>"+
				"<div><span style='color:#CCC'>OTHERS</span></div>"+
				"<div><a id='STORMMENUBTN_C3_Camera'>Camera</a></div>"+
				"<div><a id='STORMMENUBTN_C3_Line'>Line</a></div>"+
				"<div><a id='STORMMENUBTN_C3_Particles'>Particles</a></div>"+
				"<div><a id='STORMMENUBTN_C3_PolarityPoint'>Polarity point</a></div>"+
				"<div><a id='STORMMENUBTN_C3_ForceField'>Force field</a></div>"+
				"<div><a id='STORMMENUBTN_C3_GravityForce'>Gravity force</a></div>"+
				"<div><a id='STORMMENUBTN_C3_Voxelizator'>Voxelizator</a></div>"+
				"<div><a id='STORMMENUBTN_C3_3Dtext'>3D text</a></div>"+
			"</div>"+
			"<div>Create</div>"+
		"</div>"+
		"<div style='display:table-cell'>"+
			"<div id='STORMMENU4' data-menucontent>"+
				"<div><a id='STORMMENUBTN_C4_01'>EMR Spectrum Editor..</a></div>"+
				"<div><a id='STORMMENUBTN_C4_02'>Material Editor..</a></div>"+
			"</div>"+
			"<div>Materials</div>"+
		"</div>"+
		"<div style='display:table-cell'>"+
			"<div id='STORMMENU5' data-menucontent>"+
				"<div><a id='STORMMENUBTN_C5_01'>Render settings..</a></div>"+
			"</div>"+
			"<div>Render</div>"+
		"</div>"+
	"</div>"+
	"<div id='STORMMENU_MOUSE'>"+
		"<div><a id='BTNID_STOMTOOLBAR_MOVE'>MOVE</a></div>"+
		"<div><a id='BTNID_STOMTOOLBAR_ROTATE'>ROTATE</a></div>"+
		"<div><a id='BTNID_STOMTOOLBAR_SCALE'>SCALE</a></div>"+
	"</div>";
	var e = DCE('div');
	e.innerHTML = strBtns;
	this._sec.target.parentNode.appendChild(e);
	
	if(this._sec.enableRender == false) {
		$('#STORMMENU5').hide();
		$('#STORMMENUBTN_C4_01').hide();
	} 
	
	
	// MOUSE MENU
	DGE('STORMMENU_MOUSE').addEventListener("contextmenu", function(e){
		e.preventDefault();
	}, false);
	DGE('STORMMENU_MOUSE').classList.add("SECmenuMouse");
	DGE('STORMMENU_MOUSE').addEventListener('mouseout', function(e) {
		var obj = e.relatedTarget;//prevent if over childs
		while(obj != undefined) {
			if(obj == this) return;
			obj=obj.parentNode;
		}
	
		this.style.display = "none";
	}, true);	
	
	DGE("BTNID_STOMTOOLBAR_MOVE").addEventListener("click", function(e) {
		stormEngineC.defaultTransform = 0; // 0=position, 1=rotation, 2=scale
		var event = new CustomEvent("mouseout");
		DGE('STORMMENU_MOUSE').dispatchEvent(event);
	}, false);
	
	DGE("BTNID_STOMTOOLBAR_ROTATE").addEventListener("click", function(e) {
		stormEngineC.defaultTransform = 1; // 0=position, 1=rotation, 2=scale
		var event = new CustomEvent("mouseout");
		DGE('STORMMENU_MOUSE').dispatchEvent(event);
	}, false);
	
	DGE("BTNID_STOMTOOLBAR_SCALE").addEventListener("click", function(e) {
		stormEngineC.defaultTransform = 2; // 0=position, 1=rotation, 2=scale
		var event = new CustomEvent("mouseout");
		DGE('STORMMENU_MOUSE').dispatchEvent(event);
	}, false); 
	
	
	// BOTTOM MENU
	// local checkbox
	DGE("CHECKID_STOMTOOLBAR_LOCAL").addEventListener("click", function(e) {
		stormEngineC.defaultTransformMode = (stormEngineC.defaultTransformMode == 0) ? 1 : 0; // 0=world, 1=local
	}, false);
	
	// menus
	var menuObjs = [];
	var menu = new StormMenu({	content: DGE('STORMMENU0'),
								mouseover: function() {
												for(var nb = 0;nb < menuObjs.length;nb++)
													if(this != menuObjs[nb]) menuObjs[nb].close();
											}});  
	menuObjs.push(menu);
	var menu = new StormMenu({	content: DGE('STORMMENU1'),
								mouseover: function() {
												for(var nb = 0;nb < menuObjs.length;nb++)
													if(this != menuObjs[nb]) menuObjs[nb].close();
											}});
	menuObjs.push(menu);
	var menu = new StormMenu({	content: DGE('STORMMENU2'),
								mouseover: function() {
												for(var nb = 0;nb < menuObjs.length;nb++)
													if(this != menuObjs[nb]) menuObjs[nb].close();
											}}); 
	menuObjs.push(menu);
	var menu = new StormMenu({	content: DGE('STORMMENU3'),
								mouseover: function() {
												for(var nb = 0;nb < menuObjs.length;nb++)
													if(this != menuObjs[nb]) menuObjs[nb].close();
											}});
	menuObjs.push(menu);
	var menu = new StormMenu({	content: DGE('STORMMENU4'),
								mouseover: function() {
												for(var nb = 0;nb < menuObjs.length;nb++)
													if(this != menuObjs[nb]) menuObjs[nb].close();
											}});
	menuObjs.push(menu);		
	var menu = new StormMenu({	content: DGE('STORMMENU5'),
								mouseover: function() {
												for(var nb = 0;nb < menuObjs.length;nb++)
													if(this != menuObjs[nb]) menuObjs[nb].close();
											}});
	menuObjs.push(menu);
	
	
	


	// SUBBTN ACTIONS
	$("#STORMMENUBTN_C0_01").on('click', function() {
		$('#INPUTID_StormFileImport').click();
		$('#INPUTID_StormFileImport').on('change', function() {
			var filereader = new FileReader();
			filereader.onload = function(event) {
				var nodeF = stormEngineC.createNode();
				stormEngineC.stormMesh.loadObjFromSourceText(nodeF, event.target.result);
			};
			filereader.readAsText(this.files[0]);
		});
	});
	$("#STORMMENUBTN_C0_02").on('click', function() {
		$('#INPUTID_StormFileImportCollada').click();
		$('#INPUTID_StormFileImportCollada').on('change', function() {
			var filereader = new FileReader();
			filereader.onload = function(event) {
				var nodeF = stormEngineC.createNode();
				stormEngineC.stormMesh.loadColladaFromSourceText(nodeF, event.target.result);
			};
			filereader.readAsText(this.files[0]);
		});
	});
	$("#STORMMENUBTN_C1_01").on('click', function() {
		stormEngineC.PanelListObjects.show();
	});
	$("#STORMMENUBTN_C1_02").on('click', function() {
		stormEngineC.PanelEditNode.show();
	});
	$("#STORMMENUBTN_C1_03").on('click', function() {
		stormEngineC.PanelEnvironment.show();
	});
	$("#STORMMENUBTN_C2_01_PE").on('click', function() {stormEngineC.defaultCamera.setProjectionType("p");}); 
	$("#STORMMENUBTN_C2_01_OR").on('click', function() {stormEngineC.defaultCamera.setProjectionType("o");});
	$("#STORMMENUBTN_C2_01_MAINCAMERA").on('click', function() {stormEngineC.setView("MAIN_CAMERA");});
	$("#STORMMENUBTN_C2_01_LEFT").on('click', function() {stormEngineC.setView("LEFT");});
	$("#STORMMENUBTN_C2_01_RIGHT").on('click', function() {stormEngineC.setView("RIGHT");}); 
	$("#STORMMENUBTN_C2_01_FRONT").on('click', function() {stormEngineC.setView("FRONT");});
	$("#STORMMENUBTN_C2_01_BACK").on('click', function() {stormEngineC.setView("BACK");}); 
	$("#STORMMENUBTN_C2_01_TOP").on('click', function() {stormEngineC.setView("TOP");});
	$("#STORMMENUBTN_C2_01_BOTTOM").on('click', function() {stormEngineC.setView("BOTTOM");});  
	$("#STORMMENUBTN_C2_01_01").on('click', function() {stormEngineC.stormGLContext.drawElementsMode(4);}); // TRIANGLES
	$("#STORMMENUBTN_C2_01_02").on('click', function() {stormEngineC.stormGLContext.drawElementsMode(6);}); // TRIANGLE_FAN
	$("#STORMMENUBTN_C2_01_03").on('click', function() {stormEngineC.stormGLContext.drawElementsMode(5);}); // TRIANGLE_STRIP
	$("#STORMMENUBTN_C2_01_04").on('click', function() {stormEngineC.stormGLContext.drawElementsMode(1);}); // LINES
	$("#STORMMENUBTN_C2_01_05").on('click', function() {stormEngineC.stormGLContext.drawElementsMode(2);}); // LINE_LOOP
	$("#STORMMENUBTN_C2_01_06").on('click', function() {stormEngineC.stormGLContext.drawElementsMode(3);}); // LINE_STRIP
	$("#STORMMENUBTN_C2_01_07").on('click', function() {stormEngineC.stormGLContext.drawElementsMode(0);}); // POINTS
	$("#STORMMENUBTN_C2_02").on('click', function() {
		stormEngineC.setWebGLpause();
	});	
	$("#STORMMENUBTN_C2_03").on('click', function() {
		stormEngineC.PanelAnimationTimeline.show();
	});	
	$("#STORMMENUBTN_C3_Triangle").on('click', (function() {
		var node = this._sec.createNode();
		node.loadTriangle();
		node.name = 'triangle '+this._sec.idxNodes++;
		this._sec.selectNode(node);
	}).bind(this));
	$("#STORMMENUBTN_C3_Box").on('click', (function() {
		var length = prompt('length?','1.0'); if(length == '') length = 1.0;
		var width = prompt('width?','1.0'); if(width == '') width = 1.0;
		var height = prompt('height?','1.0'); if(height == '') height = 1.0;
		
		var node = this._sec.createNode();
		node.loadBox($V3([width, height, length]));
		node.name = 'box '+this._sec.idxNodes++;
		this._sec.selectNode(node);
	}).bind(this));
	$("#STORMMENUBTN_C3_Quad").on('click', (function() {
		var length = prompt('length?','0.5'); if(length == '') length = 0.5;
		var width = prompt('width?','0.5'); if(width == '') width = 0.5;
		
		var node = this._sec.createNode();
		node.loadQuad(length/2, width/2);
		node.name = 'quad '+this._sec.idxNodes++;
		this._sec.selectNode(node);
	}).bind(this));
	$("#STORMMENUBTN_C3_Tube").on('click', (function() {
		var height = prompt('height?','1.0'); if(height == '') height = 1.0;
		var segments = prompt('segments?','6'); if(segments == '') segments = 6;
		var outerRadius = prompt('outerRadius?','1.0'); if(outerRadius == '') outerRadius = 1.0;
		var innerRadius = prompt('innerRadius?','0.7'); if(innerRadius == '') innerRadius = 0.7; 
		
		var node = this._sec.createNode();
		node.loadTube({"height": height,
						"segments": segments,
						"outerRadius": outerRadius,
						"innerRadius": innerRadius});
		node.name = 'tube '+this._sec.idxNodes++;
		this._sec.selectNode(node);
	}).bind(this));
	$("#STORMMENUBTN_C3_Sphere").on('click', (function() {
		var radius = prompt('radius?','1.0'); if(radius == '') radius = 1.0;
		var segments = prompt('segments?','6'); if(segments == '') segments = 6;		
		
		var node = this._sec.createNode();
		node.loadSphere({"radius": radius,
						"segments": segments});
		node.name = 'sphere '+this._sec.idxNodes++;
		this._sec.selectNode(node);
	}).bind(this));
	$("#STORMMENUBTN_C3_SpotLight").on('click', function() {
		var node = stormEngineC.createLight({	'type':'spot', // TYPE SPOT (MAX 10)
												'position':$V3([0.0,2.5,0.0]),
												'direction':$V3([0.01,-1.0,0.01]), //on render spot is omni
												'color':3200 // V3 color or int kelvins(1000K-15000K http://en.wikipedia.org/wiki/Color_temperature)
		});
		stormEngineC.selectNode(node);
	});
	$("#STORMMENUBTN_C3_SunLight").on('click', function() {
		var node = stormEngineC.createLight({	'type':'sun', // TYPE SUN (MAX 1) Enabled by default. New sun overrides the current
												'direction':$V3([-0.12,-0.5,0.20]),
												'color':5770
								});
		stormEngineC.selectNode(node);
	});	
	$("#STORMMENUBTN_C3_Camera").on('click', function() {
		var node = stormEngineC.createCamera($V3([0.0, 0.0, 0.0]), 1.0);
		stormEngineC.selectNode(node);
	});	
	$("#STORMMENUBTN_C3_Line").on('click', function() {
		var node = stormEngineC.createLine($V3([0.0,0.0,0.0]), $V3([1.0,0.0,0.0]), $V3([1.0,1.0,1.0]), $V3([0.0,0.0,0.0])); // vecOrigin, vecEnd, vecOriginColor, vecEndColor
		stormEngineC.selectNode(node);
	});			
	$("#STORMMENUBTN_C3_Particles").on('click', function() {
		var tamW = prompt('width?','128'); if(tamW == '') tamW = 128;
		var tamH = prompt('height?','128'); if(tamH == '') tamH = 128;
		var node = stormEngineC.createParticles();
		node.generateParticles({amount:parseInt(tamW)*parseInt(tamH),   
								disposal:{radius:0.5}, 
								color:$V3([1.0,1.0,1.0]),
								pointSize:1.0,  
								polarity:0,
								direction:undefined}); 
		stormEngineC.selectNode(node);
	});		
	$("#STORMMENUBTN_C3_PolarityPoint").on('click', function() {
		var node = stormEngineC.createPolarityPoint({polarity:1,force:0.5});
		stormEngineC.selectNode(node);
	});	
	$("#STORMMENUBTN_C3_ForceField").on('click', function() {
		var node = stormEngineC.createForceField();  
		stormEngineC.selectNode(node);
	});		
	$("#STORMMENUBTN_C3_GravityForce").on('click', function() {
		var node = stormEngineC.createGravityForce();  
		stormEngineC.selectNode(node); 
	});				
	$("#STORMMENUBTN_C3_Voxelizator").on('click', function() {
		var node = stormEngineC.createVoxelizator();   
		stormEngineC.selectNode(node); 
	});	
	$("#STORMMENUBTN_C3_3Dtext").on('click', (function() {
		var font = prompt('font?','DroidSans.svg'); if(font == '') font = 'DroidSans.svg';
		var text = prompt('text?','text'); if(text == '') text = 'text';
		var size = prompt('size?','0.0005'); if(size == '') size = 0.0005;
		var kerning = prompt('kerning?','1.0'); if(kerning == '') kerning = 1.0;
		var extrude = prompt('extrude?','0.5'); if(extrude == '') extrude = 0.5;	
		var bevel = prompt('bevel?','0.2'); if(bevel == '') bevel = 0.2;
		var bevel_angle = prompt('bevel angle?','0.2'); if(bevel_angle == '') bevel_angle = 0.2;
		
		var node = this._sec.createNode();
		node.loadText({	"svgFontUrl": stormEngineCDirectory+"/fonts/"+font,
						"text": text,
						"size": parseFloat(size),
						"kerning": parseFloat(kerning),
						"color": $V3([Math.random(), Math.random(), Math.random()]),
						"onload": function() {
							//nodeFont.extrude({dim:2.0});
							//nodeFont.setRoughness(70.0);
						},
						"extrudeDimension": parseFloat(extrude),
						"bevel": parseFloat(bevel),
						"bevelAngle": parseFloat(bevel_angle)
					});
	}).bind(this));
	$("#STORMMENUBTN_C4_01").on('click', function() {
		stormEngineC.MaterialEditor.show();
	});
	$("#STORMMENUBTN_C4_02").on('click', function() {
		stormEngineC.PanelMaterials.show();
	});						 				
	$("#STORMMENUBTN_C5_01").on('click', function() {
		stormEngineC.PanelRenderSettings.show();
	});
};