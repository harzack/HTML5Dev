// Specifies if connector should be shown on selected cells
var touchStyle = mxClient.IS_TOUCH || urlParams['touch'] == '1';

var TASK_ID_PARAM = '&taskid=';

/**
 * Editor constructor executed on page load.
 * model	Designer model with the global settings
 */
Editor = function(model) {

	mxEventSource.call(this);

	// save this in a variable for the callbacks
	var self = this;

	this.model = model;
	
	//read only flag for the editor
	this.readOnly = false;
	
	this.init();
	
	// this.initStencilRegistry();
	this.graph = new Graph();
	this.outline = new mxOutline(this.graph);
	this.outline.updateOnPan = true;
	// this.undoManager = this.createUndoManager();
	// this.status = '';

	// set the actions for the editor
	this.actions = new Actions(this);
	
	// Sets persistent graph state defaults
	this.graph.resetViewOnRootChange = false;
	this.graph.scrollbars = true;
	this.graph.background = null;
	
	// Configures automatic expand on mouseover
	this.graph.popupMenuHandler.autoExpand = true;

	// Installs a handler for double click events in the graph
	this.graph.addListener(mxEvent.DOUBLE_CLICK, function(sender, evt) {
		var cell = evt.getProperty('cell');
		
		if((cell !== undefined ) && (cell !== null)) {
			//double click was on a cell
			if (Task.prototype.isPrototypeOf(cell.value)) {
				//the cell was a task
				
				//look for the default menu entry, marked with font == 'bold'
				var s = cell.value;
				
				for ( var j = 0; j < s.type.menuEntries.length; j++) {
					if (s.type.menuEntries[j].font === 'bold') {
						//call the menu action for the default menu entry
						self.menuCallback(s, s.type.menuEntries[j]);
					}
				}
			}
		}
		evt.consume();
	});
	
	// Installs a handler for delete events in the graph
	this.graph.addListener(mxEvent.CELLS_REMOVED, function(sender, evt) {
		var cells = evt.getProperty('cells');
		
        //mark the the cells as deleted in the model
        for (var i = 0; i < cells.length; i++) {
            var c = cells[i];
            if(c.value !== null) {
            	self.model.remove(c.value);
            }
        }		
	});

	// Installs a handler for move events in the graph
	this.graph.addListener(mxEvent.CELLS_MOVED, function(sender, evt) {
		var cells = evt.getProperty('cells');
		
        //mark the the cells as moved in the model
        for (var i = 0; i < cells.length; i++) {
            var c = cells[i];
            if(c.vertex && c.value !== null){
            	//it is a task
            	c.value.move(c.geometry.x, c.geometry.y);	
            }
            
        }		
	});
	
	// Installs a handler for cell connect events in the graph
	this.graph.addListener(mxEvent.CELL_CONNECTED, function(sender, evt) {
		//get the edge
		var edge = evt.getProperty('edge');
		var source = evt.getProperty('source');
		var previous = evt.getProperty('previous');
		var newVertex = source ? edge.source : edge.target;
		
		//convert the style to the array, which is expected from the getConnectionConstraint method
		var style = self.graph.getCellStyle(edge);
		var state = edge.clone();
		state.style = style;
		
		var exitConstraint = self.graph.getConnectionConstraint(state, newVertex , true);
		var entryConstraint = self.graph.getConnectionConstraint(state, newVertex , false);
		
		if((previous === undefined) || (newVertex.value.id != previous.value.id)){
			//the connection is new or connected to a different task
			
			//connect, we have no dangling edges, only in the initial build the target is null
			if(edge.target !== null) {
				var newLink = null;
				
				if(edge.value !== null) {
					if((edge.value.start !== edge.source.value.id) || (edge.value.end !== edge.target.value.id)) {
						//remove the old link before a new one is create
						self.model.removeLink(edge.value);

						//this action is a reconnect, which results in a delete and new link
						newLink = self.model.addNewLink('', edge.source.value.id, edge.target.value.id);
						if(newLink !== null) {
							newLink.setExitConstraint(exitConstraint);						
							newLink.setEntryConstraint(entryConstraint);
						}
					} else {
						//the link has not changed
						newLink = edge.value;
					}
				} else {						
					//if the link is new, connect it
					newLink = self.model.addNewLink('', edge.source.value.id, edge.target.value.id);
					if(newLink !== null) {
						newLink.setExitConstraint(exitConstraint);
						newLink.setEntryConstraint(entryConstraint);
					}
				}
				
				if(newLink !== null) {
					//	set the new link
					edge.value = newLink;
					
					//update the style of the edge
					self.graph.getModel().setStyle(edge, edge.value.type.type);
					
					//set the connection constraints for the edge, as they are overwritten from the setStyle method
					self.graph.setConnectionConstraint(edge, newVertex, true, exitConstraint);
					self.graph.setConnectionConstraint(edge, newVertex, false, entryConstraint);
					
				} else {
					//the link could not be created
					self.graph.removeCells([edge]);
				}
			}
		} else {
			//it is still connected to the same tasks, but the constraints can be changed
			edge.value.setExitConstraint(exitConstraint);
			edge.value.setEntryConstraint(entryConstraint);			
		}
	});
	
	// Installs a handler for cell connect events in the graph
	this.graph.connectionHandler.addListener(mxEvent.CONNECT, function(sender, evt){
		var cell = evt.getProperty('cell');
		var target = evt.getProperty('target');
		
		if(cell.isEdge()) {
			//convert the style to the array, which is expected from the getConnectionConstraint method
			var style = self.graph.getCellStyle(cell);
			var state = cell.clone();
			state.style = style;
			
			var exitConstraint = self.graph.getConnectionConstraint(state, target, true);
			var entryConstraint = self.graph.getConnectionConstraint(state, target, false);
			
			//update the connection constraint for the link
			if(cell.value !== null) {
				cell.value.setExitConstraint(exitConstraint);
				cell.value.setEntryConstraint(entryConstraint);			
			}
		}
		
	});
	
	// Installs a handler for collecting the geometry changes for links
	// In the future we could use this event to collect also other changes
	this.graph.getModel().addListener(mxEvent.EXECUTE, function(sender, evt) {
		var change = evt.getProperty('change');
		
		if (mxGeometryChange.prototype.isPrototypeOf(change)) {
			//only look for geometry changes for edges.
			var cell = change.cell;
			if(cell !== undefined && cell.edge && cell.value !== null) {
				if(change.geometry.points !== null) {
					for(var i = 0; i < change.geometry.points.length; i++) {
						var p = change.geometry.points[i];
						if(p.x < 0 || p.y < 0) {
							//set the point coordinates to a minimum of 0, no negative coordinates are supported
							p.x = Math.max(0, p.x);
							p.y = Math.max(0, p.y); 
						}					
					}
				}
				var geo = change.geometry.clone();
				cell.value.move(geo.points);
			}
		}
	});
	
	// Installs context menu
	this.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt) {

		if (cell === null) {
			// if no cell is selected, show no menu
			return;
		}

		var enabled = true;
		if (this.graph.getSelectionCount() > 1) {
			// if more than one element is selected, disable the menu entries
			enabled = false;
		}

		if (Task.prototype.isPrototypeOf(cell.value)) {
			var task = cell.value;
			for ( var j = 0; j < task.type.menuEntries.length; j++) {
				if (task.type.menuEntries[j].name === '') {
					// empty name is indicated as separator
					menu.addSeparator();
				} else {
					addTaskMenuCallback(menu, task, task.type.menuEntries[j], enabled);
				}
			}			
		}
		else {
			if (!self.model.viewOnly && (Link.prototype.isPrototypeOf(cell.value))) {
				var task = cell.source.value;
				var taskType = task.type;
				var link = cell.value;
				
				//check the possible link types, for the current link, only if the menu is enabled
				var ltfeasibilities = [];
				if (enabled) {
					ltfeasibilities = self.model.determineAppropriateLinkTypes( link.start, link.end, link.id, link.type.isLoopback() );					
				}
				
				for ( var j = 0; j < taskType.linkFromMenuEntries.length; j++) {
					
					if (taskType.linkFromMenuEntries[j].name === '') {
						// empty name is indicated as separator
						menu.addSeparator();
					} else {
						//determine if the menu entry is valid or not
						var linkType = '';
						var menuEntry = taskType.linkFromMenuEntries[j];
						switch(menuEntry.action) {
							case LINK_MENU_CONVERT_NORMAL:
								linkType = 'Normal';
								break;
							case LINK_MENU_CONVERT_TRUE:
								linkType = 'True';
								break;
							case LINK_MENU_CONVERT_FALSE:
								linkType = 'False';
								break;
							case LINK_MENU_CONVERT_LOOP:
								linkType = 'Loopback';
								break;
							default:
								linkType = '';
								break;
						}

						var ltisvalid = true;
						//do the check only if the menu is globally enabled and it is a convert action
						if(enabled && linkType !== '') {
							//look for the index in the outgoing link type list
							for(var t = 0; t < taskType.linkTypesFrom.length; t++) {
								if(taskType.linkTypesFrom[t] === linkType) {
									ltisvalid = (ltfeasibilities[t] == wfErrors.LT_NOERROR);
									break;
								}
							}							
						}
						
						if(ltisvalid) {
							//only add the menu entry when it is valid, 
							//if the current link type and the convert link type the same mark the menu entry
							addLinkMenuCallback(menu, cell, menuEntry, (link.type.type === linkType), enabled && ltisvalid);							
						}
					}					
				}
			}
		}
	};

	/**
	 * Helper method the create the callback with the necessary scope
	 * menu Menu object 
	 * task Current task 
	 * menuEntry Current menu entry 
	 * enabled Menu entry enabled or not
	 */
	function addTaskMenuCallback(menu, task, menuEntry, enabled) {
		menu.addItem(menuEntry.name, null, function(menu) {
			self.menuCallback(task, menuEntry);
		}, undefined, undefined, enabled);
	}

	/**
	 * Helper method the create the callback with the necessary scope
	 * menu Menu object 
	 * cell Current cell 
	 * menuEntry Current menu entry 
	 * marker	 Marker indicating the current link type, menu entry is disabled 
	 * enabled Menu entry enabled or not
	 */
	function addLinkMenuCallback(menu, cell, menuEntry, marker, enabled) {
		var img = undefined;
		if(marker){
			img = self.menuCheckImage;
		}
		menu.addItem(menuEntry.name, img, function(menu) {
			self.linkMenuCallback(cell, menuEntry);
		}, undefined, undefined, enabled);
	}	
    // Create handler for key events
    var keyHandler = this.createKeyHandler(self);
};

