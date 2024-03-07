<?php

class Book {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAllBooks() {
        $stmt = $this->pdo->query("SELECT * FROM Books");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBooks($skip, $length) {
        $stmt = $this->pdo->prepare("SELECT * FROM Books LIMIT ?, ?");
        $stmt->bindParam(1, $skip, PDO::PARAM_INT);
        $stmt->bindParam(2, $length, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBookById($bookId) {
        $stmt = $this->pdo->prepare("SELECT * FROM Books WHERE book_id = ?");
        $stmt->execute([$bookId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function addBook($title, $author, $description, $price, $categoryId) {
        $stmt = $this->pdo->prepare("INSERT INTO Books (title, author, description, price, category_id) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$title, $author, $description, $price, $categoryId]);
        return $this->pdo->lastInsertId(); // Return the ID of the newly inserted book
    }

    public function updateBook($bookId, $title, $author, $description, $price, $categoryId) {
        $stmt = $this->pdo->prepare("UPDATE Books SET title = ?, author = ?, description = ?, price = ?, category_id = ? WHERE book_id = ?");
        return $stmt->execute([$title, $author, $description, $price, $categoryId, $bookId]);
    }

    public function deleteBook($bookId) {
        $stmt = $this->pdo->prepare("DELETE FROM Books WHERE book_id = ?");
        return $stmt->execute([$bookId]);
    }

    public function searchByCharacters($keyword) {
        $keyword = "%$keyword%";
        $stmt = $this->pdo->prepare("SELECT * FROM books WHERE title LIKE ? OR author LIKE ?");
        $stmt->execute([$keyword, $keyword]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function searchByKeyword($keyword) {
        $stmt = $this->pdo->prepare("SELECT * FROM books WHERE title LIKE ?");
        $stmt->execute(["%$keyword%"]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

