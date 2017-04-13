
/**
 * Constructs the actions object for the given editor.
 */
function Actions(editor) {
    this.editor = editor;
    this.actions = {};
    this.init();
}

/**
 * Adds the default actions.
 */
Actions.prototype.init = function () {
    var editor = this.editor;
    var graph = editor.graph;
    
    this.addAction('delete', function () {
        if(editor.readOnly) {
            //editor is set to readonly, no action
            return;
        }

        var tmp = graph.getSelectionCells();
        if (tmp !== null) {
        	//check if the cells can be deleted
            for (var i = 0; i < tmp.length; i++) {
                var c = tmp[i];
                if (Task.prototype.isPrototypeOf(c.value) && !c.value.deleteable) {
                    //the cell is not deleteable, show error message
                    var msg = mxResources.get('ERROR_TASK_CANNOT_DELETE');
                    showMessage(formatString(msg, c.value.name), mxResources.get('DIALOG_ERROR_TASK_DELETION_HEADER'));
                    return;
                }
            }
        }
        
        //all cells are deleteable
        graph.removeCells(); 
    }, null, null, 'Delete');
    
	// View actions
    this.addAction('print', function() { editor.showDialog(new PrintDialog(editor).container, mxResources.get('DIALOG_PRINT_HEADER'), 400, 259, true, true); }, null, 'sprite-print');    
	this.addAction('actualSize', function() {
		graph.zoomTo(1);
	});
	this.addAction('zoomIn', function() { graph.zoomIn(); }, null, null, 'Add');
	this.addAction('zoomOut', function() { graph.zoomOut(); }, null, null, 'Subtract');
	this.addAction('fitWindow', function() { graph.fit(); });
	
	
	
    this.addAction('convertLink', function (linkType) {
        if(editor.readOnly) {
            //editor is set to readonly, no action
            return;
        }

        var tmp = graph.getSelectionCells();
        if (tmp !== null) {
            for (var i = 0; i < tmp.length; i++) {
                var c = tmp[i];
                if (c.value !== null && Link.prototype.isPrototypeOf(c.value)) {

            		//convert the style to the array, which is expected from the getConnectionConstraint method
            		var style = graph.getCellStyle(c);
            		var state = c.clone();
            		state.style = style;
            		
            		var exitConstraint = graph.getConnectionConstraint(state, null , true);
            		var entryConstraint = graph.getConnectionConstraint(state, null , false);
                	
                    //convert the link to the new type, UI and model
                    graph.getModel().setStyle(c, linkType);
                    
					//set the connection constraints for the edge, as they are overwritten from the setStyle method
					graph.setConnectionConstraint(c, null, true, exitConstraint);
					graph.setConnectionConstraint(c, null, false, entryConstraint);
                    
                    editor.model.convertLink(c.value, linkType);
                }
            }
        }
	}, null, null, 'Convert');    
};

/**
 * Registers the given action under the given name.
 */
Actions.prototype.addAction = function (key, funct, enabled, iconCls, shortcut) {
    return this.put(key, new Action(mxResources.get(key), funct, enabled, iconCls, shortcut));
};

/**
 * Registers the given action under the given name.
 */
Actions.prototype.put = function (name, action) {
    this.actions[name] = action;

    return action;
};

/**
 * Returns the action for the given name or null if no such action exists.
 */
Actions.prototype.get = function (name) {
    return this.actions[name];
};

/**
 * Constructs a new action for the given parameters.
 */
function Action(label, funct, enabled, iconCls, shortcut) {
    mxEventSource.call(this);
    this.label = label;
    this.funct = funct;
    this.enabled = (enabled !== undefined) && (enabled !== null) ? enabled : true;
    this.iconCls = iconCls;
    this.shortcut = shortcut;
}

// Action inherits from mxEventSource
mxUtils.extend(Action, mxEventSource);

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setEnabled = function (value) {
    if (this.enabled != value) {
        this.enabled = value;
        this.fireEvent(new mxEventObject('stateChanged'));
    }
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setToggleAction = function (value) {
    this.toggleAction = value;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setSelectedCallback = function (funct) {
    this.selectedCallback = funct;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.isSelected = function () {
    return this.selectedCallback();
};
