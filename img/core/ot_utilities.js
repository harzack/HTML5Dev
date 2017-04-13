/**
 * core/ot_utilities.js
 *
 * A generic javascript library for lightweight utility functions to be used throughout
 * content server.
 *
 */	

// --------------------------------------------------------------------------------------
//
//									 Checkbox Functionality
//
// -------------------------------------------------------------------------------------- 
	
	
/**
 * This function takes an identifier of a 'check all' box, and looks for an associated
 * div that is named 'section' + identifier. It then checks the status of the allbox
 * associated with that series of checkboxes, and makes all the check boxes have the
 * value of the allbox.
 */
function CA( identifier )
{
	try {
		var boxes = document.getElementById('section' + identifier).getElementsByTagName('input');
		var allbox = document.getElementById('allbox' + identifier);
		
		$(boxes).attr("checked", allbox.checked);
	} catch (err) {
		exceptionAlert(err, "Unable to find section with provided identifier: " + identifier);
	}	
}

/**
 * This function takes an identifier and looks for a sequence of checkboxes located in a div
 * named by 'section' + identifier. It then goes through each of the checkboxes to see if
 * all of the checkboxes in that section are checked. If they are all checked, then the
 * allbox is checked for that particular section.
 */
function CCA( identifier )
{
	try {
		var boxes = document.getElementById('section' + identifier).getElementsByTagName('input');
		var allbox = document.getElementById('allbox' + identifier);
		
		var allChecked = true;
		
		// Start at index 1, because the allbox is index 0
		for(var i=1;i<boxes.length;i++){
			if(boxes[i].checked == false)
			{
				allChecked = false;
				break;
			}
		}
		
		if(allChecked) {
			allbox.checked = true;
		} else allbox.checked = false;
	} catch (err) {
		exceptionAlert(err, "Unable to find section with provided identifier: " + identifier);
	}
}