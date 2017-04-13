var dirty = false;
var ajaxURL;
var ajaxFunc;
var ajaxMsg;
var cancelURL;

function setDirty()
{
	dirty = true;
}

function clearDirty()
{
	dirty = false;
}

function updateAllExamples()
{
	$(".dateTimeCheckbox").each(function(){ $(this).triggerHandler("click"); } );
}

function setupAJAX(url, exampleFunc, updatingMessage, backButtonURL)
{
	ajaxURL = url;
	ajaxFunc = exampleFunc;
	ajaxMsg = updatingMessage;
	cancelURL = backButtonURL;
	$("#resetButton").trigger("click");
}

function confirmCancel(msg)
{
	if ( ( dirty && confirm(msg) ) || !dirty)
	{
		location.href = cancelURL
	}
}

function valueChanged(langCode, section)
{
	if (!langCode || !section)
		return;
	
	var idPrefix = langCode + section;
	var currentID;
	var postData = new Object();
	
	currentID = idPrefix + "DateSeqFormat";
	postData["DateSeqFormat"] = document.getElementById(currentID).value;
	
	currentID = idPrefix + "YearFormat";
	postData["YearFormat"] = document.getElementById(currentID).value;
	
	if (section == "Input")
	{
		currentID = langCode + "SeparateCentury";
		postData["SeparateCentury"] = document.getElementById(currentID).checked;
	}
	
	
	currentID = idPrefix + "CharSeparator1";
	postData["CharSeparator1"] = document.getElementById(currentID).value;
	
	currentID = idPrefix + "CharSeparator2";
	postData["CharSeparator2"] = document.getElementById(currentID).value;
	
	currentID = idPrefix + "CharSeparator3";
	if (document.getElementById(currentID))
		postData["CharSeparator3"] = document.getElementById(currentID).value;
	
	if (section != "Short")
	{
		currentID = idPrefix + "TimeFormat";
		postData["TimeFormat"] = document.getElementById(currentID).value;
	}
	
	if (ajaxURL && ajaxFunc)
	{
		if (ajaxMsg)
			$("#" + idPrefix + "Example").text(ajaxMsg);
		postData["func"] = ajaxFunc;
		$("#" + idPrefix + "Example").load(ajaxURL, postData);
	}
}

function yearFormatChanged(checker, id)
{
	var fullYear = "" + new Date().getFullYear();
	var shortYear = fullYear.substring(2);
	
	if (checker.checked)
	{
		document.getElementById(id + "YearFormat").value = "1"
		$("#" + id + "DateSeqFormat option").each(function(i){
			this.innerHTML = this.innerHTML.replace(new RegExp(fullYear), shortYear);
		});
	}
	else
	{
		document.getElementById(id + "YearFormat").value = "2"
		$("#" + id + "DateSeqFormat option").each(function(i){
			this.innerHTML = this.innerHTML.replace(new RegExp("^" + shortYear), fullYear);
			this.innerHTML = this.innerHTML.replace(new RegExp(" " + shortYear), " " + fullYear);
		});
	}
}

function timeFormatChanged(checker, id)
{
	if (checker.checked)
		document.getElementById(id).value = "2"
	else
		document.getElementById(id).value = "1"
}