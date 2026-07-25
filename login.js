const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usernameOrEmail = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Get users from LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find matching user
    const matchedUser = users.find(user =>
        (user.username === usernameOrEmail || user.email === usernameOrEmail) 
        && user.password === password
    );

    if (matchedUser) {
        // Login successful
        errorMsg.style.color = '#4cff8f';
        errorMsg.textContent = `Welcome, ${matchedUser.fullname}! Redirecting to homepage...`;

        setTimeout(() => {
            window.location.href = "home.html"; // redirect to home
        }, 1500);

        loginForm.reset();
    } else {
        // Invalid credentials
        errorMsg.style.color = '#ff4d4d';
        errorMsg.textContent = "Invalid username/email or password!";
    }
});
