/**
 * Constructs a new graph instance. Note that the constructor does not take a
 * container because the graph instance is needed for creating the UI, which in
 * turn will create the container for the graph. Hence, the container is
 * assigned later in EditorUi.
 */
Graph = function(container, model, renderHint, stylesheet) {
	// initialize the graph object
	mxGraph.call(this, container, model, renderHint, stylesheet);
	
	this.setConnectable(true);
	this.setDropEnabled(true);
	this.setPanning(true);
	this.setTooltips(!mxClient.IS_TOUCH);
	this.allowAutoPanning = true;
    this.setAllowDanglingEdges(false);
    //do not allow negative coordinates, this is not supported from the Content Server
    this.setAllowNegativeCoordinates(false);
    
    //disable loop connection with one step
    this.setAllowLoops(false);
    //disable multiple connections between two steps
    this.setMultigraph(false);
    //set the resource id for the error message
    this.alreadyConnectedResource = 'ERROR_LINK_DUPLICATE';
    
	// Disables cloning of connection sources
	this.connectionHandler.setCreateTarget(false);
	
	// Disables built-in connection starts
	this.connectionHandler.isValidSource = function() {
		return mxConnectionHandler.prototype.isValidSource.apply(this, arguments) && urlParams.connect != '2';
	};

	// Creates rubberband selection
    var rubberband = new mxRubberband(this);
    
    this.getRubberband = function() {
        return rubberband;
    };
    
    // Shows hand cursor while panning
	this.panningHandler.addListener(mxEvent.PAN_START, mxUtils.bind(this, function() {
		this.container.style.cursor = 'pointer';
	}));
			
	this.panningHandler.addListener(mxEvent.PAN_END, mxUtils.bind(this, function() {
		this.container.style.cursor = 'default';
	}));

	this.popupMenuHandler.autoExpand = true;
	
	this.popupMenuHandler.isSelectOnPopup = function(me)
	{
		return mxEvent.isMouseEvent(me.getEvent());
	};
	
    // Adds support for HTML labels via style. Note: Currently, only the Java
    // backend supports HTML labels but CSS support is limited to the following:
    // http://docs.oracle.com/javase/6/docs/api/index.html?javax/swing/text/html/CSS.html
	this.isHtmlLabel = function(cell) {
		var state = this.view.getState(cell);
		var style = (state !== null) ? state.style : this.getCellStyle(cell);
		
		return style.html == '1';
	};
	
	// Unlocks all cells
	this.isCellLocked = function(cell) {
		return false;
	};

	// Tap and hold brings up context menu.
	// Tolerance slightly below graph tolerance is better.
	this.connectionHandler.tapAndHoldTolerance = 16;
	
	// Tap and hold on background starts rubberband on cell starts connecting
	var connectionHandlerTapAndHold = this.connectionHandler.tapAndHold;
	this.connectionHandler.tapAndHold = function(me, state) {
		if (state === null) {
			if (!this.graph.panningHandler.active) {
				rubberband.start(me.getGraphX(), me.getGraphY());
				this.graph.panningHandler.panningTrigger = false;
			}
		}
		else if (tapAndHoldStartsConnection) {
			connectionHandlerTapAndHold.apply(this, arguments);	
		}
		else if (this.graph.isCellSelected(state.cell) && this.graph.getSelectionCount() > 1) {
			this.graph.removeSelectionCell(state.cell);
		}
	};

	// disable resizing of shapes
	var oldResizable = this.isCellResizable;
	this.isCellResizable = function(cell)
	{
		return oldResizable.apply(this, arguments) && false;
	};

	// disable the editing of the cell
	var oldEditable = this.isCellEditable;
	this.isCellEditable = function(cell)
	{
		return oldEditable.apply(this, arguments) && false;
	};
	
	if (touchStyle) {
		this.initTouch();
	}	
};

// Graph inherits from mxGraph
mxUtils.extend(Graph, mxGraph);

/**
 * Allows to all values in fit.
 */
