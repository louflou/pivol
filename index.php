
<?php
    //require("php/requireAll.php");
    //$config = require("config.php");

?>

<!doctype html>
<html lang="sv">
    <head>
        <meta charset="utf-8">


        <!-- Bootstrap Lux theme CSS -->
        <link rel="stylesheet" src="css/bootstrap-lux-min.css">

        <title>Pivøl - Home</title>
        <!-- Bootstrap CDN-->
        <link href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0/lux/bootstrap.min.css" rel="stylesheet" integrity="sha384-GxhP7S92hzaDyDJqbdpcHqV5cFflxAx0Yze/X7vUONp43KK1E8eUWaJIMkit3D0R" crossorigin="anonymous">


        <!-- Pivol CSS -->
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>


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
                    <?php
                        if(!isset($page)) {
                            $page = 0;
                        }

                    ?>

                    <?php if(!isset($_POST['searchBtn'])): ?>
                        <h1 class="display-3">Hello, beer lover!</h1>
                        <p class="lead">Pivøl is an app that allows users to search for beer, brands, breweries, and such -  to get information about ingredients, volume, alcohol content and similar kinds of beer. </p>
                        <hr class="my-4">
                        <p>Search for beer in the field below - and Pivøl will fetch some results for you from the database. </p>
                    <?php endif; ?>
                    <form class="form-inline my-2 my-lg-0 mx-auto" method="POST" action="index.php?name=test&page={$page}">
                        <input name="searchInput" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button name="searchBtn" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <br>
                    <?php if(!isset($_POST['searchBtn'])): ?>
                        <p class="lead">
                            <a class="btn btn-dark btn-lg" href="#" role="button">Learn more</a>
                        </p>
                    <?php endif; ?>

                    <?php if(isset($_GET['page']) && isset($_GET['name']) && isset($_POST['searchBtn'])): ?>
                        <?= "Test" ?>
                        <?= $page ?>
                        <?php $page++; ?>
                    <?php endif; ?>
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
