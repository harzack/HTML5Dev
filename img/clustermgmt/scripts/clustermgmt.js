var iecrossdomain = true;
var othome = undefined;
var agenthost = undefined;
var agentport = undefined;
var agenttoken = undefined;
var progresstimer = 500;
//polling timer agent status check
var statusInterval = 10000;
//polling timer agent system health check
var healthInterval = 2500;
//polling timer cs instance check
var processInterval = 2500;
//polling timer cluster analysis progress timer
var pollingInterval = 1500;
//polling timer for cluster analysis complete check
var completeInterval = 500;
//Expiration for the installNext cookie
var installNextExpiry = 480;
//Restart agent timeout
var restartAgentTimeout = 3000;

var defaultmsgbox_height = 200;
var defaultmsgbox_width = 455;

	/**
	 * 
	 * Cluster Deployment Objects
	 * 
	 */
	function Cluster(){
		this.haserrors = false;
		this.agents = new Array();
	}
	
	function Agent(){
		this.host = "";
		this.port = "";
		this.row = undefined;
		this.currentstatus = "unknown";
		this.analysisstatus = "unknown";
		this.deploymentrequired = false;
		this.overall = false;
		this.haserrors = false;
		this.ismissingpatches = false;
		this.hasadditionalpatches = false;
		this.deploymentcomplete = false;
		this.requiresagentpatch = false;
		this.instances = new Array();
	}
	
	function Instance(){
		this.path = "";
		this.deploymentrequired = false;
		
		this.deploymentpackage = new Object();
		this.deploymentpackage.status = false;
		this.deploymentpackage.iserror = false;
		this.deploymentpackage.errormsg = "";
		this.deploymentpackage.installpatches = new Array();
		this.deploymentpackage.removepatches = new Array();
	
		
		this.update = new Object();
		this.update.iserror = false;
		this.update.errormsg = "";
		this.update.current = -1;
		this.update.expected = -1;
	
		this.patch = new Object();
		this.patch.iserror = false;
		this.patch.errormsg = "";
		this.patch.missingstaged = new Array();
		this.patch.missingpatches = new Array();
		this.patch.additionalpatches = new Array();
		this.patch.requiresagentpatch = false;
		
		this.module = new Object();
		this.module.iserror = false;
		this.module.errormsg = "";
		this.module.missingmodules = new Array();
		
	}
	
	function WorkOrderInstance(){
		this.OTHome = "";
		this.Install = new Array();
		this.Remove = new Array();
	}
	
	function StagedPackage(){
		this.number = "";
		this.pkgid = "";
		this.agentpatch = false;
		this.efs = false;
		this.searchindex = false;
		this.schema = false;
	}
	
	function MasterDeploymentPlan(){
		this.installList = new Array();
		this.installAgentList = new Array();
		this.removeList = new Array();
	}


	/**
	 * 
	 * Control Functions
	 * 
	 */

	function clearForm(form){
		$(form + " input").each(function (i, control) {
			var type = this.type;
			if (type == 'text') {
				this.value = "";
			}
	
			if (type == 'checkbox') {
				this.checked = false;
			}
		});
	
		$(form + " select").each(function (i, control) {
			control.options.length = 0;
		});
	
		$(form + " textarea").each(function (i, control) {
			$(control).attr("value", "");
		});
	
	}
	
	function blockUI(msg, element) {
		if(msg != undefined){
			var opts = {
			  lines: 8, // The number of lines to draw
			  length: 4, // The length of each line
			  width: 2, // The line thickness
			  radius: 5, // The radius of the inner circle
			  corners: 1, // Corner roundness (0..1)
			  rotate: 0, // The rotation offset
			  color: '#2da3e0', // #rgb or #rrggbb
			  speed: 3, // Rounds per second
			  trail: 100, // Afterglow percentage
			  shadow: false, // Whether to render a shadow
			  hwaccel: false, // Whether to use hardware acceleration
			  className: 'blockuispinner', // The CSS class to assign to the spinner
			  zIndex: 2e9, // The z-index (defaults to 2000000000)
			  top: 'px', // Top position relative to parent in px
			  left: 'auto' // Left position relative to parent in px
			}
			var blockMsg;
			var spinner = new Spinner(opts).spin();
			var blockCss = { width:'auto', padding:'15px', border:'1px solid #aaa', minWidth:'275px' };
			var blockgui = $('<div>');
			
			if (msg == undefined || msg == '') {
				blockMsg = "Processing...";
			} else {
				blockMsg = msg;
			}
			
			var msgblock = $('<div id="block-container" style="font-size:16px;"></div>');
			var spanelement = $('<div id="block-msg"></div>')
			var msgdiv = $('<div style="margin-left:30px">' + blockMsg + '</div>');
			msgblock.append(spanelement);
			spanelement.append(spinner.el);
			spanelement.append(msgdiv);
			blockgui.append(msgblock);
		
			if(typeof element != "undefined"){
				element.block({ 
					message: blockgui,
					css: blockCss,
					fadeIn: 0,
					fadeOut: 0 
				});
			}else{
				$.blockUI({ 
					message: blockgui,
					css: blockCss,
					fadeIn: 0,
					fadeOut: 0 
				});
			}
		}
	}
	
	function addSmallSpinnerToElement(element){
		var opts = {
		  lines: 8, // The number of lines to draw
		  length: 3, // The length of each line
		  width: 2, // The line thickness
		  radius: 3, // The radius of the inner circle
		  corners: 1, // Corner roundness (0..1)
		  rotate: 0, // The rotation offset
		  color: '#2da3e0', // #rgb or #rrggbb
		  speed: 2, // Rounds per second
		  trail: 100, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: false, // Whether to use hardware acceleration
		  className: 'smallblockuispinner', // The CSS class to assign to the spinner
		  zIndex: 100, // The z-index (defaults to 2000000000)
		  top: 'px', // Top position relative to parent in px
		  left: 'auto' // Left position relative to parent in px
		}
		var blockMsg;
		var spinner = new Spinner(opts).spin();
	
		element.append(spinner.el);
	
	}

	/**
	 * 
	 * Cookie Functions
	 * 
	 */


	
	function getCookie(c_name) {
		var i, x, y, ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == c_name) {
				return unescape(y);
			}
		}
	}
	
	function setCookie(c_name,value,expireminutes)	{
		var exdate=new Date();
		exdate.setMinutes( exdate.getMinutes() + expireminutes);
		var c_value=escape(value) + ((expireminutes==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}
	
	function deleteCookie(c_name)	{
		var exdate=new Date();
		var value = "";
		var etime = -1;
		exdate.setDate(exdate.getDate() + etime);
		var c_value=escape(value) + ((etime==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}

	/**
	 * 
	 * Dialogs
	 *
	 */

	function MessageBox_Ok(Title, Message, Callback, Height, Width, OkButtonText){
		$.unblockUI();
		var dialog_height = defaultmsgbox_height;
		var dialog_width = defaultmsgbox_width;
		if(typeof Height != "undefined"){
			dialog_height = Height;
		}
		if(typeof Width != "undefined"){
			dialog_width = Height;
		}
		$( "#msg_box" ).dialog({
			modal: true,
			autoOpen: false,
			title: Title,
			resizable: false,
			width: dialog_width,
			height: dialog_height,
			closeOnEscape: false,
			create: function (event, ui){
				$(this).parent().children().children('.ui-dialog-titlebar-close').hide();
			},
			open: function(event, ui){
				$("#msg_box_content").html(Message);
			},
			close: function(event, ui){
				$( this ).dialog( "destroy" );
			},
			buttons: [{
				text: OkButtonText,
				click: 	function(){
					if(typeof Callback != "undefined" && Callback != null){
						Callback();
					}
					$(this).dialog( "close" );
				}
			}]
			
		});
		$( "#msg_box" ).dialog("open");	
	}
	
	function MessageBox_OkCancel(Title, Message, Callback_OK, Callback_Cancel, Height, Width, OkButtonText, CancelButtonText){
		$.unblockUI();
		var dialog_height = defaultmsgbox_height;
		var dialog_width = defaultmsgbox_width;
		if(typeof Height != "undefined"){
			dialog_height = Height;
		}
		if(typeof Width != "undefined"){
			dialog_width = Height;
		}
		$( "#msg_box" ).dialog({
			modal: true,
			autoOpen: false,
			title: Title,
			resizable: false,
			width: dialog_width,
			height: dialog_height,
			closeOnEscape: false,
			create: function (event, ui){
				$(this).parent().children().children('.ui-dialog-titlebar-close').hide();
			},
			open: function(event, ui){
				$("#msg_box_content").html(Message);
			},
			close: function(event, ui){
				$( this ).dialog( "destroy" );
			},
			buttons: [{
					text: OkButtonText,
					click: 	function(){
						if(typeof Callback_OK != "undefined" && Callback_OK != null){
							Callback_OK();
						}
						$(this).dialog( "close" );
					}
				},
				{
					text: CancelButtonText,
					click: 	function(){
						if(typeof Callback_Cancel != "undefined" && Callback_Cancel != null){
							Callback_Cancel();
						}
						$(this).dialog( "close" );
					}
				}]
		});
		$( "#msg_box" ).dialog("open");
	}
	
	function MessageBox_ContinueCancel(Title, Message, Callback_Continue, Callback_Cancel, Height, Width, ContinueButtonText, CancelButtonText){
		$.unblockUI();
		var dialog_height = defaultmsgbox_height;
		var dialog_width = defaultmsgbox_width;
		if(typeof Height != "undefined"){
			dialog_height = Height;
		}
		if(typeof Width != "undefined"){
			dialog_width = Height;
		}
		$( "#msg_box" ).dialog({
			modal: true,
			autoOpen: false,
			title: Title,
			resizable: false,
			width: dialog_width,
			height: dialog_height,
			closeOnEscape: false,
			create: function (event, ui){
				$(this).parent().children().children('.ui-dialog-titlebar-close').hide();
			},
			open: function(event, ui){
				$("#msg_box_content").html(Message);
			},
			close: function(event, ui){
				$( this ).dialog( "destroy" );
			},
			buttons: [{
				text: ContinueButtonText,
				click: 	function(){
					if(typeof Callback_Continue != "undefined" && Callback_Continue != null){
						Callback_Continue();
					}
					$(this).dialog( "close" );
				}
			},
			{
				text: CancelButtonText,
				click: 	function(){
					if(typeof Callback_Cancel != "undefined" && Callback_Cancel != null){
						Callback_Cancel();
					}
					$(this).dialog( "close" );
				}
			}]
		});
		$( "#msg_box" ).dialog("open");
	}
	
	function MessageBox_YesNo(Title, Message, Callback_Yes, Callback_No, Height, Width, YesButtonText, NoButtonText){
		$.unblockUI();
		var dialog_height = defaultmsgbox_height;
		var dialog_width = defaultmsgbox_width;
		if(typeof Height != "undefined"){
			dialog_height = Height;
		}
		if(typeof Width != "undefined"){
			dialog_width = Height;
		}
		$( "#msg_box" ).dialog({
			modal: true,
			autoOpen: false,
			title: Title,
			resizable: false,
			width: dialog_width,
			height: dialog_height,
			closeOnEscape: false,
			create: function (event, ui){
				$(this).parent().children().children('.ui-dialog-titlebar-close').hide();
			},
			open: function(event, ui){
				$("#msg_box_content").html(Message);
			},
			close: function(event, ui){
				$( this ).dialog( "destroy" );
			},
			buttons: [{
				text: YesButtonText,
				click: 	function(){
					if(typeof Callback_Yes != "undefined" && Callback_Yes != null){
						Callback_Yes();
					}
					$(this).dialog( "close" );
				}
			},
			{
				text: NoButtonText,
				click: 	function(){
					if(typeof Callback_No != "undefined" && Callback_No != null){
						Callback_No();
					}
					$(this).dialog( "close" );
				}
			}]
		});
		$( "#msg_box" ).dialog("open");
	}


	/**
	 * 
	 * Content Server Functions
	 *
	 */

	function GetMasterSystemInformation(url, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getmastersystem", "GET", async, 'json', undefined , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function GetClusterAgents(url, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getagents", "GET", async, "json", undefined , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function GetClusterAgentByHost(url, async, host, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getagentbyhost", "GET", true, "json", {'host': host}, callback, { 'data': undefined }, false, undefined, false);
		
	}
	
	function GetInstances(url, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getinstances", "GET", async, 'json', undefined , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function GetAgentInstancesByHost(url, async, hostname, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getinstancesbyhost", "GET", async, "json", {'host': hostname}, callback, 
			{ 'data': undefined, 'host': hostname}, true, undefined, false);
	}
	
	function GetAgentInstancesByHostNoUnblock(url, async, hostname, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getinstancesbyhost", "GET", async, "json", {'host': hostname}, callback, 
			{ 'data': undefined, 'host': hostname}, false, undefined, false);
	}
	
	function SetMasterDeploymentPlan(url, async, plan, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url, "POST", false, 'text', {"func": "clustermgmt.setmasterdeploymentplan", "deploymentplan": plan} , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function GetMasterDeploymentPlan(url, async, id, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getmasterdeploymentplan", "GET", async, 'json', { 'objectid': id } , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function SetClusterDeploymentPlan(url, async, plan, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url, "POST", false, 'text', {"func": "clustermgmt.setclusterdeploymentplan", "deploymentplan": plan} , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function GetClusterDeploymentPlan(url, async, id, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getclusterdeploymentplan", "GET", async, 'json', { 'objectid': id } , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function DeleteClusterDeploymentPlan(url, async, id, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.deleteclusterdeploymentplan", "GET", async, 'json', { 'objectid': id } , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function GetStagedPatches(url, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getstagedpatches", "GET", async, 'json', {'page': 1} , callback, { 'data': undefined, 'loadnext': true }, false, undefined, false);
	}
	
	function GetAuditHistory(url, async, hostname, page, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getauditdeploymenthistory", "GET", async, 'json', {'page': page, 'hostname': hostname } , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function UpdateManifest(url, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.updatemanifest", "GET", async, 'json', undefined , callback, { 'data': undefined}, false, undefined, false);
	}
	
	function SetDeploymentPackage(url, async, pkgtype, pkginfo, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url, "POST", async, 'text', {"func": "clustermgmt.setdeploymentpackage", "pkgtype": pkgtype, "pkginfo": pkginfo} , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function GetAvailablePackages(url, async, pagenumber, updatelevel, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getavailablepackages", "GET", async, 'json', {'page': pagenumber, 'updatelevel': updatelevel} , callback, { 'data': undefined, 'loadnext': false }, false, undefined, false);
	}
	
	function HasNewPackages(url, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.hasnewpackages", "GET", async, 'json', undefined , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function StagePackages(url, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.stagepackage", "GET", async, 'json', undefined , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function GetStagedPackages(url, async, pagenumber, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getstagedpatches", "GET", async, 'json', {'page': pagenumber} , callback, { 'data': undefined}, false, undefined, false);
	}
	
	function GetInstalledPatches(url, async, pagenumber, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getinstalledpatches", "GET", async, 'json', {'page': pagenumber} , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function ValidateManifestUrl(url, async, manifesturl, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.validatemanifesturl", "GET", async, 'json', {'manifesturl': manifesturl}, callback, { 'data': undefined }, false, undefined, false);
	}
	
	function DeleteStagedPackage(url, async, pkgid, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.deletestagedpackage", "GET", async, 'json', {'pkgid': pkgid} , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function GetPatchInformation(url, async, patchid, callback, blockmsg){
		var data = undefined;
		blockUI(blockmsg, undefined);
		data = SendRequest(url + "?func=clustermgmt.getpatchinformation", "GET", async, 'json', {'patchid': patchid} , callback, { 'data': undefined }, false, undefined, false);
		return data;
	}
	
	function GetUpdateList(url, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getupdates", "GET", async, 'json', undefined , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function SetUpdateAnalysisPlan(url, async, plan, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url, "POST", false, 'text', {"func": "clustermgmt.setupdateanalysisplan", "updateanalysisplan": plan} , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function GetUpdateAnalysisPlan(url, async, id, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.getupdateanalysisplan", "GET", async, 'json', { 'objectid': id } , callback, { 'data': undefined }, false, undefined, false);
	}
	
	function DeleteUpdateAnalysisPlan(url, async, id, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest(url + "?func=clustermgmt.deleteupdateanalysisplan", "GET", async, 'json', { 'objectid': id } , callback, { 'data': undefined }, false, undefined, false);
	}
	/**
	 * 
	 * Cluster Agent Functions
	 *
	 */
	
	function GetAgentStatus(agent, async, datecell, statuscell, callback, blockmsg, instanceinfo){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/agent/status", "GET", async, "json", undefined, callback, 
				{ 'data': undefined, 'agent': agent, 'datecell': datecell, 'statuscell': statuscell, 'instanceinfo': instanceinfo}, false, undefined, true);
	}
		
	function StartAnalysis(agent, othomelist, isquick, ismaster, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port +
				 "/api/v1/services/content_server/analyze?quick_analysis=" + isquick.toString() + "&is_master_system="+ ismaster.toString() +"&", "POST", async, 'json', {'OTHome': othomelist} , 
				 callback, { 'data': undefined, 'agent': agent}, false, undefined, true);
	}
	
	function GetAnalysisProgress(agent, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/services/content_server/analysis_progress", "GET", async, 'json', undefined , callback,
				{ 'data': undefined, 'agent': agent,}, false, undefined, true);
	}
	
	function ProcessWorkOrder(agent, async, workorder, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/services/content_server/process_workorder", "POST", true, 
			'json', JSON.stringify(workorder) , callback, { 'data': undefined, 'agent': agent }, true, undefined, true);			
	}
	
	function GetDeploymentProgress(agent, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/services/content_server/workorder_progress", "GET", true,
				'json', undefined , callback, { 'data': undefined, 'agent': agent}, false, undefined, true);
	}
	
	function GetHealthStatus(agent, cell, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/monitor/health", "GET", async, "json", undefined, callback, 
				{ 'data': undefined, 'agent': agent, 'cell': cell }, false, undefined, true);
	}
	
	function GetCPUStatus(agent, color, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/monitor/cpu", "GET", async, "json", undefined, callback, { 'data': undefined, 'color': color}, false, undefined, true);
	}
	
	function GetMemoryStatus(agent, color, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/monitor/memory", "GET", async, "json", undefined, callback, { 'data': undefined, 'host': agent.host, 'mcolor': color}, false, undefined, true);
	}
	
	function GetDiskStatus(agent, color, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/monitor/disk", "GET", async, "json", undefined, callback, { 'data': undefined, 'host': agent.host, 'dcolor': color}, false, undefined, true);
	}
	
	function GetOSInformation(agent, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/monitor/os", "GET", async, "json", undefined, callback, { 'data': undefined, 'host': agent.host}, false, undefined, true);
	}
	
	function ListProcessInformation(agent, othome, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/services/content_server/list_cs_processes?OTHome=" + encodeURIComponent(othome) + "&", "GET", async, "json", undefined, callback, { 'data': undefined, 'agent': agent, 'othome': othome}, false, undefined, true);
	}

	function RestartClusterAgent(agent, masterInstance, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/agent/restart", "POST", async, "json", undefined, callback, { 'data': undefined, 'agent': agent, 'masterInstance': masterInstance}, false, undefined, true);		
	}
	
	function StartUpdateAnalysis(agent, async, workorder, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/services/content_server/analyzeUpdate", "POST", true, 
			'json', JSON.stringify(workorder) , callback, { 'data': undefined, 'agent': agent }, true, undefined, true);			
	}
	
	function GetUpdateAnalysisProgress(agent, async, callback, blockmsg){
		blockUI(blockmsg, undefined);
		SendRequest("http://" + agent.host + ":" + agent.port + "/api/v1/services/content_server/update_analysis_progress", "GET", async, 'json', undefined , callback,
				{ 'data': undefined, 'agent': agent,}, false, undefined, true);
	}
	

	/**
	 * 
	 * Base Communication Functions
	 *
	 */

	function SendRequest(req_url, req_type, req_async, req_datatype, req_data, callback, callbackparams, unblockRequired, 
		unblockElement, isAgentRequest){
		
		var ajaxdata = undefined;
		var params = callbackparams;
		var requesturl = req_url;
		jQuery.support.cors = true;

		var admincookie = getCookie("AdminPwd");
		
		if(typeof admincookie == "undefined"){
			location.reload();
		}
		
		if(isAgentRequest){
			GetAgentAuthenticationCallback(null);
			if(requesturl.charAt(requesturl.length - 1) == "&"){
				requesturl += "auth_token=" + encodeURIComponent(agenttoken);
			}else{
				requesturl += "?auth_token=" + encodeURIComponent(agenttoken);
			}
		}
		
		$.ajax({
			url: requesturl,
			async: req_async,
			type: req_type,
			data: req_data,
			dataType: req_datatype,
			cache: false,
			success: function(data) {
				if(isAgentRequest){
					var d1 = new Date();
					setCookie("lastrequest", d1.toString());
				}else{
					if(typeof data == "string" && data.indexOf('NAME=\"LoginForm\"') > -1 ){
						document.location.href = document.URL;
						return false;
					}
				}

				if(typeof unblockRequired != "undefined" && unblockRequired){
					if(typeof unblockElement == "undefined"){
						$.unblockUI();
					}else{
						unblockElement.unblock();
					}
				}
				
				if(typeof callback != 'undefined'){
					params.data = data
					callback(params);
				}else{
					ajaxdata = data;
				}
			},
			error: function(error){
				if(error.readyState == 4 && error.status == 200 && error.statusText == "OK" && error.responseText.indexOf('NAME=\"LoginForm\"') > -1 ){
					document.location.href = document.URL;
					return false;
				}
				if(error.status == 401 && isAgentRequest){
					ForceAuthenticationRefresh();
					SendRequest(req_url, req_type, req_async, req_datatype, req_data, callback, callbackparams, unblockRequired, 
						unblockElement, isAgentRequest);
				}else{
					var ieVersion = -1;
					if(IE){
						ieVersion= navigator.appVersion.split(';')[1].replace("MSIE", "").trim();
					}
					if (IE && parseInt(ieVersion) < 10 && window.XDomainRequest) {
						SendIEXDomainRequest(requesturl, req_type, req_async, req_data, callback, callbackparams, unblockRequired, unblockElement, isAgentRequest);
					}else{
						if(unblockRequired){
							if(typeof unblockElement == "undefined"){
								$.unblockUI();
							}else{
								unblockElement.unblock();
							}
						};
						params.data = new Object();
						params.data.error = "No Transport";
						params.data.errorcode = error.status;
						callback(params);
					}
				}
			}
		});
		
		return ajaxdata;
	}

	function SendIEXDomainRequest(req_url, req_type, req_async, req_data, callback, callbackparams, unblockRequired, unblockElement, isAgentRequest){
		var params = callbackparams;
		
		var admincookie = getCookie("AdminPwd");
		
		if(typeof admincookie == "undefined"){
			location.reload();
		}
		
		var xdr = new XDomainRequest(); 
		xdr.onerror = function(){
			var errorinfo = xdr.responseText;
			if(unblockRequired){
				$.unblockUI();
			}
			
			params.data = new Object();
			params.data.error = "ERROR";
			params.data.errorcode = -1;
			callback(params);
		};
		xdr.onprogress = function(){};
		xdr.timeout = function(){if(unblockRequired){$.unblockUI();};};
		xdr.onload = function(){
			if(isAgentRequest){
				var d1 = new Date();
				setCookie("lastrequest", d1.toString());
			}
			if(typeof callback != 'undefined' && callback != 'undefined' && callback != null ){
				params.data = JSON.parse(this.responseText)
				callback(params);
			}
			if(unblockRequired){
				if(typeof unblockElement == "undefined"){
					$.unblockUI();
				}else{
					unblockElement.unblock();
				}
			};
		};
		if(iecrossdomain){
			try{
				if(typeof req_data != "undefined"){
					try{
						xdr.open(req_type, req_url + "&" + $.param(req_data) );
						setTimeout(function(){xdr.send();}, 0);  
					}catch(err){
						xdr.open(req_type, req_url);
						setTimeout(function(){xdr.send(req_data);}, 0);  
					}
				}else{
					xdr.open(req_type, req_url);
					setTimeout(function(){xdr.send();}, 0);  
				}
				
			}catch(err){
				if(typeof unblockRequired != "undefined" && unblockRequired){
					if(typeof unblockElement == "undefined"){
						$.unblockUI();

					}else{
						unblockElement.unblock();
					}
				}
				params.data = new Object();
				params.data.error = "ERROR";
				callback(params);
			}
		}
	}

	function isRenewTime(){
		var renew = false;
		var expires = getCookie("agentexpires");
		var lastrequest = getCookie("lastrequest");
		var lastrequestDate = new Date();
		var expireDate = new Date();
		var now = new Date();
		
		if(typeof lastrequest != "undefined" && typeof expires != "undefined"){
			lastrequestDate = new Date(lastrequest);
			expireDate = new Date(lastrequestDate.getTime() + (expires - 1) * 60000);
			if(expireDate <  now){
				renew = true;
			}
		}else{
			renew = true;
		}
		
		
		return renew;
	}
	
	function ForceAuthenticationRefresh(){
		GetAgentAuthentication(othome, agenthost, agentport, undefined, true);
	}
	
	function GetAgentAuthenticationCallback(callback){
		GetAgentAuthentication(othome, agenthost, agentport, callback, false);
	}

	function GetAgentAuthentication(home, authhost, authport, callback, force, msgtext){
		
		var requesturl = undefined;
		var admincookie = undefined;
		var response = new Object();
		
		response.ok = true;
		
		othome = home;
		agenthost = authhost;
		agentport = authport;

		agenttoken = getCookie("agenttoken");
		admincookie = getCookie("AdminPwd");
		
		if(typeof admincookie == "undefined"){
			location.reload();
		}
		
		if(isRenewTime() || typeof agenttoken == "undefined" || agenttoken == "undefined" || force){
			blockUI(msgtext, undefined);
			requesturl = "http://" + agenthost + ":" + agentport + "/api/v1/auth/authenticate?AdminPwd=" + encodeURIComponent(admincookie) + "&OTHome=" + encodeURIComponent(home) ;
			$.ajax({
				url: requesturl,
				async: false,
				type: "POST",
				cache: false,
				dataType: "json",
				success: function(data) {
					$.unblockUI();
					var d1=new Date();
					setCookie("agenttoken", data.auth_token, 1440);
					setCookie("agentexpires", data.session_duration, 1440);
					setCookie("lastrequest", d1.toString());
					agenttoken = data.auth_token;
					if(typeof callback != "undefined" && callback != "undefined" && callback != null){
						callback(response);
					}
				},
				error: function(error){
					
					if(error.status == 401 && error.responseText == "Invalid 'AdminPwd' parameter"){
						document.location = "?func=admin.index"
					}else{
						
						var ieVersion = -1;
						if(IE){
							ieVersion= navigator.appVersion.split(';')[1].replace("MSIE", "").trim();
						}
						
						if (IE && parseInt(ieVersion) < 10 && window.XDomainRequest) {
								var xdr = new XDomainRequest(); 
								xdr.onerror = function(){
									var errorinfo = xdr.responseText;
									$.unblockUI();
									if(typeof callback != "undefined" && callback != null){
										response.ok = false;
										callback(response);
									}
								};
								xdr.onprogress = function(){};
								xdr.timeout = function(){if(unblockRequired){$.unblockUI();};};
								xdr.onload = function(){
									$.unblockUI();
									var d1=new Date();
									var data = JSON.parse(this.responseText);
									setCookie("agenttoken", data.auth_token, 1440);
									setCookie("agentexpires", data.session_duration, 1440);
									setCookie("lastrequest", d1.toString());
									agenttoken = data.auth_token;
									if(typeof callback != "undefined" && callback != "undefined" && callback != null){
										callback(response);
									}
								};
								if(iecrossdomain){
									try{
										xdr.open("POST", requesturl);
										setTimeout(function(){xdr.send();}, 0);  
									}catch(err){
										if(typeof unblockRequired != "undefined" && unblockRequired){
											if(typeof unblockElement == "undefined"){
												$.unblockUI();
												if(typeof callback != "undefined" && callback != "undefined" && callback != null){
													response.ok = false;
													callback(response);
												}
											}else{
												unblockElement.unblock();
											}
										};
										//iecrossdomain = false;
										//showIECrossDomainError();
									}
								}
						}else{
							$.unblockUI();
							if(typeof callback != undefined && callback != "undefined" && callback != null){
								response.host = agenthost;
								response.ok = false;
								response.errortype = 0;
								callback(response);
							}

						}
					}
				}
			});

		}else{
			if(typeof callback != "undefined" && callback != "undefined" && callback != null){
				$.unblockUI();
				callback(response);
			}
		}
	}

	
	/**
	 * 
	 * Utility Functions
	 *
	 */
	function lCase(xxx)
	{
	    pattern = /\"([a-z0-9_-]{0,})\"\:/gi;
	    return  xxx.replace(pattern, function() { return arguments[0].toLowerCase() });
	}	

	function getCurrentDateTime(dateformat, timeformat, shortmonth, longmonth){
		var a_p = "";
		var d = new Date();
		var formattedDate = dateformat;
		var formattedTime = timeformat;

		var curr_hour = d.getHours();
		if (curr_hour < 12){
		   a_p = "AM";
		}
		else{
		   a_p = "PM";
		}
		formattedTime = formattedTime.replace('%p', a_p);
		
		if (curr_hour == 0){
		   curr_hour = 12;
		}
		if(timeformat.indexOf('%I') > -1){
			if (curr_hour > 12){
			   curr_hour = curr_hour - 12;
			}
		}
		
		if (curr_hour.toString().length == 1){
			curr_hour = "0" + curr_hour.toString();
		}
		formattedTime = formattedTime.replace('%I', curr_hour);
		
		var curr_min = d.getMinutes();

		curr_min = curr_min + "";

		if (curr_min.toString().length == 1){
		   curr_min = "0" + curr_min.toString();
		}
		formattedTime = formattedTime.replace('%M', curr_min);
		
		
		
		if(d.getDate().toString().length == 1){
			formattedDate = formattedDate.replace('%d', "0" + d.getDate().toString());
		}else{
			formattedDate = formattedDate.replace('%d', d.getDate());
		}
		
		var curr_month = d.getMonth() + 1;
		if(dateformat.indexOf('%m') > -1){
			if(curr_month.toString().length == 1){
				formattedDate = formattedDate.replace('%m', "0" + curr_month.toString());
			}else{
				formattedDate = formattedDate.replace('%m', curr_month);
			}
			
		}else{
			if(dateformat.indexOf('%b') > -1){
				formattedDate = formattedDate.replace('%b', shortmonth);
			}else{
				formattedDate = formattedDate.replace('%B', longmonth);
			}
		}
		formattedDate = formattedDate.replace('%Y', d.getFullYear());
		
		return formattedDate + " " + formattedTime;
		//return (d.getMonth() + 1) + "/" + d.getDay() + "/" + d.getFullYear() + ", " + curr_hour + ":" + curr_min + " " + a_p;
	}



	function bytesToSize(bytes) {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) return 'n/a';
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[[i]];
	};

	function kilobytesToSize(bytes) {
		var sizes = ['KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) return 'n/a';
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[[i]];
	};

	function escapeStr( str) {
	 if( str)
		 return str.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g,'\\$1')
	 else
		 return str;
	}

	function getUrlVars() {
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
	    for (var i = 0; i < hashes.length; i++) {
	        hash = hashes[i].split('=');
	        vars.push(hash[0].toLowerCase());
	        vars[hash[0].toLowerCase()] = hash[1];
	    }
	    return vars;
	}
	
	function isMissingPatches(masterlist, instancelist){
		var tmpmasterlist = masterlist.slice();
		$.each(instancelist, function(i, patch){
			var foundindex = isInPatchList(tmpmasterlist, patch);
			if(foundindex > -1){
				tmpmasterlist.splice(foundindex, 1);
			}
		});
		
		return tmpmasterlist;
	}
	
	function hasAdditionalPatches(instancelist, masterlist){
		var tmpinstancelist = instancelist.slice();
		$.each(masterlist, function(i, patch){
			var foundindex = isInPatchList(tmpinstancelist, patch);
			if(foundindex > -1){
				tmpinstancelist.splice(foundindex, 1);
			}
		});
		
		return tmpinstancelist;
	}
	
	function isInPatchList(masterlist, item){
		var patchindex = -1;
		
		$.each(masterlist, function(i, patch){
			if(patch == item){
				patchindex = i;
			}
		});
		
		return patchindex;
	}
	
	function GoToClusterMenu(){
		document.location="?func=admin.clustermanagement";
	}
	
	function comparemodules(a,b) {
	  if (a.name < b.name)
	     return -1;
	  if (a.name > b.name)
	    return 1;
	  return 0;
	}
	
	