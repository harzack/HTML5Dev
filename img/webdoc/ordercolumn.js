	//- - - - - - order column - - - - - - -
	function orderColumn()
	{
		this.identifier = "orderColumn";
		this.SortComparitor = function(a, b)
		{
			if (a.sizesort < b.sizesort) {return -1;}
			if (a.sizesort > b.sizesort) {return 1;}
			return 0;
		};

		this.getCellValue = function( dataRow, rowNo )
		{
			var cellValue;

			if (dataRow.order == 0 ){
				cellValue = LocString( "Master", orderColumnStr );
			}else{
				cellValue = dataRow.order;
			}	

			return cellValue ;
		};

		this.SetHeaderParams( LocString( "Order", orderColumnStr ), "browseListHeaderName" );
		this.SetCellParams( "browseItemOrder" );
		this.SetSort( true );
		this.SetSortDirectionDesc( true );
		this.SetColName( "ordering" );
		this.SetCellWidth( "2%" );
	}
	orderColumn.prototype = new BrowseViewColumn();
	

