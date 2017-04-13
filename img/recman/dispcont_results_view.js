// START column definition for Run Status

var runStatus = new BrowseViewColumn( "RunStatus" );

runStatus.SetHeaderParams( LocString( "Run Status" ), "browseListHeaderCenterText" );
runStatus.SetCellParams( "browseListHeaderCenterText" );
runStatus.SetSort( true );
runStatus.SetColName( "RUNSTATUS" );
runStatus.SetNowrap( true );
runStatus.SetCellWidth( "10 px" );
runStatus.identifier = "runStatus";

runStatus.getCellValue = function ( obj, rowNo )
{	
	var retVal = "";
	if (String(obj.RunStatusStr) != "undefined") {
		retVal = obj.RunStatusStr
	}
	return retVal
};
// END column definition for Run Status


// START column definition for SchedNextRun
var schedNextRun = new BrowseViewColumn( "SchedNextRun" );

schedNextRun.SetHeaderParams( LocString( "Next Run" ), "browseListHeaderCenterText" );
schedNextRun.SetCellParams( "browseListHeaderCenterText" );
schedNextRun.SetSort( true );
schedNextRun.SetColName( "SchedNextRun" );
schedNextRun.SetNowrap( true );
schedNextRun.SetCellWidth( "1%" );
schedNextRun.SetCellClassName( "browseItemTypeLeft" );
schedNextRun.identifier = "SchedNextRun";

schedNextRun.getCellValue = function ( obj, rowNo )
{
	var nextRunStr = ""
	if (eval(obj.Group)) {
		nextRunStr = ""
	} else if (typeof obj.SchedNextRunStr != "undefined") {
		nextRunStr = obj.SchedNextRunStr
	} else {
		nextRunStr = LocString( "Manual" )
	}
	return nextRunStr
};
// END column definition for Review Decision

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
					else if (columns[i].columnName=='RunStatus')
					{
						columnDefinitionArray[i] = runStatus;
					}
					else if (columns[i].columnName=='SchedNextRun')
					{
						columnDefinitionArray[i] = schedNextRun;
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
		exceptionAlert( e, "Error: dispcont_results_view.js/setBrowseColumnDefinition.  Corrupt or missing data in generating column definitions." );
	}
}
// END override for additional disposition columns
