const PUZZLE_GAMES = [
  { id: 'missing-number', title: 'Missing Number', icon: '▦', category: 'Logic', difficulty: 'Easy · Medium · Hard', description: 'Find the number that completes each sequence.', instructions: 'Study the sequence, choose the missing value, and solve five rounds.' },
  { id: 'odd-one-out', title: 'Odd One Out', icon: '◈', category: 'Quick thinking', difficulty: 'Easy · Medium · Hard', description: 'Spot the item that does not follow the rule.', instructions: 'Look for the shared pattern in the group, then select the one that breaks it.' },
  { id: 'word-scramble', title: 'Word Scramble', icon: 'Aa', category: 'Words', difficulty: 'Easy · Medium · Hard', description: 'Unscramble a word before the next one arrives.', instructions: 'Type the original word. Hints are available, but using one reduces your points.' },
  { id: 'memory-match', title: 'Memory Match', icon: '▣', category: 'Memory', difficulty: 'Easy · Medium · Hard', description: 'Turn over cards and find every matching pair.', instructions: 'Flip two cards at a time. Remember what you saw and finish in as few moves as possible.' },
  { id: 'number-slider', title: 'Number Slider', icon: '⠿', category: 'Spatial', difficulty: 'Easy · Medium · Hard', description: 'Slide the tiles back into numerical order.', instructions: 'Move tiles next to the empty square. Every shuffle is made with legal moves, so it is solvable.' },
  { id: 'pattern-master', title: 'Pattern Master', icon: '⌁', category: 'Logic', difficulty: 'Easy · Medium · Hard', description: 'Work out what comes next in the pattern.', instructions: 'Find the rule and select the next number, shape, or symbol.' },
  { id: 'maze-escape', title: 'Maze Escape', icon: '⌗', category: 'Spatial', difficulty: 'Easy · Medium · Hard', description: 'Find your way from the start to the exit.', instructions: 'Use arrow keys, WASD, or the on-screen arrows. Walls cannot be crossed.' },
  { id: 'matchstick-challenge', title: 'Matchstick Challenge', icon: '╱', category: 'Logic', difficulty: 'Easy · Medium · Hard', description: 'Move one match to make the equation true.', instructions: 'Tap a lit match to pick it up, then tap an empty match position to place it. Move exactly one match.' },
  { id: 'code-breaker', title: 'Code Breaker', icon: '⌘', category: 'Deduction', difficulty: 'Easy · Medium · Hard', description: 'Use the clues to crack a secret four-digit code.', instructions: 'Digits do not repeat. Each clue says how many digits are right and how many are in the right place.' },
  { id: 'spot-the-difference', title: 'Spot the Difference', icon: '◉', category: 'Observation', difficulty: 'Easy · Medium · Hard', description: 'Find every detail that changes between the panels.', instructions: 'Tap the changed tile in either picture. Use up to two hints if you get stuck.' }
];

