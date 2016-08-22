var faqs = (function($) {
	var self = this;

	var init = function() {
		_bind();
	};

	var _bind = function() {
		$('.faq section > .title').on('click', function(e) {
			if ($(this).siblings('.qanda').is(':visible')) {
				$(this).removeClass('hidePlus');
				$(this).siblings('.qanda').slideUp();
			} else {
				$('.qanda').slideUp();
				$('.title').removeClass('hidePlus');
				$(this).addClass('hidePlus');
				$(this).siblings('.qanda').slideDown();
			}
		});

		$('.question').on('click', function(e) {
			if ($(this).siblings('.answer').is(':visible')) {
				$(this).removeClass('active');
				$(this).siblings('.answer').slideUp();
			} else {
				$('.answer').slideUp();
				$('.question').removeClass('active');
				$(this).addClass('active').siblings('.answer').slideDown();
			}
		});
	};

	return {
		init: init
	};

})(jQuery);

faqs.init();
