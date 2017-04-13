

// allows the reset button to properly reset the state of the disabled
// fields that are disabled/enabled as a result of the checkbox being
// clicked. Two branches here as Firefox and IE do things differently.
if ( AEformElement.addEventListener )
{
	AEformElement.addEventListener('reset',resetClicked,false);
}
else if (AEformElement.attachEvent )
{
	AEformElement.attachEvent('onreset',resetClicked);
}

/*
* addRow returns nothing. 
* This function is attached to the + button, allowing us to add 
* a new key/value pair. 
*
* @param	thisForm		type:object - current form
* @param	isObjectAction	type:boolean - used to determine what value to set
* @param	objAction		type:string - new value to set an object to
* @param	argFunc			type:string - new value to set an object to
* @return	nothing
*/ 
function addRow( thisForm, objAction, argFunc )
{
	if ( objAction != '' )
	{
		thisForm.objAction.value = objAction;
	}
	else
	{
		thisForm.func.value= argFunc;
	}

	thisForm.ReloadMode.name = 'none';
	thisForm.EditAction.value = "addrow";
	
	// LLAE-89 set a logical on the form to identify when we have called this routine
	//this is required to determine when to reset the form objects back to the 
	// request object values.
	thisForm.inAEEditMode.value = 'true';
			
	thisForm.submit();
}

/*
* deleteRow returns nothing. 
* This function is attached to the + button, allowing us to add 
* a new key/value pair. 
*
* @param	thisForm		type:object - current form
* @param	isObjectAction	type:boolean - used to determine what value to set
* @param	objAction		type:string - new value to set an object to
* @param	argFunc			type:string - new value to set an object to
* @param	count			type:integer - index of which key/value pair to delete
* @return	nothing
*/ 
function deleteRow( thisForm, objAction, argFunc, count )
{
	if ( objAction != '' )
	{
		thisForm.objAction.value = objAction;
	}
	else
	{
		thisForm.func.value= argFunc;
	}

	thisForm.ReloadMode.name = 'none';
	thisForm.EditAction.value = "deleterow";
	thisForm.deleteindex.value = count;
	
	// LLAE-89 set a logical on the form to identify when we have called this routine
	//this is required to determine when to reset the form objects back to the 
	// request object values.
	thisForm.inAEEditMode.value = 'true';
			
	thisForm.submit();
}

/*
* resetClicked returns nothing. 
* This function is attached to the reset button, allowing us to do extra things when 
* the reset button is clicked. 
* The time out allows the reset request to actually reset the checkbox if necessary prior to 
* altering the states of the other fields
*
* @return	nothing
*/ 
function resetClicked()
{
	window.setTimeout("doCustomSQL(AEformElement)", 10);
}

/*
* saveValueAfterAEEditMode returns nothing. 
* This function is used to maintain a users change to the value of an object after the 
* user has either added a new key/value pair or deleted an existing key/value pair. 
*
* @param	AEformName		type:object - current objects name (document.formname)
* @param	AEformObject	type:string - the name of the object as a string
* @param	requestValue	type:string - new value to set object to
* @return	nothing
*/ 
function saveValueAfterAEEditMode( AEformName, AEformObject, beforeValue )
{
	// maintains the edited name across adding or removing key field rows
	eval( 'document.' + AEformName + '.' + AEformObject + '.value="' + beforeValue + '"');
}

/*
* saveDropDownAfterAEEditMode returns nothing. 
* This function is used to maintain a users change to the value of an object after the 
* user has either added a new key/value pair or deleted an existing key/value pair. 
*
* @param	AEformName		type:object - current objects name (document.formname)
* @param	AEformObject	type:string - the name of the object as a string
* @param	requestValue	type:string - new value to set object to
* @return	nothing
*/ 
function saveDropDownAfterAEEditMode( AEformName, AEformObject, beforeValue )
{
	// maintains the edited dropdown selection across adding or removing key field rows
	//subtract 1 from the beforeValue since indexing starts at zero
	eval( 'document.' + AEformName + '.' + AEformObject + '.selectedIndex="' + (beforeValue - 1) + '"');
}

/*
* doCustomSQL returns nothing. 
* This function is attached to the reset button, allowing us to do extra things when 
* the reset button is clicked. 
* The time out allows the reset request to actually reset the checkbox if necessary prior to 
* altering the states of the other fields
*
* @param	thisForm	type:object - current form
* @return	nothing
*/ 
function doCustomSQL( thisForm )
{

	if( thisForm.CustomSQL.checked )
	{
		// disable everything on attreditstringtable.html with a CLASS of .disableOnCustomSQL
		$(".disableOnCustomSQL").attr('disabled',true);

		thisForm.validValues.disabled = false;
		thisForm.CustomSQL.value='1';

	}
	else
	{

		// enable everything on attreditstringtable.html with a CLASS of .disableOnCustomSQL
		$(".disableOnCustomSQL").attr('disabled',false);
		
		thisForm.validValues.disabled=true;
		thisForm.CustomSQL.value='0';
	}
}
			
$(function(){
// stuff to run once document is ready for DOM manipulation
	if ( document.EditAttrForm )
				{
		doCustomSQL( document.EditAttrForm );
			}
	else if( document.CreateAttrForm )
			{
		doCustomSQL( document.CreateAttrForm );
		}


});
