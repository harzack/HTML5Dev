var XMLExportConfig = new function() 
{	
	return {
		doSubmit: function() 
		{
			var theForm = document.xmlExportForm;
			var scopeSelect = $( 'input:radio[name=scopeSelect]:checked' ).val();
			var scopeNumber = parseInt( theForm.scopeNumber.value );
			var ok = true;
		
			// Check the scope radio buttons.  If "base", "sub", or "one", then
			// pass those values to the export action.  If it's a specific scope, then
			// get the number as input.  
			
			if ( scopeSelect == 'specific' )
			{
				if ( isNaN( scopeNumber ) )
				{
					alert( LocString( 'Scope must be specified.', xmlExportConfigStr ) );
					ok = false;
				}
				else if ( scopeNumber <= 0 )
				{
					alert( LocString( 'Scope must be greater than zero.', xmlExportConfigStr ) );
					ok = false;
				}
				else
				{
					theForm.scope.value = scopeNumber;
				}
			}
			else
			{
				theForm.scope.value = scopeSelect;
			}
			
			if ( ok )
			{
				theForm.submit();
			}
		}
	}
};
