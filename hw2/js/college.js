jQuery.each( data, function( i, val ) {
    console.log("first value:"+ val);
    var name = val["name"];
    var introduction = val["introduction"]
    var img_url = val["img_url"];
    var distance = val["distance"];
    var location = val["location"];
    var write_msg =
    `<div class="col-md-4">
        <div class="card mb-4 shadow-sm">
            <div class="card-img">
                <img class="card-img-top" src="`+img_url+`" alt="Card image cap">
            </div>
            <div class="card-body">
                <p class="card-title">`+name+`</p>
                <p class="card-text">`+introduction+`</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="university-location text-muted float-right">`+location+`</small>
                    <small class="text-muted">`+distance+` miles</small>
                    <div class="btn-group">
                        <a href="college-detail.html#`+name+`">
                            <button type="button" class="btn btn-sm btn-outline-secondary">More</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    $("#college_container").append(write_msg);
    $("p.card-text").css('min-height','120px');
});
