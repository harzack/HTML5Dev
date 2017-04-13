function RestoreValue( restoreObj, restoreValue ){

	restoreObj.value = restoreValue;

}

function LinkToggle( linkCheckbox, theForm ){

	if(linkCheckbox.checked){	
		theForm.DisplayValue.disabled = false;
		theForm.DisplayValueRestore.disabled = false;
		theForm.URL.disabled = false;
		theForm.URLRestore.disabled = false;
		theForm.TitleText.disabled = false;
		theForm.NewWindow.disabled = false;	
	}
	else{
		theForm.DisplayValue.disabled = true;
		theForm.DisplayValueRestore.disabled = true;
		theForm.URL.disabled = true;
		theForm.URLRestore.disabled = true;
		theForm.TitleText.disabled = true;
		theForm.NewWindow.disabled = true;	
	}

}

function EnableBeforeSubmit( theForm ){

	theForm.DisplayValue.disabled = false;
	theForm.DisplayValueRestore.disabled = false;
	theForm.URL.disabled = false;
	theForm.URLRestore.disabled = false;
	theForm.TitleText.disabled = false;
	theForm.NewWindow.disabled = false;	
}