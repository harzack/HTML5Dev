function getImageString( selectOption, location ) 
{
	var i;
	var retVal = '';

	switch( location ) 
	{
		case 'top':
			for ( i = 0; i < topKeys.length; i++ ) 
			{
				if ( selectOption.value == topKeys[i] ) 
				{
					retVal = topImages[i];
					break;
				}
			}
			break;
		case 'centre':
			for ( i = 0; i < centreKeys.length; i++ ) 
			{
				if ( selectOption.value == centreKeys[i] ) 
				{
					retVal = centreImages[i];
					break;
				}
			}
			break;
		case 'result':
			for ( i = 0; i < resultKeys.length; i++ ) 
			{
				if ( selectOption.value == resultKeys[i] ) 
				{
					retVal = resultImages[i];
					break;
				}
			}
			
			break;
		case 'bottom':
			for ( i = 0; i < bottomKeys.length; i++ ) 
			{
				if ( selectOption.value == bottomKeys[i] ) 
				{
					retVal = bottomImages[i];
					break;
				}
			}
			break;	
	}

	return retVal;
}

// A function which will populate the picklists according to the options defined
// by a given result configuration.  configID identifies the configuration to be
// used for this task.
function setupConfiguration( configID, resetCurrent ) {

	if ( resetCurrent == undefined )
	{
		resetCurrent = false;
	}

	// When loading page, set dropdown to have proper value selected
	if ( resetCurrent )
	{
		var styleSelect = document.getElementById( 'selectedResultMotif' );
		
		// Reset style menu on warm reloads (Mozilla) - Display Options only
		if ( configID == 'Current' )
		{
			styleSelect.selectedIndex = 0;
		}
		else
		{
			styleSelect.value = configID;
		}
	}

	// Get all of the required pick list components to operate on.
	var topDisplayed = document.getElementById('selectedTop');
	var topAvailable = document.getElementById('availableTop');
	var leftDisplayed = document.getElementById('selectedLeft');
	var rightDisplayed = document.getElementById('selectedRight');
	var centreAvailable = document.getElementById('availableMiddle');
	var bottomDisplayed = document.getElementById('selectedBottom');
	var bottomAvailable = document.getElementById('availableBottom');
	var resultSelect = document.getElementById('selectedResult');

	// If configId is -2 ($WEBSBROKER.fPreferredStyleId) then use "Current" (variable names can't have '-' in them)
	if ( configID == '-2' )
	{
		configID = 'Current';
	}

	// Get the option ID arrays specific to this config ID
	var layoutTop = eval('layoutTop' + configID);
	var layoutLeft = eval('layoutLeft' + configID);
	var layoutRight = eval('layoutRight' + configID);
	var layoutBottom = eval('layoutBottom' + configID);
	var layoutResult = eval('layoutResult' + configID);

	// Populate each picklist set
	populateLists(topDisplayed, topAvailable, layoutTop, topOptions);
	populateCentreLists(leftDisplayed, rightDisplayed, centreAvailable, layoutLeft, layoutRight, centreOptions);
	populateLists(bottomDisplayed, bottomAvailable, layoutBottom, bottomOptions);

	// Set the appropriate selected result if this is not a page load/reload
	if( !resetCurrent )
	{
		resultSelect.selectedIndex = layoutResult;
	}
}

// Populates the provided displayed/available pair of picklists
function populateLists(displayList, availableList, displayedIndeces, optionsList) {
	// Configure an array representing the indeces which will remain in the avilable list
	var stillAvailable = new Array(optionsList.length);
	var availableSize = optionsList.length - displayedIndeces.length;

	// Clear pickLists
	while(displayList.length > 0)
	{
		displayList.options[displayList.length - 1] = null;
	}

	while(availableList.length > 0)
	{
		availableList.options[availableList.length - 1] = null;
	}

	for(var i = 0; i < optionsList.length; i++)
	{
		stillAvailable[i] = true;
	}

	displayList.length = displayedIndeces.length;
	availableList.length = availableSize;

	// Repopulate the display list options array
	for(i = 0; i < displayedIndeces.length; i++) {
		displayList.options[i] = optionsList[displayedIndeces[i]];
		stillAvailable[displayedIndeces[i]] = false;
	}

	var currentIndex = 0;

	// Repopulate what's left in the available list
	for(i = 0; i < optionsList.length; i++) {
		if(stillAvailable[i]) {
			// This component is still available, so put it in the available list
			availableList.options[currentIndex] = optionsList[i];
			currentIndex++;
		}
	}
}

