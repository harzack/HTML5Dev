//
// 	File: webadmin/documentclass.js
//
//	Description: This is a support js file for the document class administration
//
//	

var DocumentClass = {
	init : function ( imgPrefix, urlPrefix, currentItemID )
	{
		this.imgPrefix = imgPrefix;
		this.urlPrefix = urlPrefix;
		this.inProgress = false;
		
		this.currentItemID = currentItemID;	// This is used for editing MIMEType aliases
		
		this.thinLine = "<tr class=\"horizontalCellDivider\"><td colspan=\"100\" class=\"browseRowDivider\"><img height=\"1\" width=\"1\" border=\"0\" src=\"/" + imgPrefix + "/px.gif\" alt=\"\"/></td></tr>"
		  
		this.row = '<tr id=\"item_#ID#\" class="browseRow#EVENODD#">' + 
		  '<td headers="#NAMEHEADER#"><a title="Edit #NAME#" href="' + urlPrefix + '#EDITURL#">#NAME#</a></td>' + 
		  '<td headers="actionsHeader"><a onclick="#DELETEONCLICK#" title="Delete #NAME#" class="remove-item-button" href="#"/></td>' +
		  '</tr>';
	},
	removeDocumentClass : function( id, name, facetExists )
	{
		var	docClassRow	= $( "#item_" + id );

		if ( facetExists )
		{
			alert( LocString( "This document class cannot be removed because it is a data source for a facet. You must remove this association before the document class can be removed.", documentClassStr ) );
		}
		else if ( confirm ( LocString( "Are you sure you want to remove the document class '%1'?", documentClassStr ).replace( "%1", name ) ) )
		{
			this._deleteItem( "func=admin.RemoveDocumentClass&id=" + id, docClassRow );
		}
	},
	addDocumentClass: function()
	{
		var nameInput = document.getElementById("docClassName");
		var addButton = document.getElementById("docClassAddButton");
		var listTable = "documentClassList";
		var listTableNameHeader = "classNameHeader";
		var editItemURL = "?func=admin.documentclassaliasdefinition&id=#ID#"
		var removeButtonOnClick = "DocumentClass.removeDocumentClass( #ID#, unescape( \'#ESCAPEDNAME#\' ) );"
		var AJAXData = {
			"func":		"admin.AddDocumentClass",
			"name":		null
		};
		var noNameXLate = LocString("Please provide a name for the document class", documentClassStr);
		var alreadyExistsXLate = LocString("Document class name '%1' already in use. Please select another name or delete the existing class name", documentClassStr);
		
		this._addItem(nameInput, addButton, listTable, listTableNameHeader, editItemURL, removeButtonOnClick, AJAXData, noNameXLate, alreadyExistsXLate);
	},
	removeMIMETypeAlias : function( id, name )
	{
		var	aliasRow	= $( "#item_" + id );


		if ( confirm ( LocString( "Are you sure you want to remove MIMEType alias '%1'?", documentClassStr ).replace( "%1", name ) ) )
		{
			this._deleteItem( "func=admin.RemoveMIMETypeAlias&id=" + id, aliasRow );
		}
	},
	addMIMETypeAlias: function()
	{
		var nameInput = document.getElementById("aliasName");
		var addButton = document.getElementById("aliasAddButton");
		var listTable = "aliasList";
		var listTableNameHeader = "aliasNameHeader";
		var editItemURL = "?func=admin.configuremimetypealias&id=#ID#&docAliasId=" + this.currentItemID;
		var removeButtonOnClick = "DocumentClass.removeMIMETypeAlias( #ID#, unescape( \'#ESCAPEDNAME#\' ) );"
		var AJAXData = {
			"func":		"admin.AddMIMETypeAlias",
			"name":		null,
			"id":		this.currentItemID
		};
		var noNameXLate = LocString("Please provide a name for the MIMEType alias", documentClassStr);
		var alreadyExistsXLate = LocString("MIMEType alias name '%1' already in use. Please select another name or delete the existing alias name", documentClassStr);
		
		this._addItem(nameInput, addButton, listTable, listTableNameHeader, editItemURL, removeButtonOnClick, AJAXData, noNameXLate, alreadyExistsXLate);
	},
	
	
	/**
	 *	Internal function used to add Document Classes and MIMEType Aliases.
	 *    nameInput - The DOM Element represesenting the Textbox with the name of the new item
	 *    addButton - The DOM Element representing the button used to add the item.
	 *    listTable - The ID of the table used to list the existing items.
	 *    listTableNameHeader - The ID of the TH tag representing the column of listTable that contains the item names
	 *    editItemURL - A string representing the GET data used to get to the edit item page.  This string MUST start
	 *					with a "?" character and may include #ID#, #NAME#, or #ESCAPEDNAME# substrings which will be 
	 *					replaced with the ID of the selected item, the name of the selected item, and the URL-escaped
	 *					name of the selected item, respectively.
	 *    removeButtonOnCLick - A string with any code to be executed when the delete button for the added item is clicked.
	 *							This string may include the same replacement substrings as editItemURL.
	 *    AJAXData - A Javascript object representing the POST data to be sent with the Add Item request.
	 *				 This object may have a member "name" which, if null (NOT undefined), will be replaced with the name of the object
	 *               to be added.
	 *    noNameXLate - The already-localized string to be displayed if no name was entered.
	 *    alreadyExistsXLate - The already-localized string to be displayed if the item already exists.  The substring "%1",
	 *						   if present, will be replaced with the name of the item being added.
	 */
	_addItem: function(nameInput, addButton, listTable, listTableNameHeader, editItemURL, removeButtonOnClick, AJAXData, noNameXLate, alreadyExistsXLate)
	{
		// First do a client-side check that name is unique.
		var name = $.trim(nameInput.value);
		nameInput.value = name;
		var allNamesLower = new Array();
		var nameLower = name.toLowerCase();
		var nameCells = $("#" + listTable + " .browseRow1 td[headers='" + listTableNameHeader + "'], #" + listTable + " .browseRow2 td[headers='" + listTableNameHeader + "']");
		var found = false;
		
		// Is there an add in progress?
		if (this.inProgress == true)
			return
		
		if (name == "")
		{
			alert(noNameXLate);
			return;
		}
		
		for (i = 0; i < nameCells.length; i++)
		{
			allNamesLower[i] = $(nameCells[i]).text().toLowerCase();
			if (allNamesLower[i] == nameLower)
			{
				found = true;
				break;
			}
		}
		
		if (found)
		{
			alert(alreadyExistsXLate.replace( "%1", name ));
			return
		}
		
		if (AJAXData["name"] === null)
			AJAXData["name"] = name;
		
		$.ajax({
				type: "POST",
				cache: false,
				data: AJAXData,
				dataType: "json",
				success: function( checkVal )
				{
					if ( checkVal.OK )
					{
						var nameCells = $("#" + listTable + " .browseRow1 td[headers='" + listTableNameHeader + "'], #" + listTable + " .browseRow2 td[headers='" + listTableNameHeader + "']");
						var allNamesLower = new Array();
						var newLineCreated = false;
						
						for (i = 0; i < nameCells.length; i++)
						{
							allNamesLower[i] = $(nameCells[i]).text().toLowerCase();
						}
						allNamesLower[allNamesLower.length] = nameLower;
						allNamesLower.sort();
						
						var HTMLName = name.EscapeHTML();
						
						var markup = DocumentClass.row.replace( /#NAMEHEADER#/g, listTableNameHeader).
										replace( /#EDITURL#/g, editItemURL).
										replace( /#DELETEONCLICK#/g, removeButtonOnClick).
										replace( /#ID#/g, checkVal.id ).
										replace( /#NAME#/g, HTMLName ).
										replace( /#ESCAPEDNAME#/g, escape( name ) );
						
						// Names were sorted before we added this one, so
						// we only need to check where to insert it, and don't
						// have to worry about re-sorting the entire table.
						for (i = 0; i < allNamesLower.length; i++)
						{
							// Re-pinstripe as we go down:
							if (newLineCreated)
							{
								var cell = $(nameCells[i - 1]).parent();
								if (cell.hasClass("browseRow1"))
									cell.removeClass("browseRow1").addClass("browseRow2");
								else
									cell.removeClass("browseRow2").addClass("browseRow1");
							}
							
							// Then allNames is accurate for all indexes < i,
							// and for all indexes >= i, it's off by one.
							if (allNamesLower[i] == nameLower)
							{
								markup = markup.replace( /#EVENODD#/g, ( ( i + 1 ) % 2) ? "1" : "2" );
								if (i == allNamesLower.length - 1)
								{
									$(DocumentClass.thinLine + markup).appendTo("#" + listTable);
								}
								else
								{
									$(markup + DocumentClass.thinLine ).insertBefore($(nameCells[i]).parent());
								}
								newLineCreated = true;
							}
						}
					}
					else
					{
						alert( checkVal.errMsg );
					}
					nameInput.disabled = "";
					nameInput.value =  "";
					addButton.disabled = "";
					DocumentClass.inProgress = false;
				},
				error: function ( xhr, textStatus, errorThrown )
				{
					alert( errorThrown );
					nameInput.disabled = "";
					nameInput.value =  "";
					addButton.disabled = "";
					DocumentClass.inProgress = false;
				}
			});
			
		this.inProgress = true;
		nameInput.disabled = "disabled";
		addButton.disabled = "disabled";
	},
	/**
	 *	Internal function used to remove Document Classes and MIMEType Aliases.
	 *   data - A Javascript object or string representing the POST data to be sent with the Remove Item request.
	 *   jQueryRowToDelete - a jQuery object representing the row that will be deleted from the DOM if the
	 *						 Remove Item call is successful.
	 */
	_deleteItem : function( data, jQueryRowToDelete)
	{
		$.ajax({
				type: "POST",
				cache: false,
				data: data,
				dataType: "json",
				success: function( checkVal )
				{
					if ( checkVal.OK )
					{
						// Remove the item

						if ( jQueryRowToDelete.next().hasClass( 'horizontalCellDivider' ) )
						{
							jQueryRowToDelete.next().remove();
						}
						else
						{
							jQueryRowToDelete.prev().remove();
						}

						jQueryRowToDelete.remove();
					}
					else
					{
						alert( checkVal.ErrMsg );
					}
				},
				error: function ( xhr, textStatus, errorThrown )
				{
					alert( errorThrown );
				}
			});
	}
};
