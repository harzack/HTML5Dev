/*  Requests Library - DEFAULT theme. 
*		Modification Date: Jan 18, 2012
*		Version: 1.0.0
*	This theme file is applied system-wide to any applications using the Requests Library.  It is the "Classic" theme from previous versions.  
* 	Altering this file will change all progress bars that are used in any Request Library applications.
*	To apply a separate theme to an individual application, use 'requests.applyTheme()' in the application.
*/

// Check for global constants for colors

requestQueue.prototype.createStatusDialog = function () {
// prepare a dialog box for showing action progress. Background/foreground color and top/left coords can be altered

	if (! document.body) { return false;}; 
	this.initDialog = false;	// init complete
	
	// Check for global constants for colors
	if (RLDialogForeground) {
		this.dialogFG = RLDialogForeground; 	// Foreground color of progress bar
	} else {
		this.dialogFG = "#9999CC";
	}
	if (RLDialogBackground) {
		this.dialogBG = RLDialogBackground; 	// Background color of progress bar
	} else {
		this.dialogBG = "#CCCCFF";
	}
	if (RLDialogX) {
		this.dialogX = RLDialogX; 	// Horizontal location of progress bar
	} else {
		this.dialogX = 200;
	}	
	if (RLDialogY) {
		this.dialogY  = RLDialogY; 		// Vertical location of progress bar
	} else {
		this.dialogY = 400;
	}		

		
	// divString is the HTML content that will generate the progress bar:
	var divString = '';
	divString += '<table id="progressBox" border="0" align="center" summary=""  bgcolor="' + this.dialogBG + '">';
	divString += '<tr><td style="font: bold; text-align: center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	divString += 'Please wait...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
	divString += '</tr><tr><td><table id="barsTable" cellpadding=1 cellspacing=1 width="100%" height="20" border="0" style="border: thin solid ' + this.dialogFG + '">';
	divString += '<tr id=statusbar><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
	divString += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table></td></tr></table>';
	// </DIV>';

	dv = document.createElement('DIV');
	dv.id = "dialogs";
	dv.name = "dialogs";
	dv.innerHTML = divString;

	
	// Now set any overrides set for the colors and coords (these could be different than the basic style attrs)
	dv.style.top = this.dialogY;
	dv.style.left = this.dialogX;
	dv.style.backgroundColor = this.dialogBG;
	// (Foreground is only used for the writing and progress bars etc.)
	
	document.body.appendChild(dv);
	return true;
}

requestQueue.prototype.updateStatusBar = function (clear) { 
// updates the progress of the status bar. This can be overridden to provide custom progress code
	var remaining = this.remainingItems();
	if (clear || this.error) {remaining = 0;};
	if (this.initDialog) {
		if (this.createStatusDialog()) {
			document.getElementById('dialogs').style.visibility = "visible"; 		// Reveal progress box
			document.getElementById('statusbar').childNodes[0].bgColor = this.dialogFG	// and first bar
		};
	};
	
	if (remaining == 0) {
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
   			statusRow.childNodes[x].bgColor = this.dialogFG;
		};
	};

	
}