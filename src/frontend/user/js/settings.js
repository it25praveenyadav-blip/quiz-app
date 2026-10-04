function setToggleState(id, key, defaultOn = true) {
  const el = document.getElementById(id);
  const isOn = localStorage.getItem(key) !== 'false';
  if (isOn) el.classList.add('on');
}

function toggleSound() {
  const current = localStorage.getItem('soundOn') !== 'false';
  localStorage.setItem('soundOn', !current);
  document.getElementById('soundToggle').classList.toggle('on');
}

function toggleMusic() {
  const current = localStorage.getItem('musicOn') !== 'false';
  localStorage.setItem('musicOn', !current);
  document.getElementById('musicToggle').classList.toggle('on');
}

function toggleNotif() {
  const current = localStorage.getItem('notifOn') !== 'false';
  localStorage.setItem('notifOn', !current);
  document.getElementById('notifToggle').classList.toggle('on');
}

function resetProgress() {
  if (confirm('Are you sure? This will erase all your level progress and scores.')) {
    const username = localStorage.getItem('currentUser');
    ['sports', 'temples', 'songs', 'economics'].forEach(c => localStorage.removeItem(`completedLevels_${c}`));
    localStorage.removeItem(`stats_${username}`);
    alert('Progress reset!');
    window.location.href = 'index.html';
  }
}

setToggleState('soundToggle', 'soundOn');
setToggleState('musicToggle', 'musicOn');
setToggleState('notifToggle', 'notifOn');