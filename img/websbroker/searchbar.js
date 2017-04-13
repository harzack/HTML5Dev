var sd_emptyQuery = "";
var sd_cannotSearchFromHere = "";
var currentSearchPrompt = "";
var currentVisible = ""; // Use to store the current visible search mode
var openedFirstTime = false;

// Search bar class to remove functions out of global namespace
// eventually it would be nice if all search bar javascript was
// implemented as part of this object
var SearchBar = new function() {

	this.searchBarFromHereCB = undefined;
	
	// the passed in callback should accept a single parameter
	// to reference the current form object, and return a new
	// "From Here" clause
	this.setSearchBarFromHereCB = function( callback ) {
	
		this.searchBarFromHereCB = callback;	
	};
	
	// Calls the registered callbacks while passing in
	// a reference to the appropriate form element
	this.runSearchBarFromHereCB = function( form ) {
	
		if ( this.searchBarFromHereCB !== undefined && typeof this.searchBarFromHereCB == 'function' )
		{
			return this.searchBarFromHereCB( form );
		}
	};
	
	// if function searchBarFromHereCB is defined by calling SearchBar.setSearchBarFromHereCB(), 
	// call SearchBar.runSearchBarFromHereCB() to get the LQL representation of the active facets, and set the value to form fields
	// searchBarFromHereCB will be defined if it is a virtual folder
	this.setFromHereQuery = function( form, type, isExpand ) {
	
		var strFromHereQuery;
		var strQueryInForm;
		var scopeSelection;
		var slice;
	
		if ( type == "fulltext" ){
		
			strQueryInForm = document.fulltextSearchBarForm.fromHereQuery.value;
			scopeSelection = document.fulltextSearchBarForm.ScopeSelection;
			slice = document.fulltextSearchBarForm.slice;
		} else {
			strQueryInForm = document.nlqSearchBarForm.fromHereQuery.value;
			scopeSelection = document.nlqSearchBarForm.ScopeSelection;
			slice = document.nlqSearchBarForm.slice;
		}
		
		// get slice field when scope selection is disabled
		if (null == scopeSelection) {
			scopeSelection = slice;
		}
	
		//check if it is from here or from here (expended) search, if not, return false
		if ( ( isNaN(scopeSelection.value) == false ) && ( isExpand == false ) )
			return false;
			
		if ( strQueryInForm == ""){
			
			//virtual folder and search bar search from the virtual folder browse page
			strFromHereQuery = SearchBar.runSearchBarFromHereCB( form );
			
			if ( strFromHereQuery === undefined || strFromHereQuery.length == 0)
			{
				return false;
			}
		} else {
			//virtual folder and search bar search from search results page
			strFromHereQuery = strQueryInForm;
		}
		
		if ( type == "fulltext" ){
	
			if ( isExpand == true )
			{
				document.fulltextSearchBarForm.where2.value = strFromHereQuery;
			}
			else
			{		
				var input = document.createElement( 'input' );
				input.setAttribute( "type", "hidden" );
				input.setAttribute( "name", "boolean4" );
				input.setAttribute( "id", "boolean4" );
				input.setAttribute( "value", "And" );
				form.appendChild( input );
	
				input = document.createElement( 'input' );
				input.setAttribute( "type", "hidden" );
				input.setAttribute( "name", "lookfor4" );
				input.setAttribute( "id", "lookfor4" );
				input.setAttribute( "value", "complexquery" );
				form.appendChild( input );
	
				input = document.createElement( 'input' );
				input.setAttribute( "type", "hidden" );
				input.setAttribute( "name", "where4" );
				input.setAttribute( "id", "where4" );
				input.setAttribute( "value", strFromHereQuery );
				form.appendChild( input );
			}
	
			document.fulltextSearchBarForm.fromHereQuery.value = strFromHereQuery;
		} 
		else 
		{
			var input = document.createElement( 'input' );
			input.setAttribute( "type", "hidden" );
			input.setAttribute( "name", "lookfor1" );
			input.setAttribute( "value", "complexquery" );
			form.appendChild( input );
	
			document.nlqSearchBarForm.where1.value = strFromHereQuery;
			document.nlqSearchBarForm.fromHereQuery.value = strFromHereQuery;
		}
			
		return true;
	}	
};

//blank search term field if it is a prompt, it is called when click From Here (Expanded) ...
function clearSearchPrompt( visible )
{
	// NLQ and nickname have weird element IDs, so we have to do a silly conditional here.
	if (visible == "nlq")
		visibleElement = document.getElementById("nlqwhere1");
	else if (typeof visible == "string")
		visibleElement = document.getElementById(visible + "where1");

	if ( $(visibleElement).hasClass("search-text-dim") )
		$(visibleElement).val("");

}

//Time to disable search buttons after a search request. the requests are disabled to prevent overloading the server,
//and the timout is a failsafe if the request is interrupted for some reason (same code is replicated in search.js)
var SEARCH_LOCKOUT_TIME = 10000;	//10 seconds

function openSearchHelpWindow( helpSearchKey )
{
	helpWindow = window.open( _baseUrl + "?func=help.index&keyword=" + escape( helpSearchKey ), "helpWin", "width=600,height=400,resizable,toolbar" );
	if ( helpWindow.focus )
	{
		helpWindow.focus();
	}
}

/* Changes which search mode is currently visible (IE nlq, fulltext, etc).
 * The variable "makeThisVisible" should be the widget name of the search
 * mode to display.  The root element of this widget should be XmainDivId
 * where X is the widget name, and the search box for this widget should be
 * accessible via document.XSearchBarform.where1.
 *
 * Any widget that is requested via this function must first be registered
 * with the search bar code (IE it must be a member of allSearchTypes).
 */
