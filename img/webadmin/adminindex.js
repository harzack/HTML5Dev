//	DHTML for the Admin index page, to switch between display styles,
//	and to change tab selection. Tightly coupled with styles in admin.css.

var	styleCookieName = 'adminStyle';
var	sectionCookieName = 'adminSection';
var sectionPrefix = 'admin';
var defaultStyle = 'all';
var defaultSection = '1';


// routines to remember display style and section

function getCookie( name )
{
	var begin;
	var end;


	if ( document.cookie.length > 0 )
	{
		begin = document.cookie.indexOf( name + "=" );

		if (begin != -1)
		{
			begin += name.length+1;
			end = document.cookie.indexOf(";", begin);

			if ( end == -1 )
			{
				end = document.cookie.length;
			}

			return unescape( document.cookie.substring( begin, end ) );
		}
	}

	return null;
}

function setDisplayStyle( value )
{
    	document.cookie = styleCookieName + "=" + escape(value);
}

function getDisplayStyle()
{
    	var style = getCookie( styleCookieName );


    	if ( style == null )
    	{
    		style = defaultStyle;
    	}

	return style;
 }

function setSection( value )
{
	document.cookie = sectionCookieName + "=" + escape(value);
}

function getSection()
{
    	var section = getCookie( sectionCookieName );


    	if ( section == null )
    	{
    		section = defaultSection;
    	}

	return section;
}

// routines to change display

function closeSection( id )
{
	var		tab = document.getElementById( sectionPrefix + id + "Tab" );
	var		section = document.getElementById( sectionPrefix + id + "Section" );


	if ( tab != null )
	{
		tab.className = "adminTab";
	}

	if ( section != null )
	{
		section.className = "adminSection";
	}
}

function openSection( id )
{
	var	tab;
	var section;
	var currentSection = getSection();


	// Close current open section

	if ( currentSection != "" )
	{
		closeSection( currentSection );
	}

	// Open new section

	tab = document.getElementById( sectionPrefix + id + "Tab" );

	if ( tab != null )
	{
		tab.className = "adminTabOpen";
	}

	section = document.getElementById( sectionPrefix + id + "Section" );

	if ( section != null )
	{
		section.className = "adminSectionOpen";
		toggleTabSpacer();
	}

	setSection( id );
}

function tabsView()
{
	var container = document.getElementById( "adminContainer" );
	var tabContainer = document.getElementById( "tabContainer" );


	if ( container != null )
	{
		container.className = "tabsView";
		setDisplayStyle( 'tabs' );
	}

	if ( IE && tabContainer != null )
	{
		// Should not be necessary per CSS specs.
		tabContainer.style.display = "block";
	}
	
	toggleTabSpacer();
}

function allView()
{
	var container = document.getElementById( "adminContainer" );
	var tabContainer = document.getElementById( "tabContainer" );


	if ( container != null )
	{
		container.className = "allView";
		setDisplayStyle( 'all' );
	}

	if ( IE && tabContainer != null )
	{
		// Should not be necessary per CSS specs.
		tabContainer.style.display = "none";
	}
}

function resetDisplay( style, section )
{
	var currentSection;


	defaultStyle = style;
	defaultSection = section;
	currentSection = getSection();

	// When user goes "Back" to admin screen, it will render the section
	// selected in original HTML, so that section should be closed and the
	// stored section opened.

	if ( currentSection != defaultSection )
	{
		closeSection( defaultSection );
		openSection( currentSection );
	}

	if ( getDisplayStyle() == 'tabs' )
	{
		tabsView();
		toggleTabSpacer();
	}
	else
	{
		allView();
	}
}

function toggleTabSpacer(){

	// Reset to default height and dynamically compute new
	$('.adminTabEnd').height(14);
	$('.adminTabEnd').height($('#sectionContainer').height() - $('#adminTabDiv').height());
}
