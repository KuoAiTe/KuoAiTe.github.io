
var lat = 0;
var lng = 0;
$( document ).ready(function() {
    var requested_name = location.hash.substr(1).replace(/%20/g, " ");
    console.log(requested_name);
    for(var i=0; i < data.length;i++){
        if(data[i]["name"] == requested_name){
            var val = data[i];
            var name = val["name"];
            var introduction = val["introduction"];
            var img_url = val["img_url"];
            var distance = val["distance"];
            var college_location = val["location"];
            var enrollment_size = val["enrollment_size"];
            var year = val["year"];
            var tuition = val["tuition"];
            lat = val["lat"];
            lng = val["lng"];
            break;
        }
    }
    var write_msg = `
    <div class="row">
        <div class="col-md-12">
            <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-info rounded shadow-sm">
                <img class="mr-3" src="`+img_url+`" alt="" width="64" height="64">
                <div class="lh-100">
                    <h2 class="mb-0 text-white lh-100">`+name+`</h2>
                    <h3>Since `+year+`</h3>
                </div>
            </div>
            <h3 class="border-bottom border-gray pb-2 mb-3">Introduction</h3>
            <div class="text-muted  mb-3">
            `+introduction+`
            </div>
            <div class="row text-center mt-3 mb-3">
                <div class="col-lg-4">
                <h6 class="text-muted">Enrollment Size</h5>
                <h4 class="text-muted">`+enrollment_size+`</h2>
                </div>
                <div class="col-lg-4">
                <h6 class="text-muted">Tuition fee</h5>
                <h4 class="text-muted">$ `+tuition+`</h2>
                </div>
                <div class="col-lg-4">
                <h6 class="text-muted">Distance</h5>
                <h4 class="text-muted">`+distance+` miles</h2>
                </div>
            </div>
            <h3 class="border-bottom border-gray pb-2 mb-3">Location - `+college_location+`</h3>
            <div id="map" class="mb-5"></div>

            <a href="#" class="btn btn-outline-danger btn-lg width100">Favorite</a><p></p>
        </div>
    </div>`;
    $('#college-container').append(write_msg);
});
function initMap() {
  // The location of Uluru
  var uluru = {lat: lat, lng: lng};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}
