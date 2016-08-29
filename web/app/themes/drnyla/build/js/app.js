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

var faqs = (function($) {
	var self = this;

	var init = function() {
		_bind();
	};

	var _toggleDisplay = function($this, el, $el) {
		if ($this.siblings(el).is(':visible')) {
			$this.removeClass('active');
			$this.siblings(el).slideUp();
		} else {
			$('.l-archive-conditions__condition h3').removeClass('active');
			$(el).slideUp();
			$this.addClass('active');
			$this.siblings(el).slideDown();
		}
	};

	var _bind = function() {
		$('.l-archive-conditions__condition h3').on('click', function(e) {
			_toggleDisplay($(this), '.l-archive-conditions__condition--content');
		});
	};

	return {
		init: init
	};

})(jQuery);

;(function($) {
	// Browser supports HTML5 multiple file?
	var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
		isIE = /msie/i.test( navigator.userAgent );

	$.fn.customFile = function() {
		return this.each(function() {

		var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
			$wrap = $('<div class="file-upload-wrapper">'),
			$input = $('<input type="text" class="file-upload-input" />'),
			// Button that will be used in non-IE browsers
			$button = $('<button type="button" class="file-upload-button">Choose File</button>'),
			// Hack for IE
			$label = $('<label class="file-upload-button" for="'+ $file[0].id +'">Choose File</label>');

			// Hide by shifting to the left so we
			// can still trigger events
			$file.css({
				position: 'absolute',
				left: '-9999px'
			});

			$wrap.insertAfter( $file ).append( $file, $input, ( isIE ? $label : $button ) );

			// Prevent focus
			$file.attr('tabIndex', -1);
			$button.attr('tabIndex', -1);

			$button.click(function () {
				$file.focus().click(); // Open dialog
			});

			$file.change(function() {
				var files = [], fileArr, filename;

				// If multiple is supported then extract
				// all filenames from the file array
		        if ( multipleSupport ) {
		        	fileArr = $file[0].files;

					for ( var i = 0, len = fileArr.length; i < len; i++ ) {
						files.push( fileArr[i].name );
					}

					filename = files.join(', ');

					// If not supported then just take the value
					// and remove the path to just show the filename
				} else {
					filename = $file.val().split('\\').pop();
				}

				$input.val( filename ) // Set the value
					.attr('title', filename) // Show filename in title tootlip
					.focus(); // Regain focus
			});

			$input.on({
				blur: function() { $file.trigger('blur'); },
				keydown: function( e ) {
					if ( e.which === 13 ) { // Enter
						if ( !isIE ) { $file.trigger('click'); }
					} else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
						// On some browsers the value is read-only
						// with this trick we remove the old input and add
						// a clean clone with all the original events attached
						$file.replaceWith( $file = $file.clone( true ) );
						$file.trigger('change');
						$input.val('');
					} else if ( e.which === 9 ){ // TAB
						return;
					} else { // All other keys
						return false;
					}
				}
			});
		});
	};

	// Old browser fallback
	if ( !multipleSupport ) {
		$( document ).on('change', 'input.customfile', function() {
			var $this = $(this);
				// Create a unique ID so we
				// can attach the label to the input
			var uniqId = 'customfile_'+ (new Date()).getTime();
			var $wrap = $this.parent();

			// Filter empty input
			var $inputs = $wrap.siblings().find('.file-upload-input').filter(function(){ return !this.value; });
			var $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

			// 1ms timeout so it runs after all other events
			// that modify the value have triggered
			setTimeout(function() {
				// Add a new input
				if ( $this.val() ) {
			    	// Check for empty fields to prevent
			    	// creating new inputs when changing files
					if ( !$inputs.length ) {
						$wrap.after( $file );
						$file.customFile();
					}
			        // Remove and reorganize inputs
				} else {
					$inputs.parent().remove();
					// Move the input so it's always last on the list
					$wrap.appendTo( $wrap.parent() );
					$wrap.find('input').focus();
				}
			}, 1);
		});
	}

}(jQuery));

jQuery('input[type=file]').customFile();

var footer = (function($) {
	var self = this;

	var init = function() {
		_bind();
	};

	var _bind = function() {
		$('.l-mobile-footer__section').on('click', function(event) {
			$(this).toggleClass('active');

			$(this).find('ul').slideToggle();
		});
	};

	return {
		init: init
	};

})(jQuery);

