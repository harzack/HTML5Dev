var allowedIPList;
var newIPInput;
var _nextEntryId;
var _allowedIPSet;
var _imgPath;
var _VALID_INTEGER = /^((\s*[1-9][0-9]*\s*)|(\s*))$/;
var _VALID_IPv6_REG_EX = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:)))(%.+)?\s*$/;
var _VALID_IPv4_REG_EX = /^\s*(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}\s*$/;

function setMaxHeapSize() {
	var v

	v = document.getElementById("maxHeapSizeDisplay").value;
	v = v.replace(/^\s+|\s+$/g, "");
	if (v == "") {
		v = "0";
	}
	document.getElementById("maxHeapSize").value = v;
}

function btnAddIP_Clicked() {
	var validityCheck;
	var ip;

	ip = newIPInput.value.replace(/^\s+|\s+$/g, "");
	validityCheck = isValidIP(ip);
	if (validityCheck.isValid == true) {
		addIP(ip);
		newIPInput.value = "";
	}
	else {
		alert(validityCheck.msg);
	}
}

function isValidIP(ip) {
	var v
	var m;

	v = true;
	if (_allowedIPSet[ip] != undefined) {
		v = false;
		m = LocString( "There cannot be duplicate items.", javaModuleAdminStr );
	}
	else if ((_VALID_IPv4_REG_EX.test(ip) || _VALID_IPv6_REG_EX.test(ip)) == false) {
		v = false;
		m = LocString( "IP address is not valid.", javaModuleAdminStr );
	}

	return {isValid: v, msg: m};
}

function setClientIPAddresses() {
	var ipStr;

	ipStr = "";
	for (var ip in _allowedIPSet) {
		if (ipStr != "") {
			ipStr += ","
		}
		ipStr += ip;
	}
	document.getElementById("clientIPAddresses").value = ipStr;
}

function addIP(ip) {
	allowedIPList.appendChild(createNewIPDisplayNode(ip));
	_allowedIPSet[ip] = "";
}

function deleteIP(entryId) {
	var ip;
	var entryNode;

	entryNode = document.getElementById(entryId);
	delete _allowedIPSet[entryNode.getAttribute("ip")];
	allowedIPList.removeChild(entryNode);
}

function createNewIPDisplayNode(ip) {
	var ipDisp;
	var delButton;
	var entry;
	var entryId;

	ipDisp = document.createElement("div");
	ipDisp.appendChild(document.createTextNode(ip));
	ipDisp.setAttribute("class", "ip");
	ipDisp.setAttribute("className", "ip");

	delButton = document.createElement("img");
	delButton.setAttribute("src", _imgPath + "uncheck.gif");
	delButton.setAttribute("class", "delete-ip-button");
	delButton.setAttribute("className", "delete-ip-button");

	entryId = _nextEntryId++;
	entry = document.createElement("div");
	entry.setAttribute("id", "entry_" + entryId);
	entry.setAttribute("ip", ip);
	entry.setAttribute("class", "ip-entry");
	entry.setAttribute("className", "ip-entry");
	entry.appendChild(ipDisp);
	delButton.onclick = function() {deleteIP("entry_" + entryId);}
	entry.appendChild(delButton);

	return entry;
}

function validateForm() {
	var v;

	if (_VALID_INTEGER.test(document.getElementById("maxHeapSizeDisplay").value) == false) {
		v = false;
		m = LocString( "Invalid MaxHeapSize. Must be a positive integer.", javaModuleAdminStr )
	}
	else {
		v = true;
		m = "";
	}

	return  {isValid: v, msg: m};
}

function submitJavaModuleAdminForm() {
	var validityCheck;

	setClientIPAddresses();
	validityCheck = validateForm();
	if (validityCheck.isValid == false) {
		alert(validityCheck.msg)
	}

	return validityCheck.isValid;
}

function initJavaModuleAdmin(allowedIPArr, imgPath) {
	document.getElementById("maxHeapSizeDisplay").onchange = setMaxHeapSize;

	_nextEntryId = 1;

	newIPInput = document.getElementById("txtNewIP");
	allowedIPList = document.getElementById("ipList");
	document.getElementById("btnAddIP").onclick = btnAddIP_Clicked;

	_imgPath = imgPath;

	_allowedIPSet = {};
	for (var i = 0; i < allowedIPArr.length; i++) {
		addIP(allowedIPArr[i]);
	}
}
