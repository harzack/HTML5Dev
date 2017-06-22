// Originally global.js:
var isMac = navigator.appVersion.indexOf( "Mac" ) != -1;
var HP = navigator.userAgent.indexOf( "HP" ) != -1;
var Sun = navigator.userAgent.indexOf( "Sun" ) != -1;

var IE = document.all;
var IE4 = navigator.appVersion.indexOf( "MSIE 4." ) != -1;
var IE5 = navigator.appVersion.indexOf( "MSIE 5." ) != -1;
var IE50 = navigator.appVersion.indexOf( "MSIE 5.0" ) != -1;
var IE6 = ((document.all)&&(navigator.appVersion.indexOf("MSIE 6.")!=-1)) ? true : false;
var IE7 = ((document.all)&&(navigator.appVersion.indexOf("MSIE 7.")!=-1)) ? true : false;
var IE10 = ((document.all)&&(navigator.appVersion.indexOf("MSIE 10.")!=-1)) ? true : false;

var NS4 = navigator.appName.indexOf( "Netscape" ) != -1;	//document.layers
var NS = NS4;
var	NS6 = navigator.userAgent.indexOf( "Netscape6" ) != -1;
var	NS7 = navigator.userAgent.indexOf( "Netscape/7" ) != -1;

var	Safari = navigator.userAgent.indexOf( "Safari" ) != -1;

var FF = (Array.every || window.Iterator) ? true : false; // FF 1.5+

var useLayers = ( NS4 && ( HP || Sun ) && !NS7 );
var lineBreaksAreNodes = !IE || IE10;
var	forceWindowElementUnderMenu = IE;

var pageLoaded = false;
var __targetSelf = true;
var	__LeavePage = '';
var contenttable = false;

var baseCSUrl;

var supportPath;

function setajaxBaseUrl( baseUrlStr )
{
	baseCSUrl  = baseUrlStr;
}

function onLoadFunc( supportImgPath )
{
	supportPath = supportImgPath;
	pageLoaded = true;
}

function getLLTop( oTop )
{
	try {
		if ( oTop != top && !eval( 'oTop.parent.NotLivelinkFrame' ) )
		{
			oTop = getLLTop( oTop.parent );
		}
	}
	catch ( e )
	{
		// may fail to read NotLivelinkFrame
	}

	return oTop;
}

function openURL( theURL, theTarget )
{
    var     theParam = "width=600,height=400,resizable,toolbar";
	var		targetSize;
	var     targetInURL = 'OpenInNewWin=';
	var     targetParam = 'NewWinParam=';

    var     pos1 = theURL.indexOf( targetInURL );
    if ( pos1 > -1 )
    {
        pos1 = pos1 + targetInURL.length;
        var pos2 = theURL.indexOf( '&', pos1 );
        if ( pos2 == -1 )
        {
            // end of string reached.
            theTarget = theURL.substring( pos1 );
        }
        else
        {
            theTarget = theURL.substring( pos1, pos2 );
        }

        var     pos3 = theURL.indexOf( targetParam );
        if ( pos3 > -1 )
        {
            pos3 = pos3 + targetParam.length;
            var pos4 = theURL.indexOf( '&', pos3 );
            if ( pos4 == -1 )
            {
                // end of string reached.
                theParam = theURL.substring( pos3 );
            }
            else
            {
                theParam = theURL.substring( pos3, pos4 );
            }
        }
    }

	if ( NS || theTarget == "" )
	{
		if ( typeof(theTarget) == "string" )
		{
			targetSize = theTarget.length;
		}
		else
		{
			targetSize = theTarget.length();
		}

		if ( targetSize !== 0 )
		{
			var targetWindow = window.open( theURL, theTarget, theParam );

			if ( targetWindow.focus )
			{
				targetWindow.focus();
			}

		}
		else if ( theURL.indexOf( 'func=ContentRH' ) > 0 )
		{
			getLLTop(self).location.href = theURL;

			forceRedirect();
		}
		else if ( __targetSelf )
	    {
			self.location.href = theURL;

			forceRedirect();
	    }
	    else
	    {
			parent.location.href = theURL;

			forceRedirect();
		}
	}
	else
	{
		var targetWindow2 = window.open( theURL, theTarget, theParam );

		if ( targetWindow2.focus )
		{
			targetWindow2.focus();
		}
	}
}

function getDate()
{
	var pos, pos1, pos2, pos3;
	var todayDay, todayMonth, todayDayN, todayYear;

	var nnow = new Date();
	var strDate = nnow.toString();

	pos1 = strDate.indexOf( ' ' );
	todayDay = strDate.substring( 0, pos1 );

	pos2 = strDate.indexOf( ' ', pos1 + 1 );
	todayMonth = strDate.substring( pos1 + 1, pos2 );

	pos3 = strDate.indexOf( ' ', pos2 + 1 );
	todayDayN = strDate.substring( pos2 + 1, pos3 );

	if ( NS7 )
	{
		var pos4;
		pos4 = strDate.indexOf( ' ', pos3 + 1 );
		todayYear = strDate.substring( pos3 + 1, pos4 );
	}
	else
	{
		pos = strDate.lastIndexOf( ' ' );
		todayYear = strDate.substring( pos + 1 );
	}

	return( todayDay + ', ' + todayDayN + ' ' + todayMonth + ' ' + todayYear );

}

// most modern browsers have a string trim function defined on the string object.
// however, the older versions that we support do not, so add in the trim functions if they do not exist.
// defined from http://stackoverflow.com/questions/498970/how-do-i-trim-a-string-in-javascript

if (!String.prototype.trim) {
   //code for trim
   String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
}
 
if (!String.prototype.ltrim) {
   String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
}
 
if (!String.prototype.rtrim) {
    String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};
}
 
if (!String.prototype.fulltrim) {
    String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};
}

function LTrim( str )
{
	var	retVal = str.ltrim();
	return retVal;
}

function RTrim( str )
{
	var	retVal = str.rtrim();

	return retVal;
}

function Trim( str )
{
	return str.trim();
}

function checkTabKey()
{
	if( window.onKeyPress == 9 )
	{
		return true;
	}
	else
	{
		return false;
	}
}

// Internet Explorer doesn't support functions and args in its timeouts so we replicate that functionality with
// the following few functions.

// Internal array used to track all running intervals
var intervals = [];

function newSetInterval( func, interval )
{
	// The variable named arguments contains any additional args passed to this method.
	var fCall = func;
	var nextIdx = intervals.length;  // Find next available identifier

	// If necessary, turn first argument into a function
	if ( typeof func != "function" )
	{
		fCall = new Function(func);
	}

	// Add our new interval
	intervals[nextIdx] = {};

	// Add interval time
	intervals[nextIdx].interval = interval;

	// Add the function
	intervals[nextIdx].code = fCall;

	// Add arguments
	intervals[nextIdx].arguments = [];

	for ( var i = 2; i < arguments.length; i++ )
	{
		intervals[nextIdx].arguments[intervals[nextIdx].arguments.length] = arguments[i];
	}

	// Start up timer. RunInterval explained next.
	// Store "real" identifier to the timer.
	intervals[nextIdx].timerID = setTimeout( "runInterval(" + nextIdx + ")", interval );

	// Return an identifier for the timer
	return nextIdx;
}

