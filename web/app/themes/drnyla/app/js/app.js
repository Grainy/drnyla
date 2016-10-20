var boilerAPP = (function($) {
	var self = this;

    this.resizeCooldown = true;

    this.settings = {
        screenWidth: 0,
        screenHeight: 0,
        videoCapabilities: true,
        screenSize: 'desk',
        homeExpanded: false,
        isAnimating: false,
        modalOpen: false,
        mousewheelSet: false,
        debug: false,
        isOpen: false,
        isCareersOpen: false,
        isSnapped: false
    };

    this.domElements = {
        body: $('body'),
        blogPost: $('.l-blog-detail'),
        vidModal: $("#vid-modal"),
        footer: $(".l-footer")
    };

	var init = function() {
		_bindEvents();
		_headroom();
		_fancySelect();
		_hacky();
		_search();
		_offsetTop();

		if ($('.l-single-post__sidebar').length > 0) {
			_stickyBlock($('.l-single-post__sidebar'));
		}

		$(window).scroll(function() {
			_parallax();
		});
	};

	var _offsetTop = function() {
		var contentHeight = $('.l-home__intro--content').outerHeight();
		var gridHeight = $('.l-home__intro--grid').outerHeight();

		console.log(contentHeight);
		console.log(gridHeight);

		$('.l-home__intro--content').css('top', '-39px');
	};

	var _bindEvents = function() {
		$('.js-match-height').matchHeight();

		$('.js-back-button').on('click', function(event) {
			event.preventDefault();
			parent.history.back();
			return false;
		});

		$('[data-link]').on('click', function() {
			window.location = $(this).data('link');
		});

		$('select[name="secondary-nav"]').fancySelect().on('change.fs', function() {
			var sectorField = $('select[name="secondary-nav"]'),
				chosenLink = sectorField.val();

			window.location = chosenLink;
		});

		var rowLength = $('.l-archive .row').length;

		$('.l-archive .row').eq(rowLength-1).css('margin-bottom', 0);
	};

	var _headroom = function() {
		$('header').headroom({
		  "offset": 125,
		  tolerance : {
		      up : 50,
		      down : 0
		  },
		  "classes": {
		    "initial": "animated",
		    "pinned": "slideDown",
		    "unpinned": "slideUp"
		  }
		});
	};

	var _fancySelect = function() {

		
		$(document).bind('gform_pre_submission', function(){
			console.log('fuck you');
		});

		$(document).bind('gform_post_render', function(){
			$('input[type=file]').customFile();
			$('select').fancySelect();
		});

		$('select').fancySelect();
	};

	var _hacky = function() {
		var curHeight = $('.js-has-map').outerHeight();
		var mapHeight = $('.l-help__sidebar--map').outerHeight();

		var totHeight = curHeight + mapHeight - 29;

		$('.js-has-map').css('height', totHeight);
	};

	var _search = function() {
		var isOpening;

		$('body').on('click', function(event) {
			if ($('form.search').hasClass('active') && !isOpening && !$(event.target).hasClass('searchTerm')) {
				$('form.search').removeClass('active');
			}
		});

		$('.icon-search').on('click', function(event) {
			event.preventDefault();

			isOpening = true;

			$('form.search').toggleClass('active');
			$('input.searchTerm').focus();

			setTimeout(function() {
				isOpening = !isOpening;
			}, 1000);
		});
	};

	var _parallax = function() {
		scrollPos = $(this).scrollTop();

		$('.l-hero__slide ').css({
			'background-position' : 'center ' + (scrollPos/4)+"px"
		});

		$('.l-hero__slide .ab-center').css({
			'margin-top': (scrollPos/4)+"px",
			'opacity': 1-(scrollPos/500)
		});
	};

	var _stickyBlock = function($el) {
		var lastScrollTop = 0;
		var distance = $el.offset().top;
		var $window = $(window);

		distance = distance - 63;

		$window.scroll(function() {
			var st = $(this).scrollTop();
			if (st > lastScrollTop){
				if ( $window.scrollTop() >= distance ) {
					//Scroll down - fixed
					$el.removeClass('up-fixed');
					$el.addClass('down-fixed');
				} else {
					//Scroll down - unfixed
					$el.removeClass('up-fixed');
					$el.removeClass('down-fixed');
				}
			} else {
				if ( $window.scrollTop() >= (distance - 125)) {
					//Scroll up - fixed
					$el.removeClass('down-fixed');
					$el.addClass('up-fixed');
				} else {
					//Scroll up - unfixed
					$el.removeClass('down-fixed');
					$el.removeClass('up-fixed');
				}
			}
			lastScrollTop = st;
		});
	};

	// ==== SCRIPTS ==== //
	return {
		init: init
	};
})(jQuery);
