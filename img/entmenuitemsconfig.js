function EntMenuItem_Submit()
{
	var i;
	var	mymenuitems = '';
	var mySelList = document.EntMenuItemsConfigForm.SelMenuItem;

	for ( i = 0; i < mySelList.options.length; i++ )
	{
        if ( !( ( mySelList.options[ i ].text == EntMenuItem__NewMenuItem ) &&
				( mySelList.options[ i ].value == EntMenuItem__NewMenuItemURL ) ) )
		{
			mymenuitems +=
				mySelList.options[ i ].text + '|' +
				mySelList.options[ i ].value + '^';
		}
	}

	document.EntMenuItemsConfigForm.entmenuitems.value = mymenuitems;

	return true;
}

function EntMenuItem_BadCharCheck( inputObj )
{
	if ( ( inputObj.value.indexOf( '|' ) != -1 ) ||
		 ( inputObj.value.indexOf( '^' ) != -1 ) )
	{
		inputObj.select();
		inputObj.focus();
		alert( EntMenuItem__InvalidChar );

		return false;
	}

	return true;
}

function EntMenuItem_Config_Change( which )
{
	var mySelList = document.EntMenuItemsConfigForm.SelMenuItem;
	var i;
	var savedi;
	var	nSelected = 0;

	for ( i = 0; i < mySelList.options.length; i++ )
	{
		if ( mySelList.options[ i ].selected )
		{
			nSelected++;
		}
	}

	if ( nSelected > 1 )
	{
		alert( EntMenuItem__OnlyOneCanChange );
	}
	else
	{
		i = document.EntMenuItemsConfigForm.SelMenuItem.selectedIndex;

		if ( i == -1 )
		{
			alert( EntMenuItem__SelectAMenuItem );
		}
		else
		{
			savedi = i;
			if ( which == "menuItemName" )
			{
				if ( document.EntMenuItemsConfigForm.menuItemName.value == "" )
				{
					document.EntMenuItemsConfigForm.menuItemName.value = mySelList.options[ i ].text;

					for ( i = mySelList.options.length - 1; i >= 0; --i )
					{
							mySelList.options[ i ].selected = false;
					}
					i = savedi;
					mySelList.options[i].selected = true;
				}
				else if ( ! EntMenuItem_BadCharCheck( document.EntMenuItemsConfigForm.menuItemName ) )
 				{
					return false;
 				}
				else
				{
					mySelList.options[i].text = document.EntMenuItemsConfigForm.menuItemName.value;
					mySelList.options[i].selected = true;
				}
			}
			else
			{
				if ( which == "URL" )
				{
					if ( ! EntMenuItem_BadCharCheck( document.EntMenuItemsConfigForm.URL ) )
 					{
						return false;
 					}
					else
					{
						mySelList.options[i].value = document.EntMenuItemsConfigForm.URL.value;
						mySelList.options[i].selected = true;
					}
				}
			}
		}
	}

	return true;
}


function EntMenuItem_Config_Delete()
{
	var i;
	var savedi;
	var	newOption;
	var mySelList = document.EntMenuItemsConfigForm.SelMenuItem;
	var nDeleted = 0;
	var selArray = new Array();

	if ( confirm( EntMenuItem__ConfirmDelete ) )
	{
		for ( i = mySelList.options.length - 1; i >= 0; --i )
		{
			if ( mySelList.options[ i ].selected )
			{
				mySelList.options[ i ].selected = false;

				selArray[ selArray.length ] = i;

				savedi = i;

				++nDeleted;
			}
		}

		if ( nDeleted == 0 )
		{
			alert( EntMenuItem__SelectAMenuItem );
		}
		else
		{
			for ( i = 0; i < selArray.length; i++ )
			{
				mySelList.options[ selArray[ i ] ] = null;
			}

			i = savedi;

			if ( mySelList.options.length >= 1 && i > 0 )
			{
				i = i - 1;
			}

			if (mySelList.options.length == 0)
			{
				// No more entries
				// add a New Menu Item
				newOption = new Option( EntMenuItem__NewMenuItem , EntMenuItem__NewMenuItemURL, false, true );
				mySelList.options[ mySelList.options.length ] = newOption;
			}
			mySelList.options[i].selected = true;
			document.EntMenuItemsConfigForm.menuItemName.value = mySelList.options[ i ].text;
			document.EntMenuItemsConfigForm.URL.value = mySelList.options[ i ].value;
		}
	}
}

