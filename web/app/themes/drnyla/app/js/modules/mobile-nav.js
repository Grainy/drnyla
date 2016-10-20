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

		$('.js-burger-icon-subnav').on('click', function() {
			$('.l-masthead__nav--mobile-subnav').removeClass('menu-active');
		});

		$(document).on('click', '.l-masthead__nav--mobile-primary-items .menu-item-has-children', function(event) {
			if (!$(event.target).hasClass('js-sub-item')) {
				event.preventDefault();
				$(this).next('.l-masthead__nav--mobile-subnav').addClass('menu-active');
			}
		});
	};

	return {
		init: init
	};

})(jQuery);

