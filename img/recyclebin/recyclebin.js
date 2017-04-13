//
// this method will select all of the subtypes for "recycle" or "delete"
//
// input:	condition (string)
//			R = recycle all
//			N = delete all
//

function SelectAll( condition )
{

	var theForm;
	var theElement;
	var elementName;
	
	for( iForm=0; iForm < document.forms.length; iForm++ )
	{
	
		theForm = document.forms[iForm];
		
		for( iElement=0; iElement < theForm.elements.length; iElement++ )
		{
		
			theElement = theForm.elements[iElement];
			
			if( theElement.type == "radio" )
			{
				elementName = theElement.name;
				
				if( elementName.indexOf("CB_") >= 0 && theElement.value == condition )
				{
					theElement.checked = true;
				}
				
			}
		
		}
	
	}
	
}

