const params = new URLSearchParams(window.location.search);
const level = parseInt(params.get('level')) || 1;
const category = localStorage.getItem('selectedCategory') || 'sports';
const username = localStorage.getItem('currentUser') || 'guest';
const coinStorageKey = `coins_${username}`;
const extraChanceStorageKey = `extraChances_${username}`;
const coinChanceMilestoneKey = `coinChanceMilestones_${username}`;

let questions = [];
let currentQ = 0;
let score = 0;
let timer = null;
let timeLeft = 20;
let hintUsed = false;
let wrongAnswers = [];
let isPaused = false;
let timerWasRunningBeforePause = false;
let pendingCoin = false;
let pendingWrongAnswer = null;

document.getElementById('levelLabel').textContent = `LEVEL ${level}`;
updateCoinBalance();

function updateCoinBalance() {
  const coins = Number.parseInt(localStorage.getItem(coinStorageKey) || '0', 10);
  document.getElementById('coinBalance').textContent = `🪙 Coins: ${coins}`;
  const extraChances = Number.parseInt(localStorage.getItem(extraChanceStorageKey) || '0', 10);
  document.getElementById('extraChanceBalance').textContent = `🎁 Chances: ${extraChances}`;
}

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

function loadQuestions() {
  const bankMap = {
    sports: typeof sportsQuestions !== 'undefined' ? sportsQuestions : [],
    temples: typeof templesQuestions !== 'undefined' ? templesQuestions : [],
    songs: typeof songsQuestions !== 'undefined' ? songsQuestions : [],
    economics: typeof economicsQuestions !== 'undefined' ? economicsQuestions : []
  };
  const bank = bankMap[category] || bankMap.sports;

  if (!bank || bank.length === 0) {
    document.getElementById('questionText').textContent = 'No questions found for this category.';
    return;
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
  document.getElementById('nextBtn').disabled = false;
  document.getElementById('collectCoinBtn').style.display = 'none';
  document.getElementById('extraChanceBtn').style.display = 'none';
  pendingCoin = false;
  pendingWrongAnswer = null;
  document.getElementById('hintBtn').style.display = 'inline-block';
  hintUsed = false;

  const playBtn = document.getElementById('playSoundBtn');
  const audioStatus = document.getElementById('audioStatus');
  if (q.isAudio) {
    playBtn.style.display = 'block';
    playBtn.disabled = false;
    playBtn.textContent = '🔊 Listen to the Tune';
    audioStatus.style.display = 'block';
    audioStatus.textContent = 'Listen to the tune, then choose its name.';
  } else {
    playBtn.style.display = 'none';
    audioStatus.style.display = 'none';
  }

  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'wood-option-btn';
    btn.textContent = opt;
    btn.dataset.idx = idx;
    btn.dataset.choice = String(idx + 1);
    btn.setAttribute('aria-label', `${idx + 1}: ${opt}`);
    btn.onclick = () => selectAnswer(idx);
    grid.appendChild(btn);
  });

  startTimer();
}

async function replayMelody() {
  const question = questions[currentQ];
  if (!question || !question.isAudio || isPaused) return;

  const playButton = document.getElementById('playSoundBtn');
  const audioStatus = document.getElementById('audioStatus');
  const backgroundMusic = document.getElementById('bgMusic');
  const resumeBackgroundMusic = backgroundMusic && !backgroundMusic.paused;

  playButton.disabled = true;
  audioStatus.textContent = 'Playing tune…';
  if (resumeBackgroundMusic) backgroundMusic.pause();

  try {
    const duration = await playMelody(question.notes, question.noteDuration);
    window.setTimeout(() => {
      playButton.disabled = false;
      audioStatus.textContent = 'Listen again or select your answer.';
      if (resumeBackgroundMusic && localStorage.getItem('musicOn') !== 'false') {
        backgroundMusic.play().catch(() => {});
      }
    }, duration * 1000);
  } catch (error) {
    playButton.disabled = false;
    audioStatus.textContent = 'Could not play the tune. Check browser audio settings and try again.';
    console.error('Could not play song question audio:', error);
  }
}

