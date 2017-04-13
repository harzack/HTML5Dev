function SystemMsgItem_Submit()
{
	var	mysystemmsgitems = '';
	var mySelList = document.SystemMsgItemsConfigForm.SystemMsgItems;
	var	systemMsgTextData;
	var submitCheck = true;
	var systemMsgTextDataNotFound = false;

	for ( var i = 0; i < mySelList.options.length; i++ )
	{
		//	<Message>|<URL>|<Date>

		systemMsgTextData = mySelList.options[ i ].value.split( '|' );

		//	Skip empty new messages.

		if ( !( ( mySelList.options[ i ].text == SystemMsgItem__NewSystemMsgItem ) &&
			   ( systemMsgTextData[ 1 ] == SystemMsgItem__NewSystemMsgItemURL ) &&
			   ( systemMsgTextData[ 0 ].length == 0 ) )	)
		{
			if (  systemMsgTextData[ 0 ].length != 0 )
			{
				//		      <Name><Message>|<URL>|<Date>
				mysystemmsgitems +=
					mySelList.options[ i ].text + '|' +
					mySelList.options[ i ].value + '^';
			}
            else
            {
                systemMsgTextDataNotFound = true;
            }
		}
	}

    if ( systemMsgTextDataNotFound )
    {
        if ( confirm( SystemMsgItem__ConfirmMissingHeadline ) )
        {
            submitCheck = true;
        }
        else
        {
            submitCheck = false;
        }
    }

    if ( submitCheck )
    {
    	document.SystemMsgItemsConfigForm.sysmsgitems.value = mysystemmsgitems;

	    return true;
    }
    else
    {
        return false;
    }
}

function SystemMsgItem_BadCharCheck( inputObj )
{
	if ( ( inputObj.value.indexOf( '|' ) != -1 ) ||
			( inputObj.value.indexOf( '^' ) != -1 ) )
	{
		inputObj.select();
		inputObj.focus();
		alert( SystemMsgItem__InvalidChar );

		return false;
	}

	return true;
}

function SystemMsgItem_Config_Change( which )
{
	var i;
	var	whichName;
	var	nSelected = 0;
	var	ok = true;

	var mySelList = document.SystemMsgItemsConfigForm.SystemMsgItems;

	if ( which != null )
	{
		whichName = which.name;
	}

	for ( i = 0; i < mySelList.options.length; i++ )
	{
		if ( mySelList.options[ i ].selected )
		{
			nSelected++;
		}
	}

	if ( nSelected > 1 )
	{
		alert( SystemMsgItem__OnlyOneCanChange );
	}
	else
	{
		i = document.SystemMsgItemsConfigForm.SystemMsgItems.selectedIndex;

		if ( i == -1 )
		{
			alert( SystemMsgItem__SelectASystemMsgItem );
		}
		else
		{
			switch ( whichName )
			{
				case "SystemMsgItemName" :
					if ( which.value == "" )
					{
						which.value = mySelList.options[ i ].text;
					}
					else if ( ! SystemMsgItem_BadCharCheck( which ) )
	 				{
						return false;
	 				}
					else
					{
						mySelList.options[ i ].text = which.value;
					}

					ok = false;
					break;

			   	case "SystemMsgItemText" :
					if ( ! SystemMsgItem_BadCharCheck( which ) )
 					{
						ok = false;
						return false;
 					}
			      	break;
				case "URL" :
					if ( ! SystemMsgItem_BadCharCheck( which ) )
 					{
						ok = false;
						return false;
 					}
			      	break;

				case "SystemMsgItemDate_month" :
			      	break;

				case "SystemMsgItemDate_day" :
			      	break;

				case "SystemMsgItemDate_century" :
			      	break;

				case "SystemMsgItemDate_decade" :
			      	break;

				case "SystemMsgItemDate_year" :
			      	break;

				default :
					ok = false;
					return false;
			}

			if ( ok )
			{
				SystemMsgItem_ProcessOptions( mySelList, i );
			}
		}
	}

	return true;
}

function SystemMsgItem_Config_Delete()
{
	var i;
	var savedi;
	var	newOption;
	var mySelList = document.SystemMsgItemsConfigForm.SystemMsgItems;
	var nDeleted = 0;
	var selArray = new Array();
	var	newCurrentDate;
	var	systemMsgTextData;


	if ( confirm( SystemMsgItem__ConfirmDelete ) )
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
			alert( SystemMsgItem__SelectASystemMsgItem );
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
				// add a New System Message Item

				newCurrentDate = SystemMsgItem_NewDate();

				//                                                       <Message>|<URL>|<Date>
				newOption = new Option( SystemMsgItem__NewSystemMsgItem , "|" + SystemMsgItem__NewSystemMsgItemURL + "|" + newCurrentDate, false, true );
				mySelList.options[ mySelList.options.length ] = newOption;
			}

			mySelList.options[ i ].selected = true;
			document.SystemMsgItemsConfigForm.SystemMsgItemName.value = mySelList.options[ i ].text;

			systemMsgTextData = mySelList.options[ i ].value.split( '|' );

			document.SystemMsgItemsConfigForm.SystemMsgItemText.value = systemMsgTextData[ 0 ];
			document.SystemMsgItemsConfigForm.URL.value = systemMsgTextData[ 1 ];

			if ( systemMsgTextData.length < 3 )
			{
				systemMsgTextData[ 2 ] = '';
			}

			SystemMsgItem_ProcessDate( systemMsgTextData[ 2 ] );
		}
	}
}


