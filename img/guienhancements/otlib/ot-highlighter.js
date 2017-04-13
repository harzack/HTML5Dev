var OTHighligher = function() {
	var hitimes = 3;

	function hex( n )
	{
		return ( n < 16 ? '0' : '' ) + n.toString(16); 
	}

	function unhighlight( s, o )
	{
		var d = window.document;
		s = s.replace(/([\\|^$()[\]{}.*+?])/g, '\\$1').split( /\s+/ ).join( '|' );
		o = o || d.documentElement || d.body;
		var a = o.getElementsByTagName( 'span' ), i = a.length, j,
		re = new RegExp( '^' + s + '$', 'i' );
		while( i-- )
		{
			j = a[i].firstChild;
			if( j )
			{
				if( j.nodeType === 3 && re.test( j.nodeValue ) )
				{
					a[i].parentNode.replaceChild( d.createTextNode( j.nodeValue ), a[i] );
				}
			}
		}
	}

	function highlight( s, o )
	{
		if( !s ) { return 0; }
		var d = window.document;
		s = s.replace( /([\\|^$()[\]{}.*+?])/g, '\\$1' );
		if( /^\s*$/.test( s ) ) { return 0; }
		s = s.replace(/[ ]or[ ]/gi, '|'); 
		s = s.replace(/[ ]and[ ]/gi, '|');
		s = s.split( /\s+/ ).join( '\\b|\\b' );
		s = '\\b' + s + '\\b'
		o = [ o || d.documentElement || d.body ];
		var r = new RegExp( s, 'gi' ),
		h = d.createElement( 'span' ), i = 0, j, k, l, m, n=0, t;
		h.style.color = '#000';
		h.style.backgroundColor = '#'+( hitimes%2 ? ''+hex(((hitimes+1)%5)*51)+'ff' : 'ff'+hex((hitimes%5)*51)+'' )+'00';
		hitimes++;
		do {
			m = o[i];
			if( m.nodeType === 3 )
			{
				r.lastIndex = 0;
				l = r.exec(m.nodeValue);
				if( l !== null )
				{
					k = l[0].length;
					if( r.lastIndex > k )
					{
						m.splitText( r.lastIndex - k );
						m = m.nextSibling;
					}
					if( m.nodeValue.length > k )
					{
						m.splitText(k);
						o[i++] = m.nextSibling;
					}
					t = h.cloneNode( true );
					t.appendChild( d.createTextNode( l[0] ) );n++;
					m.parentNode.replaceChild( t, m );
				}
			}
			else
			{
				j = m.childNodes.length;
				while ( j ) { o[i++] = m.childNodes.item( --j ); }
			}
		} while( i-- );
		return n;
	}

	window.hitimes     = hitimes;
	window.hex         = hex;
	window.unhighlight = unhighlight;
	window.highlight   = highlight;

	return {
		"hitimes"     : hitimes,
		"hex"         : hex,
		"unhighlight" : unhighlight,
		"highlight"   : highlight
	}
}();
