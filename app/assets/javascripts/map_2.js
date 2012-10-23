var map;
var geocoder_start;
var geocoder_end;


function geocodePosition(pos, div_address, this_geocoder) {
  this_geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
      updateMarkerAddress(responses[0].formatted_address, div_address);
      country_to = responses[0].address_components[responses[0].address_components.length - 1].long_name;
      $('#' + div_address).trigger('custom'); 
    } else {
      updateMarkerAddress('Cannot determine address at this location.', div_address);
      country_to =  nil
    }
  });
}

function updateMarkerAddress(str, div_adr) {
  document.getElementById(div_adr).value = str;
}

function updateMarkerPosition(latLng, lat_div, lng_div) {
  document.getElementById(lat_div).value = latLng.lat();
  document.getElementById(lng_div).value = latLng.lng();
}


function non_draggable_marker(lat, lng) {
    var latLng = new google.maps.LatLng(lat, lng);
    var myOptions = {
      zoom: 7,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	   marker = new google.maps.Marker({
	      position: latLng, 
	      map: map, 
	      title:"You are here",
	      draggable: false
	  });
}

function initialize_no_map(lat, lng, adr_div) {
    var latLng = new google.maps.LatLng(lat, lng);
    geocodePosition(latLng, adr_div);
}

function initialize_start(lat, lng, div_id, div_lat, div_lng, adr_div) {
    var latLng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: 12,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var start_geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById(div_id), myOptions);
	  marker = new google.maps.Marker({
	      position: latLng,
	      map: map,
	      title:"You are here",
	      draggable: true
	  });

  //geocodePosition(latLng, adr_div);
  updateMarkerPosition(latLng, div_lat, div_lng);

	google.maps.event.addListener(map, "center_changed", function() {
		marker.setPosition(map.getCenter());
	});

	google.maps.event.addListener(map, "idle", function() {
		updateMarkerPosition(marker.getPosition(), div_lat, div_lng);
    start_geocoder.geocode({
      latLng: marker.getPosition()
    }, function(responses) {
      if (responses && responses.length > 0) {
        updateMarkerAddress(responses[0].formatted_address, adr_div);
        country_to = responses[0].address_components[responses[0].address_components.length - 1].long_name;
        $('#' + adr_div).trigger('custom'); 
      } else {
        updateMarkerAddress('Cannot determine address at this location.', adr_div);
        country_to =  nil
      }
    });

	});
}

function initialize_end(lat, lng, div_id, div_lat, div_lng, adr_div) {
    var latLng = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: 12,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var end_geocoder = new google.maps.Geocoder();
    var end_map = new google.maps.Map(document.getElementById(div_id), myOptions);
	  end_marker = new google.maps.Marker({
	      position: latLng,
	      map: end_map,
	      title:"You are here",
	      draggable: true
	  });

  //geocodePosition(latLng, adr_div);
  updateMarkerPosition(latLng, div_lat, div_lng);

	google.maps.event.addListener(end_map, "center_changed", function() {
		end_marker.setPosition(end_map.getCenter());
	});

	google.maps.event.addListener(end_map, "idle", function() {
		updateMarkerPosition(end_marker.getPosition(), div_lat, div_lng);
    end_geocoder.geocode({
      latLng: end_marker.getPosition()
    }, function(responses) {
      if (responses && responses.length > 0) {
        updateMarkerAddress(responses[0].formatted_address, adr_div);
        country_to = responses[0].address_components[responses[0].address_components.length - 1].long_name;
        $('#' + adr_div).trigger('custom'); 
      } else {
        updateMarkerAddress('Cannot determine address at this location.', adr_div);
        country_to =  nil
      }
    });
	});
}

