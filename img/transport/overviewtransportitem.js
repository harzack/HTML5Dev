var OverviewTransportItem = new function() {

	var _deploymentTargetName;
	var _modifiable = false;
	var _isDeployable = false;
	var _theForm;
	var _editCount = 0;
	var _dirtyCount = 0;
	var _viewers = {};
	var _editors = {};
	var _saveFunctions = {};
	var _dirty = {};

	return {
		init: function( currentTransportItem, theForm, modifiable, isDeployable, deploymentTargetName ) 
		{
			_currentTransportItem = currentTransportItem;
			_theForm = theForm;
			_modifiable = modifiable;
			_isDeployable = isDeployable;
			_deploymentTargetName = deploymentTargetName;

			if ( _modifiable == true )
			{
				$('#deployButton').show();

				if ( _isDeployable == true )
				{
					$('#deployButton').addClass('applyButton');
				}
				else
				{
					$('#deployButton').attr("disabled", true).addClass('disabledButton');
				}
			}
			else
			{
				$('#deployButton').hide();
			}
		},
		setViewer: function( id, viewer )
		{
			_viewers[ id ] = viewer;
		},
		setEditor: function( id, editor )
		{
			_editors[ id ] = editor;
		},
		toggleEditors: function( id )
		{
			_viewers[ id ].toggle();
			_editors[ id ].toggle();
		},
		handleSave: function( id, f )
		{
			if ( _saveFunctions[ id ] == undefined )
			{
				_saveFunctions[ id ] = f;
			}
		},
		edit: function( id )
		{
			if ( _modifiable == true )
			{
				this.toggleEditors( id );
				this.toggleButtons( id );

				_editCount += 1;

				$('#deployButton').attr("disabled", "disabled");
			}
		},
		cancelEdit: function( id )
		{
			if ( _modifiable == true )
			{
				this.toggleEditors( id );
				this.toggleButtons( id );

				_editCount -= 1;

				this.markClean( id );

				if ( _editCount == 0 && _isDeployable )
				{
					$('#deployButton').removeAttr("disabled");
				}
			}
		},
		save: function( id )
		{
			var result;

			if ( _modifiable == true )
			{
				result = _saveFunctions[ id ]();

				if ( result.ok == true )
				{
					$( '#oldDependencyId' ).val( result.oldValue );
					$( '#newDependencyId' ).val( result.newValue );
					$( '#objAction' ).val( 'save' );
					Warehouse.doSubmit( _theForm );
				}
				else	
				{
					alert( result.errMsg );
				}
			}
		},
		markClean: function( id )
		{
			_dirty[ id ] = false;
		},
		markDirty: function( id )
		{
			_dirty[ id ] = true;
		},
		checkContinueWithoutSaving: function()
		{
			var okToContinue = true;

			if ( _editCount > 0 )
			{
				okToContinue == false;
			}
			else
			{
				for ( var key in _dirty )
				{
					if ( _dirty[ key ] )
					{
						okToContinue = false;
						break;
					}
				}
			}

			if ( !okToContinue )
			{
				okToContinue = confirm( LocString( 'Are you sure you want to leave this page without saving your changes?', transportStr ) );
			}

			return okToContinue
		},
		deploy: function()
		{
			var wantDeploy;

			if ( _isDeployable == true )
			{
				wantDeploy = confirm( String.formatLoc( LocString( 'Are you sure you want to deploy %1 to %2?', transportStr ), _currentTransportItem.name, _deploymentTargetName ) );
				if ( wantDeploy && this.checkContinueWithoutSaving() )
				{
					$('#objAction').val('deploy');
					Warehouse.doSubmit( _theForm );
				}
			}
		},
		doCloseForm: function(nextUrl)
		{
			if (this.checkContinueWithoutSaving())
			{
				Warehouse.doCloseForm(nextUrl);
			}
		},
		toggleButtons: function( rowID )
		{
			$( "#editButton" + rowID ).toggle();
			$( "#saveButton" + rowID ).toggle();
			$( "#cancelButton" + rowID ).toggle();
		}
	};
}
