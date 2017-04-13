function moveElementsBySubStr( fbox, tbox, sorted, subStr )
{
	 var arrFbox = new Array();
	 var arrTbox = new Array();
	 var arrLookup = new Array();
	 var i;
	 var sel = false;

	 for ( i=0; i < tbox.options.length; i++ )
	 {
		arrLookup[tbox.options[i].text] = tbox.options[i].value;
		arrTbox[i] = tbox.options[i].text;
	 }
	 var fLength = 0;
	 var tLength = arrTbox.length;

	 for (i=0; i < fbox.options.length; i++ )
	 {
		arrLookup[fbox.options[i].text] = fbox.options[i].value;
		if ( fbox.options[i].value != "" && fbox.options[i].value.indexOf( subStr ) == 0 )
		{
			arrTbox[tLength] = fbox.options[i].text;
			tLength++;
			sel = true;

			if ( fbox.options[i].value == "-1" )
			{
				if ( allowMoveSeparator == 1 )
				{
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
			sel = true;
		  }
	 }

	 if ( sorted == fbox )
	 {
		arrFbox.sort();
	 }

	 if ( sorted == tbox )
	 {
		arrTbox.sort();
	 }

	 fbox.length = 0;
	 tbox.length = 0;
	 var c;
	 var no;			

	 for ( c=0; c < arrFbox.length; c++ )
	 {
		no = new Option();
		no.value = arrLookup[arrFbox[c]];
		no.text = arrFbox[c];
		fbox[c] = no;
	 }

	 for ( c=0; c < arrTbox.length; c++ )
	 {
		no = new Option();
		no.value = arrLookup[arrTbox[c]];
		no.text = arrTbox[c];
		tbox[c] = no;
	 }
}

function moveAllElements( fbox, tbox, sorted )
{
	var arrFbox = new Array();
	var arrTbox = new Array();
	var arrLookup = new Array();
	var i;
	var sel = false;

	for( i=0; i < tbox.options.length; i++ )
	{
		arrLookup[tbox.options[i].text] = tbox.options[i].value;
		arrTbox[i] = tbox.options[i].text;
	}
	var fLength = 0;
	var tLength = arrTbox.length;

	for ( i=0; i < fbox.options.length; i++ )
	{
		arrLookup[fbox.options[i].text] = fbox.options[i].value;
		if ( fbox.options[i].value != "" )
		{
			if ( fbox.options[i].value != "-1" )
			{
				arrTbox[tLength] = fbox.options[i].text;
				tLength++;
				sel = true;
			}
		}
		else
		{
			arrFbox[fLength] = fbox.options[i].text;
			fLength++;
			sel = true;
		}
	}

	if ( sorted == fbox )
	{
		arrFbox.sort();
	}

	if ( sorted == tbox )
	{
		arrTbox.sort();
	}

	fbox.length = 0;
	tbox.length = 0;
	var c;
	var no;

	for ( c=0; c < arrFbox.length; c++ )
	{
		no = new Option();
		no.value = arrLookup[arrFbox[c]];
		no.text = arrFbox[c];
		fbox[c] = no;
	}
	
	for ( c=0; c < arrTbox.length; c++ )
	{
		no = new Option();
		no.value = arrLookup[arrTbox[c]];
		no.text = arrTbox[c];
		tbox[c] = no;
	}
}

function moveTheseElements( fbox, tbox, sorted, theseElements )
{
	var arrFbox = new Array();
	var arrTbox = new Array();
	var arrLookup = new Array();
	var i;
	var sel = false;
	var moveit = false;

	for( i=0; i<tbox.options.length; i++ )
	{
		arrLookup[tbox.options[i].text] = tbox.options[i].value;
		arrTbox[i] = tbox.options[i].text;
	}
	var fLength = 0;
	var tLength = arrTbox.length;

	for ( i=0; i < fbox.options.length; i++ )
	{
		arrLookup[fbox.options[i].text] = fbox.options[i].value;
		moveit = false;
		
		for ( mv=0; mv < theseElements.length; mv++ )
		{
			if ( fbox.options[i].value == theseElements[mv] )
			{
				moveit = true;
				break;
			}
		}

		if ( moveit && fbox.options[i].value != "" )
		{
			if ( fbox.options[i].value != "-1" )
			{
				arrTbox[tLength] = fbox.options[i].text;
				tLength++;
				sel = true;
			}
		}
		else
		{
			arrFbox[fLength] = fbox.options[i].text;
			fLength++;
			sel = true;
		}
	}

	if ( sorted == fbox )
	{
		arrFbox.sort();
	}

	if ( sorted == tbox )
	{
		arrTbox.sort();
	}

	fbox.length = 0;
	tbox.length = 0;
	var c;
	var no;

	for( c=0; c < arrFbox.length; c++ )
	{
		no = new Option();
		no.value = arrLookup[arrFbox[c]];
		no.text = arrFbox[c];
		fbox[c] = no;
	}

	for ( c=0; c < arrTbox.length; c++ )
	{
		no = new Option();
		no.value = arrLookup[arrTbox[c]];
		no.text = arrTbox[c];
		tbox[c] = no;
	}
}

// Clear selections in all menus but the current one
function EditElement( curSelMenu )
{
	var 	boxToClear;
	var	boxDisplay;

	for ( var m in selMenuArray )
	{
		if ( curSelMenu.id != m )
		{
			boxToClear = document.getElementById( m );
			
			if ( boxToClear != null )
			{
				// Clear the menu selection and delta display
				for ( var i = 0; i < boxToClear.options.length; i++ )
				{
					boxToClear.options[i].selected = false;
				}
				
				// Clear the display of this menu
				boxDisplay = document.getElementById( m + 'Display' );
				
				if ( boxDisplay != null )
				{
					boxDisplay.innerHTML = '&nbsp;';
				}
			}
		}
	}

	countSelected( curSelMenu );
}

function calculateDelta()
{
	var	i;
	var	memForDisplay;
	var	regionKeyName;
	var	diskRetWarn = false
	
	var	rambox = document.getElementById( "ramRegions" );
	var	diskbox = document.getElementById( "diskRegions" );
	var	diskRetBox = document.getElementById( "diskRetRegions" );
	var	ramTotal = 0;
	var	diskTotal = 0;
	var	diskRetTotal = 0;
	var	theRam = getTheRam();
	var	theDisk = getTheDisk();
	var	theDiskRet = getTheDiskRet();
	var	memTotal = theRam + theDisk + theDiskRet;
	var	delta = 0;
	var	memUsageDeltaDisplay = document.getElementById( 'memUsageDeltaDisplay' );

	// Total the RAM, DISK, and DISK_RET menus, then subtract the initial total
	for ( i = 0; i < rambox.options.length; i++ )
	{
		regionKeyName = rambox.options[i].value;	
		ramTotal += ramCost[ regionKeyName ];
	
		if ( diskRetRegion[ regionKeyName ] != null )
		{
			diskRetWarn = true;
		}
	}

	for ( i = 0; i < diskbox.options.length; i++ )
	{
		regionKeyName = diskbox.options[i].value;
		diskTotal += diskCost[ regionKeyName ];
		
		if ( diskRetRegion[ regionKeyName ] != null )
		{
			diskRetWarn = true;
		}
	}

	for ( i = 0; i < diskRetBox.options.length; i++ )
	{
		regionKeyName = diskRetBox.options[i].value;
		diskRetTotal += diskRetCost[ regionKeyName ];
	}

	delta = ramTotal + diskTotal + diskRetTotal - memTotal;

	memForDisplay = getUnits( delta );

	if ( delta > 0 )
	{
		memUsageDeltaDisplay.innerHTML = '&nbsp;<SPAN CLASS="error important">+' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] +'</SPAN>';
	}
	else if ( delta < 0 )
	{
		memUsageDeltaDisplay.innerHTML = '&nbsp;<SPAN CLASS="statusTextGood important">' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] +'</SPAN>';
	}
	else
	{
		memUsageDeltaDisplay.innerHTML = '&nbsp;<SPAN CLASS="important">' + delta + ' ' + memForDisplay[ 1 ] + '</SPAN>';
	}
	
	memUsageDeltaDisplay = document.getElementById( 'memUsageDeltaDisplayMsg' );
	
	if ( diskRetWarn )
	{	
		memUsageDeltaDisplay.innerHTML = _diskRetDeltaWarningStr;
	}
	else
	{
		memUsageDeltaDisplay.innerHTML = '&nbsp;';
	}
}

