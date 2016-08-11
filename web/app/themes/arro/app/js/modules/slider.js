var slider = (function($) {
	var self = this;

	var init = function() {
		_slider();
	};

	var _slider = function() {
		var touch;

		$('.l-hero__slide').addClass('animate');

		if ($('.slide-content').length > 1) {
			touch = true;
		} else {
			touch = false;
		}

		$('.flexslider').flexslider({
			animation: "slide",
			autoplay: false,
			touch: touch,
			controlNav: false,
			directionNav: false,
			nextText: '',
			prevText: '',
		});

		$('.hero-button--prev').on('click', function() {
			$('.flexslider').flexslider('prev');
		});

		$('.hero-button--next').on('click', function() {
			$('.flexslider').flexslider('next');
		});

		$('.js-testimonial-slider').slick({
			autoplay: true,
			autoplaySpeed: 5000,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: '.js-testimonial-image-slider',
			appendArrows: $('.b-testimonial-block .js-control-container'),
			prevArrow: '<button type="button" class="slick-prev"></button>',
			nextArrow: '<button type="button" class="slick-next"></button>'
		});

		$('.js-testimonial-image-slider').slick({
			autoplay: true,
			autoplaySpeed: 5000,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: '.js-testimonial-slider',
			arrows: false,
			fade: true,
			cssEase: 'linear',
		});
	};

	return {
		init: init
	};

})(jQuery);
