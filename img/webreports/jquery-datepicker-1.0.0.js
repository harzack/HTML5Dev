/**
 * @license Copyright 2011 Resonate KT Limited  
 *
 * @author		Christopher Meyer cmeyer@resonatekt.com
 * @version		1.0.0  
 */
 
(function ($) {
	// default options
	var defaults = {
		showsTime: true,
		disableMinutes: false,
		onUpdate: function(cal) {}
	};

	var methods = {
		init: function(options) {
			var opts = $.extend({}, defaults, options);
						
			opts.onLaunch = function(cal) {
				if ( opts.disableMinutes ) {
					$(cal.element).find('span.minute').html('00').hide().after(
						$('<span></span>').html('00').addClass('minute')
					);				
				};
			};
			
			// hits all of them.. error
			
			return $(this).each(function() {
				opts.target = this;		
				return $(this).dynDateTime( opts );
			});			
		}
	};

	$.fn.datepicker = function(method, options) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		};
	};
})(jQuery);