const PUZZLE_QUESTIONS = {
  'missing-number': {
    easy: [
      { prompt: '2, 4, 6, __, 10', answer: '8', options: ['7', '8', '9', '12'] },
      { prompt: '5, 10, 15, __, 25', answer: '20', options: ['18', '19', '20', '30'] },
      { prompt: '1, 2, 4, 8, __', answer: '16', options: ['12', '14', '16', '18'] },
      { prompt: '10, 9, 8, __, 6', answer: '7', options: ['5', '6', '7', '8'] },
      { prompt: '3, 6, 9, __, 15', answer: '12', options: ['10', '11', '12', '18'] }
    ],
    medium: [
      { prompt: '4, 7, 13, 22, __', answer: '34', options: ['31', '33', '34', '36'] },
      { prompt: '2, 6, 18, __, 162', answer: '54', options: ['36', '48', '54', '60'] },
      { prompt: '81, 27, 9, __, 1', answer: '3', options: ['2', '3', '4', '6'] },
      { prompt: '1, 4, 9, 16, __', answer: '25', options: ['20', '24', '25', '36'] },
      { prompt: '3, 8, 15, 24, __', answer: '35', options: ['32', '34', '35', '36'] }
    ],
    hard: [
      { prompt: '2, 3, 5, 9, 17, __', answer: '33', options: ['31', '32', '33', '34'] },
      { prompt: '1, 2, 6, 24, __', answer: '120', options: ['96', '100', '120', '144'] },
      { prompt: '7, 14, 12, 24, 22, __', answer: '44', options: ['40', '42', '44', '46'] },
      { prompt: '2, 5, 11, 23, __', answer: '47', options: ['45', '46', '47', '48'] },
      { prompt: '1, 8, 27, 64, __', answer: '125', options: ['100', '121', '125', '144'] }
    ]
  },
  'odd-one-out': {
    easy: [
      { prompt: 'Which one does not belong?', answer: 'Carrot', options: ['Apple', 'Pear', 'Carrot', 'Mango'] },
      { prompt: 'Which one does not belong?', answer: 'Blue', options: ['Circle', 'Square', 'Triangle', 'Blue'] },
      { prompt: 'Which one does not belong?', answer: 'Seven', options: ['Two', 'Four', 'Six', 'Seven'] },
      { prompt: 'Which one does not belong?', answer: 'Monday', options: ['March', 'April', 'Monday', 'June'] },
      { prompt: 'Which one does not belong?', answer: 'Spoon', options: ['Shirt', 'Socks', 'Hat', 'Spoon'] }
    ],
    medium: [
      { prompt: 'Which number breaks the rule?', answer: '21', options: ['9', '16', '21', '25'] },
      { prompt: 'Which one is not a planet?', answer: 'Moon', options: ['Mars', 'Venus', 'Moon', 'Jupiter'] },
      { prompt: 'Which number is not prime?', answer: '27', options: ['17', '19', '23', '27'] },
      { prompt: 'Which one is not a mammal?', answer: 'Shark', options: ['Dolphin', 'Whale', 'Shark', 'Bat'] },
      { prompt: 'Which number breaks the pattern?', answer: '30', options: ['12', '18', '24', '30'] }
    ],
    hard: [
      { prompt: 'Which number is not a perfect square?', answer: '50', options: ['36', '49', '50', '64'] },
      { prompt: 'Which one is not a programming language?', answer: 'Canvas', options: ['Python', 'Java', 'Canvas', 'Ruby'] },
      { prompt: 'Which number is not a Fibonacci number?', answer: '22', options: ['13', '21', '22', '34'] },
      { prompt: 'Which word breaks the rule?', answer: 'Listen', options: ['Below', 'Elbow', 'State', 'Listen'] },
      { prompt: 'Which one is not a prime number?', answer: '91', options: ['83', '89', '91', '97'] }
    ]
  },
  'pattern-master': {
    easy: [
      { prompt: 'What comes next?   2, 4, 6, 8, __', answer: '10', options: ['9', '10', '11', '12'] },
      { prompt: 'What comes next?   ●, ▲, ●, ▲, __', answer: '●', options: ['●', '▲', '■', '◆'] },
      { prompt: 'What comes next?   A, B, C, D, __', answer: 'E', options: ['E', 'F', 'G', 'Z'] },
      { prompt: 'What comes next?   1, 3, 5, 7, __', answer: '9', options: ['8', '9', '10', '11'] },
      { prompt: 'What comes next?   ★, ☆, ★, ☆, __', answer: '★', options: ['★', '☆', '✦', '●'] }
    ],
    medium: [
      { prompt: 'What comes next?   3, 6, 12, 24, __', answer: '48', options: ['36', '42', '48', '54'] },
      { prompt: 'What comes next?   1, 4, 9, 16, __', answer: '25', options: ['20', '24', '25', '36'] },
      { prompt: 'What comes next?   Z, X, V, T, __', answer: 'R', options: ['P', 'Q', 'R', 'S'] },
      { prompt: 'What comes next?   2, 5, 10, 17, __', answer: '26', options: ['24', '25', '26', '27'] },
      { prompt: 'What comes next?   1, 1, 2, 3, 5, __', answer: '8', options: ['7', '8', '9', '10'] }
    ],
    hard: [
      { prompt: 'What comes next?   2, 6, 12, 20, 30, __', answer: '42', options: ['40', '41', '42', '44'] },
      { prompt: 'What comes next?   1, 2, 6, 24, 120, __', answer: '720', options: ['600', '620', '720', '840'] },
      { prompt: 'What comes next?   4, 7, 13, 25, 49, __', answer: '97', options: ['93', '95', '97', '99'] },
      { prompt: 'What comes next?   2, 3, 5, 8, 13, __', answer: '21', options: ['18', '20', '21', '23'] },
      { prompt: 'What comes next?   100, 96, 88, 76, 60, __', answer: '40', options: ['38', '40', '42', '44'] }
    ]
  }
};

const WORDS = {
  easy: [
    ['TAC', 'CAT', 'A small pet that says meow.'], ['GOD', 'DOG', 'A loyal four-legged friend.'],
    ['RAST', 'STAR', 'It shines in the night sky.'], ['KOB O', 'BOOK', 'You read this.'], ['MUSI C', 'MUSIC', 'A melody or song.']
  ],
  medium: [
    ['ZPZULE', 'PUZZLE', 'A problem you solve for fun.'], ['EAMDR', 'DREAM', 'Something you may see while sleeping.'],
    ['CINEMA', 'CINEMA', 'A place to watch a film.'], ['RACHTCE', 'TEACHER', 'Someone who helps you learn.'], ['NETSIL', 'LISTEN', 'Pay attention to a sound.']
  ],
  hard: [
    ['YORITCIV', 'VICTORY', 'The result of winning a contest.'], ['NAGIMATIOIN', 'IMAGINATION', 'The ability to create ideas in your mind.'],
    ['CROUAGES', 'COURAGE', 'Being brave when something is difficult.'], ['HARMONY', 'HARMONY', 'A pleasing combination of sounds.'], ['ELEBRITYC', 'CELEBRITY', 'A famous person.']
  ]
};

const MATCH_PUZZLES = {
  easy: { equation: '9+3=5', solution: '9-3=6', hint: 'The plus sign has one vertical match. The 5 needs a lower-left match.' },
  medium: { equation: '6+4=4', solution: '8-4=4', hint: 'Move the vertical match from the plus sign to the upper-right side of the 6.' },
  hard: { equation: '9+5=9', solution: '3+5=8', hint: 'Move the upper-left match of the first 9 to the lower-left side of the last 9.' }
};

const SEGMENTS = {
  '0': ['a', 'b', 'c', 'd', 'e', 'f'], '1': ['b', 'c'], '2': ['a', 'b', 'g', 'e', 'd'],
  '3': ['a', 'b', 'c', 'd', 'g'], '4': ['f', 'g', 'b', 'c'], '5': ['a', 'f', 'g', 'c', 'd'],
  '6': ['a', 'f', 'g', 'e', 'c', 'd'], '7': ['a', 'b', 'c'], '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  '9': ['a', 'b', 'c', 'd', 'f', 'g'], '+': ['g', 'v'], '-': ['g'], '=': ['x', 'y']
};

