// The userdata string identifiers for certain tasktype functions.
// If the userdata string is not one of these, it should be a url.
var TASK_MENU_DUPLICATE_ITEM = 'duplicate';
var TASK_MENU_DELETE_ITEM = 'delete';

var LINK_MENU_DELETE_ITEM = 'delete';
var LINK_MENU_CONVERT_NORMAL = 'convertNormal';
var LINK_MENU_CONVERT_TRUE = 'convertTrue';
var LINK_MENU_CONVERT_FALSE = 'convertFalse';
var LINK_MENU_CONVERT_LOOP = 'convertLoop';

/**
 * Task type strings
 */
var wfTaskTypes = {
	/**
	 * Task type for the start task
	 */
	START_TASK: '1_100',
	
	/**
	 * Task type for the evaluation task
	 */
	EVALUATION_TASK: '1_102',
	
	/**
	 * Task type for milestone task
	 */
	MILESTONE_TASK: '1_103'
};

/**
 * Constant definitions for the Workflow Designer
 */
var wfConstants = {
		
	/**
	 * Add operation name for the map update
	 */
	OPERATION_ADD: 'add',
	
	/**
	 * Move operation name for the map update
	 */
	OPERATION_MOVE: 'move',
	
	/**
	 * Delete operation name for the map update
	 */
	OPERATION_DELETE: 'delete',
	
	/**
	 * Duplicate operation name for the map update
	 */
	OPERATION_DUPLICATE: 'duplicate',

	/**
	 * Convert operation name for the map update
	 */
	OPERATION_CONVERT: 'convert',

	/**
	 * Dock operation name for the map update
	 */
	OPERATION_DOCK: 'dock',
	
	/**
	 * URL parameter to indicate if the map is dirty or not
	 */
    MAP_DIRTY_URL_PARAM: '&mapDirty=',
	
    /**
     * Map dirty false indicator
     */
    MAP_DIRTY_FALSE: 'false',
	
    /**
     * Map dirty true indicator
     */
    MAP_DIRTY_TRUE: 'true',
	
    /**
     * Object task name
     */
    OBJECT_TASK: 'task',
    
    /**
     * Object link name
     */
    OBJECT_LINK: 'link',
    
    /**
     * Link type normal name
     */
    LINK_TYPE_NORMAL: 'Normal',
    
    /**
     * Link type true name
     */
    LINK_TYPE_TRUE: 'True',
    
    /**
     * Link type false name
     */
    LINK_TYPE_FALSE: 'False',
    
    /**
     * Link type loopback name
     */
    LINK_TYPE_LOOPBACK: 'Loopback',
    
    /**
     * Green box overlay color
     */
    GREEN_BOX_COLOR: '#6CE82B',
    
    /**
     * Green box overlay stroke width
     */    
    GREEN_BOX_WIDTH: '6',

    /**
     * Headband overlay color
     */
    HEADBAND_COLOR: 'blue',
    
    /**
     * Headband overlay stroke width
     */    
    HEADBAND_WIDTH: '4',

    /**
     * Red box overlay color
     */
    RED_BOX_COLOR: 'red',
    
    /**
     * Red box overlay stroke width
     */    
    RED_BOX_WIDTH: '2',
    
    /**
     * X overlay color, not set
     */
    //X_COLOR: 'black';

    /**
     * X overlay stroke width, not set 
     */
    //X_WIDTH: '1',

    /**
     * Label font size for the shapes
     */
    LABEL_FONT_SIZE: 11,
    
    /**
     * Label font color for the shapes
     */
    LABEL_FONT_COLOR: 'black',
    
    /**
     * Toolbox label font size
     */
    TOOLBOX_FONT_SIZE: 17,

    /**
     * Max label characters in one line, for shapes with the label inside.
     * Has to be adjusted when the font size is changed. 
     * Otherwise the label can overlay the icon. 
     */
    MAX_LABEL_CHARACTERS_INSIDE: 15,

    /**
     * Max label characters in one line for shapes with the label below.
     */
    MAX_LABEL_CHARACTERS_BELOW: 20,
    
    /**
     * Activity shape image size
     */
    IMAGE_SIZE: 16,
    
    /**
     * All link types are allowed
     */
    ALLTYPES: -1
};

/**
 * Errors set in the MutableInteger by determineAppropriateLinkType()
 */
