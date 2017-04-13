/**
 * Constructs a new dialog.
 */
function Dialog(editor, elt, title, w, h, modal, closable, onClose)
{
	var dx = 0;
	// border is 1px
	var borderSize = 1;
	// header height is 28px
	var headerSize = 28;

	w += dx;
	h += dx;
	
	var left = Math.max(0, Math.round((document.body.scrollWidth - w) / 2));
	var top = Math.max(0, Math.round((Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - h) / 3));
	
	var borderDiv = editor.createDiv('geDialogBorder');
	borderDiv.style.width = w + 'px';
	borderDiv.style.height = (h + headerSize + borderSize * 3) + 'px';
	borderDiv.style.left = left + 'px';
	borderDiv.style.top = (top + headerSize) + 'px';
	
	var headerDiv = editor.createDiv('geDialogHeader');
	headerDiv.style.width = (w - borderSize * 2) + 'px';
	headerDiv.style.height = headerSize + 'px';
	headerDiv.style.left = borderSize + 'px';
	headerDiv.style.top = borderSize + 'px';
	
	var titleDiv = editor.createDiv('geDialogTitle');
	mxUtils.write(titleDiv,title);
	
	headerDiv.appendChild(titleDiv);
	borderDiv.appendChild(headerDiv);
	
	var bodyDiv = editor.createDiv('geDialogBody');
	bodyDiv.style.width = (w - borderSize * 2) + 'px';
	bodyDiv.style.height = h + 'px';
	bodyDiv.style.top = (headerSize + borderSize * 2) + 'px';
	bodyDiv.style.left = borderSize + 'px';
	
	borderDiv.appendChild(bodyDiv);
	
	if (this.bg == null)
	{
		this.bg = editor.createDiv('geDialogBackground');
		// close dialog in case it is clicked on background
		mxEvent.addListener(this.bg, 'click', mxUtils.bind(this, function()
		{
			editor.hideDialog();
		}));
	}

	if (modal)
	{
		document.body.appendChild(this.bg);
	}
	
	bodyDiv.appendChild(elt);
	document.body.appendChild(borderDiv);
	
	if (closable)
	{
		var dialogClose = editor.createDiv('geDialogClose');
		dialogClose.onmousedown = function()
		{
			dialogClose.className = 'geDialogCloseActive';
		};
		dialogClose.onmouseup = function()
		{
			dialogClose.className = 'geDialogClose';
		};
		mxEvent.addListener(dialogClose, 'click', mxUtils.bind(this, function()
		{
			editor.hideDialog();
		}));
		mxEvent.addListener(dialogClose, 'mouseover', mxUtils.bind(this, function()
		{
			dialogClose.className = 'geDialogCloseHover';
		}));
		mxEvent.addListener(dialogClose, 'mouseout', mxUtils.bind(this, function()
		{
			dialogClose.className = 'geDialogClose';
		}));
		
		headerDiv.appendChild(dialogClose);
		this.dialogImg = dialogClose;
	}
	
	this.onDialogClose = onClose;
	this.container = borderDiv;
};

/**
 * Removes the dialog from the DOM.
 */
Dialog.prototype.close = function()
{
	if (this.onDialogClose != null)
	{
		this.onDialogClose();
		this.onDialogClose = null;
	}
	
	if (this.dialogImg != null)
	{
		this.dialogImg.parentNode.removeChild(this.dialogImg);
		this.dialogImg = null;
	}
	
	this.container.parentNode.removeChild(this.container);
	this.bg.parentNode.removeChild(this.bg);
};

/**
 * Constructs a new print dialog.
 */
