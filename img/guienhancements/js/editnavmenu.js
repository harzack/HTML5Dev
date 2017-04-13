var selectedNodeArray = new Array();
var selectedItem;
var selectedItemLL = false;
var lltype = -1;


if (navigator.userAgent.indexOf("Safari") > 0)
{
  isSafari = true;
  isMoz = false;
  isIE = false;
}
else if (navigator.product == "Gecko")
{
  isSafari = false;
  isMoz = true;
  isIE = false;
}
else
{
  isSafari = false;
  isMoz = false;
  isIE = true;
}
		
function getSelectedNodeIndex( nodeid )
{
	if ( selectedNodeArray != null )
	{
		for ( var i = 0; i < selectedNodeArray.length; i++ )
		{
			if ( selectedNodeArray[ i ] == nodeid )
			{
				return i;
			}
		}
	}

	return -1;
}

function addSelectedNodeIndex( nodeid )
{
	var sidx = getSelectedNodeIndex( nodeid )
	if ( sidx < 0 )
	{
		selectedNodeArray.length += 1;
		selectedNodeArray[ selectedNodeArray.length-1 ] = nodeid;
	}
}

function getForm()
{
  return document.EditNavMenuFrm;
}

function onSubmit()
{
	document.EditNavMenuFrm.navmenulist.value = Sortable.serialize('navmenulist');
	document.EditNavMenuFrm.inactivelist.value = Sortable.serialize('LLMenuItems');
	document.EditNavMenuFrm.removelist.value = selectedNodeArray.join(',');
	document.EditNavMenuFrm.submit();
}

function doDelete() 
{
	if ( selectedItem != null )
	{
		deleteItem( selectedItem, selectedItemLL );
	}
}

function doEdit( url ) 
{
	var	elem;
	var	id;
	
	
	if ( selectedItem != null )
	{
		switchTab( 'edit' );
		
		if ( selectedItem.indexOf( "a_" ) > -1 )
		{
			id = selectedItem.replace( "a_", "" );
		} 
		else 
		{
			elem = document.getElementById( selectedItem );
			if ( elem.childNodes[ 0 ] )
			{
				id = elem.childNodes[ 0 ].getAttribute( "nodeid" );
			}
		}
		if ( id != "" )
		{
			getAddModule( unescape( url ) + '&nodeid=' + escape( id ) + '&sectionid=' + escape( selectedItem ), 'EditArea' );
		}
	}
}

function selected( id, editactive, isllitem, nodetype )
{	
  	var item = document.getElementById(id );

	if ( selectedItem != null )
	{
		var olditem = document.getElementById( selectedItem );
		if ( olditem != null )
		{
			olditem.className='menueditItem';
		}
	}
	selectedItemLL = isllitem;
	lltype = nodetype;
	selectedItem = id;
	item.className='menueditItemSelected';
}

function addURL( theForm, url, img )
{
	var	onClick;
	
	var name		= theForm.name.value;
	var targetURL	= theForm.TargetURL.value;
	var tempID		= getTempSectionID();
	var id			= 'b_' + tempID;
	var contents	= document.getElementById( "navmenulist" );
   	var li			= document.createElement("li");
   	var editURL		= url.substring( 0, url.indexOf( '?' ) ) + "?func=gui.EditMenuItem";
   	
    li.setAttribute( 'id', id );
	li.innerHTML = name;
 	li.className = 'menueditItem';
 	
 	if ( isIE )
 	{
	 	// If it's IE need to use a function reference
	 	onClick = function() 
	 	{
 		    selected( this.id, false, false, -1 );
 		    doEdit( editURL );
 		}
 	}
 	else
 	{
 		// Not IE don't use a function reference
 		// N.B. I've Only tried this in Firefox (JWH)
 		onClick = "selected( '" + id + "', false, false, -1 ); doEdit( '" + editURL + "' )";
 	}
 	
	li.setAttribute( 'onclick', onClick );
   	contents.appendChild( li );
   	
	Sortable.destroy( "navmenulist" );
  	Sortable.create( "navmenulist", { dropOnEmpty: true, containment: [ "LLMenuItems", "navmenulist" ], constraint: false } );

	getAddModule( unescape( url ) + '&name=' + escape( name ) + '&targeturl=' + escape( targetURL ) + '&sectionid=' + escape( tempID ), id );

	theForm.name.value = '';
	theForm.TargetURL.value = 'http://';
}

