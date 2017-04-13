/** 
 * @license 
 * 
 * a-tools 1.2
 * 
 *
 * jquery.a-tools Script (including any updated version or patch, associated code, 
 * and all associated documentation) is provided to you free of charge 
 * by Resonate KT Limited in accordance with the terms set out below 
 * and, for clarity, it is not subject to any other end user licence 
 * agreement that you may have with Resonate KT Limited or Open Text 
 * Corporation. Resonate KT Limited accepts no responsibility for jquery.a-tools 
 * Script and, to the fullest extent permitted by law, excludes all 
 * liability arising out of or related to jquery.a-tools Script and its operation 
 * or use.
 *    
 * Copyright (c) 2009 Andrey Kramarev, Ampparit Inc. (www.ampparit.com)
 * Licensed under the MIT license.
 * http://www.ampparit.fi/a-tools/license.txt
 *
 * Modifications by Resonate KT Limited (2010.02.14):
 * 	rewrote insertAtCaretPos (original had issues with IE)
 *	added setSelection()
 * 
 * Basic usage:
 
    <textarea></textarea>
    <input type="text" />

    // Get current selection
    var sel = $("textarea").getSelection()
    
    // Replace current selection
    $("input").replaceSelection("foo");

    // Count characters
    alert($("textarea").countCharacters());

    // Set max length without callback function
    $("textarea").setMaxLength(7);

    // Set max length with callback function which will be called when limit is exceeded
    $("textarea").setMaxLength(10, function() {
        alert("hello")
    });

    // Removing limit:
    $("textarea").setMaxLength(-1);
    
    // Insert text at current caret position
    $("#textarea").insertAtCaretPos("hello");
    
    // Set caret position (1 = beginning, -1 = end)
    $("#textArea").setCaretPos(10);

 */
var caretPositionAmp;

