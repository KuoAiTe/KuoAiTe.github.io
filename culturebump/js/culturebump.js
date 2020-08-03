var VERBOSE = false;
var homeCountry_id = 0;
var cultureData = ''
var dataContinent = {};
var dataContinentToCountry = {};
var dataCategory = {};
var dataBehavior = {};
var dataCountry = {};
var dataCharacteristic = {};
var dataCharacteristic_Extra = {};
var currentScreen = 'home';
var selectedCountryID = 0;
var defaultZoomLevel = 1.8;
var flag_markers = {};
var infowindow = null;
var compareMode = false;
var selectedCountries = new Set();
var map;
$(function() {
	$.getJSON( "js/culturebump.json", function( data ) {
		map_init();
		data_init(data);
		view_init();
		$('#comparePage').hide();
		$('#detailPage').hide();
		$('#googleMap').hide();
		//$('#googleMap').hide();
		if(window.history.state)
			restoreContent(window.history);

	});
	window.addEventListener('popstate', restoreContent, false);
});
$( "#menu-item-home" ).click(function() {
	if(currentScreen != 'home'){
		currentScreen = "home";
		var stateObj = { currentScreen: currentScreen };
		history.pushState(stateObj, "", "index.html");
		show_home();
	}
});
$( "#menu-item-world" ).click(function() {
	if(currentScreen != 'worldMap'){
		currentScreen = 'worldMap';
		var stateObj = { currentScreen: currentScreen };
		history.pushState(stateObj, "", "index.html");
		show_worldmap();
	}
});

