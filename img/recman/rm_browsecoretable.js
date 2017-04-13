	//
	// Some global variables
	//
	var myRows;
	var myTypes;

	var allChecked = false;
	var baseUrl = "";
	var changeSort = true;
	var containerId = "";
	var currentPageNum = 1;
	var currentViewType = "3";
	var cookiePath = "";
	var columnDefinitionArray = undefined;
	var defaultPage = 1;
	var divSeg = 0;
	// RM changes start
	//var doSort = true;
	//RM changes end
	var editingRow = -1;
	var filterValue = "";
	var flashTableRefresh = false;
	var haveBigImages = false;
	var hideContainerSize = false;
	var imgSrc = "";
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
	var totalPages = -1;
	var totalCount = 0;
	var smallestPageSize = 25;

	// RM changes start
	var cacheId = 0;
	var myRowLength = 0;
	var pageFormName = "";
	// RM chagnes end
	
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
	// RM change start
	/*
	try
	{
		if ( browsecorermenuExists === null )
		{
			throw ""
		}
	}
	catch( e )
	{
	    exceptionAlert( e, "Missing needed JavaScript: webnode/browsecorermenu.js" );
	}
	*/
	// RM Change end
	
	//--------------------------------------------------------------------------------------------
	// Add some handlers for  some events on the page.  Dont override existing ones

	// initialize ourselves when the page is finished loading
	OTaddLoadEvent( browseCoreInitialize );
	OTaddLoadEvent( drawBottomMultiButton );
	OTaddResizeEvent( buildTableBigImageResize );

	//--------------------------------------------------------------------------------------------
	// Routines to set up the page history
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
			dhtmlHistory.addListener( handleHistoryEvent);
			log( "done history", false );

			onInitOnlyatomic = true;
			historyStorage.put("DhtmlHistory_page1", addPageToHistory( false ) );
			onInitOnlyatomic = false;
		}
	}

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

	function addPageToHistory( saveToHistory )
	{
		var key;

		var currentPageObj = new Object();

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
		return 	currentPageObj;
	}

	// Utility function that will take the various param
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

	function makeurl()
	{
		var url = baseUrl + "?func=ll&objAction=page&objID=" + containerId + "&page=" + currentPageNum + "&sort=" + sortColumn;

		// add on the optional pieces
		if ( "" !== filterValue )
		{
			url = url + "&filterValue=" + encodeURIComponent( filterValue );
		}

		if ( "" !== objFilter )
		{
			url = url + "&objFilter=" + objFilter;
		}

		return url;
	}

	// Utility function that will take the various param
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
	// utiltiy functions to set intitial data points
	//
	function setMultiSelectButtons( noMSB )
	{
		noMultiSelectButtons = noMSB;

		// go and flip the
		checkboxColumn.SetIsEnabled( !noMultiSelectButtons );
	}
	function setNextURL( nextUrlStr )
	{
		nextUrl = nextUrlStr;
	}

	function setCurrentViewType( viewType )
	{
		currentViewType = viewType;
	}

	function setContainerId( dataId )
	{
		containerId = dataId;
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
	
	// RM changes start	
	function setTotalPages( tPages )
	{

		totalPages = tPages;
	}

	function setCacheId(id)
	{
		cacheId = id;
	}
	
	function setMyRowLength( theLength )
	{
		myRowLength = theLength;
	}

	function setTotalCount(theTotalCount)
	{
		totalCount = theTotalCount;
	}

	function setRequestUrl( reqUrl )
	{
		requestUrl = reqUrl;
	}

	function setPageFormName(formName)
	{
		pageFormName = formName	
	}
	// RM changes end

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
			// eval the string block into an array list
			localPageDropdownList = eval( pageDropdownList );

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
			exceptionAlert( e, "Error: browsecoretable.js/setPageDropDownValues.  Corrupt data in generating list pull down. " );
		}
	}

	function setBrowseColumnDefinition( browseColumnDefinitionList )
	{

		var localBrowseColumnDefinitionList;

		try
		{
			localBrowseColumnDefinitionList = eval( browseColumnDefinitionList );

			if ( undefined === columnDefinitionArray )
			{
				columnDefinitionArray = new Array();

				for ( i = 0; i < localBrowseColumnDefinitionList.length; i++ )
				{
						columnDefinitionArray[i] = eval( localBrowseColumnDefinitionList[i] );
				}
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Error: browsecoretable.js/setBrowseColumnDefinition.  Corrupt or missing data in generating column definitions." );
		}
	}

	//--------------------------------------------------------------------------------------------
	// This section deals with the page number pick
	function ChangeBrowsePageObjectFilter( val, val2  )
	{
		// Need to set the page back to 1
		setCurrentPage( 1 );

		// Set the type value
		objFilter = val2;

		// actually change the selected menu choice
		document.getElementById('selectedBrowsePageObjectFilter').innerHTML = document.getElementById('BrowsePageObjectFilter' + val + 'DivId').innerHTML;

		getFilterEditCellContent( false );

		getFolderContents( currentPageNum, LocString( "Searching..." ), folderContentsSort );
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

		getFolderContents( defaultPage, String.formatLoc( "Retrieving page n", defaultPage ), folderContentsSort );

	}

	function restoreSortOrder()
	{
		var 	colObject ;
		
		var	doReverse = false;
		var 	col = sortColumn;
		
		
		if( sortColumn.charAt( 0 ) === '-' )
		{
			doReverse = true;
			col = sortColumn.substring( 1 )
		}			
		
		for ( idx = 0; idx < columnDefinitionArray.length ; idx++ )
		{

			if( columnDefinitionArray[ idx ].GetColName() == col )
			{
				colObject = columnDefinitionArray[ idx ];
				myRows.sort( colObject.SortComparitor ) ;	

			}

		}

		if( doReverse == true )  
		{
			var a =  myRows
			myRows.reverse();
		}

		buildTable();

	}
	
	function setConfigUrl( Size )
	{

		var editConfiglink = document.getElementById( "ConfigLink" );

		if( null !== editConfiglink )
		{
			writeOnceUrl( editConfiglink.href );

			editConfiglink.href =  mUrl;
		}
	}

	function writeOnceUrl( url )
	{
		if ( mUrl.length  < 1 )
		{
			mUrl =  url ;
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

	// object constructor
	function tableRow( dataId, subTypeStr, nameStr, linkStr, sizeStr, dateStr, dateReal, imgStr )
	{
		var lowerName = unescape( nameStr.toLowerCase() );

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
	// column object definitions.  To be instantiated and used to define columns in the detail view

	//
	// BrowseViewColumn is essentially a superclass for:
	// - checkBoxColumn
	// - typeColumn
	// - nameWthPrmtdCmdsColumn  ("name with promoted commands column")
	// - sizeColumn
	// - dateColumn
	// - arbitraryColumn
	// - columnWithURL
	// - userColumnWithURL
		
	function BrowseViewColumn()
	{
		OTAddProperty( this, "boolean", "isEnabled", true );
		OTAddProperty( this, "boolean", "sort", false );
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

	BrowseViewColumn.prototype.getCellValue = function( dataRow, rowNo )
	{
		return "-0-";
	};

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
			exceptionAlert( e, "Issue occured in browsecoretable.js/BrowseViewColumn.SetHeaderParams." );
		}
	};

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

	BrowseViewColumn.prototype.DataConversion = function( obj )
	{
		// The regular columns do not need this
	};

	BrowseViewColumn.prototype.AddCellHeader = function( rowStruct, contents, cellCount )
	{
		var 	cell;
		var 	newLink;
		var 	linkText;

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

				linkText = document.createTextNode( this.headerName );

				if ( true === this.sort )
				{
					newLink = document.createElement('a');
					newLink.appendChild( linkText );
					linkText = 'javascript:sortTableCol( true, "' + this.identifier + '" )';
					newLink.setAttribute('href', linkText );
					cell.appendChild( newLink );
					cell.innerHTML += SortIndicatorGet( this.colName );
				}
				else
				{
					cell.appendChild( linkText );
				}
			}

		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/BrowseViewColumn.AddCellHeader." );
		}
		return cellCount;
	};

    BrowseViewColumn.prototype.AddCell = function( rowStruct, dataRow, cellCount, rowNo )
	{
		var cell;

		try
		{
			if ( true === this.isEnabled )
			{
				// The type icon with the status
				cell = rowStruct.insertCell( cellCount++ );
				cell.className = this.cellClassName;
				cell.width = this.cellWidth;
				if ( this.colSpan > 1 )
				{
					cell.colSpan = this.colSpan;
				}

				if ( true === this.nowrap )
				{
					cell.style.whiteSpace = 'nowrap';
				}
				cell.innerHTML = this.getCellValue( dataRow, rowNo );
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/BrowseViewColumn.AddCell." );
		}
		return cellCount;
	};

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
			exceptionAlert( e, "Issue occured in browsecoretable.js/BrowseViewColumn.SortComparitor." );
		}
	    return 0;
	};

	BrowseViewColumn.prototype.sortTableCol = function ( headerClick )
	{

		var 	msgStr;

		var negColName = "-" + this.colName;

		try
		{
			if ( true === this.isEnabled )
			{
				if ( true === this.sort )
				{
					if ( changeSort )
					{
						sortColumn = ( sortColumn !== this.colName ) ? this.colName : negColName;
					}

					if ( headerClick && totalPages > 1 )
					{
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
					else
					{
						myRows.sort( this.SortComparitor );

						// if sorting descending then reverse the array
						if ( sortColumn === negColName )
						{
							myRows.reverse();
						}

						// output the table
						buildTable();
					}
				}
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/BrowseViewColumn.sortTableCol." );
		}
	};

	//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	//- - - - - - checkbox column - - - - - - -

	var checkboxColumn = new BrowseViewColumn( "checkboxColumn" );

	checkboxColumn.getCellValue = function( dataRow, rowNo )
	{
		return makeSmallIconLink( dataRow );
	};

	checkboxColumn.SetHeaderParams( "", "browseListHeaderCheck" );
	checkboxColumn.SetCellParams( "browseItemCheck" );
	checkboxColumn.SetCellWidth( "1%" );
	checkboxColumn.SetIsEnabled( !noMultiSelectButtons );
	checkboxColumn.AddCellHeader = function( rowStruct, contents, cellCount )
	{
		var 	cell;
		var 	newLink;
		var 	linkText;

		var 	isChecked = "";

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
				cell.innerHTML = "<input type='checkbox' name='top_checkbox' value='checkbox' title='" + LocString('SelectDeselectAll') + "' onClick='ToggleAll( this, \"nodeID\" );' isChecked >";
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/BrowseViewColumn.AddCellHeader." );
		}
		return cellCount;
	};

    checkboxColumn.getCellValue = function( dataRow, rowNo )
	{
		var 	innerHTMLStr;
		var 	isChecked = '';

		if ( dataRow.checked )
		{
			isChecked = "checked";
		}

		innerHTMLStr = "<INPUT TYPE='checkbox' NAME='nodeID' VALUE='" + dataRow.dataId +"' TITLE='";
		innerHTMLStr += LocString( "SelectDeselect" );
		innerHTMLStr += "' ONCLICK='javascript:Toggle( \"top_checkbox\", this, \"nodeID\" );' " + isChecked + " >";

		return innerHTMLStr;
	};

	//- - - - - - type icon column - - - - - - -
	var typeColumn = new BrowseViewColumn( "typeColumn" );

	typeColumn.SortComparitor = function(a, b)
	{
	    if (a.typesort < b.typesort) {return -1;}
	    if (a.typesort > b.typesort) {return 1;}
	    return 0;
	};

	typeColumn.getCellValue = function( dataRow, rowNo )
	{
		return makeSmallIconLink( dataRow );
	};

	typeColumn.SetHeaderParams( LocString( "Type" ) );
	typeColumn.SetCellParams( "browseItemTypeRight" );
	typeColumn.SetSort( true );
	typeColumn.SetColName( "type" );
	typeColumn.SetCellWidth( "1%" );

	//- - - - - - name and promoted commands column - - - - - - -
	var nameWthPrmtdCmdsColumn = new BrowseViewColumn( "nameWthPrmtdCmdsColumn" );

	nameWthPrmtdCmdsColumn.SortComparitor = function(a, b)
	{
	    return a.namesort.localeCompare(b.namesort);
	};

	nameWthPrmtdCmdsColumn.getCellValue = function( dataRow, rowNo )
	{
		return makeRowNameCell( dataRow, rowNo );
	};

	nameWthPrmtdCmdsColumn.SetHeaderParams( LocString( "Name" ), "browseListHeaderName" );
	nameWthPrmtdCmdsColumn.SetCellParams( "browseItemName" );
	nameWthPrmtdCmdsColumn.SetSort( true );
	nameWthPrmtdCmdsColumn.SetColName( "name" );
	nameWthPrmtdCmdsColumn.SetCellWidth( "70%" );
	nameWthPrmtdCmdsColumn.SetHeaderSpan( "2" );
	nameWthPrmtdCmdsColumn.SetNowrap( false );

    nameWthPrmtdCmdsColumn.AddCell = function( rowStruct, dataRow, cellCount, rowNo )
	{
		var cell;

		try
		{
			// The type icon with the status
			cell = rowStruct.insertCell( cellCount++ );
			cell.className = this.cellClassName;
			cell.width = this.cellWidth;
			if ( this.colSpan > 1 )
			{
				cell.colSpan = this.colSpan;
			}

			if ( true === this.nowrap )
			{
				cell.style.whiteSpace = 'nowrap';
			}
			cell.innerHTML = this.getCellValue( dataRow, rowNo );

			// The type icon with the status
			cell = rowStruct.insertCell( cellCount++ );
			cell.className = "promotedCmds";

			if ( true === this.nowrap )
			{
				cell.style.whiteSpace = 'nowrap';
			}
			cell.innerHTML =  dataRow.promotedCmds;
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/nameWthPrmtdCmdsColumn.AddCell." );
		}
		return cellCount;
	};

	//- - - - - - size column - - - - - - -
	var sizeColumn = new BrowseViewColumn( "sizeColumn" );
	sizeColumn.SortComparitor = function(a, b)
	{
	    if (a.sizesort < b.sizesort) {return -1;}
	    if (a.sizesort > b.sizesort) {return 1;}
	    return 0;
	};

	sizeColumn.getCellValue = function( dataRow, rowNo )
	{
		return dataRow.size + '&nbsp;';
	};

	sizeColumn.SetHeaderParams( LocString( "Size" ), "browseListHeaderSize" );
	sizeColumn.SetCellParams( "browseItemSize" );
	sizeColumn.SetSort( true );
	sizeColumn.SetColName( "size" );
	sizeColumn.SetCellWidth( "10%" );

	//- - - - - - date column - - - - - - -
	var dateColumn = new BrowseViewColumn( "dateColumn" );
	dateColumn.SortComparitor = function(a, b)
	{
	    if (a.datesort < b.datesort) {return -1;}
	    if (a.datesort > b.datesort) {return 1;}
	    return 0;
	};

	dateColumn.getCellValue = function( dataRow, rowNo )
	{
		return dataRow.date + '&nbsp;';
	};

	dateColumn.SetHeaderParams( LocString( "Modified" ), "browseListHeaderDate" );
	dateColumn.SetCellParams( "browseItemDate" );
	dateColumn.SetSort( true );
	dateColumn.SetColName( "date" );
	dateColumn.SetCellWidth( "30%" );
	dateColumn.SetSortMessage( "Sorting by date..." );

	//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	function DataStringToVariables( inStringData )
	{
		return;
	}

	// This function will check the existance of the
	// incoming data and if it is null then set the
	// return to an empty string.  This will allow
	// the rest of code to work properly while the server
	// doesn't need to send unneeded data across the wire.
	function refactorVariable( inValue )
	{
		if ( undefined !== inValue )
		{
			return decodeURIComponent( inValue );
		}

		return "";
	}

	// This function will check the boolean value and if it is true will return
	// that.  But if is other then a false value will be returned.
	function setBooleanValue( inValue )
	{
		if ( 'true' === inValue )
		{
			return true;
		}

		return false;
	}

	// RM changes start
	/*
	function setDoSort( bDoSort )
	{
		doSort = bDoSort;
	}
	*/
	// RM changes end
	
	function setImgSrc ( imgSrcStr )
	{
		imgSrc = imgSrcStr;
	}

	function setBaseUrl ( baseUrlStr )
	{
		baseUrl  = baseUrlStr;
	}

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

	function makeRowNameCell( thisRow, rowNo )
	{
		// put out the link with the name

		var outputStr = "";

		outputStr += "	  <div id='cell" + rowNo + "'>";

		if ( thisRow.link.length > 0 )
		{
			outputStr += "<A href=\"" + thisRow.link + getOptionalParams( thisRow ) + "\">" + thisRow.name + "</a> " + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
		}
		else
		{
 			outputStr += thisRow.name + "&nbsp;" + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
		}

		outputStr += "</div>";

		return outputStr;
	}

	function makeSmallIconLink( thisRow )
	{
		var outputStr = "";

		if ( 0 !== thisRow.imgStatus.length )
		{
			// Only put out information for the object iff
			// the img status is not empty.  If this is not
			// the case then we put out a nbsp
			if ( 0 < thisRow.link.length )
			{
				outputStr += "		<A href=\"" + thisRow.link + getOptionalParams( thisRow ) + "\">";
				outputStr += "			<IMG SRC='"+ thisRow.imgStatus + "' WIDTH='8' HEIGHT='8' BORDER='0' ALT='"+ thisRow.statusName + "'><IMG SRC='"+ thisRow.imgStr + "' WIDTH='16' HEIGHT='16' BORDER='0' ALT='"+ thisRow.typeName + "'>";
				outputStr += "		</A>";
			}
			else
			{
				outputStr += "&nbsp;<IMG SRC='"+ thisRow.imgStatus + "' WIDTH='8' HEIGHT='8' BORDER='0' ALT='"+ thisRow.statusName + "'><IMG SRC='"+ thisRow.imgStr + "' WIDTH='16' HEIGHT='16' BORDER='0' ALT='"+ thisRow.typeName + "'>";
			}
		}
		else
		{
			outputStr += "&nbsp;";
		}

		return outputStr;
	}

	function makeLargeIconLink( thisRow )
	{
		var outputStr = "";
		var lrgImgStr = "";
		var size = 32;

		if ( 0 !== thisRow.imgStatus.length )
		{
			// Only put out information for the object iff
			// the img status is not empty.  If this is not
			// the case then we put out a nbsp
			if ( ( ( "" !== thisRow.imgRealLargeStr ) && renderBigImages ) || ( thisRow.imgRealLargeStr === thisRow.imgLargeStr ))
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
				outputStr += "			<IMG SRC='"+ thisRow.imgStatus + "' WIDTH='8' HEIGHT='8' BORDER='0' ALT='"+ thisRow.statusName + "'><IMG SRC='"+ lrgImgStr + "' WIDTH='" + size + "' HEIGHT='" + size + "' BORDER='0' ALT='"+ thisRow.typeName + "'>";
				outputStr += "		</A>";
			}
			else
			{
				outputStr += "&nbsp;<IMG SRC='"+ thisRow.imgStatus + "' WIDTH='8' HEIGHT='8' BORDER='0' ALT='"+ thisRow.statusName + "'><IMG SRC='"+ lrgImgStr + "' WIDTH='" + size + "' HEIGHT='" + size + "' BORDER='0' ALT='"+ thisRow.typeName + "'>";
			}
		}
		else
		{
			outputStr += "&nbsp;";
		}

		return outputStr;
	}

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
					theCell.innerHTML = "<A href='" + thisRow.link + getOptionalParams( thisRow ) + "'>" + thisRow.name + "</a> " + fn_MenuStr( 'cat2', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
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
			exceptionAlert( e, "Issue occured in browsecoretable.js/buildTable.  An issue has occured in the creating the browse table." );
		}
	}

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

			theDiv = document.getElementById('MultiOperationBar1');
			theTopRow = document.getElementById('MultiOperationBar1Row');
			theBottomRow = document.getElementById("MultiOperationBar1RowBottom");

			if ( '1' === currentViewType )
			{
				if ( noMultiSelectButtons || ( bcMultiButtonArray.length === 0 ) )
				{
					theTopRow.style.display = 'none';
					if ( null !== theBottomRow )
					{
						theBottomRow.style.display = 'none';
					}
				}
				else
				{
					// Show the multi operation bar
					theDiv.style.display = 'block';
					theTopRow.style.display = '';

					if ( null !== theBottomRow )
					{
						theBottomRow.style.display = '';
					}

					theDiv = document.getElementById('ViewTextLabel');

					if ( null !== theDiv )
					{
						theDiv.innerHTML = LocString( "Detail View" );
					}

					theDiv = document.getElementsByName('ViewType');
				}

				theDiv.value = currentViewType;
				theViewIconName = "BV_ViewDetailIcon";
			}
			else if ( '2' === currentViewType )
			{
				// Hide the multi operation bar and set the header bar to the
				// correct label
				theTopRow.style.display = 'none';
				theDiv.style.display = 'none';

				if ( null !== theBottomRow )
				{
					theBottomRow.style.display = 'none';
				}

				theDiv = document.getElementById('ViewTextLabel');

				if ( null !== theDiv  )
				{
					theDiv.innerHTML = LocString( "Large Icon View" );
				}

				theDiv=document.getElementsByName('ViewType');
				theDiv.value = currentViewType;
				theViewIconName = "BV_ViewLargeIcon";
			}
			else if ( currentViewType === '3' )
			{
				// Hide the multi operation bar and set the header bar to the
				// correct label
				theTopRow.style.display = 'none';
				theDiv.style.display = 'none';

				if ( null !== theBottomRow )
				{
					theBottomRow.style.display = 'none';
				}

				theDiv = document.getElementById('ViewTextLabel');

				if ( theDiv !== null )
				{
					theDiv.innerHTML = LocString( "Small Icon View" );
				}

				theDiv=document.getElementsByName('ViewType');
				theDiv.value = currentViewType;
				theViewIconName = "BV_ViewSmallIcon";
			}

			theDiv=document.getElementById('MainOperationTable');
			theDiv.style.display = 'block';

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
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/updateViewType.  An issue has occured in updating the browse view type." );
			changed = false;
		}

		return changed;
	}

	// The next two functions need to change the style directly since it seems
	// changing the classname alone doesn't aways work
	function colourCell( obj )
	{
		obj.origColor=obj.style.backgroundColor;
		obj.style.backgroundColor = '#E2EBF3';
		obj.style.cursor = "pointer";
		obj.style.border = "solid 1px #A9B7C6";
	}

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

	function addPagingFooter( tbl, numCol )
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

		try
		{


			// Try and get the reference to the table showing the details.  If it exists then
			// remove the rows and if not then create a new one
	   		tbl = document.getElementById("BrowsePageRowPagingSectionCellTable");

			if ( null === tbl )
			{
	   			tblCell = document.getElementById("BrowsePageRowPagingSectionCell");

				if ( null !== tblCell )
				{
					tbl = document.createElement("table");
					innertblBody = document.createElement("tbody");
					tbl.appendChild( innertblBody );
					tbl.width = "100%";
					tbl.id = "BrowsePageRowPagingSectionCellTable";
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
				//if ( myRows.length >= smallestPageSize || currentPageNum > 1 )
				if ( false )
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
					bc_setMenuName( "BrowsePageSize" );

					innerHTMLStr = bc_menuTxtStart( "", LocString( "Select number of items on page" ) , pageSize, "itemID", "" );
					innerHTMLStr += bc_optionsStart();
					for ( i = 0;i<pageSizeArray.length;i++)
					{
						innerHTMLStr += bc_itemTxt( pageSizeArray[i], pageSizeArray[i], 0 ) ;
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
				else
				{
					// Set the text
					cell.style.color = '#666666';
					cell.style.padding = "2px 0 2px 0";
					cell.innerHTML = "";
					cell.innerHTML += "<IMG SRC='" + imgSrc + "spacer.gif' TITLE='' WIDTH='4' HEIGHT='1' BORDER='0'>";

					// add the cell for the actual pagesize dropdown
					cell = row.insertCell(cellCount++);
					cell.style.whiteSpace = 'nowrap';

					cell.innerHTML = "" ;

					cell = row.insertCell(cellCount++);
					cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='10' HEIGHT='1' BORDER='0'>";

					// Set the text
					cell = row.insertCell(cellCount++);
					cell.style.whiteSpace = 'nowrap';
					cell.style.color = '#666666';
					cell.style.padding = "2px 0 2px 0";
					cell.innerHTML = "";
					cell.innerHTML += "<IMG SRC='" + imgSrc + "spacer.gif' TITLE='' WIDTH='4' HEIGHT='1' BORDER='0'>";
				}

				// - - - - - - - - add the spacer cell - - - - - - - -
				cell = row.insertCell(cellCount++);
				cell.width = '100%';
				cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='3' HEIGHT='14' BORDER='0'>";

				cell = row.insertCell(cellCount++);
				cell.width = '100%';
				cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='3' HEIGHT='14' BORDER='0'>";

				if ( totalPages > 1  )
				{
					// - - - - - - - - Start of the pagination selection control - - - - - - - -
					cell = row.insertCell( cellCount++ );

					// Need to figure out the classes and set the timer to set the focus
					if ( true === btmPickControlOpen )
					{
						activePicStyle = 'activatePickDivHide';
						browsePicStyle = 'browsePickDivShow';
						setTimeout("setPagePickFocus()",2);
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
						cell.onclick = function(){ getFolderContents( ( currentPageNum - 1 ), String.formatLoc( "Retrieving page n", currentPageNum - 1 ) ); };
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
							cell.onmouseover = function(){ colourCell(this); };
							cell.onmouseout = function(){ clearCell(this, true); };
							cell.style.border = "solid 1px #F5F5F5";
							cell.onclick = function( e )
								{
									var pgNum = this.getAttribute( 'pageNumAccess' ) ;
									getFolderContents( pgNum , String.formatLoc( "Retrieving page n", pgNum ) );
								};
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
						cell.onclick = function(){ getFolderContents( ( currentPageNum + 1 ), String.formatLoc( "Retrieving page n", currentPageNum + 1 ) ); };
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
					cell.innerHTML += "<DIV ID='typePickDiv' CLASS='" + browsePicStyle + "'>" + LocString( "Go to page" ) + "&nbsp;&nbsp;<INPUT CLASS='browsePaginationBarEdit' autocomplete='off' TYPE='text' ID='pagePickEdit' TITLE='" + LocString( 'Enter a page number here' ) + "' SIZE='5' MAXLENGTH='20' LIMIT='20' VALUE='' ONKEYPRESS='return browsePageNumEnter( this.form, event )'></DIV>";

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

				// - - - - - - - - add the cell for the number of items - - - - - - - -
				cell = row.insertCell(cellCount++);
				cell.style.whiteSpace = 'nowrap';
				cell.style.color = '#666666';
				cell.style.padding = "2px 0 2px 0";
				cell.colSpan = '5';

				if ( currentPageNum === 1 )
				{
					startPt = 1;
					endPt = myRowLength;
				}
				else
				{
					startPt = ( ( currentPageNum - 1 ) * pageSize ) + 1;
					endPt = ( ( currentPageNum - 1 ) * pageSize ) + myRowLength;
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

				// - - - - - - - - add the spacer cell - - - - - - - -
				cell = row.insertCell(cellCount++);
				cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='15' HEIGHT='1' BORDER='0'>";

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

				if ( true === isDebugPaging )
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
			exceptionAlert( e, "Issue occured in browsecoretable.js/addPagingFooter.  An issue has occured in creating the paging footer. " );
		}
	}

	function flipPagePick()
	{
		var	theDiv;
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
		setTimeout( "setPagePickFocus()", 5 );
	}

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

	function setPagePickFocus()
	{
		var theCell = document.getElementById( 'pagePickEdit' );
		if ( undefined !== theCell )
		{
			theCell.focus();
		}
	}

	// Test for an input field enter key stroke
	function browsePageNumEnter( theForm, e )
	{
		// IE passes the char in event.keyCode, Mozilla in event.which
		if ( !e )
		{
			e = window.event;
		}

		var c = ( e.charCode ) ? e.charCode : ( ( e.which ) ? e.which : e.keyCode );

		if ( c === 13 || c === 3 )
		{
			var 	pickPageEdit = document.getElementById( 'pagePickEdit' );
			var     miniPageInput = document.getElementById( 'miniPageInput' );

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

				getFolderContents( pageNum, String.formatLoc( "Retrieving page n", pageNum )  );

				// RM changes start
				cancelEvent( e );
				// RM changes end

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

	function SortIndicatorGet( columnName )
	{
		var 	alt;
		var 	retval = '';
		var 	gif = '';

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
			retval = '&nbsp;<IMG SRC="' + imgSrc + gif + '" ALT="' + alt + '" WIDTH="9" HEIGHT="5" BORDER="0">';
		}

		return retval;
	}

	function setRenderBigImages()
	{
		renderBigImages = true;
		buildTableBigImage();
	}

	function buildTableBigImageResize()
	{
 		if ( currentViewType === '2' )
 		{
 			buildTableBigImage();
 		}
 	}

	function buildTableBigImage()
	{
		var 	cell;
		var 	divElem;
		var 	hasViewChanged;
		var 	innerHTMLStr;
		var 	innerRow;
		var 	innertbl;
		var 	innertblBody;
		var 	numRows;
		var 	row;
		var 	tbl;
		var 	tblBody;
		var 	thisRow;

		var 	alternateValue = 0;
		var 	cellCount = 0;
		var 	outputStr = ""; // String to hold output
		var 	rowfactor = "1";
		var 	isChecked = "";
		var 	className = "";
		var 	theBigTbl = document.getElementById( "browseTableDefn1" );
		var 	theBigTbleStyle = theBigTbl.style;

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
					cell.innerHTML = "<a href='" + thisRow.link + getOptionalParams( thisRow ) + "'>" + thisRow.name + "</a> " + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
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
			setTimeout( "showTablesNow()", 1 );
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/buildTableBigImage.  An issue has occured in creating the large icon view." );
		}
	}

	function buildNoResultsView()
	{
		var 	row;
		var 	innerRow;
		var 	cell;
		var 	innerHTMLStr;
		var 	tbl;
		var 	tblBody;
		var 	innertbl;
		var 	innertblBody;

		var 	theDiv;
		var 	theRow;

		var 	outputStr = "";
		var 	cellCount = 0;

		try
		{
			if ( myRows.length > 0 || (  objFilter.length === 0 && filterValue.length === 0 ) )
			{
				// there is something to display return false to indicate this fucntion is not going to do something
				return false;
			}

			// Turn of the multi select buttons
			theDiv = document.getElementById('MultiOperationBar1');
			theRow = document.getElementById('MultiOperationBar1Row');
			theBottomRow = document.getElementById("MultiOperationBar1RowBottom");
			theMiniPager = document.getElementById('MiniPageTableCell');

			theRow.style.display = 'none';
			theDiv.style.display = 'none';
			theBottomRow.style.display = 'none';

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

			if ( objFilter.length > 0 && filterValue.length > 0 )
			{
				addSuggestionRow( innertbl, String.formatLoc( 'No matches found for &ldquo;%1&rdquo; items and &ldquo;%2&rdquo;.', myTypes[objFilter], filterValue ) );
				addSuggestionRow( innertbl );
				addSuggestionRow( innertbl, String.formatLoc( 'Change the search criteria, or' ) );
				addSuggestionRow( innertbl );

				innerHTMLStr = "<a href='javascript:void(0)' onclick='javascript:browsesearch.clearFld(true);return false;'>";
				innerHTMLStr += String.formatLoc( "Show only &ldquo;%1&rdquo; items", myTypes[objFilter] );
				innerHTMLStr += "</a>";
				addSuggestionRow( innertbl, null, innerHTMLStr );

				addSuggestionRow( innertbl );
				innerHTMLStr = "<a href='javascript:void(0)' onclick='javascript:ChangeBrowsePageObjectFilter( \"0\", \"\");return false;'>";
				innerHTMLStr += String.formatLoc( 'Show only items that match &ldquo;%1&rdquo;', filterValue );
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
			else if ( filterValue.length > 0 )
			{
				addSuggestionRow( innertbl, String.formatLoc( 'No matches found for &ldquo;%1&rdquo;.', filterValue ) );
				addSuggestionRow( innertbl );
				addSuggestionRow( innertbl, String.formatLoc( 'Change the search criteria, or' ) );
				addSuggestionRow( innertbl );

				innerHTMLStr = "<A HREF='javascript:void(0)' ONCLICK='javascript:browsesearch.clearFld(true);return false;'>";
				innerHTMLStr += String.formatLoc( 'Show all items' );
				innerHTMLStr += "</A>";
				addSuggestionRow( innertbl, null, innerHTMLStr );
				addSuggestionRow( innertbl );
			}
			document.getElementById("browseCoreDiv").appendChild(tbl);
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/buildNoResultsView.  An issue has occured in creating the no results information." );
		}

		return true;
	}

	function addSuggestionRow( tbl, strText, innerHtml )
	{
		var 	row;
		var 	cell;

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

	function rmBuildTableListView()
	{

		var 	hasViewChanged;
		var 	tbl;
		var 	tblBody;

		try
		{

			// Set the viewType for the small icons view
			//hasViewChanged = updateViewType( '3' );

			// Try and get the reference to the table showing the details.  If it exists then
			// remove the rows and if not then create a new one
			tbl = document.getElementById( "browseViewCoreTable" );

			if ( null != tbl )
			{
				tbl.parentNode.removeChild( tbl );
				tbl = null;
			}

			// Create the table for the data
			tbl = document.createElement("table");

			tblBody = document.createElement("tbody");

			tbl.className = "browseTable updatedBrowse";
			tbl.id = 'browseViewCoreTable';

			addPagingFooter( tbl, 1 );
			document.getElementById("browseCoreDiv").appendChild(tbl);
			buildMiniTable( totalPages, currentPageNum );
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/buildTableListView.  An issue has occured in creating the small icon view." );
		}
	}

	
	function buildTableListView()
	{
		var 	cell;
		var 	divElem2;
		var 	divElem;
		var 	divElemOutter;
		var 	hasViewChanged;
		var 	innerHTMLStr;
		var 	innerRow;
		var 	numRows;
		var 	row;
		var 	tbl;
		var 	tblBody;
		var 	thisRow;

		var 	outputStr = "";
		var 	cellCount = 0;
		var 	totalHeight = Math.ceil( myRows.length / 2 );
		var 	theBigTbl = document.getElementById( "browseTableDefn1" );
		var 	theBigTbleStyle = theBigTbl.style;

		try
		{
			// Set the viewType for the small icons view
			hasViewChanged = updateViewType( '3' );

			if ( buildNoResultsView() )
			{
				return;
			}

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
					innerHTMLStr += "<A HREF=\"" + thisRow.link + getOptionalParams( thisRow ) + "\">" + thisRow.name + "</a> " + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
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
			setTimeout( "showTablesNow()", 1 );
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/buildTableListView.  An issue has occured in creating the small icon view." );
		}
	}

	function buildTableDetail()
	{
		var 	buttonType;
		var 	cell;
		var 	divElem;
		var 	hasViewChanged;
		var 	innerHTMLStr;
		var 	innertbl;
		var 	innertblBody;
		var 	j;
		var 	numRows;
		var 	row;
		var 	tbl;
		var 	tblBody;
		var 	thisRow;

		var 	cellCount = 0;
		var 	className = "";
		var 	isChecked = "";
		var 	outputStr = ""; // String to hold output
		var 	rowfactor = "1";
		var 	theBigTbl = document.getElementById( "browseTableDefn1" );
		var 	theBigTbleStyle = theBigTbl.style;

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
				cellCount = columnDefinitionArray[j].AddCellHeader( row, myRows, cellCount );
			}

			divElem = document.createElement("div");
			divElem.id = 'itemView';
			tbl.appendChild(divElem);

			numRows = myRows.length;

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
					cell.colSpan = "5";
					cell.innerHTML = thisRow.dcomment;
				}

				// Flip the row colours
				rowfactor = ( rowfactor === "1" ) ? "2" : "1";
			}

			// Write the paging footer and the mini controls
			addPagingFooter( tbl, 6 );
			document.getElementById("browseCoreDiv").appendChild(tbl);
			buildMiniTable( totalPages, currentPageNum );
			setTimeout( "showTablesNow()", 1 );
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/buildTableDetail.  An issue has occured in creating the detail view." );
		}
	}

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

	function drawBottomMultiButton()
	{
		var 	buttonType;
		var 	cell;
		var 	divElem;
		var 	hasViewChanged;
		var 	innerHTMLStr;
		var 	outerRow;
		var 	row;
		var 	tbl;
		var 	tblBody;
		var 	innertbl;
		var 	innertblBody;

		var 	cellCount = 0;
		var 	className = "";
		var 	isChecked = "";
		var 	outputStr = ""; // String to hold output
		var 	rowfactor = "1";

		if ( noMultiSelectButtons || ( bcMultiButtonArray.length === 0 ) )
		{
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
					outerRow.style.display = 'none';
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

				// Add the cell for a spacer
				cell = row.insertCell( cellCount++ );
				cell.innerHTML = "<IMG HEIGHT='28' ALT='' SRC='" + imgSrc + "px.gif' WIDTH='8' BORDER='0'>";

				// Add the cell for the arrow up
				cell = row.insertCell( cellCount++ );
				cell.width = '1%';
				cell.align = 'left';
				cell.innerHTML = "<IMG HEIGHT='9' ALT='' HSPACE='2' SRC='" + imgSrc + "ico-arrow-pnt-up.gif' WIDTH='11' BORDER='0'>";

				// Now the cell to hold the actual buttons
				cell = row.insertCell( cellCount++ );
				cell.style.whiteSpace = 'nowrap';
				cell.width = '100%';
				cell.align = 'left';

				innerHTMLStr = "";
				fn_setDirectWrite( false );
				for ( i=0; i<bcMultiButtonArray.length; i++ )
				{
					buttonType = bcMultiButtonArray[i];
					innerHTMLStr += fn_MultiButton( buttonType.img1, buttonType.img2, buttonType.name, buttonType.displayName, buttonType.action, buttonType.type);
					innerHTMLStr += "<IMG HEIGHT='2' ALT='' SRC='" + imgSrc + "px.gif' WIDTH='3' BORDER='0'>";
				}
				cell.innerHTML = innerHTMLStr;
				fn_setDirectWrite( true );

				if ( !isIE )
				{
					tbl.appendChild ( outerRow );
				}
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/drawBottomMultiButton.  An issue has occured in creating the bottom multi select operation buttons." );
		}

	}

	function sortTable()
	{
		var 	j;

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
			exceptionAlert( e, "Issue occured in browsecoretable.js/sortTable.  An issue has occured in sorting the browse table. sort - " + sortColumn  );
		}
	}

	//NOTE: access the column object itself
	function sortTableCol( headerClick, colIdentifier  )
	{

		try
		{
			var obj = eval( colIdentifier );

			return obj.sortTableCol( headerClick );
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in browsecoretable.js/sortTableCol.  An issue has occured in trying to do a client-side sort. Sort Object - " + colIdentifier );
		}

		return null;
	}

	// function to edit rows
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
				theCell.innerHTML= "<A href=\"" + thisRow.link + getOptionalParams( thisRow ) + "\">" + thisRow.name + "</a> " + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
			}
			else
			{
				theCell.innerHTML= "&nbsp;" + thisRow.name + fn_MenuStr( '', '', thisRow.dataId, '', imgSrc, LocString( 'Functions' ), '' ) + thisRow.modifiedImgs;
			}
			editingRow = -1;
			killPopup();
		}
	}

	function setEditCellFocus()
	{
		var theCell = document.getElementById('editCell');
		if ( null !== theCell )
		{
			theCell.focus();
		}
	}

	// function to edit rows
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
					setTimeout("setEditCellFocus()", 5 );
				}
				else
				{
					alert( "Error in resetting cell contents after editting cell" );
				}
			}
		}
	}

	// function to edit rows
	function filterRowCell()
	{
		var onKeyPressStr;

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

	// Test for an input field enter key stroke
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

	// function to save the changes
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
		if (rowEditing )
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
		if ( "block" === theBrowsePick.style.display )
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

	function folderContentsResponseLocal( responsetext )
	{
		var arr1 = responsetext.split('|');

		if ( arr1.length )
		{
			DataStringToVariables( arr1[0] );
		}
	}

	function folderContentsResponse( responsetext )
	{
		var arr1 = responsetext.split('|');

		if ( arr1.length )
		{
			DataStringToVariables( arr1[0] );
			// change the window location to reflect the new location
			// add this to our history
			addPageToHistory( true );
		}
	}

	function folderContentsSort( responsetext )
	{
		var arr1 = responsetext.split('|');

		if ( arr1.length )
		{
			DataStringToVariables( arr1[0] );
		}
		
		restoreSortOrder();
		
	}
	var ds = new Date();

	function getFolderContents( pageNum, msg, responseMethod )
	{
		var url;
		var obj;
		var localCopy;

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

		for (i=0; i < document.forms.length ; i++)
		{
			frm = document.forms[i];
			if ( frm.name == pageFormName )
			{
				frm.pageNumber.value = pageNum;
				doSubmitPageFrm();
				break;
			}
			else
			{
				continue
			}
		}

		// when switching pages need to set the search box to the stored value

		browsesearch.setSearchBoxContent();
	}

	//-------------------------------------------------------------------------------------------------------------

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

		var 	xScroll;
		var 	yScroll;

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

		arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight,xScroll,yScroll);

		return arrayPageSize;
	}

	// preload the 'busy' image
	var 	popupBak;
	var 	popupMsg;
	var 	popupTimer;
	var 	theProgressDiv;

	var 	iebody = (document.compatMode && document.compatMode !== "BackCompat")? document.documentElement : document.body;
	var 	progessImg = new Image();

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

	function popup( msg, bak )
	{
		popupMsg = msg;
		popupBak = bak;

		this.popupTimer = setTimeout( "showTimeredPopup()", 2 );
	}

	function showTimeredPopup()
	{
		var content;
		var theProgressDivStyle;

		var arrayPageSize = getPageSize();
		// need to take the scroll into account
		var dsocleft = document.all? iebody.scrollLeft : pageXOffset;
		var dsoctop = document.all? iebody.scrollTop : pageYOffset;

		if ( 0 === popupMsg.length )
		{
			return;
		}
		this.popupTimer = null;

		content = "<TABLE WIDTH='150' BORDER='1' BORDERCOLOR='black' CELLPADDING='2' CELLSPACING='0' BGCOLOR='" + popupBak + "'>";
		content = content + "<TR>";
		content = content + "	<TD>";
		content = content + "		<TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0' WIDTH='100%'>";
		content = content + "			<TR>";
		content = content + "				<TD VALIGN='MIDDLE'><IMG SRC='' ID='prgImg' ALT='' BORDER='0'></TD><TD valign='middle' nowrap>&nbsp;<FONT COLOR='black' SIZE='2'>&nbsp;" + popupMsg + "&nbsp;</FONT></TD>";
		content = content + "			</TR>";
		content = content + "		</TABLE>";
		content = content + "	</TD>";
		content = content + "</TR>";
		content = content + "</TABLE>";

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

	//-------------------------------------------------------------------------------------------------------------
	/* START browsesearch object */
	if (!browsesearch)
	{
		var browsesearch = {};
	}

	browsesearch.clearBtn = false;
	browsesearch.doneSearch = false;

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
		var 	fldID = 'srch_fld';
		var 	fld = document.getElementById( fldID );

		if ( null !== fld )
		{
			fld.value = "";

			this.onChange( fldID );

			fld.value = fld.getAttribute('placeholder');

			if ( undefined !== fld.style )
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
			fld.value = fld.getAttribute('placeholder');
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
				fld.value = fld.getAttribute('placeholder');
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
				browsesearch.doneSearch = true;
			}
			else
			{
				if ( false === browsesearch.doneSearch )
				{
					return;
				}

				filterValue = "";
				browsesearch.doneSearch = false;
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
		myTypes = new Array;
	}

	function AddTypeReference( subType, subTypeName )
	{
		myTypes[ subType ] = subTypeName;
	}

	//-------------------------------------------------------------------------------------------------------------
	// This is the storage of the multiselect buttons.  Used for mainly drawing the bottom button bar.
	if (!bcMultiButtonArray)
	{
		var bcMultiButtonArray = new Array;
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

	function AddMultiButton( img1Str, img2Str, nameStr, displayNameStr, actionStr, typeStr )
	{
		bcMultiButtonArray[bcMultiButtonArray.length] = new  multiButton( img1Str, img2Str, nameStr, displayNameStr, actionStr, typeStr );
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
