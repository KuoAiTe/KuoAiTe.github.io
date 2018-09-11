var data = [
    {
    name: "Auburn University",
    img_url:"./img/Auburn.jpg",
    location:'Auburn, AL',
    distance: 0,
    introduction:"Auburn University is a public institution that was founded in 1856. It has a total undergraduate enrollment of 23,964, its setting is suburban, and the campus size is 1,875 acres."
    },{
    name: "University of Alabama",
    img_url:"./img/Alabama.jpg",
    location:'Tuscaloosa, AL',
    distance: 157,
    introduction:"University of Alabama is a public institution that was founded in 1831. It has a total undergraduate enrollment of 33,305, its setting is suburban, and the campus size is 1,026 acres."
    },{
    name: "University of Georgia",
    img_url:"./img/Georgia.jpg",
    location:'Athens, GA',
    distance: 179,
    introduction:"University of Georgia is a public institution that was founded in 1785. It has a total undergraduate enrollment of 28,848, its setting is city, and the campus size is 767 acres."
    },{
    name: "Tuskegee University",
    img_url:"./img/Tuskegee.jpg",
    location:'Tuskegee, AL',
    distance: 19.9,
    introduction:"Tuskegee University is a private institution that was founded in 1881. It has a Rural setting, and the campus size is 5,000 acres."
    },{
    name: "Georgia Institute of Technology",
    img_url:"./img/GeorgiaTech.jpg",
    location:'Atlanta, GA',
    distance: 112,
    introduction:"Georgia Institute of Technology is a public institution that was founded in 1885. It has a total undergraduate enrollment of 15,573, its setting is urban, and the campus size is 400 acres."
    },{
    name: "Columbus State University",
    img_url:"./img/ColumbusState.jpg",
    location:'Columbus, GA',
    distance: 42.2,
    introduction:"Columbus State University is a public institution that was founded in 1958. It has a total undergraduate enrollment of 6,798, its setting is city, and the campus size is 132 acres."
    },{
    name: "Alabama State University",
    img_url:"./img/AlabamaState.png",
    location:'Montgomery, AL',
    distance: 54.2,
    introduction:"Alabama State University is a public institution that was founded in 1887. It has a total undergraduate enrollment of 4,208, its setting is urban, and the campus size is 172 acres."
    }



];
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
        <div class="card flex-md-row mb-4 shadow-sm h-md-250">
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
    $('#college-search-result').append(write_msg);
});
