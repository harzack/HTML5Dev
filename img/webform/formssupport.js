	//
	// Public Function to perform a database lookup using webform v9.7.2
	//
	// This function simplifies lookup processing for lookups that return a single data
	// row with 1 or more columns, and want to assign the values of those columns to 1
	// or more fields on a single optionally specified form.
	//
	// Input params
	//		lookupName			The name of the lookup object in Content Server to execute
	//		paramsAndTypes		a String containing zero or more pairs of field specifications 
	//								and type indicators to be passed to the lookup, with field
	//								spec and type indicator separated by a comma, and pairs
	//								separated by the vertical bar, i.e.
	//								"_1_1_3_1,String|1_1_7_2,Integer" or
	//								"_1_1_5_1,Date"
	//		colsAndFields		a String containing zero or more pairs of column names and 
	//								field specifications to be used to process the returned
	//								data, with column name and field spec separated by a comma, 
	//								and pairs separated by the vertical bar, i.e.
	//								"NAME,_1_1_8_1|ID,_1_1_9_1" or "ADDRESS,_1_1_10_1"; if not 
	//								needed, this parameter should be passed as either undefined 
	//								or an empty string. One reason the parameter would not be
	//								needed is if data returned by the lookup is going to be set
	//								in the function specified by the doneFunc parameter, below
	//		formName			the name specified in the <Form> html tag, which by default is
	//								"myForm". This parameter is optional, and if not specified 
	//								defaults to "myForm"
	//		doneFunc			a JavaScript function reference. If defined, upon completion of
	//								the lookup, this function will be called with 1 parameter,
	//								an object. This object will have the following data features:
	//
	//									columns			an array of Strings names of the returned columns, if error is false
	//									error			a Boolean, false if no error occurred
	//									errorDetail		a String, additional information about the error, if any, if error is true
	//									errorMessage	a String, the error message if error is true
	//									params			an array of the values used as parameters to the lookup, if error is false
	//									rows			an array of Objects, each object having features named
	//														for each column returned, if error is false
	//									statement		a String, the sql statement that was executed, if error is false
	//
 
	function GenericLivelinkLookup(
				lookupName,
				paramsAndTypes,
				colsAndFields,
				formName,
				doneFunc,
				llCgiPath )
	{
		var		i;
		var		pair;
		var		pairs;
		var		url;
		
		
		// -- Initialize the form name if not passed ---
		
		if ( formName === undefined || formName.length == 0 )
		{
			formName = "myForm";
		}
		
		
		url = "?func=webform.securelookup";

		// -- Add to the URL the name of the dblookup --
		url = url + "&lookupName=" + lookupName;
			
		// -- Add each param and param type to the URL --
		
		if ( ( paramsAndTypes != null ) && ( paramsAndTypes.length > 0 ) )
		{
			pairs = paramsAndTypes.split( '|' )
			
			for ( i = 0; i < pairs.length; i++ )
			{
				if ( pairs[ i ].length > 0 )
				{
					pair = pairs[ i ].split( ',' );
					
					if ( ( pair.length == 2 ) && ( pair[ 0 ].length > 0 ) && ( pair[ 1 ].length > 0 ) )
					{
						url = url + "&P" + ( i + 1 ) + "=" + document[ formName ][ pair[ 0 ] ].value;
						url = url + "&PT" + ( i + 1 ) + "=" + pair[ 1 ];
					}
				}
			}
		}
		
		LESFormsAjaxLookup( url, GenericLivelinkLookupResult, colsAndFields, formName, doneFunc );
	}
	
	function GenericLivelinkLookupResult(
				responseText,
				colsAndFields,
				formName,
				doneFunc )
	{
		var		i;
		var		pair;
		var		pairs;
		var		colVal;
		var		retVal;
		
		var		arr1 = responseText.split('|');
		

		if ( arr1.length )
		{
			retVal = LESDecodeFormsLookup( arr1[ 0 ] );

			if ( retVal != null )
			{
				if ( ( !retVal.error ) && ( colsAndFields != null ) && ( colsAndFields.length > 0 ) )
				{
					pairs = colsAndFields.split( '|' )
					
					for ( i = 0; i < pairs.length; i++ )
					{
						if ( pairs[ i ].length > 0 )
						{
							pair = pairs[ i ].split( ',' );
							
							if ( ( pair.length == 2 ) && ( pair[ 0 ].length > 0 ) && ( pair[ 1 ].length > 0 ) )
							{
								colVal = retVal.rows[ 0 ][ pair[ 0 ] ];
								document[ formName ][ pair[ 1 ] ].value = colVal;
							}
						}
					}
				}
			}
			
			if (  null != doneFunc )
			{
				doneFunc( retVal );
			}
		}
	}

	//
	// If an alert occurs, output details to the user (as if they can do
	// anything about it ;-) )
	//
	// This utility function is copied from support\core\otutilities.js
	//
	
	function exceptionAlert( e, msg )
	{

		var outStr = "An exception occurred in the script." +
					"\nError name: " + e.name +
					"\nError description: " + e.description +
					"\nError number: " + e.number +
					"\nError message: " + e.message;

		if ( null !== msg )
		{
			outStr += "\nDetails: " + msg;
		}

		alert ( outStr );
	}

	// This function will check the existance of the
	// incoming data and if it is null then set the
	// return to an empty string.  This will allow
	// the rest of code to work properly while the server
	// doesn't need to send unneeded data across the wire.
	
	function LESDecodeFormsString( inValue )
	{
		var		retVal;
		
		
		if ( undefined === inValue )
		{
			retVal = "";
		}
		else if ( "string" != typeof inValue )
		{
			retVal = inValue;
		}
		else
		{
			retVal = decodeURIComponent( inValue );
		}

		return retVal;
	}

	//
	// This function takes as input the data sent from the server in
	// response to a webform.SecureLookup request, then walks it to
	// decode any strings that might be present.
	//
	
	function LESDecodeFormsLookup( inStringData )
	{	
		var 	col;
		var 	cols;
		var 	numCols;
		var 	numRows;
		var 	numTables;
		var 	row;
		var		rowVal;
		
		var		retVal = null;


		try
		{
			// first need to eval the data block coming back from the server
			retVal = eval( inStringData );
		}
		catch(e)
		{
			exceptionAlert( e, "Error: formssupport.js/DecodeFormsLookup.  Corrupt data from the server. " );
			retVal = null;
		}

		if ( null !== retVal )
		{
			try
			{
				if ( !retVal.error )
				{
					numRows = retVal.rows.length;
					cols = retVal.columns;
					numCols = cols.length;

					for ( row = 0; row < numRows; row++ )
					{
						rowVal = retVal.rows[ row ];

						for ( col = 0; col < numCols; col++ )
						{
							// Need to unescape all of the string based values
							
							rowVal[ cols[ col ] ] = LESDecodeFormsString( rowVal[ cols[ col ] ] );
						}
					}
					
					// Need to unescape the executed statement
					
					retVal.statement = LESDecodeFormsString( retVal.statement );
					
					cols = retVal.params;
					numCols = cols.length;
					
					for ( col = 0; col < numCols; col++ )
					{
						// Need to unescape all of the string parameters
						
						retVal.params[ col ] = LESDecodeFormsString( retVal.params[ col ] );
					}
				}
			}
			catch(e)
			{
				exceptionAlert( e, "Issue occured in formsupport.js/DecodeFormsLookup.  No update of data done. " );
			}
		}
		
		return retVal;
	}
	
	//
	// This function takes as input the data sent from the server in
	// response to a webform.DataLookup request, then walks each result
	// set to decode any strings that might be present.
	//
	
	function LESDecodeFormsLookupList( inStringData )
	{	
		var 	col;
		var 	cols;
		var 	numCols;
		var 	numRows;
		var 	numTables;
		var 	row;
		var		rowVal;
		var 	table;

		var 	retVal = null;
		

		try
		{
			// first need to eval the data block coming back from the server
			retVal = eval( inStringData );
		}
		catch(e)
		{
			exceptionAlert( e, "Error: formssupport.js/DecodeFormsLookupList.  Corrupt data from the server. " );
			retVal = null;
		}

		if ( null !== retVal )
		{
			try
			{
				if ( retVal.length !== 0 )
				{
					numTables = retVal.length;
					
					for ( table = 0; table < numTables; table++ )
					{
						numRows = retVal[ table ].rows.length;
						cols = retVal[ table ].columns;
						numCols = cols.length;
	
						// Need to unescape all of the returned string values
								
						for ( row = 0; row < numRows; row++ )
						{
							rowVal = retVal[ table ].rows[ row ];
	
							for ( col = 0; col < numCols; col++ )
							{
								rowVal[ cols[ col ] ] = LESDecodeFormsString( rowVal[ cols[ col ] ] );
							}
						}
					
						// Need to unescape the executed SQL statement
						
						retVal[ table ].statement = LESDecodeFormsString( retVal[ table ].statement );
						
						// Need to unescape all of the string parameters
							
						cols = retVal[ table ].params;
						numCols = cols.length;
						
						for ( col = 0; col < numCols; col++ )
						{
							retVal[ table ].params[ col ] = LESDecodeFormsString( retVal[ table ].params[ col ] );
						}
					}
				}
			}
			catch(e)
			{
				exceptionAlert( e, "Issue occured in formsupport.js/DecodeFormsLookupList.  No update of data done. " );
			}
		}
				
		return retVal;
	}

	// This function is used by multivalued form fields to add an 
	// additional instance value
	//
	//	fieldName	the name of the field that wants another instance
	//	index		where to add the instance
	//
	function addRowSubmit( fieldName, index )
	{
		document.myForm.func.value = 'webform.AttrValueAdd';
		document.myForm.LL_AttrFieldName.value = fieldName;
		document.myForm.LL_AttrFieldIndex.value = index;
		document.myForm.submit();
	}
		
	
	// This function is used by multivalued form fields to remove an 
	// instance value
	//
	//	fieldName	the name of the field that wants an instance deleted
	//	msg		the confirmation message to display to the user
	//
	function delRowSubmit( fieldName, msg )
	{
		if ( confirm( msg ) )
		{
			document.myForm.func.value = 'webform.AttrValueDelete';
			document.myForm.LL_AttrFieldName.value = fieldName;
			document.myForm.submit();
		}
	}
	
	// This function is used by forms to submit
	//
	//	theForm		the form object on the html page
	//

	function doFormSubmit ( theForm )
	{
		var		tempObj;
		
		
		for ( i = 0; i < theForm.length; i++ )
		{
			tempobj = theForm.elements[ i ];
			
			if ( tempobj.type.toLowerCase() == "button" )
			{
				tempobj.disabled = true;
			}
		}
		
		theForm.submit();
	}
	
	//
	// This function issues a get request to the server to perform the lookup
	// 
	//	url			the request to submit
	//	resTextFunc	the JavaScript function to execute upon successful completion of the request
	//	param1		an optional argument which will be passed to resTextFunc as the second parameter
	//	param2		an optional argument which will be passed to resTextFunc as the third parameter
	//	param3		an optional argument which will be passed to resTextFunc as the fourth parameter
	//
	function LESFormsAjaxLookup( url, resTextFunc, param1, param2, param3 )
	{
		createXMLHttpRequest();

		if ( httpXMLObj  )
		{
			if ( isInternetExplorer() )
			{
				// for IE we need to not cache the pages :-S.  The easest thing to do
				// is to append the time stamp to the url
				url = url + "&timestamp=" + getTimeStamp( true );
			}

			httpXMLObj.onreadystatechange = function() {
				if (httpXMLObj.readyState == 4)
				{
					try // ff throws an exception sometimes
					{
						if (httpXMLObj.status == 200)
						{
							if ( httpXMLObj.responseText !== "" && null != resTextFunc )
							{
								resTextFunc(httpXMLObj.responseText, param1, param2, param3 );
							}
							cleanup();
						}
						else
						{
							alert( "Issue occured in formsupport.js/FormsAjaxLookup. Error submitting lookup http request; returned status was " + httpXMLObj.status );
						}
					}
					catch(e)
					{
						cleanup();
					}
				}
			};

			httpXMLObj.open("GET", url, true );
			httpXMLObj.send(null);
		}
	}

	function markDirty()
	{
	}
	

