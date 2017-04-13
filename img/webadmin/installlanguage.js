function changeInstall(installform)
{

	// installform == The form element which contains the information regarding the installable languages
	
	var languageSelected = false;
	
	//First check if installform.install is a single HTML element or an array of HTML elements...
	if (installform.install)
	{
		if (installform.install.length)
		{	
			for ( i=0; i < installform.install.length; i++ )
			{
				if(installform.install[i].checked == true)
				{
					languageSelected = true;
					break;
				}
			}
		}		
		else if (installform.install.checked == true)
		{
			languageSelected = true;
		}
	}

	
	if (!languageSelected && installform.modInstall)
	{
		if (installform.modInstall.length)
		{
			for ( i=0; i < installform.modInstall.length; i++ )
			{
				if(installform.modInstall[i].checked == true)
				{
					languageSelected = true;
					break;
				}
			}
		}
		else if (installform.modInstall.checked == true)
		{
			languageSelected = true;
		}
	}
	

	
	if(languageSelected == true)
	{
		installform.installButton.disabled = false;
	}
	else
	{
		installform.installButton.disabled = true;
	}

}