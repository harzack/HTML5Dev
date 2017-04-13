/**
 * @projectDescription	Used by the webreports editor (webreports-editview.html).
 *
 * @version		1.1.2
 */

/********************************************** drag & drop */

$(function() {
	var selectedSelect;

	function validateSection(section) {
		// Sections are named webreports-footer, webreports-header, webreports-row..  drop the prefix
		var s = section.replace('webreports-', '');
		var validSections = ["header","row","footer"];
		
		if (selectedSelect) {
			validSections = $.json.decode( selectedSelect.attr('sections') );
		};
				
		return ( $.inArray( s, validSections ) >= 0 );
	};

	function getSelectedDragDropData(parm) {	
		switch (parm) {
			case 'paramselector':
				selectedSelect = undefined;
				
				if ($('#paramselector').find('option').size() > 0) {
					return "[LL_REPTAG_&" + $('#paramselector').find('select').val() + ' /]';
				} else {
					return "";
				};
	
			case 'constantselector':
				selectedSelect = undefined;
				
				if ($('#constantselector').find('option').size() > 0) {				
					return "[LL_REPTAG_$" + $('#constantselector').find('select').val() + ' /]';
				} else {
					return "";
				};
				
			case 'controlTagSelector':
				selectedSelect = $('#controlTagSelector option:selected');
				return selectedSelect.attr('ref');
							
			case 'dataTagSelector':
				selectedSelect = $('#dataTagSelector option:selected');
				return selectedSelect.attr('ref');
				
			case 'subTagSelector':
				selectedSelect = $('#subTagSelector option:selected');
				return selectedSelect.attr('ref');		
		};
	};

	// Enable copy to clipboard, if available
	if ( window.clipboardData ) {
		$('img.draggable').click(function() {
			window.clipboardData.setData("Text", getSelectedDragDropData($(this).attr('ref')))
		});
	};
	
	// Internet Exploder
	if ($.browser.msie) {
		$('img.draggable').bind('dragstart', function() {
			var insertText = getSelectedDragDropData( $(this).attr('ref') ); // sets the "active tag"
			window.event.dataTransfer.setData('Text', insertText);	
		});

		// ondrop is flakey with Webkit.  Requres dragover event to be cancelled. See: http://help.dottoro.com/ljbflwps.php		
		$('#wreditor textarea').bind('drop', function() {
			//if ( selectedSelect ) {
				var section = $(this).attr('id');
				
	
				if ( validateSection(section) ) {
					undo.saveUndoBuffer();
					$(this).change();
				} else {
					if (jQuery.browser.version < 8.0) {
					// for some reason this crashes in IE8
						var anchor = selectedSelect.val();
						alert( webreportStr["TagNotSupportedInThisSectionSeeOnlineHelpForDetails"] );
						TagGuide.openHelpWindow(anchor);
					};
					
					return false;
				};
			//};
		});
	} else { // firefox, opera, chrome, safari
		// LLWR-2753 start:
		var dragValueList; // available to drop function too.
		var dragVal;
		
		$('img.draggable').each(function(index, val){
			this.addEventListener('dragstart', function(event) {
				dragValueList = document.getElementById($(this).attr("ref"));
				//if (dragValueList.selectedIndex !== undefined) {
				
				var insertText = getSelectedDragDropData( dragValueList.id );
				event.dataTransfer.setData('Text', insertText);
				/*if (dragValueList.selectedIndex !== undefined ||  != '' ) {
					dragVal = dragValueList[dragValueList.selectedIndex].getAttribute('ref').toUpperCase();
					event.dataTransfer.setData('Text', dragVal); 
				} else {
					event.dataTransfer.setData('Text', '');
				};*/ 
			});
		
		});
		
		// Check for drops:
		$('.valueEditable, ui-droppable').each(function (index, val){
			this.addEventListener('drop', function(event) {
			
				var section = $(this).attr('id'); // header, footer, row
				var tagType = dragValueList.id; //ui.draggable.attr('ref'); // controlTagSelector, dataTagSelector, subTagSelector
				var insertText = getSelectedDragDropData( tagType ); // also sets the "active tag"	

				if ( validateSection(section) ) {
					undo.saveUndoBuffer();
					if (insertText == "") {
						event.preventDefault();
					}
					//text is inserted where it's dropped using the dataTransfer object now.
					//$(this).insertAtCaretPos(insertText).change();
				} else if (selectedSelect) {
					event.preventDefault(); // stop text from being inserted.
					alert( webreportStr["TagNotSupportedInThisSectionSeeOnlineHelpForDetails"] );
					TagGuide.openHelpWindow( selectedSelect.val() );
				};
				
			}); 
		
		});
		// LLWR-2753 end.

	};
});