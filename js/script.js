$(document).ready(function() {

    let searchInput = $("#searchInput");
    let searchBtn = $("#searchBtn");

    searchBtn.on("click", function() {
        searchBeer();
    });



    function searchBeer () {

        //let beerId = $("#searchInput").val();
        //let beerName = searchInput.value();
        let beerName = $("#searchInput").val();
        let myData = "name=" + beerName;
        /*
        $.ajax({
            url: 'php/action.php', //Where to make Ajax calls aka route
            type: 'post', // POST or GET
            data: {action: 'test'}, //Form variables /* myData */ /* {name : beerName, type : 'beer'}*/
            /*dataType:'text',
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
        });*/

        $.ajax({
          url: '/php/action.php',
          type: 'POST',
          data: {'action': 'follow', 'userid': '11239528343'},
          dataType: "text",
          success: function(data, status) {
              console.log("lol");
          },
          error: function(xhr, desc, err) {
            console.log("Details: " + desc + "\nError:" + err);
          }
        }); // end ajax call

    }

    function displayError() {

    }

    function displaySucess() {

    }

});
