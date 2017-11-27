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
	cTemp.value = ((fTemp - 32) * (5 / 9)).toFixed(1);	
}

function convertK2P() {
	var kWeight = document.getElementById("kilogram").value;
	var pWeight = document.getElementById("pound");
	pWeight.value = (kWeight / 0.45359237).toFixed(1);	
}

function convertP2K() {
	var pWeight = document.getElementById("pound").value;
	var kWeight = document.getElementById("kilogram");
	kWeight.value = (pWeight * 0.45359237).toFixed(1);	
}

function convertK2N() {
	var kSpeed = document.getElementById("kmh").value;
	var nSpeed = document.getElementById("noeuds");
	nSpeed.value = (kSpeed / 1.852).toFixed(1);	
}

function convertN2K() {
	var nSpeed = document.getElementById("noeuds").value;
	var kSpeed = document.getElementById("kmh");
	kSpeed.value = (nSpeed * 1.852).toFixed(1);	
}