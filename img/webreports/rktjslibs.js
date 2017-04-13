/**
 * Copyright 2010 Resonate KT Limited
 *  
 * @projectDescription	The RKT Javascript Loader provides an easy syntax to load the latest revision of a JS library, and ensures it's only loaded once.
 *  
 * @author		Christopher Meyer cmeyer@resonatekt.com
 * @version		1.0.1
 *					- #3746 JG 2013.04.03.  	Updated jquery.webreports library.
 *					- LLWR-2891 JG 2013.10.31	If the supportdir can't be determined by the script paths, it will attempt to use the current URL.
 *
 * Usage:
 * 	<script src='/livelinksupport/webreports/rktjslibs.js'></script>
 * 	<script>
 * 		rkt.load('jquery');
 *		rkt.load('json');
 *		rkt.load('webreports')
 *		rkt.load( .... )
 *		// do not put other JS calls here.  Use another <script> block (see below)  
 *	</script>
 *	
 *	<script>
 *		// other JS calls $(function() { ... });
 *	</script>    
 *	
 * The load function also takes a second parameter to target a specific version (not implemented yet).  Otherwise, the latest version will be loaded.  
 */

// make sure window.rkt is loaded once... 
window.rkt = (window.rkt) ? window.rkt : (function() {
	var filename = 'webreports/rktjslibs.js';
	
	var primary = 'min';
	var secondary = 'src';	
	var maps = {};
	
	// convert this to an object
	function mapToFullPath(js, version) {
		var lib = js.toLowerCase();
		
		if ( maps[lib] && maps[lib][primary] && maps[lib][primary][version] ) {
			return maps[lib][primary][version];
		} else if ( maps[lib] && maps[lib][secondary] && maps[lib][secondary][version] ) {
			return maps[lib][secondary][version];
		} else if( maps[lib] && maps[lib][primary] && maps[lib][primary]['default'] ) {
			return maps[lib][primary]['default'];
		} else if( maps[lib] && maps[lib][secondary] && maps[lib][secondary]['default'] ) {
			return maps[lib][secondary]['default'];
		} else {
			return undefined;
		};
	};

	function isLoaded(js, src) {
		if (js == 'jquery') {
			return window.jQuery;
		}

		var scripts = document.getElementsByTagName('script');
		
		if (this.suppport == undefined) {
			for (var i = 0; i < scripts.length; i++) {
				s = scripts[i].getAttribute("src"); 
				if ( s && s.endsWith(src) ) {
					return true;
				};
			};
		};
		
		return false;
	};

	function addScript(src) {
		 document.write("<script type='text/javascript' src='" + src + "'></script>");			
	};
	
	function addCSS(href) {
		document.write("<link href='" + href + "' rel='stylesheet' type='text/css'>");
	};
	
	function supportPath() {
		var scripts = document.getElementsByTagName('script');
		
		// cache the path
		if (this.suppport == undefined) {
			for (var i = 0; i < scripts.length; i++) { 
			    s = scripts[i].getAttribute("src"); 
			    
			    if ( s && s.endsWith(filename) ) { 
			        this.support = s.replace(filename, '');
			    };
			};
		};
		
		// if we can't find a URL in the script path, grab it from the window location:
		if ( typeof this.support === "undefined" ) {
			var fullPath = window.location.pathname.slice(1);
			var dirIndex = fullPath.indexOf('/');
			var supportDir = fullPath.slice(0, dirIndex);
			this.support = (supportDir === null) ? '/img/' : '/' + supportDir +'/'; // default to '/img/' if no match found.
			
		}
		
		return this.support;
	};
	
	// public method
	return {
		debug: function() {
			primary = 'src';
			secondary = 'min';
		},
		
		register: function(items) {
			for (var item in items) { 
				maps[item] = items[item];
			};
		},
		
		load: function(js, version) {
			var src = mapToFullPath(js, version);
			src = ( src ) ? src : js;

			if ( !isLoaded(js, src) ) {
				addScript(supportPath() + src);
			}
		},
		
		loadCSS: function(href) {
			addCSS(supportPath() + href);
		}
	};
})();


/**
 * Keys should be lowercase.  A default key must be defined.
 */ 
rkt.register({
	'jquery' : {
		src: {
			'1.4' : 'webreports/jquery/thirdparty/jquery-1.4.2.js',
			'default' : 'webreports/jquery/thirdparty/jquery-1.4.2.js'
		},
		min: {
			'1.3' : 'webreports/jquery/thirdparty/jquery-1.3.2.min.js',
			'1.4' : 'webreports/jquery/thirdparty/jquery-1.4.2.min.js',
			'default' : 'webreports/jquery/thirdparty/jquery-1.4.2.min.js'
		}
	},
	'jquery-ui': {
		src: {
			'default' : 'webreports/jquery/thirdparty/jquery-ui-1.10.1.custom.min.js'
		}	
	},
	'bgiframe': {
		src: {
			'default' : 'webreports/jquery/thirdparty/jquery.bgiframe.min.js'
		}	
	},
	'inherit': {
		min: {
			'default' : 'webreports/jquery/thirdparty/jquery.inherit-1.1.1.min.js'
		}	
	},
	'json': {
		src: {
			'default' : 'webreports/jquery/thirdparty/jquery.json-1.0.js'
		},
		min: {
			'default' : 'webreports/jquery/thirdparty/jquery.json-1.0.min.js'
		}	
	},
	'cookie': {
		src: {
			'default' : 'webreports/jquery/thirdparty/jquery.cookie.js'
		},
		min: {
			'default' : 'webreports/jquery/thirdparty/jquery.cookie.min.js'
		}	
	},
	'textarea-tools': {
		src: {
			'default' : 'webreports/jquery/thirdparty/jquery.a-tools-1.2.js'
		},
		min: {
			'default' : 'webreports/jquery/thirdparty/jquery.a-tools-1.2.min.js'
		}	
	},
	'scrollto': {
		min: {
			'default' : 'webreports/jquery/thirdparty/jquery.scrollTo-1.4.2-min.js'
		}	
	},
	'webreports': {
		src: {
			// #3746 JG 2013.04.03 'default' : 'webreports/jquery/rkt/jquery.webreports-1.0.1.js'
			'default' : 'webreports/jquery/rkt/jquery.webreports-1.0.2.js'
		},
		min: {
			// #3746 JG 2013.04.03 always call the normal version: 'default' : 'webreports/jquery/rkt/jquery.webreports-1.0.1.min.js'
			'default' : 'webreports/jquery/rkt/jquery.webreports-1.0.2.js'
		}
	},
	'webreport-editor': {
		src: {
			'default' : 'webreports/webreport-editor.js'
		}
	},
	'webreport-tag-syntax': {
		src: {
			'default' : 'webreports/webreport-tag-syntax.js'
		}
	},
	'cluetip': {
		min: {
			'default' : 'webreports/jquery/thirdparty/jquery.cluetip.min.js'
		}
	}
});

String.prototype.endsWith = function(str) {
	return (this.match(str+"$")==str)
};