Graph.prototype.minFitScale = null;

/**
 * Allows to all values in fit.
 */
Graph.prototype.maxFitScale = null;

/**
 * Disables folding for non-swimlanes.
 */
Graph.prototype.isCellFoldable = function(cell) {
	return this.foldingEnabled && this.isSwimlane(cell);
};

/**
 * Disables drill-down for non-swimlanes.
 */
Graph.prototype.isValidRoot = function(cell) {
	return this.isSwimlane(cell);
};

/**
 * Overrides createGroupCell to set the group style for new groups to 'group'.
 */
Graph.prototype.createGroupCell = function() {
	var group = mxGraph.prototype.createGroupCell.apply(this, arguments);
	group.setStyle('group');
	
	return group;
};

/**
 * Overrides tooltips to no tooltip
 */
Graph.prototype.getTooltipForCell = function(cell) {
	var tip = '';
	
	return tip;
};

/**
 * Overrides tooltips for edges to no tooltip
 */
mxElbowEdgeHandler.prototype.getTooltipForNode = function(node){
	return '';
};

/**
 * Returns the label for the given cell.
 * To get the label it calls the getLabel method if the cell value.
 * It also trims the label if necessary.
 * The length for the trim is depending on the shape size and type.
 * 
 * The evaluation task is special treated, so that no label is shown 
 * when it is displayed in the toolbox or tooltip.
 */
Graph.prototype.convertValueToString = function(cell) {
	if (cell.value !== null && typeof(cell.value) === 'object')	{
		
		var label = cell.value.getLabel();
		
		//get the task type, depending if the cell comes from the toolbox or the graph itself
		var type = '';
		if ((Task.prototype.isPrototypeOf(cell.value)) || (Link.prototype.isPrototypeOf(cell.value))) {
			//get the type from the type object
			type = cell.value.type.type;
		}
		else {
			type = cell.value.type;
		}
		
		//calculate the size for the label
		var geometry = this.model.getGeometry(cell);
		
		if (!this.model.isCollapsed(cell) && geometry !== null && (geometry.offset === null ||
			(geometry.offset.x === 0 && geometry.offset.y === 0)) && this.model.isVertex(cell) &&
			geometry.width >= 2) {
			
			var style = this.getCellStyle(cell);
			var fontSize = style[mxConstants.STYLE_FONTSIZE] || mxConstants.DEFAULT_FONTSIZE;
			
			//limit the number of characters, so that the label does not overlay the icon
			var max =  wfConstants.MAX_LABEL_CHARACTERS_BELOW;
			switch(type) {
				case wfTaskTypes.START_TASK:
				case wfTaskTypes.MILESTONE_TASK:
				case wfTaskTypes.EVALUATION_TASK:
					//set the maximum characters to a fixed value for shapes which are showing the label below
					max = wfConstants.MAX_LABEL_CHARACTERS_BELOW;
					break;
				default:
					//calculate the maximum characters for the other tasks
					max = Math.min(wfConstants.MAX_LABEL_CHARACTERS_INSIDE, geometry.width / (fontSize * 0.625));
					break;
			}
			
			if (label.length > 0) {
				
				//wrap the test with the max character number
				label = label.wordWrap(max, '\n', 1);
				
				//remove last char, if it is a \n
				if (label.substr(label.length - 1, 1) == '\n') {
					label = label.substr(0, label.length - 1);
				}
			}
		}		
		return label;
	}
	
	return mxGraph.prototype.convertValueToString.apply(this, arguments);
};

/**
 * Customized graph for touch devices.
 */
