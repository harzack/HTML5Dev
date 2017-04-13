////////////////////////////////////////////////////////////////////
/* 
    This file defines the email folder browse view columns.
    
    It displays the following custom columns: attachment, name,
    from, to, subject, sent date, received date.
        
    To and Subject columns also have a spacer in the header to enforce a min column width.
    To column is truncated to 255 chars.
    
    Sent & Recieved dates are being formatted on the server side before we receive the data.
    
    The browseItemEmail class is used for all columns.  This class doesn't actually exist in a .css, 
    but if we don't pass a value to the SetHeaderParams & SetCellParams functions then
    they use default classes and enforce a style that we don't want.

*/
///////////////////////////////////////////////////////////////////

var baseAddCellHeader = BrowseViewColumn.prototype.AddCellHeader;


//////////// Attachment Column //////////////////////////////////////////////////////////////

var attachmentColumn = new BrowseViewColumn( "attachmentColumn" );
attachmentColumn.SetHeaderParams( "", "browseListAttachment" );
attachmentColumn.SetCellParams( "browseListAttachment" );
attachmentColumn.SetSort( true );
attachmentColumn.SetColName( "Attachment" );
attachmentColumn.SetCellWidth( "1%" );
attachmentColumn.identifier = "attachmentColumn";


attachmentColumn.SortComparitor = function(a, b)
{
	if (a.OTEMAilAttachmentsort < b.OTEMAilAttachmentsort) 
	{
		return -1;
	}

	if (a.OTEMAilAttachmentsort > b.OTEMAilAttachmentsort)
	{
		return 1;
	}
	
return 0;
};

attachmentColumn.DataConversion = function ( obj )
{
	obj.OTEMAilAttachment = refactorVariable( obj.OTEMAilAttachment );
	obj.OTEMAilAttachmentsort = obj.OTEMAilAttachment.toLowerCase();
};

attachmentColumn.getCellValue = function ( dataRow, rowNo )
{
	if ( dataRow.OTEMAilAttachment == 1 )
	{
        return "<IMG SRC='" + imgSrc + "otemail/clip.gif' alt='" + LocString("Attachments") +"' border='0'>";
	}
	else
	{
	    return "<IMG src='" + imgSrc + "otemail/noattach.gif' alt='" + LocString("Attachments") + "' border='0'>";
	}
}

attachmentColumn.AddCellHeader = function( rowStruct, contents, cellCount )
{
	var		cell;
	var		newLink;
	var		linkText;

	try
	{
		if ( true === this.isEnabled )
		{
			// Add the cell for the type column
			cell = rowStruct.insertCell( cellCount++ );
			cell.className = this.headerClassName;
			if ( this.cellWidth != "" )
			{
				cell.style.width = this.cellWidth;
			}
			
			if ( this.shimWidth != "" )
			{
				cell.innerHTML	+= "<div style='width: " + this.shimWidth + "; height: 0px; line-height: 0px'></div>";
			}
				
			if ( this.headerSpan > 1 )
			{
				cell.colSpan = this.headerSpan;
			}
			cell.scope = this.headerScope;

	        linkText = document.createElement( "IMG" );
	        linkText.setAttribute('SRC', imgSrc + 'otemail/clip.gif');
	        linkText.setAttribute( 'alt', 'Attachments' );
	        linkText.setAttribute( 'border','0' );

			newLink = document.createElement('a');
			newLink.appendChild( linkText );
			linkText = 'sortTableCol( true, "' + this.identifier + '" )';
			newLink.setAttribute('href', '#' );
			newLink.setAttribute('onClick', linkText );
			cell.appendChild( newLink );
			cell.innerHTML += SortIndicatorGet( this.colName );
			
			// Add code to enable hover behaviour:
			$(cell).mouseenter(function() {
				$(this).addClass("browseListHeader-mo");
			}).mouseleave(function() {
				$(this).removeClass("browseListHeader-mo");
			});
		}

	}
	catch(e)
	{
	    exceptionAlert(e, "Issue occured in emailfolderbrowseview.js/BrowseViewColumn.AddCellHeader.");
	}
	return cellCount;
};


////////////// From Column /////////////////////////////////////////////////////////////////

var fromColumn = new BrowseViewColumn( "fromColumn" );
fromColumn.SetHeaderParams( LocString("From"), "browseItemEmail" );
fromColumn.SetCellParams( "browseItemEmail" );
fromColumn.SetSort( true );
fromColumn.SetColName( "From" );
fromColumn.SetCellWidth( "10%" );
fromColumn.SetNowrap( false );
fromColumn.identifier = "fromColumn";

fromColumn.SortComparitor = function(a, b)
{
	if (a.OTEMailFromsort < b.OTEMailFromsort) 
	{
		return -1;
	}

	if (a.OTEMailFromsort > b.OTEMailFromsort)
	{
		return 1;
	}
	
return 0;
};

