const params = new URLSearchParams(window.location.search);
const level = parseInt(params.get('level')) || 1;
const category = localStorage.getItem('selectedCategory') || 'sports';

let questions = [];
let currentQ = 0;
let score = 0;
let timer = null;
let timeLeft = 20;
let hintUsed = false;
let wrongAnswers = [];

document.getElementById('levelLabel').textContent = `LEVEL ${level}`;
function calculateStars(score, total) {
  const percent = (score / total) * 100;
  if (percent === 100) return 3;
  if (percent >= 50) return 2;
  if (percent > 0) return 1;
  return 0;
}
const starsKey = `levelStars_${category}`;
const starsData = JSON.parse(localStorage.getItem(starsKey) || '{}');
const earnedStars = calculateStars(score, questions.length);
if (!starsData[level] || starsData[level] < earnedStars) {
  starsData[level] = earnedStars;
}
localStorage.setItem(starsKey, JSON.stringify(starsData));

function playSound(type) {
  const soundOn = localStorage.getItem('soundOn') !== 'false';
  if (!soundOn) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = type === 'correct' ? 700 : 200;
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  osc.start();
  osc.stop(ctx.currentTime + 0.15);
}

async function loadQuestions() {
  const bankMap = {
    sports: typeof sportsQuestions !== 'undefined' ? sportsQuestions : [],
    temples: typeof templesQuestions !== 'undefined' ? templesQuestions : [],
    songs: typeof songsQuestions !== 'undefined' ? songsQuestions : [],
    economics: typeof economicsQuestions !== 'undefined' ? economicsQuestions : []
  };
  const bank = [...(bankMap[category] || bankMap.sports)];
  const response = await fetch(`/api/questions/${encodeURIComponent(category)}`);
  if (!response.ok) {
    throw new Error(`Unable to load saved questions (${response.status}).`);
  }
  const savedQuestions = await response.json();
  bank.push(...savedQuestions.map(({ text, options, correct }) => ({ text, options, correct })));
  if (bank.length === 0) {
    throw new Error('No questions are available for this category.');
  }
  const perLevel = 6;
  const startIndex = ((level - 1) * perLevel) % bank.length;

  let selected = [];
  for (let i = 0; i < perLevel; i++) {
    selected.push(bank[(startIndex + i) % bank.length]);
  }
  questions = selected;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQ];
  document.getElementById('questionText').textContent = q.text;
  document.getElementById('scoreLabel').textContent = `Score: ${score}`;
  document.getElementById('progressText').textContent = `Question ${currentQ + 1} of ${questions.length}`;
  document.getElementById('progressBar').style.width = `${((currentQ) / questions.length) * 100}%`;
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('hintBtn').style.display = 'inline-block';
  hintUsed = false;

  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.dataset.idx = idx;
    btn.onclick = () => selectAnswer(idx);
    grid.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 20;
  document.getElementById('timerLabel').textContent = `⏱ ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timerLabel').textContent = `⏱ ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1);
    }
  }, 1000);
}

function useHint() {
  if (hintUsed) return;
  hintUsed = true;
  document.getElementById('hintBtn').style.display = 'none';
  const q = questions[currentQ];
  const buttons = document.querySelectorAll('.option-btn');
  let hidden = 0;
  buttons.forEach(b => {
    const idx = parseInt(b.dataset.idx);
    if (idx !== q.correct && hidden < 2) {
      b.style.visibility = 'hidden';
      hidden++;
    }
  });
}

function selectAnswer(idx) {
  clearInterval(timer);
  const q = questions[currentQ];
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(b => b.onclick = null);

  if (idx === q.correct) {
    buttons[idx].classList.add('correct');
    score++;
    playSound('correct');
  } else {
    if (idx >= 0) buttons[idx].classList.add('wrong');
    buttons[q.correct].classList.add('correct');
    playSound('wrong');
    wrongAnswers.push({ question: q.text, yourAnswer: idx >= 0 ? q.options[idx] : 'Time up', correct: q.options[q.correct] });
  }
  document.getElementById('scoreLabel').textContent = `Score: ${score}`;
  document.getElementById('hintBtn').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
  currentQ++;
  if (currentQ < questions.length) {
    showQuestion();
  } else {
    finishLevel();
  }
}

function finishLevel() {
  document.getElementById('progressBar').style.width = '100%';
  const storageKey = `completedLevels_${category}`;
  const completed = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (!completed.includes(level)) {
    completed.push(level);
    localStorage.setItem(storageKey, JSON.stringify(completed));
  }

  // Update global stats
  const username = localStorage.getItem('currentUser');
  const statsKey = `stats_${username}`;
  const stats = JSON.parse(localStorage.getItem(statsKey) || '{"totalScore":0,"totalQuestions":0,"totalCorrect":0,"badges":[]}');
  stats.totalScore += score;
  stats.totalQuestions += questions.length;
  stats.totalCorrect += score;
  if (completed.length === 5 && !stats.badges.includes('5 Levels')) stats.badges.push('5 Levels');
  if (completed.length === 10 && !stats.badges.includes('10 Levels')) stats.badges.push('10 Levels');
  if (score === questions.length && !stats.badges.includes('Perfect Score')) stats.badges.push('Perfect Score');
  localStorage.setItem(statsKey, JSON.stringify(stats));

  localStorage.setItem('lastScore', JSON.stringify({ score, total: questions.length, level, category, wrongAnswers }));
  window.location.href = 'result.html';
}

loadQuestions().catch(error => {
  document.getElementById('questionText').textContent =
    `Unable to load questions. Please refresh and try again. (${error.message})`;
  document.getElementById('optionsGrid').replaceChildren();
  document.getElementById('hintBtn').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'none';
});