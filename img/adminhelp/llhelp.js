// Conditional Text Functions
function HideModuleText()
{
	HideModuleDivs( "span" );
	HideModuleDivs( "div" );
}

function HideModuleDivs( whatTag )
{
	var MyDivs = document.body.getElementsByTagName( whatTag );

	// Loop over all the divs; this must be done in reverse order, because some divs might be
	// removed, and the MyDivs array actually changes (compresses) when a div is removed.
	for ( var i = MyDivs.length-1; i >= 0; i-- )
	{
		var div = MyDivs[i];

		var module_id = div.getAttribute("otModule");
		var module_id_hide = div.getAttribute("otModuleHide");

		// Check for the otModule attribute - ignore the DIV if it is null
		if ( module_id != null )
		{
			if ( typeof( module_id ) == "string" && module_id.length > 0 )
			{
				if ( parent.otmodules[ module_id ] == null )
				{
					// Since this div had a module id specified, but the
					// module is not installed, don't display this div.

					hideDiv( div );
				}
			}
		}

		// Check for the otModuleHide attribute - ignore the DIV if it is null
		if ( module_id_hide != null )
		{
			if ( typeof( module_id_hide ) == "string" && module_id_hide.length > 0 )
			{

				if ( parent.otmodules[ module_id_hide ] != null )
				{
					// Since this div had a module id hide specified and the
					// module is installed, don't display this div.

					hideDiv( div );
				}
			}
		}
	}
}

function hideDiv( div )
{
	// Setting outerHTML removes the content and tag.
	// Setting innerHTML removes the content, but not the tag.
	//      If the tag is not removed or hidden, it may cause page breaks.
	// Setting style.display & style.visibility hides the tag and content, but does not remove the content.
	//      If the content is not removed, select & copy from the page copies the hidden text.


	if ( eval( 'div.outerHTML' ) )
	{
		// Remove the tag and all content.
		div.outerHTML = "";
	}
	else
	{
		// Remove the content.
		div.innerHTML = "";

		if ( eval( 'div.style' ) )
		{
			// Hide the tag, since we could not make it go away.
			div.style.display = "none";
			div.style.visibility = "hidden";
		}
	}
}

NS4 = (document.layers);
IE4 = (document.all);
ver4 = (NS4 || IE4);
isMac = (navigator.appVersion.indexOf("Mac") != -1);
if (!ver4){event=null;}

//
// Constructor for AdminHeaderTab
//
function AdminHeaderTab( whichTab, link )
{
	this.tabLabel = whichTab;
	this.tabLink = link;
}

//
// Constructor for AdminHeader
//
function AdminHeader( imagePath )
{
	if ( imagePath == null )
	{
		this.imagePath = '../../images/';
	}
	else
	{
		this.imagePath = imagePath;
	}

	this.mastheadImage = 'icon_help.gif';
	this.title1 = '';
	this.title2 = '';
	this.tabs = new Array();
	this.tabCount = 0;
}

//
// addTab method for AdminHeader
//
function AdminHeader_addTab( whichTab, link )
{
	this.tabs[ this.tabCount++ ] = new AdminHeaderTab( whichTab, link );
}

//
// AdminHeader tabs (translate these strings for other languages)
//

AdminHeader.PROCEDURES = "Procedure";
AdminHeader.BACKGROUND = "Background Info";
AdminHeader.RELATED = "Related Topics";
var headNode = document.getElementsByTagName("head")[0];

