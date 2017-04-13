/**
 * Constructs a new sidebar for the given editor.
 */
function Sidebar(editorUi, container) {
	
	this.editorUi = editorUi;
	this.container = container;
	this.palettes = {};
	this.showTooltips = true;
	this.tooltip = null;
	this.graph = new Graph(document.createElement('div'), null, null, this.editorUi.editor.graph.getStylesheet());
	this.graph.foldingEnabled = false;
	this.graph.autoScroll = false;
	this.graph.setTooltips(false);
	this.graph.setConnectable(false);
	this.graph.resetViewOnRootChange = false;
	this.graph.view.setTranslate(this.thumbBorder, this.thumbBorder);
	this.graph.setEnabled(false);

	// Workaround for VML rendering in IE8 standards mode where the container must be in the DOM
	// so that VML references can be restored via document.getElementById in mxShape.init.
	if (document.documentMode == 8) {
		document.body.appendChild(this.graph.container);
	}
	
	// Workaround for no rendering in 0 coordinate in FF 10
	if (this.shiftThumbs) {
		this.graph.view.canvas.setAttribute('transform', 'translate(1, 1)');
	}
	
	if (!mxClient.IS_TOUCH) {
		mxEvent.addListener(document, 'mouseup', mxUtils.bind(this, function() {
			this.showTooltips = true;
		}));
	
		// Enables tooltips after scroll
		mxEvent.addListener(container, 'scroll', mxUtils.bind(this, function() {
			this.showTooltips = true;
		}));
		
		mxEvent.addListener(document, 'mousedown', mxUtils.bind(this, function() {
			this.showTooltips = false;
			this.hideTooltip();
		}));

		mxEvent.addListener(document, 'mousemove', mxUtils.bind(this, function(evt) {
			var src = mxEvent.getSource(evt);
			
			while (src !== null) {
				if (src == this.currentElt) {
					return;
				}
				
				src = src.parentNode;
			}
			
			this.hideTooltip();
		}));

		// Handles mouse leaving the window
		mxEvent.addListener(document, 'mouseout', mxUtils.bind(this, function(evt) {
			if (evt.toElement === null && evt.relatedTarget === null) {
				this.hideTooltip();
			}
		}));
	}
	
	this.init();
	
	// Pre-fetches tooltip image
	new Image().src = IMAGE_PATH + '/tooltip.png';
}

/**
 * Adds all palettes to the sidebar.
 */
Sidebar.prototype.init = function() {
	//load the custom stencils, e. g. OR gateway
	this.loadStencils(IMAGE_PATH + '/stencils.xml');
	
	//load the palette with all supported task types
	this.addGeneralPalette(true);
};

/**
 * Specifies if tooltips should be visible. Default is true.
 */
Sidebar.prototype.enableTooltips = !mxClient.IS_TOUCH;

/**
 * Shifts the thumbnail by 1 px.
 */
Sidebar.prototype.shiftThumbs = mxClient.IS_SVG || document.documentMode == 8;

/**
 * Specifies the delay for the tooltip. Default is 16 px.
 */
Sidebar.prototype.tooltipBorder = 16;

/**
 * Specifies the delay for the tooltip. Default is 2 px.
 */
Sidebar.prototype.thumbBorder = 2;

/**
 * Specifies the delay for the tooltip. Default is 300 ms.
 */
Sidebar.prototype.tooltipDelay = 300;

/**
 * Specifies if edges should be used as templates if clicked. Default is true.
 */
Sidebar.prototype.installEdges = true;

/**
 * Specifies the width of the thumbnails.
 */
Sidebar.prototype.thumbWidth = 70;

/**
 * Specifies the height of the thumbnails.
 */
Sidebar.prototype.thumbHeight = 70;

/**
 * Specifies the scale of the thumbnails.
 */
Sidebar.prototype.thumbScale = 0.47;

/**
 * Adds all palettes to the sidebar.
 */
