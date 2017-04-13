var DeployWorkbench = new function() {

	var _deployable = false;
	var _theForm;

	return {
		init: function( theForm, isDeployable ) 
		{
			_deployable = isDeployable;
			_theForm = theForm;

			if ( _deployable == true ) 
			{
					$('#deployButton').addClass('applyButton');
			}
			else 
			{
				$('#deployButton').attr("disabled", true).addClass('disabledButton');
			}
		},
		deployWorkbench: function()
		{
			if ( _deployable && confirm( LocString( 'Are you sure you want to deploy the workbench?', transportStr ) ) )
			{
				$('#objAction').val('deploy2');
				$('#deployButton').attr("disabled", true).addClass('disabledButton');
				_theForm.submit();
			}
		}
	};
}
