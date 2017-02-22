function stringify( argA, argB, argC, argD)
{
var str=argA+" "+argB+" "+argC+" "+argD+"<br>";
return str;
}

function init()
{
	document.getElementById("panel").innerHTML += stringify("JavaScript", "Is", "Very", "Easy");
	document.getElementById("panel").innerHTML += stringify("Alex", "Is", "Learning", "It");
}
window.onload=init;