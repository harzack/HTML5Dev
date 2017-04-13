//var		checkMark = '\u2714';
//var		removeMark = '\u2718';
var		checkMark = '+';
var		removeMark = 'x';
var		selectCats = "";
var		selectMIMETypes = "";


function SetMIMETypeCats()
{
	var 	categoryList = GetCatsSelection( selectCats );
	var 	mimeTypeList = selectMIMETypes;
	
	
	if( -1 == categoryList )
	{
		alert( 'Please select some categories first.' );
	}
	else
	{
		for ( var i = 0; i < mimeTypeList.length; i++ ) 
	    {
		    if ( mimeTypeList.options[ i ].selected == true )
		    {
		    	mimeTypeList.options[ i ].value = categoryList;
		    	
		    	mimeTypeList.options[ i ].text = ShowActionSign( mimeTypeList.options[ i ].text, checkMark );
		    }
	    }
	}
}

function SetCatsFromMIMEType()
{	
	var 	tmpString;
	var		catList;
	
	var 	mimeTypeList = selectMIMETypes;
	var		categoryList = selectCats;
	
	
	ResetCat( categoryList );
	
	for ( var i = 0; i < mimeTypeList.length; i++ ) 
    {
	    if ( mimeTypeList.options[ i ].selected == true )
	    {
	    	if ( mimeTypeList.options[ i ].value != -1 )
	    	{
	    		tmpString = mimeTypeList.options[ i ].value;
	    		tmpString = tmpString.substring( 1, tmpString.length - 1 );
	    		catList = tmpString.split( "," );
	    		
	    		for ( var j = 0; j < catList.length; j++ )
	    		{
	    			//Select categories for given mimetype
	    			
	    			for ( var k = 0; k < categoryList.length; k++ ) 
				    {
					    if ( categoryList.options[ k ].value == catList[ j ] )
					    {
					    	categoryList.options[ k ].selected = true;
					    }
				    }
	    		}
	    	}
	    }
    }
}

function GetCatsSelection( mimeTypeList )
{
	
	var		catList = "{";
	 
   for ( var i = 0; i < mimeTypeList.length; i++ ) 
   {
	    if ( mimeTypeList.options[ i ].selected == true )
	    {
	    	// mimeTypeList.options[ i ].value = -3 for fake category <None>, we skip this one
	    	
	    	if ( -3 != mimeTypeList.options[ i ].value )
	    	{
	    		catList += mimeTypeList.options[ i ].value + ",";
	    	}
	    }
   }
   
   if ( catList.length == 1 )
   {
   		// Return -1 since no valid category was selected
   		
   		catList = -1;
   }
   else
   {
   		// Skip comma
   		
   		catList = catList.substring( 0, catList.length - 1 );
   		catList += '}';
   }

	return catList
}



function DeleteCat()
{
	var mimeTypeList = selectMIMETypes;
	
	
	for ( var i = 0; i < mimeTypeList.length; i++ ) 
    {
	    if ( mimeTypeList.options[ i ].selected == true )
	    {
	    	mimeTypeList.options[ i ].value = -1;
	    	
	    	mimeTypeList.options[ i ].text = ShowActionSign( mimeTypeList.options[ i ].text, removeMark );
	    	
	    }
    }
   
	ResetCat( selectCats );
}

function ShowActionSign( text, sign )
{
			
	if ( ( 0 == text.indexOf( checkMark ) ) || ( 0 == text.indexOf( removeMark ) ) )
	{
		text = text.substr( 2 );
	}
	
	text = sign + ' ' + text;
		
	return text
}

function ResetCat( selectList )
{
	   			
   for ( var i = 0; i < selectList.length; i++ ) 
   {
	    selectList.options[ i ].selected = false;
   }
}
	


function CTT_DoSelection( nodeid, nodepath )
{
	var	len;
	
	
	if ( selectCats.options[ 0 ].value == -3 )
	{
		len = 0;
	}
	else
	{
		len = selectCats.length++;
	}
	
	selectCats.options[ len ].text = GetName( nodepath );
	selectCats.options[ len ].value = nodeid;
	selectCats.options[ len ].selected = true;
	
	return 0;
}

function GetName( nodepath )
{
	var		name;
	
	var		nameParts = nodepath.split( ":" );
	
	
	name = nameParts[ nameParts.length - 1 ];
	
	return name;
}

function DeleteCategory( selectList )
{
	var		tempObj;
   	
   	var		j = 0;		
	var		tempArray = new Array();
	
   
   //looping through source element to skip selected options
   
   for ( var i = 0; i < selectList.length; i++ ) 
   {
    
	    if ( !selectList.options[i].selected ) 
	    {
		     //storing the rest of the elements to recreate select list
		     
		     tempObj = new Object();
		     
		     tempObj.text = selectList.options[ i ].text;
		     tempObj.value = selectList.options[ i ].value;
		     tempArray[ j ] = tempObj;
		     j++;
	    }
   }
   
   // resetting select list
   
   	if ( tempArray.length > 0 )
	{
   
	   selectList.length = tempArray.length;
	   			
	   for ( var i = 0; i < tempArray.length; i++ ) 
	   {
		    selectList.options[ i ].text = tempArray[ i ].text;
		    selectList.options[ i ].value = tempArray[ i ].value;
		    selectList.options[ i ].selected = false;
	   }
	}
	else
	{
		selectList.length = 1
		selectList.options[ 0 ].text = '[None]';
		selectList.options[ 0 ].value = -3;
		selectList.options[ 0 ].selected = false;
		
	}
}

function trim( stringToTrim )
{
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function MIMETypeCats_Submit()
{
	var 	i;
	var		mymenuitems = '';
	var		myCats = '';
	var 	mimeTypeList = selectMIMETypes;
	var		categoryList = selectCats;
	var 	text = '';
	

	for ( i = 0; i < mimeTypeList.options.length; i++ )
	{
       	if ( -3 != mimeTypeList.options[ i ].value )
		{
	        text = mimeTypeList.options[ i ].text;
						
			if ( 0 == text.indexOf( checkMark ) )
			{
				text = text.substr( 2 );
				text = trim( text );
			}

			mymenuitems +=
				text + '|' +
				mimeTypeList.options[ i ].value + '^';
		}
	}

	document.MIMETypeCatsConfigForm.MIMETypeCats.value = mymenuitems;
	
	for ( i = 0; i < categoryList.options.length; i++ )
	{
		if ( -3 != categoryList.options[ i ].value )
		{
	        myCats +=
				categoryList.options[ i ].text + '|' +
				categoryList.options[ i ].value + '^';
		}
	}

	document.MIMETypeCatsConfigForm.mimecats.value = myCats;

	return true;
}




function MIMETypeCats_Config_InitSelect()
{
	var		i;
	var		mimeTypeList;
	
	
	selectCats = document.MIMETypeCatsConfigForm.SelCats;
	selectMIMETypes = document.MIMETypeCatsConfigForm.SelectMIMETypes;
	mimeTypeList = selectMIMETypes;


	if ( mimeTypeList.options.length >= 1 )
	{
		mimeTypeList.selectedIndex = 0;
	}
}


function MIMETypeCats_Config_New()
{
	var 	i;
	var		mimeTypeList;
	
	
	selectCats = document.MIMETypeCatsConfigForm.SelCats;
	selectMIMETypes = document.MIMETypeCatsConfigForm.SelectMIMETypes;
	mimeTypeList = selectMIMETypes;

	for ( i = mimeTypeList.options.length - 1; i >= 0; --i )
	{
		if ( mimeTypeList.options[ i ].selected )
		{
			mimeTypeList.options[ i ].selected = false;
		}
	}
}