// Populates the centre picklists (since they are somewhat of a special case)
function populateCentreLists(leftList, rightList, availableList, displayedLeft, displayedRight, optionsList) {
	// Configure an array representing the indeces which will remain in the available list
	var stillAvailable = new Array(optionsList.length);
	var availableSize = optionsList.length - displayedLeft.length - displayedRight.length;

	for(var i = 0; i < optionsList.length; i++)
	{
		stillAvailable[i] = true;
	}

	// Clear the existing lists
	while(leftList.length > 0)
	{
		leftList.options[leftList.length - 1] = null;
	}

	while(rightList.length > 0)
	{
		rightList.options[rightList.length - 1] = null;
	}

	while(availableList.length > 0)
	{
		availableList.options[availableList.length - 1] = null;
	}

	leftList.length = displayedLeft.length;
	rightList.length = displayedRight.length;
	availableList.length = availableSize;

	// Repopulate the left display list array
	for(i = 0; i < displayedLeft.length; i++) {
		leftList.options[i] = optionsList[displayedLeft[i]];
		stillAvailable[displayedLeft[i]] = false;
	}

	// Repopulate the right display list array
	for(i = 0; i < displayedRight.length; i++) {
		rightList.options[i] = optionsList[displayedRight[i]];
		stillAvailable[displayedRight[i]] = false;
	}

	var currentIndex = 0;

	// Repopulate what's left in the avilable list
	for(i = 0; i < optionsList.length; i++) {
		if(stillAvailable[i]) {
			// This component is still available, so put it in the avilable list
			availableList.options[currentIndex] = optionsList[i];
			currentIndex++;
		}
	}
}