function EntMenuItem_Config_Order( down )
{
	var i;

	var saveText;
	var saveValue;

	var selected = document.EntMenuItemsConfigForm.SelMenuItem;

	var	nSelected = 0;

	for ( i = 0; i < selected.options.length; i++ )
	{
		if ( selected.options[ i ].selected )
		{
			nSelected++;
		}
	}

	if ( nSelected > 1 )
	{
		alert( EntMenuItem__OnlyOneCanMove );
	}
	else
	{
		i = selected.selectedIndex;

		if ( i == -1 )
		{
			alert( EntMenuItem__SelectAMenuItem );
		}
		else
		{
			saveText = selected.options[ i ].text;
			saveValue = selected.options[ i ].value;

			if ( ( i > 0 ) && !down )
			{
				selected.options[ i ].text = selected.options[ i - 1 ].text;
				selected.options[ i ].value = selected.options[ i - 1 ].value;

				selected.options[ i - 1 ].text = saveText;
				selected.options[ i - 1 ].value = saveValue;

				selected.selectedIndex--;
			}
			else if ( ( i < ( selected.length - 1 ) ) && down )
			{
				selected.options[ i ].text = selected.options[ i + 1 ].text;
				selected.options[ i ].value = selected.options[ i + 1 ].value;

				selected.options[ i + 1 ].text = saveText;
				selected.options[ i + 1 ].value = saveValue;

				selected.selectedIndex++;
			}
		}
	}
}

function EntMenuItem_Config_InitSelect()
{
	var i;
	var mySelList = document.EntMenuItemsConfigForm.SelMenuItem;


	if ( mySelList.options.length >= 1 )
	{
		mySelList.selectedIndex = 0;
		i = mySelList.selectedIndex;
		document.EntMenuItemsConfigForm.menuItemName.value = mySelList.options[ i ].text;
		document.EntMenuItemsConfigForm.URL.value = mySelList.options[ i ].value;
	}
}

function EntMenuItem_Config_Select()
{
	var i;
	var mySelList = document.EntMenuItemsConfigForm.SelMenuItem;

	for ( i = mySelList.options.length - 1; i >= 0; --i )
	{
		if ( mySelList.options[ i ].selected )
		{
			document.EntMenuItemsConfigForm.menuItemName.value = mySelList.options[ i ].text;
			document.EntMenuItemsConfigForm.URL.value = mySelList.options[ i ].value;

			break;
		}
	}
}

function EntMenuItem_Config_New()
{
	var i;
	var	newOption;
	var	newName;
	var	newURL;
	var	SelMenuItem;

	var mySelList = document.EntMenuItemsConfigForm.SelMenuItem;

	for ( i = mySelList.options.length - 1; i >= 0; --i )
	{
		if ( mySelList.options[ i ].selected )
		{
			mySelList.options[ i ].selected = false;
		}
	}

	document.EntMenuItemsConfigForm.menuItemName.value = EntMenuItem__NewMenuItem;
	document.EntMenuItemsConfigForm.URL.value = EntMenuItem__NewMenuItemURL;

	newOption = new Option( EntMenuItem__NewMenuItem , EntMenuItem__NewMenuItemURL, false, true );
	mySelList.options[ mySelList.options.length ] = newOption;
	mySelList.options[ mySelList.options.length-1 ].selected = true;
	document.EntMenuItemsConfigForm.menuItemName.focus();
}
