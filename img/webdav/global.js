var isMac = navigator.appVersion.indexOf( "Mac" ) != -1;
var HP = navigator.userAgent.indexOf( "HP" ) != -1;
var Sun = navigator.userAgent.indexOf( "Sun" ) != -1;

var IE = document.all;
var IE4 = navigator.appVersion.indexOf( "MSIE 4." ) != -1;
var IE5 = navigator.appVersion.indexOf( "MSIE 5." ) != -1;
var IE50 = navigator.appVersion.indexOf( "MSIE 5.0" ) != -1;
var IE6 = ((document.all)&&(navigator.appVersion.indexOf("MSIE 6.")!=-1)) ? true : false;
var IE7 = ((document.all)&&(navigator.appVersion.indexOf("MSIE 7.")!=-1)) ? true : false;

var NS = NS4 = navigator.appName.indexOf( "Netscape" ) != -1;	//document.layers
var	NS6 = navigator.userAgent.indexOf( "Netscape6" ) != -1;
var	NS7 = navigator.userAgent.indexOf( "Netscape/7" ) != -1;

var	Safari = navigator.userAgent.indexOf( "Safari" ) != -1;

var FF = (Array.every || window.Iterator) ? true : false; // FF 1.5+

var useLayers = ( NS4 && ( HP || Sun ) && !NS7 );
var lineBreaksAreNodes = !IE;
var	forceWindowElementUnderMenu = IE;

var pageLoaded = false;
var __targetSelf = true;
var	__LeavePage = '';
var contenttable = false;

var supportPath;

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

		if ( targetSize != 0 )
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

function LTrim( str )
{
	var	retVal = str;

	for ( var k = 0; k < str.length && str.charAt( k ) == " " ; k++ )
	{
		 retVal = str.substring( k, str.length );
	}

	return retVal;
}

function RTrim( str )
{
	var	retVal = str;

	for ( var k = str.length-1; k >= 0 && str.charAt( k ) == " " ; k-- )
	{
		retVal = str.substring( 0, k + 1 );
	}

	return retVal;
}

function Trim( str )
{
	return LTrim( RTrim( str ) );
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

// Internet Explorer doesn't support functions and args in its timeouts so we replicate that functionality.
if ( IE )
{
	// Internal array used to track all running intervals
	var intervals = new Array();

	function newSetInterval( func, interval )
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
		intervals[nextIdx] = new Object;

		// Add interval time
		intervals[nextIdx].interval = interval;

		// Add the function
		intervals[nextIdx].code = fCall;

		// Add arguments
		intervals[nextIdx].arguments = new Array();

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
		intervals[nextIdx] = new Object;

		// Add interval time
		intervals[nextIdx].interval = interval;

		// Add the function
		intervals[nextIdx].code = fCall;

		// Add arguments
		intervals[nextIdx].arguments = new Array();

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
