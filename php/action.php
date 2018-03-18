<?php
/*if($_POST['action'] == "follow") {

  echo "ok";
}*/

$arr = array(
      array(
          "region" => "valore",
          "price" => "valore2"
      ),
      array(
          "region" => "valore",
          "price" => "valore2"
      ),
      array(
          "region" => "valore",
          "price" => "valore2"
      )
  );

  echo  json_encode($arr);
/*
$apikey = "cc12540abedfa669021307d4ba111d87";
$bdb = new Pintlabs_Service_Brewerydb($apikey);
$bdb->setFormat('php'); // if you want to get php back.  'xml' and 'json' are also valid options.
$name = "";
$type = "";

if(isset($_POST['name'])) {
    $name = $_POST['name'];
}

if(isset($_POST['type'])) {
    $type = $_POST['type'];
}


$params = array("q" => $name, "type" => $type);
    echo "lol";

try {
    // The first argument to request() is the endpoint you want to call
    // 'brewery/BrvKTz', 'beers', etc.
    // The third parameter is the HTTP method to use (GET, PUT, POST, or DELETE)
    $results = $bdb->request('search', $params, 'GET'); // where $params is a keyed array of parameters to send with the API call.

    //header('Content-Type: application/json');
    //echo json_encode(array($results));

} catch (Exception $e) {
    $results = array('error' => $e->getMessage());
}
*/
