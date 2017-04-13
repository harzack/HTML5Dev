//	<!-- File: webnode/createNewAttributeFunctions.js -->
//	<!-- HTML File: webnode/create.html -->
// In webnodes/create.html the attributes need be handled in two distinct ways.  This JS file is for 

/*
* AttrsEdit 
* This function gets called when you edit/add catergories to new node.
*
* @return	nothing
*/ 
function AttrsEdit()
{
	var		editAttrUrl;
	var		inheritID;
	var 	w;
	var		errMsg;

	var		required = document.CreateForm.CREATE_Required.value;
	var		cacheID = document.CreateForm.CREATE_CacheID.value;
	var		verNum = document.CreateForm.CREATE_VerNum.value;

	if ( oscriptValues.inheritFromParent == false )
	{
		inheritID = eval( 'document.CreateForm.' + oscriptValues.inheritIDPrefix + '_ID.value' );

		errMsg = localMessages.noNodeToInheritAttributes2;
	}
	else
	{
		if ( oscriptValues.createIn == true ) /* indicated data.createIn is undefined */
		{
			inheritID = document.CreateForm.CTT_ID.value;
		}
		else
		{
			inheritID = document.CreateForm.CTT_ID[ document.CreateForm.CTT_ID.selectedIndex ].value;
		}

		errMsg = localMessages.noNodeToInheritAttributes;
	}

	if ( inheritID == '0' || inheritID == null )
	{
		alert( errMsg );
	}
	else
	{
		editAttrUrl = oscriptValues.urlPrefix + "?func=ll&objId=" + inheritID + "&Version=" + verNum +"&objAction=EditAttrValuesEdit&NonInherit=1&Required=" + required + "&CacheID=" + cacheID + "&formname=CreateForm&fieldprefix=CREATE";
		editAttrUrl = editAttrUrl + "&AttrType=" + localMessages.categories + "&hdrTitle=" + localMessages.new1;
		w = window.open( editAttrUrl, "CreateAttrEdits", "top=1,left=1,width=548,height=388,resizable=yes,menubar=no,scrollbars=yes,toolbar=yes" );

		if ( w.focus )
		{
			w.focus();
		}
	}
}

/*
* ClearAndSwitch 
* This function is used to ....
*
* @param	selTargetDialog	type:boolean 
* @param	clearFields		type:boolena 
* @return	nothing
*/ 
function ClearAndSwitch( selTargetDialog, clearFields )
{
	if ( clearFields == true )
	{
		document.CreateForm.InheritRequired.value = oscriptValues.nodeAttrRequired;
		document.CreateForm.CREATE_Required.value = oscriptValues.nodeAttrRequired;
		document.CreateForm.CREATE_Edited.value = '0';
		document.CreateForm.CREATE_ChangeCacheID.value = '';
		document.CreateForm.CREATE_CacheID.value = '0';
		document.CreateForm.CREATE_VerNum.value = '0';
	}

	if ( selTargetDialog == true )
	{
		ResetCategoryNames( localMessages.notDetermined, 0 );
	}
}

/*
* doSubmit 
* This function is used to ...
*
* @param	theForm			type:object - current form
* @return	retVal
*/ 
function doSubmit( theForm )
{
	var	retVal = true;

	// check whether we need to edit attribute before submitting.

	if ( ( theForm.InheritRequired.value == '1' ) && ( theForm.CREATE_Edited.value == '0' )  && !oscriptValues.addDocWithoutRequiredAttribute )
	{
		AttrsEdit();
	}
	else
	{
		if ( CheckFields( theForm ) == true )
		{

			//	Subclass or any custom code can register additional submit actions.
			//	Please refer to the description of this function.

			retVal = ExecSubmitActionFuncs( theForm );

			//	Subclass webnode can implement a java script named
			//	submitActions to do data validation before actual submit.
			//
			//	Note: it is supported for backward compatibility.

			if( ( retVal == true ) && ( needSubmitActions == true )  )
			{
				retVal = submitActions( theForm );
			}
			if( retVal == true )
			{
				// trigger all functions that are bound to the submit action for this form
				$( theForm ).trigger("submit");
				
				if ( oscriptValues.addDocWithoutRequiredAttribute == true )
				{
					DisplayPopupDiv();
				}
			}
		}
	}

	return retVal
}

/*
* ResetCategoryNames 
* This function is used to ...
*
* @param	newValue		type:object - current objects name (document.formname)
* @param	attrRequired	type:string - the name of the object as a string
* @return	nothing
*/ 
function ResetCategoryNames( newValue, attrRequired )
{
	document.CreateForm.CREATE_CatNames.value = newValue;

	if ( attrRequired == true )
	{
		document.CREATE_CatRequiredIcon.src = oscriptValues.supportDirectory + 'required.gif';
		document.CREATE_CatRequiredIcon.alt = localMessages.required;
	}
	else
	{
		document.CREATE_CatRequiredIcon.src = oscriptValues.supportDirectory + 'spacer.gif';
		document.CREATE_CatRequiredIcon.alt = '';
	}
}

/*
* SwitchParent 
* This function is used to ...
*
* @param	selTargetDialog		type:boolean 
* @return	nothing
*/ 
function SwitchParent( selTargetDialog )
{
	if ( oscriptValues.inheritFromParent == true )
	{
		if ( document.CreateForm.CREATE_CacheID.value != '0' )
		{
			if ( confirm( localMessages.editedAttributeDataChangingCreationLocationEraseData ) == true )
			{
				ClearAndSwitch( selTargetDialog, true );
			}
		}
		else
		{
			ClearAndSwitch( selTargetDialog, true );
		}
	}
	else
	{
		ClearAndSwitch( selTargetDialog, false );

	}
}
//	<!-- End File: webnode/createNewAttributeFunctions.js -->


