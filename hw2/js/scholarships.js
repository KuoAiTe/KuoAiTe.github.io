jQuery.each( scholarships, function( i, val ) {
    var title = val["title"];
    var amount = val["amount"];
    var available = val["available"];
    var deadline = val["deadline"];
    var GPA = val["GPA"];
    var content = val["content"];
    if( content.length > 180) content = content.substr(0,180) + ".....";
    var write_msg = `
        <div class="col-md-4">
            <div class="card flex-md-row mb-4 shadow-sm">
                <div class="card-body d-flex flex-column align-items-start">
                    <h4 class="mb-2">
                        <a class="font-weight-bold text-dark" href="#">`+title+`</a>
                    </h4>
                    <p>`+content+`</p>
                    <div class="row width100 mt-2 mb-2">
                        <small class="col-4 col-sm-4 col-md-4 scholarships-info">Awards<h6>`+amount+`</h6></small>
                        <small class="col-4 col-sm-4 col-md-4 scholarships-info">Available<h6>`+available+`</h6></small>
                        <small class="col-4 col-sm-4 col-md-4 scholarships-info">GPA<h6>`+GPA+`</h6></small>
                    </div>
                    <div class="d-flex justify-content-between align-items-center width100">
                        <h6 class="mb-1 text-danger">Deadline: `+deadline+`</h6>
                        <div class="btn-group">
                            <a href="#">
                                <button type="button" class="btn btn-sm btn-danger">Apply</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    $('div#scholarships-container').append(write_msg);
});
