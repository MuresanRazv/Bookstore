<?php

// Allow cross-origin requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the following HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow the following headers in the request
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Allow credentials (cookies, authorization headers, etc) to be included in the request
header("Access-Control-Allow-Credentials: true");

require_once 'models/Book.php';
require_once 'config/db.php';

class BookController {
    private $bookModel;

    public function __construct() {
        global $pdo;
        $this->bookModel = new Book($pdo);
    }

    public function getBookById($bookId) {
        $book = $this->bookModel->getBookById($bookId);
        return json_encode($book);
    }

    public function getBooks($skip, $length) {
        $books = $this->bookModel->getBooks($skip, $length);

        return json_encode($books);
    }

    public function searchByCharacters($keyword) {
        $books = $this->bookModel->searchByCharacters($keyword);
        return json_encode($books);
    }

    public function searchByKeyword($keyword) {
        $books = $this->bookModel->searchByKeyword($keyword);
        return json_encode($books);
    }
}