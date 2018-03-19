$(document).ready(function() {

    let searchInput = $("#searchInput");
    let searchBtn = $("#searchBtn");
    let nextBtn = $("#nextBtn");
    let prevBtn = $("#prevBtn");
    let itemLink = $(".itemLink");
    let currentPage = 1;
    let numOfPages = 1;

    searchBtn.on("click", function(event) {
        event.preventDefault();
        searchBeer();
    });


    nextBtn.on("click", function() {
        if(currentPage < numOfPages) {
            currentPage++;
        }
        outputPage();
    });

    prevBtn.on("click", function() {
        if(currentPage > 1) {
            currentPage--;
        }
        outputPage();
    });

    $(document).on("click","a.itemLink", function(){
        var usersid =  $(this).attr("data-beer-id");
        console.log(usersid);
        console.log("lol");
    });

    function outputPage () {
        $(".page").empty();
        $(".page").append("Page " + currentPage + " of " + numOfPages);
    }

    function searchBeer () {
        //let beerId = $("#searchInput").val();
        //let beerName = searchInput.value();
        let beerName = $("#searchInput").val();
        retrieveByName(beerName);
        //retrieveById('oeGSxs');
        //let myData = "name=" + beerName;
    }

    function displayError () {

    }

    function displaySucess () {

    }

    function appendResult (imgSrc, name, volume, beerId) {
        let row = $('<div class="row align-items-center item"> </div>');
        row.append('<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 picture"><img src="' + imgSrc + '" alt="beer icon" class="img-thumbnail" /></div>');
        row.append('<div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 name"><a class="itemLink" data-beer-id="' + beerId + '" href="#">' + name + '</a></div>');
        row.append('<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 volume"><p>' + volume + '</p></div>');
        $('.results').append(row);
        //console.log(name);
    }

    function retrieveById (beerId) {
        let myData = {

        };

        let parsed = JSON.stringify(myData);
        /*
        ajaxCall(parsed, 'beers/', function(output) {
            for(i = 0; i < output[0]['data'].length; i++) {
                console.log(output[0]['data'][i]);
            }
        });*/
        ajaxCall(parsed, 'beer/' + beerId, function (output) {
            //console.log(output[0]['data']['labels']['medium']);
            let img = "";
            let abv = ""; //Alcohol by Volume
            let name = output[0]['data']['name'];
            let id =  output[0]['data']['id'];


            if(output[0]['data']['labels'] == null) {
                img = "img/beer-tile.png";
            } else {
                img = output[0]['data']['labels']['medium'];
            }

            if(isNaN(output[0]['data']['abv'])) {
                abv = "N/A";
            } else {
                abv = output[0]['data']['abv'] + "%";
            }

            appendResult(img, name, abv, id);
        });
    }


    function retrieveByName (beerName) {


        let myData = {
            q: $("#searchInput").val(), //Beer name
            p: currentPage,
            type: "beer"
        };

        let parsed = JSON.stringify(myData);

        //let path = 'name='+beerName+'&type=beer';
        ajaxCall(parsed, 'search', function (output) {

            $(".item").remove();

            numOfPages = output[0]['numberOfPages'];
            if(isNaN(numOfPages)) {
                numOfPages = 1;
            }

            outputPage();

            for(i = 0; i < output[0]['data'].length; i++) {
                //console.log(output);
                retrieveById(output[0]['data'][i]['id']);
            }

        });

    }

    function ajaxCall (arr, endpoint, handleData) {
        $.ajax({
            url: 'php/action.php', //Where to make Ajax calls aka route
            type: 'post', // POST or GET
            data:{searchFor : arr, searchType : endpoint}, //Form variables /* myData */ /* {name : beerName, type : 'beer'}*/
            dataType:'json',
            beforeSend: function () {
                console.log('loading')
            },
            success: function (response) {
                handleData(response);
                console.log("success");
            },
            error: function (xhr, ajaxOptions, thrownError) {

                console.log("error");
            }
        });
    }

    function clean() {
        $(".results").empty();
        $(".searchForm").remove();
        $(".lead").remove();
    }

    clean();
    displayItem("GUeFb3");

    function displayItem(id) {


        let myData = {

        };

        let parsed = JSON.stringify(myData);

        ajaxCall(parsed, 'beer/' + id, function (output) {

            let img = "";
            let abv = ""; //Alcohol by Volume
            let name = output[0]['data']['name'];
            let id =  output[0]['data']['id'];
            let text = output[0]['data']['description'];


            if(output[0]['data']['labels'] == null) {
                img = "img/beer-tile.png";
            } else {
                img = output[0]['data']['labels']['medium'];
            }

            if(isNaN(output[0]['data']['abv'])) {
                abv = "N/A";
            } else {
                abv = output[0]['data']['abv'] + "%";
            }

            let ibu = "";
            //let row = $('<div class="row align-items-center item"> </div>');
            //let row2 = $('<div class="row item"> <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Test</div> </div>');
            //let column = $('<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"></div>');
            let row = $('<div class="row align-items-center item"> </div>');
            let row2 = $('<div class="row align-items-left item"> </div>');

            let column = $('<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"><img src="' + img + '"  alt="beer icon" class="img-thumbnail"></div>');
            let column2 = $('<div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"></div>');
            let column3 = $('<div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"></div>');

            let column4 = $('<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-center"> </div>');
            let column5 = $('<div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8"></div>');
            let column6 = $('<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center ingrediens"></div>');

            let p = $('<p>IBU: ' + ibu +  '</p>');
            let p2 = $('<p>SRM: ' + ibu +  '</p>');
            let p3 = $('<p>Alcohol Volume: ' + ibu +  '</p>');

            let p4 = $('<p>Is Organic: ' + ibu +  '</p>');
            let p5 = $('<p>Last Updated: ' + ibu +  '</p>');
            let p6 = $('<p>Status: ' + ibu +  '</p>');

            let p7 = $('<p>' + text + '</p>');
            let p8 = $('<p>Ingrediens: </p>');
            let h = $('<h5>' + name + '</h5>');

            row.append(column);
            column2.append(p);
            column2.append(p2);
            column2.append(p3);
            column3.append(p4);
            column3.append(p5);
            column3.append(p6);
            row.append(column2);
            row.append(column3);
            column6.append(p8);
            column4.append(h);
            column4.append(column6);
            column5.append(p7);
            row2.append(column4);
            row2.append(column5);

            $('.results').append(row);
            $('.results').append(row2);
        });


    }

});

