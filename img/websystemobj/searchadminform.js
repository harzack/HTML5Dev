function StartProcess( frm )
{
	frm.func.value = "process.startthisprocess";
	frm.submit();
}

function StopProcess( frm )
{
	frm.func.value = "process.stopthisprocess";
	frm.submit();
}

function StartProcessFamily( frm )
{
	frm.func.value = "process.start";
	frm.submit();
}

function StopProcessFamily( frm )
{
	frm.func.value = "process.stop";
	frm.submit();
}

function RestartProcessFamily( frm )
{
	frm.func.value = "process.restart";
	frm.submit();
}

function ReSync( frm )
{
	frm.func.value = "process.resync";
	frm.submit();
}

function WriteCheckpoint( frm )
{
	frm.func.value = "process.writecheckpoint";
	frm.submit();
}

function WarnPositiveNumber( errorStr, name, val, integerOnly )
{
	if ( isNaN( val ) || ( val <= 0 ) || ( val == '' ) || ( integerOnly && val.indexOf( '.' ) != -1 ) )
	{
		alert( name + ' ' + errorStr );

		return false;
	}
	return true;
}
