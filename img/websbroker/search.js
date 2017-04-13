//
// Search Page functions
//

/* Constants */

//Time to disable search buttons after a search request. the requests are disabled to prevent overloading the server,
//and the timout is a failsafe if the request is interrupted for some reason (same code is replicated in searchbar.js)
var SEARCH_LOCKOUT_TIME = 10000;	//10 seconds

/* Complex Query suggestion variables */

//List of keywords used to determine if we want to suggest using a complex query
var complexKeywords = ["qlattribute","qlleft-truncation","qlphonetic","qlregion","qlright-truncation","qlstem","qlthesaurus","qlregex","qllike"];

//We only want to suggest using a complex query once per page load
var alreadyNotified = false;

//The suggestion message to display for full text searches
var fullTextSuggestionMsg

//Variable tracking wether or not a search is in progress
var performingSearch = false;

function doSearchRH( theForm )
{
	//This is to prevent the user from clicking search multiple times without waiting for the result
	if(performingSearch == true)
		return;

	// Show searching progress dialog
	performSearchDialog();
		
	performingSearch = true;

	//set a timeout for the disabled search button - enable it after 10 seconds
	setTimeout("performingSearch = false", SEARCH_LOCKOUT_TIME);

	theForm.func.value = 'NewSearch';
	theForm.submit();
}

function fullTextEnter( theForm, e )
{
	// IE passes the char in event.keyCode, Mozilla in event.which
	if ( !e )
	{
		e = window.event;
	}

	var c = ( e.charCode ) ? e.charCode : ( ( e.which ) ? e.which : e.keyCode );

	if ( c == 13 || c == 3 )
	{
		doSearchRH( theForm );
		return false;
	}
}

function jsupdategui( form, typeOperation, component, subComponentId, add )
{
	form.func.value = 'll';
	form.objAction.value = typeOperation;
	form.updateComponentName.value = component;
	form.updateSubComponentId.value = subComponentId;
	form.updateComponentAdd.value = add;
	form.submit();
}

function jsupgrade( form, typeOperation, component, subComponentId, add )
{
	form.func.value = 'll';
	form.objAction.value = typeOperation;
	form.updateComponentName.value = component;
	form.updateSubComponentId.value = subComponentId;
	form.updateComponentAdd.value = add;
	form.submit();
}

function setFieldValue( formname, fieldname, url, width, height )
{			
	window.open( url, "", "height=" + height + "," + "width=" + width + "," + "scrollbars=yes,resizable=yes,menubar=no" );
}

//
// Search Result Page functions
//
function doCommandSubmit( thisCmdSelect, thisCmdSelectName, stringToLookFor, emptyStr, url, cacheId )
{
	var arrayOfStrings;
	var e;
	var stringToSplit;
	var selectedCmd = thisCmdSelect.options[ thisCmdSelect.selectedIndex ].value;
	var sr_OpenURL;
	var thisForm = thisCmdSelect.form;

	if ( selectedCmd.length == 0 )
	{
		return;
	}

	thisForm.extResultsAction.value = selectedCmd;
	thisForm.objects.value = "";

	for (var i = 0; i < thisForm.elements.length; i++)
	{
		e = thisForm.elements[i];

		if ( (e.name != 'allbox') && (e.type=='checkbox') && (e.checked) )
		{
			stringToSplit = e.name;
			arrayOfStrings = stringToSplit.split( '&' );

			if ( arrayOfStrings[0] == stringToLookFor )
			{
				thisForm.objects.value += "|" + arrayOfStrings[1];
			}
		}
	}

	if ( thisForm.objects.value.length == 0 )
	{
		alert( emptyStr );
		doCommandSelectChange( thisForm, 3 );
		return;
	}

	sr_OpenURL = url + "?func=sbroker.ExecuteExtCmd";
	sr_OpenURL += "&cacheID=" + cacheId;
	sr_OpenURL += "&extResultsAction=" + selectedCmd;
	sr_OpenURL += "&objects=" + thisForm.objects.value;

	var 	w;
	w = window.open( sr_OpenURL, "SearchExecuteCmdG2484", "top=1,left=1,width=840,height=500,resizable=yes,menubar=yes,scrollbars=yes,toolbar=yes" );
	if ( w.focus )
	{
		w.focus();
	}

	doCommandSelectChange( thisForm, 3 );
}

