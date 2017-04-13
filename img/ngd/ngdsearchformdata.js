//
// get the 'Advanced Search' form data
//
function getFormData(form) 
{

	var dataString = "";
	var i;
	var j
	var element;
	var elemType;
	var elemName;
	var elemArray;
	var option;
		    			
	function addParam(name, value) 
	{		            
		if (dataString.length == 0)
		{
			dataString = name + " " + encodeURIComponent(value ? value : "");
		}
		else
		{
			dataString += "&" + name + " " + encodeURIComponent(value ? value : "");	
		}
	}
		
	elemArray = form.elements;
	for (i = 0; i < elemArray.length; i++) 
	{
		element = elemArray[i];
		elemType = element.type.toUpperCase();
		elemName = element.name;
		        
		if (elemName) 
		{
			if ( elemType == "TEXT" || elemType == "TEXTAREA" || elemType == "PASSWORD" || elemType == "HIDDEN" ) 
			{
				addParam(elemName, element.value);
			}
			else if ( elemType == "CHECKBOX" && element.checked )
			{
				addParam( elemName, element.value );
			}
			else if ( elemType == "RADIO" && element.checked )
			{
				addParam( elemName, element.value );
			}
			else if ( elemType.indexOf("SELECT") != -1 )
			{
				for (j = 0; j < element.options.length; j++) 
				{
					option = element.options[j];
					if (option.selected)
					{
						addParam( elemName, option.value );
					}
				}
			}
		}
	}
	return dataString;
}

//
// this string will be used to show in the search history
//	
function getSearchQuery(form) 
{
	var dataString = "";
	var i;
	var elemArray;
	var element;
	var p;
	var pElemName;
	var elemType;
	var elemName;
			
	function encodeXml(string) 
	{
		return string.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\'/g,'&apos;').replace(/"/g,'&quot;');
	}

    	function addParam(name, value) 
	{

		if (dataString.length > 0) 
		{
			dataString += " " + encodeXml(value);
		} 
		else 
		{
			dataString = encodeXml(value);
		}					
	}
    		    		
	elemArray = form.elements;
	for (i = 0; i < elemArray.length; i++) 
	{
		element = elemArray[i];
		elemType = element.type.toUpperCase();
		elemName = element.name;

		if (elemName) 
		{
			if (elemType == "TEXT")
			{
			  	try {
			  	
					var p = element.parentNode;
				
					if ( p != null )
					{
  						pElemName = p.tagName.toUpperCase();
  					}
  				
  					if ( pElemName == "DIV" )
  					{

  						if ( elemName.split('_')[0].toUpperCase() == 'BROWSELIVELINK' )
  						{
  							// don't add it to data string.
  						}
  						else
  						{
  							addParam( elemName, element.value );
  						}
 					
	  				}
  					else
  					{
						addParam( elemName, element.value );
					}
  				}
  				catch ( err )
  				{
  				}				
			}
		}
	}
	return dataString;
}
    		
function genSearchQuery()
{
	var frm = window.document.searchFrm;
	var attrdata = getSearchQuery(frm);
			
	var sQueryStr = ""
									
	sQueryStr += '<searchquery xsi:type="compoundsearchquery" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
	sQueryStr += '  <op>And</op>'
	sQueryStr += '  <queries>'

	sQueryStr += '    <searchquery xsi:type="searchcondition">'
	sQueryStr += '      <ColumnName>UC_ALL</ColumnName>'
	sQueryStr += '      <ComparisonOperator>=</ComparisonOperator>'
	sQueryStr += '      <Value>' + attrdata + '</Value>'			
	sQueryStr += '    </searchquery>'

	sQueryStr += '  </queries>'
	sQueryStr += '</searchquery>'
									
	//alert("parse search query");			
	var searchquery = external.ParseSearchQuery(sQueryStr);			
	if (searchquery == null)
	{
		alert("`%D[NGD_ERROR.CouldNotParseSearchQuery]`");
	}
	return searchquery;
}
		
//We assign this function to the validate event handler, which
//the framework will call to collect results
function validate(  )
{
	var frm = window.document.searchFrm;
			
	//alert("validate called");
							
	// extract contruct search query from the form	
	var searchquery = genSearchQuery();
	var formdata = getFormData(window.document.searchFrm);
					
	if (searchquery != null)
	{
		//alert("set return search query");
				
		if (formdata.length > 0)
		{		
			external.SetFormData({"query": searchquery, "frmdata": formdata});
		}
		else
		{
			external.SetFormData({"query": searchquery});
		}					
	}							
}

//
// Press 'Search' button will invoke 'validate' function
//
try 
{
	external.OnValidate="validate";
} 
catch (err)
{
}