function newSetTimeout( func, interval )
{
	// The variable named arguments contains any additional args passed to this method.
	var fCall = func;
	var nextIdx = intervals.length;  // Find next available identifier

	// If necessary, turn first argument into a function
	if ( typeof func != "function" )
	{
		fCall= new Function(func);
	}

	// Add our new interval
	intervals[nextIdx] = {};

	// Add interval time
	intervals[nextIdx].interval = interval;

	// Add the function
	intervals[nextIdx].code = fCall;

	// Add arguments
	intervals[nextIdx].arguments = [];

	for ( var i = 2; i < arguments.length; i++ )
	{
	  intervals[nextIdx].arguments[intervals[nextIdx].arguments.length] = arguments[i];
	}

	 // Start up timer. RunInterval explained next.
	 // Store "real" identifier to the timer.
	 intervals[nextIdx].timerID = setTimeout("runTimeout(" + nextIdx + ")", interval );

	 // Return an identifier for the timer
	 return nextIdx;
}


function newClearInterval( idx )
{
	// If interval exists, clear it
	if ( intervals[idx] )
	{
		// Stop timer using the "real" identifier
		clearTimeout( intervals[idx].timerID );
		intervals[idx] = null;
	}
}


function runInterval( sIndex )
{
	var args;
	var callargs;

	if ( intervals[sIndex] )
	{
		args = intervals[sIndex].arguments;
		// Call function and pass in any extra argument
		callargs = "intervals[sIndex].code(";
		for( i = 0; i < args.length; ++i )
		{
		  callargs = callargs + "args["+i+"]";
		  if ( i + 1 < args.length )
		  {
			  callargs += ",";
		  }
		}
		callargs = callargs + ")";
		eval( callargs );
		// Start up timer for next iteration
		intervals[sIndex].timerID = setTimeout( "runInterval(" + sIndex + ")", intervals[sIndex].interval );
	}
}

function runTimeout( sIndex )
{
	var args;
	var callargs;

	if ( intervals[sIndex] )
	{
		args = intervals[sIndex].arguments;

		// Call function and pass in any extra argument
		callargs = "intervals[sIndex].code(";

		for( i = 0; i < args.length; ++i )
		{
		  callargs = callargs + "args["+i+"]";
		  if ( i + 1 < args.length )
		  {
			  callargs += ",";
		  }
		}

		callargs = callargs + ")";
		eval( callargs );
		intervals[sIndex] = null;
	}
}

// Safari sometimes doesn't respond immediately to document.location.href assignments.
// Making it load something else kick-starts the assignment.

function forceRedirect()
{
	if ( Safari )
	{
		var newImg = new Image();
		newImg.src = supportPath  + "spacer.gif";
	}
}

// Backwards compatibility
function safariKluge()
{
	forceRedirect();
}

//
// Dashboard - what used to be globalmenu.js
//
	var g_CheckDashboardFuncID = -1;
	var g_focusObject = null;
	var g_delayLoadTime = 500;

    var origWidth;
    var origHeight;
	
    function onLoadFunction()
    {
		pageLoaded = true;

		if ( !( isMac && NS4 ) )
		{
			if ( typeof( window.document.applets.Dashboard ) != "undefined" )
			{
				onResizeFunction();
			}
		}

		if ( g_focusObject != null )
		{
			// sanity check...
			if ( g_CheckDashboardFuncID != -1 )
			{
				clearInterval( g_CheckDashboardFuncID );
			}

			g_CheckDashboardFuncID = setInterval( "checkDashboardFunc()", g_delayLoadTime);
		}

        return false;
    }

	function checkDashboardFunc()
	{
		var appletsLoaded = true;
		for ( var i = 0; i < window.document.applets.length; i++ )
		{
			if ( typeof( window.document.applets[i] ) != "object" )
			{
				appletsLoaded = false;
			}
		}

		if ( appletsLoaded )
		{
			if ( g_focusObject != null )
			{
				if ( typeof( g_focusObject ) == "string" )
				{
					g_focusObject = eval( g_focusObject );
				}
					
				if ( typeof( g_focusObject ) == "object" )
				{
					g_focusObject.focus();
				}

				clearInterval( g_CheckDashboardFuncID );
			}
		}
	}
    
    function getAppletWidth()
    {
        var appSize;

		// The applet width is relative in the beginning because before the page is layed
		// out the size is 0.
		// The proper size will be set through the onResize function
		appSize = Math.floor( window.document.body.clientWidth * ( 70 / 100 ) );
		
        return appSize;
    }






////////////////////////////////////////////////////////////
//
// Originally this was core/dhtmlhistory.js
//
////////////////////////////////////////////////////////////


/**
   Copyright (c) 2005, Brad Neuberg, bkn3@columbia.edu
   http://codinginparadise.org

   Permission is hereby granted, free of charge, to any person obtaining
   a copy of this software and associated documentation files (the "Software"),
   to deal in the Software without restriction, including without limitation
   the rights to use, copy, modify, merge, publish, distribute, sublicense,
   and/or sell copies of the Software, and to permit persons to whom the
   Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be
   included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
   OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
   IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
   CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
   OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
   THE USE OR OTHER DEALINGS IN THE SOFTWARE.

   The JSON class near the end of this file is
   Copyright 2005, JSON.org

   updates:
   - added parameter to initialize to take siurce directory for the

*/

/** An object that provides DHTML history, history data, and bookmarking
    for AJAX applications. */