function getUnits( valueInKBytes )
{
	var valueInKBytesABS;
	var valueDiv;
	var memUnits;
	var gotMemUnits;
	var memArray = new Array();

	var labelArray = getUnitLabels();

	var KBLabel = labelArray[0];
	var MBLabel = labelArray[1];
	var GBLabel = labelArray[2];

	var precision = 3;

	valueInKBytesABS = valueInKBytes;
	
	if ( valueInKBytesABS < 0 )
	{
		valueInKBytesABS = valueInKBytesABS * -1;
	}

	if ( valueInKBytesABS > 0 && valueInKBytesABS < 1023 )
	{
		memUnits = KBLabel;
		gotMemUnits = true;
		precision = 1;
	}

	if ( ! gotMemUnits )
	{
		valueDiv = valueInKBytesABS / 1024;
		if ( valueDiv > 0 && valueDiv < 1023 )
		{
			memUnits = MBLabel;
			valueInKBytes = valueInKBytes / 1024;
			gotMemUnits = true;
			precision = 2;
		}
	}

	if ( ! gotMemUnits )
	{
		memUnits = GBLabel;
		valueInKBytes = valueInKBytes / 1048576;
		precision = 3;
	}

	if ( valueInKBytes != parseInt( valueInKBytes, 10 ) )
	{
		valueInKBytes = valueInKBytes.toFixed( precision );
	}

	memArray[ 0 ] = valueInKBytes;
	memArray[ 1 ] = memUnits;
	
	return memArray;
}

