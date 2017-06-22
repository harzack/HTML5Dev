var clickedMenu = "";
var subMenus = new Object();
var	pageLoaded = false;

var iFrameHideSelect = new Array();

document.onclick = doMenu;
document.onmousedown = mouseDownHandler;
window.onresize = hideMenu;

// Return the highest container where we can store global info
function _getTopContainer()
{
	var		w = window;

	// Stop going up when either there is nothing there, or we are already there,
	// or we don't have access permission go there.
	try {
	    while ( w.parent != null && w != w.parent && typeof( w.parent ) != "undefined" )
	    {
			w.parent._llAccessTest = true;
 			w = w.parent;
 		}
 	} catch ( e ) { }

	return w;
}

// Store menuShown such that it will be accessible to all LL frames
function setMenuShown( ms )
{
	var	w = _getTopContainer();

	w._menuShown = ms;
}

function getMenuShown( )
{
	var	w = _getTopContainer();
	var ms = '';

	if ( typeof( w._menuShown ) != "undefined" )
	{
		ms = w._menuShown;
	}

	return ms;
}

// Store menuWindow such that it will be accessible to all LL frames
function setMenuWindow( mw )
{
	var	w = _getTopContainer();

	w._menuWindow = mw;
}

function getMenuWindow( )
{
	var	w = _getTopContainer();
	var mw = null;

	if ( typeof( w._menuWindow ) != "undefined" )
	{
		mw = w._menuWindow;
	}

	return mw;
}


function mouseDownHandler( e )
{
	var menuWindow = getMenuWindow();

	// If we have a menu displayed in a different window [frame], call
	// that window's onclick handler to tear down the menu. If it is in
	// the same window, let the real onclick event code determine whether
	// it is a click on the same menu or a different menu.

	if ( menuWindow != null && window != menuWindow )
	{
		menuWindow.document.onclick();
	}
}


function showMenu( menuName )
{
	clickedMenu = menuName;
}

function hideMenu( )
{
	clickedMenu = '';
	doMenu();
}

// IE workaround to ensure menu always appears on
// top of other elements.
function pushMenuToTop( $el, show )
{
	// If the browser is IE,
    if(IE)
    {
    	$el.parents().each(function() {

            if( show )
            {
				//
				// Make sure any function menu in the more menu or sidebar gets pushed to the top.
				//  This is done by setting the correct class on all parents up to the root item.
				//
               	$(this).addClass("on-top");
            }
            else
            {
               	$(this).removeClass("on-top");
            }
        });
    }
}

function makeIgnorantFramesHideMenus()
{
	var i;

	// Note: window.document is resolved when f is declared, NOT when executed.
	var f = new Function( "window.document.onclick()" );


	for (i = 0; i < window.frames.length; i++)
	{
		try {
			if ( typeof( window.frames[i].document.onmousedown ) != "function" )
			{
				// Set the handler which will advise this window of any clicks,
				// so that menus can be torn down
				window.frames[i].document.onmousedown = f;
			}
		} catch( e ) {}
	}
}


function doMenu()
{
	var myfunctionMenu;
	var	insideFunctionMenuId;
	var	insideFunctionMenu;

	var menuShown = getMenuShown();
	var menuWindow = getMenuWindow();
	
	// In case child frames have reloaded, we always reset their onmousedown handler.
	// This is necessary for View as Web Page and Edit Permissions empty right frame,
	// which don't load menu.js.
	makeIgnorantFramesHideMenus();
	
	$.ui.navigate.prototype.killmenu();


	// User clicked on same or different menu - in either case,
	// tear it down if it is in our window. If it is in another window,
	// the mouseDownHandler already dealt with it - this also protects
	// us from an IE bug which calls child IFRAME onclick handlers repeatedly
	// when there is a click in the parent frame.
	if ( menuShown != "" && menuWindow == self.window )
	{
		if ( menuShown == clickedMenu )
		{
		    // Click on same menu - interpret as hide only
		    clickedMenu = "";
  		}

		// Hide the menu
		myFunctionMenu = document.getElementById( menuShown );
		
		// Remove zIndex workaround from menu being closed
		pushMenuToTop( $(myFunctionMenu), false );
		
		tearDownMenu( myFunctionMenu );
	}

	// Click on a menu
	if ( clickedMenu != "" )
	{
		myFunctionMenu = document.getElementById( clickedMenu );
		
		// Add zIndex workaround from menu being closed
		pushMenuToTop( $(myFunctionMenu), true );
		
		// Test if is a function menu. Weird, but true.
		if ( myFunctionMenu.id.indexOf( "z" ) == 0 )
		{
			insideFunctionMenuId = 'functionMenu' + myFunctionMenu.id.substring(1);
			insideFunctionMenu =  document.getElementById( insideFunctionMenuId );

			if ( !insideFunctionMenu )
			{
			    window.status = "Waiting for data...";
			    window.setTimeout( "doMenu()", 100 );
				return;
			}
   		}

		renderMenu( myFunctionMenu, insideFunctionMenu );
		clickedMenu = "";
		window.status = "";
	}
}

function renderMenu( menu, insideMenu )
{
	var	availHeight;
	var menuWidth;
	var menuHeight;
	var scrollTop;
	var x;
	var y;

	if ( insideMenu && insideMenu.offsetWidth && insideMenu.offsetHeight )
	{		
		menuWidth = insideMenu.offsetWidth;
		menuHeight = insideMenu.offsetHeight;

		// Browser-dependent available height, with adjustment for scrollbar
		availHeight = ( IE ? document.body.offsetHeight : window.innerHeight );

		// Adjust x-position if menu would render beyond right edge of page
		if ( ( document.body.scrollLeft + document.body.offsetWidth - lastFuncClickX ) < menuWidth )
		{
			lastFuncClickX = lastFuncClickX - menuWidth;
		}
		
		x = lastFuncClickX - getX(menu.offsetParent);

		menu.style.left = x + "px"; 
		
		scrollTop = $(document).scrollTop();

    	// Adjust y-position if menu would render below visible part of page
		if ( scrollTop + availHeight - lastFuncClickY < menuHeight )
		{
			lastFuncClickY = Math.max( 10, scrollTop + availHeight - ( menuHeight + 25 ) );
		}
		
		y = lastFuncClickY - getY(menu.offsetParent);

		menu.style.top = y + "px";

		showMenuUnderBelly(getX(menu) - getX(menu.offsetParent), getY(menu) - getY(menu.offsetParent), menuHeight - 10, menuWidth - 12, menu);
	}
	else
	{
		showMenuUnderBelly( getX( menu ) - getX(menu.offsetParent), getY( menu ) - getY(menu.offsetParent), menu.offsetHeight - 10 , menu.offsetWidth - 12, menu );
	}

	// Push the menu up to the top so that its sub menus will be above the iframe underbelly.
	menu.style.zIndex = 5;

	menu.style.visibility = "visible";

	setMenuShown( menu.id );
	setMenuWindow( window );
}

// The  menus are initially placed hidden somewhere down the
// DOM tree.  If there is a non-statically positioned element between
// document.body and the function menu we run into weird positioning
// problems, so we transplant the menu to be a direct child of
// document.body when we need to display it.
function moveMenuToDOMRootIfNecessary( menu )
{
	if (menu.parentNode != document.body)
		document.body.appendChild(menu.parentNode.removeChild(menu));
}

function tearDownMenu( menu )
{
	var subMenuToHide = null;
	var imgID = null;

	menu.style.visibility = "hidden";

	hideMenuUnderBelly( true, menu );
	

	if ( menu.firstChild )
	{
		// Hide the original menu's sub menus.
		
		if ( lineBreaksAreNodes )
		{
			if ( menu.firstChild.nextSibling )
			{
				subMenuToHide = menu.firstChild.nextSibling.id;
			}
			else if ( menu.firstChild.firstElementChild && menu.firstChild.firstElementChild.id )
			{
				subMenuToHide = menu.firstChild.firstElementChild.id;
			}			
		}
		else
		{
			if ( menu.firstChild.firstChild && menu.firstChild.firstChild.id )
			{
				subMenuToHide = menu.firstChild.firstChild.id;
			}
			else if ( menu.firstChild.firstElementChild && menu.firstChild.firstElementChild.id )
			{
				subMenuToHide = menu.firstChild.firstElementChild.id;
			}
		}

		if ( subMenuToHide ) 
		{
			while ( ( subMenus[ subMenuToHide ] ) && ( subMenus[ subMenuToHide ] != "" ) )
			{
				menu = document.getElementById( subMenus[ subMenuToHide ] );
				menu.style.visibility = "hidden";

				hideMenuUnderBelly( true, menu );

				subMenus[ subMenuToHide ] = subMenus[ menu.id ];

				if ( menu.id.lastIndexOf( "Sub" ) != -1 )
				{
					loLight( menu.id.replace( "Sub", "") );
				}
			}
		}
	}
	
	if ( menu.id.indexOf("z") == 0 )
	{
		// This is for normal function menus
		imgID = "x" + menu.id.substring(1, menu.id.length);
	} else if ( menu.id.indexOf( "funcMenu" ) >= 0 ) 
	{
		// This is for special function menus, such as sub menus, or shortcut function menus
		imgID = "x" + menu.id.substring(8, 12);
	}
	
	if (imgID != null)
	{
		var imgIDElement = document.getElementById(imgID);
					
		if ( imgIDElement != null ) 
		{
			var replaceStr = imgIDElement.src.replace("_hover.png", ".png");
			imgIDElement.src = replaceStr;
			imgIDElement.onmouseout = 
				function onmouseout(event) {
					this.src = replaceStr;
				}
		}
	} 
		
	subMenus = new Object();
	setMenuShown( "" );
	setMenuWindow( null );
}


