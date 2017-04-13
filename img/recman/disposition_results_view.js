var bDoDDoubleDeleteConfirm = false
var bFieldAdded = false

// START column definition for Calculated Date

var calculatedDate = new BrowseViewColumn( "calculatedDate" );

calculatedDate.SetHeaderParams( LocString( "Calculated Date" ), "browseListHeaderCenterText" );
calculatedDate.SetCellParams( "browseListHeaderCenterText" );
calculatedDate.SetSort( true );
calculatedDate.SetColName( "CALCULATEDDATE" );
calculatedDate.SetNowrap( false );
calculatedDate.SetCellWidth( "1%" );
calculatedDate.identifier = "calculatedDate";

calculatedDate.getCellValue = function ( obj, rowNo )
{
	return obj.calculatedDate
};
// END column definition for Calculated Date


// START column definition for Review Decision
var reviewDecision = new BrowseViewColumn( "reviewDecision" );

reviewDecision.SetHeaderParams( LocString( "Review Decision" ), "browseListHeaderCenterText" );
reviewDecision.SetCellParams( "browseListHeaderCenterText" );
reviewDecision.SetSort( true );
reviewDecision.SetColName( "reviewDecision" );
reviewDecision.SetNowrap( true );
reviewDecision.SetCellWidth( "1%" );
reviewDecision.SetCellClassName( "browseItemTypeLeft" );
reviewDecision.identifier = "reviewDecision";

reviewDecision.getCellValue = function ( obj, rowNo )
{
	return obj.reviewDecision
};

reviewDecision.getCellValue = function ( obj, rowNo )
{
	var parentID = nm_parentid;
	var decisionStr = ""
	var decisionTxt = ""
	var decisionCls = ""
	var objName = escape( obj.name )

	if ( obj.reviewDecision == "0" )
	{
		decisionTxt = LocString( "Pending" )
	}
	else if ( obj.reviewDecision == "1" )
	{
		decisionTxt = LocString( "Approved" )
		decisionCls = "approvedTxt"
	}
	else if ( obj.reviewDecision == "2" )
	{
		decisionTxt = LocString( "Rejected" )
		decisionCls = "rejectedTxt"
	}
	else if ( obj.reviewDecision == "3" )
		{
			decisionTxt = LocString( "Previously Rejected" )
			decisionCls = "rejectedTxt"
	}
	if ( bHyperlinkReviewDecision && obj.ActionPerformed !== "1"  )
	{
		decisionStr = "<INPUT TYPE='HIDDEN' ID='"
		decisionStr += obj.dataId + "_" + obj.StageCount
		decisionStr += "_reviewDecisionValue' VALUE='"
		decisionStr += obj.reviewDecision
		decisionStr += "'>"

		decisionStr += "<A ID='"
		decisionStr += obj.dataId + "_" + obj.StageCount
		decisionStr += "_reviewDecision"
		decisionStr += "' CLASS='"
		decisionStr += decisionCls
		decisionStr += "' TITLE='"
		decisionStr += LocString( "Click to change review decision" )
		decisionStr +="' HREF='#' ONCLICK='javascript:popupReviewDecision( "
		decisionStr += '"'
		decisionStr += obj.dataId + "_" + obj.StageCount
		decisionStr += '"'
		decisionStr += ", true"
		decisionStr += ', "' + objName + '"'
		decisionStr += " ); return false'>"
		decisionStr += decisionTxt
		decisionStr += "</A>";
	}
	else
	{
		decisionStr = "<SPAN ID='"
		decisionStr += obj.dataId + "_" + obj.StageCount
		decisionStr += "_reviewDecision' CLASS='"
		decisionStr += decisionCls
		decisionStr += "'>"
		decisionStr += decisionTxt
		decisionStr += "</SPAN>";
	}

	decisionStr += "&nbsp;"

	decisionStr += "<A ID='"
	decisionStr += obj.dataId + "_" + obj.StageCount
	decisionStr += "_reviewIcon'"

	if ( obj.ReviewComments == "false" )
	{
		decisionStr += " STYLE='display:none'"
	}

	decisionStr += " HREF='#' ONCLICK='javascript:displayComments("
	decisionStr += '"'
	decisionStr += obj.dataId + "_" + obj.StageCount
	decisionStr += '"'
	decisionStr += "); return false'>"

	decisionStr += "<IMG SRC='"+ imgSrc + "webwork/16_comments.gif' title='"
	decisionStr += LocString( "Comments" )
	decisionStr += "' STYLE='border:none"

	decisionStr += "'>"
	decisionStr += "</A>"

	return decisionStr
};
// END column definition for Review Decision


// START column definition for Disposition Custom Actions
var dispActions = new BrowseViewColumn( "dispActions" );

dispActions.SetHeaderParams( LocString( "Action" ), "browseListHeaderCenterText" );
dispActions.SetCellParams( "browseListHeaderCenterText" );
dispActions.SetSort( false );
dispActions.SetColName( "dispActions" );
dispActions.SetNowrap( true );
dispActions.SetCellWidth( "1%" );
dispActions.SetCellClassName( "browseItemTypeLeft" );
dispActions.identifier = "dispActions";


dispActions.getCellValue = function ( obj, rowNo )
{
	var parentID = nm_parentid;
	var actionStr = "";
	var actionTxt = "";
	var statusCode = obj.DefaultActionInfo
	var numVersToKeep = obj.NumVersToKeep
	var purgeSuperseded = obj.PurgeSuperseded
	var	objName = escape( obj.name )

	actionTxt = allActions[ obj.DispAction ]

	if ( obj.DispAction != "15" )
	{
		if ( undefined !== statusCode && statusCode != "" )	
		{
			actionTxt += ": " + statusCode
		}
	}
	else
	{
		if ( undefined !== numVersToKeep && numVersToKeep != "" )
		{
			actionTxt += ": " + LocString("Keep") + " " + numVersToKeep
		}

		if ( undefined !== purgeSuperseded && purgeSuperseded != "" )
		{
			actionTxt += ": " + LocString("Superseded")
		}
	}

	if ( ( obj.ActionPerformed !== "1" && obj.DispAction != "15" ) && bHyperlinkChangeAction )
	{
		actionStr = "<A ID='"
		actionStr += obj.dataId + "_" + obj.StageCount
		actionStr += "_changeAction"
		actionStr += "' TITLE='"
		actionStr += LocString( "Click to change action" )
		actionStr +="' HREF='#' ONCLICK='javascript:popupDispositionActionsWindow( "
		actionStr += '"'
		actionStr += obj.dataId + "_" + obj.StageCount
		actionStr += '"'
		actionStr += ", true"
		actionStr += ', "' + objName + '"'
		actionStr += " ); return false'>"
		actionStr += actionTxt
		actionStr += "</A>";
	}
	else
	{
		actionStr += actionTxt
	}

	// Write out the icon for the Make Rendition option, but hide it if it should not be displayed.	
	actionStr += "<SPAN ID='"
	actionStr += obj.dataId + "_" + obj.StageCount
	actionStr += "_makeRenditionDisplay'" 

	if ( obj.MakeRendition !== "1" )
	{
		actionStr += " STYLE='display:none'"
	}

	actionStr += ">&nbsp;"

	actionStr += "<IMG SRC='"+ imgSrc + "recman/make_rendition.gif' title='"
	actionStr += LocString( "Make Rendition" )
	actionStr += "'></IMG>"

	actionStr += "</SPAN>"

	actionStr += "<INPUT TYPE='HIDDEN' ID='"
	actionStr += obj.dataId + "_" + obj.StageCount
	actionStr += "_action' VALUE='"
	actionStr += obj.DispAction
	actionStr += "'>"
	
	actionStr += "<INPUT TYPE='HIDDEN' ID='"
	actionStr += obj.dataId + "_" + obj.StageCount
	actionStr += "_status' VALUE='"

	if ( undefined !== statusCode && statusCode != "" )	
	{
		actionStr += statusCode
	}

	actionStr += "'>"

	actionStr += "<INPUT TYPE='HIDDEN' ID='"
	actionStr += obj.dataId + "_" + obj.StageCount
	actionStr += "_makeRendition' VALUE='"
	
	if ( obj.MakeRendition === "1" )
	{
		actionStr += "1"
	}
	else
	{
		actionStr += "0"
	}

	actionStr += "'>"

	actionStr += "<INPUT TYPE='HIDDEN' NAME='idStageCount' ID='"
	actionStr += obj.dataId + "_" + obj.StageCount
	actionStr += "_idStageCount' VALUE='"
	actionStr += obj.dataId + "_" + obj.StageCount
	actionStr += "'>"
	
	if ( !bFieldAdded )
	{
		actionStr += "<INPUT TYPE='HIDDEN' NAME='moveQDate' ID='moveQDate' "
		actionStr += "VALUE='" + window.document.getElementById('rm_qDate').value
		actionStr += "'>"
		actionStr += "<INPUT TYPE='HIDDEN' NAME='moveDispNodeID' ID='moveDispNodeID' "
		actionStr += "VALUE='" + window.document.getElementById('rm_DispNodeID').value
		actionStr += "'>"
		bFieldAdded = true
	}
	
	
	return actionStr
};
// END column definition for Disposition Custom Actions


// START column definition for Location
var objLocation = new BrowseViewColumn( "objLocation" );

objLocation.SetHeaderParams( LocString( "Location" ), "browseListHeaderLocation" );
objLocation.SetCellParams( "browseListHeaderName" );
objLocation.SetSort( true );
objLocation.SetColName( "OBJLOCATION" );
objLocation.SetNowrap( true );
objLocation.SetCellWidth( "1%" );
objLocation.identifier = "objLocation";

objLocation.getCellValue = function ( obj, rowNo )
{
	return obj.objLocation
};
// END column definition for Location


