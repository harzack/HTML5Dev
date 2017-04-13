/*
	Shortlinks
	constrains the length of links displayed to a defined length
	written by Chris Heilmann (http://icant.co.uk/)
	
	modified version..
*/
function shortlinks()
{

	// defines where the link should be cut off, from the right or the middle
	var mode='middle';
	// the maximum length of the links
	var maxlength=35; 
	var maxlengthNav=25; 
	// the string added to or in the middle of the link text after shortening
	var connector='...';
	// the title added to the link, %url% will be replaced with the real link
	var titleadd='%url%';
	// the links to be shortened
	var contentlinks=document.getElementsByTagName('a');
  var mustlength
  
	// loop over all links
	for(var i=0;i<contentlinks.length;i++)
	{
		// check if the link has an href attribute and content
		if( !doshortlinks && ( contentlinks[i].getAttribute('href') || !contentlinks[i].firstChild))
    {
      continue;
    }

    // Skip links made through javascript, this ignores the main menus
    if ( contentlinks[i].getAttribute('href') && (contentlinks[i].getAttribute('href').indexOf('javascript',0) != -1 ))
    {
        continue;
    }

    // Skip any links the don't want to be shortened
    if ( contentlinks[i].getAttribute('noshort') )
    {
        continue;
    }

    if ( !contentlinks[i].getAttribute('href') )
      mustlength = maxlengthNav;
    else
      mustlength = maxlength;
    
		// check if the link starts with http: and that it is longer than the allowed length
		var t=contentlinks[i].firstChild.nodeValue;
//		if(/http:/.test(t) && t.length>mustlength)

		if(( t != null ) && t.length>mustlength)
		{
		// get the text of the link
		// shorten accordingly and add the separator string
			switch(mode){
				case 'middle':
					var newt=t.substr(0,mustlength/2)+connector+t.substr((t.length+connector.length)-(mustlength/2),t.length);
				break;
				case 'right':
					var newt=t.substr(0,mustlength-connector.length)+connector;
				break;
			}
		// set the title, and replace the original link text
			contentlinks[i].title+=titleadd.replace(/%url%/,t);
			contentlinks[i].replaceChild(document.createTextNode(newt),contentlinks[i].firstChild);
		}
	
	}	
}
// start shortlinks when the window is loaded.
//window.onload= shortlinks;

