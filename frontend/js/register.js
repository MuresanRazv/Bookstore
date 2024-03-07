function registerUser(email, password, username, county, city) {
    const formData = {
        email: email,
        password: password,
        username: username,
        county: county,
        city: city
    };

    fetch('http://localhost/bookstore/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '../pages/index.html';
            } else {
            }
        })
        .catch(error => {
            console.error('Error registering user:', error);
        });
}

function handleRegister(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    var county = document.getElementById('county').value;
    var city = document.getElementById('city').value;

    registerUser(email, password, username, county, city);
}

document.getElementById('register-form').addEventListener('submit', handleRegister);