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

			w = Math.round($(document).width());
			h = Math.round($(document).height());

			if ( h < 0 )
			{
				// put in a fixed height
				h = 500;
			}

			if ( w < 0 )
			{
				// put in a fixed width
				w = 970;
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


	// turn off Custom Search GUI components
	try {

		// put a hidden element to indicate this custom view search
		$("#searchFrm").append('<input type="hidden" name="eccustomview" value="yes" />');
													
		// Hide search form selection bar
		$(".searchPromptFormTitleBar").hide();
					
		// Hide button bar buttons
		$("#simpleSearchButtonBar").hide();

		// need this when there is only one custom view search
		$(".simpleSearchButtonBar").hide();
	
	} catch (err) {

	}

	if ( ngdOldLoadFunc != null && typeof ngdOldLoadFunc == "function" )
	{	
		ngdOldLoadFunc(str);
	}
}
