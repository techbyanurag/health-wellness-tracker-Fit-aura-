// Hamburger toggle for dropdown menu
const hamburger = document.getElementById('hamburger');
const dropdown  = document.getElementById('dropdown');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  dropdown.classList.toggle('show');
});
// ✅ Calories Burned
function updateCalories() {
  const input = document.getElementById('calInput');
  const value = parseInt(input.value, 10);
  if (isNaN(value) || value < 0) return;

  const goal = 500; // daily calorie goal
  updateRing('calorieRing', 'calorieValue', value, goal);
}

// ✅ BMI Calculation
function updateBMI() {
  const weight = parseFloat(document.getElementById('bmiWeight').value);
  const height = parseFloat(document.getElementById('bmiHeight').value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) return;

  const heightM = height / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);

  // Scale ring relative to BMI of 40 (obesity level as 100%)
  const maxBMI = 40;
  updateRing('bmiRing', 'bmiValue', bmi, maxBMI);
}

// ✅ Steps Count
function updateSteps() {
  const steps = parseInt(document.getElementById('stepsInput').value, 10);
  if (isNaN(steps) || steps < 0) return;

  const goalSteps = 10000; // daily step goal
  updateRing('stepsRing', 'stepsValue', steps, goalSteps);
}

// ✅ Generic Ring Updater
function updateRing(ringId, valueId, value, goal) {
  const percent = Math.min((value / goal) * 100, 100);
  const degrees = (percent / 100) * 360;
  const ring = document.getElementById(ringId);
  ring.style.background = `conic-gradient(#4cff8f ${degrees}deg, #444 ${degrees}deg)`;
  document.getElementById(valueId).textContent = value;
}
