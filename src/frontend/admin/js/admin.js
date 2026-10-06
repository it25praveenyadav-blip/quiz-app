let currentCategory = null;
let questionCounts = {};

const categories = [
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'temples', name: 'Temples', icon: '🛕' },
  { id: 'songs', name: 'Songs', icon: '🎵' },
  { id: 'economics', name: 'Economics', icon: '💰' }
];

async function checkLogin() {
  const entered = document.getElementById('adminPassword').value;
  const error = document.getElementById('loginError');
  error.textContent = '';
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: entered })
    });
    if (response.status === 401) {
      error.textContent = 'Wrong password!';
      return;
    }
    if (!response.ok) throw new Error(`Login failed (${response.status}).`);
    sessionStorage.setItem('adminLoggedIn', 'true');
    sessionStorage.setItem('adminPassword', entered);
    document.getElementById('adminPassword').value = '';
    showDashboard();
  } catch (err) {
    error.textContent = `Unable to connect to the server: ${err.message}`;
  }
}

function logout() {
  sessionStorage.removeItem('adminLoggedIn');
  sessionStorage.removeItem('adminPassword');
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
}

async function adminRequest(path, options = {}) {
  const headers = {
    ...options.headers,
    'X-Admin-Password': sessionStorage.getItem('adminPassword') || ''
  };
  const response = await fetch(path, { ...options, headers });
  if (response.status === 401) {
    logout();
    throw new Error('Admin session expired. Please log in again.');
  }
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Request failed (${response.status}).`);
  }
  return response.status === 204 ? null : response.json();
}

async function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  const error = document.getElementById('dashboardError');
  error.textContent = '';
  error.hidden = true;
  try {
    const questionLists = await Promise.all(
      categories.map(cat => adminRequest(`/api/admin/questions/${cat.id}`))
    );
    questionCounts = Object.fromEntries(
      categories.map((cat, index) => [cat.id, questionLists[index].length])
    );
  } catch (err) {
    error.textContent = `Unable to load questions: ${err.message}`;
    error.hidden = false;
  }
  renderCategoryCards();
}

function renderCategoryCards() {
  const grid = document.getElementById('adminCatGrid');
  grid.innerHTML = '';

  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'admin-cat-card';
    if (currentCategory === cat.id) card.classList.add('active');
    const icon = document.createElement('div');
    icon.className = 'admin-cat-icon';
    icon.textContent = cat.icon;
    const name = document.createElement('p');
    name.className = 'admin-cat-name';
    name.textContent = cat.name;
    const count = document.createElement('p');
    count.className = 'admin-cat-count';
    count.textContent = `${questionCounts[cat.id] || 0} questions`;
    card.append(icon, name, count);
    card.onclick = () => selectCategory(cat.id, cat.name);
    grid.appendChild(card);
  });
}

async function selectCategory(id, name) {
  currentCategory = id;
  document.getElementById('categoryPanel').style.display = 'block';
  document.getElementById('formCategoryTitle').textContent = `➕ Add Question — ${name}`;
  document.getElementById('listCategoryTitle').textContent = `📋 Existing Questions — ${name}`;
  document.getElementById('formMsg').textContent = '';
  renderCategoryCards();
  try {
    renderQuestions(await adminRequest(`/api/admin/questions/${id}`));
  } catch (err) {
    document.getElementById('formMsg').textContent = `Unable to load questions: ${err.message}`;
  }
}

async function addQuestion() {
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

  try {
    await adminRequest(`/api/admin/questions/${currentCategory}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, options: opts, correct })
    });
    document.getElementById('questionText').value = '';
    document.getElementById('option0').value = '';
    document.getElementById('option1').value = '';
    document.getElementById('option2').value = '';
    document.getElementById('option3').value = '';
    questionCounts[currentCategory] = (questionCounts[currentCategory] || 0) + 1;
    renderCategoryCards();
    msg.textContent = '✅ Question added successfully!';
    msg.style.color = '#0f5';
    try {
      renderQuestions(await adminRequest(`/api/admin/questions/${currentCategory}`));
    } catch (err) {
      msg.textContent = `Question saved, but the list could not refresh: ${err.message}`;
      msg.style.color = '#ff4d6d';
    }
  } catch (err) {
    msg.textContent = `Unable to save question: ${err.message}`;
    msg.style.color = '#ff4d6d';
  }
}

function renderQuestions(questions) {
  if (!currentCategory) return;
  const list = document.getElementById('questionList');
  list.innerHTML = '';

  if (questions.length === 0) {
    list.innerHTML = '<p class="admin-empty">No custom questions added yet for this category.</p>';
    return;
  }

  questions.forEach((q, idx) => {
    const item = document.createElement('div');
    item.className = 'admin-q-item';
    const text = document.createElement('p');
    text.className = 'admin-q-text';
    text.textContent = `${idx + 1}. ${q.text}`;
    const options = document.createElement('ul');
    options.className = 'admin-q-options';
    q.options.forEach((option, optionIndex) => {
      const itemOption = document.createElement('li');
      itemOption.textContent = option;
      if (optionIndex === q.correct) itemOption.classList.add('correct-opt');
      options.appendChild(itemOption);
    });
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn-outline small-btn';
    deleteButton.textContent = '🗑 Delete';
    deleteButton.addEventListener('click', () => deleteQuestion(q.id));
    item.append(text, options, deleteButton);
    list.appendChild(item);
  });
}

async function deleteQuestion(id) {
  const msg = document.getElementById('formMsg');
  try {
    await adminRequest(`/api/admin/questions/${currentCategory}/${id}`, { method: 'DELETE' });
    questionCounts[currentCategory] = Math.max(0, (questionCounts[currentCategory] || 0) - 1);
    renderCategoryCards();
    msg.textContent = 'Question deleted.';
    msg.style.color = '#0f5';
    try {
      renderQuestions(await adminRequest(`/api/admin/questions/${currentCategory}`));
    } catch (err) {
      msg.textContent = `Question deleted, but the list could not refresh: ${err.message}`;
      msg.style.color = '#ff4d6d';
    }
  } catch (err) {
    msg.textContent = `Unable to delete question: ${err.message}`;
    msg.style.color = '#ff4d6d';
  }
}

if (sessionStorage.getItem('adminLoggedIn') === 'true' && sessionStorage.getItem('adminPassword')) {
  showDashboard();
}