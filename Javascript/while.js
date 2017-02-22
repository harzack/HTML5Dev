function init()
{
	var panel=document.getElementById("panel");
	var num=70;
	while (num >= 10)
	{
		panel.innerHTML+="Countdown value: " + num + "<br>";
		num -=5;
	}
}
window.onload=init;