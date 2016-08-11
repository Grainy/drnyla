var singleResource = (function($) {
	var self = this;

	var init = function() {
		if ($(window).width() >= 480) {
			_sizing();
		}

		$(window).resize(function() {
			if ($(window).width() >= 480) {
				_sizing();
			}
		});
	};

	var _sizing = function() {
		var conWidth = $('.js-sizer').eq(0).outerWidth();
		var catWidth = $('.js-sizer .b-related-resource__post--category').eq(0).outerWidth();
		var detWidth = conWidth - catWidth;
		var conHeight = $('.b-related-resource__post').eq(0).outerHeight();
		var detHeight = (conHeight-30) / 2;

		$('.js-sizer .b-related-resource__post--details').css('width', detWidth-1);
		$('.js-sizer').css('height', detHeight);
		$('.js-sizer .b-related-resource__post--category').css('min-height', detHeight);
	};

	return {
		init: init
	};

})(jQuery);