/* 			SUB MENU 							*/

function doSubMenu( menuName, parentMenu )
{
	var parentMenuItem;
	var oldMenu;
	var	x;
	var	y;

	var subMenuToShow = document.getElementById( menuName + "Sub" );
	var	availHeight = ( IE ? document.body.offsetHeight : window.innerHeight ) - 20;

	if ( subMenus[ parentMenu ] != menuName + "Sub" )
	{

		if ( subMenuToShow )
		{
			// If there is a submenu for this menu that is already shown, hide it. Unless the submenu that is shown
			// is also the one to be shown.
			if ( subMenus[ parentMenu ] && subMenus[ parentMenu ] != "" )
			{	
				while ( ( subMenus[ parentMenu ] ) && ( subMenus[ parentMenu ] != "" ) )
				{
					oldMenu = document.getElementById( subMenus[ parentMenu ] );
					oldMenu.style.visibility = "hidden";
					
					hideMenuUnderBelly( false, oldMenu );
					
					loLight( oldMenu.id.replace( "Sub", "") );
	
					subMenus[ parentMenu ] = subMenus[ oldMenu.id ];
					subMenus[ oldMenu.id ] = "";
				}
			}
			
			parentMenuItem = document.getElementById( menuName );
			
			// Magic value is bad. Done to fix IE's different positioning.
			if ( parentMenuItem.id.indexOf( "funcMenu" ) >= 0 )
			{
				x = getX( parentMenuItem );
				y = getY( parentMenuItem );

				if ( document.body.scrollLeft + document.body.offsetWidth < x + parentMenuItem.offsetWidth + subMenuToShow.offsetWidth )
				{
					x = x - subMenuToShow.offsetWidth - lastFuncClickX;
				}
				else
				{
					x = x + parentMenuItem.offsetWidth + 1 - lastFuncClickX;
				}
				
				if ( $(document).scrollTop() + availHeight < y + subMenuToShow.offsetHeight )
				{
					y = y + parentMenuItem.offsetHeight - subMenuToShow.offsetHeight - lastFuncClickY;
					
					//Check if the top of the submenu is oustide of the browser
					//Set the y so the top of the menu was inside of the browser window
					if ( y + lastFuncClickY < 0 )
                    {
                        y = 10 - lastFuncClickY;
                    }
				}
				else
				{
					y = y + 4 - lastFuncClickY;
				}
				
				subMenuToShow.style.left = x + "px";
				subMenuToShow.style.top = y + "px";
			}
			else
			{
				x = getX( parentMenuItem ) + parentMenuItem.offsetWidth;
				y = getY( parentMenuItem );
				subMenuToShow.style.left = x + 'px';
				subMenuToShow.style.top = y + 'px';
			}
	
			subMenuToShow.style.visibility = "visible";
			subMenus[ parentMenu ] = menuName + "Sub";
			
			menuDiv = $("#" + parentMenu).parents(".functionMenuDiv")[0];
			hostDiv = menuDiv.parentNode;
			
			showMenuUnderBelly( x + lastFuncClickX - getX( menuDiv.offsetParent ), y + lastFuncClickY - getY( menuDiv.offsetParent ), subMenuToShow.offsetHeight - 10, subMenuToShow.offsetWidth - 12, menuDiv );
		}
		else if ( subMenus[ parentMenu ] && subMenus[ parentMenu ] != "" )
		{
			oldMenu = document.getElementById( subMenus[ parentMenu ] );
		
			hideMenuUnderBelly( false, $(oldMenu).parents(".functionMenuDiv")[0] );
			
			oldMenu.style.visibility = "hidden";
			
			loLight( oldMenu.id.replace( "Sub", "") );
			
			subMenus[ parentMenu ] = "";
		}
	}
}

function hiLight( menuName )
{
	var menu = document.getElementById( menuName );
	$(menu).addClass('menuItemHover');
}
function loLight( menuName )
{
	var menu = document.getElementById( menuName );
	$(menu).removeClass('menuItemHover');
}

function getX(obj)
{
  return( obj.offsetParent == null ? obj.offsetLeft : obj.offsetLeft + getX( obj.offsetParent ) );
}

function getY(obj)
{
  return( obj.offsetParent == null ? obj.offsetTop : obj.offsetTop + getY( obj.offsetParent ) );
}

function showMenuUnderBelly( x, y, height, width, menuElement )
{
	var	size;
	var hiddenFrame;

	var	index = 0;
	
	// Even Chrome needs this for the Workflow Painter, but Firefox doesn't, and it causes 
	// the applet to flash if we don't disable it.
	if (!FF)
	{
		if (  iFrameHideSelect.length == 0 )
		{
			if ( document.getElementById( 'HideSelect' ) == null )
			{
				// Can't show underbelly yet... page not fully loaded
				return;
			}
			iFrameHideSelect[ 0 ] = document.getElementById( 'HideSelect' );
		}
		
		// Find an undisplayed iframe
		for ( var i = 0; i < iFrameHideSelect.length; i++ )
		{
			if ( iFrameHideSelect[ i ].style.display == "none" )
			{
				index = i;
				hiddenFrame = iFrameHideSelect[ i ];
				break;
			}
		}
		
		if ( hiddenFrame === undefined )
		{
			index = iFrameHideSelect.length;
			hiddenFrame = iFrameHideSelect[ 0 ].cloneNode( true );
			iFrameHideSelect[ iFrameHideSelect.length ] = hiddenFrame;
			document.body.appendChild( hiddenFrame );
		}
		
		$(hiddenFrame).appendTo(menuElement.parentNode);
		
		hiddenFrame.style.width =  (width + 12) + 'px';
		hiddenFrame.style.height = (height + 10) + 'px';

		hiddenFrame.style.top = y + 'px';
		hiddenFrame.style.left = x + 'px';
		hiddenFrame.style.zIndex = 1;
		hiddenFrame.style.display = "block";
		
		$( menuElement ).data( "iframeIndex", index );
	}
}


function hideMenuUnderBelly( removeAll, menuElement )
{
	var i;
	
	// Even Chrome needs this for the Workflow Painter, but Firefox doesn't, and it causes 
	// the applet to flash if we don't disable it.
	if (!FF)
	{
		var	index = $( menuElement ).data( "iframeIndex" );
		
		
		if ( removeAll )
		{
			for ( i = 0; i < iFrameHideSelect.length; i++ )
			{
				iFrameHideSelect[ i ].style.display = "none";
			}
		}
		else if ( index != null && index >= 0 && index < iFrameHideSelect.length )
		{
			iFrameHideSelect[ index ].style.display = "none";
		}
	}
}

////////////////////////////////////////////////////////////
//
// Add New Menu Items Methods
//
////////////////////////////////////////////////////////////

var nm_img = '';
var nm_colspan = '';
var nm_style = '';
var nm_nextUrl = '';
var nm_location = '';

function showAddItemMenu(menuID)
{
	var parentNode = document.getElementById( menuID + 'Select' );
	var menu = document.getElementById( menuID );


	if ( menu.offsetWidth > parentNode.offsetWidth )
	{
		menu.style.left = (getX( parentNode ) +  parentNode.offsetWidth - menu.offsetWidth) + "px";
	}
	else
	{
		menu.style.left = getX( parentNode ) + "px";
		menu.style.width = parentNode.offsetWidth;
	}
	
	menu.style.top = (getY( parentNode ) - 1) + "px";	// The -1 is to have the menu look like it's actually connecting to the Add Item button.
	
	moveMenuToDOMRootIfNecessary( menu )

	showMenu( menuID );
}

