//this file is for metasetlang.html


function doCancel( msg, nextURLOnCancel )
{
	if ( dirty )
	{
		if ( confirm( msg ) )
		{
			window.location = nextURLOnCancel
		}
	}
	else
	{
		window.location = nextURLOnCancel
	}
}

function validateUpdate(theform, sysDefaultBox, enableCheckBox, element)
{
	if ( !enableCheckBox.checked && sysDefaultBox.checked )
	{
		if (element == 1)
		{
			alert( setSysDefaultErrMsg )
			theform.reset()
		}
		else if (element == 2)
		{
			alert( disableSysDefaultErrMsg )
			theform.reset()
		}
	}
}

function editLanguage( code, url, languageColumn, languageLocalColumn, languageCodeColumn, collationColumn )
{
	url += "?func=admin.metadatalanguageedit";
	url += "&languageCode=" + encodeURIComponent( code );
	url += "&languageColumn=" + languageColumn;
	url += "&languageLocalColumn=" + languageLocalColumn;
	url += "&languageCodeColumn=" + languageCodeColumn;
	url += "&collationColumn=" + collationColumn;

	popUpWindow( url );
}

function delLanguage( code, url )
{
	url = url + "?func=admin.metadatalanguagedelete&languageCode=" + code;
	popUpWindow( url );
}

function addLanguage( theForm, obj )
{
	if ( obj.selectedIndex != 0 )
	{
		theForm.languageCode.value = obj.options[ obj.selectedIndex ].value;
		theForm.submit();
	}
}

function popUpWindow( url )
{
	var w = window.open( url,"SelectWidget","width=600,height=300,resizable=yes,menubar=no,scrollbars=no,toolbar=no" )

	if ( w.focus )
	{
		w.focus();
	}
}
