function init()
{
	var panel=document.getElementById("panel");
	var i=0;
	for ( i=1; i < 11; i++ )
	{
		panel.innerHTML+="Iteration number: "+i+"<br>";
	}
}
window.onload=init;