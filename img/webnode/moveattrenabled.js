//	<!-- File: webnode/moveattrenabled.js -->
//	<!-- HTML File: webnode/move.html -->
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

	var		cacheID = theForm.MOVE_CacheID.value;
	var		nodeID = theForm.objID.value;
	var		required = theForm.MOVE_Required.value;
	var		destID = theForm.DEST_ID.value;


	if ( theForm.MoveOption[ 0 ].checked )
	{
		sourceType = 0;
	}
	else if ( theForm.MoveOption[ 1 ].checked )
	{
		sourceType = 1;
	}
	else
	{
		sourceType = 2;
	}

	editAttrUrl = oscriptValues.urlPrefix + "?func=ll&objId=" + nodeID + "&objAction=EditAttrValuesEdit&nodeType=" + oscriptValues.subType + "&Required=" + required + "&CacheID=" + cacheID + "&formname=MoveToForm&fieldprefix=MOVE"
	editAttrUrl = editAttrUrl + "&AttrType=" + localMessages.categories + "&hdrTitle=" + localMessages.move

	editAttrUrl = editAttrUrl + "&SecSourceID=" + destID + "&SourceType=" + sourceType;

	w = window.open( editAttrUrl, "MoveAttrEdits", "top=1,left=1,width=548,height=388,resizable=yes,menubar=no,scrollbars=yes,toolbar=yes" )

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
	document.MoveToForm.MOVE_CatNames.value = newValue

	if ( attrRequired )
	{
		document.MOVE_CatRequiredIcon.src = oscriptValues.supportDirectory + 'required.gif'
		document.MOVE_CatRequiredIcon.alt = localMessages.Required
	}
	else
	{
		document.MOVE_CatRequiredIcon.src = oscriptValues.supportDirectory + 'spacer.gif'
		document.MOVE_CatRequiredIcon.alt = ''
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

	if ( !( theForm.MoveOption[ 0 ].checked ) && ( theForm.DEST_ID.value == 0 ) )
	{
		alert( localMessages.needSelectDestinationItemToMoveToInOrderToSelectOption );
		theForm.MoveOption[ currOption ].checked = true;
	}
	else
	{
		//	Warn the user about losing the modified data.

		if ( theForm.MOVE_CacheID.value != '0' )
		{
			if ( confirm( localMessages.editedCategoriesChangingOfOptionWillEraseDataContinue ) )
			{
				theForm.MOVE_CacheID.value = '0';
				theForm.MOVE_Edited.value = '0';

				currOption = index;
			}
			else
			{
				theForm.MoveOption[ currOption ].checked = true;
			}
		}
		else
		{
			currOption = index;
		}

		if ( theForm.MoveOption[ 0 ].checked )
		{
			ResetCategoryNames( localMessages.catNames, oscriptValues.attrRequired )
		}
		else
		{
			ResetCategoryNames( localMessages.notDetermined, 0 )
		}
	}
}

//	<!-- End File: webnode/moveattrenabled.js -->