var map = (function($) {
	var map;
	var infowindow;

	// For each place found, create a marker
	var _callback = function(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				_createMarker(results[i]);
			}
		}
	};

	// Creating the marker
	var _createMarker = function(place) {
		var placeLoc = place.geometry.location;

		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location,
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(place.name);
			infowindow.open(map, this);
		});
	};

	var _loadMap = function() {
		var lat = map_location.lat;	// Get latitude from ACF
		var lng = map_location.lng;	// Get latitude from ACF
		var latlng = new google.maps.LatLng(lat, lng);	// Set latitude and longitude ready for map init

		// Init the map
		map = new google.maps.Map(document.getElementById('map-canvas'), {
			center: latlng,
			zoom: 16
		});

		//Set the main markers position for the map
		var marker = new google.maps.Marker({
			position: map.getCenter(),
			map: map,
		});

		// Set information window when marker is clicked
		infowindow = new google.maps.InfoWindow();
	};

	var init = function() {
		// if ($('#map-canvas').length > 0) {
			_loadMap();
		// }
	};

	return {
	    init: init
	};

})(jQuery);

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


var sharing = (function($) {
    'use strict';

    function init() {
        $('.js-fb-share').on('click', function(event) {
            event.preventDefault();
            _share();
        });
    }

    var _share = function() {
        var url = window.location.href;

        FB.ui({
          method: 'feed',
          link: url,
        }, function(response){});
    };

    return {
        init:init
    };
}(jQuery));

jQuery(document).ready(function($) {
    sharing.init();
});

var signUp = (function($) {
	var self = this;

	var init = function() {
		_bind();
		_validation();

		$('form').submit(function(event) {
			event.preventDefault();
			_submit(this);
		});
	};

	function _validateEmail($email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return emailReg.test( $email );
	}

	var _validation = function() {
		$('input').change(function() {
			if ($(this).hasClass('error') && $(this).val() !== '') {
				$(this).removeClass('error');
				$(this).next('.error-message').hide();

				if ($(this).attr('type') == 'email' && !_validateEmail($(this).val())) {
					$(this).addClass('error');
					$(this).after('<p class="error-message">Invalid email format</p>');
				}
			} else if ($(this).hasClass('error') && $(this).val() === '' && $(this).attr('type') == 'email') {
				$(this).next('.error-message').hide();
				$(this).after('<p class="error-message">Email is required.</p>');
			}
		});
	};

	var _submit = function(thisForm) {
		var signup;

		if($("input#signup").is(':checked')) {
			signup = true;
		} else {
			signup = false;
		}

		var formData = {
			'name'   : $('input[name=name]').val(),
			'email'  : $('input[name=email]').val(),
			'sector' :  $('input[name=sector]:checked').val(),
			'signup' : signup
		};

		$.ajax({
			type     : 'POST',
			url      : Directory.url+'/process.php',
			data     : formData,
			dataType : 'json',
			encode   : true
		})

		.done(function(data) {
			if (data.success) {
				$('.l-form-overlay__inner--form').html('<div class="success-message text-center"><p>'+ data.message + '</p></div>');
			} else {
				$.each(data.errors, function(index, val) {
					if (!$('input[name="'+index+'"]').hasClass('error')) {
						$('input[name="'+index+'"]').addClass('error').after('<p class="error-message">'+ val +'</p>');
					}
				});

				$('input.error').eq(0).focus();
			}
		});
	};

	var _bind = function() {
		// $('.l-form-overlay').addClass('active');

		$(document).on('click', '.l-form-overlay.active', function(event) {
			event.stopPropagation();

			if ($(event.target).is('.l-form-overlay.active')) {
				$('.l-form-overlay').removeClass('active');
			}
		});

		$('.b-button--signup').on('click', function(event) {
			event.preventDefault();
			$('.l-form-overlay').addClass('active');
		});

		$('.js-form-close').on('click', function(event) {
			event.preventDefault();
			$('.l-form-overlay').removeClass('active');
		});
	};

	return {
		init: init
	};

})(jQuery);

jQuery(document).ready(function($) {
	signUp.init();
});

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

