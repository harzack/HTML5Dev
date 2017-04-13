/**
 * Construcs a new toolbar for the given editor.
 */
function Toolbar(editor, container)
{
	this.editor = editor;
	this.container = container;
	this.init();

	// Global handler to hide the current menu
	var md = (mxClient.IS_TOUCH) ? 'touchstart' : 'mousedown';
	mxEvent.addListener(document, md, mxUtils.bind(this, function(evt)
	{
		this.hideMenu();
	}));
};

/**
 * Adds the toolbar elements.
 */
Toolbar.prototype.init = function() {
	this.addItems(['print', '-', 'actualSize', 'zoomIn', 'zoomOut', '-']);

	var graph = this.editor.graph;
};

/**
 * Hides the current menu.
 */
Toolbar.prototype.hideMenu = function() {
	if (this.currentMenu != null) {
		this.currentMenu.hideMenu();
		this.currentMenu.destroy();
		this.currentMenu = null;
	}
};

/**
 * Adds given action item
 */
Toolbar.prototype.addItems = function(keys) {
	
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		
		if (key == '-') {
			this.addSeparator();
		} else {
			this.addItem('geSprite-' + key.toLowerCase(), key);
		}
	}
};

/**
 * Adds given action item
 */
Toolbar.prototype.addItem = function(sprite, key) {
	
	var action = this.editor.actions.get(key);
	var elt = null;
	
	if (action != null) {
		elt = this.addButton(sprite, action.label, action.funct);
		elt.setEnabled(action.enabled);
		
		action.addListener('stateChanged', function() {
			elt.setEnabled(action.enabled);
		});
	}
	
	return elt;
};

/**
 * Adds a separator to the separator.
 */
Toolbar.prototype.addSeparator = function() {
	var elt = document.createElement('div');
	elt.className = 'geSeparator';
	this.container.appendChild(elt);
	
	return elt;
};

/**
 * Adds a button to the toolbar.
 */
Toolbar.prototype.addButton = function(classname, tooltip, funct) {
	
	var elt = this.createButton(classname);
	
	this.initElement(elt, tooltip);
	this.addClickHandler(elt, funct);
	this.container.appendChild(elt);
	
	return elt;
};

/**
 * Creates and returns a new button.
 */
Toolbar.prototype.createButton = function(classname) {
	var elt = document.createElement('a');
	elt.setAttribute('href', 'javascript:void(0);');
	elt.className = 'geButton';

	var inner = document.createElement('div');
	inner.className = 'geSprite ' + classname;
	elt.appendChild(inner);
	
	return elt;
};

/**
 * Initializes the given toolbar element.
 */
Toolbar.prototype.initElement = function(elt, tooltip) {
	elt.setAttribute('tabindex', '0');
	
	// Adds tooltip
	if (tooltip != null) {
		elt.setAttribute('title', tooltip);
	}

	this.addEnabledState(elt);
};

/**
 * Adds enabled state with setter to DOM node (avoids JS wrapper).
 */
Toolbar.prototype.addEnabledState = function(elt) {
	var classname = elt.className;
	
	elt.setEnabled = function(value) {
		elt.enabled = value;
		
		if (value) {
			elt.className = classname;
		} else {
			elt.className = classname + ' geDisabled';
		}
	};
	
	elt.setEnabled(true);
};

/**
 * Adds enabled state with setter to DOM node (avoids JS wrapper).
 */
Toolbar.prototype.addClickHandler = function(elt, funct) {
	if (funct != null)
	{
		mxEvent.addListener(elt, 'click', function(evt) {
			if (elt.enabled) {
				funct(evt);
			}
			
			mxEvent.consume(evt);
		});
	}
};