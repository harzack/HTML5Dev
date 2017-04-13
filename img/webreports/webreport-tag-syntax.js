// Tag definitions file used by WebReports online editor and online help

// Use setTags() to return the data structure with the tag definitions

// Global variables
var	activeTagType;			// each time we put something in the clipboard we set these as a refernce to it
var	activeTag;			// activeTagType is subTag, dataTag or controlTag, and activeTag is the index into the scructure

// Global variable declarations
tags = setTags();					// set the tags data structure defined in webreport-tag-syntax.js

function setControlTags(){

	var controlTags = {};

	var	controlTagName;

	// control tag definitions

	controlTagName = 'appearbottomoff';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_APPEARBOTTOMOFF /]";
	controlTags[controlTagName].helpref = "webreportappearbottomoff";
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = false;
	controlTags[controlTagName].row = false;
	controlTags[controlTagName].showineditor = true;
	
	controlTagName = 'appearleftoff';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_APPEARLEFTOFF /]";
	controlTags[controlTagName].helpref = "webreportappearleftoff";
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = false;
	controlTags[controlTagName].row = false;
	controlTags[controlTagName].showineditor = true;	
	
	controlTagName = 'appearrightoff';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_APPEARRIGHTOFF /]";
	controlTags[controlTagName].helpref = "webreportappearrightoff";
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = false;
	controlTags[controlTagName].row = false;
	controlTags[controlTagName].showineditor = true;		

	controlTagName = 'appeartopheaderoff';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_APPEARTOPHEADEROFF /]";
	controlTags[controlTagName].helpref = "webreportappeartopheaderoff";
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = false;
	controlTags[controlTagName].row = false;
	controlTags[controlTagName].showineditor = true;
	
	controlTagName = 'appeartopoff';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_APPEARTOPOFF /]";
	controlTags[controlTagName].helpref = "webreportappeartopoff";
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = false;
	controlTags[controlTagName].row = false;
	controlTags[controlTagName].showineditor = true;	

	controlTagName = 'call';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = '[LL_WEBREPORT_CALL NAME: PARM:arg1:argN /]';
	controlTags[controlTagName].helpref = 'call';
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = true;
	controlTags[controlTagName].row = true;
	controlTags[controlTagName].showineditor = true;
	
	controlTagName = 'endrow';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_ENDROW /]";		// the text that will be used in a drag and drop
	controlTags[controlTagName].helpref = "webreportendrow";		// refers to the name of the anchor tag in the help file
	controlTags[controlTagName].header = false;				// tag supported in header?
	controlTags[controlTagName].footer = false;				// tag supported in footer?
	controlTags[controlTagName].row = false;				// tag supported in row section?
	controlTags[controlTagName].showineditor = false;			// determines if the tag appears in the online editor

	controlTagName = 'endscript';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = '[LL_WEBREPORT_ENDSCRIPT /]';
	controlTags[controlTagName].helpref = 'startscript';
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = true;
	controlTags[controlTagName].row = true;
	controlTags[controlTagName].showineditor = true;
	
	// #0798 AS 2011.12.01
	controlTags['excludeadditem'] = {};
	controlTags['excludeadditem'].tag = "[LL_WEBREPORT_EXCLUDEADDITEM /]";
	controlTags['excludeadditem'].helpref = "webreportexcludeadditem";
	controlTags['excludeadditem'].header = true;
	controlTags['excludeadditem'].footer = false;
	controlTags['excludeadditem'].row = false;
	controlTags['excludeadditem'].showineditor = true;

	controlTags['excludechannel'] = {};
	controlTags['excludechannel'].tag = "[LL_WEBREPORT_EXCLUDECHANNEL /]";
	controlTags['excludechannel'].helpref = "webreportexcludechannel";
	controlTags['excludechannel'].header = true;
	controlTags['excludechannel'].footer = false;
	controlTags['excludechannel'].row = false;
	controlTags['excludechannel'].showineditor = true;
	
	controlTags['excludefooter'] = {};
	controlTags['excludefooter'].tag = "[LL_WEBREPORT_EXCLUDEFOOTER /]";
	controlTags['excludefooter'].helpref = "webreportexcludefooter";
	controlTags['excludefooter'].header = true;
	controlTags['excludefooter'].footer = false;
	controlTags['excludefooter'].row = false;
	controlTags['excludefooter'].showineditor = true;

	controlTags['excludeheader'] = {};
	controlTags['excludeheader'].tag = "[LL_WEBREPORT_EXCLUDEHEADER /]";
	controlTags['excludeheader'].helpref = "webreportexcludeheader";
	controlTags['excludeheader'].header = true;
	controlTags['excludeheader'].footer = false;
	controlTags['excludeheader'].row = false;
	controlTags['excludeheader'].showineditor = true;

	controlTags['excludehtml'] = {};
	controlTags['excludehtml'].tag = "[LL_WEBREPORT_EXCLUDEHTML /]";
	controlTags['excludehtml'].helpref = "webreportexcludehtml";
	controlTags['excludehtml'].header = true;
	controlTags['excludehtml'].footer = false;
	controlTags['excludehtml'].row = false;
	controlTags['excludehtml'].showineditor = true;	

	controlTagName = 'excludemenu';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_EXCLUDEMENU /]";
	controlTags[controlTagName].helpref = "webreportexcludemenu";
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = false;
	controlTags[controlTagName].row = false;
	controlTags[controlTagName].showineditor = true;
		
	// #0798 AS 2011.12.01
	controlTags['excludelocationdisplay'] = {};
	controlTags['excludelocationdisplay'].tag = "[LL_WEBREPORT_EXCLUDELOCATIONDISPLAY /]";
	controlTags['excludelocationdisplay'].helpref = "webreportexcludelocationdisplay";
	controlTags['excludelocationdisplay'].header = true;
	controlTags['excludelocationdisplay'].footer = false;
	controlTags['excludelocationdisplay'].row = false;
	controlTags['excludelocationdisplay'].showineditor = true;

	controlTags['excludesearch'] = {};
	controlTags['excludesearch'].tag = "[LL_WEBREPORT_EXCLUDESEARCH /]";
	controlTags['excludesearch'].helpref = "webreportexcludesearch";
	controlTags['excludesearch'].header = true;
	controlTags['excludesearch'].footer = false;
	controlTags['excludesearch'].row = false;
	controlTags['excludesearch'].showineditor = true;

	controlTagName = 'excludetitle';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_EXCLUDETITLE /]";
	controlTags[controlTagName].helpref = "webreportexcludetitle";
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = false;
	controlTags[controlTagName].row = false;
	controlTags[controlTagName].showineditor = true;	

	controlTags['exitif'] = {};
	controlTags['exitif'].tag = '[LL_WEBREPORT_EXITIF "" op "" /]';
	controlTags['exitif'].helpref = 'webreportexitif';
	controlTags['exitif'].header = false;
	controlTags['exitif'].footer = false;
	controlTags['exitif'].row = true;
	controlTags['exitif'].showineditor = true;

	controlTagName = 'forceutf8';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_FORCEUTF8 /]";
	controlTags[controlTagName].helpref = "webreport" + controlTagName;
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = false;
	controlTags[controlTagName].row = false;
	controlTags[controlTagName].showineditor = true; 

	controlTags['formparseoff'] = {};
	controlTags['formparseoff'].tag = '[LL_WEBREPORT_FORMPARSEOFF /]';
	controlTags['formparseoff'].helpref = 'webreportformparseoff';
	controlTags['formparseoff'].header = true;
	controlTags['formparseoff'].footer = true;
	controlTags['formparseoff'].row = false;
	controlTags['formparseoff'].showineditor = true;	
	
	controlTags['if'] = {};
	controlTags['if'].tag = '[LL_WEBREPORT_IF "" op "" /]\n\n[LL_WEBREPORT_ENDIF /]';
	controlTags['if'].helpref = 'webreportif';
	controlTags['if'].header = true;
	controlTags['if'].footer = true;
	controlTags['if'].row = true;
	controlTags['if'].showineditor = true;	   
    
	varname = 'if/else';
	controlTags[varname] = {};
	controlTags[varname].tag = '[LL_WEBREPORT_IF "" op "" /]\n\n[LL_WEBREPORT_ELSE /]\n\n[LL_WEBREPORT_ENDIF /]';
	controlTags[varname].helpref = 'webreportif';
	controlTags[varname].header = true;
	controlTags[varname].footer = true;
	controlTags[varname].row = true;
	controlTags[varname].showineditor = true;	

	controlTagName = 'includedistinct';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_INCLUDEDISTINCT /]";
	controlTags[controlTagName].helpref = "webreport" + controlTagName;
	controlTags[controlTagName].header = false;
	controlTags[controlTagName].footer = false;
	controlTags[controlTagName].row = true;
	controlTags[controlTagName].showineditor = true;  

	controlTags['includeif'] = {};
	controlTags['includeif'].tag = '[LL_WEBREPORT_INCLUDEIF "" op "" /]';
	controlTags['includeif'].helpref = 'webreportincludeif';
	controlTags['includeif'].header = false;
	controlTags['includeif'].footer = false;
	controlTags['includeif'].row = true;
	controlTags['includeif'].showineditor = true;	

	controlTagName = 'includerange';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_INCLUDERANGE /]";
	controlTags[controlTagName].helpref = "webreport" + controlTagName;
	controlTags[controlTagName].header = false;
	controlTags[controlTagName].footer = false;
	controlTags[controlTagName].row = true;
	controlTags[controlTagName].showineditor = true;       

	controlTags['insertjsarray'] = {};
	controlTags['insertjsarray'].tag = '[LL_WEBREPORT_INSERTJSARRAY /]';
	controlTags['insertjsarray'].helpref = 'webreportinsertjsarray';
	controlTags['insertjsarray'].header = false;
	controlTags['insertjsarray'].footer = false;
	controlTags['insertjsarray'].row = true;
	controlTags['insertjsarray'].showineditor = true;	
	
	controlTagName = 'insertjson';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_INSERTJSON /]";
	controlTags[controlTagName].helpref = "webreport" + controlTagName;
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = true;
	controlTags[controlTagName].row = true;
	controlTags[controlTagName].showineditor = true;   	
 
	controlTagName = 'jslibs';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = "[LL_WEBREPORT_JSLIBS /]";
	controlTags[controlTagName].helpref = "webreport" + controlTagName;
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = true;
	controlTags[controlTagName].row = false;
	controlTags[controlTagName].showineditor = true; 	
	
	controlTags['linecomment'] = {};
	controlTags['linecomment'].tag = '[\/\/';
	controlTags['linecomment'].helpref = 'webreportlinecomment';
	controlTags['linecomment'].header = true;
	controlTags['linecomment'].footer = true;
	controlTags['linecomment'].row = true;
	controlTags['linecomment'].showineditor = true;	

	controlTags['multilinecomment'] = {};
	controlTags['multilinecomment'].tag = '[\/\*\n\*\/]';
	controlTags['multilinecomment'].helpref = 'webreportmultilinecomment';
	controlTags['multilinecomment'].header = true;
	controlTags['multilinecomment'].footer = true;
	controlTags['multilinecomment'].row = true;
	controlTags['multilinecomment'].showineditor = true;
	
	controlTagName = 'runif';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = '[LL_WEBREPORT_RUNIF "" op "" /]';
	controlTags[controlTagName].helpref = 'webreportrunif';
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = false;
	controlTags[controlTagName].row = false;
	controlTags[controlTagName].showineditor = true;

	//*** This is an error with the design of the datastructure.  We cannot have an index to a JS array called "sort"
	//*** as it is a reserved word - the same is true of length
	controlTags['sortwr'] = {};
	controlTags['sortwr'].tag = '[LL_WEBREPORT_SORT "" /]';
	controlTags['sortwr'].helpref = 'webreportsort';
	controlTags['sortwr'].header = false;
	controlTags['sortwr'].footer = false;
	controlTags['sortwr'].row = true;
	controlTags['sortwr'].showineditor = true;	

	controlTags['startrow'] = {};
	controlTags['startrow'].tag = '[LL_WEBREPORT_STARTROW /]';
	controlTags['startrow'].helpref = 'webreportstartrow';
	controlTags['startrow'].header = false;
	controlTags['startrow'].footer = false;
	controlTags['startrow'].row = false;
	controlTags['startrow'].showineditor = false;	

	controlTagName = 'startscript';
	controlTags[controlTagName] = {};
	controlTags[controlTagName].tag = '[LL_WEBREPORT_STARTSCRIPT NAME: /]\nfunction String main(Dynamic c, List args)\n   String output\n\n   return output\nend\n[LL_WEBREPORT_ENDSCRIPT /]';
	controlTags[controlTagName].helpref = 'startscript';
	controlTags[controlTagName].header = true;
	controlTags[controlTagName].footer = true;
	controlTags[controlTagName].row = true;
	controlTags[controlTagName].showineditor = true;

	controlTags['subwebreport'] = {};
	controlTags['subwebreport'].tag = '[LL_WEBREPORT_SUBWEBREPORT NODEID:nnnn PARM:name:value /]';
	controlTags['subwebreport'].helpref = 'subwr';
	controlTags['subwebreport'].header = true;
	controlTags['subwebreport'].footer = true;
	controlTags['subwebreport'].row = true;
	controlTags['subwebreport'].showineditor = true;	

	controlTags['supresserrorlog'] = {};
	controlTags['supresserrorlog'].tag = '[LL_WEBREPORT_SUPPRESSERRORLOG /]';
	controlTags['supresserrorlog'].helpref = 'webreportsuppresserrorlog';
	controlTags['supresserrorlog'].header = true;
	controlTags['supresserrorlog'].footer = false;
	controlTags['supresserrorlog'].row = false;
	controlTags['supresserrorlog'].showineditor = true;	
	
	return controlTags;
}


