/* Modification date: 2012/02/6  */		
// Version 6.0.2
// These functions provide some useful Ajax based routines for use within WebReports
// Latest version provides the following enhancements:
//	- Better management of HTTP requests to allow asynchronous behavior
//	- Fix for baseURL getting duplicated
//	- Allow URLs as well as WR IDs.
//	- Support for secure token insertion with WR Services requests
//	- Remove plus signs from AJAX messages
//
// The help page for this file can be found at WebReports > Advanced Information > AJAX Function Reference
// If any of the functions change the help page may need to be updated. The file for the help page is wr_ajax_functions.html

var http_request;

// Private Object to manage HTTP requests to keep them separate.  
function HTTPRequestManager () {
	this.requestList = new Array();
	this.index = 0;
}

// Create, store and return the request
HTTPRequestManager.prototype.newRequest = function (uniqueID) { 
	if (uniqueID == undefined) {
		uniqueID = this.index++;
	}
	
	if (window.XMLHttpRequest) { // Mozilla, Netscape
		httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // Internet Explorer
		httpRequest = new ActiveXObject( "Msxml2.XMLHTTP" );
	}
	
	if (!httpRequest) {
		alert('ajax.js - Unable to initiate Ajax request');
		return undefined;
	} else {
		this.requestList[uniqueID] = httpRequest;
		http_request = httpRequest;
		
		return httpRequest;
	}
}

// given a unique ID, return the corresponding request.
HTTPRequestManager.prototype.getRequest = function (uniqueID) {  
	return this.requestList[uniqueID];
}
// given a unique ID, return the corresponding request.
HTTPRequestManager.prototype.clearRequest = function (uniqueID) {  
	this.requestList[uniqueID] = undefined;
}


var httpRequestStore = new HTTPRequestManager();
//------------------------------------------------------------------------------------------------------------


function getURLParm( parm ) {
	var patmatch = RegExp(parm + "=([^&]+)", "i");
	var locationstring = document.location.href;
	var result;
	var result= locationstring.match(patmatch);
	if (result!= null) {
		var parmvalue = result[1];
		return parmvalue;
	} else {
		alert('Invalid parameter "' + parm + '" specified');
	}
}
var debug; // The application can set this to true. 

