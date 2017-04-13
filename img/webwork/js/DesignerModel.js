/**
 * JavaScript model for the Workflow Designer.
 * It contains all properties to initialize the designer.
 *   General properties for the designer
 *   List of task types
 *   List of link type
 *   Workflow map definition
 */
function DesignerModel() {

	//selected locale for the designer
	this.selectedLocale = 'en-US';

	//location of the properties files
	this.propertyFilesLocation = null;
	
	//encoding for the designer
	this.encoding = null;

	//flag to indicate if the loopback rules should be enforced
	this.enforceLoopbackRules = true;

	//base URL for the Content Server
	this.baseUrl = '';
	
	//upload URL for the workflow map
	this.uploadUrl = '';
	
	//painter.addParam( "preferred_font", "`[Web_Misc.JavaAppletFont]`" )
	
	//designer opened in view only mode
	this.viewOnly = false;

	//designer opened in unsavable mode
	this.unSavable = false;

	//workflow map is changed
	this.mapDirty = false;

	//designer not opened in the modify mode
	this.modifyMap = false;
	
	//list of defined task types
	this.taskTypes = [];
	
	//list of defined link types
	this.linkTypes = [];
	
	//workflow map definition
	this.map = new Map();
	
	//list with all map changes
	this.mapChanges = [];
	
	//Data bag to store debug information
	this.wfDataBag;
}

/**
 * Add a new task type to the list
 * id		Id of the task type
 * name		Name of the task type
 * image	URL for the task type image
 * type		Type identifier
 * showInPalette	Flag if the task type should be shown in the palette or not
 * duplicatable	Flag if the task can be duplicated 
 */
DesignerModel.prototype.addTaskType = function(id, name, image, type, showInPalette, duplicatable) {
	var s = new TaskType(id, name, image, type, showInPalette, duplicatable);
	this.taskTypes[id] = s;
	
	return s;
};

/**
 * Add a new link type to the list
 * id		Id of the link type
 * name		Name of the link type
 * color	Color of the link type
 * loopback	Loopback link inidcator
 * type		Type identifier
 */
DesignerModel.prototype.addLinkType = function(id, name, color, loopback, type) {
	var l = new LinkType(id, name, color, loopback, type);
	this.linkTypes[id] = l;
};

/**
 * Gets the link type with the given id
 * type	Type name of the link type
 */
DesignerModel.prototype.getLinkType = function(type) {
	//the id is used to add the link type to the array
	for(var i = 0; i < this.linkTypes.length; i++){
		if (type === this.linkTypes[i].type) {
			return this.linkTypes[i];
		}
	}
	return null;
};

/**
 * Add a task to the list
 * id		Id of the task
 * name		Display name for the task
 * h		Horizontal coordinate for the task
 * v		Vertical coordinate for the task
 * type		Type id of the task
 * extraParam Extra parameter for menu actions
 * overlay	Overlay name
 * statusLabel Status label containing the task status information, due date, done date
 * deleteable	Flag if the task is deleteable from the map
 * invisible	Flag if the task is invisibile
 */
DesignerModel.prototype.addTask = function(id, name, h, v, type, extraParam, overlay, statusLabel, deleteable, invisible) {
	//Create a new task in the map and a reference to the task type
	this.map.addTask(id, name, h, v, this.taskTypes[type], extraParam, overlay, statusLabel, deleteable, invisible);
};

/**
 * Add a link to the list
 * id		Id of the link
 * name		Display name for the link
 * start	Id of the start task
 * end		Id of the end task
 * type		Type id of the link
 * points	Points of the link
 * exitConstraint	Exit constraint for the link
 * entryConstraint	Entry constraint for the link 
 */
DesignerModel.prototype.addLink = function(id, name, start, end, type, points, exitConstraint, entryConstraint) {
	//Create a new link in the map
	this.map.addLink(id, name, start, end, this.getLinkType(type), points, exitConstraint, entryConstraint);
};

/**
 * Add a map title to the map
 * title	Title of map
 */
DesignerModel.prototype.addMapTitle = function(title) {
	//Create a new link in the map
	this.map.title = title;
};

/**
 * Remove an object from the map.
 * obj	Link or Task object
 */
DesignerModel.prototype.remove = function(obj){
	if(Task.prototype.isPrototypeOf(obj)){
		//it is a task, only mark it as removed
		obj.remove();
	} else {
		//it is a link, mark it as removed and update the loopback group caches
		this.removeLink(obj);
	}
};

/**
 * Converts the given link to a new link type
 * link		The link to convert
 * type		The new link type 
 */
DesignerModel.prototype.convertLink = function(link, type) {
	var linkType = this.getLinkType(type);
	link.convertTo(linkType);
};

/**
 * Remove the given link from the model and update the loopback group caches
 * 
 * link		Link object
 */
DesignerModel.prototype.removeLink = function(link){
	
	var tfrom = this.map.tasks[link.start];
	var tto = this.map.tasks[link.end];;
	var isloopback = link.type.isLoopback();
	var updateloopbackgroups = [];

	// Update linking caches.
//	tfrom.deleteToLink( l );
//	tto.deleteFromLink( l );

	// Here we need to delete or rebuild loopback caches for the task involved
	// If it is a loopback, merely only the loopback cache for this
	// loopback.
	if (isloopback) {
		updateloopbackgroups = [];
		updateloopbackgroups.push(link);
	} else {
		// Otherwise, if it isn't a loopback, update all the loopback
		// group caches associated with the tasks the link connects.
		var fromlgcache = getMinimizedLoopbackGroups( tfrom.getLoopbackGroups(), link, link.start );
		var tolgcache = getMinimizedLoopbackGroups( tto.getLoopbackGroups(), link, link.end );

		updateloopbackgroups = getUnionVector( fromlgcache, tolgcache );
	}

	// Wipe all the loopback group caches involved.
	for (var lidx = 0; lidx < updateloopbackgroups.length; lidx++) {
		var lglink = updateloopbackgroups[lidx];

		for (var taskidx = 0; taskidx < this.map.tasks.length; taskidx++) {
			var t = this.map.tasks[taskidx];
			t.removeFromLoopbackGroups(lglink);
		}
	}

	// If a loopback wasn't deleted, we need to rebuild all the
	// loopback group caches that were wiped, since the links corresponding
	// to them still exist.
	if (!isloopback) {
		for (var i = 0; i < updateloopbackgroups.length; i++) {
			var lglink = updateloopbackgroups[i];
			
			this.resetAllTaskMarks();
			this.addTaskToLoopbackGroupCache(lglink.end, lglink);
		}
	}

	//mark the link a removed
	link.remove();
};

/**
 * Add a new task to the list
 * id		Id of the link
 * name		Display name for the link
 * start	Id of the start task
 * end		Id of the end task
 * type		Type id of the link
 */