//
// draw method for AdminHeader
//
function AdminHeader_draw()
{
	var		s = "";
	var		t = "";
	var		vers = "";
	var 	menuBar = false;
	var		menuNo = 0;

	if ( document.layers )
		{
			vers = "NS";
		}

	// Figure out the tabs first

	for ( i = 0; i < this.tabs.length; i++ )
	{
		oneTab = this.tabs[ i ];

		if ( oneTab.tabLink == '' )
		{
			// This is the selected tab

			if ( this.title2.length == 0 )
			{
				this.title2 = oneTab.tabLabel;
			}

			fontStyle = '';
			tabLabel = '<TD ROWSPAN="2"><IMG SRC="' + this.imagePath + 'top-menu-divider.gif" ALT="" WIDTH="2" HEIGHT="27" BORDER="0"></td><TD HEIGHT="24" CLASS="currentView"><B>' + '&nbsp;' + oneTab.tabLabel + '&nbsp;&nbsp;' + '</B></TD>';
			menuBar = true;
			menuNo += 1;
		}

		else if ( oneTab.tabLink == 'none' )
		{
			// This is an unavailable tab

			tabLabel = '';
		}

		else
		{
			// This is a linked tab
			tabLabel = '<TD ROWSPAN="2"><IMG SRC="' + this.imagePath + 'top-menu-divider.gif" ALT="" WIDTH="2" HEIGHT="27" BORDER="0"></td><TD HEIGHT="24"><B>' + '&nbsp;<A HREF="' + oneTab.tabLink + '" CLASS="small">' + oneTab.tabLabel + '</A>&nbsp;&nbsp;' + '</B></TD>';
			menuBar = true;
			menuNo += 1;
		}

		t += tabLabel;

	}

	// Draw the masthead
	s += '<A NAME="top"></A>';
	s += '<div id="help-header" class="csx"></div>';
	s += '<TABLE BGCOLOR="#ffffff" HEIGHT="100%" WIDTH="100%" BORDER="0" CELLPADDING="10" CELLSPACING="0">';

	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = '../../../' + 'style/screen.css';
	cssNode.media = 'screen';
	cssNode.title = 'default';
	headNode.appendChild(cssNode);

	var cssNodeHelp = document.createElement('link');
	cssNodeHelp.type = 'text/css';
	cssNodeHelp.rel = 'stylesheet';
	cssNodeHelp.href = '../../' + 'style/help.css';
	cssNodeHelp.media = 'screen';
	cssNodeHelp.title = 'default';
	headNode.appendChild(cssNodeHelp);

	if ( menuBar )
	{
		s += '<TR><TD>';
		s += '<TABLE WIDTH="100%" BORDER="0" CELLPADDING="0" CELLSPACING="0" BGCOLOR="#e9e9e9">';
		s += '<TR VALIGN="top">';
		s += '<TD WIDTH="100%">';
		s += '<TABLE WIDTH="100%" BORDER="0" CELLPADDING="0" CELLSPACING="0" BACKGROUND="' + this.imagePath + 'top-menu-fon.gif">';
		s += '<TR><TD><IMG SRC="' + this.imagePath + 'left2.gif" ALT="" WIDTH="2" HEIGHT="24" BORDER="0"></TD>';
		s += '<TD><IMG SRC="' + this.imagePath + 'px.gif" ALT="" WIDTH="1" HEIGHT="24" BORDER="0"></TD></TR>';
		s += '<TR><TD BACKGROUND="' + this.imagePath + 'top-menu-shadow.gif"><IMG SRC="' + this.imagePath + 'left3.gif" ALT="" WIDTH="2" HEIGHT="3" BORDER="0"></TD>';
		s += '<TD BACKGROUND="' + this.imagePath + 'top-menu-shadow.gif"><IMG SRC="' + this.imagePath + 'px.gif" ALT="" WIDTH="115" HEIGHT="3" BORDER="0"></TD>';
		s += '</TR>';
		s += '</TABLE>';
		s += '</TD>';
		s += '<TD WIDTH="469" VALIGN="top">';
		s += '<TABLE WIDTH="100%" BORDER="0" CELLPADDING="0" CELLSPACING="0">';
		s += '<TR><TD width="469" COLSPAN="8">';
		s += '<TABLE WIDTH="100%" BORDER="0" CELLPADDING="0" CELLSPACING="0" BACKGROUND="' + this.imagePath + 'top-menu-fon.gif"><TR>';
		s += t;
		s += '</TR>';
		s += '<TR>';

		for ( i = 0; i < menuNo; i++ )
		{
			s += '<TD BACKGROUND="' + this.imagePath + 'top-menu-shadow.gif"><IMG SRC="' + this.imagePath + 'px.gif" ALT="" WIDTH="115" HEIGHT="3" BORDER="0"></TD>';
		}

		s += '</TR>';
		s += '</TABLE>';
		s += '</TD>';
		s += '</TR>';
		s += '</TABLE>';
		s += '</TD>';
		s += '</TR>';
		s += '</TABLE>';

		s += '</TD></TR>';
	}

	s += '</TD></TR>';
	s += '<TR><TD HEIGHT="100%" VALIGN="TOP">';
	s += '<TABLE WIDTH="100%" CELLPADDING="15" CELLSPACING="0" BORDER="0">';
 	s += '<TR><TABLE WIDTH="100%" CELLPADDING="1" CELLSPACING="0" BORDER="0"><TR><TD VALIGN="top" NOWRAP="TRUE"><IMG SRC="../../../style/images/app_opentext_documentation32_b24.png" ALT="" WIDTH="32" HEIGHT="32" BORDER="0"></TD>';
 	s += '<TD WIDTH="100%"><div class="helpTitle1">' + this.title1 + '</div><div class="helpTitle2">' + this.title2 + '</div></TD></TR></TABLE>';

	document.write( s );
}
//
// Translations
//
// Array of JavaScript files related to translations.
// 'help_en_US.js' has the translations for help area.
// 'help_footer_content.js' creates translated content for the footer.
var jsFiles = ['../../../global.js', '../../help_en_US.js', '../../help_footer_content.js'];
var scriptCount = 0;
var browser = navigator.userAgent;
//
// Create <script> nodes for translation related files.
//
function CreateScriptNode() {
    if (scriptCount < jsFiles.length) {
        var script = jsFiles[scriptCount];
        // New <script> node created for each file in 'jsFiles' Array
        var scriptNode = document.createElement('script');
        scriptNode.setAttribute('type', 'text/javascript');
        scriptNode.setAttribute('src', script);
        scriptNode.setAttribute('onload', 'CreateScriptNode()');
        headNode.appendChild(scriptNode);
        // 'onload' needs to be 'onreadystatechange' for IE
        if (browser.match("MSIE") != null) {
            scriptNode.onreadystatechange = function() {
                if (this.readyState == 'loaded' || this.readyState == 'complete') {
                    CreateScriptNode();
                }
            }
        }
    }
    scriptCount++;
};
//
// Create a prototype for AdminHeader
//
new AdminHeader();
AdminHeader.prototype.draw = AdminHeader_draw;
AdminHeader.prototype.addTab = AdminHeader_addTab;