const username = localStorage.getItem('currentUser') || 'guest';
const playerKey = username.replace(/[^a-z0-9_-]/gi, '_');
const saveKey = `puzzleZone:${playerKey}`;
const gameGrid = document.getElementById('pzGameGrid');
const menu = document.getElementById('pzMenu');
const intro = document.getElementById('pzIntro');
const play = document.getElementById('pzPlay');
const startPanel = document.getElementById('pzStartPanel');
const gamePanel = document.getElementById('pzGamePanel');
const resultPanel = document.getElementById('pzResults');
const board = document.getElementById('pzBoard');
const actions = document.getElementById('pzGameActions');
const feedback = document.getElementById('pzFeedback');
const pauseLayer = document.getElementById('pzPauseLayer');
let selectedGame = null;
let state = null;
let timerId = null;
let soundEnabled = true;

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(saveKey) || '{"played":0,"completed":[],"best":{},"totalScore":0}');
  } catch (error) {
    console.error('Could not read puzzle progress:', error);
    return { played: 0, completed: [], best: {}, totalScore: 0 };
  }
}

let progress = loadProgress();
document.getElementById('puzzleUser').textContent = username === 'guest' ? 'Player' : username;

function persistProgress() {
  try {
    localStorage.setItem(saveKey, JSON.stringify(progress));
  } catch (error) {
    console.error('Could not save puzzle progress:', error);
  }
}

function renderProgress() {
  document.getElementById('pzGamesPlayed').textContent = progress.played;
  document.getElementById('pzBestScore').textContent = progress.bestOverall || 0;
  document.getElementById('pzCompleted').textContent = `${progress.completed.length} / ${PUZZLE_GAMES.length}`;
  gameGrid.replaceChildren();
  PUZZLE_GAMES.forEach((game, index) => {
    const card = document.createElement('article');
    card.className = 'pz-game-card';
    const top = document.createElement('div');
    top.className = 'pz-card-top';
    const image = document.createElement('img');
    image.className = 'pz-game-image';
    image.src = `images/puzzles/${game.id}.svg`;
    image.alt = '';
    image.width = 96;
    image.height = 76;
    const icon = document.createElement('span');
    icon.className = 'pz-card-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = game.icon;
    const tag = document.createElement('span');
    tag.className = 'pz-card-number';
    tag.textContent = String(index + 1).padStart(2, '0');
    top.append(image, icon, tag);

    const category = document.createElement('p');
    category.className = 'pz-card-category';
    category.textContent = game.category;
    const title = document.createElement('h3');
    title.textContent = game.title;
    const description = document.createElement('p');
    description.className = 'pz-card-description';
    description.textContent = game.description;
    const details = document.createElement('div');
    details.className = 'pz-card-details';
    const difficulty = document.createElement('span');
    difficulty.textContent = game.difficulty;
    const best = document.createElement('span');
    best.textContent = `Best ${progress.best[game.id] || 0}`;
    details.append(difficulty, best);
    const button = document.createElement('button');
    button.className = 'pz-button pz-card-play';
    button.type = 'button';
    button.textContent = 'Play';
    button.addEventListener('click', () => openGame(game.id));
    card.append(top, category, title, description, details, button);
    gameGrid.appendChild(card);
  });
}

function openGame(id) {
  selectedGame = PUZZLE_GAMES.find(game => game.id === id);
  if (!selectedGame) return;
  stopTimer();
  menu.hidden = true;
  intro.hidden = true;
  resultPanel.hidden = true;
  play.hidden = false;
  startPanel.hidden = false;
  gamePanel.hidden = true;
  pauseLayer.hidden = true;
  document.getElementById('pzGameTitle').textContent = selectedGame.title;
  document.getElementById('pzGameCategory').textContent = selectedGame.category;
  document.getElementById('pzGameDescription').textContent = selectedGame.description;
  document.getElementById('pzInstructions').textContent = selectedGame.instructions;
  document.getElementById('pzDifficulty').value = 'easy';
  document.getElementById('pzFeedback').textContent = '';
  document.getElementById('pzStartButton').focus();
}

function showMenu() {
  stopTimer();
  selectedGame = null;
  state = null;
  play.hidden = true;
  resultPanel.hidden = true;
  pauseLayer.hidden = true;
  menu.hidden = false;
  intro.hidden = false;
  renderProgress();
  document.getElementById('pzBackToMenu').focus();
}

function createState() {
  return {
    difficulty: document.getElementById('pzDifficulty').value,
    score: 0,
    round: 0,
    rounds: 5,
    seconds: 0,
    hints: 0,
    streak: 0,
    finished: false,
    locked: false,
    data: {}
  };
}

function startGame() {
  state = createState();
  startPanel.hidden = true;
  gamePanel.hidden = false;
  resultPanel.hidden = true;
  pauseLayer.hidden = true;
  feedback.textContent = '';
  actions.replaceChildren();
  board.replaceChildren();
  updateHud();
  if (selectedGame.id === 'memory-match') startMemory();
  else if (selectedGame.id === 'number-slider') startSlider();
  else if (selectedGame.id === 'maze-escape') startMaze();
  else if (selectedGame.id === 'matchstick-challenge') startMatchstick();
  else if (selectedGame.id === 'code-breaker') startCodeBreaker();
  else if (selectedGame.id === 'spot-the-difference') startSpotDifference();
  else if (selectedGame.id === 'word-scramble') showWordRound();
  else showQuestionRound();
  runTimer();
  updateHud();
}

