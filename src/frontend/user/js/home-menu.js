const homeMenuToggle = document.getElementById('homeMenuToggle');
const homeMenu = document.getElementById('homeMenu');

function setHomeMenuOpen(isOpen) {
  homeMenu.hidden = !isOpen;
  homeMenuToggle.setAttribute('aria-expanded', String(isOpen));
}

homeMenuToggle.addEventListener('click', () => {
  setHomeMenuOpen(homeMenu.hidden);
});

document.addEventListener('click', event => {
  if (!event.target.closest('.home-menu')) setHomeMenuOpen(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    setHomeMenuOpen(false);
    homeMenuToggle.focus();
  }
});