//
// Constructor for AdminFooter
//
function AdminFooter( imagePath )
{
	if ( imagePath == null )
	{
		this.imagePath = '../../images/';
	}
	else
	{
		this.imagePath = imagePath;
	}
}

//
// draw method for AdminFooter
//
function AdminFooter_draw(copyPath)
{
	var		s = "";
	if (!copyPath)
	{
		copyPath = '../root/';
	}
	// Translate these strings for other languages...
	//var copyrightLabel = String.formatLoc('Copyright');
	s += '<p class="body"></p>';
	s += '</TD></TR></TABLE></TD></TR><TR><TD VALIGN="BOTTOM">';
	// Footer START
	s += '<div id="footer" class="csx">'
	s += '</div>'
	// Footer END
	s += '</TD>';
	s += '</TR>';
	s += '</TABLE>';
	document.write(s);
	// Create <script> nodes for translation related JavaScript
	CreateScriptNode();
}

//
// Create a prototype for AdminFooter
//
new AdminFooter();
AdminFooter.prototype.draw = AdminFooter_draw;

//
// Insert a separator
//
function insertSeparator( imagePath )
{
	if ( imagePath == null )
	{
		this.imagePath = '../images/';
	}
	else
	{
		this.imagePath = imagePath;
	}
	document.write( '<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">' );
	document.write( '<TR>' );
	document.write( '<TD VALIGN="bottom">&nbsp;</TD>' );
	document.write( '</TR>' );
	document.write( '<TR>' );
	document.write( '<TD BGCOLOR="#5F779E"><IMG alt="" title="" height="2" src="' + this.imagePath + 'spacer.gif" width="2"></TD>' );
	document.write( '</TR>' );
	document.write( '<TR>' );
	document.write( '<TD>&nbsp;</TD>' );
	document.write( '</TR>' );
	document.write( '</TABLE>' );
}

