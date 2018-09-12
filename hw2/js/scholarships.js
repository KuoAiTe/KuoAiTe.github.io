jQuery.each( scholarships, function( i, val ) {
    console.log("first valueasd:"+ val["title"]);
    var title = val["title"];
    var amount = val["amount"];
    var available = val["available"];
    var deadline = val["deadline"];
    var GPA = val["GPA"];
    var content = val["content"];
    if( content.length > 180) content = content.substr(0,180) + ".....";
    var write_msg = `
        <div class="col-md-6">
            <div class="card flex-md-row mb-4 shadow-sm">
                <div class="card-body d-flex flex-column align-items-start">
                    <h3 class="mb-3">
                        <a class="text-dark" href="#">`+title+`</a>
                    </h3>
                    <p>`+content+`</p>
                    <div class="row text-center mt-2 mb-2 width100">
                        <div class="col-lg-4">
                        <h5>Amount</h5>
                        <h2>`+amount+`</h2>
                        </div>
                        <div class="col-lg-4">
                        <h5>Available</h5>
                        <h2>`+available+`</h2>
                        </div>
                        <div class="col-lg-4">
                        <h5>GPA</h5>
                        <h2>`+GPA+`</h2>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center width100">
                        <h5 class="mb-1 text-danger">Deadline: `+deadline+`</h5>
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
