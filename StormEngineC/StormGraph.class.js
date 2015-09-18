/**
* @class
* @constructor
* @augments StormNode

* @property {String} objectType
*/
StormGraph = function(jsonIn) { StormNode.call(this); 
	this.objectType = 'graph';
	
	this.nodes = {};
	this.links = [];
	
	stormEngineC.shadows(false);
};
StormGraph.prototype = Object.create(StormNode.prototype);

/** @private */
StormGraph.prototype.addNode = function(jsonIn) {  
	var node = stormEngineC.createNode();
	node.name = jsonIn.id;
	node.loadBox($V3([1.0,0.1,1.0]));
	//node.loadObj({'objUrl':"../../UNUSED/boxhole.obj"});
	node.draggable(true);
	
	if(jsonIn.position != undefined) {
		node.setPosition(jsonIn.position); 
	} else {
		node.setPosition($V3([0.0, 0.0, 0.0])); 
	}
	
	
	this.nodes[node.name] = node;
};

/** @private */
StormGraph.prototype.addLink = function(idA, idB) {
	var nodeOrigin = this.nodes[idA];
	var nodeEnd = this.nodes[idB];
	
	
	var line = stormEngineC.createLine(nodeOrigin.getPosition(), nodeEnd.getPosition(), $V3([0.5,0.5,0.5]), $V3([1.0,1.0,1.0]));
	
	
	var arrow = stormEngineC.createNode();
	arrow.loadTriangle();
	arrow.setPosition(nodeEnd.getPosition());
	var o = nodeOrigin.getPosition();
	var e = nodeEnd.getPosition();
	var m = $M16().makeLookAt(o.e[0], o.e[1], o.e[2], e.e[0], e.e[1], e.e[2], 0, 1, 0);
	arrow.MPOS = m.inverse();
	arrow.setRotation((Math.PI/2), false, $V3([1.0,0.0,0.0]));
	arrow.setRotation((Math.PI/2)+(Math.PI/4), false, $V3([0.0,1.0,0.0]));
	
	
	this.links.push({"link": line,
					"arrow": arrow,
					"origin": nodeOrigin,
					"end": nodeEnd});
	
};

/** @private */
StormGraph.prototype.update = function(idA, idB) {
	/*var selectedNode = stormEngineC.getSelectedNode(); 
	if(selectedNode != undefined) {
		
	}*/
	
	for(var n=0; n < this.links.length; n++) {
		var link = this.links[n]["link"];
		var arrow = this.links[n]["arrow"];
		var nodeOrigin = this.links[n]["origin"];
		var nodeEnd = this.links[n]["end"];
		
		
		link.setOrigin(nodeOrigin.getPosition());
		link.setEnd(nodeEnd.getPosition());
		
		arrow.setPosition(nodeEnd.getPosition());
		var o = nodeOrigin.getPosition();
		var e = nodeEnd.getPosition();
		var m = $M16().makeLookAt(o.e[0], o.e[1], o.e[2], e.e[0], e.e[1], e.e[2], 0, 1, 0);
		arrow.MPOS = m.inverse();
		arrow.setRotation((Math.PI/2), false, $V3([1.0,0.0,0.0]));
		arrow.setRotation((Math.PI/2)+(Math.PI/4), false, $V3([0.0,1.0,0.0]));
	}
};
