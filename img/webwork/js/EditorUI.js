/**
 * Constructs a new graph editor
 */
EditorUi = function(container, model) {

	// Editor object
	this.editor = new Editor(model);

	// Container object for the editor object
	this.container = container || document.body;

	// The graph object
	var graph = this.editor.graph;

	// Save the model object
	this.model = model;

	//set the editor read only depending on the model state
	this.editor.readOnly = this.model.viewOnly;
	
	// Disables scrollbars
	this.container.style.overflow = 'hidden';

	// Disables built-in context menu
	mxEvent.disableContextMenu(this.container);
	
	// Creates the user interface
	// this.menus = new Menus(this);
	this.createDivs();
	this.refresh();
	this.createUi();

	// Contains the main graph instance inside the given panel
	graph.init(this.diagramContainer);
	graph.refresh();

	// Enables scrollbars and sets cursor style for the container
	graph.container.setAttribute('tabindex', '0');
	graph.container.style.overflow = 'auto'; //always set 'auto' to prevent scrolling into the negative coordinates
	graph.container.style.cursor = 'default';
	graph.container.style.backgroundImage = 'url(' + IMAGE_PATH + '/grid.gif)';
	graph.container.focus();

	// apply the graph permission depending on the model settings
	graph.setConnectable(!this.editor.readOnly);
	graph.setCellsLocked(this.editor.readOnly);
	//graph.setEnabled(!this.editor.readOnly); this results in not reacting on key events like zooming
		
	// Extends hook functions to use permission object. This could
	// be done by assigning the respective switches (eg.
	// setMovable), but this approach is more flexible, doesn't
	// override any existing behaviour or settings, and allows for
	// dynamic conditions to be used in the functions. See the
	// specification for more functions to extend (eg.
	// isSelectable).
	var oldDisconnectable = graph.isCellDisconnectable;
	graph.isCellDisconnectable = function(cell, terminal, source) {
		return oldDisconnectable.apply(this, arguments) && !model.viewOnly;
	};

	var oldMovable = graph.isCellMovable;
	graph.isCellMovable = function(cell)
	{
		return oldMovable.apply(this, arguments) && !model.viewOnly;
	};
	
	var oldBendable = graph.isCellBendable;
	graph.isCellBendable = function(cell)
	{
		return oldBendable.apply(this, arguments) && !model.viewOnly;
	};	
	
	// Initializes the outline
	this.editor.outline.init(this.outlineContainer);

    // Hides context menu
    var md = (mxClient.IS_TOUCH) ? 'touchstart' : 'mousedown';
    mxEvent.addListener(document, md, mxUtils.bind(this, function (evt) {
        graph.popupMenuHandler.hideMenu();
    }));

    // Adds gesture handling (pinch to zoom)
    if (mxClient.IS_TOUCH) {
        mxEvent.addListener(graph.container, 'gesturechange',
			mxUtils.bind(this, function (evt) {
				graph.view.getDrawPane().setAttribute('transform', 'scale(' + evt.scale + ')');
				graph.view.getOverlayPane().style.visibility = 'hidden';
			})
		);

        mxEvent.addListener(graph.container, 'gestureend',
			mxUtils.bind(this, function (evt) {
				graph.view.getDrawPane().removeAttribute('transform');
				graph.zoomToCenter = true;
				graph.zoom(evt.scale);
				graph.view.getOverlayPane().style.visibility = 'visible';
			})
		);
    }	
    
	// Updates the editor UI after the window has been resized
   	mxEvent.addListener(window, 'resize', mxUtils.bind(this, function()
   	{
   		this.refresh();
   		graph.sizeDidChange();
   		this.editor.outline.update(false);
   		this.editor.outline.outline.sizeDidChange();
   	}));
   	
   	//init model
   	this.model.buildLinkCacheInTasks();
   	
	this.editor.draw(this.model.map);
};

/**
 * Specifies the size of the split bar.
 */
EditorUi.prototype.splitSize = (mxClient.IS_TOUCH) ? 16 : 8;

/**
 * Specifies the height of the toolbar. Default is 36.
 */
EditorUi.prototype.toolbarHeight = 36;

/**
 * Specifies the position of the horizontal split bar. Default is 190.
 */
EditorUi.prototype.hsplitPosition = 190;

