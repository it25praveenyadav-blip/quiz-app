const params = new URLSearchParams(window.location.search);
const requestedLevel = Number.parseInt(params.get('level') || '1', 10);
const level = Number.isInteger(requestedLevel) ? Math.min(30, Math.max(1, requestedLevel)) : 1;
const category = 'puzzle';
const username = localStorage.getItem('currentUser') || 'guest';
const size = level <= 10 ? 3 : level <= 20 ? 4 : 5;
const tileCount = size * size;
const shuffleMoves = size === 3 ? 40 : size === 4 ? 100 : 180;

let board = [];
let moves = 0;
let paused = false;
let completed = false;

const boardElement = document.getElementById('puzzleBoard');
const movesElement = document.getElementById('puzzleMoves');
const menuElement = document.getElementById('puzzleMenu');
const completionElement = document.getElementById('puzzleComplete');

document.getElementById('puzzleLevel').textContent = `LEVEL ${level} · ${size} × ${size}`;
boardElement.style.setProperty('--puzzle-size', size);

function createSolvedBoard() {
  return Array.from({ length: tileCount }, (_, index) => (index + 1) % tileCount);
}

function getAdjacentIndexes(index) {
  const row = Math.floor(index / size);
  const column = index % size;
  const adjacent = [];
  if (row > 0) adjacent.push(index - size);
  if (row < size - 1) adjacent.push(index + size);
  if (column > 0) adjacent.push(index - 1);
  if (column < size - 1) adjacent.push(index + 1);
  return adjacent;
}

function shuffleBoard() {
  board = createSolvedBoard();
  let blankIndex = board.indexOf(0);
  let previousBlank = -1;

  for (let step = 0; step < shuffleMoves; step++) {
    let choices = getAdjacentIndexes(blankIndex).filter(index => index !== previousBlank);
    if (choices.length === 0) choices = getAdjacentIndexes(blankIndex);
    const nextIndex = choices[Math.floor(Math.random() * choices.length)];
    [board[blankIndex], board[nextIndex]] = [board[nextIndex], board[blankIndex]];
    previousBlank = blankIndex;
    blankIndex = nextIndex;
  }

  if (isSolved()) shuffleBoard();
  moves = 0;
  renderBoard();
}

function renderBoard() {
  boardElement.innerHTML = '';
  movesElement.textContent = `Moves: ${moves}`;

  board.forEach((value, index) => {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = value === 0 ? 'puzzle-tile puzzle-empty' : 'puzzle-tile';
    tile.textContent = value === 0 ? '' : value;
    tile.setAttribute('aria-label', value === 0 ? 'Empty space' : `Tile ${value}`);
    tile.disabled = paused || completed || value === 0;
    tile.addEventListener('click', () => moveTile(index));
    boardElement.appendChild(tile);
  });
}

function moveTile(index) {
  if (paused || completed) return;
  const blankIndex = board.indexOf(0);
  if (!getAdjacentIndexes(blankIndex).includes(index)) return;

  [board[blankIndex], board[index]] = [board[index], board[blankIndex]];
  moves++;
  renderBoard();
  if (isSolved()) finishPuzzle();
}

function isSolved() {
  return board.every((value, index) => value === (index + 1) % tileCount);
}

function finishPuzzle() {
  completed = true;

  const completedKey = `completedLevels_${category}`;
  const completedLevels = JSON.parse(localStorage.getItem(completedKey) || '[]');
  const firstCompletion = !completedLevels.includes(level);
  if (firstCompletion) {
    completedLevels.push(level);
    localStorage.setItem(completedKey, JSON.stringify(completedLevels));

    const scoreKey = `score_${category}_${username}`;
    const score = Number.parseInt(localStorage.getItem(scoreKey) || '0', 10);
    localStorage.setItem(scoreKey, score + 1);
  }

  const stars = moves <= shuffleMoves * 0.6 ? 3 : moves <= shuffleMoves ? 2 : 1;
  const starsKey = `levelStars_${category}`;
  const starsByLevel = JSON.parse(localStorage.getItem(starsKey) || '{}');
  starsByLevel[level] = Math.max(starsByLevel[level] || 0, stars);
  localStorage.setItem(starsKey, JSON.stringify(starsByLevel));

  document.getElementById('puzzleResultText').textContent =
    `Level ${level} solved in ${moves} moves.`;
  document.getElementById('puzzleResultStars').textContent =
    `${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}`;

  const nextButton = document.getElementById('puzzleNextBtn');
  if (level < 30) {
    nextButton.addEventListener('click', () => {
      window.location.href = `puzzle.html?level=${level + 1}`;
    });
  } else {
    nextButton.textContent = 'ALL PUZZLES SOLVED!';
    nextButton.disabled = true;
  }

  completionElement.hidden = false;
  renderBoard();
}

function setPaused(value) {
  paused = value;
  menuElement.hidden = !value;
  renderBoard();
  if (value) document.getElementById('puzzleResumeBtn').focus();
  else document.getElementById('puzzleMenuBtn').focus();
}

document.getElementById('puzzleShuffleBtn').addEventListener('click', shuffleBoard);
document.getElementById('puzzleMenuBtn').addEventListener('click', () => setPaused(true));
document.getElementById('puzzleResumeBtn').addEventListener('click', () => setPaused(false));
document.getElementById('puzzleRestartBtn').addEventListener('click', () => {
  setPaused(false);
  shuffleBoard();
});
document.getElementById('puzzleLevelsBtn').addEventListener('click', () => {
  window.location.href = 'levels.html';
});
document.getElementById('puzzleCompleteLevelsBtn').addEventListener('click', () => {
  window.location.href = 'levels.html';
});
document.getElementById('puzzleHomeBtn').addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setPaused(!paused);
});

shuffleBoard();
