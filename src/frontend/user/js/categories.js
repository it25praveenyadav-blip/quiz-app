const TOTAL_LEVELS = 30;
const username = localStorage.getItem('currentUser') || 'guest';

const categories = [
  { id: 'sports', name: 'Sports', icon: '⚽', questions: typeof sportsQuestions !== 'undefined' ? sportsQuestions.length : 0 },
  { id: 'temples', name: 'Temples', icon: '🛕', questions: typeof templesQuestions !== 'undefined' ? templesQuestions.length : 0 },
  { id: 'songs', name: 'Songs', icon: '🎵', questions: typeof songsQuestions !== 'undefined' ? songsQuestions.length : 0 },
  { id: 'economics', name: 'Economics', icon: '💰', questions: typeof economicsQuestions !== 'undefined' ? economicsQuestions.length : 0 },
  { id: 'puzzle', name: 'Puzzle Solve', icon: '🧩', questions: null }
];

const grid = document.getElementById('categoryGrid');
const greetingName = username === 'guest' ? 'Player' : username;
document.getElementById('categoryGreeting').textContent = `Hi, ${greetingName}`;
document.getElementById('categoryAvatar').textContent = greetingName.charAt(0).toUpperCase();

let totalCompletedLevels = 0;
let totalPoints = 0;

categories.forEach(cat => {
  const completed = JSON.parse(localStorage.getItem(`completedLevels_${cat.id}`) || '[]');
  const score = Number.parseInt(localStorage.getItem(`score_${cat.id}_${username}`) || '0', 10);
  totalCompletedLevels += completed.length;
  totalPoints += Number.isNaN(score) ? 0 : score;

  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'category-card-button';
  card.setAttribute('aria-label', `${cat.name}, ${cat.questions === null ? `${TOTAL_LEVELS} levels` : `${cat.questions} questions`}`);

  const icon = document.createElement('span');
  icon.className = `category-card-icon category-icon-${cat.id}`;
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = cat.icon;

  const name = document.createElement('span');
  name.className = 'category-card-name';
  name.textContent = cat.name;

  const description = document.createElement('span');
  description.className = 'category-card-description';
  description.textContent = cat.questions === null
    ? `${completed.length} / ${TOTAL_LEVELS} levels`
    : `${cat.questions} questions`;

  card.append(icon, name, description);

  card.addEventListener('click', () => {
    localStorage.setItem('selectedCategory', cat.id);
    window.location.href = 'levels.html';
  });

  grid.appendChild(card);
});

document.getElementById('categoryLevels').textContent = totalCompletedLevels;
document.getElementById('categoryPoints').textContent = totalPoints;