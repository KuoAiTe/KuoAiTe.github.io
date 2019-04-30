
function clearMarker(){
	for (var country_id in dataCountry){
		var marker = dataCountry[country_id].marker;
		marker.setMap(null);
		google.maps.event.clearInstanceListeners(marker);
	}
}

function addMarker(country_id){
	if (country_id in dataCountry){
		var marker = dataCountry[country_id].marker;
		marker.setMap(map);
			google.maps.event.addListener(marker,'click',function() {
				var contentString = '<h4 id="firstHeading" class="worldmap-item">' + dataCountry[country_id].name +'</h4>';
				if(currentScreen == 'worldMap')
					contentString = '<a href="javascript:void(0);">' + contentString + '</a>';
				
				infowindow = new google.maps.InfoWindow({
				  content: contentString
				});
				infowindow.open(map, marker);
		    map.setZoom(2.5);
		    map.setCenter(marker.getPosition());
		  });
	}
}

function addAllMarker(){
	for (var country_id in dataCountry)
		addMarker(country_id);
}

