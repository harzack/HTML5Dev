function DataStringToVariables( inStringData )
{	
	var		j;
	var		numRows;

	var		localCopy = null;
	var		caseSensitiveSort = true;	// Object sorting is currently case-sensitive

	try
	{
		// first need to eval the data block coming back from the server
		localCopy = eval( inStringData );
	}
	catch(e)
	{
		killPopup();
		exceptionAlert( e, "Error: browse.js/DataStringToVariables.  Corrupt data from the server. " );
		localCopy = null;
	}

	if ( null !== localCopy )
	{
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

				myRows = localCopy.myRows;

				numRows = myRows.length;

				for (i=0; i< numRows; i++)
				{
					obj = myRows[i];

					obj.checked = false;
					obj.savedClass = "";
					obj.editable = setBooleanValue( obj.editable );
					obj.container = setBooleanValue( obj.container );

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

				// record the some times to show in the page.
				de = new Date();
				rtTimeTaken = de - ds;

				packetSize = inStringData.length;

			}
			
			buildTable();
		}
		catch(e2)
		{
			killPopup();
			exceptionAlert( e2, "Issue occured in browse.js/DataStringToVariables.  No update of data done. " );
		}
	}
}