Sidebar.prototype.showTooltip = function(elt, cells) {
	
	if (this.enableTooltips && this.showTooltips) {
		if (this.currentElt != elt) {
			if (this.thread !== null) {
				window.clearTimeout(this.thread);
				this.thread = null;
			}
			
			var show = mxUtils.bind(this, function() {
				// Workaround for off-screen text rendering in IE
				var old = mxText.prototype.getTableSize;
				
				if (this.graph.dialect != mxConstants.DIALECT_SVG) {
					
					mxText.prototype.getTableSize = function(table) {
						var oldParent = table.parentNode;
						
						document.body.appendChild(table);
						var size = new mxRectangle(0, 0, table.offsetWidth, table.offsetHeight);
						oldParent.appendChild(table);
						
						return size;
					};
				}
				
				// Lazy creation of the DOM nodes and graph instance
				if (this.tooltip === null) {
					
					this.tooltip = document.createElement('div');
					this.tooltip.className = 'geSidebarTooltip';
					this.editorUi.container.appendChild(this.tooltip);
					
					this.graph2 = new Graph(this.tooltip, null, null, this.editorUi.editor.graph.getStylesheet());
					this.graph2.view.setTranslate(this.tooltipBorder, this.tooltipBorder);
					this.graph2.resetViewOnRootChange = false;
					this.graph2.foldingEnabled = false;
					this.graph2.autoScroll = false;
					this.graph2.setTooltips(false);
					this.graph2.setConnectable(false);
					this.graph2.setEnabled(false);
					
					this.tooltipImage = mxUtils.createImage(IMAGE_PATH + '/tooltip.png');
					this.tooltipImage.style.position = 'absolute';
					this.tooltipImage.style.width = '14px';
					this.tooltipImage.style.height = '27px';
					
					this.editorUi.container.appendChild(this.tooltipImage);
				}
				
				this.tooltip.style.display = 'block';
				this.graph2.model.clear();
				this.graph2.addCells(cells);
				
				//get a label offset for the shapes which are loaded from the stencil.xml
				//necessary to include the label in the tooltip window
				var labelOffset = 0;
				if ((cells !== undefined) && (cells !== null) && (cells.length > 0)) {
					var t = cells[0].value.type;
					switch(t) {
						case wfTaskTypes.START_TASK:
						case wfTaskTypes.MILESTONE_TASK:
						case wfTaskTypes.EVALUATION_TASK:
							labelOffset = 20;
							break;
						default:
							labelOffset = 0;
							break;
					}
				}				
				
				var bounds = this.graph2.getGraphBounds();
				var width = bounds.x + bounds.width + this.tooltipBorder;
				var height = bounds.y + bounds.height + this.tooltipBorder + labelOffset;
				
				if (mxClient.IS_QUIRKS) {
					width += 4;
					height += 4;
				}
				
				this.tooltip.style.overflow = 'visible';
				this.tooltipImage.style.visibility = 'visible';
				this.tooltip.style.width = width + 'px';
				this.tooltip.style.height = height + 'px';
		
				var left = this.container.clientWidth + this.editorUi.splitSize + 3;
				var top = Math.max(0, (this.container.offsetTop + elt.offsetTop - this.container.scrollTop - height / 2 + 16));

				// Workaround for ignored position CSS style in IE9
				// (changes to relative without the following line)
				this.tooltip.style.position = 'absolute';
				this.tooltip.style.left = left + 'px';
				this.tooltip.style.top = top + 'px';
				this.tooltipImage.style.left = (left - 13) + 'px';
				this.tooltipImage.style.top = (top + height / 2 - 13) + 'px';
				
				mxText.prototype.getTableSize = old;
			});

			if (this.tooltip !== null && this.tooltip.style.display != 'none') {
				show();
			}
			else {
				this.thread = window.setTimeout(show, this.tooltipDelay);
			}

			this.currentElt = elt;
		}
	}
};

/**
 * Hides the current tooltip.
 */
Sidebar.prototype.hideTooltip = function() {
	
	if (this.thread !== null) {
		window.clearTimeout(this.thread);
		this.thread = null;
	}
	
	if (this.tooltip !== null) {
		this.tooltip.style.display = 'none';
		this.tooltipImage.style.visibility = 'hidden';
		this.currentElt = null;
	}
};