function drawPreview() {
	var currentSelect = document.getElementById('selectedTop');
	var id = '';
	var imgName = '';

	// Return early if display component arrays not defined
	if ( ( currentSelect == null ) || ( topKeys == null ) || ( centreKeys == null ) || ( bottomKeys == null ) )
	{
		return;
	}

	// Draw top components
	for(var i = 0; i < topKeys.length; i++) {
	
		if(i < currentSelect.length) {
			// Draw the elements in order in the appropriate img tags
			id = 'topimg' + i;
			imgName = getImageString(currentSelect.options[i], 'top');
			document.getElementById(id).src = imgName;
			id = 'top' + i;
			document.getElementById(id).style.display = "block";
		} else {
			id = 'top' + i;
			document.getElementById(id).style.display = "none";
		}
	}

	// Decide on how to draw the centre component
	var leftSelect = document.getElementById('selectedLeft');
	var rightSelect = document.getElementById('selectedRight');
	var resultSelect = document.getElementById('selectedResult');

	if(leftSelect.length > 0 && rightSelect.length > 0) {
		// Need a right and a left pane
		currentSelect = leftSelect;

		// Draw left components
		for(i = 0; i < centreKeys.length; i++) {
			if(i < currentSelect.length) {
				// Draw the elements in order in the appropriate img tags
				id = 'leftpartimg' + i;
				imgName = getImageString(currentSelect.options[i], 'centre');
				document.getElementById(id).src = imgName;
				id = 'leftpart' + i;
				document.getElementById(id).style.display = "block";
			} else {
				id = 'leftpart' + i;
				document.getElementById(id).style.display = "none";
			}

			// Hide other left components
			id = 'leftfull' + i;
			document.getElementById(id).style.display = "none";
		}

		// Draw the result component
		imgName = getImageString(resultSelect.options[resultSelect.selectedIndex], 'result');
		id = 'resultpartimg';
		document.getElementById(id).src = imgName;
		id = 'resultpart';
		document.getElementById(id).style.display = "block";

		// Hide other result components
		id = 'resultfull';
		document.getElementById(id).style.display = "none";
		id = 'resultonly';
		document.getElementById(id).style.display = "none";
		id = 'resultfullleft';
		document.getElementById(id).style.display = "none";

		currentSelect = rightSelect;

		// Draw right components
		for(i = 0; i < centreKeys.length; i++) {
			if(i < currentSelect.length) {
				// Draw the elements in order in the appropriate img tags
				id = 'rightpartimg' + i;
				imgName = getImageString(currentSelect.options[i], 'centre');
				document.getElementById(id).src = imgName;
				id = 'rightpart' + i;
				document.getElementById(id).style.display = "block";
			} else {
				id = 'rightpart' + i;
				document.getElementById(id).style.display = "none";
			}

			// Hide other right components
			id = 'rightfullleft' + i;
			document.getElementById(id).style.display = "none";
		}
	} else if(leftSelect.length > 0) {
		// Only need a left pane
		currentSelect = leftSelect;

		for(i = 0; i < centreKeys.length; i++) {
			if(i < currentSelect.length) {
				// Draw the elements in order in the appropriate img tags
				id = 'leftfullimg' + i;
				imgName = getImageString(currentSelect.options[i], 'centre');
				document.getElementById(id).src = imgName;
				id = 'leftfull' + i;
				document.getElementById(id).style.display = "block";
			} else {
				id = 'leftfull' + i;
				document.getElementById(id).style.display = "none";
			}

			// Hide other left components
			id = 'leftpart' + i;
			document.getElementById(id).style.display = "none";
		}

		// Hide all right components
		for(i = 0; i < centreKeys.length; i++) {
			id = 'rightpart' + i;
			document.getElementById(id).style.display = "none";
			id = 'rightfullleft' + i;
			document.getElementById(id).style.display = "none";
		}

		// Draw the result component
		imgName = getImageString(resultSelect.options[resultSelect.selectedIndex], 'result');
		id = 'resultfullimg';
		document.getElementById(id).src = imgName;
		id = 'resultfull';
		document.getElementById(id).style.display = "block";

		// Hide other result components
		id = 'resultpart';
		document.getElementById(id).style.display = "none";
		id = 'resultonly';
		document.getElementById(id).style.display = "none";
		id = 'resultfullleft';
		document.getElementById(id).style.display = "none";
	} else if(rightSelect.length > 0) {
		// Only need a right pane
		currentSelect = rightSelect;

		for(i = 0; i < centreKeys.length; i++) {
			if(i < currentSelect.length) {
				// Draw the elements in order in the appropriate img tags
				id = 'rightfullleftimg' + i;
				imgName = getImageString(currentSelect.options[i], 'centre');
				document.getElementById(id).src = imgName;
				id = 'rightfullleft' + i;
				document.getElementById(id).style.display = "block";
			} else {
				id = 'rightfullleft' + i;
				document.getElementById(id).style.display = "none";
			}

			// Hide other right components
			id = 'rightpart' + i;
			document.getElementById(id).style.display = "none";
		}

		// Hide all left components
		for(i = 0; i < centreKeys.length; i++) {
			id = 'leftfull' + i;
			document.getElementById(id).style.display = "none";
			id = 'leftpart' + i;
			document.getElementById(id).style.display = "none";
		}

		// Draw the result component
		imgName = getImageString(resultSelect.options[resultSelect.selectedIndex], 'result');
		id = 'resultfullleftimg';
		document.getElementById(id).src = imgName;
		id = 'resultfullleft';
		document.getElementById(id).style.display = "block";

		// Hide other result components
		id = 'resultpart';
		document.getElementById(id).style.display = "none";
		id = 'resultonly';
		document.getElementById(id).style.display = "none";
		id = 'resultfull';
		document.getElementById(id).style.display = "none";
	} else {
		// Don't need a right or left component, so just hide them

		// Hide all left components
		for( i = 0; i < centreKeys.length; i++) {
			id = 'leftfull' + i;
			document.getElementById(id).style.display = "none";
			id = 'leftpart' + i;
			document.getElementById(id).style.display = "none";
		}

		// Hide all right components
		for(i = 0; i < centreKeys.length; i++) {
			id = 'rightpart' + i;
			document.getElementById(id).style.display = "none";
			id = 'rightfullleft' + i;
			document.getElementById(id).style.display = "none";
		}

		// Draw the result component
		imgName = getImageString(resultSelect.options[resultSelect.selectedIndex], 'result');
		id = 'resultonlyimg';
		document.getElementById(id).src = imgName;
		id = 'resultonly';
		document.getElementById(id).style.display = "block";

		// Hide other result components
		id = 'resultpart';
		document.getElementById(id).style.display = "none";
		id = 'resultfullleft';
		document.getElementById(id).style.display = "none";
		id = 'resultfull';
		document.getElementById(id).style.display = "none";
	}

	currentSelect = document.getElementById('selectedBottom');

	// Draw bottom components
	for(i = 0; i < bottomKeys.length; i++) {
		if(i < currentSelect.length) {
			// Draw the elements in order in the appropriate img tags
			id = 'bottomimg' + i;
			imgName = getImageString(currentSelect.options[i], 'bottom');
			document.getElementById(id).src = imgName;
			id = 'bottom' + i;
			document.getElementById(id).style.display = "block";
		} else {
			id = 'bottom' + i;
			document.getElementById(id).style.display = "none";
		}
	}

	var regionOrderControls = document.getElementById('selectedRegionOrderControls');

	if ( regionOrderControls != null )
	{
		// Enable displayed result field order controls for Columnar style
		if ( ( resultSelect.value == '{1200}' ) )
		{
			regionOrderControls.style.display = 'inline';
		}
		else
		{
			regionOrderControls.style.display = 'none';
		}
	}
}

function moveElementsByName( fboxName, tboxName, sortedName  ) 
{
	var fbox = eval( "self.window.document.DO." + fboxName );
	var tbox = eval( "self.window.document.DO." + tboxName );
	var sorted = eval( "self.window.document.DO." + sortedName );

	moveElements( fbox, tbox, sorted );
}

