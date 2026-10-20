(function () {
  function storageKey(username) {
    return `profilePhoto:${username}`;
  }

  function get(username) {
    return localStorage.getItem(storageKey(username));
  }

  function render(element, username, decorative = false) {
    if (!element) return;

    const photo = get(username);
    element.replaceChildren();
    if (!photo) {
      element.textContent = username ? username.charAt(0).toUpperCase() : 'P';
      return;
    }

    const image = document.createElement('img');
    image.src = photo;
    image.alt = decorative ? '' : `${username}'s profile photo`;
    element.appendChild(image);
  }

  window.profilePhotos = {
    get,
    render,
    save(username, photo) {
      localStorage.setItem(storageKey(username), photo);
    },
    remove(username) {
      localStorage.removeItem(storageKey(username));
    }
  };
})();
