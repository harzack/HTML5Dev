function init()
{
	var str="Text content in Javascript";
	var num=100;
	var bln=true;
	var fcn=init;
	var obj=document.getElementById("panel");
	
	obj.innerHTML=str + ": " + typeof str;
	obj.innerHTML+="<br>"+num+": "+ typeof num;
	obj.innerHTML+="<br>"+bln+": "+ typeof bln;
	obj.innerHTML+="<br>init(): "+ typeof fcn;
	obj.innerHTML+="<br>"+obj+": "+ typeof obj;
	
	// document.getElementById("panel").innerHTML="Hello... from an external Javascript script.";
	// window.alert('Document loaded');
}

window.onload=init;