//	<!-- File: webnode/copy.js -->
//	<!-- HTML File: webnode/copy.html -->

/*
* ClearField
* This function is used to reset a value
*	This function should have one parameter, which is the form, and
*	returns nothing
*
* @param	theForm		type:object - current form
*/ 
function ClearField( theForm )
{

	theForm.DEST_ID.value = 0;
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

		if ( ( theForm.COPY_CacheID.value != '0' ) && !(  theForm.CopyOption[ 0 ].checked ) )
		{
			if ( confirm( localMessages.editedCategoriesChangeOfDestinationLocationEraseDataContinue ) )
			{
				theForm.COPY_CacheID.value = '0';
				theForm.COPY_Edited.value = '0';

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

	var retVal = true;
	
	// Sync the main page with the GWT widget.  This is required in case the user deletes the name via the main
	// page and does NOT hit the globe.  If the globe has not been hit the GWT widget will still contain the value 
	// in the user's preferred language that was delted from the main page. 
	//(0) pushes data from the main page to the widget
	//(1) pulls data from the widget and into the main page
	
	if ( multiMetadataLang == true )
	{
		syncMetadataFields(0);
	}

	// validate the name values
	retVal = CheckFields( theForm.DEST_NAME );
	
	if ( retVal == true )
	{
		//	It is required that a copy to destination is selected.
		if ( theForm.DEST_ID.value == 0 )
		{
			alert( localMessages.youMustSpecifyAPlaceToCopyThisItemTo );
		}
		else if ( theForm.DEST_NAME == null )
		{
			alert( localMessages.itemIsNotCopyable );
		}
		else
		{
			if ( oscriptValues.attrEnabled == true )
			{

				//	Attributes feature is enabled, bring out the edit categories window if the copied node required attributes.

				if ( ( theForm.COPY_Required.value == '1' ) && ( theForm.COPY_Edited.value == '0' ) && !( theForm.CopyOption[ 0 ].checked ) )
				{
					AttrsEdit( theForm );
				}
				else
				{
					if ( oscriptValues.versioned == true )
					{

						//	Check if the user trying to create a new version which will be the exact duplicate of the current one.

						if ( ( theForm.AddVersion.checked ) && ( theForm.CopyOption[ 0 ].checked ) && ( theForm.COPY_Edited.value == '0' ) )
						{
							if ( confirm( localMessages.selectToCreateVersionButDuplicateContinue ) )
							{
								disableButtons( theForm )
								$( theForm ).trigger( "submit" );
							}
						}
						else
						{
							disableButtons( theForm )
							$( theForm ).trigger( "submit" );
						}
					}
					else
					{
						disableButtons( theForm )
						$( theForm ).trigger( "submit" );
					}
				}
			}
			else
			{
			
				//	No attributes feature is enabled, simply submit the form.
				disableButtons( theForm )
				$( theForm ).trigger( "submit" );
			}
		}
	}
}
//	<!-- End File: webnode/copy.js -->