// START override for additional disposition columns
setBrowseColumnDefinition = function setBrowseColumnDefinition( browseColumnDefinitionList )
{
	var localBrowseColumnDefinitionList;
	var	columns;

	try
	{
		browseColumnDefinitionList = browseColumnDefinitionList;
		localBrowseColumnDefinitionList = eval( browseColumnDefinitionList );

		if ( localBrowseColumnDefinitionList.ok === true )
		{

			if ( undefined === columnDefinitionArray )
			{
				columns = localBrowseColumnDefinitionList.columns;

				columnDefinitionArray = [];

				for ( i = 0; i < columns.length; i++ )
				{
					if ( columns[i].isDefault )
					{
						// Double check that this default column actually exists.  If not, then ignore it.
						if ( eval( "typeof(" + columns[i].columnID  + ") != 'undefined'" ) )
						{
							eval( "columnDefinitionArray[i] = new " + columns[i].columnID + "();" );
							if ( columns[i].columnID == "checkboxColumn" )
							{
								browseCheckboxColumn = columnDefinitionArray[i];

								// Override the data conversion function for the checkbox column
								browseCheckboxColumn.DataConversion = browseCheckboxColumnOverrideDataConversion

								// Override the get cell function for the checkbox column
								browseCheckboxColumn.getCellValue = browseCheckboxColumnOverrideGetCellValue
							}
						}
					}
					else if ( columns[ i ].DisplayAsLink )
					{
						if ( columns[ i ].type == 14 )
						{
							//User type column with link on name
							columnDefinitionArray[i] = new userColumnWithURL(columns[i].displayName, columns[i].columnName, columns[i].sortable, columns[i].columnEMWidth + "em", columns[i].alignment, columns[i].longText, columns[i].columnName);
						}
						else
						{
							//Non-user type column with link on value
							columnDefinitionArray[i] = new columnWithURL(columns[i].displayName, columns[i].columnName, columns[i].sortable, columns[i].columnEMWidth + "em", columns[i].alignment, columns[i].longText, columns[i].columnName, columns[i].URL, columns[i].NewWindow, columns[i].TitleText, columns[i].DisplayValue);
						}
					}
					else if (columns[i].columnName=='reviewDecision')
					{
						columnDefinitionArray[i] = reviewDecision;
					}
					else if (columns[i].columnName=='dispActions')
					{
						columnDefinitionArray[i] = dispActions;
					}
					else if (columns[i].columnName=='objLocation')
					{
						columnDefinitionArray[i] = objLocation;
					}
					else if (columns[i].columnName=='calculatedDate')
					{
						columnDefinitionArray[i] = calculatedDate;
					}
					else
					{
						columnDefinitionArray[i] = new arbitraryColumn( columns[i].displayName, columns[i].columnName, columns[i].sortable, columns[i].columnEMWidth + "em", columns[i].alignment, columns[i].longText, columns[i].columnName );	
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
		exceptionAlert( e, "Error: disposition_custom_actions.js/setBrowseColumnDefinition.  Corrupt or missing data in generating column definitions." );
	}
}
// END override for additional disposition columns


function popupDispositionActionsWindowMulti()
{

	popupDispositionActionsWindow( 0, false, "" )

}

var actionIdToUpdate
var newAction
var newStatusCode

function popupDispositionActionsWindow( objId, bSingle, objName )
{
	var width
	var height
	var d = $( "#dispActionsDialog" )

	actionIdToUpdate = objId
	objName = unescape( objName )

	var currentActionObj = window.document.getElementById( objId + "_action" )

	d.dialog( "open" )

	if ( bSingle )
	{
		d.dialog( "option", "title", LocString( "Change Action" ) );
		$( "#applyToDialog" ).hide()
		var displayName = objName.length > 30 ?  objName.substr(0, 27) + "..." : objName
		$("#applyToDialogSingle").find(".dispDlgTxt").html(displayName)
		$("#applyToDialogSingle").find(".dispDlgTxt").attr("title", objName)
		$( "#applyToDialogSingle" ).show()
	}
	else
	{
		$( "#applyToDialogSingle" ).hide()
		d.dialog( "option", "title", LocString( "Change Actions" ) );

		if ( totalPages > 1 )
		{
			$( "#applyToDialog" ).show()
		}
		else
		{
			$( "#applyToDialog" ).hide()
		}
	}
	
	// Add a few pixels to the height and width as needed
	if ( $.browser.msie && ($.browser.version < 10 ) )
	{
	 	width = d.innerWidth()
	 				+ 4

		height = d.innerHeight()
						+ 26

	}
	else
	{

		width = window.document.getElementById( "dispActionsTbl" ).offsetWidth
					+ 4

		height = window.document.getElementById( "dispActionsTbl" ).offsetHeight
					+ 30
	}

	d.dialog( "option", "width", width );
	d.dialog( "option", "height", height );
	
	if ( navigator.appName != "Microsoft Internet Explorer" )
	{
		// Fudge for non-IE browsers
		d.dialog( "close" )
		d.dialog( "open" )
	}

	if ( null === currentActionObj )
	{
		// Ensure none of the actions are checked
		processNone.checked = false
		processStatusChange.checked = false

		if ( null !== processClose )
		{
			processClose.checked = false
		}

		if ( null !== processMarkOfficial )
		{
			processMarkOfficial.checked = false
		}

		processExport.checked = false

		if ( null !== processUpdateStorageProvider )
		{
			processUpdateStorageProvider.checked = false
		}

		if ( null !== processMakeRendition )
		{
			processMakeRendition.checked = false
		}

		if ( null !== processDeleteElectronic )
		{
			processDeleteElectronic.checked = false
		}

		processDestroy.checked = false
		
		if ( null !== markOfficialRendition )
		{
			markOfficialRendition.checked = false
		}
	}
	else
	{
		var currentAction = currentActionObj.value
		var statusCode = window.document.getElementById( objId + "_status" ).value
		var makeRendition = window.document.getElementById( objId + "_makeRendition" ).value

		switch( currentAction )
		{
			case "0":
				processNone.checked = true
				break;

			case "1":
				processStatusChange.checked = true
				break;

			case "7":
				if ( null !== processClose )
				{
					processClose.checked = true
				}

				break;

			case "9":
				if ( null !== processMarkOfficial )
				{
					processMarkOfficial.checked = true
				}
				break;

			case "10":
				processExport.checked = true
				break;

			case "11":
				if ( null !== processUpdateStorageProvider )
				{
					processUpdateStorageProvider.checked = true
				}

				break;

			case "12":
				if ( null !== processDeleteElectronic )
				{
					processDeleteElectronic.checked = true
				}

				break;

			case "16":
				if ( null !== processMakeRendition )
				{
					processMakeRendition.checked = true
				}

				break;

			case "32":
				processDestroy.checked = true
				break;
		}

		// Check/uncheck the Make Record checkbox					
		if ( null !== processMarkOfficial && null !== makeRendition && null !== markOfficialRendition && makeRendition === "1" )
		{
			markOfficialRendition.checked = true
		}
		else
		{
			if ( null !== markOfficialRendition )
			{
				markOfficialRendition.checked = false
			}
		}
	}

	// This sets the active status dropdown to be enabled
	setStatusDropdown( statusCode )

	// Set the Apply to: Checked items on the page 
	var applyToRadios = window.document.getElementsByName( "applyToRadioChangeActions" )
	applyToRadios[0].checked = true
}


function updateDispositionAction()
{
	var d = $( "#dispActionsDialog" )
	var ok = true
	var updateAll = false
	var objIdList = ""
	var action
	var statusCode = ""
	var statusCodeDropdown
	var ids
	var newActionDisplay
	var bSingle = false
	var bMakeRendition = false
	var applyTo = "thisPage"

	var processStatusChange = window.document.getElementById( 'processStatusChange' )
	var processStatusChange_status = window.document.getElementById( 'processStatusChange_status' )

	if ( processStatusChange.checked )
	{
		if ( processStatusChange_status.value == "" )
		{
			processStatusChange_status.focus()
			ok = false
			alert( LocString( "This action requires a Status to be selected" ) )
		}
	}

	if ( ok )
	{
		// Loop through the default process to see which action one is checked
		var defaultProcesses = window.document.getElementsByName( "defaultProcess" )

		for ( var i = 0; i < defaultProcesses.length; i++ )
		{
			if ( defaultProcesses[ i ].checked )
			{
				action = defaultProcesses[ i ].value

				if ( undefined !== action )
				{
					// Get the associated status code for the action
					statusCodeDropdown = window.document.getElementById( defaultProcesses[ i ].id + "_status" )

					if ( ( statusCodeDropdown ) != null )
					{
						statusCode = statusCodeDropdown.value
					}
				}

				break
			}
		}

		if ( undefined !== action )	// No action has been specified in the popup
		{
			newAction = action
			newStatus = statusCode

			if ( Trim( action ) === "" )
			{
				action = "0"
			}
		
			if ( actionIdToUpdate == 0 )
			{
				updateAll = true	
				objIdList = getCheckboxItems( true )
			}
			else
			{
				objIdList = actionIdToUpdate.toString()
				bSingle = true
			}

			if ( null !== markOfficialRendition && markOfficialRendition.checked )
			{
				bMakeRendition = true
			}

			if ( actionIdToUpdate == 0 )
			{		
				var applyToRadios = window.document.getElementsByName( "applyToRadioChangeActions" )

				if ( applyToRadios[0].checked )
				{
					if ( objIdList == "" )	// Nothing on the page to update
					{
						ok = false
					}
				}
				else if ( applyToRadios[1].checked )
				{
					applyTo = "allPages"
				}
			}

			newActionDisplay = allActions[ action ]

			if ( Trim( statusCode ) != "" )
			{
				newActionDisplay += ": " + statusCode
			}

			if ( ok )
			{
				var actionUpdates = {}

				actionUpdates[ "newActionDisplay" ] = newActionDisplay
				
				if ( null !== markOfficialRendition && markOfficialRendition.checked )
				{
					actionUpdates[ "markOfficial" ] = "1"
				}
				else
				{
					actionUpdates[ "markOfficial" ] = "0"
				}
				
				d.dialog( "close" )
				popup( LocString( "Processing..." ) ,"white");

				$.ajax(
				{
					type: 			"POST",
					async:			true, 
					url:			baseURL,
					data: 
					{
						func: 			"RecMan.UpdateResults", 
						whatToDo:		"updateaction",
						objIdList:		objIdList, 
						dispNodeID:		containerId, 
						qDate:			window.document.getElementById('rm_qDate').value, 
						action:			action, 
						statusCode:		statusCode, 
						makeRendition:	bMakeRendition, 
						reviewerID:		window.document.getElementById('rm_reviewerID').value,
						reviewerID2: 	window.document.getElementById('rm_reviewerID2').value,
						applyTo:		applyTo, 
						bSingle:		bSingle
					},
					success: function( data )
					{
						killPopup()

						var checkVal = checkAjaxResponseError( data )

						if ( checkVal["ok"] )
						{
							// Success updating the database, so change the action display, action, and status, for the checked items on the page.
							var ids = objIdList.split( " " )

							for ( var i = 0; i < ids.length; i++ )
							{
								if ( Trim( ids[ i ] ) != "" )
								{
									// Set the display text
									obj = $( "#" + ids[ i ]  + "_changeAction" )
									obj.text( actionUpdates.newActionDisplay )

									// Set the new action
									obj = window.document.getElementById( ids[ i ] + "_action" )
									obj.value = newAction

									// Set the new status
									obj = window.document.getElementById( ids[ i ] + "_status" )
									obj.value = newStatus

									// Show/hide the Make Rendition icon
									if ( actionUpdates.markOfficial == "1" )
									{
										$( "#" + ids[ i ] + "_makeRenditionDisplay" ).show()
										window.document.getElementById( ids[ i ] + "_makeRendition" ).value = "1"
									}
									else
									{
										$( "#" + ids[ i ] + "_makeRenditionDisplay" ).hide()
										window.document.getElementById( ids[ i ] + "_makeRendition" ).value = "0"
									}
									
									// Update the core myRows DispAction value
									if (typeof myRows !== 'undefined') {
										var id_stage = ids[i].split("_")
										if (id_stage.length == 2) {
											var curID = id_stage[0];
											var stage = id_stage[1];
											if (curID.length > 0) {
												for (var j = 0; j < myRows.length; j++) {
													if (( myRows[j].dataId != curID ) || (myRows[j].StageCount != stage)) {
														continue;
													}
													myRows[j].DispAction = (newAction.length > 0) ? new String(newAction) : new String("0");
													if (newStatus.length > 0) {
														myRows[j].DefaultActionInfo = new String(newStatus);
													} else {
														if (myRows[j].hasOwnProperty("DefaultActionInfo")) {
															delete myRows[j].DefaultActionInfo;
														}
													}
													break;
												}
											}
										}
									}								
									
								}
							}
						}
					}
				});
			}
		}
	}
}

function checkPerformActionWarnings()
{
	// without DoD	-- single destroy confirmation
	// with DoD		-- double destroy confirmation
	//				-- PDF warning

	var d = $( "#dispPerformActionsDialog" )
	var ok = true
	var objIdList = getCheckboxItems( true )
	var ids
	var applyToRadios
	var applyTo = "thisPage"

	applyToRadios = window.document.getElementsByName( "applyToRadioPerformActions" )

	if ( applyToRadios[0].checked )
	{
		if ( objIdList == "" )	// Nothing on the page to update
		{
			ok = false
		}
	}
	else if ( applyToRadios[1].checked )
	{
		applyTo = "allPages"
	}

	if ( ok )
	{
		d.dialog( "close" )	
		popup( LocString( "Processing..." ) ,"white");

		$.ajax(
		{
			type: 			"GET",
			async:			true, 
			url:			baseURL,
			data: 
			{
				func: 			"RecMan.UpdateResults", 
				whatToDo:		"getwarnings",
				objIdList:		objIdList, 
				dispNodeID:		containerId, 
				qDate:			window.document.getElementById('rm_qDate').value, 
				reviewerID:		window.document.getElementById('rm_reviewerID').value, 
				reviewerID2: 	window.document.getElementById('rm_reviewerID2').value,
				applyTo:		applyTo
			},
			success: function( data )
			{
				killPopup()

				var obj
				var index1
				var index2
				var responseObj
				var warningsDlg = $( "#dispPerformActionsWarnings" )
				bDoDDoubleDeleteConfirm = false

				var checkVal = checkAjaxResponseError( data )

				if ( checkVal["ok"] )
				{
					responseObj = checkVal["responseObj"]

					if ( responseObj.bHasDelete == "true" && responseObj.bDoD == "true" )
					{
						bDoDDoubleDeleteConfirm = true
					}
					else
					{
						bDoDDoubleDeleteConfirm = false
					}

					if ( responseObj.bDisplayError == "true" || responseObj.bDisplayWarnings == "true" )
					{
						warningsDlg.dialog( "open" )

						if ( responseObj.bDisplayError == "true" )
						{
							$( "#errorPerformActions" ).show()
							$( "#snapshotStatusTxt" ).text( responseObj.snapshotStatus )
							$( "#warningDelete" ).hide()
							$( "#warningPDF" ).hide()
						}
						else if ( responseObj.bDisplayWarnings == "true" )
						{
							$( "#errorPerformActions" ).hide()

							if ( responseObj.bHasDelete == "true" )
							{
								$( "#warningDelete" ).show()
							}
							else
							{
								$( "#warningDelete" ).hide()
							}

							if ( responseObj.bHasPDF == "true" )
							{
								$( "#warningPDF" ).show()
							}
							else
							{
								$( "#warningPDF" ).hide()
							}
						}

						// Add a few pixels to the height and width as needed
						if ( $.browser.msie && ($.browser.version < 10 ) )
						{
							width = warningsDlg.innerWidth()
										+ 4

							height = warningsDlg.innerHeight()
											+ 26
						}
						else
						{
							width = window.document.getElementById( "dispActionsWarningsTbl" ).offsetWidth
										+ 4

							height = window.document.getElementById( "dispActionsWarningsTbl" ).offsetHeight
										+ 28
						}

						warningsDlg.dialog( "option", "width", width );
						warningsDlg.dialog( "option", "height", height );

						if ( navigator.appName != "Microsoft Internet Explorer" )
						{
							// Fudge for non-IE browsers
							warningsDlg.dialog( "close" )
							warningsDlg.dialog( "open" )
						}
					}
					else
					{
						performDispositionActions()
					}
				}
			}
		});
	}
}

function performDispositionActions()
{
	var warningsDlg = $( "#dispPerformActionsWarnings" )
	var ok = true
	var objIdList = getCheckboxItems( true )
	var ids
	var applyToRadios
	var applyTo = "thisPage"

	if ( bDoDDoubleDeleteConfirm )
	{
		if ( !confirm( LocString( "Some objects have been flagged for destruction.\r\n\r\nAre you sure you want to perform the actions?" ) ) )
		{
			ok = false
		}
	}
	
	if ( ok )
	{
		applyToRadios = window.document.getElementsByName( "applyToRadioPerformActions" )

		if ( applyToRadios[0].checked )
		{
			if ( objIdList == "" )	// Nothing on the page to update
			{
				ok = false
			}

		}
		else if ( applyToRadios[1].checked )
		{
			applyTo = "allPages"
		}

		if ( ok )
		{
			warningsDlg.dialog( "close" )
			
			popup( LocString( "Processing..." ) ,"white");

			$.ajax(
			{
				type: 			"POST",
				async:			true, 
				url:			baseURL,
				data: 
				{
					func: 			"RecMan.UpdateResults", 
					whatToDo:		"performactions",
					objIdList:		objIdList, 
					dispNodeID:		containerId, 
					qDate:			window.document.getElementById('rm_qDate').value, 
					reviewerID:		window.document.getElementById('rm_reviewerID').value,
					reviewerID2: 	window.document.getElementById('rm_reviewerID2').value,
					applyTo:		applyTo
				},
				success: function( data )
				{
					killPopup()
					reloadPageX( currentPageNum, LocString( "Reloading page" )  )
				}
			});
		}
	}
}

function browseCheckboxColumnOverrideDataConversion( obj )
{
	if ( obj.Process == 1 && obj.ActionPerformed != "1" )
	{
		obj.checked = true
	}
};


function browseCheckboxColumnOverrideGetCellValue( dataRow, rowNo )
{
	var		innerHTMLStr;
	var		isChecked = '';

	if ( dataRow.checked )
	{
		isChecked = "checked";
	}

	if ( dataRow.ActionPerformed == "1" )
	{
		innerHTMLStr = "<IMG SRC='" + imgSrc + "check.gif' title='"
		innerHTMLStr += LocString( "Actioned" )
		innerHTMLStr += "'>"
	}
	else
	{
		innerHTMLStr = "<INPUT ID='" + dataRow.name + "_checkbox' "
		innerHTMLStr += "TYPE='checkbox' NAME='nodeID' VALUE='" + dataRow.dataId +"' TITLE='";
		innerHTMLStr += LocString( "SelectDeselect" );
		innerHTMLStr += "' ONCLICK='javascript:Toggle( \"top_checkbox\", this, \"nodeID\" );' " + isChecked + " >";
	}

	return innerHTMLStr;
};


function reloadPageX( pageNumber, msg )
{
	getFolderContents( pageNumber, msg )
}


function updateContentFilter( key, value )
{
	if ( !( key in contentFilter ) )
	{
		addContentFilter( key, value )
	}
	else
	{
		contentFilter[ key ][0] = value
	}
}


ToggleAll = function ToggleAll( e, name ) 
{
	var d = $( "#topSelectAll" )
	var applyToRadios = window.document.getElementsByName( "applyToRadioTopSelect" )

	if ( totalPages > 1 )
	{
		d.dialog( "open" )

		if ( e.checked )
		{
			d.dialog( "option", "title", LocString( "Select Items" ) );
			$( "#applyToPageTopSelect" ).text( LocString( "Select items on this page" ) )
			$( "#applyToAllTopSelect" ).text( LocString( "Select items in the entire result set" ) )
		}
		else
		{
			d.dialog( "option", "title", LocString( "Deselect Items" ) );
			$( "#applyToPageTopSelect" ).text( LocString( "Deselect items on this page" ) )
			$( "#applyToAllTopSelect" ).text( LocString( "Deselect items in the entire result set" ) )
		}

		// Toggle the top select back to its original state.  This is in case the user clicks 
		// the Cancel button (or Escape key) in the dialog.

		toggleTopSelect()

		// Add a few pixels to the height and width as needed
		if ( $.browser.msie && ($.browser.version < 10 ) )
		{
			width = d.innerWidth()

			height = d.innerHeight()
							+ 26
		}
		else
		{
			width = window.document.getElementById( "dispTopSelectAllTbl" ).offsetWidth
						+ 20

			height = window.document.getElementById( "dispTopSelectAllTbl" ).offsetHeight
						+ 26
		}

		d.dialog( "option", "width", width );
		d.dialog( "option", "height", height );

		if ( navigator.appName != "Microsoft Internet Explorer" )
		{
			// Fudge for non-IE browsers
			d.dialog( "close" )
			d.dialog( "open" )
		}

		applyToRadios[ 0 ].checked = true
	}
	else
	{
		applyToRadios[ 0 ].checked = true
		toggleTopSelect()
		doToggleAll()
	}
}


function doToggleAll()
{
	var	frm = window.document.BrowseViewFrm;
	var e = frm.top_checkbox
	var name = "nodeID"

	var applyToRadios = window.document.getElementsByName( "applyToRadioTopSelect" )
	var bThisPage = false
	var ok = true

	var d = $( "#topSelectAll" )
	d.dialog( "close" )

	if ( applyToRadios[0].checked )
	{
		bThisPage = true
	}

	var objIdList = getCheckboxItems( false )

	toggleTopSelect()

	if ( objIdList == "" )
	{
		ok = false
		
		if ( e.checked )
		{
			e.checked = false
		}
		else
		{
			e.checked = true
		}
	}
	else
	{
		UpdateCheckbox( objIdList, e.checked, true, bThisPage )
	}

	if ( ok )
	{
		if ( e.checked )
		{
			CheckAll( e, name );
		}
		else
		{
			ClearAll( e, name );
		}
	}

}

function toggleTopSelect()
{
	var	frm = window.document.BrowseViewFrm;
	var e = frm.top_checkbox
	
	if ( e.checked )
	{
		e.checked = false
	}
	else
	{
		e.checked = true
	}

}

Toggle = function Toggle( checkAllField, e, name )
{
	var	elm;

	// Find browse row parent
	if (e.checked)
	{
		// UpdateCheckbox( e.value, true, false, true )
		UpdateCheckbox( $(e).parents(".browseRow1,.browseRow2").find( "[name='idStageCount']" ).val(), true, false, true )
		$(e).parents(".browseRow1,.browseRow2").addClass("browseRowSelected");
	}
	else
	{
		// UpdateCheckbox( e.value, false, false, true )
		UpdateCheckbox( $(e).parents(".browseRow1,.browseRow2").find( "[name='idStageCount']" ).val(), false, false, true )
		$(e).parents(".browseRow1,.browseRow2").removeClass("browseRowSelected");
	}

	var frm = e.form;
	var	len = frm.elements.length;
	
	for( var i = 0 ; i < len ; i++ )
	{
		elm = frm.elements[ i ];
		if ( elm.name == checkAllField )
		{
			elm.checked = AllChecked( e, name );
		}
	}
}

function getCheckboxItems( bCheckedOnly )
{
	var objIdList = ""

	var theForm = window.document.BrowseViewFrm	
	var len = theForm.elements.length

	for ( var i = 0; i < len; i++ )
	{
		var f = theForm.elements[i]
		
		if ( f.name == "nodeID" )
		{
			if ( bCheckedOnly )
			{
				if ( f.checked )
				{
					// objIdList += " " + f.value

					objIdList += " " + $(f).parents(".browseRow1,.browseRow2").find( "[name='idStageCount']" ).val()
				}
			}
			else
			{			
				// objIdList += " " + f.value

				objIdList += " " + $(f).parents(".browseRow1,.browseRow2").find( "[name='idStageCount']" ).val()
			}
		}
	}

	return objIdList
}

// Override the retrieveData function so we can ensure the nextURL contains the required qDate parameter
retrieveData = function retrieveData( id, moreParam, func )
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

/*	moreParam contains the nextURL, but the nextURL does not contain the required qDate.
	By ignoring this condition, the nextURL is not added here to the url.  Instead it is add
	a few lines later ...

	if ( moreParam != "" )
	{
		url = url + "&" + moreParam;
	}
*/

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


function applyAccessionCode()
{
	var d = $( "#dispApplyAccessionDialog" )

	var ok = true
	var objIdList = getCheckboxItems( true )
	var ids
	var applyToRadios
	var applyTo = "thisPage"
	var accession = window.document.applyAccession.accession.value

	if ( ok )
	{
		applyToRadios = window.document.getElementsByName( "applyToRadioApplyAccession" )

		if ( applyToRadios[0].checked )
		{
			if ( objIdList == "" )	// Nothing on the page to update
			{
				ok = false
				alert( LocString( "There are no selected items on the page" ) )
			}
		}
		else if ( applyToRadios[1].checked )
		{
			applyTo = "allPages"
		}
		else
		{
			ok = false
		}

		if ( ok && accession == "" )
		{
			ok = confirm( LocString( "Do you want to remove accession from selected objects?" ) )
		}

		if ( ok )
		{
			d.dialog( "close" )
			popup( LocString( "Processing..." ) ,"white");

			$.ajax(
			{
				type: 			"POST",
				async:			true, 
				url:			baseURL,
				data: 
				{
					func: 			"RecMan.UpdateResults", 
					whatToDo:		"applyaccession",
					objIdList:		objIdList, 
					dispNodeID:		containerId, 
					qDate:			window.document.getElementById('rm_qDate').value, 
					accession: 		accession, 
					reviewerID:		window.document.getElementById('rm_reviewerID').value,
					reviewerID2: 	window.document.getElementById('rm_reviewerID2').value, 
					applyTo:		applyTo
				},
				success: function( data )
				{
					killPopup()

					var responseObj
					var checkVal = checkAjaxResponseError( data )

					if ( checkVal["ok"] )
					{
						responseObj = checkVal["responseObj"]

						if ( responseObj.ok == "false" )
						{
							alert( responseObj.errMsg )
						}
						else if ( responseObj.bAccessionUpdateInProgress == "true" )
						{
							alert( LocString( "An Accession update is already in progress" ) )
						}
						else
						{
							reloadPageX( currentPageNum, LocString( "Reloading page" )  )
						}
					}
				}
			});
		}
	}
}

function UpdateCheckbox( objIdList, isChecked, isTopSelect, bThisPage )
{
	var applyTo = "thisPage"

	if ( !bThisPage )
	{
		applyTo = "allPages"
		popup( LocString( "Processing..." ) ,"white");	// updating checkboxes on all pages can take awhile, whereas single page will be very quick.
	}

	$.ajax(
	{
		type: 			"POST",
		async:			true, 
		url:			baseURL,
		data: 
		{
			func: 			"RecMan.UpdateResults", 
			whatToDo:		"updatecheckbox",
			objIdList:		objIdList, 
			dispNodeID:		containerId, 
			qDate:			window.document.getElementById('rm_qDate').value, 
			reviewerID:		window.document.getElementById('rm_reviewerID').value, 
			reviewerID2: 	window.document.getElementById('rm_reviewerID2').value, 
			applyTo:		applyTo,
			isChecked: 		isChecked, 
			isTopSelect: 	isTopSelect
		},
		success: function( data )
		{
			if ( !bThisPage )
			{
				killPopup()
			}
			
			checkAjaxResponseError( data )
		}
	});
}

function onPageLoad()
{
	// Set the highlighting of the checked rows, and check the top checkbox if all other boxes are checked.

	var	frm = window.document.BrowseViewFrm;
	var	frmLen = frm.elements.length;
	var	checkTop = true
	var	checkboxFound = false

	// to redirect page after move button
	frm.nextUrl.value = window.location;
	bFieldAdded = false;
	
	// Set the ONSUBMIT attribute for the BrowseViewFrm to return false so it does not submit.
	// For whatever reason, with facets disabled, this form is being submitted to Content Server
	// with func="" and objAction="".  This is a fudge work-around unless some other solution
	// presents itself.
	frm.onsubmit = function(){ return false }

	for ( var i = 0 ; i < frmLen ; i++ ) 
	{
		if ( ( frm.elements[i].name == "nodeID" ) )
		{
			checkboxFound = true
			
			if ( !frm.elements[i].checked )
			{
				checkTop = false
			}
			else
			{
				$(frm.elements[i]).parents(".browseRow1,.browseRow2").addClass("browseRowSelected");
			}

		}
	}
	
	if ( checkboxFound && checkTop )
	{
		if ( frm.top_checkbox )
		{
			frm.top_checkbox.checked = true
		}
	}
}


// Set the multi-select dialog 
$( document ).ready( function() {
	var d = $( "#topSelectAll" )

	// Determine the coordinates of the multi-select checkbox
	var	frm = window.document.BrowseViewFrm;
	var e = frm.top_checkbox
	var xPos = 0
	var yPos = 0

	while (e)
	{
		xPos += e.offsetLeft;
		yPos += e.offsetTop;
		e = e.offsetParent;
	}

	if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft))
	{
		xPos -= document.documentElement.scrollLeft;
		yPos -= document.documentElement.scrollTop; 
	}
	else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) 
	{     
		xPos -= document.body.scrollLeft;
		yPos -= document.body.scrollTop; 
	} 
	else if (window.pageXOffset || window.pageYOffset) 
	{     
		xPos -= window.pageXOffset;     
		yPos -= window.pageYOffset; 
	}

	d.dialog( 
		{ 
			draggable: false, 
			modal: true, 
			resizable: true, 
			closeOnEscape: true, 
			autoOpen: false,
			position: [ xPos, yPos ]
		} );

	var titleBar = d.parent().find( ".ui-dialog-titlebar" )
	var contentBox = d.parent().find( ".ui-dialog-content" )

	// Remove these classes as they conflict with the dispDialogCls style for the dialog.
	d.removeClass( "ui-dialog-content ui-widget-content" );
	titleBar.removeClass( "ui-widget-header" );
	titleBar.removeClass( "ui-dialog-titlebar" )
	
	// hide the closing X in title bar.
	var dialogClose = d.parent().find( ".ui-dialog-titlebar-close" )
	dialogClose.hide();
	
	// Set the title bar style
	titleBar.addClass( "titleClass" );

	// Set the content style
	contentBox.addClass( "contentClass" );

	// Set/unset the hover-over style for the OK button
	$("#okButtonTopSelect").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});

	// Set/unset the hover-over style for the Cancel button
	$("#cancelButtonTopSelect").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});
} );


