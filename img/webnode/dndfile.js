
var url;
var img;
var parentID;

var dndDocumentType = 144;
var enableAddVersion = true;
var doCompoundDocOrderingOverride = false;
var FILECREATE = 0;
var FILESKIPPED = 1;
var FILEADDVERSION = 2;
var maxFileSize = 100 * 1024 * 1024;
var maxFilesPerDrag = 500;
var noItemsUrl = "";
var wfMapDirtyDetection = false;
var debugDND = false;

var FA_FILE = 0;
var FA_NAME = 1;
var FA_ACTION = 2;
var FA_TOTALSIZE = 3;
var FA_LOADED = 4;
var FA_NODEID = 5;

function dnd_setnoitemsinbrowse( redirectUrl )
{
	// User is dragging into an empty container and we
	// have to reload the page once the DnD is complete so everything is updated
	noItemsUrl = redirectUrl;
}
function dnd_doCompoundDocOrderingOverride()
{
	doCompoundDocOrderingOverride = true;
}

//
// Enable worfklow map dirty detection
//
function dnd_doWFMapDirtyDetection()
{
	wfMapDirtyDetection = true;
}

function dnd_setup( url_in, img_in, parentID_in, docType_in, enableAddVersion_in, dragMaxFiles_in, dragMaxFileSize_in, dragEnableConsoleLogging_in )
{
	url = url_in;									// relative CS url
	img = img_in;									// relative support folder
	parentID = parentID_in;							// dataID of container
	dndDocumentType = docType_in;					// objType of document ( 144 )
	enableAddVersion = enableAddVersion_in;			// Specifies what to do when a files exists, skip or add a version
	maxFilesPerDrag = dragMaxFiles_in;				// The maximum number of files that can be drag and dropped in one go
	maxFileSize = dragMaxFileSize_in * 1024 * 1024;	// The maximum file size for a drag and dropped file.  In as MB converted to Bytes.
	debugDND = dragEnableConsoleLogging_in;
}

