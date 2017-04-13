
function doPagePickEdit( howMany, endPage, prefixLabel )
{

	var 	pageNum;

	var 	pickPageEdit = document.getElementById( 'pagePickEdit_' + prefixLabel );

	if ( pickPageEdit != null )
	{
		pageNum = parseInt( pickPageEdit.value, 10 );
		if ( !isNumber( pickPageEdit ) )
		{
			return false;
		}
		else if ( pageNum > endPage )
		{
			pageNum = endPage;
		}
		else if ( pageNum <= 0 )
		{
			pageNum = 1;
		}

		doSubmitPage( ( pageNum - 1 )  * howMany );
	}
}

function isNumber( item )
{
	var str = item.value;
	var re = /^[-]?\d+$/;

	str = str.toString();

	if ( ! str.match( re ) )
	{
		return false;
	}

	return true;
}

function showMe( n )
{
	var label = document.getElementById( "l" + n );
	var value = document.getElementById( "v" + n );
			
	value.style.display = '';
	label.style.display = 'none';
			
	return false;
}