/**
 * Creates and returns the given title element.
 */
Sidebar.prototype.createTitle = function(label) {
	var elt = document.createElement('a');
	elt.setAttribute('href', 'javascript:void(0);');
	elt.className = 'geTitle';
	mxUtils.write(elt, label);

	return elt;
};

/**
 * Loads the stencil definition from the provided file.
 */
Sidebar.prototype.loadStencils = function(url) {

	// Loads the stencils into the registry
	var req = mxUtils.load(url);
	var root = req.getDocumentElement();
	var shape = root.firstChild;

	while (shape !== null) {
		if (shape.nodeType == mxConstants.NODETYPE_ELEMENT) {
			mxStencilRegistry.addStencil(shape.getAttribute('name'),
					new mxStencil(shape));
		}

		shape = shape.nextSibling;
	}
};

/**
 * Adds the given palette.
 */
Sidebar.prototype.addPalette = function(id, title, expanded, onInit) {
/*	var elt = this.createTitle(title);
	this.container.appendChild(elt);
*/	
	var div = document.createElement('div');
	div.className = 'geSidebar';
	
	if (expanded) {
		onInit(div);
		onInit = null;
	}
	else {
		div.style.display = 'none';
	}
	
//    this.addFoldingHandler(elt, div, onInit);
	
	var outer = document.createElement('div');
    outer.appendChild(div);
    this.container.appendChild(outer);
    
    // Keeps references to the DOM nodes
    if (id !== null) {
        this.palettes[id] = [outer]; //[elt, outer];
    }
};

/**
 * Create the given title element.
 */
Sidebar.prototype.addFoldingHandler = function(title, content, funct) {
	var initialized = false;

	title.style.backgroundImage = (content.style.display == 'none') ?
		'url(' + IMAGE_PATH + '/collapsed.gif)' : 'url(' + IMAGE_PATH + '/expanded.gif)';
	title.style.backgroundRepeat = 'no-repeat';
	title.style.backgroundPosition = '100% 50%';
	
	mxEvent.addListener(title, 'click', function(evt) {
		
		if (content.style.display == 'none') {
			if (!initialized) {
				initialized = true;
				
				if (funct !== null) {
					funct(content);
				}
			}
			
			title.style.backgroundImage = 'url(' + IMAGE_PATH + '/expanded.gif)';
			content.style.display = 'block';
		}
		else {
			title.style.backgroundImage = 'url(' + IMAGE_PATH + '/collapsed.gif)';
			content.style.display = 'none';
		}
		
		mxEvent.consume(evt);
	});
};


/**
 * Creates a thumbnail for the given cells.
 */
Sidebar.prototype.createThumb = function(cells, width, height, parent) {
	// Workaround for off-screen text rendering in IE
	var old = mxText.prototype.getTableSize;
	
	if (this.graph.dialect != mxConstants.DIALECT_SVG) {
		
		mxText.prototype.getTableSize = function(table) {
			var oldParent = table.parentNode;
			
			document.body.appendChild(table);
			var size = new mxRectangle(0, 0, table.offsetWidth, table.offsetHeight);
			oldParent.appendChild(table);
			
			return size;
		};
	}
	
	var prev = mxImageShape.prototype.preserveImageAspect;
	mxImageShape.prototype.preserveImageAspect = false;
	
	this.graph.view.rendering = false;
	this.graph.view.setScale(1);
	this.graph.addCells(cells);
	var bounds = this.graph.getGraphBounds();

	var corr = (this.shiftThumbs) ? this.thumbBorder + 1 : this.thumbBorder;
	
	//set the scale for the thumbnail to a fixed value for all shapes
	var s = this.thumbScale;
	
	this.graph.view.setScale(s);
	this.graph.view.rendering = true;
	this.graph.refresh();
	mxImageShape.prototype.preserveImageAspect = prev;

	bounds = this.graph.getGraphBounds();
	var dx = Math.max(0, Math.floor((width - bounds.width) / 2));
	var dy = Math.max(0, Math.floor((height - bounds.height) / 2));
	
	var node = null;
	
	// For supporting HTML labels in IE9 standards mode the container is cloned instead
	if (this.graph.dialect == mxConstants.DIALECT_SVG) {
		node = this.graph.view.getCanvas().ownerSVGElement.cloneNode(true);
	}
	// Workaround for VML rendering in IE8 standards mode
	else if (document.documentMode == 8) {
		node = this.graph.container.cloneNode(false);
		node.innerHTML = this.graph.container.innerHTML;
	}
	else {
		node = this.graph.container.cloneNode(true);
	}
	
	this.graph.getModel().clear();
	
	// Outer dimension is (32, 32)
	var dd = (this.shiftThumbs) ? 2 : 3;
	node.style.position = 'relative';
	node.style.overflow = 'visible';
	node.style.cursor = 'pointer';
	node.style.left = (dx + dd) + 'px';
	node.style.top = (dy + dd) + 'px';
	node.style.width = width + 'px';
	node.style.height = height + 'px';
	node.style.minWidth = '';
	node.style.minHeight = '';
	
	parent.appendChild(node);
	mxText.prototype.getTableSize = old;
};

