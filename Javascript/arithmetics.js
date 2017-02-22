function init()
{
	var sum = 80 + 20;
	var sub = sum -50;
	var mult = sum * 5;
	var div = sum / 4;
	var mod = sum % 2;
	var inc= ++sum;
	var dec = --sum;
	
	var str="Sum:  "+sum+"<br>Substration: "+sub;
	str +="<br>Multiplication: "+mult+"<br>Division: "+div;
	str +="<br>Modulus: "+mod+"<br>Increment: "+inc;
	str +="<br>Decrement: "+dec;
	
	document.getElementById("panel").innerHTML=str;
}

window.onload=init;