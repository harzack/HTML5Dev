/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/*
CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
};
*/


CKEDITOR.editorConfig = function( config )
{
	config.removePlugins = 'elementspath';
	config.skin = 'office2003';
	config.toolbar = 'toolbarCOP';

    config.toolbar_toolbarCOP =
    [
        ['Bold','Italic','Underline','TextColor','BGColor','Cut','Copy','Paste','PasteWord','-','Print','Undo','Redo','-','Find','Replace','-','OrderedList','UnorderedList','-','Outdent','Indent','-','Table','Rule','SpecialChar'],
		['JustifyLeft','JustifyCenter','JustifyRight','JustifyFull','-','Link','Unlink','-','FontFormat','FontSize','Preview']
    ];
};
