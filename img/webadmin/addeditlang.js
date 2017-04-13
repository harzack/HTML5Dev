//onload window, set size and position

function onLoadStuff(height, width)
{
	var		xPos;
	var		yPos;

	var		availWidth = screen.availWidth;
	var		availHeight = screen.availHeight;


	xPos = ( availWidth / 2 ) - ( width / 2 );
	yPos = ( availHeight / 2 ) - ( height / 2 );

	self.moveTo( xPos, yPos );
	self.resizeTo( width, height );

}

//mark form field changed

var dirty = false;


function setDirty()
{
	dirty = true;
}

function clrDirty()
{
	dirty = false;
}


var timeOutMS = 2000; 
var msgBoardFlag = false;
		
var timer1
var timerFlag1 = false;
		
var timer2
var timerFlag2 = false;
		
var timer3
var timerFlag3 = false;

function doCancel( message )
{
	if ( dirty )
	{
		if ( confirm( message ) )
		{
			window.close();
		}
	}
	else
	{
		window.close();
	}
}

//check to see if the value of the obj is empty. if so, trun on timer for 2 and then 
//turn on error class style for colNameID, objID
//show on error message board if it's off and disable Save button
function ErrCheckShow( timerID, msgBoardID, errMsgID, colNameID, objID, obj )
{
	var ShowErrInfoFunc = function() { ShowErrInfo( msgBoardID, errMsgID, colNameID, objID, getErrMsg ); };
	
	if ( trimStr( obj.value ).length  == 0 )
	{
		if ( ( timerID == 1 ) && ( timerFlag1 == false ) )
		{
			timer1 = setTimeout( ShowErrInfoFunc, timeOutMS );
			timerFlag1 = true;
		}
		else if ( ( timerID == 2 ) && ( timerFlag2 == false ) )
		{
			timer2 = setTimeout( ShowErrInfoFunc, timeOutMS );
			timerFlag2 = true;
		}
		else if ( ( timerID == 3 ) && ( timerFlag3 == false ) )
		{
			timer3 = setTimeout( ShowErrInfoFunc, timeOutMS );
			timerFlag3 = true;
		}
		
		msgBoardFlag = true;
	}
	else
	{
		if ( ( timerID == 1 ) && ( timerFlag1 == true ) )
		{
			clearTimeout( timer1 );
			timerFlag1 = false;
		}
		else if ( ( timerID == 2 ) && ( timerFlag2 == true ) )
		{
			clearTimeout( timer2 );
			timerFlag2 = false;
		}
		else if ( ( timerID == 3 ) && ( timerFlag3 == true ) )
		{
			clearTimeout( timer3 );
			timerFlag3 = false;
		}
		
		if ( ( timerFlag1 == false ) && ( timerFlag2 == false ) && ( timerFlag3 == false ) )
		{
			msgBoardFlag = false;
		}
		
		TurnOffErrInfo( msgBoardID, msgBoardFlag, colNameID, objID )
	}
}

//turn on error class style for colNameID, objID
//show error message board if it's off
function ShowErrInfo( msgBoardID, errMsgID, colNameID, objID, errMsg )
{

   	if ( document.getElementById )
	{
		//turn on error message board
		if ( document.getElementById(msgBoardID).style.visibility != 'visible' )
		{
			document.getElementById(msgBoardID).style.visibility = 'visible';
			
			document.getElementById(errMsgID).innerHTML = errMsg;
		}
		else
		{	
			document.getElementById(errMsgID).innerHTML = errMsg;
		}
		
		//turn on error status for column name
		document.getElementById(colNameID).className = 'statusBad';
		
		//turn on error status for text field
		document.getElementById(objID).className = 'errorInputField';
	}
}


//turn off error class style for colNameID, objID
//turn off error message board
function TurnOffErrInfo( msgBoardID, msgBoardFlag, colNameID, objID )
{

	if ( document.getElementById )
	{ 
		//turn off error message board
		if ( msgBoardFlag == false )
		{ 
			if ( document.getElementById(msgBoardID).style.visibility == 'visible' )
			{ 
				document.getElementById(msgBoardID).style.visibility = 'hidden';
			}
		}

		//turn off error status for column name
		if ( document.getElementById(colNameID).className != 'valueEditable' )
		{
			document.getElementById(colNameID).className = 'valueEditable';
		}
		
		//turn off error status for text field
		if ( document.getElementById(objID).className != 'valueEditable' )
		{
			document.getElementById(objID).className = 'valueEditable';
		}
	}
}

function trimStr( str )
{
	var	str = str.replace(/^\s\s*/, '');
	ws = /\s/;
	i = str.length;
	while ( ws.test( str.charAt( --i ) ) );
	
	return str.slice( 0, i + 1 );
}

function updateOwnerAndClose(language, languageLocal, languageCode, languageIndex, languageLocalIndex, languageCodeIndex, collation, collationIndex )
{
   // Only continue if we have the means to find out which row to update
   if (languageCodeIndex >= 0)
   {
   	   // A list of all rows in the table we're interested in
       var rowElements = opener.$("#LangBrowseTable tr[class^=browseRow]");
   		
	   //Find the right row...
	   for (i = 0; i < rowElements.length; i++)
	   {
			var children = opener.$(rowElements[i]).children();

			// If the value in the Language Code column of this row matches our actual language code...
			if (children[languageCodeIndex].innerHTML.indexOf(languageCode) >= 0)
			{
				//Update the Language column:
				if (languageIndex >= 0) 
				{
					children[languageIndex].innerHTML = language;
				}

				//Update the Language (Local) column:
				if (languageLocalIndex >= 0)
				{
					children[languageLocalIndex].innerHTML = languageLocal;
				}

				if ( collationIndex >= 0 )
				{
					children[collationIndex].innerHTML = collation;
				}
				break;
			}
	   }
	}

   window.close();
}

$(document).ready( function() {
	var lastSelectedOption = $("#databaseCollation option:selected");

	$( "#databaseCollation" ).bind('change', function(){
		if(confirm( LocString( 'Confirm collation change', editLangStr ) )){
			setDirty(); 
			lastSelectedOption = $(this).find('option:selected');
		}else{
			lastSelectedOption.prop("selected", true);
		}
	});
});
