
function data_init(data){
    print("data initialization");
    for ( var i=0; i < data.continent.length; i++){
        var continent = data.continent[i];
        var continent_id = continent.continent_id;
        var continent_name = continent.continent_name;
        var newContinentData = new Continent(continent_id,continent_name);
        dataContinent[continent_id] = newContinentData;
    }
    print("dataContinent:");
    print(dataContinent);
    for (var i=0; i< data.country.length; i++){
        var country = data.country[i];
		var country_id = country.country_id;
		var continent_id = country.continent_id;
		var country_name = country.country_name;
		var characteristicList = [];
		var latitude = parseFloat(country.latitude);
		var longitude = parseFloat(country.longitude);
		var resource_name = country.resourceName;
		var icon = {
			url:'./images/flags/'+resource_name+'.png',
			scaledSize: new google.maps.Size(25, 25), // scaled size
			origin: new google.maps.Point(0,0), // origin
			anchor: new google.maps.Point(0, 0) // anchor
		};

		var marker = new google.maps.Marker({ position: {lat: latitude, lng: longitude} ,
			icon:icon,
			title: country_name,
			map: null
		});
		var newCountryData = new Country(
			country_id,
			continent_id,
			country_name,
			resource_name,
			new LatLng(latitude, longitude),
			characteristicList,
			marker
		);
    dataCountry[country_id] = newCountryData;
	}
	print("dataCountry:");
	print(dataCountry);
	for (var i=0; i< data.category.length; i++){
		var category = data.category[i];
    var category_id = category.category_id;
    var category_name = category.category_name;
    dataCategory[category_id] =  category_name;
	}
	print("dataCategory");
	print(dataCategory);
	for (var i=0; i< data.behavior.length; i++){
    var behavior = data.behavior[i];
    var behavior_id = behavior.behavior_id;
    var category_id = behavior.category_id;
    var behavior_description = behavior.behavior_description;
    var newBehaviorData = new Behavior(behavior_id, category_id, behavior_description);
    dataBehavior[behavior_id] = newBehaviorData;
  }
  print("dataBehavior");
  print(dataBehavior);
  for( var continent_id in dataContinent){
  	for (var country_id in dataCountry){
  		var temp_continent_id = dataCountry[country_id].continent_id;
      var temp_country_data = dataCountry[country_id];
      if(continent_id == temp_continent_id){
      	if(!(continent_id in dataContinentToCountry))
      		dataContinentToCountry[continent_id] = [];
      	dataContinentToCountry[continent_id].push(temp_country_data);
      }
  	}
  }
  print("dataContinentToCountry");
  print(dataContinentToCountry);
	for (var i=0; i< data.characteristic.length; i++){
    var characteristic = data.characteristic[i];
    var characteristic_id = characteristic.characteristics_id;
    var behavior_id = characteristic.behavior_id;
    var characteristic_description = characteristic.characteristics_description;
    var newCharacteristicData = new Characteristic(characteristic_id, behavior_id, characteristic_description);
    dataCharacteristic[characteristic_id] = newCharacteristicData;
  }

  print("dataCharacteristic");
  print(dataCharacteristic);

	for (var i=0; i< data.nation_characteristic.length; i++){
    var nation_characteristic = data.nation_characteristic[i];
    var country_id = nation_characteristic.country_id;
    var characteristics_id = nation_characteristic.characteristics_id;
    var extra_description = nation_characteristic.extra_description;
    var hashKey = country_id + "-" + characteristics_id;
    if (country_id in dataCountry) {
        dataCountry[country_id].characteristicsList.push(characteristics_id);
        dataCharacteristic_Extra[hashKey] = extra_description;
    }
  }
  for ( var country_id in dataCountry){
  	var characteristicsList = dataCountry[country_id].characteristicsList;
  	characteristicsList = characteristicsList.sort(function(a, b){return dataCharacteristic[a].behavior_id - dataCharacteristic[b].behavior_id});
  }
}


function view_init(){
	// countryList
	var result = "";
	for( var continent_id in dataContinent){
		var continent = dataContinent[continent_id];
		var continent_name = continent.name;
		result += `<div class="continent">`;
		result += `<div class="bar-title bg-primary col-12 mb-3 text-center">` + continent_name + `</div>`;
		result += `<div class="country-container col-12 p-5">`;
		result += `<div class="row">`;
		for ( var country_id in dataCountry){
			var country = dataCountry[country_id];
			var country_continent_id = country.continent_id;
			var country_id = country.country_id;
			var country_name = country.name;
			var resource_name = country.resource_name
			if(country_continent_id == continent_id)
				result += `<div class="col-6 col-xs-4 col-sm-4 col-md-3 col-lg-2 col-xl-1">
										<div class="card country-card" country_id=`+country_id+`>
											<img class="country-flag card-img-top" src="images/flags/`+resource_name+`.png">
											<div class="country-body card-body text-center">
												<p class="country-name card-text">`+country_name+`</p>
											</div>
										</div>
									</div>`;
		}
		result += `</div> <!-- end row -->`;
		result += `</div> <!-- end container -->`;
		result += `</div> <!-- end country-container -->`;
		result += `</div> <!-- end continent -->`;
	}
	$('#continentList').append(result);
	// compareList
	result = '';
	for (var category_id in dataCategory){
		var category_name = dataCategory[category_id];
		result += `<a class="col-3 bg-white nav-item nav-link pt-1 pb-1" data-toggle="tab" href="#compare_`+category_id+`" role="tab" aria-controls="nav-home" aria-selected="true">`+category_name+`</a>`;
	}
	$('#comparePage_Tab').html(result);

	$('#compare').change(function() {
		compareMode = $(this).prop('checked');
		selectedCountries.clear();
		$('.country-card >img').removeClass('selected');
		if(compareMode){
			$('#compareHint').show();
			$('#submitButton').show();
		}else{
			$('#compareHint').hide();
			$('#submitButton').hide();
		}
  });
  $('#submitButton').click(function(){
  	if(selectedCountries.size >0 ){
			currentScreen = 'multiComparePage';
			var stateObj = { selectedCountries: selectedCountries, currentScreen: currentScreen };
			history.pushState(stateObj, "", "index.html");
			
			show_multiComparePage();
  	}
  });
}


function map_init(){
	var mapProp= {
		  center:new google.maps.LatLng(0,0),
		  zoom:1.9,
		};
  map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
	var opt = { minZoom: 1.9, maxZoom: 15 };
	map.setOptions(opt);
}
