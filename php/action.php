<?php

require("modules/PHP-Brewerydb-master/Pintlabs/Service/Brewerydb.php"); //Require the module

$apikey = "cc12540abedfa669021307d4ba111d87";
$bdb = new Pintlabs_Service_Brewerydb($apikey);
$bdb->setFormat('php'); // if you want to get php back.  'xml' and 'json' are also valid options.

$searchFor = $_POST['searchFor'];
$params = $searchFor;


$searchForTrim = trim($searchFor['q'], " ");

try {
    // The first argument to request() is the endpoint you want to call
    // 'brewery/BrvKTz', 'beers', etc.
    // The third parameter is the HTTP method to use (GET, PUT, POST, or DELETE)
    if(empty($searchForTrim) || $searchForTrim == "") {
      $params = array();
      $results = $bdb->request("beers", $params, 'GET'); // where $params is a keyed array of parameters to send with the API call.
    } else {
      $results = $bdb->request("search", $params, 'GET'); // where $params is a keyed array of parameters to send with the API call.
    }
    header('Content-Type: application/json');
    echo json_encode(array($results));

} catch (Exception $e) {
    $results = array('error' => $e->getMessage());
}


function clean($string) {
   $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

   return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}