fromColumn.DataConversion = function ( obj )
{
	obj.OTEMailFrom = refactorVariable( obj.OTEMailFrom );
	obj.OTEMailFromsort = obj.OTEMailFrom.toLowerCase();
};


fromColumn.getCellValue = function ( dataRow, rowNo )
{
	return dataRow.OTEMailFrom;
}

fromColumn.AddCellHeader = function(rowStruct, contents, cellCount) {
    var cell;

    cellCount = baseAddCellHeader.call(this, rowStruct, contents, cellCount);

    cell = rowStruct.cells[cellCount - 1];
    cell.innerHTML += "<IMG SRC='" + imgSrc + "8space.gif' WIDTH='70' HEIGHT='8' BORDER='0'>";

    return cellCount;
}


////////////// To Column ////////////////////////////////////////////////////////////////////////////////////

var toColumn = new BrowseViewColumn( "toColumn" );
toColumn.SetHeaderParams( LocString("To"), "browseItemEmail" );
toColumn.SetCellParams( "browseItemEmail" );
toColumn.SetSort( true );
toColumn.SetColName( "To" );
toColumn.SetCellWidth( "15%" );
toColumn.SetNowrap( false );
toColumn.identifier = "toColumn";

toColumn.SortComparitor = function(a, b)
{
	if (a.OTEMailTosort < b.OTEMailTosort) 
	{
		return -1;
	}

	if (a.OTEMailTosort > b.OTEMailTosort)
	{
		return 1;
	}
	
return 0;
};

toColumn.DataConversion = function ( obj )
{
	obj.OTEMailTo = refactorVariable( obj.OTEMailTo );
	obj.OTEMailTosort = obj.OTEMailTo.toLowerCase();
};


toColumn.getCellValue = function ( obj, rowNo )
{
    var truncate = 255;
    var toString;
    if ( obj.OTEMailTo.length > truncate )
   {
        toString = obj.OTEMailTo.substring(0,truncate) + "..."
   }
   else
    {
        toString = obj.OTEMailTo;
    }
	
	return toString;
}

toColumn.AddCellHeader = function(rowStruct, contents, cellCount) 
{
var cell;

cellCount = baseAddCellHeader.call(this, rowStruct, contents, cellCount);

cell = rowStruct.cells[cellCount - 1];
cell.innerHTML += "<IMG SRC='" + imgSrc + "8space.gif' WIDTH='180' HEIGHT='8' BORDER='0'>";		

return cellCount;
}


//////////////// Subject Column ///////////////////////////////////////////

var subjectColumn = new BrowseViewColumn( "subjectColumn" );
subjectColumn.SetHeaderParams( LocString("Subject"), "browseItemEmail" );
subjectColumn.SetCellParams( "browseItemEmail" );
subjectColumn.SetSort( true );
subjectColumn.SetColName( "Subject" );
subjectColumn.SetCellWidth( "25%" );
subjectColumn.SetNowrap( false );
subjectColumn.identifier = "subjectColumn";

subjectColumn.SortComparitor = function(a, b)
{
	if (a.OTEMailSubjectsort < b.OTEMailSubjectsort) 
	{
		return -1;
	}

	if (a.OTEMailSubjectsort > b.OTEMailSubjectsort)
	{
		return 1;
	}
	
    return 0;
};

subjectColumn.DataConversion = function ( obj )
{
	obj.OTEMailSubject = refactorVariable( obj.OTEMailSubject );
	obj.OTEMailSubjectsort = obj.OTEMailSubject.toLowerCase();
};


subjectColumn.getCellValue = function ( obj, rowNo )
{
	return obj.OTEMailSubject;
}

subjectColumn.AddCellHeader = function(rowStruct, contents, cellCount) {
    var cell;

    cellCount = baseAddCellHeader.call(this, rowStruct, contents, cellCount);

    cell = rowStruct.cells[cellCount - 1];
    cell.innerHTML += "<IMG SRC='" + imgSrc + "8space.gif' WIDTH='180' HEIGHT='8' BORDER='0'>";		

    return cellCount;
}


//////////// Sent Date Column ///////////////////////////////////////////////

var sentColumn = new BrowseViewColumn( "sentColumn" );
sentColumn.SetHeaderParams( LocString("Sent Date"), "browseItemEmail" );
sentColumn.SetCellParams( "browseItemEmail" );
sentColumn.SetSort( true );
sentColumn.SetColName( "SentDate" );
sentColumn.SetCellWidth( "10%" );
sentColumn.SetNowrap( false );
sentColumn.identifier = "sentColumn";

sentColumn.SortComparitor = function(a, b)
{
	if (a.OTEMailSentDatesort < b.OTEMailSentDatesort) 
	{
		return -1;
	}

	if (a.OTEMailSentDatesort > b.OTEMailSentDatesort)
	{
		return 1;
	}
	
    return 0;
};

