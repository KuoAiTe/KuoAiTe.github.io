
function LatLng(latitude,longitude){
	this.latitude = latitude;
	this.longitude = longitude;
}
function Behavior(behavior_id, category_id, behavior_id_description){
	this.behavior_id = behavior_id;
	this.category_id = category_id;
	this.behavior_id_description = behavior_id_description;
};

function Continent(continent_id, name){
	this.continent_id = continent_id;
	this.name = name;
};


function Country(country_id, continent_id, name, LatLng, characteristicsList,marker){
	this.country_id = country_id;
	this.continent_id = continent_id;
	this.name = name;
	this.LatLng = LatLng;
	this.characteristicsList = characteristicsList;
	this.marker = marker;
};

function Characteristic(characteristic_id, behavior_id, characteristic_description){
	this.characteristic_id = characteristic_id;
	this.behavior_id = behavior_id;
	this.characteristic_description = characteristic_description;
};