function updateHud() {
  if (!state) return;
  document.getElementById('pzScore').textContent = state.score;
  const goal = state.rounds || '—';
  const current = state.rounds ? Math.min(state.round + (state.finished ? 0 : 1), state.rounds) : state.round;
  document.getElementById('pzProgress').textContent = `${current} / ${goal}`;
  document.getElementById('pzTimer').textContent =
    `${String(Math.floor(state.seconds / 60)).padStart(2, '0')}:${String(state.seconds % 60).padStart(2, '0')}`;
}

function runTimer() {
  stopTimer();
  timerId = window.setInterval(() => {
    if (!state || state.finished || pauseLayer.hidden === false) return;
    state.seconds += 1;
    updateHud();
  }, 1000);
}

function stopTimer() {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function setFeedback(message, type = '') {
  feedback.textContent = message;
  feedback.className = `pz-feedback${type ? ` is-${type}` : ''}`;
}

function playTone(correct) {
  if (!soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = correct ? 660 : 220;
    gain.gain.setValueAtTime(0.07, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.16);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.16);
    oscillator.onended = () => context.close();
  } catch (error) {
    console.warn('Game sound could not play:', error);
  }
}

function award(correct, penalty = 0) {
  if (!correct) {
    state.streak = 0;
    playTone(false);
    return 0;
  }
  state.streak += 1;
  const multiplier = { easy: 1, medium: 1.5, hard: 2 }[state.difficulty];
  const points = Math.max(1, Math.round((10 * multiplier + Math.min(state.streak - 1, 5) * 2) * (1 - penalty)));
  state.score += points;
  playTone(true);
  updateHud();
  return points;
}

function addAction(label, handler, className = 'pz-button pz-button-muted') {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = label;
  button.addEventListener('click', handler);
  actions.appendChild(button);
  return button;
}

function shuffle(list) {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function startTurnBasedGame() {
  state.round = 0;
  state.rounds = 5;
  updateHud();
}

function showQuestionRound() {
  const list = shuffle(PUZZLE_QUESTIONS[selectedGame.id][state.difficulty]);
  const question = list[state.round];
  state.data.question = question;
  board.replaceChildren();
  const prompt = document.createElement('p');
  prompt.className = 'pz-question';
  prompt.textContent = question.prompt;
  const choices = document.createElement('div');
  choices.className = 'pz-choice-grid';
  shuffle(question.options).forEach(option => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pz-choice';
    button.textContent = option;
    button.addEventListener('click', () => {
      if (state.locked || state.finished) return;
      state.locked = true;
      const isCorrect = option === question.answer;
      button.classList.add(isCorrect ? 'is-correct' : 'is-wrong');
      choices.querySelectorAll('button').forEach(item => { item.disabled = true; });
      if (!isCorrect) {
        const correctButton = [...choices.querySelectorAll('button')]
          .find(item => item.textContent === question.answer);
        correctButton?.classList.add('is-correct');
      }
      const points = award(isCorrect);
      setFeedback(isCorrect ? `Correct! +${points} points.` : `Not quite. The answer is ${question.answer}.`, isCorrect ? 'success' : 'error');
      addAction(state.round === state.rounds - 1 ? 'See results' : 'Next question', () => {
        state.round += 1;
        state.locked = false;
        if (state.round >= state.rounds) finishGame(true);
        else showQuestionRound();
        updateHud();
      }, 'pz-button pz-button-primary');
    });
    choices.appendChild(button);
  });
  board.append(prompt, choices);
  actions.replaceChildren();
  updateHud();
}

function showWordRound() {
  const words = shuffle(WORDS[state.difficulty]);
  const [scramble, answer, hint] = words[state.round];
  state.data.wordAnswer = answer;
  state.data.wordHint = hint;
  state.locked = false;
  board.replaceChildren();
  const letters = document.createElement('p');
  letters.className = 'pz-scramble';
  letters.textContent = scramble.replaceAll(' ', '').split('').join(' ');
  const form = document.createElement('form');
  form.className = 'pz-word-form';
  const input = document.createElement('input');
  input.type = 'text';
  input.autocomplete = 'off';
  input.autocapitalize = 'characters';
  input.maxLength = 24;
  input.setAttribute('aria-label', 'Your unscrambled word');
  input.placeholder = 'Type the word';
  const check = document.createElement('button');
  check.className = 'pz-button pz-button-primary';
  check.type = 'submit';
  check.textContent = 'Check answer';
  form.append(input, check);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (state.locked) return;
    state.locked = true;
    const correct = input.value.trim().toUpperCase() === answer;
    const points = award(correct, state.data.hintUsed ? 0.5 : 0);
    setFeedback(correct ? `That's it! +${points} points.` : `The word was ${answer}.`, correct ? 'success' : 'error');
    input.disabled = true;
    check.disabled = true;
    addAction(state.round === state.rounds - 1 ? 'See results' : 'Next word', () => {
      state.round += 1;
      if (state.round >= state.rounds) finishGame(true);
      else showWordRound();
      updateHud();
    }, 'pz-button pz-button-primary');
  });
  board.append(letters, form);
  actions.replaceChildren();
  state.data.hintUsed = false;
  addAction('Hint', () => {
    if (state.data.hintUsed || state.locked) return;
    state.data.hintUsed = true;
    state.hints += 1;
    setFeedback(hint, 'hint');
    document.activeElement.blur();
  });
  input.focus();
  updateHud();
}

