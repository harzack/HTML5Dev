	/**	
	* Returns the name of the current object.  It checks the screen value for	
	* the object's name and if it is not valid then the object's name from the DB is returned instead.	
	*	
	* @param	formNodeName	type:object - current object - The reason an Object is passed in is that the
	*							docName text box may not exist if the user does not have modify permissions. 	
	* @param	dbNodeName		type:string - current objects name from the DB (from response.data)	
	* @return	a string containing the objects name
	*/ 
	
	function getNodeName( formNodeName, dbNodeName )
	{
	
		if ( typeof( formNodeName ) == "undefined" )
		{
			return dbNodeName;
		}
		else
		{
			return formNodeName.value;
		}
	
	}
	
	
	/**
	* Returns the resulting string after all invalid characters have been removed. A boolean can be
	* passed in which indicates whether blanks are considered invalid.  Pass in "false" when blanks are OK.
	* 
	* @param	target			type:string - a string you want to remove invalid characters from
	* @param	includeSpace	type:boolean - to identify if spaces are considered invalid
	* @return	a string after invalid characters have been removed
	*/ 
	
	function sanitizeName( target, includeSpace )
	{
	
		var badChars = '!%()-{}[];";\'<>?,./\\';
		var letter;
		var inx;
	
		if ( includeSpace )
		{
			badChars += ' ';
		}
	
		newName = "";
	
		for ( i = 0; i < target.length; i++ )
		{
	
			letter = target.charAt( i ).toLowerCase();
			inx = badChars.indexOf( letter );
			if ( inx == -1 )
			{
				newName += target.charAt( i );
			}
			else
			{
				newName += "_";
			}
	
		}
	
		return newName
	}
	
	
	/**
	* Nothing returned. This function is called when the user presses the OK button on the object
	* property page to send an email containing the Short link. It performs one of the following actions:
	* 	- emails the short link to the current objects property page
	* 	- emails the short link to the current objects default action page
	* 	- If using IE copies the short link to the current objects property 
	*	  page to the clipboard
	* 	- If using IE copies the short link to the current objects default
	*	  action page to the clipboard
	*
	* @param	theObj		type:object - current object
	* @param	dbNodeName	type:string - the name of the object (from response.data)
	* @param	liveLinkURL	type:string - URL mapping to the Livelink install
	* @param	dataID		type:string - dataID of the item
	* @param	emailBody	type:string - xLates value contained in [Nickname_HTMLLabel.EmailBody]
	* @param	copyMsg1	type:string - xLates value contained in [Nickname_HTMLLabel.Clipboard1]
	* @param	copyMsg2	type:string - xLates value contained in [Nickname_HTMLLabel.Clipboard2]
	* @return	nothing
	*/ 
	
	function emailCopyShortLink( theObj, dbNodeName, liveLinkURL, dataID, emailBody, copyMsg1, copyMsg2 )
	{
		var objectURL;
		var mailtoURL;
		var theDocName;
		var bodyText;
		var emailFrame;
			
		var myObj = theObj.form.doAction;
		var theValue = myObj.options[ myObj.selectedIndex ].value;
		var theList = theValue.split( "||" );	
		var inJapanese = false;


		if ( NS ) {
			inJapanese = ( window.navigator.language.indexOf( "jp" ) != -1 );
		} else {	
			inJapanese = ( window.navigator.userLanguage.indexOf( "ja" ) != -1 );	
		}

		objectURL = liveLinkURL + "/" + encodeURIComponent( theList[ 1 ] ) + "/" + dataID;
	
		// this option is only available on IE it allows the links to be copied to the clipboard
		if ( theList[ 0 ] == "c" ) {
			if ( window.clipboardData && window.clipboardData.setData ) {
				window.clipboardData.setData( 'Text', objectURL );
			} else {
				// set the value for the URL
				theObj.form.copyText.value = objectURL;
				theObj.form.copyText.select();
				ss = theObj.form.copyText.createTextRange();
				ss.execCommand( "Copy" );
			}
	
			// having to replace the parameter place holder from the xLates file 
			// here because in the INPUT clause theObj was not available
			copyMsg1 = StringFormat( copyMsg1, theList[ 2 ] );
			alert( copyMsg1 + "\n" + copyMsg2 );
		} else {
			if ( inJapanese ) {
				// Just have the link in the mail body and nothing else
				
				mailtoURL = 'mailto:?body=' + encodeURIComponent( objectURL );
			} else {
				theDocName = encodeURIComponent( getNodeName( theObj.form.docName, dbNodeName ) );
				bodyText = encodeURIComponent( '"' ) + theDocName + encodeURIComponent( '"' ) + emailBody + encodeURIComponent( objectURL );
	
				//use window.location here instead of window.open to eliminate a blank window/tab opening in firefox and Safari
				
				mailtoURL = 'mailto:?subject=' + theDocName + '&body=' + bodyText;
			}

			emailFrame = document.getElementById( 'emailFrame' );

			if ( emailFrame ) {
				// Open the mailto link in an iframe to prevent Internet Explorer from popping up a new window.
				
				emailFrame.src = mailtoURL;
			} else {
				window.location = mailtoURL;
			}
		}
	}
	
	
	/*
	* Returns nothing. This function is called when the user presses the OK button on the object
	* property page to change the Nickname. It opens a new window to allow the user to change the nickname.
	*
	* @param	docName		type:object - current objects name - this is an object which is required for getNodeName
	* @param	dbNodeName	type:string - the name of the object (from response.data)
	* @param	liveLinkURL	type:string - URL mapping to the Livelink install
	* @param	dataID		type:string - dataID of the item
	* @return	nothing
	*/ 
	
	function openChangeNickname( docName, dbNodeName, liveLinkURL, dataID )
	{
		var frmNodeName = getNodeName( docName, dbNodeName );
		var oldName = sanitizeName( frmNodeName, false );
		var newName = encodeURIComponent( oldName );
	
		if ( oldName != frmNodeName )
		{
			newName += "&badChars=1";
		}
	
		var w = window.open( liveLinkURL + '?func=nickname.change&nodeid=' + dataID + '&name=' + newName, 'ChangeNickname','width=550,height=410,resizable=yes,scrollbars=yes,menubar=no' );
		if ( w )
		{
			w.focus();	
		}
	}
	
	
	/*
	* Returns a string with substitutions made. This function is a javascript version
	* of str.format().  You pass in a string that has parameters represented with 
	* placeholders in the format %1 or %2.  It will replace each parameter respectively 
	* with the arguments provided. The number of parameters passed into this function can vary,
	* but is limited to 10 ( 1 string to perform substitution on and 9 arguments ). 
	* Each value passed into the function is loaded into the arguments property of the function
	* The arguments property is an array of parameters passed into the function.  To access the 
	* values for substitution start with array element 1.  The placeholder (%1) will be replaced
	* each time it occurs in the string.
	* <p>
	* Syntax for use:	StringFormat( "This is a %1 string for %2titution", "test", "sub" )
	* Resulting output: This is a test string for substitution
	*
	* @param	stringToFormat	type:stringobject - string to format
	* @return	string with substitutions made
	*/ 
	
	function StringFormat( stringToFormat )
	{
		// check to see if there are 2 arguments in the argument list
		if ( arguments.length <= 1 || stringToFormat.indexOf( "\%" ) == -1  )
		{
			// if there are not 2 or more arguements there is nothing to replace
			// just return the original string
			return stringToFormat;	
		}
		
		// the maximum parameters allowed is 9 plus the original string( arguments[0] )
		var totalIteration = 10;
	
		// if less than 9 parameters were passed - reduce the loops performed
		if ( arguments.length <= totalIteration )
		{
			totalIteration = arguments.length
		}
	
		for( var i = 1; i < totalIteration; i++ )
		{
			// loop through the string until all occurrences have been replaced
			while ( stringToFormat.indexOf( "\%" + i ) != -1 )
			{
				stringToFormat = stringToFormat.replace( "\%" + i  , arguments[ i ] );
			}
	
			// check to see if there are any more "%" in the string
			if ( stringToFormat.indexOf( "\%") == -1)
			{
				// if there are no more "%" then there is nothing more to replace
				// return the string as it is now
				return stringToFormat;
			}
		}
		return stringToFormat;
	}
