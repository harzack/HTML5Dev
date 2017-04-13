// JavaScript Document
function openup( key, urlid, title, height, width, parentWindow )
{
  var win = new Window(key, {className: "alphacube", title: title, top:70, left:100, width:300, height:200, resizable: true, url: urlid, showEffect:  Element.show, hideEffect: Element.hide}) 
  win.setZIndex(1);
  win.setSize( width, height );
  win.setDestroyOnClose();
  win.showCenter(true);
}
