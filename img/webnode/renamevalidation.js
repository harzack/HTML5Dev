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
				$( theForm ).trigger("submit");
			}
		}
		else
		{
			$( theForm ).trigger("submit");
		}
	}
}

function markDirty()
{
	isDirty = true;
}

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

	return true;
}