var treatments = (function($) {
	var self = this;

	var init = function() {
		_bind();
	};

	var _bind = function() {
		var posts_per_page = 3; // How many posts to show at once
		var page = 1; 			// Current page
		var loading = false;	// Is a request being made?
		var filter = null; 		// Filter posts by (default : null)
		var maxPages; 			// Amount of pages in archive
		var url; 				// URL to pass to ajax request
		var date; 				// Date of event cpt

		if (is_device) {
			posts_per_page = 3;
		}

		var load_posts = function(filter){
			if (loading === false) {
				loading = true;

				if (filter) {
					url = '/wp-json/posts?type='+post_type+'&filter[taxonomy]='+this_tax+'&filter[term]='+filter;
				} else {
					url = '/wp-json/posts?type='+post_type+'&filter[posts_per_page]='+posts_per_page+'&page='+page;
				}


				$.ajax( {
					type       : 'GET',
					url  	   : url,
					dataType   : 'json',

					beforeSend: function() {
						// Show loading gif
						$('.loading').show();
						$('.js-load-more').hide();
					},

					success: function ( data, textStatus, request ) {
						// Get amount of posts and divide by how many posts per page
						maxPages = request.getResponseHeader('X-WP-Total') / posts_per_page;

						// Hide loading gif
						$('.loading').hide();

						for (var i = 0; i < data.length; i++) {
							// Get first 20 words of content
							var excerpt = data[i].content.replace(/<\/?[^>]+>/gi, '');
								excerpt = excerpt.split(' ').slice(0,20).join(' ');

							// Format date
							if (data[i].acf.event_date) {
								date = moment(data[i].acf.event_date, "DD/MM/YYYY").format('MMMM Do YYYY');
							}

							$('.l-archive__row').append(
									'<div class="col-sm-4 l-archive__post l-archive__post--'+i+'">'+
										'<a href="'+ data[i].link +'">'+
											'<img src="'+ data[i].thumb_url +'" alt="" class="l-archive__post--thumb">'+
										'</a>'+
										'<div class="l-archive__post--container js-match-height">'+
											'<h4 class="l-archive__post--title"><a href="'+ data[i].link +'">'+ data[i].title +'</a></h4>'+
											(date ? '<p class="l-archive__post--date">'+ date +' at '+ data[i].acf.event_time+'</p>' : '') +
											'<p class="l-archive__post--excerpt">'+ excerpt +'</p>'+
											'<a href="'+ data[i].link +'" class="l-archive__post--link b-button b-button--secondary">Continue Reading</a>'+
										'</div>'+
									'</div>'
							);

							$('.l-archive__post--'+i).waypoint({
								offset: '90%',
								handler: function(direction) {
									$(this.element).addClass('animate');
								}
							});
						}

						$('.js-match-height').matchHeight();

						if(page === Math.ceil(maxPages)) {
							$('.js-load-more').hide();
						} else {
							$('.js-load-more').show();
						}

						page++;          // Increment page
						loading = false; // Request finished
					},

					error     : function(jqXHR, textStatus, errorThrown) {
						// Hide loading gif
						$('.loading').hide();
						console.log(jqXHR, textStatus, errorThrown);
					},
				});
			}
		};

		$('[data-cat]').on('click', function(event) {
			event.preventDefault();
			var thisCat = $(this).data('cat');
			var filter;

			// If all, show all posts
			if (thisCat === 'all') {
				filter = '';
			} else {
				filter = thisCat;
			}

			$('.l-archive__row').empty();

			//Reset pagination
			page = 1;

			load_posts(filter);
		});

		$('.js-archive-filter').on('change.fs', function () {
		    var thisCat = this.value;
		    var filter;

		    // If all, show all posts
		    if (thisCat === 'all') {
		    	filter = '';
		    } else {
		    	filter = thisCat;
		    }

		    $('.l-archive__row').empty();

		    //Reset pagination
		    page = 1;

		    load_posts(filter);
		});

		$(window).scroll(function() {
			if(page <= maxPages && $(window).scrollTop() + $(window).height() == $(document).height() && is_device === null) {
				load_posts(filter);
			}
		});

		$('.js-load-more').on('click', function(event) {
			event.preventDefault();
			maxPages = Math.ceil(maxPages);

			if(page <= maxPages) {
				load_posts(filter);
			}
		});


		load_posts(filter);
	};

	return {
		init: init
	};

})(jQuery);