// Set the perform actions dialog 
$( document ).ready( function() {
	var d = $( "#dispPerformActionsDialog" )

	d.dialog( 
		{ 
			draggable: false, 
			modal: true, 
			resizable: true, 
			closeOnEscape: true, 
			autoOpen: false,
			title: LocString( "Perform Actions" )
		} );

	var titleBar = d.parent().find( ".ui-dialog-titlebar" )
	var contentBox = d.parent().find( ".ui-dialog-content" )

	// Remove these classes as they conflict with the dispDialogCls style for the dialog.
	d.removeClass( "ui-dialog-content ui-widget-content" );
	titleBar.removeClass( "ui-widget-header" );
	titleBar.removeClass( "ui-dialog-titlebar" )
	
	
	// hide the closing X in title bar.
	var dialogClose = d.parent().find( ".ui-dialog-titlebar-close" )
	dialogClose.hide();
	
	// Set the title bar style
	titleBar.addClass( "titleClass" );

	// Set the content style
	contentBox.addClass( "contentClass" );

	// Set/unset the hover-over style for the OK button
	$("#okButtonPerformActions").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});

	// Set/unset the hover-over style for the Cancel button
	$("#cancelButtonPerformActions").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});
} );


// Set the apply accession dialog 
$( document ).ready( function() {
	var d = $( "#dispApplyAccessionDialog" )

	d.dialog( 
		{ 
			draggable: false, 
			modal: true, 
			resizable: true, 
			closeOnEscape: true, 
			autoOpen: false,
			title: LocString( "Apply Accession" )
		} );

	var titleBar = d.parent().find( ".ui-dialog-titlebar" )
	var contentBox = d.parent().find( ".ui-dialog-content" )

	// Remove these classes as they conflict with the dispDialogCls style for the dialog.
	d.removeClass( "ui-dialog-content ui-widget-content" );
	titleBar.removeClass( "ui-widget-header" );
	titleBar.removeClass( "ui-dialog-titlebar" )
	
	// hide the closing X in title bar.
	var dialogClose = d.parent().find( ".ui-dialog-titlebar-close" )
	dialogClose.hide();
	
	// Set the title bar style
	titleBar.addClass( "titleClass" );

	// Set the content style
	contentBox.addClass( "contentClass" );

	// Set/unset the hover-over style for the OK button
	$("#okButtonApplyAccession").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});

	// Set/unset the hover-over style for the Cancel button
	$("#cancelButtonApplyAccession").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});
} );


