const username = localStorage.getItem('currentUser');
document.getElementById('profileName').textContent = username || 'Guest';

const photoFrame = document.getElementById('profilePhotoFrame');
const photoInput = document.getElementById('profilePhotoInput');
const photoMessage = document.getElementById('profilePhotoMessage');
const removePhotoButton = document.getElementById('removeProfilePhoto');

function refreshProfilePhoto() {
  profilePhotos.render(photoFrame, username);
  removePhotoButton.hidden = !profilePhotos.get(username);
}

function resizeProfilePhoto(file) {
  return new Promise((resolve, reject) => {
    const imageUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(imageUrl);
      const scale = Math.min(1, 512 / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Could not process this image. Please try another photo.'));
        return;
      }
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error('This image could not be opened. Please choose another photo.'));
    };
    image.src = imageUrl;
  });
}

photoInput.addEventListener('change', async () => {
  photoMessage.textContent = '';
  const [file] = photoInput.files;
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    photoMessage.textContent = 'Choose an image file.';
    photoInput.value = '';
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    photoMessage.textContent = 'Photo must be 5 MB or smaller.';
    photoInput.value = '';
    return;
  }

  try {
    profilePhotos.save(username, await resizeProfilePhoto(file));
    refreshProfilePhoto();
    photoMessage.textContent = 'Profile photo saved on this device.';
  } catch (error) {
    photoMessage.textContent = error instanceof DOMException && error.name === 'QuotaExceededError'
      ? 'There is not enough browser storage for this photo. Choose a smaller image.'
      : error.message;
  } finally {
    photoInput.value = '';
  }
});

removePhotoButton.addEventListener('click', () => {
  profilePhotos.remove(username);
  refreshProfilePhoto();
  photoMessage.textContent = 'Profile photo removed.';
});

refreshProfilePhoto();

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