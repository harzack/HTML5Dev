
// Routines to generate the result bar at the bottom of the search results

var rb_baseURL = '';
var rb_img = '';

function rb_setBaseURL( s )
{
	rb_baseURL = s;
}

function sd_setFormName( s )
{
	sd_formName = s;
}

function rb_setSupportPath( s )
{
	rb_img = s;
}

//when document has loaded
$(document).ready(function() {

	//This is to prevent the user from clicking search multiple times without waiting for the result
	//Reset the value when the page reloads
	performingSearch=false;
});

// HTML Fragments - these are building blocks for the result bar
var rb_html_start =
	'<DIV ALIGN="center" STYLE="padding-top: 12px;">';

var rb_html_tablestart =
	'<TABLE CLASS="resultBarTbl" BORDER="0" CELLSPACING="0" CELLPADDING="2"> '+
	'	<TR VALIGN="BOTTOM"> ';

var rb_html_tableend =
	'	</TR>'+
	'</TABLE>';

var rb_html_end =
	'</DIV>';

var rb_html_arrowstart =
	'<TD ALIGN="RIGHT">'+
	'	<A HREF="#" onClick="DoSearch( document.SearchForm, \'#FORMTAGACTION#\', \'NewSearch\', \'#JUMPTO#\' )">'+
	'	<IMG BORDER="0" SRC="#IMG#arrow-left.gif" ALT="#ALTTEXT#"  TITLE="#ALTTEXT#"></A>'+
	'	<BR>'+
	'	<A STYLE="text-decoration: underline;" TITLE="#TITLE#" HREF="#" onClick="DoSearch( document.SearchForm, \'#FORMTAGACTION#\', \'NewSearch\', \'#JUMPTO#\' )">#LABEL#</A>'+
	'</TD>';

var rb_html_arrowend =
	'<TD ALIGN="LEFT">'+
	'	<A HREF="#" onClick="DoSearch( document.SearchForm, \'#FORMTAGACTION#\', \'NewSearch\', \'#JUMPTO#\' )">'+
	'	<IMG BORDER="0" SRC="#IMG#arrow-right.gif" ALT="#ALTTEXT#" TITLE="#ALTTEXT#"></A>'+
	'	<BR>'+
	'	<A STYLE="text-decoration: underline;" TITLE="#TITLE#" HREF="#" onClick="DoSearch( document.SearchForm, \'#FORMTAGACTION#\', \'NewSearch\', \'#JUMPTO#\' )">#LABEL#</A>'+
	'</TD>';


var rb_html_selected =
	'<TD ALIGN="CENTER">'+
	'	<IMG BORDER="0" SRC="#IMG#gold-sphere.gif" ALT="#ALTTEXT#" TITLE="#ALTTEXT#">'+
	'	<BR>#LABEL#'+
	'</TD>';

var rb_html_selectable =
	'<TD ALIGN="CENTER">'+
	'	<A ONFOCUS="rollOverBubbleID(\'#BUBBLEID#\', \'gold-sphere-sel.gif\');" ONBLUR="rollOverBubbleID(\'#BUBBLEID#\', \'blue-sphere.gif\');" HREF="#" onClick="DoSearch( document.SearchForm, \'#FORMTAGACTION#\', \'NewSearch\', \'#JUMPTO#\' )">'+
	'		<IMG BORDER="0" ID="#BUBBLEID#" SRC="#IMG#blue-sphere.gif" ALT="#ALTTEXT#" TITLE="#ALTTEXT#" ONMOUSEOVER="rollOverBubble(this, \'gold-sphere-sel.gif\');" ONMOUSEOUT="rollOverBubble(this, \'blue-sphere.gif\');"></A>'+
	'		<BR>'+
	'	<A STYLE="text-decoration: underline;" TITLE="#ALTTEXT#" ONFOCUS="rollOverBubbleID(\'#BUBBLEID#\', \'gold-sphere-sel.gif\');" ONBLUR="rollOverBubbleID(\'#BUBBLEID#\', \'blue-sphere.gif\');" ONMOUSEOVER="rollOverBubbleID(\'#BUBBLEID#\', \'gold-sphere-sel.gif\');" ONMOUSEOUT="rollOverBubbleID(\'#BUBBLEID#\', \'blue-sphere.gif\');" HREF="#" onClick="DoSearch( document.SearchForm, \'#FORMTAGACTION#\', \'NewSearch\', \'#JUMPTO#\' )">#LABEL#</A>'+
	'</TD>';

var rb_html_selectcellstart =
	'<TD ALIGN="CENTER">';

var rb_html_selectcellend =
	'</TD>';


function rb_Start()
{
	var s = rb_html_start;
	document.write( s );
}

function rb_End()
{
	var s = rb_html_end;
	document.write( s );
}

function rb_TableStart()
{
	var s = rb_html_tablestart;
	document.write( s );
}

function rb_TableEnd()
{
	var s = rb_html_tableend;
	document.write( s );
}

function rb_StartArrow( jumpTo, altText, title, label, formTagAction )
{
	var s = rb_html_arrowstart;

	s = s.replace( /#IMG#/g, rb_img );
	s = s.replace( /#JUMPTO#/g, jumpTo );
	s = s.replace( /#ALTTEXT#/g, altText );
	s = s.replace( /#TITLE#/g, title );
	s = s.replace( /#LABEL#/g, label );
	s = s.replace( /#FORMTAGACTION#/g, formTagAction );

	document.write( s );
}

function rb_EndArrow( jumpTo, altText, title, label, formTagAction )
{
	var s = rb_html_arrowend;

	s = s.replace( /#IMG#/g, rb_img );
	s = s.replace( /#JUMPTO#/g, jumpTo );
	s = s.replace( /#ALTTEXT#/g, altText );
	s = s.replace( /#TITLE#/g, title );
	s = s.replace( /#LABEL#/g, label );
	s = s.replace( /#FORMTAGACTION#/g, formTagAction );

	document.write( s );
}

function rb_SelectCellStart()
{
	var s = rb_html_selectcellstart;
	document.write( s );
}

function rb_SelectCellEnd()
{
	var s = rb_html_selectcellend;
	document.write( s );
}

function rb_Selected( altText, label )
{
	var s = rb_html_selected;

	s = s.replace( /#IMG#/g, rb_img );
	s = s.replace( /#ALTTEXT#/g, altText );
	s = s.replace( /#LABEL#/g, label );

	document.write( s );
}


function rb_Selectable( bubbleID,  jumpTo, altText, label, formTagAction )
{
	var s = rb_html_selectable;

	s = s.replace( /#IMG#/g, rb_img );
	s = s.replace( /#BUBBLEID#/g, bubbleID);
	s = s.replace( /#JUMPTO#/g, jumpTo );
	s = s.replace( /#ALTTEXT#/g, altText );
	s = s.replace( /#LABEL#/g, label );
	s = s.replace( /#FORMTAGACTION#/g, formTagAction );

	document.write( s );
}