//
// Insert a top-of-page separator
//
function insertTopSeparator( imagePath )
{
	var		topAltText = 'Top';

	if ( imagePath == null )
	{
		this.imagePath = '../../images/';
	}
	else
	{
		this.imagePath = imagePath;
	}
	document.write( '<table border="0" cellpadding="0"  width="100%" bgcolor="">' );
	document.write( '<tr>' );
	document.write( '<td width="99%" align="left" valign="top">' );
	document.write( '<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">' );
	document.write( '<TR>' );
	document.write( '<TD VALIGN="bottom">&nbsp;</TD>' );
	document.write( '</TR>' );
	document.write( '<TR>' );
	document.write( '<TD BGCOLOR="#5F779E"><IMG alt="" title="" height="2" src="' + this.imagePath + 'spacer.gif" width="2"></TD>' );
	document.write( '</TR>' );
	document.write( '<TR>' );
	document.write( '<TD>&nbsp;</TD>' );
	document.write( '</TR>' );
	document.write( '</TABLE>' );
	document.write( '<td><a href="#Top"><img src="' + this.imagePath + 'arrowup2.gif" width=15 height=16 alt="Top" title="Top" border="0"></a></td>' );
	document.write( '</tr>' );
	document.write( '</table>' );
}

//THIS IS THE FUNCTION FOR OPENING THE NOTES WINDOW

function noteWin()
{
	var noteDataShow = '<FONT FACE="Arial, Helvetica, sans-serif" size="2">'+noteData+'</FONT>';
	var w;
	w = window.open( "","notes","width=200,height=200,resizable=yes,menubar=no,scrollbars=auto,toolbar=no");
	w.document.open();
	with (w.document)
{
	write( noteTop + noteDataShow + noteBot );
}
	w.document.close();
	if ( w.focus )
	{
		w.focus();
	}
}

function noteWin2()
{
	var noteDataShow = '<FONT FACE="Arial, Helvetica, sans-serif" size="2">'+noteData2+'</FONT>';
	var w;
	w = window.open( "","notes","width=200,height=200,resizable=yes,menubar=no,scrollbars=auto,toolbar=no");
	w.document.open();
	with (w.document)
{
	write( noteTop + noteDataShow + noteBot );
}
	w.document.close();
	if ( w.focus )
	{
		w.focus();
	}
}

function noteWin3()
{
	var noteDataShow = '<FONT FACE="Arial, Helvetica, sans-serif" size="2">'+noteData3+'</FONT>';
	var w;
	w = window.open( "","notes","width=200,height=200,resizable=yes,menubar=no,scrollbars=auto,toolbar=no");
	w.document.open();
	with (w.document)
{
	write( noteTop + noteDataShow + noteBot );
}
	w.document.close();
	if ( w.focus )
	{
		w.focus();
	}
}

function noteWin4()
{
	var noteDataShow = '<FONT FACE="Arial, Helvetica, sans-serif" size="2">'+noteData4+'</FONT>';
	var w;
	w = window.open( "","notes","width=200,height=200,resizable=yes,menubar=no,scrollbars=auto,toolbar=no");
	w.document.open();
	with (w.document)
{
	write( noteTop + noteDataShow + noteBot );
}
	w.document.close();
	if ( w.focus )
	{
		w.focus();
	}
}


