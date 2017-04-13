/*	Title: Browse.js (from browse_cs10.js)- Page browsing utilities
	Version: 3.5
	Modified: 25th September 2013.
	- Add ability to handle alternative sort parameter values (setupContext, setColumn)
	- Add ability to use legacy sort (for activeView)
		- Stephen Yoo (Feb. 13, 2009)
	- The help page for this file can be found at WebReports > Advanced Information > Browse Function Reference
	- If any of the functions change the help page may need to be updated. The file for the help page is wr_browse_functions.html
	- Added support for WebReports Communities of Practice module in setColumn and setColumnPost functions (July 27, 2010)
	- Created a setColumnMaster function to combine the commonalities of the setColumn and setColumnPost functions. Added CS10 fix for GP. (SY - Aug 10, 2010)
	- Added support for changes to the webnode module in CS10 Update 7.
		- Added AJAX functions to handle sorting, paging, filtering requests. (JG - September 25th, 2013)
		- Requires jQuery for some functionality.
*/

$(document).ready(function() {
	// Hilight the promoted commands when you hover over the table row in the browse view
	var hoverHandler = function(){ $(this).addClass("browseRowHover"); };
	var unhoverHandler = function(){ $(this).removeClass("browseRowHover"); };

	$(".browseRow1").hover( hoverHandler, unhoverHandler);
	$(".browseRow2").hover( hoverHandler, unhoverHandler);

});

var c;

function doSubmit( s, action ){
	len = document.BrowseViewFrm.elements.length
	var cnt = 0, j;
	for(var i= 0;i<len;i++){
		if ( document.BrowseViewFrm.elements[ i ].checked && document.BrowseViewFrm.elements[ i ].value != 'checkbox' ){
			cnt++;
			j = i;
			if ( cnt > 1 ){
				break;
			}
		}
	}
	if ( cnt != 0 ){
		if ( cnt > 1 ){
			if ( action == "delete" && !confirm( "Delete these objects?" ) ){
				return false
			}else{
				document.BrowseViewFrm.func.value = s;
			}
			document.BrowseViewFrm.submit();
		}else{
			if ( action == "delete" && !confirm( "Delete this object?" ) ){
				return false
			}else{
				document.BrowseViewFrm.func.value = "ll";
				document.BrowseViewFrm.objAction.value = action;
				document.BrowseViewFrm.objId.value = document.BrowseViewFrm.elements[ j ].value
			}
			document.BrowseViewFrm.submit();
		}	
	}else{
		alert( "Please Select at least one item." );
	}
}



function doSubmit2( action, type ){
	if( action == "Edit" ){
		document.BrowseViewFrm.objAction.value = "editconfig";
		document.BrowseViewFrm.nextUrl.value =  document.BrowseViewFrm.nextUrl.value + "&viewType=" +  "1";
	}else{
		document.BrowseViewFrm.objAction.value = "browse";
	}
	document.BrowseViewFrm.func.value = "ll";
	document.BrowseViewFrm.viewType.value = type;
	document.BrowseViewFrm.objId.value = 2000;
	document.BrowseViewFrm.submit();
}


// Variables set by the setupContext which must be available in order to use subsequent functions
var supportDir;
var urlPrefix;
var myURL;
var nextURL;
var sortCol;
var sortDir;
var colNo = 0;
var filters = '';
var formName = 'BrowseViewFrm';
var styleType;


function setFilter(name,value){
	if (value != undefined) {
		filters += '&' + name + '=' + value;
	} 
}


function setupContext(support_Dir,url_Prefix,my_URL,next_URL,def_SortCol,sort_Dir,form_name,style_Type) {
	supportDir = support_Dir;
	urlPrefix = url_Prefix;
	myURL = my_URL;
	nextURL = next_URL;
	sortCol = def_SortCol;
	sortDir = sort_Dir;
	var found = false;
	var colStr,c;
	
	// if sortCol is an array, we cycle through the array items in order to find the first one that is not blank
	if ((sortCol != undefined) && (typeof(sortCol) == 'object')) {
	// We have a JSON array
		for (c=0; c < sortCol.length; c++) {
			colStr = sortCol[c];
			if (colStr != "") {
				sortCol = colStr;
				found = true;
			}
			if (found) { break;};
		}
		if (!found) {
			sortCol = "";
		}
	}
	
	// if sortDir is an array, we cycle through the array items in order to find the first one that is not blank
	if ((sortDir != undefined) && (typeof(sortDir) == 'object')) {
	// We have a JSON array
		for (c=0; c < sortDir.length; c++) {
			colStr = sortDir[c];
			if (colStr != "") {
				sortDir = colStr;
				found = true;
			}
			if (found) { break;};
		}
		if (!found) {
			sortDir = "";
		}
	}
	
	
	if (form_name) {
		formName = form_name;
	} else {
		formName = formName;
	}
	if (style_Type) {
		styleType = 'CS10';
	} else {
		if (document.getElementById('MultiDetailOperations') != null) {
			styleType = 'CS10';		// We want CS10 styling
		} else {
			styleType = 'preCS10';		// We want pre-CS10 styling (Eg. columns)
		}		
	}	
}