var wfErrors = {
	LT_NOERROR : 0,
	LT_NONE_FOUND : 1,
	LT_DUPLICATE : 2,
	LT_MULTIPLE_LOOPBACK : 3,
	LT_EXCEEDED_MAX_TYPES : 4,
	LT_LOOPBACK_NEEDED : 5,
	LT_NO_LOOPBACK : 6,
	LT_VIOLATES_LOOPBACK_GROUPING : 7
};

/**
 * The StringDiplomat.getLocalString( bundle, key ) or
 * StringDiplomat.getLocalString( bundle, key, val )
 * corresponding to the above errors.
 */
var wfErrorKeys = [ 
	'NOERROR_LINK_TYPE_OK',
	'ERROR_LINK_TYPE_INVALID',
	'ERROR_LINK_DUPLICATE',
	'ERROR_LINK_TYPE_MULTIPLE_LOOPBACKS',
	'NIS_ONLY_X_TASK_TYPES_ALLOWED',
	'ERROR_LINK_TYPE_CAUSES_LOOPBACK',
	'ERROR_LINK_TYPE_NOT_LOOPBACK',
	'ERROR_LINK_VIOLATES_LOOPBACK_GROUPING',
	];
/**
 * Helper object to collect information about the current actions.
 * @returns
 */
function wfDataBag() {
	this.messages = []
}

/**
 * Checker method to see of a message should be added to the list
 */
wfDataBag.prototype.canDrool = function() {
	return false;
};

/**
 * Add a message to the message list
 */
wfDataBag.prototype.droolc = function(msg) {
	this.messages.push(msg);
};

/**
 * Point object which converts the coordinates to integer values
 */
function wfPoint(x, y) {
	this.x = Math.round(x);
	this.y = Math.round(y);
}

/**
 * Constraint object which stores the connection constraints
 * @param x X coordinate of the constraint
 * @param y Y coordinate of the constraint
 * @param perimeter Perimeter flag of the constraint
 */
function wfConstraint(x, y, perimeter) {
	this.x = x;
	this.y = y;
	this.perimeter = perimeter;
}

/**
 * A custom alert message using jQuery UI dialog 
 * output_msg	Message for the alert
 * title_msg	Title for the alert window
 */
function showMessage(output_msg, title_msg)
{
    var height = "auto";

    if (!title_msg)
        title_msg = 'Alert';

    if (!output_msg)
        output_msg = 'No Message to Display.';

    if (mxClient.IS_QUIRKS) {
        //in quirks mode height auto not works
        height = 230;
    }

    //use jQuery UI dialog to show a modal dialogbox
    $("<div></div>").dialog( {
        buttons: { "Ok": function () { $(this).dialog("close"); } },
        close: function (event, ui) { $(this).remove(); },
        resizable: true,
        width: 400,
        height: height,
        title: title_msg,
        modal: true
      }).html(output_msg.replace(/\\n/g, '<br>'));
}

/**
 * Workaround for the issue that the bundle files
 * have a space before and after the '=' and the mxResources
 * object cannot handle this properly.
 */
var mxResourcesParse = mxResources.parse;
mxResources.parse = function(text)
{
	//replace all ' = ' with '='
    text = text.replace(/ = /g, '=');
    mxResourcesParse.apply(this, arguments);
};

/**
 * Simple format method for string, can be replaced with a 
 * library with more functionality
 * text		Text which should be formated
 */
function formatString(text) {
	if(arguments.length == 1) {
		return text;
	}
	
	if((text === undefined) || ( text === null )) {
		return text;
	}
	if(text.indexOf('%s') != -1){
		//replace one occurrence of %s with the second argument
		return text.replace('%s', arguments[1]);
	} else {
		//replace all %1s, %2s, ...
		var tmp = text;
		for(var i = 1; i < arguments.length; i++) {
			tmp = tmp.replace('%' + i + 's', arguments[i]);
		}
		return tmp;
	}
}

/**
 * Html encoder method
 */
function htmlEncode(value){
	  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
	  //then grab the encoded contents back out.  The div never exists on the page.
	  return $('<div/>').text(value).html();
}

/**
 * Extend the string object with a wordWrap method
 *  m maximum amount of characters per line
 *  b string that will be added whenever it's needed to break the line
 *  c 
 *    0 = words longer than "maxLength" will not be broken
 *    1 = words will be broken when needed
 *    2 = any word that trespass the limit will be broken
 */ 
