$(document).ready(function() {

    let searchInput = $("#searchInput");
    let searchBtn = $("#searchBtn");

    searchBtn.on("click", function(event) {
        event.preventDefault();
        searchBeer();
    });



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

    function createResult () {

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
            console.log(output[0]['data']['name']);
        });
    }


    function retrieveByName (beerName) {


        let myData = {
            q: "t", //Bear name
            type: "beer"
        };

        let parsed = JSON.stringify(myData);

        //let path = 'name='+beerName+'&type=beer';
        ajaxCall(parsed, 'search', function (output) {
            for(i = 0; i < output[0]['data'].length; i++) {
                //console.log(output[0]['data'][i]);
                retrieveById(output[0]['data'][i]['id']);
            }

        });

    }

    function ajaxCall(arr, endpoint, handleData) {
        $.ajax({
            url: 'php/action.php', //Where to make Ajax calls aka route
            type: 'post', // POST or GET
            data:{searchFor : arr, searchType : endpoint}, //Form variables /* myData */ /* {name : beerName, type : 'beer'}*/
            dataType:'json',
            beforeSend: function () {
                console.log('loading')
            },
            success: function (response) {
                //console.log(response[0]['data'][0]['id']);
                handleData(response);
                //console.log(response);
                console.log("success");
            },
            error: function (xhr, ajaxOptions, thrownError) {

                console.log("error");
            }
        });
    }

});
