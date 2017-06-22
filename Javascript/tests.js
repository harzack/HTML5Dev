function tests()
{
    var docnum = 199;
	var mod36 = docnum % 36;
    docnum = (docnum - mod36) / 36;
    var filename = "1st character: "+String.fromCharCode(mod36 + 55)+"<br>Modulo 36: "+mod36+"<br>New docnum: "+docnum;

    document.getElementById("edocs").innerHTML=filename
}

window.onload=tests;

