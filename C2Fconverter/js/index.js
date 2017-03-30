/*
	index.js
*/

$(document).ready(function() {
	"use strict";
});

function convertC2F() {
	var fTemp = document.getElementById("fahrenheit");
	var cTemp = document.getElementById("celcius").value;
	fTemp.value = ((9 / 5) * cTemp + 32).toFixed(1);
}

function convertF2C() {
	var cTemp = document.getElementById("celcius");
	var fTemp = document.getElementById("fahrenheit").value;
	cTemp.value = (fTemp - 32) * (5 / 9).toFixed(1);	
}