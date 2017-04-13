//
// 	File: collections/colbrowseview.js
//
//	Description: This is a support js file for the collections browse pages.  The related browse page is collections/colbrowseview.html.
//
//

	var bv_filterClause;
	var numSelectedItems = 0;
	
	//
	// This onready function prepares the notification
	// header and footer in the collection browse view
	// which informs the user as to how many items in the collection
	// have been selected for action. 
	//
	$( document ).ready( function () {
	
		$('span[name="totalAvailable"]').text(totalCount);
		
		// Add callback to filter search 
		function numSelectedCallback(){
			// Reset UI display
			numSelectedItems = 0;
			$('span[name="numSelected"]').text(numSelectedItems);
			$('span[name="totalAvailable"]').text(totalCount);
			$('span[name="ofAboutSpan"]').show();
			$('span[name="entireCollectionFilteredSpan"]').hide();
			$('span[name="entireCollectionSpan"]').hide();
			ToggleActionsForEntireCollection( false );
			
			//[Re]add listeners after browse is [re]rendered.
			addCheckBoxListeners();
		}
		addFolderContentsCallback(numSelectedCallback);
		
		addCheckBoxListeners();
		

	});
	
	function addCheckBoxListeners()
	{
	
		// Add listener to multi-select checkbox
		$('input:checkbox[name="top_checkbox"]').change(
		    function(){
			if ($(this).is(':checked')) {
				numSelectedItems=$('input:checkbox[name="nodeID"]').length;
			} else {
				numSelectedItems=0;
			}
			$('span[name="numSelected"]').text(numSelectedItems);

		});

		// Add listener to single select checkboxes
		$('input:checkbox[name="nodeID"]').change(
		    function(){
			if ($(this).is(':checked')) {
				numSelectedItems++;
			} else {
				numSelectedItems--;
			}
			$('span[name="numSelected"]').text(numSelectedItems);
		});

		// Add listener to entire collection checkboxes
		$('input:checkbox[name="SelectAllTop"]').change(
		    function(){
			if ($(this).is(':checked')) {
				numSelectedItems=totalCount;
				$('span[name="ofAboutSpan"]').hide();
				if ( ( undefined !== bv_filterClause ) && ( 0 < bv_filterClause.length ) ) {
					$('span[name="entireCollectionFilteredSpan"]').show();
				} else {
					$('span[name="entireCollectionSpan"]').show();
				}
			} else {
				numSelectedItems=0;
				$('span[name="ofAboutSpan"]').show();
				if ( ( undefined !== bv_filterClause ) && ( 0 < bv_filterClause.length ) ) {
					$('span[name="entireCollectionFilteredSpan"]').hide();
				} else {
					$('span[name="entireCollectionSpan"]').hide();
				}
			}
			$('span[name="numSelected"]').text(numSelectedItems);
		});

		$('input:checkbox[name="SelectAllBtm"]').change(
		    function(){
			if ($(this).is(':checked')) {
				numSelectedItems=totalCount;
				$('span[name="ofAboutSpan"]').hide();
				if ( ( undefined !== bv_filterClause ) && ( 0 < bv_filterClause.length ) ) {
					$('span[name="entireCollectionFilteredSpan"]').show();
				} else {
					$('span[name="entireCollectionSpan"]').show();
				}
			} else {
				numSelectedItems=0;
				$('span[name="ofAboutSpan"]').show();
				if ( ( undefined !== bv_filterClause ) && ( 0 < bv_filterClause.length ) ) {
					$('span[name="entireCollectionFilteredSpan"]').hide();
				} else {
					$('span[name="entireCollectionSpan"]').hide();
				}
			}
			$('span[name="numSelected"]').text(numSelectedItems);
		});
	
	}

	function setFilterClause( filterClause )
	{
		bv_filterClause = filterClause;
	}
	
	function changeFilterClause( filterClause )
	{
		if ( filterClause === undefined  )
		{
			filterClause = "";
		}

		// Uncheck the Entire Collection checkboxes if filtering has changed.
		// All item checkboxes should have been created unchecked,
		// so they don't need to be unchecked here

		if ( filterClause !== bv_filterClause )
		{
			var chkBox;
			
			chkBox = document.getElementById( 'SelectAllTop' );
			if ( chkBox !== null )
			{
				chkBox.checked = false;
			}

			chkBox = document.getElementById( 'SelectAllBtm');
			if ( chkBox !== null )
			{
				chkBox.checked = false;
			}
		}
		
		bv_filterClause = filterClause;
	}

	function collectSelects( thisForm )
	{
		thisForm.objects.value = ""
		
		var howManySelects = 0
		var chkValues = new Array()
		var j
		var skip
		var objList = ""

		var elem = document.BrowseViewFrm.elements

		for ( var i = 0; i < elem.length; i++ )
		{
			if ( ( elem[i].name != 'top_checkbox' ) && ( elem[i].type == 'checkbox' ) && ( elem[i].checked ) && ( ! elem[i].disabled ) )
			{
				skip = false
				for (var j = 0; j < howManySelects; j++)
				{
					if ( chkValues[j] == elem[i].value )
					{
						skip = true
						continue
					}
				}

				if ( !skip )
				{
					//nodes_list keeps track of selected items in order to send them to the form
					//in sendToDocument function
					nodes_list[howManySelects] = elem[i]
					objList += elem[i].value + '|'
					chkValues[howManySelects] = elem[i].value
					howManySelects = howManySelects + 1
				}
			}
		}

		// Chop off the trailing |
		thisForm.objects.value = objList.slice( 0, -1 )
		
		return howManySelects
	}

	function excludeSingleItem( theActionString, dataId )
	{
		if ( dataId != -1 )
		{			
			var itemSubtype = -1
			
			for ( var i = 0; i < myRows.length; i++ )
			{
			
				if ( myRows[i].dataId == dataId)
				{
					itemSubtype = myRows[i].type
				}
			}
			
			// Does an entry exist for this action and subtype?
			if ( itemSubtype > 0 && excludedActionSubtypes[ theActionString + itemSubtype ] != null )
			{
				alert( excludedActionMsgs[ theActionString ] )
				return true
			}
		}

		return false
	}

	function doActionSubmit( thisForm )
	{
		stringToSplit = thisForm.CommandSelect1.options[ thisForm.CommandSelect1.selectedIndex ].value

		// Reset the select menus
		doCommandSelectChange( 0 )
		doUserConfirm(stringToSplit, thisForm);

	}

	function doButtonSubmit( thisForm, buttonValue )
	{
		stringToSplit = buttonValue
		doUserConfirm(stringToSplit, thisForm);
	}

	// Confirms with the user that the cmd will modify the selected objects and their
	// related metadata
	function doUserConfirm( cmd, thisForm ) {

		var cmdList 	= ['Move','Copy','Delete','CategorizeCollection','ClassifyCollections','RemoveClassification'];
		
		if ( cmdList.indexOf(cmd)>-1 && document.cookie.indexOf("LLCollectionCookie") < 0 ) {
			
			// Set expiration to 20 years
			var date = new Date(); 
			date.setTime(date.getTime()+(20*365*24*60*60*1000));
			
			// Build modal dialog
			var dialogDiv = $( '<div id="userConfirmDiv" class="collectionModalDiv"><img src="' + supportPath + 'required_big.gif" height="16" width="16"/>&nbsp;' + modifyConfirmationMsg + '<p/><input id="doNotShow" style="vertical-align:top;" type="checkbox" value="doNotShow"/><label for="doNotShow">' + doNotShowMsg + '</label></div>' );
			
			// Specify buttons first to use I18n strings in variables
			var divButtons = {};
			divButtons[okString] = function(){	
								if( $('#doNotShow').get(0).checked ) 
								{
									document.cookie = 'LLCollectionCookie=1;expires=' + date.toGMTString();
								}
								doActualSubmit( thisForm );
								$( this ).dialog('destroy').remove();
							};
			divButtons[cancelString] = function(){
								if( $('#doNotShow').get(0).checked ) 
								{
									document.cookie = 'LLCollectionCookie=1;expires=' + date.toGMTString();
								}
								$( this ).dialog('destroy').remove(); 
							};

			dialogDiv.dialog({
				close: function ()
				{
					$( this ).dialog('destroy').remove();
				},
				modal: true,
				resizable: false,
				buttons: divButtons
			});

			dialogDiv.dialog('open');

		} else {
			doActualSubmit( thisForm );
		}	
	}	
	
	function sendFormToDocument( f, windowDoc, multi, nextURL )
	{
		windowDoc.open()
		windowDoc.write( '<FORM NAME="' + f.name + '"' )
		windowDoc.write( ' ACTION="' + f.action + '"' )
		windowDoc.write( ' METHOD="' + f.method + '">' )
		windowDoc.write( '</FORM>' )
		windowDoc.close()

		var form = windowDoc.BrowseViewFrm

		var actionFunc = multi.split("=")

		var input = windowDoc.createElement( 'INPUT' )
		input.setAttribute( "type", "HIDDEN" )
		input.setAttribute( "name", "func" )
		input.setAttribute( "value", actionFunc[1] )
		form.appendChild( input )

		input = windowDoc.createElement( 'INPUT' )
		input.setAttribute( "type", "HIDDEN" )
		input.setAttribute( "name", "nextUrl" )
		input.setAttribute( "value", nextURL )
		form.appendChild( input )

		// Loops through the nodes_list array containing a collection of selected items
		for ( var i = 0; i < nodes_list.length; i++ )
		{
			input = windowDoc.createElement( 'INPUT' )
			input.setAttribute( "type", "HIDDEN" )
			input.setAttribute( "name", "nodeID" )
			input.setAttribute( "value", nodes_list[i].value )
			form.appendChild( input )
		}
	}

	function sendFormToDocumentContainer( thisForm, windowDoc, func, action )
	{
		windowDoc.open()
		windowDoc.write( '<FORM NAME="' + thisForm.name + '"' )
		windowDoc.write( ' ACTION="' + thisForm.action + '"' )
		windowDoc.write( ' METHOD="' + thisForm.method + '">' )
		windowDoc.write( '</FORM>' )
		windowDoc.close()

		var form = windowDoc.BrowseViewFrm

		input = windowDoc.createElement( 'INPUT' )
		input.setAttribute( "type", "HIDDEN" )
		input.setAttribute( "name", "func" )
		input.setAttribute( "value", func )
		form.appendChild( input )

		input = windowDoc.createElement( 'INPUT' )
		input.setAttribute( "type", "HIDDEN" )
		input.setAttribute( "name", "objid" )
		input.setAttribute( "value", bv_dataID )
		form.appendChild( input )

		input = windowDoc.createElement( 'INPUT' )
		input.setAttribute( "type", "HIDDEN" )
		input.setAttribute( "name", "actioncmd" )
		input.setAttribute( "value", action )
		form.appendChild( input )

		input = windowDoc.createElement( 'INPUT' )
		input.setAttribute( "type", "HIDDEN" )
		input.setAttribute( "name", "objects" )
		input.setAttribute( "value", thisForm.objects.value )
		form.appendChild( input )

		input = windowDoc.createElement( 'INPUT' )
		input.setAttribute( "type", "HIDDEN" )
		input.setAttribute( "name", "commandargs" )
		input.setAttribute( "value", stringToSplit )
		form.appendChild( input )
	}

	function doCommandSelectChange( which )
	{
		var frm = document.BrowseViewFrm;

		if ( which == 1 )
		{
		    frm.CommandSelect2.selectedIndex = frm.CommandSelect1.selectedIndex
		}
		else if ( which == 2 )
		{
		    frm.CommandSelect1.selectedIndex = frm.CommandSelect2.selectedIndex
		}
		else
		{
		    frm.CommandSelect1.selectedIndex = 0
		    frm.CommandSelect2.selectedIndex = 0
		}
	}

	function DoSelectAll( whichCheckBox )
	{
		var frm = document.BrowseViewFrm;
		var chkBox = document.getElementById( whichCheckBox )
		var enabledFlag = false

		if ( chkBox.checked ) {
			enabledFlag = true
		}

		chkBox = document.getElementById( 'SelectAllTop' )
		chkBox.checked = enabledFlag

		chkBox = document.getElementById( 'SelectAllBtm' )
		chkBox.checked = enabledFlag

		for (var i=0;i<frm.elements.length;i++)
		{
			var e = frm.elements[i]
			if ( e.type=='checkbox' && e.value != '-1' )
			{
				e.disabled = enabledFlag
				e.checked = enabledFlag
			}
		}
		
		ToggleActionsForEntireCollection( enabledFlag );
	}
	
	// Modifies the UI buttons and action dropdown to disable actions that are not availabe
	// for the entire collection
	function ToggleActionsForEntireCollection( enabledFlag )
	{
		var cmd;
		if ( enabledFlag ) 
		{
			// Disable buttons and dropdown
			for (i=0;i<unsupportedEntireCollectionActionIds.length;i++) 
			{
				cmd = unsupportedEntireCollectionActionIds[i];
				$("[name="+ cmd +"]").attr('disabled','disabled');
				$("input[name="+ cmd +"]").addClass('disableMultiButtons');
			}
			
		} else {
			// Enable buttons and dropdown
			for (i=0;i<unsupportedEntireCollectionActionIds.length;i++) 
			{
				cmd = unsupportedEntireCollectionActionIds[i];
				$("[name="+ cmd +"]").removeAttr('disabled');
				$("input[name="+ cmd +"]").removeClass('disableMultiButtons');
			}
		}

	}
	
	
	

	// Modify the BrowseViewFrm form on the fly and submit
	// Only POST form submissions are allowed to alter nodes
	function AcknowledgeError( )
	{
		var form = document.BrowseViewFrm

		var input = form.func
		input.setAttribute( "value", "ll" )

		input = form.objAction
		input.setAttribute( "value", "AcknowledgeBrowseError" )

		form.submit()
	}

	// Called after the completion operations that modify the source collection - see COLLECTIONS:Root:CollectionsCmd:MoveToCollection, RemoveFromCollection
	function ReloadPage( )
	{
		openURL( document.BrowseViewFrm.nextUrl.value, '' );
	}

	function hideSelectAll()
	{
		var theSelectAllTopCell = document.getElementById('SelectAllTopCollectionCell');
		var theSelectAllBtmCell = document.getElementById('SelectAllBtmCollectionCell');
		var chkBoxTop = document.getElementById( 'SelectAllTop' );
		var chkBoxBtm;
	
		if ( totalPages > 1 )
		{
			var theSelectAllTopLabelFiltered = document.getElementById( 'SelectAllTopLabelFiltered' );
			var theSelectAllBtmLabelFiltered = document.getElementById( 'SelectAllBtmLabelFiltered' );
			var theSelectAllTopLabel = document.getElementById( 'SelectAllTopLabel' );
			var theSelectAllBtmLabel = document.getElementById( 'SelectAllBtmLabel' );
			
			// Show the Entire Collection checkboxes

			theSelectAllTopCell.style.display = '';
			theSelectAllBtmCell.style.display = '';

			if ( ( bv_filterClause !== undefined ) && ( bv_filterClause.length > 0 ) )
			{
				// Show filtered collection label
				
				theSelectAllTopLabelFiltered.style.display = '';
				theSelectAllBtmLabelFiltered.style.display = '';
				theSelectAllTopLabel.style.display = 'none';
				theSelectAllBtmLabel.style.display = 'none';
			}
			else
			{
				theSelectAllTopLabelFiltered.style.display = 'none';
				theSelectAllBtmLabelFiltered.style.display = 'none';
				theSelectAllTopLabel.style.display = '';
				theSelectAllBtmLabel.style.display = '';
			}
			
			// disable and check all item checkboxes
			if ( chkBoxTop.checked )
			{
				DoSelectAll( 'SelectAllTop' );
			}
		}
		else
		{
			// Hide and uncheck the Entire Collection checkboxes

			theSelectAllTopCell.style.display = 'none';
			theSelectAllBtmCell.style.display = 'none';
			
			chkBoxTop.checked = false;
			chkBoxBtm = document.getElementById( 'SelectAllBtm' );
			chkBoxBtm.checked = false;
		}
	}
	
	// This gets registered as a callback for the AJAX loading of the collection
	// through the browse.js code
	// The filters are only updated when the contents are reloaded, therefore
	// local changes to the name filter that do not trigger a reload of
	// content do not affect the value passed to make disk image or Add Categories
	function AJAXCallback()
	{
		var filterClause = '';
		var srchFld = $( "#srch_fld" );
				
		if ( null != self.changeFilterClause )
		{
			if ( objFilter !== undefined && objFilter.length > 0 )
			{
				filterClause += "&objFilter=" + objFilter;
			}
			
			if ( srchFld !== undefined && srchFld.css( "font-style" ) != "italic" && srchFld.val().length > 0 )
			{
				filterClause += "&nameFilter=" + srchFld.val();
			}
			
			changeFilterClause( filterClause );
		}
		if ( null != self.hideSelectAll )
		{
			hideSelectAll();
		}	
	}
	
	$(document).ready( function() {
	
		addFolderContentsCallback( AJAXCallback );
	});
