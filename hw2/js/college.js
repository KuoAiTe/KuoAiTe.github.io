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
                        <button type="button" class="btn btn-sm btn-outline-secondary">More</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    console.log(write_msg);
    $("#college_container").append(write_msg);
    $("p.card-text").css('min-height','120px');
    var write_msg = `
    <div class="col-md-12">
      <div class="card flex-md-row mb-4 shadow-sm h-md-250">
      <img class="flex-auto d-none d-lg-block" data-src="holder.js/200x250?theme=thumb" style="width: 300px; height: 250px;" src="`+img_url+`" data-holder-rendered="true">
        <div class="card-body d-flex flex-column align-items-start">
          <h3 class="mb-0">
            <a class="text-dark" href="#">`+name+`</a>
          </h3>
          <small class="mb-1 text-muted">`+location+`  -  `+distance+` miles</small>
          <p class="card-text mb-auto">`+introduction+`</p>
          <a href="#">Continue reading</a>
        </div>
         </div>
    </div>`;
    $('#college-search-result').append(write_msg);
});