function showMoreMenu( menuID )
{
	var parentNode = document.getElementById( menuID + 'Select' );
	var toolbar = document.getElementById( "MultiOperationBar1" );
	var menu = document.getElementById( menuID );
	var mainOps = document.getElementById( "MainOperationTable" );

	menu.style.width = "auto";

	if ( menu.offsetWidth < parentNode.offsetWidth ) 
		menu.style.width = parentNode.offsetWidth;

	if ( menuID == "moreMultiMenu0" ) {
		// Only change the 'top' value for the more button on the top toolbar, not the bottom.
		// The differences between IE and Firefox in this situation is just a couple of pixels,
		// but to keep the look and feel consistent, we make special cases.
		if ( IE )
			menu.style.top = '-2px';
		else menu.style.top = '0px';
	} else {
		// IE knows what the consider the baseline for when we change the 'top' attribute in the settings, however
		// Firefox has issues and will always treat the very top of the browseview as the baseline, regardless
		// of whether we're using the top or the bottom 'more' button, so we need special cases.
		if ( IE )
			menu.style.top = ((-5) - menu.offsetHeight - parentNode.offsetHeight) + 'px';
		else menu.style.top = (mainOps.offsetHeight - 8 - menu.offsetHeight - ( parentNode.offsetHeight * 2 )) + 'px';	
	}

	if ( ( getX( parentNode ) - menu.offsetWidth + parentNode.offsetWidth ) <= getX( toolbar ) )
		menu.style.left = (getX( parentNode ) - getX( menu.offsetParent )) + 'px';
	else menu.style.left = (getX( parentNode ) - menu.offsetWidth + parentNode.offsetWidth - getX( menu.offsetParent )) + 'px';
	
	showMenu( menuID );
}

function nm_setNextUrl( s )
{
	nm_nextUrl = s;
}

function nm_setColSpan( s )
{
	nm_colspan = s;
}

function nm_setStyle( s )
{
	nm_style = s;
}

function nm_setSupportPath( s )
{
	nm_img = s;
}

function nm_setLocation( s )
{
	nm_location = s;
}

function nm_setParentID( s )
{
	nm_parentid = s;
}

// HTML Fragments - these are building blocks for add new menu
// QA_STAT: tAddItemPane is the identifier for the add item pane.

var nm_add_new_menu_top =
	'<DIV ID="tAddItemPane">';

var nm_add_new_more_menu_top =
	'<DIV ID="tMoreMenuPane">';
	
var nm_create_object_item =
	'<DIV CLASS="toolbar-menu-seperator"><A HREF="#" CLASS="toolbar-additem-button" TITLE="#ALTTEXT#" onClick="menu_callback( \'#ITEMURL#\', \'\' );return false;"><SPAN CLASS="#ITEMICON#" style="background-image:url(#ITEMIMG#);">#ALTTEXT#</SPAN></A></DIV>';

var nm_add_new_menu_head =
	'	<DIV ID="#MENUID#Select" CLASS="toolbar-additem-button add-item-select" onClick="javascript:showAddItemMenu(\'#MENUID#\');return false;">' +
	'		<A HREF="#" TITLE="#ALTTEXT#" onClick="javascript:showMenu( \'#MENUID#\', \'#FIELDNAME#\' );return false"><SPAN ID="#MENUID#Head">#LABEL#</SPAN></A>' +
	'	</DIV>' + 
	'	<DIV ID="#MENUID#" CLASS="menu add-item-menu">';
	
var nm_add_new_more_menu_head =
	'	<DIV ID="#MENUID#Select" CLASS="toolbar-more-button" onClick="javascript:showMoreMenu(\'#MENUID#\');return false;">' +
	'		<A HREF="#" TITLE="#ALTTEXT#" onClick="javascript:showMenu( \'#MENUID#\', \'#FIELDNAME#\' );return false"><SPAN>#LABEL#</SPAN></A>' +
	'	</DIV>' + 
	'	<DIV ID="#MENUID#" CLASS="menu add-item-menu">';

var nm_add_new_menu_end =
	'	</DIV>' +
	'</DIV>';

var nm_add_new_menu_item_map =
	'<DIV ID="#ID#" CLASS="menuItem" ONCLICK="javascript:openURL( \'#ITEMURL#\', \'\' )" ONMOUSEOVER="javascript:hiLight( \'#ID#\' );" ONMOUSEOUT="javascript:loLight( \'#ID#\' );" WIDTH="100%">';

var nm_add_new_more_menu_item_map =
	'<DIV ID="#ID#" CLASS="menuItem moreMenuItem" ONMOUSEOVER="javascript:hiLight(\'#ID#\');" ONMOUSEOUT="javascript:loLight( \'#ID#\')" ONCLICK="doSubmit( \'#ACTION#\', \'#TYPE#\' );">';	
	
var nm_add_new_more_menu_item_client_map = 	
	'<DIV ID="#ID#" CLASS="menuItem moreMenuItem" ONMOUSEOVER="javascript:hiLight(\'#ID#\');" ONMOUSEOUT="javascript:loLight( \'#ID#\')" onclick="#FUNCTION#();">';
	
var nm_add_new_menu_item = nm_add_new_menu_item_map +
	'	<IMG SRC="#IMGSTR#" ALT="#ITEMNAME#" TITLE="#ITEMNAME#" WIDTH="16" HEIGHT="16">';
	
