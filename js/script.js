$(document).ready(function() {

    let searchInput = $("#searchInput");
    let searchBtn = $("#searchBtn");
    let advSearchInput = $("#advSearchInput");
    let advSearchBtn = $("#advSearchBtn");
    let nextBtn = $("#nextBtn");
    let prevBtn = $("#prevBtn");
    let itemLink = $(".itemLink");
    let currentPage = 1;
    let numOfPages = 2;
    //let errors = [];
    let max;
    let dataRes;
    //let withBreweries = false;
    let isOrganic = false;
    let hasLabels = false;
    let hasDescription = false;
    let abvDropDown = 50;
    let params;

    searchBtn.on("click", function(event) {
        event.preventDefault();

        params = {
            q: $("#searchInput").val(), //Beer name
            p: currentPage,
            type: "beer"
        };

        currentPage = 1;
        ajaxCall(1, params);
    });

    advSearchBtn.on("click", function(event) {
        event.preventDefault();

        params = {
            q: $("#advSearchInput").val(), //Beer name
            p: currentPage,
            type: "beer"
        };
        currentPage = 1;
        if ($('#description').is(':checked')) {
            hasDescription = true;
        }

        if($('#labels').is(':checked')) {
            hasLabels = true;
        }

        if($('#organic').is(':checked')) {
            isOrganic = true;
        }

        abvDropDown = $("#abv").val();
        console.log(abvDropDown);
        console.log("value is : " + $('#abv').val() );
        ajaxCall(1, params);
    });



    nextBtn.on("click", function() {
        if(!(nextBtn.hasClass("disabled"))) {
            if(currentPage < numOfPages) {
                currentPage++;
            }
            ajaxCall(currentPage, params);
        }
    });

    prevBtn.on("click", function() {

        if(!(prevBtn.hasClass("disabled"))) {

            if(currentPage > 1) {
                currentPage--;
            }

            ajaxCall(currentPage, params);

            if(currentPage == 1) {
                prevBtn.addClass("disabled")
            } else {
                prevBtn.removeClass("disabled")
            }

        }

    });

    $(document).on("click","button", function(){
        if(currentPage == 1) {
            prevBtn.addClass("disabled")
        } else {
            prevBtn.removeClass("disabled")
        }

        if(currentPage == numOfPages) {
            nextBtn.addClass("disabled");
        } else {
            nextBtn.removeClass("disabled");
        }
    });


    $(document).on("click","a.itemLink", function(){
        let beerId =  $(this).attr("data-beer-id");
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
        $('.progress').empty().remove();
        $('.alert').remove();
        $('.alert').removeClass('alert-info');
        $('.alert').removeClass('alert-success');
        $('.alert').addClass('alert-danger');
        $('.statusText').text("An error has occured");
    }

    function displaySucess () {
        $('.progress').empty().remove();
        $('.alert').removeClass('alert-info');
        $('.alert').removeClass('alert-danger');
        $('.alert').addClass('alert-success');
        $('.statusText').text("Finished");
        $(".alert").delay(1500).fadeOut();
        $('.results').removeClass('hide');
        $('.buttons').removeClass('hide');
        $('.card').removeClass('hide');
    }

    function displayLoading() {

        if(!$('.progress').length) {
            let div = $('<div class="progress"></div>');
            let div2 = $('<div class="alert alert-info" role="alert"></div>');
            let p = $('<p class="statusText"><strong>Searching.. Please wait</p>');
            let progressbar = $('<div class="pbx progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>');
            div.append(progressbar);
            div2.append(p);
            div2.append(div);
            div2.insertAfter('.myForm');

            $('.results').addClass('hide')
            $('.buttons').addClass('hide')
        }
    }

    function appendResult (imgSrc, name, volume, beerId) {
        let row = $('<div class="row align-items-center item"> </div>');
        row.append('<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 picture"><img src="' + imgSrc + '" alt="beer icon" class="img-thumbnail" /></div>');
        row.append('<div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 name"><a class="itemLink" data-beer-id="' + beerId + '" href="#">' + name + '</a></div>');
        row.append('<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 volume"><p>' + volume + '' + (volume == "N/A" ? "" : "%") + '</p></div>');
        $('.results').append(row);
    }


    function ajaxCall (page, params) {
        $('.item').remove();
        let myData = params;
        myData['p'] = page;

        console.log(myData);

        $.ajax({
            url: 'php/action.php', //Where to make Ajax calls aka route
            type: 'post', // POST or GET
            data:{searchFor : myData},
            dataType:'json',
            beforeSend: function () {
                displayLoading();
            },
            success: function (response) {
                displaySucess();
                console.log(response);
                if(response[0]['data'] == null) {
                    nextBtn.addClass("disabled");
                } else {
                    if(response[0]['numberOfPages'] == response[0]['currentPage']) {
                      nextBtn.addClass("disabled");
                    } else {
                      nextBtn.removeClass("disabled");
                    }

                }
                displayItems(response);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //console.log("error");
                displayError();
                errors.push(thrownError);
            }
        });
    }

    function displayItems(response) {
        if(response[0]['data'] != null) {
        for(i = 0; i < response[0]['data'].length; i++) {
            let img = "";
            let name = "";
            let abv = "";
            let id = response[0]['data'][i]['id'];
            numOfPages = response[0]['numberOfPages'];

            if('labels' in response[0]['data'][i]) {
                img = response[0]['data'][i]['labels']['medium'];
            } else {
                img = "img/beer-tile.png";
            }

            if('name' in response[0]['data'][i]) {
                name = response[0]['data'][i]['name'];
            } else {
                name = "Not defined";
            }

            if('abv' in response[0]['data'][i]) {
                abv = response[0]['data'][i]['abv']
            } else {
                abv = "N/A"
            }
            dataRes = response[0]['data'];

            if(isOrganic == true) {
                if(response[0]['data'][i]['isOrganic'] == "N") {
                    continue;
                }
            }

            if(hasLabels == true) {
                if(!('labels' in response[0]['data'][i])) {
                    continue;
                }
            }

            if(hasDescription == true) {
                if(!('description' in response[0]['data'][i])) {
                    continue;
                }
            }

            if(('abv' in response[0]['data'][i])) {
                if(Number(response[0]['data'][i]['abv']) > Number(abvDropDown)) {
                    continue;
                }

            }

            appendResult(img, name, abv, id);
        }
      }
    }


    function clean() {
        $(".results").empty();
        $(".searchForm").remove();
        $(".lead").remove();
        $(".buttons").empty().remove();
        $('.textP').remove();
        $('.my-4').remove();
        $('.display-3').remove();
    }

    function displayItem(id) {


        clean();

        for(i = 0; i < dataRes.length; i++) {
            if(dataRes[i]['id'] == id) {
                        console.log(dataRes);
                dataRes = dataRes[i];
                break;
            }
        }


        let img = "";
        let name = dataRes['name'];
        //let id =  dataRes['id'];
        let text = dataRes['description'];
        let ibu = dataRes['ibu'];
        let srm = dataRes['srm'];
        let abv = dataRes['abv'];
        let organic = dataRes['isOrganic'];
        let lastUpdated = dataRes['updateDate'];
        let status = dataRes['statusDisplay'];
        let ingrediens = null;
        console.log("test");
        console.log(dataRes);

        if(isNaN(abv)) {
            abv = "N/A";
        } else {
            abv += "%";
        }

        if(isNaN(ibu)) {
            ibu = "N/A";
        }

        if(isNaN(srm)) {
            srm = "N/A";
        }

        if(dataRes['labels'] == null) {
            img = "img/beer-tile.png";
        } else {
            img = dataRes['labels']['medium'];
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

        if(ingrediens == null) {
            ingrediens = "";
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
        let p3 = $('<p>Alcohol Volume: ' + abv +  ' </p>');

        let p4 = $('<p>Is Organic: ' + organic +  '</p>');
        let p5 = $('<p>Last Updated: ' + lastUpdated +  '</p>');
        let p6 = $('<p>Status: ' + status +  '</p>');

        let p7 = $('<p>' + text + '</p>');
        let p8 = $('<p>' + ingrediens + '</p>');
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

    }

});