/**
 * Specifies the position of the vertical split bar. Default is 190.
 */
EditorUi.prototype.vsplitPosition = 190;

/**
 * Refreshes the viewport.
 */
EditorUi.prototype.refresh = function() {
	var quirks = mxClient.IS_IE && (document.documentMode === null || document.documentMode === 5);
	var w = $(this.container).width();
	var h = $(this.container).innerHeight();

	if (this.container == document.body) {
		w = document.body.clientWidth || document.documentElement.clientWidth;
		h = (quirks) ? document.body.clientHeight || document.documentElement.clientHeight : document.documentElement.clientHeight;
	}

	var effHsplitPosition = Math.max(0, Math.min(this.hsplitPosition, w - this.splitSize - 20));
	var effVsplitPosition = Math.max(0, Math.min(this.vsplitPosition, h - this.toolbarHeight - this.splitSize - 1));

	this.toolbarContainer.style.top = 0 + 'px';
	this.toolbarContainer.style.height = this.toolbarHeight + 'px';

	var tmp = this.toolbarHeight;

	if (!mxClient.IS_QUIRKS) {
		tmp += 1;
	}

	this.sidebarContainer.style.top = tmp + 'px';
	this.sidebarContainer.style.width = effHsplitPosition + 'px';
	this.outlineContainer.style.width = effHsplitPosition + 'px';

	// if the mode is view only make the outline container the same height as
	// the graph
	if (this.model.viewOnly) {
		var oh = h - tmp;
		this.outlineContainer.style.height = oh + 'px';
	} else {
		this.outlineContainer.style.height = effVsplitPosition + 'px';
	}

	this.outlineContainer.style.bottom = 0 + 'px';

	this.diagramContainer.style.left = (effHsplitPosition + this.splitSize) + 'px';
	this.diagramContainer.style.top = this.sidebarContainer.style.top;
	this.hsplit.style.top = this.sidebarContainer.style.top;
	this.hsplit.style.bottom = this.outlineContainer.style.bottom;
	this.hsplit.style.left = effHsplitPosition + 'px';
	this.vsplit.style.width = this.sidebarContainer.style.width;
	this.vsplit.style.bottom = (effVsplitPosition + 0) + 'px';

	if (quirks) {
		this.toolbarContainer.style.width = w + 'px';
		var sidebarHeight = (h - effVsplitPosition - this.splitSize - this.toolbarHeight);
		this.sidebarContainer.style.height = sidebarHeight + 'px';
		this.diagramContainer.style.width = (w - effHsplitPosition - this.splitSize) + 'px';
		var diagramHeight = (h - this.toolbarHeight);
		this.diagramContainer.style.height = diagramHeight + 'px';
		this.hsplit.style.height = diagramHeight + 'px';
	} else {
		this.sidebarContainer.style.bottom = (effVsplitPosition + this.splitSize) + 'px';
		this.diagramContainer.style.bottom = this.outlineContainer.style.bottom;
	}
};

/**
 * Creates the required containers.
 */
EditorUi.prototype.createDivs = function() {
	this.toolbarContainer = this.createDiv('geToolbarContainer');
	this.sidebarContainer = this.createDiv('geSidebarContainer');
	this.outlineContainer = this.createDiv('geOutlineContainer');
	this.diagramContainer = this.createDiv('geDiagramContainer');
	this.hsplit = this.createDiv('geHsplit');
	this.vsplit = this.createDiv('geVsplit');

	// Sets static style for containers
	this.toolbarContainer.style.left = '0px';
	this.toolbarContainer.style.right = '0px';
	this.sidebarContainer.style.left = '0px';
	this.outlineContainer.style.left = '0px';
	this.diagramContainer.style.right = '0px';
	this.vsplit.style.left = '0px';
	this.vsplit.style.height = this.splitSize + 'px';
	this.hsplit.style.width = this.splitSize + 'px';
};

/**
 * Creates a new sidebar for the given container.
 */
EditorUi.prototype.createSidebar = function(container) {
	return new Sidebar(this, container);
};

/**
 * Creates the actual toolbar for the toolbar container.
 */
EditorUi.prototype.createDiv = function(classname) {
	var elt = document.createElement('div');
	elt.className = classname;

	return elt;
};

/**
 * Creates the required containers.
 */
