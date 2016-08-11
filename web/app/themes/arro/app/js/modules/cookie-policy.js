var cookiePolicy = (function($) {
	var self = this;

	var init = function() {
		var hasCookie = Cookies.get('cookieAccept');

		if (!hasCookie) {
			$('.b-cookie-policy').show();
			_bind();
		}
	};

	var _bind = function() {
		var cookieHeight = $('.b-cookie-policy').outerHeight();
		var mastheadHeight = $('.l-masthead').outerHeight();

		$('.l-masthead').addClass('cookie-active');

		if ($('.l-hero').length) {
			$('.l-hero').addClass('cookie-active');
		} else {
			$('.l-page-section').eq(0).addClass('cookie-active');
		}

		$('.l-masthead.cookie-active').css('top', cookieHeight+'px');

		if ($('.l-hero').length) {
			$('.l-hero.cookie-active').css('margin-top', (cookieHeight+mastheadHeight)+'px');
		} else {
			$('.l-page-section.cookie-active').css({
				'margin-top': (cookieHeight+mastheadHeight)+'px',
				'padding-top': 0
			});
		}

		$('.js-cookie-policy').on('click', function(event) {
			event.preventDefault();
			Cookies.set('cookieAccept', true);
			$('.l-masthead').removeClass('cookie-active');

			if ($('.l-hero').length) {
				$('.l-hero').removeClass('cookie-active');
			} else {
				$('.l-page-section.cookie-active').removeClass('cookie-active');
			}

			$('.l-masthead').css('top', 0);


			if ($('.l-hero').length) {
				$('.l-hero').css('margin-top', mastheadHeight);
			} else {
				$('.l-page-section').eq(0).css('margin-top', mastheadHeight);
			}

			$('.b-cookie-policy').hide();
		});
	};

	return {
		init: init
	};

})(jQuery);

jQuery(document).ready(function($) {
	cookiePolicy.init();
});