window.dhtmlHistory = {
   /** Initializes our DHTML history. You should
      call this after the page is finished loading. */
   /** public */ initialize: function( newSrcLocation ) {
      // only Internet Explorer needs to be explicitly initialized;
      // other browsers don't have its particular behaviors.
      // Basicly, IE doesn't autofill form data until the page
      // is finished loading, which means historyStorage won't
      // work until onload has been fired.
      if (this.isInternetExplorer() == false) {
         return;
      }

      // if this is the first time this page has loaded...
      if (historyStorage.hasKey("DhtmlHistory_pageLoaded") == false) {
         this.fireOnNewListener = false;
         this.firstLoad = true;
         historyStorage.put("DhtmlHistory_pageLoaded", true);
      }
      // else if this is a fake onload event
      else {
         this.fireOnNewListener = true;
         this.firstLoad = false;
      }

      if ( this.isInternetExplorer() )
      {
         if ( null != newSrcLocation )
         {
            this.blankhtmlDir = newSrcLocation;
            this.iframe.src = this.blankhtmlDir + "blank.html?";
         }
         else
         {
            throw "directory location for blank.html needed for IE";
         }
      }
   },

   /** Adds a history change listener. Note that
      only one listener is supported at this
      time. */
   /** public */ addListener: function(callback) {
      this.listener = callback;

   // if the page was just loaded and we
   // should not ignore it, fire an event
   // to our new listener now
   if (this.fireOnNewListener == true) {
      this.fireHistoryEvent(this.currentLocation);
      this.fireOnNewListener = false;
   }
},

   /** public */ add: function(newLocation, historyData) {
      // most browsers require that we wait a certain amount of time before changing the
      // location, such as 200 milliseconds; rather than forcing external callers to use
      // window.setTimeout to account for this to prevent bugs, we internally handle this
      // detail by using a 'currentWaitTime' variable and have requests wait in line
      var self = this;
      var addImpl = function() {
         // indicate that the current wait time is now less
         if (self.currentWaitTime > 0)
         {
            self.currentWaitTime = self.currentWaitTime - self.WAIT_TIME;
         }

         // remove any leading hash symbols on newLocation
         newLocation = self.removeHash(newLocation);

         // IE has a strange bug; if the newLocation
         // is the same as _any_ preexisting id in the
         // document, then the history action gets recorded
         // twice; throw a programmer exception if there is
         // an element with this ID
         var idCheck = document.getElementById(newLocation);
         if (idCheck != undefined || idCheck != null)
         {
            var message = "Exception: History locations can not have " +
               "the same value as _any_ id's " +
               "that might be in the document, " +
               "due to a bug in Internet " +
               "Explorer; please ask the " +
               "developer to choose a history " +
               "location that does not match " +
               "any HTML id's in this " +
               "document. The following ID " +
               "is already taken and can not " +
               "be a location: " +
               newLocation;

            throw message;
         }

         // store the history data into history storage
         historyStorage.put(newLocation, historyData);

         // indicate to the browser to ignore this upcomming
         // location change
         self.ignoreLocationChange = true;

         // indicate to IE that this is an atomic location change
         // block
         this.ieAtomicLocationChange = true;

         // save this as our current location
         self.currentLocation = newLocation;

         // change the browser location
         window.location.hash = newLocation;

         // change the hidden iframe's location if on IE
         if (self.isInternetExplorer()) {
             self.iframe.src = self.blankhtmlDir + "blank.html?" + encodeURIComponent( newLocation );
         }

         // end of atomic location change block
         // for IE
         this.ieAtomicLocationChange = false;
      };

      // now execute this add request after waiting a certain amount of time, so as to
      // queue up requests
      window.setTimeout(addImpl, this.currentWaitTime);

      // indicate that the next request will have to wait for awhile
      this.currentWaitTime = this.currentWaitTime + this.WAIT_TIME;
   },
   /** public */ isFirstLoad: function() {
      if (this.firstLoad == true) {
         return true;
      }
      else {
         return false;
      }
   },

   /** public */ setSrcDirectory: function( newSrcLocation ) {
      this.blankhtmlDir = newSrcLocation;
   },

   /** public */ isInternational: function() {
      return false;
   },

   /** public */ getVersion: function() {
      return "0.03";
   },

   /** Gets the current hash value that is in the browser's
       location bar, removing leading # symbols if they are present. */
   /** public */ getCurrentLocation: function() {
      var currentLocation = this.removeHash(window.location.hash);

      return currentLocation;
   },

   /** Our current hash location, without the "#" symbol. */
   /** private */ currentLocation: null,

   /** Our history change listener. */
   /** private */ listener: null,

   /** A hidden IFrame we use in Internet Explorer to detect history
       changes. */
   /** private */ iframe: null,

   /** need to provide the location directory for the blank html file. */
   /** private */ blankhtmlDir: "",

   /** Indicates to the browser whether to ignore location changes. */
   /** private */ ignoreLocationChange: null,

   /** The amount of time in milliseconds that we should wait between add requests.
       Firefox is okay with 200 ms, but Internet Explorer needs 400. */
   /** private */ WAIT_TIME: 200,

   /** The amount of time in milliseconds an add request has to wait in line before being
       run on a window.setTimeout. */
   /** private */ currentWaitTime: 0,

   /** A flag that indicates that we should fire a history change event
       when we are ready, i.e. after we are initialized and
       we have a history change listener. This is needed due to
       an edge case in browsers other than Internet Explorer; if
       you leave a page entirely then return, we must fire this
       as a history change event. Unfortunately, we have lost
       all references to listeners from earlier, because JavaScript
       clears out. */
   /** private */ fireOnNewListener: null,

   /** A variable that indicates whether this is the first time
       this page has been loaded. If you go to a web page, leave
       it for another one, and then return, the page's onload
       listener fires again. We need a way to differentiate
       between the first page load and subsequent ones.
       This variable works hand in hand with the pageLoaded
       variable we store into historyStorage.*/
   /** private */ firstLoad: null,

   /** A variable to handle an important edge case in Internet
       Explorer. In IE, if a user manually types an address into
       their browser's location bar, we must intercept this by
       continiously checking the location bar with an timer
       interval. However, if we manually change the location
       bar ourselves programmatically, when using our hidden
       iframe, we need to ignore these changes. Unfortunately,
       these changes are not atomic, so we surround them with
       the variable 'ieAtomicLocationChange', that if true,
       means we are programmatically setting the location and
       should ignore this atomic chunked change. */
   /** private */ ieAtomicLocationChange: null,

   /** private */ isIE: null,

	/** Creates the DHTML history infrastructure. */
	/** private */ create: function( blankhtmlDir ) {
		// get our initial location
		var initialHash = this.getCurrentLocation();

		// save this as our current location
		this.currentLocation = initialHash;

		this.blankhtmlDir = blankhtmlDir;
		// write out a hidden iframe for IE and
		// set the amount of time to wait between add() requests

		if (this.isInternetExplorer()) {
			$('<iframe />', {
				style: 'border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;',
				name: 'DhtmlHistoryFrame',
				id: 'DhtmlHistoryFrame',
				src: this.blankhtmlDir + 'blank.html?' + encodeURIComponent( initialHash )
			}).appendTo( 'body' );

			// wait 400 milliseconds between history
			// updates on IE, versus 200 on Firefox
			this.WAIT_TIME = 400;
		}

		// add an unload listener for the page; this is
		// needed for Firefox 1.5+ because this browser caches all
		// dynamic updates to the page, which can break some of our
		// logic related to testing whether this is the first instance
		// a page has loaded or whether it is being pulled from the cache
		var self = this;
		window.onunload = function() {
			self.firstLoad = null;
		};

		// determine if this is our first page load;
		// for Internet Explorer, we do this in
		// this.iframeLoaded(), which is fired on
		// page load. We do it there because
		// we have no historyStorage at this point
		// in IE, which only exists after the page
		// is finished loading for that browser
		if (this.isInternetExplorer() == false) {
			if (historyStorage.hasKey("DhtmlHistory_pageLoaded") == false) {
				this.ignoreLocationChange = true;
				this.firstLoad = true;
				historyStorage.put("DhtmlHistory_pageLoaded", true);
			} else {
				// indicate that we want to pay attention
				// to this location change
				this.ignoreLocationChange = false;
				// For browser's other than IE, fire
				// a history change event; on IE,
				// the event will be thrown automatically
				// when it's hidden iframe reloads
				// on page load.
				// Unfortunately, we don't have any
				// listeners yet; indicate that we want
				// to fire an event when a listener
				// is added.
				this.fireOnNewListener = true;
			}
		} else { // Internet Explorer
			// the iframe will get loaded on page
			// load, and we want to ignore this fact
			this.ignoreLocationChange = true;
		}

		if (this.isInternetExplorer()) {
			this.iframe = document.getElementById("DhtmlHistoryFrame");
		}

		// other browsers can use a location handler that checks
		// at regular intervals as their primary mechanism;
		// we use it for Internet Explorer as well to handle
		// an important edge case; see checkLocation() for
		// details
		self = this;
		var locationHandler = function() {
			self.checkLocation();
		};
		setInterval(locationHandler, 100);
	},

   /** Notify the listener of new history changes. */
   /** private */ fireHistoryEvent: function(newHash) {
      // extract the value from our history storage for
      // this hash
      var historyData = historyStorage.get(newHash);

      if ( null != this.listener )
      {
         // call our listener
         this.listener.call(null, newHash, historyData);
      }
   },

   /** Sees if the browsers has changed location.  This is the primary history mechanism
       for Firefox. For Internet Explorer, we use this to handle an important edge case:
       if a user manually types in a new hash value into their Internet Explorer location
       bar and press enter, we want to intercept this and notify any history listener. */
   /** private */ checkLocation: function() {
      // ignore any location changes that we made ourselves
      // for browsers other than Internet Explorer
      if (this.isInternetExplorer() == false && this.ignoreLocationChange == true)
      {
         this.ignoreLocationChange = false;
         return;
      }

      // if we are dealing with Internet Explorer
      // and we are in the middle of making a location
      // change from an iframe, ignore it
      if (this.isInternetExplorer() == false && this.ieAtomicLocationChange == true)
      {
         return;
      }

      // get hash location
      var hash = this.getCurrentLocation();

      // see if there has been a change
      if (hash == this.currentLocation)
      {
         return;
      }

      // on Internet Explorer, we need to intercept users manually
      // entering locations into the browser; we do this by comparing
      // the browsers location against the iframes location; if they
      // differ, we are dealing with a manual event and need to
      // place it inside our history, otherwise we can return
      this.ieAtomicLocationChange = true;

      if (this.isInternetExplorer() && this.getIFrameHash() != hash)
      {
         this.iframe.src = this.blankhtmlDir + "blank.html?" + encodeURIComponent( hash );
      }
      else if ( this.isInternetExplorer() )
      {
         // the iframe is unchanged
         return;
      }

      // save this new location
      this.currentLocation = hash;

      this.ieAtomicLocationChange = false;

      // notify listeners of the change
      this.fireHistoryEvent(hash);
   },

   /** Gets the current location of the hidden IFrames
       that is stored as history. For Internet Explorer. */
   /** private */ getIFrameHash: function() {
      // get the new location
      var historyFrame = document.getElementById("DhtmlHistoryFrame");
      var doc = historyFrame.contentWindow.document;
      var hash = new String(doc.location.search);

      if (hash.length == 1 && hash.charAt(0) == "?")
      {
         hash = "";
      }
      else if (hash.length >= 2 && hash.charAt(0) == "?")
      {
         hash = hash.substring(1);
     }

      return hash;
   },

   /** Removes any leading hash that might be on a location. */
   /** private */ removeHash: function(hashValue) {
      if (hashValue == null || hashValue == undefined)
      {
         return null;
      }
      else if (hashValue == "")
      {
         return "";
      }
      else if (hashValue.length == 1 && hashValue.charAt(0) == "#")
      {
         return "";
      }
      else if (hashValue.length > 1 && hashValue.charAt(0) == "#")
      {
         return hashValue.substring(1);
      }
      else
      {
         return hashValue;
      }
   },

   /** For IE, says when the hidden iframe has finished loading. */
   /** private */ iframeLoaded: function(newLocation) {
      // ignore any location changes that we made ourselves
      if (this.ignoreLocationChange == true) {
         this.ignoreLocationChange = false;
         return;
      }

      // get the new location
      var hash = new String(newLocation.search);
      if (hash.length == 1 && hash.charAt(0) == "?")
      {
         hash = "";
      }
      else if (hash.length >= 2 && hash.charAt(0) == "?")
      {
         hash = hash.substring(1);
      }

      // move to this location in the browser location bar
      // if we are not dealing with a page load event

      // Need to handle the following scenarios to have the right hash value in the location bar (SFWK-4666)
      // 1. Hit Refresh(F5) buton, should not change the location bar
      // 2. On page3, hit F5, then browse to page 5, then hit browser back button
      // 3. Hit browser back button ( the same object, ie. collection)
      // 4. Hit browser back button ( different objects, ie. collection --> folder )
      // 5. On page n of a collection, go to permission page of any object,
      //    then click done on permission page, back to the page n of the collection
	
      if ( this.pageLoadEvent != true )
      {
      	if ( hash != "" )
      	{
		// scenario 3
		window.location.hash = hash;
      	}
      	else if ( historyStorage.hasKey( this.removeHash( window.location.hash ) ) ) 
      	{
		// scenario 2, need to get the page number from historyStorage and make the hash value
		var currentPageObj = null;
		
		if ( !onInitOnlyatomic && historyStorage.hasKey("DhtmlHistory_page1" ) )
		{
			currentPageObj = historyStorage.get( "DhtmlHistory_page1" );

			if ( null !== currentPageObj && undefined !== currentPageObj.page )
			{
				 window.location.hash = makePageHistoryKey(currentPageObj.page);
			}
		}
		else
		{
			window.location.hash = hash;
		}

      	}
      	else if ( this.removeHash( window.location.hash ) == "" && currentPageNum != 1 )
      	{
		// scenario 5
		window.location.hash = makePageHistoryKey();
      	}
      	else if ( this.removeHash( window.location.hash ) != "" && currentPageNum == 1 )
      	{
		// scenario 4
		window.location.hash = hash;
      	}
      }

      // notify listeners of the change
      this.fireHistoryEvent(hash);
   },

   /** Determines if this is Internet Explorer. */
   /** private */ isInternetExplorer: function() {

        if ( null === this.isIE )
        {
         var userAgent = navigator.userAgent.toLowerCase();
         if (document.all && userAgent.indexOf('msie')!=-1)
         {
            this.isIE = true;
         }
         else
         {
            this.isIE = false;
         }
     }
     return this.isIE;
   }
};

