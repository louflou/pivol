$(document).ready(function() {

    let searchInput = $("#searchInput");
    let searchBtn = $("#searchBtn");

    searchBtn.on("click", function() {
        //searchBeer();

        //let beerId = $("#searchInput").val();
        //let beerName = searchInput.value();
        const key = "cc12540abedfa669021307d4ba111d87";
        let beerName = $("#searchInput").val();
        let path = "https://api.brewerydb.com/v2/";
        let myData = 'search?q=' + beerName + '&type=beer&key=' + key; //data to be sent
        console.log(path+myData);

        jQuery.ajax({
            type: 'GET', // POST or GET
            url: path, //Where to make Ajax calls aka route
            dataType: 'jsonp', // Data type, HTML, json etc.
            data: myData, //Form variables
            timeout: 500,
            beforeSend: function () {
                //console.log('loading')
            },
            success: function (response) {
                console.log(response);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
            }
        });

    });



    function searchBeer () {

        //let beerId = $("#searchInput").val();
        //let beerName = searchInput.value();
        const key = "cc12540abedfa669021307d4ba111d87";
        let beerName = $("#searchInput").val();
        let path = "http://api.brewerydb.com/v2/";
        let myData = 'search?q=' + beerName + '&type=beer&key=' + key; //data to be sent
        console.log(path+myData);
    	$.ajax({
            type: 'GET', // POST or GET
            url: path, //Where to make Ajax calls aka route
            dataType: 'jsonp', // Data type, HTML, json etc.
            data: myData, //Form variables
            timeout: 500,
    	}).done(function (data){
    		$("#tips").text(data.value.joke);
            console.log(data);
    	}).fail(function (data){
    		console.log(data);
    		$("#tips").text("Det gick inte att hämta ett tips.");
    	});

    }

    function displayError() {

    }

    function displaySucess() {

    }

});
