/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license

Note: the flash link element has been removed to avoid security concerns

*/

CKEDITOR.editorConfig = function( config )
{
	config.toolbar = 'toolbarLight';
	
	//moono color is the default skin in CS
	config.skin = 'moonocolor';
	
	//add in the find plugin
	config.extraPlugins = 'find,panelbutton,colorbutton,font,selectall,smiley';
	
	config.toolbar_toolbarDiscussion =
	[
		['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
		['Bold','Italic','Strike','NumberedList','BulletedList','Outdent','Indent','Blockquote', 'TextColor','BGColor'],
		['Cut','Copy','Paste','PasteText','PasteFromWord'],
		['Image','Table','HorizontalRule','Smiley','SpecialChar', 'Link','Unlink','Anchor', 'Maximize'] ,
		['Styles','Format','Font','FontSize']
	];

	config.toolbar_toolbarLight =
	[
		['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
		['Cut','Copy','Paste','PasteText','PasteFromWord'],
		['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
		['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
		['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
		['Link','Unlink','Anchor'],
		['Image','Table','HorizontalRule','Smiley','SpecialChar'],
		['Styles','Format','Font','FontSize'],
		['TextColor','BGColor'],
		['Maximize', 'ShowBlocks']
	];

	config.toolbar_toolbarLightSource =
	[
		['Source', '-', 'Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
		['Cut','Copy','Paste','PasteText','PasteFromWord'],
		['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
		['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
		['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
		['Link','Unlink','Anchor'],
		['Image','Table','HorizontalRule','Smiley','SpecialChar'],
		['Styles','Format','Font','FontSize'],
		['TextColor','BGColor'],
		['Maximize', 'ShowBlocks']
	];

	config.toolbar_Fullx =
	[
		['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
		['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
		['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
		'/',
		['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
		['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
		['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
		['Link','Unlink','Anchor'],
		['Table','HorizontalRule','Smiley','SpecialChar'],
		'/',
		['Styles','Format','Font','FontSize'],
		['TextColor','BGColor'],
		['Maximize', 'ShowBlocks']
	];
};