// Editor inherits from mxEventSource
mxUtils.extend(Editor, mxEventSource);

/**
 * Specifies the image URL to be used for the grid.
 */
Editor.prototype.gridImage = IMAGE_PATH + '/grid.gif';

/**
 * Specifies the image URL to be used for the transparent background.
 */
Editor.prototype.transparentImage = IMAGE_PATH + '/transparent.gif';

/**
 * Check image for the menu
 */
Editor.prototype.menuCheckImage = IMAGE_PATH + '/checkmark.gif';

/**
 * Initializes the environment
 */
Editor.prototype.init = function() {

	// Makes the connection hotspot smaller
	mxConstants.DEFAULT_HOTSPOT = 0.3;

	// Increases default rubberband opacity (default is 20)
	mxRubberband.prototype.defaultOpacity = 30;
	
	// Enables guides, snap to the original grid size
	mxGraphHandler.prototype.guidesEnabled = true;	
	
};

/**
 * Draw method to draw the current workflow map on the canvas
 */
Editor.prototype.draw = function(map) {
	this.map = map;

	this.graph.getModel().beginUpdate();

	try {
		// array with the graph elements
		var ge = [];

		for (var i = 0; i < map.tasks.length; i++) {
			var s = map.tasks[i];
			//draw the task when it is not invisible
			if (!s.isInvisible) {
				var e1 = this.graph.addTask(null, s);
				if (e1 !== null) {
					var n = s.id;
					ge[n] = e1;
				}
			}
		}

		for ( var j = 0; j < map.links.length; j++) {
			var l = map.links[j];

			var start = ge[l.start];
			var end = ge[l.end];
			this.graph.addLink(null, l, start, end);
		}
	} finally {
		this.graph.getModel().endUpdate();
	}
};

