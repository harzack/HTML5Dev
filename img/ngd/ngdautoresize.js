//in case it's not defined

var ngdOldLoadFunc = null;

if ( typeof onLoadFunc == "function" )
{
	ngdOldLoadFunc = onLoadFunc;
} 

var ngdResizer = {
	"tlobj": null,
	"brobj": null,
	"brobjx": null,
	"brobjy": null,
	"szok": true,
	"hoffset": 0,
	"usemaxw" : false,
	"handling": {
		"TABLE": true,
		"TBODY": true,
		"TR": true,
		"/TR": true,
		"TD": true,
		"/TD": true,
		"IMG": true,
		"FORM": true,
		"SCRIPT": false,
		"DIV": true,
		"!": false,
		"INPUT": false,
		"LABEL": false
	},
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
	
	"scanback" : function(parel) {

		if (!this.szok)
			return true;
		if (parel.tagName=="IMG" && parel.src.indexOf('block-shadow-bottom-right.gif') >= 0) {
			this.brobj=parel;
			return true
		}
		var col=parel.children
		for (var i=col.length-1;i>=0;i--) {
			var el=col[i];
			var t=this.handling[el.tagName];
			
			if (t==true) {
				if (this.scanback(el))
					return true;
			} else if (t!=false) {
				//this.szok=false;
				//return true;
			}
		}
		return false;
	},
	"scanfwd" : function(parel) {
		if (!this.szok)
			return true;
		if ((parel.tagName=="IMG")||(parel.tagName=="TD" && (parel.id == "LLOuterContainer" || parel.className == "tblBackground"))) {
			this.tlobj=parel;
			return true
		}
		var col=parel.children
		for (var i=0;i<col.length;i++) {
			var el=col[i];
			var t=this.handling[el.tagName];
			if (t==true) {
				if (this.scanfwd(el))
					return true;
			} else if (t!=false) {
				this.szok=false;
				return true;
			}
		}
		return false;
	},
	
	"scan" : function() {
		var col=document.body.children;
		var el=null;
		var t;
		for (var i=0;i<col.length;i++) {
			t=col[i];
			if (t.tagName == "TABLE" && t.className=="pageBody") {
				el=t;
				break;
			}
		}
		if (el==null)
			return false;

		var x=document.getElementsByTagName("IMG");
		var bHasBottomRightImg = false;

		for (var i=x.length-1;i>=0;i--) {
			t=x[i];

			if (!bHasBottomRightImg && t.tagName=="IMG" && t.src.indexOf('block-shadow-bottom-right.gif') >= 0) 
			{
				bHasBottomRightImg = true;
			}

			if (t.tagName=="IMG") {
				//alert('image id ' + t.id);
				//alert('y='+this.getElY(t));
				this.brobj = t;
				//break
				
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

		this.tlobj=document.getElementById("LLOuterContainer");
		if (this.tlobj == null)
		{
			this.tlobj=document.getElementById("LLInnerContainer");
		}

		// paging stuff, so we need some vertical padding
		if (!isCompoundEmailItem && document.getElementById("MainOperationTable") != null)
		{
			this.hoffset = 110;
		}
		else
		{
			this.hoffset = 40;
		}
			
		if (!bHasBottomRightImg)
		{
			this.usemaxw = true;
		}
		return (this.szok && this.tlobj && this.brobjx && this.brobjy);
	}
	
};

onLoadFunc = function(str) {
	var ngd=ngdResizer;

	if ( isCompoundEmailItem )
	{
		// Turn off Featured Items and the mult-ioperation bar
		// TODO: LL971
		try
		{
			$("#featuredItems").hide();
			$("#MultiOperationBar1").hide();
		}
		catch (err)
		{
		}
	}

	if (ngd.scan()) {
		var w=ngd.brobjx.offsetWidth+ngd.getElX(ngd.brobjx)-ngd.getElX(ngd.tlobj);

		// set a min width
		if (w<540)
		{
			w = 540
		}

		// use max width
		if (ngd.usemaxw)
		{
			w = 800
		}

		if (window.external == null || typeof(window.external.ResizeWindow)=="undefined") {

			//window.resizeBy(w-document.body.clientWidth,	0);
			var h=ngd.brobjy.offsetHeight+ngd.getElY(ngd.brobjy)-ngd.getElY(ngd.tlobj);

			// set a min height
			if (h < 200)
			{
				h = 200
			}

			// set max height for collect items dialog
			if ( isCollectItems && h > 450)
			{
				h = 450
			}

			window.resizeBy(w-document.body.clientWidth,	h - document.body.clientHeight+ngd.hoffset);

		} else {

			//window.external.ResizeWindow(w+20,document.body.clientHeight);
			var h=ngd.brobjy.offsetHeight+ngd.getElY(ngd.brobjy)-ngd.getElY(ngd.tlobj);

			// set a min height
			if (h < 200)
			{
				h = 200
			}

			// set max height for collect items dialog
			if ( isCollectItems && h > 450)
			{
				h = 450
			}

			window.external.ResizeWindow(w+20+20,h+ngd.hoffset);

		}
	}
	
	if ( ngdOldLoadFunc != null && typeof ngdOldLoadFunc == "function" )
	{	
		ngdOldLoadFunc(str);
	}
}
