<?php

$apikey = "cc12540abedfa669021307d4ba111d87";
$bdb = new Pintlabs_Service_Brewerydb($apikey);
$bdb->setFormat('php'); // if you want to get php back.  'xml' and 'json' are also valid options.

$params = array("q" => "tes", "type" => "beer");

try {
    // The first argument to request() is the endpoint you want to call
    // 'brewery/BrvKTz', 'beers', etc.
    // The third parameter is the HTTP method to use (GET, PUT, POST, or DELETE)
    $results = $bdb->request('search', $params, 'GET'); // where $params is a keyed array of parameters to send with the API call.
} catch (Exception $e) {
    $results = array('error' => $e->getMessage());
}
