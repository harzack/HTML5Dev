// Used to resize Livelink components when window is resized, so that
// the Livelink footer is at the bottom of the screen. Necessary when
// a custom appearance is used, because otherwise, parts of the footer
// or appearance may be obscured.

function llResize()
{
	var	delta;

	var	llOuterContainer = document.getElementById( "LLOuterContainer" );
	var	llContainer = document.getElementById( "LLInnerContainer" );

	if ( llOuterContainer != null && llContainer != null )
	{
		delta = llContainer.offsetTop + llOuterContainer.offsetTop;

		// Set height [back] to 100% to make it fill the space
		llContainer.style.height = '100%';

		// Set height to the equivalent pixels to avoid browser render issue
		llContainer.style.height = llContainer.offsetHeight - delta;
	}
}

window.onresize=llResize;
