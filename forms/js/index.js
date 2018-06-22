/*
	index.js
*/

$(document).ready(function() {
	"use strict";
});

function calcAge() {
	var num1 = document.getElementById("numb1").value;
	var num2 = document.getElementById("numb2").value;
	var total = document.getElementById("total");
	total.value = Number(num1)*10 + Number(num2);
}

function total2numb() {
	var num1 = document.getElementById("boys").value;
	var num2 = document.getElementById("girls").value;
	var total = document.getElementById("totalkids");
	total.value = Number(num1) + Number(num2);
}

function toggleAdult() {
    var age = document.getElementById("total").value;
    var adult = document.getElementById("adult");
    adult.style.display = "none";
    if (age > 18) {
        adult.style.display = "block";
        } 
    else {
        adult.style.display = "none";
        } 
}

function togglelong() {
    var type = document.getElementById("formtype").value;
    var longform = document.getElementById("longform");
    longform.style.display = "none";
    if (type == "simple") {
        longform.style.display = "none";
        } 
    else {
        longform.style.display = "block";
        } 
}