/**
 * Task menu callback 
 * task			Task object for which a menu action is called 
 * menuEntry	Called menu entry
 */
Editor.prototype.menuCallback = function(task, menuEntry) {

	switch (menuEntry.action) {
		case TASK_MENU_DELETE_ITEM:
			//get the action and fire it when it is enabled
            var action = this.actions.get('delete');
            if ((action !== null) && (action.enabled)) {
                action.funct();
            }			
			break;
		case TASK_MENU_DUPLICATE_ITEM:
			// build in function
			//duplicate the selected cells, but don't move them (the new cells have still a reference to the original task in the model)
			var newCells = this.graph.moveCells(this.graph.getSelectionCells(), 0, 0, true);

			//add the new cells to the map
			for(var i = 0; i < newCells.length; i++) {
				//add the new task to the map and set the value to the type
				var c = newCells[i];
				newCells[i].value = this.model.map.duplicateTask(c.value, c.geometry.x, c.geometry.y);
			}
			
			this.graph.setSelectionCells(newCells);
			//move the new cells, to distinguish between the old and new ones
			var s = this.graph.gridSize;
			var newCells = this.graph.moveCells(this.graph.getSelectionCells(), s, s, false);
			break;
		default:
			//check if the map is changed, if yes don't save it this is done in the menu_callback
			var dirty = this.isContentDirty();
		
			//task id offset, to get the correct task id for the task edit request
			var offset = this.model.getTaskIdOffset(task.id);
			
			// no build in function, go to another HTML page, add the task id parameter to the URL
			var taskId = task.id - offset;
			var url = menuEntry.action + TASK_ID_PARAM + taskId + task.extraParam + wfConstants.MAP_DIRTY_URL_PARAM + dirty;
			
			// call the global menu callback
			menu_callback(url, '');					
			break;
	}
};

