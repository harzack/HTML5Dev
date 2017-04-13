/*
* anonymous function
* This function is used to initialize the environment so that the Mulitlingual Editor can function as expected
*
* @return	nothing
*/ 
$(document).ready(function() {

	var myForm = $(".multilingual").closest("form");

	// 	All items labeled as being multilingual are hooked up for use with the editor
	$('.multilingual').each( hookUpMultilingualEditor );
	
	//	Call GWT's reset on reset events
	myForm.bind( 'reset', function(){ resetMetadataEditor(); } );
	
	//	Let us do some work before submit
	myForm.bind( 'submit', function(){ multilingualPreSubmit(); } );

 });

/*
* multilingualPreSubmit
* This function is used to do any work that needs to be done prior to submitting the form
*
* @return	nothing
*/ 
function multilingualPreSubmit(){
	
	// make our readonly fields disabled, as we don't want them
	// in the request.
	
	$('.multilingual[readonly]').attr('disabled','true');
	
	// Calls syncFields(int) from Metadata GWT module.
	// 0: Init Sync from Main form
	// 1: OK Sync to Main form
	// 2: Cancel
	syncMetadataFields(0);

}

/*
* metadataOverlay
* This function is used to display the Multilingual Editor
*
* @param	trigger		type:String	the id of the form element that triggered the edit
* @return	nothing
*/
function metadataOverlay(trigger)
{
	var	myFormElement;
	var	myLocaleTag;

	myFormElement = $( "[name=" + trigger + "]" );
	myLocaleTag = $( "#" + trigger + "_localeTag" );
	
	
	// Initialize View
	// jsInitEditor is a GWT-dynamically created function
	// that calls the class' initEditor function
	jsInitEditor(trigger);
	
	//Un-hover any buttons
	
	$("img[src='" + supportPath + "metadata/multilingual18_mo.gif']").each(function(i){
	this.src = supportPath + 'metadata/multilingual18.gif';
	});	
	
	
}

/*
* multilingualWidgetOKClick
* This function is used to sync the form with the data from the Multilingual Editor
*
* @param	trigger		type:String	the id of the form element that triggered the edit
* @return	nothing
*/
function multilingualWidgetOKClick( data )
{
	var	item;
	var	readOnlyUser;
	var	myFormElement;
	

	for (var i = 0; i < data.length; i++)
	{
		item = data[i];
		myFormElement = $( "[name=" + item.fieldName + "]" );
		myLocaleTag = $( "#" + item.fieldName + "_localeTag" );
		myGlobalLink = $( "#" + item.fieldName + "GlobalLink" );
		 
		myFormElement.attr("title", otClickToEditMultilingualString );
		
		if ( item.readOnly )
		{
			// "Disable" the input field
			myFormElement.attr("readOnly", "readOnly");
			myFormElement.addClass("multilingual_readonly");
			myFormElement.attr("title", otClickToViewMultilingualString );
			myGlobalLink.attr("title", otClickToViewMultilingualString );
		}
		
		if ( !item.isDefault  )
		{
			// It's not the users default:
			// "Disable" the input field
			myFormElement.attr("readOnly", "readOnly");
			myFormElement.addClass("multilingual_readonly");
						
			// Show the language code for the language being displayed
			myLocaleTag.text( item.activeLangCode );			
		}
		
		if ( item.isDefault && !item.readOnly )
		{
			// It's the users default:
			// "Enable" the input field
			myFormElement.removeAttr("readOnly");
			myFormElement.removeClass("multilingual_readonly");
			myFormElement.attr("title", "" );
			
			// Clear the language code being displayed
			myLocaleTag.text("");
		}
		
		// Display the value
		myFormElement.val( item.value );
		
		// Set display (title) on locale tag
		myLocaleTag.attr( "title", item.activeLangLocal) ;
		
		//trigger any other onchange events
		myFormElement.trigger('change');
		
		// get a list of language codes enabled for use on the main HTML page
		langCodes = getMetadataLanguageCodes();

	}
}

var multilingualWidgetPreOpenCallbacks = new Array();
var multilingualWidgetPostCloseCallbacks = new Array();

