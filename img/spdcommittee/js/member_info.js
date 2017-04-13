function buttonAction( theObject, firstShowingRecord, lastShowingRecord, maxUsers  )
{
	var retVal = true
	var cb = false
	
	if ( theObject.name == 'Back' )
	{
		document.CommUserPB.LastRecord.value = firstShowingRecord - 1;
		document.CommUserPB.FirstRecord.value = firstShowingRecord - maxUsers;
	}
	
	if ( theObject.name == 'Next' )
	{
		document.CommUserPB.LastRecord.value = lastShowingRecord + maxUsers;
		document.CommUserPB.FirstRecord.value = lastShowingRecord + 1;
	}

	document.CommUserPB.submit();					
	
	return retVal

}

function select_all( formname )
{
	for ( var i = 0; i < document.forms[formname].length; i++ )
	{
		var s = Number(document.forms[formname][ i ].name);
		if (s > 0) {
			document.forms[formname][ i ].checked = true;
			addSelectedNodeIndex( formname, s )
		}
	}		
}

var membershipRequestArray = new Array();
var membershipCancelRequestArray = new Array();
var expertRequestArray = new Array();
var expertCancelRequestArray = new Array();
		
function getSelectedNodeIndex( selectedNodeArray, nodeid )
{		
	if ( selectedNodeArray != null )
	{
		for ( var i = 0; i < selectedNodeArray.length; i++ )
		{
			if ( selectedNodeArray[ i ] == nodeid )
			{
				return i;
			}
		}
	}

	return -1;
}


function addSelectedNodeIndex( formname, nodeid )
{
	var sidx;
	if(formname == 'expertRequestForm')
	{
		sidx = getSelectedNodeIndex( expertRequestArray, nodeid )
		if ( sidx < 0 )
		{
			expertRequestArray.length += 1;
			expertRequestArray[ expertRequestArray.length-1 ] = nodeid;
		}
	} else if(formname == 'membershipRequestForm')
	{
		sidx = getSelectedNodeIndex( membershipRequestArray, nodeid )
		if ( sidx < 0 )
		{
			membershipRequestArray.length += 1;
			membershipRequestArray[ membershipRequestArray.length-1 ] = nodeid;
		}
	} else if(formname == 'membershipCancelRequestForm')
	{
		sidx = getSelectedNodeIndex( membershipCancelRequestArray, nodeid )
		if ( sidx < 0 )
		{
			membershipCancelRequestArray.length += 1;
			membershipCancelRequestArray[ membershipCancelRequestArray.length-1 ] = nodeid;
		}
	} else if(formname == 'expertCancelRequestForm')
	{
		sidx = getSelectedNodeIndex( expertCancelRequestArray, nodeid )
		if ( sidx < 0 )
		{
			expertCancelRequestArray.length += 1;
			expertCancelRequestArray[ expertCancelRequestArray.length-1 ] = nodeid;
		}
	}
	

}

function removeSelectedNodeIndex( formname, nodeid )
{

	var si;
	if(formname == 'expertRequestForm')
	{
		si = getSelectedNodeIndex( expertRequestArray, nodeid  )

		if ( si >= 0 )
		{
			for ( var j = ( si + 1 ); j < expertRequestArray.length; j++ )
			{
				expertRequestArray[ j - 1 ] = expertRequestArray[ j ];
			}
			expertRequestArray.length -= 1;
		}
	} else if(formname == 'membershipRequestForm')
	{
		si = getSelectedNodeIndex( membershipRequestArray, nodeid )

		if ( si >= 0 )
		{
			for ( var j = ( si + 1 ); j < membershipRequestArray.length; j++ )
			{
				membershipRequestArray[ j - 1 ] = membershipRequestArray[ j ];
			}
			membershipRequestArray.length -= 1;
		}
	} else if(formname == 'membershipCancelRequestForm')
	{
		var si = getSelectedNodeIndex( membershipCancelRequestArray, nodeid )

		if ( si >= 0 )
		{
			for ( var j = ( si + 1 ); j < membershipCancelRequestArray.length; j++ )
			{
				membershipCancelRequestArray[ j - 1 ] = membershipCancelRequestArray[ j ];
			}
			membershipCancelRequestArray.length -= 1;
		}
	} else if(formname == 'expertCancelRequestForm')
	{
		var si = getSelectedNodeIndex( expertCancelRequestArray, nodeid )

		if ( si >= 0 )
		{
			for ( var j = ( si + 1 ); j < expertCancelRequestArray.length; j++ )
			{
				expertCancelRequestArray[ j - 1 ] = expertCancelRequestArray[ j ];
			}
			expertCancelRequestArray.length -= 1;
		}
	}
}

function showSearch(shows, hides, showl, hidel, advancedSearch)
{
	var showsearch = document.getElementById(shows);		
	var hidesearch = document.getElementById(hides);  			
	var showlink = document.getElementById(showl);
	var hidelink = document.getElementById(hidel);

	showsearch.style.display = 'inline';
	hidesearch.style.display = 'none';
	showlink.style.display = 'inline';
	hidelink.style.display = 'none';
	
	document.DoMailSearchFrm2.advancedSearch.value = advancedSearch;

	if( document.CommUserPB.advancedSearch )
	{
		document.CommUserPB.advancedSearch.value = advancedSearch;
	}
}

function checkUserID()
{
	if( document.DoMailSearchFrm.userID.value == '' )
	{
		document.DoMailSearchFrm.userID.value = 0;
	}
}

function doSearch( sortColumn, searchMode )
{
	document.DoMailSearchFrm2.sortCols.value = sortColumn;
	document.DoMailSearchFrm2.resort.value = true;
	
	if( document.DoMailSearchFrm2.advancedSearch.value )
	{
		document.DoMailSearchFrm2.SearchType[0].value = "over_all";
	}
	
	document.DoMailSearchFrm2.submit();	
}

function resetCacheID()
{
	document.DoMailSearchFrm2.cacheID.value = "";
	document.DoMailSearchFrm2.submit();
}

function goTo( url )
{
	url2 = url + "&advancedSearch=" + document.DoMailSearchFrm2.advancedSearch.value;
	window.location.href = url2
}
