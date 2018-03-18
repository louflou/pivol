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
        //let myData = "name=" + beerName;

        $.ajax({
            url: 'php/action.php', //Where to make Ajax calls aka route
            type: 'post', // POST or GET
            data: {'name' : beerName, 'type' : 'beer'}, //Form variables /* myData */ /* {name : beerName, type : 'beer'}*/
            dataType:'json',
            beforeSend: function () {
                console.log('loading')
            },
            success: function (response) {
                console.log(response);
                console.log("success");
            },
            error: function (xhr, ajaxOptions, thrownError) {

                console.log("error");
            }
        });

    }

    function displayError() {

    }

    function displaySucess() {

    }

});
