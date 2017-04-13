var selectedNodeArray = new Array()
		
function getSelectedNodeIndex( nodeid )
{
	if ( selectedNodeArray != null )
	{
		for ( var i = 0; i < selectedNodeArray.length; i++ )
		{
			if ( selectedNodeArray[ i ] == nodeid )
			{
				return i
			}
		}
	}

	return -1
}

function addSelectedNodeIndex( nodeid )
{
	var sidx = getSelectedNodeIndex( nodeid )
	if ( sidx < 0 )
	{
		selectedNodeArray.length += 1
		selectedNodeArray[ selectedNodeArray.length-1 ] = nodeid
	}
}

function addmodule( id, name, url, allowmulti )
{	
	makeDirty();

	if ( allowmulti == 'false' )
	{
		var buttonid =  id + 'Button'
		document.getElementById( buttonid ).disabled = true;
	}
	
	var tempid = getTempSectionID()
	id = id + '-' + tempid

	var contents = document.getElementById("leftside")

	url = url + '&editmode=true' + '&sectionid=' + id
	id = 'a_' + id

	var li = document.createElement("li")
	li.setAttribute('id', id)
	li.innerHTML = name
	li.className='EditModule'

	if ( contents.hasChildNodes() )
		contents.insertBefore(li,contents.childNodes[0])
	else
		contents.appendChild(li)

	getAddModule( url, id )
	
	Sortable.destroy( "leftside" )
	
	Sortable.create("leftside",
	  {	dropOnEmpty:true,
	  	containment:["leftside","rightside"],
		constraint:false,
		handle:"draggableHeader"
	  })
}

function getTempSectionID()
{
	var now = new Date()
	return now.valueOf()
}

function deleteModule( id, buttonid )
{
	makeDirty();

	var module = document.getElementById( id )
	var parent = module.parentNode
	
	parent.removeChild( module )

	addSelectedNodeIndex( id )

   	Sortable.create("comm-header",
     	{dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})
   	Sortable.create("leftside",
     	{dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})
   	Sortable.create("rightside",
     	{dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})
   	Sortable.create("comm-footer",
     	{dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})

	document.getElementById( buttonid ).disabled = false;

}

function deleteCommModule( id, sectionid, displayname, selectlist, fm )
{
	makeDirty();

	var module = document.getElementById( id )
	var parent = module.parentNode

	parent.removeChild( module )

	addSelectedNodeIndex( id )

   	Sortable.create("comm-header",
     	{dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})
   	Sortable.create("leftside",
     	{dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})
   	Sortable.create("rightside",
     	{dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})
   	Sortable.create("comm-footer",
     	{dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})

		d_col_length = document.fm[selectlist].length;
		document.fm[selectlist].options[d_col_length] = new Option (displayname, sectionid, false, true);

}

function deleteCommModuleURL( id, sectionid, displayname, selectlist, fm )
{
	makeDirty();

	var module = document.getElementById( id )
	var parent = module.parentNode

	parent.removeChild( module )

	addSelectedNodeIndex( id )

   	Sortable.create("comm-header",
     	{dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})
   	Sortable.create("leftside",
     	{dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})
   	Sortable.create("rightside",
     	{dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})
   	Sortable.create("comm-footer",
     	{dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})

	d_col_length = document.fm[selectlist].length;
	var temp = new Array();
	temp = id.split("-");
	var spdURLNodeID = temp[1];
	sectionid = sectionid + "-" + spdURLNodeID;
	document.fm[selectlist].options[d_col_length] = new Option (displayname, sectionid, false, true);
}

function onSubmit()
{
	document.DisplayEditFrm.leftside.value = Sortable.serialize('leftside')
	document.DisplayEditFrm.rightside.value = Sortable.serialize('rightside')
	document.DisplayEditFrm.header.value = Sortable.serialize('comm-header')
	document.DisplayEditFrm.footer.value = Sortable.serialize('comm-footer')
	document.DisplayEditFrm.removelist.value = selectedNodeArray.join(',')
	document.DisplayEditFrm.submit()
}

function onEnable( viewbox )
{
	if ( viewbox.checked == true )
	{
		document.DisplayEditFrm.viewenabled.value = '1'
	}
	else
	{
		document.DisplayEditFrm.viewenabled.value = '0'
	}
}

function OpenWindow( url )
{
	makeDirty();

	var w = window.open( url,"EditDisplayChild","WIDTH=900,HEIGHT=620,resizable=yes,menubar=no,scrollbars=yes,toolbar=yes")
	
	if ( w.focus )
	{
		w.focus()
	}
}

