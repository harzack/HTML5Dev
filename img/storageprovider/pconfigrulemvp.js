function addSubmitEvent(func, theForm)
{
	var oldonsubmit = theForm.onsubmit;
	if (typeof theForm.onsubmit != 'function')
	{
		theForm.onsubmit = func;
	}
	else
	{
		theForm.onsubmit = function()
		{
			var retVal;
			retVal = func(theForm);
			if (retVal)
			{
				retVal = oldonsubmit(theForm);
			}

			return retVal;
		}
	}
}

function isInteger(s)
{
	return (s.toString().search(/^-?[0-9]+$/) == 0);
}

function freespacevalidate()
{
	var status = false;
	var freespace = this.Value;
	var intValue = 0;

	if (freespace != null)
	{
		if (freespace.value.length > 0)
		{
			intValue = isInteger(freespace.value);

			if ( intValue )
			{
				if (( 2147483648 > parseInt(freespace.value) ) && ( parseInt(freespace.value) > 0 ))
				{
					if (freespace.value.indexOf(".") == -1)
					{
						status = true;
					}

					else
					{
						alert(LocString('FreeSpaceNotInteger', mvpStr));
						freespace.focus();
					}
				}

				else
				{
					alert(LocString('FreeSpaceNotPositiveInteger', mvpStr));
					freespace.focus();
				}

			}

			else
			{
				alert(LocString('FreeSpaceNAN', mvpStr));
				freespace.focus();
			}
		}
		else
		{
			alert(LocString('EmptyFreeSpaceValue', mvpStr));
			freespace.focus();
		}
	}

	return status;
}