Graph.prototype.initTouch = function() {
	
	// Disables new connections via "hotspot"
	this.connectionHandler.marker.isEnabled = function() {
		return this.graph.connectionHandler.first !== null;
	};

	// Hides menu when editing starts
	this.addListener(mxEvent.START_EDITING, function(sender, evt) {
		this.popupMenuHandler.hideMenu();
	});

	// Context menu for touchstyle
	var showMenu = false;
	var menuCell = null;

	// Checks if native hit detection did not return anything and does custom
	// hit detection for edges to take into account the tolerance
	this.updateMouseEvent = function(me) {
		var me = mxGraph.prototype.updateMouseEvent.apply(this, arguments);

		if (me.getState() === null) {
			var cell = this.getCellAt(me.graphX, me.graphY);
			
			if (this.getModel().isEdge(cell)) {
				me.state = this.view.getState(cell);
				
				if (me.state !== null && me.state.shape !== null) {
					this.container.style.cursor = me.state.shape.node.style.cursor;
				}
			}
		}
		
		if (me.getState() === null) {
			this.container.style.cursor = 'default';
		}
		
		return me;
	};
		
	// Handles popup menu on touch devices (tap selected cell)
	this.fireMouseEvent = function(evtName, me, sender) {
		if (evtName == mxEvent.MOUSE_DOWN) {
			if (!this.popupMenuHandler.isMenuShowing()) {
				menuCell = me.getCell();
				showMenu = (menuCell !== null) ? this.isCellSelected(menuCell) : this.isSelectionEmpty();
			}
			else {
				showMenu = false;
				menuCell = null;
			}
		}
		else if (evtName == mxEvent.MOUSE_UP) {
			if (showMenu && !this.isEditing()) {
				if (!this.popupMenuHandler.isMenuShowing()) {
					var x = mxEvent.getClientX(me.getEvent());
					var y = mxEvent.getClientY(me.getEvent());
					
					this.popupMenuHandler.popup(x + 16, y, menuCell, me.getEvent());
				}
				
				showMenu = false;
				menuCell = null;
				me.consume();
				
				return;
			}
			
			showMenu = false;
			menuCell = null;
		}

		mxGraph.prototype.fireMouseEvent.apply(this, arguments);

		if (evtName == mxEvent.MOUSE_MOVE && me.isConsumed()) {
			showMenu = false;
			menuCell = null;
		}
	};
};

/**
 * Return the constraints for the shape.
 * If it is a stencil shape (defined in the stencils.xml file) return these constraints,
 * if it is another shape type return the defined constraints from below this method.
 */
Graph.prototype.getAllConnectionConstraints = function(terminal, source) {
	
	if (terminal != null && terminal.shape != null)
	{
		if (terminal.shape.stencil != null)
		{
			return terminal.shape.stencil.constraints;
		}
		else
		{
			return terminal.shape.constraints;
		}
	}

	return mxGraph.prototype.getAllConnectionConstraints.apply(this, arguments);
};
/**
 * Define the constraints for the none stencil shapes (shapes which are not defined in the stencils.xml files)
 * Currently only the Label shape for the general task is defined in code.
 * Define constraints for the rectangle and the label shape 
 */
mxRectangleShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.5, 0), true),
                                          new mxConnectionConstraint(new mxPoint(0.5, 1), true),
                                          new mxConnectionConstraint(new mxPoint(0, 0.5), true),
                                          new mxConnectionConstraint(new mxPoint(1, 0.5), true)];
mxLabel.prototype.constraints = mxRectangleShape.prototype.constraints;

/**
 * Add a task to the graph
 */
Graph.prototype.addTask = function (parent, task) {
	
    if ((typeof (task.name) != "undefined") && (typeof (task.x) != "undefined") && (typeof (task.y) != "undefined")) {
        var style = task.type.type;

        if ((typeof (task.overlay) != "undefined") && (task.overlay)) {
            // if an overlay type is defined change the style to the overlay style
            style = task.type.type + "-" + task.overlay;
        }

        var v = this.insertVertex(parent, null, task, task.x, task.y, task.type.defaultWidth, task.type.defaultHeight, style);
        
        //add the second label only when necessary, this is for now the indication that it is in the status view
        //adding a child object to the shape change its behavior to a container which can contain other shapes.
        //in the status view it has no effect when the shape behaves like a container
        if((task.getStatusLabel() !== null) && (task.getStatusLabel() !== "")) {
        	//add the status label if it is set as a second label below the shape 
        	var rtLabel = this.insertVertex(v, null, task.getStatusLabel(), 0.5, 1.0, 0, 0, 'align=center;verticalAlign=top;fontColor=black;selectable=0;movable=0', true);
        	rtLabel.setConnectable(false);
        }
		
		return v;
    }
    return null;
};