// Public: executeWRService - Execute a WR service request
function executeWRService( serviceType, responseTarget, parm3, parm4, parm5,parm6) {
	// serviceType	- (Mandatory) one of the supported services, no validation done here
	// responseTarget- (Mandatory) either a user-defined handler function, an HTML object ID or the string name of a variable in the user app 
	// parmList		- (Optional) but can be blank string) list of &name=value parms according to each serviceType	
	// responseType - (Optional) Specifies one of the supported response types e.g. (string,json,xml)
	// getPost		- (Optional) Specifies either GET or POST	
	// secure		- (Optional) Specifies whether or not we will request a secure token prior to initiating the service request
	
	var getPostOptions = 'POST,GET';	
	var respTypeOptions = 'string,json,xml';  
	var secure = false;
	var testParms = /&.+=.+/; 
	var parmList = '';
	var responseType = '';
	var getPost = 'POST'; 	 
	var handlerFunc;
	var tempHTTPrequest;
	
	// First check if there is at least text in the service type. I think we will let the server figure out any error
	if (!serviceType) {
		alert("Ajax.js - executeWRservice function has no serviceType specified. This is a mandatory parameter.");
		return;		
	}
	// First sort out the optional parameters to see what's what
	// This approach isn't the most efficient nesting but is simpler to edit and debug
	var moreParms = true;
	// parm3 - could be: String[parmlist,responsetype,getpost], Boolean[secure]
	if (moreParms && (parm3 != undefined) ) {
		if (typeof(parm3) == 'string') {	// parmList, responsetype, getPost
			if (testParms.test(parm3)) {
				parmList = parm3;
			} else if (respTypeOptions.search(parm3.toLowerCase())!= -1) {
				responseType = parm3;
			} else if (getPostOptions.search(parm3.toUpperCase())!= -1) {
				getPost = parm3;
			} else {
				alert("Ajax.js - executeWRservice function has an invalid 3th parameter. It should be either a parmList (&parm1=value1 etc.) a responseType (" + respTypeOptions + "),  a getPost selection (" + getPostOptions + ") a Boolean specifying 'Secure' on/off or should be omitted.");
				return;
			}
		} else if (typeof(parm3) == 'boolean') {	// Secure
			secure = parm3;
		} else {	// Error
			alert("Ajax.js - executeWRservice function has an invalid 3th parameter. It should be either a parmList (&parm1=value1 etc.) a responseType (" + respTypeOptions + "),  a getPost selection (" + getPostOptions +") a Boolean specifying 'Secure' on/off or should be omitted.");
			return;	
		}
	} else {
		moreParms = false;
	}

	// parm4 - could be: String[responsetype,getpost], Boolean[secure]
	if (moreParms && (parm4 != undefined) ) {
		if (typeof(parm4) == 'string') {	// responsetype, getPost
			if (respTypeOptions.search(parm4.toLowerCase())!= -1) {
				responseType = parm4;
			} else if (getPostOptions.search(parm4.toUpperCase())!= -1) {
				getPost = parm4;
			} else {
				alert("Ajax.js - executeWRservice function has an invalid 4th parameter. It should be either a responseType (" + respTypeOptions + "),  a getPost selection (" + getPostOptions +") a Boolean specifying 'Secure' on/off or should be omitted.");
				return;
			}
		} else if (typeof(parm4) == 'boolean') {	// Secure
			secure = parm4;
		} else {	// Error
			alert("Ajax.js - executeWRservice function has an invalid 4th parameter. It should be either a responseType (" + respTypeOptions + "),  a getPost selection (" + getPostOptions +") a Boolean specifying 'Secure' on/off or should be omitted.");
			return;	
		}
	} else {
		moreParms = false;
	}

	// parm5 - could be: String[getpost], Boolean[secure]
	if (moreParms && (parm5 != undefined) ) {
		if (typeof(parm5) == 'string') {	// getPost
			if (getPostOptions.search(parm5.toUpperCase())!= -1) {
				getPost = parm5;
			} else {
				alert("Ajax.js - executeWRservice function has an invalid 5th parameter. It should be either a getPost selection (" + getPostOptions +") a Boolean specifying 'Secure' on/off or should be omitted.");
				return;
			}
		} else if (typeof(parm5) == 'boolean') {	// Secure
			secure = parm5;
		} else {	// Error
			alert("Ajax.js - executeWRservice function has an invalid 5th parameter. It should be either a getPost selection (" + getPostOptions +") a Boolean specifying 'Secure' on/off or should be omitted.");
			return;	
		}
	} else {
		moreParms = false;
	}

	// parm6 - could be:  Boolean[secure]
	if (moreParms && (parm6 != undefined) ) {
		if (typeof(parm6) == 'boolean') {	// Secure
			secure = parm6;
		} else {
			alert("Ajax.js - executeWRservice function has an invalid 6th parameter. It should be a boolean representing 'Secure' on/off");
		}
	} else {
		moreParms = false;
	}
	// All optional parms now resolved. ParmList or Responsetype could be blank strings. getPost will have either GET or POST, secure will be true/false
	
	// Reserve our HTTP request object
	var tempHTTPrequest = httpRequestStore.newRequest();
	
	// Now figure out whether we have a handlerFunction or a DIV
	if (typeof(responseTarget) != 'function') {	// Maybe a DIV or HTML object of some kind?
		if (document.getElementById(responseTarget) == undefined) {	// Check if it is valid
			alert("Ajax.js - executeWRservice function has an invalid responseTarget (2cnd parameter). This should either be a JavaScript function or a string representing and HTML object ID.");
			return;	
		} else {							 
			handlerFunc = function () {displayContents( this, responseTarget)}; 
		}  
	}   else {	 
		handlerFunc = function () {handleResponse( this, responseTarget )};
	}
													

	var url = '';
	var respType = (responseType)?responseType:'json';	// xml,json,string
	var reqType = getPost;			// get,post


	if (secure) {
		// Initiate a request to get a secure token, the handler will do the next piece.
		url = 'func=webreports.runservice&servicetype=getsecuretoken';	

		// So we will use our own request handler in this case and pass it all the information required for the second phase
		tempHTTPrequest.onreadystatechange = 	function () {executeServiceWithToken(this,handlerFunc, serviceType,respType,reqType,parmList);};

	} else {
		tempHTTPrequest.onreadystatechange = 	handlerFunc;
	
		// Build URL
		url = 'func=webreports.runservice';	
		url += '&servicetype=' + serviceType;

		if (responseType) {
			url += '&responsetype=' + respType;
		}
		url += parmList;	// add any parms (e.g. tagdata, statictag,subtags)
	}; // not secure
	
	// replace any plus signs for compatibility with AJAX
	url = url.replace(/\+/g,'%2B')	
	
	if (reqType.indexOf('GET') > -1) {
		url = '?' + url;
		if (debug) { 		alert(url) };
		tempHTTPrequest.open(reqType , baseURL + url, true); 
		tempHTTPrequest.send( null );
	} else {
		url = '&' + url;
		if (debug) { 		alert(url) };
		tempHTTPrequest.open(reqType , baseURL, true); 
		tempHTTPrequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');		
		tempHTTPrequest.send( url );
	}
	
}