/*
<div class="row align-items-center">
    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
        <img src="https://s3.amazonaws.com/brewerydbapi/beer/GUeFb3/upload_eu86pe-medium.png" alt="beer icon" class="img-thumbnail">
    </div>
    <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
        <p>IBU</p>
        <p>SRM:</p>
        <p>Alcohol Volume: </p>
    </div>
    <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
        <p>Is Organic: </p>
        <p>Last Updated: </p>
        <p>Status: </p>
    </div>
</div>
<div class="row align-items-left item">
    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-center">
        <h5>Brown Ale</h5>
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center ingrediens">
           <p>Ingrediens: </p>
        </div>
    </div>
    <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
        <p>An all-malt American Brown Ale with just enough hop presence to keep it from being too sweet. The aroma comes predominantly from the malt with a hint of the spiciness of imported British hops. Seven distinct specialty malts are milled at the brewery and mashed together, providing a complex, nutty flavor with subtle, roasted undertones. This Pearl Street original is a favorite amongst locals and professional beer judges alike. Gold Medal Winner at the World   Beer Championships, 2003. Available on draught year ‘round. foodPairings: "Few styles are more versatile when it comes to food. The malt flavor stands up well to everything from spicy stir-fried Thai or Chinese dishes to BBQ ribs and Indian curry. At the same time, the fruity flavors and balanced maltiness go well with roasted chicken, smoked trout or salmon and hearty options like beef stew. Game dishes, particularly venison, are an outstanding pairing.
        </p>
    </div>
</div>*/
