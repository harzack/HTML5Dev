//	<!-- File: webnode/copyattrenabled.js -->
//	<!-- HTML File: webnode/copy.html -->
/*
* AttrsEdit
* This function is used to bring out the edit categories window if the copied node required attributes
*
* @param	theForm		type:object - current form
* @return	nothing
*/ 
function AttrsEdit( theForm )
{
	var		editAttrUrl;
	var		sourceType;
	var		w;

	var		cacheID = theForm.COPY_CacheID.value;
	var		nodeID = theForm.objID.value;
	var		required = theForm.COPY_Required.value;
	var		destID = theForm.DEST_ID.value;


	if ( theForm.CopyOption[ 0 ].checked )
	{
		sourceType = 0;
	}
	else if ( theForm.CopyOption[ 1 ].checked )
	{
		sourceType = 1;
	}
	else
	{
		sourceType = 2;
	}

	editAttrUrl = oscriptValues.urlPrefix + "?func=ll&objId=" + nodeID + "&objAction=EditAttrValuesEdit&nodeType=" + oscriptValues.subType + "&Required=" + required + "&CacheID=" + cacheID + "&formname=CopyToForm&fieldprefix=COPY"
	editAttrUrl = editAttrUrl + "&AttrType=" + localMessages.categories + "&hdrTitle=" + localMessages.copy

	editAttrUrl = editAttrUrl + "&SecSourceID=" + destID + "&SourceType=" + sourceType;

	w = window.open( editAttrUrl, "CopyAttrEdits", "top=1,left=1,width=548,height=388,resizable=yes,menubar=no,scrollbars=yes,toolbar=yes" )

	if ( w.focus )
	{
		w.focus();
	}
}

/*
* ResetCategoryNames
* This function is used to reset the category names
*
* @param	newValue		type:string - message to use
* @param	attrRequired	type:boolean
* @return	nothing
*/ 
function ResetCategoryNames( newValue, attrRequired )
{
	document.CopyToForm.COPY_CatNames.value = newValue

	if ( attrRequired )
	{
		document.COPY_CatRequiredIcon.src = oscriptValues.supportDirectory + 'required.gif'
		document.COPY_CatRequiredIcon.alt = localMessages.Required
	}
	else
	{
		document.COPY_CatRequiredIcon.src = oscriptValues.supportDirectory + 'spacer.gif'
		document.COPY_CatRequiredIcon.alt = ''
	}
}

/*
* 
optionChanged
* This function is used to validate any option combinations when they are changed and reset the appropriate values
*
* @param	theForm		type:object - current form
* @param	index		type:integer 
* @return	nothing
*/ 
function optionChanged( theForm, index )
{
	//	Cannot select the Destination or Merged option if not destination item is selected.

	if ( !( theForm.CopyOption[ 0 ].checked ) && ( theForm.DEST_ID.value == 0 ) )
	{
		alert( localMessages.needSelectDestinationItemToCopyToInOrderToSelectThisOption );
		theForm.CopyOption[ currOption ].checked = true;
	}
	else
	{
		//	Warn the user about losing the modified data.

		if ( theForm.COPY_CacheID.value != '0' )
		{
			if ( confirm( localMessages.editedCategoriesChangingOfOptionWillEraseDataContinue ) )
			{
				theForm.COPY_CacheID.value = '0';
				theForm.COPY_Edited.value = '0';

				currOption = index;
			}
			else
			{
				theForm.CopyOption[ currOption ].checked = true;
			}
		}
		else
		{
			currOption = index;
		}

		if ( theForm.CopyOption[ 0 ].checked )
		{
			ResetCategoryNames( localMessages.catNames, oscriptValues.attrRequired )
		}
		else
		{
			ResetCategoryNames( localMessages.notDetermined, 0 )
		}
	}
}

//	<!-- End File: webnode/copyattrenabled.js -->

