function search(array, query) {
    const searchTerm = query.toLowerCase();

    return array.filter(book => {
        return book.bookTitle.toLowerCase().includes(searchTerm) ||
            book.bookAuthor.toLowerCase().includes(searchTerm);
    });
}

function searchByKeyword(array, keyword) {
    const searchTerm = keyword.toLowerCase();

    return array.filter(item => {
        return Object.values(item).some(value =>
            typeof value === 'string' && value.toLowerCase().split(' ').includes(searchTerm)
        );
    });
}

// Function to sort data based on a specific column
function sortByColumn(columnName, data) {
    return [...data].sort((a, b) => {
        if (a[columnName] < b[columnName]) return -1;
        if (a[columnName] > b[columnName]) return 1;
        return 0;
    });
}

function renderSearchedBooks(books) {
    let result = '';
    let bookContainer = $('#searched-books-container');
    bookContainer.empty();

    books.forEach((book) => {
        result += `
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
    })

    bookContainer.html(result);
}

$(document).ready(function() {
    $('#searchInput').keyup(function () {
        let query = $(this).val().trim();
        const searchResults = document.getElementById('searchResults');

        if (query.length > 0) {
            let filtered_books = search(books, query);
            $('#searchResults').empty();
            filtered_books.forEach((book) => {
                const option = document.createElement('option');
                option.text = book.bookTitle;
                option.value = book.bookId;
                searchResults.appendChild(option)
                searchResults.addEventListener('change', function() {
                    window.location.href = '../pages/product_details.html';
                });
            })
        } else {
            $('#searchResults').empty();
        }
    });

    let searchedBooks = [];

    $('#searchByKeywordInput').keyup(function () {
        let query = $(this).val().trim();

        if (query.length > 0) {
            searchedBooks = searchByKeyword(books, query);

            renderSearchedBooks(searchedBooks);
        } else {
            $('#searched-books-container').empty();
        }
    })

    const radioButtons = document.querySelectorAll('input[type="radio"][name="sort"]');

    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change', function() {
            if (this.checked) {
                searchedBooks = sortByColumn(this.value, searchedBooks);
                renderSearchedBooks(searchedBooks);
            }
        });
    });
})