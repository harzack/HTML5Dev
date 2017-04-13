//
// This function will take the user back a step in the wizard
//

function StepBack( formName, currentPage )
{
	formName.pageNumber.value = currentPage - 1;
	formName.submit();
}


//
// This function will take the user foward a step in the wizard
//

function StepNext( formName, currentPage )
{
	formName.pageNumber.value = currentPage + 1;
	formName.submit();
}


//
// This function will submit the values entered in the wizard
//

function StepFinish( formName )
{
	formName.func.value = "webconfig.setWizard";
	formName.submit();	
}


//
// This function will cancel the wizard
//

function CancelWizard()
{
	window.close();
}


