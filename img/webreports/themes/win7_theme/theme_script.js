/*  Requests Library - win7 theme. 
*		Version: 1.0.2
*		Modification Date: 4th July 2013
*	This is a progress bar based on the Windows7 theme.
*/

var progressBarWidth = "350px";
var progressBarHeight = "125px";
var progressBarHeader = supportDir + "webreports/themes/win7_theme/images/headerbg.png";			// background image for the Header of the dialog box
var progressBarActive = supportDir + "webreports/themes/win7_theme/images/barbgactive.png";		// blue shade for the progress bar
var progressBarInActive = supportDir + "webreports/themes/win7_theme/images/barbginactive.png";	// inactive shade for the progress bar
var win7Debug;

requestQueue.prototype.createStatusDialog = function () {

	totalTasks = requests.totalTasks;
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
		this.dialogBG = "#FFFFFF";
	}
	if (RLDialogX) {
		this.dialogX = RLDialogX; 	// Horizontal location of progress bar
	} else {
		this.dialogX = 100;
	}	
	if (RLDialogY) {
		this.dialogY  = RLDialogY; 		// Vertical location of progress bar
	} else {
		this.dialogY = 200;
	}		
	
	this.dialogFooter = "#F0F0F0";

	// The following generates all the HTML content of the progress bar div.
	var divString = '';
	divString += '<div id="pbHeader" style="background:url('+ progressBarHeader +'); height:25px; text-align:left; font-size:medium; padding:5px;">';
	divString += '&nbsp;Processing ' + totalTasks + ' items</div><div id="pbDetails" style="height:28px; text-align:left; padding:5px;">';
	divString += '&nbsp;&nbsp;<b>Please wait...</b><br>&nbsp;&nbsp;Processing <span id="currentTaskNum">0</span> of ' + totalTasks + ' items</div>';
	divString += '<div id="pbProgress" align="center" style="height:25px;">';
	divString += '<table id="barsTable" cellpadding=1 cellspacing=0 width="95%" height="13" style="border: thin solid ' + this.dialogBG + '">';
	divString += '<tr id="statusbar" style="background: url('+ progressBarInActive +')"><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
	divString += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table></div>';
	if (win7Debug) {
		divString += '<div id="currentQueueString" width="100%" style="border-top-width:1px; border-top-style:solid; border-top-color:#DFDFDF; whiteSpace:normal; font-size:xx-small; font-style:italic; padding:5px; background-color:#F0F0F0"></div>';
	}

	// setup the DIV element:
	dv = document.createElement('DIV');
	dv.id = "dialogs";
	dv.name = "dialogs";
	dv.innerHTML = divString;

	//Set the individual style properties:
	dv.style.top = this.dialogY;
	dv.style.left = this.dialogX;
	dv.style.padding = '0px';
	dv.style.height = progressBarHeight;
	dv.style.width = progressBarWidth;
	dv.style.backgroundColor = this.dialogBG;
	dv.style.wordWrap = 'break-word';
	
	// Create the DIV:
	document.body.appendChild(dv);
	return true;
}

requestQueue.prototype.updateStatusBar = function (clear) { 

	var remaining = this.remainingItems();
	if (clear || this.error) {remaining = 0;};
	if (this.initDialog) {
		if (this.createStatusDialog()) {
			// display the progress bar dialog:
			document.getElementById('dialogs').style.visibility = "visible"; 		
			document.getElementById('statusbar').childNodes[0].style.background = 'url('+ progressBarActive +')';	
		};
	};
	
	if (remaining == 0) {
		// Hide and 'reset' the progress bar if the queue is done:
		document.getElementById('dialogs').style.visibility = "hidden";
		var statusRow= document.getElementById('statusbar');
		for (x=0;x < 10;x++) {
			statusRow.childNodes[x].style.background = 'url('+ progressBarInActive+')';
		};	
	} else {
		var curQueueString = document.getElementById('currentQueueString');
		var currentTaskNum = document.getElementById('currentTaskNum');
		var num = this.totalTasks - remaining;
		var statusRow= document.getElementById('statusbar');
		var progress = Math.round(( num * 10)/this.totalTasks);
		if (progress > 9){progress = 9};
		for (x=0;x <= progress;x++) {
			// this is executed once for each object in the queue and is used to change the background image of the progress bar:
			statusRow.childNodes[x].style.background = 'url('+ progressBarActive +')';
			currentTaskNum.innerHTML = num;
			if (win7Debug) {
				curQueueString.innerHTML = requests.queue[num].requestStr;
			}		
		};
	};	
}