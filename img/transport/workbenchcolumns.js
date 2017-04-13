	//- - - - - - date added column - - - - - - -
	function dateAddedColumn()
	{
		this.identifier = "dateAddedColumn";
		this.SortComparitor = function(a, b)
		{
			if (a.datesort < b.datesort) {return -1;}
			if (a.datesort > b.datesort) {return 1;}
			return 0;
		};

		this.getCellValue = function( dataRow, rowNo )
		{
			return dataRow.dateAdded + '&nbsp;';
		};

		this.SetHeaderParams( LocString( "Added to workbench", transportStr ), "browseListHeaderDate" );
		this.SetCellParams( "browseItemDate" );
		this.SetSort( true );
		this.SetSortDirectionDesc( true );
		this.SetColName( "dateAdded" );
		this.SetCellWidth( "6%" );
		this.SetSortMessage( "Sorting by date..." );
	}
	dateAddedColumn.prototype = new BrowseViewColumn();
