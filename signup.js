const signupForm = document.getElementById('signupForm');
const errorMsg = document.getElementById('error');
const successMsg = document.getElementById('success');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const age = parseInt(document.getElementById('age').value);
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);

    // Clear messages
    errorMsg.textContent = '';
    successMsg.textContent = '';

    // Password validation
    if (password !== confirmPassword) {
        errorMsg.textContent = "Passwords do not match!";
        return;
    }

    // Age, Height, Weight validation
    if (age < 1 || age > 120) {
        errorMsg.textContent = "Enter a valid age (1-120)";
        return;
    }
    if (height < 50 || height > 250) {
        errorMsg.textContent = "Enter a valid height in cm (50-250)";
        return;
    }
    if (weight < 10 || weight > 300) {
        errorMsg.textContent = "Enter a valid weight in kg (10-300)";
        return;
    }

    // Simulate database: get users from LocalStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username or email exists
    const userExists = users.some(user => user.username === username || user.email === email);
    if (userExists) {
        errorMsg.textContent = "Username or Email already exists!";
        return;
    }

    // Save new user
    const newUser = { fullname, email, username, password, age, height, weight };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    successMsg.textContent = "Account created successfully! Redirecting to login...";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);

    signupForm.reset();
});
