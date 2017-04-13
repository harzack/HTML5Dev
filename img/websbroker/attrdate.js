var		labelTo = 'To';
var		labelFor = 'For';

function setLabels( newLabelTo, newLabelFor )
{
	labelTo = newLabelTo;
	labelFor = newLabelFor;
}

function updateDateField( datefield )
{
	// Hide or show date field controls based on selected type (any date, past week, specific date, etc.).
	
	var		fieldname = datefield.name;
	var		newValue = datefield.options[ datefield.selectedIndex ].value;
	
	switch( newValue.substr( 0, 4 ) )
	{
		case 'anyd':
		case 'defi':
		case 'past':
			doUpdateDateField( fieldname + '_DFrom', true );
			doUpdateDateField( fieldname + '_DTo', true );
			break;
			
		case 'spec':
			doUpdateDateField( fieldname + '_DFrom', true );
			doUpdateDateField( fieldname + '_DTo', false, labelFor );
			break;
			
		case 'rang':
			doUpdateDateField( fieldname + '_DFrom', false );
			doUpdateDateField( fieldname + '_DTo', false, labelTo );
			break;
	}
}

function doUpdateDateField( fieldname, hide, newLabel )
{
	var		i;
	var		element;
	var		suffixes = new Array( 
				'', 
				'_dirtyFlag', 
				'_month', 
				'_day', 
				'_year', 
				'_century', 
				'_decade', 
				'_hour', 
				'_minute', 
				'_second', 
				'_ampm' );
	
	// special handling for table row since it is not an input element
	element = document.getElementById( fieldname + '_Row' );
	
	if ( null != element )
	{
		element.style.display = ( hide ? 'none' : '' );
		element.style.visibility = ( hide ? 'hidden' : 'visible' );
	}
	
	if ( null != newLabel )
	{
		element = document.getElementById( fieldname + '_Label' );
		
		if ( null != element )
		{
			if ( null != element.firstChild )
			{
				element.firstChild.nodeValue = newLabel;
			}
		}
	}
	
	for ( i = 0; i < suffixes.length; i++ )
	{
		element = document.getElementById( fieldname + suffixes[ i ] );
		
		if ( null != element )
		{
			element.style.display = ( hide ? 'none' : '' );
			element.style.visibility = ( hide ? 'hidden' : 'visible' );
			element.disabled = hide;
		}
	}
}