<?php

class User {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function login($username, $password) {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $token = bin2hex(random_bytes(32));
            $stmt = $this->pdo->prepare("UPDATE users SET token = ? WHERE user_id = ?");
            $stmt->execute([$token, $user['user_id']]);
            global $session;
            $session->login($user['user_id'], $token);

            return $token;
        } else {
            return false;
        }
    }

    public function getUserByUsername($username) {
        // Prepare SQL statement to fetch user by username
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserTokenById($user_id) {
        // Prepare SQL statement to fetch user by username
        $stmt = $this->pdo->prepare("SELECT token FROM users WHERE user_id= ?");
        $stmt->execute([$user_id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function register($email, $password, $username, $county, $city) {
        if ($this->getUserByUsername($username)) {
            return false;
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $token = bin2hex(random_bytes(32)); // Example: Generate a 32-byte random token

        $stmt = $this->pdo->prepare("INSERT INTO users (username, password, token, email, county, city, role) VALUES (?, ?, ?, ?, ?, ?, 'user')");
        $success = $stmt->execute([$username, $hashedPassword, $token, $email, $county, $city]);

        if ($success) {
            global $session;
            $session->login($this->getUserByUsername($username)['user_id'], $token);
            return $token;
        } else {
            return false;
        }
    }
}