function CA( thisForm, stringToLookFor )
{
	var allchk = thisForm.allbox.checked;
	var arrayOfStrings;
	var e;
	var stringToSplit;

	for (var i=0; i<thisForm.elements.length; i++)
	{
		e = thisForm.elements[i];

		if ( ( e.type=='checkbox' ) && ( e.name != 'allbox' ) )
		{
			stringToSplit = e.name;
			arrayOfStrings = stringToSplit.split( '&' );

			if ( arrayOfStrings[0] == stringToLookFor )
			{
				e.checked = allchk;
			}
		}
	}
}

function CCA( thisForm )
{
	var e;
	var TB=TO=0;

	for (var i=0; i<thisForm.elements.length; i++)
	{
		e = thisForm.elements[i];
		if ( (e.type=='checkbox') && (e.name != 'allbox') && (e.name.search("ResultSelect_") != -1) )
		{
			TB++;
			if (e.checked)
			{
				TO++;
			}
		}
	}

	if ( TO == TB )
	{
		thisForm.allbox.checked=true;
	}
	else
	{
		thisForm.allbox.checked=false;
	}
}

function doCommandSelectChange( thisForm, which )
{
	if ( which==1 )
	{
	   thisForm.ExtResultsCmdSelect2.selectedIndex=thisForm.ExtResultsCmdSelect1.selectedIndex;
	}
	else if( which==2 )
	{
	   thisForm.ExtResultsCmdSelect1.selectedIndex=thisForm.ExtResultsCmdSelect2.selectedIndex;
	}
	else
	{
	   thisForm.ExtResultsCmdSelect1.selectedIndex = 0;
	   thisForm.ExtResultsCmdSelect2.selectedIndex = 0;
	}
}

function toggleDetail( form, nBBItems )
{
	var 	canSee;
	var	count = 1;
	var	theLayer;

	var	prefixes = new Array( "BB", "SR" );
	var	prefix;

	var	done = false;

	if ( ! pageLoaded )
	{
		return;
	}

	if ( IE != null )
	{
		canSee = 'block';
	}
	else
	{
		canSee = 'table-row';
	}

	var 	lessLayer = document.getElementById( 'lessState' );
	var	moreLayer = document.getElementById( 'moreState' );

	if ( lessLayer.style.display == 'none' )
	{
		form.resultDetail.value = "0";
		lessLayer.style.display = 'inline';
		moreLayer.style.display = 'none';
	}
	else
	{
		form.resultDetail.value = "1";
		lessLayer.style.display = 'none';
		moreLayer.style.display = 'inline';
	}

	// Iterate over all Best Bets and search results, hiding or displaying the extra info
	for ( var i = 0; i < prefixes.length; i++ )
	{
		prefix = prefixes[i];

		count = 1;
		done = false;

		while ( ! done )
		{
			theLayer = document.getElementById( prefix + count );

			if ( null == theLayer )
			{
				done = true;

				// For a Best Bets item, the extra row is present iff descriptions are shown and one is defined.  Therefore, we can't stop at the first null element.
				if ( ( prefix == "BB" ) && ( count < nBBItems ) )
				{
					done = false;
				}
			}
			else
			{
				if ( theLayer.style.display == 'none' )
				{
					theLayer.style.display = canSee;
				}
				else
				{
					theLayer.style.display = 'none';
				}
			}

			count += 1;
		}
	}
}

function jsdisplayoptions( form )
{
	form.func.value='ll';
	form.objType.value='258';
	form.objAction.value='displayoption';
	form.returnToSearchResults.value='true';
	form.submit();
}

function SubmitAllThemes( form )
{

	//This is to prevent the user from clicking search multiple times without waiting for the result
	if(performingSearch == true)
		return;

	performingSearch = true;

	//set a timeout for the disabled search button - enable it after 10 seconds
	setTimeout("performingSearch = false", SEARCH_LOCKOUT_TIME);
	
	form.func.value='NewSearch';
	form.startAt.value = "0";
	
	// Validate sort state
	if ( null != window.validateSort )
	{
		if ( ! window.validateSort( form ) )
		{
			return false;
		}
	}
	
	form.submit();
}

function RefineSearch( form )
{
	form.func.value = 'll';
	form.objType.value = '258';
	form.objAction.value = 'SearchPrompt';
	form.submit();
}

function SaveSearch( form )
{
	form.func.value = 'll';
	form.objType.value = '258';
	form.objAction.value = 'Create';
	form.submit();
}

