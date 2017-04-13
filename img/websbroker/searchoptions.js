var allowMoveSeparator = 1;

function supportMoveSeparator( value )
{
	allowMoveSeparator = value;
}

function lowerCaseSort( a, b )
{
	a = a.toLowerCase();
	b = b.toLowerCase();
	if ( a > b ) return 1;
	if ( a < b ) return -1;
	return 0;
}

function moveElementsByName( formname, fboxName, tboxName, sortedName  )
{
	var fbox = eval( "self.window.document." + formname + "." + fboxName );
	var tbox = eval( "self.window.document." + formname + "." + tboxName );
	var sorted = eval( "self.window.document." + formname + "." + sortedName );

	moveElements( fbox, tbox, sorted );
}

// Persist selections in destination menu, support separator moves by default
function moveElements( fbox, tbox, sorted, ignoreCaseSort )
{
	 var c;
	 var i;
	 var no;

	 var arrFbox = new Array();
	 var arrTbox = new Array();
	 var arrLookup = new Array();
	 var selValFbox = new Array();
	 
	 for ( i=0; i < tbox.options.length; i++ )
	 {
	 	arrLookup[tbox.options[i].text] = tbox.options[i].value;
	 	arrTbox[i] = tbox.options[i].text;
	 }
	 var fLength = 0;
	 var tLength = arrTbox.length;

	 if ( fbox.selectedIndex == -1 )
	 {
		return;
	 }

	 for ( i=0; i < fbox.options.length; i++ )
	 {
		arrLookup[fbox.options[i].text] = fbox.options[i].value;

		if ( fbox.options[i].selected && fbox.options[i].value != ""  )
		{
			arrTbox[tLength] = fbox.options[i].text;
			tLength++;

			selValFbox[ fbox.options[i].value ] = 1;
			
			// special handling of the separator
			if ( fbox.options[i].value == "-1" )
			{
				if ( allowMoveSeparator == 1 )
				{
					// this means it can be copied over to the other pick list box
					arrFbox[fLength] = fbox.options[i].text;
					fLength++;
				}
				else
				{
					return;
				}
			}
		  } 
		  else
		  {
			arrFbox[fLength] = fbox.options[i].text;
			fLength++;
		  }
	 }

	 if ( sorted == fbox )
	 {
	 	if ( ignoreCaseSort )
	 	{
			arrFbox.sort( lowerCaseSort );
		}
		else
		{
			arrFbox.sort();
		}
	 }

	 if ( sorted == tbox )
	 {
	 	if ( ignoreCaseSort )
	 	{
			arrTbox.sort( lowerCaseSort );
		}
		else
		{
			arrTbox.sort();
		}
	 }

	 fbox.length = 0;
	 tbox.length = 0;

	 for ( c=0; c < arrFbox.length; c++ )
	 {
		  no = new Option();
		  no.value = arrLookup[ arrFbox[c] ];
		  no.text = arrFbox[c];
		  fbox[c] = no;
	 }
	 
	 for ( c=0; c < arrTbox.length; c++ )
	 {
		no = new Option();
		no.value = arrLookup[ arrTbox[c] ];
		no.text = arrTbox[c];
		
		// Persist selections in destination menu
		if ( selValFbox[ no.value ] != null )
		{
			no.selected = true;
		}
		
		tbox[c] = no;
	 }
}

// Persist selections in destination menu, don't move separators
function moveElements2( fbox, tbox, sorted, ignoreCaseSort )
{
	 var c;
	 var no;
	 var i;

	 var arrFbox = new Array();
	 var arrTbox = new Array();
	 var arrLookup = new Array();
	 var selValFbox = new Array();

	 for ( i=0; i < tbox.options.length; i++ )
	 {
		arrLookup[tbox.options[i].text] = tbox.options[i].value;
		arrTbox[i] = tbox.options[i].text;
	 }
	 var fLength = 0;
	 var tLength = arrTbox.length;

	 if ( fbox.selectedIndex == -1 )
	 {
		return;
	 }

	 for ( i=0; i < fbox.options.length; i++ )
	 {
		  arrLookup[fbox.options[i].text] = fbox.options[i].value;
		  
		  if ( fbox.options[i].selected && fbox.options[i].value != "" )
		  {
		  	if ( fbox.options[i].value != "-1" )
		  	{
		  		selValFbox[ fbox.options[i].value ] = 1;
		  	
				arrTbox[tLength] = fbox.options[i].text;
				tLength++;
			}
		  }
		  else
		  {
		 	arrFbox[fLength] = fbox.options[i].text;
			fLength++;
		  }
	 }

	 if ( sorted == fbox )
	 {
	 	if ( ignoreCaseSort )
	 	{
			arrFbox.sort( lowerCaseSort );
		}
		else
		{
			arrFbox.sort();
		}
	 }

	 if ( sorted == tbox )
	 {
	 	if ( ignoreCaseSort )
	 	{
			arrTbox.sort( lowerCaseSort );
		}
		else
		{
			arrTbox.sort();
		}
	 }

	 fbox.length = 0;
	 tbox.length = 0;
	
	 for ( c=0; c < arrFbox.length; c++ )
	 {
		no = new Option();
		no.value = arrLookup[ arrFbox[c] ];
		no.text = arrFbox[c];
		fbox[c] = no;
	 }
	 
	 for ( c=0; c < arrTbox.length; c++ )
	 {
		no = new Option();
		no.value = arrLookup[ arrTbox[c] ];
		no.text = arrTbox[c];
		
		// Persist selections in destination menu
		if ( selValFbox[ no.value ] != null )
		{
			no.selected = true;
		}
		
		tbox[c] = no;
	 }
}

function setSelectedValues( formname, sboxName, tHiddenName )
{
	var i;

	var s = "";
	var sbox = eval( "self.window.document." + formname + "." + sboxName );
	var hbox = eval( "self.window.document." + formname + "." + tHiddenName );

	for ( i=0; i < sbox.options.length; i++ )
	{
		s += sbox.options[i].value;
		s += "|";
	}
	hbox.value = s;
}

function moveSelectedByName( formname, selectName, down )
{
	var select = eval( "self.window.document." + formname + "." + selectName );
	moveSelected( select, down );
}

function moveSelected( select, down )
{
	var 	x;

	if ( select.selectedIndex == -1 )
	{
		return;
	}

	if ( down )
	{
		for ( i = select.options.length - 1; i >= 0; i-- )
		{
			if ( select.options[i].selected )
			{
				if ( i != ( select.options.length - 1 ) && ! select.options[i+1].selected )
				{
					swapOptions( select, i, i + 1 );
					select.options[i+1].selected = true;
				}
			}
		}
	}
	else
	{
		for ( i=0; i < select.options.length; i++ )
		{
			if ( select.options[i].selected )
			{
				if ( i != 0 && !select.options[i-1].selected )
				{
					swapOptions( select, i, i - 1 );
					select.options[i-1].selected = true;
				}
			}
		}
	}
}

function swapOptions( select, i, j )
{
	var o = select.options;
	var i_selected = o[i].selected;
	var j_selected = o[j].selected;
	var temp = new Option( o[i].text, o[i].value, o[i].defaultSelected, o[i].selected );
	var temp2= new Option( o[j].text, o[j].value, o[j].defaultSelected, o[j].selected );
	o[i] = temp2;
	o[j] = temp;
	o[i].selected = j_selected;
	o[j].selected = i_selected;
}

function selectAll( box )
{
	for ( var i = 0; i < box.length; i++ )
	{
		box[i].selected = true;
	}
}
