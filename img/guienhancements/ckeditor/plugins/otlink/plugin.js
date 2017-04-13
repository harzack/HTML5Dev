CKEDITOR.plugins.add( 'otlink',
{
	requires : [ 'dialog' ],
	lang : [ 'en' ],
	
	init : function( editor )
	{
		var pluginName = 'otlink';
		editor.addCommand( pluginName, new CKEDITOR.dialogCommand( pluginName ) );
		editor.ui.addButton( 'OTLink',
		{
			label : 'Insert/Edit Link',
			command : pluginName,
			icon : this.path + 'otlink.gif'
		});
		CKEDITOR.dialog.add( pluginName, this.path + 'dialogs/otlink.js' );
	},
	onBrowseReturn : function( nodeId, nodeName )
	{
		var commentslinkDialog = CKEDITOR.dialog.getCurrent();
		commentslinkDialog._.contents.info.csObjectId.setValue( nodeId );
		commentslinkDialog._.contents.info.csObjectName.setValue( nodeName );
	}
});

CKEDITOR.plugins.setLang( 'otlink', 'en',
{
	langOTLink :
	{
		OTCSObject : 'Content Server object',
		OTSelectCSObject : 'Select Content Server Object',
		OTSelect : 'Select'
    }
});
