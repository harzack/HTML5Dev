//
// 	File: webdoc/infoavailability.js
//
//	Description: This is a support js file for the facet tree and column
//		     availability tabs.
//
//	

var InfoAvailability = new function() 
{
	var _imgPrefix;
	var _theForm;
	var _modifyable;
	var _availability;

	var _nextIndex = 1;
	var _locations = new Array();
		
	// Create a location div to add to the document. 
	// This div has a text field and a browse button.
	// There are also +/- buttons to add or remove rows

	function createLocationRow( dataId, path )
	{
		var locationBox;
		var input;
		var a;
		var browseControl;
		var addRemoveCtrls;
		var editable;

		var fieldPrefix = 'location_' + _nextIndex;


		if ( dataId == undefined )
		{
			dataId = 0;
		}
		if ( path == undefined )
		{
			path = '';
		}

		if ( _modifyable && _availability == 'specific' )
		{
			editable = true;
		}
		else
		{
			editable = false;
		}
		
		// Create the outer div
		locationBox = document.createElement( 'div' );
		locationBox.id = 'location_' + _nextIndex;
		locationBox.setAttribute( 'index', _nextIndex );
		locationBox.className = 'location-box';
		
		// Create a box to hold the input fields
		browseControl = document.createElement( 'div' );
		browseControl.className = 'browse-control';
		
		// The location ID is in a hidden element
		input = document.createElement( 'input' );
		input.type = 'hidden';
		input.name = 'location_ID';
		input.id = fieldPrefix + '_ID';
		input.value = dataId;
		browseControl.appendChild( input );

		// A hidden element to store the path
		input = document.createElement( 'input' );
		input.type = 'hidden';
		input.name = 'location_PathSaved';
		input.id = fieldPrefix + '_PathSaved';
		input.value = path;
		browseControl.appendChild( input );
		
		// This text input is intended to display the path without allowing edit
		input = document.createElement( 'input' );
		input.className = 'valueEditable';
		input.title = LocString( "You can't enter text in by hand. Use the button to the right.", infoAvailabilityStr ); 
		input.type = 'text';
		input.name = 'location_Path';
		input.id = fieldPrefix + '_Path';
		input.value = path;
		input.size = '40';
		input.onkeypress = new Function( 'return checkTabKey()' );
		input.disabled = !editable;
		browseControl.appendChild( input );

		// The Browse button			
		input = document.createElement( 'input' );
		input.className = 'button';
		input.type = 'button';
		input.name = fieldPrefix + '_Button';
		input.id = input.name + '_' + _nextIndex;
		input.value = LocString( "Browse Content Server...", infoAvailabilityStr );
		input.onclick = new Function( "doSelectLocation( '" + _theForm.name + "', '" + fieldPrefix + "' );" );
		input.style.margin = '2px';
		input.disabled = !editable;
		browseControl.appendChild( input );
		
		locationBox.appendChild( browseControl );

		// Add row
		if ( editable )
		{
			addRemoveCtrls = document.createElement( 'div' );
			addRemoveCtrls.className = "location-ctrls";
			
			a = document.createElement( 'a' );
			a.href = 'javascript:InfoAvailability.addLocationRow( ' + _nextIndex + ' );';
			a.className = 'add-item-button icn-link';
			a.title = LocString( "Add Location", infoAvailabilityStr );
			a.appendChild( document.createTextNode( LocString( "Add Location", infoAvailabilityStr ) ) );
			addRemoveCtrls.appendChild( a );
			
			// Delete row
			a = document.createElement( 'a' );
			a.href = 'javascript:InfoAvailability.removeLocationRow( ' + _nextIndex + ' );';
			a.className = 'remove-item-button icn-link';
			a.title = LocString( "Remove Location", infoAvailabilityStr );
			a.appendChild( document.createTextNode( LocString( "Remove Location", infoAvailabilityStr ) ) );
			addRemoveCtrls.appendChild( a );			
		
			// {fieldPrefix}_DoSelection is called when an item is selected 
			locationBox.appendChild( addRemoveCtrls );
			window[ fieldPrefix + '_DoSelection' ] = new Function( 'dataId', 'path', 'InfoAvailability.setLocation( ' + _nextIndex + ', dataId, path );' );
		}

		_nextIndex += 1;

		return locationBox;
	}

	// Clears the selection of a location at the given index

	function clearLocation( index )
	{
		$( '#location_' + index + '_ID' ).get( 0 ).value = 0;
		$( '#location_' + index + '_PathSaved' ).get( 0 ).value = '';
		$( '#location_' + index + '_Path' ).get( 0 ).value = '';
	}
	
	return {
		init : function( imgPrefix, theForm, modifyable )
		{
			_theForm = theForm;
			_imgPrefix = imgPrefix;
			_modifyable = modifyable;
		},
		addLocation : function( dataId, path )
		{
			var location = new Object();
			
			location.DataID = dataId;
			location.Path = path;
			_locations[ _locations.length ] = location;
		},
		// Adds a location after the given index		
		addLocationRow : function( index, dataId, path ) 
		{
			$( "#location_" + index ).after( createLocationRow() );
		},
		draw : function()
		{
			for ( var i = 0; i < _theForm.availability.length; i += 1 )
			{
				if ( _theForm.availability[ i ].checked ) 
				{
					_availability = _theForm.availability[ i ].value;
					break;
				}
			}
			
			for ( var i = 0; i < _locations.length; i += 1 )
			{
				$( "#locationList" ).append( createLocationRow( _locations[ i ].DataID, _locations[ i ].Path ) );
			}
		},
		redraw : function()
		{
			$( "#locationList" ).children().remove();
			InfoAvailability.draw();
		},
		// Removes a location at the given index.  If this is the last one, clear
		// the fields instead of removing it completely.
		removeLocationRow : function( index )
		{
			if ( $( '#locationList' ).children().size() == 1 )
			{
				clearLocation( index );
			}
			else
			{
				$( '#location_' + index ).remove();
			}
		},
		// Sets the selection of the item at the given index
		setLocation : function( index, dataId, path )
		{
			var tmpIndex;

			var ok = true;
			var locations = $( '#locationList' ).children();


			// Check for duplicate location selection
			for ( var i = 0; i < locations.length; i += 1 )
			{
				tmpIndex = locations[ i ].getAttribute( 'index' );

				if ( tmpIndex == i )
				{
					continue;
				}

				if ( $( '#location_' + tmpIndex + '_ID' ).get( 0 ).value == dataId )
				{
					alert( LocString( "This location has already been selected.", infoAvailabilityStr ) );
					ok = false;
					break;
				}
			}

			if ( ok )
			{
				$( '#location_' + index + '_ID' ).get( 0 ).value = dataId;
				$( '#location_' + index + '_PathSaved' ).get( 0 ).value = path;
				$( '#location_' + index + '_Path' ).get( 0 ).value = path;
			}
		}
	}
};