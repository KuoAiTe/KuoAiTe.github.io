<!-- Auto loading-->
jQuery.each( data, function( i, val ) {
    console.log("first value:"+ val);
    var name = val["name"];
    var introduction = val["introduction"]
    var img_url = val["img_url"];
    var distance = val["distance"];
    var location = val["location"];
    var write_msg = `
    <div class="col-md-12">
        <div class="card flex-md-row mb-4 shadow-sm h-md-180">
            <img class="flex-auto d-none d-lg-block" style="width: 160px; " src="`+img_url+`" data-holder-rendered="true">
            <div class="row card-body align-items-start">
                <div class="col-md-9">
                    <h3 class="mb-0"><a class="text-dark" href="#">`+name+`</a></h3>
                    <small class="mb-1 text-muted margin-bottom-10">`+location+`  -  `+distance+` miles</small>
                    <p class="card-text mb-auto padding-top-10">`+introduction+`</p>
                </div>
                <div class="col-md-3 text-center" style="padding-top:15px;">
                    <a href="#" class="btn btn-outline-danger btn-lg width100">Favorite</a><p></p>
                    <a href="#" class="btn btn-outline-primary btn-lg width100">View</a>
                </div>
            </div>
        </div>
    </div>`;
});
