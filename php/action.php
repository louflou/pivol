<?php

require("modules/PHP-Brewerydb-master/Pintlabs/Service/Brewerydb.php"); //Require the module

$apikey = "cc12540abedfa669021307d4ba111d87";
$bdb = new Pintlabs_Service_Brewerydb($apikey);
$bdb->setFormat('php'); // if you want to get php back.  'xml' and 'json' are also valid options.

$searchFor = $_POST['searchFor'];
$params = $searchFor;


try {
    // The first argument to request() is the endpoint you want to call
    // 'brewery/BrvKTz', 'beers', etc.
    // The third parameter is the HTTP method to use (GET, PUT, POST, or DELETE)
    $results = $bdb->request("search", $params, 'GET'); // where $params is a keyed array of parameters to send with the API call.

    header('Content-Type: application/json');
    echo json_encode(array($results));

} catch (Exception $e) {
    $results = array('error' => $e->getMessage());
}


function clean($string) {
   $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

   return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}


/*
$dataString = "";
if(isset($_POST['searchFor'])) {
    $dataString = $_POST['searchFor'];
}*/

/*$searchFor = $_POST['searchFor'];
$searchType = $_POST['searchType'];
$data = json_decode($searchFor);


//$params = array("q" => $name, "type" => $type);
$params = array();

$toArray = get_object_vars ( $data );
$params = $toArray;


try {
    // The first argument to request() is the endpoint you want to call
    // 'brewery/BrvKTz', 'beers', etc.
    // The third parameter is the HTTP method to use (GET, PUT, POST, or DELETE)
    $results = $bdb->request($searchType, $params, 'GET'); // where $params is a keyed array of parameters to send with the API call.

    header('Content-Type: application/json');
    echo json_encode(array($results));

} catch (Exception $e) {
    $results = array('error' => $e->getMessage());
}


function clean($string) {
   $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

   return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}*/
