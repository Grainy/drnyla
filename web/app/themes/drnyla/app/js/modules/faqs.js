var faqs = (function($) {
	var self = this;

	var init = function() {
		_bind();
	};

	var _toggleDisplay = function($this, el, $el) {
		if ($this.siblings(el).is(':visible')) {
			$this.removeClass('active');
			$this.siblings(el).slideUp();
		} else {
			$('.l-archive-conditions__condition h3').removeClass('active');
			$(el).slideUp();
			$this.addClass('active');
			$this.siblings(el).slideDown();
		}
	};

	var _bind = function() {
		$('.l-archive-conditions__condition h3').on('click', function(e) {
			_toggleDisplay($(this), '.l-archive-conditions__condition--content');
		});
	};

	return {
		init: init
	};

})(jQuery);
