const TOTAL_LEVELS = 30;
const username = localStorage.getItem('currentUser') || 'guest';

const categories = [
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'temples', name: 'Temples', icon: '🛕' },
  { id: 'songs', name: 'Songs', icon: '🎵' },
  { id: 'economics', name: 'Economics', icon: '💰' }
];

const grid = document.getElementById('categoryGrid');
grid.innerHTML = '';

categories.forEach(cat => {
  const completed = JSON.parse(localStorage.getItem(`completedLevels_${cat.id}`) || '[]');
  const levelReached = completed.length;
  const catScore = localStorage.getItem(`score_${cat.id}_${username}`) || 0;

  const card = document.createElement('div');
  card.className = 'wood-cat-card';
  card.innerHTML = `
    <div class="wood-cat-circle">${cat.icon}</div>
    <p class="wood-cat-name">${cat.name}</p>
    <p class="wood-cat-stat">Score: ${catScore}</p>
    <p class="wood-cat-stat">Level: ${levelReached} / ${TOTAL_LEVELS}</p>
  `;

  card.addEventListener('click', function() {
    localStorage.setItem('selectedCategory', cat.id);
    window.location.href = 'levels.html';
  });

  grid.appendChild(card);
});