function startTimer(reset = true) {
  clearInterval(timer);
  if (reset) timeLeft = 20;
  document.getElementById('timerLabel').textContent = `⏱ ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timerLabel').textContent = `⏱ ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      selectAnswer(-1);
    }
  }, 1000);
}

function openQuizMenu() {
  if (isPaused) return;
  isPaused = true;
  timerWasRunningBeforePause = timer !== null;
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  const menu = document.getElementById('quizMenu');
  menu.classList.add('is-open');
  menu.setAttribute('aria-hidden', 'false');
  menu.querySelector('button').focus();
}

function resumeQuiz() {
  if (!isPaused) return;
  isPaused = false;
  const menu = document.getElementById('quizMenu');
  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');
  if (timerWasRunningBeforePause) startTimer(false);
  timerWasRunningBeforePause = false;
}

function restartQuiz() {
  window.location.href = `quiz.html?level=${level}`;
}

function goToHome() {
  window.location.href = 'index.html';
}

function quitQuiz() {
  window.location.href = 'levels.html';
}

function collectCoin() {
  if (!pendingCoin) return;
  const currentCoins = Number.parseInt(localStorage.getItem(coinStorageKey) || '0', 10);
  const storedMilestones = localStorage.getItem(coinChanceMilestoneKey);
  const claimedMilestones = storedMilestones === null
    ? Math.floor(currentCoins / 5)
    : Number.parseInt(storedMilestones, 10);
  const coins = currentCoins + 1;
  localStorage.setItem(coinStorageKey, coins);
  const newMilestones = Math.floor(coins / 5);
  if (newMilestones > claimedMilestones) {
    const extraChances = Number.parseInt(localStorage.getItem(extraChanceStorageKey) || '0', 10);
    localStorage.setItem(extraChanceStorageKey, extraChances + newMilestones - claimedMilestones);
  }
  localStorage.setItem(coinChanceMilestoneKey, Math.max(claimedMilestones, newMilestones));
  pendingCoin = false;
  updateCoinBalance();
  document.getElementById('collectCoinBtn').style.display = 'none';
  document.getElementById('nextBtn').disabled = false;
}

function useExtraChance() {
  if (!pendingWrongAnswer) return;
  const extraChances = Number.parseInt(localStorage.getItem(extraChanceStorageKey) || '0', 10);
  if (extraChances <= 0) return;

  localStorage.setItem(extraChanceStorageKey, extraChances - 1);
  updateCoinBalance();
  pendingWrongAnswer = null;

  document.querySelectorAll('.wood-option-btn').forEach(button => {
    button.classList.remove('wrong', 'correct');
    button.style.visibility = 'visible';
    button.onclick = () => selectAnswer(Number.parseInt(button.dataset.idx, 10));
  });

  document.getElementById('extraChanceBtn').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('hintBtn').style.display = 'inline-block';
  hintUsed = false;
  startTimer();
}

function useHint() {
  if (hintUsed || isPaused) return;
  hintUsed = true;
  document.getElementById('hintBtn').style.display = 'none';
  const q = questions[currentQ];
  const buttons = document.querySelectorAll('.wood-option-btn');
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
  if (isPaused || document.getElementById('nextBtn').style.display !== 'none') return;
  clearInterval(timer);
  timer = null;
  const q = questions[currentQ];
  const buttons = document.querySelectorAll('.wood-option-btn');
  buttons.forEach(b => b.onclick = null);

  if (idx === q.correct) {
    buttons[idx].classList.add('correct');
    score++;
    pendingCoin = true;
    document.getElementById('collectCoinBtn').style.display = 'block';
    playSound('correct');
  } else {
    if (idx >= 0) buttons[idx].classList.add('wrong');
    buttons[q.correct].classList.add('correct');
    playSound('wrong');
    pendingWrongAnswer = {
      question: q.text,
      yourAnswer: idx >= 0 ? q.options[idx] : 'Time up',
      correct: q.options[q.correct]
    };
    const extraChances = Number.parseInt(localStorage.getItem(extraChanceStorageKey) || '0', 10);
    const extraChanceBtn = document.getElementById('extraChanceBtn');
    if (extraChances > 0) {
      extraChanceBtn.textContent = `🎁 Use Extra Chance (${extraChances})`;
      extraChanceBtn.style.display = 'block';
    }
  }
  document.getElementById('scoreLabel').textContent = `Score: ${score}`;
  document.getElementById('hintBtn').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'block';
  document.getElementById('nextBtn').disabled = pendingCoin;
}