function PrintDialog(editor)
{
	var graph = editor.graph;
	var a4 = mxConstants.PAGE_FORMAT_A4_PORTRAIT;
	var pf = ((graph.pageFormat.width == a4.width && graph.pageFormat.height == a4.height) ||
			(graph.pageFormat.height == a4.width && graph.pageFormat.width == a4.height)) ?
			a4 : mxConstants.PAGE_FORMAT_LETTER_PORTRAIT;
	var row, td;
	
	// Table for settings and buttons
	var table = document.createElement('table');
	table.style.width = '100%';
	table.style.height = '100%';
	var tbody = document.createElement('tbody');
	
	AddEmptyRow(tbody, 2);
	
	// Paper settings
	AddBoxHeader(tbody, mxResources.get('DIALOG_PRINT_PAPER_SETTINGS_BOX_HEADER'), 2);
	AddEmptyRow(tbody, 2);	
	
	// Page size
	row = document.createElement('tr');	
	AddLabel(row, mxResources.get('DIALOG_PRINT_PAGE_SIZE_TEXT') + ':');	
	
	var paperSizeSelect = document.createElement('select');

	var paperSizeLetterOption = document.createElement('option');
	paperSizeLetterOption.setAttribute('value', 'letter');
	mxUtils.write(paperSizeLetterOption, 'Letter');
	paperSizeSelect.appendChild(paperSizeLetterOption);
	
	var paperSizeLedgerOption = document.createElement('option');
	paperSizeLedgerOption.setAttribute('value', 'ledger');
	mxUtils.write(paperSizeLedgerOption, 'Ledger');
	paperSizeSelect.appendChild(paperSizeLedgerOption);
	
	var paperSizeA4Option = document.createElement('option');
	paperSizeA4Option.setAttribute('value', 'a4');
	mxUtils.write(paperSizeA4Option, 'A4');
	paperSizeSelect.appendChild(paperSizeA4Option);

	var paperSizeA3Option = document.createElement('option');
	paperSizeA3Option.setAttribute('value', 'a3');
	mxUtils.write(paperSizeA3Option, 'A3');
	paperSizeSelect.appendChild(paperSizeA3Option);
	
	if (pf === mxConstants.PAGE_FORMAT_LETTER_PORTRAIT)
	{
		paperSizeLetterOption.setAttribute('selected', 'selected');
	}	
	
	td = document.createElement('td');			
	td.appendChild(paperSizeSelect);
	row.appendChild(td);	
	tbody.appendChild(row);
	
	// Orientation
	row = document.createElement('tr');	
	AddLabel(row, mxResources.get('DIALOG_PRINT_PAGE_ORIENTATION') + ':');
	
	// In IE there is an issue with quirks mode and a selected radio button created in java script.
	// To bypass this issue inner html must be used for the pre selected radio button.
	var landscapeRadioButton = document.createElement('span');
	var landscapeRadioButtonInner = '<input type=radio name=orientation checked=checked>';
	landscapeRadioButton.innerHTML = landscapeRadioButtonInner;
	var landscapeRadioButtonSpan = document.createElement('span');
	mxUtils.write(landscapeRadioButtonSpan, mxResources.get('DIALOG_PRINT_LANDSCAPE_TEXT'));
		
	var portraitRadioButton = document.createElement('input');
	portraitRadioButton.setAttribute('type', 'radio');	
	portraitRadioButton.name = 'orientation';
	var portraitRadioButtonSpan = document.createElement('span');
	mxUtils.write(portraitRadioButtonSpan, mxResources.get('DIALOG_PRINT_PORTRAIT_TEXT'));
	
	td = document.createElement('td');
	td.className = 'geDialogValue';
	td.appendChild(landscapeRadioButton);
	td.appendChild(landscapeRadioButtonSpan);
	td.appendChild(document.createElement('br'));
	td.appendChild(portraitRadioButton);
	td.appendChild(portraitRadioButtonSpan);	
	row.appendChild(td);	
	tbody.appendChild(row);
	
	AddEmptyRow(tbody, 2);
	AddBoxDivider(tbody, 2);
	AddEmptyRow(tbody, 2);
	
	// Scaling
	AddBoxHeader(tbody, mxResources.get('DIALOG_PRINT_SCALING_SETTINGS_BOX_HEADER'), 2);
	AddEmptyRow(tbody, 2);
	
	// Fit to Page
	row = document.createElement('tr');
	AddLabel(row, mxResources.get('DIALOG_PRINT_FIT_TO_PAGE_TEXT') + ':');
	
	var pageCountCheckBox = document.createElement('input');
	pageCountCheckBox.setAttribute('type', 'checkbox');	
	var pageCountCheckBoxSpan = document.createElement('span');
	mxUtils.write(pageCountCheckBoxSpan, mxResources.get('DIALOG_PRINT_SCALE_TEXT'));
	
	td = document.createElement('td');
	td.className = 'geDialogValue';
	td.appendChild(pageCountCheckBox);
	td.appendChild(pageCountCheckBoxSpan);
	td.appendChild(document.createElement('br'));
	row.appendChild(td);	
	tbody.appendChild(row);	
	
	// Pages
	row = document.createElement('tr');
	
	AddLabel(row, mxResources.get('DIALOG_PRINT_PAGES_TEXT') + ':');	
	var pageCountInput = document.createElement('input');
	pageCountInput.setAttribute('value', '1');
	pageCountInput.setAttribute('type', 'number');
	pageCountInput.setAttribute('min', '1');
	pageCountInput.setAttribute('disabled', 'disabled');
	pageCountInput.className = 'geDialogNumberInputField';
	
	td = document.createElement('td');
	td.className = 'geDialogValue';
	td.appendChild(pageCountInput);
	row.appendChild(td);
	tbody.appendChild(row);

	mxEvent.addListener(pageCountCheckBox, 'change', function()
	{
		if (pageCountCheckBox.checked)
		{
			pageCountInput.removeAttribute('disabled');
		}
		else
		{
			pageCountInput.setAttribute('disabled', 'disabled');
		}
	});
	
	AddEmptyRow(tbody, 2);
	AddBoxDivider(tbody, 2);
	
	// buttons
	
	row = document.createElement('tr');	
	td = document.createElement('td');
	td.className = 'geDialogButtonBar';	
	td.colSpan = 2;
	td.setAttribute('align', 'center');	
	td.setAttribute('width', '100%');	
	
	function preview()
	{
		var ls = !portraitRadioButton.checked;
		var pf;
		
		// scale depending on page size
		switch (paperSizeSelect.value) {
			case 'letter':
				pf = (ls) ? mxConstants.PAGE_FORMAT_LETTER_LANDSCAPE : mxConstants.PAGE_FORMAT_LETTER_PORTRAIT
				break;
			case 'ledger':
				pf = (ls) ? mxConstants.PAGE_FORMAT_LEDGER_LANDSCAPE : mxConstants.PAGE_FORMAT_LEDGER_PORTRAIT			
				break;
			case 'a3':
				pf = (ls) ? mxConstants.PAGE_FORMAT_A3_LANDSCAPE : mxConstants.PAGE_FORMAT_A3_PORTRAIT
				break;
			default:
				pf = (ls) ? mxConstants.PAGE_FORMAT_A4_LANDSCAPE : mxConstants.PAGE_FORMAT_A4_PORTRAIT			
				break;
		}
		
		var scale = 1 / graph.pageScale;
		
		if (pageCountCheckBox.checked)
		{
    		var pageCount = parseInt(pageCountInput.value);
			
			if (!isNaN(pageCount))
			{
				scale = mxUtils.getScaleForPageCount(pageCount, graph, pf);
			}
		}

		// Negative coordinates are cropped or shifted if page visible
		var gb = graph.getGraphBounds();
		var autoOrigin = pageCountCheckBox.checked;
		var border = 0;
		var x0 = 0;
		var y0 = 0;
		
		// Computes unscaled, untranslated graph bounds
		var x = (gb.width > 0) ? gb.x / graph.view.scale - graph.view.translate.x : 0;
		var y = (gb.height > 0) ? gb.y / graph.view.scale - graph.view.translate.y : 0;

		if (x < 0 || y < 0)
		{
			autoOrigin = true;
			
			if (graph.pageVisible)
			{
				var ps = graph.pageScale;
				var pw = pf.width * ps;
				var ph = pf.height * ps;

				x0 = (x > 0) ? x : pf.width * -Math.floor(Math.min(0, x) / pw) + Math.min(0, x) / graph.pageScale;
				y0 = (y > 0) ? y : pf.height * -Math.floor(Math.min(0, y) / ph) + Math.min(0, y) / graph.pageScale;
			}
			else
			{
				x0 = 10;
				y0 = 10;
			}
		}

		var preview = new mxPrintPreview(graph, scale, pf, border, x0, y0);
		preview.title = editor.map.title;
		preview.autoOrigin = autoOrigin;
		
		return preview.open();
	};

	// Add print preview button
	AddButton(td, mxResources.get('DIALOG_PRINT_PREVIEW_BUTTON'), function()
	{
		editor.hideDialog();
		preview();
	});	
	
	// Add print button
	AddButton(td, mxResources.get('DIALOG_PRINT_PRINT_BUTTON'), function()
	{
		editor.hideDialog();
        // the system print dialog is opened with a 
        // slight delay. otherwise firefox and safari
        // have issues printing the workflow map.
        var prv = preview();
        prv.setTimeout("print()", 100);
    });
	
	// Add cancel button
	AddButton(td, mxResources.get('DIALOG_PRINT_CANCEL_BUTTON'), function()
	{
		editor.hideDialog();
	});
	
	row.appendChild(td);
	tbody.appendChild(row);
	
	tbody.appendChild(row);
	table.appendChild(tbody);
	this.container = table;
};

