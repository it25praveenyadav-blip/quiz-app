const username = localStorage.getItem('currentUser');
document.getElementById('profileName').textContent = username || 'Guest';

const stats = JSON.parse(localStorage.getItem(`stats_${username}`) || '{"totalScore":0,"totalQuestions":0,"totalCorrect":0,"badges":[]}');

const statsGrid = document.getElementById('statsGrid');
statsGrid.innerHTML = `
  <div class="wood-stat-box"><p class="wood-stat-num">${stats.totalScore}</p><p class="wood-stat-label">Total Score</p></div>
  <div class="wood-stat-box"><p class="wood-stat-num">${stats.totalQuestions}</p><p class="wood-stat-label">Questions Played</p></div>
  <div class="wood-stat-box"><p class="wood-stat-num">${stats.totalQuestions ? Math.round((stats.totalCorrect/stats.totalQuestions)*100) : 0}%</p><p class="wood-stat-label">Accuracy</p></div>
`;

const badgesGrid = document.getElementById('badgesGrid');
if (stats.badges.length === 0) {
  badgesGrid.innerHTML = '<p class="subtitle">No badges yet — keep playing!</p>';
} else {
  stats.badges.forEach(b => {
    const span = document.createElement('span');
    span.className = 'wood-badge';
    span.textContent = `🏅 ${b}`;
    badgesGrid.appendChild(span);
  });
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'signin.html';
}