// Set the filter search results dialog 
$( document ).ready( function() {
	var d = $( "#dispFilterResultsDialog" )

	d.dialog( 
		{ 
			draggable: false, 
			modal: true, 
			resizable: true, 
			closeOnEscape: true, 
			autoOpen: false,
			title: LocString( "Filter Search Results" )
		} );

	var titleBar = d.parent().find( ".ui-dialog-titlebar" )
	var contentBox = d.parent().find( ".ui-dialog-content" )

	// Remove these classes as they conflict with the dispDialogCls style for the dialog.
	d.removeClass( "ui-dialog-content ui-widget-content" );
	titleBar.removeClass( "ui-widget-header" );
	titleBar.removeClass( "ui-dialog-titlebar" )
	
	// hide the closing X in title bar.
	var dialogClose = d.parent().find( ".ui-dialog-titlebar-close" )
	dialogClose.hide();
	
	// Set the title bar style
	titleBar.addClass( "titleClass" );

	// Set the content style
	contentBox.addClass( "contentClass" );

	// Set/unset the hover-over style for the OK button
	$("#okButtonFilterResults").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});

	// Set/unset the hover-over style for the Cancel button
	$("#cancelButtonFilterResults").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});

	// Set/unset the hover-over style for the Cancel button
	$("#resetButtonFilterResults").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});
} );


