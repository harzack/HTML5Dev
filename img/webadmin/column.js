//
// 	File: webadmin/column.js
//
//	Description: This is a support js file for the column administration
//
//

function removeColumn() {
	var arrAvailableList = new Array();
	var arrLength = 0;

	for (i = 0; i < selectedList.length; i++) {
		if ( (selectedList.options[i].selected) && (selectedList.options[i].attributes.locked.value != 'true') ) {
			var newOpt = new Option(selectedList.options[i].text, selectedList.options[i].value, false, false);
			selectedList.removeChild(selectedList.options[i]);
			availableList[availableList.length] = newOpt;
			i -= 1;
		}
	}
	selectedList.selectedIndex = -1;
	availableList.selectedIndex = -1;

	// sort
	for (i = 0; i < availableList.length; i++) {
		var no = new Option(availableList.options[i].text, availableList.options[i].value, false, false);
		arrAvailableList[arrLength] = no;
		arrLength++;
	}
	arrAvailableList.sort(compareText);
	
	// rebuild
	availableList.length = 0;

	for (i = 0; i < arrAvailableList.length; i++) {
		availableList[i] = arrAvailableList[i];
		availableList.options[i].setAttribute('locked', 'false');
	}

}
function addColumn() {
	for (i = 0; i < availableList.length; i++) {
		if (availableList.options[i].selected) {
			selectedList.appendChild(availableList.options[i]);
			i -= 1;
		}
	}
	
	selectedList.selectedIndex = -1;
	availableList.selectedIndex = -1;
}
function moveUp() {
	for (i = 1; i < selectedList.length; i++) {
		if (selectedList.options[i].selected) {
			swapOptions(selectedList, i - 1, i)
			selectedList.options[i - 1].selected = true;
			selectedList.options[i].selected = false;
		}
	}
}
function moveDown() {
	for (i = selectedList.length - 2; i >= 0; i--) {
		if (selectedList.options[i].selected) {
			swapOptions(selectedList, i, i+1)
			selectedList.options[i + 1].selected = true;
			selectedList.options[i].selected = false;
		}
	}
}
function swapOptions(select, i, j) {
	var topName = select.options[i].text;
	var topValue = select.options[i].value;
	var topStyle = select.options[i].style.color;
	var topLocked = select.options[i].attributes.locked.value;

	var bottomName = select.options[j].text;
	var bottomValue = select.options[j].value;
	var bottomStyle = select.options[j].style.color;
	var bottomLocked = select.options[j].attributes.locked.value;

	select.options[i].text = bottomName;
	select.options[i].value = bottomValue;
	select.options[i].style.color = bottomStyle;
	select.options[i].attributes.locked.value = bottomLocked;

	select.options[j].text = topName;
	select.options[j].value = topValue;
	select.options[j].style.color = topStyle;
	select.options[j].attributes.locked.value = topLocked;
}
function compareText(a, b) {
	var textA = a.text.toLowerCase();
	var textB = b.text.toLowerCase();
	if (textA < textB) {
		return -1;
	}
	if (textA > textB) {
		return 1;
	}
	return 0;
}
function buildLists(theForm) {
	var arrSelected = new Array();
	var arrAvailable = new Array();

	for (i = 0; i < selectedList.length; i++) {
		arrSelected[i] = selectedList.options[i].value;
	}

	for (i = 0; i < availableList.length; i++) {
		arrAvailable[i] = availableList.options[i].value;
	}

	theForm.selected.value = "{" + arrSelected.join(",") + "}";
	theForm.available.value = "{" + arrAvailable.join(",") + "}";

	return true;
}
function resetColumns(theForm, confirmText) {
	var answer = confirm(confirmText);

	if (answer) {
		
		availableList.length = 0;

		for (i = 0; i < defAvailIds.length; i++) {
			availableList[i] = new Option(defAvailNames[i], defAvailIds[i], false, false);
		}

		selectedList.length = 0;

		for (i = 0; i < defSelectIds.length; i++) {
			selectedList[i] = new Option(defSelectNames[i], defSelectIds[i], false, false);
			if (defSelectLocked[i] == '1') {
				selectedList[i].setAttribute('locked', 'true');
				selectedList[i].style.color = "#6D7B8D";
			} else {
				selectedList[i].setAttribute('locked', 'false');
			}
		}
	}
}
