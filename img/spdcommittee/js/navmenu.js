function getposOffset(what, offsettype)
{
	var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
	var parentEl=what.offsetParent;
	
	while (parentEl!=null)
	{
		totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
		parentEl=parentEl.offsetParent;
	}
	
	return totaloffset;
}


function menuOver(obj, e, id)
{
	obj.style.cursor = 'pointer';
	obj.style.backgroundColor='#DCDCDC';
	
	if( eval( this.document.getElementById("subMenu" + id) ) )
	{	
		dropmenuobj=document.getElementById("subMenu" + id);
		dropmenuobj.style.top=getposOffset(obj, "top") + "px";
		dropmenuobj.style.visibility = "visible";
	}
}

function menuOut(obj, e, id)
{
	obj.style.cursor = '';
	obj.style.backgroundColor='';
	
	var relTarg;

	if (e.relatedTarget) relTarg = e.relatedTarget;
	else if (e.toElement) relTarg = e.toElement;
	
	if( relTarg.id != 'subMenu' + id )
	{
		hideSubMenu("subMenu" + id);
	}
}

function subMenuOut(obj, e, id)
{
	subMenuName = 'subMenu' + id
	menuName = 'menu' + id
	
	if (e.relatedTarget) tg = e.relatedTarget;
	else if (e.toElement) tg = e.toElement;
	
	if( tg.nodeName == 'DIV' )
	{
		if( tg.id != subMenuName && tg.id != menuName )
		{
			hideSubMenu(subMenuName);
		}
	} else if( tg.nodeName == 'A' )
	{
		if( tg.parentNode.id != subMenuName )
		{
			hideSubMenu(subMenuName);
		}

	} else
	{
		hideSubMenu(subMenuName);
	}
}

function hideSubMenu(id)
{
	if( eval( this.document.getElementById(id) ) )
	{
		dropmenuobj=document.getElementById(id);
		dropmenuobj.style.visibility = "hidden";
	}
}
