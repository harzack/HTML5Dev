//
// this function will open the wizrd pop-up window
//

function RunWizard( url )
{
	window.open( url, "WizardWindow", "width=640,height=400,location=0,resizable=1" );
}


//
// select all of the options in all multi-select controls, so the values get submitted
//

function SelectAllListBoxes()
{
	var theForm;
	var theElement;
	var newOption;
	
	for( iForm=0; iForm < document.forms.length; iForm++ )
	{
		theForm = document.forms[iForm];

		for( iElement=0; iElement < theForm.elements.length; iElement++ )
		{
			theElement = theForm.elements[iElement];

			if( theElement.type == "select-multiple" )
			{
				if ( theElement.options.length > 0 )
				{
					;// select all of the options for this control
					
					for( iOption=0; iOption < theElement.options.length; iOption++ )
					{
						theElement.options[iOption].selected = true;
					}
				}
				else
				{
					;// create a new option, give it an empty value and select it, otherwise 
					;// nothing will be submitted to the server
					
					newOption = document.createElement("OPTION");
					theElement.options.add(newOption);
					newOption.text = "";
					newOption.value = "";
					theElement.options[0].selected = true;
				}
			}
		}
	}

}


//
// do any processing before submitting the form
//

function DoSubmit()
{
	SelectAllListBoxes();
	
	return true;
}


//
// transfer values from one list box to another
//

function TransferValues( sourceID, destID )
{
	var i;
	var newOption;
	var sourceObj = document.getElementById( sourceID );
	var destObj = document.getElementById( destID );

	for ( i=sourceObj.options.length-1; i >= 0; i-- )
	{
		if ( sourceObj.options[i].selected )
		{
			newOption = document.createElement("OPTION");
			destObj.options.add(newOption);
			newOption.text = sourceObj.options[i].text;
			newOption.value = sourceObj.options[i].value;
			
			sourceObj.remove(i);
		}
	}

}


//
// add a user typed value to a dynamic list box
//

function AddValue( sourceID, destID )
{
	var newOption;
	var sourceObj = document.getElementById( sourceID );
	var destObj = document.getElementById( destID );

	newOption = document.createElement("OPTION");
	destObj.options.add(newOption);
	newOption.text = sourceObj.value;
	newOption.value = sourceObj.value;

	sourceObj.value = "";
}


//
// remove values from a dynamic list box
//

function RemoveValues( sourceID )
{
	var i;
	var sourceObj = document.getElementById( sourceID );

	for ( i=sourceObj.options.length-1; i >= 0; i-- )
	{
		if ( sourceObj.options[i].selected )
		{
			sourceObj.remove(i);
		}
	}

}


//
// move values up one position in a dynamic list box
//

function MoveUp( sourceID )
{
	var i;
	var optionSelected;
	var optionAbove;
	var sourceObj = document.getElementById( sourceID );

	for ( i=0; i < sourceObj.options.length; i++ )
	{
		if ( (sourceObj.options[i].selected) && ( i != 0) )
		{
			optionSelected = new Option( sourceObj.options[i].text, sourceObj.options[i].value );
			optionAbove = new Option( sourceObj.options[i-1].text, sourceObj.options[i-1].value );
			
			sourceObj.options[i-1] = optionSelected;
			sourceObj.options[i-1].selected = true;
			sourceObj.options[i] = optionAbove;
		}
	}
}


//
// move values down one position in a dynamic list box
//

function MoveDown( sourceID )
{
	var i;
	var optionSelected;
	var optionBelow;
	var sourceObj = document.getElementById( sourceID );

	for ( i=sourceObj.options.length-1; i >= 0; i-- )
	{
		if ( (sourceObj.options[i].selected) && ( i != sourceObj.options.length-1 ) )
		{
			optionSelected = new Option( sourceObj.options[i].text, sourceObj.options[i].value );
			optionBelow = new Option( sourceObj.options[i+1].text, sourceObj.options[i+1].value );
			
			sourceObj.options[i+1] = optionSelected;
			sourceObj.options[i+1].selected = true;
			sourceObj.options[i] = optionBelow;
		}
	}
}
  


function modIDs(node, key, idx) 
{
	var aDate = new Date(); 
	var aTime = aDate.getTime()

;//alert( aTime );

	var newName;
	var pos;
	var tmpObj;
	var child, nodes = node.childNodes;
	var eleArray;
	var ele;
	var eleLen;
	
	for (var i=0, len=nodes.length; i<len; i++)
	{
		child = nodes[i];


		if ( typeof child.id == 'string' )
		{
			pos = child.id.indexOf("uaicpx_");
			
			if ( pos == 0 )
			{
				//newName = "uaicpx_" + idx + "_" + key;
				eleArray = child.id.split("_");
				
				eleLen = eleArray.length;
				newName = "";
				
				for ( var j=0; j < eleLen; j++ )
				{
					if ( j == 1 )
					{
						newName += idx;
					}
					else
					{
						newName += eleArray[j];
					}
					
					if ( j+1 < eleLen )
					{
						newName += "_";
					}
				}
				alert( newName );
				
				tmpObj = document.getElementById( child.id );
				tmpObj.name = newName;
				tmpObj.value = "";

			}
		}
		
		if (child.childNodes && child.childNodes.length)
		{
			modIDs(child, key, idx);
		}
	}
}


function GetNextIndex()
{
	var idx = 1;
	var theForm;
	var theElement;

	for( iForm=0; iForm < document.forms.length; iForm++ )
	{
		theForm = document.forms[iForm];

		for( iElement=0; iElement < theForm.elements.length; iElement++ )
		{
			theElement = theForm.elements[iElement];
			
			if( (theElement.type == "hidden") && (theElement.value == "uaiComplex") )
			{
				idx++;
			}

		}
	}
	
	return idx;

}


function AddComplex( sourceID, key )
{

	alert("not working yet");
	
	
	//var el = document.getElementById(sourceID);

	//var idx = GetNextIndex();

	//var newEl = el.cloneNode(true);
	//newEl.id = "abc";
	
	//modIDs(newEl, key, idx);
	
	//el.parentNode.insertBefore(newEl, el.nextSibling);


}

