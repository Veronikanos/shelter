const hamburger = document.querySelector('.nav-button');
const popup = document.querySelector('#popup');
const body = document.body;

const menu = document.querySelector('#menu').cloneNode(1);

hamburger.addEventListener('click', hamburgerHandler);

function hamburgerHandler(e) {
  e.preventDefault();
  popup.classList.toggle('open');
  hamburger.classList.toggle('active');
  body.classList.toggle('noscroll');
  renderPopup();
}

function renderPopup() {
  popup.appendChild(menu);
}
const links = Array.from(menu.children);

links.forEach((link) => {
  link.addEventListener('click', closeOnClick);
});

function closeOnClick() {
  popup.classList.remove('open');
  hamburger.classList.remove('active');
  body.classList.remove('noscroll');
}

document.addEventListener('click', function (event) {
  if (!popup.classList.contains('open') || event.target === hamburger)
    return;

  const isClickInsideMenu = menu.contains(event.target);
  if (!isClickInsideMenu) closeOnClick();
});
