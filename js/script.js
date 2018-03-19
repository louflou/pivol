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

    //clean();
    //displayItem("GUeFb3");

    function displayItem(id) {


        let myData = {

        };

        let parsed = JSON.stringify(myData);

        ajaxCall(parsed, 'beer/' + id, function (output) {

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


            let row = $('<div class="row align-items-center item"> </div>');
            let row2 = $('<div class="row item"> <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">Test</div> </div>');
            let column = $('<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"></div>');

            /*row.append('<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"><img src="' + img + '" alt="beer icon" class="img-thumbnail" /></div>');
            row.append('<div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8"><p>IBU</p> <p>SRM: ' +  '</p> '+ ' <p>Alcohol Volume: ' + abv + '</p></div>');
            column.append(row2);
            row.append(column);
            //row2.append('<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"> test</div>');
            */
            //row.append(row2);
            $('.results').append(row);
        });


    }

});