function setupContextPOST(support_Dir,def_SortCol,sort_Dir,form_name,style_Type) {
	supportDir = support_Dir;
	sortCol = def_SortCol;
	sortDir = sort_Dir;
	var found = false;
	var colStr,c;
	
	// if sortCol is an array, we cycle through the array items in order to find the first one that is not blank
	if ((sortCol != undefined) && (typeof(sortCol) == 'object')) {
	// We have a JSON array
		for (c=0; c < sortCol.length; c++) {
			colStr = sortCol[c];
			if (colStr != "") {
				sortCol = colStr;
				found = true;
			}
			if (found) { break;};
		}
		if (!found) {
			sortCol = "";
		}
	}
	
	// if sortDir is an array, we cycle through the array items in order to find the first one that is not blank
	if ((sortDir != undefined) && (typeof(sortDir) == 'object')) {
	// We have a JSON array
		for (c=0; c < sortDir.length; c++) {
			colStr = sortDir[c];
			if (colStr != "") {
				sortDir = colStr;
				found = true;
			}
			if (found) { break;};
		}
		if (!found) {
			sortDir = "";
		}
	}
	
	
	if (form_name) {
		formName = form_name;
	} else {
		formName = "BrowseViewFrm";
	}
	if (style_Type) {
		styleType = 'CS10';
	} else {
		if (document.getElementById('MultiDetailOperations') != null) {
			styleType = 'CS10';		// We want CS10 styling
		} else {
			styleType = 'preCS10';		// We want pre-CS10 styling (Eg. columns)
		}		
	}		
}


function executeSort(sortInd,sortDir) {

	var sortParm = sortKeys[sortInd];

	var theForm = eval('document.' + formName);
	theForm.sort.value = sortParm;
	theForm.direction.value = sortDir

	theForm.submit();
	
}


var sortKeys = new Array();

function setColumnPOST(title,parm2,parm3,parm4) {

	// This function requires various variables (e.g.supportDir and urlPrefix) to be defined - test for their existence

	if (!supportDir) {
		alert('The function setColumn cannot be used unless "setupContextPOST()" has been run first with all parameters specified');
		return
	}

	var sortValue = sortCol;		// Use value set in setupContext unless an alternative has been passed. (not currently supported)
	
	// Second and third parms are optional, detect which is which. 
	var sortParm;
	var cellAttrs = '';

	if (parm2 != undefined) {
		p = parm2.substring(0,1);
		if (p == '=' || p == '_') { 
			cellAttrs= '';
			sortParm = parm2;
		} else {
			cellAttrs = parm2;
			if (parm3 != undefined) {
				sortParm = parm3
			}
			
		}
	}
	
	// Calls the master function to build the column header
	setColumnMaster(title, cellAttrs, sortParm, false, '', sortValue,'setColumnPOST');
}

function setColumn(title,parm2,parm3,parm4,parm5,parm6) {

	// This function requires various variables (e.g.supportDir and urlPrefix) to be defined - test for their existence
	var columnName = 'sort';		// default
	var sortValue = sortCol;		// Use value set in setupContext unless an alternative has been passed.
	if (!supportDir || !urlPrefix || !myURL ) {
		alert('The function setColumn cannot be used unless "setupContext()" has been run first with all parameters specified');
		return
	}

	// Second and third parms are optional, detect which is which. 
	var sortParm;
	var cellAttrs = '';

	if (parm2 != undefined) {
	
		// This pattern can search for an HTML attribute in the form WIDTH=100
		re = new RegExp("[=_]*.+=.+");	
		key = re.exec(parm2);
		
		if (!key) { // no html attr found
			cellAttrs= '';
			sortParm = parm2;
		} else {
			cellAttrs = parm2;
			if (parm3 != undefined) {
				sortParm = parm3
			}
			
		}
	}
	
	// parm 4 could either be livelinkSort or column name
	if (typeof(parm4) == 'boolean') {
		livelinkSort = parm4;		// boolean to indicate we want to use legacy sort (e.g. -name)
		if (parm5 != undefined) {
			columnName = parm5;
			if (parm6 == undefined) {
				//alert('browse.js - The function setColumn has an alternative sort column name specified but no sort value has been specified');
				//return
			} else {
				sortValue = parm6;
			}
		}	
	} else {
		if (typeof(parm4) == 'string') {
			columnName = parm4;
		}		
		livelinkSort = false;	
	}
	
	// Calls the master function to build the column header
	setColumnMaster(title, cellAttrs, sortParm, livelinkSort, columnName, sortValue, 'setColumn');
	
}

