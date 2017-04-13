/**
 * Copyright 2013 Resonate KT Limited
 *  
 * @projectDescription	Used by the webreports editor (webreports-editview.html).
 *
 * @author		Christopher Meyer cmeyer@resonatekt.com
 * @version		1.0.1
 */
 
 $(function () {
	// todo - IE6 fail
	// todo - resizing textarea
	$('input.validationButton').click(function () {
		$(".errorpane").remove();
	
		var $textarea = $('textarea.valueEditable');
		var reportView = $('#webreports-header').val() + '[LL_WEBREPORT_STARTROW /]' + $('#webreports-row').val() + '[LL_WEBREPORT_ENDROW /]' + $('#webreports-footer').val();
		var handler = function (errors) {
			if (errors.length == 0) {
				$('textarea.valueEditable').linedtextarea('destroy');

				$.jGrowl( webreportStr["YourReportPassedValidation"] );
				
			} else {
				$('textarea.valueEditable').linedtextarea().linedtextarea('removehighlights');
				
				$.each(errors, function (index, error) {
					// error.section
					// error.description
					// error.rowNumber
					// error.tag
					if (error.rowNumber == 0) {
						if ( error.section ) {
							//alert("Section: " + error.section + "\n\n" + error.description)
							alert(String.format( webreportStr["Section1nn2"] , error.section, error.description))
						} else {
							alert( error.description )
						};
					} else {
						var $sectionTextArea = $('#webreports-' + error.section);
							
						$sectionTextArea.linedtextarea('highlightline', error.rowNumber);

						var $div = $sectionTextArea.closest('div.linedwrap');

						$div.find('div.lineno[ref="' + error.rowNumber + '"]').attr('title', error.tag + "|" + error.description).cluetip({
							splitTitle: '|',
							positionBy: 'bottomTop'
						});
					};
				});
				
				$.jGrowl( webreportStr["YourReportContainsErrors"] );
				 
				$('#wreditor tr.section td.label').unbind();
			};
		};

		$.post($.LL.getCGI() + '/rkt/webreports/validate.html', {reportView: reportView}, handler, 'json');

		return false;
	});
});