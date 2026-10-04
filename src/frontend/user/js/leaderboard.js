const users = JSON.parse(localStorage.getItem('users') || '[]');
const entries = users.map(u => {
  const stats = JSON.parse(localStorage.getItem(`stats_${u.username}`) || '{"totalScore":0}');
  return { name: u.username, score: stats.totalScore };
}).sort((a, b) => b.score - a.score);

const list = document.getElementById('leaderboardList');
if (entries.length === 0) {
  list.innerHTML = '<p class="subtitle" style="color:#5a3a1a;">No players yet</p>';
} else {
  entries.forEach((e, i) => {
    const row = document.createElement('div');
    row.className = 'wood-lb-row';
    row.innerHTML = `<span style="color:#3a2a1a; font-weight:900;">#${i + 1} ${e.name}</span><span style="color:#a06818; font-weight:900;">${e.score} pts</span>`;
    list.appendChild(row);
  });
}