EditorUi.prototype.createUi = function() {
	// Creates toolbar
	this.toolbar = this.createToolbar(this.createDiv('geToolbar'));
	this.toolbarContainer.appendChild(this.toolbar.container);

	// Creates the sidebar
	this.sidebar = this.createSidebar(this.sidebarContainer);

	// // Adds status bar in menubar
	// this.statusContainer = this.createStatusContainer();

	// // Connects the status bar to the editor status
	// this.editor.addListener('statusChanged', mxUtils.bind(this, function()
	// {
	// this.setStatusText(this.editor.getStatus());
	// }));

	// this.setStatusText(this.editor.getStatus());
	// this.menubar.container.appendChild(this.statusContainer);

	// Inserts into DOM
	this.container.appendChild(this.toolbarContainer);

	// if view only mode don't add teh sidebar container to the DOM
	if (!this.model.viewOnly) {
		this.container.appendChild(this.sidebarContainer);
	}

	this.container.appendChild(this.outlineContainer);
	this.container.appendChild(this.diagramContainer);
	// this.container.appendChild(this.footerContainer);
	this.container.appendChild(this.hsplit);

	if (!this.model.viewOnly) {
		this.container.appendChild(this.vsplit);
	}
	// HSplit
	this.addSplitHandler(this.hsplit, true, 0, mxUtils.bind(this, function(
			value) {
		this.hsplitPosition = value;
		this.refresh();
		this.editor.graph.sizeDidChange();
		this.editor.outline.update(false);
		this.editor.outline.outline.sizeDidChange();
	}));

	// VSplit
	this.addSplitHandler(this.vsplit, false, 0, mxUtils.bind(this, function(
			value) {
		this.vsplitPosition = value;
		this.refresh();
		this.editor.outline.update(false);
		this.editor.outline.outline.sizeDidChange();
	}));
};

/**
 * Updates the states of the given undo/redo items.
 */
EditorUi.prototype.addSplitHandler = function(elt, horizontal, dx, onChange) {
	var start = null;
	var initial = null;

	function getValue() {
		return parseInt((horizontal) ? elt.style.left : elt.style.bottom, 10);
	}

	var md = (mxClient.IS_TOUCH) ? 'touchstart' : 'mousedown';
	var mm = (mxClient.IS_TOUCH) ? 'touchmove' : 'mousemove';
	var mu = (mxClient.IS_TOUCH) ? 'touchend' : 'mouseup';

	mxEvent.addListener(elt, md, function(evt) {
		start = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
		initial = getValue();
		mxEvent.consume(evt);
	});

	function moveHandler(evt) {
		if (start !== null) {
			var pt = new mxPoint(mxEvent.getClientX(evt), mxEvent
					.getClientY(evt));
			onChange(Math.max(0, initial + ((horizontal) ? (pt.x - start.x) : (start.y - pt.y)) - dx));
			mxEvent.consume(evt);
		}
	}

	mxEvent.addListener(document, mm, moveHandler);

	mxEvent.addListener(document, mu, function(evt) {
		moveHandler(evt);
		start = null;
		initial = null;
	});
};

/**
 * Creates a new toolbar for the given container.
 */
EditorUi.prototype.createToolbar = function(container) {
	return new Toolbar(this.editor, container);
};

/**
 * Method returns true if the map was changed, since the last save. 
 */
EditorUi.prototype.isContentDirty = function() {
	return this.editor.isContentDirty();
};

/**
 * Method saves the map back to the server into a temporary area
 */
EditorUi.prototype.tempSave = function() {
	return this.editor.tempSave();
};

/**
 * Executes the given layout.
 */
EditorUi.prototype.executeLayout = function(layout, animate) {
	var graph = this.editor.graph;

	graph.getModel().beginUpdate();
	try {
		layout.execute(graph.getDefaultParent());
	} catch (e) {
		throw e;
	} finally {
		// Animates the changes in the graph model except
		// for Camino, where animation is too slow
		if (animate && navigator.userAgent.indexOf('Camino') < 0) {
			// New API for animating graph layout results asynchronously
			var morph = new mxMorphing(graph);
			morph.addListener(mxEvent.DONE, mxUtils.bind(this, function() {
				graph.getModel().endUpdate();
			}));
			
			morph.startAnimation();
		} else {
			graph.getModel().endUpdate();
		}
	}
};