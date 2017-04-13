//	<!-- File: webnode/createOldAttributeFunctions.js -->
//	<!-- HTML File: webnode/create.html -->
// if condition from create.html

/*
* doSubmit 
* This function is used to ...
*
* @param	theForm		type:object - current form
* @return	retVal
*/ 
function doSubmit( theForm )
{
	var	retVal = true;

	if ( CheckFields( theForm ) )
	{

		//	Subclass or any custom code can register additional submit actions.
		//	Please refer to the description of this function.

		retVal = ExecSubmitActionFuncs( theForm );

		//	Subclass webnode can implement a java script named
		//	submitActions to do data validation before actual submit.
		//
		//	Note: it is supported for backward compatibility.

		if( ( retVal == true ) && ( needSubmitActions == true ) )
		{
			retVal = submitActions( theForm );
		}
		if( retVal == true )
		{
			// trigger all functions that are bound to the submit action for this form
			$( theForm ).trigger("submit");
				
			if ( oscriptValues.addDocWithoutRequiredAttribute == true )
			{
				DisplayPopupDiv();
			}
		}
	}

	return retVal;
}

/*
* SwitchParent
* This function is used to ...
*
* @param	selTargetDialog		type:boolean - 
* @return	nothing
*/ 
function SwitchParent( selTargetDialog )
{
	var		selectParent = true

	if ( oscriptValues.switchParentWarning == true )
	{
		//	A confirmation dialog when switching destination parent while there are
		//	attributes displayed which are inherited from the current destination parent.

		if ( checkSwitchParent  == false )
		{
			if ( confirm( localMessages.attributesInvalidIfChangeCreateInTarget ) == true )
			{
				selectParent = true;
				checkSwitchParent = true;
			}
			else
			{
				selectParent = false;
			}
		}
	}

	if ( ( selectParent == true  ) && ( selTargetDialog == true ) )
	{
		doCreateIn( 'CreateForm', 'CTT' );
	}
}
//	<!-- End File: webnode/createNewAttributeFunctions.js -->