// Count and display the selected regions in all or one menu
function countSelected( selMenuHint )
{
	var	i;
	var	m;
	var	count = 0;
	var	thisSelectBox;
	var	theDisplayID;

	var	diskRetWarn = false;
	var	regionDelta;
	var	regionDeltaTotal;
	var	regionDelta2
	var	regionDelta2Total;
	var	regionKeyName;
	var	regionRamCost;
	var	regionDiskCost;
	var	regionDiskRetCost;
	var	memForDisplay;	

	if ( ( selMenuHint == null ) || ( selMenuHint.id == 'ramRegions' ) )
	{
		// RAM
		thisSelectBox = document.getElementById( 'ramRegions' );
		theDisplayID = document.getElementById( 'ramRegionsDisplay' );

		regionDelta = 0;		// To Disk delta
		regionDeltaTotal = 0;

		regionDelta2 = 0;		// To DiskRet delta
		regionDeltaTotal2 = 0;

		for ( i = 0; i < thisSelectBox.options.length; i++ )
		{
			if ( thisSelectBox.options[i].selected )
			{
				regionKeyName = thisSelectBox.options[i].value;
				regionRamCost = ramCost[ regionKeyName ];
				regionDiskCost = diskCost[ regionKeyName ];
				regionDiskRetCost = diskRetCost[ regionKeyName ];
				
				regionDelta = regionDiskCost - regionRamCost;
				regionDeltaTotal += regionDelta;
				
				regionDelta2 = regionDiskRetCost - regionRamCost;
				regionDeltaTotal2 += regionDelta2;
				
				count += 1;
			}
		}

		if ( count > 0 )
		{
			memForDisplay = getUnits( regionDeltaTotal );
		
			theDisplayID.innerHTML = _regionsSelectedStr;
			theDisplayID.innerHTML = theDisplayID.innerHTML.replace( /%1/g, count );
			
			if ( regionDeltaTotal > 0 )
			{
				theDisplayID.innerHTML += _toDiskStr + ' <SPAN CLASS="error important">+' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] + '</SPAN>';
			}
			else if ( regionDeltaTotal < 0 )
			{
				theDisplayID.innerHTML += _toDiskStr + ' <SPAN CLASS="statusTextGood important">' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] + '</SPAN>';
			}
					
			memForDisplay = getUnits( regionDeltaTotal2 );
							
			if ( regionDeltaTotal2 > 0 )
			{			
				theDisplayID.innerHTML += _toDiskRetStr + ' <SPAN CLASS="error important">+' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] + '</SPAN>';
			}
			else if ( regionDeltaTotal2 < 0 )
			{
				theDisplayID.innerHTML += _toDiskRetStr + ' <SPAN CLASS="statusTextGood important">' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] + '</SPAN>';
			}
		}
		else
		{
			theDisplayID.innerHTML = '&nbsp;';
		}	
	}

	if ( ( selMenuHint == null ) || ( selMenuHint.id == 'diskRegions' ) )
	{
		// DISK
		thisSelectBox = document.getElementById( 'diskRegions' );
		theDisplayID = document.getElementById( 'diskRegionsDisplay' );
	
		count = 0;
		regionDelta = 0;		// To Memory delta
		regionDeltaTotal = 0;
	
		regionDelta2 = 0;		// To DiskRet delta
		regionDeltaTotal2 = 0;

		for ( i = 0; i < thisSelectBox.options.length; i++ )
		{
			if ( thisSelectBox.options[i].selected )
			{
				regionKeyName = thisSelectBox.options[i].value;
				regionRamCost = ramCost[ regionKeyName ];
				regionDiskCost = diskCost[ regionKeyName ];
				regionDiskRetCost = diskRetCost[ regionKeyName ];
				
				regionDelta = regionRamCost - regionDiskCost;
				regionDeltaTotal += regionDelta;
				
				regionDelta2 = regionDiskRetCost - regionDiskCost;
				regionDeltaTotal2 += regionDelta2;
				
				count += 1;
			}
		}

		if ( count > 0 )
		{
			memForDisplay = getUnits( regionDeltaTotal );
		
			theDisplayID.innerHTML = _regionsSelectedStr;
			theDisplayID.innerHTML = theDisplayID.innerHTML.replace( /%1/g, count );
			
			if ( regionDeltaTotal > 0 )
			{			
				theDisplayID.innerHTML += _toRAMStr + ' <SPAN CLASS="error important">+' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] + '</SPAN>';
			}
			else if ( regionDeltaTotal < 0 )
			{
				theDisplayID.innerHTML += _toRAMStr + ' <SPAN CLASS="statusTextGood important">' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] + '</SPAN>';
			}
					
			memForDisplay = getUnits( regionDeltaTotal2 );
					
			if ( regionDeltaTotal2 > 0 )
			{			
				theDisplayID.innerHTML += _toDiskRetStr + ' <SPAN CLASS="error important">+' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] + '</SPAN>';
			}
			else if ( regionDeltaTotal2 < 0 )
			{
				theDisplayID.innerHTML += _toDiskRetStr + ' <SPAN CLASS="statusTextGood important">' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] + '</SPAN>';
			}
		}
		else
		{
			theDisplayID.innerHTML = '&nbsp;';
		}
	}
	
	if ( ( selMenuHint == null ) || ( selMenuHint.id == 'diskRetRegions' ) )
	{
		// DISK_RET
		thisSelectBox = document.getElementById( 'diskRetRegions' );
		theDisplayID = document.getElementById( 'diskRetRegionsDisplay' );
		
		count = 0;
		regionDelta = 0;		// To Memory delta
		regionDeltaTotal = 0;
			
		regionDelta2 = 0;		// To Disk delta
		regionDeltaTotal2 = 0;
		
		for ( i = 0; i < thisSelectBox.options.length; i++ )
		{
			if ( thisSelectBox.options[i].selected )
			{
				regionKeyName = thisSelectBox.options[i].value;
				
				if ( diskRetRegion[ regionKeyName ] != null )
				{
					diskRetWarn = true;
				}
				
				regionRamCost = ramCost[ regionKeyName ];
				regionDiskCost = diskCost[ regionKeyName ];
				regionDiskRetCost = diskRetCost[ regionKeyName ];
						
				regionDelta = regionRamCost - regionDiskRetCost;
				regionDeltaTotal += regionDelta;
						
				regionDelta2 = regionDiskCost - regionDiskRetCost;
				regionDeltaTotal2 += regionDelta2;
						
				count += 1;
			}
		}
		
		if ( diskRetWarn )
		{		
			if ( count > 0 )
			{
				theDisplayID.innerHTML = _regionsSelectedEstNAStr;
				theDisplayID.innerHTML = theDisplayID.innerHTML.replace( /%1/g, count );
			}
		}
		else
		{
			if ( count > 0 )
			{
		
				memForDisplay = getUnits( regionDeltaTotal );

				theDisplayID.innerHTML = _regionsSelectedStr;
				theDisplayID.innerHTML = theDisplayID.innerHTML.replace( /%1/g, count );

				if ( regionDeltaTotal > 0 )
				{						
					theDisplayID.innerHTML += _toRAMStr + ' <SPAN CLASS="error important">+' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] + '</SPAN>';
				}
				else if ( regionDeltaTotal < 0 )
				{
					theDisplayID.innerHTML += _toRAMStr + ' <SPAN CLASS="statusTextGood important">' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] + '</SPAN>';
				}

				memForDisplay = getUnits( regionDeltaTotal2 );

				if ( regionDeltaTotal2 > 0 )
				{			
					theDisplayID.innerHTML += _toDiskStr + ' <SPAN CLASS="error important">+' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] + '</SPAN>';
				}
				else if ( regionDeltaTotal2 < 0 )
				{
					theDisplayID.innerHTML += _toDiskStr + ' <SPAN CLASS="statusTextGood important">' + memForDisplay[ 0 ] + ' ' + memForDisplay[ 1 ] + '</SPAN>';
				}
			}
			else
			{
				theDisplayID.innerHTML = '&nbsp;';
			}
		}
	}
	
	if ( selMenuHint != null )
	{
		// Clear the display areas of all other menus
		for ( var m in selMenuArray )
		{
			if ( selMenuHint.id != m )
			{
				// Clear the display of this menu
				thisSelectBox = document.getElementById( m + 'Display' );
						
				if ( thisSelectBox != null )
				{
					thisSelectBox.innerHTML = '&nbsp;';
				}
			}
		}
	}
}

var 	selMenuArray = new Array();

// Register a region state menu
function addSelMenu( menuId )
{
	selMenuArray[ menuId ] = menuId;
}

var	_regionsSelectedStr;
var	_regionsSelectedEstNAStr;
var	_diskRetDeltaWarningStr;
var	_toRAMStr;
var	_toDiskStr;
var	_toDiskRetStr;

// Accept xlates for UI strings
function setRegionsSelectedStr( regionsStr )
{
	_regionsSelectedStr = regionsStr;
}

function setRegionsSelectedEstNAStr( regionsStr )
{
	_regionsSelectedEstNAStr = regionsStr;
}

function setDiskRetDeltaWarningStr( warningStr )
{
	_diskRetDeltaWarningStr = warningStr;
}

function setToRAMStr( toStr )
{
	_toRAMStr = toStr;
}

function setToDiskStr( toStr )
{
	_toDiskStr = toStr;
}

function setToDiskRetStr( toStr )
{
	_toDiskRetStr = toStr;
}