/**
 * Creates and returns a new palette item for the given image.
 */
Sidebar.prototype.createItem = function(cells) {
	var elt = document.createElement('a');
	elt.setAttribute('href', 'javascript:void(0);');
	elt.className = 'geItem';
	elt.style.overflow = 'hidden';
	
	// Blocks default click action
	mxEvent.addListener(elt, 'click', function(evt) {
		mxEvent.consume(evt);
	});

	this.createThumb(cells, this.thumbWidth, this.thumbHeight, elt);
	
	return elt;
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createDropHandler = function(cells, allowSplit) {
	var model = this.editorUi.model;
	
	return function(graph, evt, target, x, y) {
		cells = graph.getImportableCells(cells);
		
		if (cells.length > 0) {
			var validDropTarget = (target !== null) ? graph.isValidDropTarget(target, cells, evt) : false;
			var select = null;
			
			if (target !== null && !validDropTarget) {
				target = null;
			}
			
			// Splits the target edge or inserts into target group
			if (allowSplit && graph.isSplitEnabled() && graph.isSplitTarget(target, cells, evt)) {
				graph.splitEdge(target, cells, null, x, y);
				select = cells;
			}
			else if (cells.length > 0) {
				select = [];
				//select = graph.importCells(cells, x, y, target);
				for(var i = 0; i < cells.length; i++) {
					//add the new task to the map and set the value to the type
					var v = cells[i].value;
					//set the coordinates at least to 0, no negative values are supported
					if(x < 0) { 
						x = 0; 
					}
					if(y < 0) { 
						y = 0; 
					}
					
					var s = model.map.addNewTask(v.name, x, y, v);
					select[i] = graph.addTask(target, s);
				}
			}
			
			if (select !== null && select.length > 0) {
				graph.scrollCellToVisible(select[0]);
				graph.setSelectionCells(select);
			}
		}
	};
};

/**
 * Creates and returns a preview element for the given width and height.
 */
Sidebar.prototype.createDragPreview = function(width, height) {
	var elt = document.createElement('div');
	elt.style.border = '1px dashed black';
	elt.style.width = width + 'px';
	elt.style.height = height + 'px';
	
	return elt;
};

/**
 * Creates a drag source for the given element.
 */
Sidebar.prototype.createDragSource = function(elt, dropHandler, preview) {
	var dragSource = mxUtils.makeDraggable(elt, this.editorUi.editor.graph, dropHandler,
		preview, 0, 0, this.editorUi.editor.graph.autoscroll, true, true);

	// Allows drop into cell only if target is a valid root
	dragSource.getDropTarget = function(graph, x, y) {
		var target = mxDragSource.prototype.getDropTarget.apply(this, arguments);
		
		if (!graph.isValidRoot(target)) {
			target = null;
		}
		
		return target;
	};
	
	return dragSource;
};

/**
 * Adds a handler for inserting the cell with a single click.
 */
Sidebar.prototype.addClickHandler = function(elt, ds) {
	var graph = this.editorUi.editor.graph;
	var first = null;
	
	var md = (mxClient.IS_TOUCH) ? 'touchstart' : 'mousedown';
	mxEvent.addListener(elt, md, function(evt) {
		first = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
	});
	
	var oldMouseUp = ds.mouseUp;
	ds.mouseUp = function(evt) {
		if (!mxEvent.isPopupTrigger(evt) && this.currentGraph === null && first !== null) {
			var tol = graph.tolerance;
			
			if (Math.abs(first.x - mxEvent.getClientX(evt)) <= tol &&
				Math.abs(first.y - mxEvent.getClientY(evt)) <= tol) {
				var gs = graph.getGridSize();
				ds.drop(graph, evt, null, gs, gs);
			}
		}

		oldMouseUp.apply(this, arguments);
		first = null;
	};
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createVertexTemplate = function(style, width, height, value) {
    var s = '';
    if (typeof style !== 'string') {
        //if style is not string it must be a map with style information
        for (var v in style) {
            s = s + v + '=' + style[v];
            s = s + ';';
        }
    }
    else {
        s = style;
    }
    
	var cells = [new mxCell((value !== null) ? value : '', new mxGeometry(0, 0, width, height), s)];
	cells[0].vertex = true;
	
	return this.createVertexTemplateFromCells(cells, width, height);
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createVertexTemplateFromCells = function(cells, width, height) {
	var elt = this.createItem(cells);
	var ds = this.createDragSource(elt, this.createDropHandler(cells, true), this.createDragPreview(width, height));
	this.addClickHandler(elt, ds);

	// Uses guides for vertices only if enabled in graph
	ds.isGuidesEnabled = mxUtils.bind(this, function() {
		return this.editorUi.editor.graph.graphHandler.guidesEnabled;
	});

	// Shows a tooltip with the rendered cell
	if (!touchStyle) {
		mxEvent.addListener(elt, 'mousemove', mxUtils.bind(this, function(evt) {
			this.showTooltip(elt, cells);
		}));
	}
	
	return elt;
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createEdgeTemplate = function (style, width, height, value) {

    var s = '';
    if (typeof style !== 'string') {
        //if style is not string it must be a map with style information
        for (var v in style) {
            s = s + v + '=' + style[v];
            s = s + ';';
        }
    }
    else {
        s = style;
    }

    var cells = [new mxCell((value !== null) ? value : '', new mxGeometry(0, 0, width, height), s)];
    cells[0].geometry.setTerminalPoint(new mxPoint(0, height), true);
    cells[0].geometry.setTerminalPoint(new mxPoint(width, 0), false);
    cells[0].edge = true;

    return this.createEdgeTemplateFromCells(cells, width, height);
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createEdgeTemplateFromCells = function (cells, width, height) {
    var elt = this.createItem(cells);
    this.createDragSource(elt, this.createDropHandler(cells, false), this.createDragPreview(width, height));

    // Installs the default edge
    var graph = this.editorUi.editor.graph;
    mxEvent.addListener(elt, 'click', mxUtils.bind(this, function (evt) {
        if (this.installEdges) {
            // Uses edge template for connect preview
            graph.connectionHandler.createEdgeState = function (me) {
                return graph.view.createState(cells[0]);
            };

            // Creates new connections from edge template
            graph.connectionHandler.factoryMethod = function () {
                return graph.cloneCells([cells[0]])[0];
            };
        }

        // Highlights the entry for 200ms
        elt.style.backgroundColor = '#ffffff';

        window.setTimeout(function () {
            elt.style.backgroundColor = '';
        }, 200);

        mxEvent.consume(evt);
    }));

    // Shows a tooltip with the rendered cell
    if (!touchStyle) {
        mxEvent.addListener(elt, 'mousemove', mxUtils.bind(this, function (evt) {
            this.showTooltip(elt, cells);
        }));
    }

    return elt;
};

/**
 * Adds the general palette to the sidebar.
 * This palette contains all task type which are defined for in CS Workflow.
 * The link types are also added to the general palette
 */
Sidebar.prototype.addGeneralPalette = function(expand) {
	this.addPalette('general', mxResources.get('general'), expand || true, mxUtils.bind(this, function (content) {

        var style = this.graph.getStylesheet().getDefaultVertexStyle();
        
        //set the perimeter for all shape to the same value
        style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RECTANGLE;
        
        //add the task types to the palette
        var taskTypes = this.editorUi.model.taskTypes;
        
        for(var i = 0; i < taskTypes.length; i++) {
            var s = taskTypes[i];

            if (s.type == wfTaskTypes.START_TASK) {
            //start task, has id / type 1_100
				s.defaultHeight = 60;
				s.defaultWidth = 60;
				
                style = mxUtils.clone(style);
                style[mxConstants.STYLE_SHAPE] = 'Event'; //shape loaded from the stencils.xml file //mxConstants.SHAPE_ELLIPSE;
                style[mxConstants.STYLE_FONTSIZE] = wfConstants.LABEL_FONT_SIZE;
                style[mxConstants.STYLE_FONTCOLOR] = wfConstants.LABEL_FONT_COLOR;
                style[mxConstants.STYLE_HORIZONTAL] = 1;
                style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
                style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                style[mxConstants.STYLE_STROKECOLOR] = '#808080';
                style[mxConstants.STYLE_FILLCOLOR] = '#CDEB8B';
                style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
                style[mxConstants.STYLE_RESIZABLE] = false;
                style[mxConstants.STYLE_OVERFLOW] ='visible';
                style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
            }
            else if (s.type == wfTaskTypes.EVALUATION_TASK) {
                //evaluation task, has id / type 1_102
				s.defaultHeight = 80;
				s.defaultWidth = 80;
				
                style = mxUtils.clone(style);
                style[mxConstants.STYLE_SHAPE] = 'Gateway_OR'; //shape loaded from the stencils.xml file //mxConstants.SHAPE_RHOMBUS;
                style[mxConstants.STYLE_FONTSIZE] = wfConstants.LABEL_FONT_SIZE;
                style[mxConstants.STYLE_FONTCOLOR] = wfConstants.LABEL_FONT_COLOR;
                style[mxConstants.STYLE_HORIZONTAL] = 1;
                style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
                style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                style[mxConstants.STYLE_STROKECOLOR] = '#808080';
                style[mxConstants.STYLE_FILLCOLOR] = '#FFCF8A';
                style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
                style[mxConstants.STYLE_RESIZABLE] = false;
                style[mxConstants.STYLE_OVERFLOW] ='visible';
                style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
            }
            else if (s.type == wfTaskTypes.MILESTONE_TASK) {
                //milestone task, has id / type 1_103
				s.defaultHeight = 60;
				s.defaultWidth = 60;
				
                style = mxUtils.clone(style);
                style[mxConstants.STYLE_SHAPE] = 'Event'; //shape loaded from the stencils.xml file //mxConstants.SHAPE_ELLIPSE;
                style[mxConstants.STYLE_FONTSIZE] = wfConstants.LABEL_FONT_SIZE;
                style[mxConstants.STYLE_FONTCOLOR] = wfConstants.LABEL_FONT_COLOR;
                style[mxConstants.STYLE_HORIZONTAL] = 1;
                style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
                style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                style[mxConstants.STYLE_STROKECOLOR] = '#808080';
                style[mxConstants.STYLE_FILLCOLOR] = '#FFC5C5';
                style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
                style[mxConstants.STYLE_RESIZABLE] = false;
                style[mxConstants.STYLE_OVERFLOW] ='visible';
                style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
            }            
            else {
                //all other tasks are shown as BPMN process object with an icon
				s.defaultHeight = 80;
				s.defaultWidth = 140;
				
                style = mxUtils.clone(style);
                style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
                style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
                style[mxConstants.STYLE_FONTSIZE] = wfConstants.LABEL_FONT_SIZE;
                style[mxConstants.STYLE_FONTCOLOR] = wfConstants.LABEL_FONT_COLOR;
                style[mxConstants.STYLE_ROUNDED] = 1;
                style[mxConstants.STYLE_HORIZONTAL] = 1;
                style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
                delete style[mxConstants.STYLE_STARTSIZE];
                style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
                style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_MIDDLE;
                style[mxConstants.STYLE_STROKECOLOR] = '#808080';
                style[mxConstants.STYLE_FILLCOLOR] = '#C3D9FF';
                style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
                style[mxConstants.STYLE_RESIZABLE] = false;
                style[mxConstants.STYLE_IMAGE] = s.image;
                style[mxConstants.STYLE_IMAGE_HEIGHT] = wfConstants.IMAGE_SIZE;
                style[mxConstants.STYLE_IMAGE_WIDTH] = wfConstants.IMAGE_SIZE;
                style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_LEFT;
                style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                style[mxConstants.STYLE_OVERFLOW] ='visible';
                style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
            }            
			//add the task type to the sidebar and to the graph as cell style, except the start task
            if (s.showInPalette) {
                var paletteStyle = mxUtils.clone(style);
                paletteStyle[mxConstants.STYLE_FONTSIZE] = wfConstants.TOOLBOX_FONT_SIZE;
                content.appendChild(this.createVertexTemplate(paletteStyle, s.defaultWidth, s.defaultHeight, s));
            }
            this.editorUi.editor.graph.getStylesheet().putCellStyle(s.type, style);
            
            //add the overlay styles

            //the box overlay -> green border
            var overlay = "-box";
            var overlayStyle = mxUtils.clone(style);
            overlayStyle[mxConstants.STYLE_STROKECOLOR] = wfConstants.GREEN_BOX_COLOR;
            overlayStyle[mxConstants.STYLE_STROKEWIDTH] = wfConstants.GREEN_BOX_WIDTH;

            this.editorUi.editor.graph.getStylesheet().putCellStyle(s.type + overlay, overlayStyle);
            
            //the headband overlay -> blue border
            overlay = "-headband";
            overlayStyle = mxUtils.clone(style);
            overlayStyle[mxConstants.STYLE_STROKECOLOR] = wfConstants.HEADBAND_COLOR;
            overlayStyle[mxConstants.STYLE_STROKEWIDTH] = wfConstants.HEADBAND_WIDTH;

            this.editorUi.editor.graph.getStylesheet().putCellStyle(s.type + overlay, overlayStyle);
            
            //the redbox overlay -> red border
            overlay = "-redbox";
            overlayStyle = mxUtils.clone(style);
            overlayStyle[mxConstants.STYLE_STROKECOLOR] = wfConstants.RED_BOX_COLOR;
            overlayStyle[mxConstants.STYLE_STROKEWIDTH] = wfConstants.RED_BOX_WIDTH;

            this.editorUi.editor.graph.getStylesheet().putCellStyle(s.type + overlay, overlayStyle);
            
            //the x overlay -> not used in the Workflow Designer, no change on the style
            overlay = "-x";
            overlayStyle = mxUtils.clone(style);
            //overlayStyle[mxConstants.STYLE_STROKECOLOR] = wfConstants.X_COLOR;
            //overlayStyle[mxConstants.STYLE_STROKEWIDTH] = wfConstants.X_WIDTH;

            this.editorUi.editor.graph.getStylesheet().putCellStyle(s.type + overlay, overlayStyle);            
        }

        //add the link types to the palette 
        style = this.graph.getStylesheet().getDefaultEdgeStyle();
        
        var linkTypes = this.editorUi.model.linkTypes;
        
        for(i = 0; i < linkTypes.length; i++) {
            var l = linkTypes[i];

            //set the first edge style as default
            if (i !== 0) {
                style = mxUtils.clone(style);
            }
            style[mxConstants.STYLE_EDGE] = 'orthogonalEdgeStyle';
            style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_BLOCK;
            style[mxConstants.STYLE_ROUNDED] = true;
            style[mxConstants.STYLE_FONTCOLOR] = l.color;
            style[mxConstants.STYLE_STROKECOLOR] = l.color;
            
            this.editorUi.editor.graph.getStylesheet().putCellStyle(l.type, style);
        }
	}));
};