function setDataTags(){

	var dataTags = {};
	var dataTagName = ''
	
	// data tag definitions
	dataTags['reptag'] = {};	
	dataTags['reptag'].tag = '[LL_REPTAG /]';
	dataTags['reptag'].helpref = 'reptagequals';
	dataTags['reptag'].header = true;
	dataTags['reptag'].footer = true;
	dataTags['reptag'].row = true;
	dataTags['reptag'].showineditor = true;	

	dataTags['reptagequals'] = {};	
	dataTags['reptagequals'].tag = '[LL_REPTAG= /]';
	dataTags['reptagequals'].helpref = 'reporttag';
	dataTags['reptagequals'].header = false;
	dataTags['reptagequals'].footer = false;
	dataTags['reptagequals'].row = true;
	dataTags['reptagequals'].showineditor = false;		
	
	dataTags['reptagunderscore'] = {};
	dataTags['reptagunderscore'].tag = '[LL_REPTAG_ /]';
	dataTags['reptagunderscore'].helpref = 'reporttagunderscore';
	dataTags['reptagunderscore'].header = false;
	dataTags['reptagunderscore'].footer = false;
	dataTags['reptagunderscore'].row = true;
	dataTags['reptagunderscore'].showineditor = false;
							
	// #2727 AS 2011.10.21
	dataTags['actualuserid'] = {};
	dataTags['actualuserid'].tag = '[LL_REPTAG_ACTUALUSERID /]';
	dataTags['actualuserid'].helpref = 'reporttagactualuserid';
	dataTags['actualuserid'].header = true;
	dataTags['actualuserid'].footer = true;
	dataTags['actualuserid'].row = false;
	dataTags['actualuserid'].showineditor = true;
														
	dataTags['actualrows'] = {};
	dataTags['actualrows'].tag = '[LL_REPTAG_ACTUALROWS /]';
	dataTags['actualrows'].helpref = 'reporttagactualrows';
	dataTags['actualrows'].header = true;
	dataTags['actualrows'].footer = true;
	dataTags['actualrows'].row = false;
	dataTags['actualrows'].showineditor = true;

	dataTags['average'] = {};
	dataTags['average'].tag = '[LL_REPTAG_@AVERAGE_col /]';
	dataTags['average'].helpref = 'reporttagaverage';
	dataTags['average'].header = true;
	dataTags['average'].footer = true;
	dataTags['average'].row = false;
	dataTags['average'].showineditor = true;
		
	dataTags['cellindex'] = {};
	dataTags['cellindex'].tag = '[LL_REPTAG_@DATA[]_col /]';
	dataTags['cellindex'].helpref = 'reporttagdata';	
	dataTags['cellindex'].header = true;
	dataTags['cellindex'].footer = true;
	dataTags['cellindex'].row = false;
	dataTags['cellindex'].showineditor = true;	
	
	dataTags['colname'] = {};
	dataTags['colname'].tag = '[LL_REPTAG_COLNAME /]';
	dataTags['colname'].helpref = 'reporttagcolname';
	dataTags['colname'].header = true;
	dataTags['colname'].footer = true;
	dataTags['colname'].row = true;
	dataTags['colname'].showineditor = true;

	dataTags['constant'] = {};
	dataTags['constant'].tag = '[LL_REPTAG_$ /]';
	dataTags['constant'].helpref = 'constname';
	dataTags['constant'].header = true;
	dataTags['constant'].footer = true;
	dataTags['constant'].row = true;
	dataTags['constant'].showineditor = true;
		
	dataTags['date'] = {};
	dataTags['date'].tag = '[LL_REPTAG_DATE /]';
	dataTags['date'].helpref = 'reporttagdate';
	dataTags['date'].header = true;
	dataTags['date'].footer = true;
	dataTags['date'].row = true;
	dataTags['date'].showineditor = true;
		
	dataTags['datetime'] = {};
	dataTags['datetime'].tag = '[LL_REPTAG_DATETIME /]';
	dataTags['datetime'].helpref = 'reporttagdatetime';
	dataTags['datetime'].header = true;
	dataTags['datetime'].footer = true;
	dataTags['datetime'].row = true;
	dataTags['datetime'].showineditor = true;
	
	dataTagName = 'enterprise';
	dataTags[dataTagName] = {};
	dataTags[dataTagName].tag = '[LL_REPTAG_ENTERPRISE /]';
	dataTags[dataTagName].helpref = 'reporttag' + dataTagName;
	dataTags[dataTagName].header = true;
	dataTags[dataTagName].footer = true;
	dataTags[dataTagName].row = true;
	dataTags[dataTagName].showineditor = false;	

	dataTags['function'] = {};
	dataTags['function'].tag = '[LL_REPTAG_@ /]';
	dataTags['function'].helpref = 'funcname';
	dataTags['function'].header = true;
	dataTags['function'].footer = true;
	dataTags['function'].row = false;
	dataTags['function'].showineditor = false;	

	varname = 'filteredrows';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_FILTEREDROWS /]';
	dataTags[varname].helpref = 'reporttag' + varname;
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = false;
	dataTags[varname].showineditor = true;	

	dataTags['indextotalhits'] = {};
	dataTags['indextotalhits'].tag = '[LL_REPTAG_INDEXTOTALHITS /]';
	dataTags['indextotalhits'].helpref = 'reporttagindextotalhits';
	dataTags['indextotalhits'].header = true;
	dataTags['indextotalhits'].footer = true;
	dataTags['indextotalhits'].row = true;
	dataTags['indextotalhits'].showineditor = true;

	// #1666 AS 2012.03.26
	dataTags['issubwebreport'] = {};
	dataTags['issubwebreport'].tag = '[LL_REPTAG_ISSUBWEBREPORT /]';
	dataTags['issubwebreport'].helpref = 'reporttagissubwebreport';
	dataTags['issubwebreport'].header = true;
	dataTags['issubwebreport'].footer = true;
	dataTags['issubwebreport'].row = true;
	dataTags['issubwebreport'].showineditor = true;

	dataTags['language'] = {};
	dataTags['language'].tag = '[LL_REPTAG_LANGUAGE /]';
	dataTags['language'].helpref = 'reporttaglanguage';
	dataTags['language'].header = true;
	dataTags['language'].footer = true;
	dataTags['language'].row = true;
	dataTags['language'].showineditor = true;

	varname = 'trigger';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_TRIGGER /]';
	dataTags[varname].helpref = 'llreptagtrigger';
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = true;
	dataTags[varname].showineditor = true;

	varname = 'triggerdestparentid';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_' + varname.toUpperCase() + ' /]';
	dataTags[varname].helpref = 'llreptag' + varname;
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = true;
	dataTags[varname].showineditor = true;	

	varname = 'triggerid';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_TRIGGERID /]';
	dataTags[varname].helpref = 'llreptagtriggerid';
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = true;
	dataTags[varname].showineditor = true;

	varname = 'triggernewid';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_TRIGGERNEWID /]';
	dataTags[varname].helpref = 'llreptagtriggernewid';
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = true;
	dataTags[varname].showineditor = true;	

	// #2663 AS 2012.11.19
	varname = 'triggernewname';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_TRIGGERNEWNAME /]';
	dataTags[varname].helpref = 'llreptagtriggernewname';
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = true;
	dataTags[varname].showineditor = true;	

	varname = 'triggeroldname';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_TRIGGEROLDNAME /]';
	dataTags[varname].helpref = 'llreptagtriggeroldname';
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = true;
	dataTags[varname].showineditor = true;	

	varname = 'triggersourceparentid';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_' + varname.toUpperCase() + ' /]';
	dataTags[varname].helpref = 'reporttag' + varname;
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = true;
	dataTags[varname].showineditor = true;	

	varname = 'language';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_LANGUAGE /]';
	dataTags[varname].helpref = 'reporttaglanguage';
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = true;
	dataTags[varname].showineditor = true;
		
	varname = 'libpath';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_LIBPATH /]';
	dataTags[varname].helpref = 'reporttag' + varname;
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = true;
	dataTags[varname].showineditor = true;

	dataTags['literal'] = {};
	dataTags['literal'].tag = '[LL_REPTAG_".." /]';
	dataTags['literal'].helpref = 'literalname';
	dataTags['literal'].header = true;
	dataTags['literal'].footer = true;
	dataTags['literal'].row = true;
	dataTags['literal'].showineditor = true;	

	dataTags['max'] = {};
	dataTags['max'].tag = '[LL_REPTAG_@MAX_col /]';
	dataTags['max'].helpref = 'funcname';	
	dataTags['max'].header = true;
	dataTags['max'].footer = true;
	dataTags['max'].row = false;
	dataTags['max'].showineditor = true;

	dataTags['min'] = {};
	dataTags['min'].tag = '[LL_REPTAG_@MIN_col /]';
	dataTags['min'].helpref = 'funcname';
	dataTags['min'].header = true;
	dataTags['min'].footer = true;
	dataTags['min'].row = false;
	dataTags['min'].showineditor = true;
	
	dataTags['mycacheurl'] = {};
	dataTags['mycacheurl'].tag = '[LL_REPTAG_MYCACHEURL /]';
	dataTags['mycacheurl'].helpref = 'reporttagmycacheurl';
	dataTags['mycacheurl'].header = true;
	dataTags['mycacheurl'].footer = true;
	dataTags['mycacheurl'].row = true;
	dataTags['mycacheurl'].showineditor = true;
	
	dataTags['myid'] = {};
	dataTags['myid'].tag = '[LL_REPTAG_MYID /]';
	dataTags['myid'].helpref = 'reporttagmyid';
	dataTags['myid'].header = true;
	dataTags['myid'].footer = true;
	dataTags['myid'].row = true;
	dataTags['myid'].showineditor = true;
	
	dataTags['myurl'] = {};
	dataTags['myurl'].tag = '[LL_REPTAG_MYURL /]';
	dataTags['myurl'].helpref = 'reporttagmyurl';
	dataTags['myurl'].header = true;
	dataTags['myurl'].footer = true;
	dataTags['myurl'].row = true;
	dataTags['myurl'].showineditor = true;
		
	dataTags['nexturl'] = {};
	dataTags['nexturl'].tag = '[LL_REPTAG_NEXTURL /]';
	dataTags['nexturl'].helpref = 'reporttagnexturl';
	dataTags['nexturl'].header = true;
	dataTags['nexturl'].footer = true;
	dataTags['nexturl'].row = true;
	dataTags['nexturl'].showineditor = true;

	dataTagName = 'origrownum';
	dataTags[dataTagName] = {};
	dataTags[dataTagName].tag = '[LL_REPTAG_ORIGROWNUM /]';
	dataTags[dataTagName].helpref = 'reporttag' + dataTagName;
	dataTags[dataTagName].header = false;
	dataTags[dataTagName].footer = false;
	dataTags[dataTagName].row = true;
	dataTags[dataTagName].showineditor = true;

	dataTagName = 'overrideobjid';
	dataTags[dataTagName] = {};
	dataTags[dataTagName].tag = '[LL_REPTAG_OVERRIDEOBJID /]';
	dataTags[dataTagName].helpref = 'reporttag' + dataTagName;
	dataTags[dataTagName].header = true;
	dataTags[dataTagName].footer = true;
	dataTags[dataTagName].row = true;
	dataTags[dataTagName].showineditor = true;
	
	dataTagName = 'ownerid';
	dataTags[dataTagName] = {};
	dataTags[dataTagName].tag = '[LL_REPTAG_OWNERID /]';
	dataTags[dataTagName].helpref = 'reporttag' + dataTagName;
	dataTags[dataTagName].header = true;
	dataTags[dataTagName].footer = true;
	dataTags[dataTagName].row = true;
	dataTags[dataTagName].showineditor = true;

	dataTagName = 'parentid';
	dataTags[dataTagName] = {};
	dataTags[dataTagName].tag = '[LL_REPTAG_PARENTID /]';
	dataTags[dataTagName].helpref = 'reporttag' + dataTagName;
	dataTags[dataTagName].header = true;
	dataTags[dataTagName].footer = true;
	dataTags[dataTagName].row = true;
	dataTags[dataTagName].showineditor = true;
	
	dataTagName = 'personal';
	dataTags[dataTagName] = {};
	dataTags[dataTagName].tag = '[LL_REPTAG_PERSONAL /]';
	dataTags[dataTagName].helpref = 'reporttag' + dataTagName;
	dataTags[dataTagName].header = true;
	dataTags[dataTagName].footer = true;
	dataTags[dataTagName].row = true;
	dataTags[dataTagName].showineditor = false;		
	
	dataTags['parameter'] = {};
	dataTags['parameter'].tag = '[LL_REPTAG_& /]';
	dataTags['parameter'].helpref = 'parmname';
	dataTags['parameter'].header = true;
	dataTags['parameter'].footer = true;
	dataTags['parameter'].row = true;
	dataTags['parameter'].showineditor = true;	
	
	varname = 'responsedata';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_@RESPONSEDATA.field /]';
	dataTags[varname].helpref = 'reporttag' + varname;
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = false;
	dataTags[varname].showineditor = true;
	
	// #1666 AS 2012.03.26
	dataTags['rktengineenabled'] = {};
	dataTags['rktengineenabled'].tag = '[LL_REPTAG_RKTENGINEENABLED /]';
	dataTags['rktengineenabled'].helpref = 'reporttagrktengineenabled';
	dataTags['rktengineenabled'].header = true;
	dataTags['rktengineenabled'].footer = true;
	dataTags['rktengineenabled'].row = true;
	dataTags['rktengineenabled'].showineditor = true;
	
	dataTags['rownum'] = {};
	dataTags['rownum'].tag = '[LL_REPTAG_ROWNUM /]';
	dataTags['rownum'].helpref = 'reporttagrownum';
	dataTags['rownum'].header = false;
	dataTags['rownum'].footer = false;
	dataTags['rownum'].row = true;
	dataTags['rownum'].showineditor = true;
	
	dataTags['sourceid'] = {};
	dataTags['sourceid'].tag = '[LL_REPTAG_SOURCEID /]';
	dataTags['sourceid'].helpref = 'reporttagsourceid';
	dataTags['sourceid'].header = true;
	dataTags['sourceid'].footer = true;
	dataTags['sourceid'].row = true;
	dataTags['sourceid'].showineditor = true;
	
	// #2999 AS 2012.02.03
	dataTags['sourceid'] = {};
	dataTags['sourceid'].tag = '[LL_REPTAG_SUBVERSION /]';
	dataTags['sourceid'].helpref = 'reporttagsubversion';
	dataTags['sourceid'].header = true;
	dataTags['sourceid'].footer = true;
	dataTags['sourceid'].row = true;
	dataTags['sourceid'].showineditor = true;	

	dataTags['sourcename'] = {};
	dataTags['sourcename'].tag = '[LL_REPTAG_SOURCENAME /]';
	dataTags['sourcename'].helpref = 'reporttagsourcename';
	dataTags['sourcename'].header = true;
	dataTags['sourcename'].footer = true;
	dataTags['sourcename'].row = true;
	dataTags['sourcename'].showineditor = true;
			
	dataTags['sourcerownum'] = {};
	dataTags['sourcerownum'].tag = '[LL_REPTAG_SOURCEROWNUM /]';
	dataTags['sourcerownum'].helpref = 'reporttagsourcerownum';
	dataTags['sourcerownum'].header = false;
	dataTags['sourcerownum'].footer = false;
	dataTags['sourcerownum'].row = true;
	dataTags['sourcerownum'].showineditor = true;

	varname = 'subversion';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_SUBVERSION /]';
	dataTags[varname].helpref = 'reporttag' + varname;
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = true;
	dataTags[varname].showineditor = true;

	dataTags['sum'] = {};
	dataTags['sum'].tag = '[LL_REPTAG_@SUM_col /]';
	dataTags['sum'].helpref = 'funcname';
	dataTags['sum'].header = true;
	dataTags['sum'].footer = true;
	dataTags['sum'].row = false;
	dataTags['sum'].showineditor = true;
	
	dataTags['supportdir'] = {};
	dataTags['supportdir'].tag = '[LL_REPTAG_SUPPORTDIR /]';
	dataTags['supportdir'].helpref = 'reporttagsupportdir';
	dataTags['supportdir'].header = true;
	dataTags['supportdir'].footer = true;
	dataTags['supportdir'].row = true;
	dataTags['supportdir'].showineditor = true;
	
	dataTagName = 'tools';
	dataTags[dataTagName] = {};
	dataTags[dataTagName].tag = '[LL_REPTAG_TOOLS /]';
	dataTags[dataTagName].helpref = 'reporttag' + dataTagName;
	dataTags[dataTagName].header = true;
	dataTags[dataTagName].footer = true;
	dataTags[dataTagName].row = true;
	dataTags[dataTagName].showineditor = false;		

	dataTags['totalrows'] = {};
	dataTags['totalrows'].tag = '[LL_REPTAG_TOTALROWS /]';
	dataTags['totalrows'].helpref = 'reporttagtotalrows';
	dataTags['totalrows'].header = true;
	dataTags['totalrows'].footer = true;
	dataTags['totalrows'].row = true;
	dataTags['totalrows'].showineditor = true;

	varname = 'totalsourcerows';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_TOTALSOURCEROWS /]';
	dataTags[varname].helpref = 'reporttagtotalsourcerows';
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = true;
	dataTags[varname].showineditor = true;	
	
	// #3829 JG 2012.12.11
	dataTags['urldomain'] = {};
	dataTags['urldomain'].tag = '[LL_REPTAG_URLDOMAIN /]';
	dataTags['urldomain'].helpref = 'reporttagurldomain';
	dataTags['urldomain'].header = true;
	dataTags['urldomain'].footer = true;
	dataTags['urldomain'].row = true;
	dataTags['urldomain'].showineditor = true;
	
	dataTags['urlprefix'] = {};
	dataTags['urlprefix'].tag = '[LL_REPTAG_URLPREFIX /]';
	dataTags['urlprefix'].helpref = 'reporttagurlprefix';
	dataTags['urlprefix'].header = true;
	dataTags['urlprefix'].footer = true;
	dataTags['urlprefix'].row = true;
	dataTags['urlprefix'].showineditor = true;
	
	// #3829 JG 2012.12.11
	dataTags['urlprefixfull'] = {};
	dataTags['urlprefixfull'].tag = '[LL_REPTAG_URLPREFIXFULL /]';
	dataTags['urlprefixfull'].helpref = 'reporttagurlprefixfull';
	dataTags['urlprefixfull'].header = true;
	dataTags['urlprefixfull'].footer = true;
	dataTags['urlprefixfull'].row = true;
	dataTags['urlprefixfull'].showineditor = true;
	
	// #3829 JG 2012.12.11
	dataTags['urlprotocol'] = {};
	dataTags['urlprotocol'].tag = '[LL_REPTAG_URLPROTOCOL /]';
	dataTags['urlprotocol'].helpref = 'reporttagurlprotocol';
	dataTags['urlprotocol'].header = true;
	dataTags['urlprotocol'].footer = true;
	dataTags['urlprotocol'].row = true;
	dataTags['urlprotocol'].showineditor = true;

	dataTags['userfullname'] = {};
	dataTags['userfullname'].tag = '[LL_REPTAG_USERFULLNAME /]';
	dataTags['userfullname'].helpref = 'reporttaguserfullname';
	dataTags['userfullname'].header = true;
	dataTags['userfullname'].footer = true;
	dataTags['userfullname'].row = true;
	dataTags['userfullname'].showineditor = true;
	
	dataTags['userid'] = {};
	dataTags['userid'].tag = '[LL_REPTAG_USERID /]';
	dataTags['userid'].helpref = 'reporttaguserid';
	dataTags['userid'].header = true;
	dataTags['userid'].footer = true;
	dataTags['userid'].row = true;
	dataTags['userid'].showineditor = true;		
	
	dataTags['username'] = {};
	dataTags['username'].tag = '[LL_REPTAG_USERNAME /]';
	dataTags['username'].helpref = 'reporttagusername';
	dataTags['username'].header = true;
	dataTags['username'].footer = true;
	dataTags['username'].row = true;
	dataTags['username'].showineditor = true;

	dataTags['variable'] = {};
	dataTags['variable'].tag = '[LL_REPTAG_% /]';
	dataTags['variable'].helpref = 'varname';
	dataTags['variable'].header = true;
	dataTags['variable'].footer = true;
	dataTags['variable'].row = true;
	dataTags['variable'].showineditor = true;
							  	  
	varname = 'webdavauth';
	dataTags[varname] = {};
	dataTags[varname].tag = '[LL_REPTAG_WEBDAVAUTH /]';
	dataTags[varname].helpref = 'reporttag' + varname;
	dataTags[varname].header = true;
	dataTags[varname].footer = true;
	dataTags[varname].row = true;
	dataTags[varname].showineditor = true;
	
	dataTags['webdavdir'] = {};
	dataTags['webdavdir'].tag = '[LL_REPTAG_WEBDAVDIR /]';
	dataTags['webdavdir'].helpref = 'reporttagwebdavdir';
	dataTags['webdavdir'].header = true;
	dataTags['webdavdir'].footer = true;
	dataTags['webdavdir'].row = true;
	dataTags['webdavdir'].showineditor = true;
		
	dataTags['webreportname'] = {};
	dataTags['webreportname'].tag = '[LL_REPTAG_WEBREPORTNAME /]';
	dataTags['webreportname'].helpref = 'reporttagreportname';
	dataTags['webreportname'].header = true;
	dataTags['webreportname'].footer = true;
	dataTags['webreportname'].row = true;
	dataTags['webreportname'].showineditor = true;
		
	return dataTags;
}


