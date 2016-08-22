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
