// Open action for when facets were disabled in query.  Activate facet preference, run the query again.
function handleFirstOpen()
{
	$.ajax({
		type: "POST",
		cache: false,
		data: "func=srch.SaveSearchSidebarState&state=1",
		success: function(msg) {
			// Show searching progress dialog
			performSearchDialog();
			SubmitAllThemes( document.SearchForm );
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

// Add/remove facet region value
function doFacet( form, region, value, type, add )
{
	form.facetRegion.value = decodeURIComponent( region );
	form.facetValue.value = decodeURIComponent( value );
	form.facetType.value = type;
	form.facetAdd.value = add;
	
	// Show searching progress dialog
	performSearchDialog();
	
	SubmitAllThemes( form );
}

// Clear enabled facet values
function clearSearchFacets( form )
{
	form.clearFacets.value = '1';
	
	// Show searching progress dialog
	performSearchDialog();
	
	SubmitAllThemes( form );
}
	
// Get more facet regions
function getMoreFacets( form, value )
{
	// Get 5 more facet regions
	form.moreFacets.value = value + 5;

	// Show searching progress dialog
	performSearchDialog();

	SubmitAllThemes( form );
}

var SearchFacets = new function() {
		
	// Set the initial open or closed states
	function setInitialState( searchFacetList, state )
	{
		var searchFacet = searchFacetList.parent();
		
		// check if these are valid elements
		if ( searchFacetList.length == 0 || searchFacet.length == 0 )
		{
			return;
		}
		
		if ( state == 1 )
		{
			searchFacet.attr("state", "1");
			// animation not working properly with jQuery 1.3.2
			searchFacetList.hide();
		}
		else
		{
			searchFacet.attr("state", "2");
			// animation not working properly with jQuery 1.3.2
			searchFacetList.show();
		}
	}	
	
	function saveFacetState( key, value )
	{
		document.cookie = key + "=" + encodeURIComponent( value );
	}
		
	// Expand or collapse a Search Facet when the title is clicked.  State 1 is "closed" and 2 is "open".
	function toggleSearchFacet( searchFacetList, index )
	{
		var searchFacet = searchFacetList.parent();

		if ( searchFacet.attr("state") == "1" )
		{ 
			searchFacet.attr( "state", "2" );
			// animation not working properly with jQuery 1.3.2
			$( searchFacetList ).show();			
		}
		else
		{ 			
			searchFacet.attr("state", "1");
			// animation not working properly with jQuery 1.3.2
			$( searchFacetList ).hide();
		}
		
		saveFacetState( "searchfacet_#" + $.trim( searchFacetList.attr( "id" ) ), searchFacet.attr("state") );
	}

	// The title bar of the facet has a tooltip which needs to change based on current state.
	function toggleTooltip(id)
	{
		var head_id = id + " .searchFacetHead";
		
		if ( $(id).attr("state") == "1")
		{
			$(head_id).attr("title", $(id).attr("title1"));

		}
		else
		{
			$(head_id).attr("title", $(id).attr("title2"));
		}
	}
	
	return {
	
		// Switch active tab for date facets
		switchDateTab: function ( region, tab, style, remember ) {
		
			// Ensure all tab are hidden and deactivated for this region
			$('#' + region + '_tabs li').removeClass( style );
			$('#' + region + '_list .facetTab').hide(); 

			// Display the desired tab
			$( '#' + region + '_facet_tab_header_' + tab ).addClass( style );
			$( '#' + region + '_facet_tab_' + tab ).show();

			if ( remember )
			{
				saveFacetState( "date_facet_tab_" + region, tab );
			}
		},
			
		init: function( newSearch ){
					
			// Set the initial open closed states			
			var i, key, value;
			
			var cookieArray = document.cookie.split( ";" );

			for ( i=0; i < cookieArray.length; i++ )
			{
				key = cookieArray[ i ].substr( 0, cookieArray[ i ].indexOf( "=" ) );
				value = decodeURIComponent( cookieArray[ i ].substr( cookieArray[ i ].indexOf( "=" ) + 1 ) );

				// Check if this is a search facet id
				if ( $.trim(key).substr( 0, 12 ) == "searchfacet_" )
				{ 
					setInitialState( $( $.trim(key).substr( 12 ) ), value );
				}
				
				// Check if this is a search date facet tab id
				else if ( $.trim(key).substr( 0, 15 ) == "date_facet_tab_" )
				{ 
					// if this is a new search clear the saved value by setting
					// the expiry to the past
					if ( newSearch )
					{
						document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
					}
					else
					{	
						var region = $.trim(key).substr( 15 );
						this.switchDateTab( region, value, SearchFacetTabs[ region ], false );
					}
				}
			}
			
			
			// Mouse over effects for each Facet Head
			$(".searchFacetHead").mouseenter(function() {

				toggleTooltip("#" + $(this).parent().attr("id"));

				$(this).addClass("searchFacetHighlight");

			}).mouseleave(function() {

				$(this).removeClass("searchFacetHighlight");

			});

			// Click events for each Search Facet Head
			$(".searchFacetHead").click(function() {

				if (!$(this).next().is(':animated'))
				{
					toggleSearchFacet($(this).next(), $('.searchFacetItem').index($(this).parent()));
				}
			});
		}
	}
}