function SystemMsgItem_Config_Order( down )
{
	var i;

	var saveText;
	var saveValue;

	var selected = document.SystemMsgItemsConfigForm.SystemMsgItems;

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
		alert( SystemMsgItem__OnlyOneCanMove );
	}
	else
	{
		i = selected.selectedIndex;

		if ( i == -1 )
		{
			alert( SystemMsgItem__SelectASystemMsgItem );
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

function SystemMsgItem_Config_InitSelect()
{
	var mySelList = document.SystemMsgItemsConfigForm.SystemMsgItems;
	var	systemMsgTextData;


	if ( mySelList.options.length >= 1 )
	{
		mySelList.selectedIndex = 0;

		SystemMsgItem_Config_Select();
	}
}

function SystemMsgItem_Config_Select()
{
	var i;
	var mySelList = document.SystemMsgItemsConfigForm.SystemMsgItems;
	var	systemMsgTextData;


	for ( i = mySelList.options.length - 1; i >= 0; --i )
	{
		if ( mySelList.options[ i ].selected )
		{
			document.SystemMsgItemsConfigForm.SystemMsgItemName.value = mySelList.options[ i ].text;

			//          <Message>|<URL>|<Date>
			systemMsgTextData = mySelList.options[ i ].value.split( '|' );

			document.SystemMsgItemsConfigForm.URL.value = systemMsgTextData[ 1 ];
			document.SystemMsgItemsConfigForm.SystemMsgItemText.value = systemMsgTextData[ 0 ];

			if ( systemMsgTextData.length < 3 )
			{
				systemMsgTextData[ 2 ] = '';
			}

			SystemMsgItem_ProcessDate( systemMsgTextData[ 2 ] );

			break;
		}
	}
}

function SystemMsgItem_Config_New()
{
	var i;
	var	newOption;


	var mySelList = document.SystemMsgItemsConfigForm.SystemMsgItems;

	for ( i = mySelList.options.length - 1; i >= 0; --i )
	{
		if ( mySelList.options[ i ].selected )
		{
			mySelList.options[ i ].selected = false;
		}
	}

	document.SystemMsgItemsConfigForm.SystemMsgItemName.value = SystemMsgItem__NewSystemMsgItem;
	document.SystemMsgItemsConfigForm.URL.value = SystemMsgItem__NewSystemMsgItemURL;
	document.SystemMsgItemsConfigForm.SystemMsgItemText.value = '';

	// <Message>|<URL>|<Date>
	newOption = new Option( SystemMsgItem__NewSystemMsgItem , "|" + SystemMsgItem__NewSystemMsgItemURL + "|", false, true );
	mySelList.options[ mySelList.options.length ] = newOption;
	mySelList.options[ mySelList.options.length - 1 ].selected = true;
	document.SystemMsgItemsConfigForm.SystemMsgItemName.focus();

	newCurrentDate = SystemMsgItem_NewDate();

	SystemMsgItem_ProcessDate( newCurrentDate );

	mySelList.options[ mySelList.options.length - 1 ].value += newCurrentDate;
}

function SystemMsgItem_NewDate()
{
	var newCurrentDate;
	var curYear;

	var	currentDate = new Date();


	newCurrentDate = SystemMsgItem_DateToString( currentDate );

	return newCurrentDate;
}

function SystemMsgItem_DateToString( tmpDate )
{
	var myDate;
	var myYear;


	myYear = ( tmpDate.getFullYear == null ) ? tmpDate.getYear() : tmpDate.getFullYear();

	myDate = ( tmpDate.getMonth() + 1 ) + "/" + tmpDate.getDate() + "/" + myYear;

	return myDate;
}

function SystemMsgItem_ProcessDate( tmpDate )
{
	var	systemMsgTextDate;
	var	newDate;


	if ( !( tmpDate == '' ) )
	{
		systemMsgTextDate = tmpDate.split( '/' );

		newDate = new Date( parseInt( systemMsgTextDate[ 2 ], 10 ), parseInt( systemMsgTextDate[ 0 ], 10 ) - 1, parseInt( systemMsgTextDate[ 1 ], 10 ) );

		SystemMsgItemDate_changeTo( newDate, document.SystemMsgItemsConfigForm );
	}
	else
	{
		SystemMsgItemDate_changeTo( null, document.SystemMsgItemsConfigForm );
	}
}

function SystemMsgItem_ProcessOptions( inputNewObj, i )
{
	var	myText = document.SystemMsgItemsConfigForm.SystemMsgItemText;
	var	myURL = document.SystemMsgItemsConfigForm.URL;


	myDate = SystemMsgItemDate_getDate( document.SystemMsgItemsConfigForm );

	if ( myDate == null )
	{
		// <Message>|<URL>|<Date>
		inputNewObj.options[ i ].value = myText.value + "|" + myURL.value + "|";
	}
	else
	{
		myDate = SystemMsgItem_DateToString( myDate );

		// <Message>|<URL>|<Date>
		inputNewObj.options[ i ].value = myText.value + "|" + myURL.value + "|" + myDate;
	}

	inputNewObj.options[ i ].selected = true;
}
