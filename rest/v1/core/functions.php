<?php


require 'Database.php';
require 'Response.php';

// require '../models/Test.php';




function checkDatabaseConnection()
{
    try {
        $conn = Database::connectDb();
        return $conn;
    } catch (PDOException $ex) {
        $response = new Response();
        $data = [];
        $data['success'] = true;
        $data['data'] = [];
        $data['count'] = 0;
        $data['type'] = 'invalid_request_error';
        $data['error'] = 'Database Connection Failed.';
        $response->setData($data);
        $response->send();
        exit;
    }
}
function returnError($msg)
{
    $response = new Response();
    $data = [];
    $data['success'] = true;
    $data['data'] = [];
    $data['count'] = 0;
    $data['message'] = $msg;
    $response->setData($data);
    $response->send();
    exit;
}

function getResultData($query)
{
    $data = $query->fetchAll();
    return $data;
}

function getQueriedData($query)
{
    $response = new Response();
    $data = [];
    $data['success'] = true;
    $data['data'] = getResultData($query);
    $data['count'] = $query->rowCount();
    $data['dateNow'] = date('Y-m-d');
    $response->setData($data);
    $response->send();
    exit;
}

function checkQuery($query, $msg)
{
    // if query is false then do this code
    if (!$query) {
        $response = new Response();
        $data = [];
        $data['success'] = true;
        $data['error'] = $msg;
        $data['count'] = 0;
        $data['type'] = 'incalid_request_error';
        $data['dateNow'] = date('Y-m-d');
        $response->setData($data);
        $response->send();
        exit;
    }
}
function sendResponse($result)
{
    $response = new Response();
    $response->setSuccess(true);
    $response->setStatusCode(200);
    $response->setData($result);
    $response->send();
}
function checkReadAll($object)
{
    $query = $object->readAll();
    checkQuery($query, "There's something wrong with models.");
    return $query;
}

// $conn = null;
// $conn = checkDatabaseConnection();
// $test = new Test($conn);

// $query = checkReadAll($test);
// getQueriedData($query);