function changeSearchType(makeThisVisible) {
	var preservedInput;
	var preservedInputField;
	
	for ( var y = 0, len = allSearchTypes.length; y < len; ++y )
	{
		thisType = document.getElementById( allSearchTypes[y] + 'mainDivId' );
		
		if ( thisType.style.display == 'block' )
		{	
			preservedInputField = document.getElementById( allSearchTypes[y] + 'where1' );
			if ( preservedInputField.getAttribute('class') != 'search-input search-text-dim' )
			{	
				preservedInput = preservedInputField.value;
			}
		}
		
		if ( allSearchTypes[y] == makeThisVisible )
			thisType.style.display = 'block';
		else
			thisType.style.display='none';
	}

	if ( preservedInput != null && preservedInput.length > 0 )
	{
		document.getElementById( makeThisVisible + 'where1' ).value = preservedInput;
		generateSearchPromptIfNecessary( makeThisVisible, false );
	
		var visibleSearchPanel = makeThisVisible + "mainDivId";
		resizeSearchPanel( visibleSearchPanel );
	}
	else
	{
		generateSearchPrompt( makeThisVisible );
	}
	
	currentVisible = makeThisVisible;
	$.ui.showHide._self._showIFrame($("#nav").find('.search-panel-open'));
	$.ui.showHide._self._hideIFrame();
}

/* Determines if it is necessary to put a search prompt inside the search
 * box, and if so, calls generateSearchPrompt.  A search prompt is required
 * if the search box of the widget (defined by visible, following naming 
 * conventions described above) is empty or contains the currently stored
 * search prompt.  Both parameters are optional:
 	- visible is the widget to generate the prompt for; if visible is not
 	  included, the currently visible widget will be used.
 	- updateCurrentSearchPrompt determines whether the stored search prompt
 	  should be saved.  This is used in generateSearchPrompt() - see comments
 	  for that function for details.
 */
function generateSearchPromptIfNecessary( visible, updateCurrentSearchPrompt )
{

	var visibleElement;
	
	var potentialSearchPrompt = getSearchPrompt(visible);

	if (visible == null)
		visible = currentVisible;

	// NLQ and nickname have weird element IDs, so we have to do a silly conditional here.
	if (visible == "nlq")
		visibleElement = document.getElementById("nlqwhere1");
	else if (visible == "nickname")
		visibleElement = document.getElementById("nicknamewhere1");
	else if (typeof visible == "string")
		visibleElement = document.getElementById(visible + "where1");

	// If we need to generate a search prompt...
	if ($(visibleElement).val() == currentSearchPrompt || $(visibleElement).val() == potentialSearchPrompt || $(visibleElement).val().length == 0) 
	{
		generateSearchPrompt(visible);
	} else {
		
		// Set styling: make text normal, since this is a search term, not a prompt.
		$(visibleElement).addClass("search-text-normal");
		$(visibleElement).removeClass("search-text-dim");
	}
}

/* Generates the prompt to be inserted in the search box as italic text.
 * For all search widgets except Nickname, we include the scope as part
 * of the search prompt.  The parameters are as follows:
 	 - visible is the name of the widget to update the prompt for.  If no
 	   value is used, the code uses the currently visible widget.
 	 - updateCurrentSearchPrompt is a boolean value determining whether
 	   the currentSearchPrompt variable should be updated.  Generally this
 	   is only false if the widget to be updated is not currently visible.
 	   If no value is passed in, we assume true.
 */
function generateSearchPrompt( visible, updateCurrentSearchPrompt )
{

	if (updateCurrentSearchPrompt == null)
		updateCurrentSearchPrompt = true;
		
	var scope;
	var newSearchPrompt;
	var slicesElement;
	var visibleElement;
	
	if ( visible == "nickname" ) {
		
		if (updateCurrentSearchPrompt)
			currentSearchPrompt = nicknameDefaultText;
		visibleElement = document.getElementById("nicknamewhere1");
		visibleElement.value = nicknameDefaultText;	// Always use the prompt "Nickname"
		
	} else {

		newSearchPrompt = getSearchPrompt( visible );

		if (updateCurrentSearchPrompt)	
			currentSearchPrompt = newSearchPrompt;
		
		// Set styling: make text dim, since this is a prompt, not search term.
		visibleElement = document.getElementById(visible + "where1");

		$(visibleElement).val(newSearchPrompt);	// Set the search box's value to the prompt string		
	}
	$(visibleElement).removeClass("search-text-normal").addClass("search-text-dim");

	var visibleSearchPanel = visible + "mainDivId";
	resizeSearchPanel(visibleSearchPanel);
}

function getSearchPrompt( visible )
{
	newSearchPrompt = searchText;

	slicesElement = document.getElementById("selected" + visible + "slices");
	if (slicesElement != null)
	{
		if (document.all && slicesElement.firstChild.innerText) {
			// <= IE9
			scope = slicesElement.firstChild.innerText
		} else {
			// Firefox (supports 'textContent' but not 'innerText')
			// IE10
			scope = slicesElement.textContent
		}
		scope = " " + scope.replace(/^\s*/, "");	
		newSearchPrompt += scope;
	}

	return newSearchPrompt;
}