function setColumnMaster(title, cellAttrs, sortParm, livelinkSort, columnName, sortValue, fName) {
	
	// Defaults for table cell - cellAttrs could override these
	var attrs = new Array()
	attrs._align = 'CENTER'
	
	if (styleType == 'preCS10') {
		// Pre-CS10 styling uses these attributes
		attrs._style = 'BACKGROUND-REPEAT: repeat-x';
		attrs._background =  supportDir + 'fon-table-header-blue.gif';
	}
	
	attrs._nowrap	= '';
	if (cellAttrs != "") {
		var newAttrs = cellAttrs.split(',');
		var attr;
		// Add any newly specified attributes to the array
		for (a=0; a<newAttrs.length; a++ ) {
			attr = newAttrs[a];
			var splits
			if ( typeof (attr) == 'object') {
  				// For objects (usually found in Communities of Practice)
  				if (attr.split){
          				attr.split('=');
        			} else {
        				// Convert to a String first
          				attr.toString().split('=');
        			}
  				name = splits[0];
  				value = splits[1];
      			} else {
      				// For strings
				name = attr.split('=')[0];
				value = attr.split('=')[1];      			
      			}      			
      			attrs['_' + name] = value;
		}
	}
	
	// Title is the visible column name, sortParm is the WebReport tag syntax required for sorting. If sortParm is omitted, then we don't need sort stuff
	if (styleType == 'preCS10') {
		if (title == '' || (colNo > 0)) { // no title means just insert a divider
			document.write('<TD CLASS="cellDivider" STYLE="BACKGROUND-REPEAT: no-repeat" BACKGROUND="' + supportDir + 'table-header-divider.gif">');
			document.write('<IMG HEIGHT="19" ALT="" SRC="' + supportDir + 'px.gif" WIDTH="2" BORDER="0"></TD>');
			if (title == '') {
				return;
			} 
		}
	}

	colNo++;	// Increment for the next column
	document.write('<TD');
	for (a in attrs) {
		document.write(' ' + a.substring(1).toUpperCase());
		if (attrs[a] != '') {
			document.write('="' + attrs[a] + '"');
		}

	}
	document.write('>');

	if (sortParm) {	// Provide sort parm link
	
		if (fName == 'setColumnPOST') {

			sortKeys.push(sortParm);
			thisKeyInd = sortKeys.length-1;
			// Current Sort Dir determines what the new direction will be in the request for a column
			// newSortDir = ((sortDir == 'desc')?'':'&direction=desc' );	// if we were previously desc, then remove this parm
			newSortDir = ((sortDir == 'desc')?'':'desc' );
			//document.write('&nbsp;<A ID="' + colNo + '_sort_link" HREF="' + myURL + '&sort=' + escape(sortParm) + newSortDir + '&nexturl=' + nextURL + '">');

			document.write('&nbsp;<A ID="' + colNo + '_sort_link" HREF="javascript:executeSort(' + thisKeyInd + ',\'' + newSortDir + '\');">');

			document.write(title + '</A>&nbsp;');

			if (sortValue.toLowerCase() == sortParm.toLowerCase()) {	// if this particular column is the one we are sorting on, then add the up or down sort arrows
				if (sortDir.toLowerCase() == 'desc') {
					document.write('<IMG ID="' + colNo + '_sort_image" SRC="' + supportDir + 'sort-down.gif" ALT="Descending Sort" WIDTH="9" HEIGHT="5" BORDER="0">&nbsp;');
				} else {
					document.write('<IMG ID="' + colNo + '_sort_image" SRC="' + supportDir + 'sort-up.gif" ALT="Ascending Sort" WIDTH="9" HEIGHT="5" BORDER="0">&nbsp;');
				};
			};
			
			document.write('</TD>');
			return;
		
		} else if (livelinkSort) {
		
			descending = (sortValue.substring(0,1) == '-');	// is descending, link changes to ascending
			if (descending) {
				thisColumn = (sortValue.toLowerCase() == '-' + sortParm.toLowerCase());
			} else {
				thisColumn = (sortValue.toLowerCase() == sortParm.toLowerCase());
			}
			
			if (thisColumn) {	
				sortParm = (descending?sortValue.substring(1):"-" + sortValue);
			} else {
				descending = false;
			}
			newSortDir = '';	// dir parm not required	
		
		} else {
		
			thisColumn = (sortValue.toLowerCase() == sortParm.toLowerCase());
			if (thisColumn) {	// if this particular column is the one we are sorting on, then add the up or down sort arrows
				descending = (sortDir == 'desc');
				newSortDir = ((descending)?'&direction=asc':'&direction=desc' );	// if we were previously desc, then change to asc and vice versa
			} else {
				descending = false;
				newSortDir = '&direction=asc';
			}		
		}
		
		upArrow = ! descending

		document.write('&nbsp;<A ID="' + colNo + '_sort_link" HREF="' + myURL + filters + '&' + columnName + '=' + escape(sortParm) + newSortDir + '&nexturl=' + nextURL + '">');
		
		document.write(title + '</A>&nbsp;');		
		
		if (thisColumn) {
			if (upArrow) {
				document.write('<IMG ID="' + colNo + '_sort_image" SRC="' + supportDir + 'sort-up.gif" ALT="Ascending Sort" WIDTH="9" HEIGHT="5" BORDER="0">&nbsp;');
			} else {
				document.write('<IMG ID="' + colNo + '_sort_image" SRC="' + supportDir + 'sort-down.gif" ALT="Descending Sort" WIDTH="9" HEIGHT="5" BORDER="0">&nbsp;');
			};	
		}		
		
	} else {
		document.write(title);	// No colName so no sorting required, just write text
	}
	document.write('</TD>');

}