DesignerModel.prototype.addNewLink = function(name, start, end) {
	
	// Determine all the link types that are appropriate here.
	var linkTypes = this.determineAppropriateLinkTypes( start, end, -1, false );
	
	var firstltgood = -1;

	// Search for the first applicable link type.
	for (var i = 0; i < linkTypes.length; i++ ){
		if ( linkTypes[i] == wfErrors.LT_NOERROR ) {
			firstltgood = i;
			break;
		}
	}

	var tfrom = this.map.tasks[start];
	var tto = this.map.tasks[end];
	var ttypefrom = tfrom.type;
	
	// If an appropriate type was not found, post a dialog for the
	// user that tells him his link creation failed.	Enumerate
	// the reasons why each type failed.
	if ( firstltgood < 0 ) {
		var fromName = tfrom.name;
		var toName = tto.name;
		
		var linkAddError = mxResources.get('DIALOG_ERROR_LINK_ADDITION_CONTENT');
		var linkDesc = mxResources.get('DESCRIBE_LINK');
		var message = formatString(linkAddError, formatString(linkDesc, htmlEncode(fromName), htmlEncode(toName)));
		
		for (var i = 0; i < linkTypes.length; i++ ) {
			var ltype = this.getLinkType(ttypefrom.linkTypesFrom[i]);
			var color = ltype.color;
			var linkName = ltype.name;

			var linkAddErrorReason = mxResources.get('DIALOG_ERROR_LINK_ADDITION_REASON');
			var boldMark = mxResources.get('BOLD_MARKUP');
			var colorMark = mxResources.get('COLOR_MARKUP');
			var error = this.stringFromLTError(linkTypes[i], ttypefrom);
			
			message += formatString(linkAddErrorReason, formatString(boldMark, formatString(colorMark, color, linkName)), error);
		}
		
		var title = mxResources.get('DIALOG_ERROR_LINK_ADDITION_HEADER');
		showMessage(message, title);
		
		return null;
	}
	else {
		var updateloopbackgroups = [];

		// Set the link type.
		var ltype = this.getLinkType(ttypefrom.linkTypesFrom[firstltgood]);

		//add the link to the map
		var l = this.map.addNewLink(name, start, end, ltype);
		
		// Update the link caches.
/*		tfrom.addToLink( l );
		tto.addFromLink( l );
*/
		// Here we need to rebuild loopback caches for the task involved
		// If it is a loopback, build only the loopback cache for this
		// loopback.
		if (ltype.isLoopback()) {
			updateloopbackgroups = [];
			updateloopbackgroups.push(l);
		} else {
			// Otherwise, if it isn't a loopback, update all the loopback
			// group caches associated with the tasks the link connects.
			var fromlgcache = getMinimizedLoopbackGroups(tfrom.getLoopbackGroups(), l, l.start);
			var tolgcache = getMinimizedLoopbackGroups(tto.getLoopbackGroups(), l, l.end);

			updateloopbackgroups = getUnionVector(fromlgcache, tolgcache);
		}

		// Update all the affected loopback caches.
		for (var i = 0; i < updateloopbackgroups.length; i++) {
			var lglink = updateloopbackgroups[i];
			
			this.resetAllTaskMarks();
			this.addTaskToLoopbackGroupCache( lglink.end, lglink );
		}

		//Create a new link in the map
		return l		
	}	
};

// Returns a string corresponding to the given LinkType Error.
DesignerModel.prototype.stringFromLTError = function( errval, ttfrom ) {
	var diplomat_string_idx = wfErrorKeys[ errval ];
	var ltestring = '' + ttfrom.maxLinkTypes;
	var s = mxResources.get(diplomat_string_idx);

	return formatString(s, ltestring);
}

/**
 * Determine the appropriate link types for a link between the start and the end task.
 * start	Id of the start task
 * end		Id of the end task
 * followLoopbacks	Flag indicating if loopbacks are followed or not 
 */
DesignerModel.prototype.determineAppropriateLinkTypes = function(start, end, linkId, followLoopbacks) {
	
	//Data bag for messages
	this.wfDataBag = new wfDataBag();

	var tfrom = this.map.tasks[start];
	var tto = this.map.tasks[end];
	
	var ttypefrom = tfrom.type;
	var feaslist = new Array(ttypefrom.linkTypesFrom.length);
	var makesloopback = false;
	
	if (this.wfDataBag.canDrool()) {
		this.wfDataBag.droolc("Searching for loopback [" +
						 ( (followLoopbacks) ? "following" : "") + "]: ");	 
	}

	this.resetAllTaskMarks();
	makesloopback = this.causesLoopback( tto, tfrom, followLoopbacks );
	this.wfDataBag.droolc(' ' + makesloopback);
	
	// Search through all the link types listed in the FROM task's
	// tasktype.	Determine feasibility of each and stuff this
	// feasibility/error value into the returned integer array.
	for (var lti = 0; lti < ttypefrom.linkTypesFrom.length; lti++) {
		var test_ltype = this.getLinkType(ttypefrom.linkTypesFrom[ lti ]);

		//-1 means a new link is added
		var linktype_feasibility = this.testLinkFeasibility( tfrom, tto, linkId, test_ltype );

		if ( makesloopback && !test_ltype.isLoopback() ) {
			linktype_feasibility = wfErrors.LT_LOOPBACK_NEEDED;
		}
		else if ( !makesloopback && test_ltype.isLoopback() ) {
			linktype_feasibility = wfErrors.LT_NO_LOOPBACK;
		}

		if ( this.wfDataBag.canDrool() ) {
			this.wfDataBag.droolc( '' + test_ltype.name + ' ' +
							 'stringFromLTError(linktype_feasibility, ttypefrom)'); 
		}

		feaslist[lti] = linktype_feasibility;
	}
	
	return feaslist;
};

/**
 * Check if the connection causes a loopback
 */
DesignerModel.prototype.causesLoopback = function(curTask, endTask, followLoopbacks){
	this.wfDataBag.droolc("(");
	curTask.mark();
	
	var outgoing = this.map.getOutgoingLinks(curTask.id);
	for (var i = 0; i < outgoing.length; i++ ) {
		var l = outgoing[i];
		var link_isloopback = l.type.isLoopback();
		
		// Only consider links that aren't loopbacks if !followloopbacks
		if (followLoopbacks || (!followLoopbacks && !link_isloopback ) ) {
			var t = this.map.tasks[l.end];

			if ( this.wfDataBag.canDrool() ) { 
				this.wfDataBag.droolc('' + l.end + ' '); 
			}

			// return true if the tasks match.	Return true if recursion
			// returns true.	However, do not recurse across marked (already
			// visited) tasks.	Also, do not recurse across loopbacks if
			// followloopbacks is false.	Finally, do not return false until
			// after all links have been followed through and we still
			// failed.
			if ( t.id == endTask.id || 
				 ( !t.isMarked && this.causesLoopback( t, endTask, followLoopbacks ) ) ) {
				this.wfDataBag.droolc(")");
				return true;
			}
		}
	}
	
	this.wfDataBag.droolc(')');
	return false;	
};


/**
 * This method tests whether a given link of a given linktype will
 * form a valid link.	 It returns the following values for the
 * following reasons:
 * LT_NONE_FOUND: Returned if the given link type is not supported
 * 						   linking FROM the link's FROM task, or TO the TO task.
 * LT_DUPLICATE: Returned if a link of this type between these tasks
 * 						  already exists.
 * LT_MULTIPLE_LOOPBACK: Returned if a different loopback link already 
 * 						 exists going from the FROM task.
 * LT_VIOLATES_LOOPBACK_GROUPING: Returned if this link causes a closed loopback
 * 								  group to intersect with another or open in
 * 								  some other way.
 * LT_NOERROR: Returned if the link is perceived to be possible.
 *  
 * This method does not test the validity of loopback links in terms
 * of loopback function, or whether or not nonloopback links will
 * incorrectly cause loopback functionality.
 * This method will behave differently if linkId isn't new (already
 * exists in the workflow (!= -1)).	It should
 * behave correctly as for editing such non-new links.
 */
