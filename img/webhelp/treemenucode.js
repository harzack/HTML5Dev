var rootNode = null;
var treeMenuSelectedID = 0;
var treeMenuLastItem;
var treeMenuDepth;
var treeMenuBars;

//var	selectedItem

function clickTree( nodeID )
{

	// Select on the node.
	treeMenuItemClick( nodeID, null, false );

	var tmDocument = window.frames[treeMenuFrame].document;
	var theUINode = tmDocument.getElementById( nodeID );

	// the following will VERTICALLY scroll to the item to make it visible, if necessary
	// however, it is kind of ugly because it also does the HORIZONTAL scroll
	if ( theUINode )
	{
		theUINode.scrollIntoView( true );
	}
}

function menuExpand( theNode )
{
	var thetargetNode = theNode;

	if ( theNode == null )
	{
		// unselect item, if any
		deSelectItem();

		// force a redraw to repaint the original background image
		treeMenuDisplay();

		return;
	}

	var NodeList = new Array();
	NodeList[ NodeList.length ] = theNode;

	// Find out all the ancestors.
	while ( theNode.parentid != "0" )
	{
		var theParentNode = TreeFindItem( theNode.parentid );

		if ( theParentNode == null )
		{
			return;
		}

		NodeList[ NodeList.length ] = theParentNode;

		theParentNode.expand = true;
		theNode = theParentNode;
	}

	// Expand the ancestors
	for ( var j = NodeList.length-1; j >= 0; j-- )
	{
		treeMenuListItems( NodeList[ j ], true );
	}

	// Display the tree.
	treeMenuDisplay();

	setTimeout("clickTree('" + thetargetNode.id + "')", 200);
}

function TreeFindItem( objid )
{
	for (var i = 0; i < gItems.length; i++)
	{
		if ( objid == gItems[i].id )
		{
			return gItems[i];
		}
	}
	return null;
}

function TreeFindItemByFilename( sName )
{
	for (var i = 0; i < gItems.length; i++)
	{
		var theURL = gItems[i].url;

		if ( theURL )
		{
			// Just extract the file name from the URL
			var iPos = theURL.lastIndexOf( '/' );

			if ( iPos > -1 )
			{
				theURL = theURL.substr( iPos + 1 );

				if ( sName == theURL )
				{
					return gItems[i];
				}
			}
		}
	}
	return null;
}

// menuOpenByFileName will NOT work if containers are loaded on demand
function menuOpenByFileName( theFilename )
{
	// Due to timing issues, the tree frame may not loaded when the context frame is.
	if ( !treeReady )
	{
		setTimeout("menuOpenByFileName('" + theFilename + "')", 500);
	}

	// Sanity check. Replace all spaces with the ^ characters
	theFilename = theFilename.replace(/ /gi,'^');

	// Find the object based on the file name.
	var theNode = TreeFindItemByFilename( theFilename );

	menuExpand ( theNode );
}

function menuOpenByPath( thePath )
{
	if ( !treeReady )
	{
		setTimeout("menuOpenByPath('" + thePath + "')", 50);
	}

	thePath = thePath.replace(/ /gi,'^');

	var objid;
	var parentid = "0";

	// break the full path into tokens
	var nodeList = thePath.split( ":" );

	for ( var j = 0; j < nodeList.length; j++ )
	{
		objid = nodeList[ j ];

		nodeFound = null;

		for ( var i = 0; i < gItems.length; i++ )
		{
			if ( objid == gItems[i].id && gItems[i].parentid == parentid )
			{
				nodeFound = gItems[i];
			}
		}

		if ( nodeFound != null )
		{
			nodeFound.expand = nodeFound.folder ? true : false;
		}
		else
		{
			return;
		}

		parentid = objid;
	}

	treeMenuDisplay();
	treeMenuItemClick( nodeList[nodeList.length-1], null, false );
}

function menuOpenByID( theID )
{
	if ( !treeReady )
	{
		setTimeout("menuOpenByID('" + theID + "')", 50);
	}

	theID = theID.replace(/ /gi,'^');

	// TOC will NOT work if containers are loaded on demand
	var theNode = TreeFindItem( theID );

	menuExpand ( theNode );
}

/*
function setItem( theItemID )
{
	if ( theItemID == -1 )
		selectedItem = null
	else
		selectedItem = TreeFindItem( theItemID )
}
*/

var treeMenuIndex = 0;

function TreeFindChildren( objid )
{
	var children = new Array();

	for (var i = 0; i < gItems.length; i++)
	{
		if ( objid == gItems[i].parentid )
		{
			children[ children.length ] = gItems[i];
		}
	}

	return children;
}

