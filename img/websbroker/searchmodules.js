var SearchModules = new function() {

	var searchModuleListHeights = Array();
	

	// Expand or collapse a Search Module when the title is clicked.  State 1 is "closed" and 2 is "open".
	function toggleSearchModule(searchModuleList, index)
	{
		var searchModule = searchModuleList.parent();
		var duration = 300;

		if (searchModule.attr("state") == "1")
		{ 
			searchModule.attr("state", "2");
			searchModuleList.animate({ height: searchModuleListHeights[index] }, duration, function() { searchModuleList.show(); });
		}
		else
		{ 
			searchModuleListHeights[index] = searchModuleList.height();
			
			// Need to set a different height for IE because of the different box model
			if (IE)
			{
				searchModuleListHeights[index] += 22;
			}
			
			searchModule.attr("state", "1");
			searchModuleList.animate({ height: 1 }, duration, function() { searchModuleList.hide();  });
		}
	}


	// The title bar of the facet has a tooltip which needs to change based on current state.
	function toggleTooltip(id)
	{
		var head_id = id + " .searchModuleHead";
		var list_id = id + " .searchModuleList";

		if ($(list_id).css("display") == "none")
		{
			$(head_id).attr("title", $(id).attr("title1"));

		}
		else
		{
			$(head_id).attr("title", $(id).attr("title2"));
		}
	}
	
	return {
			
		init: function(){ 

			// Mouse over effects for each Facet Head

			$(".searchModuleHead").mouseenter(function() {

				toggleTooltip("#" + $(this).parent().attr("id"));

				$(this).addClass("searchModuleHighlight");

			}).mouseleave(function() {

				$(this).removeClass("searchModuleHighlight");

			});



			// Click events for each Search Module Head

			$(".searchModuleHead").click(function() {

				if (!$(this).next().is(':animated'))
				{
					toggleSearchModule($(this).next(), $('.searchModuleItem').index($(this).parent()));
				}
			});

		}
	}

}