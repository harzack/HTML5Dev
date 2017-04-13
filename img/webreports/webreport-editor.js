/**
 * @projectDescription	Used by the webreports editor (webreports-editview.html).
 *
 * @version		1.1.5
 */

/********************************************** General inits */

$(function () {
	if (isIE == 1) {
		$('#div_search').bgiframe().css($('#anchor_search').offset());
	}
		
	// Refresh buttons next to Parms & Constants
	$('#wreditor a[ref]').click(function () {
		var ref = $(this).attr('ref');
		var href = $(this).attr('href');
		$(ref).load(href);
		return false;
	});
	
});


/********************************************** Button Bar */

// #3046 we need a function so we can request a token first.
function postSubmit(httpRequest,apply) {

	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			temp = eval('(' + httpRequest.responseText + ')');
			
			if ((temp != undefined)&& (temp.ok)) {
				document.getElementById('securerequesttoken').value = temp.token;				
				$("form[name='EditViewFrm']").find("input[name='apply']").val(apply);
				$("form[name='EditViewFrm']")[0].submit();
			}
			// #3636 JG 2012.09.24
			if ((temp != undefined)&& (!temp.ok)) {
				alert(temp.errMsg);
			}
		}
	}
}

var httpRequest;

function preSubmit(apply) {
	// get a token, set the form field, and then allow the submit. 
	
	baseURL = $.LL.cgiPath()
	// First start an AJAX request
	if (window.XMLHttpRequest) { // Mozilla, Netscape
		httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // Internet Explorer
		httpRequest = new ActiveXObject( "Msxml2.XMLHTTP" );
	}

	httpRequest.onreadystatechange = function() {postSubmit(httpRequest,apply)};

	url = '&func=ll.GetRequestToken';
	httpRequest.open('POST', baseURL, true);
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');		
	httpRequest.send( url );

}


$(function () {
	function doSubmit(apply) {
		undo.deactivate();

		//#2946 we need a function so we can request a token first. 
		if ( document.getElementById('securerequesttoken') != undefined	) {
			// if we have a token field this indicates we need to refresh it now. 
			preSubmit(apply);
		} else {
			// Normal submit
			$("form[name='EditViewFrm']").find("input[name='apply']").val(apply);
			$("form[name='EditViewFrm']")[0].submit();
		}

	};

//#3046
	$('input.debugExport').click(function() {
		if (confirm( webreportStr["DebugExportCreatesAnExportOfYourReportToAssistCustomerSupportWithDebugging"] )) {
			var $objAction = $("form[name='EditViewFrm'] input[name='objAction']");	
			var objAction = $objAction.val();	
			$objAction.val("debugexport");
			$("form[name='EditViewFrm']")[0].submit();
			$objAction.val(objAction);
		};
		
		return false;
	});

	$('input.resetButton').click(function () {
		if (confirm( webreportStr["ResettingWillLoseYourChanges"] )) {
			// $("form[name='EditViewFrm']")[0].reset();
			$('#wreditor textarea').each(function(index, element) {
				$(element).val( element.defaultValue );
			});

			undo.saveUndoBuffer();
		};
		return false;
	});

	$('input.addVersionButton').click(function () {
		doSubmit(0);
		return false;
	});

	$('input.addVersionContinueButton').click(function () {
		doSubmit(1);
		return false;
	});

	$('input.cancelButton').click(function () {
		try {
			// IE has a problem with beforeunload
			document.location = $("input[name='nextURL']").val();
		} catch (err) {};
		return false;
	});
});

/********************************************** Help Window (aka TagGuide) */
var TagGuide = (function() {
	var onlinehelp = null;
	var CGIPath = $.LL.cgiPath();
	
	function url(anchor) {
		anchor = (anchor == undefined) ? '' : '#' + anchor; // LLWR-2753
		return CGIPath + '/rkt/tagguide/' + anchor; // LLWR-2753
	};
	
	return {
		openHelpWindow: function(anchor) {	
			onlinehelp = undo.windowopen( url(anchor), 'SyntaxGuide', "width=1100,height=500,resizable=yes,menubar=yes,scrollbars=yes,toolbar=yes");

			if (onlinehelp != null) {
				onlinehelp.focus();
			};
		},
		
		updateHelpWindow: function(anchor) {
			if (onlinehelp == null) {
				return;
			} else {
				if (!onlinehelp.closed) {
					// the help window is open in the background, move the scroll to the help section reflecting the current selection
					onlinehelp = undo.windowopen(url(anchor), 'SyntaxGuide', "width=1100,height=500,resizable=yes,menubar=yes,scrollbars=yes,toolbar=yes");
				};
			};
		}
	};
})();



$(function () {
	// Links to open the help window
	$("a[href='#controlTagSelector']").click(function () {
		TagGuide.openHelpWindow( $('#controlTagSelector').val() );
		return false;
	});

	$("a[href='#dataTagSelector']").click(function () {
		TagGuide.openHelpWindow( $('#dataTagSelector').val() );
		return false;
	});
	
	$("a[href='#subTagSelector']").click(function () {
		TagGuide.openHelpWindow( $('#subTagSelector').val() );
		return false;
	});

	$('#controlTagSelector').change(function () {
		TagGuide.updateHelpWindow( $(this).val() );
	});
	
	$('#dataTagSelector').change(function () {
		TagGuide.updateHelpWindow( $(this).val() );
	});

	$('#subTagSelector').change(function () {
		TagGuide.updateHelpWindow( $(this).val() );
	});

	$('#tagguide').click(function () {
		TagGuide.openHelpWindow('top');
		return false;
	});
});


/********************************************** Hover Buttons */
$(function () {
	$("input.hover").hover(
		function () {
			$(this).attr('src', this.src.replace('.gif', '_on.gif'));
		}, 
		function () {
			$(this).attr('src', this.src.replace('_on.gif', '.gif'));
		}
	);
});