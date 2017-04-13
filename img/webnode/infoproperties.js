//	<!-- File: webnode/infoproperties.js -->
//	<!-- HTML File: webnode/infoproperties.html -->
/*
/*
* anyChanged 
* This function checks to see if the user has confirmed a discard
*
* @param	nothing
* @return	Boolean
*/ 
function anyChanged()
{
	if ( isDirty )
	{
		if ( confirm( localMessages.confirmDiscard ) )
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	return true
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
	retVal = CheckFields( theForm.docName );
	
	if ( retVal == true )
	{
		if ( needSubmitActions )
		{
			if ( submitActions( theForm ) )
			{
				$( theForm ).trigger( "submit" );
			}
		}
		else
		{
			$( theForm ).trigger( "submit" );
		}
	}
}
/*
* iconPicker
* This function is used to set some values and open a new window for picking Icons
*
* @param	nothing
* @return	nothing
*/ 
function iconPicker()
{
	var		gif = encodeURIComponent( document.InfoPropertiesFrm.nodeGIF.value );
	var		name = encodeURIComponent( document.InfoPropertiesFrm.docName.value );
	var		w = window.open( oscriptValues.urlPrefix + "?func=ll.iconpicker&form=InfoPropertiesFrm&defIcon=" + gif+"&docName=" + name, 'IconPicker','width=460,height=335,resizable=yes,scrollbars=yes,menubar=no');
}
/*
* markDirty
* This function is used to set the boolean isDirty to TRUE
*
* @param	nothing
* @return	nothing
*/ 
function markDirty()
{
	isDirty = true;
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
* resetGif
* This function is used to reset the GIF used
*
* @param	nothing
* @return	nothing
*/ 
function resetGif()
{
	document.InfoPropertiesFrm.typeImg.src = oscriptValues.webNodeGIF;
}
		
//	<!-- End File: webnode/infoproperties.js -->

