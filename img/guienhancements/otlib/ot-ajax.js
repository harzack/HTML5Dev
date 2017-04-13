var OTAjax = function() {
	var $A    = OTProto.$A;
	var $H    = OTProto.$H;
	var Ajax  = OTProto.Ajax;
	var Event = OTProto.Event;


	/*--------------------------------------------------------------------------*/
	var LLAjax = {
	  /*------------------------*/
		getLivelinkCGI : function() {
			if (location.pathname.search(/llisapi.dll/i) >= 0) {
				return 'llisapi.dll'; // IIS
			} else if (location.pathname.search(/livelink.exe/i) >= 0) {
				return 'livelink.exe'; // Windows
			} else if (location.pathname.search(/livelink/i) >= 0) {
				return 'livelink'; // Unix
			} else {
				return location.pathname; // hopefully won't happen
			}
		},

		getScriptURL : function() {
		  cgi = LLAjax.getLivelinkCGI();
		  url = location.pathname;
		  var cgiRegExp = new RegExp(cgi, "i")
		  position = url.search(cgiRegExp);      
		  scriptURL = url.substring(0, position + cgi.length)
		  return scriptURL;
		},

		getLivelinkSupportDir : function() {
			llcgi = LLAjax.getLivelinkCGI();
			index = location.pathname.search(llcgi);
			return location.pathname.substring(0, index-1) + 'support/';
		},

		GetChildrenOfNode : function(/*objId, handler[, subType][, startsWith][, maxNumber][,depth][,caseSensitive]*/) {
			//mandatory arguments:
			//	objId: defining the parent object
			//	handler: the function being called after receiving the ajax result
			//optional arguments:
			//	subType: the LL subtype
			// 	startsWith: a string the name of the LL objects have to start with
			//	maxNumber: the maximum number of records to retrieve
			//  depth: how many levels to grab for nodes
			//  caseSensitive: boolean flag to define if the search is case sensitive
			var args = $A(arguments);
			var pars = {};
			pars['func'] = 'WikiAjax.GetChildrenOfNode';
			pars['objId'] = args[0];
			if(args[2] != null) pars['subType'] = args[2];
			if(args[3] != null) pars['startsWith'] = args[3];
			if(args[4] != null) pars['maxNumber'] = args[4];
			if(args[5] != null) pars['depth'] = args[5];
			if(args[6] != null) pars['caseSensitive'] = args[6];
			new Ajax.Request(LLAjax.getScriptURL(), {method: 'get', parameters: ($H(pars)).toQueryString(), onComplete: args[1]});
		},
		GetAttributesOfNode : function(objId, handler) {
			//mandatory arguments:
			//	objId: defining the parent object
			//	handler: the function being called after receiving the ajax result
			var pars = {};
			pars['func'] = 'WikiAjax.GetChildrenOfNode';
			pars['objId'] = objId;
			pars['depth'] = 0;

			new Ajax.Request(LLAjax.getScriptURL(), {method: 'get', parameters: ($H(pars)).toQueryString(), onComplete: handler});
		},
		QueryNodes : function(/*handler[, subType][, parentID][, startsWith][, maxNumber][,caseSensitive]*/) {
			//mandatory arguments:
			//	handler: the function being called after receiving the ajax result
			//optional arguments:
			//	subType: the LL subtype
			// parentID: DataID of the parent
			// 	startsWith: a string the name of the LL objects have to start with
			//	maxNumber: the maximum number of records to retrieve
			//  caseSensitive: boolean flag to define if the search is case sensitive
			var args = $A(arguments);
			var pars = {};
			pars['func'] = 'WikiAjax.QueryNodes';
			if(args[1] != null) pars['subType'] = args[1];
			if(args[2] != null) pars['parentID'] = args[2];
			if(args[3] != null) pars['startsWith'] = args[3];
			if(args[4] != null) pars['caseSensitive'] = args[4];
			if(args[5] != null) pars['maxNumber'] = args[5];

			new Ajax.Request(LLAjax.getScriptURL(), {method: 'get', parameters: ($H(pars)).toQueryString(), onComplete: args[0]});
		},
		/*------------------------*/
		getXMLResponse : function(originalRequest) {
			responseXML = originalRequest.responseXML;

			if ( responseXML.hasChildNodes() == false) {
				responseXML.loadXML(originalRequest.responseText);
			}
			return responseXML;
		},
		/*------------------------*/
		getAjaxResponse : function(originalRequest) {
			return LLAjax.getChildElementsByTagName(LLAjax.getXMLResponse(originalRequest), 'ajax-response')[0];
		},

		/*------------------------*/
		// Overwrite the Prototype.Ajax() initialization method to override the MimeType in Firefox  
		prototypeAjaxInit : function(url, options) {
			this.initializeOrig(url, options);
			if (this.transport.overrideMimeType) {
				this.transport.overrideMimeType('text/xml');
			}
		},
		/*------------------------*/
		pageLoadInit : function() {
			Ajax.Request.prototype.initializeOrig = Ajax.Request.prototype.initialize;
			Ajax.Request.prototype.initialize = LLAjax.prototypeAjaxInit;
		},
		/*------------------------*/
		getChildElementsByTagName : function(xmlElement, tagName) {
			var elements = [];
		
			for (var i=0; i<xmlElement.childNodes.length; i++) {
				if (xmlElement.childNodes[i].nodeName == tagName) {
					elements.push(xmlElement.childNodes[i]);
				}
			}
			return elements;
		},
	  
		getParentByClassName : function (element, className) {
			if ( Element.hasClassName(element, className) ) {
				return element;
			} else if (element.parentNode) {
				return LLAjax.getParentByClassName(element.parentNode, className);
			} else {
				return undefined;
			}
		},
		
		getOpenTriangleImg : function(className, hidden) {
			className = (className == null) ? 'openGIF' : className;
			hidden = (hidden == null) ? true : hidden;
			openImage = document.createElement('img');
			openImage.setAttribute('src', LLAjax.getLivelinkSupportDir() + 'wiki/opentriangle.gif');
			if (hidden) {
			  Element.hide(openImage);
			}
			Element.addClassName(openImage, className);
			return openImage;
		},
		
		getCloseTriangleImg : function(className, hidden) {
			className = (className == null) ? 'closeGIF' : className;
			hidden = (hidden == null) ? false : hidden;
			closeImage = document.createElement('img');
			closeImage.setAttribute('src', LLAjax.getLivelinkSupportDir() + 'wiki/triangle.gif');
			if (hidden) {
			  Element.hide(closeImage); 
			}
			Element.addClassName(closeImage, className);
			return closeImage;
		},
		
		getKeyCode : function(event) {
			if (!event) {
				event = window.event;
			}
		
			if (event.which) {
				keyCode = event.which;
			} else if (event.keyCode) {
				keyCode = event.keyCode;
			} else {
				keyCode = 0;
			}
			
			return keyCode;
		},
		
		trim: function(text) {
		  return text.replace(/^\s*|\s*$/g,"");
		}
	};

	/*--------------------------------------------------------------------------*/
	LLAjax.LLNode = {
		getChildNodes : function(node) {
			children = LLAjax.getChildElementsByTagName(node, 'children');
			
			if ( children.length == 1 ) {
				return LLAjax.getChildElementsByTagName(children[0], 'node')
			} else {
				return null;
			}
		},
		
		getValue : function(node, tagName) {
			return LLAjax.getChildElementsByTagName(node, tagName)[0].firstChild.data;
		},
		
		getName : function(node) {
			return LLAjax.LLNode.getValue(node, 'name');
		},
		
		getSubtype : function(node) {
			return LLAjax.LLNode.getValue(node, 'subtype');
		},
		
		getDataID : function(node) {
			return LLAjax.LLNode.getValue(node, 'dataid');
		}
	};

	Event.observe(window, 'load', LLAjax.pageLoadInit);


	return {
		"getScriptURL" : LLAjax.getScriptURL,
		"getAjaxResponse" : LLAjax.getAjaxResponse,
		"GetAttributesOfNode" : LLAjax.GetAttributesOfNode
	};
}();
