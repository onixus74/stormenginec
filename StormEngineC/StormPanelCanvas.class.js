/**
* @class
* @constructor
*/
StormEngineC_PanelCanvas = function(sec) {
	this._sec = sec;
};

/**
* @type Void
* @private
*/
StormEngineC_PanelCanvas.prototype.loadPanel = function() {
	var html = '<canvas id="CANVASID_STORM" ></canvas><br />'+
				'<div id="DIVID_StormPanelCanvas_proc"></div>'+
				'<button type="button" id="BTNID_StormPanelCanvas_renderBtn" >Render</button>'+
				'<button type="button" id="BTNID_StormPanelCanvas_renderstopBtn" onclick="" ><div style="width:14px;height:14px;background:#FF0000;"></div></button>';	
	this.panel = new StormPanel({"id": 'DIVID_StormPanelCanvas', 
								"paneltitle": 'RENDER',
								"html": html});
	
										
	$("#DIVID_StormPanelCanvas #BTNID_StormPanelCanvas_renderBtn").bind('click', (function() {
		this._sec.PanelRenderSettings.pushRender();
	}).bind(this));
	$("#DIVID_StormPanelCanvas #BTNID_StormPanelCanvas_renderstopBtn").bind('click', (function() {
		this._sec.renderFrameStop();
	}).bind(this));
};

/**
* @type Void
* @private
*/
StormEngineC_PanelCanvas.prototype.show = function() {
	this.panel.show();
};

/**
* @type Void
* @private
* @param {Int} width
* @param {Int} height
*/
StormEngineC_PanelCanvas.prototype.setDimensions = function(width, height) {
	$('#CANVASID_STORM').attr('width',width);
	$('#CANVASID_STORM').attr('height',height);
};
