// ********************************
// Function for check/uncheck all checkboxes
// ********************************

// NOTE: names the select/de-select checkbox as "top"

function ToggleAll( e, name ) 
{
	var frm = e.form;
	
	
	if ( e.checked )
	{
		CheckAll( e, name );
	}
	else
	{
		ClearAll( e, name );
	}
}

function Check( e )
{
	e.checked = true;
	$(e).parents(".browseRow1,.browseRow2").addClass("browseRowSelected");
}

function Clear( e )
{
	e.checked = false;
	$(e).parents(".browseRow1,.browseRow2").removeClass("browseRowSelected");
}

function CheckAll( e, name )
{	
	var	theForm = e.form;
	var len = theForm.elements.length;


	for ( var i = 0; i < len; i++ )
	{
		var f = theForm.elements[i];

		if ( f.name == name )
		{	
			Check( f );
		}
	}
}

function ClearAll( e, name )
{	
	var	theForm = e.form;
	var len = theForm.elements.length;


	for ( var i = 0; i < len; i++ ) 
	{
		var f = theForm.elements[ i ];
		
		if ( f.name == name )
		{
			Clear( f );
		}
	}
}

function AllChecked( e, name )
{
	var	theForm = e.form;
	var	len = theForm.elements.length;


	for( var i = 0 ; i < len ; i++ ) 
	{
		if ( ( theForm.elements[i].name == name) && (!theForm.elements[i].checked ) )
		{
			return false;
		}
	}
	return true;
}

function Toggle( checkAllField, e, name )
{
	var	elm;
	
	// Find browse row parent
	if (e.checked)
		$(e).parents(".browseRow1,.browseRow2").addClass("browseRowSelected");
	else
		$(e).parents(".browseRow1,.browseRow2").removeClass("browseRowSelected");
	
	var frm = e.form;
	var	len = frm.elements.length;
	
	for( var i = 0 ; i < len ; i++ )
	{
		elm = frm.elements[ i ];
		if ( elm.name == checkAllField )
		{
			elm.checked = AllChecked( e, name );
		}
	}
}
