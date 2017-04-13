/**
 * Copyright 2011 Resonate KT Limited
 *  
 * @projectDescription	Used by the webreports editor (webreports-editview.html).
 *
 * @author		Christopher Meyer cmeyer@resonatekt.com
 * @version		1.1.0
 */
 
$(function () {
	var textareaMaxSize = 45;
	var textareaMinSize = 2;
	var textareaDefaultSize = 15;

	String.prototype.repeat = function (num) {
		return new Array(num + 1).join(this);
	};

	String.prototype.trimLeadingWhiteSpace = function () {
		return /^\s+/.test(this) ? this.substr(1) : this;
	};
	
	// Manage tabs, markDirty(), and initial size (TODO: FF friendly) 
	$('#wreditor textarea').attr('rows', textareaDefaultSize).attr('cols', 100);

	$('#wreditor textarea').keydown(function (event) {
		if (event.which == 9) { // tab
			var $this = $(this);

			var sel = $this.getSelection();

			if (sel.text) { // means something is selected
				var replaceArray = [];
				var lines = $(this).val().split('\n');

				var newStart = sel.start;
				var newEnd = sel.end;

				var l = 0;
				var r = 0;

				$.each(lines, function (n, line) {
					r = line.length + l;

					var isSelectStartLine = ((l <= sel.start) && (sel.start <= r)); // selection starts on this line
					var isSelectEndLine = ((l <= sel.end) && (sel.end <= r));
					var isSelectedLine = (isSelectStartLine || ((sel.start <= l) && (r <= sel.end)) || isSelectEndLine); // the line contains selection
					if (isSelectedLine) {
						beforeLine = line;

						if (event.shiftKey) {
							line = line.trimLeadingWhiteSpace();
						} else {
							line = '\t' + line;
						};

						var delta = line.length - beforeLine.length;

						if (isSelectStartLine) {
							newStart = newStart + delta;
						};
						newEnd = newEnd + delta;
					};
					replaceArray.push(line);
					l = r + 1;
				});

				$(this).val(replaceArray.join('\n')).change();
				$(this).setSelection(newStart, newEnd);
			} else { // normal tab
				$this.insertAtCaretPos('\t').change();
			};

			return false;
		}
	});
	
	// Expand & shrink of textareas
	$('#wreditor tr.section td.label').click(function () {
		var $textarea = $(this).closest('tr.section').find('textarea');

		if ($textarea.attr('rows') != textareaMaxSize) {
			$('#wreditor textarea').attr('rows', textareaMinSize);
			$textarea.attr('rows', textareaMaxSize);
		} else {
			$('#wreditor textarea').attr('rows', textareaDefaultSize);
		};
	});
});