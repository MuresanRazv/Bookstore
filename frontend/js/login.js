function login(email, password) {
    fetch('http://localhost/bookstore/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
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
                console.error('Login failed:', data.message);
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
        });
}

function handleLogin(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    login(email, password);
}

document.getElementById('login-form').addEventListener('submit', handleLogin);