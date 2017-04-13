/*
* leaveTaskEdit returns true or false 
* This function determines if we should leave the page
*
* @param	errMsg		type:string - errMsg from oscript xlate variable if there is an error
* @return	boolean 	true or false
*/ 	
function leaveTaskEdit( errMsg )
{
	parent.IFrameRight.focus();
	
	if ( parent.istedirty )
	{
		if ( !confirm( errMsg ) )
		{
			return false;
		}
	}
	return true;
}

/*
* setButtons returns nothing. 
* This function is used to disable a button
*
* @param	disabled	type:boolean - true or false 
* @return	nothing
*/ 	
function setButtons( disabled )
{
	for ( i = 0; i < document.myForm2.length; i++ ) 
	{
		var tempobj = document.myForm2.elements[ i ];
		
		if ( tempobj.type.toLowerCase() == "button" )
		{
			tempobj.disabled = disabled;
		}
	}
}

/*
* SubmitMyPage returns nothing. 
* This function is used to submit the page
*
* @param	nextURL		type:string - the value for the nextURL variable
* @param	confirm		type:boolean - true or false depending on .fConfirmValue in oscript
* @param	msg			type:string - the error message to be displayed in the event that the page is dirty before submitting
* @return	nothing
*/ 	
function SubmitMyPage( nextURL, confirm, msg )
{
	document.myForm2.NextURL.value = nextURL; 
	
	if ( leaveTaskEdit( msg ) )
	{
		if ( confirm )
		{
			doConfirmUser();
		}
		else
		{
			// disabling the buttons to prevent use from clicking them again as
			// the submit may take some time
			setButtons( true )
			
			document.myForm2.submit();
		}
	}
}

/*
* taskEditGo returns nothing. 
* This function is used to set the page as dirty
*
* @param	nextURL		type:string - the URL to use
* @return	nothing
*/ 	
function taskEditGo( nextURL )
{
	parent.istedirty = false;
	setWFLocation( parent.IFrameRight.location, nextURL );
}

/*
* userConfirmation returns nothing. 
* This function is used to set the forms authentication value so it gets in the request and
* then to submit the page
*
* @param	confirm				type:boolean - true or false depending on .fConfirmValue in oscript
* @param	authenticate		type:integer - authentication key to pass back to the server for verification
* @param	invalidPasswordMsg	type:string - errMsg from oscript xlate variable if there is an error
* @return	nothing
*/ 	
function userConfirmation( confirm, authenticate, invalidPasswordMsg )
{
	if ( confirm )
	{
		// ensure that the authenticate value is set in a hidden variable on the page
		// so that it is passed back in the request to the server
		document.myForm2.authenticateValue.value = authenticate;
		document.myForm2.submit();
	}
	else
	{
		alert( invalidPasswordMsg )
	}
}	

