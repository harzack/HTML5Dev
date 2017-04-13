var timeOutMS = 2000; 
var msgBoardFlag = false;
		
var timer1
var timerFlag1 = false;
		
var timer2
var timerFlag2 = false;
		
var timer3
var timerFlag3 = false;
		
function closeConfirmation()
{
	window.opener.location.reload();
	window.close();
}

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

//check to see if the value of the obj has less than 2 charactors. if so, trun on timer for 2 and then 
//turn on error class style for colNameID, objID
//show on error message board if it's off and disable Save button
function ErrCheckShow( timerID, msgBoardID, errMsgID, colNameID, objID, obj )
{
	var ShowErrInfoFunc = function() { ShowErrInfo( msgBoardID, errMsgID, colNameID, objID ); };
	
	if ( obj.value.length < 2 )
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
function ShowErrInfo( msgBoardID, errMsgID, colNameID, objID )
{

   	if ( document.getElementById )
	{
		//turn on error message board
		if ( document.getElementById(msgBoardID).style.visibility != 'visible' )
		{
			document.getElementById(msgBoardID).style.visibility = 'visible';
			
			document.getElementById(errMsgID).innerHTML = getErrMsg;
		}
		else
		{	
			document.getElementById(errMsgID).innerHTML = getErrMsg;
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
		if ( document.getElementById(colNameID).className != 'none' )
		{
			document.getElementById(colNameID).className = 'none';
		}
		
		//turn off error status for text field
		if ( document.getElementById(objID).className != 'none' )
		{
			document.getElementById(objID).className = 'none';
		}
	}
}

//if length of any value has less than 2 chars, disable save button
function EnableSaveButton( saveButton, col1Obj, col2Obj, col3Obj )
{
	if ( ( col1Obj.value.length > 1 ) && ( col2Obj.value.length > 1 ) && ( col3Obj.value.length > 1 ) )
	{
		if ( saveButton.disabled == true )
		{
			saveButton.disabled = false;
		}
	}
	else
	{
		if ( saveButton.disabled == false )
		{
			saveButton.disabled = true;
		}
	}
}