// Resizing Search Panel (needed for IE)
function resizeSearchPanel(visible) {
	var maxLen = 0;
	var actionIsLonger = false;
	var searchMenuWidth = $('#' + visible ).find('.search-menu-select').eq(0).width();

	//reset dropdown menu width
	$('#' + visible ).find('.menu').each(function(){
	    if(this.offsetWidth > maxLen)
	    {
	      maxLen = this.offsetWidth;
	    }
	});
	
	if ( searchMenuWidth != null )
	{
		//This is to prevent the dropdowns from keep expanding when selecting new values from the slice dropdown
		if ( maxLen > 0 && maxLen > searchMenuWidth )
		{
			$('#' + visible ).find('.search-menu-select').css({ 'width': maxLen + 20 } );
		}
	}
	
	// Auto resize search panel for IE - depending on the contents in the search panel
	// Reset css width property
	$("#nav").find('.search-panel').css({ 'width': '' });
	// We can store search panel content widths in 'searchPanelRowWidths' array and adjust the search panel width based on the largest width
	var searchPanelRowWidths = new Array();
	var searchBut = $('#' + visible ).find('.searchBut');

	for ( var i = 0, len = searchBut.length; i< len; ++i ){
		if ($(searchBut[i]).find('label').eq(0).width() != null && $(searchBut[i]).find('div.search-menu-select').eq(0).width() != null) {
			// 'rowWidth' = label width + drop down list width in each row of the search panel
			var rowWidth = parseInt($(searchBut[i]).find('label').eq(0).width() + $(searchBut[i]).find('div.search-menu-select').eq(0).width());
			searchPanelRowWidths.push(rowWidth);
		}
	}	
	
	// search panel width is adjusted once we know what the widest row in the search panel is
	var largestWidth = parseInt(searchPanelRowWidths.sort(function(a, b) { return a - b }).slice(-1));
	var searchActionRowWidth = $('#' + visible ).find('.search-action-row').width();

	// Do not set search panel width if search-action-row width is 0
	if ( searchActionRowWidth == 0 )
	{
		largestWidth = 0;
	}else{
		// We add 'search-action-row' width to 'searchPanelRowWidths' array so we can compare all widths and get the largest
		if ( largestWidth < searchActionRowWidth - 45 )
		{
			largestWidth = searchActionRowWidth - 45;
			actionIsLonger = true;
		}
	}

	if (largestWidth > 0)
	{
		// For full text search and dropdown wider than search action row, set search panel width different than other cases
		// Otherwise, it causes the search panel right side to mess up in IE.
		if ( visible == "fulltextmainDivId" && actionIsLonger == false )
			$("#nav").find('.search-panel').css({ 'width': largestWidth + 64 });
		else
			$("#nav").find('.search-panel').css({ 'width': largestWidth + 65 });
		
	}
}

// For searchbar type select
function showSearchTypeMenu(rootedAt, menuSelect) {
    var menu = $("#" + String(rootedAt));
    var dropDownOffset = menu.parent().offset();
    var menuX = menu.parent().width() - $(menuSelect).width()+11;
    var menuY = menu.parent().offset().top - menu.parent().parent().parent().parent().parent().offset().top + $(menuSelect).height()+1;
    var menuW = $(menuSelect).width() - 11;
    menu.attr({ style: 'visibility:visible; width:' + menuW + 'px; top:' + menuY + 'px; left:' + menuX + 'px;' });
    showMenu(rootedAt);
    $('#HideSelect').css({ 'z-index': -1 });
}

// there are two common strings that are used for each widget:
// 	[WebSBroker_HTMLLabel.ThereIsAnEmptyQueryPleaseEnterAValidOne]
//	[WebSBroker_ErrMsg.CannotPerformASearchAgainstFromHereExpanded]
function sd_setupMenuStrings( emptyQuery, cannotSearch )
{
	sd_emptyQuery = emptyQuery;
	sd_cannotSearchFromHere = cannotSearch;
}

//reset where clauses value before submit
function setWhereClauseValue( isVirtualFolder )
{   
	var	searchField2 = document.fulltextSearchBarForm.where2;
	var	searchField3 = document.fulltextSearchBarForm.where3;
	
	if ( isVirtualFolder ){

		var	searchField4 = document.getElementById("where4");

		if ( searchField2.value == "" ) {
			if ( searchField3.value == "" ) {
				if ( searchField4.value != "" ) {
					// where2 and where3 are empty, and where4 is not, set where4 to where2
					searchField2.value = searchField4.value;
					document.fulltextSearchBarForm.boolean2.value = document.fulltextSearchBarForm.boolean4.value
					document.fulltextSearchBarForm.lookfor2.value = document.fulltextSearchBarForm.lookfor4.value
					searchField4.value = ""; 
				}
			} else {
				if ( searchField4.value == "" ) {
					// where2 and where4 are empty, and where3 is not, set where3 to where2
					searchField2.value = searchField3.value;
					document.fulltextSearchBarForm.boolean2.value = document.fulltextSearchBarForm.boolean3.value
					document.fulltextSearchBarForm.lookfor2.value = document.fulltextSearchBarForm.lookfor3.value
					searchField3.value = "";
				} else {
					// where2 is empty, and where3 and where4 are not, set where3 to where2, and where4 to where3
					searchField2.value = searchField3.value;
					document.fulltextSearchBarForm.boolean2.value = document.fulltextSearchBarForm.boolean3.value
					document.fulltextSearchBarForm.lookfor2.value = document.fulltextSearchBarForm.lookfor3.value
					searchField3.value = searchField4.value;
					document.fulltextSearchBarForm.boolean3.value = document.fulltextSearchBarForm.boolean4.value
					document.fulltextSearchBarForm.lookfor3.value = document.fulltextSearchBarForm.lookfor4.value
					searchField4.value = "";
				}
			}
		} else {
			if ( ( searchField3.value == "" ) && ( searchField4.value != "" ) ) {
				// where3 is empty, and where2 and where4 are not, set where4 to where3
				searchField3.value = searchField4.value;
				document.fulltextSearchBarForm.boolean3.value = document.fulltextSearchBarForm.boolean4.value
				document.fulltextSearchBarForm.lookfor3.value = document.fulltextSearchBarForm.lookfor4.value
				searchField4.value = "";
			}
		}
	} else {
		if ( ( searchField2.value == "" ) && ( searchField3.value != "" ) ) {
			// where2 is empty, and where3 is not, set where3 to where2
			searchField2.value = searchField3.value;
			document.fulltextSearchBarForm.boolean2.value = document.fulltextSearchBarForm.boolean3.value
			document.fulltextSearchBarForm.lookfor2.value = document.fulltextSearchBarForm.lookfor3.value
			searchField3.value = "";
		}
	}
}

