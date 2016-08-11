var videoOverlay = (function($) {
	var self = this;

	var init = function() {
		_bind();
	};

	var _playVideo = function(id) {
		$('.l-video-overlay__video').attr('src','https://www.youtube.com/embed/'+id+'?autoplay=1');
	};

	var _bind = function() {
		$('[data-video-url]').on('click', function(event) {
			event.preventDefault();
			var thisID = $(this).data('video-url');

			$('.l-video-overlay').addClass('active');
			$('body').addClass('disabled');

			_playVideo(thisID);
		});

		$('body').on('click', '.js-video-close', function() {
			$('.l-video-overlay__video').attr('src','');
			$('.l-video-overlay').removeClass('active');
			$('body').removeClass('disabled');
		});
	};

	return {
		init: init
	};

})(jQuery);
