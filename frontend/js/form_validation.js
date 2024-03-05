function validatePassword() {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById("confirm_password").value;
    let notice = document.getElementById('password_match');
    let password_box = document.getElementById('password');
    let confirm_password_box = document.getElementById('confirm_password');

    if (password !== confirmPassword) {
        notice.style.display = 'inherit';
        password_box.style.outlineColor = 'red';
        confirm_password_box.style.outlineColor = 'red';

        return false;
    } else {
        notice.style.display = 'none'
        password_box.style.outlineColor = 'inherit';
        confirm_password_box.style.outlineColor = 'inherit';
    }

    return true;
}

document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirm_password').addEventListener('input', validatePassword);