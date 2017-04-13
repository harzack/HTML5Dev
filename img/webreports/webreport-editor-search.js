/**
 * Copyright 2011 Resonate KT Limited
 *  
 * @projectDescription	Used by the webreports editor (webreports-editview.html).
 *
 * @author		Christopher Meyer cmeyer@resonatekt.com
 * @version		1.1.0
 */

// these variables allow us to keep track of what section the search is
// in, what the index was and whether anything was found between user clicks
var lastIndex = 0;
var area = "webreports-header";

$(function () {
	// opens the constant and parameters tabs in their own window.
	// if the link is hit a second time this should bring it into focus rather than open a new one
	function openTabWindow(tabType) {
		// var url = '`request.SCRIPT_NAME`?func=ll&objId=`request.objId`&objAction=' + tabType + '&nexturl=`Web.Escape(nextURL)`';
		// var url = $.LL.cgiPath() + '?func=ll&objId=' + $.getURLParam('objid') + '&objAction=' + tabType; //  + '&nexturl=`Web.Escape(nextURL)`';
		/*
		var url = $.tmpl("#{cgi}?func=ll&objId=#{objid}&objAction=#{objaction}&nexturl=#{nexturl}", {
			cgi: $.LL.cgiPath(),
			objid: $.getURLParam('objid'),
			objaction: tabType,
			nexturl: escape( $('input[NAME="nextURL"]').val() )
		});
		*/
		
		handle = undo.windowopen(tabLink(tabType), tabType, "width=1200, height=600, resizable=yes, menubar=yes, scrollbars=yes, toolbar=yes, location=yes");
		handle.focus();
	};
	
	function tabLink(tabType) {
		return $.tmpl("#{cgi}?func=ll&objId=#{objid}&objAction=#{objaction}&nexturl=#{nexturl}", {
			cgi: $.LL.cgiPath(),
			objid: $.getURLParam('objid'),
			objaction: tabType,
			nexturl: escape( $('input[NAME="nextURL"]').val() )
		});
	};
	
	if ($.fancybox) {
		$('a[ref="Parameters"],a[ref="Constants"]').each(function() {
			var $this = $(this);
			var ref = $this.attr('ref');
			$this.attr('href', tabLink(ref)).attr('title', ref + ' Tab');
		}).addClass('iframe').fancybox({
			width:'95%',
			height:'95%'
		});
	} else {
		$("a[ref='Parameters'], a[ref='Constants']").click(function() {
			openTabWindow($(this).attr('ref'));
			return false;
		});
	};
});

function countCarriageReturns(tmpStr) {
	tempArray = tmpStr.split('\r\n');
	carriageReturns = tempArray.length;
	if (carriageReturns == null) {
		carriageReturns = 0;
	};
	return carriageReturns;
};

function getSection() {
	return document.getElementById(area);
};

function setSection() {
	switch (area) {
		case "webreports-header":
			area = "webreports-row";
			break;
		case "webreports-row":
			area = "webreports-footer";
			break;
		case "webreports-footer":
			area = "webreports-header";
			break;
	};
	return getSection();
};

function updateSelection(range, startAt, length) {
	range.collapse(true);
	range.moveStart('character', startAt);
	range.moveEnd('character', length);
	range.select();
};

function clearSearchVariables() {
	lastIndex = 0;
	area = "webreports-header";
};


function searchRV() {
	// it a new search so turn off the no hits sign
	// We do this check bc "nohits" is only defined in IE
	if (document.getElementById("nohits") != null) {
		document.getElementById("nohits").style.display = "none";
	};

	// check whether we're case sensitive
	var caseSense = document.getElementById("case").checked;
			
	if (caseSense) {
		searchText = document.getElementById("searchfield").value;
	} else {
		searchText = document.getElementById("searchfield").value.toLowerCase();
	};

	var tmpIndex = -1;

	while (tmpIndex == -1) {
		section = getSection();
		section.focus();
		range = section.createTextRange();
		tmpStr = range.text.slice(lastIndex);
		if (caseSense) {
			tmpIndex = tmpStr.indexOf(searchText);
		} else {
			tmpIndex = tmpStr.toLowerCase().indexOf(searchText);
		};
		lastIndex += tmpIndex;
		if (tmpIndex == -1) {
			lastIndex = 0;
			if (section.id == "webreports-footer") { // we didn't find anything, put the focus back to the header and inform the user
				document.getElementById("webreports-header").focus();

				// We do this check bc "nohits" is only defined in IE
				if (document.getElementById("nohits") != null) {
					document.getElementById("nohits").style.display = "";
				};

				setSection();
				return;
			};
			setSection();
		};
	};

	if (tmpIndex != -1) {
		// only try and select if we found something - this is a double measure as we
		// should have already returned
		tmpStr = range.text.slice(0, lastIndex);
		carriageReturns = countCarriageReturns(tmpStr);
		startIndex = lastIndex - carriageReturns + 1;
		lastIndex = startIndex + searchText.length + carriageReturns;
		updateSelection(range, startIndex, searchText.length);
	};
};

function replace() {; // only try and place if we have something selected
	if (document.selection.createRange().text.length > 0) {; // before we change anything save what we have into the undo buffer
		undo.saveUndoBuffer();; // we need to update lastIndex so that the next search starts at the right spot
		lastIndex -= (document.selection.createRange().text.length - document.getElementById("replacefield").value.length) + 1;
		document.selection.createRange().text = document.getElementById("replacefield").value;
	}; // select the next match
	searchRV();
};

function toggleSearch() {
	$('#div_search').toggle('fast');
};


function highlightError(section, startIndex) {
	var start = startIndex;
	section.focus();

	if (section.createTextRange) { // put the textarea in a range
		var range = section.createTextRange();

		// get the string up to the point of the error
		tmpStr = range.text.slice(0, startIndex - 1);

		// count the carriage returns in the string
		// this is necessarry to add in as an offset otherwise the offsets
		// won't add up
		carriageReturns = countCarriageReturns(tmpStr);

		// calculate the start of the highlighting
		startIndex = startIndex - carriageReturns;

		// get the remaining string that is after the error point
		tmpStr = range.text.slice(start - 1);; // within the string find the end of the line
		endIndex = tmpStr.indexOf('\r\n');

		// if there is no eol we have a boundry condition (-1) such as
		// hitting the end of the textarea
		if (endIndex == -1) {
			endIndex = tmpStr.length;
		};
		updateSelection(range, startIndex, endIndex);
	};
};



function showError(errorPosition) {
	var header = document.getElementById("webreports-header");
	var row = document.getElementById("webreports-row");
	var footer = document.getElementById("webreports-footer");

	var startLen = "[LL_WEBREPORT_STARTROW /]".length;
	var endLen = "[LL_WEBREPORT_ENDROW /]".length;
	var headerLen = header.value.length;
	var rowLen = row.value.length;
	var footerLen = footer.value.length;

	// if the error position is past the length of the header text plus the startrow tag
	if (headerLen + startLen > errorPosition) {
		highlightError(header, errorPosition);

		// if the error position is past the length of the header text, startrow tag, row text and endrow tag
	} else if (headerLen + rowLen + startLen + endLen > errorPosition) {
		highlightError(row, errorPosition - headerLen - startLen);

		// the error must be in the footer
	} else {
		highlightError(footer, errorPosition - headerLen - rowLen - startLen - endLen);
	};
};