String.prototype.wordWrap = function(m, b, c){
    var j, s;
    
    if(m < 1) {
        return this;
    }
    
    var r = this.split('\n');    
    var l = r.length;
    
    for(var i = -1; ++i < l; r[i] += s) {
        for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")) {
            var x = s.slice(0, m + 1).match(/\S*(\s)?$/);
            var y = s.slice(m).match(/^\S*/);
            j = (c == 2 || x[1]) ? m : (x.input.length - x[0].length || c == 1 && m  || x.input.length + y.input.length);
        }
    }
    
    return r.join("\n");
};

/**
 * Helper method to do a synchronous post.
 * 
 * url		Url
 * data		Data which should be posted
 * success	Sucess callback
 * error	Error callback
 */
function doPost(url, data, success, error) {
	$.ajax({
          type: 'POST',
          url: url,
          data: data,
          async: false,
          success: success,
          error: error
		});
}

//extend the Array with a contains method
if (!Array.contains){
	
	/**
	 * Helper method to check if a value is in an array
	 * value	Searched value
	 */
	Array.prototype.contains = function(value){
	    for (var key in this)
	        if (this[key] === value) return true;
	    return false;
	}
}

//Helper method for the loopback group support

/**
 * This returns a vector containing the loopback groups minimized
 * for the given groups and a given link.  This is necessary since
 * a link to the boundary of a loopback group may or may not be inclusive,
 * even though the loopback group cache will cache end boundaries regardless.
 * Thus, this function returns a loopback group cache that is correctly
 * inclusive with respect to the given link.
 */
function getMinimizedLoopbackGroups(lgroup, somelink, tidx) {
	var retval = [];

	for(var i = 0; i < lgroup.length; i++) {
		var testloopback = lgroup[i];

		// If somelink enters the loopback at its inception or exits
		// the loopback at its closure, the loopback should not be
		// included.
		if ( ( tidx == testloopback.end && somelink.end == testloopback.end ) || 
			 ( tidx == testloopback.start && somelink.start == testloopback.start ) ) {
			// The loopback minimizes out.
		} else {
			retval.push( testloopback );
		}
	}

	return retval;
}

/**
 * Returns a new Vector which is the union of the two given Vectors.
 */
function getUnionVector(v1, v2) {
	//clone v1
	var retval = v1.slice(0);

	for (var i = 0; i < v2.length; i++) {
		var obj = v2[i];

		if(!v1.contains(obj)) {
			retval.push(obj);
		}
	}

	return retval;
}

/**
 * Tests to see if this loopback group contains the other.
 * If so true is returned.  Note that this is O(N^2).
 */
function containsLoopbackGroup(thisgroup, othergroup) {
	var retval = true;
	
	for(var i = 0; i < othergroup.length; i++) {
		var testlink = othergroup[i];
		
		if(!thisgroup.contains(testlink)) {
			retval = false;
			break;
		}
	}
	
	return retval;
}


/**
 * Tests to see if a two given loopback groups equal each other.
 * If so (determined by testing to see if this contains the 
 * other and then ensuring the size of the two are the same), 
 * true is returned.
 */
function equalsLoopbackGroup(thisgroup, othergroup) {
	return (othergroup.length == thisgroup.length && 
			 containsLoopbackGroup(thisgroup, othergroup));
}

/**
 * Class: wfExpandLayout
 * 
 * Extends <mxGraphLayout> for expanding the map layout, 
 * so that no overlapping shapes are shown in the map.
 * 
 * Example:
 * 
 * (code)
 * var layout = new wfExpandLayout(graph, true, 10, true);
 * layout.execute(graph.getDefaultParent());
 * (end)
 * 
 * Constructor: wfExpandLayout
 * 
 * Constructs a new expand layout layout for the specified graph and spacing.
 */
function wfExpandLayout(graph, spacing, ltrEdges) {
	mxGraphLayout.call(this, graph);
	this.spacing = spacing || 0;
	this.ltrEdges = ltrEdges;
};

/**
 * Extends mxGraphLayout.
 */
wfExpandLayout.prototype = new mxGraphLayout();
wfExpandLayout.prototype.constructor = wfExpandLayout;

