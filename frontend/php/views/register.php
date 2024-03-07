<?php
require_once 'models/User.php';
require_once 'includes/Session.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);

    if (isset($requestData['email']) && isset($requestData['password']) && isset($requestData['username'])) {
        $email = $requestData['email'];
        $password = $requestData['password'];
        $username = $requestData['username'];
        $county = $requestData['county'];
        $city = $requestData['city'];

        global $pdo;

        $user = new User($pdo);
        $registered = $user->register($email, $password, $username, $county, $city);

        if ($registered) {
            echo json_encode(['token' => $registered]);
            exit();
        } else {
            echo json_encode(['success' => false, 'message' => 'Registration failed']);
            exit();
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit();
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit();
}
