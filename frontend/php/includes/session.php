<?php

class Session {
    public function __construct() {
        session_start();
    }

    public function isLoggedIn() {
        if (isset($_SESSION['user_id']) && isset($_SESSION['token'])) {
            $storedToken = $_SESSION['token'];
            global $pdo;
            $user = new User($pdo);
            $userToken = $user->getUserTokenById($_SESSION['user_id']);
            if ($storedToken === $userToken) {
                return true;
            }
        }

        return false;
    }

    public function login($userId, $token) {
        $_SESSION['user_id'] = $userId;
        $_SESSION['token'] = $token;
    }

    public function logout() {
        session_unset();
        session_destroy();
    }

    public function getUserId() {
        return $_SESSION['user_id'] ?? null;
    }

    public function getToken() {
        return $_SESSION['token'] ?? null;
    }
}