function restoreContent(e){
	var stateObj = e.state;
	console.log(stateObj);
	if(stateObj){
		currentScreen = stateObj.currentScreen;
		if(stateObj.selectedCountryID)
			selectedCountryID = stateObj.selectedCountryID;
		if(stateObj.selectedCountries)
			selectedCountries = stateObj.selectedCountries;
		if(currentScreen == 'home')
			show_home();
		else if (currentScreen == 'detailPage')
			show_country();
		else if (currentScreen == 'worldMap')
			show_worldmap();
		else if (currentScreen == 'multiComparePage')
			show_multiComparePage();
	}else{
		show_home();
	}
}
function show_multiComparePage(){
	$("#homePage").hide();
	$('#detailPage').hide();
	$('#googleMap').hide();
	$('#comparePage').show(300);
	// compareDetail
	result = '';
	for (var category_id in dataCategory){
		var category_name = dataCategory[category_id];
		result += `<div id="compare_`+category_id+`" class="tab-pane fade " role="tabpanel" aria-labelledby="nav-home-tab">`;
		for(var behavior_id in dataBehavior){
			var temp_category_id = dataBehavior[behavior_id].category_id;
			if(category_id == temp_category_id){
				var behavior_description = dataBehavior[behavior_id].behavior_id_description;
				result += `<div class="bar-title bg-primary col-12 mb-3">`+behavior_description+`</div>`;
				for (var country_id of selectedCountries){
					var characteristicsList = dataCountry[country_id].characteristicsList;
					for( var index in characteristicsList){
						var characteristic_id = characteristicsList[index];
						var temp_behavior_id = dataCharacteristic[characteristic_id].behavior_id;
						var characteristic_description = dataCharacteristic[characteristic_id].characteristic_description;
						if ( behavior_id == temp_behavior_id){
							var country_name = dataCountry[country_id].name;
							var resource_name = country_name.toLowerCase().replace(' ','_').replace('\'','_');
							result += `
									<div class="row pl-4 pr-4">
										<div class="col-4 col-xs-4 col-sm-4 col-md-3 col-lg-2 col-xl-1">
											<div class="card country-card" country_id="17">
												<img class="country-flag card-img-top" src="images/flags/`+resource_name+`.png">
												<div class="country-body card-body text-center">
													<p class="country-name card-text">`+country_name+`</p>
												</div>
											</div>
										</div>
										<div class="col-8 col-xs-8 col-sm-8 col-md-9 col-lg-10 col-xl-11">`+characteristic_description+`
										</div>
									</div>`;
							//result += `<div class="row"><div class="col-xl-1"><img class="country-flag" src="images/flags/></div><div class='col-9'>`+characteristic_description+`</div></div>`;
						}
					}
				}
			}
		}
		result += `</div>`;
	}
	$('#compare-tabContent').html(result);
	$('#comparePage_Tab a.nav-link:first').click();
	var link = $('#comparePage_Tab a.nav-link:first').attr('href');
	$(link).addClass('show active');
	console.log(link);
	console.log($('#comparePage_Tab').html());
	console.log($('#comparePage_Tab').children().html());
	console.log($('#comparePage_Tab').children().first().html());
}
function show_worldmap(){
	$("#homePage").hide();
	$('#detailPage').hide();
	$('#comparePage').hide();
	$('#googleMap').hide();
	$('#googleMap').show(300);
	$('#googleMap').addClass('v-100');
	map.setCenter({
			lat : 0,
			lng : 0
		});
	map.setZoom(defaultZoomLevel);
	clearMarker();
	addAllMarker();
}
$( "#continentList" ).delegate( ".country-card", "click", function() {
	selectedCountryID = $(this).attr('country_id');
	if(compareMode){
		if(selectedCountries.has(selectedCountryID)){
			selectedCountries.delete(selectedCountryID);
			$('>img',this).removeClass('selected');
		}else{
			selectedCountries.add(selectedCountryID);
			$('>img',this).addClass('selected');
		}
			
	}else{
		currentScreen = 'detailPage';
		show_country();
		var stateObj = { selectedCountryID: selectedCountryID, currentScreen: currentScreen };
		history.pushState(stateObj, "", "index.html");
	}

	// --------------------------------------------------- //
	//$('#continentList').hide();
	//$('#detailPage').show(500);
});
function show_home(){
	$('#homePage').show(300);
	$('#detailPage').hide();
	$('#comparePage').hide();
	$('#googleMap').hide();
	selectedCountries.clear();
	$('.country-card >img').removeClass('selected');
}
function show_country(){
	$('#googleMap').removeClass('v-100');
	$("#homePage").hide();
	$('#comparePage').hide();
	$('#detailPage').show(300);
	$('#googleMap').show(300);
	var country_id = selectedCountryID;
	var selectedCountry = dataCountry[country_id];
	var homeCountry = dataCountry[homeCountry_id];
	var selectedCountryName = selectedCountry.name;
	var homeCountryName = homeCountry.name;
	clearMarker();
	addMarker(country_id);
	addMarker(homeCountry_id);
	$('a[href="#detailPage_SelectedCountry"]').click();
	$('a[href="#detailPage_SelectedCountry"]').html(selectedCountryName);
	$('a[href="#detailPage_HomeCountry"]').html(homeCountryName);
	// ---------------SelectedCountry------------------ //
	var tabContent_SelectedCountry = '<div class="container col-12 pt-1 pl-4 pb-2"><h2>What many students would do in ' + selectedCountryName + '</h2>';
	var characteristicList = dataCountry[country_id].characteristicsList;
	for (var characteristic in characteristicList){
		var characteristic_id = characteristicList[characteristic];
		var characteristic = dataCharacteristic[characteristic_id];
		var behavior_id = characteristic.behavior_id;
		var characteristic_description = characteristic.characteristic_description;
		tabContent_SelectedCountry += `<div class="card p-2"><div class="card-body bg-light-dark">` + characteristic_description + `</div></div>`;
	}
	tabContent_SelectedCountry += `</div>`;
	$('#detailPage_SelectedCountry').html(tabContent_SelectedCountry);
	// ---------------HomeCountry--------------------- //
	var tabContent_HomeCountry =  '<div class="container col-12 pt-1 pl-4 pb-2"><h2>What many students would do in ' + homeCountryName + '</h2>';
	var characteristicList = dataCountry[homeCountry_id].characteristicsList;
	for (var characteristic in characteristicList){
		var characteristic_id = characteristicList[characteristic];
		var characteristic = dataCharacteristic[characteristic_id];
		var behavior_id = characteristic.behavior_id;
		var characteristic_description = characteristic.characteristic_description;
		tabContent_HomeCountry += `<div class="card p-2"><div class="card-body bg-light-dark">` + characteristic_description + `</div></div>`;
	}
	$('#detailPage_HomeCountry').html(tabContent_HomeCountry);
	// --------------Similarity----------------- //
	var tabContent_Similarity =  '<div class="container col-12 pt-1 pl-4 pb-2"><h2>Similarities between ' + selectedCountryName + ' and '+ homeCountryName+'</h2>';
	var tabContent_Difference =  '<div class="container col-12 pt-1 pl-4 pb-2"><h2>What someone in ' + selectedCountryName + ' may do differently than you.</h2>';
	var characteristicList = [];
	for (var index in dataCountry[country_id].characteristicsList){
			var characteristic_id = dataCountry[country_id].characteristicsList[index];
			var characteristic = dataCharacteristic[characteristic_id];
			var behavior_id = characteristic.behavior_id;
			var characteristic_description = characteristic.characteristic_description;
		if(dataCountry[homeCountry_id].characteristicsList.includes(characteristic_id))
			tabContent_Similarity += `<div class="card p-2"><div class="card-body bg-light-dark">` + characteristic_description + `</div></div>`;
		else
			tabContent_Difference += `<div class="card p-2"><div class="card-body bg-light-dark">` + characteristic_description + `</div></div>`;
	}
	$('#detailPage_Similarity').html(tabContent_Similarity);
	$('#detailPage_Difference').html(tabContent_Difference);
	$('#detailPage_Tab').first().click();
	var centerLocation_Lat = 0.0;
  var centerLocation_Lng = 0.0;
  centerLocation_Lat = (parseFloat(dataCountry[country_id].LatLng.latitude) + parseFloat(dataCountry[homeCountry_id].LatLng.latitude)) / 2;
  centerLocation_Lng =  (parseFloat(dataCountry[country_id].LatLng.longitude) + parseFloat(dataCountry[homeCountry_id].LatLng.longitude)) / 2;

	if (map){
		// map init
		map.setCenter({
			lat : centerLocation_Lat,
			lng : centerLocation_Lng
		});
		map.setZoom(defaultZoomLevel);
	}
}
function print(msg){
	if(VERBOSE) console.log(msg);
}