// Set the disposition actions dialog 
$( document ).ready( function() {
	var d = $( "#dispActionsDialog" )

	d.dialog( 
		{ 
			draggable: false, 
			modal: true, 
			resizable: true, 
			closeOnEscape: true, 
			autoOpen: false
		} );

	var titleBar = d.parent().find( ".ui-dialog-titlebar" )
	var contentBox = d.parent().find( ".ui-dialog-content" )

	// Remove these classes as they conflict with the dispDialogCls style for the dialog.
	d.removeClass( "ui-dialog-content ui-widget-content" );
	titleBar.removeClass( "ui-widget-header" );
	titleBar.removeClass( "ui-dialog-titlebar" )
	
	// hide the closing X in title bar.
	var dialogClose = d.parent().find( ".ui-dialog-titlebar-close" )
	dialogClose.hide();
	
	// Set the title bar style
	titleBar.addClass( "titleClass" );

	// Set the content style
	contentBox.addClass( "contentClass" );

	// Set/unset the hover-over style for the OK button
	$("#okButtonAction").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});

	// Set/unset the hover-over style for the Cancel button
	$("#cancelButtonAction").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});
} );


// Set the disposition actions dialog 
$( document ).ready( function() {
	var d = $( "#dispReviewDecisionDialog" )

	d.dialog( 
		{ 
			draggable: false, 
			modal: true, 
			resizable: true, 
			closeOnEscape: true, 
			autoOpen: false
		} );

	d.dialog( "option", "title", LocString( "Change Review Decision" ) );

	var titleBar = d.parent().find( ".ui-dialog-titlebar" )
	var contentBox = d.parent().find( ".ui-dialog-content" )

	// Remove these classes as they conflict with the dispDialogCls style for the dialog.
	d.removeClass( "ui-dialog-content ui-widget-content" );
	titleBar.removeClass( "ui-widget-header" );
	titleBar.removeClass( "ui-dialog-titlebar" )
	
	// hide the closing X in title bar.
	var dialogClose = d.parent().find( ".ui-dialog-titlebar-close" )
	dialogClose.hide();
	
	// Set the title bar style
	titleBar.addClass( "titleClass" );

	// Set the content style
	contentBox.addClass( "contentClass" );

	// Set/unset the hover-over style for the OK button
	$("#okButtonAction").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});

	// Set/unset the hover-over style for the Cancel button
	$("#cancelButtonAction").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});
} );


// Set the disposition warnings dialog 
$( document ).ready( function() {
	var d = $( "#dispPerformActionsWarnings" )

	d.dialog( 
		{ 
			draggable: false, 
			modal: true, 
			resizable: true, 
			closeOnEscape: true, 
			title: LocString( "Warnings" ),
			autoOpen: false
		} );

	var titleBar = d.parent().find( ".ui-dialog-titlebar" )
	var contentBox = d.parent().find( ".ui-dialog-content" )

	// Remove these classes as they conflict with the dispDialogCls style for the dialog.
	d.removeClass( "ui-dialog-content ui-widget-content" );
	titleBar.removeClass( "ui-widget-header" );
	titleBar.removeClass( "ui-dialog-titlebar" )
	
	// hide the closing X in title bar.
	var dialogClose = d.parent().find( ".ui-dialog-titlebar-close" )
	dialogClose.hide();
	
	// Set the title bar style
	titleBar.addClass( "titleClass" );

	// Set the content style
	contentBox.addClass( "contentClass" );

	// Set/unset the hover-over style for the OK button
	$("#okButtonWarnings").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});

	// Set/unset the hover-over style for the Cancel button
	$("#cancelButtonWarnings").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});
} );


// Set the disposition actions dialog 
$( document ).ready( function() {
	var d = $( "#dispDisplayCommentsDialog" )

	d.dialog( 
		{ 
			draggable: false, 
			modal: true, 
			resizable: true, 
			closeOnEscape: true, 
			autoOpen: false
		} );

	d.dialog( "option", "title", LocString( "Comments" ) );

	var titleBar = d.parent().find( ".ui-dialog-titlebar" )
	var contentBox = d.parent().find( ".ui-dialog-content" )

	// Remove these classes as they conflict with the dispDialogCls style for the dialog.
	d.removeClass( "ui-dialog-content ui-widget-content" );
	titleBar.removeClass( "ui-widget-header" );
	titleBar.removeClass( "ui-dialog-titlebar" )

	// Set the title bar style
	titleBar.addClass( "titleClass" );

	// Set the content style
	contentBox.addClass( "contentClass" );

	var dialogClose = d.parent().find( " .ui-dialog-titlebar-close" )

	dialogClose.css( "display", "block" )
	dialogClose.css( "position", "absolute" )
	dialogClose.css( "right", ".3em" )
	dialogClose.css( "top", "2px" )
	dialogClose.css( "width", "19px" )
	dialogClose.css( "margin", "0 0 0 0" )
	dialogClose.css( "padding", "1px" )
	dialogClose.css( "height", "18px" )
} );