jQuery.fn.extend({
	getSelection: function() {  // function for getting selection, and position of the selected text
		var input = this.jquery ? this[0] : this;
		var start;
		var end;
		var part;
		if (document.selection) {
			// part for IE and Opera
			var s = document.selection.createRange();
			if (s.text) {
				var number = 0;
				part = s.text;
				if (input.value.match(/\n/g) != null) {
					number = input.value.match(/\n/g).length;// number of EOL simbols
				}
				var minus = 0;
				var position = 0;
				var minusEnd = 0;
				// OPERA support
				if (typeof(input.selectionStart) == "number") {
					start = input.selectionStart;
					end = input.selectionEnd;
					// return null if the selected text not from the needed area
					if (start == end) {
						return this;
					}
				} else {
					// IE support
					var re = input.createTextRange();
					var firstRe;
					var secondRe;
					var rc = re.duplicate();
					firstRe = re.text;
					re.moveToBookmark(s.getBookmark());
					secondRe = re.text;
					rc.setEndPoint("EndToStart", re);
					// return null if the selectyed text not from the needed area
					if (firstRe == secondRe && firstRe != s.text) {
						return this;
					}
					start = rc.text.length; 
					end = rc.text.length + s.text.length;
				}
				// remove all EOL to have the same start and end positons as in MOZILLA
				if (number > 0) {
					for (var i = 0; i <= number; i++) {
						var w = input.value.indexOf("\n", position);
						if (w != -1 && w < start) {
							position = w + 1;
							minus++;
							minusEnd = minus;
						} else if (w != -1 && w >= start && w <= end) {
							if (w == start + 1) {
								minus--;
								minusEnd--;
								position = w + 1;
								continue;
							}
							position = w + 1;
							minusEnd++;
						} else {
							i = number;
						}
					}
				}
				if (s.text.indexOf("\n", 0) == 1) {
					minusEnd = minusEnd + 2;
				}
				start = start - minus;
				end = end - minusEnd;
				return { start: start, end: end, text: s.text, length: end - start };
			}
			return false;
		} else if (typeof(input.selectionStart) == "number" && //MOZILLA support
				input.selectionStart != input.selectionEnd) {
			start = input.selectionStart;
			end = input.selectionEnd;
			part = input.value.substring(input.selectionStart, input.selectionEnd);
			return { start: start, end: end, text: part, length: end - start };
		} else { return { start: undefined, end: undefined, text: undefined, length: undefined }; }
	},

	// function for the replacement of the selected text
	replaceSelection: function(inputStr) {
		var input = this.jquery ? this[0] : this; 
		//part for IE and Opera
		var start;
		var end;
		var position = 0;
		var rc;
		var re;
		var number = 0;
		var minus = 0;
		if (document.selection && typeof(input.selectionStart) != "number") {
			var s = document.selection.createRange();
			
			// IE support
			if (typeof(input.selectionStart) != "number") { // return null if the selected text not from the needed area
				var firstRe;
				var secondRe;
				re = input.createTextRange();
				rc = re.duplicate();
				firstRe = re.text;
				re.moveToBookmark(s.getBookmark());
				secondRe = re.text;
				rc.setEndPoint("EndToStart", re);
				if (firstRe == secondRe && firstRe != s.text) {
					return this;
				}
			}
			if (s.text) {
				
			
				
				part = s.text;
				if (input.value.match(/\n/g) != null) {
					number = input.value.match(/\n/g).length;// number of EOL simbols
				}
				// IE support
				start = rc.text.length; 
								
				// remove all EOL to have the same start and end positons as in MOZILLA
				if (number > 0) {
					for (var i = 0; i <= number; i++) {
						var w = input.value.indexOf("\n", position);
						if (w != -1 && w < start) {
							position = w + 1;
							minus++;
							
						} else {
							i = number;
						}
					}
				}
				
				
				
				s.text = inputStr;
				caretPositionAmp = rc.text.length + inputStr.length;
				re.move("character", caretPositionAmp);
				document.selection.empty();
				input.blur();
			}
			return this;
		} else if (typeof(input.selectionStart) == "number" && // MOZILLA support
				input.selectionStart != input.selectionEnd) {
			
			start = input.selectionStart;
			end = input.selectionEnd;
			input.value = input.value.substr(0, start) + inputStr + input.value.substr(end);
			position = start + inputStr.length;
			input.setSelectionRange(position, position); 
			return this;
		}
		return this;
	},
	
	// RKT - modified
	// insert text at current caret position
	insertAtCaretPos: function(text) {
		return this.each(function(){
			var $this = $(this);
			if (document.selection) { //IE
				$this.focus();
				sel = document.selection.createRange();
				sel.text = text;
				$this.focus();
			} else if (this.selectionStart || this.selectionStart == '0') { // Mozilla
				var leftPosition = this.selectionStart;
				var rightPosition = this.selectionEnd;
				var scrollTop = this.scrollTop;
				$this.val( this.value.substring(0, leftPosition)+ text + $this.val().substring(rightPosition, $this.val().length) );
				$this.focus();
				this.selectionStart = leftPosition + text.length;
				this.selectionEnd = leftPosition + text.length;
				this.scrollTop = scrollTop;
			} else { // default
				this.value += text;
				$this.focus();
			}
		});
	},	

	
	// Set caret position
	setCaretPos: function(inputStr) {

		var input = this.jquery ? this[0] : this; 
		var s;
		var re;
		var position;
		var number;
		var minus = 0;
		var w;
		input.focus();
		if (parseInt(inputStr) == 0) {
			return this;
		}
		if (parseInt(inputStr) > 0) {
			inputStr = parseInt(inputStr) - 1;
			if (document.selection && typeof(input.selectionStart) == "number" && input.selectionStart == input.selectionEnd) {
				if (input.value.match(/\n/g) != null) {
					number = input.value.match(/\n/g).length;// number of EOL simbols
				}
				if (number > 0) {
					for (var i = 0; i <= number; i++) {
						w = input.value.indexOf("\n", position);
						if (w != -1 && w <= inputStr) {
							position = w + 1;
							inputStr = parseInt(inputStr) + 1;
						} 
					}
				}
			}
		} 
		else if (parseInt(inputStr) < 0) {
			inputStr = parseInt(inputStr) + 1;
			if (document.selection && typeof(input.selectionStart) != "number") {
				inputStr = input.value.length + parseInt(inputStr);
				if (input.value.match(/\n/g) != null) {
					number = input.value.match(/\n/g).length;// number of EOL simbols
				}
				if (number > 0) {
					for (var i = 0; i <= number; i++) {
						w = input.value.indexOf("\n", position);
						if (w != -1 && w <= inputStr) {
							position = w + 1;
							inputStr = parseInt(inputStr) - 1;
							minus += 1;
						} 
					}
					inputStr = inputStr + minus - number;
				}
			} else if (document.selection && typeof(input.selectionStart) == "number") {
				inputStr = input.value.length + parseInt(inputStr);
				if (input.value.match(/\n/g) != null) {
					number = input.value.match(/\n/g).length;// number of EOL simbols
				}
				if (number > 0) {
					inputStr = parseInt(inputStr) - number;
					for (var i = 0; i <= number; i++) {
						w = input.value.indexOf("\n", position);
						if (w != -1 && w <= (inputStr)) {
							position = w + 1;
							inputStr = parseInt(inputStr) + 1;
							minus += 1;
						} 
					}
				}
			} else { inputStr = input.value.length + parseInt(inputStr); }
		} else { return this; }
		// IE
		if (document.selection && typeof(input.selectionStart) != "number") {
			s = document.selection.createRange();
			if (s.text != 0) {
				return this;
			}
			re = input.createTextRange();
			re.moveToBookmark(s.getBookmark());
			re.move("character", inputStr);
			re.select();
			s = document.selection.createRange();
			s.text = ""; 
			caretPositionAmp = inputStr;
			input.focus();
			
			return this;
		} else	if (typeof(input.selectionStart) == "number" && // MOZILLA support
				input.selectionStart == input.selectionEnd) {
			input.setSelectionRange(inputStr, inputStr); 
			return this;
		}
		return this;
		
	},	
	
	
	
	
	countCharacters: function(str) {
		var input = this.jquery ? this[0] : this;
		if (input.value.match(/\r/g) != null) {
			return input.value.length - input.value.match(/\r/g).length;
		}
		return input.value.length;
	},

	setMaxLength: function(max, f) {
		this.each(function() {
			var input = this.jquery ? this[0] : this;
			var type = input.type;
			var isSelected;	
			var maxCharacters;
			// remove limit if input is a negative number
			if (parseInt(max) < 0) {
				max=100000000;
			}
			if (type == "text") {
				input.maxLength = max;
			}
			if (type == "textarea" || type == "text") {
				input.onkeypress = function(e) {
					var spacesR = input.value.match(/\r/g);
					maxCharacters = max;
					if (spacesR != null) {
						maxCharacters = parseInt(maxCharacters) + spacesR.length;
					}
					// get event
					var key = e || event;
					var keyCode = key.keyCode;
					// check if any part of text is selected
					if (document.selection) {
						isSelected = document.selection.createRange().text.length > 0;
					} else {
						isSelected = input.selectionStart != input.selectionEnd;
					}
					if (input.value.length >= maxCharacters && (keyCode > 47 || keyCode == 32 ||
							keyCode == 0 || keyCode == 13) && !key.ctrlKey && !key.altKey && !isSelected) {
						input.value = input.value.substring(0,maxCharacters);
						if (typeof(f) == "function") { f() } //callback function
						return false;
					}
				}
				input.onkeyup = function() { 
					var spacesR = input.value.match(/\r/g);
					var plus = 0;
					var position = 0;
					maxCharacters = max;
					if (spacesR != null) {
						for (var i = 0; i <= spacesR.length; i++) {
							if (input.value.indexOf("\n", position) <= parseInt(max)) {
								plus++;
								position = input.value.indexOf("\n", position) + 1;
							}
						}
						maxCharacters = parseInt(max) + plus;
					} 
					if (input.value.length > maxCharacters) {  
						input.value = input.value.substring(0, maxCharacters); 
						if (typeof(f) == "function") { f() }
						return this;
					}
				}
			} else { return this; }
		})
		return this;
	},
	
	setSelection: function(start, end) {
		end = end || start;
		if(this[0] && this[0].setSelectionRange) {
		      this[0].focus();
		      this[0].setSelectionRange(start, end);
		} else if(this[0] && this[0].createTextRange) {
		      var range = this[0].createTextRange();
		      range.collapse(true);
		      range.moveEnd('character', end);
		      range.moveStart('character', start);
		      range.select();
		}
			
		return this;
	}

}); 