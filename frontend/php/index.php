<?php

// Allow cross-origin requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the following HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow the following headers in the request
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Allow credentials (cookies, authorization headers, etc) to be included in the request
header("Access-Control-Allow-Credentials: true");


require_once 'config/db.php';
require_once 'includes/session.php';

$session = new Session();
//TODO figure out why session is not working
$routes = [
    '/' => 'home.php',
    '/login' => 'login.php',
    '/register' => 'register.php',
    '/get_books' => 'get_books.php',
    '/search' => 'search.php',
    '/search_by_keyword' => 'searchByKeyword.php',
    '/session' => 'session.php'
];

$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestPath = rtrim($requestPath, '/');
$requestPath = str_replace('/bookstore', '', $requestPath);

if ($requestPath === '') {
    $requestPath = '/';
}

if (array_key_exists($requestPath, $routes)) {
    require_once 'views/' . $routes[$requestPath];
} else {
    http_response_code(404);
    echo '404 Page Not Found';
}