DesignerModel.prototype.testLinkFeasibility = function(start, end, linkId, ltype ) {
	var ttypefrom = start.type;
	var ttypeto = end.type;

	// Below is the number of different linktypes from the FROM task.
	var link_already_exists = false;

	if (this.wfDataBag.canDrool()) {
		this.wfDataBag.droolc('Testing link {' + start.name + '->' + end.name + '} type ' + 
						 ltype.type + '.'); 
	}

	// First ensure that the task types in question take links to/from them.
	if (ttypefrom.linkTypesFrom == null || ttypeto.linkTypesTo == null) {
		return wfErrors.LT_NONE_FOUND;
	}
	
	// Ensure the linktype is found in both the list of FROM links in the
	// FROM task, and the TO links in the TO task.
	if (!ttypefrom.linkTypesFrom.contains(ltype.type)) {
		return wfErrors.LT_NONE_FOUND;
	}
	if (!ttypeto.linkTypesTo.contains(ltype.type)) {
		return wfErrors.LT_NONE_FOUND;
	}
	
	//array to collect the existing outgoin link types
	var existingLinkTypes = [];
	
	// A link type common to both the to and from tasks was found.
	// Now check for duplicates, as well as counting the number of
	// total different linktypes emerging from the FROM task.	 
	var outgoing = this.map.getOutgoingLinks(start.id);
	for (var x = 0; x < outgoing.length; x++ ) {
		var lcache = outgoing[x];

		// Check for duplicate functionality of two DIFFERENT links.
		// Test the link passed us against lcache (which iterates
		// through all the links in the from task's link cache ).
		// NOTE: Add "ltypeidx == lcache.linktype &&" to the if statement
		// to allow both TRUE and FALSE links from a conditional to the
		// same task.
		if ( linkId != lcache.id && // don't count this link.
			 ( lcache.start == start.id && lcache.end == end.id) ) {
			return wfErrors.LT_DUPLICATE;
		}
		
		// Remember if the link passed us is one that is already cached
		// (ie. one that isn't going to be freshly added).
		if ( linkId == lcache.id ) {
			link_already_exists = true;
			
			//mark the new link type as present, if the link already exists
			existingLinkTypes[ltype.id] = true;			
		} else {
			//mark the current link type as present
			existingLinkTypes[lcache.type.id] = true;			
		}		
	}
	
	// Below should not count Link li if it is not new.
	if (!link_already_exists) {
		//mark the link type as present
		existingLinkTypes[ltype.id] = true;
	}	
	
	// Below count the number of different linktypes from the FROM task.
	var numDiffLinkTypes = 0;
	for(var i = 0; i < existingLinkTypes.length; i++) {
		if(existingLinkTypes[i] !== undefined && existingLinkTypes[i] == true) {
			numDiffLinkTypes++;
		}
	}

	// Exceeds the maximum number of different link types allowed from
	// the FROM task?	 Bail if so.	
	if (numDiffLinkTypes > ttypefrom.maxLinkTypes &&	 
		 ttypefrom.maxLinkTypes != wfConstants.ALLTYPES) {
		return wfErrors.LT_EXCEEDED_MAX_TYPES;
	} else {
		if (this.wfDataBag.canDrool()) {
			this.wfDataBag.droolc(" [" + (numDiffLinkTypes + 1) + "/" + 
					ttypefrom.maxLinkTypes + " difftypes] ");
		}
	}
	
	// No duplicates? Now search for other loopbacks if this is a loopback.
	if (ltype.isLoopback()) {
		for (var x = 0; x < outgoing.length; x++ ) {		
			var lcache = outgoing[x];

			// Bloody murder!	 We found other loopback.
			if (linkId != lcache.id /* Do not consider li if it isn't new. */	 && 
				 lcache.type.isLoopback()) {
				return wfErrors.LT_MULTIPLE_LOOPBACK;
			}
		}
	}	
	
	// Gotten this far?  Now run the possibly super-expensive test of
	// loopback grouping, only if it is a new link (old links should never
	// convert to or from loopbacks, so we should only have to check for
	// new links-- or at least here we're fooling ourselves into thinking
	// this is true).

	if (this.enforceLoopbackRules && !link_already_exists) {
		
		var li = new Link(-1, '', start.id, end.id, ltype);
		
		var fromloopbackgroup = getMinimizedLoopbackGroups( start.getLoopbackGroups(), li, li.start );
		var toloopbackgroup = getMinimizedLoopbackGroups( end.getLoopbackGroups(), li, li.end );
	
		if ( this.wfDataBag.canDrool() ) {
			this.wfDataBag.droolc('Testing Link grouping from ' + fromloopbackgroup + 
					  '(' + start.getLoopbackGroups() + ') to ' + toloopbackgroup + 
					  '(' + end.getLoopbackGroups() + ') ' +
					  ' on link: ' + li); 
		}		

		// First get the minized loopback groups for both tasks this link
		// connects.  Test if these are equal.  If so, then adding the link
		// is OK because it does not cross, join, or otherwise violate loopback 
		// group boundaries.  If this is false, then we need to perform a test
		// to ensure that the two tasks linked of disparate link groups do
		// not join in any way.  This is the super-expensive part.

		if (this.enforceLoopbackRules && !equalsLoopbackGroup( fromloopbackgroup, toloopbackgroup)) {
			this.wfDataBag.droolc( "Test proves Vectors unequal.  Now, searching for task connection." );
			
			this.resetAllTaskMarks();
			
			if (this.doTheseTasksConnect(li.start, li.end)) {
				return wfErrors.LT_VIOLATES_LOOPBACK_GROUPING;
			}
		}
	}
	
	// Finally, success!  This linktype will do the job.

	return wfErrors.LT_NOERROR;	
};

/**
 * Reset all task marks
 */
DesignerModel.prototype.resetAllTaskMarks = function(){
	for(var i = 0; i < this.map.tasks.length; i++) {
		this.map.tasks[i].unmark();
	}
};

/**
 *  Caches one reference for each link, in the task the link goes from.
 *  Should be called once the initial workflow data is loaded, before 
 *  visual manipulation of it.
 */
DesignerModel.prototype.buildLinkCacheInTasks = function() {
	// First, build the link cache.
/*	for ( int i = lks.first(); lks.boundsMax( i ); i = lks.next( i ) )
	{
		Link li = (Link) lks.ref( i );
		Task tfrom = (Task) wfdata.tasks.ref( li.from );
		Task tto = (Task) wfdata.tasks.ref( li.to );

		tfrom.addToLink( li );
		tto.addFromLink( li );
	}*/

	// Next, build the loopback group caches.
	for(var i = 0; i < this.map.links.length; i++) {
		var li = this.map.links[i];

		if (li.type.isLoopback()) {
			this.resetAllTaskMarks();
			this.addTaskToLoopbackGroupCache( li.end, li );
		}
	}
}

/**
 * This recursive function takes a loopback link and a task.  It
 * traverses all tasks until (and including) the task the loopback
 * is from, adding the loopback to the loopback group cache for
 * each task.
 * This function should initially be called passing the index of
 * the task the loopback goes to.  In this way, it will traverse
 * the course of the loopback group until the task the loopback 
 * originates from.  Also, be sure to call resetAllTaskMarks()
 * before calling this function, since it uses the marks to
 * prevent bouts of infinite recursion.
 */