function addSeperator( theForm )
{
	var tempid = getTempSectionID();
	var id = tempid + '_0';

	var contents = document.getElementById("navmenulist");

    	var li = document.createElement("li");
    	li.setAttribute('id', id);
	li.innerHTML = '<div class="menueditItemTxt"><a>--------------------</a></div>';
 	li.className='menueditItem';
 	
 	if (isIE)
 	{
	 	// If it's IE need to use a function reference
	 	var onClk = function() {
 		    selected(this.id, false, false, -1);
	 	    switchTab('LLMenuItemsSection');
 		}
 	}
 	else
 	{
 		// Not IE don't use a function reference
 		// N.B. I've Only tried this in Firefox (JWH)
 		var onClk = "selected('" + id + "', false, false, -1);switchTab('LLMenuItemsSection');";
 	} 	
	li.setAttribute('onclick', onClk);	
   	contents.appendChild(li);
   		

	Sortable.destroy( "navmenulist" );
  	Sortable.create("navmenulist",{dropOnEmpty:true,containment:["LLMenuItems","navmenulist"],constraint:false}); 	
}

function getTempSectionID()
{
	var now = new Date();	
	return now.valueOf();
}

function onAddShortcut( theForm, url )
{
	var	contents;
	var	tempID;
	var	id;
	var	li;
	var	editURL;
	var	onClick;
	
	var name	= theForm.name.value;
	var nodeID	= theForm.Shortcut_ID.value;

	if ( nodeID == null || nodeID == '' )
	{
		alert('You must choose an item.');
		return;
	}
	
	contents = document.getElementById("navmenulist");

	tempID = getTempSectionID();
	id = 'b_' + tempID;

  	li = document.createElement( "li" );
   	li.setAttribute( 'id', id );
	li.innerHTML = name;
 	li.className = 'menueditItem';
 	
 	editURL = url.substring( 0, url.indexOf( '?' ) ) + "?func=gui.EditMenuItem";

	if ( isIE )
 	{
	 	// If it's IE need to use a function reference
		onClick = function() 
		{
	 		selected(this.id, false, false, -1);
 			doEdit(editURL);
 		}
 	}
	else
 	{
		// Not IE don't use a function reference
 		// N.B. I've Only tried this in Firefox (JWH)
		onClick = "selected( '" + id + "', false, false, -1 ); doEdit( '" + editURL + "' )";
 	}
 	
	li.setAttribute( 'onclick', onClick );
   	contents.appendChild( li );

	Sortable.destroy( "navmenulist" );
  	Sortable.create( "navmenulist", { dropOnEmpty: true, containment: [ "LLMenuItems", "navmenulist" ], constraint: false } );
	
	getAddModule( unescape( url ) + '&name=' + encodeURIComponent( name ) + '&nodeid=' + nodeID + '&sectionid=' + tempID, id );
	
	theForm.name.value = '';
	theForm.Shortcut_ID.value = ''
	theForm.Shortcut_PathSaved.value = ''
	theForm.Shortcut_Path.value = ''
}	

