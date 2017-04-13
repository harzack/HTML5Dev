function popIPoolInfo( theForm, dataID, url )
{
	var w = window.open( "", "iPoolInfo", "width=700,height=300, scrollbars=yes, resizable=yes,menubar=no" );

	var nextUrl = url + "?func=collections.closewin&reloadparent=1";

	// Write a form based on the parent form to the popup -  adding func, nodeId, nextUrl
	sendFormToDocument( theForm, w.document, dataID , nextUrl );

	// Submit the popup
	w.document.forms[0].submit();
}

function sendFormToDocument( f, windowDoc, dataID, nextUrl )
{
	windowDoc.open();
	windowDoc.write( '<FORM NAME="' + f.name + '"' );
	windowDoc.write( ' ACTION="' + f.action + '"' );
	windowDoc.write( ' METHOD="' + f.method + '">' );
	windowDoc.write( '</FORM>' );
	windowDoc.close();

	var popupForm = windowDoc.forms[0];

	var input = windowDoc.createElement( 'INPUT' );
	input.setAttribute( "type", "HIDDEN" );
	input.setAttribute( "name", "func" );
	input.setAttribute( "value", "process.iPoolInfo" );
	popupForm.appendChild( input );

	input = windowDoc.createElement( 'INPUT' );
	input.setAttribute( "type", "HIDDEN" );
	input.setAttribute( "name", "nextUrl" );
	input.setAttribute( "value", nextUrl );
	popupForm.appendChild( input );

	input = windowDoc.createElement( 'INPUT' );
	input.setAttribute( "type", "HIDDEN" );
	input.setAttribute( "name", "NodeID" );
	input.setAttribute( "value", dataID );
	popupForm.appendChild( input );
}
