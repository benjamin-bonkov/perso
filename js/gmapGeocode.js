function getLatLong(address){
      var geo = new google.maps.Geocoder;

      geo.geocode({'address':address},function(results, status){
              if (status == google.maps.GeocoderStatus.OK) {
                return results[0].geometry.location;
              } else {
                alert("Geocode was not successful for the following reason: " + status);
              }

       });

  }

/* pos = new google.maps.LatLng(lat,lng); */
function getCity(pos){
	var geo = new google.maps.Geocoder;
	geo.geocode({'location':pos},function(results, status){
		if (status == google.maps.GeocoderStatus.OK) {
			console.log(results[3].address_components[0].long_name);
			return results[3].address_components[0].long_name;
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}

	});

}