/** An object that uses a hidden form to store history state
    across page loads. The chief mechanism for doing so is using
    the fact that browser's save the text in form data for the
    life of the browser and cache, which means the text is still
    there when the user navigates back to the page. See
    http://codinginparadise.org/weblog/2005/08/ajax-tutorial-saving-session-across.html
    for full details. */
window.historyStorage = {
   /** If true, we are debugging and show the storage textfield. */
   /** public */ debugging: false,

   /** Our hash of key name/values. */
   /** private */ storageHash: new Object(),

   /** If true, we have loaded our hash table out of the storage form. */
   /** private */ hashLoaded: false,

   /** public */ put: function(key, value) {
       this.assertValidKey(key);

       // if we already have a value for this,
       // remove the value before adding the
       // new one
       if (this.hasKey(key)) {
         this.remove(key);
       }

       // store this new key
       this.storageHash[key] = value;

       // save and serialize the hashtable into the form
       this.saveHashTable();
   },

   /** public */ get: function(key) {
      this.assertValidKey(key);

      // make sure the hash table has been loaded
      // from the form
      this.loadHashTable();

      var value = this.storageHash[key];

      if (value == undefined)
      {
         return null;
      }
      else
      {
         return value;
      }
   },

   /** public */ remove: function(key) {
      this.assertValidKey(key);

      // make sure the hash table has been loaded
      // from the form
      this.loadHashTable();

      // delete the value
      delete this.storageHash[key];

      // serialize and save the hash table into the
      // form
      this.saveHashTable();
   },

   /** Clears out all saved data. */
   /** public */ reset: function() {
      this.storageField.value = "";
      this.storageHash = new Object();
   },

   /** public */ hasKey: function(key) {
      this.assertValidKey(key);

      // make sure the hash table has been loaded
      // from the form
      this.loadHashTable();

      if (typeof this.storageHash[key] == "undefined")
      {
         return false;
      }
      else
      {
         return true;
      }
   },

   /** Determines whether the key given is valid;
       keys can only have letters, numbers, the dash,
       underscore, spaces, or one of the
       following characters:
       !@#$%^&*()+=:;,./?|\~{}[] */
   /** public */ isValidKey: function(key) {
      if (typeof key != "string")
      {
         key = key.toString();
      }

      var matcher = /^[a-zA-Z0-9_ \!\@\#\$\%\^\&\*\(\)\+\=\:\;\,\.\/\?\|\\\~\{\}\[\]]*$/;

      return matcher.test(key);
   },




   /** A reference to our textarea field. */
   /** private */ storageField: null,

   /** private */ init: function() {
      // write a hidden form into the page
      var styleValue = "position: absolute; top: -1000px; left: -1000px;";
      var formDisplay = "none";

      if (window.dhtmlHistory.isInternetExplorer()) {
         formDisplay = "block";
	  }
         
      if (this.debugging == true) {
         styleValue = "width: 30em; height: 30em;";
         formDisplay = "block";
      }

      var newContent =   "<form id='historyStorageForm' " +
                        "method='GET' style='display:" + formDisplay + "'>" +
                     "<textarea id='historyStorageField' " +
                         "style='" + styleValue + "'" +
                         "name='historyStorageField'></textarea>" +
                     "</form>";

      var historyFormLocator = document.getElementById("historyFormLocatorDiv");
      if ( null != historyFormLocator  )
      {
            historyFormLocator.innerHTML = newContent;
      }
      else
      {
         document.write(newContent);
      }

      this.storageField = document.getElementById("historyStorageField");
   },

   /** Asserts that a key is valid, throwing
       an exception if it is not. */
   /** private */ assertValidKey: function(key) {
      if (this.isValidKey(key) == false)
      {
         throw "Please provide a valid key for " +
               "window.historyStorage, key= " +
               key;
       }
   },

   /** Loads the hash table up from the form. */
   /** private */ loadHashTable: function() {
      if (this.hashLoaded == false)
      {
         // get the hash table as a serialized
         // string
         var serializedHashTable = this.storageField.value;

         if (serializedHashTable != "" && serializedHashTable != null)
         {
            // destringify the content back into a
            // real JavaScript object
            this.storageHash = eval('(' + serializedHashTable + ')');
         }

         this.hashLoaded = true;
      }
   },

   /** Saves the hash table into the form. */
   /** private */ saveHashTable: function() {
      this.loadHashTable();

      // serialized the hash table
      var serializedHashTable = JSON.stringify(this.storageHash);

      // save this value
      this.storageField.value = serializedHashTable;
   }
};

/** The JSON class is copyright 2005 JSON.org. */
Array.prototype.______array = '______array';

var JSON = {
    org: 'http://www.JSON.org',
    copyright: '(c)2005 JSON.org',
    license: 'http://www.crockford.com/JSON/license.html',

    stringify: function (arg) {
        var c, i, l, s = '', v;

        switch (typeof arg) {
        case 'object':
            if (arg) {
                if (arg.______array == '______array') {
                    for (i = 0; i < arg.length; ++i) {
                        v = this.stringify(arg[i]);
                        if (s) {
                            s += ',';
                        }
                        s += v;
                    }
                    return '[' + s + ']';
                } else if (typeof arg.toString != 'undefined') {
                    for (i in arg) {
                        v = arg[i];
                        if (typeof v != 'undefined' && typeof v != 'function') {
                            v = this.stringify(v);
                            if (s) {
                                s += ',';
                            }
                            s += this.stringify(i) + ':' + v;
                        }
                    }
                    return '{' + s + '}';
                }
            }
            return 'null';
        case 'number':
            return isFinite(arg) ? String(arg) : 'null';
        case 'string':
            l = arg.length;
            s = '"';
            for (i = 0; i < l; i += 1) {
                c = arg.charAt(i);
                if (c >= ' ') {
                    if (c == '\\' || c == '"') {
                        s += '\\';
                    }
                    s += c;
                } else {
                    switch (c) {
                        case '\b':
                            s += '\\b';
                            break;
                        case '\f':
                            s += '\\f';
                            break;
                        case '\n':
                            s += '\\n';
                            break;
                        case '\r':
                            s += '\\r';
                            break;
                        case '\t':
                            s += '\\t';
                            break;
                        default:
                            c = c.charCodeAt();
                            s += '\\u00' + Math.floor(c / 16).toString(16) +
                                (c % 16).toString(16);
                            break;
                    }
                }
            }
            return s + '"';
        case 'boolean':
            return String(arg);
        default:
            return 'null';
        }
    },
    parse: function (text) {
        var at = 0;
        var ch = ' ';

        function error(m) {
            throw {
                name: 'JSONError',
                message: m,
                at: at - 1,
                text: text
            };
        }

        function next() {
            ch = text.charAt(at);
            at += 1;
            return ch;
        }

        function white() {
            while (ch != '' && ch <= ' ') {
                next();
            }
        }

        function str() {
            var i, s = '', t, u;

            if (ch == '"') {
outer:          while (next()) {
                    if (ch == '"') {
                        next();
                        return s;
                    } else if (ch == '\\') {
                        switch (next()) {
                        case 'b':
                            s += '\b';
                            break;
                        case 'f':
                            s += '\f';
                            break;
                        case 'n':
                            s += '\n';
                            break;
                        case 'r':
                            s += '\r';
                            break;
                        case 't':
                            s += '\t';
                            break;
                        case 'u':
                            u = 0;
                            for (i = 0; i < 4; i += 1) {
                                t = parseInt(next(), 16);
                                if (!isFinite(t)) {
                                    break outer;
                                }
                                u = u * 16 + t;
                            }
                            s += String.fromCharCode(u);
                            break;
                        default:
                            s += ch;
                            break;
                        }
                    } else {
                        s += ch;
                    }
                }
            }
            error("Bad string");
        }

        function arr() {
            var a = [];

            if (ch == '[') {
                next();
                white();
                if (ch == ']') {
                    next();
                    return a;
                }
                while (ch) {
                    a.push(val());
                    white();
                    if (ch == ']') {
                        next();
                        return a;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad array");
        }

        function obj() {
            var k, o = {};

            if (ch == '{') {
                next();
                white();
                if (ch == '}') {
                    next();
                    return o;
                }
                while (ch) {
                    k = str();
                    white();
                    if (ch != ':') {
                        break;
                    }
                    next();
                    o[k] = val();
                    white();
                    if (ch == '}') {
                        next();
                        return o;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad object");
        }

        function num() {
            var n = '', v;
            if (ch == '-') {
                n = '-';
                next();
            }
            while (ch >= '0' && ch <= '9') {
                n += ch;
                next();
            }
            if (ch == '.') {
                n += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    n += ch;
                }
            }
            if (ch == 'e' || ch == 'E') {
                n += 'e';
                next();
                if (ch == '-' || ch == '+') {
                    n += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    n += ch;
                    next();
                }
            }
            v = +n;
            if (!isFinite(v)) {
                error("Bad number");
            } else {
                return v;
            }
        }

        function word() {
            switch (ch) {
                case 't':
                    if (next() == 'r' && next() == 'u' && next() == 'e') {
                        next();
                        return true;
                    }
                    break;
                case 'f':
                    if (next() == 'a' && next() == 'l' && next() == 's' &&
                            next() == 'e') {
                        next();
                        return false;
                    }
                    break;
                case 'n':
                    if (next() == 'u' && next() == 'l' && next() == 'l') {
                        next();
                        return null;
                    }
                    break;
                default:
                   break;
            }
            error("Syntax error");
        }

        function val() {
            white();
            switch (ch) {
                case '{':
                    return obj();
                case '[':
                    return arr();
                case '"':
                    return str();
                case '-':
                    return num();
                default:
                    return ch >= '0' && ch <= '9' ? num() : word();
            }
        }

        return val();
    }
};



////////////////////////////////////////////////////////////
//
// Originally this was core/otajaxsuport.js
//
////////////////////////////////////////////////////////////




   //-------------------------------------------------------------------------------------------------------------
   // Private ajax request handling
   //
   // Public interface
   //
   // sendHTTPGetAjaxRequest( url, resTextFunc, msg )

   //--------------------------------------------------------------------------------------------

   // Determines if this is Internet Explorer
   /** private */

   var otAjax_isIEBrowser = null;

   function isInternetExplorer()
   {
      if ( otAjax_isIEBrowser === null )
      {
         var userAgent = navigator.userAgent.toLowerCase();

         if (document.all && userAgent.indexOf('msie')!=-1)
         {
            otAjax_isIEBrowser = true;
         }
         else
         {
            otAjax_isIEBrowser = false;
         }
      }
      return otAjax_isIEBrowser ;
   }
   
   var otAjax_isIE6Browser = null;
   
   function isInternetExplorer6()
   {
      if ( otAjax_isIE6Browser === null )
      {
         var userAgent = navigator.userAgent.toLowerCase();

         if (document.all && userAgent.indexOf('msie 6')!=-1)
         {
            otAjax_isIE6Browser = true;
         }
         else
         {
            otAjax_isIE6Browser = false;
         }
      }
      return otAjax_isIE6Browser ;
   }

   // NOTE: this is an experiment and should be review for viability
   var timeStamp = null;

   function getTimeStamp( cache )
   {
      var newTimeStamp;

      // we can take advantage of some of the caching available in browsers like IE
      if ( null === timeStamp || !cache )
      {
         timeStamp = new Date();
      }
      else
      {
         newTimeStamp = new Date();

         if( ( 1000 * 10 ) < ( newTimeStamp.getTime() - timeStamp.getTime() ) )
         {
            timeStamp  = newTimeStamp;
         }
      }

      return encodeURIComponent(timeStamp.getTime());
   }

   var httpXMLObj = null;
   var httpUrl;

   function cleanup()
   {
      if ( null !== httpXMLObj )
      {
         // Clean up so IE doesn't leak memory
         delete httpXMLObj.onreadystatechange;
         httpXMLObj = null;
      }
   }


   function createXMLHttpRequest()
   {
      if ( null === httpXMLObj )
      {
         // creates XMLHttpRequest object
         try
         {
            if (window.XMLHttpRequest)
            {
               httpXMLObj = new XMLHttpRequest();
            }
            else if (window.ActiveXObject)
            {
               try
               {
                  httpXMLObj = new ActiveXObject( "Msxml2.XMLHTTP" );
               }
               catch( e )
               {
                  try
                  {
                     httpXMLObj = new ActiveXObject( "Microsoft.XMLHTTP" );
                  }
                  catch( e2 )
                  {
                     cleanup();
                  }
               }
            }
         }
         catch (e)
         {
            cleanup();
         }

         if( !httpXMLObj )
         {
            alert( 'Cannot create an XMLHTTP instance to communicate to the server' );
         }
      }
      else
      {
         // Abort an existing request to avoid issues
         httpXMLObj.abort();
      }

      return httpXMLObj;
   }

   // On FF the http request doesn't give up control of the
   // thread to allow windows to run "stuff" in this case a popup for the
   // user.  By delaying the url submission by 5ms windows is allowed to
   // process other events, including the displaying of the popup
   function sendRequestNow()
   {
      if ( httpXMLObj  )
      {
         httpXMLObj.open("GET", httpUrl, true );

         httpXMLObj.send(null);
      }
   }

   function OTsendHTTPGetAjaxRequest( url, resTextFunc, msg, param1, param2, async )
   {
      if ( null != msg )
      {
         popup( msg ,"white");
      }

      createXMLHttpRequest();

      if ( httpXMLObj  )
      {

         if ( isInternetExplorer() )
         {
            // for IE we need to not cache the pages :-S.  The easest thing to do
            // is to append the time stamp to the url
            url = url + "&timestamp=" + getTimeStamp( true );
         }

         httpXMLObj.onreadystatechange = function() {
            if (httpXMLObj.readyState == 4)
            {
               try // ff throws an exception sometimes
               {
                  if (httpXMLObj.status == 200)
                  {
                     if ( httpXMLObj.responseText !== "" && null != resTextFunc )
                     {
                        resTextFunc(httpXMLObj.responseText, param1, param2 );
                     }
                     cleanup();
                     killPopup();
                  }
               }
               catch(e)
               {
                  cleanup();
                  killPopup();
               }
            }
         };

	if (async == false) {
		httpXMLObj.open("GET", url, false);
	} else {
		httpXMLObj.open("GET", url, true);
	}
        
        httpXMLObj.send(null);
      }
   }


////////////////////////////////////////////////////////////
//
// Originally this was core/otutilities.js
//
////////////////////////////////////////////////////////////


   /* public */
   // Add an onload event to the current page load
   function OTaddLoadEvent( func )
   {
      var oldonload = window.onload;

      if (typeof window.onload != 'function')
      {
         window.onload = func;
      }
      else
      {
         window.onload = function()
         {
            if (oldonload)
            {
               oldonload();
            }
            func();
         };
      }
   }

   // Add an onload event to the current page load
   function OTaddResizeEvent( func )
   {
      var oldonresize = window.onresize;

      if (typeof window.onresize != 'function')
      {
         window.onresize = func;
      }
      else
      {
         window.onresize = function()
         {
            if (oldonresize)
            {
               oldonresize();
            }
            func();
         };
      }
   }

   //--------------------------------------------------------------------------------------------
   // extending Object to allow automatic registration of setters and getters for internal variables
   function OTAddProperty (obj, sType, sName, vValue)
   {
      // Type will be one of the following
      //      "undefined" the value doesn't exist.
      //      "string"
      //      "number"
      //      "function"
      //      "object"
      //      "boolean"

      if ( typeof sName == 'undefined'){
         // silent return if name is not defined (can't add)
         return;   
      }

      if (typeof vValue != sType)
      {
         alert("Property " + sName + " must be of type " + sType + ".");
         return;
      }

      obj[sName] = vValue;

      var sFuncName = sName.charAt(0).toUpperCase() + sName.substring(1, sName.length);

      obj["Get" + sFuncName] = function () { return this[sName]; };
      obj["Set" + sFuncName] = function (vNewValue)
         {

            if (typeof vNewValue != sType)
            {
               alert("Property " + sName + " must be of type " + sType + ".");
               return;
            }

            var vOldValue = obj["Get" + sFuncName]();

            var oEvent =
            {
               propertyName: sName,
               propertyOldValue: vOldValue,
               propertyNewValue: vNewValue,
               returnValue: true
            };

            if ( undefined !== obj.onpropertychange )
            {
               this.onpropertychange(oEvent);
            }
            if (oEvent.returnValue)
            {
               obj[sName] = oEvent.propertyNewValue;
            }
      };
   }

   //--------------------------------------------------------------------------------------------
   // Given a DOM element, truncates its text contents based on the given target pixel width.  
   // The contents of element MUST be text-only.  Note that the loop
   // part of this function is extremely slow in IE, so the characterLengthGuess should be
   // carefully chosen.  iterationSize is an optional parameter representing the number
   // of characters to be removed from the end of the string at a time.  The lower this number,
   // the longer it will take.  The default is 10.
   // Note that this method must be called AFTER the DOM is fully loaded - 
   // you can ensure this by using $(document).ready() instead of body.onload.  Also, element
   // MUST be visible at the time this function is called (offsetWidth must be greater than 0)
   function OTTruncateElementContentsToPixelWidth ( element, pixelTarget, characterLengthGuess, iterationSize )
   {
      var jQueryElement = $( element );
      var text = jQueryElement.text();
      
      
      if ( iterationSize === undefined )     // Add 3 to include the ellipsis.
	  {
         iterationSize = 13;
	  }
      else
	  {
         iterationSize += 3;
	  }
            
      // Starting point:
      if ( text.length > characterLengthGuess )
	  {
         jQueryElement.text( text.substring( 0, characterLengthGuess - 3 ) + "..." );
	  }
      
      if ( pixelTarget > 0 )
      {
         var realWidth = element.offsetWidth;
         
         // If we're not small enough already, remove the tail of the string, iterationSize characters at a time
         while ( realWidth > pixelTarget) 
         {
            text = jQueryElement.text();
            jQueryElement.text( text.substring( 0, text.length - iterationSize ) + "..." );
            realWidth = element.offsetWidth;
         }
      }
   }

   //--------------------------------------------------------------------------------------------
   // Utility functions for zero padding
   String.prototype.times = function(n)
   {
      var s = '';
      for (var i = 0; i < n; i++)
      {
         s += this;
      }

      return s;
   };

   //--------------------------------------------------------------------------------------------
   // String extensions
   String.prototype.zp = function(n) { return '0'.times(n - this.length) + this; };
   
   String.prototype.zpa = function(n) { return this + ' '.times(n - this.length); };
   
   // Safari 2.0 requires this prototype
   if ( Safari )
   {
      String.prototype.localeCompare = function ( theString )
      {
         if (this < theString) {return -1;}
         if (this > theString) {return 1;}
         return 0;
      };
   }
   
   // is the string sent in a number? T/F returned
   String.prototype.isNumber = function()
   {
      var str;
      var re = /^[\-]?\d+$/;

      str = this.toString();

      if ( ! str.match( re ) )
      {
         return false;
      }

      return true;
   };

   // NOTE:  not sure how to optimiaze better
   String.prototype.format = function()
   {
      var i;
      var re;
      var str;

      if( 0 === arguments.length )
      {
         return null;
      }

      str = this;

      re = new RegExp('\\%\\%' ,'gm');
      str = str.replace(re, '%');

      for(i = 1; i<arguments.length; i++)
      {
         re = new RegExp('\\{' + (i-1) + '\\}','gm');
         str = str.replace(re, arguments[i]);
      }

      return str;
   };

   String.prototype.EscapeHTML = function()
   {
      var str = this;
      
      return str.replace( /&/g, "&amp;" ).replace( /</g, "&lt;" ).replace( />/g, "&gt;" ).replace( /"/g, "&quot;" );
   };

   String.format = function()
   {
      var i;
      var re;
      var str;

      if( 0 === arguments.length )
      {
         return null;
      }

      str = arguments[0];

      re = new RegExp('\\%\\%' ,'gm');
      str = str.replace(re, '%');

      for(i = 1; i<arguments.length; i++)
      {
         re = new RegExp('\\%' + (i) ,'gm');
         str = str.replace(re, arguments[i]);
      }

      return str;
   };

   String.formatLoc = function()
   {
      var i;
      var re;
      var str;

      if( 0 === arguments.length )
      {
         return null;
      }

      str = LocString( arguments[0] );

      re = new RegExp('\\%\\%' ,'gm');
      str = str.replace(re, '%');

      for(i = 1; i<arguments.length; i++)
      {
         re = new RegExp('\\%' + (i) ,'gm');
         str = str.replace(re, arguments[i]);
      }

      return str;
   };

   //--------------------------------------------------------------------------------------------
   // Array extensions

   // Array.push() - Add an element to the end of an array, return the new length
   if( typeof Array.prototype.push==='undefined' )
   {
      Array.prototype.push = function()
      {
         for( var i = 0, b = this.length, a = arguments, l = a.length; i<l; i++ )
         {
            this[b+i] = a[i];
         }
         return this.length;
      };
   }

   // Array.indexOf( value, begin, strict ) - Return index of the first element that matches value
   Array.prototype.indexOf = function( v, b, s )
   {
      for( var i = +b || 0, l = this.length; i < l; i++ )
      {
         if( this[i]===v || s && this[i]==v )
         {
            return i;
         }
      }
       return -1;
   };

   // Array.unique( strict ) - Remove duplicate values
   Array.prototype.unique = function( b )
   {
      var i;

      var a = [];
      var l = this.length;

       for( i=0; i<l; i++ )
       {
         if( a.indexOf( this[i], 0, b ) < 0 )
         {
            a.push( this[i] );
         }
       }
       return a;
   };

   // Localization strings support function
   //--------------------------------------------------------------------------------------------
   /* Private */
   var _testkeyon = false;


   // -- LocString --
   //
   // Gets a localized string. If no string is found or an error occurs, returns
   // the key.
   //
   // Parameters
   //   key - key of string to fetch
   //
   // Returns
   //   localized string, or key on failure
   //
   function LocString(key, array)
   {
           try
           {
                   if ( null == array )
                   {
                      array = lStr;
                   }
                   
                   var ret = array[key];
                   
                   if (ret === undefined)
                   {
                      ret = key;
                   }

                   if ( _testkeyon )
                   {
                      return "\u00FC" + ret;
                   }

                   return ret;
           }
           catch (ex)
           {
                   // Do nothing.
                   return "NO TRANSLATION: " + key;
           }

           return key;
   }

   function setLocalizationTestKeyOn()
   {
      _testkeyon = true;
   }

   // Localization strings support function
   //--------------------------------------------------------------------------------------------

   function exceptionAlert( e, msg )
   {

      var outStr = "An exception occurred in the script." +
               "\nError name: " + e.name +
               "\nError description: " + e.description +
               "\nError number: " + e.number +
               "\nError message: " + e.message;

      if ( null !== msg )
      {
         outStr += "\nDetails: " + msg;
      }

      alert ( outStr );
   }


////////////////////////////////////////////////////////////
//
// Originally this was minipaginationcontrol.js
//
////////////////////////////////////////////////////////////

var timer;
var miniPageRow;

function buildMiniTable( totalPages, currentPageNum )
{
   var    miniPageTableCell;
   var    miniPageTable;
   var      cell;

   var    cellCount = 0;
   var    pickControlOpen  = false;

   try
   {
      miniPageTableCell = document.getElementById( 'MiniPageTableCell' );
      if ( null != miniPageTableCell )
      {
         if ( totalPages <= 1 )
         {
            // If there is only one page then hide the parent cell.  This cleans up the spacing
            miniPageTableCell.style.display = "none";
            return;
         }
         else
         {
            miniPageTableCell.style.display = "";
            miniPageTableCell.width = '10%';
         }
      }

      miniPageTable = document.getElementById( 'MiniPageTable' );
      if ( null == miniPageTable )
      {
         return;
      }

      if( miniPageTable.getElementsByTagName( 'TD').length > 0 )
      {
         removeChildren( miniPageTable.firstChild );
      }

      if( isIE )
      {
         miniPageTable.style.filter = "alpha(opacity=80)";
      }
      else
      {
         miniPageTable.style.opacity =  ".80";
      }
      miniPageTable.style.height = "15px";

      this.miniPageRow = miniPageTable.insertRow( 0 );

      if ( totalPages > 1 )
      {
         // This variable is from the webnode/browsecoretable.js to indicate the top control is open
         if ( false === topPickControlOpen )
         {
            prevCell = miniPageRow.insertCell(  cellCount++ );
            if( currentPageNum !=1 )
            {
               prevCell.onmouseover = function(){ imageCell( this, 'page_previous16_mo.gif', 'PagePrev', true ); };
               prevCell.onmouseout = function(){ imageCell( this, 'page_previous16.gif', 'PagePrev', false ); };
               prevCell.onclick = function(){ getFolderContents( ( currentPageNum - 1 ), String.formatLoc( "Retrieving page n", currentPageNum - 1 ) ); };
               prevCell.align = 'right';
               prevCell.innerHTML = "<IMG SRC='" + imgSrc + "page_previous16.gif' Alt='"+ LocString( "Previous Page" ) +"' Title='"+ LocString( "Previous Page" ) +"' ID='PagePrev' WIDTH='16' HEIGHT='16' BORDER='0'>";
            }
            else
            {
               prevCell.innerHTML = "<IMG SRC='" + imgSrc + "page_previous16_ds.gif' Title='' WIDTH='16' HEIGHT='16' BORDER='0'>";
            }

            // add the spacer cell
            cell = miniPageRow.insertCell( cellCount++ );
            cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='2' HEIGHT='4' BORDER='0'>";

            // NOTE: the mouseover effect by changing the css style doesn't seem to
            //       work very well so in the mean time.  Changing the styles directly
            //       will have to do

            inputCell = miniPageRow.insertCell( cellCount++ );
            inputCell.setAttribute( 'pageNumAccess', currentPageNum );
            inputCell.style.margin = "0px";
            inputCell.style.padding = "0px";
            inputCell.style.backgroundColor = "#E2EBF3";
            inputCell.style.border = "solid 1px #A9B7C6";
            inputCell.className = 'pageSelectorReference';
            inputCell.innerHTML = "&nbsp;" + currentPageNum + "&nbsp;";

            // add the spacer cell
            cell = miniPageRow.insertCell( cellCount++ );
            cell.innerHTML = "<IMG SRC='" + imgSrc + "spacer.gif' ALT='' WIDTH='2' HEIGHT='4' BORDER='0'>";

            nextCell = miniPageRow.insertCell( cellCount++ );
            if( currentPageNum < totalPages )
            {
               nextCell.onmouseover = function(){ imageCell( this, 'page_next16_mo.gif', 'PageNext', true ); };
               nextCell.onmouseout = function(){ imageCell( this, 'page_next16.gif', 'PageNext', false ); };
               nextCell.onclick = function(){ getFolderContents( ( currentPageNum + 1 ), String.formatLoc( "Retrieving page n", currentPageNum + 1 ) ); };
               nextCell.align = 'left';
               nextCell.innerHTML = "<IMG SRC='" + imgSrc + "page_next16.gif' Alt='"+ LocString( "Next Page" ) +"' Title='"+ LocString( "Next Page" ) +"' ID='PageNext' WIDTH='16' HEIGHT='16' BORDER='0'>";
            }
            else
            {
               nextCell.innerHTML = "<IMG SRC='" + imgSrc + "page_next16_ds.gif' Title='' WIDTH='16' HEIGHT='16' BORDER='0'>";
            }

            cell = miniPageRow.insertCell( cellCount++ );
            cell.onmouseover = function(){ imageCell(this, 'goto_page16_mo.gif', 'gotoPageMiniLinkImg', true); };
            cell.onmouseout = function(){ imageCell(this, 'goto_page16.gif', 'gotoPageMiniLinkImg', false); };
            cell.innerHTML = "<DIV ID='miniActivatePickDiv' CLASS='activateMiniPickDivShow'><a href='javascript:void(0)' onclick='javascript:jumpToPage();return false;' TITLE='" + LocString( 'Go to page...' ) + "'><IMG SRC='" + imgSrc + "goto_page16.gif' WIDTH='16' ID='gotoPageMiniLinkImg' HEIGHT='16' BORDER='0' TITLE='" + LocString( 'Go to page...' ) + "'></a></DIV>";
         }
         else
         {
            // open the edit control
            jumpToPage();
         }
      }
   }
   catch(e)
   {
      exceptionAlert( e, "Issue occured in miniPaginationControl.js.js/buildMiniTable.  An issue has occured in trying to build the top pagination control.");
   }
}

function removeChildren( objPage )
{
    if( objPage != null )
    {
        var nodeList = objPage.childNodes;
        var lngth = nodeList.length;

        for( var i = 0; i < lngth ; i++ )
        {
            objPage.removeChild( nodeList[ 0 ] );
        }
    }
}

function jumpToPage()
{
   var cell;

    removeChildren( this.miniPageRow );

   cell = this.miniPageRow.insertCell( 0 );

   cell.style.whiteSpace = 'nowrap';
   cell.style.color = '#666666';
   cell.innerHTML = "&nbsp;&nbsp;&nbsp;";
   cell.innerHTML += LocString( "Go to page" );
    cell.innerHTML += "&nbsp;&nbsp;<INPUT type='text' ID='miniPageInput' CLASS='browsePaginationBarEdit' SIZE='5' MAXLENGTH='20' LIMIT='20' autocomplete='off' onkeypress='browsePageNumEnter( this, event )'  />";

   cell = this.miniPageRow.insertCell( 1 );
   cell.onmouseover = function(){ imageCell(this, 'goto_close1216_mo.gif', 'browsePageMiniLinkImg', true);   };
   cell.onmouseout = function(){ imageCell(this, 'goto_close1216.gif', 'browsePageMiniLinkImg', false); };
   cell.innerHTML = "<DIV ID='miniBbrowsePickDiv' CLASS='browseMiniPickDivShow'><A HREF='javascript:void(0)' ONCLICK='javascript:topPickControlOpen=false;buildMiniTable( totalPages, currentPageNum );return false;' TITLE='" + LocString( 'Go to page...' ) + "'><IMG SRC='" + imgSrc + "goto_close1216.gif' ID='browsePageMiniLinkImg' WIDTH='16' HEIGHT='16' BORDER='0' ALT='" + LocString( 'Go to page...' ) + "'></a></DIV>";

   // This variable is from the webnode/browsecoretable.js to indicate the top control is open
   topPickControlOpen = true;

   // close off the lower edit control so there is no confusion in the edit control handling
   flipPagePickBack();

    this.timer = setTimeout( "setFocus( 'miniPageInput' )", 5 );
}

function setFocus( elementId )
{
    var element = document.getElementById( elementId );

    if( element != null )
    {
        element.focus();
        clearTimeout( this.timer );
    }
}

function cancelEvent( e )
{

    if ( !e )
    {
       e = window.event;
    }

    if ( e.preventDefault )
    {
        e.preventDefault();
    }
    else
    {
        e.returnValue = false;
    }

}

//
// Indicates an async XmlHttpRequest is in progress.
// It adds an "otAjaxLoading" tag in the body element.
// Param: id     The ID to identify this XmlHttpRequest request. This is useful when there are multiple Ajax requests.
//
function ajaxLoading( id )
{
   var   node = document.createElement( "otAjaxLoading" );


   node.id = "ajaxRequest-" + id;

   document.body.appendChild( node );
}
   
//
// Indicates an async XmlHttpRequest is done.
// It removes the "otAjaxLoading" tag that matches the id.
// Param: reqID     The ID to identify this XmlHttpRequest request.
//
function ajaxLoaded( reqID )
{
   var   i;
   var   node;
   var   id = "ajaxRequest-" + reqID;
   var   nodes = document.getElementsByTagName( "otAjaxLoading" );


   for ( i = 0; i < nodes.length; ++i )
   {
      node = nodes[ i ];
      
      if ( node.id == id )
      {
         document.body.removeChild( node );
         break;
      }
   }
}

function emailLink() {
	var cnt = 0;
	var emailText = "";
	var baseURL = window.location.protocol + "//";
	var url = "";
	var emailFrame;

	baseURL += window.location.hostname;

	if (window.location.port != "")
	{
		baseURL += ":" + window.location.port;
	}

	baseURL += baseCSUrl;

	for (var i = 0; i < document.BrowseViewFrm.elements.length; i++) {
		if (document.BrowseViewFrm.elements[i].checked && document.BrowseViewFrm.elements[i].value != 'checkbox') {
			cnt++;

			checkbox = $(document.BrowseViewFrm.elements[i]);
			nameTag = checkbox.parents(".browseRow1,.browseRow2").find(".browseItemNameContainer");
			emailText += encodeURIComponent(nameTag.text() + "\n");
			emailText += baseURL + "/link/" + checkbox.val() + encodeURIComponent("\n\n");
			url = "mailto:?body=" + emailText ;
		}
	}

	if (cnt > 0) {
		emailFrame = document.getElementById( 'emailFrame' );

			if ( emailFrame ) 
			{
				// Open the mailto link in an iframe to prevent Internet Explorer from popping up a new window.
				emailFrame.src = url;
			}
			else
			{
				window.location = url;
			}
	}
	else {
		document.BrowseViewFrm.top_checkbox.focus();
		alert(bv_alertMsg);
	}
}