/**
 * Define a special style which indicates if a cell is selectable or not.
 * This is used for the second label for the tasks.
 */
mxGraph.prototype.isCellSelectable = function(cell) {
   var state = this.view.getState(cell);
   var style = (state != null) ? state.style : this.getCellStyle(cell);
   
   return this.isCellsSelectable() && !this.isCellLocked(cell) && style['selectable'] != 0;
};

/**
 * Add a new link to the graph, with its connection points
 */
Graph.prototype.addLink = function (parent, link, start, end) {
    var e1 = this.insertEdge(parent, null, link, start, end, link.type.type);
    
    //add connection points if they are provided
    if((link.points !== undefined) && (link.points !== null) && (link.points.length > 0)) {
    	var geo = this.model.getGeometry(e1);
    	geo = geo.clone();
    	geo.points = link.points;
    	this.model.setGeometry(e1, geo);
    }    
    
    //set constraints
    if((link.exitConstraint !== undefined) && (link.exitConstraint !== null)) {
    	var exitConstraint = new mxConnectionConstraint(new mxPoint(link.exitConstraint.x, link.exitConstraint.y), link.exitConstraint.perimeter);
    	this.setConnectionConstraint(e1, e1.source, true, exitConstraint);
    }
    
    if((link.entryConstraint !== undefined) && (link.entryConstraint !== null)) {
    	var entryConstraint = new mxConnectionConstraint(new mxPoint(link.entryConstraint.x, link.entryConstraint.y), link.entryConstraint.perimeter);
    	this.setConnectionConstraint(e1, e1.target, false, entryConstraint);
    }
    
    return e1;
};

/**
 * Implements touch devices.
 */
