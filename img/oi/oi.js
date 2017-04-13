function ClearStatus()
{
	if (confirm( clearStatusMsg ))
	{
		document.AdminForm.func.value = "oi.ClearStatus";
		document.AdminForm.submit();
	}
	else { return }
}


function StopImport()
{
	if (confirm( stopImportMsg ))
	{
		document.AdminForm.func.value = "oi.StopImport";
		document.AdminForm.submit();
	}
	else { return }
}


function DeleteLogs()
{
	if ( $('input[name=logName]').is(':checked') )
	{
		if (confirm( deleteLogMsg ))
		{
			document.AdminForm.func.value = "oi.DeleteLogFile";
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


function IsValidFilename( filename )
{
	if (/^[\w-.]+$/.test(filename)) { return }
	else{
		alert( invalidFilenameMsg )
		return false;
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