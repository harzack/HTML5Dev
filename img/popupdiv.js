//-------------------------------------------------------------------------------------------------------------
	// Popup utility
	//
	// getPageSize()
	// Returns array with page width, height and window width, height
	// Core code from - quirksmode.org
	// Edit for Firefox by pHaez
	//
	function getPageSize()
	{

		var 	xScroll;
		var 	yScroll;

		if ( window.innerHeight && window.scrollMaxY )
		{
			xScroll = document.body.scrollWidth;
			yScroll = window.innerHeight + window.scrollMaxY;
		}
		else if (document.body.scrollHeight > document.body.offsetHeight)
		{ // all but Explorer Mac
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		}
		else
		{ // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}

		var windowWidth, windowHeight;
		if (self.innerHeight)
		{	// all except Explorer
			windowWidth = self.innerWidth;
			windowHeight = self.innerHeight;
		}
		else if (document.documentElement && document.documentElement.clientHeight)
		{ // Explorer 6 Strict Mode
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		}
		else if (document.body)
		{ // other Explorers
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}

		// for small pages with total height less then height of the viewport
		if (yScroll < windowHeight)
		{
			pageHeight = windowHeight;
		}
		else
		{
			pageHeight = yScroll;
		}

		// for small pages with total width less then width of the viewport
		if ( xScroll < windowWidth )
		{
			pageWidth = windowWidth;
		}
		else
		{
			pageWidth = xScroll;
		}

		arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight,xScroll,yScroll);

		return arrayPageSize;
	}

	// preload the 'busy' image
	var 	popupBak;
	var 	popupMsg;
	var 	popupTimer;
	var 	theProgressDiv;

	var 	iebody = (document.compatMode && document.compatMode !== "BackCompat")? document.documentElement : document.body;
	var 	progessImg = new Image();

	function initPopup( imgSrc, imgName )
	{
		var theProgressDivStyle;

		theProgressDiv = document.getElementById("progressPopupDiv");

		if ( null !== theProgressDiv )
		{
			theProgressDivStyle = theProgressDiv.style;
			theProgressDivStyle.visibility="visible";
			theProgressDivStyle.display="none";

			// Load up the progress gif.
			
			if ( null == imgName )
			{
				imgName = "circleECM_ProgMeter40x40.gif"
			}
			
			progessImg.src= imgSrc + imgName;
		}
	}

	function popup( msg, bak, delay )
	{
		popupMsg = msg;
		popupBak = bak;
		
		if ( null == delay )
		{
			delay = 1000;
		}
		

		this.popupTimer = setTimeout( "showTimeredPopup()", delay );
	}

	function showTimeredPopup()
	{
		var content;
		var theProgressDivStyle;

		var addButton = document.getElementById( "Add" )
		var arrayPageSize = getPageSize();
		// need to take the scroll into account
		var dsocleft = document.all? iebody.scrollLeft : pageXOffset;
		var dsoctop = document.all? iebody.scrollTop : pageYOffset;

		if ( 0 === popupMsg.length )
		{
			return;
		}
		this.popupTimer = null;

		content = "<TABLE WIDTH='150' BORDER='1' BORDERCOLOR='black' CELLPADDING='2' CELLSPACING='0' BGCOLOR='" + popupBak + "'>";
		content = content + "<TR>";
		content = content + "	<TD>";
		content = content + "		<TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0' WIDTH='100%'>";
		content = content + "			<TR>";
		content = content + "				<TD VALIGN='MIDDLE'><IMG SRC='' ID='prgImg' ALT='' BORDER='0'></TD><TD valign='middle' nowrap>&nbsp;<FONT COLOR='black' SIZE='2'>&nbsp;" + popupMsg + "&nbsp;</FONT></TD>";
		content = content + "			</TR>";
		content = content + "		</TABLE>";
		content = content + "	</TD>";
		content = content + "</TR>";
		content = content + "</TABLE>";

		// populate the Cells
		theProgressDiv = document.getElementById( "progressPopupDiv" );
		
		
		theProgressDiv.innerHTML = content;

		var theProgressImg=document.getElementById( "prgImg" );
		theProgressImg.src = progessImg.src;

		theProgressDivStyle = theProgressDiv.style;
	 	theProgressDivStyle.display = "";
		
		if ( addButton ) 
		{
			theProgressDivStyle.top = (this.getY( addButton )) + 'px';
			theProgressDivStyle.left = (this.getX( addButton ) - 20) + 'px';
		}
		else
		{
			theProgressDivStyle.top = ( Math.round( ( ( arrayPageSize[3] - 35 ) / 2 ) + dsoctop ) + 'px' );
			theProgressDivStyle.left = ( Math.round( ( ( arrayPageSize[2] - 221 ) / 2 ) + dsocleft ) + 'px' ) ;
		}
		
		
	}

	function killPopup()
	{
		var theProgressDivStyle;

		popupMsg = "";
		popupBak = "";

		if ( null !== this.popupTimer )
		{
			clearTimeout( this.popupTimer );
			this.popupTimer = null;
		}

		theProgressDiv = document.getElementById("progressPopupDiv");
		if ( null !== theProgressDiv )
		{
			theProgressDivStyle = theProgressDiv.style;
			theProgressDivStyle.display = "none";
		}
		theProgressDiv.innerHTML = null;
	}
