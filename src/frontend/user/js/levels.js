const TOTAL_LEVELS = 30;
const PER_PAGE = 8;
const category = localStorage.getItem('selectedCategory') || 'sports';
const storageKey = `completedLevels_${category}`;
const completed = JSON.parse(localStorage.getItem(storageKey) || '[]');
const currentLevel = completed.length + 1;

let currentPage = Math.floor((currentLevel - 1) / PER_PAGE);
const totalPages = Math.ceil(TOTAL_LEVELS / PER_PAGE);

const grid = document.getElementById('levelGrid');
const dotsContainer = document.getElementById('pageDots');

function renderPage() {
  grid.innerHTML = '';
  const start = currentPage * PER_PAGE + 1;
  const end = Math.min(start + PER_PAGE - 1, TOTAL_LEVELS);

  const starsData = JSON.parse(localStorage.getItem(`levelStars_${category}`) || '{}');

  for (let i = start; i <= end; i++) {
    const isUnlocked = i === 1 || completed.includes(i - 1);
    const isDone = completed.includes(i);

    const box = document.createElement('div');
    box.className = 'level-box-wrap';

    const btn = document.createElement('button');
    btn.className = 'level-box';
    if (isDone) btn.classList.add('done');
    if (!isUnlocked) btn.classList.add('locked');

    if (!isUnlocked) {
      btn.innerHTML = '🔒';
    } else {
      btn.textContent = i;
      btn.onclick = () => window.location.href = `quiz.html?level=${i}`;
    }

    const stars = document.createElement('div');
    stars.className = 'stars-row';
    const starCount = starsData[i] || 0;
    for (let s = 0; s < 3; s++) {
      const star = document.createElement('span');
      star.textContent = '⭐';
      if (s >= starCount) star.classList.add('dim');
      stars.appendChild(star);
    }

    box.appendChild(btn);
    box.appendChild(stars);
    grid.appendChild(box);
  }

  renderDots();
}

function renderDots() {
  dotsContainer.innerHTML = '';
  for (let p = 0; p < totalPages; p++) {
    const dot = document.createElement('span');
    dot.className = 'page-dot';
    if (p === currentPage) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  }
}

document.getElementById('prevPage').onclick = () => {
  currentPage = (currentPage - 1 + totalPages) % totalPages;
  renderPage();
};
document.getElementById('nextPage').onclick = () => {
  currentPage = (currentPage + 1) % totalPages;
  renderPage();
};

renderPage();