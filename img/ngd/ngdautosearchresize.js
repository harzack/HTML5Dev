//in case it's not defined

var ngdOldLoadFunc = null;

if ( typeof onLoadFunc == "function" )
{
	ngdOldLoadFunc = onLoadFunc;
}


var ngdResizer = {
	"brobjx": null,
	"brobjy": null,
	"szok": true,
	"getElX": function(el) {
		var x=el.offsetLeft;
		el=el.offsetParent;
		while (el) {
			x+=el.offsetLeft+el.clientLeft;
			el=el.offsetParent;
		}
		return x;
	},
	"getElY": function(el) {
		var y=el.offsetTop;
		el=el.offsetParent;
		while (el) {
			y+=el.offsetTop+el.clientTop;
			el=el.offsetParent;
		}
		return y;
	},	
	"scan" : function() {
		var el=null;
		var t;

		var x=document.getElementsByTagName("IMG");
		var bHasBottomRightImg = false;

		for (var i=x.length-1;i>=0;i--) {
			t=x[i];

			if (t.tagName=="IMG") {
				
				if (this.brobjx == null)
				{
					this.brobjx=t;
				}
				else
				{
					if (this.getElX(t) > this.getElX( this.brobjx ) )
					{
						this.brobjx=t;
					}
				}

				if (this.brobjy == null)
				{
					this.brobjy=t;
				}
				else
				{
					if (this.getElY(t) > this.getElY( this.brobjy ) )
					{
						this.brobjy=t;
					}
				}

			}

		}

		return (this.szok && this.brobjx && this.brobjy);
	}
	
};