function nm_AddNewMenuItem( id, imgStr, itemName, itemSubType, imgMapDivTagClassFirst )
{
	var img = imgStr;
	var s = nm_add_new_menu_item_map;
	var s1 = nm_location + "?func=ll&objType=" + itemSubType + "&objAction=create&parentId=" +  nm_parentid + "&nextURL=" + nm_nextUrl;

	if ( itemName == '' )
	{
		s += '<IMG CLASS="menuSpacer" SRC="#IMG#spacer.gif" ALT="">';
	}
	else
	{
		// An Undefined in OScript will come through as a zero length String,
		// This essentially is a check for IsUndefined()
		if ( imgMapDivTagClassFirst.length == 0 )
		{
			// Image per line
			s = nm_add_new_menu_item;
			s += '<A ID="menuItem_#ITEMSUBTYPE#" HREF="#" ONCLICK="return false;">#ITEMNAME#</A>';
		}
		else
		{
			// Using css sprite
			s += '<div class="#IMGMAPCLASS#"></div><A ID="menuItem_#ITEMSUBTYPE#" HREF="#" ONCLICK="return false;">#ITEMNAME#</A>';
			s = s.replace( /#IMGMAPCLASS#/g, imgMapDivTagClassFirst );
		}
	}

	s += '</DIV>';

	s = s.replace( /#IMG#/g, nm_img );
	s = s.replace( /#ID#/g, id);
	s = s.replace( /#ITEMNAME#/g, itemName );
	s = s.replace( /#ITEMSUBTYPE#/g, itemSubType );
	s = s.replace( /#ITEMURL#/g, s1 );
	s = s.replace( /#IMGSTR#/g, imgStr );

	document.write( s );
}

function nm_dndSupport()
{
	var locStr = LocString('Drag files to the browse area to add them to this location', menuStr );
	// Drag and Drop icon for toolbar to be displayed when its supported
	var s= '<div id="dndSupportEnabledIndicatorDiv" class="toolbar-menu-seperator">' +
			'<span class=".toolbar-additem-panel"><img src="#IMG#drag_and_drop_16x16.png" id="dndsupportenabled" width="16" height="16" title="' + locStr + '"></span>' +
			'					</div>'

	s = s.replace( /#IMG#/g, nm_img );
	document.write( s );
}

function nm_menuStart()
{
	var s = nm_add_new_menu_top;

	s = s.replace( /#IMG#/g, nm_img );
	s = s.replace( /#COLSPAN#/g, nm_colspan );

	document.write( s );
}

function nm_moreMenuStart()
{
	var s = nm_add_new_more_menu_top;
	
	s = s.replace( /#IMG#/g, nm_img );
	s = s.replace( /#COLSPAN#/g, nm_colspan );
	
	document.write( s );
}

function nm_createObjectItem( itemAlt, itemImg, itemSubType )
{
	var s = nm_create_object_item;
	var s1 = nm_location + "?func=ll&objType=" + itemSubType + "&objAction=create&parentId=" + nm_parentid + "&nextURL=" + nm_nextUrl;
	var itemIconClass = itemImg.substr(itemImg.lastIndexOf("/") + 1, itemImg.indexOf(".") - itemImg.lastIndexOf("/") - 1)

	s = s.replace( /#IMG#/g, nm_img );
	s = s.replace( /#ITEMURL#/g, s1 );
	s = s.replace( /#ALTTEXT#/g, itemAlt );
	s = s.replace( /#ITEMIMG#/g, itemImg );
	s = s.replace(/#STYLE#/g, nm_style);
	s = s.replace(/#ITEMICON#/g, itemIconClass);

	document.write( s );
}

function nm_createObjectItemWithUrl( itemAlt, itemImg, itemUrl )
{
	var s = nm_create_object_item;
	var itemIconClass = itemImg.substr(itemImg.lastIndexOf("/") + 1, itemImg.indexOf(".") - itemImg.lastIndexOf("/") - 1)

	s = s.replace( /#IMG#/g, nm_img );
	s = s.replace( /#ITEMURL#/g, itemUrl );
	s = s.replace( /#ALTTEXT#/g, itemAlt );
	s = s.replace( /#ITEMIMG#/g, itemImg );
	s = s.replace(/#STYLE#/g, nm_style);
	s = s.replace(/#ITEMICON#/g, itemIconClass);

	document.write( s );
}

function nm_AddNewMenuHead( fieldName, menuid, altText, label )
{
	var s = nm_add_new_menu_head;

	s = s.replace( /#IMG#/g, nm_img );
	s = s.replace( /#STYLE#/g, nm_style );
	s = s.replace( /#MENUID#/g, menuid );
	s = s.replace( /#ALTTEXT#/g, altText );
	s = s.replace( /#LABEL#/g, label);
	s = s.replace( /#FIELDNAME#/g, fieldName);

	document.write( s );
}

function nm_AddNewMoreMenuHead( fieldName, menuid, altText, label )
{
	var s = nm_add_new_more_menu_head;

	s = s.replace( /#IMG#/g, nm_img );
	s = s.replace( /#STYLE#/g, nm_style );
	s = s.replace( /#MENUID#/g, menuid );
	s = s.replace( /#ALTTEXT#/g, altText );
	s = s.replace( /#LABEL#/g, label);
	s = s.replace( /#FIELDNAME#/g, fieldName);

	document.write( s );
}

function nm_AddNewMenuEnd()
{
	var s = nm_add_new_menu_end;
	document.write( s );
}

function nm_AddNewMenuItemWithUrl( id, imgStr, itemName, itemUrl )
{
	var s = nm_add_new_menu_item;

	if ( itemName == '' )
	{
		s += '<IMG CLASS="menuSpacer" SRC="#IMG#spacer.gif" ALT="">';
	}
	else
	{
		s += '<A HREF="#" ONCLICK="return false;">#ITEMNAME#</A>';
	}

	s += '</DIV>';

	s = s.replace( /#IMG#/g, nm_img );
	s = s.replace( /#ID#/g, id);
	s = s.replace( /#ITEMNAME#/g, itemName );
	s = s.replace( /#ITEMURL#/g, itemUrl );
	s = s.replace( /#IMGSTR#/g, imgStr );

	document.write( s );
}

function nm_AddNewMoreMenuItem( id, img, name, displayName, action, type )
{
	var s = nm_add_new_more_menu_item_map;
	
	s += '<A HREF="#" ONCLICK="return false;">#DISPLAYNAME#</A></DIV>';
	
	s = s.replace( /#IMGSTR#/g, img );
	s = s.replace( /#PATH#/g, nm_img );
	s = s.replace( /#ID#/g, id );
	s = s.replace( /#NAME#/g, name );
	s = s.replace( /#DISPLAYNAME#/g, displayName );
	s = s.replace( /#ACTION#/g, action );
	s = s.replace( /#TYPE#/g, type );

	if ( true == fn_directWrite )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

function nm_AddNewMoreMenuItemClient( id, img, name, displayName, jsFunc )
{
	var s = nm_add_new_more_menu_item_client_map;
	
	s += '<A HREF="#" ONCLICK="return false;">#DISPLAYNAME#</A></DIV>';
	
	s = s.replace( /#IMGSTR#/g, img );
	s = s.replace( /#PATH#/g, nm_img );
	s = s.replace( /#ID#/g, id );
	s = s.replace( /#NAME#/g, name );
	s = s.replace( /#DISPLAYNAME#/g, displayName );
	s = s.replace( /#FUNCTION#/g, jsFunc );

	if ( true == fn_directWrite )
	{
		document.write( s );
	}
	else
	{
		return s;
	}
}

////////////////////////////////////////////////////////////
//
// Function Menu Methods
//
////////////////////////////////////////////////////////////

var menuWaitGIF;
var menuGIF;
   	var myFunctionMenu;
var x;
var y;
var whereTemp;
var elementTemp;

var	menuWaitMsg = "";
var functionMenuURL = "";
var functionMenuPath = "";
var sectionName = ""; // additional string to distinguish different instances of the function menu for the same node.
var lastFuncClickY = 0; // this stores Y coord of the last click on the function menu.
var lastFuncClickX = 0; // this stores X coord of the last click on the function menu.
var fm_moreParam = "";
var fn_directWrite  = true;


function beforeMenuPop()
{
	window.status = "";
}

function setSectionName( name )
{
	sectionName = name;
}

function setMoreParam( name )
{
	fm_moreParam = name;
}

function fn_setDirectWrite( trueFalse )
{
	fn_directWrite = trueFalse;
}


function showFunctionMenu2( moreParam, id, e, theTarget, func )
{
    var myItem;
	var funcMenu;
	var innerFunctionMenu;
	var funcMenuImg;

	var i = 0;


	if ( !pageLoaded )
    {
    	return;
    }

	if ( IE )
	{
		// Internet Explorer does not have the same method for cancelling event bubbling
		window.event.cancelBubble = true;
	}

	myItem = "x" + id + sectionName;
	myItemContainerId = "z" + id + sectionName;

	window.status = menuWaitMsg;

	funcMenu = document.getElementById( myItemContainerId );
	funcMenuImg = document.getElementById( myItem );
	
	// Prevent the item from being "de-highlighted"
	funcMenuImg.onmouseout = "";
	
	// check to see if the menu has already been inserted
	// into the div.
	if ( !funcMenu.firstChild )
	{

		if ( moreParam === "" && fm_moreParam !== "" )
		{
			moreParam = fm_moreParam;
		}

		retrieveData( id, moreParam, func );
	}

	lastFuncClickY = getY( funcMenuImg ) + 4;
	lastFuncClickX = getX( funcMenuImg ) + 5;

	// set this menu as the one that was clicked. This makes the
	// doMenu event handler (located in menu.js) show the menu.
	clickedMenu = myItemContainerId;

	if ( IE )
	{
		window.setTimeout( "doMenu()", 100 );
	}

        // Reset in case an older function menu that doesn't want it is
        // clicked.
        sectionName = "";
}

function insertElementAfter( where, element )
{
	var elementContainer = document.getElementById( where );

	if ( elementContainer )
	{
		if ( IE )
		{
			elementContainer.insertAdjacentHTML( 'BeforeEnd', element.outerHTML );
		}
		else
		{
			elementContainer.innerHTML = element.innerHTML;
		}
	}
}

/* Triggers the iframe to retrieve new data */
function retrieveData( id, moreParam, func )
{
	var hiddenFrame = document.getElementById( "bridgeFrame" );
	var url = baseURL + "?func=ll&objID=" + id + "&objAction=functionsmenu2";
	var nextURL = window.location;


	// Catch any access permission exceptions on parent check
	try {
		if ( window.parent.frames.length > 0 && window.parent.ButtonBarFrame == null )
    	    {
		    nextURL = window.parent.location;
		}
	} catch ( e ) { }

	if ( typeof( func ) == "undefined" )
	{
		func = "";
	}

	/* Handle optional request handler override */
	if ( func != "" )
	{
		url = baseURL + func;
	}

	if ( moreParam != "" )
	{
		url = url + "&" + moreParam;
	}

	if ( "" != sectionName )
	{
		url = url + "&sectionName=" + sectionName;
	}

	// Add timestamp to URL to prevent cache-use
	url += "&jsTicks=" + (new Date()).getTime();

	if ( -1 == url.toLowerCase().indexOf( '&nexturl=' ) )
	{
		url = url + "&nextURL=" + escape( window.location );
	}

	if ( hiddenFrame.src != url )
	{
		hiddenFrame.src = url;
	}
}

//Written so that a click on a non-link menu item (like INFO) doesn't close the menu.
function doNothing( e )
{
	if ( IE )
	{
		// Internet Explorer does not have the same method for cancelling event bubbling
		window.event.cancelBubble = true;
	}
	else
	{
		// Use the DOM method
		e.stopPropagation();
	}

}

function doKeyboardSubMenu( subMenuID, parentID, event )
{
	var subMenuItem = document.getElementById( subMenuID + '.0' );


	doNothing( event );
	doSubMenu( subMenuID, parentID );

	if ( lineBreaksAreNodes )
	{
		if ( subMenuItem.firstChild != null && subMenuItem.firstChild.nextSibling != null )
 			{
			subMenuItem.firstChild.nextSibling.focus();
		}
	}
	else
	{
		if ( subMenuItem != null )
 			{
			subMenuItem.firstChild.focus();
		}
	}
}
/////////////// OLD STYLE ... OBSOLETE //////////////


if ( NS4 )
{
	var appContainer;
}

function getObjectAndXY( e )
{
	if ( NS4 )
	{
		if ( !appContainer )
		{
			appContainer = eval( 'document.appletContainer' );
		}

		//alert(e.pageX + " " + e.pageY + " appContainer.x=" + appContainer.x + " appContainer.y=" + appContainer.y )
    		if ( NS7 )
		{
			x = e.pageX - appContainer.x;
			y = e.pageY - appContainer.y;
		}
    		else if ( NS6 || useLayers )
		{
			x = e.pageX;
			y = e.pageY;
		}
		else
		{
			x = e.pageX - appContainer.x;
			y = e.pageY - appContainer.y; //window.pageYOffset
		}
	}
	else
	{
		window.divFM.style.top=$(document).scrollTop();
		window.divFM.style.left=document.body.scrollLeft;

		x = e.clientX;
		y = e.clientY;
	}

	if ( useLayers )
	{
		myFunctionMenu = window.document.outerLayerNS.document.innerLayerNS.document.applets.FunctionMenu;
	}
	else
	{
		myFunctionMenu = window.document.applets.FunctionMenu;
	}
}

function showFunctionMenu( moreParam, id, e, theTarget )
{
    var myItem;

    if ( !pageLoaded )
    {
    	return;
    }

	myItem = "x" + id + sectionName;
	document.images[ myItem ].src = menuWaitGIF;

	window.status = menuWaitMsg;

	getObjectAndXY( e );

	if ( typeof( theTarget ) == "undefined" )
	{
		theTarget = "";
	}

	// if ( myFunctionMenu.showWithTarget( x, y, id, moreParam, theTarget ) == "" )

	document.images[ myItem ].src = menuGIF;

	window.status = "";
}

// figure out what this exists for ...
function showFunctionMenuAdv( theURL, id, e, theTarget )
{
    var myItem;

    if ( !pageLoaded )
    {
    	return;
    }

        id = "" + id;
	myItem = "x" + id + sectionName;
	document.images[ myItem ].src = menuWaitGIF;

	window.status = menuWaitMsg;

	getObjectAndXY( e );

	if ( typeof( theTarget ) == "undefined" )
	{
		theTarget = "";
	}

	// if ( myFunctionMenu.showAdv( x, y, id, theURL, theTarget ) == "" )

	document.images[ myItem ].src = menuGIF;

	window.status = "";
}

function onLoadFunctionMenu( argMenuGif, argMenuWaitGif )
{
    var waitImg = new Image();

	pageLoaded = true;
    menuGIF = argMenuGif;
    menuWaitGIF = argMenuWaitGif;

    waitImg.src = menuWaitGIF;
}

    function popup_callback( theURL, theTarget )
    {
    if ( !pageLoaded )
    {
    	return;
    }

	theURL = unescape( theURL );

	if ( __LeavePage == "" || ( eval( __LeavePage + "( '" + theURL + "', '" + theTarget + "')" ) ) )
	{
		if ( IE && ( theURL.toLowerCase().indexOf( 'objaction=download' ) > 0 ) )
  			{
			topFrame = getLLTop(self);

			if ( topFrame == self )
			{
 					openURL( theURL, theTarget );
 				}
 				else
 				{
 					topFrame.location.href = theURL;
 				}
   			}
  			else
 	        {
 	           	openURL( theURL, theTarget );
 	        }
	}
}


function fn_MenuStrOld( sectionName, moreParam, id, func, imgStr, altText, style )
{
	var s;

	s= '<A HREF="#" ONCLICK="javascript:setSectionName(\'#SECTIONNAME#\');showFunctionMenu2(\'#MOREPARAM#\', \'#ID#\', event, \'\', \'#FUNC#\' );setSectionName(\'\');return false">' +
		'<IMG DATA-OTNAME="objFuncMenu" SRC="#IMGSTR#actions.png" width="16px" height="16px" ID="x#ID##SECTIONNAME#" BORDER="0" ALT="#ALTTEXT#" TITLE="#ALTTEXT#" ONMOUSEOVER="this.src=\'#IMGSTR#actions_hover.png\'" ONMOUSEOUT="this.src=\'#IMGSTR#actions.png\'"></A>' +
		'<DIV ID="z#ID##SECTIONNAME#" CLASS="functionMenuDiv" #STYLE# ></DIV>&nbsp;';

	s = s.replace( /#SECTIONNAME#/g, sectionName );
	s = s.replace( /#MOREPARAM#/g, moreParam );
	s = s.replace( /#ID#/g, id );
	s = s.replace( /#FUNC#/g, func );
	s = s.replace( /#IMGSTR#/g, imgStr );
	s = s.replace( /#ALTTEXT#/g, altText );
	s = s.replace( /#STYLE#/g, style );

	return s;
}

function fn_MenuStr( sectionName, moreParam, id, func, imgStr, altText, style )
{
	var s;

	s= '<A HREF="#" ONCLICK="javascript:setSectionName(\'#SECTIONNAME#\');showFunctionMenu2(\'#MOREPARAM#\', \'#ID#\', event, \'\', \'#FUNC#\' );setSectionName(\'\');return false">' +
		'<IMG DATA-OTNAME="objFuncMenu" SRC="#IMGSTR#actions.png" width="16px" height="16px" ID="x#ID##SECTIONNAME#" BORDER="0" ALT="#ALTTEXT#" TITLE="#ALTTEXT#" ONMOUSEOVER="this.src=\'#IMGSTR#actions_hover.png\'" ONMOUSEOUT="this.src=\'#IMGSTR#actions.png\'"></A>' +
		'<DIV ID="z#ID##SECTIONNAME#" CLASS="functionMenuDiv" #STYLE# ></DIV>&nbsp;';

	s = s.replace( /#SECTIONNAME#/g, sectionName );
	s = s.replace( /#MOREPARAM#/g, moreParam );
	s = s.replace( /#ID#/g, id );
	s = s.replace( /#FUNC#/g, func );
	s = s.replace( /#IMGSTR#/g, imgStr );
	s = s.replace( /#ALTTEXT#/g, altText );
	s = s.replace( /#STYLE#/g, style );

	return s;
}

function fn_Menu( sectionName, moreParam, id, func, imgStr, altText, style )
{
	document.write( fn_MenuStr( sectionName, moreParam, id, func, imgStr, altText, style ) );
}


function fn_MultiButton( img1, img2, nameStr, displayName, action, typeStr, last ) {
	var s;

	s = '<div #MENUSEPERATOR#><INPUT CLASS="multiButton" STYLE="background-image: url( #IMG1# );" ONMOUSEUP="this.style.backgroundImage=\'url( #IMG1# )\';c=false;" onmousedown="this.style.backgroundImage=\'url( #IMG2# )\';c=true" onmouseover="if(c)this.style.backgroundImage=\'url( #IMG2# )\'" onmouseout="this.style.backgroundImage=\'url( #IMG1# )\'" TYPE="button" NAME="#NAME#" VALUE="#DISPLAYNAME#" ONCLICK="doSubmit( \'#ACTION#\', \'#TYPE#\' );"></div>';

	if (last == 1){
		s = s.replace( /#MENUSEPERATOR#/g, 'CLASS=\"toolbar-menu-item\"' );
	} else {
		s = s.replace( /#MENUSEPERATOR#/g, 'CLASS=\"toolbar-menu-item toolbar-menu-seperator\"' );
	}

	s = s.replace( /#IMG1#/g, img1 );
	s = s.replace( /#IMG2#/g, img2 );
	s = s.replace( /#NAME#/g, nameStr );
	s = s.replace( /#DISPLAYNAME#/g, displayName );
	s = s.replace( /#ACTION#/g, action );
	s = s.replace( /#TYPE#/g, typeStr );

	if ( true == fn_directWrite )
	{
		document.write( s );
	} else {
		return s;
	}
}

function fn_MultiButtonPosition( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayName, action, typeStr, last ) {
	var s;

	s = '<div #MENUSEPERATOR#><INPUT CLASS="multiButton" TYPE="button" STYLE="background-image: url( #IMGMAP# ); background-position: #XPOS#px #YPOS#px;" onmouseup="this.style.backgroundPosition=\'#XPOS#px #YPOS#px\';" onmousedown="this.style.backgroundPosition=\'#XPOS2#px #YPOS2#px\';" onmouseover="this.style.backgroundPosition=\'#XPOS2#px #YPOS2#px\';" onmouseout="this.style.textDecoration=\'none\';this.style.backgroundPosition=\'#XPOS#px #YPOS#px\';" NAME="#NAME#" VALUE="#DISPLAYNAME#" onclick="doSubmit( \'#ACTION#\', \'#TYPE#\' );"></div>';

	if (last == 1) {
		s = s.replace( /#MENUSEPERATOR#/g, 'CLASS=\"toolbar-menu-item\"' );
	} else {
		s = s.replace( /#MENUSEPERATOR#/g, 'CLASS=\"toolbar-menu-item toolbar-menu-seperator\"' );
	}

	s = s.replace( /#IMGMAP#/g, imgMap );
	s = s.replace( /#XPOS#/g, xpos );
	s = s.replace( /#YPOS#/g, ypos );
	s = s.replace( /#XPOS2#/g, xpos2 );
	s = s.replace( /#YPOS2#/g, ypos2 );
	s = s.replace( /#NAME#/g, nameStr );
	s = s.replace( /#DISPLAYNAME#/g, displayName );
	s = s.replace( /#ACTION#/g, action );
	s = s.replace( /#TYPE#/g, typeStr );

	if ( true == fn_directWrite )
	{
		document.write( s );
	} else {
		return s;
	}
}

function fn_MultiButtonClient( img1, img2, nameStr, displayName, jsFunc, last ) {
	var s;

	s = '<div #MENUSEPERATOR#><INPUT CLASS="multiButton" STYLE="background-image: url( #IMG1# );" ONMOUSEUP="this.style.backgroundImage=\'url( #IMG1# )\';c=false;" onmousedown="this.style.backgroundImage=\'url( #IMG2# )\';c=true" onmouseover="if(c)this.style.backgroundImage=\'url( #IMG2# )\'" onmouseout="this.style.backgroundImage=\'url( #IMG1# )\'" TYPE="button" NAME="#NAME#" VALUE="#DISPLAYNAME#" ONCLICK="#FUNCTION#();"></div>';

	if (last == 1) {
		s = s.replace( /#MENUSEPERATOR#/g, 'CLASS=\"toolbar-menu-item\"' );
	} else {
		s = s.replace( /#MENUSEPERATOR#/g, 'CLASS=\"toolbar-menu-item toolbar-menu-seperator\"' );
	}
	s = s.replace( /#IMG1#/g, img1 );
	s = s.replace( /#IMG2#/g, img2 );
	s = s.replace( /#NAME#/g, nameStr );
	s = s.replace( /#DISPLAYNAME#/g, displayName );
	s = s.replace( /#FUNCTION#/g, jsFunc );

	if ( true == fn_directWrite )
	{
		document.write( s );
	} else {
		return s;
	}
}

function fn_MultiButtonPositionClient( imgMap, xpos, ypos, xpos2, ypos2, nameStr, displayName, jsFunc, last ) {
	var s;

	s = '<div #MENUSEPERATOR#><INPUT CLASS="multiButton" TYPE="button" STYLE="background-image: url( #IMGMAP# ); background-position: #XPOS#px #YPOS#px;" onmouseup="this.style.backgroundPosition=\'#XPOS#px #YPOS#px\';" onmousedown="this.style.backgroundPosition=\'#XPOS2#px #YPOS2#px\';" onmouseover="this.style.backgroundPosition=\'#XPOS2#px #YPOS2#px\';" onmouseout="this.style.textDecoration=\'none\';this.style.backgroundPosition=\'#XPOS#px #YPOS#px\';" NAME="#NAME#" VALUE="#DISPLAYNAME#" onclick="#FUNCTION#();"></div>';

	if (last == 1) {
		s = s.replace( /#MENUSEPERATOR#/g, 'CLASS=\"toolbar-menu-item\"' );
	} else {
		s = s.replace( /#MENUSEPERATOR#/g, 'CLASS=\"toolbar-menu-item toolbar-menu-seperator\"' );
	}

	s = s.replace( /#IMGMAP#/g, imgMap );
	s = s.replace( /#XPOS#/g, xpos );
	s = s.replace( /#YPOS#/g, ypos );
	s = s.replace( /#XPOS2#/g, xpos2 );
	s = s.replace( /#YPOS2#/g, ypos2 );
	s = s.replace( /#NAME#/g, nameStr );
	s = s.replace( /#DISPLAYNAME#/g, displayName );
	s = s.replace( /#FUNCTION#/g, jsFunc );

	if ( true == fn_directWrite )
	{
		document.write( s );
	} else {
		return s;
	}
}

////////////////////////////////////////////////////////////
//
// Global Menu Methods
//
////////////////////////////////////////////////////////////

function showGlobalMenu( menuName, showLocation )
{
	var globalMenu = document.getElementById( menuName );
	var showLoc = document.getElementById( showLocation );


	globalMenu.style.top = (getY( showLoc ) + showLoc.offsetHeight) + 'px';

	if ( globalMenu.offsetWidth > showLoc.offsetWidth )
	{
		globalMenu.style.left = (getX( showLoc ) +  showLoc.offsetWidth - globalMenu.offsetWidth) + 'px';
	}
	else
	{
		globalMenu.style.left = getX( showLoc ) + 'px';
		globalMenu.style.width = showLoc.offsetWidth + 'px';
	}

	clickedMenu = menuName;


	// take over from doMenu
	document.onclick = unhighlightGlobalMenuTitle;
	window.onresize = unhighlightGlobalMenuTitle;
}

function menu_callback( theURL, theTarget )
{
	//No longer wait for page to load
	//if ( !pageLoaded )
 	//{
	//	return
    //}
	try
	{
		if ( __LeavePage === "" || ( eval( __LeavePage + "( '" + theURL + "', '" + theTarget + "')" ) ) )
		{
			openURL( theURL, theTarget );
		}
    }
    catch( e )
    {
        // open the URL if the __LeavePage function does not exist.
        openURL( theURL, theTarget );
    }
}

function unhighlightGlobalMenuTitle()
{
	var	menuWindow = getMenuWindow();
	var	menuShown = getMenuShown();

	if ( ( menuWindow == self.window ) && ( menuShown != clickedMenu ) && ( document.getElementById( menuShown + 'GlobalMenu' ) != null ) )
	{
		document.getElementById( menuShown + 'GlobalMenuImage' ).src = getArrowBlack();
		document.getElementById( menuShown + 'GlobalMenu' ).firstChild.nextSibling.style.color = "#05447e";
	}

	doMenu();
}

function setArrowBlack( id )
{
	 if ( document.getElementById( id ).style.visibility != '' )
	 {
		 if ( document.getElementById( id ).style.visibility == 'hidden' )
		 {
			document.getElementById( id + 'GlobalMenu' ).firstChild.nextSibling.style.color = "#05447e";
			document.getElementById( id + 'GlobalMenuImage' ).src = getArrowBlack();
		}
	  }
	  else
	  {
		 document.getElementById( id + 'GlobalMenu' ).firstChild.nextSibling.style.color = "#05447e";
		 document.getElementById( id + 'GlobalMenuImage' ).src = getArrowBlack();
	  }
}

function setArrowRed( id )
{
	document.getElementById( id + 'GlobalMenu' ).firstChild.nextSibling.style.color = "#ff0000";
	document.getElementById( id + 'GlobalMenuImage' ).src = getArrowRed();
}

function openLinksWindow( url )
{
	var helpWindow = window.open( url, "helpWin", "WIDTH=900,HEIGHT=530,resizable,toolbar" );


	if ( helpWindow.focus )
	{
		helpWindow.focus();
	}
}


// Routines to generate global menus
// MenuBar contains Menus which contain Items, Dividers and SubMenus

var mc_baseURL = '';
var mc_img = '';
var mc_menuCount = 0;
var mc_menuWidth = 100;
var mc_nextId = 1;


function mc_setBaseURL( s )
{
	mc_baseURL = s;
}

function mc_setSupportPath( s )
{
	mc_img = s;
}

function getArrowBlack()
{
	return mc_img + 'global-down-arrow.gif';
}

function getArrowRed()
{
	return mc_img + 'global-down-arrow-red.gif';
}

// HTML Fragments - these are building blocks for global menus

// Substitutions: IMG, WIDTH
var mc_html_menuBarEnd = '<TD BACKGROUND="#IMG#global-menu-shadow.gif"><IMG HEIGHT="3" ALT="" SRC="#IMG#spacer.gif" WIDTH="#WIDTH#" BORDER="0"></TD>';

// Substitutions: IMG,  MENUNAME, MENULABEL, TOOLTIP
// QA_STAT: tGlobalMenu is the specific global menu identifier.
var mc_html_menuStart =
	'<TD ROWSPAN="2"><IMG HEIGHT="27" ALT="" SRC="#IMG#global-menu-divider.gif" WIDTH="2" BORDER="0"></TD>' +
	'<TD ID="#MENUNAME#GlobalMenu" tGlobalMenu="#MENULABEL#" HEIGHT="24" BACKGROUND="#IMG#global-menu-bg.gif" HREF="" ONCLICK="javascript:showGlobalMenu(\'#MENUNAME#\', \'#MENUNAME#GlobalMenu\' );return false" ONMOUSEOUT="javascript:setArrowBlack( \'#MENUNAME#\' )">' +
	'&nbsp;&nbsp;&nbsp;<A HREF="#" CLASS="globalMenu" ONCLICK="javascript:showGlobalMenu(\'#MENUNAME#\', \'#MENUNAME#GlobalMenu\' );return false" ONMOUSEOVER="javascript:setArrowRed( \'#MENUNAME#\' )" ONMOUSEOUT="javascript:setArrowBlack( \'#MENUNAME#\' )" TITLE="#TOOLTIP#"><B>#MENULABEL#</B>' +
	' <IMG SRC="#IMG#global-down-arrow.gif" HEIGHT="7" ALT="#TOOLTIP#" TITLE="#TOOLTIP#" HSPACE="3" WIDTH="5" ALIGN="ABSMIDDLE" BORDER="0" ONMOUSEOVER="javascript:setArrowRed( \'#MENUNAME#\' )" ONMOUSEOUT="javascript:setArrowBlack( \'#MENUNAME#\' )" ID="#MENUNAME#GlobalMenuImage"></A>' +
	'<DIV ID="#MENUNAME#" CLASS="menu">';

// Substitutions: IMG
var mc_html_menuEnd =
	'<DIV CLASS="lastItemHilite"><IMG SRC="#IMG#spacer.gif" ALT="" WIDTH="1" HEIGHT="1"></DIV>' +
	'</DIV>' +
	'</TD>';

// Substitutions: IMG
var mc_html_divider = '<DIV CLASS="menuDivider"><IMG SRC="#IMG#spacer.gif" ALT="" WIDTH="1" HEIGHT="1"></DIV>';

// Substitutions: IMG, ITEMNAME, ITEMLABEL, THEURL
var mc_html_itemTP =
	'<DIV ID="#ITEMNAME#" CLASS="menuItem" ONCLICK="javascript:menu_callback( \'#THEURL#\',\'targetParent\');return false;"  ONMOUSEOVER="javascript:hiLight(\'#ITEMNAME#\');doSubMenu( \'#ITEMNAME#\' )" ONMOUSEOUT="javascript:loLight( \'#ITEMNAME#\')" WIDTH= "100%">' +
	'<A HREF="#THEURL#" TARGET="PARENT">#ITEMLABEL#</A>' +
	'</DIV>';

var mc_html_item =
	'<DIV ID="#ITEMNAME#" CLASS="menuItem" ONCLICK="javascript:menu_callback( \'#THEURL#\',\'\');return false;" ONMOUSEOVER="javascript:hiLight(\'#ITEMNAME#\');doSubMenu( \'#ITEMNAME#\' )" ONMOUSEOUT="javascript:loLight( \'#ITEMNAME#\')" WIDTH= "100%">' +
	'<A HREF="#THEURL#">#ITEMLABEL#</A>' +
	'</DIV>';

var mc_html_subMenu =
	'<DIV ID="#ITEMNAME#" CLASS="menuItem" ONMOUSEOVER="javascript:hiLight(\'#ITEMNAME#\');doSubMenu( \'#ITEMNAME#\' )" ONMOUSEOUT="javascript:loLight( \'#ITEMNAME#\')" WIDTH="100%">' +
	'#ITEMLABEL#' +
	'</DIV>';

var mc_html_itemHelp =
	'<DIV ID="#ITEMNAME#" CLASS="menuItem" ONCLICK="javascript:openLinksWindow( \'#THEURL#\' );return false;" ONMOUSEOVER="javascript:hiLight(\'#ITEMNAME#\');doSubMenu( \'#ITEMNAME#\' )" ONMOUSEOUT="javascript:loLight( \'#ITEMNAME#\')" WIDTH= "100%">' +
	'<A HREF="#" onClick="openLinksWindow( \'#THEURL#\' );return false;">#ITEMLABEL#</A>' +
	'</DIV>';

var mc_html_itemMailto =
	'<DIV ID="#ITEMNAME#" CLASS="menuItem" ONCLICK="javascript:location.href=\'#THEURL#\'; return false;" ONMOUSEOVER="javascript:hiLight(\'#ITEMNAME#\');doSubMenu( \'#ITEMNAME#\' )" ONMOUSEOUT="javascript:loLight( \'#ITEMNAME#\')" WIDTH= "100%">' +
	'<A HREF="#THEURL#">#ITEMLABEL#</A>' +
	'</DIV>';

function mc_menuBarStart( width )
{
	mc_menuCount = 0;

	mc_menuWidth = width;

	document.write( '<TR>' );
}

function mc_menuBarEnd()
{
	var i;

	var s = mc_html_menuBarEnd.replace( /#IMG#/g, mc_img );


	s = s.replace( /#WIDTH#/g, mc_menuWidth - 2 );

	document.write( '</TR><TR>' );

	for ( i = mc_menuCount; i > 0; i-- )
	{
		document.write( s );
	}

	document.write( '</TR>' );
}

function mc_menuStart( menuLabel, toolTip )
{
	var s = mc_html_menuStart;


	s = s.replace( /#IMG#/g, mc_img );
	s = s.replace( /#MENUNAME#/g, "mc_" + mc_nextId );
	s = s.replace( /#MENULABEL#/g, menuLabel );
	s = s.replace( /#TOOLTIP#/g, toolTip );

	document.write( s );

	mc_menuCount++;

	mc_nextId++;

	return mc_nextId;
}

function mc_menuEnd()
{
	var s = mc_html_menuEnd;


	s = s.replace( /#IMG#/g, mc_img );

	document.write( s );
}

function mc_divider()
{
	var s = mc_html_divider;


	s = s.replace( /#IMG#/g, mc_img );

	document.write( s );
}

function mc_item( itemLabel, theURL, targetParent, template )
{
	var s;


	if ( template == undefined )
	{
		if ( targetParent == 1 )
		{
			s = mc_html_itemTP;
		}
		else
		{
			s = mc_html_item;
		}
	}
	else
	{
		s = template;
	}

	if ( theURL.charAt( 0 ) == '?' )
	{
		theURL = mc_baseURL + theURL;
	}

	s = s.replace( /#IMG#/g, mc_img );
	s = s.replace( /#ITEMNAME#/g, "mc_" + mc_nextId );
	s = s.replace( /#ITEMLABEL#/g, itemLabel );
	s = s.replace( /#THEURL#/g, theURL );

	document.write( s );

	mc_nextId++;

	return mc_nextId;
}

function mc_subMenu( itemLabel )
{
	var s = mc_html_subMenu;


	s = s.replace( /#IMG#/g, mc_img );
	s = s.replace( /#ITEMNAME#/g, "mc_" + mc_nextId );
	s = s.replace( /#ITEMLABEL#/g, itemLabel );

	document.write( s );

	mc_nextId++;

	return mc_nextId;
}

////////////////////////////////////////////////////////////
//
// News Ticker Methods
//
////////////////////////////////////////////////////////////

var intervalIndex;
var scrollingItems;

var lastTickerHeight = 0;
var scrollTime = 100;
var scrollPause = 2000;
var index = 0;
var tickerHeight = 15;


function showTicker()
{
	var source;
	var newsItem;
	var newsItems;
	var newsItemsToShow;
	var goodChild;

	var i = 0;
	var j = 0;
	var sourcesHeight = 0;
	var numNewsItems = 0;
	var newsTicker = document.getElementById( 'newsTicker' );
	var sources = newsTicker.childNodes;


	newsTicker.onmouseover = pauseTicker;
	newsTicker.onmouseout = unpauseTicker;

	for ( i = 0; i < sources.length; i++ )
	{
		source = sources[ i ];

		if ( source.nodeType == 1 ) // 1 == Node.ELEMENT_NODE
		{
			if ( !goodChild )
			{
				goodChild = source;
			}

			sourcesHeight = sourcesHeight + source.offsetHeight;
			
			newsItems = source.childNodes;
			for ( j = 0; j < newsItems.length; j++ )
			{
				newsItem = newsItems[ j ];
				
				if ( newsItem.nodeType == 1 ) // 1 == Node.ELEMENT_NODE
				{
					newsItem.style.height = newsTicker.style.height;
				}
				else
				{
					source.removeChild( newsItem );
					j--;
				}
			}
		}
	}
	
	// IE doesn't want to give me the height of the news ticker so we use the hard code method.
	if ( IE )
	{
		goodChild.style.top = (tickerHeight) + 'px';
		goodChild.firstChild.style.top = (-tickerHeight) + 'px';
	}
	else
	{
		goodChild.style.top = (newsTicker.offsetHeight) + 'px';
		goodChild.firstChild.style.top = (-newsTicker.offsetHeight) + 'px';
	}
	
	scrollingItems = goodChild.childNodes;
	
	if ( IE )
	{
		intervalIndex = newSetInterval( rollUp, scrollPause + ( tickerHeight * scrollTime ), goodChild.childNodes, tickerHeight );
	}
    else
    {
		intervalIndex = window.setInterval( rollUp, scrollPause + ( tickerHeight * scrollTime ), goodChild.childNodes, tickerHeight );
	}
}

function rollUp( scroller, viewPort )
{
	for ( i = 1; i <= viewPort; i++ )
	{
		if ( index + 1 < scroller.length )
		{
			if ( IE )
			{
				newSetTimeout( rollOne, (i * scrollTime), scroller[ index ], scroller[ index + 1 ], -i, viewPort );
			}
			else
			{
				window.setTimeout( rollOne, i * scrollTime, scroller[ index ], scroller[ index + 1 ], -i, viewPort );
			}
		}
		else if ( index + 1 == scroller.length )
		{
			if ( IE )
			{
				newSetTimeout( rollOne, (i * scrollTime), scroller[ index ], scroller[ 0 ], -i, viewPort );
			}
			else
			{
				window.setTimeout( rollOne, i * scrollTime, scroller[ index ], scroller[ 0 ], -i, viewPort );
			}
		}
		else
		{
			if ( IE )
			{
				newSetTimeout( rollOne, (i * scrollTime), scroller[ 0 ], scroller[ 1 ], -i, -viewPort );
			}
			else
			{
				window.setTimeout( rollOne, i * scrollTime, scroller[ 0 ], scroller[ 1 ], -i, viewPort );
			}
		}
	}
	
	if ( index + 1 < scroller.length )
	{
		index = index + 1;
	}
	else if ( index + 1 == scroller.length )
	{
		index = 0;
	}
}

function rollOne( topNode, nextNode, newHeight, viewPort )
{
	topNode.style.top = ( newHeight - viewPort ) + "px";
	nextNode.style.top = newHeight  + "px";
}

function pauseTicker()
{
    if ( IE )
    {
		newClearInterval( intervalIndex );
	}
    else
    {
		window.clearInterval( intervalIndex );
	}
}

function unpauseTicker()
{
    if ( IE )
    {
		intervalIndex = newSetInterval( rollUp, scrollPause + ( tickerHeight * scrollTime ), scrollingItems, tickerHeight );
	}
	else
	{
		intervalIndex = window.setInterval( rollUp, scrollPause + ( tickerHeight * scrollTime ), scrollingItems, tickerHeight );
	}
}


/*
* jQuery navigation widget
* 
* requirement : jquery (1.3.2) and jquery UI (1.7.2)
* usage  : $("#containername").navigate(); or ($"ul.menuclass").navigate();
* 
* tested for : IE (6,7,8), Firefox 3+, Safari 4, Chrome 2+
* 
* syntax :
	<div id="nav" class="csx">
		<ul id="tGlobalMenus" class="menu-horizontal">
			<li id="PersonalGlobalMenu" class="has-submenu">
				<a title="" href="#"><span>Personal</span></a>
				<ul id="Personal">
					<li id="0.0">
						<a href="http://localhost/Livelink/livelink.exe?func=ll&objtype=142&objaction=browse">
							<span>My Workspace</span>
						</a>
					</li>
				</ul>
			</li>
			<li id="EnterpriseGlobalMenu" class="has-submenu">...</li>
			<li id="ToolsGlobalMenu" class="has-submenu">...</li>
			<li id="HelpGlobalMenu" class="has-submenu help-menu-item">...</li>
		</ul>
	</div>
* */

$.widget("ui.navigate", {
    _init: function() {
        //holds the status of whether menus are open or closed
        this.open = false;
        $.ui.navigate._current;
        $.ui.navigate._event;
        $.ui.navigate._self = this;
        //add the event handler when an anchor tag is clicked
        $('li a', this.element).bind('click', { 'obj': this }, this._click);
		
        //when a list item is hovered
		$("li.has-submenu").bind('mouseenter', { 'obj': $.ui.navigate._self }, $.ui.navigate._self._mouseover);
        this._hideIFrame();
    },
    _showIFrame: function(el) {
        var subMenuOffset = el.offset();
        $('#HideSelect').attr({ style: 'FILTER: chroma(color=#FFFFFF); position:absolute; display:block; top:' + subMenuOffset.top + 'px; left:' + subMenuOffset.left + 'px; width:' + el.width() + 'px; height:' + el.height() + 'px;' });
    },
    _hideIFrame: function() {
        $('#HideSelect').attr({ style: 'FILTER: chroma(color=#FFFFFF); position:absolute; display:none; z-index:-1000; width:0px;, height:0px; top:0px; left:0px;' });
    },
    _click: function(e) {
		//tear down any function menus that may be showing
		if ( myFunctionMenu !== undefined )
			tearDownMenu( myFunctionMenu );
        $('body,li a span.globalMenuItem').one('click', function(e) {
            $.ui.navigate._self.killmenu();
        });
        $.ui.navigate._event = e.data.obj;
        e.stopPropagation();
        //if the link is not for a submenu, allow the href to continue
        if (!$(this).siblings().length || $(this).siblings().length == 0) return true;
        //the menu status must change
        e.data.obj.open = !e.data.obj.open;
        //if the new status is open, show it
        if (e.data.obj.open) {
            //hide all submenus
            $('li ul', e.data.obj.element).hide();
            //show the submenu for this list item
            $(this).next().show();
            $.ui.navigate._self._showIFrame($(this).next());
            $(this).next().children().eq($(this).next().children().length - 1).addClass('last-menu-item');
            //otherwise, if the new status is closed
        } else {
            //holds status of whether a submenu is visible
            var subsshowing = false;
            //check if any submenus are visible
            $('li ul', e.data.obj.element).each(function() { if ($(this).css('display') == 'block') subsshowing = true });
            //if a submenu is showing, and it's not the submenu for this list item
            if (subsshowing && $(this).next().css('display') != 'block') {
                //hide all submenus
                $('li ul', e.data.obj.element).hide();
                //show the submenu for this list item
                $(this).next().show();
                $.ui.navigate._self._showIFrame($(this).next());
                $(this).next().children().eq($(this).next().children().length - 1).addClass('last-menu-item');
                //set the new status back to open
                e.data.obj.open = true;
            } else {
                //hide the submenu for this list item
                $(this).next().hide();
                $.ui.navigate._self._hideIFrame();
            }
        }
        $.ui.navigate._current = $(this).next();
        //prevent default click;
        return false;
    },
    _mouseover: function(e) {
        //this : the hovered list item
        if ($.ui.navigate._current) {
            $.ui.navigate._current.hide();
            $.ui.navigate._current = $('ul', this)
        }
        //if the status is set to open, show it
        if (e.data.obj.open) {
            $('ul', this).show();
            $.ui.navigate._self._showIFrame($('ul', this));
            $('ul', this).children().eq($('ul', this).children().length - 1).addClass('last-menu-item');
        }
    },
	killmenu: function() {
		//Hide the menus if visible
		if (!$.ui.navigate._event) return false;
		if ($.ui.navigate._current) $.ui.navigate._current.hide();
		$.ui.navigate._event.open = false;
		$.ui.navigate._self._hideIFrame();
	},
    destroy: function() {
        $.widget.prototype.apply(this, arguments); // default destroy
    }
});
/*
* jQuery global navigation
*
* */
//when document has loaded, add navigation functionality to div#nav container
$(document).ready(function() {
	setTimeout( function() {
		$("#tGlobalMenus").navigate();
		// Adjust global menu item widths
		$("#tGlobalMenus").find("li.has-submenu ul").each(function() {
			if (IE) {
				$(this).children().children('a').width($(this).width());
			} else {
				$(this).children().width($(this).width());
			}
		});
	}, 250 );
	
	// Disable autocomplete for input password fields except the one in User Login page,
	// since there is a security setting in .ini file for that.
	$("form").find("input[type=password]").each(function() {
		if ( !$(this).hasClass("signin-inputfield") ) {
			$(this).attr("autocomplete", "off");
		}
	});
});