/*
* addMultilingualWidgetPreOpenCallback
* This function is used to register javscript function to execute when a request to open the Multilingual Editor has occured. 
*
* @param	func		type:Function	function to call 
* @return	nothing
*/
function addMultilingualWidgetPreOpenCallback(func)
{
	multilingualWidgetPreOpenCallbacks[multilingualWidgetPreOpenCallbacks.length] = func;
}

/*
* addMultilingualWidgetPreOpenCallback
* This function is used to register javscript function to execute after a request to close the Multilingual Editor has occured. 
*
* @param	func		type:Function	function to call 
* @return	nothing
*/
function addMultilingualWidgetPostCloseCallback(func)
{
	multilingualWidgetPostCloseCallbacks[multilingualWidgetPostCloseCallbacks.length] = func;
}

var showingSelects;
var showingApplets;

/*
* multilingualWidgetPreOpen
* This function is used to do any cleanup and execute callbacks whenever the Multilingual Editor is about to open
*
* @return	nothing
*/
var multilingualWidgetPreOpen = function(){
	showingApplets = $("applet:visible");
	showingApplets.css('visibility','hidden');
	if (isInternetExplorer6())
	{
		showingSelects = $("select:visible");
		showingSelects.css('visibility','hidden');
	}
	for (i = 0; i < multilingualWidgetPreOpenCallbacks.length; i++)
	{
		var func = multilingualWidgetPreOpenCallbacks[i];
		func();
	}
};

/*
* multilingualWidgetPostClose
* This function is used to do any cleanup and execute callbacks whenever the Multilingual Editor has closed
*
* @param	data		type:object	contains data from the Multilingual Editor about its current state
* @return	nothing
*/
var multilingualWidgetPostClose = function(data){
	showingApplets.css('visibility','visible');
	if (isInternetExplorer6())
		showingSelects.css('visibility','visible');
	for (i = 0; i < multilingualWidgetPostCloseCallbacks.length; i++)
	{
		var func = multilingualWidgetPostCloseCallbacks[i];
		func(data);
	}
};

/*
* hookUpMultilingualEditor
* This function is used to prepare a regular form element for use with the Multilingual Editor
*
* @param	index		type:Integer	
* @param	element		type:HTMLObject	the element to be prepared
* @return	nothing
*/
var hookUpMultilingualEditor = function (index, element){
	var formItem;

	var widgetWrapper;
	var link;
	var formItemName; 
	var imgDir = supportPath + "metadata/";
	
	formItem = $(element);
	formItemName =  formItem.attr('name');
	
	// create the wrapper, link, globe image, and container used to display the locale
	widgetWrapper = $('<span class="metadata-widget" />');
	
	link = $('<a />').attr("title", otClickToEditMultilingualString );
	// allow the link to be tabbed to via the keyboard
	link.attr('tabindex', 0);
	
	link.attr("id", formItemName + "GlobalLink" );
	
	// using href over onclick to ensure it can be launched via keyboard
	link.attr( "href", "javascript:metadataOverlay('" + formItemName + "')" );
	
	globalImage = $('<img border="0" />');
	globalImage.attr("src", imgDir + 'multilingual18.gif');
	globalImage.attr("id", formItemName + "Global" );
	
	// allow the image to change on hover
	globalImage.bind( "mouseout", function(){ this.src = imgDir  + "/multilingual18.gif"  });
	globalImage.bind( "mouseover", function(){ this.src = imgDir  + "/multilingual18_mo.gif" });
	
	localeTagWrapper = $('<span />').attr("id", formItem.attr("name") + "_localeTag"); 
	
	// stitch it together
	link.append( globalImage );
	widgetWrapper.append( link );
	widgetWrapper.append( localeTagWrapper );
	
	// add it to the page
	formItem.after( widgetWrapper );

	// allow clicking on the form item to open the editor if it is readonly mode	
	formItem.bind( 'click', function()
	{
		if ( this.readOnly == true )
		{
			metadataOverlay(formItemName);
		}
	});
};