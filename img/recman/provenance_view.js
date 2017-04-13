// START column definition for Provenance Start Date

var provStartDate = new BrowseViewColumn( "provStartDate" );

provStartDate.SetHeaderParams( LocString( "Start Date") , "browseListHeaderCenterText" );
provStartDate.SetCellParams( "browseListHeaderCenterText" );
provStartDate.SetSort( true );
provStartDate.SetColName( "PROVSTARTDATE" );
provStartDate.SetNowrap( false );
provStartDate.SetCellWidth( "1%" );
provStartDate.identifier = "provStartDate";

provStartDate.DataConversion = function ( obj )
{
	obj.provStartDate = refactorVariable( obj.provStartDate )
};

provStartDate.getCellValue = function ( obj, rowNo )
{
	return obj.provStartDate
};
// END column definition for Provenance Start Date

// START column definition for Provenance End Date

var provEndDate = new BrowseViewColumn( "provEndDate" );

provEndDate.SetHeaderParams( LocString("End Date"), "browseListHeaderCenterText" );
provEndDate.SetCellParams( "browseListHeaderCenterText" );
provEndDate.SetSort( true );
provEndDate.SetColName( "PROVENDDATE" );
provEndDate.SetNowrap( false );
provEndDate.SetCellWidth( "1%" );
provEndDate.identifier = "provEndDate";

provEndDate.DataConversion = function ( obj )
{
	obj.provEndDate = refactorVariable( obj.provEndDate )
};

provEndDate.getCellValue = function ( obj, rowNo )
{
	return obj.provEndDate
};
// END column definition for Provenance END Date


// START override for additional provenance columns
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
						else if (columns[i].columnName=='provStartDate')
						{
							columnDefinitionArray[i] = provStartDate;
						}
						else if (columns[i].columnName=='provEndDate')
						{
							columnDefinitionArray[i] = provEndDate;
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
			exceptionAlert( e, "Error: provenance_view.js/setBrowseColumnDefinition.  Corrupt or missing data in generating column definitions." );
		}
	}
// END override for additional provenance columns

