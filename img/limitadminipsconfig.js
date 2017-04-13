function LimitAdminItem_BadCharCheck( addr2 )
{
	if ( addr2.indexOf( ',' ) != -1 ) 
	{
		alert( LimitAdminItem__InvalidChar );
		
		return false;
	}

	else if ( addr2.indexOf( '\'' ) != -1 ) 
	{
		alert( LimitAdminItem__InvalidChar );
		
		return false;
	}

	return true;
}			

function LimitAdminItem_Config_InitSelect()
{
	var i = 0;
	var mySelList = null;
	

	mySelList = document.LimitAdminIPsConfigForm.IPAddrs;
	
	if ( mySelList.options.length >= 1 )
	{
		mySelList.selectedIndex = 0;
		document.LimitAdminIPsConfigForm.addr.value = mySelList.options[ 0 ].text;
	}
}

function LimitAdminItem_Config_Select()
{
	var i;
	var mySelList = document.LimitAdminIPsConfigForm.IPAddrs;

	for ( i = mySelList.options.length - 1; i >= 0; --i )
	{
		if ( mySelList.options[ i ].selected )
		{
			document.LimitAdminIPsConfigForm.addr.value = mySelList.options[ i ].text;

			break;
		}
	}
}

function LimitAdminItem_Config_Delete()
{
	var i;
	var savedi;
	var	newOption;
	
	var mySelList = document.LimitAdminIPsConfigForm.IPAddrs;
	var nDeleted = 0;
	var selArray = new Array();

	if ( confirm( LimitAdminItem__ConfirmDelete ) )
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
			alert( LimitAdminItem__SelectAMenuItem );
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
			
			if ( mySelList.options.length != 0 )
			{
				mySelList.options[ i ].selected = true;
				document.LimitAdminIPsConfigForm.addr.value = mySelList.options[ i ].text;
			}
		}
	}
}

function LimitAdminItem_Submit()
{
	var i;
	var	mymenuitems = "";
	var mySelList = document.LimitAdminIPsConfigForm.IPAddrs;


	for ( i = 0; i < mySelList.options.length; i++ ) 
	{
		var		item = mySelList.options[ i ].text;
		

		if ( item != "" )
		{
			if ( mymenuitems.length > 0 )
			{
				mymenuitems += ",";
			}

        	mymenuitems +=item;
        }
	}

	document.LimitAdminIPsConfigForm.validIPs.value = mymenuitems;
	
	return true;
}

function LimitAdminItem_Config_Change()
{
	var i;
	var savedi;

	var mySelList = document.LimitAdminIPsConfigForm.IPAddrs;
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
		alert( LimitAdminItem__OnlyOneCanChange );
	}
	else
	{
		i = document.LimitAdminIPsConfigForm.IPAddrs.selectedIndex;

		if ( i == -1 )
		{
			alert( LimitAdminItem__SelectAMenuItem );
		}
		else
		{
			mySelList.options[ i ].text = document.LimitAdminIPsConfigForm.addr.value;
			mySelList.options[ i ].value = document.LimitAdminIPsConfigForm.addr.value;
			mySelList.options[ i ].selected = true;
		}
	}

	return true;
}

function LimitAdminItem_Config_New( addr )
{
	var i;
	var	newOption;
	
	var	selected = -1;
	var	duplicate = false;
	var mySelList = document.LimitAdminIPsConfigForm.IPAddrs;

	if ( LimitAdminItem_BadCharCheck( addr ) )
	{
		for ( i = mySelList.options.length - 1; i >= 0; --i )
		{
			if ( mySelList.options[ i ].text == addr )
			{
				duplicate = true;
				break;
			}
				
			if ( mySelList.options[ i ].selected )
			{
				selected = i;
			}
		}
	
		if ( !duplicate )
		{
			if ( selected >= 0 )
			{
				mySelList.options[ selected ].selected = false;
			}
		
			document.LimitAdminIPsConfigForm.addr.value = addr;
		
			newOption = new Option( addr, addr, false, true );
			mySelList.options[ mySelList.options.length ] = newOption;
			mySelList.options[ mySelList.options.length-1 ].selected = true;
			document.LimitAdminIPsConfigForm.addr.focus();
		}
		else
		{
			alert( LimitAdminItem__NoDuplicates );
		}
	}
}
