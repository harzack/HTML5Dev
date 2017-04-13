//
// WFFunction Menu
//
	var wfMenuWaitGIF
	var wfMenuGIF
	var	wfMenuWaitMsg = ""
	var wfMenuDeleteMsg = ""
	var wfFunctionMenuURL = ""
	var wfFunctionMenuPath = ""
    var wfFunctionMenu
    var x
    var y

	if ( NS4 )
	{
		var wfAppContainer
	}
	
	function beforeMenuPop()
	{
		window.status = ""
	}
	
	function showWFFunctionMenu( moreParam, id, e, theTarget )
	{
	    var myItem

	    if ( !pageLoaded )
	    {
	    	return
	    }

		myItem = "x" + id
		document.images[ myItem ].src = wfMenuWaitGIF

		window.status = wfMenuWaitMsg
		    
		getWFObjectAndXY( e )
		
		if ( typeof( theTarget ) == "undefined" )
			theTarget = ""

		if ( wfFunctionMenu.show( x, y, id, moreParam, theTarget ) == "" )
		{
		}
		document.images[ myItem ].src = wfMenuGIF
		
		window.status = ""
	}
	
	function showWFFunctionMenuAdv( theURL, id, e, theTarget )
	{
	    var myItem

	    if ( !pageLoaded )
	    {
	    	return
	    }

        id = "" + id
		myItem = "x" + id
		document.images[ myItem ].src = wfMenuWaitGIF

		window.status = wfMenuWaitMsg
		    
		getWFObjectAndXY( e )
		
		if ( typeof( theTarget ) == "undefined" )
			theTarget = ""

		if ( wfFunctionMenu.showAdv( x, y, id, theURL, theTarget ) == "" )
		{
		}
		document.images[ myItem ].src = wfMenuGIF
		
		window.status = ""
	}
	
	function getWFObjectAndXY( e )
	{
		if ( NS4 )
		{
			if ( !wfAppContainer )
			{
				wfAppContainer = eval( 'document.wfAppletContainer' )
			}

			//alert(e.pageX + " " + e.pageY + " wfAppContainer.x=" + wfAppContainer.x + " wfAppContainer.y=" + wfAppContainer.y )
    		if ( NS6 || ( NS4 && ( HP || Sun ) ) )
			{
				x = e.pageX
				y = e.pageY
			}
			else
			{
				x = e.pageX - wfAppContainer.x
				y = e.pageY - wfAppContainer.y //window.pageYOffset
			}
		}
		else
		{
			var menuLeft = 0
			var menuTop = 0

			if ( window.document.applets.WFFunctionMenu != null )
			{			
				menuLeft = document.all[ 'WFFunctionMenu' ].offsetLeft
				menuTop = document.all[ 'WFFunctionMenu' ].offsetTop
			}
		
			if ( document.body.scrollLeft == 0 )
			{
				if ( ( IE4 ) && ( document.body.scrollTop > menuTop ) )
				{
					x = e.clientX - menuLeft + parseInt( document.body.topMargin )
				}
				else
				{
					x = e.clientX - menuLeft
				}
			}
			else
			{
				if ( document.body.scrollLeft > menuLeft )
				{
					if ( IE4 )
						x = e.clientX + menuLeft
					else
						x = e.clientX + parseInt( document.body.leftMargin )
				}
				else
				{
					x = e.clientX + document.body.scrollLeft - menuLeft
				}
			}

			if ( document.body.scrollTop == 0 )
			{
				y = e.clientY - menuTop
			}
			else
			{
				if ( document.body.scrollTop > menuTop )
				{
 					if ( IE4 )
 						y = e.clientY + menuTop - parseInt( document.body.topMargin )
  					else
 						y = e.clientY + menuTop + parseInt( document.body.topMargin )
				}
				else
				{
					y = e.clientY + ( document.body.scrollTop - menuTop )
				}
			}
		}

		if ( NS4 && ( HP || Sun ) )
			wfFunctionMenu = window.document.outerLayerNS.document.innerLayerNS.document.applets.WFFunctionMenu
		else
			wfFunctionMenu = window.document.applets.WFFunctionMenu
			
		//window.status = y + " clientY=" + e.clientY  + " screenY=" + e.screenY + " scrollTop=" + document.body.scrollTop + " clientHeight=" + document.body.clientHeight + " menuTop=" + menuTop
	}

	function onLoadWFFunctionMenu( argMenuGif, argMenuWaitGif )
	{
		pageLoaded = true

		if ( NS4 && ( HP || Sun ) )
		{
			with (window.document.outerLayerNS.document.innerLayerNS.document)
			{
	      		open();
	 			write( '&nbsp;<APPLET NAME="WFFunctionMenu" CODEBASE="' + wfFunctionMenuPath + '" CODE="com.opentext.applet.FunctionMenu" ARCHIVE="llheader.jar" WIDTH="1" HEIGHT="1" MAYSCRIPT>' )
		    	write( '<PARAM NAME="cabbase" VALUE="llheader.cab">' )
		    	write( '<PARAM NAME="callback" VALUE="wfpopup_callback">' )
				write( '<PARAM NAME="functionsURL" VALUE="' + wfFunctionMenuURL + '">' )
				write( '<PARAM NAME="nextURL" VALUE="' + escape( window.location ) + '">' )			
				write( '</APPLET>' )
	      		close();
	    	}
   		}
  
	    wfMenuGIF = argMenuGif
	    wfMenuWaitGIF = argMenuWaitGif
	    
	    var waitImg = new Image()
	    waitImg.src = wfMenuWaitGIF									
	}

    function wfpopup_callback( theURL, theTarget )
    {
	    if ( !pageLoaded )
	    {
	    	return
	    }

		if ( __LeavePage == "" || ( eval( __LeavePage + "( '" + theURL + "', '" + theTarget + "')" ) ) )
		{
		    if ( -1 == theURL.indexOf( 'objAction=delete' ) )
		    {
				if ( IE && ( theURL.indexOf( 'objAction=download' ) > 0 || theURL.indexOf( 'func=doc.Fetch' ) > 0 ) )
				{
					var kludgeWindow = window.open( '', '', 'width=1,height=1,top=0,left=0' )
					kludgeWindow.close();
				}
	            openURL( theURL, theTarget )
		    }
		    else
		    {
		        if ( confirm( wfMenuDeleteMsg ) )
		        {
		            openURL( theURL, theTarget )
		        }
	        }
		}
    }