DesignerModel.prototype.addTaskToLoopbackGroupCache = function( tfromidx, loopback ) {
	var tfrom = this.map.tasks[tfromidx];

	// Only handle this task if it isn't already marked (prevents
	// infinite recursion).
	if (!tfrom.isMarked) {
		// Mark this task as touched.
		tfrom.mark();

		// If the task isn't already part of this loopback group, add it.
		if ( !tfrom.isInLoopbackGroup( loopback ) ) {
			tfrom.addToLoopbackGroup( loopback );
		}

		// If this task is not the task that starts the loopback (we
		// traverse from the end to the beginning of the loopback course,
		// which is forward through all other link types since loopbacks
		// are "backward" links) add all the tasks linked to and from this task.
		if (tfromidx != loopback.start) {
			var outgoing = this.map.getOutgoingLinks(tfrom.id);
			for (var i = 0; i < outgoing.length; i++) {
				var li = outgoing[i];
			
				this.addTaskToLoopbackGroupCache( li.end, loopback );
			}
		}
		if (tfromidx != loopback.end) {
			var incomming = this.map.getIncommingLinks(tfrom.id);
			for (var i = 0; i < incomming.length; i++) {
				var li = incomming[i];
			
				this.addTaskToLoopbackGroupCache( li.start, loopback );
			}
		}
	}
}

/**
 * Recursive function which traces all paths from the task of
 * index tfromidx to ttoidx, returning true if ttoidx is found
 * along the way, otherwise false.  NOTE: be sure to prepend
 * calls to this with an initial call to setAllTaskMarks( false ).
 */
DesignerModel.prototype.doTheseTasksConnect = function(tfromidx, ttoidx) {
	var tfrom = this.map.tasks[tfromidx];

	// Only handle this task if it isn't already marked (prevents
	// infinite recursion).
	if ( !tfrom.isMarked )
	{
		// Mark this task as touched.
		tfrom.mark();
		
		var outgoing = this.map.getOutgoingLinks(tfrom.id);
		for (var i = 0; i < outgoing.length; i++) {
			var li = outgoing[i];
		
			// If the end of this link matches here, or further
			// down the line, return true.
			if (li.end == ttoidx || this.doTheseTasksConnect(li.end, ttoidx)) {
				return true;
			}
		}

		// Nothing found?  Search all tasks linked FROM this task.
		var incomming = this.map.getIncommingLinks(tfrom.id);
		for (var i = 0; i < incomming.length; i++) {
			var li = incomming[i];
		
			// If the tail of this link matches here, or back down
			// the line, return true.
			if (li.start == ttoidx || this.doTheseTasksConnect(li.start, ttoidx)) {
				return true;
			}
		}
	}

	return false;
}

/**
 * Get the map changes.
 * If the change list is not empty it is returned without getting the latest changes.
 * This can be done because the changes only collected when a new request is started.
 */
DesignerModel.prototype.getMapChanges = function() {
	if(this.mapChanges.length == 0) {
		//in the case of modify map, the tasks are not deleted
		this.mapChanges = this.map.getChanges(!this.modifyMap);
	}
	
	return this.mapChanges;
};

/**
 * Reset the map changes list 
 */
DesignerModel.prototype.resetMapChanges = function() {
	//clear the change list
	this.mapChanges = [];
};

/**
 * Apply the map changes list 
 */
DesignerModel.prototype.applyMapChanges = function() {
	//clear the change list
	this.mapChanges = [];
	//clear the map itself
	this.map.applyChanges(this);
};

/**
 * Calculate the offset for the given task id, depending on the removed tasks
 * This is necessary to calculate the correct id for the task edit request.
 */
DesignerModel.prototype.getTaskIdOffset = function(taskId) {
	//in the case of modify map tasks are not deleted, so that no offset is necessary
	if(this.modifyMap) {
		return 0;
	}

	var offset = 0;
	var tasks = this.map.tasks;
	for(var i = 0; i < tasks.length && tasks[i].id < taskId; i++) {
		var t = tasks[i];
		if(t.isRemoved) {
			//an earlier task was removed, this task will have a lower id in the following request 
			offset++;
		}
	}

	return offset;
};

/**
 * JavaScript model for the menu entries
 * id		If of the menu entry
 * name		Name of the menu entry
 * action	Action URL for the menu entry
 * help		Help information for the menu entry
 * font		Font indication
 */
function MenuEntry(id, name, action, help, font) {
	
	//id of the menu entry
	this.id = id;
	
	//name of the menu entry
	this.name = name;
	
	//action URL for the menu entry
	this.action = action;
	
	//help for the menu entry
	this.help = help;
	
	//font for the menu entry
	this.font = font;
}

/**
 * JavaScript model for the Workflow task type.
 */
function TaskType(id, name, image, type, showInPalette, duplicatable) {

	//id of the task type
	this.id = id;
	
	//name of the task type
	this.name = name;
	
	//Image URL of the task type
	this.image = image;
	
	//type identifier of the task type
	this.type = type;
	
	//flag if the task type should be shown in the palette
	this.showInPalette = showInPalette;
	
	//flag if the task can be duplicated
	this.duplicatable = duplicatable;
	
	//default width of the task type shape
	this.defaultWidth = 40;
	
	//default height of the task type shape
	this.defaultHeight = 40;
	
	//list of menu entries for the task type
	this.menuEntries = [];
	
	//number of allowed outgoing link types
	this.maxLinkTypes = 0;
	
	//list of allowed link types which are starting in this task type
	this.linkTypesFrom = [];
	
	//list of allowed link types which are point to this task type
	this.linkTypesTo = [];
	
	//lift of menu entries for the links starting from this task
	this.linkFromMenuEntries = [];
}

/**
 * Method to get the task type label
 */
TaskType.prototype.getLabel = function () {
	return this.name;
};

/**
 * Method to add a menu entry to the task type
 * 
 * id		Id of the menu entry
 * name		Name of the menu entry
 * action	Action URL for the menu entry
 * help		Help information for the menu entry 
 * font		Font indication, bold indicates default menu
 */
TaskType.prototype.addMenu = function (id, name, action, help, font) {
	var m = new MenuEntry(id, name, action, help, font);
	this.menuEntries.push(m);
};

/**
 * Method to add a menu separator entry to the task type
 * 
 * id		If of the menu entry
 */
TaskType.prototype.addSeparatorMenu = function (id) {
	//an empty name is indicating a separator entry
	var m = new MenuEntry(id, '', '', '', '');
	this.menuEntries.push(m);
};

/**
 * Method to add a link menu entry to the task type
 * 
 * id		If of the menu entry
 * name		Name of the menu entry
 * action	Action URL for the menu entry
 * help		Help infomration for the menu entry
 * font		Font indication, bold indicates default menu
 */
TaskType.prototype.addLinkMenu = function (id, name, action, help, font) {
	var m = new MenuEntry(id, name, action, help, font);
	this.linkFromMenuEntries.push(m);
};

/**
 * Method to add a menu separator entry to the link menu
 * 
 * id		If of the menu entry
 */
TaskType.prototype.addLinkSeparatorMenu = function (id) {
	//an empty name is indicating a separator entry
	var m = new MenuEntry(id, '', '', '', '');
	this.linkFromMenuEntries.push(m);
};

/**
 * JavaScript model for the Workflow link type.
 */
function LinkType(id, name, color, loopback, type) {

	//id of the link type
	this.id = id;
	
	//name of the link type
	this.name = name;
	
	//color of the link type
	this.color = color;
	
	//indicator if the link type is a loopback link
	this.loopback = loopback;
	
	//type identifier of the link type
	this.type = type;
}