function setSubTags(){

	var subTags = {};

	// subtag definitions
	subTags['a2utf8'] = {};
	subTags['a2utf8'].tag = 'A2UTF8';
	subTags['a2utf8'].helpref = 'a2utf8';
	subTags['a2utf8'].header = true;
	subTags['a2utf8'].footer = true;
	subTags['a2utf8'].row = true;
	subTags['a2utf8'].showineditor = true;
	
	// #2520 AS 2011.12.23
	subTags['abs'] = {};
	subTags['abs'].tag = 'ABS';
	subTags['abs'].helpref = 'abs';
	subTags['abs'].header = true;
	subTags['abs'].footer = true;
	subTags['abs'].row = true;
	subTags['abs'].showineditor = true;
	
	// #3126 AS 2012.03.21
	subTags['add'] = {};
	subTags['add'].tag = 'ADD';
	subTags['add'].helpref = 'add';
	subTags['add'].header = true;
	subTags['add'].footer = true;
	subTags['add'].row = true;
	subTags['add'].showineditor = true;
	
	subTags['addvar'] = {};
	subTags['addvar'].tag = 'ADDVAR:';
	subTags['addvar'].helpref = 'addvar';
	subTags['addvar'].header = true;
	subTags['addvar'].footer = true;
	subTags['addvar'].row = true;
	subTags['addvar'].showineditor = true;
	
	subTags['assoc'] = {};
	subTags['assoc'].tag = 'ASSOC:';
	subTags['assoc'].helpref = 'subtagassoc';
	subTags['assoc'].header = true;
	subTags['assoc'].footer = true;
	subTags['assoc'].row = true;
	subTags['assoc'].showineditor = true;

	varname = 'auditaction';
	subTags[varname] = {};
	subTags[varname].tag = 'AUDITACTION:';
	subTags[varname].helpref = 'auditaction';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	varname = 'auditinfo';
	subTags[varname] = {};
	subTags[varname].tag = 'AUDITINFO:';
	subTags[varname].helpref = 'auditinfo';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['auditinfo'] = 'AUDITINFO:';
	subTags[varname]['options']['actualuser'] = 'AUDITINFO:ACTUALUSER ';
	subTags[varname]['options']['auditdate'] = 'AUDITINFO:AUDITDATE ';
	subTags[varname]['options']['auditid'] = 'AUDITINFO:AUDITID ';
	subTags[varname]['options']['auditstr'] = 'AUDITINFO:AUDITSTR ';
	subTags[varname]['options']['eventid'] = 'AUDITINFO:EVENTID ';
	subTags[varname]['options']['keystr'] = 'AUDITINFO:KEYSTR:<key> ';
	subTags[varname]['options']['performerid'] = 'AUDITINFO:PERFORMERID ';
	subTags[varname]['options']['subtype'] = 'AUDITINFO:SUBTYPE ';
	subTags[varname]['options']['userid'] = 'AUDITINFO:USERID ';
	subTags[varname]['options']['value1'] = 'AUDITINFO:VALUE1 ';
	subTags[varname]['options']['value2'] = 'AUDITINFO:VALUE2 ';
	subTags[varname]['options']['valuekey'] = 'AUDITINFO:VALUEKEY ';
	subTags[varname]['options']['valuestr'] = 'AUDITINFO:VALUESTR ';

	varname = 'bitcheck';
	subTags[varname] = {};
	subTags[varname].tag = 'BITCHECK';
	subTags[varname].helpref = 'bitcheck';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	subTags['capitalize'] = {};
	subTags['capitalize'].tag = 'CAPITALIZE';
	subTags['capitalize'].helpref = 'subtagcapitalize';
	subTags['capitalize'].header = true;
	subTags['capitalize'].footer = true;
	subTags['capitalize'].row = true;
	subTags['capitalize'].showineditor = true;
	
	subTags['cat'] = {};
	subTags['cat'].tag = 'CAT:';
	subTags['cat'].helpref = 'subtagcat';
	subTags['cat'].header = true;
	subTags['cat'].footer = true;
	subTags['cat'].row = true;
	subTags['cat'].showineditor = true;
	subTags['cat']['options'] = {};
	subTags['cat']['options']['cat'] = 'CAT ';
	subTags['cat']['options']['cat:'] = 'CAT: ';
	subTags['cat']['options']['cat:jsarray'] = 'CAT:JSARRAY ';
	subTags['cat']['options']['cat:raw'] = 'CAT:RAW ';	
	subTags['cat']['options']['cat:display'] = 'CAT:DISPLAY ';
	subTags['cat']['options']['cat:mand'] = 'CAT:MAND ';
	subTags['cat']['options']['cat:catname'] = 'CAT:<catname> ';
	subTags['cat']['options']['cat:catname:display'] = 'CAT:<catname>:DISPLAY ';
	subTags['cat']['options']['cat:catname:id'] = 'CAT:<catname>:ID ';
	subTags['cat']['options']['cat:catname:attname'] = 'CAT:<catname>:<attname> ';
	subTags['cat']['options']['cat:catname:attname:display'] = 'CAT:<catname>:<attname>:DISPLAY ';
	subTags['cat']['options']['cat:catname:attname:id'] = 'CAT:<catname>:<attname>:ID ';
	subTags['cat']['options']['cat:catname:attname:attval'] = 'CAT:<catname>:<attname>:<attval> ';
	subTags['cat']['options']['cat:catname:mv:attname:count'] = 'CAT:<catname>:MV:<attname>:COUNT ';
	subTags['cat']['options']['cat:catname:mv:attname:n'] = 'CAT:<catname>:MV:<attname>:<n> ';
	subTags['cat']['options']['cat:catname:mv:attname:n:attval'] = 'CAT:<catname>:MV:<attname>:<n>:<attval> ';
	subTags['cat']['options']['cat:catname:mv:attname:n:display'] = 'CAT:<catname>:MV:<attname>:<n>:DISPLAY ';
	subTags['cat']['options']['cat:catname:mv:attname:index:attval'] = 'CAT:<catname>:MV:<attname>:INDEX:<attval> ';
	subTags['cat']['options']['cat:catname:set:setname:attname'] = 'CAT:<catname>:SET:<setname>:<attname> ';
	subTags['cat']['options']['cat:catname:set:setname:attname:display'] = 'CAT:<catname>:SET:<setname>:<attname>:DISPLAY ';
	subTags['cat']['options']['cat:catname:set:setname:attname:id'] = 'CAT:<catname>:SET:<setname>:<attname>:ID ';
	subTags['cat']['options']['cat:catname:set:setname:attname:attval'] = 'CAT:<catname>:SET:<setname>:<attname>:<attval> ';
	subTags['cat']['options']['cat:catname:set:setname:mv:attname:count'] = 'CAT:<catname>:SET:<setname>:MV:<attname>:COUNT ';
	subTags['cat']['options']['cat:catname:set:setname:mv:attname:n'] = 'CAT:<catname>:SET:<setname>:MV:<attname>:<n> ';
	subTags['cat']['options']['cat:catname:set:setname:mv:attname:n:attval'] = 'CAT:<catname>:SET:<setname>:MV:<attname>:<n>:<attval> ';
	subTags['cat']['options']['cat:catname:set:setname:mv:attname:n:display'] = 'CAT:<catname>:SET:<setname>:MV:<attname>:<n>:DISPLAY ';
	subTags['cat']['options']['cat:catname:set:setname:mv:attname:index:attval'] = 'CAT:<catname>:SET:<setname>:MV:<attname>:INDEX:<attval> ';
	subTags['cat']['options']['cat:catname:mvset:setname:n:attname'] = 'CAT:<catname>:MVSET:<setname>:<n>:<attname> ';
	subTags['cat']['options']['cat:catname:mvset:setname:n:attname:display'] = 'CAT:<catname>:MVSET:<setname>:<n>:<attname>:DISPLAY ';
	subTags['cat']['options']['cat:catname:mvset:setname:n:attname:id'] = 'CAT:<catname>:MVSET:<setname>:<n>:<attname>:ID  ';
	subTags['cat']['options']['cat:catname:mvset:setname:n:attname:attval'] = 'CAT:<catname>:MVSET:<setname>:<n>:<attname>:<attval> ';
	subTags['cat']['options']['cat:catname:mvset:setname:n:mv:attname:count'] = 'CAT:<catname>:MVSET:<setname>:<n>:MV:<attname>:COUNT ';
	subTags['cat']['options']['cat:catname:mvset:setname:n:mv:attname:m'] = 'CAT:<catname>:MVSET:<setname>:<n>:MV:<attname>:<m> ';
	subTags['cat']['options']['cat:catname:mvset:setname:n:mv:attname:m:display'] = 'CAT:<catname>:MVSET:<setname>:<n>:MV:<attname>:<m>:DISPLAY ';
	subTags['cat']['options']['cat:catname:mvset:setname:n:mv:attname:m:attval'] = 'CAT:<catname>:MVSET:<setname>:<n>:MV:<attname>:<m>:<attval> ';
	subTags['cat']['options']['cat:catname:mvset:setname:n:mv:attname:index:attval'] = 'CAT:<catname>:MVSET:<setname>:<n>:MV:<attname>:INDEX:<attval> ';

	subTags['cataction'] = {};
	subTags['cataction'].tag = 'CATACTION:';
	subTags['cataction'].helpref = 'cataction';
	subTags['cataction'].header = true;
	subTags['cataction'].footer = true;
	subTags['cataction'].row = true;
	subTags['cataction'].showineditor = true;
	subTags['cataction']['options'] = {};
	subTags['cataction']['options']['cataction'] = 'CATACTION:';
	subTags['cataction']['options']['setvalue'] = 'CATACTION:SETVALUE:<category>:<attribute>:<value>';
	subTags['cataction']['options']['addvalue'] = 'CATACTION:ADDVALUE:<category>:<attribute>:<value>';	
	subTags['cataction']['options']['insertvalue'] = 'CATACTION:INSERTVALUE:<category>:<attribute>';
	subTags['cataction']['options']['removevalue'] = 'CATACTION:REMOVEVALUE:<category>:<attribute>';
	subTags['cataction']['options']['clearvalue'] = 'CATACTION:CLEARVALUE:<category>:<attribute>';
	subTags['cataction']['options']['add'] = 'CATACTION:ADD:<category>';	
	subTags['cataction']['options']['remove'] = 'CATACTION:REMOVE:<category>';	
	subTags['cataction']['options']['upgrade'] = 'CATACTION:UPGRADE:<category>';

	// #3263 AS 2012.05.08
	subTags['cataction']['options']['getvalue'] = 'CATACTION:GETVALUE:<category>:<attribute>';	
	subTags['cataction']['options']['serialize'] = 'CATACTION:SERIALIZE:<category>:<attribute>';
	
	// #3198 AS 2012.04.17
	subTags['catinfo'] = {};
	subTags['catinfo'].tag = 'CATINFO:';
	subTags['catinfo'].helpref = 'catinfo';
	subTags['catinfo'].header = true;
	subTags['catinfo'].footer = true;
	subTags['catinfo'].row = true;
	subTags['catinfo'].showineditor = true;
	subTags['catinfo']['options'] = {};
	subTags['catinfo']['options']['validvalues'] = 'CATINFO:VALIDVALUES:<attribute ID>';

	varname = 'collapse';
	subTags[varname] = {};
	subTags[varname].tag = varname.toUpperCase();
	subTags[varname].helpref = 'subtag' + varname;
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
		
	subTags['compress'] = {};
	subTags['compress'].tag = 'COMPRESS';
	subTags['compress'].helpref = 'subtagcompress';
	subTags['compress'].header = true;
	subTags['compress'].footer = true;
	subTags['compress'].row = true;
	subTags['compress'].showineditor = true;
	
	subTags['concatvar'] = {};
	subTags['concatvar'].tag = 'CONCATVAR:';
	subTags['concatvar'].helpref = 'concatvar';
	subTags['concatvar'].header = true;
	subTags['concatvar'].footer = true;
	subTags['concatvar'].row = true;
	subTags['concatvar'].showineditor = true;
	
	varname = 'currentval';
	subTags[varname] = {};
	subTags[varname].tag = varname.toUpperCase();
	subTags[varname].helpref = 'currentval';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
		
	subTags['date'] = {};
	subTags['date'].tag = 'DATE';
	subTags['date'].helpref = 'subtagdate';
	subTags['date'].header = true;
	subTags['date'].footer = true;
	subTags['date'].row = true;
	subTags['date'].showineditor = true;
	subTags['date']['options'] = {};
	subTags['date']['options']['input'] = 'DATE:INPUT ';
	subTags['date']['options']['short'] = 'DATE:SHORT ';
	subTags['date']['options']['long'] = 'DATE:LONG ';	
	subTags['date']['options']['%%'] = '%%';
	subTags['date']['options']['%a'] = '%a';
	subTags['date']['options']['%b'] = '%b';
	subTags['date']['options']['%d'] = '%d';
	subTags['date']['options']['%j'] = '%j';
	subTags['date']['options']['%m'] = '%m';
	subTags['date']['options']['%p'] = '%p';
	subTags['date']['options']['%w'] = '%w';
	subTags['date']['options']['%y'] = '%y';
	subTags['date']['options']['%A'] = '%A';
	subTags['date']['options']['%B'] = '%B';
	subTags['date']['options']['%H'] = '%H';
	subTags['date']['options']['%I'] = '%I';
	subTags['date']['options']['%M'] = '%M';
	subTags['date']['options']['%P'] = '%P';	
	subTags['date']['options']['%S'] = '%S';
	subTags['date']['options']['%Y'] = '%Y';
		
	// #3336 AS 2012.07.05
	varname = 'datedec';
	subTags[varname] = {};
	subTags[varname].tag = 'DATEDEC:';
	subTags[varname].helpref = 'subtagdatedec';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	

	varname = 'datediff';
	subTags[varname] = {};
	subTags[varname].tag = 'DATEDIFF:';
	subTags[varname].helpref = 'datediff';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
		
	varname = 'dateinc';
	subTags[varname] = {};
	subTags[varname].tag = 'DATEINC:';
	subTags[varname].helpref = 'subtagdateinc';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	
	varname = 'dec'
	subTags[varname] = {};
	subTags[varname].tag = varname.toUpperCase() +':?';
	subTags[varname].helpref = 'subtag' + varname;
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	subTags['decode'] = {};
	subTags['decode'].tag = 'DECODE:';
	subTags['decode'].helpref = 'subtagdecode';
	subTags['decode'].header = true;
	subTags['decode'].footer = true;
	subTags['decode'].row = true;
	subTags['decode'].showineditor = true;

	subTags['decstr'] = {};
	subTags['decstr'].tag = 'DECSTR:BASE64 ';
	subTags['decstr'].helpref = 'subtagdecstr';
	subTags['decstr'].header = true;
	subTags['decstr'].footer = true;
	subTags['decstr'].row = true;
	subTags['decstr'].showineditor = true;

	subTags['def'] = {};
	subTags['def'].tag = 'DEF:';
	subTags['def'].helpref = 'subtagdef';
	subTags['def'].header = true;
	subTags['def'].footer = true;
	subTags['def'].row = true;
	subTags['def'].showineditor = true;

	subTags['divide'] = {};
	subTags['divide'].tag = 'DIVIDE:';
	subTags['divide'].helpref = 'subtagdivide';
	subTags['divide'].header = true;
	subTags['divide'].footer = true;
	subTags['divide'].row = true;
	subTags['divide'].showineditor = true;
	
	subTags['dmembership'] = {};
	subTags['dmembership'].tag = 'DMEMBERSHIP';
	subTags['dmembership'].helpref = 'subtagdmembership';
	subTags['dmembership'].header = true;
	subTags['dmembership'].footer = true;
	subTags['dmembership'].row = true;
	subTags['dmembership'].showineditor = true;	
	
	subTags['emailinfo'] = {};
	subTags['emailinfo'].tag = 'EMAILINFO:';
	subTags['emailinfo'].helpref = 'subtagemailinfo';
	subTags['emailinfo'].header = true;
	subTags['emailinfo'].footer = true;
	subTags['emailinfo'].row = true;
	subTags['emailinfo'].showineditor = true;
	subTags['emailinfo']['options'] = {};
	subTags['emailinfo']['options']['attachment'] = "EMAILINFO:ATTACHMENT ";
	subTags['emailinfo']['options']['bcc'] = "EMAILINFO:BCC ";
	subTags['emailinfo']['options']['cc'] = "EMAILINFO:CC ";
	subTags['emailinfo']['options']['from'] = "EMAILINFO:FROM ";
	subTags['emailinfo']['options']['onbehalf'] = "EMAILINFO:ONBEHALF ";
	subTags['emailinfo']['options']['recdate'] = "EMAILINFO:RECDATE ";
	subTags['emailinfo']['options']['sentdate'] = "EMAILINFO:SENTDATE ";
	subTags['emailinfo']['options']['to'] = "EMAILINFO:TO ";
	
	subTags['encstr'] = {};
	subTags['encstr'].tag = 'ENCSTR:BASE64 ';
	subTags['encstr'].helpref = 'subtagencstr';
	subTags['encstr'].header = true;
	subTags['encstr'].footer = true;
	subTags['encstr'].row = true;
	subTags['encstr'].showineditor = true;	

	varname = 'escapecsv'
	subTags[varname] = {};
	subTags[varname].tag = varname.toUpperCase() + ':';
	subTags[varname].helpref = 'subtag' + varname;
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	subTags['escapehtml'] = {};
	subTags['escapehtml'].tag = 'ESCAPEHTML';
	subTags['escapehtml'].helpref = 'subtagescapehtml';
	subTags['escapehtml'].header = true;
	subTags['escapehtml'].footer = true;
	subTags['escapehtml'].row = true;
	subTags['escapehtml'].showineditor = true;
	
	subTags['escapestr'] = {};
	subTags['escapestr'].tag = 'ESCAPESTR';
	subTags['escapestr'].helpref = 'subtagescapestr';
	subTags['escapestr'].header = true;
	subTags['escapestr'].footer = true;
	subTags['escapestr'].row = true;
	subTags['escapestr'].showineditor = true;	
	
	subTags['escapeurl'] = {};
	subTags['escapeurl'].tag = 'ESCAPEURL';
	subTags['escapeurl'].helpref = 'subtagescapeurl';
	subTags['escapeurl'].header = true;
	subTags['escapeurl'].footer = true;
	subTags['escapeurl'].row = true;
	subTags['escapeurl'].showineditor = true;
	 
	varname = 'escapewr'
	subTags[varname] = {};
	subTags[varname].tag = varname.toUpperCase();
	subTags[varname].helpref = 'subtag' + varname;
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	varname = 'escapexml'
	subTags[varname] = {};
	subTags[varname].tag = varname.toUpperCase();
	subTags[varname].helpref = 'subtag' + varname;
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	subTags['even'] = {};
	subTags['even'].tag = 'EVEN';
	subTags['even'].helpref = 'subtageven';
	subTags['even'].header = true;
	subTags['even'].footer = true;
	subTags['even'].row = true;
	subTags['even'].showineditor = true;
		
	// #3087 AS 2012.03.21
	subTags['fetchurl'] = {};
	subTags['fetchurl'].tag = 'FETCHURL';
	subTags['fetchurl'].helpref = 'FETCHURL';
	subTags['fetchurl'].header = true;
	subTags['fetchurl'].footer = true;
	subTags['fetchurl'].row = true;
	subTags['fetchurl'].showineditor = true;
	
	varname = 'getcvid'
	subTags[varname] = {};
	subTags[varname].tag = 'GETCVID';
	subTags[varname].helpref = 'getcvid';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;

	varname = 'gettext'
	subTags[varname] = {};
	subTags[varname].tag = 'GETTEXT';
	subTags[varname].helpref = 'gettext';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;

	subTags['hide'] = {};
	subTags['hide'].tag = 'HIDE';
	subTags['hide'].helpref = 'hide';
	subTags['hide'].header = true;
	subTags['hide'].footer = true;
	subTags['hide'].row = true;
	subTags['hide'].showineditor = true;
	
	subTags['htmlcr'] = {};
	subTags['htmlcr'].tag = 'HTMLCR';
	subTags['htmlcr'].helpref = 'subtaghtmlcr';
	subTags['htmlcr'].header = true;
	subTags['htmlcr'].footer = true;
	subTags['htmlcr'].row = true;
	subTags['htmlcr'].showineditor = true;
	
	subTags['imembership'] = {};
	subTags['imembership'].tag = 'IMEMBERSHIP';
	subTags['imembership'].helpref = 'subtagimembership';
	subTags['imembership'].header = true;
	subTags['imembership'].footer = true;
	subTags['imembership'].row = true;
	subTags['imembership'].showineditor = true;	
	
	varname = 'inc'
	subTags[varname] = {};
	subTags[varname].tag = varname.toUpperCase()  +':?';
	subTags[varname].helpref = 'subtag' + varname;
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	// #3277 AS 2012.05.11
	subTags['ismoduleinstalled'] = {};
	subTags['ismoduleinstalled'].tag = 'ISMODULEINSTALLED';
	subTags['ismoduleinstalled'].helpref = 'ismoduleinstalled';
	subTags['ismoduleinstalled'].header = true;
	subTags['ismoduleinstalled'].footer = true;
	subTags['ismoduleinstalled'].row = true;
	subTags['ismoduleinstalled'].showineditor = true;	
	
	//*** This is an error with the design of the datastructure.  We cannot have an index to a JS array called "length"
	//*** as it is a reserved word - the same is true of sort
	subTags['len'] = {};
	subTags['len'].tag = 'LENGTH';
	subTags['len'].helpref = 'subtaglength';
	subTags['len'].header = true;
	subTags['len'].footer = true;
	subTags['len'].row = true;
	subTags['len'].showineditor = true;
	
	subTags['list'] = {};
	subTags['list'].tag = 'LIST:';
	subTags['list'].helpref = 'subtaglist';
	subTags['list'].header = true;
	subTags['list'].footer = true;
	subTags['list'].row = true;
	subTags['list'].showineditor = true;

	varname = 'llurl';	
	subTags[varname] = {};
	subTags[varname].tag = 'LLURL:';
	subTags[varname].helpref = 'subtagllurl';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['additem'] = "LLURL:ADDITEM ";
	subTags[varname]['options']['additem:raw'] = "LLURL:ADDITEM:ITEMMENU:RAW ";
	subTags[varname]['options']['browse'] = "LLURL:BROWSE ";
	subTags[varname]['options']['defaultlink'] = "LLURL:DEFAULTLINK ";
	
	// #2732 AS 2013.02.14
	subTags[varname]['options']['defaulthref'] = "LLURL:DEFAULTHREF ";	
	
	subTags[varname]['options']['download'] = "LLURL:DOWNLOAD ";
	subTags[varname]['options']['dropdownlist'] = "LLURL:DROPDOWNLIST ";
	subTags[varname]['options']['featured'] = "LLURL:FEATURED ";
	subTags[varname]['options']['fetch'] = "LLURL:FETCH ";
	subTags[varname]['options']['formadd'] = "LLURL:FORMADD ";
	subTags[varname]['options']['formdelete'] = "LLURL:FORMDELETE ";
	subTags[varname]['options']['formedit'] = "LLURL:FORMEDIT ";
	subTags[varname]['options']['functionmenu'] = "LLURL:FUNCTIONMENU ";
	subTags[varname]['options']['functionmenu:raw'] = "LLURL:FUNCTIONMENU:RAW ";
	subTags[varname]['options']['gif'] = "LLURL:GIF ";
	subTags[varname]['options']['gif:large'] = "LLURL:GIF:LARGE ";
	subTags[varname]['options']['gif:xlarge'] = "LLURL:GIF:XLARGE ";
	subTags[varname]['options']['hyperlinktrail'] = "LLURL:HYPERLINKTRAIL ";
	subTags[varname]['options']['info'] = "LLURL:INFO ";
	subTags[varname]['options']['modified'] = "LLURL:MODIFIED ";
	subTags[varname]['options']['open'] = "LLURL:OPEN ";

	// #2890 AS 2012.01.09
	subTags[varname]['options']['overview'] = "LLURL:OVERVIEW ";

	subTags[varname]['options']['promoted'] = "LLURL:PROMOTED ";
	subTags[varname]['options']['rendition'] = "LLURL:RENDITION:<type> ";
	subTags[varname]['options']['report'] = "LLURL:REPORT ";
	subTags[varname]['options']['shortlink'] = "LLURL:SHORTLINK ";
	subTags[varname]['options']['sidebar'] = "LLURL:SIDEBAR ";
	subTags[varname]['options']['sidebar:raw'] = "LLURL:SIDEBAR:RAW ";
	subTags[varname]['options']['sidebar:forceall'] = "LLURL:SIDEBAR:FORCEALL ";
	subTags[varname]['options']['subtypefilter'] = "LLURL:SUBTYPEFILTER ";
	subTags[varname]['options']['upalevel'] = "LLURL:UPALEVEL ";
	
	// #3782 AS 2012.11.19
	subTags[varname]['options']['view'] = "LLURL:VIEW ";
	
	subTags[varname]['options']['webdav:long'] = "LLURL:WEBDAV:LONG ";
	subTags[varname]['options']['webdav:name'] = "LLURL:WEBDAV:NAME ";
	subTags[varname]['options']['webdav:short'] = "LLURL:WEBDAV:SHORT ";
	subTags[varname]['options']['wfdefaultlink'] = "LLURL:WFDEFAULTLINK ";
	subTags[varname]['options']['wffunctionmenu'] = "LLURL:WFFUNCTIONMENU ";
	
	subTags['lower'] = {};
	subTags['lower'].tag = 'LOWER';
	subTags['lower'].helpref = 'subtaglower';
	subTags['lower'].header = true;
	subTags['lower'].footer = true;
	subTags['lower'].row = true;
	subTags['lower'].showineditor = true;

	subTags['lpad'] = {};
	subTags['lpad'].tag = 'LPAD:';
	subTags['lpad'].helpref = 'subtaglpad';
	subTags['lpad'].header = true;
	subTags['lpad'].footer = true;
	subTags['lpad'].row = true;
	subTags['lpad'].showineditor = true;

	varname = 'modulus';
	subTags[varname] = {};
	subTags[varname].tag = 'MODULUS:';
	subTags[varname].helpref = 'subtagmodulus';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;

	varname = 'multiply';
	subTags[varname] = {};
	subTags[varname].tag = 'MULTIPLY:';
	subTags[varname].helpref = 'subtagmultiply';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	varname = 'next';
	subTags[varname] = {};
	subTags[varname].tag = 'NEXT';
	subTags[varname].helpref = 'subtagnext';
	subTags[varname].header = false;
	subTags[varname].footer = false;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	varname = 'nodeaction';
	subTags[varname] = {};
	subTags[varname].tag = 'NODEACTION:';
	subTags[varname].helpref = 'subtagnodeaction';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['addvertext'] = "NODEACTION:ADDVER:TEXT:<text string> ";
	subTags[varname]['options']['addver'] = "NODEACTION:ADDVER:<document> ";
	subTags[varname]['options']['addverinheritattrssource'] = "NODEACTION:ADDVER:<document>:INHERITATTRS:SOURCE ";
	
	// #3343 AS 2012.07.11
	subTags[varname]['options']['classificationadd'] = "NODEACTION:CLASSIFICATION:ADD:<classification ID> ";
	subTags[varname]['options']['classificationremove'] = "NODEACTION:CLASSIFICATION:REMOVE:<classification ID> ";
	
	subTags[varname]['options']['copi'] = "NODEACTION:COPY:<container> ";
	subTags[varname]['options']['copi'] = "NODEACTION:COPY:<container> ";
	subTags[varname]['options']['copicurrent'] = "NODEACTION:COPY:<container>:CURRENT ";
	subTags[varname]['options']['copiinheritattrsdest'] = "NODEACTION:COPY:<container>:INHERITATTRS:DESTINATION ";
	subTags[varname]['options']['copiinheritattrsmerged'] = "NODEACTION:COPY:<container>:INHERITATTRS:MERGED ";
	subTags[varname]['options']['copiinheritattrssource'] = "NODEACTION:COPY:<container>:INHERITATTRS:SOURCE ";
	subTags[varname]['options']['copiinheritperms'] = "NODEACTION:COPY:<container>:INHERITPERMS ";
	subTags[varname]['options']['copiinheritrmoff'] = "NODEACTION:COPY:<container>:INHERITRMOFF ";	
	subTags[varname]['options']['copiname'] = "NODEACTION:COPY:<container>:NEWNAME:<name> ";

	// #3075 AS 2012.03.08
	subTags[varname]['options']['nochildren'] = "NODEACTION:COPY:<container>:NOCHILDREN ";

	subTags[varname]['options']['copiunique'] = "NODEACTION:COPY:<container>:UNIQUEONLY ";
	subTags[varname]['options']['createdoc'] = "NODEACTION:CREATE:DOC:<container>:<name> ";
	subTags[varname]['options']['createfolder'] = "NODEACTION:CREATE:FOLDER:<container>:<name> ";
	subTags[varname]['options']['creategeneration'] = "NODEACTION:CREATE:GENERATION:<container>:<name> ";

	// #2834 AS 2011.12.13
	subTags[varname]['options']['createrelease'] = "NODEACTION:CREATE:RELEASE ";
	subTags[varname]['options']['createrevision'] = "NODEACTION:CREATE:REVISION ";

	subTags[varname]['options']['createshortcut'] = "NODEACTION:CREATE:SHORTCUT:<container>:<name> ";
	subTags[varname]['options']['createurl'] = "NODEACTION:CREATE:URL:<container>:<name> ";
	subTags[varname]['options']['delete'] = "NODEACTION:DELETE ";
	subTags[varname]['options']['displaylist'] = "NODEACTION:DISPLAY:LIST ";
	subTags[varname]['options']['displayfeatured'] = "NODEACTION:DISPLAY:FEATURED ";
	subTags[varname]['options']['displayhidden'] = "NODEACTION:DISPLAY:HIDDEN ";
	subTags[varname]['options']['lock'] = "NODEACTION:LOCK:<version number> ";
	subTags[varname]['options']['maxvers'] = "NODEACTION:MAXVERS:<versions> ";
	subTags[varname]['options']['move'] = "NODEACTION:MOVE:<container> ";
	subTags[varname]['options']['moveinhattsdest'] = "NODEACTION:MOVE:<container>:INHERITATTRS:DESTINATION ";
	subTags[varname]['options']['moveinhattsmerged'] = "NODEACTION:MOVE:<container>:INHERITATTRS:MERGED ";
	subTags[varname]['options']['moveinhattssource'] = "NODEACTION:MOVE:<container>:INHERITATTRS:SOURCE ";
	subTags[varname]['options']['moveinhperms'] = "NODEACTION:MOVE:<container>:INHERITPERMS ";
	subTags[varname]['options']['moveinhrmoff'] = "NODEACTION:MOVE:<container>:INHERITRMOFF ";	
	subTags[varname]['options']['movename'] = "NODEACTION:MOVE:<container>:NEWNAME:<name> ";
	subTags[varname]['options']['moveunique'] = "NODEACTION:MOVE:<container>:UNIQUEONLY ";
	subTags[varname]['options']['moveprovider'] = "NODEACTION:MOVEPROVIDER:<provider name>:<version number> ";
	subTags[varname]['options']['nickname'] = "NODEACTION:NICKNAME:<new nickname> ";
	subTags[varname]['options']['ownedby'] = "NODEACTION:OWNEDBY ";
	subTags[varname]['options']['ownedbynewid'] = "NODEACTION:OWNEDBY:<newid> ";

	// #3077 AS 2012.03.12
	subTags[varname]['options']['permcopy'] = "NODEACTION:PERMCOPY:<source nodeID> ";
	
	subTags[varname]['options']['promote'] = "NODEACTION:PROMOTE ";
	subTags[varname]['options']['purgeversionskeep'] = "NODEACTION:PURGEVERSIONS:KEEP:<versions to keep> ";
	subTags[varname]['options']['purgeversionsremove'] = "NODEACTION:PURGEVERSIONS:REMOVE:<versions to remove> ";
	subTags[varname]['options']['purgeversions'] = "NODEACTION:PURGEVERSIONS:<version number> ";
	subTags[varname]['options']['rename'] = "NODEACTION:RENAME:<new name> ";
	
	// #3290 AS 2012.06.29
	subTags[varname]['options']['renamenamelanguage'] = "NODEACTION:RENAME:<new name>:<language> ";
	subTags[varname]['options']['renameuserlang'] = "NODEACTION:RENAME:<new name>:USERLANG ";
	subTags[varname]['options']['renamename1language1'] = "NODEACTION:RENAME:<new name1>:<language1>:<new name2>:<language2> ";
	
	subTags[varname]['options']['rendition'] = "NODEACTION:RENDITION:<type> ";
	subTags[varname]['options']['reserve'] = "NODEACTION:RESERVE ";
	subTags[varname]['options']['reserveuser'] = "NODEACTION:RESERVE:<userid> ";

	// #2900 AS 2012.01.09
	subTags[varname]['options']['restore'] = "NODEACTION:RESTORE ";
	subTags[varname]['options']['restorename'] = "NODEACTION:RESTORE:<name> ";
	subTags[varname]['options']['restorenamedestination'] = "NODEACTION:RESTORE:<name>:<destination> ";

	subTags[varname]['options']['unlock'] = "NODEACTION:UNLOCK:<version number> ";
	subTags[varname]['options']['unreserve'] = "NODEACTION:UNRESERVE ";	
	subTags[varname]['options']['updatedescription'] = "NODEACTION:UPDATE:DESCRIPTION:<new description> ";

	// #2824 AS 2011.12.09
	subTags[varname]['options']['updatetaskstatus'] = "NODEACTION:UPDATE:TASKSTATUS:<new status> ";

	// #2725 AS 2011.11.28
	subTags[varname]['options']['versioncontrolstandard'] = "NODEACTION:VERSIONCONTROL:STANDARD ";	
	subTags[varname]['options']['versioncontroladvanced'] = "NODEACTION:VERSIONCONTROL:ADVANCED ";	
	
	subTags['nodeinfo'] = {};
	subTags['nodeinfo'].tag = 'NODEINFO:';
	subTags['nodeinfo'].helpref = 'subtagnodeinfo';
	subTags['nodeinfo'].header = true;
	subTags['nodeinfo'].footer = true;
	subTags['nodeinfo'].row = true;
	subTags['nodeinfo'].showineditor = true;
	subTags['nodeinfo']['options'] = {};
	subTags['nodeinfo']['options']['assignedto'] = "NODEINFO:ASSIGNEDTO ";
	subTags['nodeinfo']['options']['catalog'] = "NODEINFO:CATALOG ";
	subTags['nodeinfo']['options']['childcount'] = "NODEINFO:CHILDCOUNT ";
	subTags['nodeinfo']['options']['classification'] = "NODEINFO:CLASSIFICATION ";
	subTags['nodeinfo']['options']['comment'] = "NODEINFO:COMMENT ";
	subTags['nodeinfo']['options']['createdby'] = "NODEINFO:CREATEDBY ";
	subTags['nodeinfo']['options']['createdate'] = "NODEINFO:CREATEDATE ";
	subTags['nodeinfo']['options']['dateassigned'] = "NODEINFO:DATEASSIGNED ";
	subTags['nodeinfo']['options']['datecompleted'] = "NODEINFO:DATECOMPLETED ";
	subTags['nodeinfo']['options']['datedue'] = "NODEINFO:DATEDUE ";
	subTags['nodeinfo']['options']['datestarted'] = "NODEINFO:DATESTARTED ";
	subTags['nodeinfo']['options']['depth'] = "NODEINFO:DEPTH ";
	subTags['nodeinfo']['options']['extendeddata'] = "NODEINFO:EXTENDEDDATA ";
	subTags['nodeinfo']['options']['groupid'] = "NODEINFO:GROUPID ";
	subTags['nodeinfo']['options']['id'] = "NODEINFO:ID ";
	subTags['nodeinfo']['options']['json'] = "NODEINFO:JSON ";
	subTags['nodeinfo']['options']['location'] = "NODEINFO:LOCATION ";
	subTags['nodeinfo']['options']['maxversion'] = "NODEINFO:MAXVERSION ";
	subTags['nodeinfo']['options']['modifydate'] = "NODEINFO:MODIFYDATE ";
	subTags['nodeinfo']['options']['name'] = "NODEINFO:NAME ";
	subTags['nodeinfo']['options']['nickname'] = "NODEINFO:NICKNAME ";
	subTags['nodeinfo']['options']['origid'] = "NODEINFO:ORIGID ";
	subTags['nodeinfo']['options']['parentid'] = "NODEINFO:PARENTID ";
	subTags['nodeinfo']['options']['path'] = "NODEINFO:PATH ";
	subTags['nodeinfo']['options']['priority'] = "NODEINFO:PRIORITY ";
	subTags['nodeinfo']['options']['reserved'] = "NODEINFO:RESERVED ";
	subTags['nodeinfo']['options']['reservedby'] = "NODEINFO:RESERVEDBY ";
	subTags['nodeinfo']['options']['reserveddate'] = "NODEINFO:RESERVEDDATE ";
	subTags['nodeinfo']['options']['size'] = "NODEINFO:SIZE ";
	subTags['nodeinfo']['options']['status'] = "NODEINFO:STATUS ";
	subTags['nodeinfo']['options']['subname'] = "NODEINFO:SUBNAME ";
	subTags['nodeinfo']['options']['subtype'] = "NODEINFO:SUBTYPE ";
	subTags['nodeinfo']['options']['userid'] = "NODEINFO:USERID ";
	subTags['nodeinfo']['options']['versioncontrol'] = "NODEINFO:VERSIONCONTROL ";
	subTags['nodeinfo']['options']['versionnum'] = "NODEINFO:VERSIONNUM ";
	subTags['nodeinfo']['options']['volumeid'] = "NODEINFO:VOLUMEID ";	
	
	subTags['odd'] = {};
	subTags['odd'].tag = 'ODD';
	subTags['odd'].helpref = 'subtagodd';
	subTags['odd'].header = true;
	subTags['odd'].footer = true;
	subTags['odd'].row = true;
	subTags['odd'].showineditor = true;
	
	subTags['oddeven'] = {};
	subTags['oddeven'].tag = 'ODDEVEN';
	subTags['oddeven'].helpref = 'subtagoddeven';
	subTags['oddeven'].header = true;
	subTags['oddeven'].footer = true;
	subTags['oddeven'].row = true;
	subTags['oddeven'].showineditor = true;

	varname = 'onerror'
	subTags['onerror'] = {};
	subTags['onerror'].tag = varname.toUpperCase() +':';
	subTags['onerror'].helpref = 'subtag' + varname;
	subTags['onerror'].header = true;
	subTags['onerror'].footer = true;
	subTags['onerror'].row = true;
	subTags['onerror'].showineditor = true;
	subTags['onerror']['options'] = {};
	subTags['onerror']['options']['blank'] = "ONERROR:BLANK ";
	subTags['onerror']['options']['short'] = "ONERROR:SHORT ";
	subTags['onerror']['options']['long'] = "ONERROR:LONG ";
	subTags['onerror']['options']['custom'] = "ONERROR:CUSTOM:<error message> ";



	subTags['patchange'] = {};
	subTags['patchange'].tag = 'PATCHANGE:';
	subTags['patchange'].helpref = 'subtagpatchange';
	subTags['patchange'].header = true;
	subTags['patchange'].footer = true;
	subTags['patchange'].row = true;
	subTags['patchange'].showineditor = true;


	subTags['patfind'] = {};
	subTags['patfind'].tag = 'PATFIND:';
	subTags['patfind'].helpref = 'subtagpatfind';
	subTags['patfind'].header = true;
	subTags['patfind'].footer = true;
	subTags['patfind'].row = true;
	subTags['patfind'].showineditor = true;
	
	varname = 'permaction';
	subTags[varname] = {};
	subTags[varname].tag = 'PERMACTION:';
	subTags[varname].helpref = 'subtagpermaction';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['acladd'] = "PERMACTION:ACL:<userID>:ADD:<perms> ";
	subTags[varname]['options']['aclremove'] = "PERMACTION:ACL:<userID>:REMOVE ";
	subTags[varname]['options']['aclupdate'] = "PERMACTION:ACL:<userID>:UPDATE:<perms> ";
	subTags[varname]['options']['ownupdate'] = "PERMACTION:OWNER:UPDATE:<perms> ";
	subTags[varname]['options']['ownchange'] = "PERMACTION:OWNER:CHANGE:<userID>:<perms> ";
	subTags[varname]['options']['ownremove'] = "PERMACTION:OWNER:REMOVE ";
	subTags[varname]['options']['ownrestore'] = "PERMACTION:OWNER:RESTORE:<userID>:<perms> ";
	subTags[varname]['options']['groupupdate'] = "PERMACTION:OWNERGROUP:UPDATE:<perms> ";
	subTags[varname]['options']['groupchange'] = "PERMACTION:OWNERGROUP:CHANGE:<userID>:<perms> ";
	subTags[varname]['options']['groupremove'] = "PERMACTION:OWNERGROUP:REMOVE ";
	subTags[varname]['options']['grouprestore'] = "PERMACTION:OWNERGROUP:RESTORE:<userID>:<perms> ";
	subTags[varname]['options']['pubupdate'] = "PERMACTION:PUBLIC:UPDATE:<perms> ";
	subTags[varname]['options']['pubremove'] = "PERMACTION:PUBLIC:REMOVE ";
	subTags[varname]['options']['pubrestore'] = "PERMACTION:PUBLIC:RESTORE:<perms> ";
	subTags[varname]['options']['roleupdate'] = "PERMACTION:<role>:UPDATE:<userID> ";
	subTags[varname]['options']['roleremove'] = "PERMACTION:<role>:REMOVE:<userID> ";
	subTags[varname]['options']['roleremoveall'] = "PERMACTION:<role>:REMOVE ";	

	subTags['permcheck'] = {};
	subTags['permcheck'].tag = 'PERMCHECK:';
	subTags['permcheck'].helpref = 'subtagpermcheck';
	subTags['permcheck'].header = true;
	subTags['permcheck'].footer = true;
	subTags['permcheck'].row = true;
	subTags['permcheck'].showineditor = true;
	subTags['permcheck']['options'] = {};
	subTags['permcheck']['options']['see'] = "PERMCHECK:SEE ";
	subTags['permcheck']['options']['seecontents'] = "PERMCHECK:SEECONTENTS ";
	subTags['permcheck']['options']['edit'] = "PERMCHECK:EDIT ";
	subTags['permcheck']['options']['delete'] = "PERMCHECK:DELETE ";
	// #3196 AS 2012.04.18
	subTags['permcheck']['options']['modify'] = "PERMCHECK:MODIFY ";
	subTags['permcheck']['options']['editattributes'] = "PERMCHECK:EDITATTRIBUTES ";
	subTags['permcheck']['options']['reserve'] = "PERMCHECK:RESERVE ";
	subTags['permcheck']['options']['deleteversions'] = "PERMCHECK:DELETEVERSIONS ";
	subTags['permcheck']['options']['editpermissions'] = "PERMCHECK:EDITPERMISSIONS ";

	// #3079 AS 2012.03.09
	subTags['perminfo'] = {};
	subTags['perminfo'].tag = 'PERMINFO:';
	subTags['perminfo'].helpref = 'subtagperminfo';
	subTags['perminfo'].header = true;
	subTags['perminfo'].footer = true;
	subTags['perminfo'].row = true;
	subTags['perminfo'].showineditor = true;
	subTags['perminfo']['options'] = {};
	subTags['perminfo']['options']['blank'] = 'PERMINFO ';
	subTags['perminfo']['options']['owner'] = 'PERMINFO:OWNER ';
	subTags['perminfo']['options']['ownergroup'] = 'PERMINFO:OWNERGROUP ';
	subTags['perminfo']['options']['publicaccess'] = 'PERMINFO:PUBLICACCESS ';
	subTags['perminfo']['options']['assignedaccess'] = 'PERMINFO:ASSIGNEDACCESS ';

	varname = 'pocopy';
	subTags[varname] = {};
	subTags[varname].tag = 'POCOPY:';
	subTags[varname].helpref = 'subtagpocopy';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	subTags[varname]['options'] = {};
	subTags[varname]['options']['uniqueid'] = "POCOPY:UNIQUEID ";
	subTags[varname]['options']['location'] = "POCOPY:LOCATION ";
	subTags[varname]['options']['borrowedby'] = "POCOPY:BORROWEDBY ";
	subTags[varname]['options']['obtainedby'] = "POCOPY:OBTAINEDBY ";
	subTags[varname]['options']['comment'] = "POCOPY:COMMENT ";
	subTags[varname]['options']['borroweddate'] = "POCOPY:BORROWEDDATE ";
	subTags[varname]['options']['returndate'] = "POCOPY:RETURNDATE ";
	subTags[varname]['options']['boxid'] = "POCOPY:BOXID ";
		
	varname = 'poinfo';
	subTags[varname] = {};
	subTags[varname].tag = 'POINFO:';
	subTags[varname].helpref = 'subtagpoinfo';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	subTags[varname]['options'] = {};
	subTags[varname]['options']['itemtype'] = "POINFO:ITEMTYPE ";
	subTags[varname]['options']['homeloc'] = "POINFO:HOMELOC ";
	subTags[varname]['options']['keywords'] = "POINFO:KEYWORDS ";
	subTags[varname]['options']['from'] = "POINFO:FROM ";
	subTags[varname]['options']['to'] = "POINFO:TO ";
	subTags[varname]['options']['loctype'] = "POINFO:LOCTYPE ";
	subTags[varname]['options']['refrate'] = "POINFO:REFRATE ";
	subTags[varname]['options']['offsiteid'] = "POINFO:OFFSITEID ";
	subTags[varname]['options']['facility'] = "POINFO:FACILITY ";
	subTags[varname]['options']['area'] = "POINFO:AREA ";
	subTags[varname]['options']['locator'] = "POINFO:LOCATOR ";
	subTags[varname]['options']['txid'] = "POINFO:TXID ";
	subTags[varname]['options']['client'] = "POINFO:CLIENT ";
	subTags[varname]['options']['tempid'] = "POINFO:TEMPID ";
	
	subTags['prev'] = {};
	subTags['prev'].tag = 'PREV';
	subTags['prev'].helpref = 'subtagprev';
	subTags['prev'].header = false;
	subTags['prev'].footer = false;
	subTags['prev'].row = true;
	subTags['prev'].showineditor = true;

	subTags['range'] = {};
	subTags['range'].tag = 'RANGE:';
	subTags['range'].helpref = 'subtagrange';
	subTags['range'].header = true;
	subTags['range'].footer = true;
	subTags['range'].row = true;
	subTags['range'].showineditor = true;

	varname = 'recarray';
	subTags[varname] = {};
	subTags[varname].tag = 'RECARRAY:';
	subTags[varname].helpref = 'subtagrecarray';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	varname = 'record';
	subTags[varname] = {};
	subTags[varname].tag = 'RECORD:';
	subTags[varname].helpref = 'subtagrecord';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	// #3228 AS 2012.05.14
	subTags['redirect'] = {};
	subTags['redirect'].tag = 'REDIRECT';
	subTags['redirect'].helpref = 'subtagredirect';
	subTags['redirect'].header = true;
	subTags['redirect'].footer = true;
	subTags['redirect'].row = true;
	subTags['redirect'].showineditor = true;	
	
	varname = 'replace';
	subTags[varname] = {};
	subTags[varname].tag = 'REPLACE:';
	subTags[varname].helpref = 'subtagreplace';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	varname = 'rmaction';
	subTags[varname] = {};
	subTags[varname].tag = 'RMACTION:';
	subTags[varname].helpref = 'subtagrmaction';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	subTags[varname]['options'] = {};
	subTags[varname]['options']['recordofficer'] = "RMACTION:RECORDOFFICER: ";
	subTags[varname]['options']['recorddate'] = "RMACTION:RECORDDATE: ";
	subTags[varname]['options']['recordtype'] = "RMACTION:RECORDTYPE: ";
	subTags[varname]['options']['status'] = "RMACTION:STATUS: ";
	subTags[varname]['options']['statusdate'] = "RMACTION:STATUSDATE: ";
	subTags[varname]['options']['receiveddate'] = "RMACTION:RECEIVEDDATE: ";
	subTags[varname]['options']['essential'] = "RMACTION:ESSENTIAL: ";	
	subTags[varname]['options']['official'] = "RMACTION:OFFICIAL: ";
	subTags[varname]['options']['storagemedium'] = "RMACTION:STORAGEMEDIUM: ";
	subTags[varname]['options']['accession'] = "RMACTION:ACCESSION: ";
	subTags[varname]['options']['subject'] = "RMACTION:SUBJECT: ";
	subTags[varname]['options']['recordsmanagergroup'] = "RMACTION:RECORDSMANAGERGROUP: ";
	subTags[varname]['options']['author'] = "RMACTION:AUTHOR: ";	
	subTags[varname]['options']['addressee'] = "RMACTION:ADDRESSEE: ";
	subTags[varname]['options']['otheraddressee'] = "RMACTION:OTHERADDRESSEE: ";	
	subTags[varname]['options']['originationorg'] = "RMACTION:ORIGINATIONORG: ";
	subTags[varname]['options']['updatecycle'] = "RMACTION:UPDATECYCLE: ";
	subTags[varname]['options']['nextreviewdate'] = "RMACTION:NEXTREVIEWDATE: ";	
	subTags[varname]['options']['lastreviewdate'] = "RMACTION:LASTREVIEWDATE: ";
	
	varname = 'rmclass';
	subTags[varname] = {};
	subTags[varname].tag = 'RMCLASS:';
	subTags[varname].helpref = 'subtagrmclass';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	subTags[varname]['options'] = {};
	subTags[varname]['options']['filenumber'] = "RMCLASS:FILENUMBER ";
	subTags[varname]['options']['creationdate'] = "RMCLASS:CREATIONDATE ";
	subTags[varname]['options']['status'] = "RMCLASS:STATUS ";
	subTags[varname]['options']['statusdate'] = "RMCLASS:STATUSDATE ";	
	subTags[varname]['options']['essential'] = "RMCLASS:ESSENTIAL ";
	subTags[varname]['options']['storagemedium'] = "RMCLASS:STORAGEMEDIUM ";
	subTags[varname]['options']['disposauth'] = "RMCLASS:DISPOSITIONAUTH ";
	subTags[varname]['options']['updatecycle'] = "RMCLASS:UPDATECYCLE ";
	subTags[varname]['options']['closed'] = "RMCLASS:CLOSED ";
	subTags[varname]['options']['rsi'] = "RMCLASS:RSI ";
	subTags[varname]['options']['subject'] = "RMCLASS:SUBJECT ";
	subTags[varname]['options']['keywords'] = "RMCLASS:KEYWORDS ";
	subTags[varname]['options']['lastadddate'] = "RMCLASS:LASTADDDATE ";
	subTags[varname]['options']['selectable'] = "RMCLASS:SELECTABLE ";
	
	// #2960 AS 2012.03.29
	varname = 'rmholdaction';
	subTags[varname] = {};
	subTags[varname].tag = 'RMHOLDACTION:';
	subTags[varname].helpref = 'subtagrmholdaction';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	subTags[varname]['options'] = {};
	subTags[varname]['options']['apply'] = "RMHOLDACTION:APPLY:<Hold ID or Name> ";
	subTags[varname]['options']['remove'] = "RMHOLDACTION:REMOVE:<Hold ID or Name> ";
	subTags[varname]['options']['createhold'] = "RMHOLDACTION:CREATE:HOLD:<parms> ";
	subTags[varname]['options']['createtype'] = "RMHOLDACTION:CREATE:TYPE:<parms> ";
	
	// #3095 AS 2012.03.26
	varname = 'rmholdinfo';
	subTags[varname] = {};
	subTags[varname].tag = 'RMHOLDINFO:';
	subTags[varname].helpref = 'subtagrmholdinfo';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	subTags[varname]['options'] = {};
	subTags[varname]['options']['all'] = "RMHOLDINFO:ALL ";
	subTags[varname]['options']['direct'] = "RMHOLDINFO:DIRECT ";
	
	varname = 'rminfo';
	subTags[varname] = {};
	subTags[varname].tag = 'RMINFO:';
	subTags[varname].helpref = 'subtagrminfo';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	subTags[varname]['options'] = {};
	subTags[varname]['options']['recordofficer'] = "RMINFO:RECORDOFFICER ";
	subTags[varname]['options']['recorddate'] = "RMINFO:RECORDDATE ";
	subTags[varname]['options']['recordtype'] = "RMINFO:RECORDTYPE ";
	subTags[varname]['options']['status'] = "RMINFO:STATUS ";
	subTags[varname]['options']['statusdate'] = "RMINFO:STATUSDATE ";
	subTags[varname]['options']['receiveddate'] = "RMINFO:RECEIVEDDATE ";
	subTags[varname]['options']['essential'] = "RMINFO:ESSENTIAL ";	
	subTags[varname]['options']['official'] = "RMINFO:OFFICIAL ";
	subTags[varname]['options']['storagemedium'] = "RMINFO:STORAGEMEDIUM ";
	subTags[varname]['options']['accession'] = "RMINFO:ACCESSION ";
	subTags[varname]['options']['subject'] = "RMINFO:SUBJECT ";
	subTags[varname]['options']['recordsmanagergroup'] = "RMINFO:RECORDSMANAGERGROUP ";
	subTags[varname]['options']['author'] = "RMINFO:AUTHOR ";	
	subTags[varname]['options']['addressee'] = "RMINFO:ADDRESSEE ";
	subTags[varname]['options']['otheraddressee'] = "RMINFO:OTHERADDRESSEE ";	
	subTags[varname]['options']['originationorg'] = "RMINFO:ORIGINATIONORG ";
	subTags[varname]['options']['updatecycle'] = "RMINFO:UPDATECYCLE ";
	subTags[varname]['options']['nextreviewdate'] = "RMINFO:NEXTREVIEWDATE ";	
	subTags[varname]['options']['lastreviewdate'] = "RMINFO:LASTREVIEWDATE ";
	subTags[varname]['options']['classid'] = "RMINFO:CLASSID ";
	subTags[varname]['options']['rmclassification'] = "RMINFO:RMCLASSIFICATION ";	
	subTags[varname]['options']['rsi'] = "RMINFO:RSI ";
	subTags[varname]['options']['filenumber'] = "RMINFO:FILENUMBER ";

	varname = 'rmtype';
	subTags[varname] = {};
	subTags[varname].tag = 'RMTYPE:';
	subTags[varname].helpref = 'subtagrmtype';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	subTags[varname]['options'] = {};
	subTags[varname]['options']['rsi'] = "RMTYPE:RSI ";
	subTags[varname]['options']['defaulttype'] = "RMTYPE:DEFAULTTYPE ";

	varname = 'round';
	subTags[varname] = {};
	subTags[varname].tag = 'ROUND:';
	subTags[varname].helpref = 'subtaground';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	

	varname = 'rpad';
	subTags[varname] = {};
	subTags[varname].tag = 'RPAD:';
	subTags[varname].helpref = 'subtagrpad';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	varname = 'rsi';
	subTags[varname] = {};
	subTags[varname].tag = 'RSI:';
	subTags[varname].helpref = 'subtagrsi';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	subTags[varname]['options'] = {};
	subTags[varname]['options']['rsi'] = "RSI:RSI ";
	subTags[varname]['options']['title'] = "RSI:TITLE ";
	subTags[varname]['options']['description'] = "RSI:DESCRIPTION ";
	subTags[varname]['options']['subject'] = "RSI:SUBJECT ";
	subTags[varname]['options']['status'] = "RSI:STATUS ";
	subTags[varname]['options']['statusdate'] = "RSI:STATUSDATE ";
	subTags[varname]['options']['discontinue'] = "RSI:DISCONTINUE ";
	subTags[varname]['options']['discontinuedate'] = "RSI:DISCONTINUEDATE ";
	subTags[varname]['options']['discontinuecomment'] = "RSI:DISCONTINUECOMMENT ";
	subTags[varname]['options']['url'] = "RSI:URL ";

	// #2761 AS 2012.01.20
	varname = 'scaction';
	subTags[varname] = {};
	subTags[varname].tag = 'SCACTION:';
	subTags[varname].helpref = 'subtagscaction';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	subTags[varname]['options'] = {};
	subTags[varname]['options']['currentsecurity'] = "SCACTION:CURRENTSECURITY:<value> ";
	subTags[varname]['options']['supplementalmarkingsaddvalue'] = "SCACTION:SUPPLEMENTALMARKINGS:ADD:<value> ";
	subTags[varname]['options']['supplementalmarkingsremove'] = "SCACTION:SUPPLEMENTALMARKINGS:REMOVE ";
	subTags[varname]['options']['supplementalmarkingsremovevalue'] = "SCACTION:SUPPLEMENTALMARKINGS:REMOVE:<value> ";

	// #2752 AS 2012.01.18
	varname = 'scinfo';
	subTags[varname] = {};
	subTags[varname].tag = 'SCINFO:';
	subTags[varname].helpref = 'subtagscinfo';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	subTags[varname]['options'] = {};
	subTags[varname]['options']['currentsecuritylevel'] = "SCINFO:CURRENTSECURITY:LEVEL ";
	subTags[varname]['options']['currentsecurityname'] = "SCINFO:CURRENTSECURITY:NAME ";
	subTags[varname]['options']['supplementalmarkings'] = "SCINFO:SUPPLEMENTALMARKINGS ";

	// #2930 JG 2012.01.17
	varname = 'securetoken';
	subTags[varname] = {};
	subTags[varname].tag = 'SECURETOKEN';
	subTags[varname].helpref = 'securetoken';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	// #2094 AS 2012.01.13
	varname = 'separate';
	subTags[varname] = {};
	subTags[varname].tag = 'SEPARATE:<separator>';
	subTags[varname].helpref = 'separate';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	varname = 'setemailattach';
	subTags[varname] = {};
	subTags[varname].tag = 'SETEMAILATTACH';
	subTags[varname].helpref = 'setemailattach';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;

	varname = 'setform';
	subTags[varname] = {};
	subTags[varname].tag = 'SETFORM:';
	subTags[varname].helpref = 'setform';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	// #1850 AS 2012.01.31
	subTags[varname]['options'] = {};
	subTags[varname]['options']['field'] = "SETFORM:<fieldname> ";
	subTags[varname]['options']['MVfield'] = "SETFORM:<fieldname>:<rownum> ";
	subTags[varname]['options']['Setfield'] = "SETFORM:<setname>:<setnum>:<fieldname> ";
	subTags[varname]['options']['SetMVfield'] = "SETFORM:<setname>:<setnum>:<fieldname>:<rownum> ";
		
	varname = 'setvar';
	subTags[varname] = {};
	subTags[varname].tag = 'SETVAR:';
	subTags[varname].helpref = 'setvar';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;

	varname = 'setwfattach';
	subTags[varname] = {};
	subTags[varname].tag = 'SETWFATTACH:';
	subTags[varname].helpref = 'setwfattach';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['copi'] = "SETWFATTACH:COPY ";
	subTags[varname]['options']['copycurrent'] = "SETWFATTACH:COPY:CURRENT ";
	subTags[varname]['options']['copyinheritattrsdestination'] = "SETWFATTACH:COPY:INHERITATTRS:DESTINATION ";
	subTags[varname]['options']['copyinheritattrsmerged'] = "SETWFATTACH:COPY:INHERITATTRS:MERGED ";
	subTags[varname]['options']['copyinheritattrssource'] = "SETWFATTACH:COPY:INHERITATTRS:SOURCE ";
	subTags[varname]['options']['copyinheritperms'] = "SETWFATTACH:COPY:INHERITPERMS ";
	subTags[varname]['options']['copyname'] = "SETWFATTACH:COPY:NEWNAME:<name> ";
	subTags[varname]['options']['copyunique'] = "SETWFATTACH:COPY:UNIQUEONLY ";
	subTags[varname]['options']['mov'] = "SETWFATTACH:MOVE ";
	subTags[varname]['options']['moveinheritattrsdestination'] = "SETWFATTACH:MOVE:INHERITATTRS:DESTINATION ";
	subTags[varname]['options']['moveinheritattrsmerged'] = "SETWFATTACH:MOVE:INHERITATTRS:MERGED ";
	subTags[varname]['options']['moveinheritattrssource'] = "SETWFATTACH:MOVE:INHERITATTRS:SOURCE ";
	subTags[varname]['options']['moveinheritperms'] = "SETWFATTACH:MOVE:INHERITPERMS ";
	subTags[varname]['options']['movename'] = "SETWFATTACH:MOVE:NEWNAME:<name> ";
	subTags[varname]['options']['moveunique'] = "SETWFATTACH:MOVE:UNIQUEONLY ";

	varname = 'setwfattr';
	subTags[varname] = {};
	subTags[varname].tag = 'SETWFATTR:<attrname>';
	subTags[varname].helpref = 'setwfattr';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['mvfield'] = "SETWFATTR:MV:<attrname> ";
	
	// #1361 AS 2011.11.18
	varname = 'setwfcomment';
	subTags[varname] = {};
	subTags[varname].tag = 'SETWFCOMMENT';
	subTags[varname].helpref = 'setwfcomment';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['blank'] = "SETWFCOMMENT ";
	subTags[varname]['options']['taskID'] = "SETWFCOMMENT:<taskID> ";
	
	varname = 'setwfform';
	subTags[varname] = {};
	subTags[varname].tag = 'SETWFFORM:';
	subTags[varname].helpref = 'setwfform';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['field'] = "SETWFFORM:<formname>:<fieldname> ";
	subTags[varname]['options']['setfield'] = "SETWFFORM:<formname>:SET:<setname>:<fieldname> ";
	subTags[varname]['options']['mvfield'] = "SETWFFORM:<formname>:MV:<fieldname> ";
	subTags[varname]['options']['setmvfield'] = "SETWFFORM:<formname>:SET:<setname>:MV:<fieldname> ";
	subTags[varname]['options']['mvsetmvfield'] = "SETWFFORM:<formname>:MVSET:<setname>:MV:<fieldname> ";
	subTags[varname]['options']['mvsetfield'] = "SETWFFORM:<formname>:MVSET++:<setname>:<fieldname> ";
	subTags[varname]['options']['mvsetfield1'] = "SETWFFORM:<formname>:MVSET:<setname>:<fieldname> "
	
	// #2646 AS 2012.03.22
	varname = 'setwfinfo';
	subTags[varname] = {};
	subTags[varname].tag = 'SETWFINFO';
	subTags[varname].helpref = 'setwfinfo';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['title'] = "SETWFINFO:TITLE ";
	
	// #2016, 2647 AS 2012.07.05
	varname = 'setwftaskinfo';
	subTags[varname] = {};
	subTags[varname].tag = 'SETWFTASKINFO';
	subTags[varname].helpref = 'setwftaskinfo';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['name'] = "SETWFTASKINFO:NAME:<taskID> ";
	subTags[varname]['options']['priority'] = "SETWFTASKINFO:PRIORITY:<taskID> ";
	
	varname = 'show';
	subTags[varname] = {};
	subTags[varname].tag = 'SHOW';
	subTags[varname].helpref = 'show';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;

	subTags['slice'] = {};
	subTags['slice'].tag = 'SLICE:';
	subTags['slice'].helpref = 'subtagslice';
	subTags['slice'].header = true;
	subTags['slice'].footer = true;
	subTags['slice'].row = true;
	subTags['slice'].showineditor = true;
	
	subTags['status'] = {};
	subTags['status'].tag = 'STATUS:';
	subTags['status'].helpref = 'subtagstatus';
	subTags['status'].header = true;
	subTags['status'].footer = true;
	subTags['status'].row = true;
	subTags['status'].showineditor = true;
	subTags['status']['options'] = {};
	subTags['status']['options']['work'] = "STATUS:WORK ";
	subTags['status']['options']['subwork'] = "STATUS:SUBWORK ";
	subTags['status']['options']['subworktask'] = "STATUS:SUBWORKTASK ";
	subTags['status']['options']['workaudit'] = "STATUS:WORKAUDIT ";
	subTags['status']['options']['task'] = "STATUS:TASK ";
	
	subTags['strip'] = {};
	subTags['strip'].tag = 'STRIP:';
	subTags['strip'].helpref = 'subtagstrip';
	subTags['strip'].header = true;
	subTags['strip'].footer = true;
	subTags['strip'].row = true;
	subTags['strip'].showineditor = true;
	
	// #3285 AS 2012.10.09
	varname = 'submitform';
	subTags[varname] = {};
	subTags[varname].tag = 'SUBMITFORM';
	subTags[varname].helpref = 'subtagsubmitform';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;

	subTags['substr'] = {};
	subTags['substr'].tag = 'SUBSTR:';
	subTags['substr'].helpref = 'subtagsubstr';
	subTags['substr'].header = true;
	subTags['substr'].footer = true;
	subTags['substr'].row = true;
	subTags['substr'].showineditor = true;
	
	// #3110 AS 2012.03.20
	varname = 'subtract';
	subTags[varname] = {};
	subTags[varname].tag = 'SUBTRACT:<value>';
	subTags[varname].helpref = 'subtagsubtract';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	subTags['tabs'] = {};
	subTags['tabs'].tag = 'TABS';
	subTags['tabs'].helpref = 'tabs';
	subTags['tabs'].header = true;
	subTags['tabs'].footer = true;
	subTags['tabs'].row = true;
	subTags['tabs'].showineditor = true;	
	
	varname = 'timesince';
	subTags[varname] = {};
	subTags[varname].tag = 'TIMESINCE:';
	subTags[varname].helpref = 'subtagtimesince';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	
	subTags['todate'] = {};
	subTags['todate'].tag = 'TODATE:';
	subTags['todate'].helpref = 'subtagtodate';
	subTags['todate'].header = true;
	subTags['todate'].footer = true;
	subTags['todate'].row = true;
	subTags['todate'].showineditor = true;
	subTags['todate']['options'] = {};
	subTags['todate']['options']['%%'] = 'TODATE:%%';
	subTags['todate']['options']['%b'] = 'TODATE:%b';
	subTags['todate']['options']['%d'] = 'TODATE:%d';
	subTags['todate']['options']['%m'] = 'TODATE:%m';
	subTags['todate']['options']['%p'] = 'TODATE:%p';
	subTags['todate']['options']['%y'] = 'TODATE:%y';
	subTags['todate']['options']['%B'] = 'TODATE:%B';
	subTags['todate']['options']['%H'] = 'TODATE:%H';
	subTags['todate']['options']['%I'] = 'TODATE:%I';
	subTags['todate']['options']['%M'] = 'TODATE:%M';
	subTags['todate']['options']['%P'] = 'TODATE:%P';	
	subTags['todate']['options']['%S'] = 'TODATE:%S';
	subTags['todate']['options']['%Y'] = 'TODATE:%Y';	
	
	varname = 'tolist'
	subTags[varname] = {};
	subTags[varname].tag = varname.toUpperCase() + ':';
	subTags[varname].helpref = 'subtag' + varname;
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	
	varname = 'tojson'
	subTags[varname] = {};
	subTags[varname].tag = varname.toUpperCase() + ':';
	subTags[varname].helpref = 'subtag' + varname;
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	
	varname = 'trim';
	subTags[varname] = {};
	subTags[varname].tag = varname.toUpperCase();
	subTags[varname].helpref = 'subtag' + varname;
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	
	subTags['trunc'] = {};
	subTags['trunc'].tag = 'TRUNC:';
	subTags['trunc'].helpref = 'subtagtrunc';
	subTags['trunc'].header = true;
	subTags['trunc'].footer = true;
	subTags['trunc'].row = true;
	subTags['trunc'].showineditor = true;

	subTags['tzoffset'] = {};
	subTags['tzoffset'].tag = 'TZOFFSET';
	subTags['tzoffset'].helpref = 'subtagtzoffset';
	subTags['tzoffset'].header = true;
	subTags['tzoffset'].footer = true;
	subTags['tzoffset'].row = true;
	subTags['tzoffset'].showineditor = true;
	
	varname = 'unescapestr'
	subTags[varname] = {};
	subTags[varname].tag = 'UNESCAPESTR';
	subTags[varname].helpref = 'subtagunescapestr';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	

	subTags['upper'] = {};
	subTags['upper'].tag = 'UPPER';
	subTags['upper'].helpref = 'subtagupper';
	subTags['upper'].header = true;
	subTags['upper'].footer = true;
	subTags['upper'].row = true;
	subTags['upper'].showineditor = true;

	varname = 'urltopost'
	subTags[varname] = {};
	subTags[varname].tag = 'URLTOPOST';
	subTags[varname].helpref = 'subtagurltopost';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;

	varname = 'useraction'
	subTags[varname] = {};
	subTags[varname].tag = 'USERACTION:';
	subTags[varname].helpref = 'subtaguseraction';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['add'] = 'USERACTION:ADD:<userid> ';
	subTags[varname]['options']['creategroup'] = 'USERACTION:CREATEGROUP ';
	
	// #2918 AS 2012.01.16
	subTags[varname]['options']['createuser'] = 'USERACTION:CREATEUSER:<password>:<department> ';

	subTags[varname]['options']['delete'] = 'USERACTION:DELETE ';
	
	// #3142 AS 2012.03.23
	subTags[varname]['options']['department'] = 'USERACTION:DEPARTMENT:<group ID or name> ';
	
	// #3283 AS 2012.05.22
	subTags[varname]['options']['privilege'] = 'USERACTION:PRIVILEGE:<privilege>:<true or false> ';
	
	subTags[varname]['options']['remove'] = 'USERACTION:REMOVE:<userid> ';
	subTags[varname]['options']['rename'] = 'USERACTION:RENAME:<name> ';
	
	subTags['userinfo'] = {};
	subTags['userinfo'].tag = 'USERINFO:';
	subTags['userinfo'].helpref = 'subtaguserinfo';
	subTags['userinfo'].header = true;
	subTags['userinfo'].footer = true;
	subTags['userinfo'].row = true;
	subTags['userinfo'].showineditor = true;
	subTags['userinfo']['options'] = {};
	subTags['userinfo']['options']['blank'] = 'USERINFO ';
	subTags['userinfo']['options']['fullname'] = 'USERINFO:FULLNAME ';
	subTags['userinfo']['options']['name'] = 'USERINFO:NAME ';
	subTags['userinfo']['options']['leaderid'] = 'USERINFO:LEADERID ';
	subTags['userinfo']['options']['groupid'] = 'USERINFO:GROUPID ';
	subTags['userinfo']['options']['lastname'] = 'USERINFO:LASTNAME ';
	subTags['userinfo']['options']['middlename'] = 'USERINFO:MIDDLENAME ';
	subTags['userinfo']['options']['firstname'] = 'USERINFO:FIRSTNAME ';
	subTags['userinfo']['options']['mailaddress'] = 'USERINFO:MAILADDRESS ';
	subTags['userinfo']['options']['contact'] = 'USERINFO:CONTACT ';
	subTags['userinfo']['options']['title'] = 'USERINFO:TITLE ';
	subTags['userinfo']['options']['groupname'] = 'USERINFO:GROUPNAME ';
	subTags['userinfo']['options']['pws'] = 'USERINFO:PWS ';
	
	// #3219 AS 2012.05.22
	subTags['userinfo']['options']['privileges'] = 'USERINFO:PRIVILEGES ';
	
	varname = 'useringroup'
	subTags[varname] = {};
	subTags[varname].tag = 'USERINGROUP';
	subTags[varname].helpref = 'subtaguseringroup';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	
	varname = 'userpref'
	subTags['userpref'] = {};
	subTags['userpref'].tag = 'USERPREF:';
	subTags['userpref'].helpref = 'subtaguserpref';
	subTags['userpref'].header = true;
	subTags['userpref'].footer = true;
	subTags['userpref'].row = true;
	subTags['userpref'].showineditor = true;
	subTags['userpref']['options'] = {};
	subTags['userpref']['options']['general'] = 'USERPREF:GENERAL ';
	subTags['userpref']['options']['dftstartpage'] = 'USERPREF:GENERAL:DFTSTARTPAGE ';
	subTags['userpref']['options']['enhancedkybd'] = 'USERPREF:GENERAL:ENHANCEDKYBD ';
	
	// #2779 AS 2012.01.23
	subTags['userpref']['options']['languagecode'] = 'USERPREF:GENERAL:LANGUAGE:CODE ';
	subTags['userpref']['options']['languagename'] = 'USERPREF:GENERAL:LANGUAGE:NAME ';

	subTags['userpref']['options']['moddur'] = 'USERPREF:GENERAL:MODDUR ';
	subTags['userpref']['options']['navstyle'] = 'USERPREF:GENERAL:NAVSTYLE ';
	subTags['userpref']['options']['newdur'] = 'USERPREF:GENERAL:NEWDUR ';
	subTags['userpref']['options']['sblocation'] = 'USERPREF:GENERAL:SBLOCATION ';
	subTags['userpref']['options']['sidebar'] = 'USERPREF:GENERAL:SIDEBAR ';
	subTags['userpref']['options']['showitemdesc'] = 'USERPREF:GENERAL:SHOWITEMDESC ';
	subTags['userpref']['options']['colors'] = 'USERPREF:COLORS ';
	subTags['userpref']['options']['row1'] = 'USERPREF:COLORS:ROW1 ';
	subTags['userpref']['options']['row2'] = 'USERPREF:COLORS:ROW2 ';
	subTags['userpref']['options']['discussion'] = 'USERPREF:DISCUSSION ';
	subTags['userpref']['options']['dftperiodfrom'] = 'USERPREF:DISCUSSION:DFTPERIODFROM ';
	subTags['userpref']['options']['dftview'] = 'USERPREF:DISCUSSION:DFTVIEW ';
	subTags['userpref']['options']['filterpref'] = 'USERPREF:DISCUSSION:FILTERPREF ';
	subTags['userpref']['options']['postingpref'] = 'USERPREF:DISCUSSION:POSTINGPREF ';
	subTags['userpref']['options']['replypref'] = 'USERPREF:DISCUSSION:REPLYPREF ';
	subTags['userpref']['options']['viewitemoptions'] = 'USERPREF:DISCUSSION:VIEWITEMOPTIONS ';
	subTags['userpref']['options']['workflow'] = 'USERPREF:WORKFLOW ';
	subTags['userpref']['options']['wfstartpage'] = 'USERPREF:WORKFLOW:WFSTARTPAGE ';
	subTags['userpref']['options']['proxy'] = 'USERPREF:WORKFLOW:PROXY ';
	subTags['userpref']['options']['assignmentsshow'] = 'USERPREF:WORKFLOW:ASSIGNMENTSSHOW ';
	subTags['userpref']['options']['autoopen'] = 'USERPREF:WORKFLOW:AUTOOPEN ';
	subTags['userpref']['options']['includewfassgn'] = 'USERPREF:WORKFLOW:INCLUDEWFASSGN ';
	subTags['userpref']['options']['statusshow'] = 'USERPREF:WORKFLOW:STATUSSHOW ';
	subTags['userpref']['options']['sortorder'] = 'USERPREF:WORKFLOW:SORTORDER ';
	subTags['userpref']['options']['dftwftab'] = 'USERPREF:WORKFLOW:DFTWFTAB ';
	subTags['userpref']['options']['maxitems'] = 'USERPREF:WORKFLOW:MAXITEMS ';
	
	varname = 'verinfo'
	subTags[varname] = {};
	subTags[varname].tag = 'VERINFO:';
	subTags[varname].helpref = 'subtagverinfo';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['mimetype'] = "VERINFO:MIMETYPE ";
	subTags[varname]['options']['nodeid'] = "VERINFO:NODEID ";
	subTags[varname]['options']['number'] = "VERINFO:NUMBER ";
	subTags[varname]['options']['owner'] = "VERINFO:OWNER ";
	subTags[varname]['options']['comment'] = "VERINFO:COMMENT ";
	subTags[varname]['options']['createdate'] = "VERINFO:CREATEDATE ";	
	subTags[varname]['options']['efspath'] = "VERINFO:EFSPATH ";
	subTags[varname]['options']['modifydate'] = "VERINFO:MODIFYDATE ";
	subTags[varname]['options']['filename'] = "VERINFO:FILENAME ";
	subTags[varname]['options']['filetype'] = "VERINFO:FILETYPE ";
	subTags[varname]['options']['filedatasize'] = "VERINFO:FILEDATASIZE ";
	subTags[varname]['options']['filecreatedate'] = "VERINFO:FILECREATEDATE ";
	subTags[varname]['options']['filecreator'] = "VERINFO:FILECREATOR ";
	subTags[varname]['options']['providername'] = "VERINFO:PROVIDERNAME ";
	subTags[varname]['options']['providerid'] = "VERINFO:PROVIDERID ";
	subTags[varname]['options']['rendition'] = "VERINFO:RENDITION:<type>:<property> ";
	subTags[varname]['options']['renditioncount'] = "VERINFO:RENDITIONCOUNT ";
	subTags[varname]['options']['renditiondefault'] = "VERINFO:RENDITIONDEFAULT ";
	subTags[varname]['options']['type'] = "VERINFO:TYPE ";
	
	// #3229 AS 2012.05.04
	subTags[varname]['options']['id'] = "VERINFO:ID ";
	
	// #2855 AS 2012.07.19
	subTags[varname]['options']['gif'] = "VERINFO:GIF ";	

	// #2937 AS 2012.05.16
	subTags['versioncat'] = {};
	subTags['versioncat'].tag = 'VERSIONCAT:';
	subTags['versioncat'].helpref = 'subtagversioncat';
	subTags['versioncat'].header = true;
	subTags['versioncat'].footer = true;
	subTags['versioncat'].row = true;
	subTags['versioncat'].showineditor = true;
	subTags['versioncat']['options'] = {};
	subTags['versioncat']['options']['versioncat'] = 'VERSIONCAT: ';
	subTags['versioncat']['options']['versioncat:vernum:'] = 'VERSIONCAT:<vernum>: ';
	subTags['versioncat']['options']['versioncat:vernum:jsarray'] = 'VERSIONCAT:<vernum>:JSARRAY ';
	subTags['versioncat']['options']['versioncat:vernum:raw'] = 'VERSIONCAT:<vernum>:RAW ';	
	subTags['versioncat']['options']['versioncat:vernum:display'] = 'VERSIONCAT:<vernum>:DISPLAY ';
	subTags['versioncat']['options']['versioncat:vernum:mand'] = 'VERSIONCAT:<vernum>:MAND ';
	subTags['versioncat']['options']['versioncat:vernum:catname'] = 'VERSIONCAT:<vernum>:<catname> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:display'] = 'VERSIONCAT:<vernum>:<catname>:DISPLAY ';
	subTags['versioncat']['options']['versioncat:vernum:catname:id'] = 'VERSIONCAT:<vernum>:<catname>:ID ';
	subTags['versioncat']['options']['versioncat:vernum:catname:attname'] = 'VERSIONCAT:<vernum>:<catname>:<attname> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:attname:display'] = 'VERSIONCAT:<vernum>:<catname>:<attname>:DISPLAY ';
	subTags['versioncat']['options']['versioncat:vernum:catname:attname:id'] = 'VERSIONCAT:<vernum>:<catname>:<attname>:ID ';
	subTags['versioncat']['options']['versioncat:vernum:catname:attname:attval'] = 'VERSIONCAT:<vernum>:<catname>:<attname>:<attval> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mv:attname:count'] = 'VERSIONCAT:<vernum>:<catname>:MV:<attname>:COUNT ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mv:attname:n'] = 'VERSIONCAT:<vernum>:<catname>:MV:<attname>:<n> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mv:attname:n:attval'] = 'VERSIONCAT:<vernum>:<catname>:MV:<attname>:<n>:<attval> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mv:attname:n:display'] = 'VERSIONCAT:<vernum>:<catname>:MV:<attname>:<n>:DISPLAY ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mv:attname:index:attval'] = 'VERSIONCAT:<vernum>:<catname>:MV:<attname>:INDEX:<attval> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:set:setname:attname'] = 'VERSIONCAT:<vernum>:<catname>:SET:<setname>:<attname> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:set:setname:attname:display'] = 'VERSIONCAT:<vernum>:<catname>:SET:<setname>:<attname>:DISPLAY ';
	subTags['versioncat']['options']['versioncat:vernum:catname:set:setname:attname:id'] = 'VERSIONCAT:<vernum>:<catname>:SET:<setname>:<attname>:ID ';
	subTags['versioncat']['options']['versioncat:vernum:catname:set:setname:attname:attval'] = 'VERSIONCAT:<vernum>:<catname>:SET:<setname>:<attname>:<attval> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:set:setname:mv:attname:count'] = 'VERSIONCAT:<vernum>:<catname>:SET:<setname>:MV:<attname>:COUNT ';
	subTags['versioncat']['options']['versioncat:vernum:catname:set:setname:mv:attname:n'] = 'VERSIONCAT:<vernum>:<catname>:SET:<setname>:MV:<attname>:<n> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:set:setname:mv:attname:n:attval'] = 'VERSIONCAT:<vernum>:<catname>:SET:<setname>:MV:<attname>:<n>:<attval> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:set:setname:mv:attname:n:display'] = 'VERSIONCAT:<vernum>:<catname>:SET:<setname>:MV:<attname>:<n>:DISPLAY ';
	subTags['versioncat']['options']['versioncat:vernum:catname:set:setname:mv:attname:index:attval'] = 'VERSIONCAT:<vernum>:<catname>:SET:<setname>:MV:<attname>:INDEX:<attval> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mvset:setname:n:attname'] = 'VERSIONCAT:<vernum>:<catname>:MVSET:<setname>:<n>:<attname> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mvset:setname:n:attname:display'] = 'VERSIONCAT:<vernum>:<catname>:MVSET:<setname>:<n>:<attname>:DISPLAY ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mvset:setname:n:attname:id'] = 'VERSIONCAT:<vernum>:<catname>:MVSET:<setname>:<n>:<attname>:ID  ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mvset:setname:n:attname:attval'] = 'VERSIONCAT:<vernum>:<catname>:MVSET:<setname>:<n>:<attname>:<attval> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mvset:setname:n:mv:attname:count'] = 'VERSIONCAT:<vernum>:<catname>:MVSET:<setname>:<n>:MV:<attname>:COUNT ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mvset:setname:n:mv:attname:m'] = 'VERSIONCAT:<vernum>:<catname>:MVSET:<setname>:<n>:MV:<attname>:<m> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mvset:setname:n:mv:attname:m:display'] = 'VERSIONCAT:<vernum>:<catname>:MVSET:<setname>:<n>:MV:<attname>:<m>:DISPLAY ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mvset:setname:n:mv:attname:m:attval'] = 'VERSIONCAT:<vernum>:<catname>:MVSET:<setname>:<n>:MV:<attname>:<m>:<attval> ';
	subTags['versioncat']['options']['versioncat:vernum:catname:mvset:setname:n:mv:attname:index:attval'] = 'VERSIONCAT:<vernum>:<catname>:MVSET:<setname>:<n>:MV:<attname>:INDEX:<attval> ';

	varname = 'wfaction';
	subTags[varname] = {};
	subTags[varname].tag = 'WFACTION:';
	subTags[varname].helpref = 'subtagwfaction';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['archive'] = "WFACTION:ARCHIVE ";
	subTags[varname]['options']['delete'] = "WFACTION:DELETE ";
	subTags[varname]['options']['resume'] = "WFACTION:RESUME ";
	subTags[varname]['options']['stop'] = "WFACTION:STOP ";
	subTags[varname]['options']['suspend'] = "WFACTION:SUSPEND ";
	
	
	varname = 'wfattr';
	subTags[varname] = {};
	subTags[varname].tag = 'WFATTR:';
	subTags[varname].helpref = 'subtagwfattr';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['wfattr'] = "WFATTR ";
	subTags[varname]['options']['wfattr:attname'] = "WFATTR:<attname> ";
	subTags[varname]['options']['wfattr:attname:display'] = "WFATTR:<attname>:DISPLAY ";
	subTags[varname]['options']['wfattr:attname:id'] = "WFATTR:<attname>:ID ";
	subTags[varname]['options']['wfattr:attname:count'] = "WFATTR:<attname>:COUNT ";
	subTags[varname]['options']['wfattr:attname:attval'] = "WFATTR:<attname>:<attval> ";
	subTags[varname]['options']['wfattr:attname:n'] = "WFATTR:<attname>:<n> ";
	subTags[varname]['options']['wfattr:attname:n:display'] = "WFATTR:<attname>:<n>:DISPLAY ";
	subTags[varname]['options']['wfattr:attname:n:attval'] = "WFATTR:<attname>:<n>:<attval> ";
	subTags[varname]['options']['wfattr:attname:index:attval'] = "WFATTR:<attname>:INDEX:<attval> ";
	 
	// #1361 AS 2011.11.28
	varname = 'wfcomments';
	subTags[varname] = {};
	subTags[varname].tag = 'WFCOMMENTS';
	subTags[varname].helpref = 'wfcomments';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['blank'] = "WFCOMMENTS ";
	subTags[varname]['options']['taskID'] = "WFCOMMENTS:<taskID> ";

	varname = 'wfdblookup'
	subTags[varname] = {};
	subTags[varname].tag = varname.toUpperCase() + ':';
	subTags[varname].helpref = 'subtag' + varname;
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;	
	
	varname = 'wfform';
	subTags[varname] = {};
	subTags[varname].tag = 'WFFORM:';
	subTags[varname].helpref = 'subtagwfform';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options'][varname] = 'WFFORM ';
	subTags[varname]['options']['wfform:'] = 'WFFORM: ';
	subTags[varname]['options']['wfform:display'] = 'WFFORM:DISPLAY ';
	subTags[varname]['options']['wfform:mand'] = 'WFFORM:MAND ';
	subTags[varname]['options']['wfform:formname'] = 'WFFORM:<formname> ';
	subTags[varname]['options']['wfform:formname:display'] = 'WFFORM:<formname>:DISPLAY ';
	subTags[varname]['options']['wfform:formname:id'] = 'WFFORM:<formname>:ID ';
	subTags[varname]['options']['wfform:formname:fieldname'] = 'WFFORM:<formname>:<fieldname> ';
	subTags[varname]['options']['wfform:formname:fieldname:display'] = 'WFFORM:<formname>:<fieldname>:DISPLAY ';
	subTags[varname]['options']['wfform:formname:fieldname:id'] = 'WFFORM:<formname>:<fieldname>:ID ';
	subTags[varname]['options']['wfform:formname:fieldname:fieldval'] = 'WFFORM:<formname>:<fieldname>:<fieldval> ';
	subTags[varname]['options']['wfform:formname:mv:fieldname:count'] = 'WFFORM:<formname>:MV:<fieldname>:COUNT ';
	subTags[varname]['options']['wfform:formname:mv:fieldname:n'] = 'WFFORM:<formname>:MV:<fieldname>:<n> ';
	subTags[varname]['options']['wfform:formname:mv:fieldname:n:fieldval'] = 'WFFORM:<formname>:MV:<fieldname>:<n>:<fieldval> ';
	subTags[varname]['options']['wfform:formname:mv:fieldname:n:display'] = 'WFFORM:<formname>:MV:<fieldname>:<n>:DISPLAY ';
	subTags[varname]['options']['wfform:formname:mv:fieldname:index:fieldval'] = 'WFFORM:<formname>:MV:<fieldname>:INDEX:<fieldval> ';
	subTags[varname]['options']['wfform:formname:set:setname:fieldname'] = 'WFFORM:<formname>:SET:<setname>:<fieldname> ';
	subTags[varname]['options']['wfform:formname:set:setname:fieldname:display'] = 'WFFORM:<formname>:SET:<setname>:<fieldname>:DISPLAY ';
	subTags[varname]['options']['wfform:formname:set:setname:fieldname:id'] = 'WFFORM:<formname>:SET:<setname>:<fieldname>:ID ';
	subTags[varname]['options']['wfform:formname:set:setname:fieldname:fieldval'] = 'WFFORM:<formname>:SET:<setname>:<fieldname>:<fieldval> ';
	subTags[varname]['options']['wfform:formname:set:setname:mv:fieldname:count'] = 'WFFORM:<formname>:SET:<setname>:MV:<fieldname>:COUNT ';
	subTags[varname]['options']['wfform:formname:set:setname:mv:fieldname:n'] = 'WFFORM:<formname>:SET:<setname>:MV:<fieldname>:<n> ';
	subTags[varname]['options']['wfform:formname:set:setname:mv:fieldname:n:fieldval'] = 'WFFORM:<formname>:SET:<setname>:MV:<fieldname>:<n>:<fieldval> ';
	subTags[varname]['options']['wfform:formname:set:setname:mv:fieldname:n:display'] = 'WFFORM:<formname>:SET:<setname>:MV:<fieldname>:<n>:DISPLAY ';
	subTags[varname]['options']['wfform:formname:set:setname:mv:fieldname:index:fieldval'] = 'WFFORM:<formname>:SET:<setname>:MV:<fieldname>:INDEX:<fieldval> ';
	subTags[varname]['options']['wfform:formname:mvset:setname:n:fieldname'] = 'WFFORM:<formname>:MVSET:<setname>:<n>:<fieldname> ';
	subTags[varname]['options']['wfform:formname:mvset:setname:n:fieldname:display'] = 'WFFORM:<formname>:MVSET:<setname>:<n>:<fieldname>:DISPLAY ';
	subTags[varname]['options']['wfform:formname:mvset:setname:n:fieldname:id'] = 'WFFORM:<formname>:MVSET:<setname>:<n>:<fieldname>:ID  ';
	subTags[varname]['options']['wfform:formname:mvset:setname:n:fieldname:fieldval'] = 'WFFORM:<formname>:MVSET:<setname>:<n>:<fieldname>:<fieldval> ';
	subTags[varname]['options']['wfform:formname:mvset:setname:n:mv:fieldname:count'] = 'WFFORM:<formname>:MVSET:<setname>:<n>:MV:<fieldname>:COUNT ';
	subTags[varname]['options']['wfform:formname:mvset:setname:n:mv:fieldname:m'] = 'WFFORM:<formname>:MVSET:<setname>:<n>:MV:<fieldname>:<m> ';
	subTags[varname]['options']['wfform:formname:mvset:setname:n:mv:fieldname:m:display'] = 'WFFORM:<formname>:MVSET:<setname>:<n>:MV:<fieldname>:<m>:DISPLAY ';
	subTags[varname]['options']['wfform:formname:mvset:setname:n:mv:fieldname:m:fieldval'] = 'WFFORM:<formname>:MVSET:<setname>:<n>:MV:<fieldname>:<m>:<fieldval> ';
	subTags[varname]['options']['wfform:formname:mvset:setname:n:mv:fieldname:index:fieldval'] = 'WFFORM:<formname>:MVSET:<setname>:<n>:MV:<fieldname>:INDEX:<fieldval> ';
	
	
	varname = 'wfinfo';
	subTags[varname] = {};
	subTags[varname].tag = 'WFINFO:';
	subTags[varname].helpref = 'subtagwfinfo';
	subTags[varname].header = true;
	subTags[varname].footer = true;
	subTags[varname].row = true;
	subTags[varname].showineditor = true;
	subTags[varname]['options'] = {};
	subTags[varname]['options']['attachfolder'] = "WFINFO:ATTACHFOLDER ";
	subTags[varname]['options']['flags'] = "WFINFO:FLAGS ";
	subTags[varname]['options']['datedue_min'] = "WFINFO:DATEDUE_MIN ";
	subTags[varname]['options']['datedue_max'] = "WFINFO:DATEDUE_MAX ";
	subTags[varname]['options']['dateinitiated'] = "WFINFO:DATEINITIATED ";
	subTags[varname]['options']['datecompleted'] = "WFINFO:DATECOMPLETED ";
	subTags[varname]['options']['ownerid'] = "WFINFO:OWNERID ";
	subTags[varname]['options']['managerid'] = "WFINFO:MANAGERID ";
	subTags[varname]['options']['status'] = "WFINFO:STATUS ";

	// #2327 AS 2011.12.23
	subTags[varname]['options']['title'] = "WFINFO:TITLE ";

	subTags[varname]['options']['project'] = "WFINFO:PROJECT ";
	subTags[varname]['options']['userdata'] = "WFINFO:USERDATA ";
	subTags[varname]['options']['customdata'] = "WFINFO:CUSTOMDATA ";
	subTags[varname]['options']['ownerperms'] = "WFINFO:OWNERPERMS ";
	
	// #3474 AS 2012.11.13
	subTags['xlate'] = {};
	subTags['xlate'].tag = 'XLATE';
	subTags['xlate'].helpref = 'subtagxlate';
	subTags['xlate'].header = true;
	subTags['xlate'].footer = true;
	subTags['xlate'].row = true;
	subTags['xlate'].showineditor = true;
		
	return subTags;
}


