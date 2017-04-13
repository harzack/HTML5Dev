//	<!-- File: validatename.js -->
/*
* checkEmptyName
* This function is the old way we validated the name before multilingual metadata was introduced.
* This method has been left in for backwards compatibility, but moving forward we should be using the
* checkFields method below.
*
* @param	theForm		type:object - current form
* @param	theField	type:
* @return	retVal
*/
function CheckEmptyName( theForm, theField )
{
	var	retVal = false;
	var len = theForm.elements.length;

	for ( var i = 0; i < len; i++ )
	{
		var e = theForm.elements[i];

		if ( e.name == theField )
		{
			if ( e.value == '' )
			{
				retVal = true;
				break;
			}
		}
	}
	return retVal;
}

var 	nameArray = [];

/*
* CheckFields
* This function is used to validate the entered name
*
* @param	element		type:object - current element
* @param	opt_errorID 	type:string - [optional-null] to be used in multi-object error handling, if used the ID of element to be 'nameErrorMsg_{errorID}'
* @param	opt_resetNameValidation		type:boolean - [optional-TRUE] to indicate if the name validation should be cleared before checking
* @return	retVal
*/
function CheckFields( element, opt_errorID, opt_resetNameValidation )
{
	var		nameID;
	var		checkNameID;
	var		namePrefix;
	var		nameListStr;
	var		errMsg;
	var		noApplet;
	var		langArray;
	var		langCode;
	var		nameVal;
	var		objID;

	var		elements = new Array();
	var		hasName = false;
	var		hasColon = false;
	var		retval = true;
	var		origname = $("#" + element.name + "_orig").val();
	var		objtype = $("#" + element.name + "_objtype").val();
	var		parentID = $("#" + element.name + "_parent").val();
	var		secureRequestToken = $("#secureRequestToken").val();
	

	// there are two ways to include the objId in the checking for the existance
	// 1. include the objid reference, typically used in the case of the single object operations
	// 2. include the element.name + "_objId", this is used for multi object pages like copymulti or editconfig
	//
	// if neither of these fields exist then no objid checking will be included
	if ( ( objID = $("#" + element.name + "_objId").val() ) == null )
	{

		objID = $("#objId").val();
	}

	if ( opt_resetNameValidation == null )
	{
		opt_resetNameValidation = true;
	}

	if ( opt_resetNameValidation )
	{
		clearNameValidation();
	}

	namePrefix = element.name;
	//
	//	Validate the name
	//

	//
	//	Build and trim the name variants
	//
	elements[0] = document.getElementById( namePrefix );
	elements[0].value = jQuery.trim( elements[0].value );
	nameListStr = '&name=' + encodeURIComponent( elements[0].value );

	if ( multiMetadataLang == true )
	{
		for ( var j = 0; j < langCodes.length; j++ )
		{
			langCode = langCodes[j];
			langArray = nameArray[langCode];
			if( langArray == null )
			{
				langArray = [];
			}

			nameID = namePrefix + '_' + langCode;
			checkNameID = 'name_' + langCode;
			elements[j+1] = document.getElementById( nameID );
			elements[j+1].value = jQuery.trim( elements[j+1].value );
			nameVal = encodeURIComponent( elements[j+1].value );
			nameListStr += '&' + checkNameID + '=' + nameVal;

			if ( nameVal.length )
			{
				if ( jQuery.inArray( nameVal, langArray ) > -1 )
				{
					retval = false;
					errMsg = String.formatLoc( "Duplicate name usage found" );
				}
				langArray.push( nameVal );
				nameArray[langCode] = langArray;
			}
		}
	}
	else
	{
		nameVal = elements[0].value;
		langArray = nameArray['root'];
		if( langArray == null )
		{
			langArray = [];
		}
		if ( nameVal.length )
		{
			if ( jQuery.inArray( nameVal, langArray ) > -1 )
			{
				retval = false;
				errMsg = String.formatLoc( "Duplicate name usage found" );
			}
			langArray.push( nameVal );
			nameArray[langCode] = langArray;
		}
	}

	if ( retval )
	{
		//
		//	Simple Name Validation
		//
		for ( var i = 0; i < elements.length; i++ )
		{
			//	Check for name
			if ( hasName == false && elements[i].value != "" )
			{
				hasName = true;
			}

			//	Check for colon
			if ( elements[i].value.indexOf( ":" ) != -1 )
			{
				hasColon = true;
				break;		//	Break when colon is found
							//	No need to continue processing
			}
		}
	}

	//
	//	Display error and set focus
	//
	if ( retval && needName && !hasName )
	{
		retval = false;
		errMsg = localMessages.nameCannotBeEmpty;
	}

	if ( retval && hasColon )
	{
		retval = false;
		errMsg = localMessages.nameCannotContainColon;
	}

	if ( retval && parentID != '0' && parentID !='-1' && parentID != null )
	{
		// Get the secure token
		nameListStr += '&secureRequestToken=' + encodeURIComponent( secureRequestToken );

		// Get the object type and send that along
		nameListStr += '&objType=' + objtype + '&isTransport=';

		// Do a transport Check
		var isTransport = document.getElementById('isTransport');

		if( isTransport == null )
		{
			nameListStr += 'FALSE';
		}
		else
		{
			nameListStr += 'TRUE';
		}

		if ( objID != '0' && objID !='-1' && objID != null )
		{
			nameListStr += '&objID=' + objID;
		}

		$.ajax({
			type: "POST",
			async: false,
			cache: false,
			data: "func=ll.CheckObjectNameExists&parentID=" + parentID + nameListStr,
			success: function( checkVal )
			{
				if ( checkVal.ok == false )
				{
					retval = false;
					errMsg = checkVal.errMsg;
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			}
		});
	}

	if ( retval == false && errMsg != null )
	{
		noApplet = document.getElementById( "noApplet" ).value

		if ( noApplet.toLowerCase() == 'true' )
		{
			alert( errMsg );
		}
		else
		{
			if ( opt_errorID == null )
			{
				$("#nameErrorMsg").text( ' ' + errMsg );
			}
			else
			{
				$("#nameErrorMsg_" + opt_errorID ).text( ' ' + errMsg );
			}
		}
		element.focus();
	}

	return retval;
}

function clearNameValidation()
{
	//
	// clear the language array
	//
	nameArray = [];
}

//Clears the error message section
function clearErrorText( opt_errorID )
{
	clearNameValidation();
	if ( opt_errorID == null )
	{
		if($("#nameErrorMsg").contents() != '')
		{
			$("#nameErrorMsg").empty();
		}
	}
	else
	{
		if($("#nameErrorMsg_" + opt_errorID ).contents() != '')
		{
			$("#nameErrorMsg_" + opt_errorID ).empty();
		}
	}
}

//	<!-- End File: validatename.js -->