// ---------------  The fulltext widget submit javascript ---------------
function fulltextSearchBarSubmit( toSubmit, dateSelectFieldName )
{   
	var	isVF = SearchBar.setFromHereQuery ( document.fulltextSearchBarForm, "fulltext", false );
	
	var 	fromHere = true;

	var	searchField1 = document.fulltextSearchBarForm.where1;
	var	searchField2 = document.fulltextSearchBarForm.where2;
	var	searchField3 = document.fulltextSearchBarForm.where3;
	var	searchField4 = eval( "document.fulltextSearchBarForm." + dateSelectFieldName );
	var	queryLength = searchField1.value.length + searchField2.value.length + searchField3.value.length + searchField4.value.length;
	
	if ( isVF == true)
		queryLength = queryLength + document.getElementById("where4").value.length;
		
	// check for default text or empty query
	// permit metadata fulltext search 
	if ($("#fulltextwhere1").val() == currentSearchPrompt || queryLength < 1) {
		searchField1.value = "*";
	}

	var scopeSelection = document.fulltextSearchBarForm.ScopeSelection;
	var fromHereExpanded = document.fulltextSearchBarForm.FromHereExpanded;

	// Make sure scope selection was enabled
	if ( scopeSelection !== undefined ) 
	{
		// Check if attempting to perform a search against From Here (expanded)...
		// This check is required in case the user selects browser back after selecting 'from Here (expanded)...'
		if (fromHereExpanded.value && 1 == scopeSelection.selectedIndex) {
			alert(sd_cannotSearchFromHere);
			return false;
		}
		
		if ( scopeSelection.value.length > 0 )
		{
			var splitScope = unescape( scopeSelection.value ).split( "|" );
		
			document.fulltextSearchBarForm.slice.value = splitScope[0];
			
			if ( splitScope[1] !== undefined )
			{
				document.fulltextSearchBarForm.location_id1.value = splitScope[1];
			}
		}
	}

	document.fulltextSearchBarForm.func.value = 'search';
	document.fulltextSearchBarForm.fulltextMode.value = document.fulltextSearchBarForm.lookfor1.value;

	if (toSubmit == 1 && !this.performingSearch) {
	
		// if redirectPost is set to 1 and the query is not excessively long
		// use GET request since it is faster than redirect POST to a GET
	    	if ( queryLength < 1024 && useGetRequest )
		{
			document.fulltextSearchBarForm.method = 'GET';

			//before submit, need to reset where clauses value
			setWhereClauseValue(isVF);

			// Remove all empty hidden parameters from GET request
			$( "#fulltextSearchBarForm input:hidden[value='']" ).attr( "disabled", "disabled" );
			
			// modifier1 is needed to be submitted even the value is empty, since value empty is for modifier of "none"
			// and we need this value to be persisted on the result page.
			if ( $( "#fulltextSearchBarForm input[name=modifier1]" ).val() == '' )
				$( "#fulltextSearchBarForm input[name=modifier1]" ).removeAttr("disabled");
		}
		
		// Show searching progress dialog
		performSearchDialog();
	
		//This is to prevent the user from clicking search multiple times without waiting for the result
		this.performingSearch = true;

		//set a timeout for the disabled search button - enable it after 10 seconds
		setTimeout("performingSearch = false", SEARCH_LOCKOUT_TIME);

		document.fulltextSearchBarForm.submit();
	}
}

// ---------------  The nlq widget submit javascript ---------------
function nlqSearchBarSubmit( toSubmit )
{
	var	isVF = SearchBar.setFromHereQuery ( document.nlqSearchBarForm, "nlq", false );

	var fromHere = true;
	var searchField = document.nlqSearchBarForm.nlq;
	var searchField1 = document.nlqSearchBarForm.fromHereQuery;

	//check for default text
	if ($("#nlqwhere1").val() == currentSearchPrompt) {
		document.nlqSearchBarForm.nlq.focus();
		return false;
	}
	
	//check for Empty Query
	if ( searchField.value.length < 1 )
	{
		alert( sd_emptyQuery );
		searchField.focus();
		return false;
	}

	var scopeSelection = document.nlqSearchBarForm.ScopeSelection;
	var fromHereExpanded = document.nlqSearchBarForm.FromHereExpanded;
	
	
	// Make sure scope selection was enabled
	if ( scopeSelection !== undefined ) 
	{
		// Check if attempting to perform a search against From Here (expanded)...
		// This check is required in case the user selects browser back after selecting 'from Here (expanded)...'
		if (fromHereExpanded.value && 1 == scopeSelection.selectedIndex) {
			alert(sd_cannotSearchFromHere);
			return false;
		}

		if ( scopeSelection.value.length > 0 )
		{
			var splitScope = unescape( scopeSelection.value ).split( "|" );

			document.nlqSearchBarForm.slice.value = splitScope[0];

			if ( splitScope[1] !== undefined )
			{
				document.nlqSearchBarForm.location_id1.value = splitScope[1];
			}
		}
	}
	
	document.nlqSearchBarForm.func.value = 'search';

	// Blank any where1 on submit
	if ( isVF != true )
		document.nlqSearchBarForm.where1.value = '';
	if (toSubmit == 1 && !this.performingSearch) {
	
		
		// if redirectPost is set to 1 and the query is not excessively long
		// use GET request since it is faster than redirect POST to a GET
	    	if ( ( searchField.value.length + searchField1.value.length) < 1024 && useGetRequest )
		{
			document.nlqSearchBarForm.method = 'GET';

			// Remove all empty hidden parameters from GET request
			$( "#nlqSearchBarForm input:hidden[value='']" ).attr( "disabled", "disabled" );
		}
    		
    		// Show searching progress dialog
		performSearchDialog();
		
    		//This is to prevent the user from clicking search multiple times without waiting for the result
    		this.performingSearch = true;
    	
    		//set a timeout for the disabled search button - enable it after 10 seconds
		setTimeout("performingSearch = false", SEARCH_LOCKOUT_TIME);
		
		document.nlqSearchBarForm.submit();
	}
}

// ---------------  The nickname widget submit javascript ---------------
function nicknameSearchBarSubmit()
{
	var fromHere = true;
	var searchField = document.nicknameSearchBarForm.nickname;
	
	//check for default text
	if ($("#nicknamewhere1").val() == currentSearchPrompt) {
		document.nicknameSearchBarForm.nickname.focus();
		return false;
	}
	
    	//check for Empty Query
	if (searchField.value.length < 1) {
		alert(sd_emptyQuery);
		document.nicknameSearchBarForm.nickname.focus();
		return false;
	}
    
	if (!this.performingSearch) {
    		
    		// Show searching progress dialog
		performSearchDialog();
		
    		//This is to prevent the user from clicking search multiple times without waiting for the result
    		this.performingSearch = true;
    	
    		//set a timeout for the disabled search button - enable it after 10 seconds
		setTimeout("performingSearch = false", SEARCH_LOCKOUT_TIME);
		
		document.nicknameSearchBarForm.submit();
	}
}

