const profileForm = document.getElementById('profileForm');
const successMsg = document.getElementById('success');
const errorMsg = document.getElementById('error');

// Load current user (if logged in)
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || { username: 'User' };

// Pre-fill form fields if data exists
document.getElementById('age').value = currentUser.age || '';
document.getElementById('height').value = currentUser.height || '';
document.getElementById('weight').value = currentUser.weight || '';
document.getElementById('steps').value = currentUser.steps || '';
document.getElementById('distance').value = currentUser.distance || '';

profileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    currentUser.age = parseInt(document.getElementById('age').value);
    currentUser.height = parseInt(document.getElementById('height').value);
    currentUser.weight = parseInt(document.getElementById('weight').value);
    currentUser.steps = parseInt(document.getElementById('steps').value) || 0;
    currentUser.distance = parseFloat(document.getElementById('distance').value) || 0;

    // Save current user
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Also update user in 'users' array if you have multiple users
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const idx = users.findIndex(u => u.username === currentUser.username);
    if (idx !== -1) { 
        users[idx] = currentUser; 
        localStorage.setItem('users', JSON.stringify(users)); 
    }

    successMsg.textContent = 'Profile updated successfully!';
    errorMsg.textContent = '';
    
    // Optionally redirect to home
    setTimeout(() => { window.location.href = 'home.html'; }, 1000);

  } catch(err) {
    console.error(err);
    errorMsg.textContent = 'Error saving profile!';
  }
});