var vidModal = (function($) {
    var $vidModal = $("#vid-modal");

    function init() {
        _bind();
    }

    var setupWistiaVidz = function(){
        $('.js-wistia-hero').each(function(e) {

            var wistiaID =  $(this).data('wistia-id'),
                videoFoamSetting =  $(this).data('video-foam');

            wistiaEmbed = Wistia.embed(wistiaID, {
                videoFoam: videoFoamSetting,
                autoPlay: true,
                controlsVisibleOnLoad: true,
                volumeControl: false,
                playbar: false,
                fullscreenButton: false,
                smallPlayButton: false,
                container: "wistia_hero_" + wistiaID,
                volume: 0,
                endVideoBehavior: "loop"
            });
        });

    };

    var revealVideoModalHandler = function(el){
        var videoSrc = $(el).attr('href');
        var wistiaID = $(el).data('wistia-id');
        var modalHTML = '<div id="wistia_' + wistiaID + '"' + ' class="wistia_embed">&nbsp;</div>';

        $('#vid-modal').addClass('animated');
        $('#vid-modal').find('.js-wistia-embed').html(modalHTML);

        wistiaEmbed = Wistia.embed(wistiaID, {
            autoPlay: true,
            controlsVisibleOnLoad: true,
            volumeControl: false,
            playbar: true,
            fullscreenButton: false,
            smallPlayButton: true
        });

        //close the video modal when play finishes
        wistiaEmbed.bind("end", function () {

            $('#vid-modal').removeClass('animated');
            setTimeout(function(){
                 $('#vid-modal').find('.js-wistia-embed').html("");
            }, 200);
        });

        return false;
    };

    var _bind = function() {
        $('.js-reveal-video-modal').each(function(){
            $(this).on("click", function(e) {
                var el = $(this);
                revealVideoModalHandler(el);
            });
        });

        $("#js-close-vid-modal").click(function(e) {
            //reset the video
            $('#vid-modal').removeClass('animated');
            setTimeout(function(){
                 $('#vid-modal').find('.js-wistia-embed').html("");
            }, 200);

            e.preventDefault();
        });
    };

    return {
        init: init,
        revealVideoModalHandler: revealVideoModalHandler,
        setupWistiaVidz: setupWistiaVidz
    };
}(jQuery));

jQuery(window).load(function($) {
    vidModal.init();

    if(jQuery('.js-wistia-hero').length){
        vidModal.setupWistiaVidz();
    }
});

var vidModal = (function($) {
    var $vidModal = $("#vid-modal");

    function init() {
        _bind();
    }

    var setupWistiaVidz = function(){
        $('.js-wistia-hero').each(function(e) {

            var wistiaID =  $(this).data('wistia-id'),
                videoFoamSetting =  $(this).data('video-foam');

            wistiaEmbed = Wistia.embed(wistiaID, {
                videoFoam: videoFoamSetting,
                autoPlay: true,
                controlsVisibleOnLoad: true,
                volumeControl: false,
                playbar: false,
                fullscreenButton: false,
                smallPlayButton: false,
                container: "wistia_hero_" + wistiaID,
                volume: 0,
                endVideoBehavior: "loop"
            });
        });

    };

    var revealVideoModalHandler = function(el){
        var videoSrc = $(el).attr('href');
        var wistiaID = $(el).data('wistia-id');
        var modalHTML = '<div id="wistia_' + wistiaID + '"' + ' class="wistia_embed">&nbsp;</div>';

        $('#vid-modal').addClass('animated');
        $('#vid-modal').find('.js-wistia-embed').html(modalHTML);

        wistiaEmbed = Wistia.embed(wistiaID, {
            autoPlay: true,
            controlsVisibleOnLoad: true,
            volumeControl: false,
            playbar: true,
            fullscreenButton: false,
            smallPlayButton: true
        });

        //close the video modal when play finishes
        wistiaEmbed.bind("end", function () {

            $('#vid-modal').removeClass('animated');
            setTimeout(function(){
                 $('#vid-modal').find('.js-wistia-embed').html("");
            }, 200);
        });

        return false;
    };

    var _bind = function() {
        $('.js-reveal-video-modal').each(function(){
            $(this).on("click", function(e) {
                var el = $(this);
                revealVideoModalHandler(el);
            });
        });

        $("#js-close-vid-modal").click(function(e) {
            //reset the video
            $('#vid-modal').removeClass('animated');
            setTimeout(function(){
                 $('#vid-modal').find('.js-wistia-embed').html("");
            }, 200);

            e.preventDefault();
        });
    };

    return {
        init: init,
        revealVideoModalHandler: revealVideoModalHandler,
        setupWistiaVidz: setupWistiaVidz
    };
}(jQuery));
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

jQuery(document).ready(function($) {
	// ==== FIRE THE APP ==== //
	boilerAPP.init();
	slider.init();
	mobileNav.init();
	footer.init();

	if ($('.b-brand-grid__module').length > 0) {
		brandGrid.init();
	}

	if ($('#map-canvas').length > 0) {
		map.init();
	}

	if ($('.b-about-section__nav').length > 0) {
		singlePageNav.init();
	}

	if ($('[data-video-url]').length > 0) {
		// videoOverlay.init();
		vidModal.init();

		if(jQuery('.js-wistia-hero').length){
		    vidModal.setupWistiaVidz();
		}
	}

	if ($('.l-archive-conditions__condition').length > 0) {
		faqs.init();
	}
});