function DoSearch( form, formAction, formValue, startAt )
{
	// This is to prevent the user from clicking search multiple times without waiting for the result
	if(performingSearch == true)
		return;

	// Show searching progress dialog
	performSearchDialog();
		
	performingSearch = true;

	//set a timeout for the disabled search button - enable it after 10 seconds
	setTimeout("performingSearch = false", SEARCH_LOCKOUT_TIME);
	
	// Go out of our way to avoid using eval()
	if ( formAction.toLowerCase() == 'func' )
	{
		form.func.value = formValue;
	}
	else
	{
		form.func.value = 'll';
		form.objAction.value = formValue;
	}

	form.startAt.value = startAt;
	form.submit();
}

function PopupURL( form, url, nextUrl )
{
	var 	w;

	if ( nextUrl != null )
	{
		url += '&nextUrl=' + encodeURIComponent( nextUrl );
	}

	w = window.open( url, "SearchExecuteCmd", "top=1,left=1,width=840,height=500,resizable=yes,menubar=yes,scrollbars=yes,toolbar=yes" );

	if ( w.focus )
	{
		w.focus();
	}
}

function changeSimpleSort( field )
{
	document.SearchForm.sortby.value = 'region';

	if ( document.SearchForm.rankby.value == field && ( document.SearchForm.resultsSortOrder.value == 'ascending' || document.SearchForm.resultsSortOrder.value == '' ) )
	{
		document.SearchForm.rankdirection.value = 'descending';
		document.SearchForm.resultsSortOrder.value = 'descending';
	}
	else
	{
		document.SearchForm.rankdirection.value = 'ascending';
		document.SearchForm.resultsSortOrder.value = 'ascending';
	}

	document.SearchForm.resultsSortOrderRegion.value = field;
	document.SearchForm.rankby.value = field;

	// when changing the results page column sort, need to clear resutls template value. see sfwk-4050 for details
	document.SearchForm.flipDspOpts.value = "";

	SubmitAllThemes( document.SearchForm );
}

function changeResultPageSort( form )
{
	// when changing the results page sort, need to clear resutls template value. see sfwk-4050 for details
	form.flipDspOpts.value = "";

	SubmitAllThemes( form );
}

function changeResultPageSize( theForm, value )
{
	var 	form = theForm;
	var	dspOpts = form.dspOptsForm.value;
	var 	selectedSize = value;

	// when changing the results page size, need to clear resutls template value. see sfwk-4050 for details
	form.flipDspOpts.value = "";

	if ( form.HowMany.value != selectedSize )
	{
		var	re = /'howMany'=\d+/i;
		var	newHowManyStr = "'howMany'=" + selectedSize;
		var	newDspOpts = dspOpts.replace( re, newHowManyStr );

		// Display searching spinner
		performSearchDialog();
		
		form.dspOptsForm.value = newDspOpts;

		form.func.value = 'NewSearch';
		form.startAt.value = "0";
		form.HowMany.value = selectedSize;
		form.submit();
	}
}

//
// Functions for the support of the grouping operations.
//

function group2Details( websbrokerImg, nameStr )
{

	var	theLayer = document.getElementById( "SearchGroup"+ nameStr );
	var	theButton = document.getElementById( "SearchGroup"+ nameStr + "Button" );
	var	theText = document.getElementById( "SearchGroup"+ nameStr + "Text" );

	if ( theLayer.style.display == 'none' )
	{
		theLayer.style.display = 'block';
		theText.style.display = 'none';
		theButton.src = websbrokerImg + "/triangle-down.gif";
	}
	else
	{
		theLayer.style.display = 'none';
		theButton.src = websbrokerImg + "/triangle-right.gif";
		theText.style.display = 'inline';
	}
}

