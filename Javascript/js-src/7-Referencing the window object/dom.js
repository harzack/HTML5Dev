
function init()
{
 var panel=document.getElementById("panel");
 var property;

 for( property in window)
 {
   if(property)
   {
      panel.innerHTML += property + " , ";
   }
 }

}
window.onload=init;


