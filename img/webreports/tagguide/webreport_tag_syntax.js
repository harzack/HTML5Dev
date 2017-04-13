/**
 * Copyright 2011-2013 Resonate KT Limited
 *  
 * @projectDescription	Used by the webreports tagguide
 * @version		1.0.3
 */

/**
 * Filtering
 */
$(function () {
	$('input.filter').keyup(function () {
	
		// #3589 AS 2012.11.09
		//var value = $(this).val();
		var value = $(this).val().replace( /\[/g, "" ).replace( /\]/g, "" );
		
		var r = new RegExp("(" + value + ")", ["i"]);

		$('table.tagguide > tbody > tr').each(function () {
			var match = $(this).stripTags().match(r);

			if ($(this).stripTags().match(r) == null) {
				$(this).hide();
			} else {
				$(this).show();
			};
		});
		
		return false;
	}).placeholder('Shortcut - /');
	
	$('table.tagguide > tbody > tr').dblclick(function() {	
		$('tr.highlight').removeClass('highlight');
		$(this).addClass('highlight').find('div.short, div.long').toggle();	
	});

	$(document).keypress(function(e) {
		// 47 is the slash key
		if (e.which == 47) {
		
			// #3589 AS 2013.03.01
			//$('input.filter').val('').focus();
			$('input.filter').focus();
			
			return false;
		};
	});
	
	$('a.seealso').click(function() {
		var id = $(this).attr('href');

		$('tr.highlight').removeClass('highlight');

		var $tr = $(id).closest('tr').show().addClass('highlight');
		$tr.find('.long').show();
		$tr.find('.short').hide();
	});
	
	$('.expandCollapse').click(function() {
		if ( $(this).hasClass('collapsed') ) {
			$('.expandCollapse').val('Collapse All').removeClass('collapsed');
			$('.long').show();
			$('.short').hide();
		} else {
			$('.expandCollapse').val('Expand All').addClass('collapsed');
			$('.long').hide();
			$('.short').show();
		};
	});	
});

$(function () {

	// Enable copy to clipboard, if available
	if (window.clipboardData) {
		$('table.draggableParameters').each(function () {
			var $subTagImg = $(this).closest('tr').find('img.draggable');
			var src = $subTagImg.attr('src');

			$(this).find('tr').each(function () {
				var $td = $(this).find('td:first');
				
				// #3163 AS 2012.03.30
				if ( ! ( $td.hasClass("NotDraggable" )) ) {
				
					var $img = $('<img/>', {
						src: src,
						alt: $td.text(),
						className: 'draggable'
					});

					$td.prepend($img);
				};
			});
		});
		
		$('img.draggable').click(function () {
			window.clipboardData.setData("Text", $(this).attr('alt').trim());
		}).bind('dragstart', function () {
			window.event.dataTransfer.setData('Text', $(this).attr('alt').trim());
		});
		
	} else {
		$('img.draggable').remove();
	};
		
});