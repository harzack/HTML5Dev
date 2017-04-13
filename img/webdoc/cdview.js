//
// 	File: webdoc/cdview.js
//
//	Description: This is a support js file for browse pages.  The related browse page is webdoc/cdview.html.
//
//	
	
	var c;
	var currentViewType = '2';
	var bv_alertMsg;
	var bv_viewLastVar;
	var imgSrc;
	var baseUrl;

	function setCurrentType( currentViewTypeStr )
	{
		updateViewType( currentViewTypeStr )
	}

	function setAlertMsg( alertMsgStr )
	{
		bv_alertMsg = alertMsgStr;
	}

	function setDataID ( dataID )
	{
		bv_dataID = dataID;
	}

	function setViewLastVar( viewLastVar )
	{
		bv_viewLastVar = viewLastVar;
	}
	
	function setImgSrc ( imgSrcStr )
	{
		imgSrc = imgSrcStr;
	}
	
	function setBaseUrl ( baseUrlStr )
	{
		baseUrl  = baseUrlStr;
	}
	
	function doSubmit( s, action )
	{
		len = document.BrowseViewFrm.elements.length
		var cnt = 0;
		var j

		for ( var i = 0; i < len; i++ )
		{
			if ( document.BrowseViewFrm.elements[ i ].checked && document.BrowseViewFrm.elements[ i ].value != 'checkbox' )
			{
				cnt++;
				j = i;
				if ( cnt > 1 )
				{
					break;
				}
			}
		}

		if ( cnt != 0 )
		{
			if ( cnt > 1 )
			{
				document.BrowseViewFrm.func.value = s;

				document.BrowseViewFrm.submit();
			}
			else
  			{
				document.BrowseViewFrm.func.value = "ll";
				document.BrowseViewFrm.objAction.value =  action;
				document.BrowseViewFrm.objId.value = document.BrowseViewFrm.elements[ j ].value

				document.BrowseViewFrm.submit();
			}
		}
		else
		{
			alert( bv_alertMsg );
		}
	}

	function doSubmit2( action, type )
	{
		if( action == "Edit" )
		{
			document.BrowseViewFrm.objAction.value = "editconfig";
			document.BrowseViewFrm.nextUrl.value =  document.BrowseViewFrm.nextUrl.value + "&viewType=" +  currentViewType;
		}
		else
		{
			document.BrowseViewFrm.objAction.value = "browse";
		}
		
		currentViewType = type;
		
		document.BrowseViewFrm.func.value = "ll";
		document.BrowseViewFrm.viewType.value = type;
		document.BrowseViewFrm.objId.value = bv_dataID;
		document.BrowseViewFrm.submit();
	}

	function doSubmitTab( tabName )
	{
		document.BrowseViewFrm.viewTab.value = tabName

		doSubmit2( '', bv_viewLastVar )
	}
	
	function updateViewType( newType )
	{
		var	theViewIcon;
		var	theViewIconName;
		var imgsrcsel;
		var imgsrc;

		var changed = false;

		try
		{
			if ( newType !== currentViewType )
			{
				// indictate that the ViewType changed.  This will allow the featured items to be updated as well
				changed = true;
				// this is to clear the existing selected icon, back to the original
				if ( currentViewType === '1' )
				{
					theViewIconName = "BV_ViewDetailIcon";
				}
				if ( currentViewType === '2' )
				{
					theViewIconName = "BV_ViewLargeIcon";
				}
				if ( currentViewType === '3' )
				{
					theViewIconName = "BV_ViewSmallIcon";
				}

				theViewIcon = document.getElementById( theViewIconName );
				if ( theViewIcon !== null )
				{
					// try and set the image back to the default
					imgsrcsel = theViewIcon.getAttribute( 'SI' ) ;

					if ( imgsrcsel !== undefined )
					{
						imgsrc = theViewIcon.src;
						theViewIcon.src = imgSrc + imgsrcsel;
					}
				}

				// Set the viewType for the small icons view
				currentViewType = newType;

				// then a server update will be needed
				UpdateViewTypeToServer( currentViewType );
			}
			
			if ( currentViewType === '1' )
			{
				theViewIconName = "BV_ViewDetailIcon";
			}
			else if ( currentViewType === '2' )
			{
				theViewIconName = "BV_ViewLargeIcon";
			}
			else if ( currentViewType === '3' )
			{
				theViewIconName = "BV_ViewSmallIcon";
			}
			else
			{
				theViewIconName = null;
			}	

			// This is to swap the icons of the current view icons
			// to the selected version stored in the feature
			theViewIcon = document.getElementById( theViewIconName );
			if ( theViewIcon !== null )
			{
				imgsrcsel = theViewIcon.getAttribute( 'SS' ) ;
				if ( imgsrcsel !== null )
				{
					imgsrc = theViewIcon.src;
					theViewIcon.src = imgSrc + imgsrcsel;
				}
			}
		}
		catch(e)
		{
			exceptionAlert( e, "Issue occured in cdview.js/updateViewType.  An issue has occured in updating the browse view type." );
			changed = false;
		}

		return changed;
	}
	
	function UpdateViewTypeToServer( newValue )
	{
		var url = baseUrl + "?func=ll.UpdateViewType&saveViewType=1&viewType=" + newValue + "&noGUI=true";

		OTsendHTTPGetAjaxRequest( url );
	}

	$(document).ready(function() {
		// enable hover behaviour on browse table <tr>
		$("tr.browseRow1, tr.browseRow2").hover(function() {
			$(this).addClass("browseRowHover");
		}, function() {
			$(this).removeClass("browseRowHover");
		});
	});