function moveElements( fbox, tbox, sorted ) 
{
	var 	arrFbox = new Array();
	var 	arrTbox = new Array();
	var 	i;
	
	var	fLength = 0;
	var	tLength = 0;
	
	if ( fbox.selectedIndex == -1 )
	{
		return;
	}
	
	// Build intermediate to menu
	for ( i=0; i<tbox.options.length; i++ ) 
	{
		var no = new Option( tbox.options[i].text, tbox.options[i].value, false, false );
		arrTbox[ tLength ] = no;
		tLength++;
	}
	 
	// Move selected elements in from menu into to menu, build intermediate from menu
	for ( i=0; i < fbox.options.length; i++ ) 
	{
		if ( fbox.options[i].selected && fbox.options[i].value != "" )
		{
			// Append to to menu
			var no = new Option( fbox.options[i].text, fbox.options[i].value, false, false );
			arrTbox[ tLength ] = no;
			tLength++;
		} 
		else
		{
			var no = new Option( fbox.options[i].text, fbox.options[i].value, false, false );
			arrFbox[ fLength ] = no;
			fLength++;
		}
	}
	
	// Sort intermediate menu based on option text (if desired)
	if ( sorted == fbox )
	{
		arrFbox.sort( compareText );
	}
	
	if ( sorted == tbox )
	{
		arrTbox.sort( compareText );
	}

	// Rebuild from and to menus using intermediates
	fbox.length = 0;
	tbox.length = 0;
	
	for ( i=0; i<arrFbox.length; i++ )
	{
		fbox[i] = arrFbox[i];
	}
	
	for ( i=0; i<arrTbox.length; i++ )
	{
		tbox[i] = arrTbox[i];
	}

	 drawPreview();
}

function compareText( a, b )
{
	var		textA = a.text.toLowerCase();
	var		textB = b.text.toLowerCase();
	if ( textA < textB ) 
	{
		return -1;
	}
	if ( textA > textB )
	{
		return 1;
	}
	return 0;
}

function moveSelectedByName(selectName, down) {
	var select = eval( "self.window.document.DO." + selectName );
	moveSelected( select, down );
}

function moveSelected(select, down) {
	var 	x;

	if (select.selectedIndex == -1)
	{
		return;
	}

	if (down) {
		for(i=select.options.length-1;i>=0;i--){
			if(select.options[i].selected){
				if(i !=(select.options.length-1) && ! select.options[i+1].selected){
					swapOptions(select,i,i+1);
					select.options[i+1].selected = true;
				}
			}
		}
	}
	else {
		for(i=0;i<select.options.length;i++){
			if(select.options[i].selected){
				if(i != 0 && !select.options[i-1].selected){
					swapOptions(select,i,i-1);select.options[i-1].selected = true;
				}
			}
		}
	}

	drawPreview();
}

function swapOptions(select,i,j){
	var o = select.options;
	var i_selected = o[i].selected;
	var j_selected = o[j].selected;
	var temp = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
	var temp2= new Option(o[j].text, o[j].value, o[j].defaultSelected, o[j].selected);
	o[i] = temp2;
	o[j] = temp;
	o[i].selected = j_selected;
	o[j].selected = i_selected;
}

function selectAll(box) {
	var i;
	 for( i = 0; i<box.length; i++) {
		 box[i].selected = true;
	 }
}

function pageOptions( nameStr, mStr, lStr )
{
	var canSee;

	if ( IE != null )
	{
		canSee = 'block';
	}
	else
	{
		canSee = 'table-row';
	}

	theLayer0 = document.getElementById( nameStr + "0" );
	theLayer1 = document.getElementById( nameStr + "1" );
	theLayer2 = document.getElementById( nameStr + "2" );
	theLayer3 = document.getElementById( nameStr + "3" );
	theLayer4 = document.getElementById( nameStr + "4" );
	theLayer5 = document.getElementById( nameStr + "5" );

	theButton = document.getElementById( nameStr + "Button" );

	if ( theLayer1.style.display=='none' )
	{
		theLayer0.style.display=canSee;
		theLayer1.style.display=canSee;
		theLayer2.style.display=canSee;
		theLayer3.style.display=canSee;
		theLayer4.style.display=canSee;
		theLayer5.style.display=canSee;
		theButton.value = '<< ' + lStr;
		theButton.name = lStr;
		theButton.title = lStr;
	}
	else
	{
		theLayer0.style.display='none';
		theLayer1.style.display='none';
		theLayer2.style.display='none';
		theLayer3.style.display='none';
		theLayer4.style.display='none';
		theLayer5.style.display='none';
		theButton.value = mStr + ' >>';
		theButton.name = mStr;
		theButton.title = mStr;
	}
}
