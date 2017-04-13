function IsValidFilename( filename )
{
	if (/^[\w-.]+$/.test(filename)) { return }
	else{
		alert( invalidFilenameMsg )
		return false;
	}	
}


function DeleteLogs()
{
	if ( $('input[name=logName]').is(':checked') )
	{
		if (confirm( deleteLogMsg ))
		{
			document.AdminForm.func.value = "oe.DeleteLogFile";
			document.AdminForm.submit();
		}
		else { return }
	}
	else
	{
		alert( selectLogFile );
		return;
	}
}


function SelectAll( theForm, isChecked )
{
	var theElement;
	var elementName;
	
		
	for( iElement=0; iElement < theForm.elements.length; iElement++ )
	{
		
		theElement = theForm.elements[iElement];
			
		if( theElement.type == "checkbox" )
		{
			elementName = theElement.name;
				
			if( elementName.indexOf("logName") >= 0 )
			{
				theElement.checked = isChecked;
			}
				
		}
		
	}
	
}