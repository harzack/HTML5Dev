/*  Requests Library - "Modern" theme. 
*		Modification Date: Jan 18, 2012
*		Version: 1.0.0
*	This is a modern twist of the classic theme, using white and blue colors for the status bar.  
*	Comparing this file with the "classic_theme.js" theme will demonstrate how to customize your own theme.
*/

requestQueue.prototype.createStatusDialog = function () {
// prepare a dialog box for showing action progress. Background/foreground color and top/left coords can be altered

	if (! document.body) { return false;}; 
	
	this.initDialog = false;	// init complete
	
		// Check for global constants for colors
	if (RLDialogForeground) {
		this.dialogFG = RLDialogForeground; 	// Foreground color of progress bar
	} else {
		this.dialogFG = "#3D87C6";
	}
	if (RLDialogBackground) {
		this.dialogBG = RLDialogBackground; 	// Background color of progress bar
	} else {
		this.dialogBG = "#FFFFFF";
	}
	if (RLDialogX) {
		this.dialogX = RLDialogX; 	// Horizontal location of progress bar
	} else {
		this.dialogX = 200;
	}	
	if (RLDialogY) {
		this.dialogY  = RLDialogY; 		// Vertical location of progress bar
	} else {
		this.dialogY = 300;
	}		

	var borderCol = '#E0E0E0';  // Color for borders
	
	// divString is the HTML content that will populate the progress bar tables.  The updateStatusBar function below controls when it is visible, updated, and then hidden.
	var divString = '';
	divString += '<table id="progressBox" border="0" align="center" summary=""  bgcolor="' + this.dialogBG + '" width="90%">';
	divString += '<tr><td style="text-align: center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	divString += 'Please wait...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
	divString += '</tr><tr><td><table id="barsTable" cellpadding=1 cellspacing=1 width="100%" height="20" border="0" style="border: 1px solid ' + borderCol + '">';
	divString += '<tr id=statusbar><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
	divString += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table></td></tr></table>';
	// </DIV>';
	// This could be changed to an animated gif by setting the content of divString to an HTML img tag, and editing updateStatusBar() below appropriately to avoid JS errors.
	// eg: divString = '<img src="'+ supportDir +'circleecm_progmeter40x40.gif">';
	
	dv = document.createElement('DIV');
	dv.id = "dialogs";
	dv.name = "dialogs";
	dv.innerHTML = divString;
	
	// Now set any overrides set for the colors and coords (these could be different than the basic style attrs)
	dv.style.top = this.dialogY;
	dv.style.left = this.dialogX;
	dv.style.backgroundColor = this.dialogBG;
	dv.style.border = '1px solid ' + borderCol;
	
	document.body.appendChild(dv);
	return true;
}

requestQueue.prototype.updateStatusBar = function (clear) { 
// updates the progress of the status bar. This can be edited to provide custom progress code.
	var remaining = this.remainingItems();
	if (clear || this.error) {remaining = 0;};
	if (this.initDialog) {
		if (this.createStatusDialog()) {
			document.getElementById('dialogs').style.visibility = "visible"; 			// Reveal progress box
			document.getElementById('statusbar').childNodes[0].bgColor = this.dialogFG	// and first bar.   
		};
	};
	
	if (remaining == 0) {
		// Hide the DIV if the queue is empty:
		document.getElementById('dialogs').style.visibility = "hidden";
		var statusRow= document.getElementById('statusbar');
		for (x=0;x < 10;x++) {
			statusRow.childNodes[x].bgColor = this.dialogBG;  
		};	
	} else {
		var num = this.totalTasks - remaining;
		var statusRow= document.getElementById('statusbar');
		var progress = Math.round(( num * 10)/this.totalTasks);
		if (progress > 9){progress = 9};
		for (x=0;x <= progress;x++) {
			// update the background color of the status bar:
			statusRow.childNodes[x].bgColor = this.dialogFG; 
		};
	};
}