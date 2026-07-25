// ---------- Hamburger toggle ----------
const hamburger = document.getElementById('hamburger');
const dropdown = document.getElementById('dropdown');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  dropdown.classList.toggle('show');
});

window.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !dropdown.contains(e.target)) {
    hamburger.classList.remove('active');
    dropdown.classList.remove('show');
  }
});

// ---------- Load current user ----------
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

// ---------- Fill User Info ----------
function fillUserInfo() {
  const userDiv = document.querySelector('.user-info');
  if (!userDiv) return;

  userDiv.innerHTML = `
      <h2>User Information</h2>
      <p><strong>Name:</strong> ${currentUser.username || '-'}</p>
      <p><strong>Age:</strong> ${currentUser.age || '-'}</p>
      <p><strong>Height:</strong> ${currentUser.height || '-'} cm</p>
      <p><strong>Weight:</strong> ${currentUser.weight || '-'} kg</p>
      <p><strong>Steps:</strong> ${currentUser.steps || 0}</p>
      <p><strong>Distance:</strong> ${currentUser.distance || 0} km</p>
      <p><strong>Calories Burned:</strong> ${currentUser.calories || 0}</p>
  `;
}
fillUserInfo();

// ---------- Animate Circular Widget ----------
function animateCircle(circleEl, labelEl, value, goal, unit) {
  value = value || 0;
  labelEl.textContent = `${value} ${unit}`;

  const percent = goal > 0 ? Math.min(value / goal, 1) : 0;
  const targetDeg = percent * 360;

  let startDeg = 0;
  const duration = 800;
  const startTime = performance.now();

  function step(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
    const currentDeg = startDeg + (targetDeg - startDeg) * eased;
    circleEl.style.background = `conic-gradient(var(--accent) ${currentDeg}deg, #333 ${currentDeg}deg)`;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ---------- Calories Widget ----------
const calorieCircle = document.getElementById('calorieCircle');
const calorieLabel = document.getElementById('calorieLabel');
const calorieGoal = 500; // daily goal
animateCircle(calorieCircle, calorieLabel, currentUser.calories, calorieGoal, 'kcal');

// ---------- Steps Widget ----------
const stepsCircle = document.getElementById('stepsCircle');
const stepsLabel = document.getElementById('stepsLabel');
const stepsGoal = 10000; // typical daily steps goal
animateCircle(stepsCircle, stepsLabel, currentUser.steps, stepsGoal, 'steps');

// ---------- BMI Widget ----------
function updateBMI() {
  const bmiBar = document.getElementById('bmiBar');
  const bmiLabel = document.getElementById('bmiLabel');
  const heightM = (currentUser.height || 0) / 100;
  const weightKg = currentUser.weight || 0;

  let bmi = 0;
  if (heightM > 0 && weightKg > 0) bmi = weightKg / (heightM ** 2);
  bmi = Math.round(bmi * 10) / 10; // round to 1 decimal
  bmiLabel.textContent = bmi;

  // map BMI to 0-100% for bar width
  let percent = 0;
  if (bmi < 18.5) percent = 25;
  else if (bmi < 25) percent = 50;
  else if (bmi < 30) percent = 75;
  else percent = 100;

  bmiBar.style.width = `${percent}%`;
}
updateBMI();

// ---------- Logout ----------
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = "login.html";
});