function startMemory() {
  const pairCount = { easy: 6, medium: 8, hard: 10 }[state.difficulty];
  const icons = ['★', '☀', '♣', '♥', '◆', '☂', '♫', '☕', '✿', '⚽'];
  const cards = shuffle([...icons.slice(0, pairCount), ...icons.slice(0, pairCount)]);
  state.rounds = pairCount;
  state.data.memory = { cards, open: [], matched: new Set(), moves: 0, pairCount };
  renderMemory();
}

function renderMemory() {
  const memory = state.data.memory;
  board.className = `pz-board pz-memory-grid ${state.difficulty}`;
  board.replaceChildren();
  memory.cards.forEach((symbol, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `pz-memory-card${memory.open.includes(index) || memory.matched.has(index) ? ' is-face-up' : ''}${memory.matched.has(index) ? ' is-matched' : ''}`;
    button.textContent = memory.open.includes(index) || memory.matched.has(index) ? symbol : '?';
    button.setAttribute('aria-label', memory.matched.has(index) ? `Matched ${symbol}` : memory.open.includes(index) ? symbol : 'Face-down card');
    button.disabled = state.locked || memory.matched.has(index) || memory.open.includes(index) || state.finished;
    button.addEventListener('click', () => flipCard(index));
    board.appendChild(button);
  });
  actions.replaceChildren();
  updateHud();
}

function flipCard(index) {
  const memory = state.data.memory;
  if (state.locked || memory.open.length >= 2 || memory.matched.has(index)) return;
  memory.open.push(index);
  renderMemory();
  if (memory.open.length !== 2) return;
  memory.moves += 1;
  state.round = memory.matched.size / 2;
  const [first, second] = memory.open;
  if (memory.cards[first] === memory.cards[second]) {
    memory.matched.add(first);
    memory.matched.add(second);
    memory.open = [];
    award(true, Math.max(0, (memory.moves - memory.pairCount) / (memory.pairCount * 3)));
    setFeedback(`Pair found! ${memory.matched.size / 2} of ${memory.pairCount} pairs.`, 'success');
    renderMemory();
    if (memory.matched.size === memory.cards.length) finishGame(true, `Completed in ${memory.moves} moves.`);
  } else {
    state.locked = true;
    setFeedback('No match this time. Try to remember both cards.', '');
    window.setTimeout(() => {
      memory.open = [];
      state.locked = false;
      renderMemory();
    }, 750);
  }
}

function startSlider() {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  const blank = 8;
  let previous = -1;
  for (let i = 0; i < 100; i += 1) {
    const choices = [blank - 3, blank + 3, blank % 3 > 0 ? blank - 1 : -1, blank % 3 < 2 ? blank + 1 : -1]
      .filter(index => index >= 0 && index < 9 && index !== previous);
    const next = choices[Math.floor(Math.random() * choices.length)];
    [values[blank], values[next]] = [values[next], values[blank]];
    previous = blank;
    // Track the blank with the actual swapped tile after each legal shuffle step.
    state.data.sliderBlank = next;
    // The loop uses a mutable blank index to preserve a legal random walk.
    if (i < 99) {
      const nextBlank = state.data.sliderBlank;
      Object.defineProperty(values, '_blank', { value: nextBlank, writable: true, configurable: true });
    }
  }
  // Rebuild with a straightforward random walk; legal moves guarantee solvability.
  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  let empty = 8;
  previous = -1;
  for (let i = 0; i < 100; i += 1) {
    const choices = [empty - 3, empty + 3, empty % 3 > 0 ? empty - 1 : -1, empty % 3 < 2 ? empty + 1 : -1]
      .filter(index => index >= 0 && index < 9 && index !== previous);
    const next = choices[Math.floor(Math.random() * choices.length)];
    [tiles[empty], tiles[next]] = [tiles[next], tiles[empty]];
    previous = empty;
    empty = next;
  }
  state.rounds = 1;
  state.data.slider = { tiles, moves: 0 };
  renderSlider();
}

function renderSlider() {
  const slider = state.data.slider;
  board.className = 'pz-board pz-slider-grid';
  board.replaceChildren();
  slider.tiles.forEach((value, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `pz-slider-tile${value === 0 ? ' is-empty' : ''}`;
    button.textContent = value || '';
    button.disabled = value === 0 || state.finished;
    button.setAttribute('aria-label', value ? `Move tile ${value}` : 'Empty space');
    button.addEventListener('click', () => {
      const empty = slider.tiles.indexOf(0);
      const adjacent = Math.abs(Math.floor(index / 3) - Math.floor(empty / 3)) +
        Math.abs(index % 3 - empty % 3) === 1;
      if (!adjacent || state.finished) return;
      [slider.tiles[index], slider.tiles[empty]] = [slider.tiles[empty], slider.tiles[index]];
      slider.moves += 1;
      state.round = slider.moves;
      if (slider.tiles.every((tile, tileIndex) => tile === (tileIndex + 1) % 9)) {
        award(true);
        finishGame(true, `Solved in ${slider.moves} moves.`);
      } else {
        renderSlider();
      }
    });
    board.appendChild(button);
  });
  actions.replaceChildren();
  addAction('Shuffle', startSlider);
  addAction('Reset board', startSlider);
  updateHud();
}

const MAZE_SIZE = 11;

