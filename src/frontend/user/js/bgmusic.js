if (!document.getElementById('bgMusic')) {
  const audio = document.createElement('audio');
  audio.id = 'bgMusic';
  audio.src = 'audio/background-music.mp3';
  audio.loop = true;
  audio.volume = 0.3;
  document.body.appendChild(audio);
}

const bgMusic = document.getElementById('bgMusic');

function isMusicOn() {
  return localStorage.getItem('musicOn') !== 'false';
}

function playBgMusic() {
  if (isMusicOn()) {
    bgMusic.play().catch(() => {});
  }
}

function toggleBgMusic() {
  const current = isMusicOn();
  localStorage.setItem('musicOn', !current);
  if (!current) {
    playBgMusic();
  } else {
    bgMusic.pause();
  }
  updateMusicButton();
}

function updateMusicButton() {
  const btn = document.getElementById('musicToggleBtn');
  if (btn) btn.textContent = isMusicOn() ? '🔊' : '🔇';
}

window.addEventListener('DOMContentLoaded', () => {
  playBgMusic();
  updateMusicButton();
});

document.addEventListener('click', function resumeOnce() {
  if (isMusicOn() && bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
  document.removeEventListener('click', resumeOnce);
}, { once: true });