(function() {
	// Touch-specific static overrides
	if (touchStyle) {
		// Sets constants for touch style
		mxConstants.HANDLE_SIZE = 16;
		mxConstants.LABEL_HANDLE_SIZE = 7;
		
		// Larger tolerance and grid for real touch devices
		if (mxClient.IS_TOUCH) {
			mxShape.prototype.svgStrokeTolerance = 18;
			mxVertexHandler.prototype.tolerance = 12;
			mxEdgeHandler.prototype.tolerance = 12;
			Graph.prototype.tolerance = 14;
			Graph.prototype.gridSize = 20;
			
			// One finger pans (no rubberband selection) must start regardless
			// of mouse button
			mxPanningHandler.prototype.selectOnPopup = false;
			mxPanningHandler.prototype.useLeftButtonForPanning = true;
			mxPanningHandler.prototype.isPanningTrigger = function(me) {
				var evt = me.getEvent();
                return (this.useLeftButtonForPanning && (this.ignoreCell || me.getState() === undefined || me.getState() === null)) || 
                       (mxEvent.isControlDown(evt) && mxEvent.isShiftDown(evt)) || 
                       (this.usePopupTrigger && mxEvent.isPopupTrigger(evt));
			};
		}
		
		// Don't clear selection if multiple cells selected
		var graphHandlerMouseDown = mxGraphHandler.prototype.mouseDown;
		mxGraphHandler.prototype.mouseDown = function(sender, me) {
			graphHandlerMouseDown.apply(this, arguments);

			if (this.graph.isCellSelected(me.getCell()) && this.graph.getSelectionCount() > 1) {
				this.delayedSelection = false;
			}
		};

		// On connect the target is selected and we clone the cell of the
		// preview edge for insert
		mxConnectionHandler.prototype.selectCells = function(edge, target){
			if (touchStyle && target !== null) {
				this.graph.setSelectionCell(target);
			}
			else {
				this.graph.setSelectionCell(edge);
			}
		};

		// Overrides double click handling to use the tolerance
		// FIXME: Double click on edges in iPad needs focus on textarea
		var graphDblClick = mxGraph.prototype.dblClick;
		Graph.prototype.dblClick = function(evt, cell) {
			if (cell === null) {
				var pt = mxUtils.convertPoint(this.container,
					mxEvent.getClientX(evt), mxEvent.getClientY(evt));
				cell = this.getCellAt(pt.x, pt.y);
			}

			graphDblClick.call(this, evt, cell);
		};

		// Rounded edge and vertex handles
		var touchHandle = new mxImage(IMAGE_PATH + '/touch-handle.png', 16, 16);
		mxVertexHandler.prototype.handleImage = touchHandle;
		mxEdgeHandler.prototype.handleImage = touchHandle;
		mxOutline.prototype.sizerImage = touchHandle;
		
		// Pre-fetches touch handle
		new Image().src = touchHandle.src;

		// Adds connect icon to selected vertices
		var connectorSrc = IMAGE_PATH + '/touch-connector.png';
		
		var vertexHandlerInit = mxVertexHandler.prototype.init;
		mxVertexHandler.prototype.init = function() {
			vertexHandlerInit.apply(this, arguments);
			var md = (mxClient.IS_TOUCH) ? 'touchstart' : 'mousedown';

			// Only show connector image on one cell and do not show on
			// containers
			if (showConnectorImg && this.graph.connectionHandler.isEnabled() &&
				this.graph.isCellConnectable(this.state.cell) &&
				!this.graph.isValidRoot(this.state.cell) &&
				this.graph.getSelectionCount() == 1) {
				
				this.connectorImg = mxUtils.createImage(connectorSrc);
				this.connectorImg.style.cursor = 'pointer';
				this.connectorImg.style.width = '29px';
				this.connectorImg.style.height = '29px';
				this.connectorImg.style.position = 'absolute';
				
				if (!mxClient.IS_TOUCH) {
					this.connectorImg.setAttribute('title', mxResources.get('connect'));
					mxEvent.redirectMouseEvents(this.connectorImg, this.graph, this.state);
				}

				// Adds 2px tolerance
				this.connectorImg.style.padding = '2px';
				
				// Starts connecting on touch/mouse down
				mxEvent.addListener(this.connectorImg, md,
					mxUtils.bind(this, function(evt) {
						this.graph.popupMenuHandler.hideMenu();
						var pt = mxUtils.convertPoint(this.graph.container,
								mxEvent.getClientX(evt), mxEvent.getClientY(evt));
						this.graph.connectionHandler.start(this.state, pt.x, pt.y);
						this.graph.isMouseDown = true;
						mxEvent.consume(evt);
					})
				);

				this.graph.container.appendChild(this.connectorImg);
			}

			this.redrawTools();
		};
		
		var vertexHandlerRedraw = mxVertexHandler.prototype.redraw;
		mxVertexHandler.prototype.redraw = function() {
			vertexHandlerRedraw.apply(this);
			this.redrawTools();
		};
		
		mxVertexHandler.prototype.redrawTools = function() {
			if (this.state !== null && this.connectorImg !== undefined && this.connectorImg !== null) {
				// Top right for single-sizer
				if (mxVertexHandler.prototype.singleSizer) {
					this.connectorImg.style.left = (this.state.x + this.state.width - this.connectorImg.offsetWidth / 2) + 'px';
					this.connectorImg.style.top = (this.state.y - this.connectorImg.offsetHeight / 2) + 'px';
				}
				else {
					this.connectorImg.style.left = (this.state.x + this.state.width + mxConstants.HANDLE_SIZE / 2 + 4/* - 2 padding */) + 'px';
					this.connectorImg.style.top = (this.state.y + (this.state.height - this.connectorImg.offsetHeight) / 2) + 'px';
				}
			}
		};
		
		var vertexHandlerDestroy = mxVertexHandler.prototype.destroy;
		mxVertexHandler.prototype.destroy = function(sender, me) {
			vertexHandlerDestroy.apply(this, arguments);

			if ((this.connectorImg !== undefined) && (this.connectorImg !== null)) {
				this.connectorImg.parentNode.removeChild(this.connectorImg);
				this.connectorImg = null;
			}
		};
		
		// Pre-fetches touch connector
		new Image().src = connectorSrc;
	}
	else {
		// Larger tolerance
		mxShape.prototype.svgStrokeTolerance = 18;
		mxVertexHandler.prototype.tolerance = 12;
		mxEdgeHandler.prototype.tolerance = 12;
		Graph.prototype.tolerance = 14;
		
		var img = new mxImage(IMAGE_PATH + '/connector.png', 15, 15);
		mxConnectionHandler.prototype.connectImage = img;

		// Pre-fetches img
		new Image().src = img.src;
		
		if (urlParams.connect === '2') {
			// not touchStyle
					
			var vertexHandlerInit = mxVertexHandler.prototype.init;
			mxVertexHandler.prototype.init = function() {
				vertexHandlerInit.apply(this, arguments);
	
				// Only show connector image on one cell and do not show on
				// containers
				if (showConnectorImg && this.graph.connectionHandler.isEnabled() &&
					this.graph.isCellConnectable(this.state.cell) &&
					!this.graph.isValidRoot(this.state.cell) &&
					this.graph.getSelectionCount() == 1) {
					
					this.connectorImg = mxUtils.createImage(img.src);
					this.connectorImg.style.cursor = 'pointer';
					this.connectorImg.style.width = img.width + 'px';
					this.connectorImg.style.height = img.height + 'px';
					this.connectorImg.style.position = 'absolute';
					
					this.connectorImg.setAttribute('title', mxResources.get('connect'));
					mxEvent.redirectMouseEvents(this.connectorImg, this.graph, this.state);
	
					// Adds 2px tolerance
					this.connectorImg.style.padding = '2px';
					
					// Starts connecting on touch/mouse down
					mxEvent.addListener(this.connectorImg, 'mousedown',
						mxUtils.bind(this, function(evt) {
							this.graph.popupMenuHandler.hideMenu();
							var pt = mxUtils.convertPoint(this.graph.container,
									mxEvent.getClientX(evt), mxEvent.getClientY(evt));
							this.graph.connectionHandler.start(this.state, pt.x, pt.y);
							this.graph.isMouseDown = true;
							mxEvent.consume(evt);
						})
					);
	
					this.graph.container.appendChild(this.connectorImg);
				}
	
				this.redrawTools();
			};
			
			var vertexHandlerRedraw = mxVertexHandler.prototype.redraw;
			mxVertexHandler.prototype.redraw = function() {
				vertexHandlerRedraw.apply(this);
				this.redrawTools();
			};
			
			mxVertexHandler.prototype.redrawTools = function() {
				if (this.state !== null && this.connectorImg !== null) {
					// Top right for single-sizer
					if (mxVertexHandler.prototype.singleSizer) {
						this.connectorImg.style.left = (this.state.x + this.state.width - this.connectorImg.offsetWidth / 2) + 'px';
						this.connectorImg.style.top = (this.state.y - this.connectorImg.offsetHeight / 2) + 'px';
					}
					else {
						this.connectorImg.style.left = (this.state.x + this.state.width + mxConstants.HANDLE_SIZE / 2 + 2/* - 2 padding */) + 'px';
						this.connectorImg.style.top = (this.state.y + (this.state.height - this.connectorImg.offsetHeight) / 2) + 'px';
					}
				}
			};
			
			var vertexHandlerDestroy = mxVertexHandler.prototype.destroy;
			mxVertexHandler.prototype.destroy = function(sender, me) {
				vertexHandlerDestroy.apply(this, arguments);
	
				if (this.connectorImg !== null) {
					this.connectorImg.parentNode.removeChild(this.connectorImg);
					this.connectorImg = null;
				}
			};
		}
	}
})();