function setTags(){
	var tags = {};	
	tags.controlTags = setControlTags();
	tags.dataTags = setDataTags();
	tags.subTags = setSubTags();	
	return tags;
}	
	
function getHelpRef( tagType, index ){
	return tags[tagType][index].helpref;
}


function setActiveTag( tagType, tag ){

// if the help was opened from inside the online editor
// we share variables so that we can support drag and drop
// properly between different sections

	if (opener){
		// this is a child window
		if (opener.myPage != null && opener.myPage == "editor" ){
			opener.activeTagType = tagType;
			opener.activeTag = tag;
		} else {
			activeTagType = tagType;
			activeTag = tag;	
		}
	} else {
		if (top && top.opener && top.opener.myPage && top.opener.myPage == "editor"){
			top.opener.activeTagType = tagType;
			top.opener.activeTag = tag;
		} else {
			activeTagType = tagType;
			activeTag = tag;	
		}
	} 
}

function getTag( tagType, index ){
	setActiveTag( tagType, index );
	return tags[tagType][index].tag;
}

function getCTLTag( index ){
	return getTag( 'controlTags', index );
}

function getDataTag( index ){
	return getTag( 'dataTags', index );
}

function getSubTag( index ){
	return getTag( 'subTags', index );
}

function getSubTagOption( subTag, option ){
	setActiveTag( 'subTags', subTag );
	return tags['subTags'][subTag]['options'][option];
}

