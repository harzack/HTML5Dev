function changeTab(id, newClass,selectionID) {
	var hiddenfield=document.getElementById(selectionID);

	var oldidentity=document.getElementById(hiddenfield.value);
	oldidentity.className="tab_notselected";

	var identity=document.getElementById(id);
	identity.className="tab_selected";

	hiddenfield.value = id;
}

function getPage( url, newID, blockid, selectionID ) {
	changeTab( newID, "tab_selected", selectionID);
	
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	req.onreadystatechange = function() {	
	    	if (req.readyState == 4) {
			if (req.status == 200) {
				parseMessages(blockid);
			} else {
				alert ( "Not able to retrieve new page" );
			}
		}
	}
	    
	req.open("GET", url, true);
	req.send(null);
}

function getPage2( url, blockid ) {
	
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	req.onreadystatechange = function() {	
	    	if (req.readyState == 4) {
			if (req.status == 200) {
				parseMessages(blockid);
			} else {
				alert ( "Not able to retrieve new page" );
			}
		}
	}
	    
	req.open("GET", url, true);
	req.send(null);
}


function parseMessages(blockid) {
	response  = req.responseText;
	document.getElementById(blockid).innerHTML = response;
	
	if( window['ajaxOnLoad_' + blockid] ){
		eval( 'ajaxOnLoad_' + blockid + '()' );
	}
}
