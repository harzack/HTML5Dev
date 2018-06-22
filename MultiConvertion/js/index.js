/*
	index.js
*/

$(document).ready(function() {
	"use strict";
	$("#convertType").val("Select a ");
	$("#fromMeasure").val("from");
	$("#toMeasure").val("to");
	$("#fromValue").val("0");	
	$("#toValue").val("0");
});

function convertFunction(value, fFrom, fTo) {
	var result = 0;
	switchCode = fFrom + fTo;
	result = ConversionFunc[switchCode](value);
	return result;
}

function getType(selectObject) {
	var selectType = selectObject.value;
	$("#mainTitle").text(selectType + " Conversion").append('</br></br>');
	var fromSelector = document.getElementById("fromSelector");
	var toSelector = document.getElementById("toSelector");
	$("#fromValue").val(0);
	$("#toValue").val(0);
	switch(selectType) {
    case "length":
        var allOptions = {meter : "Meter", kilometer : "Kilometer", centimeter : "Centimeter", millimeter : "Millimeter", mile : "Mile", yard : "Yard", foot : "Foot", inch : "Inch"};
        currentLfrom = fromSelector.length;
        for (i = 0; i < currentLfrom; i++) {
		  fromSelector.remove(fromSelector.options[i]);
		};
		currentLto = toSelector.length;
		for (i = 0; i < currentLto; i++) {
		  toSelector.remove(toSelector.options[i]);
		};
        for (index in allOptions){
    		toSelector.options[toSelector.options.length] = new Option(allOptions[index], index);
    		fromSelector.options[fromSelector.options.length] = new Option(allOptions[index], index);
        };
        break;
    case "temperature":
        var allOptions = {celcius : "Celsius", kelvin : "Kelvin", fahrenheit : "Fahrenheit"};
    	currentLfrom = fromSelector.length;
        for (i = 0; i < currentLfrom; i++) {
		  fromSelector.remove(fromSelector.options[i]);
		};
		currentLto = toSelector.length;
		for (i = 0; i < currentLto; i++) {
		  toSelector.remove(toSelector.options[i]);
		};
        for (index in allOptions){
    		toSelector.options[toSelector.options.length] = new Option(allOptions[index], index);
    		fromSelector.options[fromSelector.options.length] = new Option(allOptions[index], index);
        };
        break;
    case "areas":
        var allOptions = {sqm : "Square Meter", sqkm : "Square Kilometer", sqcm : "Square Centimeter", sqmm : "Square millimeter", hctr: "Hectare", acre : "Acre", sqmile : "Square miles", sqyrd : "Square Yard", sqft : "Square foot", sqin : "Square Inch"};
    	currentLfrom = fromSelector.length;
        for (i = 0; i < currentLfrom; i++) {
		  fromSelector.remove(fromSelector.options[i]);
		};
		currentLto = toSelector.length;
		for (i = 0; i < currentLto; i++) {
		  toSelector.remove(toSelector.options[i]);
		};
        for (index in allOptions){
    		toSelector.options[toSelector.options.length] = new Option(allOptions[index], index);
    		fromSelector.options[fromSelector.options.length] = new Option(allOptions[index], index);
        };
    	break;
    case "volumes":
        var allOptions = {cbmeter : "Cubic Meter", cbkm : "Cubic Kilometer", cbcm : "Cubic Centimeter", cbmm : "Cubic Milimeter", liter : "Liter", mliter : "Milliliter", usgallon : "US Gallon", usquart : "US Quart", uspint : "US Pint", uscup : "US Cup", usfloz : "US Fluid Ounce", ustbsp : "US Table Spoon", ustsp : "US Tea Spoon", impgallon : "Imperial Gallon", impquart : "Imperial Quart", imppint : "Imperial Pint", impfloz : "Imperial Fluid Ounce", imptbsp : "Imperial Table Spoon", imptsp : "Imperial Tea Spoon", cbmile : "Cubic Mile", cbyrd : "Cubic Yard", cbft : "Cubic Foot", cbin : "Cubic Inch"};
    	currentLfrom = fromSelector.length;
        for (i = 0; i < currentLfrom; i++) {
		  fromSelector.remove(fromSelector.options[i]);
		};
		currentLto = toSelector.length;
		for (i = 0; i < currentLto; i++) {
		  toSelector.remove(toSelector.options[i]);
		};
        for (index in allOptions){
    		toSelector.options[toSelector.options.length] = new Option(allOptions[index], index);
    		fromSelector.options[fromSelector.options.length] = new Option(allOptions[index], index);
        };
    	break;
    case "weight":
        var allOptions = {kg : "Kilogram", gr : "Gram", mg : "Milligram", mton : "Metric Ton", lton : "Long Ton", ston : "Short Ton", lbs : "Pound", oz : "Ounce", carrat : "Carrat", amu : "Atomic Mass Unit"};
    	currentLfrom = fromSelector.length;
        for (i = 0; i < currentLfrom; i++) {
		  fromSelector.remove(fromSelector.options[i]);
		};
		currentLto = toSelector.length;
		for (i = 0; i < currentLto; i++) {
		  toSelector.remove(toSelector.options[i]);
		};
        for (index in allOptions){
    		toSelector.options[toSelector.options.length] = new Option(allOptions[index], index);
    		fromSelector.options[fromSelector.options.length] = new Option(allOptions[index], index);
        };
    	break;
    case "speed":
        var allOptions = {ms : "m/s", kmh : "km/h", knots : "Nautical Knots", mph : "Miles/hours"};
    	currentLfrom = fromSelector.length;
        for (i = 0; i < currentLfrom; i++) {
		  fromSelector.remove(fromSelector.options[i]);
		};
		currentLto = toSelector.length;
		for (i = 0; i < currentLto; i++) {
		  toSelector.remove(toSelector.options[i]);
		};
        for (index in allOptions){
    		toSelector.options[toSelector.options.length] = new Option(allOptions[index], index);
    		fromSelector.options[fromSelector.options.length] = new Option(allOptions[index], index);
        };
    	break;
    case "consumption":
        var allOptions = {lp100 : "Litres per 100km", mpg : "Miles per Gallon"};
    	currentLfrom = fromSelector.length;
        for (i = 0; i < currentLfrom; i++) {
		  fromSelector.remove(fromSelector.options[i]);
		};
		currentLto = toSelector.length;
		for (i = 0; i < currentLto; i++) {
		  toSelector.remove(toSelector.options[i]);
		};
        for (index in allOptions){
    		toSelector.options[toSelector.options.length] = new Option(allOptions[index], index);
    		fromSelector.options[fromSelector.options.length] = new Option(allOptions[index], index);
        };
    	break;
    default:
    	currentLfrom = fromSelector.length;
        for (i = 0; i < currentLfrom; i++) {
		  fromSelector.remove(fromSelector.options[i]);
		};
		currentLto = toSelector.length;
		for (i = 0; i < currentLto; i++) {
		  toSelector.remove(toSelector.options[i]);
		};
		$("#convertType").val("Select a ");
		fromSelector.options[0] = new Option("from...");
		toSelector.options[0] = new Option("to...");
} 
};

