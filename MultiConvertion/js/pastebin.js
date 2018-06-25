var lengths = ["meter", "kilometer", "centimeter", "millimeter", "mile", "yard", "foot", "inch"];
var temperatures = ["celcius", "kelvin", "fahrenheit"];
var areas = ["sqm", "hctr", "acre", "sqmile", "sqft", "sqin"];
var volumes = ["cbmeter", "liter", "dliter", "cliter", "mliter", "usgallon", "uspint", "uscup", "usfloz", "ustbsp", "ustsp", "cbyrd", "cbft"];
var weights = ["kg", "gr", "mg", "mton", "lton", "ston", "lbs", "oz", "carrat", "amu"];
var speeds = ["ms", "kmh", "knots", "mph"];
var consumptions = ["lp100", "mpg"];

var suffix = "\': function (value) {\n   return (Number(value)).toFixed(2);\n },"

var result = "// Lengths functions: \n";

for (var i = 0; i < lengths.length; i++) {
	for (var j=0; j < lengths.length; j++) {
		if (j != i) {
			var funcname = lengths[i];
			funcname += lengths[j];
			result += ("\n\'" + funcname + suffix);
		}
	}
}
result += "\n// Temperatures functions: \n";
for (var i = 0; i < temperatures.length; i++) {
	for (var j=0; j < temperatures.length; j++) {
		if (j != i) {
			var funcname = temperatures[i];
			funcname += temperatures[j];
			result += ("\n\'" + funcname + suffix);
		}
	}
}
result += "\n// Areas functions: \n";
for (var i = 0; i < areas.length; i++) {
	for (var j=0; j < areas.length; j++) {
		if (j != i) {
			var funcname = areas[i];
			funcname += areas[j];
			result += ("\n\'" + funcname + suffix);
		}
	}
}
result += "\n// Volumes functions: \n";
for (var i = 0; i < volumes.length; i++) {
	for (var j=0; j < volumes.length; j++) {
		if (j != i) {
			var funcname = volumes[i];
			funcname += volumes[j];
			result += ("\n\'" + funcname + suffix);
		}
	}
}
result += "\n// Weights functions: \n";
for (var i = 0; i < weights.length; i++) {
	for (var j=0; j < weights.length; j++) {
		if (j != i) {
			var funcname = weights[i];
			funcname += weights[j];
			result += ("\n\'" + funcname + suffix);
		}
	}
}
result += "\n// Speeds functions: \n";
for (var i = 0; i < speeds.length; i++) {
	for (var j=0; j < speeds.length; j++) {
		if (j != i) {
			var funcname = speeds[i];
			funcname += speeds[j];
			result += ("\n\'" + funcname + suffix);
		}
	}
}
result += "\n// Consumptions functions: \n";
for (var i = 0; i < consumptions.length; i++) {
	for (var j=0; j < consumptions.length; j++) {
		if (j != i) {
			var funcname = consumptions[i];
			funcname += consumptions[j];
			result += ("\n\'" + funcname + suffix);
		}
	}
}

console.log(result);