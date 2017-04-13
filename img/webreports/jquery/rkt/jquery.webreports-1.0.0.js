/**
 * @license Copyright 2010 Resonate KT Limited  
 * @projectDescription	This jQuery extension contains Livelink, WebReport, and DHTML utility functions.
 *
 * @author		Christopher Meyer cmeyer@resonatekt.com
 * @version		1.0.0  
 *
 * Available functions in this library:
 *
 * jQuery static functions/constants: 
 *	$.LL.getCGI
 *	$.LL.supportPath
 *	$.LL.cgiPath
 *	$.LL.objAction
 *	$.LL.RunReport
 *	$.LL.icon
 *	$.LL.lapi
 *	$.LL.invokeservice
 *	$.LL.setMaxActive
 *	$.LL.queueAjax (private function)
 *	$.LL.fireAjax (private function)
 *	$.WR.invoke
 *	$.AV.invoke 
 *	$.MultiButton.*
 *	$.addJS
 *	$.getURLParam
 *	$.getNextURL
 *	$.toQueryParams
 *	$.quote
 *	$.isInteger 
 *	$.tmpl
 *	$.cleanString
 *	$.attrTypes (constants)
 *	$.S4
 *	$.guid 
 *
 * jQuery:  
 *	.outerHTML
 *	.pluck
 *	.generateGuid
 *	.placeholder
 *	.decodeDataIsland
 *      
 * $LL(dataid)
 *	.rename 
 *	.UpdateObjectInfo 
 *	.GetObjectInfo
 *	.FetchCategoryVersion
 *      
 * String.prototype:
 *	beginsWith
 *	endsWith 
 *	stripTags
 *	escapeHTML
 *	unescapeHTML
 *
 * Date.prototype
 *	fromLLDate
 *	toLLDate
 *	toLLSearchDate (not implemented)    
 */

/**
 * Extend jQuery with the LL namespace (e.g., $.LL.funcname) containing static functions
 */