function getAUDITINFOOption( option ){
	return getSubTagOption( 'auditinfo', option );
}

function getCATOption( option ){
	return getSubTagOption( 'cat', option );
}

function getCATACTIONoption( option ){
	return getSubTagOption( 'cataction', option );
}

// #3198 AS 2012.04.17
function getCATINFOoption( option ){
	return getSubTagOption( 'catinfo', option );
}

function getDATEOption( option ){
	return getSubTagOption( 'date', option );
}

function getEMAILINFOoption( option ){
	return getSubTagOption( 'emailinfo', option );
}

function getLLURLoption( option ){
	return getSubTagOption( 'llurl', option );
}

function getNODEACTIONoption( option ){
	return getSubTagOption( 'nodeaction', option );
}

function getNODEINFOoption( option ){
	return getSubTagOption( 'nodeinfo', option );
}

function getONERROROption( option ){
	return getSubTagOption( 'onerror', option );
}

function getPERMACTIONoption( option ){
	return getSubTagOption( 'permaction', option );
}

function getPERMCHECKoption( option ){
	return getSubTagOption( 'permcheck', option );
}

// #3079 AS 2012.03.09
function getPERMINFOoption( option ){
	return getSubTagOption( 'perminfo', option );
}

function getPOCOPYOption( option ){
	return getSubTagOption( 'pocopy', option );
}