function generateMaze() {
  const cells = Array.from({ length: MAZE_SIZE * MAZE_SIZE }, () => ({ walls: [true, true, true, true], seen: false }));
  const directions = [
    { dx: 0, dy: -1, wall: 0, opposite: 2 }, { dx: 1, dy: 0, wall: 1, opposite: 3 },
    { dx: 0, dy: 1, wall: 2, opposite: 0 }, { dx: -1, dy: 0, wall: 3, opposite: 1 }
  ];
  const stack = [0];
  cells[0].seen = true;
  while (stack.length) {
    const current = stack[stack.length - 1];
    const x = current % MAZE_SIZE;
    const y = Math.floor(current / MAZE_SIZE);
    const available = directions
      .map(direction => ({ ...direction, nx: x + direction.dx, ny: y + direction.dy }))
      .filter(direction => direction.nx >= 0 && direction.nx < MAZE_SIZE &&
        direction.ny >= 0 && direction.ny < MAZE_SIZE &&
        !cells[direction.ny * MAZE_SIZE + direction.nx].seen);
    if (!available.length) {
      stack.pop();
      continue;
    }
    const direction = available[Math.floor(Math.random() * available.length)];
    const next = direction.ny * MAZE_SIZE + direction.nx;
    cells[current].walls[direction.wall] = false;
    cells[next].walls[direction.opposite] = false;
    cells[next].seen = true;
    stack.push(next);
  }
  return cells;
}

function startMaze() {
  state.rounds = 1;
  state.data.maze = { cells: generateMaze(), player: 0, moves: 0 };
  renderMaze();
}

function renderMaze() {
  const maze = state.data.maze;
  board.className = 'pz-board pz-maze-board';
  board.style.setProperty('--maze-size', MAZE_SIZE);
  board.replaceChildren();
  maze.cells.forEach((cell, index) => {
    const spot = document.createElement('div');
    spot.className = 'pz-maze-cell';
    if (index === maze.player) spot.classList.add('is-player');
    if (index === MAZE_SIZE * MAZE_SIZE - 1) spot.classList.add('is-exit');
    cell.walls.forEach((hasWall, wallIndex) => {
      if (hasWall) spot.classList.add(`wall-${wallIndex}`);
    });
    spot.textContent = index === maze.player ? '●' : index === MAZE_SIZE * MAZE_SIZE - 1 ? '◆' : '';
    board.appendChild(spot);
  });
  actions.replaceChildren();
  const pad = document.createElement('div');
  pad.className = 'pz-direction-pad';
  [['↑', 0, -1, 'Up'], ['←', -1, 0, 'Left'], ['↓', 0, 1, 'Down'], ['→', 1, 0, 'Right']].forEach(([label, dx, dy, name]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pz-direction';
    button.textContent = label;
    button.setAttribute('aria-label', name);
    button.addEventListener('click', () => moveMaze(dx, dy));
    pad.appendChild(button);
  });
  actions.appendChild(pad);
  addAction('New maze', startMaze);
}

function moveMaze(dx, dy) {
  const maze = state.data.maze;
  const x = maze.player % MAZE_SIZE;
  const y = Math.floor(maze.player / MAZE_SIZE);
  const direction = dx === 1 ? 1 : dx === -1 ? 3 : dy === 1 ? 2 : 0;
  const cell = maze.cells[maze.player];
  if (cell.walls[direction]) {
    setFeedback('That path is blocked. Try another direction.');
    playTone(false);
    return;
  }
  maze.player = (y + dy) * MAZE_SIZE + x + dx;
  maze.moves += 1;
  state.round = maze.moves;
  if (maze.player === MAZE_SIZE * MAZE_SIZE - 1) {
    award(true, Math.max(0, (maze.moves - MAZE_SIZE * 2) / (MAZE_SIZE * 5)));
    finishGame(true, `Escaped in ${maze.moves} moves.`);
  } else renderMaze();
}

function matchPosition(char, segment) {
  if (char === '+') return segment === 'g' || segment === 'v';
  if (char === '-') return segment === 'g';
  return (SEGMENTS[char] || []).includes(segment);
}

function startMatchstick() {
  state.rounds = 1;
  const puzzle = MATCH_PUZZLES[state.difficulty];
  state.data.match = {
    original: puzzle.equation,
    solution: puzzle.solution,
    chars: puzzle.equation.split(''),
    initial: puzzle.equation.split('').map(char => new Set(SEGMENTS[char] || [])),
    selected: null,
    moves: []
  };
  renderMatchstick();
  addAction('Hint', () => setFeedback(puzzle.hint, 'hint'));
  addAction('Check equation', verifyMatchstick, 'pz-button pz-button-primary');
  setFeedback('Move one matchstick, then check the equation.');
}

function renderMatchstick() {
  const match = state.data.match;
  board.className = 'pz-board pz-match-equation';
  board.replaceChildren();
  match.chars.forEach((char, charIndex) => {
    const character = document.createElement('div');
    character.className = 'pz-match-character';
    if (char === '+' || char === '-' || char === '=') {
      character.textContent = char;
      board.appendChild(character);
      return;
    }
    ['a', 'f', 'b', 'g', 'v', 'e', 'c', 'd'].forEach(segment => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `pz-match-stick seg-${segment}${matchPosition(char, segment) ? ' is-lit' : ''}`;
      button.setAttribute('aria-label', `${matchPosition(char, segment) ? 'Lit' : 'Empty'} match ${segment} in character ${charIndex + 1}`);
      button.addEventListener('click', () => toggleMatchstick(charIndex, segment));
      character.appendChild(button);
    });
    board.appendChild(character);
  });
}