function multiButton(gifName, label, reqHandler, reqName){

	// This function requires various variables (e.g.supportDir and urlPrefix) to be defined - test for their existence
	if (!supportDir ) {
		alert('The function multiButton cannot be used unless "setupContext()" has been run first with all parameters specified');
		return
	}
	
	if (typeof OTvar == "undefined") {
		// Display pre-CS10 style multi-buttons
		document.write('<INPUT CLASS="multiButton" STYLE="background-image: url( ' + supportDir + '' + gifName + '.gif );" ');
		document.write('onmouseup="this.style.backgroundImage=\'url( ' + supportDir + '' + gifName + '.gif )\';c=false;" ');
		document.write('onmousedown="this.style.backgroundImage=\'url( ' + supportDir + '' + gifName + '2.gif )\';c=true" ');
		document.write('onmouseover="if(c)this.style.backgroundImage=\'url( ' + supportDir + '' + gifName + '2.gif )\'" ');
		document.write('onmouseout="this.style.backgroundImage=\'url( ' + supportDir + '' + gifName + '.gif )\'" TYPE="button" ');
		document.write('NAME="' + label + '" VALUE="' +  label + '" ONCLICK="doSubmit( \'' + reqHandler + '\', \'' + reqName + '\' );">&nbsp;');
		
	} else {
		var name = reqName.toLowerCase();
		
		switch(name) {
			case 'copy':
				ypos = '0';
				xpos2 = '-104';
				ypos2 = '0';		
				break;
			case 'move':
				ypos = '-36';
				xpos2 = '-104';
				ypos2 = '-36';						
				break;
			case 'delete':
				ypos = '-72';
				xpos2 = '-104';
				ypos2 = '-72';						
				break;
			case 'zipdwnld':
				ypos = '-108';
				xpos2 = '-268';
				ypos2 = '-108';						
				break;
			case 'zipemail':
				ypos = '-180';
				xpos2 = '-268';
				ypos2 = '-180';						
				break;
			case 'print':
				ypos = '-144';
				xpos2 = '-134';
				ypos2 = '-144';						
				break;				
			case 'collectitems':
				ypos = '-288';
				xpos2 = '-104';
				ypos2 = '-288';						
				break;
			case 'emaillink':
				ypos = '-324';
				xpos2 = '-104';
				ypos2 = '-324';						
				break;			
			default:
				ypos = '0';
				xpos2 = '0';
				ypos2 = '0';									
				break;		
		}	
		
		if (name == 'emaillink') {
			rkt_MultiButtonPositionClient(supportDir + 'multifilebar.png', '0', ypos, xpos2, ypos2, 'EmailLink', label, 'emailLink', '0' );
		} else {
			rkt_MultiButtonPosition(supportDir +'multifilebar.png', '0', ypos, xpos2, ypos2, label, label, reqHandler, reqName, '0');		
		}
	}	

}

// Set button position and display
function rkt_MultiButtonPosition( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayName, action, typeStr, last ) {

	// This function requires various variables (e.g.supportDir and urlPrefix) to be defined - test for their existence
	if (!supportDir ) {
		alert('The function multiButton cannot be used unless "setupContext()" has been run first with all parameters specified');
		return
	}

	return fn_MultiButtonPosition( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayName, action, typeStr, last );
}

// Display the Email Link button
function rkt_MultiButtonPositionClient( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayName, jsFunc, last ) {

	return fn_MultiButtonPositionClient( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayName, jsFunc, last );
}

// Set the support path in menu.js
function rkt_nm_setSupportPath(s) {
	return nm_setSupportPath( s );
}

// Set in menu.js
function rkt_nm_moreMenuStart() {
	return nm_moreMenuStart();
}

// Set the parentID in menu.js
function rkt_nm_setParentID(s) {
	return nm_setParentID(s);
}

// Set the URL Prefix in menu.js
function rkt_nm_setLocation(s) {
	// AS NEW CODE
	setBaseUrl( s );
	
	return nm_setLocation(s);
}

// Set the nexturl in menu.js
function rkt_nm_setNextUrl(s) {
	return nm_setNextUrl(s);
}

// Set in menu.js
function rkt_nm_AddNewMoreMenuHead(fieldName, menuid, altText, label) {
	return nm_AddNewMoreMenuHead(fieldName, menuid, altText, label);
}

// Set in menu.js
function rkt_nm_AddNewMoreMenuItem( id, img, name, displayName, action, type ) {
	return nm_AddNewMoreMenuItem( id, img, name, displayName, action, type );
}

// Set in menu.js
function rkt_nm_AddNewMenuEnd() {
	return nm_AddNewMenuEnd();
}

