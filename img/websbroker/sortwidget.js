var	rsor_prevIndex = 0;
var	initial = false;
var	invalidComplexSortMsg = '';
var	searchFormName = '';
var	noJava = false;

function setInitialValues( form, sortby, rankby, rankdirection, inNoJava )
{
	if ( null !== form )
	{
		form.sortby.value = sortby;
		form.rankby.value = rankby;
		form.rankdirection.value = rankdirection;
		
		searchFormName = form.name;
		
		initial = true;
		changeRanking( form, false );
		initial = false;
	}

	if ( null != inNoJava )
	{
		noJava = inNoJava;
	}
}

function setInvalidComplexSortMsg( msg )
{
	invalidComplexSortMsg = msg;
}

function changeRanking( form, urlPrefix, title )
{
	var 	w;
	var 	sortby = "";
	var 	rankdirection = "";

	var 	rso = document.getElementById( "resultsSortOrder" );
	var 	rsor = document.getElementById( "resultsSortOrderRegion" );
	var	rankby = rsor.options[ rsor.selectedIndex ].value;

	// Note the explicit focus advance for keyboard accessible menus on Mozilla due to its late ONCHANGE execution
	if ( rankby != "" )
	{
		if ( rankby == '_custom_' ) 
		{
			if ( initial )
			{
				rsor_prevIndex = rsor.selectedIndex;
			
				hideSortOrderMenu( rso );
				
				showEditCustomButton( form );
			}
			else
			{
				// Spawn custom sort popup
				if ( rsor.options[ rsor_prevIndex ].value == "" )
				{
					doCustomsort( urlPrefix, title );
				}
				else
				{
					// Bootstrap with simple sort state iff != relevance
					doCustomsort( urlPrefix, title, '"' + rsor.options[ rsor_prevIndex ].value + '" ' + rso.options[ rso.selectedIndex ].value);
				}
			}
			
			return;
		}
		else
		{
			// Simple ranking
			rsor_prevIndex = rsor.selectedIndex;
			
			sortby = "region";

			if ( rso.style.display == "none" )
			{
				rso.style.display = "inline";
				if ( ( noJava ) && ! ( IE || Safari ) )
				{
					rso.focus();
				}
				
			}
			rankdirection = rso.options[ rso.selectedIndex ].value;
			
			hideEditCustomButton( form );
		}
	}
	else
	{
		// Relevance
		rsor_prevIndex = rsor.selectedIndex;

		sortby = "";
		rankby = "";
		rankdirection = "";
		
		hideSortOrderMenu( rso );

		hideEditCustomButton( form );
	}

	// Try to get the search form
	if ( null !== form ) 
	{
		form.sortby.value = sortby;
		form.rankby.value = rankby;
		form.rankdirection.value = rankdirection;
	}
}

function hideSortOrderMenu( rso )
{
	if ( ! noJava )
	{
		noJava = false;
	}

	if ( rso.style.display == "inline" )
	{
		rso.style.display = "none";
		if ( ( noJava ) && ! ( IE || Safari ) )
		{
			var rsos = document.getElementById( "resultsSortOrderSubmit" );
			if ( rsos != null )
			{
				rsos.focus();
			}
		}
	}
}

function showEditCustomButton( form )
{
	var	editButton = form.editCustomButton;

	if ( editButton.style.display == "none" )
	{
		editButton.style.display = "inline";
	}
}

function hideEditCustomButton( form )
{
	var	button = form.editCustomButton;
	
	if ( null != button )
	{ 	
		if ( button.style.display == "inline" )
		{
			button.style.display = "none";
		}
	}
}

function receiveCustomSort( regionStr, displayStr )
{
	var	form;
	var 	rankby = "";
	var 	sortby = "";
	var 	rankdirection = "";

	if ( searchFormName != '' )
	{
		// Get the form object
		form = eval( 'document.' + searchFormName );
		
		rso = document.getElementById( "resultsSortOrder" );
		rsor = document.getElementById( "resultsSortOrderRegion" );
		
		sortby = "";
		rankby = "";
		rankdirection = "";
		
		rankby = regionStr;
		sortby = "custom"
		
		hideSortOrderMenu( rso );
		
		// Do we want to display custom sort?
		// alert( displayStr );
		
		form.sortby.value = sortby;
		form.rankby.value = rankby;
		form.rankdirection.value = rankdirection;
		
		showEditCustomButton( form );
		
		rsor_prevIndex = rsor.selectedIndex;
	}
	else
	{
		alert( 'searchFormName is not defined!' );
	}
}

// Prevent form submission while new custom sort dialog is open
function validateSort( form )
{
	var 	rsor = document.getElementById( "resultsSortOrderRegion" );

	if ( rsor != null )
	{
		var rankby = rsor.options[rsor.selectedIndex].value;
	
		if ( ( rankby == '_custom_' ) && ( form.sortby.value != 'custom' ) )
		{
			alert( invalidComplexSortMsg );
			return false;
		}
	}
	
	return true;
}

function cancelCustomSort( )
{
	var 	rsor = document.getElementById( "resultsSortOrderRegion" );
	
	if ( rsor != null )
	{
		// Flip back to previous state
		rsor.selectedIndex = rsor_prevIndex;
	}
}

function editCustomSort( form, urlPrefix, title )
{
	doCustomsort( urlPrefix, title, form.rankby.value );
	
	return false;
}


var dialogIFram;

function doCustomsort( urlPrefix, title, rankBy )
{
	// Build dialog
	dialogIFram = $( '<iframe id="customSortFrame" name="customSortFrame" scrolling="auto" frameBorder="0" style="overflow:hidden;padding:0;border:0;"></iframe>' );

	dialogIFram.dialog({
		open: function ()
		{
			// prevent save or cancel button from becoming selected
			$( "button" ).blur();
			$( this ).css( 'background-color', "#F7F8F8" );
			$( this ).width( "520px" );
			$( this ).height( "300px" );
			if ( rankBy == undefined )
				$( this ).attr( 'src', urlPrefix + "?func=srch.customsort" );
			else
				$( this ).attr( 'src', urlPrefix + "?func=srch.customsort&rankBy=" + rankBy );
		},
		close: function ()
		{
			$( this ).dialog( 'destroy' );
		},
		modal: true,
		height: 300,
		width: 520,
		resizable: true,
		position: {my: "center top+75", at: "center top+75", of: window},
		title: title
	});

	dialogIFram.dialog('open');
}

function closeTheDialog()
{
	dialogIFram.dialog('destroy');
	dialogIFram.remove();
}