// Set the perform actions dialog 
$( document ).ready( function() {
	var d = $( "#dispFinishReviewDialog" )

	d.dialog( 
		{ 
			draggable: false, 
			modal: true, 
			resizable: true, 
			closeOnEscape: true, 
			autoOpen: false,
			title: LocString( "Finish Review" )
		} );

	var titleBar = d.parent().find( ".ui-dialog-titlebar" )
	var contentBox = d.parent().find( ".ui-dialog-content" )

	// Remove these classes as they conflict with the dispDialogCls style for the dialog.
	d.removeClass( "ui-dialog-content ui-widget-content" );
	titleBar.removeClass( "ui-widget-header" );
	titleBar.removeClass( "ui-dialog-titlebar" )

	// hide the closing X in title bar.
	var dialogClose = d.parent().find( ".ui-dialog-titlebar-close" )
	dialogClose.hide();

	// Set the title bar style
	titleBar.addClass( "titleClass" );

	// Set the content style
	contentBox.addClass( "contentClass" );

	// Set/unset the hover-over style for the OK button
	$("#okButtonPerformActions").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});

	// Set/unset the hover-over style for the Cancel button
	$("#cancelButtonPerformActions").mouseover(function() {
		$(this).addClass( "dispButtons-hover" );
	}).mouseout(function() {
		$(this).removeClass( "dispButtons-hover" );
	});
} );

$( document ).ready( function() {

	// Set the status of the snapshot
	$( "#snapshotStatus" ).text( snapshotStatus )
	
	// Set the status of the snapshot
	$( "#reviewStatus" ).text( reviewStatus )

	// Set the priority of the snapshot
	$( "#priority" ).text( priority )

	startSnapshotStatusUpdate()

	initializeActionVars()

	// We don't display any dashboard/status/etc. info if there are no results, so when the page loads, they are hidden.
	// Since this .js file is only loaded if there are > 0 results, we switch from hide to show.
	$( "#spaceAroundDashboard" ).show()
	$( "#spaceAroundLinks" ).show()
	$( "#snapshotStatusCell" ).show()
	$( "#reviewStatusCell" ).show()
	$( "#priorityCell" ).show()

	var windowWidth = $( window ).width()

	$( "#dispDashboard" ).width( windowWidth - 30 )	// The -30 accounts for the left and right padding of 15px for the spaceAroundDashboard style
	$( "#dispDashboardProcessing" ).width( windowWidth - 50 )
	$( "#dispDashboardDecisions" ).width( windowWidth - 50 )

	$( "#dispStatuses" ).width( windowWidth - 30 )	// The -30 accounts for the left and right padding of 15px for the spaceAroundDashboard style
	$( "#dispLinks" ).width( windowWidth - 30 )	// The -30 accounts for the left and right padding of 15px for the spaceAroundDashboard style
	
	setDashboard()
} );



function detSearchXPos(obj)
{
	var xPos = 0;
	if (obj.parentNode != null)
	{
		xPos = obj.offsetLeft + detSearchXPos(obj.parentNode);
	}
	return xPos;
}

function detSearchYPos(obj)
{
	var yPos = 0;
	if (obj.parentNode != null)
	{
		yPos = obj.offsetTop + detSearchYPos(obj.parentNode);
	}
	return yPos;
}

function popupFilterResultsWindow()
{
	var d = $( "#dispFilterResultsDialog" )

	d.dialog( "open" )

	// Add a few pixels to the height and width as needed
	if ( $.browser.msie && ($.browser.version < 10 ) )
	{
	 	width = d.innerWidth()

		height = d.innerHeight()
						+ 24
	}
	else
	{
		width = window.document.getElementById( "dispFilterResultsTbl" ).offsetWidth
					+ 8

		height = window.document.getElementById( "dispFilterResultsTbl" ).offsetHeight
					+ 32
	}

	d.dialog( "option", "width", width );
	d.dialog( "option", "height", height );
	
	if ( navigator.appName != "Microsoft Internet Explorer" )
	{
		// Fudge for non-IE browsers
		d.dialog( "close" )
		d.dialog( "open" )
	}
}

function popupReviewDecisionWindowMulti()
{

	popupReviewDecision( 0, false, "" )

}


var reviewIdToUpdate

function popupReviewDecision( objId, bSingle, objName )
{
	var d = $( "#dispReviewDecisionDialog" )
	var applyToRadios = window.document.getElementsByName( "applyToReviewDecision" )
	var reviewDecisions = window.document.getElementsByName( "reviewDecision" )
	var reviewComment = window.document.getElementById( "reviewComment" )

	reviewIdToUpdate = objId
	objName = unescape( objName )

	d.dialog( "open" )

	if ( bSingle )
	{
		$( "#applyToReviewDialog" ).hide()
		var displayName = objName.length > 30 ?  objName.substr(0, 27) + "..." : objName
		$("#applyToReviewDialogSingle").find(".dispDlgTxt").html(displayName)
		$("#applyToReviewDialogSingle").find(".dispDlgTxt").attr("title", objName)
		$("#applyToReviewDialogSingle").show()
	}
	else
	{
		$("#applyToReviewDialogSingle").hide()
		if ( totalPages > 1 )
		{
			$( "#applyToReviewDialog" ).show()
		}
		else
		{
			$( "#applyToReviewDialog" ).hide()
		}
	}

	// Add a few pixels to the height and width as needed
	if ( $.browser.msie && ($.browser.version < 10 ) )
	{
	 	width = d.innerWidth()

		height = d.innerHeight()
						+ 24
	}
	else
	{
		width = window.document.getElementById( "dispReviewDecisionTbl" ).offsetWidth
					+ 8

		height = window.document.getElementById( "dispReviewDecisionTbl" ).offsetHeight
					+ 32
	}

	d.dialog( "option", "width", width );
	d.dialog( "option", "height", height );
	
	if ( navigator.appName != "Microsoft Internet Explorer" )
	{
		// Fudge for non-IE browsers
		d.dialog( "close" )
		d.dialog( "open" )
	}
	
	if ( totalPages == 1 )
	{
		// Set the Apply to: Checked items on the page.  This will be hidden, but is used for submitting the AJAX request.
		applyToRadios[0].checked = true
	}
	else
	{
		applyToRadios[0].checked = false
		applyToRadios[1].checked = false
	}
	
	if ( bSingle )
	{
		var reviewDecisionValue = window.document.getElementById( objId + "_reviewDecisionValue" ).value
		
		if ( reviewDecisionValue == "0" )
		{
			reviewDecisions[0].checked = true
		}
		else if ( reviewDecisionValue == "1" )
		{
			reviewDecisions[1].checked = true
		}
		else if ( reviewDecisionValue == "2" )
		{
			reviewDecisions[2].checked = true
		}
		else if ( reviewDecisionValue == "3" )
		{
			reviewDecisions[2].checked = true
		}
	}
	else
	{
		reviewDecisions[0].checked = false
		reviewDecisions[1].checked = false
		reviewDecisions[2].checked = false
	}

	reviewComment.value = ""
}

function updateReviewDecision()
{
	var d = $( "#dispReviewDecisionDialog" )
	var ok = true
	var objIdList = ""
	var ids
	var bSingle = false
	var decision
	var applyTo = "thisPage"

	var decision = window.document.getElementsByName( "reviewDecision" )
	var reviewComment = window.document.getElementById( "reviewComment" )

	if ( decision[0].checked )	
	{
		decision = "pending"
	}
	else if ( decision[1].checked )
	{
		decision = "approve"
	}
	else if ( decision[2].checked )
	{
		decision = "reject"
	}
	else
	{
		ok = false
		alert( LocString( "A review decision needs to be selected" ) )
	}
	
	if ( ok )
	{
		if ( reviewIdToUpdate == 0 )
		{
			objIdList = getCheckboxItems( true )	
		}
		else
		{
			objIdList = reviewIdToUpdate.toString()
			bSingle = true
		}

		if ( reviewIdToUpdate == 0 )
		{		
			var applyToRadios = window.document.getElementsByName( "applyToReviewDecision" )

			if ( applyToRadios[0].checked )
			{
				if ( objIdList == "" )	// Nothing on the page to update
				{
					ok = false
					alert( LocString( "There are no selected items on the page" ) )
				}
			}
			else if ( applyToRadios[1].checked )
			{
				applyTo = "allPages"
			}
			else
			{
				ok = false
			}
		}

		if ( ok )
		{
			d.dialog( "close" )	
			popup( LocString( "Processing..." ) ,"white");

			$.ajax(
			{
				type: 			"POST",
				async:			true, 
				url:			baseURL,
				contentType:	"application/x-www-form-urlencoded; charset=UTF-8", 
				data: 
				{
					func: 			"RecMan.UpdateResults", 
					whatToDo:		"changedecision",
					objIdList:		objIdList, 
					decision:		decision,
					reviewComment:	reviewComment.value, 
					dispNodeID:		containerId, 
					qDate:			window.document.getElementById('rm_qDate').value, 
					reviewerID:		window.document.getElementById('rm_reviewerID').value, 
					reviewerID2: 	window.document.getElementById('rm_reviewerID2').value, 
					applyTo:		applyTo, 
					bSingle:		bSingle
				},
				success: function( data )
				{
					killPopup()

					var checkVal = checkAjaxResponseError( data )

					if ( checkVal["ok"] )
					{
						// Success updating the database, so change the action display, action, and status, for the checked items on the page.
						var ids = objIdList.split( " " )
						var decision = window.document.getElementsByName( "reviewDecision" )
						var decisionStr
						var decisionVal
						var	decisionCls
						var reviewComment = Trim( window.document.getElementById("reviewComment").value )

						if ( decision[0].checked )	
						{
							decisionStr = LocString( "Pending" )
							decisionVal = 0
							decisionCls = ""
						}
						else if ( decision[1].checked )
						{
							decisionStr = LocString( "Approved" )
							decisionVal = 1
							decisionCls = "approvedTxt"
						}
						else if ( decision[2].checked )
						{
							decisionStr = LocString( "Rejected" )
							decisionVal = 2
							decisionCls = "rejectedTxt"
						}

						for ( var i = 0; i < ids.length; i++ )
						{
							if ( Trim( ids[ i ] ) != "" )
							{
								// Set the display text
								obj = $( "#" + ids[ i ]  + "_reviewDecision" )
								obj.text( decisionStr )
								obj.removeClass( "approvedTxt rejectedTxt" )
								obj.addClass( decisionCls )

								// Set the new hidden value (0, 1, 2) for the review decision
								window.document.getElementById( ids[ i ] + "_reviewDecisionValue" ).value = decisionVal

								// Update the core myRows reviewDecision value
								if (typeof myRows !== 'undefined') {
									var id_stage = ids[i].split("_")
									if (id_stage.length == 2) {
										var curID = id_stage[0];
										var stage = id_stage[1];
										if (curID.length > 0) {
											for (var j = 0; j < myRows.length; j++) {
												if (( myRows[j].dataId != curID ) || (myRows[j].StageCount != stage)) {
													continue;
												}
												myRows[j].reviewDecision = new String(decisionVal);
												break;
											}
										}
									}
								}								
								
								if ( $.trim(reviewComment) != ""  )
								{
									obj = $( "#" + ids[ i ]  + "_reviewIcon" )
									obj.show()
								}
							}
						}
					}
				}
			});
		}
	}
}