//THIS IS THE STRING FOR THE TOP HALF OF THE NOTE WINDOW
noteTop ='<HTML><HEAD><TITLE>Note</TITLE></HEAD>';
noteTop+='<BODY BGCOLOR="#FFFFCC" TOPMARGIN="0" LEFTMARGIN="0" MARGINWIDTH="0" MARGINHEIGHT="0" RIGHTMARGIN="0" link="#003366" alink="#3300FF" vlink="#660033">';
noteTop+='<TABLE WIDTH="100%" BORDER="0" CELLSPACING="0" CELLPADDING="0" HEIGHT="100%">';
noteTop+='<TR><TD VALIGN="top">';
noteTop+='<TABLE WIDTH="100%" BORDER="0" CELLSPACING="0" CELLPADDING="2"><TR>';
noteTop+='<TD ALIGN="CENTER"><B><FONT FACE="Arial, Helvetica, sans-serif" COLOR="#333300"><IMG SRC="../images/note.gif" ALT="" WIDTH="18" HEIGHT="16">&nbsp;NOTE:</FONT></B></TD>';
noteTop+='</TR><TR><TD>';

//THIS IS THE STRING FOR THE BOTTOM HALF OF THE NOTE WINDOW
noteBot ='<BR><BR></TD></TR></TABLE></TD></TR><TR VALIGN="BOTTOM"><TD>';
noteBot+='<TABLE WIDTH="100%" BORDER="0" CELLSPACING="0" CELLPADDING="2"><TR VALIGN="TOP">';
noteBot+='<TD ALIGN="CENTER"><FONT SIZE="2" FACE="Arial, Helvetica, sans-serif"><A HREF="#" onClick="window.close()">close</A></FONT></TD>';
noteBot+='</TR></TABLE></TD></TR></TABLE></BODY></HTML>';

//navigation aids

// NO NEED TO CHANGE ANYTHING BELOW HERE

if (document.images)
{
	arImLoadB = new Array ( "left_over", "right_over" );
	arImListB = new Array ();
	for (counter in arImLoadB)
	{
		arImListB[counter] = new Image();
		arImListB[counter].src = "../images/" + arImLoadB[counter] + ".gif";
	}
}

function movr(){this.img.src = this.img.overSrc;}
function mout(){this.img.src = this.img.outSrc;}
function makeButs()
{
	lr = "left";
//	document.write("<P ALIGN=RIGHT>")
	for (i=0;i<arPages.length;i++){
		if (i==curPage){lr = "center";}
		imstr = "<IMG SRC='../images/"+ lr + ".gif' WIDTH=18 HEIGHT=18 BORDER=0 ALT='"+ arAlts[i] + "'>";
		if (i==curPage) {document.write(imstr);lr="right";continue;}
		document.write(imstr.link(arPages[i]));
		if(!ver4){continue;}
		tLink =	document.links[document.links.length-1];
		tImg = tLink.img = document.images[document.images.length-1];
		tImg.outSrc = tImg.src;
		tImg.overSrc = "../images/" + lr + "_over.gif";
		tLink.onmouseover = movr;
		tLink.onmouseout = tLink.onmouseup = mout;
	}
//	document.write("</P>");
	document.write("<P>");
}

//
// Constructor for SearchUser
//
function SearchUser()
{
}

//draw search user