// Test for an input field enter key stroke
function sb_nlqEnter( theForm, e, emptyQueryStr, noSearchFromHereStr  )
{
	// IE passes the char in event.keyCode, Mozilla in event.which
	if ( !e )
	{
		e = window.event;
	}

	var c = ( e.charCode ) ? e.charCode : ( ( e.which ) ? e.which : e.keyCode );

	if ( c == 13 || c == 3 )
	{
		nlqSearchBarSubmit( 1 );
		return false;
	}
}

// Test for an input field enter key stroke
function sb_fulltextEnter( theForm, e, field )
{
	// IE passes the char in event.keyCode, Mozilla in event.which
	if ( !e )
	{
		e = window.event;
	}

	var c = ( e.charCode ) ? e.charCode : ( ( e.which ) ? e.which : e.keyCode );

	if ( c == 13 || c == 3 )
	{
		fulltextSearchBarSubmit( 1, field );
		return false;
	}
}

// Test for an input field enter key stroke
function sb_nicknameEnter( theForm, e )
{
	// IE passes the char in event.keyCode, Mozilla in event.which
	if ( !e )
	{
		e = window.event;
	}

	var c = ( e.charCode ) ? e.charCode : ( ( e.which ) ? e.which : e.keyCode );

	if ( c == 13 || c == 3 )
	{
		nicknameSearchBarSubmit();
		return false;
	}
}

// Routines to generate global menus
// MenuBar contains Menus which contain Items, Dividers and SubMenus

var sd_baseURL = '';
var sd_img = '';
var sd_menuCount = 0;
var sd_menuWidth = 100;
var sd_nextId = 1;
var sd_menuName = "";
var sd_formName = "";
var sd_widget = "";

function sd_setBaseURL( s )
{
	sd_baseURL = s;
}

function sd_setMenuName( s )
{
	sd_menuName = s;
}

function sd_setFormName( s )
{
	sd_formName = s;
}

function sd_setSupportPath( s )
{
	sd_img = s;
}

function sd_setWidget( s )
{
	sd_widget = s;
}

function sd_setupMenu( url, support )
{
	sd_baseURL = url;
	sd_img = support;
}

// HTML Fragments - these are building blocks for search bar menus

// Substitutions: IMG,  MENUNAME, MENULABEL, ITEMID
var sd_html_menuStartTop =
	'<label>#MENULABEL#</label>'+
	'<div id="#MENUNAME#Menu" class="search-menu-select" onClick="ShowSBDropDownMenu(\'show#MENUNAME#\', this);return false;">' +
	'			<div id="#ITEMID#MenuSelectTitle">' +
	'				<div id="selected#MENUNAME#" onClick="showMenu( \'#MENUNAME#Menu\', \'\' );return false">';
// Substitutions: IMG,  TOOLTIP
var sd_html_menuStartBottom =
	'				</div>' +
	'			</div>' +
	'<span class="select-arrow">&nbsp;</span>' +
	'</div>&nbsp;';

// Substitutions: IMG,  MENUNAME, MENULABEL, TOOLTIP, ITEMNAME, ITEMIMG, ITEMID

var sd_html_menuStartImgWthText =
	' <a id="show#MENUNAME#text" style="background: url(#IMG##ITEMIMG#) no-repeat left center;" class="#SELECTTITLE#" HREF="javascript:void(0)" onClick="Change#MENUNAME#( \'#MENUINDEX#\', \'#ITEMVALUE#\');">#ITEMNAME#</a>';

var sd_html_menuStartText =
	' <a title="#TOOLTIP#" class="select-title left" HREF="javascript:void(0)" onClick="showMenu( \'#MENUNAME#Menu\', \'\'  );return false">#ITEMNAME#</a>';

// Substitutions: IMG, MENUNAME, MENUINDEX - needs to be on one line for IE
var sd_html_menuSeparator =
	'	<div id="#MENUNAME##MENUINDEX#DivId" class="menuDivider"><img src="#IMG#spacer.gif" alt="" width="1" height="1"></div>';

// Substitutions: MENUNAME
var sd_html_menuOptionsStart =
	'<div id="show#MENUNAME#" class="menu">';

// Substitutions: MENUNAME, MENUINDEX, ITEMVALUE, INDENTCLASS
var sd_html_menuItemStart =
	'<div id="#MENUNAME##MENUINDEX#DivId" class="menuItem#INDENTCLASS#"' +
	'	onmouseover="javascript:hiLight( \'#MENUNAME##MENUINDEX#DivId\' );" ' +
	'	onmouseout="javascript:loLight( \'#MENUNAME##MENUINDEX#DivId\' );" ' +
	'	onClick="Change#MENUNAME#(\'#MENUINDEX#\',\'#ITEMVALUE#\', \'#MENUNAME#\');"> ';

// Substitutions: ITEMNAME
var sd_html_itemindent =
	'';

// Substitutions: MENUNAME, IMG, ITEMIMG, ITEMNAME
var sd_html_menuItemEndImg =
	'<span>' +
	'<a id="show#MENUNAME#text" style="background: url(#IMG##ITEMIMG#) no-repeat left center; padding-bottom:0.3em;" class="select-title icon-select-title" HREF="javascript:void(0)">#ITEMNAME#</a>' +
	'</span>' +
	'</div>';

var sd_html_menuItemEndNoImg =
	'	<span id="show#MENUNAME#text">' +
	'		<a HREF="javascript:void(0)">#ITEMNAME#</a>&nbsp;' +
	'	</span>' +
	'</div>';

var sd_html_menuItemTxt =
	'<div id="#MENUNAME##MENUINDEX#DivId" class="menuItem"' +
	'	onmouseover="javascript:hiLight( \'#MENUNAME##MENUINDEX#DivId\' );" ' +
	'	onmouseout="javascript:loLight( \'#MENUNAME##MENUINDEX#DivId\' );" ' +
	' 	onClick="Change#MENUNAME#( \'#MENUINDEX#\', \'#ITEMVALUE#\');">' +
	'	<a HREF="javascript:void(0)">#ITEMNAME#</a>' +
	'</div>';

