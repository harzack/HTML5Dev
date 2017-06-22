// Routines to generate dropdown menus ... from browsecorermenu.js
// MenuBar contains Menus which contain Items, Dividers and SubMenus

var bc_baseURL = '';
var bc_img = '';
var bc_menuCount = 0;
var bc_nextId = 1;
var bc_menuName = "";
var bc_TextInMenu = false;
var bc_directWrite = false;
var bc_widget = "";
var hiddenItem = false;
var moreButtons = undefined;
var topToolbar = undefined;
var hasStagedContent = false;
var pstageID = 0;

function browsecorermenuExists()
{
    return true;
}

function bc_setBaseURL( s )
{
	bc_baseURL = s;
}

function bc_setMenuName( s )
{
	bc_menuName = s;
}

function bc_setSupportPath( s )
{
	bc_img = s;
}

function bc_setWidget( s )
{
	bc_widget = s;
}

function bc_setupMenu( url, support )
{
	bc_baseURL = url;
	bc_img = support;
}

function bc_setDirectWrite()
{
	bc_directWrite = true;
}

function bc_useTextInMenu()
{
	bc_TextInMenu = true;
}

function bc_resetTextInMenu()
{
	bc_TextInMenu = false;
}

// HTML Fragments - these are building blocks for global menus

// Substitutions: IMG,  MENUNAME, MENULABEL, ITEMID
var bc_html_menuStartTop =
	'<DIV STYLE="clear:none;" ID="#MENUNAME#Menu" CLASS="bcMenuSelect" onClick="ShowBCDropDownMenu(\'show#MENUNAME#\');return false;">' +
	'	<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">' +
	'		<TR>' +
	'			<TD WIDTH="100%" ID="#ITEMID#MenuSelectTitle" CLASS="bcselectTitle" >' +
	'				<DIV ID="selected#MENUNAME#" onClick="showMenu( \'#MENUNAME#Menu\', \'\' );return false">';

// Substitutions: IMG,  TOOLTIP
var bc_html_menuStartBottom =
	'				</DIV>' +
	'			</TD>' +
	'			<TD><IMG TITLE="#TOOLTIP#" CLASS="bcselectArrow" ALT="" SRC="#IMG#bcselectarrow.png" WIDTH="17" HEIGHT="17"></TD>' +
	'		</TR>' +
	'	</TABLE>';

// Substitutions: IMG,  MENUNAME, MENULABEL, TOOLTIP, ITEMNAME, ITEMIMG, ITEMID
var bc_html_menuStartImg =
	' <A TITLE="#ITEMNAME#" HREF="#" onClick="showMenu( \'#MENUNAME#Menu\', \'\' );return false" STYLE="font-size:8pt"><IMG SRC="#IMG##ITEMIMG#" ALT="#ITEMNAME#" BORDER="0" WIDTH="16" HEIGHT="16"></A>';

var bc_html_menuStartImgWthText =
	' <A TITLE="#ITEMNAME#" HREF="#" onClick="showMenu( \'#MENUNAME#Menu\', \'\' );return false" STYLE="font-size:8pt;"><IMG SRC="#IMG##ITEMIMG#" STYLE="vertical-align:middle" ALT="#ITEMNAME#" BORDER="0" WIDTH="16" HEIGHT="16">&nbsp;#ITEMNAME#</A>';

var bc_html_menuStartText =
	' <A TITLE="#TOOLTIP#" HREF="#" onClick="showMenu( \'#MENUNAME#Menu\', \'\'  );return false" STYLE="font-size:8pt; vertical-align:middle">#ITEMNAME#</A>';

 // Substitutions: IMG, MENUNAME, MENUINDEX - needs to be on one line for IE
var bc_html_menuSeparator =
 	'	<DIV ID="#MENUNAME##MENUINDEX#DivId" CLASS="menuDivider"><IMG SRC="#IMG#spacer.gif" ALT="" WIDTH="1" HEIGHT="1"></DIV>';

var bc_html_hiddenMenuSeparator =
	'	<DIV ID="#MENUNAME##MENUINDEX#DivId" CLASS="hiddenMenuItem" WIDTH="100%">' +
	'		<CENTER><HR WIDTH="80%"></CENTER>' +
	'	</DIV>';

// Substitutions: MENUNAME
var bc_html_menuOptionsStart =
	'<DIV STYLE="top:0px;" ID="show#MENUNAME#" CLASS="menu">';

// Substitutions: MENUNAME, MENUINDEX, ITEMVALUE
var bc_html_menuItemStart =
	'<DIV ID="#MENUNAME##MENUINDEX#DivId" CLASS="menuItem" WIDTH="100%" '+
	'	ONMOUSEOVER="javascript:hiLight( \'#MENUNAME##MENUINDEX#DivId\' );" '+
	'	ONMOUSEOUT="javascript:loLight( \'#MENUNAME##MENUINDEX#DivId\' );" '+
	'	onClick="Change#MENUNAME#(\'#MENUINDEX#\',\'#ITEMVALUE#\', \'#MENUNAME#\');"> '+
	'	<DIV ID="show#MENUNAME#spacer" STYLE="display:inline" > ';

// Substitutions: MENUNAME, MENUINDEX, ITEMVALUE
var bc_html_hiddenMenuItemStart =
	'<DIV ID="#MENUNAME##MENUINDEX#DivId" CLASS="hiddenMenuItem" WIDTH="100%" '+
	'	ONMOUSEOVER="javascript:hiLight( \'#MENUNAME##MENUINDEX#DivId\' );" '+
	'	ONMOUSEOUT="javascript:loLight( \'#MENUNAME##MENUINDEX#DivId\' );" '+
	'	onClick="Change#MENUNAME#(\'#MENUINDEX#\',\'#ITEMVALUE#\', \'#MENUNAME#\');"> '+
	'	<DIV ID="show#MENUNAME#spacer" STYLE="display:inline" > ';

var bc_html_hide =

	'<DIV ID="#MENUNAME##MENUINDEX#DivId" CLASS="menuItem" WIDTH="100%" '+
	'	ONMOUSEOVER="javascript:hiLight( \'#MENUNAME##MENUINDEX#DivId\' );expandMenu = true" '+
	'	ONMOUSEOUT="javascript:loLight( \'#MENUNAME##MENUINDEX#DivId\' );expandMenu = false" '+
	'	onClick="unhideMenu(' + "'#MENUNAME##MENUINDEX#DivId'" + ');"> '+
	'	<DIV ID="show#MENUNAME#spacer" STYLE="display:inline" > ';

// Substitutions: ITEMNAME
var bc_html_itemindent =
	'<IMG SRC="#IMG#spacer.gif" ALT="#ITEMNAME#" WIDTH="16" HEIGHT="16">';

// Substitutions: MENUNAME, IMG, ITEMVALUE, ITEMNAME
var bc_html_menuItemClosing =
	'	<DIV ID="show#MENUNAME#text" STYLE="display:inline" >' +
	'		<A HREF="#" onClick="Change#MENUNAME#( \'#MENUINDEX#\', \'#ITEMVALUE#\');" STYLE="font-size:8pt; width:100%;">#ITEMNAME#</A>&nbsp;'+
	'	</DIV>' +
	'</DIV>';

var bc_html_menuItemEndImg =
	'	</DIV>' +
	'	<A TITLE="#ITEMNAME#" HREF="#" onClick="showMenu( \'#MENUNAME#Menu\', \'\' );return false" ><IMG SRC="#IMG##ITEMIMG#" STYLE="vertical-align:middle" ALT="#ITEMNAME#" BORDER="0" WIDTH="16" HEIGHT="16"></A>' +
	bc_html_menuItemClosing;
	
var bc_html_menuItemEndDiv =
	'	</DIV>' +
	'	<A TITLE="#ITEMNAME#" HREF="#" onClick="showMenu( \'#MENUNAME#Menu\', \'\' );return false" style="padding-right:3px"><DIV CLASS="#IMGMAPCLASS#"></DIV></A>' +
	bc_html_menuItemClosing;
	
var bc_html_menuItemEndNoImg =
	'	</DIV>'+
	'		<IMG SRC="#IMG#spacer.gif" ALT="#ITEMNAME#" WIDTH="16" HEIGHT="16">' +
	bc_html_menuItemClosing;

var bc_html_hideEndImg =
	'	</DIV>'+
	'	<DIV ID="show#MENUNAME#text" STYLE="display:inline" >'+
	'		<CENTER><A HREF="#" onClick="unhideMenu(' + "'#MENUNAME##MENUINDEX#DivId'" + ')"><IMG SRC="#IMG##ITEMIMG#" ALT="More..." WIDTH="16" HEIGHT="16" BORDER="0"></A>&nbsp;</CENTER>'+
	'	</DIV>'+
	'</DIV>';

var bc_html_menuItemTxt =
	'<DIV ID="#MENUNAME##MENUINDEX#DivId" CLASS="menuItem" WIDTH="100%" ' +
	'	ONMOUSEOVER="javascript:hiLight( \'#MENUNAME##MENUINDEX#DivId\' );" '+
	'	ONMOUSEOUT="javascript:loLight( \'#MENUNAME##MENUINDEX#DivId\' );" '+
	' 	onClick="Change#MENUNAME#( \'#MENUINDEX#\', \'#ITEMVALUE#\');">'+
	'	<A HREF="#" onClick="Change#MENUNAME#( \'#MENUINDEX#\', \'#ITEMVALUE#\');" STYLE="font-size:8pt; width:100%;">#ITEMNAME#</A>'+
	'</DIV>';

function unhideMenu(divIdStr)
{
	var divId = document.getElementById(divIdStr);

	divId = divId.parentNode;

	for (i=0;i<divId.childNodes.length;i++)
	{

		if (divId.childNodes[i].className == "hiddenMenuItem" && divId.childNodes[i].id != "divIdStr")
		{

			divId.childNodes[i].className = "menuItem";
		}

   	}
	document.getElementById(divIdStr).className = "hiddenMenuItem";

}