function SearchUser_draw()
	{
		var s = "";

		s += '<li class="body">';
		s += 'Click one of the following search areas in the <span class="gui">Search</span> drop-down list:</p>';
		s += '<ul type="square">';
		s += '</p><li class="body"><span class="gui">User Last Name</span></p>';
		s += '<li class="body"><span class="gui">User First Name</span></p>';
		s += '<li class="body"><span class="gui">User Log-in</span></p>';
		s += '<li class="body"><span class="gui">User E-mail</span></p>';
		s += '<li class="body"><span class="gui">Group Name</span></li></p>';
		s += '</ul>';
		s += '<li class="body">';
		s += 'Type your search term in the <span class="gui">for</span> field.<br>';
		s += '<BR>Livelink performs a case-insensitive <i>starts with</i> search.&nbsp;';
		s += 'For example, typing <span class="code">van</span> for <span class="gui">User Last Name</span> displays information about Livelink users whose last name begins with <span class="code">van </span> or <span class="code">Van</span>.&nbsp;';
		s += '</p>Leave the field blank to retrieve all records of the type specified.';
		s += '</p><li class="body">Click the <span class="gui">Find</span> button.';
		s += '</p><li class="body">Click the <span class="gui">Select</span> link of the user or group you want to choose.';

	document.write( s );
}

//prototype it
new SearchUser();
SearchUser.prototype.draw = SearchUser_draw;


function checkFrame( fileName )
{
	var foundQueryString = false;
	
	if ( top.frames.length > 1 && top.frames[1].name == "TOC" )
	{
		parent.menuOpenByFileName( fileName );
	}
	else
	{
		// possible referrer
		//http://xxxx/yyy/livelink.exe
		//http://xxxx/yyy/livelink.exe/1350549
		//http://xxxx/yyysupport/help/_en_US/websbroker/sr_workingwsr.html

		var fromURL = window.document.referrer;
		var last4chars = fromURL.substr( fromURL.length - 4 );
		var hhRequest = fromURL.toLowerCase().indexOf( '?func=hh.hhframe' );


		if ( ( last4chars == "html" ) || ( hhRequest != -1 ) )
		{
			// coming from the help html file or Hit Highlight popup . cannot redirect to the TOC
			return;
		}

		var queryStart = fromURL.lastIndexOf( '?' );
		if ( queryStart == -1 )
		{
			queryStart = fromURL.lastIndexOf( '/' );
		}
		else
		{
			foundQueryString = true;
		}

		if ( queryStart != -1 )
		{
			// find out if the last path is a number.
			// if it is, it ;must be coming from the Advanced Search
			var serverURL;

			var lastPath = fromURL.substr( queryStart + 1 );
			var pathNumber = Number( lastPath );

			if ( isNaN( pathNumber ) && !foundQueryString )
			{
				// No need to strip down the server URL
				serverURL = fromURL;
			}
			else
			{
				// Strip down the server URL
				serverURL = fromURL.substr( 0, queryStart );
			}

			top.location.href = serverURL + "?func=help.index&AdminHelp&pagename=" + encodeURIComponent( window.location.pathname );
		}
	}

	HideModuleText();
}


// Link to help. Parameter should be of form xxx.html or 'modname/xxx.html'.
// Root should be one of 'help' or 'adminhelp'.
// Assumes CURRENT location is inside the help hierarchy...
// form of current url must be **/help/_locale/** or **/adminhelp/_locale/**.
function _helpLink(linkToPart, root)
{
    var i;

	var parts = window.location.pathname.split( '/' );

	// Look for one of the possible help roots in current path
	for ( i = 0; i < parts.length; i++ )
	{
		if ( parts[i] == 'help' || parts[i] == 'adminhelp' )
		{
		    parts[i] = root;
		    break;
		}
	}

	// If found, i < length... if there is a localeSuffix, i+1 < length
	if ( (i+1) < parts.length )
	{
		// Truncate path
	   	parts.length = i+2;

		// Build new path
		newPath = parts.join('/');
		if ( linkToPart.charAt(0) != '/' )
		{
			newPath = newPath.concat( '/' );
		}
		newPath = newPath.concat( linkToPart );
		window.location.pathname = newPath;
	}
}

// Example: to link to webuser/ug_add_grp_p.html, do
// <a href="javascript:helpLink('webuser/ug_add_grp_p.html')

function helpLink( linkToPart )
{
    _helpLink( linkToPart, 'help' );
}

function adminHelpLink( linkToPart )
{
    _helpLink( linkToPart, 'adminhelp ');
}