/* 
 * The calls to String.replace( /\$/g, '$$$$' ) below are to protect against inadvertant use of the special $ replacement characters
 * $&, $`, $', $n, $nn
 * Internet Explorer also (erroneously) supports $_ (and perhaps $* and $+, which would not apply in these cases)
 */

function sd_menuImgStart( menuLabel, toolTip, itemName, itemID, itemImg )
{
	var s = sd_html_menuStartTop;

	s = s + sd_html_menuStartImgWthText;
	
	s = s + sd_html_menuStartBottom;

	
	s = s.replace( /#MENUNAME#/g, sd_menuName );
	s = s.replace( /#MENULABEL#/g, menuLabel );
	s = s.replace( /#TOOLTIP#/g, toolTip );
	s = s.replace( /#ITEMNAME#/g, itemName.replace( /\$/g, '$$$$' ) );
	s = s.replace( /#ITEMID#/g, itemID );
	
	// If the menu item has an icon image we add the 'icon-select-title' class to add padding for the background image
	// If it doesn't have an icon image, make sure no part of the path is included or a unnecessary error
	// log entry in apache will be generated for every page browse
	if (itemImg.length > 0) {
		s = s.replace(/#SELECTTITLE#/g, 'select-title icon-select-title');
		s = s.replace( /#IMG#/g, sd_img );
		s = s.replace(/#ITEMIMG#/g, itemImg);
	} else {
		s = s.replace(/#SELECTTITLE#/g, 'select-title');
		s = s.replace( /#IMG#/g, "" );
		s = s.replace(/#ITEMIMG#/g, "");
	}

	document.write( s );
}

function sd_menuTxtStart( menuLabel, toolTip, itemName, itemID, itemImg )
{
	var s = sd_html_menuStartTop;
	s = s + sd_html_menuStartText;
	s = s + sd_html_menuStartBottom;

	s = s.replace( /#IMG#/g, sd_img );
	s = s.replace( /#MENUNAME#/g, sd_menuName );
	s = s.replace( /#MENULABEL#/g, menuLabel );
	s = s.replace( /#TOOLTIP#/g, toolTip );
	s = s.replace( /#ITEMNAME#/g, itemName.replace( /\$/g, '$$$$' ) );
	s = s.replace( /#ITEMID#/g, itemID );
	s = s.replace(/#ITEMIMG#/g, itemImg);

	document.write( s );
}

function sd_separator( index )
{
	var s = sd_html_menuSeparator;

	s = s.replace( /#IMG#/g, sd_img );
	s = s.replace( /#MENUNAME#/g, sd_menuName );
	s = s.replace( /#MENUINDEX#/g, index );

	document.write( s );
}

function sd_optionsStart()
{
	var s = sd_html_menuOptionsStart;

	s = s.replace( /#MENUNAME#/g, sd_menuName );

	document.write( s );
}

function sd_itemImg( itemName, itemImg, index, itemValue, indent )
{
	var s;
	var i;
	var indentClass;

	s = sd_html_menuItemStart;

	if (indent == 0)
		indentClass = "";
	else if (indent == 1)
		indentClass = " menuItemLevel2";
	else	// indent=2 is the maximum
		indentClass = " menuItemLevel3";

	if ( itemImg.length > 0 )
	{
		s = s + sd_html_menuItemEndImg;
	}
	else
	{
		s = s + sd_html_menuItemEndNoImg;
	}

	s = s.replace( /#MENUNAME#/g, sd_menuName );
	s = s.replace( /#ITEMNAME#/g, itemName.replace( /\$/g, '$$$$' ) );
	s = s.replace( /#ITEMIMG#/g, itemImg );
	s = s.replace( /#MENUINDEX#/g, index );
	s = s.replace( /#IMG#/g, sd_img );
	s = s.replace( /#ITEMVALUE#/g, itemValue.replace( /\$/g, '$$$$' ) );
	s = s.replace( /#INDENTCLASS#/g, indentClass );
	document.write( s );
}

function sd_itemTxt( itemName, index, itemValue  )
{
	var s = sd_html_menuItemTxt;

	s = s.replace( /#MENUNAME#/g, sd_menuName );
	s = s.replace( /#MENUINDEX#/g, index );
	s = s.replace( /#ITEMNAME#/g, itemName.replace( /\$/g, '$$$$' ) );
	s = s.replace( /#ITEMVALUE#/g, itemValue.replace( /\$/g, '$$$$' ) );
	document.write( s );
}

function sd_menuEnd()
{
	document.write( "</DIV>" );
}

function ShowSBDropDownMenu( rootedAt, menuSelect)
{
    var menu = $("#" + String(rootedAt));
    var menuParent = menu.parent();  
    var menuX = menuParent.width() - $(menuSelect).width() + 11;
    var menuY = menuParent.offset().top - menuParent.parent().parent().parent().parent().offset().top + $(menuSelect).height()+1;
    var menuW = $(menuSelect).width() - 11;
    menu.attr({ style: 'visibility:visible; width:' + menuW + 'px; top:' + menuY + 'px; left:' + menuX + 'px;' });
    showMenu(rootedAt);
    $('#HideSelect').css({ 'z-index': -1 });
}

// The follow is for the Search bar type dropdown.  It has different handlers for selection so it easier to
//
var sd_html_SelectStart =
	'<div id="showSearchTypeMenu" class="search-menu-select" onClick="showSearchTypeMenu(\'show#WIDGET#SearchTypeSelect\', this);return false;">'+
	'	<a id="showSearchTypeMenuSelectTitle" class="select-title" TITLE="#TOOLTIP#" HREF="javascript:void(0)" onClick="showMenu( \'showSearchTypeMenu\', \'\' );return false">#ITEMNAME#</a>' +
	'<span class="select-arrow">&nbsp;</span>' +
	'</div>';

var sd_html_menuSelectStart =
	'<div id="show#WIDGET#SearchTypeSelect" class="menu">';

var sd_html_menuSelectItem =
	'<div id="#WIDGET##WIDGETNAME#menuDivId" class="menuItem"'+
	'	onmouseover="javascript:hiLight( \'#WIDGET##WIDGETNAME#menuDivId\' );"'+
	'	onmouseout="javascript:loLight( \'#WIDGET##WIDGETNAME#menuDivId\' );"'+
	'	onClick="loLight( \'#WIDGET##WIDGETNAME#menuDivId\' ); changeSearchType(\'#WIDGETNAME#\');" >'+
	'	<a HREF="javascript:void(0)" onClick="loLight( \'#WIDGET##WIDGETNAME#menuDivId\' ); changeSearchType(\'#WIDGETNAME#\');">#ITEMNAME#</a>'+
	'</div>';

function sd_SelectStart( toolTip, itemName )
{
	var s = sd_html_SelectStart;

	s = s.replace( /#IMG#/g, sd_img );
	s = s.replace( /#TOOLTIP#/g, toolTip );
	s = s.replace( /#ITEMNAME#/g, itemName.replace( /\$/g, '$$$$' ) );
	s = s.replace( /#WIDGET#/g, sd_widget );

	document.write( s );
}

function sd_menuSelectStart( )
{
	var s = sd_html_menuSelectStart;
	s = s.replace( /#WIDGET#/g, sd_widget );
	document.write( s );
}

function sd_menuSelectItem( widgetName, itemName )
{
	var s = sd_html_menuSelectItem;

	s = s.replace( /#WIDGET#/g, sd_widget );
	s = s.replace( /#WIDGETNAME#/g, widgetName );
	s = s.replace( /#ITEMNAME#/g, itemName.replace( /\$/g, '$$$$' ) );

	document.write( s );
}

// Add in the "from here(expanded)..." search form elements that are needed to fulfill the
// the request on the Livelink server
var sd_html_fromHereFormHtml =
	'<INPUT TYPE="HIDDEN" NAME="func" VALUE="search">'+
	'<INPUT TYPE="HIDDEN" NAME="objType" VALUE="#OBJTYPE#">'+
	'<INPUT TYPE="HIDDEN" NAME="objAction" VALUE="">'+
	'<INPUT TYPE="HIDDEN" NAME="SearchBarSearch" VALUE="TRUE">'+
	'<INPUT TYPE="HIDDEN" NAME="FromHereExpanded" VALUE="">'+
	'<INPUT TYPE="HIDDEN" NAME="searchfor" VALUE="">';

function sd_fromHereForm( objType )
{
	var s = sd_html_fromHereFormHtml;
	s = s.replace( /#OBJTYPE#/g, objType );
	document.write( s );
}

// Add in the general from here search form elements that are needed
var sd_html_locationFormHtml =
	'<INPUT TYPE="HIDDEN" NAME="locationId" VALUE="">'+
	'<INPUT TYPE="HIDDEN" NAME="withinQuery" VALUE="">'+
	'<INPUT TYPE="HIDDEN" NAME="slice" VALUE="">'+
	'<INPUT TYPE="HIDDEN" NAME="searchbarwidgetmode" VALUE="#MODE#">';

function sd_locationForm( mode )
{
	var s = sd_html_locationFormHtml;
	s = s.replace( /#MODE#/g, mode );
	document.write( s );
}

// Workaround for window.width() broken in jquery 1.8 for quirks mode
function sb_windowWidth()
{
	var width = $(window).width();
	var clientWidth = document.body.clientWidth; // Present in IE quirks mode only
	
	return width > 0 ? width : clientWidth;
}

//when document has loaded
$(document).ready(function() { 

	searchText = LocString("Search", websbrokerStr);

	// If a right-hand side Appearance is enabled, the following code will ensure that the
	// search bar stays inside the bounds of the nav bar by adjusting the "right" CSS property.
	var nav = document.getElementById("nav")
	var searchPanels = $(nav).children(".search-panel");
	
	searchPanels.css("right", sb_windowWidth() - getX(nav) - nav.offsetWidth);
	
	// We may need to re-adjust each time the browser resizes
	$(window).resize(function() {
			searchPanels.css("right", sb_windowWidth() - getX(nav) - $(nav).width());
	});

	/* Find all of the elements we want to use to show/hide the search panel,
	   and apply the "showHide" jQuery UI widget, which is a custom widget
	   defined below. */
	$(nav).find(".show-search-panel").showHide($("#searchBar"));
	
	// This is the easiest way to find out the value of the 
	// [WEBSBROKER_HTMLLABEL.Search] XLate.
	
	//This is to prevent the user from clicking search multiple times without waiting for the result
	//Reset the value when the page reloads
	performingSearch = false;

	var toDisplay;
	
	if ($(nav).children(".search-panel:visible").length == 0 )
	{
		toDisplay = searchPanels[0];
		if ( toDisplay != null )
		{
			$(toDisplay).css("display", "block");
			currentVisible = toDisplay.id.substring(0, toDisplay.id.indexOf("mainDivId"))
			generateSearchPrompt(currentVisible);
		}
	}else{
		toDisplay = $(nav).children(".search-panel:visible");
		
		if ( toDisplay != null )
			currentVisible = $(toDisplay).attr("id").substring(0, $(toDisplay).attr("id").indexOf("mainDivId"))
	}
	
	// This sets the onclick function for all search buttons
	$(nav).find(".searchButton").click(function(){
		// Find the text currently displayed in the search box for the visible widget.
		var val = $(nav).find(".search-input:visible:first").val();
		
			// Invoke the search - a different function based on which widget
			// is currently selected.  To generalize this for arbitrary search
			// modes, we can make an array of search invoking functions, or
			// depending on the complexity of the invokers, generalize it to
			// one search invoker.
			if (this.id == "fulltextsubmitButton")
				fulltextSearchBarSubmit(1, $("#fulltextDateSelect").val());
			else if (this.id == "nicknamesubmitButton")
				nicknameSearchBarSubmit();
			else if (this.id == "nlqsubmitButton")
				nlqSearchBarSubmit(1);
			// otherwise, the submit functionality will be handled by
			// code in the 3rd party search bar itself.
		
	});

	// Sets the focus handler for the search box for each widget.
	$(nav).find(".search-input").focus(function() {
		
		// When the search box is focused, remove the prompt if necessary
		// and ensure that font is normal.
		$(this).removeClass("search-text-dim");
		$(this).addClass("search-text-normal");

		// If there is already user-entered text, select it.  Otherwise,
		// empty the search box for user input.
		if ($(this).val() != currentSearchPrompt)
			this.select();
		else
			$(this).val("");
		
		// Apply a class to a child of the search widget, so that
		// the buttons can go to their non-dim state.
		$(nav).find(".search-panel .search-action-row").addClass("searchBoxIsFocused");
	}) // Now set the blur handler, which undoes the stuff done in focus(), if necessary.
	.blur(function() {
		generateSearchPromptIfNecessary();
		$(nav).find(".search-panel .search-action-row").removeClass("searchBoxIsFocused");
	});

	// Set the hover functionality for the search button.
	$(nav).find(".searchButton").mouseover(function() {
		$(this).addClass("searchButton-hover");
		if ($(this).hasClass("searchButtonIcon"))
			$(this).addClass("searchButtonIcon-hover");
	}).mouseout(function() {
		$(this).removeClass("searchButton-hover");
		$(this).removeClass("searchButtonIcon-hover");
	});
	
	// The following code fakes an "active" state for the search button
	// since IE does not implement this properly.  On mousedown, we apply
	// the .searchButtonIcon-on class which is used to draw the "depressed"
	// button, and we attach a mouseup handler to the document object so that
	// if the user moves the mouse while the mouse button is down, we can still
	// register the mouseup and remove the "active" state even if the mouseup
	// is not over the button.  Part of the mousup handler removes the handler
	// from the document, preventing a memory leak.
	$(nav).find(".searchButtonIcon").mousedown(function() {
		$(this).addClass("searchButtonIcon-on");
		
		// We alias "this" into "self" so that we can access the set of
		// .searchButtonIcon elements from inside mouseupfunc (inside which
		// "this" has a different meaning).
		var self = this;
		
		var mouseupfunc = function() {
			$(self).removeClass("searchButtonIcon-on");
			$(document).unbind("mouseup", mouseupfunc);
		};
		$(document).bind("mouseup", mouseupfunc);
	});

	//Remove Focus from the search bar input field
	var visibleElement;

	if (currentVisible == "nlq")
		visibleElement = document.getElementById("nlqwhere1");
	else if (currentVisible == "nickname")
		visibleElement = document.getElementById("nicknamewhere1");
	else if (typeof currentVisible == "string")
		visibleElement = document.getElementById(currentVisible + "where1");
		
	$(visibleElement).blur();
} );

// Defines the "showHide" widget that governs the show-search-panel button's behaviour.
$.widget("ui.showHide", {
	_init: function() {
		$.ui.showHide._event;
		$.ui.showHide._self = this;
		this.open = false;
		$(this.element).bind('click', { 'obj': this }, this._click);
		var showSearchPanelTitle = "";
		tempIFrame = $('#HideSelect').clone().insertAfter($('#HideSelect'));
		openedFirstTime = false;
	},
	// Bring up an iFrame and adjust the size and position same as 'el'
	_showIFrame: function(el) {
		var elOffset = el.offset();
		tempIFrame.attr({ style: 'position:absolute; opacity:0; display:block; top:' + elOffset.top + '; left:' + elOffset.left + '; width:' + el.width() + '; height:' + el.height() + ';' });
	},
	// Hiding the iFrame
	_hideIFrame: function() {
		// Hide and remove iFrame clone after search panel is closed
		tempIFrame.attr({ style: 'position:absolute; display:none; z-index:-1000; width:0;, height:0; top:0; left:0;' });
	},
	_click: function(e) {
		$.ui.showHide._event = e.data.obj;
		e.data.obj.open = !e.data.obj.open;
		
		// For use in hide() - see explanation on "self" above in the ready() function.
		var self = this;
		var firstClick = true;

		// This hide function is used much the same way as mouseupfunc above.
		// It allows us to close the search panel if we register a click anywhere
		// else on the page.
		var hide = function(innerE) {
			//swallow the first click, since it is the opening click.
			if (firstClick)
			{
				firstClick = false;
				return;
			}
			
			// If the click is on the showHide widget OR if the click is NOT on 
			// a descendant of .search-panel-open, close the search panel.
			// Also, remove the click handler to prevent memory leak.
			if (innerE == null || !($(innerE.target).closest(".search-panel-open").length > 0) || innerE.target == self) {
				var panel = $(nav).find(".search-panel")
				panel.removeClass("search-panel-open");
				$(self).attr({ title: showSearchPanelTitle });
				$(nav).find(".search-options").hide();
				e.data.obj.open = false;
				$(document).unbind("click", hide);
				// Remove iFrame from search panel
				$.ui.showHide._self._hideIFrame($(nav).find(".search-panel-open"));
			}
		};
		
		if (e.data.obj.open) {
			var buttonOffset = $(this).offset();
			var panelXPosition = buttonOffset.left - $(nav).find(".search-options").width() + 16;
			var panelYPosition = buttonOffset.top + 22;
			var panel = $(nav).find(".search-panel")
			panel.addClass("search-panel-open");
			showSearchPanelTitle = $(this).attr("title");
			$(this).attr({ title: $("#hide-search-panel").val() });
			$(nav).find(".search-options").show();
			$(document).bind("click", hide);
			
			if (openedFirstTime == false) {
			
				resizeSearchPanel(currentVisible + "mainDivId");	
				openedFirstTime = true;
			}

			// Show iFrame around search panel
			$.ui.showHide._self._showIFrame($(e.target).closest(".search-panel-open"));
		} else {
			hide();
		}
		//don't prevent default click;
		return true;
	},
	destroy: function() {
		$.widget.prototype.apply(this, arguments); // default destroy
	}
});
