var Warehouse = new function() {
	var theForm;

	return {
		init: function( theForm )
		{
			_theForm = theForm;
		},
		ClearField: function() 
		{
			_theForm.DEST_ID.value = 0;
		},
		doCloseForm: function( nextUrl )
		{
			openURL( nextUrl, '' ); 
		},
		doSubmit: function()
		{
			disableButtons( _theForm );
			_theForm.submit();
		},
		doSubmitSettingsForm: function()
		{
			var valid = true;
			var warehouseLimit = _theForm.addToWarehouseLimit.value;
	
			//create regular expression object to match only numbers
			var ws_regexp = /^\+?[1-9]\d*$/; 
	
			if ( !ws_regexp.test( warehouseLimit ) || isNaN( warehouseLimit ) || warehouseLimit < 0 || warehouseLimit.length <= 0 ) 
			{
				alert( LocString( 'Please specify a number greater than zero.', transportStr ) );
				valid = false;
			}

			return valid;
		},
		showExportedObjectsInfo: function( hasExcludedObjects, hasRequiredPermissions, isLimitExceeded ) 
		{
			if ( $('#includeSubfolderContents').is(':checked') ) 
			{
				// show all contents related to the include subfolder flag.
				$('[id^=ctrl_]').show();
	
				if ( isLimitExceeded ) 
				{
					//display the warning message.
					$('#limitExceeded').show();
			
					//disable the button.
			 		$("#processButton").attr("disabled",true);
				}
		
				if ( hasExcludedObjects || !hasRequiredPermissions ) 
				{
					$('[id^=excludedObjects]').show();
				}

			}
			else 
			{
				// hide all contents related to the include subfolder flag.
				$('[id^=ctrl_],[id^=excludedObjects],#limitExceeded').hide();
				$("#processButton").attr("disabled",false);
	
			}
		},
		validateAddToWarehouse: function()
		{
			if( document.getElementById('DEST_Path').value == "" )
			{
				alert( LocString( 'No Workbench selected.', transportStr ) );
				return false;
			}
			else
			{
				disableButtons( _theForm );
				return true;
			}
		}
	};
}
