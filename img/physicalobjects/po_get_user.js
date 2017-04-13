//
// 	File: physicalobjects/support/po_get_user.js
//
//	Description: This is a support js file to validate Content Server user or external client manually entered as borrower or obtained by. 
//
//
function populateUserID( userName, fieldName, checkExternal )
{
	
	if (userName.value.length > 0)
	{
		checkingUser = true
		var url = baseURL + "?func=PhysicalObjects.GetUserID&UserName=" + userName.value +"&checkExternal=" + checkExternal
		OTsendHTTPGetAjaxRequest( url, handleResponse, null, fieldName, formName );
	}
}

function handleResponse( responsetext, param1, param2 )
{
	var 	frm = eval('window.document.' + param2)
	var 	arr1 = responsetext.split('|');
	var		arr2
	var		theFieldName
	var		theFieldID
	var 	cont = true
	
	
	if (eval('frm.' + param1 +'_ID'))
	{
		theFieldID = eval('frm.' + param1 +'_ID')
	}
	else
	{
		cont = false
	}
	if (cont && eval('frm.' + param1 +'_Name'))
	{
		theFieldName = eval('frm.' + param1 +'_Name')
	}
	else
	{
		cont = false
	}

	if (cont)
	{
		if ( arr1.length )
		{
			arr2=arr1[0].split('=')
			if ( arr2.length > 1)
			{

				theFieldID.value = arr2[1]
				theFieldName.value= arr2[3]
			}
			else
			{
				arr2=arr1[0].split(':')

				if ( arr2.length > 1)
				{
					alert(arr2[1])

				}
				else
				{
					alert("Value entered does not match any Content Server user.")
				}
				
				theFieldID.value = 0
				theFieldName.value=""
				theFieldName.focus()
				cont = false
			}
		}
	}
	else
	{
		alert("Error retrieving user information.")
	}
	
	checkingUser = false

	if (submitButtonPressed == true )
	{
		submitButtonPressed = false
		if ( cont )
		{
			eval(submitToCall)(frm)
		}
	}
}

function killPopup()
{
	var theProgressDivStyle;

	popupMsg = "";
	popupBak = "";

	if ( null !== this.popupTimer )
	{
		clearTimeout( this.popupTimer );
		this.popupTimer = null;
	}

	theProgressDiv = document.getElementById("progressPopupDiv");
	if ( null !== theProgressDiv )
	{
		theProgressDivStyle = theProgressDiv.style;
		theProgressDivStyle.display = "none";
	}
	theProgressDiv.innerHTML = null;
}