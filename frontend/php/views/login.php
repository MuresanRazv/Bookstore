<?php
require_once 'models/User.php';
require_once 'includes/Session.php';

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve data from the request body
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Check if the required fields are present in the request data
    if (isset($requestData['email']) && isset($requestData['password'])) {
        $email = $requestData['email'];
        $password = $requestData['password'];

        global $pdo;

        $user = new User($pdo);
        // Call the login method from the User model
        if ($response = $user->login($email, $password)) {
            // If login is successful, create a response array
            $logged_in = ['token' => $response];
            // Send the response as JSON
            echo json_encode($logged_in);
            // End script execution
            exit();
        } else {
            // If login fails, set an error message
            $error = 'Invalid email or password';
        }
    } else {
        // If required fields are missing in the request, set an error message
        $error = 'Missing email or password in the request';
    }

    // Send the error message as JSON in case of errors
    echo json_encode(['error' => $error]);
}