/**
 * Method to get the link type label
 */
LinkType.prototype.getLabel = function () {
	return this.name;
};

/**
 * Returns true if it is a loopback link
 */
LinkType.prototype.isLoopback = function() {
	return this.loopback;
}

/**
 * JavaScript model for the Workflow task.
 */
function Task(id, name, x, y, type, extraParam, overlay, statusLabel, deleteable, invisible) {
	
	//id of the task in the map
	this.id = id;
	
	//name of the task
	this.name = name;
	
	//x coordinate of the task shape in the map
	this.x = x;
	
	//y coordinate of the task shape in the map
	this.y = y;
	
	//task type reference for the task
	this.type = type;
	
	//task overlay information
	this.overlay = overlay;
	
	//task status information, due date, done date
	this.statusLabel = statusLabel;
	
	//extra parameter value
	this.extraParam = extraParam;
	
	//flag is the task is deleteable
	this.deleteable = deleteable;

	//flag indicating of the task is invisible or not
	this.isInvisible = invisible;
	
	//flag indicating if the task is new or not
	this.isNew = false;
	
	//flag indicating if the task is a duplicate
	this.isDuplicate = false;
	
	//if the task is a duplicate save the original id
	this.duplicateId = 0;
	
	//flag indicating if the task is removed
	this.isRemoved = false;
	
	//flag indicating if the task is moved
	this.isMoved = false;
	
	//flag indicating if the task is marked or not, used for the recursion in the loopback detection 
	this.isMarked = false;
	
	//list of loopback groups to which this task belongs
	this.loopbackGroup = [];
}

/**
 * Method to get the task label
 */
Task.prototype.getLabel = function () {
	
	var label = this.name;
	if((this.type.type == wfTaskTypes.START_TASK) ||
			(this.type.type == wfTaskTypes.EVALUATION_TASK) ||
			(this.type.type == wfTaskTypes.MILESTONE_TASK)) {
		//for the start, evaluation, milestone task the label contains also the status information
		label = this.name + '\n' + this.statusLabel;
	}
	
	return label;
};

/**
 * Method to get the task status label
 */
Task.prototype.getStatusLabel = function () {
	
	var label = this.statusLabel;
	if((this.type.type == wfTaskTypes.START_TASK) ||
		(this.type.type == wfTaskTypes.EVALUATION_TASK) ||
		(this.type.type == wfTaskTypes.MILESTONE_TASK)) {
		//for the start, evaluation, milestone task the label contains the status information, so that it is set to null here
		label = null;
	}
	
	return label;
};

/**
 * Method to mark the task as removed
 */
Task.prototype.remove = function() {
	this.isRemoved = true;
};

/**
 * Method to move the task
 */
Task.prototype.move = function(x, y) {
	if((this.x !== x) || (this.y !== y)) {
		//mark task only as moved if at least one coordinate has changed and make sure we have integer coordinates
		this.x = Math.round(x);
		this.y = Math.round(y);
		this.isMoved = true;
	}
};

/**
 * Mark the task
 */
Task.prototype.mark = function() {
	this.isMarked = true;
};

/**
 * Unmark the task
 */
Task.prototype.unmark = function() {
	this.isMarked = false;
};

/**
 * Check if the task is already in this loopback group
 */
Task.prototype.isInLoopbackGroup = function(loopback) {
	for(var i = 0; i < this.loopbackGroup.length; i++) {
		if(this.loopbackGroup[i].id === loopback.id) {
			return true;
		}
	}
	return false;
}

/**
 * Add task to this loopback group
 */
Task.prototype.addToLoopbackGroup = function(loopback) {
	this.loopbackGroup.push(loopback);
}

/**
 * Gets the loopback groups
 */
Task.prototype.getLoopbackGroups = function() {
	return this.loopbackGroup;
}

/**
 * Removes the loopback from teh loopback group list
 */
Task.prototype.removeFromLoopbackGroups = function(loopback) {
	var newLoopbackGroup = [];
	for(var i = 0; i < this.loopbackGroup.length; i++) {
		if(this.loopbackGroup[i].id !== loopback.id) {
			newLoopbackGroup.push(this.loopbackGroup[i]);
		}
	}
	this.loopbackGroup = newLoopbackGroup;
};

/**
 * JavaScript model for the Workflow link
 */
function Link(id, name, start, end, type) {
	
	//id of the link in the map
	this.id = id;
	
	//name of the link
	this.name = name;
	
	//start task of the link
	this.start = start;
	
	//end task of the link
	this.end = end;
	
	//type of the link
	this.type = type;
	
	//connection points for the link
	this.points = [];
	
	//connection exit constraint
	this.exitConstraint = null;
	
	//connection entry constraint
	this.entryConstraint = null;
	
	//flag indicating if the link is new or not
	this.isNew = false;
	
	//indicates if the link was converted from a different type
	this.convertedFrom = null;
	
	//flag indicating if the link is removed
	this.isRemoved = false;
	
	//flag indicating if the link is moved
	this.isMoved = false;
	
}

/**
 * Method to get the link label
 */
Link.prototype.getLabel = function () {
	return this.name;
};

/**
 * Method to mark the link as removed
 */
Link.prototype.remove = function() {
	this.isRemoved = true;
};

/**
 * Convert the link to a differnt type
 */
Link.prototype.convertTo = function(linkType) {
	if(this.type.id !== linkType.id){
		//only convert the link type if it is different
		this.convertedFrom = this.type.type
		this.type = linkType;		
	}
};

/**
 * Adds a new connection point to the link
 */
Link.prototype.addPoint = function(x, y) {
	this.points.push(new wfPoint(x, y));
};

/**
 * Move the link, which means the connection points are updated.
 * This method checks for changes in the points and marks the link as moved
 */
Link.prototype.move = function(points) {
	var changed = false;
	if((points !== null) && (points.length != this.points.length)) {
		changed = true;
	} else {
		for(var i = 0; i < this.points.length; i++) {
			if((points[i].x !== this.points[i].x) || (points[i].y !== this.points[i].y)) {
				changed = true;
				break;
			}
		}
	}
	
	if (changed) {
		//at least one point changed, replace all points
		this.points = [];
		for(var i = 0; i < points.length; i++) {
			this.points.push( new wfPoint(points[i].x, points[i].y) );
		}
		this.isMoved = true;
	}
};

/**
 * Sets the exit constraint for the link
 */
Link.prototype.setExitConstraint = function(constraint) {
	
	if(this.isConstraintChanged(this.exitConstraint, constraint)) {
		if(constraint.point === null) {
			//no constraint
			this.exitConstraint = null;
		} else {
			this.exitConstraint = new wfConstraint( constraint.point.x, constraint.point.y, constraint.perimeter);
		}
		//this change is treated as a move
		this.isMoved = true;
	}
};

/**
 * Sets the entry constraint for the link
 */
Link.prototype.setEntryConstraint = function(constraint) {

	if(this.isConstraintChanged(this.entryConstraint, constraint)) {
		if(constraint.point === null) {
			//no constraint
			this.entryConstraint = null;
		} else {
			this.entryConstraint = new wfConstraint( constraint.point.x, constraint.point.y, constraint.perimeter);
		}
		//this change is treated as a move
		this.isMoved = true;
	}	
};

/**
 * Checks if the graph constraint is different to the stored link constraint.
 */
