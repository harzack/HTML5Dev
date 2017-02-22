function init()
{
	var panel=document.getElementById("panel");
	var num=2;
	do
	{
		num *=2;
		panel.innerHTML+="Multiplied by 2 value: " + num + "<br>";
	}
	while (num < 1000);
}
window.onload=init;