function filterResults()
{
	var d = $( "#dispFilterResultsDialog" )
	var frm = window.document.filterSearchResults
	var cont = true

	if ( (frm.searchName.value.lastIndexOf('*') != -1) || (frm.searchName.value.lastIndexOf('%') != -1) )
	{
		alert( LocString( "Search does not support wildcard characters" ) )
		frm.searchName.value = ""
		frm.searchName.focus()
		cont = false
	}

	if ( cont && ( (frm.searchRSI.value.lastIndexOf('*') != -1) || (frm.searchRSI.value.lastIndexOf('%') != -1) ) )
	{
		alert( LocString( "Search does not support wildcard characters" ) )
		frm.searchRSI.value = ""
		frm.searchRSI.focus()
		cont = false
	}

	if ( cont && ( (frm.searchFileNumber.value.lastIndexOf('*') != -1) || (frm.searchFileNumber.value.lastIndexOf('%') != -1) ) )
	{
		alert( LocString( "Search does not support wildcard characters" ) )
		frm.searchFileNumber.value = ""
		frm.searchFileNumber.focus()
		cont = false
	}

	if ( cont )
	{
		updateContentFilter( "searchName", frm.searchName.value )
		updateContentFilter( "searchRsi", frm.searchRSI.value )
		updateContentFilter( "searchFileNumber", frm.searchFileNumber.value )
		updateContentFilter( "searchCalcDateFrom", frm.searchCalcDateFrom.value )
		updateContentFilter( "searchCalcDateTo", frm.searchCalcDateTo.value )
		updateContentFilter( "searchReview", frm.searchReview.value )

		d.dialog( "close" )

		reloadPageX( 1, LocString( "Filtering Search Results" ) )
	}
}


function resetFilterResults()
{
	var frm = window.document.filterSearchResults
	
	frm.searchName.value = ""
	frm.searchRSI.value = ""
	frm.searchFileNumber.value = ""

	frm.searchCalcDateFrom.value = "?"
	frm.searchCalcDateFrom_day.value = "-1"
	frm.searchCalcDateFrom_month.value = "-1"
	frm.searchCalcDateFrom_year.value = "-1"
	
	frm.searchCalcDateTo.value = "?"
	frm.searchCalcDateTo_day.value = "-1"
	frm.searchCalcDateTo_month.value = "-1"
	frm.searchCalcDateTo_year.value = "-1"
}

function popupApplyAccessionWindow()
{
	var d = $( "#dispApplyAccessionDialog" )
	var applyToRadios = window.document.getElementsByName( "applyToRadioApplyAccession" )

	d.dialog( "open" )

	if ( totalPages > 1 )
	{
		$( "#dispApplyAccessionThisPage" ).show()
	}
	else
	{
		$( "#dispApplyAccessionThisPage" ).hide()
	}

	// Add a few pixels to the height and width as needed
	if ( $.browser.msie && ($.browser.version < 10 ) )
	{
	 	width = d.innerWidth()

		height = d.innerHeight()
						+ 8
	}
	else
	{
		width = window.document.getElementById( "dispApplyAccessionTbl" ).offsetWidth
					+ 8

		height = window.document.getElementById( "dispApplyAccessionTbl" ).offsetHeight
					+ 32
	}

	d.dialog( "option", "width", width );
	d.dialog( "option", "height", height );
	
	if ( navigator.appName != "Microsoft Internet Explorer" )
	{
		// Fudge for non-IE browsers
		d.dialog( "close" )
		d.dialog( "open" )
	}
	
	if( totalPages == 1 )
	{
		// Set the Apply to: Checked items on the page.  This will be hidden, but is used for submitting the AJAX request.
		applyToRadios[0].checked = true
	}
	else
	{
		applyToRadios[0].checked = false
		applyToRadios[1].checked = false
	}
	
	// Set the accession code to <None>
	window.document.applyAccession.accession.selectedIndex = 0
}


function popupDispositionPerformActionsWindow()
{
	var d = $( "#dispPerformActionsDialog" )
	var applyToRadios = window.document.getElementsByName( "applyToRadioPerformActions" )

	d.dialog( "open" )

	if ( totalPages > 1 )
	{
		$( "#dispPerformActionsThisPage" ).show()
	}
	else
	{
		$( "#dispPerformActionsThisPage" ).hide()
	}

	// Add a few pixels to the height and width as needed
	if ( $.browser.msie && ($.browser.version < 10 ) )
	{
	 	width = d.innerWidth()

		height = d.innerHeight()
						+ 26
	}
	else
	{
		width = window.document.getElementById( "dispPerformActionsTbl" ).offsetWidth

		height = window.document.getElementById( "dispPerformActionsTbl" ).offsetHeight
					+ 28
	}

	d.dialog( "option", "width", width );
	d.dialog( "option", "height", height );
	
	if ( navigator.appName != "Microsoft Internet Explorer" )
	{
		// Fudge for non-IE browsers
		d.dialog( "close" )
		d.dialog( "open" )
	}
	
	if( totalPages == 1 )
	{
		// Set the Apply to: Checked items on the page.  This will be hidden, but is used for submitting the AJAX request.
		applyToRadios[0].checked = true
	}
	else
	{
		applyToRadios[0].checked = false
		applyToRadios[1].checked = false
	}
}


function displayComments( obj )
{
	$.ajax(
	{
		type: 			"POST",
		async:			true, 
		url:			baseURL,
		data: 
		{
			func: 			"RecMan.UpdateResults", 
			whatToDo:		"displaycomments",
			objIdList:		obj, 
			dispNodeID:		containerId, 
			qDate:			window.document.getElementById('rm_qDate').value
		},
		success: function( data )
		{
			var d = $( "#dispDisplayCommentsDialog" )
			var row = document.getElementById( "dispDisplayComments" )
			var col
			var p
			var obj

			var bold
			var text
			var responseObj
			var elementsToRemove

			var checkVal = checkAjaxResponseError( data )

			if ( checkVal["ok"] )
			{
				responseObj = checkVal["responseObj"]

				numRows = responseObj.comments.length;

				elementsToRemove = row.getElementsByTagName( "TD" )

				// There should only be one TD, but loop through anyway, just in case.
				for ( var i=elementsToRemove.length-1; i>=0; i-- )
				{
					// Remove comments from previous Comments popups.
					row.removeChild(elementsToRemove[i])
				}

				col = document.createElement("TD")
				row.appendChild(col)

				for ( var i=0; i< numRows; i++ )
				{
					obj = responseObj.comments[i];

					// Need to unescape all of the string based values
					obj.datetime = refactorVariable( obj.datetime );
					obj.username = refactorVariable( obj.username );
					obj.comment = refactorVariable( obj.comment );

					p = document.createElement("P")
					// p.setAttribute("style", "margin-left:30px;text-indent:-30px;margin:0px 0px 0px 20px;")
					p.setAttribute("class", "dispCommentPara")
		//debugger
		//			p.style.marginleft = "30px"
		//			p.style.textindent = "-30px"
					col.appendChild(p)

					bold = document.createElement("B")
					text = document.createTextNode( obj.username )
					bold.appendChild(text)

					p.appendChild(bold)

					text = document.createTextNode( " (" + obj.datetime + "): " + obj.comment )
					p.appendChild(text)
				}

				d.dialog( "open" )
			}
		}
	});
}

function popupFinishReview()
{
	
	var d = $( "#dispFinishReviewDialog" )
	
	getFinishMessage()
	
	d.dialog( "open" )
	
	if ( $.browser.msie && ($.browser.version < 10 ) )
	{
		width = d.innerWidth()
		height = d.innerHeight()
		+ 26
	}
	else
	{
		width = window.document.getElementById( "dispFinishReviewTbl" ).offsetWidth
	
		height = window.document.getElementById( "dispFinishReviewTbl" ).offsetHeight
						+ 28
	}
	
	d.dialog( "option", "width", width );
	d.dialog( "option", "height", height );
		
	if ( navigator.appName != "Microsoft Internet Explorer" )
	{
		// Fudge for non-IE browsers
		
		d.dialog( "close" )
		d.dialog( "open" )
		
	}
}

function getFinishMessage()
{
	var ok = true	
	var applyTo = "allPages"
	var finishMessage

	$.ajax(
	{
		type: 			"POST",
		async:			true, 
		url:			baseURL,
		data: 
		{
			func: 			"RecMan.UpdateResults", 
			whatToDo:		"finishmessage",
			dispNodeID:		containerId, 
			qDate:			window.document.getElementById('rm_qDate').value, 
			reviewerID:		window.document.getElementById('rm_reviewerID').value, 
			reviewerID2: 	window.document.getElementById('rm_reviewerID2').value, 
			applyTo:		applyTo
		},
		success: function( data )
		{
			var responseObj
			var checkVal = checkAjaxResponseError( data )
					
			if ( checkVal["ok"] )
			{
				responseObj = checkVal["responseObj"]
					
				finishMessage = responseObj.finishMessage
				
				$( "#dispFinishMessage" ).text( finishMessage )
			}
		}
	});

}