// Set in menu.js
function rkt_nm_AddNewMoreMenuItemClient( id, img, name, displayName, jsFunc ) {
	return nm_AddNewMoreMenuItemClient( id, img, name, displayName, jsFunc );
}

// Set in menu.js
function rkt_setMoreParam( name ) {
	return setMoreParam( name );
}

// Set in webnode/browse.js
function rkt_setMultiSelectButtons( noMSB ) {
	return setMultiSelectButtons( noMSB );
}

// Set in webnode/browse.js
function rkt_setNextURL( nextUrlStr ) {
	return setNextURL( nextUrlStr );
}

// Set in webnode/browse.js
function rkt_setContainerId( dataId ) {
	return setContainerId( dataId );
}

// Set in webnode/browse.js
function rkt_setContainerSubType( subType ) {
	return setContainerSubType( subType );
}

// Set in webnode/browse.js
function rkt_setCurrentViewType( viewType ) {
	return setCurrentViewType( viewType );
}

// Set in webnode/browse.js
function rkt_setIsPaged( paged ) {
	return setIsPaged( paged );
}

// Set in webnode/browse.js
function rkt_setHideSize( newSetHideSize ) {
	return setHideSize( newSetHideSize );
}

// Set in webnode/browse.js
function rkt_setCookiePath( path ) {
	return setCookiePath( path );
}

// #3599 AS 2012.09.14
// Set in webnode/browse.js
function rkt_setBaseUrl( baseUrlStr  ) {
	return setBaseUrl( baseUrlStr );
}

// Set in webnode/browse.js
function rkt_setBrowseColumnDefinition( browseColumnDefinitionList ) {
	return setBrowseColumnDefinition( browseColumnDefinitionList );
}

// Set in webnode/browse.js
function rkt_initPopup() {
	return initPopup();
}

// Set in webnode/browse.js
function rkt_AddMultiButton2( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayNameStr, actionStr, typeStr ) {
	return AddMultiButton2( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayNameStr, actionStr, typeStr );
}

// Set in webnode/browse.js
function rkt_AddMultiButton2Client( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayNameStr, jsFunc ) {
	return AddMultiButton2Client( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayNameStr, jsFunc );
}


// JG 2013.09.20
// additions for AJAX/JSON based templates:
var row;
var rowClass;
var rowHead;
var cellValue;
var attrHTML = "";
var pageCountString = "";
var itemCountString = "";
var loadingMsg = "Loading...";
var filterValue = "";
var WRSortActive = false;
var haveAllResults = false;
var needRefresh = false;
var tempRowSection;


var currentAction = "";
var oppositeSortDir = function(){ return (currentSortDir == "ASC")? "DESC":"ASC"; };

var hoverHandler = function(){ $(this).addClass("browseRowHover"); };
var unhoverHandler = function(){ $(this).removeClass("browseRowHover"); }; 
var rowLoopLength;
var r;
var wantTopPageControls = false;

function updatePageControls(thisPageNum){

		pageSize = parseInt(pageSize);
		
		// Do we need pagination now this time:
		if ( (totalRows % pageSize) == 0) {
			totalPages = parseInt(totalRows/pageSize); // All the pages
		} else {
			totalPages = parseInt((totalRows/pageSize)+1); // Add an additional page at the end for remaining items
		}
		usePagination = (totalPages > 1); // the number of results available is less than or equal to the pageSize 
		
		if (showResultsPicker) {
			if (wantTopPageControls) { wr_createPageSizeMenu(pageSizeList,pageSize,1) }  // only call top controls if wanted
			wr_createPageSizeMenu(pageSizeList,pageSize,2);
		} else {
			if (wantTopPageControls) { $('#pageSizeList1').html(''); } // only call top controls if wanted
			$('#pageSizeList2').html('');
		}
		
	if (usePagination) {
	
		// draw paging tables:
		if (wantTopPageControls) { wr_createPageSelectIcons(1, thisPageNum); } // only call top controls if wanted
		wr_createPageSelectIcons(2, thisPageNum);	
	
		// Page Count labels:
		if ( pageNum == totalPages )
		{
			pageCountString = String.formatLoc( "%1 of %2 pages", pageNum, totalPages);
		} 
		else
		{
			pageCountString = String.formatLoc( "%1 of about %2 pages", pageNum, totalPages);
		}
	
		if (wantTopPageControls) { $('#pageCounter1').html(pageCountString); } // only call top controls if wanted
		$('#pageCounter2').html(pageCountString);
			
		// Item Count labels:
		startRow = (pageNum == 1) ? 1 : pageSize*(pageNum-1)+1;
		pageTotal = ((pageSize * pageNum) < totalRows) ? (pageSize * pageNum) : totalRows ;
			
		itemCountString = String.formatLoc( "%1 - %2 of %3 %4 %5 %6", startRow, pageTotal, ( ( pageTotal == totalRows ) ? '' : "about " ), totalRows, ( ( totalRows == 1 ) ? "item" : "items" ), (filtered ? "(filtered)":''));
		
		
	} else {
			itemCountString = String.formatLoc("%1 %2 %3",totalRows, ( ( totalRows == 1 ) ? "item" : "items" ), (filtered ? "(filtered)":'') );
			
			// clear out any existing pagination controls
			if (wantTopPageControls) { $('#miniPageRow1').html(''); } // only call top controls if wanted
			$('#miniPageRow2').html('');
			
			if (wantTopPageControls) { $('#pageCounter1').html(''); } // only call top controls if wanted
			$('#pageCounter2').html('');
			
	};
	
	if (wantTopPageControls) {  $('#selectedBrowsePageSize1').html(pageSize); } // only call top controls if wanted  
	$('#selectedBrowsePageSize2').html(pageSize);
	
	if (wantTopPageControls) { $('#itemCountLabel1').html(itemCountString); } // only call top controls if wanted  
	$('#itemCountLabel2').html(itemCountString);
	
}

