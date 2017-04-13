/**
 * @license Copyright 2011 Resonate KT Limited  
 * @projectDescription	This jQuery plugin wraps the Livelink Target-Browse to select a Livelink node in the system.
 *
 * @author		Christopher Meyer cmeyer@resonatekt.com
 * @version		1.0.0  
 */

/**
 * callback(nodeid, nodepath)
 */  

jQuery.extend({
	targetbrowse: function(options, callback) {
		if ( $.isFunction(options) ) {
			callback = options;
			options = {};
		};

		options = $.extend({
				title: 'Target Browse',
				objid: 2000,
				selectPerm: 2,
				selectScreen: '{0}',
				width: 540,
				height: 340
			}, options);
	
		window.afdefbbc_DoSelection = callback;
		
		var parms = {
			func: 'll',
			objAction: 'targetBrowse',
			headerLabel: options.title,
			objId: options.objid,
			selectPerm: options.selectPerm,
			selectScreen: options.selectScreen,
			formname: 'ThisIsNotUsed',
			fieldPrefix: 'afdefbbc'
		};
		
		var windowParms = "width=" + options.width + ",height=" + options.height + ",resizable=yes,menubar=no,scrollbars=yes,toolbar=yes";			
		window.open( $.LL.cgiPath() + "?" + $.param(parms), "WindowName", windowParms );
	},
	
	// userbrowse: function(options, callback) {
	userbrowse: function(options) {
		/*
		// useful if function callback is desired
		if ( $.isFunction(options) ) {
			callback = options;
			options = {};
		};
		*/
		
		options = $.extend({
				formname:'aaaddd444',
				fieldprefix:'bbbb2222333',
				title:'Select User',
				groupsselectable: false,
				/*
				nogroups:false,
				nogroupsselectable:true,
				*/
				width: 680,
				height: 340
			}, options);	
	/*
		func=user.SelectUserDlg
		formname=InfoAttrsForm
		fieldprefix=_1_1_10_1
		title=Select%20User&DisplayUserName
		NoGroups=FALSE
		NoGroupsSelectable=TRUE
	
	*/

		if ( !options.groupsselectable ) {
			options['nogroupsselectable'] = true;
			options['nogroups'] = true;
		};


		var parms = {
			func: 'user.SelectUserDlg',
			formname: options.formname,
			fieldprefix: options.fieldprefix,
			title: options.title
		};
		
		if ( !options.groupsselectable ) {
			parms = $.extend(parms, {
				NoGroups: options.nogroups,
				NoGroupsSelectable: options.nogroupsselectable
			});
		};
	
		var windowParms = "width=" + options.width + ",height=" + options.height + ",resizable=yes,menubar=no,scrollbars=yes,toolbar=yes";			
		window.open( $.LL.cgiPath() + "?" + $.param(parms), "WindowName", windowParms );
	}
});

/*
// This could be used with a function callback for selecting a user.
$(function() {
	var formName = 'aaaddd444';
	
	$('<form></form>', {
		name: formName
	})
	.append($('<input>',{
		name:'bbbb2222333_ID'
	}))
	.append($('<input>',{
		name:'bbbb2222333_Name'
	}))	
	.appendTo($('body'));
	
	// TODO.. what if markDirty is already defined?	
	window.markDirty = function() {
		alert('abc');
	}	
});
*/