onLoadFunc = function(str) {
	var ngd=ngdResizer;

	if ( cs105u201409OrLater ) {

		//
		// Resize for 10.5 Sept Update
		//
		try {
			// use jquery for height calculation
			var w;
			var h;

			w = 970;
			h = Math.round($(document).height());

			if ( h > 400 )
			{
				h -= 130;
			}

			if ( h < 0 )
			{
				// put in a fixed height
				h = 500
			}

			window.external.ResizeWindow(w,h);

		} catch (err) {

		}

	} 
	else if (ngd.scan()) {

		// now resize the window
		try {

			var w;
			var h;	
							
			if ( isLL971 )
			{

				w = 900;
				if ( yoffset == 0 )
				{
					h = ngd.getElY(ngd.brobjy) + 25;
				}
				else
				{
					h = ngd.getElY(ngd.brobjy) + yoffset;
				}				
			}
			else
			{
				w = 970;
				if ( yoffset == 0 )
				{
					h = ngd.getElY(ngd.brobjy) + 120;
				}
				else
				{
					h = ngd.getElY(ngd.brobjy) + yoffset;
				}	
			}

			if ( h < 0 )
			{
				// put in a fixed height
				h = 500
			}							

			window.external.ResizeWindow(w,h);
												
		} catch (err) {
			
		}
	}


	// turn off Advanced Search GUI components
	try {

		if ( ! isCS10Update10OrLater )
		{
			// add search a hidden input
			var newdiv = document.createElement('div');
			newdiv.innerHTML = "<input type='hidden' name='caller' value='" + ngdCaller + "'>";
			document.getElementById('searchFrm').appendChild(newdiv);
		}
		

		if ( isLL971 )
		{
			// 'Result Display Style'
			$("tr.tblForeground").hide();

			// 'Search' and 'Reset' buttons
			$(".buttonBar").hide();

			// full text search entry trigger search request on event'Enter' key press need to be disable

		}
		else
		{
			// 'Result Display Style'
			$(".searchPromptResultStyleContainer").hide();

			// 'Search' and 'Reset' buttons
			$("#searchBtnLeft").hide();
			$("#searchBtnMiddle").hide();
			$("#searchBtnRight").hide();
			$(".searchResetLink").hide();

			// 'Save Options'
			$(".sidebar.searchPromptSaveOptions").hide();


			// full text search entry trigger search request on event'Enter' key press need to be disable
			// this will prevent search request from executing
			performingSearch = true;
		}

		if ( bRemoveSlicesComponent )
		{
			// remove 'Slices'
			jsupdategui( document.searchFrm, 'searchPrompt', 'Collections', 0 );
		}
	
	} catch (err) {

	}

	if ( isLL971 )
	{
		//
		// Modify "href" attribute of the search template anchor element
		// to include context
		//
		var ele = $("a[href*='searchtemplate']")
		var searchtemplate = ele.attr('href');
					
		if ( searchtemplate != null && searchtemplate.length > 0 )
		{
			searchtemplate += "&caller=" + ngdCaller;
			ele.attr("href",searchtemplate);
						
		}

		//
		// Modify "href" attribute of the search prompt anchor element
		// to include ngdsearch context
		//
		ele = $("a[href*='searchprompt']")
		var searchprompt = ele.attr('href');
					
		if ( searchprompt != null && searchprompt.length > 0 )
		{
			searchprompt += "&caller=" + ngdCaller;
			ele.attr("href",searchprompt);
						
		}

		// Redefine fullTextEnter to disable doSearchRH() on 'Enter' keypress
		// the function below is copy from 'support/websbroker/search.js'

		fullTextEnter = function( theForm, e )
		{
			// IE passes the char in event.keyCode, Mozilla in event.which
			if ( !e )
			{
				e = window.event;
			}

			var c = ( e.charCode ) ? e.charCode : ( ( e.which ) ? e.which : e.keyCode );

			if ( c == 13 || c == 3 )
			{
				//disableButtons( theForm );
				//doSearchRH( theForm );
				return false;
			}
		}

	} 
	else if ( isCS10Update10OrLater )
	{

		//
		// Redefine this function to include 'context'
		// also change how EC submit the form
		// in EC context using jquery to submit the form is not working
		//
		GetTemplateNow = function( templateID ) {
		
			var windowDoc = window.document;
			var form;
			var input;
							
			windowDoc.open();
			windowDoc.write( '<FORM NAME="TemplateForm" METHOD="post" ACTION="' + urlPrefix + '"' );
			windowDoc.write( '</FORM>' );
			windowDoc.close();

			form = windowDoc.TemplateForm;

			// add func
			input = windowDoc.createElement( 'INPUT' );
			input.setAttribute( "type", "HIDDEN" );

			input.setAttribute( "name", "func" );
			input.setAttribute( "value", "ll" );
					
			form.appendChild( input );

			// add objtype
			input = windowDoc.createElement( 'INPUT' );
			input.setAttribute( "type", "HIDDEN" );

			input.setAttribute( "name", "objtype" );
			input.setAttribute( "value", "258" );
					
			form.appendChild( input );
				
			// add objaction
			input = windowDoc.createElement( 'INPUT' );
			input.setAttribute( "type", "HIDDEN" );

			input.setAttribute( "name", "objaction" );
			input.setAttribute( "value", "GetTemplateByID" );

			form.appendChild( input );
			
			// add caller
			input = windowDoc.createElement( 'INPUT' );
			input.setAttribute( "type", "HIDDEN" );

			input.setAttribute( "name", "caller" );
			input.setAttribute( "value", ngdCaller );
								
			form.appendChild( input );
							
			// template ID
			input = windowDoc.createElement( 'INPUT' );
			input.setAttribute( "type", "HIDDEN" );

			input.setAttribute( "name", "templateID" );
			input.setAttribute( "value", templateID );
								
			form.appendChild( input );
																																		
			form.submit();
		}
			
	}
	else
	{

		// Redefine this function to include 'context'

		GetTemplateNow = function( templateID ) {
			var templateForm = '<form method="post">';
			templateForm += '<input type="hidden" name="templateID" value="' + templateID + '"/>';
			templateForm += '<input type="hidden" name="func" value="ll" />';
			templateForm += '<input type="hidden" name="objType" value="258" />'
			templateForm += '<input type="hidden" name="caller" value="' + ngdCaller + '" />'
			templateForm += '<input type="hidden" name="objAction" value="GetTemplateByID" />'
			templateForm += '</form>';
			$( templateForm ).appendTo($('body')).submit();
		}
	}

	if ( ngdOldLoadFunc != null && typeof ngdOldLoadFunc == "function" )
	{	
		ngdOldLoadFunc(str);
	}
}
