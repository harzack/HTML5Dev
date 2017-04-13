var OTCalendar = function() {
	var $     = OTProto.$;
	var $A    = OTProto.$A;
	var $F    = OTProto.$F;
	var $H    = OTProto.$H;
	var Ajax  = OTProto.Ajax;
	var Event = OTProto.Event;
	
	Object.extend(Date.prototype, {
		getFullMonth : function() {
			return this.pad( this.getMonth() + 1); // 0-based
		},

		getFullDate : function() {
			return this.pad( this.getDate() ); // 0-based
		},

		getFullHours : function() {
			return this.pad( this.getHours() );
		},
			
		getFullMinutes : function() {
			return this.pad( this.getMinutes() );
		},
		
		pad : function( i ) {
			return ( String(i).length == 1 ) ? '0' + i : i;
		}
	});

	function printContent(idContent, idContentTitle, w, h, calSupportPrefix, llSupportPrefix, title){
		var disp_setting
		var content
		var docprint
		
		disp_setting = "toolbar=yes,resizable=yes,location=no,menubar=yes,scrollbars=yes,"; 
		disp_setting += "top=100,left=100,width=" + w + ",height=" + h;

		content = $(idContent).innerHTML;
		contentTitle = $(idContentTitle).innerHTML; 
		
		docprint = window.open("","",disp_setting);
		
		var src = '<html><head><title>' + title + '</title>\n';
		src += '<LINK REL="stylesheet" TYPE="text/css" HREF="' + calSupportPrefix + 'css/cal.css">\n';
		src += '<LINK REL="stylesheet" TYPE="text/css" HREF="' + llSupportPrefix + 'livelink.css">\n';
		src += '<script type="text/javascript" src="' + calSupportPrefix + 'js/calendaritem.js"></script>\n';
		src += '<script type="text/javascript" src="' + calSupportPrefix + 'js/behaviour.js"></script>\n';
		
		src += '</head><body onload="self.print()">\n';
		src += '<div class="cal_nav_center">' + contentTitle + '</div>\n';
		src += content.replace(/<SCRIPT/g, "<!--<SCRIPT").replace(/\/SCRIPT>/g, "SCRIPT>-->");
		src += '\n</body></html>';
		docprint.document.write(src);
		
		docprint.document.close(); 
		docprint.focus(); 

	}

	function trim(str)
	{
		return str.replace(/^\s*|\s*$/g,"");
	}

	function hideQuickEventAdd( url, quickAddEl, showLinkEl, hideLinkEl, stateEl)
	{
		var quickAdd = $(quickAddEl);
		var showlink = $(showLinkEl);
		var hidelink = $(hideLinkEl);

		quickAdd.style.display = 'none';			
		showlink.style.display = 'block';			
		hidelink.style.display = 'none';
		
		$(stateEl).value = 'false';
	}

	function showQuickEventAdd( url, quickAddEl, showLinkEl, hideLinkEl, stateEl)
	{
		var quickAdd = $(quickAddEl);
		var showlink = $(showLinkEl);
		var hidelink = $(hideLinkEl);

		quickAdd.style.display = 'block';			
		showlink.style.display = 'none';			
		hidelink.style.display = 'block';
		
		$(stateEl).value = 'true';
	}

	function saveUserCalendarView( url, tabID, view, showQuickEventBox)
	{
		var pars = 'func=calendar.saveView&tabID=' + tabID + '&view=' + view + '&showQuickEvent=' + showQuickEventBox;
		var myAjax = new Ajax.Request( url, { method: 'get', parameters: pars, onComplete: saveUserCalendarViewResponse }); 
	}

	function saveUserCalendarViewResponse(request)
	{
		var xmlDoc = request.responseXML
		var message = xmlDoc.getElementsByTagName("message");
		
		if(navigator.userAgent.indexOf('MSIE')>=0 && navigator.userAgent.indexOf('Opera')<0){
			alert(message[0].firstChild.nodeValue);
		} else {
			alert(message[0].firstChild.nextSibling.nodeValue)
		}	
	}
	
	window.printContent					= printContent;
	window.trim							= trim;
	window.hideQuickEventAdd			= hideQuickEventAdd;
	window.showQuickEventAdd			= showQuickEventAdd;
	window.saveUserCalendarView			= saveUserCalendarView;
	window.saveUserCalendarViewResponse	= saveUserCalendarViewResponse;
	
	return {
		"printContent" : printContent,
		"trim" : trim,
		"hideQuickEventAdd" : hideQuickEventAdd,
		"showQuickEventAdd" : showQuickEventAdd,
		"saveUserCalendarView" : saveUserCalendarView,
		"saveUserCalendarViewResponse" : saveUserCalendarViewResponse
	};
}();