/**
 * Variable: spacing
 * 
 * Integer that specifies the spacing in pixels between the shapes. 
 * wfExpandLayoutDefault is 0.
 */
wfExpandLayout.prototype.spacing = null;

/**
 * Variable: ltrEdges
 * 
 * Flag that specifies if the edges have to go from left (west) to right (east),
 * as it was in the painter.
 */
wfExpandLayout.prototype.ltrEdges = true;

/**
 * Function: execute
 * 
 * Implements <mxGraphLayout.execute>. All children where <isVertexIgnored>
 * returns false and <isVertexMovable> returns true are modified.
 */
wfExpandLayout.prototype.execute = function(parent) {
	var horizontal = false;
	var model = this.graph.getModel();

	var children = [];
	var childCount = model.getChildCount(parent);
		
	var factor = 1;
	
	for (var i = 0; i < childCount - 1; i++) {
		var child = model.getChildAt(parent, i);
		
		if (!this.isVertexIgnored(child)) {
			
			for (var j = i + 1; j < childCount; j++) {
				var child2 = model.getChildAt(parent, j);

				if (!this.isVertexIgnored(child2)) {
					var c1 = new mxRectangle(child.geometry.x, child.geometry.y, child.geometry.width, child.geometry.height);
					var c2 = new mxRectangle(child2.geometry.x, child2.geometry.y, child2.geometry.width, child2.geometry.height);
					
					if(mxUtils.intersects(c1, c2)) {
						//tasks are overlapping
						
						//calculate the x overlap distance
						var dx = c2.x - c1.x;
						var w  = c1.width;
						if (dx < 0) {
							dx = dx * -1;
							w = c2.width;
						}
						//calculate the factor to remove the overlap in the x axis
						var fx = -1;
						if ( dx > 0) {
							fx = (w + this.spacing) / dx;
						}
						
						//calculate the y overlap distance
						var dy = c2.y - c1.y;
						var h  = c1.height;
						if (dy < 0) {
							dy = dy * -1;
							h = c2.height;
						}
						
						//calculate the factor to remove the overlap in the y axis
						var fy = -1;
						if ( dy > 0) {
							fy = (h + this.spacing) / dy;
						}
						
						//first get the minimum factor to remove the overlap, then get maximum factor for the complete map
						factor = Math.max(factor, Math.min(fx, fy));
					}
				}
			}
		}
	}
	
	if (factor >= 1) {
		model.beginUpdate();
		try {
			var childCount = model.getChildCount(parent);
			
			for (var i = 0; i < childCount; i++) {
				var child = model.getChildAt(parent, i);
				
				if (!this.isVertexIgnored(child)) {
					var geo = model.getGeometry(child);
					
					//calculate the offset for the different shape types
					var xOffset = 0;
					var yOffset = 0;
					switch(child.value.type.type) {
						case wfTaskTypes.START_TASK:
						case wfTaskTypes.MILESTONE_TASK:
							xOffset = 4;
							yOffset = 1;
							break;
						case wfTaskTypes.EVALUATION_TASK:
							xOffset = 3;
							yOffset = 0;							
							break;
						default:
							xOffset = 0;
							yOffset = 0;
							break;
					}
					
					//move the vertex, only with integer coordinates and snap to grid
					var newX = this.graph.snap(Math.round(geo.x * factor)) + this.graph.gridSize * xOffset;
					var newY = this.graph.snap(Math.round(geo.y * factor)) + this.graph.gridSize * yOffset;
					this.setVertexLocation(child, newX, newY);
					
					//mark the vertex as moved also in the model
					child.value.move(child.geometry.x, child.geometry.y);
				}
				
				if(this.ltrEdges && model.isEdge(child) && !this.isEdgeIgnored(child)) {
					//set edge constraints, go into from west, go out to east
					var east = new mxConnectionConstraint(new mxPoint(1,0.5), false);
					var west = new mxConnectionConstraint(new mxPoint(0,0.5), false);
					
					this.graph.setConnectionConstraint(child, child.source, true, east);
					this.graph.setConnectionConstraint(child, child.target, false, west);
					
					//mark the edge as docked also in teh model
					child.value.setExitConstraint(east);
					child.value.setEntryConstraint(west);
				}				
			}
		}
		finally {
			model.endUpdate();
		}
	}
};