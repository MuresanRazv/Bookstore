let books = [
    {
        bookTitle: 'Title of Book 1',
        bookAuthor: 'Author Name',
        bookPrice: '24.99',
        bookImg: '../images/book1.jpg'
    },
    {
        bookTitle: 'Title of Book 1',
        bookAuthor: 'Author Name',
        bookPrice: '24.99',
        bookImg: '../images/book2.jpg'
    },
    {
        bookTitle: 'Title of Book 1',
        bookAuthor: 'Author Name',
        bookPrice: '24.99',
        bookImg: '../images/book1.jpg'
    },
    {
        bookTitle: 'Title of Book 1',
        bookAuthor: 'Author Name',
        bookPrice: '24.99',
        bookImg: '../images/book2.jpg'
    },
];

function addBook(book) {
    var booksContainer = document.getElementById('books-container');
    var bookHTML = `
        <td>
            <article class="book-card">
                <a href="product_details.html"><img src="${book.bookImg}" alt="${book.bookTitle}"></a>
                <h2>${book.bookTitle}</h2>
                <p>Author: ${book.bookAuthor}</p>
                <p>Price: ${book.bookPrice}</p>
                <button>Add to Cart</button>
            </article>
        </td>
    `;
    booksContainer.innerHTML += bookHTML;
}

function showBooks(skip = 0, length = 0) {
    let booksContainer = document.getElementById('books-container');
    for (let i = skip; i < length < books.length; i++) {
        addBook(books[i]);
    }
    document.querySelector('.view-more-btn').style.display = 'none';
}

for (let i = 0; i < 2; i++) {
    addBook(books[i]);
}