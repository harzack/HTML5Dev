/*
*  Ensure at least one option has been selected. 
*/

function checkIfAnySelected( theForm )
{

	var len = theForm.elements.length;
	var checked = false;
	
	for ( var i = 0; i < len; i++ )
	{
		var e = theForm.elements[i];
		
		if ( e.type=='checkbox' && e.checked == true )
		{
			checked = true;
			break;
		}
	}
	
	return checked;
}
	
function checkCheckBoxes( theForm, msg )
{
	
	if ( checkIfAnySelected( theForm ) == false )
	{
		alert (msg );
		return false;
	} else 
	{ 	
		return true;
	}

}