function getPOINFOOption( option ){
	return getSubTagOption( 'poinfo', option );
}

function getRMACTIONOption( option ){
	return getSubTagOption( 'rmaction', option );
}

function getRMCLASSOption( option ){
	return getSubTagOption( 'rmclass', option );
}

// #2960 AS 2012.03.29
function getRMHOLDACTIONOption( option ){
	return getSubTagOption( 'rmholdaction', option );
}

// #3095 AS 2012.03.26
function getRMHOLDINFOOption( option ){
	return getSubTagOption( 'rmholdinfo', option );
}

function getRMINFOOption( option ){
	return getSubTagOption( 'rminfo', option );
}

function getRMTYPEOption( option ){
	return getSubTagOption( 'rmtype', option );
}

function getRSIOption( option ){
	return getSubTagOption( 'rsi', option );
}

// #2761 AS 2012.01.20
function getSCACTIONOption( option ){
	return getSubTagOption( 'scaction', option );
}

// #2752 AS 2012.01.18
function getSCINFOOption( option ){
	return getSubTagOption( 'scinfo', option );
}

// #1850 AS 2012.01.31
function getSETFORMoption( option ){
	return getSubTagOption( 'setform', option );
}

function getSETWFATTACHoption( option ){
	return getSubTagOption( 'setwfattach', option );
}

