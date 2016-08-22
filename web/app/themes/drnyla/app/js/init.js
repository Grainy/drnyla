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
		videoOverlay.init();
	}
});