function toggleMatchstick(charIndex, segment) {
  const match = state.data.match;
  const isLit = matchPosition(match.chars[charIndex], segment);
  if (match.selected === null) {
    if (!isLit) {
      setFeedback('First select a match that is already lit.');
      return;
    }
    match.selected = { charIndex, segment };
    match.moves = [{ charIndex, segment, wasLit: true }];
  } else if (match.selected.charIndex === charIndex && match.selected.segment === segment) {
    match.selected = null;
    match.moves = [];
  } else if (isLit) {
    setFeedback('Select an empty position to place the match.');
    return;
  } else {
    match.moves.push({ charIndex, segment, wasLit: false });
    const source = match.selected;
    if (source.charIndex === charIndex && source.segment === segment) return;
    match.chars[source.charIndex] = charAfterToggle(match.chars[source.charIndex], source.segment, false);
    match.chars[charIndex] = charAfterToggle(match.chars[charIndex], segment, true);
    match.selected = null;
    state.round += 1;
  }
  renderMatchstick();
}

function charAfterToggle(char, segment, turnOn) {
  if (char === '+' || char === '-') {
    if (segment !== 'g' && segment !== 'v') return char;
    const active = new Set(SEGMENTS[char]);
    if (turnOn) active.add(segment);
    else active.delete(segment);
    return active.has('v') ? '+' : active.has('g') ? '-' : '-';
  }
  if (!SEGMENTS[char]) return char;
  const active = new Set(SEGMENTS[char]);
  if (turnOn) active.add(segment);
  else active.delete(segment);
  return Object.keys(SEGMENTS).find(key => /^\d$/.test(key) &&
    SEGMENTS[key].length === active.size &&
    SEGMENTS[key].every(item => active.has(item))) || char;
}

function verifyMatchstick() {
  const match = state.data.match;
  if (match.selected) {
    setFeedback('Place the selected match before checking.');
    return;
  }
  const expression = match.chars.join('');
  const matchCount = match.moves.filter(move => move.wasLit).length;
  const isCorrect = expression === match.solution && matchCount === 1 &&
    match.moves.filter(move => !move.wasLit).length === 1;
  if (isCorrect) {
    award(true);
    finishGame(true, `Solved: ${expression}`);
  } else {
    award(false);
    setFeedback('Not quite. Keep the equation true and move exactly one match.', 'error');
  }
}

function startCodeBreaker() {
  state.rounds = 1;
  const length = 4;
  const digits = shuffle('0123456789'.split('')).slice(0, length);
  if (digits[0] === '0') [digits[0], digits[1]] = [digits[1], digits[0]];
  state.data.code = { secret: digits.join(''), attempts: { easy: 10, medium: 8, hard: 6 }[state.difficulty], guesses: [] };
  renderCodeBreaker();
}

function renderCodeBreaker() {
  const code = state.data.code;
  board.className = 'pz-board pz-code-board';
  board.replaceChildren();
  const instructions = document.createElement('p');
  instructions.className = 'pz-question';
  instructions.textContent = `Crack the code. ${code.attempts} guesses remaining. Digits do not repeat.`;
  const history = document.createElement('div');
  history.className = 'pz-code-history';
  code.guesses.forEach(guess => {
    const row = document.createElement('div');
    row.className = 'pz-code-row';
    const value = document.createElement('code');
    value.textContent = guess.value;
    const clue = document.createElement('span');
    clue.textContent = `${guess.position} exact · ${guess.digits} right digit${guess.digits === 1 ? '' : 's'}`;
    row.append(value, clue);
    history.appendChild(row);
  });
  const form = document.createElement('form');
  form.className = 'pz-code-form';
  const input = document.createElement('input');
  input.type = 'text';
  input.inputMode = 'numeric';
  input.pattern = '[0-9]{4}';
  input.maxLength = 4;
  input.autocomplete = 'off';
  input.placeholder = '4 unique digits';
  input.setAttribute('aria-label', 'Enter four different digits');
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'pz-button pz-button-primary';
  submit.textContent = 'Submit guess';
  form.append(input, submit);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const value = input.value.trim();
    if (!/^\d{4}$/.test(value) || new Set(value).size !== 4) {
      setFeedback('Enter four different digits, for example 5821.', 'error');
      input.focus();
      return;
    }
    const position = [...value].filter((digit, index) => digit === code.secret[index]).length;
    const digits = [...value].filter(digit => code.secret.includes(digit)).length;
    code.guesses.push({ value, position, digits });
    code.attempts -= 1;
    state.round = code.guesses.length;
    if (position === 4) {
      award(true, Math.max(0, (8 - code.attempts) / 12));
      finishGame(true, `Code cracked in ${code.guesses.length} guesses.`);
    } else if (code.attempts === 0) {
      finishGame(false, `The secret code was ${code.secret}.`);
    } else {
      setFeedback('Clue added. Use it to narrow down your next guess.', 'hint');
      renderCodeBreaker();
    }
  });
  board.append(instructions, history, form);
  input.focus();
  updateHud();
}

const DIFFERENCE_CELLS = [2, 5, 10, 13];

function startSpotDifference() {
  state.rounds = 1;
  state.data.differences = new Set(DIFFERENCE_CELLS);
  state.data.found = new Set();
  state.data.hintUsed = 0;
  renderSpotDifference();
  addAction('Hint (2 left)', showDifferenceHint);
}