// #1361 AS 2011.11.18
function getSETWFCOMMENToption( option ){
	return getSubTagOption( 'setwfcomment', option );
}

// #2646 AS 2012.07.05
function getSETWFINFOoption( option ){
	return getSubTagOption( 'setwfinfo', option );
}

// #2016 AS 2012.05.11
function getSETWFTASKINFOoption( option ){
	return getSubTagOption( 'setwftaskinfo', option );
}

function getSETWFFORMoption( option ){
	return getSubTagOption( 'setwfform', option );
}

function getSTATUSoption( option ){
	return getSubTagOption( 'status', option );
}

function getTODATEOption( option ){
	return getSubTagOption( 'todate', option );
}

function getUSERINFOoption( option ){
	return getSubTagOption( 'userinfo', option );
}

function getUSERACTIONoption( option ){
	return getSubTagOption( 'useraction', option );
}

function getUSERPREFoption( option ){
	return getSubTagOption( 'userpref', option );
}

// #3219 AS 2012.05.14
function getUSERPRIVILEGEoption( option ){
	return getSubTagOption( 'userprivilege', option );
}

function getVERINFOoption( option ){
	return getSubTagOption( 'verinfo', option );
}

// #2937 AS 2012.05.16
function getVERSIONCATOption( option ){
	return getSubTagOption( 'versioncat', option );
}