function flashTable(){

	// add the hover events to each row:
	$('.browseRow1, .browseRow2').each(function(){
		$(this).hover( hoverHandler, unhoverHandler);
	});
	
	// set the current page table css:
	$('.pageSelectorReference').each( function (i,element) {
		if ($(this).attr('pagenumaccess') == pageNum) {
			$(this).css({
				"background-color":"white",
				"border": "solid 1px #A9B7C6" 
			});
		}
	});
	
}

function buildTableHeader(){

	// set the vars to loop once:
	var tempRowLoopLength = rowLoopLength; // captured for later.
	r = 0;
	rowLoopLength = 1;
	
	// check for the core sorting desc parm:
	if (currentSortStr.charAt(0) == "-") {
		currentSortStr = currentSortStr.substr(1);
	}
	
	// resolve any JS in the Header Row template, force it to run only once:
	rowHead = mergeBrowseData($('#headerRowTemplate').html(),[{"run":"once"}]);
	
	$(rowHead).appendTo('#browseViewCoreTable');
	
	var nextSortDir = "ASC";
	
	$('.browseListHeader').children().each(function(index,e){
		// add the direction icon:
		if ($(this).attr('sortKey').toLowerCase() == currentSortStr.toLowerCase()) {
			$(this).append('&nbsp;' + arrowImg[currentSortDir]);
			nextSortDir = (currentSortDir == "ASC") ? "DESC" : "ASC";
		}
		
		// change the sortDirection for the next click:
		$(this).children("a.sortLink").click(function() {
			nextSortDir = "ASC";
			if ($(this).parent().attr('sortKey').toLowerCase() == currentSortStr.toLowerCase()) {
				nextSortDir = (currentSortDir == "ASC") ? "DESC" : "ASC";
			}
			changePage( 1, pageSize, $(this).parent().attr('sortKey'), nextSortDir);
		});
				
	});
	
	// set the vars back to the original values:
	rowLoopLength = tempRowLoopLength;
	
}

function mergeBrowseData(template, theData) {

	// look for simple replacement markers first (alphnumeric with underscores allowed):
	var simplePat = /\{\{([a-zA-Z0-9_ ]+)\}\}/gi;
	//var complexPat = /\{\{\$([\w %\?\!|\=\:\'\";\.\,#\(\)\+\-\\\/\*\}\{\r\n\/&@<>\f\t]*)\}\}/gi; // long whitelist.
	var ifPatt=/\{\{\$ *if *([(\S )]*?) *\}\}/gi;
	var closePatt = /\{\{\$ *endif *\}\}/gi
	var	elsePatt = /\{\{\$ *else *\}\}/gi
	
	var outString = "";
	
	// loop through each row in the JSON data:
	for (r; r<rowLoopLength; r++){

		// start with a fresh copy of the template for each row.
		var templCopy = template;
		var matchArray;
	
		// Replacement tags:
		while ((matchArray = simplePat.exec(template)) !== null) {
			// Replace the flag value with the value from the JSON structure if a match is found.
			// If a matching JSON field is not found, leave it alone so it's easy to spot in the results.
			// If a matching JSON field is found but it is null, replace it with an empty string.
			var replaceValue = '';
			var currString = theData[r][matchArray[1]];
			
			if (currString !== null) {
				if (typeof currString === 'string') {
					// We can't use JSON.parse(), as only some of the fields will be escaped.
					// So unescape the unicode characters here manually:
					var unicodePatt = /\\u([\d]{4})/gi; //eg: \u0022
		
					// take the match and replace it with the corresponding character:
					currString = currString.replace(unicodePatt, function (unicodeStr, hex) {
							hex = parseInt( hex, 16 );
							return String.fromCharCode( hex );	 
							} );	
				} 
				
				replaceValue = currString;
			}
			
			templCopy = templCopy.replace(matchArray[0], replaceValue );

		} // end Replacement tags.
		
		// conditional tags:
		while ((results = ifPatt.exec(templCopy)) !== null) {
		// we have a match, now try to find the next closest endif tag
	  
			// unescape any escaped HTML in the logic that may have been introduced from the .innerHTML;
			results[1] = results[1].replace("&lt;","<");
			results[1] = results[1].replace("&gt;",">");
		  
			var closeIndex = templCopy.search(closePatt);
			var elseIndex = templCopy.search(elsePatt);
			// if the else isn't in this IF statement, ignore it:
			if (elseIndex > closeIndex) {
				elseIndex = -1;
			}
			var startIndex;
			var endIndex;
			var isError = false;
			
			if (closeIndex != -1) {
			
				var logicCheck = false;
				try {
					logicCheck = eval(results[1]);
				} catch (e){
					logicCheck = false;
					//newVal = "<span style=\"color:#FF0000;\">error in logic: " + e.message + " -> " + results[1] + "</span>";
					newVal = "<span style=\"color:#FF0000;\"><b>" + "error in logic: </b>" + e.message +  " -> "  + results[1] + "</span>";
					isError = true;
				}
			
				if (!isError) {
								
					if (logicCheck) {
						// logic was true		
						startIndex = ifPatt.lastIndex;
						
						if (elseIndex == -1) {
							// if there isn't an ELSE tag, end at the closing tag.
							endIndex = closeIndex;
						} else {
							// if there is an ELSE tag, end at the ELSE tag.
							endIndex = elseIndex;
						}
						
						newVal = templCopy.slice(startIndex,endIndex)
					} else {
						// logic was false
						if (elseIndex != -1) {
							// if there is an ELSE tag, start at the ELSE tag and end at the ENDIF tag:
							newVal = templCopy.slice(elseIndex+9,closeIndex)
						} else {
							newVal = '';
						}	
					}
				}	
				
				strToReplace = templCopy.slice(results.index,closeIndex + 10);
				
			} else {
				newVal = "no closing IF found";
				strToReplace = results[0];
			}
			templCopy = templCopy.replace(strToReplace,newVal);
		} // end conditional tags	
		
		outString += templCopy;
	}
	
	return outString; 
}


