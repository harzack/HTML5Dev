/**
 * Copyright 2011 Resonate KT Limited
 *  
 * @projectDescription	Used by the webreports editor (webreports-editview.html).
 *
 * @author		Christopher Meyer cmeyer@resonatekt.com
 * @version		1.1.0
 */

/********************************************** Check for Updates */
$(function () {
	// var cookieName = 'WRupdatealert';
	// var cookieValue = 'noalert';

	function openUpdate() {
		// var url = $.LL.cgiPath() + '?func=webreports.updatecheck';
		
		/*
		if ($('#updatecheckbox').is(':checked')) {; // next time this user won't get the div with the check for update message in
			; // GRP hidden temporarily to allow cookie approach url += '&showupdate=false';
			var expireDate = new Date();
			var oneYearExp = expireDate.getTime() + (365 * 24 * 60 * 60 * 1000);
			expireDate.setTime(oneYearExp);

			$.cookie(cookieName, cookieValue, {
				expires: expireDate
			});
		};
		*/

		var url = $('#updateCheckURL').val();

		var updateCheck = undo.windowopen(url, 'updateCheck', "width=1100,height=500,location=yes,resizable=yes,menubar=yes,scrollbars=yes,toolbar=yes");

		if (updateCheck != null) {
			updateCheck.focus();
		};
	}

	$('#div_alert').dialog({
		modal: true,
		autoOpen: false,
		width: '600px',
		draggable: false,
		buttons: {
			"Cancel": function () {
				$(this).dialog("close");
			},
			"OK": function () {
				openUpdate();
				$(this).dialog("close");
			}
		}
	});

	$('#anchor_alert').click(function () {
		/*
		if ($.cookie(cookieName) == cookieValue) {
			openUpdate();
		} else {
			$('#div_alert').dialog('open');
		};
		*/
		
		openUpdate();

		return false;
	});
});