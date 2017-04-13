[/*	Title: page.js
	
	- Reworked by Stephen Yoo (Dec 2, 2009)
	- The help page for this file can be found at WebReports > Advanced Information > Page Function Reference
	- If any of the functions change the help page may need to be updated. The file for the help page is wr_getPage_info.html
*/]

function getPage(baseURL, page, dataCount, pageSize, ip1, ip2, startParm, endParm){

	// baseURL	?func=ll&objId=xyz&objAction=RunReport
	// dataCount	total number of rows
	// pageSize	number of rows to display per page
	// ip1		current value of first parameter
	// ip2		current value of second parameter
	// startParm	the start parameter name - eg inputLabel1 (default)
	// endParm	the end parameter name - eg inputLabel2 (default)

	var startRow;
	var startParmVal;
	var endParmVal;
	
	if (!startParm) {
		startParm = "inputLabel1";
	}
	
	if (!endParm) {
		endParm = "inputLabel2";
	}
	
	ip1 = Number(ip1);
	if (isNaN(ip1)){
		alert("Invalid parameter provided for: " + startParm );
		return;
	}

	ip2 = Number(ip2);
	if (isNaN(ip2)){
		alert("Invalid parameter provided for: " + endParm );
		return;
	}

	pageSize = Number(pageSize);
	if (isNaN(pageSize)) {
		pageSize = 10;
	}
	
	dataCount = Number(dataCount);
	if (isNaN(dataCount)) {
		dataCount = 1;
	}
	
	if (pageSize > dataCount) {
		// If the number of rows to display per page is greater than the total number of rows, set to dataCount
		pageSize = dataCount;	
	}
	
	if (baseURL && baseURL != ""){
		url = baseURL;
	} else {
		alert("baseURL parameter must be defined");
		return;
	}
	
	switch ( page ) {
		case "first":
			startParmVal = 1;
			if ( dataCount >= pageSize ){			
				endParmVal = pageSize;
			} else {
				// we don't have enough results for a one full page so we just display what we have
				endParmVal = dataCount;
			}		
		break;
		case "prev":
			if ((ip1 - pageSize) >= 1 ) {
				startParmVal = Number(ip1 - pageSize);
				endParmVal = Number(ip1 - 1);
			} else {
				startParmVal = 1;
				if ((ip1 + pageSize) >= dataCount ) {
					// the whole data set fits into the first page
					endParmVal = dataCount;
				} else {
					// first page
					endParmVal = pageSize;
				}
			}				
		break;
		case "next":
			if ((ip2 + pageSize) <= dataCount ) {
				startParmVal = Number(ip1 + pageSize);
				endParmVal = Number(ip2 + pageSize);
			} else {
				//  Display the last page
				if ( (dataCount % pageSize) == 0) {
					// Mod is 0 we just need to subtract the pageSize from the dataCount and add 1
					startParmVal = Number(dataCount - pageSize + 1);			
				} else {
					// Less than pageSize items need to be shown, subtract the Mod from the dataCount and add 1
					startParmVal = Number(dataCount - (dataCount % pageSize) +1);			
				}
				endParmVal = dataCount;
			}
		break;
		case "last":
			//  Display the last page
			if ( (dataCount % pageSize) == 0) {
				// Mod is 0 we just need to subtract the pageSize from the dataCount and add 1
				startParmVal = Number(dataCount - pageSize + 1);			
			} else {
				// Less than pageSize items need to be shown, subtract the Mod from the dataCount and add 1
				startParmVal = Number(dataCount - (dataCount % pageSize) +1);			
			}
			
			endParmVal = dataCount;
		break;
	}
	
	/** Validation checks - to see if we have negative start and end parameters **/
	if (startParmVal < 0) {
		// We set the startParm to 1 if we find this to be 0
		startParmVal = 1;	
	}
	
	if (endParmVal < 0) {
		// Default to display 10
		endParmVal = 10;	
	}	
	
	// Build the url
	url += "&" + startParm + "=" + startParmVal + "&" + endParm + "=" + endParmVal;	
	
	// run the WebReport again with the new parameters
	document.location = url;
}