//
// With Columnar results, many table rows per result can be hidden as a group.
//
function group2DetailsColumnar( websbrokerImg, nameStr )
{

	var	canSee;
	var	count = 0;
	var	subCount;
	var	done = false;
	var	doneRelatedRows = false;
	var	theLayer;

	var	theButton = document.getElementById( "SearchGroup" + nameStr + "Button" );
	var	theText = document.getElementById( "SearchGroup" + nameStr + "Text" );

	if ( IE != null )
	{
		canSee = 'block';
	}
	else
	{
		canSee = 'table-row';
	}

	if ( theText.style.display == 'none' )
	{
		theText.style.display = 'inline';
		theButton.src = websbrokerImg + "/triangle-right.gif";
	}
	else
	{
		theText.style.display = 'none';
		theButton.src = websbrokerImg + "/triangle-down.gif";
	}

	while ( ! done )
	{
		subCount = 0;

		theLayer = document.getElementById( "SearchGroup" + nameStr + '_' + count + '_' + subCount );

		if ( null == theLayer )
		{
			done = true;
		}
		else
		{
			// show/hide the columnar search result row(s)
			doneRelatedRows = false;

			while( ! doneRelatedRows )
			{
				if ( theLayer.style.display == 'none' )
				{
					theLayer.style.display = canSee;
				}
				else
				{
					theLayer.style.display = 'none';
				}

				// Try to advance to another related row
				subCount += 1;

				theLayer = document.getElementById( "SearchGroup" + nameStr + '_' + count + '_' + subCount );

				if ( null == theLayer )
				{
					doneRelatedRows = true;
				}
			}
		}

		count += 1;
	}
}

function group5Details( nameStr )
{
	theLayer = document.getElementById( "SearchGroup5"+ nameStr );

	if ( theLayer.style.display=='none' )
	{
		theLayer.style.display='block';
	}
	else
	{
		theLayer.style.display='none';
	}
}

function ChangeGroupBy2Submit( form, keyStr )
{
	// Try to get the search form
	if ( null !== form )
	{
		form.groupby.value=keyStr;
		form.func.value = 'NewSearch';
		form.submit();
	}
}

function generateSuggestions(form, key, count, newValue)
{

	//max 1 notify per page load, return if we have already notified
	if(alreadyNotified)
		return;

	//they have set the modifier and modifiers are N/A for complex queries, so switching to one wouldn't make sense
	var modifierBox = form.elements[key + "_modifier" + count];
	if(modifierBox && modifierBox.value)
		return;


	//is complex query an option?
	var modeBox = form.elements[key + "_mode" + count];
	var complexIndex = -1;

	if(modeBox && modeBox.options && modeBox.options.length > 0)
	{

		for(var i = 0; i < modeBox.options.length; i++)
		{

			if(modeBox.options[i].value == "LivelinkQuery")
			{

				complexIndex = i;
				break;
			}
		}
	}

	if(complexIndex < 0)
		return;

	for(var i = 0; i < complexKeywords.length; i++)
	{

		//if we have a complex keyword and we do not already have complex query selected, display the suggestion and set the mode dropdown
		if(newValue.indexOf(complexKeywords[i]) >= 0 && complexIndex != modeBox.selectedIndex)
		{
			document.getElementById(key + "_suggestionSpan" + count).innerHTML = fullTextSuggestionMsg.replace("%1", complexKeywords[i]);
			document.getElementById(key + "_suggestionRow" + count).style.display = "";

			form.elements[key + "_mode" + count].value="LivelinkQuery";

			alreadyNotified = true;
			
			break;
		}
	}
}

function resetSuggestions(form, key, count)
{
	document.getElementById(key + "_suggestionRow" + count).style.display = "none";
}

function setFullTextSuggestionMsg( suggestion )
{
	fullTextSuggestionMsg = suggestion
}

function mouseOverSearchButton()
{
	$( '#searchBtnLeft' ).addClass( 'searchButtonLeftDown' );
	$( '#searchBtnLeft' ).removeClass( 'searchButtonLeftUp' );

	$( '#searchBtnMiddle' ).addClass( 'searchButtonMiddleDown' );
	$( '#searchBtnMiddle' ).removeClass( 'searchButtonMiddleUp' );

	$( '#searchBtnRight' ).addClass( 'searchButtonRightDown' );
	$( '#searchBtnRight' ).removeClass( 'searchButtonRightUp' );
}

function mouseOutSearchButton()
{
	$( '#searchBtnLeft' ).addClass( 'searchButtonLeftUp' );
	$( '#searchBtnLeft' ).removeClass( 'searchButtonLeftDown' );

	$( '#searchBtnMiddle' ).addClass( 'searchButtonMiddleUp' );
	$( '#searchBtnMiddle' ).removeClass( 'searchButtonMiddleDown' );

	$( '#searchBtnRight' ).addClass( 'searchButtonRightUp' );
	$( '#searchBtnRight' ).removeClass( 'searchButtonRightDown' );
}