// Private: executeServiceWithToken
function executeServiceWithToken(theHTTPrequest,realHandler,serviceType,responseType,reqType,parmList) {
// Now we should have a token in the HTTPrequest to add to the real request.
	var url = '';
	
	if (theHTTPrequest.readyState != 4) {
		return;
	}
		
	if (theHTTPrequest.status != 200) {
		return;
	}

	var secureToken = '';

	if (theHTTPrequest.responseText != undefined) {
		// # 3642 JG 2012.10.04 
		//secureToken = theHTTPrequest.responseText;
		secureToken = decodeURIComponent(theHTTPrequest.responseText);
	}

	// now we have the token, create the original request.
	var newHTTPrequest = httpRequestStore.newRequest();
	
	newHTTPrequest.onreadystatechange = 	realHandler;

	// Build URL
	url = 'func=webreports.runservice';	
	url += '&servicetype=' + serviceType;

	if (responseType) {
		url += '&responsetype=' + responseType;
	}
	
	url += '&securerequesttoken=' + secureToken;

	url += parmList;	// add any parms (e.g. tagdata, statictag,subtags)

	// Plus signs are escaped
	url = url.replace(/\+/g,'%2B')	

	if (reqType.indexOf('GET') > -1) {
		url = '?' + url;
		if (debug) { 		alert(url) };
		newHTTPrequest.open(reqType , baseURL + url, true); 
		newHTTPrequest.send( null );
	} else {
		url = '&' + url;
		if (debug) { 		alert(url) };
		newHTTPrequest.open(reqType , baseURL, true); 
		newHTTPrequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');		
		newHTTPrequest.send( url );
	}	
}


// Public: updatePage - Send a request to update an element on the page
function updatePage( refParm, HTMLelementID, parm3, parm4 ) {
// refParm could be dataid, nickname (webreports) or a URL. 
	var url ='';
	var JSfunction;
	var optionalParms = '';
	// See if we have optional parms or a function or both. 
	if (parm4) {
		optionalParms = parm3
		JSfunction = parm4
	} else { // only 3 parms. parm 3 could be a string or a function
		if (typeof(parm3) == 'function') {
			JSfunction = parm3;
		} else {
			optionalParms = parm3;
		}
	}
	var tempHTTPrequest = httpRequestStore.newRequest();
	tempHTTPrequest.onreadystatechange = 	function () {displayContents( tempHTTPrequest, HTMLelementID, JSfunction )};;
	sendRequest( refParm, tempHTTPrequest, optionalParms )
}


// Handle the response to the updatePage request
function displayContents( httpRequest, HTMLelementID,JSfunction ) {
	toBeUpdated = document.getElementById( HTMLelementID );
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			if ( toBeUpdated ){
				toBeUpdated.innerHTML = httpRequest.responseText;
				if ( JSfunction ){ // execute any passed function
					JSfunction(toBeUpdated);
				};
				httpRequest = undefined;
			} else {
				alert('Invalid HTML element ID provided for return data');
			}
		} else {
			alert('There was a problem with the request.');
		}
	}
}

// Public: getJSData - Make a request and then run the appropriate function to evaluate the response. 
function getJSData( refParm, parm2, parm3 ) {
// refParm could be a nickname, dataid (webreports) or a URL.
// JSfunction will be run by the request handler if specified. 
	var JSfunction;
	var optionalParms = '';

	// See if we have optional parms or a function or both. 
	if (parm3) {
		optionalParms = parm2
		JSfunction = parm3
	} else { // only 2 parms. parm 2 could be a string or a function
		if (typeof(parm2) == 'function') {
			JSfunction = parm2;
		} else {
			optionalParms = parm2;
		}
	}		
	
	var tempHTTPrequest = httpRequestStore.newRequest();
	tempHTTPrequest.onreadystatechange = 	function () {executeJS( tempHTTPrequest, JSfunction )};
	sendRequest( refParm, tempHTTPrequest, optionalParms )

}

// Handle the response to the request
function executeJS( http_request, JSfunction ) {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			if (http_request.responseText.indexOf('Livelink Error') != -1) {
				var re = /Livelink Error[^\[]*\[(.*)\]/ ; // regexp to find the error message
				re.ignoreCase = true
				var errMsg = re.exec(http_request.responseText);
				alert('executeJS() - ' + errMsg[1]);
			} else {
				eval(http_request.responseText);

				if ( JSfunction ){ // execute any passed function
					JSfunction(http_request);
				};
			};
		} else {
			alert('executeJS() - There was a problem with the request.');
		}
	}
}

