/*
* onLoadStuff returns nothing. 
* This function is performed when the llConfirmUser page is loaded 
*
* @return	nothing
*/ 		
function onLoadStuff()
{
	var		xPos;
	var		yPos;
	
	var		availWidth = screen.availWidth;
	var		availHeight = screen.availHeight;
	var		height = 100;
	var		width = 250;
	
	
	xPos = ( availWidth / 2 ) - ( width / 2 );
	yPos = ( availHeight / 2 ) - ( height / 2 );
	
	self.moveTo( xPos, yPos );
}
	
/*
* submitUserConfirmation returns nothing. 
* This function is used to call the js function UserConfirmation that is defined 
* in support/webwork/webwork.js
*
* @param	confirm		type:boolean - true or false depending on .fConfirmValue in oscript
* @param	authJM		type:integer - authentication key used to verify the request is valid
* @param	jFuncName	type:string - name of js function to call 
* @param	errMsg		type:string - error message required in webwork.js\userConfirmation()
* @return	nothing
*/ 	
function submitUserConfirmation( confirm, authJM, jFuncName, errMsg )
{

	if ( eval( 'opener.' + jFuncName ) != null )
	{
		opener.window.focus();
		
		opener.setTimeout( jFuncName + '( '   + ( confirm ? 'true' : 'false' ) + ', ' + authJM + ', ' + errMsg + ' )', 1 )
	}

	window.close();
}
			