(function() {
	var 	totalUpload;
	var 	progresstotal;
    var 	resetTimer;
    var 	key;
    var 	i;
    var 	localarray;
	var 	items;
	var		fileListLength;
	var 	tokeninterval;
	var 	fileAssoc;
	var 	fileAssocKeys;
	var 	requestToken = "";
    var 	skippedSummaryArray = {};
    var 	skippedDetailsArray = {};
    var 	fileArray = {};
	var 	currentlydone = 0;
	var 	skipped = 0;
	var 	addversion = 0;
 	var 	progressLabel = $(".dnd_progresstotal-label");
	var 	progressbar = $("#dnd_progresstotal");
	var 	uploadAborted = false;

	//
	// In creating the dialog, we want to make sure of a couple of items
	// 1. the buttons are created in an array because we need to assign id's to them and the simple
	//    button handler doens't allow for this
	// 2. there are two sections, one the summary, two the details.  Only one are shown at a time.
	//
	function cleanupDialog()
	{
		if ( $("#dndSkippedItems") )
		{
			$("#dndSkippedItems").dialog( "close" );
		}
		$("#dndSkippedItemsDetails")
			.empty()
			.hide();
		$("#dndSkippedItemsSummary")
			.empty()
			.show();
		$("#button-summary").hide();
		$("#button-details").show();
		skippedSummaryArray = {};
		skippedDetailsArray = {};
		skipped = 0;
		currentlydone = 0;
	}
	
	//
	// Skipped Items Dialog
	// This dialog is displayed if an item was not uploaded/skipped for any reason
	// It displays a summary page and allows the user to click on a button to get
	// details.
	//
	var summaryButtonText = LocString('Summary', dndfileStr );
	var detailsButtonText = LocString('Details', dndfileStr );
	var okButtonText = LocString('OK', dndfileStr );
	
	$( "#dndSkippedItems" ).dialog({
		autoOpen: false,
		height: 300,
		width: 450,
		modal: true,
		open: function( event, ui ) {
			var dsis = $("#dndSkippedItemsSummary");
			var dsid = $("#dndSkippedItemsDetails");
			var detailcount = 0;
			var success = Math.max( ( totalUpload - skipped), 0 ) ;
			var locStr;
			
			
			if ( uploadAborted != true )
			{
				// Write out the summary of the results
				if ( success == 1 )
				{
					locStr = LocString('successful item', dndfileStr );
				}
				else
				{
					locStr = LocString('successful items', dndfileStr );
				}
				dsis.append( String.format( '<div id="dsis_success" class="dnd_listingtext">' + locStr + '</div>', success ) );

				for(var key in skippedSummaryArray)
				{
					locStr = LocString('items skipped', dndfileStr );
					dsis.append( String.format( '<div id="dsis_skipped" class="dnd_listingtext">' + locStr + '</div>', skippedSummaryArray[ key ], key ) );
				}

				// Write out the detailed information.
				success = Math.max( ( totalUpload - skipped - addversion ), 0 );
				if ( success > 0 )
				{
					if ( success == 1 )
					{
						locStr = LocString('item created', dndfileStr );
					}
					else
					{
						locStr = LocString('items created', dndfileStr );
					}
					dsid.append( String.format( '<div id="dsid_created" class="dnd_listheadingtext">' + locStr + '</div>', success ) );
				}
				
				if ( addversion > 0 )
				{
					if ( addversion == 1 )
					{
						locStr = LocString('version added', dndfileStr );
					}
					else
					{
						locStr = LocString('versions added', dndfileStr );
					}
					dsid.append( String.format( '<div id="dsid_addversion" class="dnd_listheadingtext">' + locStr + '</div>', addversion ) );
				}
			}
			else
			{
				// This is simply a upload failure of some kind.  No information available as to cause.
				dsis.append( '<div class="dnd_listingtext">' + LocString('Upload aborted', dndfileStr ) + '</div>' );
			}

			// List the skipped files by group
			for ( var key in skippedDetailsArray )
			{
				dsid.append( String.format( '<div id="dnd_listheadingtext%1" class="dnd_listheadingtext">%2</div>', detailcount, key ) );
				localarray = skippedDetailsArray[key];
				detailcount += 1;
				
				// The reason for skipping is grouped, iterate through each item in that group and list the file.
				for ( i=0; i<localarray.length; i++ )
				{
					dsid.append( String.format( '<div id="dnd_listingtext%1" class="dnd_listingtext">%2</div>', i, localarray[i] ) );
					detailcount += 1;
				}
			}


			// Add scroll bars if necessary
			if ( detailcount > 11 )
			{
				dsid.addClass( 'scroll' );
			}
			else
			{
				dsid.removeClass( 'scroll' );
			}
			dsis.show();
			dsid.hide();
		},
		buttons: [
			{
				id: "button-ok",
				text: okButtonText,
				click: function()
				{
					if ( ( totalUpload - skipped > 0 ) && ( uploadAborted != true ) )
					{
						// we actually uploaded a file and there was a count now
						// resort the detail view
						resortdetails();
					}
					cleanupDialog();
				}
			},
			{
				id: "button-details",
				text: detailsButtonText,
				click: function()
				{
					$("#dndSkippedItemsDetails").show();
					$("#dndSkippedItemsSummary").hide();
					$("#button-details").hide();
					$("#button-summary").show();
				}
			},
			{
				id: "button-summary",
				text: summaryButtonText,
				click: function()
				{
					$("#dndSkippedItemsDetails").hide();
					$("#dndSkippedItemsSummary").show();
					$("#button-details").show();
					$("#button-summary").hide();
				}
			}

		],
		close: function()
		{
			if ( ( totalUpload - skipped > 0 ) && ( uploadAborted != true ) )
			{
				// we actually uploaded a file and there was a count now
				// resort the detail view
				resortdetails();
			}
			cleanupDialog();
		}
	});

	//
	// Redisplay the browse page.  This can be a complete reload
	// or just a refresh of the browse window and facet panel
	//
	function resortdetails()
	{
		var msgStr;

		// If there are already items in the container no need to completely reload the page
		if ( noItemsUrl.length == 0 )
		{
			setSortColumn( '-modifydate' );
			msgStr = LocString('Sorting after upload', dndfileStr );
			
			// If there are multiple pages then we need to get page one
			getFolderContents( 1, msgStr );

			// need to reget the facet bar too
			if ( typeof FacetPanel != 'undefined' )
			{
				FacetPanel.getContents();
			}
		}
		else
		{
			location.reload();
		}

		// Set workflow map dirty in case detection is enabled
		if( wfMapDirtyDetection )
		{
			setMapDirty();
		}

		return false;
	}

	//
	// Update the Progress Bar
	//
	function updateProgress()
	{
		var currentsize = 0;
		var totalsize = 0;
		var pt = $("#dnd_progresstotal");


		if ( uploadAborted != true )
		{
			for ( var i = 0, fileItem; fileItem = fileArray[i]; i++ )
			{
				currentsize += fileItem[FA_LOADED];
				totalsize += fileItem[FA_TOTALSIZE];
			}
		}
		else
		{
			// this happens on a full abort, see IE10 support
			totalsize = 1;
			currentsize = 1;
		}

		if ( totalsize != 0 )
		{
			// Dont reset the total size if the value is 0 since it prematurely
			// trigger the status dialog.
			pt.progressbar({ max: totalsize });
		}
		pt.progressbar('value', currentsize);
	}

	//
	// Set how the progress bar behaves
	//
 	progressbar.progressbar(
 	{
 		value: currentlydone,
 		change: function()
 		{
 			if ( skipped == 0 )
 			{
 				progressLabel.text( String.format( LocString('n of m', dndfileStr ), currentlydone, totalUpload ) );
 			}
 			else
 			{
 				progressLabel.text( String.format( LocString('n x skipped of m', dndfileStr ), currentlydone, skipped, totalUpload ) );
 			}

			// by taking the mod 10 of the current done value or the skipped it reduces the skipping
 			if ( currentlydone%10 == 0 || skipped%10 == 0 )
 			{
 				progressLabel.position({
					of: progressbar
				});
			}
 		},
 		complete: function()
 		{
 			//
 			// now complete the upload remove the unload message
 			//
			window.onbeforeunload = null;
			if ( uploadAborted == true )
			{
				progressLabel.text( LocString('Upload aborted', dndfileStr ) );
			}
			else
			{
				if ( skipped == 0 )
				{
					locStr = LocString('n of m completed', dndfileStr )
					progressLabel.text( String.format( locStr, currentlydone, totalUpload ) );
				}
				else
				{
					locStr = LocString('n x skipped of m completed', dndfileStr )
					progressLabel.text( String.format( locStr, currentlydone, skipped, totalUpload ) );
				}
			}

			//
			// centre the text in the bar
			//
 			progressLabel.position({
				of: progressbar
			});

			clearInterval(tokeninterval);
 			if ( skipped > 0 )
 			{
				setTimeout(function() {
					progressbar.fadeOut("fast");
					resetHotZone();
					$( "#dndSkippedItems" ).dialog( "open" );
				}, 1500);
			}
			else
			{
				setTimeout(function() {
					progressbar.fadeOut();
					resetHotZone();
					if ( totalUpload - skipped > 0 )
					{
						// we actually uploaded a file and there was a count now
						// resort the detail view
						resortdetails();
					}
				}, 750);
			}
 		}
 	});
	
	function setUnloadWindow()
	{
		// If completed we no longer need to display a warning when closing the window.
		if ( currentlydone == totalUpload )
		{
			window.onbeforeunload = null;
		}
	}

	function UnloadWindowMsg()
	{
		return LocString('You are uploading files. If you leave the page this upload will not be completed.', dndfileStr );
	}

	//
	// Display the hotzone aka area to drag and drop in
	//
	function showHotZone()
	{
		var d;
		var dropWindowTargetText;

		var browseDetails = $("#browseTableDefn1");
		var dropWindowTarget = document.getElementById("dnd_dropWindowTarget");
		var locStrDragItemsHere = LocString('Drag items here to add them', dndfileStr );

		if ( dropWindowTarget == null )
		{
			d = document.createElement("div");
			$(d).addClass( "dnd_dropWindowTarget" )
				.attr( "id", "dnd_dropWindowTarget" )
				.appendTo( browseDetails )
				.height( browseDetails.height() -6 )
				.width( browseDetails.width() - 6)
				.offset( browseDetails.offset() );

			dropWindowTarget = $("#dnd_dropWindowTarget");
			d = document.createElement('div');
			$(d).addClass("dnd_dropWindowTargetText")
				.attr( "id", "dnd_dropWindowTargetText" )
				.html( locStrDragItemsHere )
				.appendTo( dropWindowTarget ) //main div
				.position({
					of: dropWindowTarget
				});
		}
		dropWindowTarget = $("#dnd_dropWindowTarget");

		if( !dropWindowTarget.is(':visible') )
		{
			dropWindowTarget.show()
				.height( browseDetails.height() -6 )
				.width( browseDetails.width() - 6)
				.offset( browseDetails.offset() );
		}
		dropWindowTargetText = $("#dnd_dropWindowTargetText");

		if( !dropWindowTargetText.is(':visible') )
		{
			dropWindowTargetText.show()
				.position({
						of: dropWindowTarget
				});
		}
	}

	function resetHotZone()
	{
		$('#dnd_dropWindowTarget').hide();
	}

	//
	// Add the file to the skipped file list
	//
	function addSkipped( file, msgType, reason )
	{
		if ( msgType == null )
		{
			msgType = LocString('Unknown', dndfileStr );
		}

		if ( skippedSummaryArray[ msgType ] == null )
		{
			skippedSummaryArray[ msgType ] = 1;
		}
		else
		{
			skippedSummaryArray[ msgType ] += 1;
		}

		if ( skippedDetailsArray[ msgType ] == null )
		{
			skippedDetailsArray[ msgType ] = [];
		}

		if (debugDND) {
			if ( file ) {
				console.log("Skipping '",file.name,"'. It has a file size of '",file.size,"' due to msgType='",msgType,"', reason='",reason,"'");
			} else {
				console.log("Skipping file. File name and size are undefined. msgType='",msgType,"', reason='",reason,"'");
			}
		}
		
		if ( file != null )
		{
			fileItem = fileAssoc[file.name];
			
			if ( fileItem != null )
			{
				fileItem[FA_LOADED] = 1;
				fileItem[FA_TOTALSIZE] = 1;
			}

			if ( ( reason == null ) || ( reason.length == 0 ) )
			{
				skippedDetailsArray[msgType][( skippedDetailsArray[msgType].length )] = file.name;
			}
			else
			{
				skippedDetailsArray[msgType][( skippedDetailsArray[msgType].length )] = file.name + " " + reason;
			}
			currentlydone = currentlydone + 1
		}
		else
		{
			skippedDetailsArray[msgType][( skippedDetailsArray[msgType].length )] = reason;
		}
		skipped = skipped + 1;
		updateProgress();
	}

	//
	// Take the list of items dragged and processes them
	//
	function FileSelectHandler(event)
	{
		var 	file;

		var 	orderingNextPos = 0;
		var 	totalsize = 0;
		var 	pt = $("#dnd_progresstotal");
		var 	dz_outer = $("#browseTableDefn1");

		$("#dnd_dropWindowTargetText").hide();

		// indicate we are loading files
		window.onbeforeunload = UnloadWindowMsg;

		// fetch FileList object
		if ( event.dataTransfer.items )
		{
			items = event.dataTransfer.items;
		}
		else if ( event.dataTransfer.files )
		{
			items = event.dataTransfer.files;
		}
		else if ( event.target.files )
		{
			items = event.target.files;
		}

		uploadAborted = false;
		currentlydone = 0;
		skipped = 0;
		addversion = 0;
		totalUpload = items.length;
		pt.progressbar('value', 0);
		pt.progressbar({ max: 1});
		pt.show();
		pt.position({
				of: dz_outer
		});
		cleanupDialog();
		fileArray = new Array();
		
		if ( items.length == 0 )
		{
			// This is really an issue on IE where the user has dragged a
			// set of items to be dropped and it includes a folder.  It will
			// provide a null set of files.
			progressLabel.text( LocString('Upload aborted', dndfileStr ) );
			uploadAborted = true;
			if ( Function('/*@cc_on return document.documentMode===10@*/' )())
			{
				addSkipped( null, LocString('Upload aborted', dndfileStr ), LocString('Items being uploaded included folders and IE does not support dragging of folders.  Drag only files and try again', dndfileStr ) );
				if (debugDND) {console.log("Upload aborted. The list of files dragged in was found to be empty. This is often caused by dragging and dropping a folder when using IE.");}
			}
			else
			{
				addSkipped( null, LocString('Upload aborted', dndfileStr ), LocString('Upload aborted: Unknown reason', dndfileStr ) );
				if (debugDND) {console.log("Upload aborted. The list of files dragged in was found to be empty.");}
			}
		}
		else if ( items.length > maxFilesPerDrag )
		{
			if (debugDND) {console.log("Upload aborted. The number of files dragged in '",items.length,"' is greater than the maximum '",maxFilesPerDrag,"' allowed.");}
			
			progressLabel.text( LocString('Upload aborted', dndfileStr ) );
			uploadAborted = true;
			addSkipped( null, LocString('Upload aborted', dndfileStr ), String.format( LocString('You have exceeded the maxium number of files that can be dragged in to Content Server ( 1 )', dndfileStr ), maxFilesPerDrag ) );
		}
		else
		{
			if ( items.length == 1 )
			{
				progressLabel.text( LocString('Upload started on the item...', dndfileStr ) );
			}
			else
			{
				progressLabel.text( String.format( LocString('Upload started on n items...', dndfileStr ), items.length ) );
			}
			progressLabel.position({
				of: progressbar
			});
		}

		// While there are still files to upload refresh the
		// token once per minute.  Until the infrastructure can respond
		// with failure about the request token timing out.
		GetRequestToken();
		tokeninterval = setInterval(function()
		{
			GetRequestToken();
		},60*1000);
	
		// If files are being dragged into a compound doc, get the start
		// of the ordering number.
		if ( doCompoundDocOrderingOverride )
		{
			var checkVal = GetOrderingNumberForCompoundDoc();
			
			if ( checkVal.ok == true )
			{
				orderingNextPos = checkVal.overrideNextPos;
			} 
			else
			{
				uploadAborted = true;
				addSkipped( null, LocString('Upload aborted', dndfileStr ), checkVal.errMsg, dndfileStr );
			}
		}
	
		fileListLength = 0;
		fileAssoc = new Array();
		fileAssocKeys = new Array();

		// Process all the items.  Check to see if the item being
		// dragged is a file if possible.  Folders are not currently supported.
		if ( uploadAborted != true )
		{
			for (var i = 0, item; item = items[i]; i++)
			{
				var isFile = true;
				
				// webkit allows us to check if the item being dragged is a file
				if ( item.webkitGetAsEntry )
				{
					// Check the kind, if it's available
					if ( item.kind ) 
					{
						if ( item.kind.toLowerCase() !== "file" )
						{	
							isFile = false;
						}
					}
					else
					{
						if ( ( item.webkitGetAsEntry() ) && ( item.webkitGetAsEntry().isFile ) )
						{
							isFile = item.webkitGetAsEntry().isFile;
						}
						else
						{
							isFile = false;
						}
					}
				}
				
				if ( item.getAsFile )
				{
					file = item.getAsFile();
				}
				else
				{
					file = item;
				}

				if ( ( isFile ) && file )
				{
					CheckForFileExistence(file);
					fileListLength += 1;
				}
				else
				{
					if (debugDND) {console.log("Skipping the file as it is not a document. File=", file);}
					
					addSkipped(file, LocString('Not Supported', dndfileStr ), LocString('Uploaded file is not a document', dndfileStr ) );
				}
			}

			var checkinterval = setInterval(function()
			{
				// Since we are sending all of the name checks asynchronously to the
				// server we need to make sure all of the file checks have been completed.
				if ( fileArray.length == fileListLength )
				{
					// We've checked all the files, clear the checking
					clearInterval(checkinterval);

					// fill in fileAssoc structure with the filename as a key.
					// This is because future progress updates of the upload itself from
					// xhr.upload.addEventListener("progress", function (event)...) 
					// only has the filename to reference it by.  no other way to get the data.
					for (var i = 0, fileItem; fileItem = fileArray[i]; i++)
					{
						totalsize += fileItem[FA_TOTALSIZE];
						fileAssoc[fileItem[FA_NAME]] = fileItem;
						fileAssocKeys[fileAssocKeys.length] = fileItem[FA_NAME];
					}
					
					pt.progressbar( { max: totalsize } );

					for ( var i = 0, fileItem; fileItem = fileArray[i]; i++ )
					{
						if ( fileItem[FA_ACTION] == FILECREATE )
						{
							CreateFiletoServer( fileItem[FA_FILE], fileItem[FA_NAME], orderingNextPos++ );
						}
						else if ( ( fileItem[FA_ACTION] == FILEADDVERSION ) && ( fileItem[FA_NODEID] != null ) )
						{
							AddVersionFiletoServer( fileItem[FA_FILE], fileItem[FA_NAME], fileItem[FA_NODEID] );
						}
						else
						{
							addSkipped( fileItem[FA_FILE], LocString('File exists', dndfileStr ) );
						}
					}
					updateProgress();
				}
			},100);
		}
	}

	//
	// This function is used to make an ajax request to CS to get the next
	// order number for a compound document.
	//
	function GetOrderingNumberForCompoundDoc()
	{
		var 	errMsg = "";
		var 	ok = true;
		var 	overrideNextPos = 1;
		

		$.ajax({
			type: "POST",
			async: false,
			cache: false,
			data: "func=ll.GetNextOrderingPosition&parentID=" + parentID + '&secureRequestToken=' + encodeURIComponent( requestToken ),
			success: function( checkVal )
			{
				if ( checkVal.ok == false )
				{
					ok = false;
					errMsg = checkVal.errMsg;
					if (debugDND) {console.log("Getting the next compound doc ordering number ( parentID='",parentID,"' ) returned an error:'",checkVal.errMsg,"'");}
				}
				else
				{
					overrideNextPos = checkVal.nextPos;
					if (debugDND) {console.log("Getting the next compound doc ordering number ( parentID='",parentID,"' ) returned successfully. The next position is '",checkVal.nextPos,"'");}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (debugDND) {console.log("Error getting the next compound doc ordering number ( parentID='",parentID,"' ). textStatus='",textStatus,"', errorThrown='",errorThrown,"'");}
			}
		});
		
		return {
			ok: ok,
			errMsg: errMsg,
			overrideNextPos: overrideNextPos
		};
	}

	//
	// Upload the file to Content Server using using create2 handler
	//
	function CreateFiletoServer( file, fileName, orderingNextPosition )
	{
		var 	reasonStr;
		var		jsonReturn;
		var 	labelStr;
		
		var 	xhr = new XMLHttpRequest();
		var 	theForm = new FormData();

		
		// until we can catch the max file size error from http
		// use the hard coded value.
		if ( xhr.upload && ( file.size <= maxFileSize ) )
		{
			// file received/failed
			xhr.onreadystatechange = function (event)
			{
				if (debugDND) {console.log("Uploading '",fileName,"' (size='",file.size," Bytes') via Create. Ready state has changed, xhr.readyState='",xhr.readyState,"', xhr.status='",xhr.status,"', xhr.statusText='",xhr.statusText,"', xhr.response='",xhr.response,"'");}
				
				// 4: request finished and response is ready
				if ( xhr.readyState == 4 )
				{
					// 200: "OK"
					if ( ( xhr.status == 200 ) && ( xhr.response.length > 0 ) )
					{
						jsonReturn = JSON.parse( xhr.response );
						if ( jsonReturn.ok == true )
						{
							currentlydone += 1;
							fileItem = fileAssoc[file.name];
							fileItem[FA_LOADED] = fileItem[FA_TOTALSIZE];
							updateProgress();

							if (debugDND) {console.log("Finished uploading '",fileName,"' (size='",file.size," Bytes') via create. xhr.readyState='",xhr.readyState,"', xhr.status='",xhr.status,"', xhr.statusText='",xhr.statusText,"', xhr.response='",xhr.response,"'");}
						}
						else
						{
							addSkipped( file, jsonReturn.errMsg.prefix, jsonReturn.errMsg.message );
							if (debugDND) {console.log("Finished uploading '",fileName,"' (size='",file.size," Bytes') via create with error(s). errMsg prefix='",jsonReturn.errMsg.prefix,"', errMsg.message='",jsonReturn.errMsg.message,"'");}
						}
					}
					else if ( xhr.status != 0 )
					{
						if (debugDND) {console.log("Finished uploading '",fileName,"' (size='",file.size," Bytes') via create with error(s). xhr.readyState='",xhr.readyState,"', xhr.status='",xhr.status,"', xhr.statusText='",xhr.statusText,"', xhr.response='",xhr.response,"'");}
						
						if ( ( this.statusText == null ) || ( this.statusText.length == 0 ) )
						{
            				addSkipped( file, LocString('Create Upload Error', dndfileStr ), LocString('Unknown error', dndfileStr ) + ' ' + xhr.status );
						}
						else
						{
							addSkipped( file, LocString('Create Upload Error', dndfileStr ), this.statusText + ': ' + xhr.status );
						}
					}
				}
				
			};
			xhr.onerror = function()
			{
				if (debugDND) {console.log("Error uploading '",fileName,"' (size='",file.size," Bytes') via create xhr.readyState='",xhr.readyState,"', xhr.status='",xhr.status,"', xhr.statusText='",xhr.statusText,"', xhr.response='",xhr.response,"'");}
				
				if ( ( this.responseText == null ) || ( this.responseText.length == 0 ) )
				{
					addSkipped( file, LocString('Generic Error', dndfileStr ), LocString('Not Supported', dndfileStr ) );
				}
				else
				{
					addSkipped( file, LocString('Generic Error', dndfileStr ), this.responseText );
				}
			};
			
			xhr.upload.addEventListener( "progress", function(event)
			{
				if ( event.lengthComputable && event.loaded < event.total )
				{
					fileItem = fileAssoc[file.name];
					fileItem[FA_LOADED] = parseInt( event.loaded );
					fileItem[FA_TOTALSIZE] = parseInt( event.total );
					updateProgress();
					if (debugDND) {console.log("Uploading '",fileName,"' (size='",file.size," Bytes') via Create. Progress update: '",event.loaded,"' of '",event.total,"' Bytes uploaded.");}
				}
			}, false );
			
			theForm.append("Func", "ll");
			theForm.append("objAction", "create2");
			theForm.append("parentId", parentID);
			theForm.append("versionFile", file);
			theForm.append("objType", dndDocumentType); // document type
			theForm.append("comment", "");
			theForm.append("json", true);
			theForm.append("name", fileName );
			theForm.append("secureRequestToken", requestToken);
			theForm.append("creationType", "dragndrop");
			
			if ( doCompoundDocOrderingOverride )
			{
				theForm.append("orderingOverride", orderingNextPosition);
			}
			
			if (debugDND) {console.log("Uploading '",fileName,"' (size='",file.size," Bytes') to '",url,"' for create");}
			
			xhr.open("POST", url, true);
			xhr.send(theForm);
			setUnloadWindow();
		}
		else
		{
			reasonStr = String.format( LocString('[file size: %1]', dndfileStr ), getBytesWithUnit(file.size, false, 2, true) );
			labelStr = String.format( LocString('Too big [ max size: %1]', dndfileStr ), getBytesWithUnit(maxFileSize, false, 2, true) );
			addSkipped( file, labelStr, reasonStr );
		}
	}

	//
	// Add a version of the file to CS since it already exists.
	//
	function AddVersionFiletoServer( file, fileName, nodeId )
	{
		var 	reasonStr;
		var 	labelStr;

		var 	xhr = new XMLHttpRequest();
		var 	theForm = new FormData();

		//
		// until we can catch the max file size error from http
		// use the hard coded value.
		//
		if ( xhr.upload && ( file.size <= maxFileSize ) )
		{
			// file received/failed
			xhr.onreadystatechange = function (event)
			{
				if (debugDND) {console.log("Uploading '",fileName,"' (size='",file.size," Bytes') via add version. Ready state has changed, xhr.readyState='",xhr.readyState,"', xhr.status='",xhr.status,"', xhr.statusText='",xhr.statusText,"', xhr.response='",xhr.response,"'");}
				
				if ( xhr.readyState == 4 )
				{
					if ( ( xhr.status == 200 ) && ( xhr.response.length > 0 ) )
					{
						jsonReturn = JSON.parse( xhr.response );
						if ( jsonReturn.ok == true )
						{
							currentlydone += 1;
							addversion += 1;
							fileItem = fileAssoc[file.name];
							fileItem[FA_LOADED] = fileItem[FA_TOTALSIZE];
							updateProgress();

							if (debugDND) {console.log("Finished uploading '",fileName,"' (size='",file.size," Bytes') via add version. xhr.readyState='",xhr.readyState,"', xhr.status='",xhr.status,"', xhr.statusText='",xhr.statusText,"', xhr.response='",xhr.response,"'");}
							
						}
						else
						{
							addSkipped( file, LocString('Add Version Upload Error', dndfileStr ), jsonReturn.errMsg );

							if (debugDND) {console.log("Upload of '",fileName,"' ( size='",file.size,"') via AddVersion is complete with error(s). errMsg prefix='",jsonReturn.errMsg.prefix,"', errMsg.message='",jsonReturn.errMsg.message,"'");}
							
						}
					}
					else if ( xhr.status != 0 )
					{
						if (debugDND) {console.log("Finished uploading '",fileName,"' (size='",file.size," Bytes') via add version with error(s). xhr.readyState='",xhr.readyState,"', xhr.status='",xhr.status,"', xhr.statusText='",xhr.statusText,"', xhr.response='",xhr.response,"'");}
						
						if ( ( this.statusText == null ) || ( this.statusText.length == 0 ) )
						{
            				addSkipped( file, LocString('Add Version Upload Error', dndfileStr ), LocString('Unknown error', dndfileStr ) + ' ' + xhr.status );
						}
						else
						{
							addSkipped( file, LocString('Add Version Upload Error', dndfileStr ), this.statusText + ': ' + xhr.status );
						}
					}
				}
			};
			xhr.onerror = function()
			{
				if (debugDND) {console.log("Error uploading '",fileName,"' (size='",file.size," Bytes') via add version xhr.readystate='",xhr.readyState,"', xhr.status='",xhr.status,"', xhr.statustext='",xhr.statusText,"', xhr.response='",xhr.response,"'");}
				
				if ( ( this.responseText == null ) || ( this.responseText.length == 0 ) )
				{
					addSkipped( file, LocString('Generic Error', dndfileStr ), LocString('Not Supported', dndfileStr ) );
				}
				else
				{
					addSkipped( file, LocString('Generic Error', dndfileStr ), this.responseText );
				}
			};

			xhr.upload.addEventListener( "progress", function(event)
			{
				if ( event.lengthComputable && ( event.loaded < event.total ) )
				{
					fileItem = fileAssoc[file.name];
					fileItem[FA_LOADED] = parseInt( event.loaded );
					fileItem[FA_TOTALSIZE] = parseInt( event.total );
					updateProgress();
					if (debugDND) {console.log("Uploading '",fileName,"' (size='",file.size," Bytes') via add version. Progress update: '",event.loaded,"' of '",event.total,"' Bytes uploaded.");}
				}
			}, false );
			
			theForm.append("Func", "doc.addversion2");
			theForm.append("NodeId", nodeId);
			theForm.append("versionFile", file);
			theForm.append("NextUrl", "");
			theForm.append("comment", "");
			theForm.append("json", true);
			theForm.append("name", fileName );
			theForm.append("secureRequestToken", requestToken );
			theForm.append("creationType", "dragndrop");
			
			if (debugDND) {console.log("Uploading '",fileName,"' (size='",file.size," Bytes') to '",url,"' for Version Add");}
			
			xhr.open("POST", url, true);
			xhr.send(theForm);
			setUnloadWindow();
		}
		else
		{
			reasonStr = String.format( '[file size: %1]', getBytesWithUnit(file.size, false, 2, true) );
			reasonStr = String.format( LocString('[file size: %1]', dndfileStr ), getBytesWithUnit(file.size, false, 2, true) );
			labelStr = String.format( LocString('Too big [ max size: %1]', dndfileStr ), getBytesWithUnit(maxFileSize, false, 2, true) );
			addSkipped( file, labelStr, reasonStr );
		}
	}

	//
	// This method checks to see if the file being uploaded already exists.
	// If it doesn't the file will be added to the create list, if it does
	// it will either be added to the addversion list or the skip list.
	//
	function CheckForFileExistence(droppedFile)
	{
		var 	nameListStr;
		var 	xhr;
		var		checkVal;

		var 	retval = true;
		var		nodeID = 0;

		nameListStr = '&name=' + encodeURIComponent( droppedFile.name );

		// Get the secure token
		nameListStr += '&secureRequestToken=' + encodeURIComponent( requestToken );

		// Get the object type and send that along
		nameListStr += '&objType=' + dndDocumentType;

		$.ajax({
			type: "POST",
			async: true,
			cache: false,
			data: "func=ll.CheckObjectNameExists&parentID=" + parentID + nameListStr ,
			success: function( checkVal )
			{
				// If the file exists but a nodeID is returned that means its a TypeDocument
				// and we can still add a version to it.
				if ( ( checkVal.ok == false ) && ( checkVal.nodeID == 0 ) )
				{
					retval = false;
					errMsg = checkVal.errMsg;
					if (debugDND) {console.log("Check for existence of '",droppedFile.name,"' and it returned with error '",errMsg,"'");}
				}
				else
				{
					nodeID = checkVal.nodeID;
					
					if (debugDND) {
						
						if (nodeID > 0) {
						
							console.log("Check for existence of '",droppedFile.name,"' and a document does exist in that container with the same name. nodeID='",checkVal.nodeID,"'");
						} else {
							console.log("Check for existence of '",droppedFile.name,"' and no document exists in that container with that name.");
						}
					}
				}

				if ( retval )
				{
					if ( nodeID == 0 )
					{
						// file does not exist, add it to the list of files to be sent to the server
						// fileArray[ FA_FILE, FA_NAME, FA_ACTION, FA_TOTALSIZE, FA_LOADED, FA_NODEID ]
						// -1 indicates for FA_NODEID indicates node does not exist.
						fileArray.push([ droppedFile, droppedFile.name, FILECREATE, droppedFile.size, 0, -1 ]);
					}
					else
					{
						if ( enableAddVersion )
						{
							// file already exists, mark it for add version
							// fileArray[ FA_FILE, FA_NAME, FA_ACTION, FA_TOTALSIZE, FA_LOADED, FA_NODEID ]
							fileArray.push([ droppedFile, droppedFile.name, FILEADDVERSION, droppedFile.size, 0, nodeID ]);
						}
						else
						{
							// file already exists, mark it for skipping
							// fileArray[ FA_FILE, FA_NAME, FA_ACTION, FA_TOTALSIZE, FA_LOADED, FA_NODEID ]
							// total size = 1 , total loaded also 1 so this action appears complete in progress bar
							fileArray.push([ droppedFile, droppedFile.name, FILESKIPPED, 1, 1, -1 ]);
						}
					}
				}
				else
				{
					// file already exists, mark it for skipping
					// fileArray[ FA_FILE, FA_NAME, FA_ACTION, FA_TOTALSIZE, FA_LOADED, FA_NODEID ]
					// total size = 1 , total loaded also 1 so this action appears complete in progress bar
					fileArray.push([ droppedFile, droppedFile.name, FILESKIPPED, 1, 1, -1 ]);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (debugDND) {console.log("The check for the existence of '",droppedFile.name,"' has failed, textStatus='",textStatus,"', errorThrown='",errorThrown,"'");}
			}
		});
	}

	//
	// Get a secure request token so we can create or add a version to CS
	//
	function GetRequestToken()
	{
		var 	xhr;

		var 	retval = true;

		$.ajax({
			type: "POST",
			async: false,
			cache: false,
			data: "func=ll.GetRequestToken" ,
			success: function( checkVal )
			{
				if ( checkVal.ok == false )
				{
					retval = false;
					errMsg = checkVal.errMsg;
					if (debugDND) {console.log("Getting Token returned with an error '",errMsg,"'");}
				}
				else
				{
					requestToken = checkVal.token;
					if (debugDND) {console.log("Getting Token succeeded");}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (debugDND) {console.log("GetRequestToken Error(s)='",textStatus,errorThrown,"'");}
			}
		});
	}

	//
	// Handle the drag and drop events.
	//
	function dragAndDropHandler(event)
	{
		var dataTransfer = event.dataTransfer;
		var srcElement = event.srcElement? event.srcElement : event.target;
		
		// Check to see if there are files in the drag and not just a folder
		if ($.inArray('Files', dataTransfer.types) > -1)
		{
			event.preventDefault();
			event.stopPropagation();

			if (event.type == "dragover")
			{
				if ( ( srcElement.id == "dnd_dropWindowTargetText" ) || ( srcElement.id == "dnd_dropWindowTarget") )
				{
					// Drag is over the hotzone, show the copy allowed mouse icon
					dataTransfer.dropEffect = 'copy';
					$('#dnd_dropWindowTarget').addClass('hover');					
				}
				else
				{
					// Drag is over the main window, display the no drop mouse icon and show the hotzone
					dataTransfer.dropEffect = 'none';
					$('#dnd_dropWindowTarget').removeClass('hover');
				}
				
				// Clear the timer from the dragleave event and prevent a resetHotZone
				if (resetTimer)
				{
					clearTimeout(resetTimer);
				}
				showHotZone();
			}
			else if (event.type == "dragleave")
			{
				// Reset the hotzone after 25 milliseconds.  This is so there is no flickering
				// when hovering in the dropWindowTarget area as there are underlying html elements 
				// also spawning events that can be ignored for DnD
				resetTimer = window.setTimeout(resetHotZone, 25);
			}
			else if (event.type == "drop")
			{
				// Only except drops in the target area.  Ignore all others.
				if ( ( srcElement.id == "dnd_dropWindowTargetText" ) || ( srcElement.id == "dnd_dropWindowTarget") )
				{
					FileSelectHandler(event);
				}
			}

		}
	}

	// call initialization file
	if ( window.File && window.FileList )
	{
		// is XHR2 available, if it is then drag and drop is possible
		var xhr = new XMLHttpRequest();
		
		if ( xhr.upload )
		{
			// If Drag and Drop features available add listeners for their events.
			window.addEventListener("dragleave", dragAndDropHandler, false);
			window.addEventListener("dragover", dragAndDropHandler, false);
			window.addEventListener("drop", dragAndDropHandler, false);
			$("#dnd_progresstotal").addClass("otcolor");
		}
	}
	else
	{
		$("#dnd_progresstotal").hide();
	}
	// http://bateru.com/news/2012/03/code-of-the-day-converts-bytes-to-unit/

	// function: getBytesWithUnit
	// input: bytes (number)
	// input: useSI (boolean), if true then uses SI standard (1KB = 1000bytes), otherwise uses IEC (1KiB = 1024 bytes)
	// input: precision (number), sets the maximum length of decimal places.
	// input: useSISuffix (boolean), if true forces the suffix to be in SI standard. Useful if you want 1KB = 1024 bytes
	// returns (string), represents bytes is the most simplified form.
	var getBytesWithUnit = function (bytes, useSI, precision, useSISuffix) {
		"use strict";
		if (!(!isNaN(bytes) && +bytes > -1 && isFinite(bytes))) {
			return false;
		}
		var units, obj,	amountOfUnits, unitSelected, suffix;
		units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		obj = {
			base : useSI ? 10 : 2,
			unitDegreeDiff : useSI ? 3 : 10
		};
		amountOfUnits = Math.max(0, Math.floor(Math.round(Math.log(+bytes) / Math.log(obj.base) * 1e6) / 1e6));
		unitSelected = Math.floor(amountOfUnits / obj.unitDegreeDiff);
		unitSelected = units.length > unitSelected ? unitSelected : units.length - 1;
		suffix = (useSI || useSISuffix) ? units[unitSelected] : units[unitSelected].replace('B', 'iB');
		bytes = +bytes / Math.pow(obj.base, obj.unitDegreeDiff * unitSelected);
		precision = precision || 3;
		if (bytes.toString().length > bytes.toFixed(precision).toString().length) {
			bytes = bytes.toFixed(precision);
		}
		return bytes + " " + suffix;
	};
})();