// whatFrom values: selFrom, selTo, valFrom, valTo
function convert(whatFrom) {
	var conversionType = $( "#convertType" ).val();
	var convertFrom = $( "#fromSelector" ).val();
	var convertTo = $( "#toSelector" ).val();
	var fromValue = $( "#fromValue" ).val();
	var toValue = $( "#toValue" ).val();
	switch(whatFrom) {
		case "selFrom":
			if (convertFrom == convertTo) {
				$( "#fromValue" ).val(toValue);
				}
			else {
				$( "#fromValue" ).val(convertFunction(toValue, convertTo, convertFrom));
			};
			break;
		case "selTo":
			if (convertFrom == convertTo) {
				$( "#toValue" ).val(fromValue);
				}
			else {
				$( "#toValue" ).val(convertFunction(fromValue, convertFrom, convertTo));
			};
			break;
		case "valFrom":
			if (convertFrom == convertTo) {
				$( "#toValue" ).val(fromValue);
				}
			else {
				$( "#toValue" ).val(convertFunction(fromValue, convertFrom, convertTo));
			};
			break;
		case "valTo":
			if (convertFrom == convertTo) {
				$( "#fromValue" ).val(toValue);
				}
			else {
			$( "#fromValue" ).val(convertFunction(toValue, convertTo, convertFrom));
			};
			break;
		default:
			break;
	};
};