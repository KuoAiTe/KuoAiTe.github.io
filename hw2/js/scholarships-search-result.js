
jQuery.each( scholarships, function( i, val ) {
    console.log(val);
    var title = val["title"];
    var name_lowercase = name.toLowerCase();
    var content = val["content"]
    var deadline = val["deadline"];
    var amount = val["amount"];
    var available = val["available"];
    var write_msg = `
    <div class="col-md-12">
        <div class="card flex-md-row mb-4 shadow-sm">
            <div class="row card-body align-items-start">
                <div class="col-md-12">
                    <a class="float-right" href="scholarships-search-result.html">
                        <button type="submit" class="btn btn-sm btn-info">View & Apply</button>
                    </a>
                    <h3 class="mb-0">`+title+`</h3>
                    <small class="mb-1 text-muted margin-bottom-10">Location: None specified</small>
                    <p class="card-text mb-auto padding-top-10">`+content+`</p>

                    <div class="row justify-content-center mt-3">
                        <div class="col-lg-4">
                            <div class="text-muted text-center about-border-left">
                                <h3 class="counter-value font-weight-normal" data-count="10">`+deadline+`</h3>
                                <p>Deadline</p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="text-muted text-center">
                                <h3 class="counter-value font-weight-normal" data-count="1200">`+amount+`</h3>
                                <p>Awards</p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="text-muted text-center about-border-left">
                                <h3 class="counter-value font-weight-normal" data-count="608">`+available+`</h3>
                                <p>Awards Available</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>`;
    $('div#college-search-result').append(write_msg);
});
$('h2#search-result-title').html('Search Result: 6 Matches')
