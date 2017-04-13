/**
 * Copyright 2011 Resonate KT Limited
 *  
 * @projectDescription	Used by the webreports editor (webreports-editview.html).
 *
 * @author		Christopher Meyer cmeyer@resonatekt.com
 * @version		1.1.0
 */

/********************************************** REDO & UNDO singleton */
var undo = (function () {
	// private methods
	var maxStackSize = 30;

	var undoStack = new Array();
	var redoStack = new Array();

	// isDirtyActive
	var isDirtyActive = true;

	
	// confirm save on exit
	$(window).bind('beforeunload', function (e) {
		var msg = "You have unsaved changes.";

		if (undo.isDirty()) {
			// For IE and FF
			if (e) {
				e.returnValue = msg;
			};
			// For Safari
			return msg;
		};
	});


	function getReportviewSections() {
		return {
			header: $('#webreports-header').val(),
			row: $('#webreports-row').val(),
			footer: $('#webreports-footer').val()
		};
	};

	// save the initial values as the defaultvalues
	var defaultValues;

	$(function () {
		defaultValues = getReportviewSections();
	});

	// compares the current values with the top of the undo stack

	function hasChanges(values) {
		var currentValues = getReportviewSections();
		// TODO: first event is logged as change, regardless if nothing has changed
		var compare = values || undoStack[undoStack.length - 1] || {};
		return !((currentValues.header == compare.header) && (currentValues.row == compare.row) && (currentValues.footer == compare.footer));
	};

	// compares the current values with the default values

	function dirty() {
		return hasChanges(defaultValues);
	};

	function setReportviewSections(newRow) {
		$('#webreports-header').val(newRow.header).change();
		$('#webreports-row').val(newRow.row).change();
		$('#webreports-footer').val(newRow.footer).change();
	};

	function updateBufferDisplayLength() {
		// TODO: XLATE this!
		// $('#undobutton').attr('title', undoStack.length + " `%L[WEBREPORTS_ERROR.UndoSInBuffer]`");
		// $('#redobutton').attr('title', redoStack.length + " `%L[WEBREPORTS_ERROR.RedoSInBuffer]`");
		$('#undobutton').attr('title', undoStack.length + " undo(s) in buffer");
		$('#redobutton').attr('title', redoStack.length + " redo(s) in buffer");
	};

	function saveRedoBuffer() {
		redoStack.push(getReportviewSections());

		if (redoStack.length > maxStackSize) {
			redoStack = redoStack.slice(1);
		};

		updateBufferDisplayLength();
	};

	// public methods
	return {
		undoTyping: function () {
			if (undoStack.length > 0) {
				saveRedoBuffer();
				setReportviewSections(undoStack.pop());
			};
			updateBufferDisplayLength();
		},

		redoTyping: function () {
			if (redoStack.length > 0) {
				undoStack.push(getReportviewSections());
				setReportviewSections(redoStack.pop());
			};
			updateBufferDisplayLength();
		},

		saveUndoBuffer: function () {
			if (hasChanges()) {
				undoStack.push(getReportviewSections());

				if (undoStack.length > maxStackSize) {
					undoStack = undoStack.slice(1);
				};
				redoStack = new Array();
				updateBufferDisplayLength();
			};
		},

		deactivate: function () {
			isDirtyActive = false;
		},

		activate: function () {
			isDirtyActive = true;
		},

		windowopen: function (URL, windowName, windowFeatures) {
			this.deactivate();
			var win = window.open(URL, windowName, windowFeatures);
			this.activate();
			return win;
		},

		isDirty: function () {
			return (isDirtyActive && dirty());
		}
	}
})();


$(function () {
	$('#wreditor textarea').keydown(function () {
		undo.saveUndoBuffer();
	});

	$('#undobutton').click(function () {
		undo.undoTyping();
		return false;
	});

	$('#redobutton').click(function () {
		undo.redoTyping();
		return false;
	});
});