var footer = (function($) {
	var self = this;

	var init = function() {
		_bind();
	};

	var _bind = function() {
		$('.l-mobile-footer__section').on('click', function(event) {
			$(this).toggleClass('active');

			$(this).find('ul').slideToggle();
		});
	};

	return {
		init: init
	};

})(jQuery);
