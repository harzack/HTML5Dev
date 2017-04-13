//
//	File: webnode/facetpanel.js
//
//	Description: This is a support js file for the facet panel.
//

var FacetPanel = new function() {
	var _maxSelectedFacets = 5;
	var _selectedFacets = [];
	var _curSelectButton;
	var performedSearch = false;
	var lookupTimeout;
	var facetListHeights = [];

	// Expand or collapse a facet when the title is clicked.  State 1 is "closed" and 2 is "open".
	function toggleFacet(facetList, index) {
		var facet = facetList.parent();
		var facetID = facet.attr("facetID");
		var duration = 300;


		if (facet.attr("state") == "1") {
			toggleServerState(facetID, 2);
			facet.attr("state", "2");
			facetList.animate({ height: facetListHeights[index] }, duration, function() { facetList.show(); Sidebar.setClickerHeight(); });
		} else {
			toggleServerState(facetID, 1);
			facet.attr("state", "1");
			facetList.animate({ height: 1 }, duration, function() { facetList.hide(); Sidebar.setClickerHeight(); });
		}

	}

	// Truncates the display facet name to 50 characters to display in the more dialog
	function truncateFacetName(facet_name) {
		var retName = facet_name;


		if (retName.length > 50) {
			retName = retName.substring(0, 50) + " ...";
		}

		return retName;
	}

	// The title bar of the facet has a tooltip which needs to change based on current state.
	function toggleTooltip(id) {
		var head_id = id + " .facetHead";
		var list_id = id + " .facetList";


		if ($(list_id).css("display") == "none") {
			$(head_id).attr("title", $(id).attr("title1"));
		} else {
			$(head_id).attr("title", $(id).attr("title2"));
		}
	}

	// Generate the input checkboxes for the more menu.
	// For sorting, 1 = Numerical and 2 = Alphabetical
	function generateInputs(facet_id, facets, sorting, searchTerm) {
		var facet;
		var inputString;
		var sort;
		var row;
		var table;
		var inputArea = document.getElementById(facet_id + "_inputs");
		var facetInfo = facets.facetInfo;
		var facetContents = facets.contents;
		var i = 0;

		if (sorting == 1) {
			sort = LocString('Item Count', facetStr);
		} else {
			sort = LocString('Name', facetStr);
		}

		inputArea.innerHTML = "";

		if (facetContents.length === 0) {
			inputArea.innerHTML = LocString('No facet values found', facetStr);
		} else {
			//Create the table for more items and put it inside 'inputArea'
			table = $('<table cellpadding="0" border="0" class="more-items"></table>');
			$(inputArea).append(table);
		}

		for (i = 0; i < Math.min(facetContents.length, 50); i++) {
			// Create a row when needed and add it to the table
			var td;
			var label;
			var input;
			
			if (i % 2 === 0) {
				row = $('<tr></tr>');
				table.append(row);
			}

			facet = facetContents[i];
			inputString = "<td><div class=\"more-items-shim\">&nbsp;</div></td>";
			td = $(inputString).appendTo(row);
			
			input = $("<input class=\"more-item-checkbox\" type=\"checkbox\">").appendTo(td);
			input.attr({
				id:		facet_id + "_" + facet.FacetHash, 
				value:	facet.Facet,
				title:	facet.DisplayValue
			});
			
			with ({id: facet_id, hash:facet.FacetHash})
			{
				input.click(function(){
					FacetPanel.toggleSelectedFacet( id, hash );
				});
			}
			
			for (var x = 0; x < _selectedFacets.length; x++) {
				if (_selectedFacets[x].hash == facet.FacetHash) {
					input.prop( 'checked', true );
					break;
				}
			}
			
			label = $("<label></label>").appendTo(td);
			label.attr({
				"for":	input.attr("id"),
				title:	facet.DisplayValue
			});
			
			inputString = "<span id='" + facet_id + "_" + facet.FacetHash + "_text" + "'>" + truncateFacetName( facet.DisplayValue.EscapeHTML() ) + "</span>";
			// Don't display the count if the facet is set to not display counts
			if (facetInfo.countAccuracy >= 0 && facet.Total !== undefined )
			{
				inputString += " <span class='facetCount'>(" + facet.Total + ")</span>";
			}	
				
			label.append(inputString);
		}

		// Update heading
		var headingString = String.formatLoc(LocString('Top [x] Values by [sort]', facetStr), i, sort);

		if (performedSearch === true && searchTerm !== null && searchTerm.length !== 0) {
			if (facetContents.length == 1) {
				headingString = String.formatLoc(LocString('Top [x] Lookup Result', facetStr), i);
			} else {
				headingString = String.formatLoc(LocString('Top [x] Lookup Results', facetStr), i);
			}
		}

		// The first time this function is called, if there are more than 50 facets available to choose
		// from, show the lookup box.
		if (facetContents.length > 50) {
			$("#" + facet_id + " .typeaheadArea").show();
		}

		$("#" + facet_id).find('#dialog-heading').text(headingString);
	}

	function toggleServerState(facetID, state) {
		$.ajax({
			type: "POST",
			cache: false,
			data: "func=ll.SaveFacetState&facetID=" + facetID + "&state=" + state,
			success: function(msg) {
				// For DEBUGGING response
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				// NICETOHAVE -> try again on failure.
			}
		});
	}

	// Generate the URL for the AJAX request to use
	function makeMultiFacetBrowseURL() {
		var url = "func=ll&objAction=MoreFacetContents&objID=" + containerId;

		// add on the optional pieces
		if (containerSubType !== "") {
			url += "&objType=" + containerSubType;
		}

		for (var key in contentFilter) {
			for (var i = 0; i < contentFilter[key].length; i++) {
				url += "&" + key + "=" + encodeURIComponent(contentFilter[key][i]);
			}
		}

		return url;
	}

	// Goes to the server and retrieves the facet information
	function retrieveFacets(facet_id, sorting, searchTerm) {
		var ajaxUrl = makeMultiFacetBrowseURL() + "&facetID=" + facet_id.substring(6) + "&itemToShow=51";

		if (sorting === 2) {
			ajaxUrl += "&sort=displayvalue";
		}

		if (searchTerm != null && searchTerm.length > 0 ) {
			ajaxUrl += "&search=" + searchTerm;
		}

		$.ajax({
			type: "POST",
			cache: false,
			data: ajaxUrl
		}).done(function( response ) {
			generateInputs( facet_id, response, sorting, searchTerm );
		});
	}

	/* *************************************** Run Facet Functions ************************ */

	//add values to facet browse html form and submit
	function facetRunMulti(facetMore) {
		var browseForm = $("form[name=BrowseViewFacetFrm]")[0];
		var temp = facetMore.split('_');
		var facetID = temp[1];
		var selectStr = "";
		
		for (var i = 0; i < _selectedFacets.length; i++) {
			if (selectStr.length) {

				selectStr += "|";
			}

			selectStr += _selectedFacets[i].value;
		}
		
		_createNewElement(browseForm, "f_" + facetID, selectStr);
		
		Delete_Cookie("BrowseSettings");
		
		browseForm.submit();

		return false;
	}

	//create new input elements with values selected
	function _createNewElement(parent, nameStr, value) {
	
		var newValue = document.createElement('input');
		newValue.setAttribute('type', 'hidden');
		newValue.setAttribute('name', nameStr);
		newValue.setAttribute('value', value);
		parent.appendChild(newValue);
	}

	// Remove an existing input element associated with the facet being removed
	function _removeExistingElement(parent, nameStr, value) {
		if (value)
		{
			// Value could be a delimited list of OR'd values
			var vals = facetValueStringToList( value );

			for (var j = 0; j < vals.length; j++)
			{
				// Find the hidden input element for this facet that includes this value.
				// Ideally we would like to use the following line:
				// var element = $(parent).children("input[name=" + nameStr + "][value*=\"" + vals[j] + "\"]");
				// but this doesn't work due to a bug in jQuery (http://dev.jquery.com/ticket/6504)

				var element = $("form[name=" + parent.name + "] input[name=" + nameStr + "]");

				// We need to loop through all the elements and find the one with the correct value. We cannot
				// use the value in the selector above, because the regex isn't kind to < and > type characters.
				element.each( function() {
						var values;
						var elementValue = $(this).val();
						var valStr = facetValueEscape( vals[ j ] );

						if ( elementValue.indexOf( valStr ) != -1 )
						{
							values = facetValueStringToList( elementValue );

							for ( var i = values.length - 1; i >= 0; i -= 1 )
							{
								if ( values[ i ] == vals[ j ] )
								{
									values.splice( i, 1 ); // Remove this element from the array
								}
							}

							if ( values.length > 0 )
							{
								$(this).val( facetValueListToString( values ) );
							}
							else
							{
								$(this).remove();
							}
						}
				});
			}
		}
		else
		{
			$(parent).children("input[name=" + nameStr + "]").remove();
		}
	}
	
	function facetValueEscape( value )
	{
		return value.toString().replace(/\|/g, "{|}");
	}

	function facetValueStringToList( valueStr )
	{
		var valueList = valueStr.toString().replace( /\{\|\}/g, "\f" ).split("|");	// replace any escaped pipes with form feeds for now
		
		for ( var i = 0; i < valueList.length; i++ )
		{
			valueList[ i ] = valueList[ i ].replace(/\f/g, "|");	// restore pipes
		}
		
		return valueList;
	}

	function facetValueListToString( valueList )
	{
		var valueStr = "";
		
		for ( var i = 0; i < valueList.length; i++ )
		{
			if ( valueStr.length )
			{
				valueStr += "|";
			}
			valueStr += facetValueEscape( valueList[ i ] );
		}
		
		return valueStr;
	}

	// Returns a relative priority for dates based upon their identifier key
	function getDatePriority(key) {
		var val;

		switch (key) {
			case "dy": val = 0; break;
			case "mt": val = 1; break;
			case "yr": val = 2; break;
			case "dc": val = 3; break;
			case "ce": val = 4; break;
			case "re": val = 5; break;
			default: val = -1; break;
		}

		return val;
	}
	
	function getRelativeDateRange(relativeDateClusters, value) {
		var start;
		var end;
		
		
		switch (value) {
			case -2:
				start = relativeDateClusters.futureStart;
				end = undefined;
				break;
			case 0:
				start = relativeDateClusters.today;
				end = relativeDateClusters.today;
				break;
			case 1:
				start = relativeDateClusters.yesterday;
				end = relativeDateClusters.yesterday;
				break;
			case 2:
				start = relativeDateClusters.thurdsay;
				end = relativeDateClusters.thursday;
				break;
			case 3:
				start = relativeDateClusters.wednesday;
				end = relativeDateClusters.wednesday;
				break;
			case 4:
				start = relativeDateClusters.tuesday;
				end = relativeDateClusters.tuesday;
				break;
			case 5:
				start = relativeDateClusters.monday;
				end = relativeDateClusters.monday;
				break;
			case 6:
				start = relativeDateClusters.sunday;
				end = relativeDateClusters.sunday;
				break;
			case 9:
				start = relativeDateClusters.twoWeeksEnd + 1;		// Doesn't matter if this isn't a real date, as long as it's numerically
																	// AFTER twoWeeksEnd and before or equal to the beginning of last week.
				end = relativeDateClusters.lastWeekEnd;
				break;
			case 10:
				start = relativeDateClusters.threeWeeksEnd + 1;
				end = relativeDateClusters.twoWeeksEnd;
				break;
			case 11:
				start = relativeDateClusters.threeWeeksStart;
				end = relativeDateClusters.threeWeeksEnd;
				break;
			case 12:
				start = relativeDateClusters.olderEnd + 1;
				end = relativeDateClusters.lastMonthEnd;
				break;
			case 13:
				start = undefined;
				end = relativeDateClusters.olderEnd;
				break;
		}
		
		return { "isRelative": true, "start": start, "end": end };
	}
	
	function getAbsoluteDateRange( value ) {
		return { "isRelative": false, "prefix": value };
	}
	
	function getRelativeDateClusters() {
		var	lastMonth;
		
		var clusters = [];
		var	now = new Date();
		var dayOfWeek = now.getDay();	// 0 = Sunday
		var dayOfMonth = now.getDate();
		var month = now.getMonth();
		
		
		lastMonth = new Date();

		if ( month === 0 )
		{
			lastMonth.setMonth( 11 );
			lastMonth.setFullYear( now.getFullYear() - 1 );
		}
		else
		{
			lastMonth.setMonth( month - 1 );
		}
		
		// Later we will cache these on a day-by-day basis.
		
		clusters.futureStart = getDateOffset( now, -1 );
		clusters.today = getDateOffset( now, 0 );
		clusters.yesterday = getDateOffset( now, 1 );
		
		clusters.sunday = getDateOffset( now, dayOfWeek );
		clusters.monday = getDateOffset( now, dayOfWeek - 1 );
		clusters.tuesday = getDateOffset( now, dayOfWeek - 2 );
		clusters.wednesday = getDateOffset( now, dayOfWeek - 3 );
		clusters.thursday = getDateOffset( now, dayOfWeek - 4 );

		// Friday and Saturday are not required because they will always be Future, Today, Yesterday, or Last Week or before.
		// For example:
		//	if today is Sunday, Friday and Saturday will both be "Last Week"
		//	if today is Saturday, Saturday will be "Today" and Friday will be "Yesterday"
		//	if today is Friday, Saturday will be "Future" and Friday will be "Today"
		//	for all other days, Friday and Saturday will both be "Future".
		
		clusters.lastWeekEnd = getDateOffset( now, dayOfWeek + 1 )	;	// last Saturday
		clusters.twoWeeksEnd = getDateOffset( now, 8 + dayOfWeek );		// More readable would be "7 + dayOfWeek + 1"
		clusters.threeWeeksEnd = getDateOffset( now, 15 + dayOfWeek );	// More readable would be "14 + dayOfWeek + 1"
		clusters.threeWeeksStart = getDateOffset( now, 21 + dayOfWeek );
		
		clusters.lastMonthEnd = getDateOffset( now, dayOfMonth );
		
		clusters.olderEnd = getDateOffset( lastMonth, lastMonth.getDate() );

		return clusters;
	}

	function getDateOffset( now, offset ) {
		var newDate;
	
		var nowMilliseconds = now.getTime();
		var offsetMilliseconds = offset * 24 * 60 * 60 * 1000;
		
		
		newDate = new Date( nowMilliseconds - offsetMilliseconds );
		
		return convertValueToDBValue( newDate );
	}
	
	function convertValueToDBValue( now ) {
		return ( now.getFullYear() * 10000 + ( now.getMonth() + 1 ) * 100 + now.getDate() );
	}
	
	function isDateRangeOverlapping( higherLevel, lowerLevel ) {
		var overlap;
		
		if (higherLevel.isRelative) {	// lowerLevel can never be relative since relative is the highest level.
			var lowerLevelRange = getExplicitRangeFromAbsoluteDate(lowerLevel.prefix);
			
			if ((higherLevel.start === undefined || lowerLevelRange.end >= higherLevel.start) && (higherLevel.end === undefined || lowerLevelRange.start <= higherLevel.end))
			{
				overlap = true;
			}	
			else
			{
				overlap = false;
			}
			
		}
		else {
			var higherLevelPrefix = higherLevel.prefix.toString();
			var lowerLevelPrefix = lowerLevel.prefix.toString().substring( 0, higherLevelPrefix.length );
			
			if ( higherLevelPrefix == lowerLevelPrefix )
			{
				overlap = true;
			}
			else
			{
				overlap = false;
			}	
		}
		
		return overlap;
	}
	
	function getExplicitRangeFromAbsoluteDate( prefix ) {
		var len;
		var year;
		var month;
		var day;
		var originalLength;
		var start;
		var startDate;
		var end;
		var endDate;
		var strPrefix;

		strPrefix = prefix.toString();
		originalLength = strPrefix.length;
		len = originalLength;
		
		if (len == 2)	// 20 --> 2000
		{
			prefix = prefix * 100;
		}	
		else if (len == 3)	// 201 --> 2010
		{
			prefix = prefix * 10;
		}	
			
		strPrefix = prefix.toString();
		len = strPrefix.length;
		year = parseInt(strPrefix.substring(0, 4), 10);
		
		if (len == 4)	// 2010 --> 201001
		{
			prefix = (prefix * 100) + 1;
		}	
			
		strPrefix = prefix.toString();
		len = strPrefix.length;
		
		month = parseInt(strPrefix.substring(4, 6), 10);
		
		if (len == 6)	// 201002 --> 20100201
		{
			prefix = (prefix * 100) + 1;
		}	
			
		strPrefix = prefix.toString();
		len = strPrefix.length;
			
		day = parseInt(strPrefix.substring(6, 8), 10);
		
		start = prefix;
		startDate = new Date();
		startDate.setDate(day);
		startDate.setMonth(month - 1);
		startDate.setFullYear(year);
		endDate = new Date();
		endDate.setDate(day);
		endDate.setMonth(month - 1);
		endDate.setFullYear(year);
		
		if (originalLength == 2) {				// Century
			endDate.setFullYear(year + 100);
			
		}
		else if (originalLength == 3) {			// Decade
			endDate.setFullYear(year + 10);
		}
		else if (originalLength == 4) {			// Year
			endDate.setFullYear(year + 1);
		}
		else if (originalLength == 6) {			// Month
			if (startDate.getMonth() == 11) {
				endDate.setMonth(0);
				endDate.setFullYear(year + 1);
			}
			else {
				endDate.setMonth(startDate.getMonth() + 1);
			}
		}
		else {									// Day
			endDate.setTime(endDate.getTime() + (24 * 60 * 60 * 1000));
		}
		
		endDate.setTime(endDate.getTime() - (24 * 60 * 60 * 1000));	// Subtract one day from the end of the range,
																	// so that endDate is inclusive in the range.
																	
		start = convertValueToDBValue(startDate);
		end = convertValueToDBValue(endDate);
		
		return { "start": start, "end": end };
	}

	return {
		/*
		* Initialize the facet
		*
		* @param {Boolean} showTypeAheadInMore	Whether to show the typeahead input in the more dialog
		*/
		init: function() {
			var facet_id;
			var facet_list;
			var facet_more;

			var facets = $("#facets").children();
			var sidebarOpen = Sidebar.openIndicator.hasClass("sidebarOpen");
			var facetPanelSection = $(Sidebar.getPanelElementByName("FacetPanel"));
			var facetPanelCollapsed = !facetPanelSection.hasClass("sidebarPanelIsOpen");
			var facetHeads = facets.children("div.facetHead");

			var selectFunc = function() {
				facetRunMulti("#" + this.id);
				$(this).dialog('close');
			};

			var cancelFunc = function() {
				performedSearch = false;
				$(this).dialog('close');
			};

			var closeFunc = function() {
				_selectedFacets = [];
			};

			var openFunc = function() {
				var defaultPromptText = LocString('Find more values', facetStr);
				$(this).html("<div class='left-more-panel'><div class='headerArea'><h4 id=\"dialog-heading\"></h4><div class='typeaheadArea'><input type='text' id='" + this.id + "_find' value='" + defaultPromptText + "' class='typeahead typeaheadPromptText' /></div></div><div id='" + this.id + "_inputs' class='scroll'></div></div><div class='right-more-panel'><div class='headerArea'><span class='selected-facet-display' id='" + this.id + "_num_selected_facets'>" + String.formatLoc(LocString('Selected Values', facetStr), 0, _maxSelectedFacets) + "</span></div><div id='" + this.id + "_selected_facets'></div></div>");

				//
				// On IE opening the dialog works well for height the first time
				// but for some reason (suspect quirks interaction) on the second open
				// it loses the height value.  This will set the height on open
				//
				if (IE)
					$( this ).height( 400 );

				//
				// clear all selected facets
				//
				_selectedFacets = [];

				// If the dialog doesn't have the facetMoreWithLookup class then remove the lookup input field
				if (!$("#" + this.id).hasClass('facetMoreWithLookup'))
				{
					$("#" + this.id).find('div.typeaheadArea').remove();
				}

				_curSelectButton = $( "#more-btn-accept_" + this.id);
				_curSelectButton.prop( 'disabled', true )
								.addClass( 'ui-button-disabled' )
								.addClass( 'ui-state-disabled' )
								.blur();
				$("#more-btn-cancel_" + this.id).blur();

				$("#" + this.id + "_find").focus(function() {
					$(this).removeClass("typeaheadPromptText");
					if (this.value == defaultPromptText)
					{
						this.value = "";
					}	
					else
					{
						$(this).select();
					}	
				}).blur(function() {
					if (this.value == "") {
						$(this).addClass("typeaheadPromptText");
						this.value = defaultPromptText;
					}
				});

				$("#" + this.id + " .typeaheadArea").hide();
			};

			// If the sidebar is closed, we need to open it to get the heights of the facet
			// boxes, and then reclose it below.
			if (!sidebarOpen) {
				Sidebar.open(true);
			}
			if (facetPanelCollapsed) {
				facetPanelSection.addClass("sidebarPanelIsOpen");
			}
			
			facetListHeights = [];
			for (var i = 0, n = facets.length; i < n; ++i) {
				facet_id = $(facets[i]);

				facet_list = facet_id.children(".facetList");

				// The facet is rendered as hidden in the HTML and then shown here so that the
				// height can be calculated (needed for expand/collapse).  Then, if the 
				// facet is supposed to be hidden (state "1"), it is re-hidden.  If it is
				// shown in the HTML when it should be hidden, there will be a noticeable change
				// as it transitions from open to closed, depending on the order in which the
				// DOM is rendered.

				facet_id.show();

				// Get the initial height for each facet list
				facet_id.attr("prevHeight", facet_list.height());

				var facetListHeight = facet_list.height()

				// Need to set a different height for IE because of the different box model
				if (IE)
					facetListHeight += 22;

				facetListHeights.push(facetListHeight);
				
				if (facet_id.attr("state") == "1") {
					facet_list.removeClass('facetListClosed').addClass('facetListOpened').hide().height(1);
				}

				// Initialize the More dialogs.
				facet_more = facet_id.children(".facetMore");

				if ( facet_more.length ) {
					facet_more.dialog({
						title: String.formatLoc( LocString( '[x] Values', facetStr ), facet_more[ 0 ].title ),
						autoOpen: false,
						modal: true,
						draggable: true,
						resizable: false,
						width: 660,
						height: 500,
						closeOnEscape: true,
						buttons: [{
						        id:"more-btn-accept_" + facet_id.attr("id") + "_more",
						        text: LocString( 'Select', facetStr ),
						        click: selectFunc
						    },
						    {
						        id:"more-btn-cancel_" + facet_id.attr("id") + "_more",
						        text: LocString( 'Cancel', facetStr ),
						        click: cancelFunc
							}],
						open: openFunc,
						close: closeFunc
					});
				}
			}

			// Mouse over effects for each Facet Head
			facetHeads.mouseenter(function() {
				toggleTooltip("#" + $(this).parent().attr("id"));
				$(this).addClass("facetHighlight");
			}).mouseleave(function() {
				$(this).removeClass("facetHighlight");
			});

			// Click events for each Facet Head
			facetHeads.click(function() {
				if (!$(this).next().is(':animated')) {
					toggleFacet($(this).next(), $('.facetItem').index($(this).parent()));
				}
			});
			
			Sidebar.setClickerHeight();

			// If the sidebar is supposed to be closed, then reclose it.
			if (!sidebarOpen) {
				Sidebar.close(true);
			}
			// If the sidebar is supposed to be collapsed, then re-collapse.
			if (facetPanelCollapsed) {
				facetPanelSection.removeClass("sidebarPanelIsOpen");
			}

			// Facet panel item 'mouseenter'/'mouseleave'
			$('div.facetList li').mouseenter(function() {
				$(this).addClass('facet-item-mo');
				var linkText = $(this).children('a');
				linkText.css({ 'text-decoration': 'underline' });
			}).mouseleave(function() {
				$(this).removeClass('facet-item-mo');
				var linkText = $(this).children('a');
				linkText.css({ 'text-decoration': 'none' });
			});

			// Set up facet title bar truncation
			facetHeads.find("a").each(function() {

				var origText = $(this).text();

				$(this).text(""); // To make maxWidth accurate

				var maxWidth = $(this).parent()[0].offsetWidth - 10;

				$(this).text(origText);

				OTTruncateElementContentsToPixelWidth(this, maxWidth, 40, 10);

			});

		},
		
		//add values to facet browse html form and submit
		facetRun: function(facetID, valueID) {
			var browseForm = $("form[name=BrowseViewFacetFrm]")[0];
			
			_createNewElement(browseForm, "f_" + facetID, valueID);

			//clear "Filter by name" value
			var nameFilter = document.getElementById("srch_fld");
	
			if (nameFilter !== null && (nameFilter.value != $(nameFilter).attr("placeholder"))) {
				_createNewElement(browseForm, "filterValue", "");
			}

			Delete_Cookie("BrowseSettings");

			browseForm.submit();

			return false;
		},
		
		// Load the facet contents.  This is used if the facets need to be loaded after the
		// entire page because they aren't ready for display.
		
		getContents: function() {
			var browseForm			= $( "form[name=BrowseViewFacetFrm]" )[ 0 ];
			var	containerId			= browseForm.id.value;
			var	containerSubType	= browseForm.objType.value;
			var queryString			= "func=ll&objAction=facet&objID=" + containerId + "&noGUI=true";
			

			// add on the optional pieces
			if ( containerSubType !== "" ) 
			{
				queryString += "&objType=" + containerSubType;
			}
		
			for ( var key in contentFilter )
			{
				for ( var i = 0; i < contentFilter[ key ].length; i += 1 ) 
				{
					queryString += "&" + key + "=" + encodeURIComponent( contentFilter[ key ][ i ] );			
					_createNewElement( browseForm, key, ( contentFilter[ key ][ i ] ) );
				}
			}
			
			$.ajax({
				type: "GET",
				cache: false,
				url: baseURL,
				data: queryString
			}).done(function( response ) {
				// Set the inner HTML of the facets div to the response.
				$( "#facets" ).html( response );
				
				// Initialize the facet panel now that the facets have been loaded
				FacetPanel.init();
			});
		},


		// Starts the process of removing a selected facet
		removeFacet: function(nameID, val) {
			var browseForm = $("form[name=BrowseViewFacetFrm]")[0];

			if (val)
			{
				_removeExistingElement(browseForm, "f_" + nameID, val);
			}	
			else
			{
				_removeExistingElement(browseForm, "f_" + nameID);
			}	

			Delete_Cookie("BrowseSettings");

			browseForm.submit();

			return false;
		},		
		/*
		* Given an identifer and a set of pipe-separated values for a date facet, this function will remove
		* that particular date facet, and any other date facets which are encompassed
		* by that container.
		*
		* @param	nameID		ID of the facet to be deleted
		* @param	val			Value of the facet to be deleted
		*/
		removeDateFacet: function(nameID, val) {
			var vals = facetValueStringToList( val );
			for (var i = 0; i < vals.length; i++)
			{
				this.removeSingleDateFacet(nameID, vals[i]);
			}
			
			Delete_Cookie("BrowseSettings");
			
			$("form[name=BrowseViewFacetFrm]")[0].submit();

			return false;
		},
		/*
		* Given an identifer and a value for a date facet, this function will remove
		* that particular date facet, and any other date facets which are encompassed
		* by that container.
		*
		* @param	nameID		ID of the facet to be deleted
		* @param	val			Value of the facet to be deleted
		*/
		removeSingleDateFacet: function(nameID, val) {
			var curFacet;
			var curDatePriority;
			var curDateRange;
			var curValue;
			var curValues;
			var deletingDateRange;
			
			var selectedValuesCount = 0;
			var removedselectedValuesCount = 0;
			var browseForm = $("form[name=BrowseViewFacetFrm]")[0];
			var facetCount = $(browseForm).children("input[name^=f_]").length;
			var selectedValuesOnThisFacet = $(browseForm).children("input[name=f_" + nameID + "]");
			var selectedElementCount = selectedValuesOnThisFacet.length;
			
			var deletedSelf = false;
			var potentialRemovals = [];	// Will contain all date values for this facet that have LOWER priority
			var highLevel = [];			// Will contain all date values for this facet that have EQUAL or HIGHER priority than the
													// value to be deleted.  (This array will not include the value to be deleted)
			var removeDatePriority = getDatePriority(val.substring(0, 2));
			var removeDateValue = parseInt(val.substring(2), 10);
			var relativeDateClusters = getRelativeDateClusters();


			// We need to find the list of objects which are at the priority of the
			// object being removed, and those below.  If there are no other objects
			// at this priority level, then all the lower levels will also be removed.
			// If there are other objects at this priority level, then just leave
			// everything else as is.

			if (removeDatePriority != -1) {
			
				if (removeDatePriority == 5)
				{
					deletingDateRange = getRelativeDateRange(relativeDateClusters, removeDateValue);
				}	
				else
				{
					deletingDateRange = getAbsoluteDateRange(removeDateValue);
				}	
			
				for (var i = 0; i < selectedElementCount; i++) {
					curFacet = selectedValuesOnThisFacet[i];
					curValues = facetValueStringToList( curFacet.value );
					
					selectedValuesCount += curValues.length;
					
					for (var j = 0; j < curValues.length; j++)
					{
						curValue = curValues[j];

						// This is the selected value; remove it for sure.
						if (curValue == val) {
							removedselectedValuesCount++;
							_removeExistingElement(browseForm, curFacet.name, curValue);
							deletedSelf = true;
						}
						else {
							curDatePriority = getDatePriority(curValue.substring(0, 2));
							curDateValue = parseInt(curValue.substring(2), 10);
							
							if (curDatePriority == 5)
							{
								curDateRange = getRelativeDateRange(relativeDateClusters, curDateValue);
							}	
							else
							{
								curDateRange = getAbsoluteDateRange(curDateValue);
							}	
							
							curDateRange.name = curFacet.name;
							curDateRange.value = curValue;

							if (curDatePriority == removeDatePriority)
							{
								highLevel.push(curDateRange);
							}	
							else if (curDatePriority < removeDatePriority)
							{
								potentialRemovals.push(curDateRange);
							}	
						}
					}
				}
				
				for (var k = 0; k < potentialRemovals.length; k++) {
					var toDelete = true;
				
					// First check if the potential removal is contained in our value that is being deleted.
					// If not, we don't have to remove it.
					if (!isDateRangeOverlapping(deletingDateRange, potentialRemovals[k]))
					{
						continue;
					}	
						
					// If this potential removal was contained in the deleting value, then ensure
					// it's not contained in any remaining high-level date ranges.
					for (var l = 0; l < highLevel.length; l++) {
						if (isDateRangeOverlapping(highLevel[l], potentialRemovals[k]))
						{
							toDelete = false;
							break;
						}
					}
					
					if (toDelete) {
						removedselectedValuesCount++;
						_removeExistingElement(browseForm, potentialRemovals[k].name, potentialRemovals[k].value);
					}
				}
			}

			// We've expanded the selected date facet into its OR-ed parts but we consider all other facets
			// as just one per <input> element.  So to see if all facet values have been deleted, we use
			// the following count (expand only the selected facet, consider all others as one-per-element):
			facetCount = facetCount - selectedElementCount + selectedValuesCount;	
			
			// If all facets are removed, put them back to the object they were browsing
			
			if (removedselectedValuesCount == facetCount) {
				_removeExistingElement(browseForm, "objType", "900");
				$(browseForm).children("input[name=id]")[0].name = "objId";
			}
		},

		// Used to change the sorting of the more menu
		selectOrdering: function(facet_id, type) {

			document.getElementById(facet_id + "_inputs").innerHTML = "<div class='loadingArea'><div class='loadingMessage'>" + LocString('Loading ...', facetStr) + "</div></div>";

			retrieveFacets(facet_id, type);

			$(".facetMore").dialog("option", "position", ['center', '50%']);

			$('input.typeahead').on('keyup', function() {
				var searchInputText;
			
				searchInputText = $(this).val();
				if (searchInputText !== null && searchInputText.length > 1) {
					performedSearch = true;
				} else {
					performedSearch = false;
					searchInputText = "";
				}
				
				if (lookupTimeout)
				{
					clearTimeout(lookupTimeout);
				}	
					
				lookupTimeout = setTimeout(function() { retrieveFacets(facet_id, type, searchInputText); }, 200);
			});

			return false;
		},
		// Toggle a selected facet in the more menu. This occurs either by clicking on the 
		// checkbox for that facet, or by clicking the remove button next to a facet that 
		// has already been chosen.
		toggleSelectedFacet: function(facet_id, chosen_facet_id) {
			var div;
			var span;
			var href;
			var myInput;
			var counterText = document.getElementById(facet_id + '_num_selected_facets');
			var selectedText = $("#" + facet_id + "_selected_facets");
			var checkExists = selectedText.children("#" + chosen_facet_id + "_selected");
			var inputs = $("#" + facet_id + "_inputs").find("input");

			var chosen_facet_name = $("span[id='" + facet_id + "_" + chosen_facet_id + "_text']").text();

			// Check to see if the text for this selected facet already exists, if it does it
			// means we wish to turn it off/remove it.
			if (checkExists.length === 0 && _selectedFacets.length < _maxSelectedFacets) {
				// If no facets are currently enabled, be sure to enable the select button
				if (_selectedFacets.length === 0) {
					_curSelectButton.prop("disabled", false)
						            .removeClass("ui-button-disabled")
						            .removeClass("ui-state-disabled");
				}

				// Add the input box to the area
				_selectedFacets[_selectedFacets.length] = { hash:chosen_facet_id, value:$(inputs).filter("#" + facet_id + "_" + chosen_facet_id).attr("value") };
				div = $("<div class=\"selected-more-facet\"></div>");
				div.attr("id", chosen_facet_id + "_selected");
				span = $("<span>" + chosen_facet_name + "</span>").appendTo(div);
				span.attr("id", chosen_facet_id + "_selected_name");
				href = $("<a class=\"icn-link facet-remove\" href=\"#\">" + LocString('Remove', facetStr) + "</a>").appendTo(div);
				href.attr({
					title: String.formatLoc(LocString('Remove%1', facetStr), chosen_facet_name)
				});
				
				href.click(function(){
					FacetPanel.toggleSelectedFacet( facet_id, chosen_facet_id );
				});
				
				selectedText.append(div);
				
				// 5 is the maximum number of allowed facets to be clicked. If 5 have been clicked,
				// disable all check boxes.
				if (_selectedFacets.length >= _maxSelectedFacets) {
					for (var x = 0; x < inputs.length; x++) {
						myInput = $(inputs[x]);

						if ( myInput.prop( 'checked' ) === false )
						{
							myInput.prop( 'disabled', true );
						}
					}
				}
			}
			else {
				// The facet was already chosen, so we wish to remove it
				$(checkExists).remove();

				for (var j = 0; j < _selectedFacets.length; j++) {
					if (_selectedFacets[j].hash == chosen_facet_id) {
						_selectedFacets.splice(j, 1);
						break;
					}
				}

				// If now there are no selected facets, disable the select button
				if (_selectedFacets.length === 0) {
					_curSelectButton.prop( 'disabled', true )
						            .addClass( 'ui-button-disabled' )
						            .addClass( 'ui-state-disabled' );
				}

				// In the event that the user clicked on the remove icon on the
				// right, be sure to uncheck its counterpart in the input
				// boxes. Also, if we were at the max number of allowed facets
				// but have now removed one, be sure to re-enabled the checkboxes.			
				for (var i = 0; i < inputs.length; i++) {
					myInput = $(inputs[i]);

					if (_selectedFacets.length == (_maxSelectedFacets - 1) && myInput.prop( 'checked' ) === false)
					{
						myInput.prop( 'disabled', false );
					}

					if (myInput.attr('id') == (facet_id + "_" + chosen_facet_id))
					{
						myInput.prop( 'checked', false );
					}	
				}
			}

			counterText.innerHTML = String.formatLoc(LocString('Selected Values', facetStr), _selectedFacets.length, _maxSelectedFacets);
		},
		//expose _createNewElement() outside of FacetPanel
		createNewElement: function( parent, nameStr, value ) {
		
			_createNewElement( parent, nameStr, value );
		}

	};
};

// This takes the WebLingo-generated form and copies it.  The copy will be used for form submission.
// We re-copy this form when the page loads so that even when the user arrives on the page via the
// back button, the form will include the ORIGINAL, server-generated values, instead of the values
// saved at the time of form submission.
$(document).ready(function(){
	$("form[name=BrowseViewFacetFrm]").remove();
	$("form[name=BrowseViewFacetFrmStatic]").clone().attr("name", "BrowseViewFacetFrm").insertAfter("form[name=BrowseViewFacetFrmStatic]");

	var browseForm = $("form[name=BrowseViewFacetFrm]")[0];
	
	for ( var key in contentFilter )
	{
		if ( key.substr(0,2) == "f_" ) {
		//element = browseForm.key;
		
			if ( !$("#BrowseViewFacetFrm input[name=key]").length ) {
			
				for ( var i = 0; i < contentFilter[ key ].length; i += 1 ) 
				{
					FacetPanel.createNewElement(browseForm, key, contentFilter[ key ][ i ]);
				}
			}
		}
	}

});