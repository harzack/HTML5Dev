

		var installedModulesSectionOpened = false;

		function showInstalledModules()
		{
			var installedModuleSection = "#installedModuleSection";
			var showInstalledModulesLink = "#showInstalledModulesLink";
			var showDetailsText = LocString( 'Show Details', modulePageHelperStr ) + " " + String.fromCharCode(9660);
			var hideDetailsText = LocString( 'Hide Details', modulePageHelperStr ) + " " + String.fromCharCode(9650);

			if ( installedModulesSectionOpened  )
			{
				//
				// closing section
				//
				$(installedModuleSection).hide();
				$(showInstalledModulesLink).text( showDetailsText );
				installedModulesSectionOpened = false;
			}
			else
			{
				$(installedModuleSection).show();
				$(showInstalledModulesLink).text( hideDetailsText );
				installedModulesSectionOpened = true;
			}
		}