function switchTab( activeTab )
{
   	var menuitems = document.getElementById('LLMenuItemsSection');
   	var llitems = document.getElementById('LLItemsSection');
   	var exturls = document.getElementById('ExtUrlsSection');
  	var editarea = document.getElementById('EditArea');
  	var seperator = document.getElementById('seperatorSection');
	var menuRadioBtn = document.getElementById("menuLinksRadioBtn");
	var llItemsRadioBtn = document.getElementById("internalLinksRadioBtn");
	var extURLsRadioBtn = document.getElementById("externalLinksRadioBtn");
	var seperatorRadioBtn = document.getElementById("seperatorsRadioBtn");	
	
	editarea.style.display = 'none';			

	if ( activeTab == 'LLMenuItemsSection' )
	{
		menuitems.style.display = 'block';
		llitems.style.display = 'none';			
		exturls.style.display = 'none';		
		seperator.style.display = 'none';
		menuRadioBtn.checked = true;
	}	
	else if ( activeTab == 'LLItemsSection' )
	{
		menuitems.style.display = 'none';
		llitems.style.display = 'block';			
		exturls.style.display = 'none';		
		seperator.style.display = 'none';
		llItemsRadioBtn.checked = true;
	}
	else if ( activeTab == 'ExtUrlsSection' )
	{
		menuitems.style.display = 'none';
		llitems.style.display = 'none';			
		exturls.style.display = 'block';	
		seperator.style.display = 'none';
		extURLsRadioBtn.checked = true;
	}
	else if ( activeTab == 'seperatorSection' )
	{
		menuitems.style.display = 'none';
		llitems.style.display = 'none';			
		exturls.style.display = 'none';	
		seperator.style.display = 'block';
		seperatorRadioBtn.checked = true;
	} if ( activeTab == 'edit' )
	{
		menuitems.style.display = 'none';
		llitems.style.display = 'none';			
		exturls.style.display = 'none';	
		seperator.style.display = 'none';
		editarea.style.display = 'block';
		menuRadioBtn.checked = false;
		llItemsRadioBtn.checked = false;
		extURLsRadioBtn.checked = false;
		seperatorRadioBtn.checked = false;
	}
}

function updateEditItem( theForm, url, sectionID, editType )
{
	var	origNodeID;
	var	targetURL;
	
	var name		= theForm.name.value;
	var extraURL	= '';
	var navItem		= document.getElementById( sectionID );
	var nodeID		= theForm.nodeid.value;


	navItem.innerHTML = name;
	
	if ( editType == '0' )
	{
		origNodeID = theForm.EditShortcut_ID.value;
		extraURL = '&nodeid=' + escape( nodeID ) + '&orignodeid=' + escape( origNodeID );
		
		switchTab( 'LLItemsSection' );
	}
	else if ( editType == '1' )
	{
		targetURL = theForm.TargetURL.value;
		extraURL = '&nodeid=' + escape( nodeID ) + '&targeturl=' + escape( targetURL );
		
		switchTab( 'ExtUrlsSection' );
	}
	
	getAddModule( unescape( url ) + '&name=' + encodeURIComponent( name ) + extraURL + '&sectionid=' + sectionID, 'EditArea' );
}

function deleteItem( id, isLLItem )
{
	var module = document.getElementById( id );
	var parent = module.parentNode;
	
	parent.removeChild( module );

	if ( isLLItem )
	{
		var contents = document.getElementById("LLMenuItems");
   		contents.appendChild(module);
		Sortable.destroy( "LLMenuItems" );
  		Sortable.create("LLMenuItems",
     				{dropOnEmpty:true,containment:["LLMenuItems"],constraint:false});
	}
	else
	{
		addSelectedNodeIndex( id );	
	}

	Sortable.destroy( "navmenulist" );
  	Sortable.create("navmenulist",
     			{dropOnEmpty:true,containment:["LLMenuItems","navmenulist"],constraint:false});

}

function setcustomsidebars( state )
{
	var customsb = document.getElementById("CSidebars");
	var showcsb = document.getElementById("ShowCSB");
	var hidecsb = document.getElementById("HideCSB");

	if ( state == 0 )
	{
		customsb.style.display = 'none';					
		showcsb.style.display = 'inline';					
		hidecsb.style.display = 'none';					
	}
	else if ( state == 1 )
	{
		customsb.style.display = 'block';				
		hidecsb.style.display = 'inline';					
		showcsb.style.display = 'none';						
		setupCustom();
	}	
}
