//	<!-- File: webnode/create.js -->
//	<!-- HTML File: webnode/create.html -->
/*
* addSubmitActionFunc 
* This function is used to set additional action function for registration
*	The submit action function should have one parameter, which is the form, and
*	should return a boolean.
*
* @param	funcName		type:object - current form
* @return	boolean
*/ 
function addSubmitActionFunc( funcName )
{
	submitActionFuncs[ submitActionFuncs.length ] = funcName;
}

/*
* anyChanged
* This function is used to check if the dirty falg is set and returns a boolean
* @return	boolean
*/ 
function anyChanged()
{
	if ( isDirty )
	{
		if ( confirm( localMessages.youCanTEnterTextInByHandUseTheButtonToTheRight ) )
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	return true;
}

/*
* checkFields 
* This function is used to validate the entered name and confirm the node has a parent
*
* @param	theForm		type:object - current form
* @return	retVal
*/ 
function CheckFields( theForm )
{
	var		nameID;
	var		namePrefix;
	var		parentID;
	
	var		elements = new Array();
	var		hasName = false;
	var		hasColon = false;
	var		retval = true;
	
	
	namePrefix = 'name'
	
	
	//
	//	Validate the name
	//
	
	//
	//	Build and trim the name variants
	//
	
	elements[0] = document.getElementById( namePrefix );
	elements[0].value = jQuery.trim( elements[0].value );

	if ( multiMetadataLang == true )
	{
		for ( var j = 0; j < langCodes.length; j++ )
		{
			nameID = namePrefix + '_' + langCodes[j];
			elements[j+1] = document.getElementById( nameID );
			elements[j+1].value = jQuery.trim( elements[j+1].value );
		}
	}
	
	
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
	
	
	//
	//	Display error and set focus
	//
	
	if ( needName && !hasName )
	{
		retval = false;
		alert( localMessages.nameCannotBeEmpty );
		theForm.name.focus();
	}
	
	if ( hasColon )
	{
		retval = false;
		alert( localMessages.nameCannotContainColon );
		theForm.name.focus();
	}
	
	
	//
	//	Make sure there is a parent to create the node.
	//
	
	if ( retval && needCheckCTTID )
	{
		if ( createInPopup )
		{
			parentID = theForm.CTT_ID[ theForm.CTT_ID.selectedIndex ].value;

		}
		else
		{
			parentID = theForm.CTT_ID.value;
		}

		if ( parentID == '0' || parentID == null )
		{
			retval = false;
			alert( localMessages.youMustSpecifyWhatContainerToCreateThe1ItemIn );

			if ( createInPopup )
			{
				theForm.CTT_ID.focus();
			}
		}
	}

	return retval;
}

/*
* ClearField
* This function is used to reset a value
*
* @param	theForm		type:object - current form
* @return	nothing
*/ 
function ClearField( theForm )
{
	theForm.CTT_ID.value = oscriptValues.gCreate_OriginalCTTID;
	if ( createInPopup == false )
	{
		theForm.CTT_PathSaved.value = oscriptValues.CTT_PathSaved;
	}
}

/*
* CTT_DoSelection
* This function is used to reset values if the parent node has changed
*
* @param	nodeid		type:integer - nodeID
* @param	nodepath	type:string - the path of the node as a string
* @return	nothing
*/ 
function CTT_DoSelection( nodeid, nodepath )
{
	if ( nodeid != oscriptValues.gCreate_OriginalCTTID )
	{
		document.CreateForm.CTT_ID.value = nodeid;
		document.CreateForm.CTT_Path.value = nodepath;
		document.CreateForm.CTT_PathSaved.value = nodepath;

		oscriptValues.gCreate_OriginalCTTID = nodeid;
		SwitchParent( true );
	}
}

/*
* DisplayPopupDiv
* This function is used to ...
*
* @param	msg		type:string - message to display
* @param	imgName	type:string - the name of the image as a string
* @param	bgColor	type:string - the desired colour
* @return	nothing
*/ 
function DisplayPopupDiv( msg, imgName, bgColor )
{

	if ( null == msg )
	{
		msg = localMessages.uploadingDocument;
	}
	
	if ( null == imgName )
	{
		imgName = "circleecm_progmeter40x40.gif";
	}
	
	if ( null == bgColor )
	{
		bgColor = '#FFCCCC';
	}

	initPopup( oscriptValues.supportDirectory, imgName );
	popup( msg, bgColor );
}

/*
* ExecSubmitActionFuncs
* This function is called by the main submit function to execute all registered submit actions.
*
* @param	theForm		type:object - current form
* @return	nothing
*/ 
function ExecSubmitActionFuncs( theForm )
{
	var		idx;
	var		retVal = true;

	for ( idx = 0; idx < submitActionFuncs.length; idx++ )
	{
		retVal = eval( submitActionFuncs[ idx ] )( theForm );

		if ( !retVal )
		{
			break;
		}
	}
	return retVal;
}

/*
* 
iconPicker
* This function is used to initalize the fig for a node and the name and then open a window
*
* @param	URL		type:string - the URL as a string
* @return	nothing
*/ 
function IconPicker( URL )
{
		var		gif = encodeURIComponent( document.CreateForm.nodeGIF.value );
		var		name = encodeURIComponent( document.CreateForm.name.value );
		var		w = window.open( URL + '?func=ll.iconpicker&form=CreateForm&defIcon=' + gif+"&name=" + name, 'IconPicker','width=460,height=335,resizable=yes,scrollbars=yes,menubar=no');
}

/*
* KeepFieldSet
* This function is used to display and alert
*
* @param	field			type:string - value to determine ealert is necessary - alert if blank
* @param	originalValue	type:string - the name of the object as a string
* @param	id				type:string - new value to set object to
* @return	nothing
*/ 
function KeepFieldSet( field, originalValue, id )
{
	if ( field.value != '' )
	{
		alert( localMessages.youCanTEnterTextInByHandUseTheButtonToTheRight );
		field.value = originalValue.value;
	}
}

/*
* markDirty
* This function is mark something as dirty
*
* @return	nothing
*/ 
function markDirty()
{
	isDirty = true;
}

/*
* MarkNameAsUserChanged
* This function is used to identify that the user has changed the name
*
* @return	nothing
*/ 
function MarkNameAsUserChanged()
{
	if (typeof( enableAutoDocumentName ) != "undefined")
	{
		enableAutoDocumentName = false;
	}
}

/*
* resetGif
* This function is used to reset the source of the gif
*
* @return	nothing
*/ 
function resetGif()
{
	document.CreateForm.typeImg.src = oscriptValues.typeImage;
}
//	<!-- End File: webnode/create.js -->