function buildBrowseTable(tableData, thisPageNum){
	
	newRows = tableData.myRows;
	
	$('#browseViewCoreTable').empty();
	
	//Determine filtering and row loop length:
	rowLoopLength = (newRows.length < pageSize) ? newRows.length : pageSize;	
	totalRows = parseInt(tableData.totalCount);
	
	// re-build the column headers:
	buildTableHeader();
	
	r = 0;
	r = (startRow == 1) ? 0 : startRow-1;
	rowLoopLength = ((pageSize * pageNum) < totalRows) ? (pageSize * pageNum) : totalRows;

		
	// show the No Items div if there are no rows returned:
	if (rowLoopLength == 0) {
		var noItems = '<tr id="browseNoItemsRow"><td><div class="browseNoItems">'+ lStr["There are no items to display."] +'</div></td></tr>';
		if ($('#browseNoItemsRow').length == 0){
			$(noItems).insertAfter('#MultiOperationBar1Row');
		} else {
			$('#browseNoItemsRow').replaceWith(noItems);
		}
		$('#BrowseCoreRow, #MultiDetailOperations, #MultiOperationBar1RowBottom').hide();
		updatePageControls(1);
		statusDivControl('hide');
		return;
	} else if (currentAction == 'namesearch') {
		// put things back to original if we're clearing out the namesearch and there are rows to show
		$('#browseNoItemsRow').remove();
		$('#BrowseCoreRow, #MultiDetailOperations, #MultiOperationBar1RowBottom').show();
	}

	// merge the current JSON data with the Row template:
	bodyData = mergeBrowseData($('#browseRowTemplate').html(), newRows);	
	
	if (bodyData == "") {
		bodyData = "Error building browse table.";
	}
	
	$(bodyData).appendTo('#browseViewCoreTable'); 
		
	updatePageControls(pageNum);
	
	flashTable();
	
	// hide the progress window:
	statusDivControl('hide');
}


function statusDivControl(action) {
	
	switch (action) {
		case 'show':
			// re-position div to center of screen before showing:
			$('#statusDivMsg').html(loadingMsg + '&nbsp;&nbsp;');
			$('#statusDiv').css({'top': $(window).height()/2 + $(window).scrollTop(),'margin-left': -Math.abs($('#statusDiv').width()/2)});
	
			$('#statusDiv').show();
			break;
		case 'hide':
			$('#statusDiv').hide();
			break;			
	}	
	
}

