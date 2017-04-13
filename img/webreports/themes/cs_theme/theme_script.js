// All the WR Tags in here need to be converted, either on installation or using a jQuery method?

// var dialogContainer = document.getElementById('dialogs');
dialogContainerTop = "250px";
dialogContainerLeft = "250px";

// needed for FireFox:
var dialogStyle = document.getElementById('dialogStyle');

// Set the width and height of the div that contains the image/progress bar:
var progressBarWidth = "40px";
var progressBarHeight = "40px";

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
		this.dialogBG = "#FFFFFF"
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

	// Place the image you wish to display here:
	var divString = '<img src="'+ supportDir +'circleecm_progmeter40x40.gif" border="0">';
	
	dv = document.createElement('DIV');
	dv.id = "dialogs";
	dv.name = "dialogs";
	dv.innerHTML = divString;

	//Set the individual style properties for now:
	dv.style.top =  this.dialogY; 
	dv.style.left = this.dialogX;
	dv.style.padding = '5px';
	dv.style.height = progressBarHeight;
	dv.style.width = progressBarWidth;

	dv.style.backgroundColor = this.dialogBG;
	
	document.body.appendChild(dv);
	return true;
}

requestQueue.prototype.updateStatusBar = function (clear) { 

	var remaining = this.remainingItems();
	if (clear || this.error) {remaining = 0;};
	if (this.initDialog) {
		if (this.createStatusDialog()) {
			document.getElementById('dialogs').style.visibility = "visible"; 			
		};
	};
	
	if (remaining == 0) {
		document.getElementById('dialogs').style.visibility = "hidden";
	};

	
}

