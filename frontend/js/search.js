async function fetchBooks(input, keyword = false) {
    const url = `http://localhost/bookstore/${keyword ? 'search_by_keyword': 'search'}?input=${input}`;

    return await fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data = JSON.parse(data)
            return data;
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
}

function search(array, query) {
    const searchTerm = query.toLowerCase();

    return array.filter(book => {
        return book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm);
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
                            <a href="product_details.html"><img src="${book.image_url}" alt="${book.title}"></a>
                            <h2>${book.title}</h2>
                            <p>Author: ${book.author}</p>
                            <p>Price: ${book.price}</p>
                            <button>Add to Cart</button>
                        </article>
                    </td>
                    `;
    })

    bookContainer.html(result);
}

$(document).ready(function() {
    $('#searchInput').keyup(async function () {
        let query = $(this).val().trim();
        const searchResults = document.getElementById('searchResults');

        if (query.length > 0) {
            let filtered_books = await fetchBooks(query, false);
            $('#searchResults').empty();
            filtered_books.forEach((book) => {
                const option = document.createElement('option');
                option.text = book.title;
                option.value = book.id;
                searchResults.appendChild(option)
                searchResults.addEventListener('change', function () {
                    window.location.href = '../pages/product_details.html';
                });
            })
        } else {
            $('#searchResults').empty();
        }
    });

    let searchedBooks = [];

    $('#searchByKeywordInput').keyup(async function () {
        let query = $(this).val().trim();

        if (query.length > 0) {
            searchedBooks = await fetchBooks(query, true);

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