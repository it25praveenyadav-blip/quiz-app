const ADMIN_PASSWORD = "admin123";
let currentCategory = null;

const categories = [
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'temples', name: 'Temples', icon: '🛕' },
  { id: 'songs', name: 'Songs', icon: '🎵' },
  { id: 'economics', name: 'Economics', icon: '💰' }
];

function checkLogin() {
  const entered = document.getElementById('adminPassword').value;
  if (entered === ADMIN_PASSWORD) {
    sessionStorage.setItem('adminLoggedIn', 'true');
    showDashboard();
  } else {
    document.getElementById('loginError').textContent = 'Wrong password!';
  }
}

function logout() {
  sessionStorage.removeItem('adminLoggedIn');
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  renderCategoryCards();
}

function renderCategoryCards() {
  const grid = document.getElementById('adminCatGrid');
  grid.innerHTML = '';

  categories.forEach(cat => {
    const count = JSON.parse(localStorage.getItem(`customQuestions_${cat.id}`) || '[]').length;

    const card = document.createElement('div');
    card.className = 'admin-cat-card';
    if (currentCategory === cat.id) card.classList.add('active');
    card.innerHTML = `
      <div class="admin-cat-icon">${cat.icon}</div>
      <p class="admin-cat-name">${cat.name}</p>
      <p class="admin-cat-count">${count} questions</p>
    `;
    card.onclick = () => selectCategory(cat.id, cat.name);
    grid.appendChild(card);
  });
}

function selectCategory(id, name) {
  currentCategory = id;
  document.getElementById('categoryPanel').style.display = 'block';
  document.getElementById('formCategoryTitle').textContent = `➕ Add Question — ${name}`;
  document.getElementById('listCategoryTitle').textContent = `📋 Existing Questions — ${name}`;
  document.getElementById('formMsg').textContent = '';
  renderCategoryCards();
  renderQuestions();
}

function addQuestion() {
  if (!currentCategory) return;
  const text = document.getElementById('questionText').value.trim();
  const opts = [
    document.getElementById('option0').value.trim(),
    document.getElementById('option1').value.trim(),
    document.getElementById('option2').value.trim(),
    document.getElementById('option3').value.trim()
  ];
  const correct = parseInt(document.getElementById('correctOption').value);
  const msg = document.getElementById('formMsg');

  if (!text || opts.some(o => !o)) {
    msg.textContent = '⚠️ Please fill question and all 4 options.';
    msg.style.color = '#ff4d6d';
    return;
  }

  const key = `customQuestions_${currentCategory}`;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push({ text, options: opts, correct });
  localStorage.setItem(key, JSON.stringify(existing));

  msg.textContent = '✅ Question added successfully!';
  msg.style.color = '#0f5';

  document.getElementById('questionText').value = '';
  document.getElementById('option0').value = '';
  document.getElementById('option1').value = '';
  document.getElementById('option2').value = '';
  document.getElementById('option3').value = '';

  renderCategoryCards();
  renderQuestions();
}

function renderQuestions() {
  if (!currentCategory) return;
  const key = `customQuestions_${currentCategory}`;
  const questions = JSON.parse(localStorage.getItem(key) || '[]');
  const list = document.getElementById('questionList');
  list.innerHTML = '';

  if (questions.length === 0) {
    list.innerHTML = '<p class="admin-empty">No custom questions added yet for this category.</p>';
    return;
  }

  questions.forEach((q, idx) => {
    const item = document.createElement('div');
    item.className = 'admin-q-item';
    item.innerHTML = `
      <p class="admin-q-text">${idx + 1}. ${q.text}</p>
      <ul class="admin-q-options">
        ${q.options.map((o, i) => `<li class="${i === q.correct ? 'correct-opt' : ''}">${o}</li>`).join('')}
      </ul>
      <button class="btn-outline small-btn" onclick="deleteQuestion(${idx})">🗑 Delete</button>
    `;
    list.appendChild(item);
  });
}

function deleteQuestion(idx) {
  const key = `customQuestions_${currentCategory}`;
  const questions = JSON.parse(localStorage.getItem(key) || '[]');
  questions.splice(idx, 1);
  localStorage.setItem(key, JSON.stringify(questions));
  renderCategoryCards();
  renderQuestions();
}

if (sessionStorage.getItem('adminLoggedIn') === 'true') {
  showDashboard();
}