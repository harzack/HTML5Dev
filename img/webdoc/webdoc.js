function CloseSimpleApplyFrm( reloadFlag, urlPrefix, nodeID )
{
	if ( reloadFlag )
	{
		var		url = urlPrefix + '?func=doc.permsapplydown&nodeID=' + nodeID;
		parent.info.location.href=url;
	}
	else
	{
		window.close();
	}
}