Link.prototype.isConstraintChanged = function(linkConstraint, graphConstraint) {
	var changed = false;
	
	if ((linkConstraint === null) && (graphConstraint.point !== null)) {
		changed = true;
	}
	if ((linkConstraint !== null) && (graphConstraint.point === null)) {
		changed = true;
	}
	if ((linkConstraint !== null) && (graphConstraint.point !== null)) {
		if(linkConstraint.perimeter !== graphConstraint.perimeter) {
			changed = true;	
		}
		if((linkConstraint.x !== graphConstraint.point.x) || (linkConstraint.y !== graphConstraint.point.y)) {
			changed = true;
		}
	}
	
	return changed;
};

/**
 * Workflow map object
 */
function Map() {

	//list of tasks
	this.tasks = [];

	//max task id from the server
	this.maxTask = 0;
	
	//list of links
	this.links = [];
	
	//max link id from the server
	this.maxLink = 0;
	
	//title of map
	this.title = '';	
}

/**
 * Add an existing task to the task list
 * id		Id of the task
 * name		Display name of the task
 * x		x coordinate of the task
 * y		y coordinate of the task
 * type		Task type
 * extraParam	Special parameter for the menu actions
 * overlay		Overlay indicator
 * statusLabel	Label containing the task status information, due date, done date
 * deletable	Flag if the task is deletable
 * invisible	Flag if the task is invisible
 */
Map.prototype.addTask = function(id, name, x, y, type, extraParam, overlay, statusLabel, deleteable, invisible) {
	var s = new Task(id, name, x, y, type, extraParam, overlay, statusLabel, deleteable, invisible);
	this.tasks.push(s);
	
	//set the id for the next task, we assume starting by 0 and not empty slots
	this.maxTask = this.tasks.length;
};

/**
 * Add an existing link to the list
 * id		Id of the link
 * name		Display name of the link
 * start	Start task of the link
 * end		End task of the link
 * type		Link type
 * points	Point for the link
 * exitConstraint	Exit constraint for the link
 * entryConstraint	Entry constraint for the link
 */
Map.prototype.addLink = function(id, name, start, end, type, points, exitConstraint, entryConstraint) {
	var l = new Link(id, name, start, end, type);
	
	if((points !== undefined) && (points !== null)) {
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
			l.addPoint(p[0], p[1]);
		}
	}
	
	//set the provided constraint
	if(exitConstraint !== undefined) {
		l.exitConstraint = exitConstraint;	
	}
	if(entryConstraint !== undefined) {
		l.entryConstraint = entryConstraint;	
	}
	
	this.links.push(l);
	
	//set the id for the next link, we assume starting by 0 and not empty slots
	this.maxLink = this.links.length;
};

/**
 * Add a new task to the task list
 * name		Display name of the task
 * x		x coordinate of the task
 * y		y coordinate of the task
 * type		Task type
 */
Map.prototype.addNewTask = function(name, x, y, type) {
	//we assume that the ids are stating at 0 and have no 'empty' slots
	var id = this.tasks.length;
	
	var s = new Task(id, name, x, y, type, '', '', '', true);
	//mark the task as new
	s.isNew = true;
	this.tasks.push(s);
	return s;
};

/**
 * Add a new link to the link list
 * name		Display name of the task
 * source	source task id
 * target	target task id
 * type		Task type
 */
Map.prototype.addNewLink = function(name, source, target, type) {
	//we assume that the ids are stating at 0 and have no 'empty' slots
	var id = this.links.length;

	var l = new Link(id, name, source, target, type);
	//mark the link as new
	l.isNew = true;
	this.links.push(l);
	return l;
};

/**
 * Add a new task to the task list
 * task		Task to be duplicated
 * x		x coordinate of the task
 * y		y coordinate of the task
 */
Map.prototype.duplicateTask = function(task, x, y) {
	//we assume that the ids are stating at 0 and have no 'empty' slots
	var id = this.tasks.length;
	
	var s = new Task(id, task.name, x, y, task.type, task.extraParam, task.overlay, task.statusLabel, task.deleteable);
	
	//mark the task as duplicate
	s.isDuplicate = true;
	//for the duplicate task save the original id for later use
	s.duplicateId = task.id;
	
	this.tasks.push(s);
	return s;
};

/**
 * Gets a list with all outgoing links for the given task id
 */
Map.prototype.getOutgoingLinks = function(taskId){
	
	var outgoing = [];
	for(var i = 0; i < this.links.length; i++) {
		var l = this.links[i];
		
		//is the link still valid
		if((!l.isRemoved) && (l.start == taskId)) {
			outgoing.push(l);
		}
	}
	
	return outgoing;
};

/**
 * Gets a list with all incomming links for the given task id
 */
Map.prototype.getIncommingLinks = function(taskId){
	
	var incomming = [];
	for(var i = 0; i < this.links.length; i++) {
		var l = this.links[i];
		
		//is the link still valid
		if((!l.isRemoved) && (l.end == taskId)) {
			incomming.push(l);
		}
	}
	
	return incomming;
};

/**
 * Get the list with all made map changes.
 * The returned list contains first all task moves, adds, duplicates, then all link adds, converts, then all link removes and finally all task removes
 */
