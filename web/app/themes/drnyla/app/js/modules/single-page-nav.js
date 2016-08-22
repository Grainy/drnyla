var singlePageNav = (function($) {
	var self = this;

	var init = function() {
		if ($(window).width() >= 768) {
			_animate();
		}

		_smoothScroll();
	};

	var _animate = function() {
		var $el = $('.b-about-section__nav');
		var offset = $el.offset();
		var lastScrollTop = 0;
		var delta = 0;

		$(window).scroll(function() {
			var curTop = $(window).scrollTop();

			if (curTop >= offset.top) {
				$el.addClass('fixed');
			} else {
				$el.removeClass('fixed');
			}

			if(Math.abs(lastScrollTop - curTop) >= delta){
				if (curTop > lastScrollTop){
					$el.css('transform', 'translate(0, 0px)');
				} else {
					if ($el.hasClass('fixed')) {
						$el.css('transform', 'translate(0, 80px)');
					} else {
						$el.css('transform', 'translate(0, 0px)');
					}
				}
			}

			lastScrollTop = curTop;
		});
	};

	var _smoothScroll = function() {
		$('a[href*=\\#]:not([href=\\#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

				if (target.length) {
					var offsetVal = target.offset().top;
						offsetVal = offsetVal - 210;

					$('html,body').animate({
						scrollTop: offsetVal
					}, 1000);

					return false;
				}
			}
		});
	};

	return {
		init: init
	};

})(jQuery);