// Handle a response generically
function handleResponse( http_request, handlerFunction ) {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {			
			if (http_request.responseText.indexOf('Livelink Error') != -1) {
				var re = /Livelink Error[^\[]*\[(.*)\]/ ; // regexp to find the error message
				re.ignoreCase = true
				var errMsg = re.exec(http_request.responseText);
				alert('handleResponse() - ' + errMsg[1]);
			} else {
				if ( handlerFunction ){ // execute any passed function and pass the request for processing
					handlerFunction(http_request);
				};
			};
		} else {
			alert('There was a problem with the request.');
		}
	}
}


// Public: sendRequest function
function sendRequest( refParm, parm2, parm3, parm4) {

	var url = '';
	var tempURL = '';
	var reqType = 'GET'; // default
	var postParms = '';
	var validReqTypes = 'GET,POST';
	var HTTPreqObj;

	if (typeof(parm2) != 'function') {
		// Test to see if we have an object which means we were passed an HTTPrequest object with handler preset etc.
		if (typeof(parm2) == 'object') {
			// flag that we already have an object and save it
			HTTPreqObj = parm2;
			
		} else {
			alert('ajax.js - a valid function specification (e.g. \'displayContents\') must be provided for sendRequest');
		}
	} else {
		responseFunction = parm2;
	}
	
	if (parm4) { // we have 4 parms, should be reqtype followed by parms
		
		if (validReqTypes.indexOf(parm3.toUpperCase()) > -1) { // have either get or post
			reqType = parm3.toUpperCase();
		} else {
			alert("Ajax.js - sendRequest function has an invalid 3rd parameter. Must be either 'GET' or 'POST'");
		}
		
		if ( (parm4.indexOf('&') > -1) || (parm4.indexOf('?') > -1) || parm4 == '' ) {
			postParms = parm4;
		} else {
			alert("Ajax.js - sendRequest function has an invalid 4th parameter. Must be a list of parms (&x=1,&y=2)");
		}
	} else { // 3 parms
		// See if parm3 is a get/post type
		if (parm3){
			if (validReqTypes.indexOf(parm3.toUpperCase()) > -1) {
				reqType = parm3.toUpperCase();
			} else { // or is it parms?
				if ( (parm3.indexOf('&') > -1) || (parm3.indexOf('?') > -1) || parm3 == '' ) {
					postParms = parm3;
				} else {
					alert("Ajax.js - sendRequest function has an invalid 3rd parameter. Must be either a list of parms (&x=1,&y=2) or a request type ('GET' or 'POST')");
				}
			}
		}
	}
	
	
	
	if (baseURL != undefined) {
		tempURL = baseURL;
	}
	
	// The refParm can either be a  URL or a WebReport dataid or a WebReport nickname so build the URL accordingly
	if (typeof(refParm) == 'string') { // nickname or URL
		// refParm contains & and = then assume URL
		re = /&.+=.+/;
		if (re.exec(refParm) != null) {
			// Found a URL
			url = refParm;
		} else {
			if (tempURL == undefined) {
				alert('ajax.js - A WebReport can\'t be called using a nickname from this page');
				return
			};
			tempURL =  tempURL + '/open/' + refParm; // Open URL
			// need to conver the first parameter to ?parm= from &parm= if this is a GET type request
			if (reqType.indexOf('GET') > -1) {
				postParms = ' ' + postParms;
				postParms = postParms.replace(/ +[&?]/,'?');
			}
		}
		
	} else { // dataid - create "normal" URL
		if (reqType.indexOf('POST') > -1) {
			url ='&';
		} else {
			url ='?';
		}
		url += 'func=ll&objId=' + refParm  + '&objAction=RunReport';
	}

	if ( postParms ){
		url += postParms;
	}
	// Finally we should do any escaping. Currently plus signs are escaped
	url = url.replace(/\+/g,'%2B')	

	// Now that we have the  URL all figured out we can call the main function
	if (HTTPreqObj == undefined) {
	
		HTTPreqObj = httpRequestStore.newRequest();
		
		if ( (HTTPreqObj != undefined) && (responseFunction != undefined)) {
			HTTPreqObj.onreadystatechange = responseFunction;
		};
	}
	
	if (reqType.indexOf('GET') > -1) {
		HTTPreqObj.open(reqType , tempURL + url, true); 
		HTTPreqObj.send( null );
	} else {

		HTTPreqObj.open(reqType , tempURL, true); 
		HTTPreqObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');		
		HTTPreqObj.send( url );
	}

}

