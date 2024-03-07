function fetchBooksPaginated(skip, length) {
    const url = `http://localhost/bookstore/get_books?skip=${skip}&length=${length}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data = JSON.parse(data)
            data.forEach((book) => {
                addBook(book);
            })
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
}

function addBook(book) {
    var booksContainer = document.getElementById('books-container');
    var bookHTML = `
        <td>
            <article class="book-card">
                <a href="product_details.html"><img src="${book.image_url}" alt="${book.title}"></a>
                <h2>${book.title}</h2>
                <p>Author: ${book.author}</p>
                <p>Price: ${book.price}</p>
                <button>Add to Cart</button>
            </article>
        </td>
    `;
    booksContainer.innerHTML += bookHTML;
}

function showBooks(skip = 0, length = 0) {
    fetchBooksPaginated(skip, length)
    document.querySelector('.view-more-btn').style.display = 'none';
}

fetchBooksPaginated(0, 2);