function reloadsection2( url, id )
{
	getAddModule( unescape(url), id )
}
		
function updatepagelist( id, newid, url )
{
	var module = document.getElementById(id)
    module.setAttribute('id', newid)

   Sortable.create("comm-header",
     {dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})
   Sortable.create("leftside",
     {dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})
   Sortable.create("rightside",
     {dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})
   Sortable.create("comm-footer",
     {dropOnEmpty:true,containment:["comm-header","leftside","rightside", "comm-footer"],constraint:false,handle:"draggableHeader"})

	getAddModule( unescape(url), newid );
}

function onAddItemsClick()
{
 	new Effect.Grow('AddItems')

   	var addlink = document.getElementById('addLink')
   	var closelink = document.getElementById('closeLink')

	addlink.style.display = 'none'
	closelink.style.display = 'block'
		
	return false
}

function onCloseItemsClick()
{
  	new Effect.Shrink('AddItems')

  	var addlink = document.getElementById('addLink')
   	var closelink = document.getElementById('closeLink')

	addlink.style.display = 'block'
	closelink.style.display = 'none'
		
	return false
}

function AddUsers( formname, url )
{
	var w = window.open( url,"SelectWidget","WIDTH=580,HEIGHT=440,resizable=yes,menubar=no,scrollbars=yes,toolbar=yes")
			
	if ( w.focus )
	{
		w.focus()
	}
}

function EditUsers( formname, url )
{
	var w = window.open( url,"SelectWidget","WIDTH=680,HEIGHT=450,resizable=yes,menubar=no,scrollbars=yes,toolbar=yes")

	if ( w.focus )
	{
		w.focus()
	}
}

function onFolderAddBrowse( theForm, oldsection, subtype, baseurl )
{
	var parentID = theForm.FolderContents_ID.value

	if ( parentID == null || parentID == '' )
	{
		alert('You must choose a folder.')
	}
	else
	{
		updatepagelist('a_' + oldsection,'a_' + subtype + '-' + theForm.FolderContents_ID.value, baseurl + '&sectionid=' + subtype + '-' + theForm.FolderContents_ID.value )
	}
}	

function openup( key, urlid, title, height, width, parentWindow )
{
  var win = new Window(key, {className: "alphacube", title: title, top:70, left:100, width:300, height:200, resizable: true, url: urlid, showEffect:  Element.show, hideEffect: Element.hide}) 
  win.setZIndex(1);
  win.setSize( width, height );
  win.setDestroyOnClose();
  win.showCenter(true);
}

function openupreload( key, urlid, title, height, width, parentWindow )
{
  var win = new Window(key, {className: "alphacube", title: title, top:70, left:100, width:300, height:200, resizable: true, url: urlid, showEffect:  Element.show, hideEffect: Element.hide}) 
  win.setZIndex(1);
  win.setSize( width, height );
  win.setDestroyOnClose();
  win.showCenter(true);

  // Set up a windows observer
  myObserver = {
    onDestroy: function(eventName, contentwin) {
      if (win == contentwin) {
        parentWindow.location.reload();
        Windows.removeObserver(this);
      }
    }
  }
  
  Windows.addObserver(myObserver);
}

function moveModule(o_col, url, errormsg) 
{
 	makeDirty();

  document.getElementById( "add_button" ).disabled = true;

	var o_col_length = document.fm[o_col].length;
	var isAModuleSelected = false;

	for(var n=0; n < o_col_length; n++){
		if(document.fm[o_col][n].selected == true){
			isAModuleSelected = true;

			oText = document.fm[o_col].options[n].text;
			oValue = document.fm[o_col].options[n].value;
			
var searchfor = ',' + document.fm[o_col].options[n].value + ',';
if ( multiAdd.indexOf(searchfor) == -1 )
{
			document.fm[o_col].options[n] = null;
}			
			// add the new module to the view area
			addmodule( oValue, oText, url )
			
			o_col_length--;
			n--;
			break;
		}
	}
		
  if(!isAModuleSelected) {
    alert(errormsg);
  }
}  

function addcommmodule( id, name, url )
{	
	var tempid = getTempSectionID();
	id = id + '-' + tempid;

	var contents = document.getElementById("leftside");

	url = url + '&sectionid=' + id;
	id = 'a_' + id;

	var li = document.createElement("li");
	li.setAttribute('id', id);
	li.innerHTML = name;
	li.className='EditModule';

	if ( contents.hasChildNodes() )
		contents.insertBefore(li,contents.childNodes[0]);
	else
		contents.appendChild(li);

	getAddModule( url, id );
}
		
function getForm()
{
  return document.DisplayEditFrm;
}
