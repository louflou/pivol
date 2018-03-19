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
        let beerId =  $(this).attr("data-beer-id");
        clean();
        displayItem(beerId);

    });

    function outputPage () {
        $(".page").empty();
        $(".page").append("Page " + currentPage + " of " + numOfPages);
    }

    function searchBeer () {
        let beerName = $("#searchInput").val();
        retrieveByName(beerName);
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

    function displayItem(id) {


        let myData = {

        };

        let parsed = JSON.stringify(myData);

        ajaxCall(parsed, 'beer/' + id, function (output) {

            let img = "";
            let name = output[0]['data']['name'];
            let id =  output[0]['data']['id'];
            let text = output[0]['data']['description'];
            let ibu = output[0]['data']['ibu'];
            let srm = output[0]['data']['srm'];
            let abv = output[0]['data']['abv'] + "%";
            let organic = output[0]['data']['isOrganic'];
            let lastUpdated = output[0]['data']['updateDate'];
            let status = output[0]['data']['status'];

            if(isNaN(abv)) {
                abv = "N/A";
            }

            if(isNaN(ibu)) {
                ibu = "N/A";
            }

            if(isNaN(srm)) {
                srm = "N/A";
            }

            if(output[0]['data']['labels'] == null) {
                img = "img/beer-tile.png";
            } else {
                img = output[0]['data']['labels']['medium'];
            }

            if(organic == null) {
                organic = "Not defined";
            } else {
                if(organic == "N") {
                    organic = "No";
                } else {
                    organic = "Yes";
                }
            }

            if(lastUpdated == null) {
                lastUpdated = "Not defined";
            }

            if(status == null) {
                status = "Not defined";
            }


            let row = $('<div class="row align-items-center item"> </div>');
            let row2 = $('<div class="row align-items-left item"> </div>');

            let column = $('<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"><img src="' + img + '"  alt="beer icon" class="img-thumbnail"></div>');
            let column2 = $('<div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"></div>');
            let column3 = $('<div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"></div>');

            let column4 = $('<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-center"> </div>');
            let column5 = $('<div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8"></div>');
            let column6 = $('<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center ingrediens"></div>');

            let p = $('<p>IBU: ' + ibu +  '</p>');
            let p2 = $('<p>SRM: ' + srm +  '</p>');
            let p3 = $('<p>Alcohol Volume: ' + abv +  '</p>');

            let p4 = $('<p>Is Organic: ' + organic +  '</p>');
            let p5 = $('<p>Last Updated: ' + lastUpdated +  '</p>');
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
