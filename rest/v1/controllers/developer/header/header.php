<?php
//use header
require '../../../core/header.php';
//import funtion
require '../../../core/functions.php';
//import mysql
require '../../../models/developer/header/Header.php';




$body = file_get_contents('php://input'); // $body->header_name;
$data = json_decode($body, true); //$data['header_name];



if ($_SERVER['HTTP_AUTHORIZATION']) {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $result = require 'create.php';
        sendResponse($result);
        exit;
    }
}
checkEndpoint();

// echo '123';