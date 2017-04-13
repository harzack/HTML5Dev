
function removeBlankBaseHrefSettings() 
{

	var form = document.forms["RenderSettingsForm"]

	if ( form["baseHrefProtocol"].value === "Undefined" ) 
	{
		form["baseHrefProtocol"].disabled = true
	}

	if ( form["baseHrefHost"].value === "" )
	{
		form["baseHrefHost"].disabled = true
	}

	if ( form["baseHrefLookForHost"].value === "" )
	{
		form["baseHrefLookForHost"].disabled = true
	}

	if ( form["baseHrefPort"].value === "" )
	{
		form["baseHrefPort"].disabled = true
	}

}

function resetBaseHrefFields()
{

	var form = document.forms["RenderSettingsForm"]

	form["baseHrefProtocol"].disabled = false
	form["baseHrefHost"].disabled = false
	form["baseHrefLookForHost"].disabled = false
	form["baseHrefPort"].disabled = false
	
}