function finishReview()
{
	var ok = true	
	var applyTo = "allPages"
	var d = $( "#dispFinishReviewDialog" )
	
	$( "#dispFinishMessage" ).text( "" )
	
	d.dialog( "close" )
	popup( LocString( "Processing..." ) ,"white");

	$.ajax(
	{
		type: 			"POST",
		async:			true, 
		url:			baseURL,
		data: 
		{
			func: 				"RecMan.UpdateResults", 
			whatToDo:			"finishreview",
			dispNodeID:			containerId, 
			qDate:				window.document.getElementById('rm_qDate').value, 
			reviewerID:			window.document.getElementById('rm_reviewerID').value, 
			reviewerID2: 		window.document.getElementById('rm_reviewerID2').value, 
			reviewStatusInt:	window.document.getElementById('rm_reviewStatusInt').value, 
			applyTo:			applyTo
		},
		success: function( data )
		{
			killPopup()
			window.location.reload(true)
		}
	});
}

function startSnapshotStatusUpdate()
{
	setTimeout( "getSnapshotStatusUpdate()", 30000 )	// 30 seconds
}

function getSnapshotStatusUpdate()
{
	$.ajax(
	{
		type: 			"GET",
		async:			true, 
		url:			baseURL,
		data: 
		{
			func: 				"RecMan.UpdateResults", 
			whatToDo:			"getsnapshotstatus",
			dispNodeID:			containerId, 
			qDate:				window.document.getElementById('rm_qDate').value, 
			reviewerID:			window.document.getElementById('rm_reviewerID').value, 
			reviewerID2:	 	window.document.getElementById('rm_reviewerID2').value ,
			reviewStatusInt:	window.document.getElementById('rm_reviewStatusInt').value
		},
		success: function( data )
		{
			var responseObj
			var checkVal = checkAjaxResponseError( data, true )	// second parameter = true to stop displaying of try/catch error when the browser session expires

			if ( checkVal["ok"] )
			{
				responseObj = checkVal["responseObj"]

				$( "#snapshotStatus" ).text( responseObj.snapshotStatus )
				$( "#reviewStatus" ).text( responseObj.reviewStatus )
				$( "#priority" ).text( responseObj.priority )
				
				// set hashtable for updating of dashboard
				dashboardInfo[ "actioned" ] = responseObj.dashboardActioned
				dashboardInfo[ "nonActioned" ] = responseObj.dashboardNonActioned
				dashboardInfo[ "approved" ] = responseObj.dashboardApproved
				dashboardInfo[ "rejected" ] = responseObj.dashboardRejected
				dashboardInfo[ "pending" ] = responseObj.dashboardPending

				dashboardInfo[ "actionedPercent" ] = responseObj.dashboardActionedPercent
				dashboardInfo[ "nonActionedPercent" ] = responseObj.dashboardNonActionedPercent
				dashboardInfo[ "approvedPercent" ] = responseObj.dashboardApprovedPercent
				dashboardInfo[ "rejectedPercent" ] = responseObj.dashboardRejectedPercent
				dashboardInfo[ "pendingPercent" ] = responseObj.dashboardPendingPercent

				if ( responseObj.bDisplayDestructionLog == "true" )
				{
					$( "#destructionLogLink" ).show()
				}
				else
				{
					$( "#destructionLogLink" ).hide()
				}

				if ( responseObj.bDisplayErrorLog == "true" )
				{
					$( "#errorLogLink" ).show()
				}
				else
				{
					$( "#errorLogLink" ).hide()
				}

				setDashboard()
				
				if ( responseObj.bForcePageRefreshWithMessage == "true" )
				{
					alert( LocString( "The Finish Review action has been performed by another reviewer. The snapshot page will refresh to reflect that the review is finished." ) )
					window.location.reload(true)
				}
			}
			setTimeout( "getSnapshotStatusUpdate()", 30000 )
		}
	});
}

function checkAjaxResponseError( responsetext, ignoreCatch )
{
	var responseObj = null
	var ok = true
	var checkVal = {}

	try
	{
		responseObj = eval( responsetext )
	}
	catch(e)
	{
		killPopup();
		
		if ( true !== ignoreCatch )
		{
			exceptionAlert( e, LocString( "The results could not be updated.  Are you logged in?" ) );
		}
		
		responseObj = null;
	}

	if ( null !== responseObj )
	{
		if ( responseObj.ok !== "true" )
		{
			ok = false
		
			if ( undefined !== responseObj.errMsg )
			{
				alert( responseObj.errMsg )
			}
		}
	}
	else
	{
		ok = false
	}
	
	checkVal["ok"] = ok
	checkVal["responseObj"] = responseObj
	
	return checkVal
}


// Call the function to set the hidden variables for disposition
setDispositionHiddenVars()

function setDispositionHiddenVars()
{
	// Get the elements containing the custom RM metadata
	var qDateElement = window.document.getElementById('rm_qDate')
	var reviewerIdElement = window.document.getElementById('rm_reviewerID')
	var reviewerIdElement2 = window.document.getElementById('rm_reviewerID2')

	// Add to the content filter so these values are appended to the paging URL
	updateContentFilter( "qDate", qDateElement.value )
	updateContentFilter( "reviewerID", reviewerIdElement.value )
	updateContentFilter( "reviewerID2", reviewerIdElement2.value )
}

function setDashboard()
{
	var percent

	percent = fmtPercent( dashboardInfo[ "actionedPercent" ], dashboardInfo[ "actioned" ] )
	setShowHide( "dispDashboardProcessingActioned", dashboardInfo[ "actionedPercent" ], dashboardInfo[ "actioned" ] )
	$( "#dispDashboardProcessingActionedPercentTxt" ).text( percent[ "text" ] )
	$( "#dispDashboardProcessingActioned" ).width( percent[ "width" ] )
	$( "#dispDashboardProcessingActionedCount" ).text( dashboardInfo[ "actioned" ] )
	resizeShortBar( "dispDashboardProcessingActioned" )

	percent = fmtPercent( dashboardInfo[ "nonActionedPercent" ], dashboardInfo[ "nonActioned" ] )
	setShowHide( "dispDashboardProcessingNotActioned", dashboardInfo[ "nonActionedPercent" ], dashboardInfo[ "nonActioned" ] )
	$( "#dispDashboardProcessingNotActionedPercentTxt" ).text( percent[ "text" ] )
	$( "#dispDashboardProcessingNotActioned" ).width( percent[ "width" ] )
	$( "#dispDashboardProcessingNotActionedCount" ).text( dashboardInfo[ "nonActioned" ] )
	resizeShortBar( "dispDashboardProcessingNotActioned" )

	percent = fmtPercent( dashboardInfo[ "approvedPercent" ], dashboardInfo[ "approved" ] )
	setShowHide( "dispDashboardDecisionsApproved", dashboardInfo[ "approvedPercent" ], dashboardInfo[ "approved" ] )
	$( "#dispDashboardDecisionsApprovedPercentTxt" ).text( percent[ "text" ] )
	$( "#dispDashboardDecisionsApproved" ).width( percent[ "width" ] )
	$( "#dispDashboardDecisionsApprovedCount" ).text( dashboardInfo[ "approved" ] )
	resizeShortBar( "dispDashboardDecisionsApproved" )

	percent = fmtPercent( dashboardInfo[ "rejectedPercent" ], dashboardInfo[ "rejected" ] )
	setShowHide( "dispDashboardDecisionsRejected", dashboardInfo[ "rejectedPercent" ], dashboardInfo[ "rejected" ] )
	$( "#dispDashboardDecisionsRejectedPercentTxt" ).text( percent[ "text" ] )
	$( "#dispDashboardDecisionsRejected" ).width( percent[ "width" ] )
	$( "#dispDashboardDecisionsRejectedCount" ).text( dashboardInfo[ "rejected" ] )
	resizeShortBar( "dispDashboardDecisionsRejected" )

	percent = fmtPercent( dashboardInfo[ "pendingPercent" ], dashboardInfo[ "pending" ] )
	setShowHide( "dispDashboardDecisionsPending", dashboardInfo[ "pendingPercent" ], dashboardInfo[ "pending" ] )
	$( "#dispDashboardDecisionsPendingPercentTxt" ).text( percent[ "text" ] )
	$( "#dispDashboardDecisionsPending" ).width( percent[ "width" ] )
	$( "#dispDashboardDecisionsPendingCount" ).text( dashboardInfo[ "pending" ] )
	resizeShortBar( "dispDashboardDecisionsPending" )
}

function fmtPercent( percent, count )
{
	var pcnt = {}
	var reduceWidth = .90	// the percentage of the whole width to reduce by, to account for 99 million items

	if ( percent == 0 && count == 0 )
	{
		pcnt[ "text" ] = ""
		pcnt[ "width" ] = "0px"
	}
	else if ( percent == 0 && count  > 0 )
	{
		pcnt[ "text" ] = ""
		pcnt[ "width" ] = "3px"
	}
	else
	{
		pcnt[ "text" ] =  percent + "%"
		pcnt[ "width" ] = percent * reduceWidth + "%"
	}
	
	return pcnt
}

function setShowHide( field, percent, count )
{
	if ( percent == "0" && count == 0 )
	{
		$( "#" + field ).hide()
	}
	else
	{
		$( "#" + field ).show()
	}
}

function resizeShortBar( field )	// non-IE browsers extend the text beyond the constaints of the element containing them, so this script makes the bar bigger.
{
	if ( $( "#" + field ).width() <= $( "#" + field + "PercentTxt" ).width() )
	{
		$( "#" + field ).width( $( "#" + field + "PercentTxt" ).width() + 10 )	// adding 10 pixels add a bit of padding at the end of the bar
	}
}

// Set the onPageLoad() function to be run on load of paged pages.  The loading of the first page
// is handled in the webnode's _BrowseGUIComponentsSubclass() script.
addFolderContentsCallback( onPageLoad )
