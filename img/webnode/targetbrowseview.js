
	//
	//	Javascript file used in the targetbrowse feature
	//

	var imgSrc = "";


	function setImgSrc ( imgSrcStr )
	{
		imgSrc = imgSrcStr;
	}


	function colourCell( obj )
	{
		obj.origColor=obj.style.backgroundColor;
		obj.style.backgroundColor = '#E2EBF3';
		obj.style.cursor = "pointer";
		obj.style.border = "solid 1px #A9B7C6";
	}

	function clearCell( obj, clearBorder )
	{
		obj.style.backgroundColor=obj.origColor;
		obj.style.cursor = "default";

		if ( true == clearBorder )
		{
			obj.style.border = "solid 1px #F5F5F5";
		}
	}

	function imageCell( obj, imageName, idName, usePointer )
	{

		var imgRef = document.getElementById( idName );

		if ( null != imgRef )
		{
			imgRef.src = imgSrc + imageName;
		}

		if ( true == usePointer )
		{
			obj.style.cursor = "pointer";
		}
		else
		{
			obj.style.cursor = "default";
		}
	}

	function gotoPage( pageNum )
	{
		return goToTargetBrowseURLPage( currentUrl, pageNum );
	}

	function flipPagePick()
	{
		var theActPick=document.getElementById('acitvatePickDiv' );
		var theBrowsePick=document.getElementById('browsePickDiv');
		if ( null != theActPick )
		{
			theDivStyle = theActPick.style;
			theDivStyle.visibility="hidden";
			theDivStyle.display="none";

			theDivStyle = theBrowsePick.style;
			theDivStyle.visibility="visible";
			theDivStyle.display="block";
		}
	}

	// Test for an input field enter key stroke
	function browsePageNumEnter( theForm, e )
	{
		// IE passes the char in event.keyCode, Mozilla in event.which
		if ( !e )
		{
			e = window.event;
		}

		var c = ( e.charCode ) ? e.charCode : ( ( e.which ) ? e.which : e.keyCode );

		if ( c == 13 || c == 3 )
		{
			var 	pickPageEdit = document.getElementById( 'pagePickEdit' );

			if ( pickPageEdit != null )
			{
				var pageNum = parseInt( pickPageEdit.value, 10 );
				if ( !pickPageEdit.value.isNumber() )
				{
					return false;
				}
				else if ( pageNum > totalPages )
				{
					pageNum = totalPages;
				}
				else if ( pageNum <= 0 )
				{
					pageNum = 1;
				}

				if (e && e.preventDefault)
				{
					e.preventDefault(); // DOM style
				}
				gotoPage( pageNum  );

				return false;
			}
		}
	}
