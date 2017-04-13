//mark form field changed

var dirty = false;


function setDirty()
{
	dirty = true;
}

function clearDirty()
{
	dirty = false;
}

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

function changeEnabled( thisCheckbox, langCode, activeColor, disabledColor )
{
	
	// thisCheckbox - The checkbox that has just been altered
	// langCode - The language code that the enabled checkbox represents
	// activeColor - The text color for an enabled language pack
	// disabledColor - The text color for a disabled language pack

	setDirty(); // updates variable to indicate that a change has occurfed.
	
	if (thisCheckbox.checked == true)
	{
		document.getElementById('row_' + langCode).style.color = activeColor;
		document.configurelang.lang_sys_default[returnIndex( 'document,configurelang.lang_sys_default', langCode )].disabled=false;
	}
	else
	{
		document.getElementById('row_' + langCode).style.color = disabledColor;
		document.configurelang.lang_sys_default[returnIndex( 'document,configurelang.lang_sys_default', langCode )].disabled=true;
	}
	

}

function returnIndex( theElements, langCode )
{

	// theElements - The set of radio buttons or checkboxes
	// langCode - The language code that the radio button represents
	
	var indexValue;		// Variable which returns the index of the element with the value of langCode,


	for ( i=0; i < eval(theElements + '.length'); i++ ) 
	{
		if( eval(theElements + '[i].value') ==  langCode)
		{
			indexValue = i;
			break;
		}
	}
	
	return indexValue

}

function changeSystemDefault( langCode, alwaysEnabledLangs )
{

	// langCode 	- The language code that the radio button represents
	// coreLanguage - The core product default system language
	
	setDirty(); // updates variable to indicate that a change has occurfed.
	
	// Ensure the appropriate checkboxes are either enabled or disabled
	
	for ( i=0; i < document.configurelang.enabled_languages.length; i++ )
	{
	
		var alwaysEnable = false;
		
		// Check if the language can not be disabled
		for( index = 0; index < alwaysEnabledLangs.length; index++ )
		{
			if ( document.configurelang.enabled_languages[i].value ==  alwaysEnabledLangs[index] )
			{
				alwaysEnable = true;
				break;
			}
		}
	 	
		if (alwaysEnable  || document.configurelang.enabled_languages[i].value == langCode)
		{
		
			// The checkbox should be disabled
			document.configurelang.enabled_languages[i].disabled = true;
		}
		else
		{
			// The checkbox should be enabled
			document.configurelang.enabled_languages[i].disabled = false;
		}
	}
	
}

function doSubmit( submitForm, nexturl ){

	submitForm.nexturl.value = nexturl; // Set the nexturl value
	
	// Populate the list of all enabled langages
	
	if (submitForm.enabled_languages.length)
	{	
		for ( i=0; i < submitForm.enabled_languages.length; i++ )
		{
			if (submitForm.enabled_languages[i].checked == true)
			{
				submitForm.all_enabled_languages.value = submitForm.all_enabled_languages.value + ',' + submitForm.enabled_languages[i].value;		
			}		
		}
		if (submitForm.all_enabled_languages.value.length > 0)
		{
			submitForm.all_enabled_languages.value = submitForm.all_enabled_languages.value.substring(1)	
		}		
	}
	else if (submitForm.enabled_languages.checked == true)
	{
		submitForm.all_enabled_languages.value = submitForm.enabled_languages.value;
	}	
	
	// Submit the form
	
	submitForm.submit();

}


function editLanguage( url )
{
	var w = window.open( url,"SelectWidget","width=600,height=300,resizable=yes,menubar=no,scrollbars=no,toolbar=no" )

	if ( w.focus )
	{
		w.focus();
	}
}
