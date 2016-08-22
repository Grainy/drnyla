var faqs = (function($) {
	var self = this;

	var init = function() {
		_bind();
	};

	var _bind = function() {
		$('.l-archive-conditions__condition h3').on('click', function(e) {
			if ($(this).siblings('.l-archive-conditions__condition--content').is(':visible')) {
				$(this).removeClass('active');
				$(this).siblings('.l-archive-conditions__condition--content').slideUp();
			} else {
				$('.l-archive-conditions__condition h3').removeClass('active');
				$('.l-archive-conditions__condition--content').slideUp();
				$(this).addClass('active');
				$(this).siblings('.l-archive-conditions__condition--content').slideDown();
			}
		});
	};

	return {
		init: init
	};

})(jQuery);
