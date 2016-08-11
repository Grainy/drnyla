var mobileNav = (function($) {
	var self = this;
	var isAnimating;

	var init = function() {
		_bind();
	};

	var _bind = function() {
		$('.burger-icon').on('touchstart click', function() {
			if (!isAnimating) {
				$('.burger-icon, .js-mobile-nav').toggleClass('menu-active');
				$('header').toggleClass('animated');
				$('.has-dropdown').toggleClass('active');
			}

			isAnimating = !isAnimating;
		});
	};

	return {
		init: init
	};

})(jQuery);

