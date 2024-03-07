<?php

// Allow cross-origin requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the following HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow the following headers in the request
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Allow credentials (cookies, authorization headers, etc) to be included in the request
header("Access-Control-Allow-Credentials: true");

require_once 'controllers/bookController.php';
require_once 'config/db.php';

$bookController = new BookController();

// Fetch books data using the getBooks function
$input = $_GET['input'];
$books = $bookController->searchByCharacters($input);

// Encode the books data into JSON format and echo it
echo json_encode($books);