function renderSpotDifference() {
  const found = state.data.found;
  board.className = 'pz-board pz-spot-board';
  board.replaceChildren();
  ['Picture A', 'Picture B'].forEach((label, paneIndex) => {
    const pane = document.createElement('div');
    pane.className = 'pz-picture-pane';
    const title = document.createElement('h3');
    title.textContent = label;
    const grid = document.createElement('div');
    grid.className = 'pz-picture-grid';
    for (let index = 0; index < 16; index += 1) {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'pz-picture-tile';
      const isDifferent = state.data.differences.has(index);
      const isFound = found.has(index);
      const shape = document.createElement('span');
      const type = isDifferent && paneIndex === 1 ? (index === 2 ? 'circle' : index === 5 ? 'square' : index === 10 ? 'triangle' : 'diamond') : 'circle';
      shape.className = `shape-${type}${isDifferent && paneIndex === 1 ? ' is-changed' : ''}`;
      shape.setAttribute('aria-hidden', 'true');
      if (index === 0 || index === 7 || index === 12) shape.classList.add('shape-small');
      tile.appendChild(shape);
      if (isFound) tile.classList.add('is-found');
      tile.setAttribute('aria-label', `${label}, detail ${index + 1}${isFound ? ', found difference' : ''}`);
      tile.addEventListener('click', () => {
        if (found.has(index)) return;
        if (state.data.differences.has(index)) {
          found.add(index);
          state.round = found.size;
          award(true);
          setFeedback(`Difference found! ${found.size} of ${state.data.differences.size}.`, 'success');
          renderSpotDifference();
          if (found.size === state.data.differences.size) finishGame(true, 'All four differences found.');
        } else {
          state.streak = 0;
          playTone(false);
          setFeedback('No difference there. Look closely at the shapes.', 'error');
        }
      });
      grid.appendChild(tile);
    }
    pane.append(title, grid);
    board.appendChild(pane);
  });
}

function showDifferenceHint() {
  if (state.data.hintUsed >= 2) {
    setFeedback('No hints left for this round.', 'error');
    return;
  }
  const next = [...state.data.differences].find(index => !state.data.found.has(index));
  if (next === undefined) return;
  state.data.hintUsed += 1;
  state.hints += 1;
  setFeedback(`Hint: check row ${Math.floor(next / 4) + 1}, column ${(next % 4) + 1}.`, 'hint');
  const button = actions.querySelector('button');
  if (button) button.textContent = `Hint (${2 - state.data.hintUsed} left)`;
}

function finishGame(won, details = '') {
  if (state.finished) return;
  state.finished = true;
  stopTimer();
  if (won) state.score += Math.max(0, 20 - Math.floor(state.seconds / 10));
  progress.played += 1;
  progress.totalScore = (progress.totalScore || 0) + state.score;
  progress.best[selectedGame.id] = Math.max(progress.best[selectedGame.id] || 0, state.score);
  progress.bestOverall = Math.max(progress.bestOverall || 0, state.score);
  if (won && !progress.completed.includes(selectedGame.id)) progress.completed.push(selectedGame.id);
  persistProgress();
  renderProgress();
  gamePanel.hidden = true;
  resultPanel.hidden = false;
  document.getElementById('pzResultTitle').textContent = won ? 'Nice work!' : 'Round over';
  document.getElementById('pzFinalScore').textContent = state.score;
  document.getElementById('pzResultDetails').textContent =
    `${details}${details ? ' ' : ''}Time: ${formatTime(state.seconds)}. Difficulty: ${state.difficulty}.`;
  document.getElementById('pzPlayAgain').focus();
}

function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`;
}

function pauseGame() {
  if (!state || state.finished) return;
  pauseLayer.hidden = false;
  document.getElementById('pzResumeButton').focus();
}

function resumeGame() {
  pauseLayer.hidden = true;
  document.getElementById('pzPauseButton').focus();
}

document.getElementById('pzStartButton').addEventListener('click', startGame);
document.getElementById('pzPauseButton').addEventListener('click', pauseGame);
document.getElementById('pzResumeButton').addEventListener('click', resumeGame);
document.getElementById('pzBackToMenu').addEventListener('click', () => {
  if (state && !state.finished && state.seconds > 0 &&
      !window.confirm('Exit this game? Your current round will not be saved.')) return;
  showMenu();
});
document.getElementById('pzPauseExitButton').addEventListener('click', () => {
  pauseLayer.hidden = true;
  showMenu();
});
document.getElementById('pzPlayAgain').addEventListener('click', () => openGame(selectedGame.id));
document.getElementById('pzResultMenu').addEventListener('click', showMenu);

function setSound(enabled) {
  soundEnabled = enabled;
  document.getElementById('pzSoundToggle').checked = enabled;
  const muteButton = document.getElementById('pzMuteButton');
  muteButton.textContent = enabled ? '♪' : '♪̸';
  muteButton.setAttribute('aria-pressed', String(!enabled));
  muteButton.setAttribute('aria-label', enabled ? 'Mute game sounds' : 'Enable game sounds');
}
document.getElementById('pzSoundToggle').addEventListener('change', event => setSound(event.target.checked));
document.getElementById('pzMuteButton').addEventListener('click', () => setSound(!soundEnabled));

document.addEventListener('keydown', event => {
  if (play.hidden || !state || state.finished || pauseLayer.hidden === false) return;
  if (selectedGame.id === 'maze-escape') {
    const moves = {
      ArrowUp: [0, -1], w: [0, -1], ArrowDown: [0, 1], s: [0, 1],
      ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0]
    };
    const direction = moves[event.key] || moves[event.key.toLowerCase()];
    if (direction) {
      event.preventDefault();
      moveMaze(direction[0], direction[1]);
    }
  }
  if (event.key === 'Escape') pauseGame();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && state && !state.finished && pauseLayer.hidden) pauseGame();
});

renderProgress();
