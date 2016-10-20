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

// jQuery(document).ready(function($) {
// 	signUp.init();
// });
