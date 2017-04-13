//onload window, set size and position

function onLoadStuff(height, width)
{
	var		xPos;
	var		yPos;

	var		availWidth = screen.availWidth;
	var		availHeight = screen.availHeight;


	xPos = ( availWidth / 2 ) - ( width / 2 );
	yPos = ( availHeight / 2 ) - ( height / 2 );

	self.moveTo( xPos, yPos );
	self.resizeTo( width, height );

}