// These columns are used in the display of the My Reserved Items page

//- - - - - - reserved date column - - - - - - -
function reservedDateColumn()
{
	this.identifier = "reservedDateColumn";
	this.SortComparitor = function(a, b)
	{
		if (a.datesort < b.datesort) {return -1;}
		if (a.datesort > b.datesort) {return 1;}
		return 0;
	};

	this.getCellValue = function( dataRow, rowNo )
	{
		return dataRow.reservedDate + '&nbsp;';
	};

	this.SetHeaderParams( LocString( "Date Reserved", myReservedItemsStr ), "browseListHeaderDate" );
	this.SetCellParams( "browseItemDate" );
	this.SetSort( true );
	this.SetSortDirectionDesc( true );
	this.SetColName( "reservedDate" );
	this.SetCellWidth( "2%" );
	this.SetSortMessage( LocString( "Sorting by date reserved...", myReservedItemsStr ) );
}
reservedDateColumn.prototype = new BrowseViewColumn();

//- - - - - - reserved by column - - - - - - -
function reservedByColumn()
{
	this.identifier = "reservedByColumn";

	this.getCellValue = function( dataRow, rowNo )
	{
		return '<a href="#" onclick="doUserDialog( \'' + dataRow.reservedBy + '\' );">' + dataRow.nameReservedBy + '</a>&nbsp;';
	};

	this.SetHeaderParams( LocString( "Reserved By", myReservedItemsStr ), "browseListHeaderUser" );
	this.SetCellParams( "browseItemUser" );
	this.SetSort( false );
	this.SetColName( "reservedBy" );
	this.SetCellWidth( "2%" );
}
reservedByColumn.prototype = new BrowseViewColumn();
