//
//	File: webadmin/mimetypedetection.js
//
//	Description: This is a support js file for the MIME type detection  panel.
//

var MIMETypeDetection = new function() 
{
	/*
	 * If the given select list has no entries in it, add a placeholder
	 * element so it is not completely empty.
	 *
	 * @param {HTMLSelectElement} theSelect		Select list to which a placeholder will be added
	 * 
	 * @private
	 */
	function addDefaultOption( theSelect )
	{
		// If there are no items in the list, then add a placeholder
		if ( theSelect.options.length == 0 ) {
			// If adding to the top of the list, on Internet Explorer, you only
			// pass one parameter; on Firefox, you need to include the second
			// parameter as null.
			try {
				theSelect.add( new Option( LocString( "<None>", mimeTypeDetectionStr ), "" ) );
			} catch( ex )
			{
				theSelect.add( new Option( LocString( "<None>", mimeTypeDetectionStr ), "" ), null );
			}
		}
	}

	/*
	 * Determine if the given option is a placeholder
	 *
	 * @param {HTMLOptionElement} theOption		Select list option
	 *
	 * @private
	 */
	function isPlaceholder( theOption )
	{
		return ( theOption.value == "" );
	}

	/*
	 * Move a specific element from the selected methods list to the available
	 * methods list in alphabetical order.  This is a private method called
	 * by RemoveMethods.
	 *
	 * @param {HTMLFormElement} theForm	MIME type detection form
	 * @param {Integer} index		Index in the selected methods list
	 * 
	 * @private
	 */
	function removeMethod( theForm, index )
	{
		var theOption;

		var availableMethods	= theForm.availableMethods;
		var insertBefore	= null;
		var selectedMethods	= theForm.selectedMethods;
		var selected		= selectedMethods.options[ index ];
		var newOption		= new Option( selected.text, selected.value );


		// Make sure we insert into the correct place in the available methods list.
		for ( var i = 0; i < availableMethods.options.length; i += 1 ) {
			theOption = availableMethods.options[ i ];

			// If the next option has an alphabetically greater name, then insert
			// before that one.  Otherwise, we will pass through this loop without
			// setting insertBefore; then insertBefore will be null.
			if ( theOption.text.toLowerCase() > selected.text.toLowerCase() ) {
				insertBefore = theOption;
				break;
			}
		}

		// If insertBefore is null, then add our new option at the end of the list;
		// otherwise, insert it before that option.  There are two different ways to
		// do this, depending on browser.  
		if ( insertBefore == null ) {
			// If adding to the top of the list, on Internet Explorer, you only
			// pass one parameter; on Firefox, you need to include the second
			// parameter as null.
			try {
				availableMethods.add( newOption );
			} 
			catch( ex ) {
				availableMethods.add( newOption, null );
			}
		}
		else {
			// First, try to insert before insertBefore; IE will throw an exception
			// and we can insert before its index.
			try
			{
				availableMethods.add( new Option( selected.text, selected.value ), insertBefore );
			}
			catch( ex )
			{
				availableMethods.add( new Option( selected.text, selected.value ), insertBefore.index );
			}
		}

		// Remove the option we moved to the selected methods list.
		selectedMethods.remove( index );
	}

	/*
	 * If the given select list has a placeholder at the top, and at least
	 * one more entry, remove the placeholder.
	 *
	 * @param {HTMLSelectElement} theSelect 	Select list from which to remove the default option
	 *
	 * @private
	 */
	function removeDefaultOption( theSelect )
	{
		// Only remove the default option if there is more than one in the list and the
		// first one has an empty value.  If there is only one option, we don't want to 
		// remove the placeholder, because it's the only thing in the list.
		if ( theSelect.options.length > 1 && theSelect.options[ 0 ].value == "" ) {
			theSelect.options.remove( 0 );
		}
	}

	return {
		/*
		 * Move a MIME type detection method from the available methods list
		 * to the end of the selected methods list.
		 *
		 * @param {HTMLFormElement} theForm	MIME type detection form
		 * 
		 * @private
		 */
		addMethods: function( theForm )
		{
			var thisOption;

			var availableMethods	= theForm.availableMethods;
			var selectedMethods	= theForm.selectedMethods;
			var toBeRemoved		= new Array();


			// Iterate through the available methods and add any selected ones into the
			// selected methods list.  We store the index in the toBeRemoved array
			// which we will iterate through backwards when removing options.
			for ( var i = 0; i < availableMethods.length; i += 1 ) {
				thisOption = availableMethods.options[ i ];

				if ( thisOption.selected && !isPlaceholder( thisOption ) ) {
					// If adding to the top of the list, on Internet Explorer, you only
					// pass one parameter; on Firefox, you need to include the second
					// parameter as null.
					try {
						selectedMethods.add( new Option( thisOption.text, thisOption.value ) );
					} catch( ex ) {
						selectedMethods.add( new Option( thisOption.text, thisOption.value ), null );
					}
					toBeRemoved.push( i );
				}
			}

			// Remove from the available list, iterating from the end to the beginning so
			// our index counter doesn't get messed up by the deletions.
			for ( var i = toBeRemoved.length - 1; i >= 0; i -= 1 ) {
				availableMethods.remove( toBeRemoved[ i ] );
			}

			// If the only element in the destination list is a placeholder element
			// the remove it before adding a new item
			removeDefaultOption( selectedMethods );

			// If the source list is now empty, add a placeholder
			addDefaultOption( availableMethods );
		},
		/*
		 * Submit the MIME Type Detection configuration form
		 *
		 * @param {HTMLFormElement} theForm	MIME type detection form
		 */
		doSubmit: function( theForm )
		{
			var thisOption;

			var methodList		= '';
			var selectedMethods	= theForm.selectedMethods;


			// Take all of the methods in the selected methods list and
			// create HTML input elements for them so that they get submitted.
			for ( var i = 0; i < selectedMethods.length; i += 1 ) {
				thisOption = selectedMethods.options[ i ];
			
				if ( !isPlaceholder( thisOption ) )
				{
					if ( methodList.length > 0 )
					{
						methodList += ',';
					}
					methodList += "'" + thisOption.value + "'";
				}
			}

			theForm.methods.value = '{' + methodList + '}';
			theForm.submit();
		},
		/*
		 * Move the selected method down in the list of selected detection methods.
		 *
		 * @param {HTMLFormElement} theForm	MIME type detection form
		 */
		moveDown: function( theForm )
		{
			var nextOption;
			var thisOption;

			var lastUnselected	= 0;
			var selectedMethods	= theForm.selectedMethods;


			// We don't allow anything to be moved down below the last unselected
			// item.  This block of objects is just pushed against the end of the
			// list, and allowing moves is only going to switch the ordering unexpectedly.
			for( var i = 0; i < selectedMethods.options.length; i += 1 )
			{
				thisOption = selectedMethods.options[ i ];

				if ( !isPlaceholder( thisOption ) && !thisOption.selected )
				{
					lastUnselected = i;
				}
			}

			for( var i = lastUnselected - 1; i >= 0; i -= 1 )
			{
				thisOption = selectedMethods.options[ i ];

				if ( !isPlaceholder( thisOption ) && thisOption.selected ) 
				{
					nextOption = selectedMethods.options[ i + 1 ];

					try {
						selectedMethods.add( nextOption, thisOption );
					}
					catch( ex ) {
						// Internet Explorer support
						var tmpThisOption = new Option( thisOption.text, thisOption.value, false, thisOption.selected );
						var tmpNextOption = new Option( nextOption.text, nextOption.value, false, nextOption.selected );

						selectedMethods.options[ i + 1 ] = tmpThisOption;
						selectedMethods.options[ i ] = tmpNextOption;
					}
				}
			}
		},
		/*
		 * Move the selected method up in the list of selected detection methods.
		 *
		 * @param {HTMLFormElement} theForm	MIME type detection form
		 */
		moveUp: function( theForm )
		{
			var prevOption;
			var thisOption;

			var selectedMethods	= theForm.selectedMethods;
			var firstUnselected	= selectedMethods.options.length;


			// We don't allow anything to be moved above the first unselected
			// item.  This block of objects is just pushed against the end of the
			// list, and allowing moves is only going to switch the ordering unexpectedly.
			for( var i = 0; i < selectedMethods.options.length; i += 1 )
			{
				thisOption = selectedMethods.options[ i ];

				if ( !isPlaceholder( thisOption ) && !thisOption.selected )
				{
					firstUnselected = i;
					break;
				}
			}

			for( var i = firstUnselected + 1; i < selectedMethods.options.length; i += 1 )
			{
				thisOption = selectedMethods.options[ i ];

				if ( !isPlaceholder( thisOption ) && thisOption.selected )
				{
					prevOption = selectedMethods.options[ i - 1 ];

					if ( !isPlaceholder( prevOption ) )
					{
						try {
							selectedMethods.add( thisOption, prevOption );
						}
						catch( ex ) {
							// Internet Explorer support
							var tmpThisOption = new Option( thisOption.text, thisOption.value, false, thisOption.selected );
							var tmpPrevOption = new Option( prevOption.text, prevOption.value, false, prevOption.selected );

							selectedMethods.options[ i - 1 ] = tmpThisOption;
							selectedMethods.options[ i ] = tmpPrevOption;
						}
					}
				}
			}
		},
		/*
		 * Move all chosen MIME type detection methods from the selected
		 * methods list to the available methods list.  They will be added
		 * in alphabetical order.
		 *
		 * @param {HTMLFormElement} theForm	MIME type detection form
		 */
		removeMethods: function( theForm )
		{
			var theOption;

			var availableMethods = theForm.availableMethods;
			var selectedMethods = theForm.selectedMethods;


			// Go through the list of selected methods; whichever ones are selected,
			// we delete by way of the removeMethod() function.
			for ( var i = theForm.selectedMethods.options.length - 1; i >= 0; i -= 1 ) {
				theOption = theForm.selectedMethods.options[ i ];

				if ( !isPlaceholder( theOption ) && theOption.selected ) {
					removeMethod( theForm, i );
				}
			}

			// If the only element in the destination list is a placeholder element
			// the remove it before adding a new item
			removeDefaultOption( availableMethods );

			// If the source list is now empty, add a placeholder
			addDefaultOption( selectedMethods );
		}
	};
};