sentColumn.DataConversion = function ( obj )
{
	obj.OTEMailSentDate = refactorVariable( obj.OTEMailSentDate );
	obj.OTEMailSentDatesort = refactorVariable( obj.OTEMailSentDateReal );
};


sentColumn.getCellValue = function ( obj, rowNo )
{
	return obj.OTEMailSentDate;
}


///////////// Received Date Column //////////////////////////////////////////////

var receivedColumn = new BrowseViewColumn( "receivedColumn" );
receivedColumn.SetHeaderParams( LocString("Received Date"), "browseItemEmail" );
receivedColumn.SetCellParams( "browseItemEmail" );
receivedColumn.SetSort( true );
receivedColumn.SetColName( "ReceivedDate" );
receivedColumn.SetCellWidth( "10%" );
receivedColumn.SetNowrap( false );
receivedColumn.identifier = "receivedColumn";

receivedColumn.SortComparitor = function(a, b)
{
	if (a.OTEMailReceivedDatesort < b.OTEMailReceivedDatesort) 
	{
		return -1;
	}

	if (a.OTEMailReceivedDatesort > b.OTEMailReceivedDatesort)
	{
		return 1;
	}
	
return 0;
};

receivedColumn.DataConversion = function ( obj )
{
	obj.OTEMailReceivedDate = refactorVariable( obj.OTEMailReceivedDate );
	obj.OTEMailReceivedDatesort = refactorVariable( obj.OTEMailReceivedDateReal );
};


receivedColumn.getCellValue = function ( obj, rowNo )
{
	return obj.OTEMailReceivedDate;
}


///////////// Column Define Function //////////////////////////////////////////////
setBrowseColumnDefinition = function(browseColumnDefinitionList) 
{

    var localBrowseColumnDefinitionList;
    var columns;

    try {
        browseColumnDefinitionList = browseColumnDefinitionList;
        localBrowseColumnDefinitionList = eval(browseColumnDefinitionList);

        if (localBrowseColumnDefinitionList.ok === true) {

            if (undefined === columnDefinitionArray) {
                columns = localBrowseColumnDefinitionList.columns;

                columnDefinitionArray = [];

                for (i = 0; i < columns.length; i++) {
                    if (columns[i].isDefault) {
                        // Double check that this default column actually exists.  If not, then ignore it.
                        if (eval("typeof(" + columns[i].columnID + ") != 'undefined'")) {
                            eval("columnDefinitionArray[i] = new " + columns[i].columnID + "();");
                            if (columns[i].columnID == "checkboxColumn") {
                                browseCheckboxColumn = columnDefinitionArray[i];
                            }
                        }
                    }
                    else if (columns[i].DisplayAsLink) {
                        if (columns[i].type == 14) {
                            //User type column with link on name
                            columnDefinitionArray[i] = new userColumnWithURL(columns[i].displayName, columns[i].columnName, columns[i].sortable, columns[i].columnEMWidth + "em", columns[i].alignment, columns[i].longText, columns[i].columnName);
                        }
                        else {
                            //Non-user type column with link on value
                            columnDefinitionArray[i] = new columnWithURL(columns[i].displayName, columns[i].columnName, columns[i].sortable, columns[i].columnEMWidth + "em", columns[i].alignment, columns[i].longText, columns[i].columnName, columns[i].URL, columns[i].NewWindow, columns[i].TitleText, columns[i].DisplayValue);
                        }
                    }

                    // Start of change from parent function
                    else if (columns[i].columnName=='OTEMAilAttachment')
                        columnDefinitionArray[i] = attachmentColumn;
                    else if (columns[i].columnName=='OTEMailFrom')
                        columnDefinitionArray[i] = fromColumn;
                    else if (columns[i].columnName=='OTEMailTo')
                        columnDefinitionArray[i] = toColumn;
                    else if (columns[i].columnName=='OTEMailSubject')
                        columnDefinitionArray[i] = subjectColumn;
                    else if (columns[i].columnName=='OTEMailSentDate')
                        columnDefinitionArray[i] = sentColumn;
                    else if (columns[i].columnName=='OTEMailReceivedDate')
                        columnDefinitionArray[i] = receivedColumn;
                    // End of change from parent function

                    else {
                        columnDefinitionArray[i] = new arbitraryColumn(columns[i].displayName, columns[i].columnName, columns[i].sortable, columns[i].columnEMWidth + "em", columns[i].alignment, columns[i].longText, columns[i].columnName);
                    }
                }
            }

        }
        else {
            alert(localBrowseColumnDefinitionList.errMsg);
        }
    }
    catch (e) {
        exceptionAlert(e, "Error: emailfolderbrowseview.js/setBrowseColumnDefinition.  Corrupt or missing data in generating column definitions.");
    }
}