function nextQuestion() {
  if (pendingWrongAnswer) {
    wrongAnswers.push(pendingWrongAnswer);
    pendingWrongAnswer = null;
  }
  currentQ++;
  if (currentQ < questions.length) {
    showQuestion();
  } else {
    finishLevel();
  }
}

function calculateStars(score, total) {
  const percent = (score / total) * 100;
  if (percent === 100) return 3;
  if (percent >= 50) return 2;
  if (percent > 0) return 1;
  return 0;
}

function finishLevel() {
  if (pendingCoin) return;
  document.getElementById('progressBar').style.width = '100%';
  const storageKey = `completedLevels_${category}`;
  const completed = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const firstCompletion = !completed.includes(level);
  const rewardKey = `extraChanceRewarded_${username}_${category}_${level}`;
  const extraChanceReward = level < 30 && !localStorage.getItem(rewardKey) ? 1 : 0;
  if (firstCompletion) {
    completed.push(level);
    localStorage.setItem(storageKey, JSON.stringify(completed));
  }
  if (extraChanceReward > 0) {
    const extraChances = Number.parseInt(localStorage.getItem(extraChanceStorageKey) || '0', 10);
    localStorage.setItem(extraChanceStorageKey, extraChances + extraChanceReward);
    localStorage.setItem(rewardKey, 'true');
  }

  const starsKey = `levelStars_${category}`;
  const starsData = JSON.parse(localStorage.getItem(starsKey) || '{}');
  const earnedStars = calculateStars(score, questions.length);
  if (!starsData[level] || starsData[level] < earnedStars) {
    starsData[level] = earnedStars;
  }
  localStorage.setItem(starsKey, JSON.stringify(starsData));

  const statsKey = `stats_${username}`;
  const stats = JSON.parse(localStorage.getItem(statsKey) || '{"totalScore":0,"totalQuestions":0,"totalCorrect":0,"badges":[]}');
  stats.totalScore += score;
  stats.totalQuestions += questions.length;
  stats.totalCorrect += score;
  if (completed.length === 5 && !stats.badges.includes('5 Levels')) stats.badges.push('5 Levels');
  if (completed.length === 10 && !stats.badges.includes('10 Levels')) stats.badges.push('10 Levels');
  if (score === questions.length && !stats.badges.includes('Perfect Score')) stats.badges.push('Perfect Score');
  localStorage.setItem(statsKey, JSON.stringify(stats));

  const catScoreKey = `score_${category}_${username}`;
  const existingCatScore = parseInt(localStorage.getItem(catScoreKey) || '0');
  localStorage.setItem(catScoreKey, existingCatScore + score);

  const totalCoins = Number.parseInt(localStorage.getItem(coinStorageKey) || '0', 10);
  localStorage.setItem('lastScore', JSON.stringify({
    score,
    total: questions.length,
    level,
    category,
    wrongAnswers,
    stars: earnedStars,
    totalCoins,
    extraChanceReward
  }));
  window.location.href = 'result.html';
}

loadQuestions();

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (isPaused) resumeQuiz();
    else openQuizMenu();
  }
});