function addItems( theTreeMenuItem )
{
	if ( theTreeMenuItem.id == "" )
	{
		return;
	}

	if ( TreeFindItem( theTreeMenuItem.id )  )
	{
		// BAD. A Duplicate item found.
		return;
	}
/*  FOR FUTURE USE ...
	var theParent = TreeFindItem( theTreeMenuItem.parentid );
	if ( theParent )
	{
		if ( !theParent.folder )
		{
			theParent.folder = true;
		}
	}
*/
	gItems[gItems.length] = theTreeMenuItem;
}

function tmItem( parentid, objid, folder, text, url, target, dataurl, menuurl, icon, openedicon )
{
	if ( objid == "" )
	{
		this.id = objid;
		return;
	}

	var theID = objid.replace(/ /gi,'^');
	theID = objid.replace(/\'/gi,'^');
	this.id = theID;

	var theParentID = parentid.replace(/ /gi,'^');
	theParentID = parentid.replace(/\'/gi,'^');
	this.parentid = theParentID;

	if ( typeof( folder ) == "string" )
	{
		this.folder = folder == "1" ? true : false;
	}
	else
	{
		this.folder = folder;
	}

	if ( text == "" )
	{
		this.text = objid;
	}
	else
	{
		this.text = text;
	}

	this.url = (url) ? url : "";
	this.target = ( typeof(target) == "undefined" ) ? "" : target;
	this.menuurl = ( typeof(menuurl) == "undefined" ) ? "" : menuurl;
	if ( this.target == "" )
	{
		this.target = mainFrame;
	}

	if ( this.folder )
	{
		//this.dataurl = (dataurl) ? dataurl : "";
		this.dataurl = ( typeof(dataurl) == "undefined" ) ? "" : dataurl;

		if (true) //( displayIcons )
		{
			if ( typeof(icon) != "undefined" )
			{
				this.icon = icon;
				this.openedicon = (openedicon) ? openedicon : this.icon;
			}
			else
			{
				this.icon = FolderClosedGif;
				this.openedicon = FolderOpenedGif;
			}
		}

		this.dataReady = false;
		this.items = new Array();
	}
	else
	{
		if (true) //( displayIcons )
		{
			this.icon = (icon) ? icon : DocumentGif;
			this.openedicon = (openedicon) ? openedicon : this.icon;
		}
	}

	this.expand = false;

}

function treeMenuDisplay()
{
	var outputHTML = "";

	var tmDocument = window.frames[treeMenuFrame].document;

	treeMenuDepth = 0;
	treeMenuBars = new Array();

	//treeMenuSelectedFound = false;

 	outputHTML += '<table border=0 cellpadding=' + gSpacing + ' cellspacing=0 width="100%">';

 	outputHTML += treeMenuListItems( rootNode, false );
 	outputHTML += '</table>';

	var MenuTreeBody = tmDocument.getElementById( "treebody" );
	if ( MenuTreeBody )
	{
		MenuTreeBody.innerHTML = outputHTML;
	}
}

function treeMenuListItems( theNode, iamSelected )
{
	if ( theNode == null || !theNode.folder )
	{
		return;
	}

	var outputHTML = "";

	if ( iamSelected && !theNode.dataReady )
    {
		// reset the children list
        theNode.items = new Array();

		theNode.dataReady = true;

		if ( theNode.dataurl == "" )
		{
			// the children must be available inline
			for (var i = 0; i < gItems.length; i++)
			{
				if ( theNode.id == gItems[i].parentid )
				{
					theNode.items[ theNode.items.length ] = gItems[i];
				}
			}
		}
		else
		{
			return;
		}
    }

	for ( i = 0; i < theNode.items.length; i++ )
	{
		if ( i == theNode.items.length - 1 )
		{
			treeMenuLastItem = true;
		}
		else
		{
 			treeMenuLastItem = false;
 		}

		outputHTML += treeMenuDisplayItem( theNode.items[i] );
	}

	return outputHTML;
}

function mOver(obj, selected, isURL)
{
	if ( !isURL )
	{
		return;
	}

	if ( !selected )
	{
		obj.style.color = treeMenuHoverColor;
	}

	obj.style.textDecoration = "underline";
}

function mOut(obj, selected)
{
	if ( !selected )
	{
		obj.style.color = treeMenuFgColor;
	}
	obj.style.textDecoration = "none";
}

function treeMenuDisplayItem(item)
{
	var	bars;
	var	cmd;
	var	expanded;
	var	i;
	var	img;
	var	alt;
	var	more;
	var	outLine = "";

	var outputHTML = "";

	//if ( item.id == treeMenuSelectedID )
		//treeMenuSelectedFound = true;

	if ( item.expand )
	{
		expanded = true;
	}
	else
	{
		expanded = false;
	}

	cmd = "return parent.treeMenuClick('" + item.id + "');";

	if ( item.parentid == "0" )
	{
		// FIRST LEVEL
		outLine += '<TR>';
		outLine += '<TD STYLE="BACKGROUND-REPEAT: repeat-x" BACKGROUND="' + firstlevelBGGif + '" NOWRAP' + ' >';
	}
	else
	{
		outLine += '<TR><TD NOWRAP BACKGROUND="">';
	}

	bars = new Array();
	for (i = 0; i < treeMenuDepth; i++)
	{
		if ( treeMenuBars[i] )
		{
			outLine += '<img src="' + MenuBarGif + '" align=left border=0 vspace=0 hspace=0>';
			bars[i] = true;
		}
		else
		{
			outLine += '<img src="' + MenuSpacerGif + '" align=left border=0 vspace=0 hspace=0>';
			bars[i] = false;
		}
	}

	more = item.folder;

	if ( more )
	{
		outLine += '<a id="'+ item.id + 'x" href="#" onClick="' + cmd + '">';

		if ( expanded )
		{
			if ( treeMenuLastItem )
			{
				img = MenuCornerMinusGif;
				bars[bars.length] = false;
			}
			else
			{
				img = MenuTeeMinusGif;
				bars[bars.length] = true;
			}

			alt = ' alt="' + collapseImage + ' ' +  item.text + '" title="' + expandImage + ' ' + item.text + '"';
		}
 		else
		{
			if ( treeMenuLastItem )
			{
				img = MenuCornerPlusGif;
				bars[bars.length] = false;
			}
      		else
			{
				img = MenuTeePlusGif;
				bars[bars.length] = true;
			}

			alt = ' alt="' + expandImage + ' ' + item.text + '" title="' + expandImage + ' ' + item.text + '"';
		}

		outLine += '<img src="' + img + '"' + alt + ' align=left border=0 vspace=0 hspace=0>';
		outLine += '</a>';
	}
	else
	{
		if ( treeMenuLastItem )
		{
			img = MenuCornerGif;
			bars[bars.length] = false;
		}
		else
		{
			img = MenuTeeGif;
			bars[bars.length] = true;
		}

		outLine += '<img src="' + img + '" align=left border=0 vspace=0 hspace=0>';
	}

	if ( displayIcons )
	{
		if ( item.folder )
		{
			if ( expanded )
			{
				if ( treeMenuLastItem )
				{
					img = FolderOpenedGif2;
				}
					//img = item.openedicon
				else
				{
					img = item.openedicon;
				}
			}
			else
			{
	 			img = item.icon;
	 		}
		}
		else
		{
			img = item.icon;
		}

	 	if ( treeMenuAltText )
	 	{
	 		alt = ' alt="' + item.text + '" title="' + item.text + '"';
	 	}
		else
		{
			alt = '';
		}

		outLine += '<img src="' + img + '"' + alt + ' align=left border=0 vspace=0 hspace=0>&nbsp;';
	}

	var theStyle;

	if ( item.url != "" )
	{
		if ( item.id == treeMenuSelectedID )
		{
			theStyle = 'style="' +
					'background-color:' + treeMenuHiBg + ';' +
					'color:' + treeMenuHiFg + ';' +
					'FONT-FAMILY:' + treeMenuFont + ';' +
					'FONT-SIZE:' + treeMenuFontPoint + ';' +
					'padding:2;' +
					//'width:' + '100%' + ';' +
					'" ';
			outLine += '<a id="'+ item.id + '" class="" ONMOUSEOVER="parent.mOver(this,true,true)" ONMOUSEOUT="parent.mOut(this,true)" ' + theStyle + 'href="#" onclick="return parent.treeMenuItemClick( \'' + item.id + '\', event, true)"' + '>';
			//outLine += item.text + '</a><span ' + theStyle2 + '>&nbsp;</span>'
			outLine += item.text + '</a><a ' + theStyle + '>&nbsp;</a>';
		}
		else
		{
			theStyle = 'style="' +
					'FONT-FAMILY:' + treeMenuFont + ';' +
					'FONT-SIZE:' + treeMenuFontPoint + ';' +
					'padding:2;' +
					//'width:' + '100%' + ';' +
					'" ';
			outLine += '<a id="'+ item.id + '" class="" ONMOUSEOVER="parent.mOver(this,false,true)" ONMOUSEOUT="parent.mOut(this,false)" ' + theStyle + 'href="#" onclick="return parent.treeMenuItemClick( \'' + item.id + '\', event, true)"' + '>';
			outLine += item.text + '</a>';
		}
	}
	else
	{
		theStyle = 'style="' +
				'FONT-FAMILY:' + treeMenuFont + ';' +
				'FONT-SIZE:' + treeMenuFontPoint + ';' +
				'padding:2;' +
				//'width:' + '100%' + ';' +
				'" ';
		outLine += '<a id="'+ item.id + '" class=""  ONMOUSEOVER="parent.mOver(this,false,false)" ONMOUSEOUT="parent.mOut(this,false)" ' + theStyle + '>';
		outLine += item.text + '</a>';
	}

	outLine += '</TD></TR>';

	outputHTML += outLine;

	treeMenuBars = bars;

	if ( item.folder && expanded )
	{
		treeMenuDepth++;
		outputHTML += treeMenuListItems( item, item.id == treeMenuSelectedID );
		treeMenuDepth--;
	}

	return outputHTML;
}

function deSelectItem()
{
	var treeMenuDoc = window.frames[treeMenuFrame].document;

	var prevSelectedHREF = treeMenuDoc.getElementById( treeMenuSelectedID );

	if ( prevSelectedHREF != null )
	{
		// DESELECT THE CURRENT ITEM

		if ( prevSelectedHREF.parentid == "0" )
		{
			prevSelectedHREF.style.backgroundColor = treeMenuDoc.bgColor;
			prevSelectedHREF.style.color = treeMenuDoc.foregroundColor;
		}
		else
		{
			prevSelectedHREF.style.backgroundColor = treeMenuDoc.bgColor;
			prevSelectedHREF.style.color = treeMenuDoc.foregroundColor;
		}

		// reset the selected item id
		treeMenuSelectedID = "";
	}
}

function treeMenuItemClick( itemID, event, openUrl )
{
	var selectedItem = TreeFindItem( itemID );

	if ( selectedItem == null )
	{
		return;
	}

	if ( disableFirstLevelClick && selectedItem.parentid == "0" )
	{
		return;
	}

	if ( disableFolderClick && selectedItem.folder )
	{
		return;
	}

	// deselect the item, if any.
	deSelectItem();

	var treeMenuDoc = window.frames[treeMenuFrame].document;

	var selectedHREF = treeMenuDoc.getElementById( itemID );

	if ( selectedHREF != null )
	{
		// SELECT THE NEW ITEM
		treeMenuSelectedID = itemID;
	}

	// Expand the node regardless.
	if ( selectedItem.folder )
	{
		selectedItem.expand = true;
	}

	// force a redraw to repaint the original background image
	treeMenuDisplay();

	if ( openUrl && selectedItem.url != "" )
	{
		window.frames[selectedItem.target].location.href = selectedItem.url;
	}

	selectedHREF = treeMenuDoc.getElementById( treeMenuSelectedID );
	if ( selectedHREF != null )
	{
		// SELECT THE NEW ITEM
		selectedHREF.style.backgroundColor = treeMenuHiBg;
		selectedHREF.style.color = treeMenuHiFg;

		// Set the focus to the selected object
		selectedHREF.focus();
	}

}

function treeMenuClick( objid )
{
	var selectOnClick = false;	// enable tabbing

	var theItem = TreeFindItem( objid );

	if ( theItem == null )
	{
		return;
	}

	if ( theItem.folder )
	{
		theItem.expand = !theItem.expand;
	}

	var disabledSelection = ( disableFirstLevelClick && theItem.parentid == "0" ) ||
							( disableFolderClick && theItem.folder );

	if ( selectOnClick && !disabledSelection )
	{
		treeMenuSelectedID = objid;
	}

	if ( theItem.folder && !theItem.dataReady )
	{
		treeMenuListItems( theItem, true );
		treeMenuDisplay();
	}
	else
	{
		treeMenuDisplay();
	}

	// Set the focus to the selected "expand" object
	var treeMenuDoc = window.frames[treeMenuFrame].document;
	var theImgItem = treeMenuDoc.getElementById( objid + "x" );

	if ( theImgItem )
	{
		theImgItem.focus();
	}
}

function treeMenuClickRoot()
{
	treeMenuSelectedID = "";

	treeMenuDisplay();

	return false;
}

function displayMenu()
{
	var treeMenuDoc = window.frames[treeMenuFrame].document;

	treeMenuDoc.bgColor=treeMenuBgColor;
	treeMenuDoc.foregroundColor=treeMenuFgColor;

	rootNode = new tmItem( "-1", "0", true, "", "", "", "", "", RootGif, "" );

	rootNode.items = TreeFindChildren("0");
	rootNode.dataReady = true;

	treeMenuSelectedID = "";

	treeMenuDisplay();

	treeReady = true;
}