/**
 * Link menu callback 
 * cell			Cell object for which a menu action is called 
 * menuEntry	Called menu entry
 */
Editor.prototype.linkMenuCallback = function(cell, menuEntry) {

	var action = {};
	
	switch (menuEntry.action) {
		case LINK_MENU_DELETE_ITEM:
			//get the action and fire it when it is enabled
            action = this.actions.get('delete');
            if ((action !== null) && (action.enabled)) {
                action.funct();
            }			
			break;
		case LINK_MENU_CONVERT_NORMAL:
			//get the action and fire it when it is enabled
            action = this.actions.get('convertLink');
            if ((action !== null) && (action.enabled)) {
                action.funct(wfConstants.LINK_TYPE_NORMAL);
            }			
			break;
		case LINK_MENU_CONVERT_TRUE:
			//get the action and fire it when it is enabled
            action = this.actions.get('convertLink');
            if ((action !== null) && (action.enabled)) {
                action.funct(wfConstants.LINK_TYPE_TRUE);
            }			
			break;
		case LINK_MENU_CONVERT_FALSE:
			//get the action and fire it when it is enabled
            action = this.actions.get('convertLink');
            if ((action !== null) && (action.enabled)) {
                action.funct(wfConstants.LINK_TYPE_FALSE);
            }			
			break;
		case LINK_MENU_CONVERT_LOOP:
			//get the action and fire it when it is enabled
            action = this.actions.get('convertLink');
            if ((action !== null) && (action.enabled)) {
                action.funct(wfConstants.LINK_TYPE_LOOPBACK);
            }			
			break;			
		default:

			break;
	}
};

/**
 * Method returns true if the map was changed, since the last save. 
 */
Editor.prototype.isContentDirty = function() {
	//get the changes
	var changes = this.model.getMapChanges();
	if(this.model.mapDirty || ((changes !== null) && (changes.length > 0))) {
		//mark the map as dirty
		this.model.mapDirty = true;
		
		return true;
	}
	
	return false;
};

/**
 * Saves the map back to the server.
 * The save is done with a synchronous post, so that the data is saved
 * before the next action happens
 */
