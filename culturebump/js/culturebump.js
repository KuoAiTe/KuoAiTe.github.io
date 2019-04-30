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
var map;
$(function() {
	$.getJSON( "js/culturebump.json", function( data ) {
		map_init();
		data_init(data);
		view_init();
		$('#detailPage').hide();
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
		selectedCountryID = stateObj.selectedCountryID;
		if(currentScreen == 'home')
			show_home();
		else if(currentScreen == 'detailPage')
			show_country();
		else if (currentScreen == 'worldMap')
			show_worldmap();
	}else{
		show_continentList();
	}
}
function show_worldmap(){
	$("#homePage").hide();
	$('#detailPage').hide();
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
	currentScreen = 'detailPage';
	selectedCountryID = $(this).attr('country_id');
	show_country();
	var stateObj = { selectedCountryID: selectedCountryID, currentScreen: currentScreen };
	history.pushState(stateObj, "", "index.html");

	// --------------------------------------------------- //
	//$('#continentList').hide();
	//$('#detailPage').show(500);
});
function show_home(){
	$('#homePage').show(300);
	$('#detailPage').hide();
	$('#googleMap').hide();
}
function show_country(){
	$('#googleMap').removeClass('v-100');
	$("#homePage").hide();
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