Map.prototype.getChanges = function(deleteTasks) {
	//set the max ids to the server values
    var maxTask = this.maxTask;
    var maxLink = this.maxLink;

    var removes = 0;
    var saveIds = [];

    var delTaskChanges = [];
    var delLinkChanges = [];
    var changes = [];

    //collect all task changes
	var objectType = wfConstants.OBJECT_TASK;
    for(var i = 0; i < this.tasks.length; i++) {
        var t = this.tasks[i];

        saveIds[t.id] = t.id;

        if(t.isNew && !t.isDuplicate && !t.isRemoved){
            //new, no duplicate and not directly removed between this and the last save
            saveIds[t.id] = maxTask; //put it at the end of the task list
            changes.push(new MapChange(saveIds[t.id], t.type.type, t.x, t.y, wfConstants.OPERATION_ADD, objectType));
            maxTask++; //increment the max task count
        } else if(!t.isNew && t.isDuplicate && !t.isRemoved){
            //duplicate
            saveIds[t.id] = maxTask; //put it at the end of the task list
			
			//if the original task is new and deleted, add the new task (the original task is unknown to the server)
			if(this.tasks[t.duplicateId].isNew && this.tasks[t.duplicateId].isRemoved) {
				changes.push(new MapChange(saveIds[t.id], t.type.type, t.x, t.y, wfConstants.OPERATION_ADD, objectType));
			} else {
			    changes.push(new MapChange(saveIds[t.duplicateId], t.type.type, t.x, t.y, wfConstants.OPERATION_DUPLICATE, objectType));
			}
            maxTask++; //increment the max task count
        } else if(!t.isNew && !t.isDuplicate && !t.isRemoved && t.isMoved) {
            //move
			changes.push(new MapChange(saveIds[t.id], t.type.type, t.x, t.y, wfConstants.OPERATION_MOVE, objectType));
        } else if(!t.isNew && !t.isDuplicate && t.isRemoved) {
            //remove, not new so that it is known on the server side
            saveIds[t.id] = saveIds[t.id] - removes;
			delTaskChanges.push(new MapChange(saveIds[t.id], '', 0, 0, wfConstants.OPERATION_DELETE, objectType));
			
			//in the case of modify route the tasks are not delete, do not change the index.
			if(deleteTasks){
				removes++;	
			}            
        }
    }

    //collect all link changes, as the deletes are done first, decrement all ids by the count of done removes at this point
    removes = 0;
	objectType = wfConstants.OBJECT_LINK;
    for(var i = 0; i < this.links.length; i++) {
       var l = this.links[i];

        if(l.isNew && !l.isRemoved) {
            //new, not directly removed between this save and the last save
		    var linkType = l.type.type;

			//map the start and end id to new task ids, this is necessary because new tasks can be removed and these tasks are unknown on the server
		    changes.push(new MapChange(maxLink - removes, linkType, saveIds[l.start], saveIds[l.end], wfConstants.OPERATION_ADD, objectType));
            
            if(l.isMoved) {
            	//add a move change, after the add change
            	changes.push(new GeometryChange(maxLink - removes, l.points, wfConstants.OPERATION_MOVE, objectType));
            	changes.push(new ConstraintChange(maxLink - removes, l.exitConstraint, l.entryConstraint, wfConstants.OPERATION_DOCK, objectType));
            }
            maxLink++;
        } else if(!l.isNew && !l.isRemoved && l.convertedFrom !== null && l.convertedFrom !== l.type.type) {
            //converted
		    changes.push(new MapChange(l.id  - removes, l.type.type, 0, 0, wfConstants.OPERATION_CONVERT, objectType));
		    
            if(l.isMoved) {
            	//add a move change
            	changes.push(new GeometryChange(l.id  - removes, l.points, wfConstants.OPERATION_MOVE, objectType));
            	changes.push(new ConstraintChange(l.id - removes, l.exitConstraint, l.entryConstraint, wfConstants.OPERATION_DOCK, objectType));
            }		    
        } else if(!l.isNew && l.isRemoved) {
            //remove, and not new which would mean the link was created and directly removed without being sent to the server
		    delLinkChanges.push(new MapChange(l.id - removes, '', 0, 0, wfConstants.OPERATION_DELETE, objectType));           
            removes++;
        } else  if(l.isMoved && !l.isRemoved) {
        		//add a move change
        		changes.push(new GeometryChange(l.id  - removes, l.points, wfConstants.OPERATION_MOVE, objectType));
        		changes.push(new ConstraintChange(l.id - removes, l.exitConstraint, l.entryConstraint, wfConstants.OPERATION_DOCK, objectType));
        }
    }

	//create list with changes, first all link removes, then all task add and move, then all link add and convert and at the end all task removes
   return delLinkChanges.concat(changes, delTaskChanges);
};

/**
 * Apply all changes to the map, so that the map represents the server side model.
 * This is necessary for the map verify call, where the map is sent only sent 
 * to the server but not fresh loaded from the server.
 */
Map.prototype.applyChanges = function(model) {
	var newTasks = [];
	var nextTaskId = 0;
	var newLinks = [];
	var nextLinkId = 0;
	
	var taskIds = [];
	
	//collect all still existing tasks in the new array
	for(var i = 0; i < this.tasks.length; i++ ) {
		var t = this.tasks[i];

		if(!t.isRemoved) {
			//task is still valid, reset it and add it to the newTasks list
			t.isNew = false;
			t.isMoved = false;
			t.isRemoved = false;
			t.isDuplicate = false;
			t.duplicateId = -1;
			
			//save the current id, set the new id and add the task to the new list
			taskIds[t.id] = nextTaskId;
			t.id = nextTaskId;
			newTasks[nextTaskId] = t;
			nextTaskId++;
		}
	}

	//collect all still existing links in the new array
	for(var i = 0; i < this.links.length; i++) {
		var l = this.links[i];
		
		if(!l.isRemoved) {
			//link is still valid, reset id and add to the newLinks list
			l.isNew = false;
			l.isRemoved = false;
			l.isMoved = false;
			l.convertedFrom = null;
			
			//map the start and end id to the task ids
			l.start = taskIds[l.start];
			l.end = taskIds[l.end];
			
			//give the link a new id, add it to the list and increment the id
			l.id = nextLinkId;
			newLinks[nextLinkId] = l;
			nextLinkId++;
		}
	}
	//exchange the current lists with the new ones
	this.tasks = newTasks;
	this.maxkTask = this.tasks.length;
	
	this.links = newLinks;
	this.maxLink = this.links.length;
};



/**
 * Object stores one change in the map
 */
function MapChange(id, type, x, y, action, object){
	//id of the changed object
	this.id = id;
	
	//object type
	this.type = type;
	
	//new x coordination
	this.x = x;
	
	//new y coordination
	this.y = y;
	
	//change action
	this.action = action;
	
	//the object type
	this.object = object;
}

/**
 * Converts the change to the command string which is sent to the server
 * 
 * 0.	no operation (never used).
 * 1.	add			--	Adds a given task or link.
 * 2.	move		--	Moves a given task to a different x,y position.
 * 3.	delete		--	Deletes a given task or link.
 * 4.   convert		--  Converts a link to a (not necessarily) different type.
 * 5.	duplicate	--  Duplicates a task and its appertaining data.
 * 
 * Necessary information for each of these operations is the operation
 * type, task/link involved and its index (which is vital on the server
 * side of things).	Since this operation manager exists primarily for
 * allowing operations to be logged for later transfer over a network,
 * string serialization of operations is defined.	The currently 
 * specification for this is the following (where "|" is the delimiter):
 * 
 * General information:
 * 
 * Operations are in the form of:
 * 
 *     operation_type|data_type_of_object|index_of_object[|other]
 * 
 *     operation_types are one of the following strings:
 * 
 *         nop  add  move  delete  convert
 * 
 *     data_types are one of the following:
 * 
 *         task  link
 * 
 *     all indexes are positive integers, in the range of [0..n-1] for n types.
 * 
 *     all x,y positions for tasks are positive integers given as ...|x|y
 *     (This is a Wide Client limitation).
 * 
 * Specific operations:
 *
 *	There are 7 operations defined as follows:
 *
 *		add|task|idx|sig|x|y
 *
 *			add:     the string "add".
 *			task:    the string "task".
 *			idx:     the +integer index of the task after it is added.
 *			sig:     the string signature of the task type of this task (ie "1_101" for User).
 *			x:       the +int x coordinate of the task.
 *			y:       the +int y coordinate of the task.
 *
 *		move|task|idx|x|y
 *
 *			move:    the string "move".
 *			task:    the string "task".
 *			idx:     the +integer index of the task to be moved.
 *			x:       the +int new x coordinate of the task.
 *			y:       the +int new y coordinate of the task.
 *
 *		delete|task|idx
 *
 *			delete:  the string "delete".
 *			task:    the string "task".
 *			idx:     the +integer index of the task to be deleted.
 *
 *		duplicate|task|idx|x|y
 *
 *			duplicate:	the string "duplicate".
 *			task:		the string "task".
 *			idx:		the +integer index of the task to be duplicated.
 *			x:			the +int new x coordinate of the duplicate task.
 *			y:			the +int new y coordinate of the duplicate task.
 *
 *		add|link|idx|name|from_task|to_task
 *
 *			add:     the string "add".
 *			link:    the string "link".
 *			idx:     the +integer index of the link after it is added.
 *			name:    the string name of the link type of this link (ie "True").
 *			fromtask:the +int index of the task this link links from.
 *			totask:  the +int index of the task this link links to.
 *
 *		delete|link|idx
 *
 *			delete:  the string "delete".
 *			link:    the string "link".
 *			idx:     the +integer index of the link to be deleted.
 *
 *		convert|link|idx|name
 *
 *			convert: the string "convert".
 *			link:    the string "link".
 *			idx:     the +integer index of the link whose type will be converted.
 *			name:    the name of the type this link is to be converted to.
 *
 */