Editor.prototype.tempSave = function() {
	
	var success = true;
	
	if(this.readOnly) {
		//the editor is read only, no changes are possible, no save necessary
		return success;
	}
	
	var self = this;
	
	//get the map changes
	var changes = this.model.getMapChanges();
	if((changes !== null) && (changes.length > 0)) {	
		var strCmd = '';
		var numChange = changes.length;
		//create a string with the map changes
		for(var i = 0; i < changes.length; i++) {
			strCmd += '&op' + i + '=' + changes[i].toCommandStr();
		}
		
		if(strCmd.length > 0){
			//there are changed in the map, save them with a post to the server
			var postUrl = this.model.uploadUrl + wfConstants.MAP_DIRTY_URL_PARAM + wfConstants.MAP_DIRTY_TRUE + strCmd;
			//do a synchronous post for the save 
			doPost( this.model.baseUrl, postUrl,
					//success callback
					function(data) {
						if(data.search('POSTReturnCode:') > -1){
							if(data.search('POSTReturnCode: ' + numChange) > -1){
		                        //map saved successful
								self.model.applyMapChanges();
		                        success = true;
							} else {
								//map save not successful
								var startIdx = data.indexOf('<CODE>POSTReturnString: ') + '<CODE>POSTReturnString: '.length;
								var endIdx = data.lastIndexOf('</CODE>');
								var msg = formatString(mxResources.get('DIALOG_CONNECT_ERROR_UPLOAD_CONTENT'), data.substring(startIdx + 1 , endIdx - 1));
		                        showMessage(msg, mxResources.get('DIALOG_COMERROR_UPLOAD_HEADER'));
								
		                        self.model.resetMapChanges();
								
								success = false;
							}
						} else {
	                        //the upload was not successful
	                        var msg = mxResources.get('DIALOG_COMERROR_UPLOAD_CONTENT');
	                        showMessage(msg, mxResources.get('DIALOG_COMERROR_UPLOAD_HEADER'));
							
	                        self.model.resetMapChanges();
	                        
	                        //map not saved
							success = false;
						}
							
					},
					//error callback
					function(jqXHR, textStatus, errorThrown) {
                        //the upload was not successful
                        var msg = formatString(mxResources.get('DIALOG_CONNECT_ERROR_UPLOAD_CONTENT'), textStatus);
                        showMessage(msg, mxResources.get('DIALOG_COMERROR_UPLOAD_HEADER'));
						
                        self.model.resetMapChanges();
                        
						//map not saved
						success = false;
					});	
		}
	}

	return success;	
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
Editor.prototype.createKeyHandler = function (editor) {
    var graph = editor.graph;
    var keyHandler = new mxKeyHandler(graph);

    // Routes command-key to control-key on Mac
    keyHandler.isControlDown = function (evt) {
        return mxEvent.isControlDown(evt) || (mxClient.IS_MAC && evt.metaKey);
    };

    // Helper function to move cells with the cursor keys
    function nudge(keyCode) {
        if(editor.readOnly) {
            //editor is set to readonly, no action
            return;
        }

        if (!graph.isSelectionEmpty()) {
            var dx = 0;
            var dy = 0;

            if (keyCode == 37) {
                dx = -1;
            }
            else if (keyCode == 38) {
                dy = -1;
            }
            else if (keyCode == 39) {
                dx = 1;
            }
            else if (keyCode == 40) {
                dy = 1;
            }

            graph.moveCells(graph.getSelectionCells(), dx, dy);
            graph.scrollCellToVisible(graph.getSelectionCell());
        }
    }

    // Binds keystrokes to actions
    var bindAction = mxUtils.bind(this, function (code, control, key, shift) {
        var action = this.actions.get(key);

        if (action !== null) {
            var f = function () {
                if (action.enabled) {
                    action.funct();
                }
            };

            if (control) {
                if (shift) {
                    keyHandler.bindControlShiftKey(code, f);
                }
                else {
                    keyHandler.bindControlKey(code, f);
                }
            }
            else {
                if (shift) {
                    keyHandler.bindShiftKey(code, f);
                }
                else {
                    keyHandler.bindKey(code, f);
                }
            }
        }
    });

    var ui = this;
    var keyHandleEscape = keyHandler.escape;
    keyHandler.escape = function (evt) {
        ui.hideDialog();
        keyHandleEscape.apply(this, arguments);
    };

    // Ignores enter keystroke. Remove this line if you want the
    // enter keystroke to stop editing.
    keyHandler.enter = function () { };
    keyHandler.bindKey(37, function () { nudge(37); }); // Left arrow
    keyHandler.bindKey(38, function () { nudge(38); }); // Up arrow
    keyHandler.bindKey(39, function () { nudge(39); }); // Right arrow
    keyHandler.bindKey(40, function () { nudge(40); }); // Down arrow
    bindAction(46, false, 'delete'); // Delete

    bindAction(107, false, 'zoomIn'); // ZoomIn
    bindAction(109, false, 'zoomOut'); // ZoomOut
    
    return keyHandler;
};

/**
 * Displays a dialog.
 */
Editor.prototype.showDialog = function(elt, title, w, h, modal, closable, onClose)
{
	this.hideDialog();
	this.dialog = new Dialog(this, elt, title, w, h, modal, closable, onClose);
};

/**
 * Displays a dialog.
 */
Editor.prototype.hideDialog = function()
{
	if (this.dialog != null)
	{
		this.dialog.close();
		this.dialog = null;
		this.graph.container.focus();
	}
};

/**
 * Creates the div for a dialog.
 */
Editor.prototype.createDiv = function(classname)
{
	var elt = document.createElement('div');
	elt.className = classname;
	
	return elt;
};
