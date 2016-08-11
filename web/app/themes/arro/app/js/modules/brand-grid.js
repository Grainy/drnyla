var brandGrid = (function($) {
	var self = this;

	var init = function() {
		_bind();
	};

	var _bind = function() {
		$('.b-brand-grid__module--background').hover(function() {
			$(this).addClass('blur');
			$(this).siblings('.b-brand-grid__module--content').find('.js-hover').removeClass('hide');
		}, function() {
			$(this).removeClass('blur');
			$(this).siblings('.b-brand-grid__module--content').find('.js-hover').addClass('hide');
		});
		$('.b-brand-grid__module--content').hover(function() {
			$(this).siblings('.b-brand-grid__module--background').addClass('blur');
			$(this).find('.js-hover').removeClass('hide');
		}, function() {
			$(this).siblings('.b-brand-grid__module--background').removeClass('blur');
			$(this).find('.js-hover').addClass('hide');
		});
	};

	return {
		init: init
	};

})(jQuery);
