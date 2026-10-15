const data = JSON.parse(localStorage.getItem('lastScore') || '{"score":0,"total":0,"level":1,"wrongAnswers":[],"stars":0}');
const username = localStorage.getItem('currentUser') || 'guest';
const coinBalance = Number.parseInt(localStorage.getItem(`coins_${username}`) || '0', 10);
const extraChanceBalance = Number.parseInt(localStorage.getItem(`extraChances_${username}`) || '0', 10);

document.getElementById('winLevelText').textContent = `LEVEL ${data.level}`;
document.getElementById('winCoinBalance').textContent = coinBalance;
document.getElementById('winExtraChanceBalance').textContent = extraChanceBalance;
document.getElementById('giftReward').textContent = data.extraChanceReward > 0
  ? `+${data.extraChanceReward} Extra Chance for next level`
  : data.level >= 30
    ? 'No next level reward'
    : 'First-completion gift already collected';

const starsDiv = document.getElementById('winStars');
let starText = '';
for (let i = 0; i < 3; i++) {
  starText += i < (data.stars || 0) ? '⭐' : '☆';
}
starsDiv.textContent = starText;

document.getElementById('winOverlay').style.display = 'flex';

const winNextBtn = document.getElementById('winNextBtn');
if (data.level < 30) {
  winNextBtn.onclick = () => window.location.href = `quiz.html?level=${data.level + 1}`;
} else {
  winNextBtn.textContent = 'LEVEL MAP 🏠';
  winNextBtn.onclick = () => window.location.href = 'levels.html';
}

function closeWinPopup() {
  document.getElementById('winOverlay').style.display = 'none';
}

document.getElementById('resultTitle').textContent = `LEVEL ${data.level} COMPLETE!`;
document.getElementById('finalScore').textContent = `${data.score} / ${data.total}`;

const starsEarned = data.stars || 0;
let starDisplay = '';
for (let i = 0; i < 3; i++) {
  starDisplay += i < starsEarned ? '⭐' : '☆';
}
document.getElementById('starsEarned').textContent = starDisplay;

if (data.score === data.total) {
  launchConfetti();
}

if (data.wrongAnswers && data.wrongAnswers.length > 0) {
  const section = document.getElementById('reviewSection');
  section.innerHTML = '<h3 class="review-title">Review</h3>';
  data.wrongAnswers.forEach(w => {
    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `<p>${w.question}</p><p class="wrong-text">Your answer: ${w.yourAnswer}</p><p class="correct-text">Correct: ${w.correct}</p>`;
    section.appendChild(div);
  });
}

const nextLevelBtn = document.getElementById('nextLevelBtn');
const TOTAL_LEVELS = 30;
if (data.level < TOTAL_LEVELS) {
  nextLevelBtn.onclick = () => window.location.href = `quiz.html?level=${data.level + 1}`;
} else {
  nextLevelBtn.textContent = '🎉 ALL LEVELS DONE!';
  nextLevelBtn.disabled = true;
}

function retryLevel() {
  window.location.href = `quiz.html?level=${data.level}`;
}

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const colors = ['#00f5ff', '#ff00e6', '#ffd700', '#00ff88'];
  let particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: -20,
    r: Math.random() * 6 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 3 + 2,
    drift: Math.random() * 2 - 1
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.r, p.r);
    });
    particles = particles.filter(p => p.y < canvas.height);
    if (particles.length > 0) requestAnimationFrame(animate);
  }
  animate();
}