/**
 * Constructs a new button and add it to the passed element
 * elt		Element where button is added as child
 * text		Text of the button
 * action	Action that is executed in case button is clicked
 */
function AddButton(elt, text, action)
{
	var buttonSpan = document.createElement('span');
	buttonSpan.className = 'geDialogButtonSpan';
	mxEvent.addListener(buttonSpan, 'mouseover', mxUtils.bind(this, function()
	{
		buttonSpan.className = 'geDialogButtonSpanHover';
	}));
	mxEvent.addListener(buttonSpan, 'mouseout', mxUtils.bind(this, function()
	{
		buttonSpan.className = 'geDialogButtonSpan';
	}));
	buttonSpan.onmousedown = function()
	{
		buttonSpan.className = 'geDialogButtonSpanActive';
	};
	buttonSpan.onmouseup = function()
	{
		buttonSpan.className = 'geDialogButtonSpan';
	};

	var buttonInnerSpan = document.createElement('span');
	buttonInnerSpan.className = 'geDialogButtonInnerSpan';
	var button = mxUtils.button(text, action);	
	button.className = 'geDialogButton';
	button.onmousedown = function()
	{
		button.className = 'geDialogButtonActive';
	};
	button.onmouseup = function()
	{
		button.className = 'geDialogButton';
	};
	mxEvent.addListener(button, 'mouseout', mxUtils.bind(this, function()
	{
		button.className = 'geDialogButton';
	}));
	buttonSpan.appendChild(buttonInnerSpan);
	buttonInnerSpan.appendChild(button);
	elt.appendChild(buttonSpan);
};