function changePage(thisPageNum, pageSize, sortVal, sortDir){
//function changePage(newURL){
		
	// function to get more results via AJAX:
	var JSONurl = JSONBaseUrl;
	needRefresh = false; //reset.
	
	if (sortVal) {
	
		currentAction = 'sort';
		
		loadingMsg = String.formatLoc( "Sorting by %1...", sortVal );
		
		// always load the 1st page on a sort:
		startRow = 1;
		pageNum = 1;
		
		//if (!usePagination && currentSortStr == sortVal) {
		if (currentSortStr == sortVal) {
			// do a client-side sort as we already have all the results to save an ajax request.
			needRefresh = false;

			currentSortDir = (currentSortDir == 'ASC') ? 'DESC' : 'ASC';
			
			if (tempRowSection) {
				tempRowSection.myRows.reverse();
				buildBrowseTable(tempRowSection, 1);
			} else {
				WRData.myRows.reverse();
				buildBrowseTable(WRData, 1);
			}

			return;
		} else {
			// Use the WR sort parms
			JSONurl += '&sort=' + sortVal;
			if (sortDir) {JSONurl += '&direction=' + sortDir};
			needRefresh = true;
		}
	
		currentSortStr = sortVal;
		currentSortDir = sortDir;
	} else {
		// for every other action, append the correct sort parm and key:
		JSONurl += '&sort=' + currentSortStr;
		JSONurl += '&direction=' + currentSortDir;
	}
	
	if (filtered && currentAction == "namesearch") {
		//JSONurl += '&filterValue=' + filterValue; // for server-side WR filtering.
		// client-side name filtering:
		needRefresh = true;
	} else if (!filtered && currentAction == "namesearch"){
		needRefresh = true; // best to get a clean set of hits after clearing the filter
		pageNum = 1;
		startRow = 1;
	} 
	
	if (applySubtypeFilter) {
		//JSONurl += "&objFilter=" + subtypeFilter; // for server-side WR filtering.
		needRefresh = true;
	} else if (!applySubtypeFilter && currentAction == "subtypefilter"){
		needRefresh = true;
		pageNum = 1;
		startRow = 1;
	}
		
	//pageNum = thisPageNum;
	JSONurl += "&page=" + thisPageNum;
	JSONurl += "&pageSize=" + pageSize;
	 
	statusDivControl('show',loadingMsg);
	
	if (currentAction == "refresh"){
		needRefresh = true;
	}
	
	if (!needRefresh) {
		// if we're using WebReports sorting, we should have all the results
		// so don't bother making another ajax call.
		pageSize = pageSize;
	
		if (currentAction == "sort") {
		
			var tempSortDir 
			
			if (sortDir == "ASC") {
				tempSortDir = true;
				currentSortDir = "ASC";
			} else {
				tempSortDir = false;
				currentSortDir = "DESC";
			}
		
			// Since the server already sorted the results, we just need to reverse the order of the data:
			tempRowSection.myRows.reverse();
		}
		
		if (tempRowSection) {
			buildBrowseTable(tempRowSection, thisPageNum);
		} else {
			buildBrowseTable(WRData, thisPageNum);
		}
		
	} else { 
	
		$.get(JSONurl, function(data,textStatus){
				
				if (data.indexOf('Content Server Error') != -1) {
					alert('Problem retrieving data...');
					reqMoreResults = false;
					return;           
				}
				
				// Evaluate the JSON response  
				tempRowSection = JSON.parse( data );  
				
				// filter the results if necessary after it comes back sorted at the server:
				if (filtered){ 
					filterData();
				}
				if (applySubtypeFilter){
					subtypeFilterData();
				}
				

				buildBrowseTable(tempRowSection, thisPageNum);							
		});
	}
}

function subtypeFilterData(){
	
	// clone data set to prevent an additional server hit for non-sorts.
	var tempData = $.extend(true,{},tempRowSection); 
	var tempRows = [];

	for (j=0;j<tempData.myRows.length;j++) {
		//keyIndex = tempData.myRows[j].type.indexOf(subtypeFilter); // case-insensitive
		if ( tempData.myRows[j].type === subtypeFilter){
			tempRows.push(tempData.myRows[j]);
		}
	}
	
	tempData.myRows = []; // clear out existing data to be safe;
	tempData.myRows = tempRows;
	tempData.totalCount = tempRows.length;
	tempData.totalRows = tempRows.length;
	if (currentAction == "subtypefilter") {
		pageNum = 1;
		startRow = 1;
	}
	
	tempRowSection = tempData;

}

function filterData(){
	// clone data set to prevent an additional server hit for non-sorts.
	var tempData = $.extend(true,{},tempRowSection); 
	var tempRows = [];

	for (j=0;j<tempData.myRows.length;j++) {
		keyIndex = tempData.myRows[j].name.toLowerCase().indexOf(filterValue.toLowerCase()); // case-insensitive
		if ( keyIndex != -1 ){
			tempRows.push(tempData.myRows[j]);
		}
	}
	
	tempData.myRows = []; // clear out existing data to be safe;
	tempData.myRows = tempRows;
	tempData.totalCount = tempRows.length;
	tempData.totalRows = tempRows.length;
	if (currentAction == "namesearch") {
		pageNum = 1;
		startRow = 1;
	}
	
	tempRowSection = tempData;
}

// hijack the resort after DragAndDrop so we don't loose any WR columns:
function getFolderContents(){
	
		loadingMsg = LocString('Sorting after upload', dndfileStr );
		currentSortStr = 'modifydate';
		currentSortDir = 'DESC';
		currentAction = "refresh";
		changePage(1, pageSize);

} 