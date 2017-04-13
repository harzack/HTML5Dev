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


	if(( relTarg == null ) || ( relTarg.id != 'subMenu' + id ))
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

function showSidebarContent(sidebarid)
{
	var sidebar = document.getElementById('sidebar' + sidebarid);
	var divider = document.getElementById('divider' + sidebarid);
	var showSidebarLink = document.getElementById('showSidebarLink' + sidebarid);
	var hideSidebarLink = document.getElementById('hideSidebarLink' + sidebarid);
	sidebar.style.display = 'block';
	divider.style.display = 'block';
	showSidebarLink.style.display = 'none';
	hideSidebarLink.style.display = 'inline';
	
	saveSidebarState( 'sidebar', sidebarid, '1' )
}

function hideSidebarContent(sidebarid)
{
	var sidebar = document.getElementById('sidebar' + sidebarid);
	var divider = document.getElementById('divider' + sidebarid);
	var hideSidebarLink = document.getElementById('hideSidebarLink' + sidebarid);
	var showlink = document.getElementById('showSidebarLink' + sidebarid);
	sidebar.style.display = 'none';
	divider.style.display = 'none';
	showlink.style.display = 'inline';
	hideSidebarLink.style.display = 'none';
	
	saveSidebarState( 'sidebar', sidebarid, '0' )
}

function onShowMenuClick()
{
// 	new Effect.Appear('NavBarComponent');
	var navbar = document.getElementById('NavBarMenus');

   	var addlink = document.getElementById('showLink');
   	var closelink = document.getElementById('hideLink');

	navbar.style.display = 'block';			
	addlink.style.display = 'none';			
	closelink.style.display = 'block';			
	
	saveSidebarState( 'navmenu', '', '1' )
	
	return false;
}

function onHideMenuClick()
{
//  	new Effect.Fade('NavBarComponent');

 	var navbar = document.getElementById('NavBarMenus');
 	var addlink = document.getElementById('showLink');
   	var closelink = document.getElementById('hideLink');

	navbar.style.display = 'none';			
	addlink.style.display = 'block';			
	closelink.style.display = 'none';			
	
	saveSidebarState( 'navmenu', '', '0' )
	
	return false;
}

function saveSidebarState( component, subID, value )
{
	var id = component + subID
	var parms = '?func=gui.SaveSidebarState&id=' + id + '&value=' + value + '&time=' + ( new Date() ).getTime()
	
	//new Ajax.Request( '', { parameters:parms, method: 'get', onSuccess:saveSidebarStateResponse, onFailure:saveSidebarStateResponse } );

	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				response  = req.responseText;
			}
		}
	}    
    req.open("GET", parms, true);
    req.send(null);
}

function saveSidebarStateResponse( t )
{
    // We don't care about the response. Even if there is a failure, just be quiet...
	// alert(t.responseText);
}