/**
 * Add a empty row and column
 * table	Table where the empty row is added
 * colspan	Colspan for column
 */
function AddEmptyRow(table, colspan)
{
	var row = document.createElement('tr');
	row.className = 'geDialogEmptyRow';
	var column = document.createElement('td');
	column.className = 'geDialogEmptyColumn';
	column.colSpan = colspan;
	row.appendChild(column);
	table.appendChild(row);
};

/**
 * Add a box header
 * table	Table where the header is added
 * text		Box header text
 * colspan	Colspan for column
 */
function AddBoxHeader(table, text, colspan)
{
	var row = document.createElement('tr');
	var column = document.createElement('td');
	column.className = 'geDialogBoxHeader';
	column.colSpan = colspan;
	mxUtils.write(column, text);
	row.appendChild(column);
	table.appendChild(row);
};

/**
 * Add a box divider
 * table	Table where the divider is added
 * colspan	Colspan for the divider
 */
function AddBoxDivider(table, colspan)
{
	var row = document.createElement('tr');
	row.className = 'geDialogBoxDividerRow';
	var column = document.createElement('td');
	column.className = 'geDialogBoxDividerColumn';
	column.colSpan = colspan;
	var img = document.createElement('img');
	img.className = 'geDialogBoxDividerImg';
	img.src = IMAGE_PATH + '/spacer.gif';
	column.appendChild(img);
	row.appendChild(column);
	table.appendChild(row);
};

