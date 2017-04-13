var ajaxCallDone = false;

function changeTab(id, newClass,selectionID) {
	var hiddenfield=document.getElementById(selectionID);

	var oldidentity=document.getElementById(hiddenfield.value);
	oldidentity.className="tab_unselected";

	var identity=document.getElementById(id);
	identity.className=newClass;
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

function getAddModule( url, blockid ) {
  var getedit = 'getAddModule2("' + url+'", "'+ blockid+'")'
  window.setTimeout(getedit, 30);
}

function getAddModule2( url, blockid ) {

	ajaxCallDone = false;
	url = addTimeToUrl( url )

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    req.onreadystatechange = function() {
	    if (req.readyState == 4) {
	        if (req.status == 200) {
	          parseMessages(blockid);

	          updateHeader();		    	          
	          updateLeftSide();		    	          
	          updateRightSide();		    	          
	          updateFooter();		    	          
	        } else {

	          alert ( "Not able to retrieve new page" );
			    }
      }	
	  }
         
    req.open("GET", url, true);
    req.send(null);
}



function updateLeftSide() {

	if ( ( typeof ( Sortable ) != "undefined" ) && ( typeof (leftside) != "undefined") ) {
		// If there is a Sortable variable refresh the "leftside"
		Sortable.destroy( "leftside" );
	
		Sortable.create("leftside",
		  {
		  	dropOnEmpty:true,
		  	containment:["leftside","rightside","header","footer"],
		  	constraint:false,
		  	handle:"draggableHeader"
		  });		  		  
	}
}


function updateRightSide() {
	
	if ( ( typeof ( Sortable ) != "undefined" ) && ( typeof (rightside) != "undefined") ) {
		// If there is a Sortable variable refresh the "leftside"
		Sortable.destroy( "rightside" );
	
		Sortable.create("rightside",
		  {
		  	dropOnEmpty:true,
		  	containment:["leftside","rightside","header","footer"],
		  	constraint:false,
		  	handle:"draggableHeader"
		  });
	}

}


function updateHeader() {
	
	if ( ( typeof ( Sortable ) != "undefined" ) && ( typeof (header) != "undefined") ) {
		// If there is a Sortable variable refresh the "leftside"
		Sortable.destroy( "header" );
	
		Sortable.create("header",
		  {
		  	dropOnEmpty:true,
		  	containment:["leftside","rightside","header","footer"],
		  	constraint:false,
		  	handle:"draggableHeader"
		  });
	}
}


function updateFooter() {
	
	if ( ( typeof ( Sortable ) != "undefined" ) && ( typeof (footer) != "undefined") ) {
		// If there is a Sortable variable refresh the "leftside"
		Sortable.destroy( "footer" );
	
		Sortable.create("footer",
		  {
		  	dropOnEmpty:true,
		  	containment:["leftside","rightside","header","footer"],
		  	constraint:false,
		  	handle:"draggableHeader"
		  });		  
	}
}



function parseMessages(blockid) {
	response  = req.responseText;
	document.getElementById(blockid).innerHTML = response;
	ajaxCallDone = true;

  shortlinks();
}

function addTimeToUrl( url )
{
	if ( url.indexOf( '?' ) > 0 )
		url += '&'
	else
		url += '?'

	url = url + 'time=' + ( new Date() ).getTime()
	
	return url
}

function hasAjaxCallFinished(){
	return ajaxCallDone;
}