jQuery.extend({
	LL: {
		// filename: 'webreports/jquery/rkt/jquery.webreports-1.0.0.js',
		filename: 'webreports/jquery/rkt/jquery.webreports',

		/**
		 * Returns the Livelink CGI
		 * @return {String} The Livelink CGI path (e.g., livelink.exe )
		 */
		getCGI: function () {
			if (this.cgi == undefined) {
				if (location.pathname.lastIndexOf('/llisapi.dll') >= 0) {
					this.cgi = 'llisapi.dll';
				} else if (location.pathname.lastIndexOf('/livelink.exe') >= 0) {
					this.cgi = 'livelink.exe';
				} else if (location.pathname.lastIndexOf('/livelink') >= 0) {
					this.cgi = 'livelink';
				} else {
					this.cgi = location.pathname;
				};
			};

			return this.cgi;
		},

		/**
		 * Returns the relative Livelink support path
		 *          
		 * @param {String} subdir   An optional subdirectory to append to the support path                  
		 * @return {String} The Livelink support path (e.g., /Livelinksupport/[subdir/])
		 */
		supportPath: function(subdir, filename) {
			if (this.path == undefined) {
				$('script').each(function(i, s) {
					var src = $(s).attr('src');
					if (src && src.match($.LL.filename)) {
						$.LL.path = $(s).attr('src').substr(0, src.search($.LL.filename) );
					}
				});
			}
			subdir = subdir ? subdir + '/' : '';
			subdir = filename ? subdir + filename : subdir;

			return this.path + subdir;
		},

		/**
		 * Returns the relative Livelink CGI path
		 * @return {String} The relative Livelink CGI path (e.g., /Livelink/llisap.dll)
		 */
		cgiPath: function() {
			var cgi = this.getCGI();
			var url = location.pathname;
			var position = url.lastIndexOf(cgi);
			return url.substring(0, position + cgi.length);
		},

		/*
		relativeURL: function () {
			return this.cgiPath() + s.substring(s.indexOf('?') + 1).split('#')[0].split('&')
		},
		*/

		// See http://docs.jquery.com/Ajax/jQuery.get for details; callback=function(data, textStatus){}
		objAction: function(action, dataid, options) {
			options = $.extend(options, {
				func: 'll',
				objAction: action,
				objId: dataid
			});

			$.get(this.cgiPath(), options.callback, options.type)
		},

		RunReport: function(dataid, options) {
			this.objAction('RunReport', dataid, options);
		},

		icon: function(subtype, mimetype) {
			switch (subtype) {
				case 0:
					// Folder
					return this.supportPath('webdoc', 'folder.gif');
				case 136:
					// Compound Document
					return this.supportPath('webdoc', 'cd.gif');
				case 140:
					// URL
					return this.supportPath('webdoc', 'url.gif');
				case 141:
					// Enterprise Workspace
					return this.supportPath('webdoc', 'icon_library.gif');
				case 142:
					// Personal Workspace
					return this.supportPath('webdoc', 'icon_mystuff.gif');
				case 144:
					// Document
					if (mimetype) {
						switch (mimetype) {
						case 'application/pdf':
							// pdf
							return this.supportPath('webdoc', 'apppdf.gif');
						case 'application/msword':
							// word
							return this.supportPath('webdoc', 'appword.gif');
						case 'application/vnd.ms-excel':
							// excel
							return this.supportPath('webdoc', 'appexel.gif');
						case 'image/jpeg':
							// jpg
							return this.supportPath('webdoc', 'appjpeg.gif');
						case 'application/zip':
							//zip
							return this.supportPath('webdoc', 'appzip.gif');
						case 'text/html':
							// text
							return this.supportPath('webdoc', 'appiexpl.gif');
						default:
							// unknown
							return this.supportPath('webdoc', 'doc.gif');
						}
					} else { // unknown
						return this.supportPath('webdoc', 'doc.gif');
					}
				case 299:
					// LiveReport
					return this.supportPath('report', '16report.gif');
				case 3030202:
					// eCommunity
					return this.supportPath('spdcommittee', '16committee.gif');
				default:
					return this.supportPath('webdoc', 'llroot.gif');
			}
		},

		/**
		 * Call a LAPI function using AJAX.  Results are returned to the callback function as a Javascript object                  
		 *
		 * @param {String} func The lapi function name
		 * @param {Object} args The LAPI arguments
		 * @param {Function} callback=function(data, textStatus) {...}
		 *                  data.ok - status of the call; data.ErrMsg - String error message                           
		 */
		lapi: function(func, args, callback, options) {
			if ($.isFunction(args)) {
				options = callback;
				callback = args;
				args = {};
			};
			
			options = $.extend({
				global: true
			}, options);

			var parms = {
				func: 'webreports.lapi',
				lapi: func,
				inArgs: $.json.encode(args)
			};

			this.queueAjax(function () {
				$.ajax({
					type: 'POST',
					url: $.LL.cgiPath(),
					data: parms,
					success: callback,
					dataType: 'json',
					global: options.global
				});
				
				
				// $.post($.LL.cgiPath(), parms, callback, 'json');
			});
			
			/*
			$.ajax({
			  type: 'POST',
			  url: url,
			  data: data,
			  success: success
			  dataType: dataType
			});
			*/
			
			
		},

		/**
		 * Invoke a Livelink WebService (Livelink v9.7.1+ only)
		 * 
		 * @param {String} ServiceName The service name
		 * @param {ServiceMethod} ServiceMethod The service method name
		 * @param {Object} [args] Optional parameters to the service method                                             
		 * @param {Function} [callback] callback function.  See lapi, above
		 */
		invokeservice: function (ServiceName, ServiceMethod, args, callback) {
			if ($.isFunction(args)) {
				callback = args;
				args = {};
			};

			var parms = {
				ServiceName: ServiceName,
				ServiceMethod: ServiceMethod,
				Arguments: args
			};

			$.LL.lapi('InvokeService', parms, callback);
		},

		// todo: document
		setMaxActive: function (maxActive) {
			this.maxActive = maxActive;
		},
		
		/**
		 * Private function
		 */
		queueAjax: function (func) {
			this.queue = this.queue || [];

			this.queue.push(func);
			this.fireAjax();
		},

		/**
		 * Private function
		 */
		fireAjax: function () {
			this.queue = this.queue || [];
			this.maxActive = this.maxActive || 50;

			while (($.active <= this.maxActive) && (0 < this.queue.length)) {
				this.queue.shift()();
			};
		}
	}
});

//  $([$]).ajaxComplete(function () {
$(window).ajaxComplete(function () {
	jQuery.LL.fireAjax();
});

/**
 * Extend jQuery with the WR namespace (e.g., $.WR.funcname) containing WebReport static functions
 */