MapChange.prototype.toCommandStr = function() {
	var cmdStr = '';
	
	switch(this.action){
		case wfConstants.OPERATION_ADD:
			cmdStr += wfConstants.OPERATION_ADD;
			cmdStr += '|';
			cmdStr += this.object;
			cmdStr += '|';
			cmdStr += this.id;
			cmdStr += '|';
			cmdStr += this.type;
			cmdStr += '|';
			cmdStr += Math.round(this.x);
			cmdStr += '|';
			cmdStr += Math.round(this.y);
			break;
		case wfConstants.OPERATION_MOVE:
			cmdStr += wfConstants.OPERATION_MOVE;
			cmdStr += '|';
			cmdStr += this.object;
			cmdStr += '|';
			cmdStr += this.id;
			cmdStr += '|';
			cmdStr += Math.round(this.x);
			cmdStr += '|';
			cmdStr += Math.round(this.y);
			break;
		case wfConstants.OPERATION_DELETE:
			cmdStr += wfConstants.OPERATION_DELETE;
			cmdStr += '|';
			cmdStr += this.object;
			cmdStr += '|';
			cmdStr += this.id;
			break;
		case wfConstants.OPERATION_DUPLICATE:
			cmdStr += wfConstants.OPERATION_DUPLICATE;
			cmdStr += '|';
			cmdStr += this.object;
			cmdStr += '|';
			cmdStr += this.id;
			cmdStr += '|';
			cmdStr += Math.round(this.x);
			cmdStr += '|';
			cmdStr += Math.round(this.y);			
			break;
		case wfConstants.OPERATION_CONVERT:
			cmdStr += wfConstants.OPERATION_CONVERT;
			cmdStr += '|';
			cmdStr += this.object;
			cmdStr += '|';
			cmdStr += this.id;
			cmdStr += '|';
			cmdStr += this.type;
			break;									
	}
	
	return cmdStr;
};

/**
 * Object store on geometry change in the map
 */
function GeometryChange(id, points, action, object) {
	//id of the changed object
	this.id = id;
	
	//list of points
	this.points = points;
	
	//change action
	this.action = action;
	
	//the object type
	this.object = object;	
}

/**
 * Converts the geometry change to the command string which is sent to the server
 * 
 * General information:
 * 
 * Operations are in the form of:
 * 
 *     operation_type|data_type_of_object|index_of_object[|other]
 * 
 *     operation_types are one of the following strings:
 * 
 *         nop  add  move  delete  convert dock
 * 
 *     data_types are one of the following:
 * 
 *         task  link
 * 
 *     all indexes are positive integers, in the range of [0..n-1] for n types.
 * 
 *     all x,y positions for tasks are positive integers given as ...|x|y
 *     (This is a Wide Client limitation).
 * 
 * Specific operations:
 *
 *	There are 1 operation defined as follows:
 *
 *		move|link|idx|x1|y1|x2|y2|...|xn|yn
 *
 *			move:    the string "move".
 *			link:    the string "link".
 *			idx:     the +integer index of the link to be moved.
 *			x1:       the +int x coordinate of the first connection point.
 *			y1:       the +int y coordinate of the first connection point.
 *			x2:       the +int x coordinate of the second connection point.
 *			y2:       the +int y coordinate of the second connection point.
 *			xn:       the +int x coordinate of the n th connection point.
 *			yn:       the +int y coordinate of the n th connection point.
 *
 */
GeometryChange.prototype.toCommandStr = function() {
	var cmdStr = '';
	
	switch(this.action){
		case wfConstants.OPERATION_MOVE:
			cmdStr += wfConstants.OPERATION_MOVE;
			cmdStr += '|';
			cmdStr += this.object;
			cmdStr += '|';
			cmdStr += this.id;
			
			for(var i = 0; i < this.points.length; i++){
				var p = this.points[i];
				cmdStr += '|';
				cmdStr += Math.round(p.x);
				cmdStr += '|';
				cmdStr += Math.round(p.y);
			}
			break;
	}
	
	return cmdStr;
};

/**
 * Object store on constraint change in the map
 */
function ConstraintChange(id, exitConstraint, entryConstraint, action, object) {
	//id of the changed object
	this.id = id;
	
	//exit constraint
	this.exitConstraint = exitConstraint;
	
	//entry constraint
	this.entryConstraint = entryConstraint;
	
	//change action
	this.action = action;
	
	//the object type
	this.object = object;	
}

/**
 * Converts the constraint change to the command string which is sent to the server
 * 
 * General information:
 * 
 * Operations are in the form of:
 * 
 *     operation_type|data_type_of_object|index_of_object[|other]
 * 
 *     operation_types are one of the following strings:
 * 
 *         nop  add  move  delete  convert dock
 * 
 *     data_types are one of the following:
 * 
 *         task  link
 * 
 *     all indexes are positive integers, in the range of [0..n-1] for n types.
 * 
 *     all x,y positions for tasks are positive integers given as ...|x|y
 *     (This is a Wide Client limitation).
 * 
 * Specific operations:
 *
 *	There are 1 operation defined as follows:
 *
 *		dock|link|idx|exitX|exitY|exitPerimeter|entryX|entryY|entryPerimeter
 *
 *			dock: the string "dock".
 *			link:    the string "link".
 *			idx:     the +integer index of the link whose type will be converted.
 *			exitX:   the +real x coordinate of the link exit constraint.                             
 *          exitY:   the +real y coordinate of the link exit constraint.
 *          exitPerimeter: the perimeter flag of the link entry constraint.
 *			entryX:   the +real x coordinate of the link entry constraint.                             
 *          entryY:   the +real y coordinate of the link entry constraint.
 *          entryPerimeter: the perimeter flag of the link entry constraint.
 *
 */
ConstraintChange.prototype.toCommandStr = function() {
	var cmdStr = '';
	
	switch(this.action){
		case wfConstants.OPERATION_DOCK:
			cmdStr += wfConstants.OPERATION_DOCK;
			cmdStr += '|';
			cmdStr += this.object;
			cmdStr += '|';
			cmdStr += this.id;
			
			//exit constraint
			var exitConstraint = this.exitConstraint;
			if((exitConstraint === undefined) || (exitConstraint === null)) {
				//create a constraint object with remove vlaues
				exitConstraint = new wfConstraint(-1, -1, false);
			}
			cmdStr += '|';
			cmdStr += exitConstraint.x;
			cmdStr += '|';
			cmdStr += exitConstraint.y;
			cmdStr += '|';
			cmdStr += exitConstraint.perimeter ? 1 : 0;
			
			//entry constraint
			var entryConstraint = this.entryConstraint;
			if((entryConstraint === undefined) || (entryConstraint === null)) {
				//create a constraint object with remove vlaues
				entryConstraint = new wfConstraint(-1, -1, false);
			}
			
			cmdStr += '|';
			cmdStr += entryConstraint.x;
			cmdStr += '|';
			cmdStr += entryConstraint.y;
			cmdStr += '|';
			cmdStr += entryConstraint.perimeter ? 1 : 0;
			
			break;
	}
	
	return cmdStr;
};
