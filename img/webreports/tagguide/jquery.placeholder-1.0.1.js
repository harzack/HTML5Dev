/**
 * @license Copyright 2011 Resonate KT Limited
 */

jQuery.fn.extend({
	placeholder: function(pText, options) {	
		options = $.extend({
			clearOnEdit: true,
			editOnFocus: true,
			placeholderCSS: {'color':'gray','font-style':'italic'},
			normalCSS: {'color': 'black', 'font-style': 'normal'}
		}, options);
     
		return this.each(function () {		
			// if ( pText == $(this).val() ) {
			//	$(this).val('');
			// };
		
			$(this)
				.bind('placeholder.stopedit', function() {
					var $this = $(this);
	
					if ( ($this.val().length == 0) || (pText == $this.val()) ) {
						// $this.css('color', 'gray' ).css('font-style', 'italic').attr('title', pText).val(pText);
						$this.css(options.placeholderCSS).attr('title', pText).val(pText);
					} else {
						$this.css(options.normalCSS);
					};
				})
				.bind('placeholder.startedit', function() {
					var $this = $(this);
					
					$this.data('placeholder.value', $this.val() );
					
					if ( $this.val() == pText ) {
						if (options.clearOnEdit) {
							$(this).val('');
						};
					};
					
					$this.css(options.normalCSS);
				})
				.keydown(function(e) {
					if ( options.editOnFocus == false ) {
						var $this = $(this);
						
						if ( $this.val() == pText ) {
							$this.trigger('placeholder.startedit');
						};
					};
				})
				.keyup(function(e) {
					if (e.which == 27) { // ESC
						var $this = $(this);
						$this.val( $this.data('placeholder.value') ).blur();
					};
				})			
				.focus(function(e) {
					if ( options.editOnFocus ) {
						$(this).trigger('placeholder.startedit');
					};
				})
				.blur(function(e) {
					$(this).trigger('placeholder.stopedit');
				})
				.val('')
				.trigger('placeholder.stopedit');
		});
	}
});