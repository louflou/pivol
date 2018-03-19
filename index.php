
<?php
    //require("php/requireAll.php");
    //$config = require("config.php");

?>

<!doctype html>
<html lang="sv">
    <head>
        <meta charset="utf-8">
        <title>Pivøl - Home</title>
        <!-- Bootstrap CDN-->
        <link href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0/lux/bootstrap.min.css" rel="stylesheet" integrity="sha384-GxhP7S92hzaDyDJqbdpcHqV5cFflxAx0Yze/X7vUONp43KK1E8eUWaJIMkit3D0R" crossorigin="anonymous">
        <link href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0/lux/bootstrap.min.css" rel="stylesheet" integrity="sha384-GxhP7S92hzaDyDJqbdpcHqV5cFflxAx0Yze/X7vUONp43KK1E8eUWaJIMkit3D0R" crossorigin="anonymous">

        <!-- Pivol CSS -->
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body class="home">


        <header class="page-header heady text-center">
            <h1>Pivøl</h1>
        </header>

        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Pivøl</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>


            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="index.php">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Advanced Search</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact Us</a>
                    </li>

                </ul>
            </div>
        </nav>

        <div class="jumbotron text-center">
            <div class="container">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12">

                    <h1 class="display-3">Hello, beer lover!</h1>
                    <p class="lead">Pivøl is an app that allows users to search for beer, brands, breweries, and such -  to get information about ingredients, volume, alcohol content and similar kinds of beer. </p>
                    <hr class="my-4">
                    <p>Search for beer in the field below - and Pivøl will fetch some results for you from the database. </p>
                    <form class="form-inline my-2 my-lg-0 mx-auto searchForm">
                        <input  id="searchInput" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button id="searchBtn" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <br>
                    <p class="lead">
                        <a class="btn btn-dark btn-lg" href="#" role="button">Learn more</a>
                    </p>

                    <div class="card">
                      <div class="card-body results">
                        <div class="row">
                            <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 picture">Label</div>
                            <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 name">Name</div>
                            <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 volume">Alcohol Volume </div>
                        </div>
                      </div>
                    </div>

                    <div class="buttons">
                        <button id="prevBtn" class="btn btn-outline-success my-2 my-sm-0" type="submit">Previous</button>
                        <button id="nextBtn" class="btn btn-outline-success my-2 my-sm-0" type="submit">Next</button>
                        <p class="page"> </p>
                    </div>

                    <!--Test-->
                    <!-- <div class="card">
                      <div class="card-body">
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
                          </div>
                      </div>
                    </div> -->

                </div>
              </div>
            </div>
        </div>


        <!-- Footer -->
        <footer class="footer bg-dark">
            <div class="container">
              <span class="text-muted">Pivøl &copy; 2018 </span>
            </div>
        </footer>


        <!-- Bootstrap JS -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <!-- AJAX-->
        <script src="js/script.js"></script>
    </body>
</html>