/**
 * Add a label
 * row		Row where the label is added
 * text		Box header text
 */
function AddLabel(row, text)
{
	var column = document.createElement('td');
	column.className = 'geDialogLabel';
	mxUtils.write(column, text);
	row.appendChild(column);
};

/**
 * Variable PAGE_FORMAT_A4_PORTRAIT used for print
 *
 * Overwrite mxgraph variable mxConstants.PAGE_FORMAT_A4_PORTRAIT because
 * in case of firefox the defined pixels are to high. This means in firefox
 * with default mxgraph pixels one page is always printed on two pages.
 * 
 * Defines the rectangle for the A4 portrait page format. The dimensions
 * of this page format are 595x842 pixels for 72 dpi.
 */
mxConstants.PAGE_FORMAT_A4_PORTRAIT = new mxRectangle(0, 0, 595, 842);

/**
 * Variable PAGE_FORMAT_A4_LANDSCAPE used for print
 * 
 * Overwrite mxgraph variable mxConstants.PAGE_FORMAT_A4_LANDSCAPE because
 * of two high pixels.
 *
 * Defines the rectangle for the A4 landscape page format. The dimensions
 * of this page format are 842x595 pixels for 72 dpi.
 */
mxConstants.PAGE_FORMAT_A4_LANDSCAPE = new mxRectangle(0, 0, 842, 595);

/**
 * Variable PAGE_FORMAT_A3_PORTRAIT used for print
 * 
 * Defines the rectangle for the A3 portrait page format. The dimensions
 * of this page format are 842x1191 pixels for 72 dpi.
 */
mxConstants.PAGE_FORMAT_A3_PORTRAIT = new mxRectangle(0, 0, 842, 1191);

/**
 * Variable PAGE_FORMAT_A3_LANDSCAPE used for print
 *
 * Defines the rectangle for the A3 landscape page format. The dimensions
 * of this page format are 1191x842 pixels for 72 dpi.
 */
mxConstants.PAGE_FORMAT_A3_LANDSCAPE = new mxRectangle(0, 0, 1191, 842);

/**
 * Variable PAGE_FORMAT_LETTER_PORTRAIT used for print
 * 
 * Overwrite mxgraph variable mxConstants.PAGE_FORMAT_LETTER_PORTRAIT because
 * of two high pixels.
 *
 * Defines the rectangle for the letter portrait page format. The
 * dimensions of this page format are 612x792 pixels for 72 dpi.
 */
mxConstants.PAGE_FORMAT_LETTER_PORTRAIT = new mxRectangle(0, 0, 612, 792);

/**
 * Variable PAGE_FORMAT_LETTER_LANDSCAPE used for print
 * 
 * Overwrite mxgraph variable mxConstants.PAGE_FORMAT_LETTER_LANDSCAPE because
 * of two high pixels.
 * 
 * Defines the rectangle for the letter landscape page format. The dimensions
 * of this page format are 792x612 pixels for 72 dpi.
 */
mxConstants.PAGE_FORMAT_LETTER_LANDSCAPE = new mxRectangle(0, 0, 792, 612);

/**
 * Variable PAGE_FORMAT_LEDGER_PORTRAIT used for print
 *
 * Defines the rectangle for the ledger portrait page format. The
 * dimensions of this page format are 792x1225 pixels for 72 dpi.
 */
mxConstants.PAGE_FORMAT_LEDGER_PORTRAIT = new mxRectangle(0, 0, 792, 1225);

/**
 * Variable PAGE_FORMAT_LEDGER_LANDSCAPE used for print
 * 
 * Defines the rectangle for the ledger landscape page format. The dimensions
 * of this page format are 1225x792 pixels for 72 dpi.
 */
mxConstants.PAGE_FORMAT_LEDGER_LANDSCAPE = new mxRectangle(0, 0, 1225, 792);