function getWFACTIONoption( option ){
	return getSubTagOption( 'wfaction', option );
}

function getWFINFOoption( option ){
	return getSubTagOption( 'wfinfo', option );
}

function getWFATTRoption( option ){
	return getSubTagOption( 'wfattr', option );
}

// #2796 AS 2011.11.28
function getWFCOMMENTSoption( option ){
	return getSubTagOption( 'wfcomments', option );
}

function getWFFORMOption( option ){
	return getSubTagOption( 'wfform', option );
}

function isActiveTagSupported( section ){
	if (activeTagType && activeTag) {
		return isTagSupported( activeTagType, activeTag, section );
	}
	// return true if things are messed up
	return true;
}

function isTagSupported( tagType, tag, reportviewSection ){
	if ( tagType && tag && reportviewSection ){
		return tags[tagType][tag][reportviewSection];
	} else {
		// for safety
		return true;
	}
}

function setClipboard( clipboardText ){
	if (clipboardText){
		window.clipboardData.setData( 'Text', clipboardText );
	}
}

function doDragStart( dragText ){
	window.event.dataTransfer.setData( 'Text', dragText );
}

function setCursor(ShowHand){
	if (ShowHand){
		curPoint = 'hand';
	} else {
		if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion < "6.0"){
			curPoint = '';
		} else {
			curPoint = 'pointer';
		}
	}
	return curPoint;
}