jQuery.extend({
	WR: {
		/**
		 * Execute a WebReport service.  This is an alternative to executeWRService().  
		 *
		 * See Livelink Help :: WebReports :: AJAX Function Reference :: executeWRService                  
		 *         
		 * @param {String} tagdata raw data e.g., 2000, or (DATE|DATETIME|LANGUAGE|LIBPATH|SUBVERSION|SUPPORTDIR|SUPPORTURL|URLPREFIX|USAGE|USERFULLNAME|USERID|USERNAME|WEBDAVDIR)
		 * @param {String} [subtags] An optional subtag to operate on the tagdata e.g., "NODEINFO:NAME"
		 * @param {Function} callback, A callback function after the response is received e.g., function(data) {alert(data);}
		 * @param {String} [type] (text|json|xml)
		 */
		 
		llrequest: 'webreports.runservice',
		 
		invoke: function(tagdata, subtags, callback, type) {
			// shift over if subtags ommitted
			if ($.isFunction(subtags)) {
				type = callback;
				callback = subtags;
				subtags = '';
			}

			type = type ? type : 'text';

			var parms = {
				// func: 'webreports.runservice',
				func: this.llrequest,
				servicetype: 'gettagdata',
				tagdata: tagdata,
				statictag: tagdata,
				subtags: subtags,
				responsetype: ($.inArray(type, ['json', 'xml']) > -1) ? type : 'string' // WebReports uses 'string' instead of 'text'
			};
			// TODO: should POST be possible?
			$.LL.queueAjax(function () {
				$.post($.LL.cgiPath(), parms, callback, type);
			});
		}
	}
});


jQuery.extend({
	AV: {
		llrequest: 'activeview.runservice',
		invoke: $.WR.invoke
	}
});



jQuery.extend({
	MultiButton: {
		/* Is this consistent over LL versions? */
		/* Internationalization? */
		defaultButtons: {
			move: ['move', 'Move', 'll.ProcessMultiMove', 'move'],
			copy: ['copy', 'Copy', 'll.ProcessMultiCopy', 'copy'],
			del: ['del', 'Delete', 'll.ProcessMultiDelete', 'delete'],
			zipdwnld: ['multifile/zipdwnld', 'Zip & Download', 'multifile.zipdwnldmulti', 'zipdwnld'],
			zipemail: ['multifile/zipemail', 'Zip & E-mail', 'multifile.zipemailmulti', 'zipemail'],
			print: ['multifile/print', 'Print', 'multifile.printmulti', 'print'],
			collect: ['collections/collect', 'Collect', 'll.CollectStaging', 'collectItems']
		},

		makeButton: function (img, nameStr, action, typeStr) {
			var img1 = $.tmpl('url(#{support}#{img}.gif)', {support: $.LL.supportPath(), img:img});
			var img2 = $.tmpl('url(#{support}#{img}2.gif)', {support: $.LL.supportPath(), img:img});

			var $input = $('<input>').addClass('multiButton').css('background-image', img1)
				.hover(function () {
						$(this).css('background-image', img2);
					},
					function () {
						$(this).css('background-image', img1);
					})
				.attr('name', nameStr)
				.attr('type', 'button')
				.data('action', action)
				.data('typeStr', typeStr)
				.val(nameStr);
			
			/*
			if (action) {
				$input.click(function () {
					doSubmit(action, typeStr);
				})
			};
			*/
			return $input;
		},

		defaultButton: function(key) {
			var val = this.defaultButtons[key];
			if (val) {
				return this.makeButton(val[0], val[1], val[2], val[3]);
			}
		},

		defaultButtonInert: function(key) {
			alert('defaultButtonInert Called');
			var val = this.defaultButtons[key];
			if (val) {
				return this.makeButton(val[0], val[1]);
			}
		}
	}
});


/**
 * Useful jQuery static functions.
 */
