var OTWiki = function() {
	var $     = OTProto.$;
	var $A    = OTProto.$A;
	var $H    = OTProto.$H;
	var Ajax  = OTProto.Ajax;
	var Hash  = OTProto.Hash;


	if ( navigator.userAgent.indexOf( "WebKit" ) > -1 )
	{
			document.createRange().__proto__.surroundContents = function( parent )
			{
				var frag = this.extractContents();
				if ( frag != null )
				{
					parent.appendChild( frag );
				}
				this.insertNode( parent );
				this.selectNode( parent );
			}
	}

	function ShowDiv( divid )
	{
		if ( document.layers )
		{
			document.layers[divid].visibility = "show";
		}
		else
		{
			document.getElementById( divid ).style.visibility = "visible";
		}
	}

	function HideDiv( divid )
	{
		if ( document.layers )
		{
			document.layers[divid].visibility = "hide";
		}
		else
		{
			document.getElementById( divid ).style.visibility = "hidden";
		}
	}

	var QueryNodesByNames = function(/*handler, nameQueryString[, subType][, parentID]*/)
	{
		//mandatory arguments:
		//	nameQueryString: the name query string like name=first&name=second&name=third
		//optional arguments:
		//	subType: the LL subtype
		//  parentID: DataID of the parent
		var args = $A( arguments );
		var pars = new Hash();
		pars.func = 'WikiAjax.QueryNodesByNames';
		if( args[2] != null ) pars.subType = args[2];
		if( args[3] != null ) pars.parentID = args[3];
		pars.notToCache = Math.random(); 
		var qString = $H( pars ).toQueryString() + '&' + args[1];
		new Ajax.Request( OTAjax.getScriptURL(), {method: 'post', postBody: qString, onComplete: args[0]} );
	}

	var AutoSave = function(/* handler, wikiId, pageId, source */)
	{
			// arguments:
			//	handler: the function being called after receiving the ajax result
			//	wikiId: defining the Wiki object
			//	pageId: defining the page object
			//      source: the html source from the page
			//Description:
			//    Creates a temporary file on the server file system containing "source"
		var args = $A( arguments );
		var qString = $H( { func: 'WikiAjax.AutoSave', wikiId: args[1], pageId: args[2], source: args[3] } ).toQueryString()
		new Ajax.Request( OTAjax.getScriptURL(), {method: 'post', postBody: qString, onComplete: args[0]} );
	}

	var GetAutoSave = function(/* handler, wikiId, pageId */)
	{
			// arguments:
			//	handler: the function being called after receiving the ajax result
			//	wikiId: defining the Wiki object
			//	pageId: defining the page object
			//Description:
			//    Checks if an Auto Save file exists
		var args = $A( arguments );
		var pars = new Hash();
		pars.func = 'WikiAjax.AutoSave';
		pars.wikiId = args[1];
		pars.pageId = args[2];
		pars.existsAlready = true;
		var qString = pars.toQueryString();
		new Ajax.Request( OTAjax.getScriptURL(), {method: 'post', postBody: qString, onComplete: args[0]} );
	}

	var ProcessWikiContentForView = function( processedBodyId, coarseBodyId, divToShowId, containerId, containerName, script_name, supportPrefix, imgMod, hostName )
	{
		/*
			Arguments:
				processedBodyId	: the DIV where processed body should be placed
				coarseBodyId	: The initial DIV with WIKI body.
				divToShowId		: DIV ID which will be shown.
				containerId		: WIKI Container ID
				containerName	: WIKI Container name
				script_name		: Content Server Virtul Path
				supportPrefix	: Content Server Support prefix
				hostName		: Content Server Host from where its been called.

			Description:
			    View the WIKI page and process its content.
		*/
		
		
		var resultArray = new Array();
		var elemArray = new Array();
		var c = document.getElementById( coarseBodyId );
		var elems = c.getElementsByTagName( "a" );
		for ( var i = 0; i < elems.length; i++ )
		{
			// Check if it's a wiki link
			var wikiLinkPattern = /^.*\/wiki\/(.+)$/;
			var wikiLinkResult = wikiLinkPattern.exec( elems[i].href );
			var href = elems[i].href;
			var hrefValue = "";
			
			/* 
				Validate the Host URL with the WIKI link URL reference inserted in the WIKI body. 
			*/
			var wikiLinkHostMatchesWIKIPageHost = false;

			if ( elems[i].attributes['href'] != null )
			{
				hrefValue = elems[i].attributes['href'].nodeValue;
				/*
					Check if current URL is same(exactly) as WIKI Link URL.
				*/
				if ( hrefValue.indexOf( location.href ) >=0 )
				{
					hrefValue = hrefValue.substring( location.href.length );
				}	
				/*	
					Is it a local URL reference? If not then find a host of WIKI link, as well as find CS host. 
				*/
				if ( hrefValue.substring(1,0) == "/" )
				{
					/* Its a Local URL */
					wikiLinkHostMatchesWIKIPageHost = true;	
				}
				else
				{	
					var hostStart = hrefValue.indexOf( "://" );
					hostStart = hostStart + 3;
					var hostEnd  = hrefValue.indexOf( "/", hostStart );
					var URLhostName = hrefValue.substring( hostStart, hostEnd );
					if( URLhostName.toUpperCase() == hostName.toUpperCase() )
					{
						wikiLinkHostMatchesWIKIPageHost = true;	
					}
				}
			}
			/*
				There is CS host and WIKI host mismatch?
			*/
		 	if ( !wikiLinkHostMatchesWIKIPageHost )
			{
				/* External WIKI Link? */
				if ( ( wikiLinkResult != null ) || ( hrefValue.substring( 6, 0 ) == "/wiki/" ) ) {
							var wikiLinkResultstart = wikiLinkResult[1];
							var pathElements = wikiLinkResult[1].split( "/" );
							elemArray.push( new Array( pathElements[1], elems[i] ) );
							/* 	Go down and add external URL gif */
				 }
					/*
						There is host mismatch ( CS URL host with WIKI links URL host ), so clearly its an external URL...
					*/
						if ( elems[i].href.length > 0 )
						{
							// It's an external link so add external image 
							if ( document.implementation.hasFeature( "Range", "2.0") )
							{
								var linkRange = document.createRange();
								var spanNode = document.createElement( "span" );
								linkRange.selectNode( elems[i] );
								linkRange.surroundContents( spanNode );
								// set up the text node
								var nbspObj = document.createTextNode( "\u00a0" );
								spanNode.appendChild( nbspObj );
								var imageObj = document.createElement( "img" );
								imageObj.setAttribute( "src", supportPrefix + "extlink.gif" );
								imageObj.setAttribute( "width", "10" );
								imageObj.setAttribute( "height", "10" );
								imageObj.setAttribute( "border", "0" );
								spanNode.appendChild( imageObj );
							}
							else
							{
								elems[i].outerHTML = elems[i].outerHTML + '&nbsp;<img src="' + supportPrefix + 'extlink.gif" width=10 height=10 border=0>';
							}
						}
				
			} //END- host Mismatch issue.
			// Is it a link to a local anchor?
			else if ( hrefValue.substring(1,0) != "#" )
			{
				// Is it an internal wiki link ?
				if ( ( ( checkOtMapping(elems[i].href, script_name) ) && ( wikiLinkResult != null ) ) || ( ( hrefValue.substring( 6, 0 ) == "/wiki/" ) && ( wikiLinkResult != null ) ) )
				{
					var wikiLinkResultstart = wikiLinkResult[1];
					var pathElements = wikiLinkResult[1].split( "/" );
					if ( pathElements.length < 2 )
					{
						var temp = makeWikiLink(elems[i], script_name, containerId, elems[i].href, elems[i].innerHTML);
						while( temp.indexOf("&amp;") != -1 )
						{
							temp = temp.replace(/\&amp;/g,'&');
						}
						temp = temp.replace(/&/g, '&amp;');
						var temp1=elems[i].outerHTML;
						while( temp1.indexOf("&amp;") != -1 )
						{
							temp1 = temp1.replace(/\&amp;/g,'&');
						}
						temp1 = temp1.replace(/&/g, '&amp;');
						elems[i].outerHTML = temp1;
						
						elemArray.push(new Array(temp, elems[i]));
					}
					else
					{
						if( pathElements[0] == containerId || pathElements[0] == containerName )
						{
							makeWikiLink( elems[i], script_name, containerId, pathElements[1], elems[i].innerHTML );
							var temp = pathElements[1];
							while( temp.indexOf("&amp;") != -1 )
							{
								temp = temp.replace(/\&amp;/g,'&');
							}
							temp = temp.replace(/&/g, '&amp;');
							pathElements[1] = temp;
							elemArray.push( new Array( pathElements[1], elems[i] ) );
						}
						else
						{
							makeWikiLink( elems[i], script_name, containerId, pathElements[1], elems[i].innerHTML );
							var temp = pathElements[1];
							while( temp.indexOf("&amp;") != -1 )
							{
								temp = temp.replace(/\&amp;/g,'&');
							}
							temp = temp.replace(/&/g, '&amp;');
							pathElements[1] = temp;
							elemArray.push( new Array( pathElements[1], elems[i] ) );
						}
					}
				}
				else
				{
					//check if it is an internal open url
					var openLinkPattern = /^.*\/open\/(.+)$/;
					var openLinkResult = openLinkPattern.exec( elems[i].href );
					
					if ( ( ( checkOtMapping(elems[i].href, script_name) ) && ( openLinkResult != null ) ) || ( ( hrefValue.substring( 6, 0 ) == "/open/" ) && ( openLinkResult != null ) ) )
					{
						var pathElements = openLinkResult[1].split( "/" );
						makeOpenLink( elems[i], script_name, pathElements[0], elems[i].innerHTML );
						var temp = elems[i].innerHTML;
						while( temp.indexOf("&amp;") != -1 )
						{
							temp = temp.replace(/\&amp;/g,'&');
						}
						temp = temp.replace(/&/g, '&amp;');
						elems[i].innerHTML = temp;
					}
				}
			}	
		}

		var nameQueryString = '';
		for ( var i = 0; i < elemArray.length; i++ )
		{
			var pair = elemArray[i];
			if( i == 0 )
			{
				nameQueryString += 'name=' + pair[0];
			}
			else
			{
				nameQueryString += '&name=' + pair[0];				
			}
		}

		var handler = function( originalRequest )
		{
			var ajaxresponse = OTAjax.getAjaxResponse( originalRequest );
			if( ajaxresponse != null )
			{
				var nodeElements = ajaxresponse.getElementsByTagName( 'node' );
				var m = 0;
				for ( var i=0; i < nodeElements.length; i++ )
				{
					var nodeElement = nodeElements[i];
					var name = nodeElement.getElementsByTagName( "name" )[0].firstChild.nodeValue;
					var dataid = nodeElement.getElementsByTagName("dataid")[0].firstChild.nodeValue;
					resultArray.push( new Array( name, dataid ) );
					m++;
				}
			}
			
			//now finally enrich the internal links with the information if the according object exists or not
			for ( var i = 0; i < elemArray.length; i++ )
			{
				var elemPair = elemArray[i];
				var dataId = null;
				for ( var j = 0; j < resultArray.length; j++ )
				{
					var resultPair = resultArray[j];
					var elemPage = unescape( elemPair[0] );
					if ( elemPage.indexOf('#') > 0 )
					{
						// Strip off any anchor
						elemPage = elemPage.substring( elemPage.indexOf( '#' ), 0 );
					}
					if( resultPair[0] == elemPage )
					{
						dataId = resultPair[1];
					}
				}
				if( dataId == null )
				{
					//this name is not existing --> mark the element
					elemPair[1].style.color = "green";
				}
			}

			$( processedBodyId ).innerHTML = $( coarseBodyId ).innerHTML;
			ShowDiv( divToShowId );
			createTOC( imgMod );
		}
		
		if( elemArray.length > 0 )
		{
			//do the ajax call to retrieve link info
			var ajaxresponse = QueryNodesByNames( handler, nameQueryString, 5574, containerId );
		}
		else
		{
			$( processedBodyId ).innerHTML = $( coarseBodyId ).innerHTML;
			ShowDiv( divToShowId );
			createTOC( imgMod );
		}
	}

	
	
	var makeWikiLink = function( element, script_name, containerId, wikiPageName, data )
	{
		if ( element.childNodes.length > 0 )
		{
			element.childNodes[0].data = data;
		}
				
		//var name=element.getAttribute("name")
		var Link=[] ;
		Link = wikiPageName.split("/") ;
		if(Link.length>=8)
			{
			 name = Link[5]
			}
		//to work with the previous links.	
		else
			{
			 name =element.innerHTML
			}
		
		while( name.indexOf("&amp;") != -1 )
		{
			name = name.replace(/\&amp;/g,'&');
		}
		
		element.setAttribute( "href", ( script_name + '/wiki/' + containerId + '/' + name ) );
		
		return name;
	}

	var makeOpenLink = function( element, script_name, dataId, data )
	{
		element.childNodes[0].data = data;
		element.setAttribute( "href", ( script_name + '/open/' + dataId ) );
	}

	var ProcessWikiContentForComparison = function( processedBodyId, coarseBodyId, divToShowId, containerId, containerName, script_name, supportPrefix )
	{
		var resultArray = new Array();
		var wikiLinkPattern = /^.*\/wiki\/(.+)$/;
		var c = document.getElementById( coarseBodyId );
		var elems = c.getElementsByTagName( "a" );
		for ( var i = 0; i < elems.length; i++ )
		{
			var wikiLinkResult = wikiLinkPattern.exec( elems[i].href );
			if ( ( elems[i].href.indexOf( script_name ) > 0 ) &&( wikiLinkResult != null ) )
			{
				var pathElements = wikiLinkResult[1].split( "/" );
				if( pathElements.length < 2 )
				{
					makeWikiLink( elems[i], script_name, containerId, elems[i].innerHTML, elems[i].innerHTML );
				}
				else
				{
					if ( pathElements[0] == containerId || pathElements[0] == containerName )
					{
						makeWikiLink( elems[i], script_name, containerId, pathElements[1], elems[i].innerHTML );
					}
					else
					{
						makeWikiLink( elems[i], script_name, containerId, pathElements[1], elems[i].innerHTML );
					}
				}
			}
			else
			{
				if( elems[i].href.length == 0 )
				{
					//remove the link
					if( document.all )
					{
						//ie
						elems[i].outerHTML = elems[i].innerHTML;
					}
				}
				else
				{
					//check if it is an internal open url
					var openLinkPattern = /^.*\/open\/(.+)$/;
					var openLinkResult = openLinkPattern.exec( elems[i].href );
					if ( ( elems[i].href.indexOf( script_name ) > 0 ) && ( openLinkResult != null ) )
					{
						var pathElements = openLinkResult[1].split( "/" );
						makeOpenLink( elems[i], script_name, pathElements[0], elems[i].innerHTML );
					}
					else
					{
						if( document.implementation.hasFeature( "Range", "2.0" ) )
						{
							var linkRange = document.createRange();
							var spanNode = document.createElement( "span" );
							linkRange.selectNode( elems[i] );
							linkRange.surroundContents( spanNode );
							// set up the text node
							var nbspObj = document.createTextNode( "\u00a0" );
							spanNode.appendChild( nbspObj );
							var imageObj = document.createElement( "img" );
							imageObj.setAttribute( "src", supportPrefix + "extlink.gif" );  
							imageObj.setAttribute( "width", "10" );  
							imageObj.setAttribute( "height", "10" );  
							imageObj.setAttribute( "border", "0" );
							spanNode.appendChild( imageObj );
						}
						else
						{					
							elems[i].outerHTML = elems[i].outerHTML + '&nbsp;<img src="' + supportPrefix + 'extlink.gif" width=10 height=10 border=0>';
						}
					}
				}						
			}
		}

		document.getElementById( processedBodyId ).innerHTML = c.innerHTML;
		ShowDiv( divToShowId );
	}

	var ProcessWikiContentForEdit = function( processedBodyId, coarseBodyId, script_name )
	{
		var wikiLinkPattern = /^.*\/wiki\/(.+)$/;
		var c = document.getElementById( coarseBodyId );
		var elems = c.getElementsByTagName( "a" );
		var tmpHref;

		if ( script_name.split( '/' )[2] != undefined )
		{
			script_name = script_name.split( '/' )[2];
		}
		for ( var i = 0; i < elems.length; i++ )
		{
			var wikiLinkResult = wikiLinkPattern.exec( elems[i].href );
			if ( elems[i].attributes['href'] != null )
			{
				hrefValue = elems[i].attributes['href'].nodeValue;
				if ( hrefValue.indexOf( location.href ) >= 0)
				{
					hrefValue = hrefValue.substring( location.href.length );
				}
			}
		}
	}

	function checkOtMapping( hrefValue,script_name ) 
	{
		var map1, map2, map3, map4, llcgilink, mapping;
		if( hrefValue.indexOf( script_name ) > 0 )
		{
			return true;
		}
		
		if ( script_name.split( '/' )[2] != undefined )
		{
			llcgilink  = script_name.split( '/' )[2];
			mapping = script_name.split( '/' )[1];
			map1= "/" + mapping + "/" + "livelink.exe";
			map2= "/" + mapping + "/" + "llisapi.dll";
			map3= "/" + mapping + "/" + "cs.dll";
			map4= "/" + mapping + "/" + "cs.exe";
			if( hrefValue.indexOf( map1 ) > 0 )
				return true;
			if( hrefValue.indexOf( map2 ) > 0 )
				return true;
			if( hrefValue.indexOf( map3 ) > 0 )
				return true;
			if( hrefValue.indexOf( map4 ) > 0 )
				return true;
			
			return false	
		}
		else
		{
			return false;
		}
		
	}
	
	var ProcessWikiContentForSave = function( wikiLinksDivId, coarseBodyId, containerId, server_name, script_name )
	{
		var wlDiv = document.getElementById( wikiLinksDivId );
		wlDiv.innerHTML = "";
		var wikiLinkPattern = /^.*\/wiki\/(.+)$/;
		var c = document.getElementById( coarseBodyId );
		var elems = c.getElementsByTagName( "a" );
		for ( var i = 0; i < elems.length; i++ )
		{
			var wikiLinkResult = wikiLinkPattern.exec( elems[i].href );
			if ( ( checkOtMapping(elems[i].href, script_name) ) && ( wikiLinkResult != null ) )
			{
				var pathElements = wikiLinkResult[1].split( "/" );
				if( pathElements.length < 2 )
				{
					elems[i].setAttribute( "href", ( '/wiki/' + containerId + '/' + pathElements[0] ) );
					wlDiv.innerHTML = wlDiv.innerHTML + '<input type="hidden" name="wikiLink" value="' + pathElements[0] + '" />';
				}
				else
				{
					elems[i].setAttribute( "href", ( '/wiki/' + pathElements[0] + '/' + pathElements[1] ) );
					wlDiv.innerHTML = wlDiv.innerHTML + '<input type="hidden" name="wikiLink" value="' + pathElements[1] + '" />';
				}
			}
			else
			{
				var openLinkPattern = /^.*\/open\/(.+)$/;
				var openLinkResult = openLinkPattern.exec( elems[i].href );
				if ( ( checkOtMapping(elems[i].href, script_name) ) && ( openLinkResult != null ) )
				{
					var pathElements = openLinkResult[1].split( "/" );
					elems[i].setAttribute( "href", ( '/open/' + pathElements[0] ) );
					wlDiv.innerHTML = wlDiv.innerHTML + '<input type="hidden" name="llobjectlist" value="' + pathElements[0] + '" />';
				}
			}
		}
		try
		{
			var plain = "";
			if ( plain = c.innerText != undefined )
			{
				plain = c.innerText;
			}
			else
			{
				plain = c.textContent;
			}
			var summaryTxt = plain.trim().compress().substr( 0, 200 );
			var sumEl = document.getElementById( "summary" )
			if ( sumEl != undefined ) sumEl.value = summaryTxt;
		}
		catch( err )
		{
			alert("ERROR");
		}
	}

	String.prototype.trim = function()
	{
		return this.replace( /^\s+|\s+$/g, "" );
	}

	String.prototype.compress = function()
	{
		return this.replace( /\s\s+/g, " " );
	}

	function createTOC( imgMod )
	{
		if ( showTOC )
		{
			var processedBody = document.getElementById( 'processedBody' );
			var tocDiv = document.createElement( 'div' );
			tocDiv.id = 'toc';
			var tocTitle = tocDiv.appendChild( document.createElement( 'div' ) );
			var html = '';
			html = html + '<a id="expandContent" style="display:none;cursor:pointer;float:right;" onclick="showhideTOC()">';
			html = html + '<img width="9" height="9" border="0" title="Expand Content"';
			html = html + 'alt="" src="' + imgMod + 'box-expand.gif"/></a>';
			html = html + '<a id="collapseContent" style="display:block;cursor:pointer;float:right;" onclick="showhideTOC()">';
			html = html + '<img width="9" height="9" border="0" title="Collapse Content"';
			html = html + 'alt="" src="' + imgMod + 'box-collapse.gif"/></a>';
			html = html + '<div style="text-align:center;">Content</div>';
			tocTitle.innerHTML = html;
			tocTitle.className = 'tocTitle';
			var linkContainer = tocDiv.appendChild( document.createElement( 'div' ) );
			linkContainer.onclick = showhideTOC;
			var toBeTOCced = getElementsByTagNames( 'h1,h2,h3,h4', processedBody );
			if ( toBeTOCced.length < 2 )
			{
				return;
			}	
			for ( var i=0; i<toBeTOCced.length; i++ )
			{
				var titleLinkDiv = document.createElement( 'div' );
				var titleLink = titleLinkDiv.appendChild( document.createElement( 'a' ) );
				if ( titleLink.innerHTML = toBeTOCced[i].innerText != undefined )
				{
					titleLink.innerHTML = toBeTOCced[i].innerText;
				}
				else
				{
					titleLink.innerHTML = toBeTOCced[i].textContent;
				}
				titleLink.href = '#link' + i;
				titleLink.className = 'tocLink' + toBeTOCced[i].nodeName;
				linkContainer.appendChild( titleLinkDiv );
				var titleAnchor = document.createElement( 'a' );
				titleAnchor.id = 'link' + i;
				toBeTOCced[i].parentNode.insertBefore( titleAnchor, toBeTOCced[i] );
			}
			document.getElementById('wikiBody').insertBefore(tocDiv,processedBody);
		}
	}
			
	var TOCstate = 'block';
			
	function showhideTOC()
	{
		if ( TOCstate == 'none' )
		{
			TOCstate='block';
			document.getElementById( 'toc' ).lastChild.style.display = TOCstate;
			document.getElementById( 'collapseContent' ).style.display = '';
			document.getElementById( 'expandContent' ).style.display = 'none';
		}
		else
		{
			TOCstate='none';
			document.getElementById( 'toc' ).lastChild.style.display = TOCstate;
			document.getElementById( 'collapseContent' ).style.display = TOCstate;
			document.getElementById( 'expandContent' ).style.display = '';
		}
	}
		
	function getElementsByTagNames( list, obj )
	{
		if ( !obj ) var obj = document;
		var tagNames = list.split( ',' );
		var resultArray = new Array();
		for ( var i=0; i<tagNames.length; i++ )
		{
			var tags = obj.getElementsByTagName( tagNames[i] );
			for ( var j=0; j<tags.length; j++ )
			{
				resultArray.push( tags[j] );
			}
		}
		var testNode = resultArray[0];
		if( resultArray.length > 0 )
		{
			if ( testNode.sourceIndex )
			{
				resultArray.sort( function ( a, b ) {
						return a.sourceIndex - b.sourceIndex;
				});
			}
			else if ( testNode.compareDocumentPosition )
			{
				resultArray.sort( function ( a, b ) {
						return 3 - ( a.compareDocumentPosition( b ) & 6 );
				});
			}
		}
		return resultArray;
	}

	window.getElementsByTagNames           = getElementsByTagNames;
	window.showhideTOC                     = showhideTOC;
	window.TOCstate                        = TOCstate;
	window.createTOC                       = createTOC;
	window.ProcessWikiContentForSave       = ProcessWikiContentForSave;
	window.ProcessWikiContentForEdit       = ProcessWikiContentForEdit;
	window.ProcessWikiContentForComparison = ProcessWikiContentForComparison;
	window.makeOpenLink                    = makeOpenLink;
	window.makeWikiLink                    = makeWikiLink;
	window.ProcessWikiContentForView       = ProcessWikiContentForView;
	window.GetAutoSave                     = GetAutoSave;
	window.AutoSave                        = AutoSave;
	window.QueryNodesByNames               = QueryNodesByNames;
	window.HideDiv                         = HideDiv;
	window.ShowDiv                         = ShowDiv;
	window.checkOtMapping                  = checkOtMapping;

	return {
		"getElementsByTagNames"           : getElementsByTagNames,
		"showhideTOC"                     : showhideTOC,
		"TOCstate"                        : TOCstate,
		"createTOC"                       : createTOC,
		"ProcessWikiContentForSave"       : ProcessWikiContentForSave,
		"ProcessWikiContentForEdit"       : ProcessWikiContentForEdit,
		"ProcessWikiContentForComparison" : ProcessWikiContentForComparison,
		"makeOpenLink"                    : makeOpenLink,
		"makeWikiLink"                    : makeWikiLink,
		"ProcessWikiContentForView"       : ProcessWikiContentForView,
		"GetAutoSave"                     : GetAutoSave,
		"AutoSave"                        : AutoSave,
		"QueryNodesByNames"               : QueryNodesByNames,
		"HideDiv"                         : HideDiv,
		"ShowDiv"                         : ShowDiv,
		"checkOtMapping"                  : checkOtMapping
	};
}();