function bc_menuImgStart( menuLabel, toolTip, itemName, itemID, itemImg )
{
	var s = bc_html_menuStartTop;

	if ( bc_TextInMenu === false )
	{
		s = s + bc_html_menuStartImg;
	}
	else
	{
		s = s + bc_html_menuStartImgWthText;
	}
	s = s + bc_html_menuStartBottom;

	s = s.replace( /#IMG#/g, bc_img );
	s = s.replace( /#MENUNAME#/g, bc_menuName );
	s = s.replace( /#MENULABEL#/g, menuLabel );
	s = s.replace( /#TOOLTIP#/g, toolTip );
	s = s.replace( /#ITEMNAME#/g, itemName );
	s = s.replace( /#ITEMID#/g, itemID );
	s = s.replace( /#ITEMIMG#/g, itemImg );

	if ( bc_directWrite === true )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

function bc_menuTxtStart( menuLabel, toolTip, itemName, itemID, itemImg )
{
	var s = bc_html_menuStartTop;
	s = s + bc_html_menuStartText;
	s = s + bc_html_menuStartBottom;

	s = s.replace( /#IMG#/g, bc_img );
	s = s.replace( /#MENUNAME#/g, bc_menuName );
	s = s.replace( /#MENULABEL#/g, menuLabel );
	s = s.replace( /#TOOLTIP#/g, toolTip );
	s = s.replace( /#ITEMNAME#/g, itemName );
	s = s.replace( /#ITEMID#/g, itemID );
	s = s.replace( /#ITEMIMG#/g, itemImg );

	if ( bc_directWrite === true )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

function bc_separator( index )
{
	var s;

	if (hiddenItem)
	{
		s = bc_html_hiddenMenuSeparator;
	}
	else
	{
		s = bc_html_menuSeparator;
	}

	s = s.replace( /#IMG#/g, bc_img );
	s = s.replace( /#MENUNAME#/g, bc_menuName );
	s = s.replace( /#MENUINDEX#/g, index );

	if ( bc_directWrite === true )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

function bc_optionsStart()
{
	hiddenItem=false;

	var s = bc_html_menuOptionsStart;

	s = s.replace( /#MENUNAME#/g, bc_menuName );

	if ( bc_directWrite === true )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

function bc_itemImg( itemName, itemImg, index, itemValue, indent, imgMapClassSmall  )
{
	var s;
	var i;
	var hide = false;
	
	if ( "hide" == itemName )
	{
		hide = true;
		s = bc_html_hide;
		itemName = "show";
	}
	else if ( hiddenItem )
	{
		s = bc_html_hiddenMenuItemStart;
	}
	else
	{
		s = bc_html_menuItemStart;
	}

	// add the indents we want
	for ( i = 0; i < indent; i++ )
	{
		s = s + bc_html_itemindent;
	}

	if ( itemImg.length > 0 )
	{
		if ( hide )
		{
			s = s + bc_html_hideEndImg;
		}
		else
		{
			if ( '' == imgMapClassSmall )
			{
				s = s + bc_html_menuItemEndImg;
			}
			else
			{
				s = s + bc_html_menuItemEndDiv;
			}
		}
	}
	else
	{
		s = s + bc_html_menuItemEndNoImg;
	}
	
	s = s.replace( /#MENUNAME#/g, bc_menuName );
	s = s.replace( /#ITEMNAME#/g, itemName );
	s = s.replace( /#ITEMIMG#/g, itemImg );
	s = s.replace( /#MENUINDEX#/g, index );
	s = s.replace( /#IMG#/g, bc_img );
	s = s.replace( /#ITEMVALUE#/g, itemValue );
	s = s.replace( /#IMGMAPCLASS#/g, imgMapClassSmall );
	
	if ( hide )
	{
		hiddenItem = true;
	}

	if ( bc_directWrite === true )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

function bc_itemTxt( itemName, index, itemValue  )
{
	var s = bc_html_menuItemTxt;

	s = s.replace( /#MENUNAME#/g, bc_menuName );
	s = s.replace( /#MENUINDEX#/g, index );
	s = s.replace( /#ITEMNAME#/g, itemName );
	s = s.replace( /#ITEMVALUE#/g, itemValue);

	if ( bc_directWrite === true )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

function bc_searchItemTxt( searchForm, index, itemValue  )
{ 
	var s = '<DIV ID="#MENUNAME##MENUINDEX#DivId" CLASS="menuItem" WIDTH="100%" ONMOUSEOVER="javascript:hiLight( \'#MENUNAME##MENUINDEX#DivId\' );" ONMOUSEOUT="javascript:loLight( \'#MENUNAME##MENUINDEX#DivId\' );" onClick="change#MENUNAME#( #SEARCHFORM#, \'#ITEMVALUE#\');"> <A HREF="#" onClick="change#MENUNAME#( #SEARCHFORM#, \'#ITEMVALUE#\');" STYLE="font-size:8pt; width:100%;">#ITEMVALUE#</A></DIV>';
	
	s = s.replace( /#MENUNAME#/g, bc_menuName );
	s = s.replace( /#SEARCHFORM#/g, searchForm );	
	s = s.replace( /#MENUINDEX#/g, index );
	s = s.replace( /#ITEMVALUE#/g, itemValue);

	if ( bc_directWrite === true )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

function bc_menuEnd()
{
	var s = "</DIV>";

	// reset all of the values for the next menu
	bc_menuCount = 0;
	bc_nextId = 1;
	bc_menuName = "";
	bc_TextInMenu = false;
	bc_widget = "";
	hiddenItem = false;

	if ( bc_directWrite === true )
	{
		bc_directWrite = false;
		document.write( s );
	}
	else
	{
		return s;
	}
}

function ShowBCDropDownMenu( rootedAt )
{
       var parentNode;
       var availHeight;
       var menuHeight;
       var offsetParent;

       var menu = document.getElementById( rootedAt );
       
       
       if ( menu != null )
       {
              parentNode = menu.parentNode;
              offsetParent = menu.offsetParent;
              
              menu.style.left = (getX( parentNode ) - getX( offsetParent )) + 'px';
                                  
              // need to figure out if the menu can be shown either above or below the current point.
              if ( menu && menu.offsetWidth && menu.offsetHeight )
              {
                     menuHeight = menu.offsetHeight;

                     // Browser-dependent available height, with adjustment for scrollbar
                     availHeight = ( IE ? document.body.offsetHeight : window.innerHeight );

                     // Adjust y-position if menu would render below visible part of page
                     if ( $(document).scrollTop() + availHeight < ( getY( parentNode ) + menuHeight + parentNode.offsetHeight ) && ( getY( parentNode ) - menuHeight > 0 ) )
                     {
                           menu.style.top = (getY( parentNode ) - getY( offsetParent ) - menuHeight) + 'px';
                     }
                     else
                     {
                           menu.style.top = (getY( parentNode ) - getY( offsetParent ) + parentNode.offsetHeight) + 'px';
                     }
              }
       }
       
       showMenu( rootedAt );
}


// The follow is for the Search bar type dropdown.  It has different handlers for selection so it easier to
//
var bc_html_SelectStart =
	'<DIV ID="showSearchTypeMenu" CLASS="bcMenuSelect" onClick="showSearchTypeMenu(\'show#WIDGET#SearchTypeSelect\');return false;">'+
	'	<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">'+
	'		<TR>'+
	'			<TD STYLE="padding: 1px; padding-right: 4px;"><IMG ALT="" SRC="#IMG#spacer.gif" WIDTH="1" HEIGHT="1"></TD>' +
	'			<TD WIDTH="100%" ID="showSearchTypeMenuSelectTitle" CLASS="selectTitle"><A TITLE="#TOOLTIP#" HREF="#" onClick="showMenu( \'showSearchTypeMenu\', \'\' );return false" STYLE="font-size:8pt">#ITEMNAME#</A></TD>' +
	'			<TD><IMG TITLE="#TOOLTIP#" CLASS="selectArrow" ALT="" SRC="#IMG#selectarrow.png" WIDTH="17" HEIGHT="19"></TD>' +
	'		</TR>' +
	'	</TABLE>';

var bc_html_menuSelectStart =
	'<DIV ID="show#WIDGET#SearchTypeSelect" CLASS="menu">';

var bc_html_menuSelectItem =
	'<DIV ID="#WIDGET##WIDGETNAME#menuDivId" CLASS="menuItem" WIDTH="100%"'+
	'	ONMOUSEOVER="javascript:hiLight( \'#WIDGET##WIDGETNAME#menuDivId\' );"'+
	'	ONMOUSEOUT="javascript:loLight( \'#WIDGET##WIDGETNAME#menuDivId\' );"'+
	'	onClick="loLight( \'#WIDGET##WIDGETNAME#menuDivId\' ); changeSearchType(\'#WIDGETNAME#\');" >'+
	'	<A HREF="#" onClick="loLight( \'#WIDGET##WIDGETNAME#menuDivId\' ); changeSearchType(\'#WIDGETNAME#\');" STYLE="font-size:8pt; width:100%;">#ITEMNAME#</A>'+
	'</DIV>';

function bc_SelectStart( toolTip, itemName )
{
	var s = bc_html_SelectStart;

	s = s.replace( /#IMG#/g, bc_img );
	s = s.replace( /#TOOLTIP#/g, toolTip );
	s = s.replace( /#ITEMNAME#/g, itemName );
	s = s.replace( /#WIDGET#/g, bc_widget );

	if ( bc_directWrite === true )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

function bc_menuSelectStart( )
{
	var s = bc_html_menuSelectStart;

	s = s.replace( /#WIDGET#/g, bc_widget );

	if ( bc_directWrite === true )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

function bc_menuSelectItem( widgetName, itemName )
{
	var s = bc_html_menuSelectItem;

	s = s.replace( /#WIDGET#/g, bc_widget );
	s = s.replace( /#WIDGETNAME#/g, widgetName );
	s = s.replace( /#ITEMNAME#/g, itemName );

	if ( bc_directWrite === true )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

// Add in a spacer cell
var bc_html_spacerCell =
	'<TD NOWRAP><IMG SRC="#IMG#spacer.gif" ALT="" WIDTH="#WIDTHSTR#" HEIGHT="1"></TD>';

function bc_spaceCell( imgStr, wid, directWrite )
{
	var s = bc_html_spacerCell;

	var widVal = 3;

	if ( wid != null )
	{
		widVal = wid;
	}

	if ( imgStr == null )
	{
		throw "Bad Img string";
	}

	s = s.replace( /#IMG#/g, imgStr );
	s = s.replace( /#WIDTHSTR#/g, widVal );

	if ( directWrite === true )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

	//
	// The following is the original browsecoretable.js
	//
	var myRows;
	var myTypes;
	
	var c;
	var bv_alertMsg;
	var bv_viewLastVar;
	var imgSrc;
	var baseUrl;
	
	var browseCheckboxColumn;

	var allChecked = false;
	var changeSort = true;
	var containerId = "";
	var containerSubType = "";
	var currentPageNum = 1;
	var currentViewType = "3";
	var cookiePath = "";
	var columnDefinitionArray;
	var defaultPage = 1;
	var divSeg = 0;
	var doSort = true;
	var editingRow = -1;
	var filterValue = "";
	var flashTableRefresh = false;
	var haveBigImages = false;
	var hideContainerSize = false;
	var isIE = document.all ? 1 : 0;
	var isPaged = true;
	var loggingmessage = "";
	var mUrl = "";
	var nextUrl = "";
	var noMultiSelectButtons = false;
	var objFilter = "";
	var onInitOnlyatomic = false;
	var packetSize = -1;
	var pageSize = "";
	var topPickControlOpen = false;
	var btmPickControlOpen = false;
	var renderBigImages = false;
	var rowEditing = false; // boolean to stop multiple rows being edited
	var sortColumn = "name"; // This the default only
	var currentTab = ""
	var totalPages = -1;
	var totalCount = 0;
	var smallestPageSize = 25;
	var contentFilter = {};

	// Some timing values to be shown on the logging
	var timeTaken = -1;
	var dbTimeTaken = -1;
	var rtTimeTaken = -1;
	var renderTimeTaken = -1;
	// debug message settings
	var debugMsgs = false;
	var isDebugPaging = false;

	// define the array of the page size allowances
	var pageSizeArray = [ "25", "50", "75", "100", "125" ];
	
    // check for needed library
	try
	{
		if ( browsecorermenuExists === null )
		{
			throw "";
		}
	}
	catch( e )
	{
	    exceptionAlert( e, "Missing needed JavaScript: webnode/browsecorermenu.js" );
	}
	
	//--------------------------------------------------------------------------------------------
	// Logging utility
	function log( msg, clear )
	{
		if ( debugMsgs )
		{
			var i;

			var theCell = document.getElementById('loggingMsgId');

			if ( null !== theCell )
			{
				if ( undefined === clear || !clear )
				{
					var arr1 = theCell.innerHTML.split('|');
					if ( arr1.length > 5 )
					{
						theCell.innerHTML = msg;
						for ( i = 0; i <= 4; i++ )
						{
							theCell.innerHTML += "|" + arr1[i];
						}
					}
					else if ( theCell.innerHTML.length )
					{
						theCell.innerHTML = msg + "|" + theCell.innerHTML;
					}
					else
					{
						theCell.innerHTML = msg;
					}
				}
				else
				{
					theCell.innerHTML = msg;
				}
				loggingmessage = theCell.innerHTML;
			}
		}
	}
	
	//--------------------------------------------------------------------------------------------
	// Routines to set up the page history.  See support/core/ajax_dhtml_util.js for source.
	// Note that the dhtmlHistory code comes from http://code.google.com/p/reallysimplehistory/
	// which might have useful documentation.
	//
	// Updates the view based on a history token; uses cached data if possible.
	// This function is added as a history listener in browseCoreInitialize() 
	// above, and is called any time that the URL fragment (the part after "#") 
	// changes.
	function handleHistoryEvent(newLocation, historyData)
	{
		// see if we have cached the contents
		// of this topic in our history storage
		var currentPageObj = null;
		var hasChanged = false;

		log( "his1[" + newLocation +"]", false );
		if ( newLocation.length > 0 )
		{
			currentPageObj = historyData;
		}
		else
		{
			if ( !onInitOnlyatomic && historyStorage.hasKey("DhtmlHistory_page1" ))
			{
				currentPageObj = historyStorage.get( "DhtmlHistory_page1" );
			}
		}

		if ( null !== currentPageObj && undefined !== currentPageObj.page )
		{

			if ( !hasChanged && ( currentPageNum !== currentPageObj.page ) )
			{
				hasChanged = true;
				currentPageNum = currentPageObj.page;
			}

			if ( !hasChanged && ( pageSize !== currentPageObj.pageSize) )
			{
				hasChanged = true;
				pageSize = currentPageObj.pageSize;
			}

			if ( !hasChanged && ( objFilter !== currentPageObj.objFilter) )
			{
				hasChanged = true;
				objFilter = currentPageObj.objFilter;
			}

			if ( !hasChanged && ( filterValue !== currentPageObj.filterValue ) )
			{
				hasChanged = true;
				filterValue = currentPageObj.filterValue;
			}

			if ( hasChanged )
			{
				currentViewType = currentPageObj.view;
				ds = new Date();
				OTsendHTTPGetAjaxRequest( currentPageObj.url, folderContentsResponseLocal,  String.formatLoc( "Getting history for page n", currentPageNum ) );
			}
			else
			{
				if ( currentViewType !== currentPageObj.view  )
				{
					// given all of the other information being the same, we just need to redraw the
					// table with the same data.  There is no need to go back to the server for this
					updateViewType( currentPageObj.view );
					log( "his2[viewchange]", false );
					buildTable();
				}
			}
		}
	}

	// Utility function used by addPageToHistory that generates a history key
	// using current state variables.
	function makePageHistoryKey( pageNum )
	{
		var newKey;

		if ( undefined !== pageNum )
		{
			newKey = pageNum;
		}
		else
		{
			newKey = currentPageNum;
		}

		newKey += "_";
		newKey += currentViewType;
		newKey += "_";

		if ( "" !== objFilter )
		{
			newKey += objFilter;
		}

		newKey += "_";
		newKey += pageSize;
		newKey += "_";

		// add on the optional pieces
		if ( "" !== filterValue )
		{
			newKey += encodeURIComponent( filterValue );
		}

		return newKey;
	}
	
	// Generates a URL that can be used to fetch the page data associated
	// with the current state.
	function makeurl()
	{
		var url = baseUrl + "?func=ll&objAction=page&objID=" + containerId + "&page=" + currentPageNum + "&sort=" + sortColumn;

		// add on the optional pieces
		if ( containerSubType !== "" ) 
		{
			url += "&objType=" + containerSubType;
		}
		if ( filterValue !== "" )
		{
			url += "&filterValue=" + encodeURIComponent( filterValue );
		}

		if ( objFilter !== "" )
		{
			url += "&objFilter=" + objFilter;
		}

		if ( currentTab !== "" )
		{
			url += "&tab=" + encodeURIComponent( currentTab );
		}

		for ( var key in contentFilter ) 
		{
			for ( var i = 0; i < contentFilter[ key ].length; i ++ ) 
			{
				url += "&" + key + "=" + encodeURIComponent( contentFilter[ key ][ i ] );
			}
		}

		return url;
	}
	
	// Saves the current page data to history, by adding an appropriate
	// history token to the URL fragment and saving the page data in a
	// hash map.
	function addPageToHistory( saveToHistory )
	{
		var key;

		var currentPageObj = {};

		key = makePageHistoryKey();

		currentPageObj.view = currentViewType;
		currentPageObj.pageSize = pageSize;
		currentPageObj.url = makeurl();
		currentPageObj.objFilter = objFilter;
		currentPageObj.filterValue = filterValue;
		currentPageObj.page = currentPageNum;

		// add this to our history
		if ( saveToHistory && totalPages > 1 )
		{
			log( "add: " + key, false );
			dhtmlHistory.add( key, currentPageObj  );
		}
		return currentPageObj;
	}

	// Utility function that deserializes a page history key into state variables.
	function parsePageHistoryKey( key )
	{
		var changePage = false;

		// we need to split the key into components
		var arr1 = key.split('_');

		if ( 4 === arr1.length )
		{
			// arr1[0] == page number
			// arr1[1] == viewtype
			// arr1[2] == objectFilter
			// arr1[4] == filtervalue

			if ( arr1[0] !== currentPageNum )
			{
				currentPageNum = arr1[0];
				changePage = true;
			}

			if ( arr1[1] !== currentViewType )
			{
				currentViewType = arr1[1];
				changePage = true;
			}

			if ( arr1[2].length )
			{
				objFilter = arr1[2];
				changePage = true;
			}
			if ( arr1[3].length )
			{
				filterValue = decodeURIComponent( arr1[3] );
				changePage = true;
			}
			if ( true === changePage )
			{
				getFolderContents( currentPageNum, String.formatLoc( "Jumping to page n", currentPageNum ) );
			}
		}
	}
	
	function browseCoreInitialize()
	{
		log ( "totalpages: " + totalPages, false );

		if ( totalPages > 1 )
		{
			log( "init history", false );
			// initialize the DhtmlHistory
			// framework
			dhtmlHistory.initialize( imgSrc + "core/" );

			// set ourselves up to listen to
			// history events
			dhtmlHistory.addListener( handleHistoryEvent );
			log( "done history", false );

			onInitOnlyatomic = true;
			historyStorage.put("DhtmlHistory_page1", addPageToHistory( false ) );
			onInitOnlyatomic = false;
		}
	}

	//--------------------------------------------------------------------------------------------
	// utiltiy functions to set intitial data points
	//
	
	function setCurrentViewType( viewType )
	{
		currentViewType = viewType;
	}
	
	function setCurrentType( currentViewTypeStr )
	{
		setCurrentViewType( currentViewTypeStr );
	}

	function setAlertMsg( alertMsgStr )
	{
		bv_alertMsg = alertMsgStr;
	}

	function setDataID( dataID )
	{
		bv_dataID = dataID;
	}

	function setViewLastVar( viewLastVar )
	{
		bv_viewLastVar = viewLastVar;
	}
	
	function setImgSrc ( imgSrcStr )
	{
		imgSrc = imgSrcStr;
	}
	
	function setBaseUrl ( baseUrlStr )
	{
		baseUrl  = baseUrlStr;
	}
	
	function setMultiSelectButtons( noMSB )
	{
		noMultiSelectButtons = noMSB;

		// go and flip the
		if ( browseCheckboxColumn != undefined )
		{
			browseCheckboxColumn.SetIsEnabled( !noMultiSelectButtons );
		}
	}
	function setNextURL( nextUrlStr )
	{
		nextUrl = nextUrlStr;
	}

	function setFilterValue( newFilterValue )
	{
		filterValue = newFilterValue;
	}
	
	function setObjFilter( newObjFilter )
	{
		objFilter = newObjFilter;
	}
	
	function setContainerId( dataId )
	{
		containerId = dataId;
	}

	function setContainerSubType( subType )
	{
		containerSubType = subType;
	}

	function setCurrentPage( pageNum )
	{
		currentPageNum = pageNum;
	}

	function setSortColumn( sortCol )
	{
		sortColumn = sortCol;
	}

	function setPageSize( pageSz )
	{
		pageSize = pageSz;
	}

	function setIsPaged( paged )
	{
		isPaged = paged;
	}

	function setDebugPagingInformation( debugPaged )
	{
		isDebugPaging = debugPaged;
	}

	function setHideSize( newSetHideSize )
	{
		hideContainerSize = newSetHideSize;
	}

	function setCookiePath( path )
	{
		cookiePath = path;
	}

	function setTab( tab )
	{
		currentTab = tab;
	}
	
	function setPStageForZeroContents( pstageIDset )
	{
		if ( ( pstageIDset != null ) && ( pstageIDset > 0 ) )
		{
			hasStagedContent = true;
			pstageID = pstageIDset;
		}
	}

	function addContentFilter( key, value )
	{
		if ( !( key in contentFilter ) )
		{
			contentFilter[ key ] = [];
		}
		contentFilter[ key ].push( value );
	}
	
	function doSubmit( s, action )
	{
		var		len = document.BrowseViewFrm.elements.length;
		var		cnt = 0;
		var		j;

		for ( var i = 0; i < len; i++ )
		{
			if ( document.BrowseViewFrm.elements[ i ].checked && document.BrowseViewFrm.elements[ i ].value != 'checkbox' )
			{
				cnt++;
				j = i;
				if ( cnt > 1 )
				{
					break;
				}
			}
		}

		if ( cnt !== 0 )
		{
			if ( cnt > 1 )
			{
				document.BrowseViewFrm.func.value = s;

				document.BrowseViewFrm.submit();
			}
			else
			{
				document.BrowseViewFrm.func.value = "ll";
				document.BrowseViewFrm.objAction.value =  action;
				document.BrowseViewFrm.objId.value = document.BrowseViewFrm.elements[ j ].value;

				document.BrowseViewFrm.submit();
			}
		}
		else
		{
			if (document.BrowseViewFrm && document.BrowseViewFrm.top_checkbox)
			{
				document.BrowseViewFrm.top_checkbox.focus();
			}
			alert( bv_alertMsg );
		}
	}

	function doSubmit2( action, type )
	{
		if( action == "Edit" )
		{
			document.BrowseViewFrm.objAction.value = "editconfig";
			document.BrowseViewFrm.nextUrl.value =  document.BrowseViewFrm.nextUrl.value + "&viewType=" +  currentViewType;
		}
		else
		{
			document.BrowseViewFrm.objAction.value = "browse";
		}
		
		currentViewType = type;
		
		document.BrowseViewFrm.func.value = "ll";
		document.BrowseViewFrm.viewType.value = type;
		document.BrowseViewFrm.objId.value = bv_dataID;
		document.BrowseViewFrm.submit();
	}

	function doSubmitTab( tabName )
	{
		document.BrowseViewFrm.viewTab.value = tabName;

		doSubmit2( '', bv_viewLastVar );
	}
	
	// preload the 'busy' image
	var		popupBak;
	var		popupMsg;
	var		popupTimer;
	var		theProgressDiv;

	var		iebody = (document.compatMode && document.compatMode !== "BackCompat")? document.documentElement : document.body;
	var		progessImg = new Image();

	// The "Indeterminate Progress" popup image and wrapping DIV is initialized onload
	function initPopup()
	{
		var theProgressDivStyle;

		theProgressDiv = document.getElementById("progressPopupDiv");

		if ( null !== theProgressDiv )
		{
			theProgressDivStyle = theProgressDiv.style;
			theProgressDivStyle.visibility="visible";
			theProgressDivStyle.display="none";

			// Load up the progress gif.
			progessImg.src= imgSrc + "circleecm_progmeter40x40.gif";
		}
	}

	// Schedules the popup to show with the appropriate message and background colour.
	function popup( msg, bak )
	{
		popupMsg = msg;
		popupBak = bak;

		this.popupTimer = setTimeout( showTimeredPopup, 2 );
	}

	function getScrollXY()
	{
		var scrOfX = 0, scrOfY = 0;
		var scrollTop = $(document).scrollTop();

		if ( document.body && ( document.body.scrollLeft || scrollTop ) )
		{

			//DOM compliant
			scrOfX = document.body.scrollLeft;
			scrOfY = scrollTop;

		}
		else if ( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) )
		{

			//IE6 standards compliant mode
			scrOfX = document.documentElement.scrollLeft;
			scrOfY = document.documentElement.scrollTop;

		}

		return [ scrOfX, scrOfY ];
	}

	// Actually shows the popup with the message popupMsg and background colour popupBak.
	function showTimeredPopup()
	{
		var content;
		var theProgressDivStyle;

		var arrayPageSize = getPageSize();
		// need to take the scroll into account
		var offsetArray = getScrollXY() 
		var dsocleft = offsetArray[0]; 
		var dsoctop = offsetArray[1]; 

		if ( 0 === popupMsg.length )
		{
			return;
		}
		this.popupTimer = null;

		content = getPopupContent( popupMsg, popupBak, "" );

		// populate the Cells
		theProgressDiv = document.getElementById("progressPopupDiv");

		theProgressDiv.innerHTML = content;

		var theProgressImg=document.getElementById("prgImg");
		theProgressImg.src = progessImg.src;

		theProgressDivStyle = theProgressDiv.style;
		theProgressDivStyle.display = "";
		theProgressDivStyle.top = (Math.round (((arrayPageSize[3] - 35 ) / 2)+dsoctop) + 'px');
		theProgressDivStyle.left = ( Math.round (((arrayPageSize[2] - 221 ) / 2)+dsocleft) + 'px') ;
	}

	function getPopupContent( msg, bgColor, imgSrc )
	{
		var content;
	
		content = "<TABLE WIDTH='150' BORDER='1' BORDERCOLOR='black' CELLPADDING='2' CELLSPACING='0' BGCOLOR='" + bgColor + "'>";
		content = content + "<TR>";
		content = content + "	<TD>";
		content = content + "		<TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0' WIDTH='100%'>";
		content = content + "			<TR>";
		content = content + "				<TD VALIGN='MIDDLE'><IMG SRC='" + imgSrc + "' ID='prgImg' ALT='' BORDER='0'></TD><TD valign='middle' nowrap>&nbsp;<FONT COLOR='black' SIZE='2'>&nbsp;" + msg + "&nbsp;</FONT></TD>";
		content = content + "			</TR>";
		content = content + "		</TABLE>";
		content = content + "	</TD>";
		content = content + "</TR>";
		content = content + "</TABLE>";
		
		return content;
	}

	// Hides the popup.
	function killPopup()
	{
		var theProgressDivStyle;

		popupMsg = "";
		popupBak = "";

		if ( null !== this.popupTimer )
		{
			clearTimeout( this.popupTimer );
			this.popupTimer = null;
		}

		theProgressDiv = document.getElementById("progressPopupDiv");
		if ( null !== theProgressDiv )
		{
			theProgressDivStyle = theProgressDiv.style;
			theProgressDivStyle.display = "none";
		}
		theProgressDiv.innerHTML = null;
	}

	

	// setPageDropDownValues
	// This function is going to try and use the value being sent in
	// to fill the dropdown.  The source file needs to send in a list something
	// like the following:
	//
	// setPageDropDownValues( '[ "25", "50", "75", "100", "125" ]' )
	//
	// Exception will be thrown on error
	//
	function setPageDropDownValues( pageDropdownList )
	{
		var localPageDropdownList;

		try
		{
			// convert the string block into a json object.
			
			localPageDropdownList = OTfunc.toJSON(pageDropdownList);
			
			pageSizeArray = localPageDropdownList;

			if ( pageSizeArray.length > 0 )
			{
				// Since the list is ordered by ascending size
				// we can take the first element.
				// NOTE: we could evaluate the smallest element, maybe need that
				// later on.
				smallestPageSize = parseInt( pageSizeArray[0], 10 );
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Error: browse.js/setPageDropDownValues.  Corrupt data in generating list pull down. " );
		}
	}

	function setBrowseColumnDefinition( browseColumnDefinitionList )
	{

		var localBrowseColumnDefinitionList;
		var	columns;
		var i;
		var j;

		try
		{
			localBrowseColumnDefinitionList = OTfunc.toJSON( browseColumnDefinitionList );

			if ( localBrowseColumnDefinitionList.ok === true )
			{

				if ( undefined === columnDefinitionArray )
				{
					columns = localBrowseColumnDefinitionList.columns;

					columnDefinitionArray = [];

					j = 0;

					for ( i = 0; i < columns.length; i++ )
					{
						if ( columns[i].isDefault )
						{
							// Double check that this default column actually exists.  If not, then ignore it.
							if ( eval( "typeof(" + columns[i].columnID  + ") != 'undefined'" ) )
							{
								eval( "columnDefinitionArray[j] = new " + columns[i].columnID + "();" );
								j++;
								if ( columns[i].columnID == "checkboxColumn" )
								{
									browseCheckboxColumn = columnDefinitionArray[j];
								}
							}
						}
						else if ( columns[ i ].DisplayAsLink )
						{
							if ( columns[ i ].type == 14 )
							{
								//User type column with link on name
								columnDefinitionArray[j] = new userColumnWithURL(columns[i].displayName, columns[i].sortKey, columns[i].sortable, columns[i].columnEMWidth + "em", columns[i].alignment, columns[i].longText, columns[i].columnName);
								j++;
							}
							else
							{
								//Non-user type column with link on value
								columnDefinitionArray[j] = new columnWithURL(columns[i].displayName, columns[i].sortKey, columns[i].sortable, columns[i].columnEMWidth + "em", columns[i].alignment, columns[i].longText, columns[i].columnName, columns[i].URL, columns[i].NewWindow, columns[i].TitleText, columns[i].DisplayValue);
								j++;
							}
						}
						else
						{
							columnDefinitionArray[j] = new arbitraryColumn( columns[i].displayName, columns[i].sortKey, columns[i].sortable, columns[i].columnEMWidth + "em", columns[i].alignment, columns[i].longText, columns[i].columnName );
							j++;
						}
					}
				}

			}
			else
			{
				alert( localBrowseColumnDefinitionList.errMsg );				
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Error: browse.js/setBrowseColumnDefinition.  Corrupt or missing data in generating column definitions." );
		}
	}

	//--------------------------------------------------------------------------------------------
	// This function is called when the object type filter is used.
	// It makes a call to the server to update the view based on the new
	// filter information.
	function ChangeBrowsePageObjectFilter( val, val2  )
	{
		// Need to set the page back to 1
		setCurrentPage( 1 );

		// Set the type value
		objFilter = val2;

		// actually change the selected menu choice
		document.getElementById('selectedBrowsePageObjectFilter').innerHTML = document.getElementById('BrowsePageObjectFilter' + val + 'DivId').innerHTML;

		getFilterEditCellContent( false );

		getFolderContents( currentPageNum, LocString( "Searching..." ) );
	}
	
	//--------------------------------------------------------------------------------------------
	// timeout variable
	var t = null;
	function cancelFilterTimeout()
	{
		if ( undefined !== t )
		{
			clearTimeout(t);
			t = null;
		}
	}

	// Called when the user changes the number of items that should be displayed
	// on one page.  Makes a call to the server to update the view.
	function ChangeBrowsePageSize( val, val2  )
	{
		// If the page size selection is not different than the
		// the already presented set of contents then treat this as a no-op
		if ( val === pageSize && parseInt( val, 10 ) === myRows.length )
		{
			return;
		}

		// If the number of items on the page is smaller than what
		// is already there, a "flash" of the parent table is needed
		// to re-adjust the rendering of the contents to shrink the
		// table.  This appears to be a Firefox issue only verified on 2.0.0.6.
		if ( FF )
		{
			if ( parseInt( val, 10 ) < parseInt( pageSize, 10 ) )
			{
				flashTableRefresh = true;
			}
		}

		pageSize = val;

		Set_Cookie( "LLPageSizeCookie", pageSize, 0, cookiePath, false, false );
		getFolderContents( defaultPage, String.formatLoc( "Retrieving page n", defaultPage ) );

	}

	// Does client-side sorting on the current view based on the current value
	// of sortColumn, and rebuilds the view by calling buildTablE().
	function restoreSortOrder()
	{
		var		colObject ;
		
		var		doReverse = false;
		var		col = sortColumn;
		
		
		if( sortColumn.charAt( 0 ) === '-' )
		{
			doReverse = true;
			col = sortColumn.substring( 1 );
		}			
		
		for ( idx = 0; idx < columnDefinitionArray.length ; idx++ )
		{

			if( columnDefinitionArray[ idx ].GetColName() == col )
			{
				colObject = columnDefinitionArray[ idx ];
				myRows.sort( colObject.SortComparitor ) ;	

			}

		}

		if( doReverse === true )  
		{
			myRows.reverse();
		}

		buildTable();

	}
	
	// Updates mUrl with a new value only if it currently has no value.
	function writeOnceUrl( url )
	{
		if ( mUrl.length  < 1 )
		{
			mUrl =  url ;
		}
	}
	
	// This function is used to conditionally set the HREF of the configure
	// button.  If mUrl is set, then the configure button takes on that URL;
	// if mUrl is not set, then mUrl is set to the configure button's current
	// HREF and the configure button retains its current HREF.
	function setConfigUrl( Size )
	{

		var editConfiglink = document.getElementById( "ConfigLink" );

		if( null !== editConfiglink )
		{
			writeOnceUrl( editConfiglink.href );

			editConfiglink.href =  mUrl;
		}
	}

	// Test for an input field enter key stroke
	function cellFilter( theForm, e )
	{
		var c = (e.which) ? e.which : e.keyCode;

		// On IE capture the enter to do no further processing
		if ( c === 13 || c === 3 )
		{
			getFilterEditCellContent( true );
			return false;
		}
		return true;
	}

	//--------------------------------------------------------------------------------------------
	// TABLE ROW DEFINITION
	// Basically just a struct of data with no methods.

	// object constructor
	function tableRow( dataId, subTypeStr, nameStr, linkStr, sizeStr, dateStr, dateReal, imgStr )
	{
		this.dataId = dataId;
		this.type = subTypeStr;
		this.typeName = '';
		this.name = nameStr;
		this.link = linkStr;
		this.size = sizeStr;
		this.date = dateStr;
		this.datesort = dateReal;
		this.imgStr = imgStr;
		this.imgLargeStr = '';
		this.imgThumbnailStr = '';
		this.imgRealLargeStr = '';
		this.checked = false;
		this.promotedCmds = '';
		this.modifiedImgs = '';
		this.editable = true;
		this.savedClass = '';
		this.checked = false;
		this.catalog = '';
		this.imgStatus = '';
		this.statusName = '';
		this.container = false;
	}
	
	//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// COLUMN OBJECT DEFINITIONS
	// To be instantiated and used to define columns in the detail view
	//
	// BrowseViewColumn is essentially a superclass for:
	// - checkBoxColumn
	// - typeColumn
	// - nameWthPrmtdCmdsColumn  ("name with promoted commands column")
	// - sizeColumn
	// - dataidColumn
	// - dateColumn
	// - arbitraryColumn
	// - columnWithURL
	// - userColumnWithURL
	
	function BrowseViewColumn()
	{
		OTAddProperty( this, "boolean", "isEnabled", true );
		OTAddProperty( this, "boolean", "sort", false );
		OTAddProperty( this, "boolean", "sortDirectionDesc", false );
		OTAddProperty( this, "string", "colName", "unDefinedValue");
		OTAddProperty( this, "string", "headerName", "" );
		OTAddProperty( this, "string", "headerClassName", "browseListHeaderType");
		OTAddProperty( this, "string", "headerScope", "colgroup");
		OTAddProperty( this, "string", "headerSpan", "1");
		OTAddProperty( this, "string", "sortMessage", "");
		OTAddProperty( this, "string", "cellClassName", "browseItemTypeRight");
		OTAddProperty( this, "string", "cellWidth", "" );
		OTAddProperty( this, "string", "shimWidth", "" );
		OTAddProperty( this, "string", "colSpan", "1");
		OTAddProperty( this, "boolean", "nowrap", true);
	}

	// This method is left for "subclasses" to implement.
	BrowseViewColumn.prototype.getCellValue = function( dataRow, rowNo )
	{
		return "-0-";
	};

	// Sets some instance variables to be used to generate the header cell for this column.
	BrowseViewColumn.prototype.SetHeaderParams = function( name, className, scope )
	{
		try
		{
			if ( undefined === name )
			{
				throw "Header name null";
			}
			else
			{
				if ( "" !== name )
				{
					this.headerName = LocString( name );
				}
			}

			if ( ( undefined !== className ) && ( className.length > 0 ) )
			{
				this.headerClassName = className;
			}

			if ( ( undefined !== scope ) && ( scope.length > 0 ) )
			{
				this.headerScope = scope;
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/BrowseViewColumn.SetHeaderParams." );
		}
	};

	// Sets some instance variables to be used to generate the data cells for this column.
	BrowseViewColumn.prototype.SetCellParams = function( classNameStr, cellWidthStr, colSpanStr )
	{

		if ( ( undefined !== classNameStr ) && ( classNameStr.length > 0 ) )
		{
			this.cellClassName = classNameStr;
		}
		if ( ( undefined !== cellWidthStr ) && ( cellWidthStr.length > 0 ) )
		{
			this.cellWidth = cellWidthStr;
		}
		if ( ( undefined !== colSpanStr ) && ( colSpanStr.length > 0 ) )
		{
			this.colSpan = colSpanStr;
		}
	};

	// Left for "subclasses" to define.
	BrowseViewColumn.prototype.DataConversion = function( obj )
	{
		// The regular columns do not need this
	};

	// Creates a header cell for this column by manipulating the DOM.
	// rowStruct is a reference to the <TR> element representing the header row
	// contents is not used
	// cellCount allows us to create the header cell in the right column
	BrowseViewColumn.prototype.AddCellHeader = function( rowStruct, contents, cellCount )
	{
		var		cell;
		var		newLink;
		var		linkText;

		try
		{
			if ( true === this.isEnabled )
			{
				// Add the cell for the type column
				cell = rowStruct.insertCell( cellCount++ );
				cell.className = this.headerClassName;
				if ( this.cellWidth != "" )
				{
					cell.style.width = this.cellWidth;
				}
				
				if ( this.shimWidth != "" )
				{
					cell.innerHTML	+= "<div style='width: " + this.shimWidth + "; height: 0px; line-height: 0px'></div>";
				}
					
				if ( this.headerSpan > 1 )
				{
					cell.colSpan = this.headerSpan;
				}
				cell.scope = this.headerScope;

				linkText = document.createTextNode( this.headerName );

				if ( true === this.sort )
				{
					newLink = document.createElement('a');
					newLink.appendChild( linkText );
					linkText = 'sortTableCol( true, "' + this.identifier + '" );return false';
					newLink.setAttribute('href', '#' );
					newLink.setAttribute('onClick', linkText );
					cell.appendChild( newLink );
					cell.innerHTML += SortIndicatorGet( this.colName );
				}
				else
				{
					cell.appendChild( linkText );
				}
				
				// Add code to enable hover behaviour:
				$(cell).mouseenter(function() {
					$(this).addClass("browseListHeader-mo");
				}).mouseleave(function() {
					$(this).removeClass("browseListHeader-mo");
				});
			}

		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/BrowseViewColumn.AddCellHeader." );
		}
		return cellCount;
	};

	// Adds a data cell to the browseview table by manipulating the DOM.
	// rowStruct is the <TR> element to which we will add the cell
	// dataRow is the data pertaining to the node we are representing in this row.
	// cellCount tells us which column we should add our cell to
	// rowNo allows us to generate the proper ID and style for this cell
	// The cell's innerHTML is determined by a call to this.getCellValue()
    	BrowseViewColumn.prototype.AddCell = function( rowStruct, dataRow, cellCount, rowNo )
	{
		var cell;
		var whitespace;

		try
		{
			if ( true === this.isEnabled )
			{
				// The type icon with the status
				cell = rowStruct.insertCell( cellCount++ );
				$(cell).addClass( this.cellClassName );
				$(cell).attr( "data-otname", this.identifier );
				cell.width = this.cellWidth;
				if ( this.colSpan > 1 )
				{
					cell.colSpan = this.colSpan;
				}

				if ( true === this.nowrap )
				{
					whitespace = " style='white-space:nowrap;'";
					
					// This line fixes a layout problem in WebKit-based browsers.
					cell.style.width = this.cellWidth;
				}
				else
				{
					whitespace = "";
				}
				cell.innerHTML = "<span " + whitespace + ">" + this.getCellValue( dataRow, rowNo ) + "</span>";
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/BrowseViewColumn.AddCell." );
		}
		return cellCount;
	};

	// Left for "subclasses" to implement.
	BrowseViewColumn.prototype.SortComparitor = function (a, b)
	{
		try
		{
			if ( ( true === this.isEnabled ) && ( true === this.sort ) )
			{
				throw "Sort is not defined, no sort comparitor";
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/BrowseViewColumn.SortComparitor." );
		}
	    return 0;
	};

	// Determines sort order and if there is only one page of data, sorts on 
	// client and calls buildTable(), otherwise makes an AJAX call via 
	// getFolderContents()
	BrowseViewColumn.prototype.sortTableCol = function ( headerClick )
	{
		var msgStr;
		var	nextURL;

		var	prevSortColumn = sortColumn;
		var	prevSortColumnName = sortColumn.indexOf( "-" ) == 0 ? sortColumn.substring( 1 ) : sortColumn;
		var	negColName = "-" + this.colName;

		try
		{
			if ( true === this.isEnabled )
			{
				if ( true === this.sort )
				{
					if ( changeSort )
					{
					
						//
						// Need to determine the first step order of the sort.  
						// For size and date fields it should be default descending 
						// the rest are ascending 
						//					
						if ( true === this.sortDirectionDesc ) 
						{
						
							sortColumn = ( sortColumn !== negColName ) ? negColName : this.colName ;
							
						}
						else
						{
							sortColumn = ( sortColumn !== this.colName ) ? this.colName : negColName;
						}
						
						//
						// The sort changes, so the nexturl needs to change as well 
						// Update the more bar, the objects nexturl in the browse widget 
						// and the new menu item
						//
						nextUrl = String.format( "%1?func=ll&objid=%2&objAction=browse&sort=%3", baseUrl , containerId, sortColumn )
						setMoreParam( "nextUrl=" + escape( nextUrl ) );
						setNextURL( nextUrl );
						nm_setNextUrl( nextUrl );

					}

						// Evaluate the user message to indicate the
						// operation taking plac, in this case sort and
						// if possible what column
						if ( undefined === this.sortMessage || ( 0 === this.sortMessage.length ) )
						{
							if ( 0 < this.headerName.length )
							{
								msgStr = String.formatLoc( "Sorting by %1...", this.headerName.toLowerCase() );
							}
							else
							{
								msgStr = LocString( "Sorting" );
							}
						}
						else
						{
							msgStr = LocString( this.sortMessage );
						}
						
						// If there are more than one page
						// then we need to get page one
						getFolderContents( 1, msgStr );

				}
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/BrowseViewColumn.sortTableCol." );
		}
	};

	//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// The following are "subclasses" of BrowseViewColumn:		
		
	//- - - - - - checkbox column - - - - - - -

	function checkboxColumn ()
	{
		this.identifier = "checkboxColumn";
		this.SetHeaderParams( "", "browseListHeaderCheck" );
		this.SetCellParams( "browseItemCheck" );
		this.SetCellWidth( "1%" );
		this.SetIsEnabled( !noMultiSelectButtons );
		this.AddCellHeader = function( rowStruct, contents, cellCount )
		{
			var		cell;

			var		isChecked = "";

			try
			{
				if ( true === this.isEnabled )
				{
					// Add the cell for the type column
					cell = rowStruct.insertCell( cellCount++ );
					cell.className = this.headerClassName;
					cell.width = this.cellWidth;
					if ( this.headerSpan > 1 )
					{
						cell.colSpan = this.headerSpan;
					}
					cell.scope = this.headerScope;

					isChecked = '';
					if ( allChecked )
					{
						isChecked = "checked";
					}
					cell.innerHTML = "<input type='checkbox' data-otname='selectDeselectAll' name='top_checkbox' value='checkbox' title='" + LocString('SelectDeselectAll') + "' onClick='ToggleAll( this, \"nodeID\" );' isChecked >";
				}
			}
			catch(e)
			{
				exceptionAlert( e, "Issue occured in browse.js/BrowseViewColumn.AddCellHeader." );
			}
			return cellCount;
		};

		this.getCellValue = function( dataRow, rowNo )
		{
			var		innerHTMLStr;
			var		isChecked = '';

			if ( dataRow.checked )
			{
				isChecked = "checked";
			}

			innerHTMLStr = "<INPUT ID='" + htmlEscape(dataRow.name) + "_checkbox' data-otname='objSelector' TYPE='checkbox' NAME='nodeID' VALUE='" + dataRow.dataId +"' TITLE='";
			innerHTMLStr += LocString( "SelectDeselect" );
			innerHTMLStr += "' ONCLICK='javascript:Toggle( \"top_checkbox\", this, \"nodeID\" );' " + isChecked + " >";

			return innerHTMLStr;
		};
	}
	checkboxColumn.prototype = new BrowseViewColumn();

	//- - - - - - type icon column - - - - - - -
	function typeColumn()
	{
		this.identifier = "typeColumn";
		this.SortComparitor = function(a, b)
		{
			if (a.typesort < b.typesort) {return -1;}
			if (a.typesort > b.typesort) {return 1;}
			return 0;
		};

		this.getCellValue = function( dataRow, rowNo )
		{
			return makeSmallIconLink( dataRow );
		};

		this.SetHeaderParams( LocString( "Type" ) );
		this.SetCellParams( "browseItemTypeRight" );
		this.SetSort( true );
		this.SetColName( "subtype" );
		this.SetCellWidth( "1%" );
	}
	
	typeColumn.prototype = new BrowseViewColumn();

	//- - - - - - name and promoted commands column - - - - - - -
	function nameWthPrmtdCmdsColumn()
	{
		this.identifier = "nameWthPrmtdCmdsColumn";
		this.promoColCmds = "promotedCmds";
		this.nameColCmds = "nameColumn";
		this.SortComparitor = function(a, b)
		{
			//localecompare returns lowercase first alway, so we cant use it.
			if (a.namesort < b.namesort) {return -1;}
			if (a.namesort > b.namesort) {return 1;}
				return 0;
			
		};

		this.getCellValue = function( dataRow, rowNo )
		{
			return makeRowNameCell( dataRow, rowNo );
		};

		this.SetHeaderParams( LocString( "Name" ), "browseListHeaderName" );
		this.SetCellParams( "browseItemName" );
		this.SetSort( true );
		this.SetColName( "name" );
		//Don't set a width - we want this column to expand to fill any empty space.
		this.SetHeaderSpan( "2" );
		this.SetNowrap( false );
		this.SetShimWidth( "25em" );

		this.AddCell = function( rowStruct, dataRow, cellCount, rowNo )
		{
			var cell;

			try
			{
				// The type icon with the status
				cell = rowStruct.insertCell( cellCount++ );
				cell.className = this.cellClassName;
				$(cell).attr( "data-otname", this.nameColCmds );
				if ( true === this.nowrap )
				{
					cell.style.whiteSpace = 'nowrap';
				}
				cell.innerHTML = this.getCellValue( dataRow, rowNo );
				if ( dataRow.promotedCmds.length === 0  )
				{
					cell.colSpan = 2;
				}
				else
				{
					cell = rowStruct.insertCell( cellCount++ );
					cell.className = "promotedCmds";
					$(cell).attr( "data-otname", this.promoColCmds )
					cell.innerHTML = dataRow.promotedCmds;
				}

			}
			catch(e)
			{
				exceptionAlert( e, "Issue occured in browse.js/nameWthPrmtdCmdsColumn.AddCell." );
			}
			return cellCount;
		};
	}
	nameWthPrmtdCmdsColumn.prototype = new BrowseViewColumn();
	
	//- - - - - - size column - - - - - - -
	function sizeColumn()
	{
		this.identifier = "sizeColumn";
		this.SortComparitor = function(a, b)
		{
			if (a.sizesort < b.sizesort) {return -1;}
			if (a.sizesort > b.sizesort) {return 1;}
			return 0;
		};

		this.getCellValue = function( dataRow, rowNo )
		{
			return dataRow.size + '&nbsp;';
		};

		this.SetHeaderParams( LocString( "Size" ), "browseListHeaderSize" );
		this.SetCellParams( "browseItemSize" );
		this.SetSort( true );
		this.SetSortDirectionDesc( true );
		this.SetColName( "size" );
		this.SetCellWidth( "2%" );
	}
	sizeColumn.prototype = new BrowseViewColumn();

	//- - - - - - date column - - - - - - -
	function dateColumn()
	{
		this.identifier = "dateColumn";
		this.SortComparitor = function(a, b)
		{
			if (a.datesort < b.datesort) {return -1;}
			if (a.datesort > b.datesort) {return 1;}
			return 0;
		};

		this.getCellValue = function( dataRow, rowNo )
		{
			return dataRow.date + '&nbsp;';
		};

		this.SetHeaderParams( LocString( "Modified" ), "browseListHeaderDate" );
		this.SetCellParams( "browseItemDate" );
		this.SetSort( true );
		this.SetSortDirectionDesc( true );
		this.SetColName( "modifydate" );
		this.SetCellWidth( "2%" );
		this.SetSortMessage( "Sorting by date..." );
	}
	dateColumn.prototype = new BrowseViewColumn();
//Recycle Bin
	//- - - - - - deleted date column - - - - - - -
	function deleteDateColumn()
	{
		this.identifier = "deleteDateColumn";
		this.SortComparitor = function(a, b)
		{
			if (a.datesort < b.datesort) {return -1;}
			if (a.datesort > b.datesort) {return 1;}
			return 0;
		};

		this.getCellValue = function( dataRow, rowNo )
		{
			return dataRow.deleteDate + '&nbsp;';
		};

		this.SetHeaderParams( LocString( "Deleted Date" ), "browseListHeaderDate" );
		this.SetCellParams( "browseItemDate" );
		this.SetSort( true );
		this.SetSortDirectionDesc( true );
		this.SetColName( "DeleteDate" );
		this.SetCellWidth( "2%" );
		this.SetSortMessage( "Sorting by deleted date..." );
	}
	deleteDateColumn.prototype = new BrowseViewColumn();

	//- - - - - - deleted date column - - - - - - -
	function purgeDateColumn()
	{
		this.identifier = "purgeDateColumn";
		this.SortComparitor = function(a, b)
		{
			if (a.datesort < b.datesort) {return -1;}
			if (a.datesort > b.datesort) {return 1;}
			return 0;
		};

		this.getCellValue = function( dataRow, rowNo )
		{
			return dataRow.purgeDate + '&nbsp;';
		};

		this.SetHeaderParams( LocString( "Purge Date" ), "browseListHeaderDate" );
		this.SetCellParams( "browseItemDate" );
		this.SetSort( true );
		this.SetSortDirectionDesc( true );
		this.SetColName( "purgeDate" );
		this.SetCellWidth( "2%" );
		this.SetSortMessage( "Sorting by purge date..." );
	}
	purgeDateColumn.prototype = new BrowseViewColumn();

//Recycle Bin
	//- - - - - - dataid column - - - - - - -
	function dataidColumn()
	{
		this.identifier = "dataidColumn";
		this.SortComparitor = function(a, b)
		{
			if (a.dataidsort < b.dataidsort) {return -1;}
			if (a.dataidsort > b.dataidsort) {return 1;}
			return 0;
		};
		
		this.getCellValue = function( dataRow, rowNo )
		{
			return dataRow.dataId + '&nbsp;';
		};

		this.SetHeaderParams( LocString( "ID" ), "browseListHeaderDataID" );
		this.SetCellParams( "browseItemDataID" );
		this.SetSort( true );
		this.SetSortDirectionDesc( true );
		this.SetColName( "dataId" );
		this.SetCellWidth( "2%" );
		this.SetSortMessage( "Sorting by id..." );
	}
	dataidColumn.prototype = new BrowseViewColumn();

	//- - - - - - parent location - - - - - - -
	function parentColumn()
	{
		this.identifier = "parentColumn";
		this.getCellValue = function( dataRow, rowNo ) 
		{
			return dataRow.parentURL;
		};

		this.SetCellWidth( "2%" );
		this.SetShimWidth( "13em" );
		this.SetHeaderParams( LocString( "Location" ), "browseListHeaderLocation" );
		this.SetCellParams( "browseItemLocation" );
		this.SetSort( false );
		this.SetColName( "parentUrl" );
		this.SetNowrap( false );
	}
	parentColumn.prototype = new BrowseViewColumn();
	
	//- - - - - - collections location column - - - - - - -
	function locationColumn()
	{
		this.identifier = "locationColumn";
		this.SortComparitor = function(a, b)
		{
		    if (a.locationsort < b.locationsort) {return -1;}
		    if (a.locationsort > b.locationsort) {return 1;}
		    return 0;
		};
	
		this.DataConversion = function ( obj )
		{
			if ( null == obj.parentID )
			{
				if ( null == obj.location )
				{
					obj.parentID = "-1";
				}
				else
				{
					throw "no parentID in object";
				}
			}
	
			obj.location = refactorVariable( obj.location );
			obj.parentID = refactorVariable( obj.parentID );
			obj.locationsort = parseInt( obj.parentID );
		};
	
	
		this.getCellValue = function ( obj, rowNo )
		{
			var		innerHTMLStr;
			
			innerHTMLStr = obj.parentURL;
			
			// create hidden field to store item's subtype
			// used by excludeSingleItem function in collections/colbrowseview.js
			innerHTMLStr += "<INPUT TYPE='hidden' NAME='subtype" + obj.dataId + "' ID='subtype" + obj.dataId + "'";
			innerHTMLStr += "VALUE=" + obj.type + " >";
	
			return innerHTMLStr;
		};
	
		this.SetHeaderParams( LocString( "Location" ), "browseListHeaderLocation" );
		this.SetCellParams( "browseItemLeftText" );
		this.SetSort( true );
		this.SetSortMessage( LocString( "Grouping by location" ) );
		this.SetColName( "location" );
		this.SetCellWidth( "2%" );
	}
	locationColumn.prototype = new BrowseViewColumn();
	
	//- - - - - - collections versions column - - - - - - -
	function versionsColumn()
	{
		this.identifier = "versionsColumn";
		this.DataConversion = function ( obj )
		{
			var		funcKey;
			var		pIdKey;
		
			obj.verTemplate = refactorVariable( obj.verTemplate );
			
			obj.verKeys = refactorVariable( obj.verKeys );
			
			obj.verKeyArray = obj.verKeys.split( ',' );
			
			// Iterate over versions, unpacking data
			for ( var i = 0; i < obj.verKeyArray.length; i++ )
			{	
				// Version functions menu URL
				funcKey = 'vFunc_' + obj.verKeyArray[ i ];
				obj[ funcKey ] = refactorVariable( obj[ funcKey ] );
		
				// Version ID
				pIdKey = 'vPid_' + obj.verKeyArray[ i ];
				obj[ pIdKey ] = refactorVariable( obj[ pIdKey ] );
			}
		};
	
		this.getCellValue = function ( obj, rowNo )
		{
			var innerHTMLStr;
			var funcKey;
			var	funcTemplateKey;
			var	pIdKey;
			var	vfmRE;
			
			innerHTMLStr = obj.verTemplate;
			
			// Inflate column template with version functions menus
			for ( var i = 0; i < obj.verKeyArray.length; i++ )
			{
				// Create regular expression to locate the functions menu for this version in the template
				funcTemplateKey = '#VFM_' + obj.verKeyArray[ i ] + '#';
				vfmRE = new RegExp( funcTemplateKey );
	
				funcKey = 'vFunc_' + obj.verKeyArray[ i ];
	
				pIdKey = 'vPid_' + obj.verKeyArray[ i ];
			
				innerHTMLStr = innerHTMLStr.replace( vfmRE, fn_MenuStr( 'v', '', obj[ pIdKey ], obj[ funcKey ], imgSrc, LocString( 'Functions' ), '' ) );
			}
	
			return innerHTMLStr;
		};
	
		this.SetHeaderParams( LocString( "Versions" ), "browseListHeaderVersions" );
		this.SetCellParams( "browseItemLeftText" );
		this.SetSortMessage( LocString( "Grouping by versions" ) );
		this.SetColName( "versions" );
		this.SetCellWidth( "2%" );
	}
	versionsColumn.prototype = new BrowseViewColumn();
	
	//- - - - - - arbitrary columns - - - - - - -
	function arbitraryColumn( title, colID, sortable, width, alignment, wrapping, dataRowElementName)
	{
		var classes = "browseItem";
		var headerClass = "browseListHeaderCenterText";
		
		this.nowrap = ( wrapping == 1 || wrapping == 2 );
		this.identifier = colID ;
		this.getCellValue = function( dataRow, rowNo )
		{
			var val = dataRow[ dataRowElementName ];
			if ( val == undefined )
			{
				val = "";
			}
			
			return val.EscapeHTML();
		};
		
		if ( alignment == "left" ) {
			classes += " browseItemLeft";
			headerClass = "browseListHeaderLeftText";
		}
		else if ( alignment == "right" ) {
			classes += " browseItemRight";
			headerClass = "browseListHeaderRightText";
		}
		
		this.SetHeaderParams( title, headerClass );
		this.SetCellParams( classes );
		
		// Need to bypass the automatic setters for these variables, since the
		// setters apply to the prototype of arbitraryColumn and not the specific
		// instances of arbitraryColumn.
		this.sort = sortable;
		this.colName = colID ;
		this.cellWidth = width ;
		this.shimWidth = width;
		
		this.SortComparitor = function(a, b)
		{
			if (a[ dataRowElementName ] == undefined && b[ dataRowElementName ] == undefined) {return 0;}
			if (a[ dataRowElementName ] == undefined || a[ dataRowElementName ] < b[ dataRowElementName ]) {return -1;}
			if (b[ dataRowElementName ] == undefined || a[ dataRowElementName ] > b[ dataRowElementName ]) {return 1;}
			return 0;
		};
	}
	arbitraryColumn.prototype = new BrowseViewColumn();

	//- - - - - - columns with URL - - - - - - -
	function columnWithURL(title, colID, sortable, width, alignment, wrapping, dataRowElementName, url, newWindow, titleText, displayValue) 
	{
		var classes = "browseItem";
		var headerClass = "browseListHeaderCenterText";

		this.nowrap = (wrapping == 1 || wrapping == 2);
		this.identifier = colID;
		this.formatValue = function(formatStr, dataRow, value, rawValue, encoded) 
		{
			var	output = formatStr;
			var absoluteURLRegExp = /http:\/\/|https:\/\/|mailto:|news:|telnet:|file:\/\//i;

			output = output.replace( /%objid%/gi, dataRow.dataId );
			
			if ( encoded )
			{
				// If any of the replace strings is the FIRST item in the format string, AND the value
				// that that replace string represents is a valid ABSOLUTE URL (we assume that testing
				// whether it begins with http:// https:// mailto: news: telnet: or file:// to be
				// sufficient), then we do not escape that replace string.  Otherwise, url-encode it.
				
				if ( output.search( /%value%/i ) === 0 && value.search( absoluteURLRegExp ) === 0 )
				{
					output = output.replace( /%value%/i, value );
				}
				output = output.replace( /%value%/gi, encodeURIComponent( value ) );
				
				if ( output.search( /%rawvalue%/i ) === 0 && rawValue.search( absoluteURLRegExp ) === 0 )
				{
					output = output.replace( /%rawvalue%/i, rawValue );
				}
				output = output.replace( /%rawvalue%/gi, encodeURIComponent( rawValue ) );
				
				if ( output.search( /%nexturl%/i ) === 0 && nextUrl.search( absoluteURLRegExp ) === 0 )
				{
					output = output.replace( /%nexturl%/i, nextUrl );
				}
				output = output.replace( /%nexturl%/gi, encodeURIComponent( nextUrl ) );
				
				output = output.replace( /\"/g, "%22" );
				output = output.replace( / /g, "%20" );
			} 
			else
			{
				output = output.replace( /%value%/gi, value );
				output = output.replace( /%rawvalue%/gi, rawValue );
				output = output.replace( /%nexturl%/gi, nextUrl );
			}
			
			return output;
		};
		this.getCellValue = function(dataRow, rowNo) 
		{
			var html;
			var val;
			
			var disp = dataRow[dataRowElementName];
			
			
			if ( ( dataRowElementName + "_raw" ) in dataRow ) {
				val = dataRow[ dataRowElementName + "_raw" ];
			}
			else {
				val = disp;
			}
			
			if (disp == undefined) {
				html = "";
			}
			else {
				html = "<a ";
				html += "href=\"" + htmlEscape( this.formatValue( url, dataRow, disp, val, true ) ) + "\" ";
				
				if ( newWindow ) {
					html += "target=\"_new\" ";
				}
				
				html += "title=\"" + this.formatValue( titleText, dataRow, disp, val, false ) + "\">";
				html += this.formatValue( displayValue, dataRow, disp, val, false ).EscapeHTML();
				html += "</a>";
			}

			return html;
		};
		
		if ( alignment == "left" ) {
			classes += " browseItemLeft";
			headerClass = "browseListHeaderLeftText";
		}
		else if ( alignment == "right" ) {
			classes += " browseItemRight";
			headerClass = "browseListHeaderRightText";
		}

		this.SetCellParams(classes);
		this.SetHeaderParams( title, headerClass );

		// Need to bypass the automatic setters for these variables, since the
		// setters apply to the prototype of arbitraryColumn and not the specific
		// instances of arbitraryColumn.
		this.sort = sortable;
		this.colName = colID;
		this.cellWidth = width;
		this.shimWidth = width;

		this.SortComparitor = function(a, b) {
			if (a[dataRowElementName] == undefined && b[dataRowElementName] == undefined) { return 0; }
			if (a[dataRowElementName] == undefined || a[dataRowElementName] < b[dataRowElementName]) { return -1; }
			if (b[dataRowElementName] == undefined || a[dataRowElementName] > b[dataRowElementName]) { return 1; }
			return 0;
		};
	}
	columnWithURL.prototype = new BrowseViewColumn();
	
	//- - - - - - user columns with URL - - - - - - -
	function userColumnWithURL(title, colID, sortable, width, alignment, wrapping, dataRowElementName) 
	{
		var classes = "browseItem";
		var headerClass = "browseListHeaderCenterText";

		this.nowrap = (wrapping == 1 || wrapping == 2);
		this.identifier = colID;
		this.getCellValue = function(dataRow, rowNo) {
			var html;
			var val;

			var disp = dataRow[dataRowElementName];
			
			
			if ( ( dataRowElementName + "_raw" ) in dataRow ) {
				val = dataRow[ dataRowElementName + "_raw" ];
			}
			else {
				val = disp;
			}

			if (disp == undefined) {
				html = "";
			}
			else {
				html = "<a onclick=\"doUserDialog('" + val + "')\" href=\"#\" title=\"";
				html += String.formatLoc("View details for %1", disp);
				html += "\">" + disp.EscapeHTML() + "</a>";
			}

			return html;
		};

		if ( alignment == "left" ) {
			classes += " browseItemLeft";
			headerClass = "browseListHeaderLeftText";
		}
		else if ( alignment == "right" ) {
			classes += " browseItemRight";
			headerClass = "browseListHeaderRightText";
		}
		
		this.SetCellParams(classes);
		this.SetHeaderParams( title, headerClass );

		// Need to bypass the automatic setters for these variables, since the
		// setters apply to the prototype of arbitraryColumn and not the specific
		// instances of arbitraryColumn.
		this.sort = sortable;
		this.colName = colID;
		this.cellWidth = width;
		this.shimWidth = width;

		this.SortComparitor = function(a, b) {
			if (a[dataRowElementName] == undefined && b[dataRowElementName] == undefined) { return 0; }
			if (a[dataRowElementName] == undefined || a[dataRowElementName] < b[dataRowElementName]) { return -1; }
			if (b[dataRowElementName] == undefined || a[dataRowElementName] > b[dataRowElementName]) { return 1; }
			return 0;
		};
	}
	userColumnWithURL.prototype = new BrowseViewColumn();

	//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// Parses the data returned from the server (JSON formatted) on any AJAX call.
	// Once finished deserializing, it calls DataToVariables() to redraw the browseview
	function DataStringToVariables( inStringData )
	{
		var	localCopy = null;

		packetSize = inStringData.length;

		try
		{
			// convert the string block into a json object.
			 localCopy = OTfunc.toJSON(inStringData);
			
		}
		catch(e)
		{
			killPopup();
			exceptionAlert( e, "Error: browse.js/DataStringToVariables.  Corrupt data from the server. " );
			localCopy = null;
		}

		if ( localCopy != null )
		{
			DataToVariables( localCopy );
		}

	}

	//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// Takes a deserialized JavaScript object and redraws the browseview by calling restoreSortOrder().
	function DataToVariables( localCopy )
	{	
		var		j;
		var		numRows;

		var		caseSensitiveSort = true;	// Object sorting is currently case-sensitive

		try
		{
			if ( localCopy.myRows.length === 0 )
			{
				killPopup();

				// clear the array, the old data is no good anymore
				myRows = [];
				if ( buildNoResultsView() )
				{
					return;
				}
				else
				{
					// have the fallback
					alert( String.formatLoc( "There are no items to display." ) );
				}
			}
			else
			{
				divSeg = 0;
				currentPageNum = localCopy.currentPageNum + 1;
				totalPages = localCopy.totalPages;
				totalCount = localCopy.totalCount;
				timeTaken = localCopy.timeTaken;
				dbTimeTaken = localCopy.dbTimeTaken;
				haveBigImages = setBooleanValue( localCopy.haveBigImages );
				
				if ( localCopy.hasStagedContent != null )
				{
					hasStagedContent = setBooleanValue( localCopy.hasStagedContent );
					pstageID = refactorVariable( localCopy.pstageID );
				}
				
				myRows = localCopy.myRows;

				numRows = myRows.length;

				for (i=0; i< numRows; i++)
				{
					obj = myRows[i];

					obj.checked = false;
					obj.savedClass = "";
					obj.editable = setBooleanValue( obj.editable );
					obj.container = setBooleanValue( obj.container );
					obj.showJustName = setBooleanValue( obj.showJustName, false );

					// Need to unescape all of the string based values
					obj.typeName = decodeURI( obj.typeName );
					obj.name = refactorVariable( obj.name );
					obj.dataSize = refactorVariable( obj.dataSize );
					obj.link = refactorVariable( obj.link );
					obj.size = refactorVariable( obj.size );
					obj.dataid = refactorVariable( obj.dataid );
					obj.date = refactorVariable( obj.date );
					obj.dateReal = refactorVariable( obj.dateReal );
					obj.imgStr = refactorVariable( obj.imgStr );
					obj.imgLargeStr = refactorVariable( obj.imgLargeStr );
					obj.imgThumbnailStr = refactorVariable( obj.imgThumbnailStr );
					obj.imgMapClassSmall = refactorVariable( obj.imgMapClassSmall );
					obj.imgStatus = refactorVariable( obj.imgStatus );
					obj.promotedCmds = refactorVariable( obj.promotedCmds );
					obj.modifiedImgs = refactorVariable( obj.modifiedImgs );
					obj.imgRealLargeStr = refactorVariable( obj.imgRealLargeStr );
					obj.dcomment = refactorVariable( obj.dcomment );
					obj.mimeType = refactorVariable( obj.mimeType );
					obj.parentURL = refactorVariable( obj.parentURL );
					obj.sizesort = refactorVariable( obj.sizeSortStr );
					obj.dataidsort = refactorVariable( obj.dataidSortStr );
					obj.typesort = refactorVariable( obj.typeSortStr );
					obj.datesort = refactorVariable( obj.dateSortStr );
					obj.namesort = obj.name;
					
					if ( !caseSensitiveSort )
					{
						obj.sizesort = obj.sizesort.toLowerCase();
						obj.dataidsort = obj.dataidsort.toLowerCase();
						obj.typesort = obj.typesort.toLowerCase();
						obj.datesort = obj.datesort.toLowerCase();
						obj.namesort = obj.namesort.toLowerCase();
					}

					// Call out to the registered js object to deal with thier own defined data
					for ( j = 0; j < columnDefinitionArray.length; j++ )
					{
						columnDefinitionArray[j].DataConversion( obj );
					}
				}

				if ( FF )
				{
					// If this is the last page of results, then a "flash" of the parent
					// table is needed to re-adjust the rendering of the contents to shrink the
					// table.  This appears to be a Firefox issue only verified on 2.0.0.6.
					if ( totalPages === currentPageNum )
					{
						flashTableRefresh = true;
					}
				}

				doPStageAlert();
				
				// record the some times to show in the page.
				de = new Date();
				rtTimeTaken = de - ds;


			}
			
			buildTable();
		}
		catch(e2)
		{
			killPopup();
			exceptionAlert( e2, "Issue occured in browse.js/DataToVariables.  No update of data done. " );
		}
	}

	// This function will check the existance of the
	// incoming data and if it is null then set the
	// return to an empty string.  This will allow
	// the rest of code to work properly while the server
	// doesn't need to send unneeded data across the wire.
	function refactorVariable( inValue, defaultVal )
	{
		defaultVal = (typeof defaultVal === "undefined") ? "" : defaultVal;

		if ( undefined !== inValue )
		{
			return inValue;
		}

		return defaultVal;
	}

	// This function converts a string to a boolean.  It will return true
	// if and only if inValue is "true" and will return false in any other
	// circumstance, even if inValaue is "TRUE" or "True", etc.
	function setBooleanValue( inValue, defaultVal )
	{
		defaultVal = (typeof defaultVal === "undefined") ? false : defaultVal;

		if ( 'true' === inValue )
		{
			return true;
		}

		return defaultVal;
	}

	function setDoSort( bDoSort )
	{
		doSort = bDoSort;
	}

	// getOptionalParams only applies to containers - returns an empty string
	// if thisRow.container is not true.  Otherwise, returns viewType and sort
	// parameters to be added to the end of a URL query string.  The return
	// string begins with '&'
	// Called by makeRowNameCell() below.
	//
	// Some things to consider
	//
	//	&viewType=n  needs to be appended to the url
	function getOptionalParams( thisRow )
	{
		var optionalParams = "";

		// By getting the row number in, check to see if the object is a container.
		// if not then dont add anything. Only containers need the page and view information
		if ( undefined !== thisRow && true === thisRow.container )
		{
			if ( sortColumn !== "name" )
			{
				// if the sort flag is present then the optional params
				// do not need to add another.  This prevents the links from messing up Livelink
				if ( undefined === ( ( thisRow.link).match( /&sort=/i ) ) )
				{
					optionalParams += "&sort=" + sortColumn;
				}
			}
			optionalParams += "&viewType=" + currentViewType;
		}

		return optionalParams;
	}

	// Encode a string in HTML format for inclusion in an HREF
	function htmlEscape(str) 
	{
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	} 

	// Returns an string containing the HTML that should be inserted into the
	// "Name" column for thisRow.  It is an <A> tag wrapped by a <DIV> and 
	// includes the function menu by calling fn_MenuStr().
	function makeRowNameCell( thisRow, rowNo )
	{
		var outputStr = "";

		if ( thisRow.showJustName )
		{
			outputStr += "<SPAN class=\"browseItemNameContainer\" data-otname=\"itemContainer\">" + thisRow.name + "</SPAN>" + thisRow.modifiedImgs;
		}
		else if ( thisRow.link.length > 0 )
		{
			outputStr += "<A href=\"" + htmlEscape( thisRow.link + getOptionalParams( thisRow ) ) + "\" class=\"browseItemNameContainer\" data-otname=\"itemContainer\">" + thisRow.name + "</a> " + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
		}
		else
		{
			outputStr += "<SPAN class=\"browseItemNameContainer\" data-otname=\"itemContainer\">" + thisRow.name + "</SPAN>" + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
		}

		return outputStr;
	}

	// Returns a string containing HTML that creates a clickable small icon for the item.
	function makeSmallIconLink( thisRow )
	{
		var	status;
		
		var outputStr = "";
		var statusName = "";
		var statusExists = false;
		var ahref = "<A CLASS=\"browseViewIcon\" HREF=\"" + htmlEscape( thisRow.link + getOptionalParams( thisRow ) ) + "\" TITLE=\"" + thisRow.typeName + "\">";
		var ahrefClose = "</A>";
		var imgCursor = " imgCursor";
		
		if ( thisRow.imgStatus.length !== 0)
		{
			if ( thisRow.link.length === 0 )
			{
				ahref = "";
				ahrefClose = "";
				imgCursor = "";
			}
			
			if ( thisRow.statusName != undefined )
			{
				statusName = thisRow.statusName;
				statusExists = true;
			}
			
			status = "<IMG SRC='" + thisRow.imgStatus + "' CLASS='vtop' DATA-OTNAME='objLeftIcon' WIDTH='8' HEIGHT='8' BORDER='0' TITLE='" + statusName + "'>";
			
			if ( "" == thisRow.imgMapClassSmall )
			{
				outputStr += ahref;
				outputStr += status;				
				outputStr += "<IMG SRC='" + thisRow.imgStr + "' CLASS='smallIconImg' WIDTH='16' HEIGHT='16' BORDER='0'>";
			}
			else
			{
				if ( statusExists )
				{
					outputStr += ahref;
					outputStr += status;
				}
				else
				{
					outputStr += status;
					outputStr += ahref;
				}
				outputStr += "<DIV DATA-OTNAME=\"objIcon\" CLASS=\"" + thisRow.imgMapClassSmall + imgCursor + "\" > </DIV>";				
			}
			outputStr += ahrefClose;				
		}
		else
		{
			outputStr += "&nbsp;";
		}

		return outputStr;
	}

	// Same as above, but for a large icon.
	function makeLargeIconLink( thisRow )
	{
		var outputStr = "";
		var lrgImgStr = "";
		var size = 32;
		var thumbImg = false;

		if ( 0 !== thisRow.imgStatus.length )
		{
			// Only put out information for the object iff
			// the img status is not empty.  If this is not
			// the case then we put out a nbsp
			if ( thisRow.imgThumbnailStr !== "" )
			{
			   lrgImgStr = thisRow.imgThumbnailStr;
			   size = 64;
			   thumbImg = true;
			}
			else if ( ( ( "" !== thisRow.imgRealLargeStr ) && renderBigImages ) || ( thisRow.imgRealLargeStr === thisRow.imgLargeStr ) )
			{
				lrgImgStr = baseUrl + "/fetch/" + thisRow.imgRealLargeStr;
				size = 64;
			}
			else
			{
				lrgImgStr = thisRow.imgLargeStr;
			}

			if ( 0 < thisRow.link.length )
			{
				outputStr += "		<A HREF=\"" + thisRow.link + getOptionalParams( thisRow ) + "\">";
				outputStr += "			<IMG SRC='"+ thisRow.imgStatus + "' WIDTH='8' HEIGHT='8' BORDER='0' ALT='"+ thisRow.statusName + "' TITLE='" + thisRow.statusName + "'>";
				if ( thumbImg )
				{
					outputStr += "<IMG CLASS='thumbImage128x128' SRC='" + lrgImgStr + "' ALT='"+ thisRow.typeName + "' TITLE='" + thisRow.typeName + "'>";
				}
				else
				{
					outputStr += "<IMG SRC='" + lrgImgStr + "' WIDTH='" + size + "' HEIGHT='" + size + "' BORDER='0' ALT='"+ thisRow.typeName + "' TITLE='" + thisRow.typeName + "'>";
				}
				outputStr += "		</A>";
			}
			else
			{
				outputStr += "&nbsp;<IMG SRC='"+ thisRow.imgStatus + "' WIDTH='8' HEIGHT='8' BORDER='0' ALT='"+ thisRow.statusName + "' TITLE='" + thisRow.statusName + "'>";
				if ( thumbImg )
				{
					outputStr += "<IMG CLASS='thumbImage128x128' SRC='"+ lrgImgStr + "' ALT='"+ thisRow.typeName + "' TITLE='" + thisRow.typeName + "'>";
				}
				else
				{
					outputStr += "<IMG SRC='"+ lrgImgStr + "' WIDTH='" + size + "' HEIGHT='" + size + "' BORDER='0' ALT='"+ thisRow.typeName + "' TITLE='" + thisRow.typeName + "'>";
				}
			}
		}
		else
		{
			outputStr += "&nbsp;";
		}

		return outputStr;
	}

	function doPStageAlert()
	{
		var 	ele;
		var 	tbl;
		var 	innertblBody;
		var 	cell;
		var		row;
		var 	opsw;
		var 	url;
		var 	rawhtml;

		var 	pstagewarningTag = document.getElementById('pstageWarningpTag' );
		var 	pstageWarning = document.getElementById('pstageWarning' );
		var		cellCount = 0;

		try
		{
			if ( pstageWarning != null )
			{
				if ( hasStagedContent && pstagewarningTag == null )
				{
					rawhtml = "<p id='pstageWarningpTag' ></p>";
					$('#pstageWarning').append( rawhtml );

					rawhtml = "<div id='pstageWarningDiv' class='WorkToDoWarning' ></div>";
					$('#pstageWarningpTag').append( rawhtml );

					ele = document.getElementById( "pstageWarningDiv" );

					opsw = document.createElement( "div" );
					opsw.id =  "pstageWarningDiv";
					opsw.setAttribute("class", "WorkToDoWarning");
					opsw.appendChild( ele );

					tbl = document.createElement( "table" );
					innertblBody = document.createElement( "tbody" );
					tbl.appendChild( innertblBody );
					tbl.width = "100%";
					tbl.setAttribute( "class", "dragAndDropAlert" );
					tbl.setAttribute( "cellPadding", "0px" );
					tbl.setAttribute( "cellSpacing", "0px" );
					tbl.setAttribute( "border", "0" );

					pstagewarningTag = document.getElementById( "pstageWarningpTag" );
					pstagewarningTag.appendChild( tbl );

					row = tbl.insertRow( tbl.rows.length );

					cell = row.insertCell( cellCount++ );
					cell.style.whiteSpace = "nowrap";
					cell.style.padding = "0 10px 0 10px";
					cell.id =  "pstageCell_" + cellCount;

					$( '#pstageCell_' + cellCount ).append($('<img>', {
						src : imgSrc + 'required_big.gif',
						border : 0,
						alt : LocString( "Complete Required Information" ),
						title : LocString( "Complete Required Information" )
					}));

					cell = row.insertCell( cellCount++ );
					cell.style.whiteSpace = "nowrap";
					cell.setAttribute( "class", "valueStatic" );
					cell.setAttribute( "align", "left" );
					cell.setAttribute( "width", "100%" );
					cell.id =  "pstageCell_" + cellCount;
					$( '#pstageCell_' + cellCount ).append( LocString( "You added items that require additional information. Click the link to complete the process." ) );

					rawhtml = "<p></p>";
					$('#pstageWarning').append( rawhtml );

					url = String.format( "%1?func=ll&objid=%2&objAction=browse&sort=name&viewtype=21", baseUrl , pstageID );

					$('<a>',{
						text: LocString( "Show the incomplete items" ),
						href: url
					}).appendTo('#pstageCell_' + cellCount);
				}
				else if ( !hasStagedContent && pstagewarningTag != null )
				{
					pstagewarningTag.remove() ;
				}
			}
		}
		catch(e)
		{
			killPopup();
			exceptionAlert( e, "Issue occured in browse.js/doPStageAlert.  No update of data done. " );
		}
	}

	// Sets the innerHTML of the cell with ID ( 'browseCatalog_' + thisRow.dataId ) 
	// with a text link and function menu for the item.  This executes only if
	// thisRow.catalog == '1'.  Whereas the above functions generate HTML strings,
	// this function actually manipulates the DOM.
	function updateFeaturedItemCell( thisRow )
	{
		if ( '1' === thisRow.catalog )
		{
			var theCell = document.getElementById('browseCatalog_' + thisRow.dataId );
			if ( null !== theCell )
			{
				// populate the Cells
				if ( thisRow.link.length > 0 )
				{
					theCell.innerHTML = "<A href='" + htmlEscape( thisRow.link + getOptionalParams( thisRow ) ) + "'>" + thisRow.name + "</a> " + fn_MenuStr( 'cat2', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
				}
				else
				{
					theCell.innerHTML = "&nbsp;" + thisRow.name + "&nbsp;" + fn_MenuStr( 'cat2', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
				}
			}
		}
	}

	// function to build the actual table
	function buildTable()
	{
		try
		{
			var dr;
			var ds = new Date();


			if ( currentViewType === "1" )
			{
				buildTableDetail();
			}
			else if ( currentViewType === "2" )
			{
				buildTableBigImage();
			}
			else if ( currentViewType === "3" )
			{
				buildTableListView();
			}
			dr = new Date();
			renderTimeTaken = dr - ds;
		}
		catch(e)
		{
			killPopup();
			exceptionAlert( e, "Issue occured in browse.js/buildTable.  An issue has occured in the creating the browse table." );
		}
	}

	// Changes the current viewtype.  newType must be of one of the following integer values:
	//		1 - Details View
	//		2 - Large Icon View
	//		3 - Small Icon View
	// Also calls to the server to indicate that the view type has changed, and logs the 
	// change in the browser history via addPageToHistory().  The view change is done
	// entirely client-side, though.
	//
	// This function also draws the browse view buttons (if applicable)
	//
	// NOTE that this function does not redraw the browseview table; it only changes
	// the controls that are displayed above and below.  As such, if you call this function
	// you should call buildTable immediately afterwards.
	function updateViewType( newType )
	{
		var theDiv;
		var theTopRow;
		var	theBottomRow;
		var	theViewIcon;
		var	theViewIconName;
		var imgsrcsel;
		var imgsrc;

		var changed = false;

		try
		{
			if ( newType !== currentViewType )
			{
				divSeg = 0;
				// indictate that the ViewType changed.  This will allow the featured items to be updated as well
				changed = true;
				// this is to clear the existing selected icon, back to the original
				if ( '1' === currentViewType )
				{
					theViewIconName = "BV_ViewDetailIcon";
				}
				if ( '2' === currentViewType )
				{
					theViewIconName = "BV_ViewLargeIcon";
				}
				if ( '3' === currentViewType )
				{
					theViewIconName = "BV_ViewSmallIcon";
				}

				theViewIcon = document.getElementById( theViewIconName );
				if ( null !== theViewIcon )
				{
					// try and set the image back to the default
					imgsrcsel = theViewIcon.getAttribute( 'SI' ) ;

					if ( undefined !== imgsrcsel )
					{
						imgsrc = theViewIcon.src;
						theViewIcon.src = imgSrc + imgsrcsel;
					}
				}

				// Set the viewType for the small icons view
				currentViewType = newType;

				// then a server update will be needed
				UpdateViewTypeToServer( currentViewType );

				// change the window location to reflect the new location
				addPageToHistory( true );
			}

			if (myRows != null && myRows.length > 0)
			{
				theDiv = document.getElementById('MultiOperationBar1');
				theTopRow = document.getElementById('MultiOperationBar1Row');
				theBottomRow = document.getElementById("MultiOperationBar1RowBottom");
				theDetailOperations = document.getElementById("MultiDetailOperations");
	
				if ( '1' === currentViewType )
				{
					if ( noMultiSelectButtons || ( bcMultiButtonArray.length === 0 ) )
					{
						theTopRow.style.display = 'none';
						if ( null !== theBottomRow )
						{
							theBottomRow.style.visibility = 'hidden';
							theBottomRow.style.position = 'absolute';
						}
					}
					else
					{
						// Show the multi operation bar
						theDiv.style.display = 'block';
						theTopRow.style.display = '';
						theDetailOperations.style.display = '';
	
						if ( null !== theBottomRow )
						{
							theBottomRow.style.visibility = '';
							theBottomRow.style.position = '';
						}
	
						theDiv = document.getElementById('ViewTextLabel');
	
						if ( null !== theDiv )
						{
							theDiv.innerHTML = LocString( "Detail View" );
						}
	
						theDiv = document.getElementsByName('ViewType');
					}
	
					theDiv.value = currentViewType;
				}
				else if ( '2' === currentViewType )
				{
					// Hide the multi operation bar and set the header bar to the
					// correct label
					theTopRow.style.display = '';
					theDetailOperations.style.display = 'none';
					theDiv.style.display = 'block';
	
					if ( null !== theBottomRow )
					{
						theBottomRow.style.visibility = 'hidden';
						theBottomRow.style.position = 'absolute';
					}
	
					theDiv = document.getElementById('ViewTextLabel');
	
					if ( null !== theDiv  )
					{
						theDiv.innerHTML = LocString( "Large Icon View" );
					}
	
					theDiv=document.getElementsByName('ViewType');
					theDiv.value = currentViewType;
				}
				else if ( currentViewType === '3' )
				{
					// Hide the multi operation bar and set the header bar to the
					// correct label
					theTopRow.style.display = '';
					theDetailOperations.style.display = 'none';
					theDiv.style.display = 'block';
	
					if ( null !== theBottomRow )
					{
						theBottomRow.style.visibility = 'hidden';
						theBottomRow.style.position = 'absolute';
					}
	
					theDiv = document.getElementById('ViewTextLabel');
	
					if ( theDiv !== null )
					{
						theDiv.innerHTML = LocString( "Small Icon View" );
					}
	
					theDiv=document.getElementsByName('ViewType');
					theDiv.value = currentViewType;
				}
	
				theDiv=document.getElementById('MainOperationTable');
				theDiv.style.display = 'block';
				
			}
			
			if (currentViewType == '1')
			{
				theViewIconName = "BV_ViewDetailIcon";
			}
			else if (currentViewType == '2')
			{
				theViewIconName = "BV_ViewLargeIcon";
			}
			else if (currentViewType == '3')
			{
				theViewIconName = "BV_ViewSmallIcon";
			}
	
			// This is to swap the icons of the current view icons
			// to the selected version stored in the feature
			theViewIcon = document.getElementById( theViewIconName );
			if ( null !== theViewIcon )
			{
				imgsrcsel = theViewIcon.getAttribute( 'SS' ) ;
				if ( null !== imgsrcsel )
				{
					imgsrc = theViewIcon.src;
					theViewIcon.src = imgSrc + imgsrcsel;
				}
			}

			$(document).ready(function() {
				initializeToolbar();
			})
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/updateViewType.  An issue has occured in updating the browse view type." );
			changed = false;
		}

		return changed;
	}

	// The next two functions need to change the style directly since it seems
	// changing the classname alone doesn't aways work
	//
	// Colours the given DOM element as "active".  Used in the page footer.
	function colourCell( obj )
	{
		obj.origColor=obj.style.backgroundColor;
		obj.style.backgroundColor = '#E2EBF3';
		obj.style.cursor = "pointer";
		obj.style.border = "solid 1px #A9B7C6";
	}

	// Resets the given DOM element to its non-"active" state.  Used in the page footer.
	function clearCell( obj, clearBorder )
	{
		obj.style.backgroundColor=obj.origColor;
		obj.style.cursor = "default";

		if ( true === clearBorder )
		{
			obj.style.border = "";
			obj.style.border = "solid 1px #F5F5F5";
		}
	}

	// Changes an image's SRC attribute and the CURSOR style of its wrapping element.
	// Used in addPagingFooter below.
	// obj - should be the parent of the IMG tag described by idName.  Ususally a <TD>
	// imageName - the path to the image relative to the variable imgSrc
	// idName - the ID of the image element to change
	// usePointer - boolean describing whether to set obj's CURSOR style to "pointer" or "default"
	function imageCell( obj, imageName, idName, usePointer )
	{

		var imgRef = document.getElementById( idName );

		if ( undefined !== imgRef )
		{
			imgRef.src = imgSrc + imageName;
		}

		if ( true === usePointer )
		{
			obj.style.cursor = "pointer";
		}
		else
		{
			obj.style.cursor = "default";
		}
	}

	// Creates the paging controls right below the browseview via DOM manipulation.
	// Includes the left-aligned selector for how many items should appear on a page
	// as well as the paging controls on the right side.
	// Third parameter specifies if this is being rendered on the search results page
	function addPagingFooter( tbl, numCol, searchPage )
	{
		var activePicStyle;
		var browsePicStyle;
		var cellCount;
		var endPt;
		var i;
		var innerHTMLStr;
		var innertbl;
		var innertblBody;
		var itemStr;
		var pageCellCount;
		var pageRow;
		var pagingTbl;
		var pagingDiv;
		var row;
		var startPt;
		var tblCell;
		var pagePrefix;

		try
		{ 
			// Check to see if this is being rendered on the search results page
			// to setup variables appropriately
			if ( searchPage === undefined || searchPage == false )
			{
				searchPage = false;
				pagePrefix = "Browse";
			}
			// Setup variables for search result page rendrind
			else
			{
				pagePrefix = "Result";
			}
			
			// Check to see if there any actual rows being shown to the user.  
			// If not then skip this section
			if ( ( myRows != null ) && ( myRows.length > 0 ) ) 
			{

				// Try and get the reference to the table showing the details.  If it exists then
				// remove the rows and if not then create a new one
				tbl = document.getElementById( pagePrefix + "PageRowPagingSectionCellTable" );

				if ( null === tbl )
				{ 
					tblCell = document.getElementById( pagePrefix + "PageRowPagingSectionCell" );

					if ( null !== tblCell )
					{
						tbl = document.createElement("table");
						innertblBody = document.createElement("tbody");
						tbl.appendChild( innertblBody );
						tbl.width = "100%";
						tbl.id =  pagePrefix + "PageRowPagingSectionCellTable";
						tbl.setAttribute("cellPadding", "0px");
						tbl.setAttribute("cellSpacing", "0px");

						tblCell.appendChild(tbl);
					}
				}
				else
				{
					// clear the rows of the existing table to recreate the rows
					var x = tbl.rows.length;

					for( i=0; i<x; i++ )
					{
						tbl.deleteRow(0);
					}
				}

				if ( null !== tbl )
				{
					// Draw the header row
					row = tbl.insertRow(tbl.rows.length);

					// add the cell to span all of the detail columns
					cell = row.insertCell(0);
					// Make sure to count all of the columns
					if ( undefined !== numCol )
					{
						cell.colSpan = numCol;
					}

					// Create the table for the data
					innertbl = document.createElement("table");
					innertblBody = document.createElement("tbody");
					innertbl.appendChild( innertblBody );
					innertbl.width = '100%';
					innertbl.setAttribute("cellPadding", "0px");
					innertbl.setAttribute("cellSpacing", "0px");
					innertbl.visibility = "hidden";
					innertbl.display = "none";

					cell.appendChild(innertbl);

					// Do not insert a row after the content area if we are not paging
					if ( isPaged )
					{
					// reset the cell count for the next row
					cellCount = 0;

					// Draw the header row
					row = innertbl.insertRow(innertbl.rows.length);

					// add the cell for the pagesize dropdown
					cell = row.insertCell(cellCount++);
					cell.style.whiteSpace = 'nowrap';

					// Check to see if the total number of pages > 1 and
					// the number of objects on the page < smallestPageSize
					// then put in the dropdown
					if ( ( myRows.length >= smallestPageSize || currentPageNum > 1 ) && isPaged )
					{
						// Set the text
						cell.style.color = '#666666';
						cell.style.padding = "2px 0 2px 0";
						cell.innerHTML = LocString( "Show" );
						cell.innerHTML += "<IMG SRC='" + imgSrc + "spacer.gif' TITLE='' WIDTH='4' HEIGHT='1' BORDER='0'>";

						// add the cell for the actual pagesize dropdown
						cell = row.insertCell(cellCount++);
						cell.style.whiteSpace = 'nowrap';

						// Write out the page size selector
						bc_resetTextInMenu();
						bc_setMenuName( pagePrefix + "PageSize" );

						innerHTMLStr = bc_menuTxtStart( "", LocString( "Select number of items on page" ) , pageSize, "itemID", "" );
						innerHTMLStr += bc_optionsStart();
						for ( i = 0;i<pageSizeArray.length;i++)
						{
							if ( searchPage == false )
							{
								innerHTMLStr += bc_itemTxt( pageSizeArray[i], pageSizeArray[i], 0 );
							}
							else
							{
								innerHTMLStr += bc_searchItemTxt( 'document.SearchForm', pageSizeArray[i], pageSizeArray[i] );
							}
						}
						innerHTMLStr += bc_menuEnd();
						cell.innerHTML = innerHTMLStr ;

						cell = row.insertCell(cellCount++);
						cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='10' HEIGHT='1' BORDER='0'>";

						// Set the text
						cell = row.insertCell(cellCount++);
						cell.style.whiteSpace = 'nowrap';
						cell.style.color = '#666666';
						cell.style.padding = "2px 0 2px 0";
						cell.innerHTML = "items";
						cell.innerHTML += "<IMG SRC='" + imgSrc + "spacer.gif' TITLE='' WIDTH='4' HEIGHT='1' BORDER='0'>";
					}

					// - - - - - - - - add the spacer cell - - - - - - - -
					cell = row.insertCell(cellCount++);
					cell.width = '100%';
					cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='3' HEIGHT='14' BORDER='0'>";

					cell = row.insertCell(cellCount++);
					cell.width = '100%';
					cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='3' HEIGHT='14' BORDER='0'>";

					if ( totalPages > 1 )
					{
						// - - - - - - - - Start of the pagination selection control - - - - - - - -
						cell = row.insertCell( cellCount++ );

						// Need to figure out the classes and set the timer to set the focus
						if ( true === btmPickControlOpen )
						{
							activePicStyle = 'activatePickDivHide';
							browsePicStyle = 'browsePickDivShow';
							setTimeout( setPagePickFocus, 2 );
						}
						else
						{
							activePicStyle = 'activatePickDivShow';
							browsePicStyle = 'browsePickDivHide';
						}

						// Create a paging div to surround the entire page control table
						// This will allow easy hiding/showing of the entire control
						pagingDiv = document.createElement("div");
						pagingDiv.id = "PageSelectDiv";
						pagingDiv.className = activePicStyle;
						cell.appendChild(pagingDiv);

						// Create the table for the paging selections and attach it to the div
						pagingTbl = document.createElement("table");
						innertblBody = document.createElement("tbody");
						pagingTbl.appendChild( innertblBody );
						pagingTbl.width = '100%';
						pagingTbl.setAttribute("cellPadding", "0px");
						pagingTbl.setAttribute("cellSpacing", "0px");

						pagingDiv.appendChild(pagingTbl);
						pageCellCount = 0;

						// Add the table row for the paging selection
						pageRow = pagingTbl.insertRow(pagingTbl.rows.length);

						// from here the paging control cells are added to pageRow NOT Row and the count needs to
						// be adding to pageCellCount

						// Put out the Prev tag
						cell = pageRow.insertCell( pageCellCount++ );
						if ( currentPageNum > 1 )
						{
							cell.onmouseover = function(){ imageCell(this, 'page_previous16_mo.gif', 'PagePrevImg', true); };
							cell.onmouseout = function(){ imageCell(this, 'page_previous16.gif', 'PagePrevImg', false); };
							
							if ( searchPage == false )
							{
								cell.onclick = function(){ getFolderContents( ( currentPageNum - 1 ), String.formatLoc( "Retrieving page n", currentPageNum - 1 ) ); };
							}
							else
							{ 
								cell.onclick = function(){ DoSearch( document.SearchForm, 'func', 'NewSearch', ( currentPageNum - 2 ) * pageSize ); };			
							}
							
							cell.innerHTML = "<IMG SRC='" + imgSrc + "page_previous16.gif' Alt='"+ LocString( "Previous Page" ) +"' Title='"+ LocString( "Previous Page" ) +"' ID='PagePrevImg' WIDTH='16' HEIGHT='16' BORDER='0'>";
						}
						else
						{
							cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='16' HEIGHT='16' BORDER='0'>";
						}

						// add the spacer cell
						cell = pageRow.insertCell( pageCellCount++ );
						cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='2' HEIGHT='4' BORDER='0'>";

						// Calculate the boundries of what the control will show
						var startAt = Math.max( currentPageNum - 2, 1 );
						var endAt = Math.min( totalPages + 1, startAt + 5 );

						if ( ( endAt - startAt ) < 5 )
						{
							// Need to recalculate the startAt point if the calculated
							// start is less than 5 from the end
							startAt = Math.max( endAt - 5, 1 );
						}
						
						var clickHandler = function( e )
							{
								var pgNum = this.getAttribute( 'pageNumAccess' ) ;
								
								if ( searchPage == false )
								{
									getFolderContents( pgNum , String.formatLoc( "Retrieving page n", pgNum ) );
								}
								else
								{ 
									DoSearch( document.SearchForm, 'func', 'NewSearch', ( pgNum - 1 ) * pageSize );
								}
							};
							
						var mouseoverHandler = function(){ colourCell(this); };
						var mouseoutHandler = function(){ clearCell(this, true); };

						for ( i = startAt; i < endAt; i++ )
						{
							// NOTE: the mouseover effect by changing the css style doesn't seem to
							//       work very well so in the mean time.  Changing the styles directly
							//       will have to do

							cell = pageRow.insertCell( pageCellCount++ );
							cell.className = 'pageSelectorReference';
							cell.setAttribute('pageNumAccess', i);
							cell.style.margin = "0 4px 0 4px";
							cell.style.padding = "0 2px 0 2px";
							cell.style.color = '#00609e';
							cell.title = String.formatLoc( "Page n", i );

							if ( i !== currentPageNum )
							{
								cell.onmouseover = mouseoverHandler;
								cell.onmouseout = mouseoutHandler;
								cell.style.border = "solid 1px #F5F5F5";
								cell.onclick = clickHandler;
							}
							else
							{
								cell.style.backgroundColor = "white";
								cell.style.border = "solid 1px #A9B7C6";
							}
							cell.innerHTML = "&nbsp;" + i + "&nbsp;";

							// add the spacer cell
							cell = pageRow.insertCell( pageCellCount++ );
							cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='2' HEIGHT='4' BORDER='0'>";
						}

						cell = pageRow.insertCell( pageCellCount++ );
						if ( currentPageNum < totalPages )
						{
							cell.onmouseover = function(){ imageCell(this, 'page_next16_mo.gif', 'PageNextImg', true); };
							cell.onmouseout = function(){ imageCell(this, 'page_next16.gif', 'PageNextImg', false); };
							
							if ( searchPage == false )
							{
								cell.onclick = function(){ getFolderContents( ( currentPageNum + 1 ), String.formatLoc( "Retrieving page n", currentPageNum + 1 ) ); };
							}
							else
							{ 
								cell.onclick = function(){ DoSearch( document.SearchForm, 'func', 'NewSearch', ( currentPageNum ) * pageSize ); };
							}
							
							cell.innerHTML = "<IMG SRC='" + imgSrc + "page_next16.gif' Alt='"+ LocString( "Next Page" ) +"' Title='"+ LocString( "Next Page" ) +"' ID='PageNextImg' WIDTH='16' HEIGHT='16' BORDER='0'>";
						}
						else
						{
							cell.innerHTML = "<IMG SRC='" + imgSrc + "page_next16_ds.gif' Title='' WIDTH='16' HEIGHT='16' BORDER='0'>";
						}
						// - - - - - - - - End of the pagination selection control - - - - - - - -

						// - - - - - - - - Start of the pagination goto/picker control - - - - - - - -

						// add the spacer cell
						cell = row.insertCell( cellCount++ );
						cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='2' HEIGHT='4' BORDER='0'>";			
						
						// add the edit box cell to jump to a page
						cell = row.insertCell( cellCount++ );
						cell.id = "PickPageCell";
						cell.style.padding = "0 2px 0 2px";
						cell.style.color = '#666666';
						cell.style.whiteSpace = 'nowrap';
						cell.title = LocString( 'Go to page...' );
												
						if ( searchPage == false )
						{
							cell.innerHTML += "<DIV ID='typePickDiv' CLASS='" + browsePicStyle + "'>" + LocString( "Go to page" ) + "&nbsp;&nbsp;<INPUT CLASS='browsePaginationBarEdit' autocomplete='off' TYPE='text' ID='pagePickEdit' TITLE='" + LocString( 'Enter a page number here' ) + "' SIZE='5' MAXLENGTH='20' LIMIT='20' VALUE='' ONKEYPRESS='return browsePageNumEnter( this.form, event, false )'></DIV>";
						}
						else
						{
							cell.innerHTML += "<DIV ID='typePickDiv' CLASS='" + browsePicStyle + "'>" + LocString( "Go to page" ) + "&nbsp;&nbsp;<INPUT CLASS='browsePaginationBarEdit' autocomplete='off' TYPE='text' ID='pagePickEdit' TITLE='" + LocString( 'Enter a page number here' ) + "' SIZE='5' MAXLENGTH='20' LIMIT='20' VALUE='' ONKEYPRESS='return browsePageNumEnter( this.form, event, true )'></DIV>";
						}
						
						// This cell contains the flip control icons
						cell = row.insertCell( cellCount++ );
						cell.style.padding = "0 2px 0 2px";
						cell.style.border = "solid 1px #F5F5F5";
						cell.onmouseover = function(){ imageCell(this, 'goto_page16_mo.gif', 'gotoPageLinkImg', true); imageCell(this, 'goto_close1216_mo.gif', 'browsePageLinkImg', true);   };
						cell.onmouseout = function(){ imageCell(this, 'goto_page16.gif', 'gotoPageLinkImg', false);imageCell(this, 'goto_close1216.gif', 'browsePageLinkImg', false); };
						cell.innerHTML = "<DIV ID='activatePickDiv' CLASS='" + activePicStyle + "'><a href='javascript:void(0)' onclick='javascript:flipPagePick();return false;' TITLE='" + LocString( 'Go to page...' ) + "'><IMG SRC='" + imgSrc + "goto_page16.gif' ID='gotoPageLinkImg' WIDTH='16' HEIGHT='16' BORDER='0' ALT='" + LocString( 'Go to page...' ) + "'></a></DIV>";
						cell.innerHTML += "<DIV ID='browsePickDiv' CLASS='" + browsePicStyle + "'><a href='javascript:void(0)' onclick='javascript:flipPagePickBack();return false;' TITLE='" + LocString( 'Go to page...' ) + "'><IMG SRC='" + imgSrc + "goto_close1216.gif' ID='browsePageLinkImg' WIDTH='16' HEIGHT='16' BORDER='0' ALT='" + LocString( 'Close' ) + "'></a></DIV>";

						cell = row.insertCell( cellCount++ );
						cell.style.padding = "0 0 0 2px";

						// - - - - - - - - End of the pagination goto/picker control - - - - - - - -
					}
					}

					row = innertbl.insertRow(innertbl.rows.length);
					cellCount = 0;

					if ( searchPage == false )
					{
						// - - - - - - - - add the cell for the number of items - - - - - - - -
						cell = row.insertCell(cellCount++);
						cell.style.whiteSpace = 'nowrap';
						cell.style.color = '#666666';
						cell.style.padding = "2px 0 2px 0";
						cell.colSpan = '5';

						if ( currentPageNum === 1 )
						{
							startPt = 1;
							endPt = myRows.length;
						}
						else
						{
							startPt = ( ( currentPageNum - 1 ) * pageSize ) + 1;
							endPt = ( ( currentPageNum - 1 ) * pageSize ) + myRows.length;
						}

						if ( !hideContainerSize )
						{
							// At this point there are a number of conditions to look at before putting up the # of items
							if ( 1 === totalPages )
							{
								if ( 1 === totalCount )
								{
									if ( objFilter.length > 0 || filterValue.length > 0 )
									{
										itemStr = String.formatLoc( "p item (filtered)", totalCount );
									}
									else
									{
										itemStr = String.formatLoc( "p item", totalCount );
									}
								}
								else
								{
									if ( objFilter.length > 0 || filterValue.length > 0 )
									{
										itemStr = String.formatLoc( "p items (filtered)", totalCount );
									}
									else
									{
										itemStr = String.formatLoc( "p items", totalCount );
									}
								}
							}
							else if ( endPt === totalCount )
							{
								if ( objFilter.length > 0 || filterValue.length > 0 )
								{
									itemStr = String.formatLoc( "n-m of p items (filtered)", startPt, endPt, totalCount );
								}
								else
								{
									itemStr = String.formatLoc( "n-m of p items", startPt, endPt, totalCount );
								}
							}
							else
							{
								if ( objFilter.length > 0 || filterValue.length > 0 )
								{
									itemStr = String.formatLoc( "n-m of about p items (filtered)", startPt, endPt, totalCount );
								}
								else
								{
									itemStr = String.formatLoc( "n-m of about p items", startPt, endPt, totalCount );
								}
							}

							cell.innerHTML = itemStr;
						}
					}

					// - - - - - - - - add the spacer cell - - - - - - - -
					cell = row.insertCell(cellCount++);
					cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='15' HEIGHT='1' BORDER='0'>";

					if ( searchPage == true )
					{
						cell.colSpan = '6';
					}
					
					if ( totalPages > 1 && !hideContainerSize )
					{
						// write out the current page indicator
						cell = row.insertCell( cellCount++ );
						cell.style.whiteSpace = 'nowrap';
						cell.align = 'right';
						cell.colSpan = '5';
						cell.width = '5%';
						cell.style.color = '#666666';
						cell.style.padding = "2px 0 2px 0";
						cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='3' HEIGHT='12' BORDER='0'>";
						if ( currentPageNum === totalPages )
						{
							cell.innerHTML += String.formatLoc( "n of m pages", currentPageNum, totalPages );
						}
						else
						{
							cell.innerHTML += String.formatLoc( "n of about m pages", currentPageNum, totalPages );
						}
						// - - - - - - - - End of the pagination control - - - - - - - -
					}
				}

				if ( true === isDebugPaging && tbl != null )
				{
					// Draw the row
					row = tbl.insertRow(tbl.rows.length);

					// add the cell to span all of the detail columns
					cell = row.insertCell(0);
					cell.style.whiteSpace = 'nowrap';
					// Make sure to count all of the columns
					if ( undefined !== numCol )
					{
						cell.colSpan = numCol;
					}

					// Create the table for the data
					innertbl = document.createElement("table");
					innertblBody = document.createElement("tbody");
					innertbl.width = '100%';
					innertbl.setAttribute("cellPadding", "0px");
					innertbl.setAttribute("cellSpacing", "0px");

					cell.appendChild(innertbl);
					cellCount = 0;

					// Draw the header row
					row = innertbl.insertRow(innertbl.rows.length);
					if ( debugMsgs )
					{
						cell = row.insertCell(cellCount++);
						cell.style.whiteSpace = 'nowrap';
						cell.width = '20%';
						cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='1' HEIGHT='17' BORDER='0'>&nbsp;Debug: <span id='loggingMsgId'>" + loggingmessage + "</span> ";
					}

					// add the cell spacing
					cell = row.insertCell(cellCount++);
					cell.width = '20%';
					cell.innerHTML = "&nbsp;<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='3' HEIGHT='17' BORDER='0'>";

					// Now for the stats
					cell = row.insertCell(cellCount++);
					cell.width = '20%';
					cell.align = 'right';
					cell.style.whiteSpace = 'nowrap';
					cell.innerHTML = "Total server [" + timeTaken / 1000.0 + "] sec&nbsp;|&nbsp;";
					cell.innerHTML += "RDB [" + dbTimeTaken / 1000.0 + "] sec&nbsp;|&nbsp;";
					cell.innerHTML += "Round Trip [" + rtTimeTaken / 1000.0 + "] sec&nbsp;|&nbsp;";
					cell.innerHTML += "Render [" + renderTimeTaken + "] ms&nbsp;|&nbsp;";
					cell.innerHTML += "Size [" + packetSize + "] bytes&nbsp;";

					innertbl.visibility = "visible";
					innertbl.display = "block";
				}
			}
			setConfigUrl( pageSize );
		}
		catch(e)
		{
			killPopup();
			exceptionAlert( e, "Issue occured in browse.js/addPagingFooter.  An issue has occured in creating the paging footer. " );
		}
	}
	
	
	// Opens the footer's "Go to Page" UI (where users can input a page number)
	// and hides the normal footer paging UI.
	function flipPagePick()
	{
		var theDiv;
		var theStyle;

		var theCell=document.getElementById('PickPageCell' );
		var theActPick=document.getElementById('activatePickDiv' );
		var theBrowsePick=document.getElementById('browsePickDiv');

		// With the opening of the bottom edit control
		// close off the top one if it is open
		// to prevent conflict with the key handling
		if ( true === topPickControlOpen )
		{
			topPickControlOpen = false;
			buildMiniTable( totalPages, currentPageNum );
		}

		if ( undefined !== theActPick )
		{
			theCell.title = LocString( 'Enter a page number here' );
			theStyle = theCell.style;
			theStyle.visibility="visible";
			theStyle.display="block";

			theStyle = theActPick.style;
			theStyle.visibility="hidden";
			theStyle.display="none";

			theStyle = theBrowsePick.style;
			theStyle.visibility = "visible";
			theStyle.display = "block";

			theDiv = document.getElementById( 'typePickDiv' );
			theStyle = theDiv.style;
			theStyle.visibility = "visible";
			theStyle.display = "block";

			theDiv = document.getElementById( 'PageSelectDiv' );
			theStyle = theDiv.style;
			theStyle.visibility = "hidden";
			theStyle.display = "none";

			btmPickControlOpen = true;
		}

		// set the timer to 5ms to set the focus
		// This is get around an IE issue where focus can not be set on a non-displayed
		// edit control.  So by waiting about 5ms this allow the windows handler to catch up and
		// allow the set focus.  No difference for FF
		setTimeout( setPagePickFocus, 5 );
	}

	// Reverses the effect of the last function - returns us to normal paging controls.
	function flipPagePickBack()
	{
		var theStyle;

		var theCell=document.getElementById('PickPageCell' );
		var theActPick=document.getElementById('activatePickDiv' );
		var theBrowsePick=document.getElementById('browsePickDiv');

		if ( undefined !== theActPick )
		{
			theCell.title = LocString( 'Go to page...' );
			theStyle = theCell.style;
			theStyle.visibility="hidden";
			theStyle.display="none";

			theStyle = theActPick.style;
			theStyle.visibility="visible";
			theStyle.display="block";

			theStyle = theBrowsePick.style;
			theStyle.visibility="hidden";
			theStyle.display="none";

			theDiv = document.getElementById( 'typePickDiv' );
			theStyle = theDiv.style;
			theStyle.visibility="hidden";
			theStyle.display="none";

			theDiv = document.getElementById( 'PageSelectDiv' );
			theStyle = theDiv.style;
			theStyle.visibility="visible";
			theStyle.display="block";

			btmPickControlOpen = false;
		}
	}

	// Puts focus in the "Go to Page" UI's textbox.  Put in a separate function
	// so that we can set a timeout in flipPagePick()...see comments in that
	// function for details.
	function setPagePickFocus()
	{
		var theCell = document.getElementById( 'pagePickEdit' );
		if ( undefined !== theCell )
		{
			theCell.focus();
		}
	}

	// Onkeypress handler for both header and footer's "Go to Page" UI.
	// If the key pressed was enter, then change the page by calling
	// get folderContents().
	function browsePageNumEnter( theForm, e, searchPage )
	{ 
		// IE passes the char in event.keyCode, Mozilla in event.which
		if ( !e )
		{
			e = window.event;
		}

		var c = ( e.charCode ) ? e.charCode : ( ( e.which ) ? e.which : e.keyCode );

		if ( c === 13 || c === 3 )
		{
			var		pickPageEdit = document.getElementById( 'pagePickEdit' );
			var		miniPageInput = document.getElementById( 'miniPageInput' );

			pickPageEdit = ( miniPageInput !== null ) ? miniPageInput : pickPageEdit ;

			if ( pickPageEdit !== null )
			{
				var pageNum = parseInt( pickPageEdit.value, 10 );
				if ( !pickPageEdit.value.isNumber() )
				{
					// Next time, we will have to clean this up by changing the localized string
					alert( String.formatLoc( "Enter a page number between n and m" , 1, totalPages ) );
					return false;
				}
				else if ( pageNum > totalPages )
				{
					pageNum = totalPages;
				}
				else if ( pageNum <= 0 )
				{
					pageNum = 1;
				}

				if ( searchPage === undefined || searchPage == false )
				{
					getFolderContents( pageNum, String.formatLoc( "Retrieving page n", pageNum )  );
				}
				else
				{ 
					DoSearch( document.SearchForm, 'func', 'NewSearch', ( pageNum - 1 ) * pageSize );
				}

				if( miniPageInput !== null )
				{
				    cancelEvent( e );
				}

				// Need to reset the page picker to open because this execution path
				// want to keep the picker open and getFolderContents sets the value to
				// false by default.

				if ( null !== miniPageInput )
				{
					topPickControlOpen = true;
				}
				else
				{
					btmPickControlOpen = true;
				}
			}
		}
		else if ( c === 27 )
		{
			flipPagePickBack();
		}
		return true;
	}

	// Returns an HTML string for the Sort Indicator image for this column - 
	// determines if the column is being sorted ascending or descending, or not at all.
	function SortIndicatorGet( columnName )
	{
		var		alt;
		var		retval = '';
		var		gif = '';

		// check to see if the column name is in the sortColumn parameter
		// this will handle the case of "name" & "-name".  Taken directly from LES
		if ( undefined !== sortColumn.match( columnName ) )
		{
			if ( sortColumn === columnName )
			{
				gif = 'sort-up.gif';
				alt = LocString( "Ascending Sort" );
			}
			else if ( sortColumn === "-" + columnName )
			{
				gif = 'sort-down.gif';
				alt = LocString( "Descending Sort" );
			}
		}

		if ( '' !== gif )
		{
			retval = '&nbsp;<IMG SRC="' + imgSrc + gif + '" ALT="' + alt + '" TITLE="' + alt + '" WIDTH="9" HEIGHT="5" BORDER="0">';
		}

		return retval;
	}

	// In the BigImage view style, if we have any big images to show the user,
	// we first warn them.  If they accept the warning, this function gets called,
	// which re-calls buildTableBigImage() with renderBigImages = true.
	function setRenderBigImages()
	{
		renderBigImages = true;
		buildTableBigImage();
	}

	// Called on resize so that we can re-flow the table if the current view
	// style is BigImage.  The re-flow is actually a re-generation of the entire
	// table.
	function buildTableBigImageResize()
	{
		if ( currentViewType === '2' )
		{
			buildTableBigImage();
		}
	}
	
	// Renders the BigImage view.
	function buildTableBigImage()
	{
		var		cell;
		var		hasViewChanged;
		var		innerRow;
		var		innertbl;
		var		innertblBody;
		var		numRows;
		var		row;
		var		tbl;
		var		tblBody;
		var		thisRow;

		var		alternateValue = 0;
		var		cellCount = 0;
		var		theBigTbl = document.getElementById( "browseTableDefn1" );
		var		theBigTbleStyle = theBigTbl.style;

		try
		{
			// This section of code calculates the size of the browser
			// window and calculates the number of segments that can be
			// shown in the window.  Each "segment" is given approx 250px.
			// If on resize the number of segments are not different then a
			// redraw is not done.  When switching views the number of segments
			// is set to 0 to ensure redraw.

			var 	winW = 630;
			var 	divSize;
			var 	localDivSeg;

			if ( parseInt( navigator.appVersion, 10 ) > 3 )
			{
				if ( navigator.appName=="Netscape" )
				{
					winW = window.innerWidth;
				}
				if ( navigator.appName.indexOf("Microsoft") != -1 )
				{
					winW = document.body.offsetWidth;
				}
			}

			if ( winW < 750 )
			{
				winW = 750;
			}

			// Assume we allow for 250px for each image
			localDivSeg = parseInt( winW / 250, 10 );

			divSize = parseInt( 100 / localDivSeg, 10 );

			if ( divSeg === localDivSeg )
			{
				return;
			}

			// End of resize calculations

			// Set the viewType for the Detail view
			hasViewChanged = updateViewType( '2' );

			if ( buildNoResultsView() )
			{
				return;
			}

			divSeg = localDivSeg;

			// define the table start

			// Try and get the reference to the table showing the details.  If it exists then
			// remove the rows and if not then create a new one
			tbl = document.getElementById("browseViewCoreTable");

			if ( null !== tbl )
			{
				tbl.parentNode.removeChild(tbl);
				tbl = null;
			}

			if ( flashTableRefresh )
			{
				theBigTbleStyle.display = "none";
			}

			// Create the table for the data
			tbl = document.createElement("table");

			tblBody = document.createElement("tbody");

			tbl.className = "browseTable updatedBrowse";
			tbl.id = 'browseViewCoreTable';

			if ( ( false === renderBigImages ) && ( true === haveBigImages ))
			{
				// Draw the warning row
				row = tbl.insertRow(tbl.rows.length);
				row.colSpan = '4';

				// add the cell for the checkmark
				cell = row.insertCell(0);
				cell.className = 'browseListHeaderCheck';
				cell.scope = 'colgroup';
				cell.innerHTML = "<a href='javascript:(0)' onclick='javascript:setRenderBigImages();return false;' > Warning! large images, click here to render</a>";
			}
			cellCount = 0;

			numRows = myRows.length;

			for (i=0; i<numRows; i++)
			{
				thisRow = myRows[i];

				if ( ( alternateValue % divSeg ) === 0 )
				{
					row = tbl.insertRow(tbl.rows.length);
					cellCount = 0;
				}
				updateFeaturedItemCell( thisRow );

				cell = row.insertCell(cellCount++);
				cell.className = 'browseListHeaderCheck';
				cell.scope = 'colgroup';
				cell.width = divSize + '%';

				// Need to create and inner table

				// Create the table for the each of the cells
				innertbl = document.createElement("table");
				innertblBody = document.createElement("tbody");
				innertbl.width = '100%';
				innertbl.setAttribute("cellPadding", "2px");
				innertbl.setAttribute("cellSpacing", "0px");

				cell.appendChild(innertbl);

				innerRow = innertbl.insertRow(innertbl.rows.length);

				// Put out the cell to show the actual icon
				cell = innerRow.insertCell(0);
				cell.vAlign = 'top';
				cell.align = 'center';
				cell.innerHTML = makeLargeIconLink( thisRow );

				innerRow = innertbl.insertRow(innertbl.rows.length);

				// Put out the cell to show the actual icon
				cell = innerRow.insertCell(0);
				cell.className = 'browseitemnamelargeicon';
				cell.vAlign = 'top';
				cell.align = 'center';
				cell.width = '100%';
				if ( thisRow.link.length > 0 )
				{
					cell.innerHTML = "<a href='" + htmlEscape( thisRow.link + getOptionalParams( thisRow ) ) + "'>" + thisRow.name + "</a> " + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
				}
				else
				{
					cell.innerHTML = thisRow.name + "&nbsp;" + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
				}
				alternateValue += 1;
			}
			addPagingFooter( tbl, 4 );
			document.getElementById("browseCoreDiv").appendChild(tbl);

			buildMiniTable( totalPages, currentPageNum );

			// Set the renderBigImages to false again
			renderBigImages = false;
			setTimeout( showTablesNow, 1 );
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/buildTableBigImage.  An issue has occured in creating the large icon view." );
		}
	}

	// Displays the UI for when there is nothing to display.
	function buildNoResultsView()
	{
		var		row;
		var		cell;
		var		innerHTMLStr;
		var		tbl;
		var		tblBody;
		var		innertbl;
		var		innertblBody;
		var		theDiv;
		
		var		cellCount = 0;
		var		filterVal = "";

		try
		{
			if ( myRows != null && ( myRows.length > 0 || (  objFilter.length === 0 && filterValue.length === 0 ) ) )
			{
				// there is something to display return false to indicate this fucntion is not going to do something
				return false;
			}
				
			// Turn of the multi select buttons
			theDiv = document.getElementById('MultiDetailOperations');
			theBottomRow = document.getElementById("MultiOperationBar1RowBottom");
			theMiniPager = document.getElementById('MiniPageTableCell');

			if (theDiv != null)
			{
				theDiv.style.display = 'none';
			}
			if (theBottomRow != null)
			{
				theBottomRow.style.display = 'none';
			}

			if ( null !== theMiniPager )
			{
				theMiniPager.style.display = 'none';
			}

			// Need to clear the paging footer as well
			// Try and get the reference to the table showing the details.  If it exists then
			// remove the rows and if not then create a new one
			tbl = document.getElementById("BrowsePageRowPagingSectionCellTable");
			if ( null !== tbl )
			{
				// clear the rows of the existing table to recreate the rows
				var x = tbl.rows.length;

				for( i=0; i<x; i++ )
				{
					tbl.deleteRow(0);
				}
			}

			// Try and get the reference to the table showing the details.  If it exists then
			// remove the rows and if not then create a new one
			tbl = document.getElementById( "browseViewCoreTable" );
			if ( null !== tbl )
			{
				tbl.parentNode.removeChild(tbl);
			}

			// Create the table for the data
			tbl = document.createElement("table");
			tblBody = document.createElement("tbody");
			tbl.className = "browseTable updatedBrowse";
			tbl.id = 'browseViewCoreTable';

			// Draw the header row
			row = tbl.insertRow(tbl.rows.length);

			// add the cell for the checkmark
			cell = row.insertCell(cellCount++);

			// now create a new table for the suggestions on what to do next.  It
			// will defined as three columns wide
			innertbl = document.createElement("table");
			innertblBody = document.createElement("tbody");
			innertbl.appendChild( innertblBody );
			innertbl.width = "100%";
			innertbl.setAttribute("cellPadding", "10px");
			tbl.setAttribute("cellSpacing", "10px");

			cell.appendChild(innertbl);

			// insert a spacer row/cell
			addSuggestionRow( innertbl );

			filterVal = filterValue.replace(/</g, "&lt;");
			filterVal = filterVal.replace(/>/g, "&gt;");

			if ( objFilter.length > 0 && filterVal.length > 0 )
			{
			    addSuggestionRow( innertbl, String.formatLoc( 'No matches found for &ldquo;%1&rdquo; items and &ldquo;%2&rdquo;.', myTypes[objFilter], filterVal ) );
				addSuggestionRow( innertbl );
				addSuggestionRow( innertbl, String.formatLoc( 'Change the search criteria, or' ) );
				addSuggestionRow( innertbl );

				innerHTMLStr = "<a href='javascript:void(0)' onclick='javascript:browsesearch.clearFld(true);return false;'>";
				innerHTMLStr += String.formatLoc( "Show only &ldquo;%1&rdquo; items", myTypes[objFilter] );
				innerHTMLStr += "</a>";
				addSuggestionRow( innertbl, null, innerHTMLStr );

				addSuggestionRow( innertbl );
				innerHTMLStr = "<a href='javascript:void(0)' onclick='javascript:ChangeBrowsePageObjectFilter( \"0\", \"\");return false;'>";
				innerHTMLStr += String.formatLoc( 'Show only items that match &ldquo;%1&rdquo;', filterVal );
				innerHTMLStr += "</a>";
				addSuggestionRow( innertbl, null, innerHTMLStr );

				addSuggestionRow( innertbl );

				innerHTMLStr = "<a href='javascript:void(0)' onclick='javascript:browsesearch.clearFld(false);ChangeBrowsePageObjectFilter( \"0\", \"\");return false;'>";
				innerHTMLStr += String.formatLoc( 'Show all items' );
				innerHTMLStr += "</a>";
				addSuggestionRow( innertbl, null, innerHTMLStr );

				addSuggestionRow( innertbl );
			}
			else if ( objFilter.length > 0 )
			{
				addSuggestionRow( innertbl, String.formatLoc( 'No matches found for &ldquo;%1&rdquo; items.', myTypes[objFilter] ) );
				addSuggestionRow( innertbl );
				addSuggestionRow( innertbl, String.formatLoc( 'Change the search criteria, or' ) );
				addSuggestionRow( innertbl );
				innerHTMLStr = "<A HREF='javascript:void(0)' ONCLICK='javascript:ChangeBrowsePageObjectFilter( \"0\", \"\");return false;'>";
				innerHTMLStr += String.formatLoc( 'Show all items' );
				innerHTMLStr += "</A>";
				addSuggestionRow( innertbl, null, innerHTMLStr );
				addSuggestionRow( innertbl );
			}
			else if ( filterVal.length > 0 )
			{
			    addSuggestionRow( innertbl, String.formatLoc( 'No matches found for &ldquo;%1&rdquo;.', filterVal ) );
				addSuggestionRow( innertbl );
				addSuggestionRow( innertbl, String.formatLoc( 'Change the search criteria, or' ) );
				addSuggestionRow( innertbl );

				innerHTMLStr = "<A HREF='javascript:void(0)' ONCLICK='javascript:browsesearch.clearFld(true);return false;'>";
				innerHTMLStr += String.formatLoc( 'Show all items' );
				innerHTMLStr += "</A>";
				addSuggestionRow( innertbl, null, innerHTMLStr );
				addSuggestionRow( innertbl );
			}
			
			if (document.getElementById("browseCoreDiv") != null)
			{
				document.getElementById("browseCoreDiv").appendChild(tbl);
			}
			else if ($(".browseNoItems").length > 0)
			{
				$(".browseNoItems")[0].innerHTML = String.formatLoc( 'There are no items to display.' );
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/buildNoResultsView.  An issue has occured in creating the no results information." );
		}

		return true;
	}

	// Utility function for buildNoResultsview().
	function addSuggestionRow( tbl, strText, innerHtml )
	{
		var		row;
		var		cell;

		row = tbl.insertRow(tbl.rows.length);
		cell = row.insertCell( 0 );
		cell.width = "20%";
		cell = row.insertCell( 1 );
		cell.width = "60%";

		if ( undefined !== strText )
		{
			cell.innerHTML = strText;
			cell.className = 'browseNoItemsFound';
		}
		if ( undefined !== innerHtml )
		{
			cell.innerHTML = innerHtml;
			cell.className = 'browseNoItemsFound';
		}

		cell = row.insertCell( 2 );
		cell.width = "20%";
	}

	// Generates the List view.
	function buildTableListView()
	{
		var		cell;
		var		divElem2;
		var		divElem;
		var		divElemOutter;
		var		hasViewChanged;
		var		innerHTMLStr;
		var		numRows;
		var		row;
		var		tbl;
		var		tblBody;
		var		thisRow;
		var		totalHeight;

		var		cellCount = 0;
		var		theBigTbl = document.getElementById( "browseTableDefn1" );
		var		theBigTbleStyle = theBigTbl.style;

		try
		{
			// Set the viewType for the small icons view
			hasViewChanged = updateViewType( '3' );

			if ( buildNoResultsView() )
			{
				return;
			}
			
			totalHeight = Math.ceil( myRows.length / 2 );

			// Try and get the reference to the table showing the details.  If it exists then
			// remove the rows and if not then create a new one
			tbl = document.getElementById( "browseViewCoreTable" );

			if ( null !== tbl )
			{
				tbl.parentNode.removeChild( tbl );
				tbl = null;
			}

			if ( flashTableRefresh )
			{
				theBigTbleStyle.display = "none";
			}

			// Create the table for the data
			tbl = document.createElement("table");

			tblBody = document.createElement("tbody");

			tbl.className = "browseTable updatedBrowse";
			tbl.id = 'browseViewCoreTable';

			// Draw the header row
			row = tbl.insertRow(tbl.rows.length);

			// add the cell for the checkmark
			cell = row.insertCell(cellCount++);

			divElemOutter = document.createElement("div");
			divElemOutter.id = 'itemView';
			cell.appendChild(divElemOutter);

			divElem = document.createElement("div");
			divElem.className = 'itemCol1';
			divElemOutter.appendChild(divElem);

			numRows = myRows.length;

			for (i=0; i<numRows; i++)
			{
				thisRow = myRows[i];

				if ( i === totalHeight )
				{
					divElem = document.createElement("div");
					divElem.className = "itemCol2";
					divElemOutter.appendChild( divElem );
				}

				divElem2 = document.createElement( "div" );
				divElem2.className = "smallItem";
				innerHTMLStr = makeSmallIconLink( thisRow );
				if ( thisRow.link.length > 0 )
				{
					innerHTMLStr += "&nbsp;<A HREF=\"" + thisRow.link + getOptionalParams( thisRow ) + "\">" + thisRow.name + "</a> " + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
				}
				else
				{
					innerHTMLStr += "&nbsp;" + thisRow.name + "&nbsp;" + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
				}
				divElem2.innerHTML = innerHTMLStr;
				divElem.appendChild(divElem2);

				// Update the corresponding featured item to make sure it is in line with the current settings
				updateFeaturedItemCell( thisRow );
			}

			addPagingFooter( tbl, 1 );
			document.getElementById("browseCoreDiv").appendChild(tbl);
			buildMiniTable( totalPages, currentPageNum );
			setTimeout( showTablesNow, 1 );
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/buildTableListView.  An issue has occured in creating the small icon view." );
		}
	}

	// Build the Detail view.
	function buildTableDetail()
	{
		var		cell;
		var		divElem;
		var		hasViewChanged;
		var		j;
		var		numRows;
		var		row;
		var		tbl;
		var		tblBody;
		var		thisRow;

		var		cellCount = 0;
		var		className = "";
		var		rowfactor = "1";
		var		theBigTbl = document.getElementById( "browseTableDefn1" );
		var		theBigTbleStyle = theBigTbl.style;

		try
		{
			// Set the viewType for the Detail view
			hasViewChanged = updateViewType( "1" );

			if ( buildNoResultsView() )
			{
				return;
			}

			// define the table start

			// Try and get the reference to the table showing the details.  If it exists then
			// remove the rows and if not then create a new one
			tbl = document.getElementById("browseViewCoreTable");

			if ( null !== tbl )
			{
				tbl.parentNode.removeChild(tbl);
				tbl = null;
			}

			if ( flashTableRefresh )
			{
				theBigTbleStyle.display = "none";
			}

			// Create the table for the data
			tbl = document.createElement("table");

			tblBody = document.createElement("tbody");

			tbl.className = "browseTable updatedBrowse";
			tbl.id = "browseViewCoreTable";

			// Draw the header row
			row = tbl.insertRow(tbl.rows.length);
			row.className = "browseListHeader";

			// Iterate through the columns and create the header cells
			for ( j = 0; j < columnDefinitionArray.length; j++ )
			{
				cellCount = columnDefinitionArray[j].AddCellHeader(row, myRows, cellCount);
			}

			divElem = document.createElement("div");
			divElem.id = 'itemView';
			tbl.appendChild(divElem);

			numRows = myRows.length;
			
			var hoverHandler = function(){ $(this).addClass("browseRowHover"); };
			var unhoverHandler = function(){ $(this).removeClass("browseRowHover"); };

			for (i=0; i<numRows; i++)
			{
				thisRow = myRows[i];

				// Update the corresponding featured item to make sure it is in line with the current settings
				updateFeaturedItemCell( thisRow );

				// reset the cell counter
				cellCount = 0;

				// Draw the details row
				row = tbl.insertRow(tbl.rows.length);

				// if the row has been clecked then we need to change the selection of the checkbox and the row colour
				className = "browseRow" + rowfactor;

				// Update the row objects style.  This will allow the check and uncheck to work cleanly
				thisRow.savedClass = className;
				row.setAttribute( 'rowNumber', i );
				row.id = 'rowCell' + i;
				row.className = className;
				
				// Add code to enable hover behaviour:
				$(row).hover( hoverHandler, unhoverHandler);

				// QA_STAT: row identifier
				row.setAttribute( 'tNode', thisRow.name );

				// iterate through all of the cells and display them
				for ( j = 0; j < columnDefinitionArray.length; j++ )
				{
					cellCount = columnDefinitionArray[j].AddCell( row, thisRow, cellCount, i );
				}

				if ( ( undefined !== thisRow.dcomment ) && ( 0 !== thisRow.dcomment.length ) )
				{
					// Draw the comment row
					row = tbl.insertRow(tbl.rows.length);
					row.id = "rowCellDesc" + i;
					row.className = className;

					// Add the spacer cell
					cell = row.insertCell( 0 );
					cell.innerHTML += "<IMG SRC='" + imgSrc + "spacer.gif' TITLE='' WIDTH='4' HEIGHT='1' BORDER='0'>";

					// Add the spacer cell
					cell = row.insertCell( 1 );
					cell.innerHTML += "<IMG SRC='" + imgSrc + "spacer.gif' TITLE='' WIDTH='4' HEIGHT='1' BORDER='0'>";

					// The object's description text
					cell = row.insertCell( 2 );
					cell.className = 'browseItemDescription';
					cell.style.whiteSpace = 'normal';
					cell.colSpan = columnDefinitionArray.length - 1;
					cell.innerHTML = thisRow.dcomment;
				}
				
				

				// Flip the row colours
				rowfactor = ( rowfactor === "1" ) ? "2" : "1";
			}

			// Write the paging footer and the mini controls
			addPagingFooter( tbl, 6 );
			document.getElementById("browseCoreDiv").appendChild(tbl);
			buildMiniTable( totalPages, currentPageNum );
			setTimeout( showTablesNow, 0 );
			
			// The following line "settles" the browseview, so that weird stuff with
			// wrapping doesn't happen on hovers in IE.
			$(tbl).find(".browseListHeaderName:first").addClass("browseListHeader-mo").removeClass("browseListHeader-mo");
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/buildTableDetail.  An issue has occured in creating the detail view." );
		}
	}

	// Sets the browseview table's display style to "block"
	function showTablesNow()
	{
		var		tbl = document.getElementById( "browseTableDefn1" );
			
		if ( tbl != null )
		{	
			var		arrayPageSize;
		
			var		tblStyle = tbl.style;

			tblStyle.display = "block";

			if ( flashTableRefresh )
			{
				if ( totalPages !== currentPageNum )
				{
					// Currently the only time the window needs to be flashed is
					// when the pagesize changes of the last page of results.
					// Going to assume for the time being to scroll to the bottom of the page
					// when not on the last page.
					arrayPageSize = getPageSize();

					window.scrollTo( 0, arrayPageSize[3] );
				}
			}

			flashTableRefresh = false;
			
			if ( window.Sidebar !== undefined && Sidebar !== undefined && Sidebar.initialized )
			{
				Sidebar.setClickerHeight();
			}
		}
	}

	// Called onload.  Creates browse view buttons for underneath the browse view.
	// Note that the buttons at the top of the browse view are created in a way
	// similar to the Global Menus - the WebLingo inserts the surround DIVs and
	// JS calls to fn_MultiButtonPosition().
	// The bottom button row is created from scratch by this function - the
	// WebLingo does not even generate the surrounding "MultiOperationBar1RowBottm"
	// DOM element.
	function drawBottomMultiButton()
	{
		var		buttonType;
		var		cell;
		var		innerHTMLStr;
		var		outerRow;
		var		row;
		var		tbl;
		var		innertbl;
		var		innertblBody;

		var		cellCount = 0;

		if ( noMultiSelectButtons || ( bcMultiButtonArray.length === 0 ) )
		{
			layoutToolbar();
			return;
		}

		try
		{
			row = document.getElementById("MultiOperationBar1RowBottom");

			if ( null === row )
			{
				// To be similiar to the top bar this will be created once.  After all
				// of the other rows have been created.  Then it will be simply switched on and off
				// when switching the views.
				row = document.getElementById("BrowseCoreRow");
				tbl = row.parentNode;

				// Draw the header row
				// Note: IE complained and threw an exception on using createElement
				//       in this scenario.  For FF and Safari it was okay and for IE
				//       using insertRow
				if ( isIE )
				{
					outerRow = tbl.insertRow(tbl.rows.length);
				}
				else
				{
					outerRow = document.createElement('TR');
				}

				outerRow.id = "MultiOperationBar1RowBottom";

				if ( '1' !== currentViewType )
				{
					outerRow.style.visibility = 'hidden';
					outerRow.style.position = 'absolute';
				}

				cellCount = 0;

				// Add the cell for the name column
				cell = outerRow.insertCell( cellCount++ );

				// now create a new table for the suggestions on what to do next.  It
				// will defined as three columns wide
				innertbl = document.createElement("table");
				innertblBody = document.createElement("tbody");
				innertbl.appendChild( innertblBody );
				innertbl.width = "100%";
				innertbl.setAttribute("cellPadding", "0px");
				innertbl.setAttribute("cellSpacing", "0px");

				cell.appendChild(innertbl);

				// Draw the header row
				row = innertbl.insertRow(innertbl.rows.length);
				row.className = 'browseMultiSelectColor';
				cellCount = 0;

				// Now the cell to hold the actual buttons
				cell = row.insertCell( cellCount++ );
				cell.style.whiteSpace = 'nowrap';
				cell.width = '100%';
				cell.align = 'left';

				innerHTMLStr = "<DIV ID=\"MultiDetailOperationsBottom\" CLASS=\"MultiDetailOperations\">";
				fn_setDirectWrite( false );

				var lastMenuItem = 0;
				if ( 1 >= bcMultiButtonArray.length && null != bcMultiButtonArray[0].img1 )
				{
					for ( i = 0; i < bcMultiButtonArray.length; i++ )
					{
						if ((i + 1) == bcMultiButtonArray.length) {
							lastMenuItem = 1;
						}
						buttonType = bcMultiButtonArray[i];
						if (buttonType instanceof multiButton || buttonType instanceof multiButton2)
						{
							innerHTMLStr += fn_MultiButton( buttonType.img1, buttonType.img2, buttonType.name, buttonType.displayName, buttonType.action, buttonType.type, lastMenuItem );
						}
						else
						{
							innerHTMLStr += fn_MultiButtonClient( buttonType.img1, buttonType.img2, buttonType.name, buttonType.displayName, buttonType.jsFunc, lastMenuItem );
						}
						innerHTMLStr += "<IMG HEIGHT='2' ALT='' SRC='" + imgSrc + "px.gif' WIDTH='3' BORDER='0'>";
					}
				}
				else
				{
					for (i = 0; i < bcMultiButtonArray.length; i++)
					{
						if ((i + 1) == bcMultiButtonArray.length) {
							lastMenuItem = 1;
						}
						buttonType = bcMultiButtonArray[i];
						if (buttonType instanceof multiButton || buttonType instanceof multiButton2)
						{
							innerHTMLStr += fn_MultiButtonPosition( buttonType.imgMap, buttonType.xpos, buttonType.ypos, buttonType.xpos2, buttonType.ypos2, buttonType.name, buttonType.displayName, buttonType.action, buttonType.type, lastMenuItem );
						}
						else
						{
							innerHTMLStr += fn_MultiButtonPositionClient( buttonType.imgMap, buttonType.xpos, buttonType.ypos, buttonType.xpos2, buttonType.ypos2, buttonType.name, buttonType.displayName, buttonType.jsFunc, lastMenuItem );
						}
					}

				}
				
				// Add the bottom 'more' button
				var moreButton = document.getElementById("tMoreMenuPane");
				var replaceText = moreButton.innerHTML;
				replaceText = replaceText.replace( /Menu0/g, "1Select" );
				replaceText = replaceText.replace( /mm_/g, "mm_bottom_" );
				innerHTMLStr += "<DIV ID=\"tMoreMenuPaneBottom\">" + replaceText + "</DIV></DIV>";

				cell.innerHTML = innerHTMLStr;
				fn_setDirectWrite( true );

				if ( !isIE )
				{
					tbl.appendChild ( outerRow );
				}
			}
			layoutToolbar();
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/drawBottomMultiButton.  An issue has occured in creating the bottom multi select operation buttons." );
		}
	}

	// Does a  sort of the current browse view by finding the BrowseViewColumn
	// object referred to by the global sortColumn and calling sortTableCol
	// on that object.
	function sortTable()
	{
		var		j;

		var		column = 1;
		var		columnFound = false;


		try
		{
			changeSort = false;

			for ( j = 0; j < columnDefinitionArray.length; j++ )
			{
				if ( undefined !== sortColumn.match( columnDefinitionArray[j].GetColName() ) )
				{
					columnDefinitionArray[j].sortTableCol( false );
					columnFound = true;
					break;
				}
			}

			if ( !columnFound )
			{
				//
				// We were given an invalid column to sort on, sort on what is in column 2,
				// which is the name column in a standard browse view
				//
				if ( columnDefinitionArray.length >= 2 )
				{
					column = 2;
				}

				sortColumn = columnDefinitionArray[column].GetColName();
				columnDefinitionArray[column].sortTableCol( false );
			}

			changeSort = true;
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/sortTable.  An issue has occured in sorting the browse table. sort - " + sortColumn  );
		}
	}

	// This function is the onclick handler for the head for each row.
	// colIdentifier is the variable name of the BrowseViewColumn object
	// for which the header was clicked - it is eval'ed to grab a reference
	// to the column object, on which we call sortTableCol().
	// This function is basically a wrapper that allows us to call sortTableCol
	// on the right object.
	function sortTableCol( headerClick, colIdentifier  )
	{		
		var i;
		
		var obj = null;
		
		
		try
		{
			for ( i = 0; i < columnDefinitionArray.length; i++ )
			{
				if ( columnDefinitionArray[i].identifier == colIdentifier )
				{
					obj = columnDefinitionArray[i];
				}
			}
			
			if ( obj !== null )
			{
				return obj.sortTableCol( headerClick );
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browse.js/sortTableCol.  An issue has occured in trying to do a client-side sort. Sort Object - " + colIdentifier );
		}

		return null;
	}

	// If any row is currently being edited - see editRow() below - then it
	// is returned to its original, non-editing state.
	function resetRowContents()
	{

		var theCell;
		var thisRow;

		if ( editingRow !== -1 )
		{
			// get a reference to the Cell selected
			theCell = document.getElementById('cell' + editingRow);

			thisRow = myRows[editingRow];

			// re-create the cell as it was before
			if ( thisRow.link.length > 0 )
			{
				theCell.innerHTML= "<A href=\"" + htmlEscape( thisRow.link + getOptionalParams( thisRow ) ) + "\">" + thisRow.name + "</a> " + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
			}
			else
			{
				theCell.innerHTML= "&nbsp;" + thisRow.name + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
			}
			editingRow = -1;
			killPopup();
		}
	}

	// Puts focus in the cell currently being edited (see editRow below)
	function setEditCellFocus()
	{
		var theCell = document.getElementById('editCell');
		if ( null !== theCell )
		{
			theCell.focus();
		}
	}

	// Opens the given row for editing the name of the item.  Creates a textbox
	// with the current value and sets a timeout to setEditCellFocus(), which
	// puts focus in the new textbox.  The onkeypress handler for the textbox
	// is set to cellEditEnter() to deal with finishing the edit.
	function editRow(rowNo)
	{
		// Unused at the moment
		var onKeyPressStr;

		// if a row is currently being edited
		if (rowEditing)
		{
			// cancel that change and then edit the new row
			cancelChange();
			editRow(rowNo);
		}

		// otherwise
		else
		{
			killPopup();

			// Only allow the editting of the cell
			// if it is marked as such
			if ( true === myRows[rowNo].editable )
			{
				if ( isIE )
				{
					onKeyPressStr = 'ONKEYPRESS="return cellEditEnter( this, event )" ONKEYUP="return cellEditEnter( this, event )"';
				}
				else
				{
					onKeyPressStr = 'ONKEYUP="return cellEditEnter( this, event )"';
				}

				// set the flag
				rowEditing = true;
				editingRow = rowNo;
				// get a reference to the Cell selected
				var theCell = document.getElementById('cell' + rowNo);

				if ( null !== theCell )
				{
					// create the new Cell contents
					var cellContent="<input type='text' id='editCell' class='valueEditableCell' value='" + myRows[rowNo].name + "'" + onKeyPressStr + " >";

					// populate the Cells
					theCell.innerHTML=cellContent;

					// This is get around and IE issue where focus can not be set on a non-displayed
					// edit control.  So by waiting about 5ms this allow the windows handler to catch up and
					// allow the set focus.  No difference for FF
					setTimeout(setEditCellFocus, 5 );
				}
				else
				{
					alert( "Error in resetting cell contents after editting cell" );
				}
			}
		}
	}


	// Enables the cell with ID "filtercellid" for editing.
	function filterRowCell()
	{
		// if a row is currently being edited
		if (rowEditing)
		{
			// cancel that change and then edit the new row
			cancelChange();
		}
		else
		{
			// Only allow the editting of the cell
			// if it is marked as such
			// set the flag

			// get a reference to the Cell selected
			var theCell = document.getElementById('filtercellid');

			// create the new Cell contents
			var cellContent = "<input type='text' id='editFilterCell' class='valueEditableCell' value=''>";

			// populate the Cells
			theCell.innerHTML=cellContent;

			theCell.focus();
		}
	}

	// Onkeypress handler for the cell currently being edited.  If key pressed
	// was enter, save the changes by calling saveChange().  If key pressed was escape,
	// reset by calling resetRowContents().  Up arrow and down arrow can be used
	// to edit an adjacent row.
	function cellEditEnter( theForm, e )
	{
		// IE passes the char in event.keyCode, Mozilla in event.which
		var c = ( e.charCode ) ? e.charCode : ( ( e.which ) ? e.which : e.keyCode );

		c = (e.which) ? e.which : e.keyCode;
		if ( c === 13 || c === 3 )
		{
			saveChange( editingRow );
			return false;
		}
		else if ( c === 27 )
		{
			resetRowContents();
			return false;
		}
		else if ( c === 38 )
		{
			// Up arrow
			if ( editingRow > 0 )
			{
				editRow( editingRow - 1 );
			}
			return false;
		}
		else if ( c === 40 || c === 9  )
		{
			// Up arrow
			if ( editingRow < myRows.length - 1 )
			{
				editRow( editingRow + 1 );
			}
			return false;
		}
	}

	// function to save the changes made by an edit.
	// Changes local data structures, calls resetRowContents() to put the new
	// data in the field in a non-editable fashion, and calls UpdateNameOnObject()
	// to tell the server about the change.
	function saveChange(rowNo)
	{
		var updating = false;

		if ( editingRow !== -1 && rowNo !== editingRow )
		{
			alert( "Unhandled problem: loc[1]" );
		}

		if ( rowEditing === true )
		{
			// get the updated value
			var newValue = document.getElementById('editCell');

			if ( myRows[rowNo].name !== newValue.value )
			{
				// checkfor the evil character
				if( newValue.value.indexOf( ":" ) !== -1 )
				{
					alert( LocString( 'Name cannot contain colon' ) );
					newValue.focus();
					return;
				}
				else
				{
					resetRowContents();
					UpdateNameOnObject( rowNo, myRows[rowNo].dataId, newValue.value );
					updating = true;
				}
			}
		}


		if ( false === updating )
		{
			rowEditing = false;
			resetRowContents();
		}
	}

	var wantClickOffEdit = false;

	// If wantClickOffEdit is false (which is always the case unless a 3rd party
	// changes it - base Content Server installs never change it from its default
	// false value) then we cancel the edit by calling resetRowContents(), othewise
	// we save the change.
	function cancelChange()
	{

		if ( editingRow !== -1 )
		{

			if ( wantClickOffEdit === true )
			{
				// get the updated value
				var newValue = document.getElementById('editCell');
				if ( null !== newValue )
				{
					if ( myRows[editingRow].name !== newValue.value )
					{
						saveChange(editingRow);
					}
					else
					{
						resetRowContents();
					}
				}
			}
			else
			{
				resetRowContents();
			}

		}
		// set the flag
		rowEditing = false;
	}


	//-------------------------------------------------------------------------------------------------------------
	//
	// Trap the form reset event.  When editting the name cell, we want to trap the enter key for the accept changes.
	// The problem is to prevent the default form submit from occuring back to the server since it would have
	// empty form elements.  We need to hook into the mouseup and override to return a "false" to the mouseup.
	if ( window.addEventListener )
	{
		// Mozilla
		window.addEventListener( "mouseup", catchDocumentOnClick, false );
	}
	else if ( window.attachEvent )
	{
		// IE - need the explicit form name
		document.attachEvent( 'onmouseup', catchDocumentOnClick );
	}

	function catchDocumentOnClick(e)
	{
		if ( rowEditing )
		{
			cancelChange();
			if (e && e.preventDefault)
			{
				e.preventDefault(); // DOM style
			}
			return false; // IE style
		}
		return true;
	}

	//-------------------------------------------------------------------------------------------------------------
	//
	// Trap the form reset event.  When editting the name cell, we want to trap the enter key for the accept changes.
	// The problem is to prevent the default form submit from occuring back to the server since it would have
	// empty form elements.  We need to hook into the onsubmit and override to return a "false" to the onsubmit.
	if ( window.addEventListener )
	{
		// Mozilla
		window.addEventListener( "submit", catchFormSubmit, false );
	}
	else if ( window.attachEvent )
	{
		// IE - need the explicit form name
		document.attachEvent( 'onsubmit', catchFormSubmit );
	}

	function catchFormSubmit(e)
	{
		if (rowEditing )
		{
			if (e && e.preventDefault)
			{
				e.preventDefault(); // DOM style
			}
			return false; // IE style
		}

		// The page selector is active.  Need to intercept
		// the enter key so the default form is not fired.
		var theBrowsePick = document.getElementById('browsePickDiv');
		if ( theBrowsePick != null && "block" === theBrowsePick.style.display )
		{
			if (e && e.preventDefault)
			{

				e.preventDefault(); // DOM style
			}
			return false; // IE style
		}

		return true;
	}
	
	//------------------------------------------------------------------------------------------------------------- 
	// This allows pages to specify a callback function to be run 
	// whenever new contents are loaded with AJAX 
	
	var folderContentsCallbacks = new Array(); 
	
	function addFolderContentsCallback( callback ) 
	{ 
		folderContentsCallbacks.push( callback ); 
	} 
	
	function runFolderContentsCallbacks()
	{
		for ( var i = 0; i < folderContentsCallbacks.length; i++ )
		{
			folderContentsCallbacks[ i ]();
		}
	}

	//-------------------------------------------------------------------------------------------------------------
	// AJAX CALLBACKS
	// Most of these callbacks parse the server's response by calling
	// DataStringToVariables().  Depending on the context, some affect
	// page history or browse view sorting.
	
	function folderContentsResponseLocal( responseText )
	{
		DataStringToVariables( responseText );
		
		runFolderContentsCallbacks();
	
		// QA_STAT: Indicates the ajax request is done.
		ajaxLoaded( "getContents" );
	}

	function folderContentsResponse( responseText )
	{
		DataStringToVariables( responseText );
		
		// change the window location to reflect the new location
		// add this to our history
		addPageToHistory( true );
		
		runFolderContentsCallbacks();
		
		// QA_STAT: Indicates the ajax request is done.
		ajaxLoaded( "getContents" );		
	}

	function folderContentsSort( responseText )
	{
		DataStringToVariables( responseText );

		restoreSortOrder();
		
		runFolderContentsCallbacks()
		
		// QA_STAT: Indicates the ajax request is done.
		ajaxLoaded( "getContents" );		
	}
	var ds = new Date();

	//-------------------------------------------------------------------------------------------------------------
	// AJAX Request Functions
	
	// This is a very general function that serializes next view state
	// and asks the server to supply the data corresponding to that view
	// state.  The calling method supplies its own callback, usually
	// one of the ones listed immediately above.
	function getFolderContents( pageNum, msg, responseMethod )
	{
		var url;

		// In this case we want to close off the pick control.  If the
		// selection of the page comes from the actual picker then
		// this variable will be reset to open again by the caller
		btmPickControlOpen = false;
		topPickControlOpen = false;

		// Start the round trip timer
		ds = new Date();
		if ( undefined === pageNum )
		{
			pageNum = currentPageNum;
		}

		url = baseUrl + "?func=ll&objAction=page&objID=" + containerId + "&page=" + pageNum + "&sort=" + sortColumn + "&noGUI=true";

		// add on the optional pieces
		if ( "" !== filterValue )
		{
			url += "&filterValue=" + encodeURIComponent( filterValue );
		}

		if ( "" !== objFilter )
		{
			url += "&objFilter=" + objFilter;
		}

		if ( "" !== containerSubType )
		{
			url = url + "&objType=" + containerSubType;
		}

		if ( "" !== currentTab )
		{
			url = url + "&tab=" + encodeURIComponent( currentTab );
		}

		for ( var key in contentFilter )
		{
			for ( var i = 0; i < contentFilter[ key ].length; i += 1 )
			{
				url += "&" + key + "=" + encodeURIComponent( contentFilter[ key ][ i ] );
			}
		}

		// now add the nextURL, just the relative path, not the absolute path

		url += "&nexturl=" + escape( location.pathname + location.search );
		
		// QA_STAT: Indicates the ajax request is in progress.
		ajaxLoading( "getContents" );
		
		if( undefined === responseMethod )
		{
			OTsendHTTPGetAjaxRequest( url,  folderContentsResponse, msg );
		}
		else
		{
			OTsendHTTPGetAjaxRequest( url,  responseMethod, msg );
		}

		// when switching pages need to set the search box to the stored value

		browsesearch.setSearchBoxContent();
		
		// Scroll back to the left. This prevents scrolling when changing pages from a wide browseview to normal one
		if (isIE) {
			document.body.scrollLeft = 0;
		}
	}

	// This function notifies the server of a view type change, but does not supply
	// a callback, since the server does not return any useful information.
	function UpdateViewTypeToServer( newValue )
	{
	
		var url = baseUrl + "?func=ll.UpdateViewType&saveViewType=1&viewType=" + newValue + "&noGUI=true";

		OTsendHTTPGetAjaxRequest( url );
	}

	//-------------------------------------------------------------------------------------------------------------
	// Popup utility
	//
	// getPageSize()
	// Returns array with page width, height and window width, height
	// Core code from - quirksmode.org
	// Edit for Firefox by pHaez
	//
	function getPageSize()
	{

		var		xScroll;
		var		yScroll;

		if ( window.innerHeight && window.scrollMaxY )
		{
			xScroll = document.body.scrollWidth;
			yScroll = window.innerHeight + window.scrollMaxY;
		}
		else if (document.body.scrollHeight > document.body.offsetHeight)
		{ // all but Explorer Mac
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		}
		else
		{ // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}

		var windowWidth, windowHeight;
		if (self.innerHeight)
		{	// all except Explorer
			windowWidth = self.innerWidth;
			windowHeight = self.innerHeight;
		}
		else if (document.documentElement && document.documentElement.clientHeight)
		{ // Explorer 6 Strict Mode
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		}
		else if (document.body)
		{ // other Explorers
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}

		// for small pages with total height less then height of the viewport
		if (yScroll < windowHeight)
		{
			pageHeight = windowHeight;
		}
		else
		{
			pageHeight = yScroll;
		}

		// for small pages with total width less then width of the viewport
		if ( xScroll < windowWidth )
		{
			pageWidth = windowWidth;
		}
		else
		{
			pageWidth = xScroll;
		}

		arrayPageSize = [pageWidth,pageHeight,windowWidth,windowHeight,xScroll,yScroll];

		return arrayPageSize;
	}


	//-------------------------------------------------------------------------------------------------------------
	// START browsesearch object -  this object deals with the search filtering
	// that the user can perform on the current browse view.
	if (!browsesearch)
	{
		var browsesearch = {};
	}
	
	browsesearch.clearBtn = false;

	function getBrowsearchHasContent()
	{
		return browsesearch.clearBtn;
	}

	// called when on user input - toggles clear fld btn
	browsesearch.onChange = function ( fldID )
	{
		// check whether to show delete button
		var fld = document.getElementById( fldID );

		if ( fld.value.length > 0 && !this.clearBtn )
		{
			this.clearBtn = true;
		}
		else if ( fld.value.length === 0 && this.clearBtn )
		{
			this.clearBtn = false;
		}
	};

	browsesearch.clearFld = function ( activeControl )
	{
		var		fldID = 'srch_fld';
		var		fld = document.getElementById( fldID );

		if ( null !== fld )
		{
			fld.value = "";

			this.onChange( fldID );

			if ( fld.style !== undefined )
			{
				fld.style.cssText = "color: gray; font-style: italic;";
			}
		}
		getFilterEditCellContent( activeControl );
	};

	browsesearch.onKeyPress = function ( e )
	{
		// Test for an input field enter key stroke
		var c = (e.which) ? e.which : e.keyCode;

		// On IE capture the enter to do no further processing
		if ( c === 13 || c === 3 )
		{
			getFilterEditCellContent( true );
		    cancelEvent( e );
			return false;
		}
		return true;
	};

	// called when on user input - toggles clear fld btn
	browsesearch.onBlur = function ( fldID )
	{
		// check whether to show delete button
		var fld = document.getElementById( fldID );

		if ( this.clearBtn === false )
		{
			fld.value = "";

			if ( undefined !== fld.style )
			{
				fld.style.cssText = "color: #6D7B8D; font-style: italic;";
			}
		}
		else
		{
			if ( fld.style != undefined )
			{
				fld.style.cssText = "";
			}
		}
	};

	// called when on user input - toggles clear fld btn
	browsesearch.onFocus = function ( fldID )
	{
		// check whether to show delete button
		var fld = document.getElementById( fldID );

		if ( this.clearBtn === false )
		{
			fld.value = "";

			if ( undefined !== fld.style )
			{
				fld.style.cssText = "";
			}
		}
	};

	browsesearch.onMouseChangeSB = function ( mouseOver )
	{
		// check whether to change the search button  on the mouse over
		var btn = document.getElementById( "browse_search_but" );
		if ( true === mouseOver )
		{
			btn.style.background = "white url( '" + imgSrc + "search_btn17_mo.gif' ) no-repeat top left";
		}
		else
		{
			btn.style.background = "white url( '" + imgSrc + "search_btn17.gif' ) no-repeat top left";
		}
	};

	browsesearch.setSearchBoxContent = function()
	{
		// this function is called when the page is flipped.  It will reset the search box to the
		// stored value
		var fld = document.getElementById('srch_fld');

		if ( null !== fld && ( filterValue !== fld.value ) )
		{

			if ( filterValue === "" )
			{
				this.clearBtn = false;
				fld.value = "";

				if ( undefined !== fld.style )
				{
					fld.style.cssText = "color: #6D7B8D; font-style: italic;";
				}
			}
			else
			{
				this.clearBtn = true;
				fld.value = filterValue;

				if ( undefined !== fld.style )
				{
					fld.style.cssText = "";
				}

			}
		}
	};
	
	// initialize ourselves when the page is finished loading
	$(document).ready( function() {
		browseCoreInitialize();
		drawBottomMultiButton();
		buildTableBigImageResize();
		setTimeout( showTablesNow, 250 );
		setTimeout( layoutToolbar, 0);
	
		// doneSearch and clearBtn may be true or false - update styling to reflect this fact.
		if ( document.getElementById( "srch_fld" ) != null )
		{
			browsesearch.onBlur( "srch_fld" );
		}
	});

	// Shows the Indeterminate Progress popup and contacts the server for the
	// results of the filter that should be displayed in the browse view.
	function getFilterEditCellContent( updateContent )
	{
		var msg = LocString( "Searching..." );
		// get the updated value
		var newValue = document.getElementById('srch_fld');

		if ( filterValue !== newValue.value  )
		{
			if ( getBrowsearchHasContent() )
			{
				filterValue = newValue.value;
			}
			else
			{
				filterValue = "";
			}
			if ( updateContent )
			{
				setCurrentPage( 1 );
				if( newValue.value == "" )
				{
					getFolderContents( 1, msg, folderContentsSort );
				}
				else
				{
					getFolderContents( 1, msg );
				}
			}
		}
	}
	/* END browsesearch object */


	//-------------------------------------------------------------------------------------------------------------
	// This is the storage of the subtypes and the names for the object type filter dropdown
	if (!myTypes)
	{
		myTypes = [];
	}

	// This is a map of subtype numbers to the descriptors
	function AddTypeReference( subType, subTypeName )
	{
		myTypes[ subType ] = subTypeName;
	}

	//-------------------------------------------------------------------------------------------------------------
	// This is the storage of the multiselect buttons.  Used for mainly drawing the bottom button bar.
	if (!bcMultiButtonArray)
	{
		var bcMultiButtonArray = [];
	}

	function multiButton( img1Str, img2Str, nameStr, displayNameStr, actionStr, typeStr )
	{
		this.img1 = img1Str;
		this.img2 = img2Str;
		this.name = nameStr;
		this.displayName = displayNameStr;
		this.action = actionStr;
		this.type = typeStr;
	}

	function multiButton2( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayNameStr, actionStr, typeStr )
	{
		this.imgMap = imgMap;
		this.xpos = xpos;
		this.ypos = ypos;
		this.xpos2 = xpos2;
		this.ypos2 = ypos2;
		this.name = nameStr;
		this.displayName = displayNameStr;
		this.action = actionStr;
		this.type = typeStr;
	}
	
	function multiButtonClient( img1Str, img2Str, nameStr, displayNameStr, jsFunc )
	{
		this.img1 = img1Str;
		this.img2 = img2Str;
		this.name = nameStr;
		this.displayName = displayNameStr;
		this.jsFunc = jsFunc;
	}
	
	function multiButton2Client( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayNameStr, jsFunc )
	{
		this.imgMap = imgMap;
		this.xpos = xpos;
		this.ypos = ypos;
		this.xpos2 = xpos2;
		this.ypos2 = ypos2;
		this.name = nameStr;
		this.displayName = displayNameStr;
		this.jsFunc = jsFunc;
	}

	function AddMultiButton( img1Str, img2Str, nameStr, displayNameStr, actionStr, typeStr )
	{
		bcMultiButtonArray[bcMultiButtonArray.length] = new  multiButton( img1Str, img2Str, nameStr, displayNameStr, actionStr, typeStr );
	}

	function AddMultiButton2( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayNameStr, actionStr, typeStr )
	{
		bcMultiButtonArray[bcMultiButtonArray.length] = new  multiButton2( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayNameStr, actionStr, typeStr );
	}
	
	function AddMultiButtonClient( img1Str, img2Str, nameStr, displayNameStr, jsFunc )
	{
		bcMultiButtonArray[bcMultiButtonArray.length] = new  multiButtonClient( img1Str, img2Str, nameStr, displayNameStr, jsFunc );
	}

	function AddMultiButton2Client( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayNameStr, jsFunc )
	{
		bcMultiButtonArray[bcMultiButtonArray.length] = new  multiButton2Client( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayNameStr, jsFunc );
	}

	//-------------------------------------------------------------------------------------------------------------

	function Set_Cookie( name, value, expires, path, domain, secure )
	{
		document.cookie = name + "=" + escape(value) +
				((expires) ? "; expires=" + expires.toGMTString() : "") +
				((path) ? "; path=" + path : "") +
				((domain) ? "; domain=" + domain : "") +
				((secure) ? "; secure" : "");
	}

	function Delete_Cookie( name )
	{
		// Set the expiry date to 1 day ago (1000*60*60*24), which will force the browser to remove it immediately.
		var date = new Date();
		date.setTime( date.getTime() - 86400000 );
		
		Set_Cookie( name, "", date, cookiePath );
	}
	
	//----------------------------------------------------- Toolbar Resizing --------------------------------------
	
	var multiButtonSizes = [];
	
	// Returns true if the more button functionality is enabled; false if the more button can't
	// be generated.
	var toolbarInitialized = false;
	function initializeToolbar() {
	
		var i;
		var moreButtonWidth;
		var buttons;
		
		if ( topToolbar === undefined ){
			topToolbar = $("#MultiOperationBar1");
		}
		
		if (topToolbar.length === 0)
		{
			return false;
		}
		
		if (!toolbarInitialized)
		{			
			buttons = topToolbar.find(".toolbar-menu-item");

			if ( moreButtons === undefined ) 
			{
				moreButtons = $("div.toolbar-more-button");
			}

			// Ensure all buttons are visible so that offsetWidth is accurate,
			// since offsetWidth = 0 if display:hidden
			buttons.children().show();
			moreButtons.children().show();
			
			moreButtonWidth = moreButtons.length > 0 ? moreButtons[0].offsetWidth : 0;
			
			moreButtons.css({'left': '0px',
							'position': 'relative',
							'display': 'block'});
							
			moreButtons.children().hide();				

			if (buttons.length > 0)
			{
				multiButtonSizes[0] = buttons[0].offsetWidth;
			}
				
			if (buttons.length > 1)
			{
				multiButtonSizes[0] += moreButtonWidth;
			}

			for (i = 1; i < buttons.length; i++)
			{
				multiButtonSizes[i] = multiButtonSizes[i - 1] + buttons[i].offsetWidth;
			}

			// If we're showing the last button, we hide the more button, so subtract its width
			// from the required space for the last button.
			if (buttons.length > 1)
			{
				multiButtonSizes[buttons.length - 1] -= moreButtonWidth;
			}
			
			toolbarInitialized = true;
		}
		
		return true;
	}
	
	function layoutToolbar() {
	  if ( currentViewType == '1' ) // Only support the detail view 
	  {
		var multiOperationBar1 = $("#MultiOperationBar1");
	
		if (multiOperationBar1.length > 0) 
		{
			var availableSpace;		
			var addItem = document.getElementById("tAddItemPane");
			var topToolbar = multiOperationBar1[0];
			var topButtons = $(topToolbar).find(".toolbar-menu-item");
			var bottomToolbar = $("#MultiOperationBar1RowBottom").find(".browseMultiSelectColor")[0];
			var bottomButtons = $(bottomToolbar).find(".toolbar-menu-item");
		
			if ( addItem === null )
			{
				availableSpace = multiOperationBar1[0].offsetWidth - 30;
			}
			else 
			{
				availableSpace = addItem.offsetLeft - $(topToolbar)[0].offsetLeft - 30;
			}
			moreButtons = $("div.toolbar-more-button");

			if (multiButtonSizes.length > 0 && multiButtonSizes[multiButtonSizes.length - 1] <= availableSpace)
			{
				topButtons.show();
				topButtons.children().show();				
				if ( bottomToolbar !== undefined ) {
					bottomButtons.show();
				}				
				moreButtons.children().hide();
			}
			else
			{
				moreButtons.children().show();
				
				for (var i = 0, n = multiButtonSizes.length; i < n; ++i)
				{
					if (multiButtonSizes[i] <= availableSpace)
					{
						$(topButtons[i]).show();
						$(topButtons[i]).children().show();
						$(document.getElementById("mm_" + (i + 1))).hide();
						
						if ( bottomToolbar !== undefined ) 
						{
							$(bottomButtons[i]).show();
							$(document.getElementById("mm_bottom_" + (i + 1))).hide();
						}
					}	
					else
					{
						$(topButtons[i]).hide();
						$(topButtons[i]).children().hide();
						$(document.getElementById("mm_" + (i + 1))).show();
						
						if ( bottomToolbar !== undefined ) 
						{
							$(bottomButtons[i]).hide();
							$(document.getElementById("mm_bottom_" + (i + 1))).show();
						}
					}	
				}
			}	
		}
	  }
	}
	
	function doUserDialog( userID )
	{
		var		w = window.open( baseUrl + '?func=user.userdialog&userID=' + userID,'UserDialog','width=600,height=500,resizable=yes,scrollbars=yes,menubar=no');

		if ( w.focus )
		{
			w.focus();
		}
	}
	
	$(document).ready(function(){

		if ( moreButtons === undefined )
		{
			moreButtons = $("div.toolbar-more-button");
		}

		// mouseover/mouseout for toolbar add item buttons
		moreButtons.on("mouseover", function(){
			$(this).addClass("toolbar-more-button-mo");
		}).on("mouseout", function(){
			$(this).removeClass("toolbar-more-button-mo");
		});

		if (initializeToolbar())
		{
			$(window).resize(layoutToolbar);
		}
	});
	
// This is a singleton object that represents the sidebar on the page.
var Sidebar = {
	initialize: function() {
		var self = this;
		this.initialized = true;

		// All of the markup should already exist in the page.  We get our references to it here.
		this.outerContainer = $("#browseAndSidebarContainer");
		this.shadowsContainer = $("#sidebarOuter");
		this.container = $("#sidebar");
		this.openIndicator = $("#sidebarIndicator");
		this.sideIndicator = $("#sidebarSideIndicator");
		this.clicker = $("#clicker");
		this.clickerArrow = $("#clickerArrow");
		this.sidebarWidth = $("#sidebarOuter").width();
		this.sidebarStateRH = "ll.SaveSidebarState";
		
		this.sidebarOpenHandler = null;

		$('div.sidebarOnLeft td.sidebar-wrapper-open').width(this.sidebarWidth);
	
		this.mainTableSelector = "#MainOperationTable";

		this.setClickerTitle();

		// Attach click handler to the sidebar separator - opens and closes the sidebar.
		// We also include the mouseover functionality in the .mouseover() and .mouseout() calls.
		this.clicker.click(function() {
			$(this).removeClass("sidebarSeparatorHover");
			if (self.openIndicator.hasClass("sidebarOpen"))
			{
				self.close();
			}
			else
			{
				self.open();
			}
			$(this).blur();
		}).mouseenter(this._focus).focus(this._focus).mouseleave(this._blur).blur(this._blur).keypress(function(e) {
			if (e.which == 13) {
				self.clicker.click();
				self.clicker.focus();
			}
		});

		if (isInternetExplorer6()) {
			this.clickerArrow.css("display", "none");
		}
		else {
			this.clicker.mousemove(function(e) {
				self.updateArrowLocation(e);
			});
		}
	},
	_focus: function(e) {
		$(this).addClass("sidebarSeparatorHover");
	},
	_blur: function(e) {
		$(this).removeClass("sidebarSeparatorHover");
	},
	updateArrowLocation: function(e) {
		y = Math.max(0, Math.min(parseInt(this.clicker.css("height")) - 20, e.pageY - getY(this.clicker[0]) - 10));
		this.clickerArrow[0].style.top = y + "px";
	},
	// Adds a panel whose markup already exists inside the Sidebar.  Returns a
	// SidebarPanel object representing the panel.
	registerExistingPanel: function(id) {
		$('td.sidebar-wrapper').addClass('sidebar-wrapper-open');
		if (!this.initialized)
		{
			this.initialize();
		}
		this.outerContainer.addClass("hasSidebar");
		if (this.panelCount() > 1)
		{
			this.container.addClass("sidebarHasMultiplePanels");
		}

		return new SidebarPanel(document.getElementById(id));
	},
	// Removes the SidebarPanel passed in from the Sidebar.  Note that it does
	// NOT free associated memory - the SidebarPanel still contains references to
	// the markup, but it is no longer present in the DOM.
	removePanel: function(panel) {
		if (!this.initialized)
		{
			this.initialize();
		}
		if (this.container.find("#" + panel.element[0].id).length > 0)
		{
			panel.element.remove();
		}
		if (this.panelCount() <= 1)
		{
			this.container.removeClass("sidebarHasMultiplePanels");
		}
		this.setClickerHeight();
	},
	// Moves the indicated SidebarPanel - which must already be present on the Sidebar -
	// to the indicated location.  See addPanel() for details on how location works.
	movePanelTo: function(panel, location) {
		if (!this.initialized)
		{
			this.initialize();
		}
		if (location !== undefined && location <= this.panelCount() && location >= 0 && this.container.find("#" + panel.element[0].id).length > 0) {
			if (location == this.panelCount())
			{
				panel.element.remove().appendTo(this.container);
			}
			else
			{
				panel.element.remove().insertBefore(this.container.children()[location]);
			}
		}
	},
	// Gets the number of panels in the sidebar.
	panelCount: function() {
		if (!this.initialized)
		{
			this.initialize();
		}
		return this.container.children(".sidebarPanel").length;
	},
	// Resets the height of the sidebar separator based on the size of the browseview
	// and the sidebar itself.
	setClickerHeight: function() {
		if (!this.initialized)
		{
			this.initialize();
		}

		var height;
		var mainTable = $(this.mainTableSelector);

		if (isInternetExplorer())
		{
			height = mainTable.length > 0 ? mainTable[0].offsetHeight - 13 : this.clicker[0].offsetHeight;
		}
		else
		{
			height = mainTable.length > 0 ? mainTable[0].offsetHeight - 3 : this.clicker[0].offsetHeight;
		}
		
		if (this.openIndicator.hasClass("sidebarOpen") && this.outerContainer.hasClass("hasSidebar"))
		{
			height = Math.max(height, this.container[0].offsetHeight);
		}

		this.clicker.css("height", height + "px");
	},
	// Set a custom sidebar state request handler - used by search results.  Accept only request handler strings of [a-zA-Z_0-9]+.?[a-zA-Z_0-9]+
	setSidebarStateRequestHandler: function(requestHandler) {
		var re = /^[\w]+\.?[\w]+$/;

		if (!this.initialized)
		{
			this.initialize();
		}
		if ( requestHandler.match( re ) )
		{
			this.sidebarStateRH = requestHandler;
		}
	},
	// Allow an initially closed sidebar to perform a custom open action (i.e. search needs to re-run the query with facets enabled)
	setSidebarOpenHandler: function(customMethod) {
		if (!this.initialized)
		{
			this.initialize();
		}
		if ( typeof customMethod == 'function' )
		{
			this.sidebarOpenHandler = customMethod;
		}
	},
	// Moves the sidebar to the left side of the screen.
	setSideToLeft: function() {
		if (!this.initialized)
		{
			this.initialize();
		}
		this.sideIndicator.removeClass("sidebarOnRight").addClass("sidebarOnLeft");
	},
	// Moves the sidebar to the right side of the screen.
	setSideToRight: function() {
		if (!this.initialized)
		{
			this.initialize();
		}
		this.sideIndicator.removeClass("sidebarOnLeft").addClass("sidebarOnRight");
	},
	// Opens the sidebar and sets the cookie, allowing this setting to be sticky during the user's session.
	open: function(ignoreState) {
		if (!this.initialized)
		{
			this.initialize();
		}
		
		if ( ( this.sidebarOpenHandler !== null ) && ( typeof this.sidebarOpenHandler == 'function' ) )
		{
			this.sidebarOpenHandler();
		}
		else
		{
			this.openIndicator.addClass("sidebarOpen");
			this.openIndicator.find('td.sidebar-wrapper-open').width(this.sidebarWidth);
			this.setClickerHeight();
			this.setClickerTitle();

			if ( ( ignoreState === undefined ) || ( ignoreState === false ) ) 
			{
				$.ajax({
					type: "POST",
					cache: false,
					data: "func=" + this.sidebarStateRH + "&state=1",
					success: function(msg) {
						// For DEBUGGING response
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
					}
				});
			}

			layoutToolbar();
		}
	},
	// Closes the sidebar and sets the cookie, allowing this setting to be sticky during the user's session.
	close: function(ignoreState) {
		if (!this.initialized)
		{
			this.initialize();
		}
		this.openIndicator.removeClass("sidebarOpen");
		this.sidebarWidth = $('td.sidebar-wrapper-open').width();
		this.openIndicator.children('table').width('100%');
		this.openIndicator.find('td.sidebar-wrapper-open').width('1');
		if (this.clicker.length > 0)
		{
			this.setClickerHeight();
			this.setClickerTitle();
		}

		if ( ( ignoreState === undefined ) || ( ignoreState === false ) )
		{
			$.ajax({
				type: "POST",
				cache: false,
				data: "func=" + this.sidebarStateRH + "&state=0",
				success: function(msg) {
					// For DEBUGGING response
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
				}
			});
		}
		
		layoutToolbar();
	},
	// Removes all panels from the sidebar.  This does NOT clear the memory they inhabit, since
	// if there are any references to these SidebarPanel objects, they will still contain
	// all of the markup and data.
	clear: function() {
		if (!this.initialized)
		{
			this.initialize();
		}
		this.outerContainer.removeClass("hasSidebar");
		this.container.empty();
	},
	setClickerTitle: function() {
		if (!this.initialized)
		{
			this.initialize();
		}
		if (this.openIndicator.hasClass("sidebarOpen"))
		{
			this.clicker.attr("title", LocString("Click to hide the sidebar"));
		}
		else
		{
			this.clicker.attr("title", LocString("Click to show the sidebar"));
		}
	},
	getPanelElementByName: function(panelName) {
		if (!this.initialized)
		{
			this.initialize();
		}
		for (var i = 0; i < this.panelCount(); i++) {
			if (this.container.children()[i].id == panelName) {
				return this.container.children()[i];
			}
		}
		return undefined;
	}
};

// This instantiable class represents the panels that can be added to the sidebar.
// ID is a required String parameter - its value is used for the container's ID attribute.
// If it is not supplied, undefined is returned.
// Title is an optional string parameter that sets the text in the header of the panel.
// Imgsrc is an optional string parameter that defines the path to the 16x16 image displayed
// in the header of the panel.  If this is not supplied, no icon is drawn.
// Contents is an optional parameter that defines the contents of the panel.  You can pass in
// an HTML string, a DOM element, or a jQuery object.
function SidebarPanel(idOrExistingMarkup, title, imgsrc, contents)
{
	var self = this;
	
	if (typeof idOrExistingMarkup == "string")
	{
		var id = idOrExistingMarkup;
		
		this.element = $(document.createElement("div"));
		this.titleBar = $(document.createElement("div"));
		this.titleDiv = $(document.createElement("div"));
		this.control = $(document.createElement("div"));
		this.controlSeparator = $(document.createElement("div"));
		this.iconDiv = $(document.createElement("div"));
		this.icon = $(document.createElement("img"));
		this.innerContainer = $(document.createElement("div"));
		
		this.hasTooltips = true;
		
		if (id === undefined)
		{
			return undefined;
		}
		else
		{
			this.element[0].id = id;
		}
		
		this.innerContainer.addClass("sidebarPanelContents");
		if (contents !== undefined)
		{
			this.innerContainer.empty().append(contents);
		}
		
		if (imgsrc !== undefined)
		{
			this.icon.attr("src", imgsrc);
			this.iconDiv.addClass("sidebarIcon");
			this.iconDiv.append(this.icon);
		}
		
		this.titleDiv.addClass("title");
		if (title !== undefined)
		{
			this.titleDiv.text(title);
		}
		
		this.control.addClass("sidebarPanelControl");
		
		this.controlSeparator.addClass("sidebarPanelControlSeparator");
		
		this.titleBar.addClass("sidebarTitleBar");
		this.titleBar.append(this.iconDiv);
		this.titleBar.append(this.control);
		this.titleBar.append(this.controlSeparator);
		this.titleBar.append(this.titleDiv);
		this.titleBar.attr("title", LocString("Collapse this panel"));
		
		this.element.addClass("sidebarPanel").addClass("sidebarPanelIsOpen");
		this.element.append(this.titleBar);
		this.element.append(this.innerContainer);
	}
	else
	{
		this.element = $(idOrExistingMarkup);
		this.titleBar = this.element.find("div.sidebarTitleBar");
		this.titleDiv = this.titleBar.find("div.title");
		this.control = this.titleBar.find("div.sidebarPanelControl");
		this.controlSeparator = this.titleBar.find("div.sidebarPanelControlSeparator");
		this.iconDiv = this.titleBar.find("div.sidebarIcon");
		this.icon = this.iconDiv.find("img");
		this.innerContainer = this.element.find("div.sidebarPanelContents");
	}

	this.titleBar.attr("title", LocString("Collapse this panel"));

	// Set the titleBar mouseover functionality
	this.titleBar.mouseenter(function(){
		self.titleBar.addClass("sidebarTitleBarHover");
	}).mouseleave(function(){
		self.titleBar.removeClass("sidebarTitleBarHover");
	}).mousedown(function(){
		self.titleBar.addClass("sidebarTitleBarClick");
		
		// Attach a mouseup event to the document, in case the user moves their
		// mouse off the panel header before releasing the mouse button.
		var mouseupfunc = function() {
			self.titleBar.removeClass("sidebarTitleBarClick");
			// Remove the event handler to prevent memory leaks.
			$(document).unbind("mouseup", mouseupfunc);
		};
		$(document).bind("mouseup", mouseupfunc);
	}).click(function(){
		if (self.element.hasClass("sidebarPanelIsOpen"))
		{
			self.close();
		}
		else
		{
			self.open();
		}
	});
	
}
// Opens the panel
SidebarPanel.prototype.removeTooltips = function()
{
	this.hasTooltips = false;
	this.titleBar.attr("title", "");
};
// Opens the panel
SidebarPanel.prototype.open = function()
{
	this.element.addClass("sidebarPanelIsOpen");
	if (this.hasTooltips)
	{
		this.titleBar.attr("title", LocString("Collapse this panel"));
	}
	this.togglePanelState(this.element[0].id, 2);
	Sidebar.setClickerHeight();
};
// Closes the panel
SidebarPanel.prototype.close = function()
{
	if (Sidebar.panelCount() > 1)
	{
		this.forceClose();
	}
};
SidebarPanel.prototype.forceClose = function()
{
	this.element.removeClass("sidebarPanelIsOpen");
	if (this.hasTooltips)
	{
		this.titleBar.attr("title", LocString("Expand this panel"));
	}
	this.togglePanelState(this.element[0].id, 1);
	Sidebar.setClickerHeight();
};
// Gets or sets the contents of the panel, the same way that the contents parameter
// works in the constructor.  Get the current contents by passing in no parameters -
// this will return an HTML string.
// Set the contents by passing in an HTML string, DOM element, or jQuery object.
// The setter removes all existing content.
SidebarPanel.prototype.contents = function(contents)
{
	if (contents === undefined)
	{
		return this.innerContainer.html();
	}
	else
	{
		this.innerContainer.empty().append(contents);
	}
};
// Gets or sets the title of the panel.  Get the current title by passing in no parameters;
// set the title by passing in a string.
SidebarPanel.prototype.title = function(title)
{
	if (title === undefined)
	{
		return this.titleDiv.html();
	}
	else
	{
		this.titleDiv.html(title);
	}
};
// Gets or sets the icon displayed in the panel header.  To get the current image
// path, pass in no parameters.  To set the image path (this will add the image if
// it's not currently present), pass in a non-empty string.  To remove the image,
// pass in an empty string.
SidebarPanel.prototype.img = function(img)
{
	if (img === undefined)
	{
		if (this.iconDiv.find("img").length > 0)
		{
			return this.icon.attr("src");
		}
		else
		{
			return undefined;
		}
	}
	else if (img == "")
	{
		this.iconDiv.removeClass("sidebarIcon");
		this.iconDiv.empty();
	}
	else
	{
		if (this.iconDiv.find("img").length === 0)
		{
			this.iconDiv.addClass("sidebarIcon");
			this.iconDiv.append(this.icon);
		}
		this.icon.attr("src", img);
	}
};

// Sets the vertical collapse state on server side 
// for retaining state during the session.
SidebarPanel.prototype.togglePanelState = function(panelID, state) 
{
	$.ajax({
		type: "POST",
		cache: false,
		data: "func=ll.SavePanelState&PanelID=" + panelID + "&state=" + state ,
		success: function(msg){
			// For DEBUGGING response
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
		}
	});
};