jQuery.extend({
	/**
	 * Adds a Javascript file declaration to the <head></head> section of the page
	 * 
	 * @param {String} js The Javascript path and filename relative to the Livelink support path            
	 */
	addJS: function (js) {
		$('<script></script>').attr('src', $.LL.supportPath() + js).appendTo('body');
	},

	/**
	 * Returns the value of a given url parameter
	 * 
	 * @param {String} paramName The URL parameter name e.g., &paramName=
	 * @return {String} The value of the parameter
	 */
	getURLParam: function(paramName, defaultValue) {
		var params = String(document.location).toLowerCase()
		
		var value = $.toQueryParams(params)[paramName.toLowerCase()]; 
		return value || defaultValue;
	},

	getURLQuery: function (s) {
		var s = s || String(document.location);
		return s.substring(s.indexOf('?') + 1).split('#')[0];
	},

	getNextURL: function () {
		return encodeURIComponent(location.pathname + '?' + $.getURLQuery());
	},

	/**
	 * The inverse of the jQuery.param() function.  Returns the URL parameters as a Javascript Object
	 *
	 *      e.g., {func:'ll', objAction:'browse', objId:'2000', sort:'name'}
	 *
	 * @param {String} [s]
	 * @return {Object} The url parameters
	 */
	toQueryParams: function(txt) {
		var s = txt || String(document.location)
		var paramsList = s.substring(s.indexOf('?') + 1).split('#')[0].split('&')
		var params = {},
			key, value, pair;

		for (var i = 0; i < paramsList.length; i++) {
			pair = paramsList[i].split('=');
			key = decodeURIComponent(pair[0]);
			value = (pair[1]) ? decodeURIComponent(pair[1]) : undefined;

			if (params[key]) {
				if (typeof params[key] == "string") {
					params[key] = [params[key]];
				}
				params[key].push(value);
			} else {
				params[key] = value;
			}
		}

		return params;
	},

	quote: function(s, ch) {
		var c = ch || '"';
		return c + s + c;
	},

	isInteger: function (s) {
		return (s.toString().search(/^-?[0-9]+$/) == 0);
	},

	/**
	 * A simple templating function.
	 */
	tmpl: function(s, o) {
		return s.replace(/#{([^{}]*)}/g, function (a, b) {
			var r = o[b];
			return typeof r === 'string' || typeof r === 'number' ? r : a;
		});
	},

	cleanString: function (s) {
		return $.trim(s).replace(/ /g, '_').toLowerCase();
	},
	
	generateGuid: function () {
		return $.S4() + $.S4() + "-" + $.S4() + "-" + $.S4() + "-" + $.S4() + "-" + $.S4() + $.S4() + $.S4();
	},
	
	S4: function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
});


/**
 * TODO: Document
 */
jQuery.extend({
	attrTypes: {
		CheckboxType: 5,
		DateFieldType: -7,
		DatePopupType: 13,
		IntegerFieldType: 2,
		IntegerPopupType: 12,
		RealFieldType: -4,
		SetType: -18,
		TextFieldType: -1,
		TextMultiLineType: 11,
		TextPopupType: 10,
		UserFieldType: 14
	}
});


jQuery.attrTypes = jQuery.extend(jQuery.attrTypes, {
	stringTypes: [$.attrTypes.TextFieldType, $.attrTypes.TextMultiLineType, $.attrTypes.TextPopupType],
	integerTypes: [$.attrTypes.IntegerFieldType, $.attrTypes.IntegerPopupType],
	booleanTypes: [$.attrTypes.CheckboxType],
	dateTypes: [$.attrTypes.DateFieldType,$.attrTypes.DatePopupType],
	popupTypes: [$.attrTypes.TextPopupType, $.attrTypes.IntegerPopupType, $.attrTypes.DatePopupType]
});


/**
 * Extend jQuery.fn with some useful functions
 */
jQuery.fn.extend({
	outerHTML: function () {
		return $('<div>').append(this.eq(0).clone()).html();
	},

	stripTags: function () {
		return this.html().replace(/<\/?[^>]+>/gi, '');
	},

	/**
	 * Fetches the same property for all matched elements
	 *
	 * @returns {Object} The property values     
	 */
	pluck: function (key) {
		var plucked = [];
		this.each(function () {
			plucked.push(this[key])
		})
		return plucked;
	},

	/**
	 * Generates and assignes a unique id to each matched element
	 * 	  
	 * @returns {jQuery}          
	 */
	guid: function () {
		return this.each(function () {
			if ( $(this).attr("id").length == 0) {
				$(this).attr( "id", $.generateGuid() );
			};
		});
	},

	// http://www.phpied.com/json-data-island/
	decodeDataIsland: function () {
		var elem = this[0];

		if (elem) {
			return $.json.decode( elem.firstChild.data );
		};

		return [];
	}
});


