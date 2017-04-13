
function otAppletCreate()
{
	return( UI_MakeObject( 'otApplet', otAppletCreate.arguments ) );
}

function otApplet( name, altText, codebase, code, archive, width, height )
{
	this.name = name || null;
	this.altText = altText || null;
	this.codebase = codebase || null;
	this.code = code || null;
	this.archive = archive || null;
	this.width = width || 640;
	this.height = height || 480;
	
	this.params = new Array();
	
	return this;
}

function otAppletAddParam( name, value )
{
	var param = new Object();
	
	param.name = name;
	param.value = value;
	
	this.params[ this.params.length ] = param;
}

function otAppletRender()
{
	var i;
	var param;
	
	var params = this.params;
	
	UI_Write( '<APPLET NAME="' + this.name + '" ALT="' + UI_HTMLEscape( this.altText ) + '" TITLE="' + UI_HTMLEscape( this.altText ) + '" CODEBASE="' + this.codebase + '" CODE="' + this.code + '" ARCHIVE="' + this.archive + '" WIDTH="' + this.width + '" HEIGHT="' + this.height + '" MAYSCRIPT>' );
	
	for( i = 0; i < params.length; i++ )
	{
		param = params[ i ];
		
		param.value = param.value.replace( /\n/g, '\\n' );
		
		UI_Write( '<PARAM NAME="' + param.name + '" VALUE="' + param.value + '">' );
	}
	
	UI_Write( '</APPLET>' );
}

otApplet.prototype.addParam = otAppletAddParam;
otApplet.prototype.render = otAppletRender;

// Support Functions

function UI_HTMLEscape( s )
{
	var retval;

	if ( typeof( s ) == "string" )
	{
		retval = s.replace( /&/g, '&amp;' );
		retval = retval.replace( /"/g, '&quot;' );
		retval = retval.replace( />/g, '&gt;' );
		retval = retval.replace( /</g, '&lt;' );
	}
	else
	{
		retval = s;
	}

	return retval;
}

function UI_MakeObject( func, args )
{
	var i;
	var s = 'new ' + func + '(';

	for( i = 0; i < args.length; i++ )
	{
		if ( i != 0 )
		{
			s += ',';
		}

		s += 'args[' + i + ']';
	}

	s += ')';

	return( eval( s ) );
}

function UI_Write( s )
{
	document.write( s );
}
