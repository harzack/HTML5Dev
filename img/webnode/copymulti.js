//	<!-- File: webnode/copymulti.js -->
//	<!-- HTML File: webnode/copymulti.html -->
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
	var 	w;
	
	var		cacheID = theForm.PROCESS_CacheID.value;
	var		nodeID = theForm.DEST_ID.value;
	var		required = theForm.PROCESS_Required.value;
	var		destID = theForm.DEST_ID.value;

	if ( theForm.ProcessOption[ 0 ].checked )
	{
		sourceType = 0;
		alert( localMessages.categoriesWarningMsg ); 
	}
	else 
	{
		sourceType = 1;
	}
	
	if ( sourceType != 0 )
	{
		editAttrUrl = oscriptValues.urlPrefix + "?func=ll&objId=" + nodeID + "&objAction=EditAttrValuesEdit&nodeType=0&Required=" + required + "&CacheID=" + cacheID + "&formname=CopyToForm&fieldprefix=PROCESS";
		editAttrUrl = editAttrUrl + "&AttrType=" + localMessages.categories + "&hdrTitle=" + localMessages.Copy;
		
		editAttrUrl = editAttrUrl + "&SecSourceID=" + destID + "&SourceType=" + sourceType;

		w = window.open( editAttrUrl, "CopyAttrEdits", "top=1,left=1,width=548,height=388,resizable=yes,menubar=no,scrollbars=yes,toolbar=yes" );

		if ( w.focus )
		{
			w.focus();
		}
	}
}
/*
* doBrowseLL 
* This function is used to warn the user about potentially lost information and 
* call the method that opens a window to select the destination for the copy
*
* @param	theForm		type:object - current form
* @return	retVal
*/ 
function doBrowseLL( theForm )
{
	if ( oscriptValues.attrEnabled == true )
	{

		//	Warn the user about losing modified attributes.

		if ( ( theForm.PROCESS_CacheID.value != '0' ) && !(  theForm.ProcessOption[ 0 ].checked ) )
		{
			if ( confirm( localMessages.editedCategoriesChangeOfDestinationLocationEraseDataContinue ) )
			{
				theForm.PROCESS_CacheID.value = '0';
				theForm.PROCESS_Edited.value = '0';

				doCopyTo( 'CopyToForm' , 'DEST' );
			}
		}
		else
		{
			doCopyTo( 'CopyToForm', 'DEST' );
		}
	}
	else
	{

		doCopyTo( 'CopyToForm', 'DEST' );
	}
}

/*
* doSubmit
* This function is used to submit the form
*
* @param	theForm		type:object - current form
* @return	nothing
*/ 
function doSubmit( theForm )
{

	var 	retVal = true;
	var 	resetNameValidation = true;

	// Sync the main page with the GWT widget.  This is required in case the user deletes the name via the main
	// page and does NOT hit the globe.  If the globe has not been hit the GWT widget will still contain the value 
	// in the user's preferred language that was delted from the main page. 
	//(0) pushes data from the main page to the widget
	//(1) pulls data from the widget and into the main page

	if ( multiMetadataLang == true )
	{
		syncMetadataFields(0);
	}

	// call CheckFields for each element on the page with the class 'multilingual'
	$('.multilingual').each(

		function()
		{
			if ( CheckFields( this, this.id, resetNameValidation ) == false )
			{
				retVal = false;
			}
			resetNameValidation = false;
		}

	);

	if ( retVal == false )
	{
		return false;
	}

	//	It is required that a copy to destination is selected.

	if ( theForm.DEST_ID.value == 0 )
	{
		alert( localMessages.youMustSpecifyAPlaceToCopyTheseItemsTo );
	}
	else
	{
		if ( oscriptValues.attrEnabled == true )
		{

			//	Attributes feature is enabled, bring out the edit categories window if the copied node required attributes.

			if ( ( theForm.PROCESS_Required.value == '1' ) && ( theForm.PROCESS_Edited.value == '0' ) && !( theForm.ProcessOption[ 0 ].checked ) )
			{
				AttrsEdit( theForm );
			}
			else
			{
				if ( oscriptValues.versioned == true )
				{

					//	Check if the user trying to create a new version which will be the exact duplicate of the current one.

					if ( ( theForm.AddVersion.checked ) && ( theForm.ProcessOption[ 0 ].checked ) && ( theForm.PROCESS_Edited.value == '0' ) )
					{
						if ( confirm( localMessages.selectToCreateVersionButDuplicateContinue ) )
						{
							disableButtons( theForm );
							$( theForm ).trigger( "submit" );
						}
					}
					else
					{
						disableButtons( theForm );
						$( theForm ).trigger( "submit" );
					}
				}
				else
				{
					disableButtons( theForm );
					$( theForm ).trigger( "submit" );
				}
			}
		}
		else
		{
		
			//	No attributes feature is enabled, simply submit the form.
			disableButtons( theForm );
			$( theForm ).trigger( "submit" );
		}
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
	
	if ( !( theForm.ProcessOption[ 0 ].checked ) && ( theForm.DEST_ID.value == 0 ) )
	{
		alert( localMessages.needSelectDestinationItemToCopyToInOrderToSelectThisOption );
		theForm.ProcessOption[ currOption ].checked = true;
	}
	else
	{
		//	Warn the user about losing the modified data.
		
		if ( theForm.PROCESS_CacheID.value != '0' )
		{
			if ( confirm( localMessages.editedCategoriesChangingOfOptionWillEraseDataContinue ) )
			{
				theForm.PROCESS_CacheID.value = '0';
				theForm.PROCESS_Edited.value = '0';

				currOption = index;
			}
			else
			{
				theForm.ProcessOption[ currOption ].checked = true;
			}
		}
		else
		{
			currOption = index;
		}
		
		if ( !theForm.ProcessOption[ 0 ].checked )
		{
			ResetCategoryNames( localMessages.notDetermined, 0 );
		}						
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
	document.CopyToForm.PROCESS_CatNames.value = newValue
	
	if ( attrRequired )
	{
		document.PROCESS_CatRequiredIcon.src = oscriptValues.supportDirectory + 'required.gif';
		document.PROCESS_CatRequiredIcon.alt = localMessages.Required;
	}
	else
	{
		document.PROCESS_CatRequiredIcon.src = oscriptValues.supportDirectory + 'spacer.gif';
		document.PROCESS_CatRequiredIcon.alt = '';
	}
}
		
//	<!-- End File: webnode/copymulti.js -->