$LL = function (dataid) {
	// initialize only once
	if (this.nodes == undefined) {
		this.nodes = {};
	};

	if (this.nodes[dataid] == undefined) {
		this.nodes[dataid] = new $LL.fn.init(dataid);
	};

	return this.nodes[dataid];
};

$LL.fn = {
	init: function (dataid) {
		this.dataid = dataid;
	},

	rename: function (value, callback) {
		this.UpdateObjectInfo('Name', value, callback);
		return this;
	},

	UpdateObjectInfo: function (field, value, callback) {
		var objInfo = {};
		objInfo[field] = value;

		$.LL.lapi('UpdateObjectInfo', {
			VolumeID: 0,
			NodeID: this.dataid,
			ObjInfo: objInfo
		},
		callback);

		return this;
	},

	GetObjectInfo: function (callback) {
		$.LL.lapi('GetObjectInfo', {
			VolumeID: 0,
			NodeID: this.dataid
		},
		callback);
		return this;
	},

	FetchCategoryVersion: function (callback) {
		$.LL.lapi('FetchCategoryVersion', {
			catID: {
				ID: this.dataid
			}
		},
		callback);
		return this;
	}
};

$LL.fn.init.prototype = $LL.fn;


String.prototype.beginsWith = function (str) {
	// return (str.toLowerCase() == this.substring(0, str.length).toLowerCase());
	return (this.match("^"+str) == str);
};

String.prototype.endsWith = function(str) {
	return (this.match(str+"$")==str);
};

String.prototype.stripTags = function () {
	return this.replace(/<\/?[^>]+>/gi, '');
};

String.prototype.escapeHTML = function () {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(this));
	return div.innerHTML;
};

String.prototype.unescapeHTML = function () {
	var div = document.createElement('div');
	div.innerHTML = this.stripTags();
	return div.childNodes[0].nodeValue;
};


$.extend(Date.prototype, {
	fromLLDate: function (llDateString) {
		this.setTime(llDateString.substr(2).replace(':', ' '));
	},

	// returns YYYYMMDD
	toLLDate: function () {
		var year = this.getFullYear();
		var month = this.getMonth() + 1; // 0-index
		var dat = this.getDate();
		var hour = this.getHours();
		var min = this.getMinutes();
		var sec = this.getSeconds();

		return "D/" + year + "/" + month + "/" + dat + ":" + hour + ":" + min + ":" + sec;
	},
	
	isValid: function() {
		return !isNaN(this.getTime());
	}

	/*
	toLLSearchDate: function () {
		return String(this.getFullYear()) + String(this.getFullMonth()) + String(this.getFullDate());
	}
	*/
});




/**
 * Livelink v9.7.1 adds a function to Object.prototype.addProperty in
 * otutilities.js.  This modification causes problems with jQuery
 * (see http://erik.eae.net/archives/2005/06/06/22.13.54/).  The
 * following works around the issue.
 */
$(function () {
	if (window.BrowseViewColumn && BrowseViewColumn.prototype.addProperty) {
		BrowseViewColumn.prototype.addProperty = Object.prototype.addProperty;
	};
	
	delete Object.prototype.addProperty;
});


/*
$.WR.invoke(2000, 'NODEINFO:NAME', function(data) {
	alert(data); // Enterprise
});
*/

/* Example - get the current user
$.WR.invoke('USERNAME', function(data) {
	alert(data); // Admin
});
*/

/* Example - another way to get the current user, using a sub-tag
$.WR.invoke('USERID', 'USERINFO:NAME', function(data) {
	alert($.json.encode(data)); // {"error":false,"content":"Admin"}
}, 'json');
*/


/*
$LL(50950).FetchCategoryVersion(function(data, textStatus) {
    var attrs = data.CatVersion.definition.Children
    $.each(attrs, function() {
        alert("Attribute " + this.DisplayName + " has ID " + this.ID);
    });
});
*/

/* Example - Get the Livelink version
$.LL.lapi('GetServerInfo', function(data) {
    if (data.ok) {
       alert(data.serverInfo.serverVersion); // displays 9.7.0
    } else {
        alert(data.errMsg); // oops
    }
});
*/

/* Example - Get the object info
$(function() {
    $.LL.lapi('GetObjectInfo', {VolumeID:0, NodeID:2000}, function(data) {
        if (data.ok) {
            alert( $.json.encode(data.objInfo) );
        } else {
            alert(data.ErrMsg);
        }
    });
});
*/