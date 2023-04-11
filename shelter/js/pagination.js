import {createModalAfterLoading} from './modal.js';

let allPets;
let cardsPerPage = 0;
let allListOfCardsWithRepeats = [];
const petsCardsContainer = document.querySelector(
  '.our-friends-list.pagination'
);

let currentPage;

start();
currentPage = 1;

async function start() {
  try {
    const res = await fetch('./assets/data.json');
    allPets = await res.json();
  } catch (err) {
    console.log(err.message);
  }
  generateAllCardsChain();
  countCardsPerPage();
  insertMarkup(currentPage);
}

function generateAllCardsChain() {
  let allCards = [];

  for (let i = 0; i < allPets.length; i++) {
    let randomNumber = Math.floor(Math.random() * allPets.length);
    if (allCards.includes(randomNumber)) i--;
    else allCards.push(randomNumber);
  }

  //Split into three sub-arrays
  let size = 3;
  let arr = [];
  for (let i = 0; i < Math.ceil(allCards.length / size); i++) {
    arr[i] = allCards.slice(i * size, i * size + size);
  }

  for (let i = 0; i < 6; i++) {
    [...arr].forEach((item) => {
      const shuffledArr = shuffle(item);
      allListOfCardsWithRepeats.push(...shuffledArr);
    });
  }
}

function shuffle(mixed) {
  for (let i = mixed.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [mixed[i], mixed[j]] = [mixed[j], mixed[i]];
  }
  return mixed;
}

function countCardsPerPage() {
  const width = document.body.offsetWidth;

  cardsPerPage = 6;
  if (width < 768) {
    cardsPerPage = 3;
  } else if (width >= 1280) {
    cardsPerPage = 8;
  }
}

function insertMarkup(currentPage) {
  petsCardsContainer.innerHTML = '';

  const offset = cardsPerPage * currentPage - cardsPerPage;
  const range = cardsPerPage * currentPage;

  for (let i = offset; i < range; i++) {
    const num = allListOfCardsWithRepeats[i];

    petsCardsContainer.insertAdjacentHTML(
      'beforeend',
      `
			<li class="our-friends-item our-friends__pets" data-id='${allPets[num].id}'>
			<div class="our-friends-image">
				<img
					src=${allPets[num].img}
					alt='${allPets[num].breed} ${allPets[num].name}' />
			</div>
			<span class="pet-name">${allPets[num].name}</span
			><button class="btn transparent btn__learn-more">
				Learn more
			</button>
		</li>
		`
    );
  }
  createModalAfterLoading(allPets);
}

// Listen all clicks to arrows
const paginationButtonsWrapper = document.querySelector(
  '.our-friends__pagination'
);
const activePageNumber = paginationButtonsWrapper.querySelector(
  '.pagination-btn__active'
);
const nextButton = paginationButtonsWrapper.querySelector(
  '.pagination-btn__next'
);
const prevButton = paginationButtonsWrapper.querySelector(
  '.pagination-btn__prev'
);

paginationButtonsWrapper.addEventListener('click', handleClick);

// createModalAfterLoading();

const lastButton = document.querySelector('.pagination-btn__last');
const firstButton = document.querySelector('.pagination-btn__first');

function handleClick(e) {
  const target = e.target.closest('button');
  if (!target) return;

  let maxPage = Math.ceil(
    allListOfCardsWithRepeats.length / cardsPerPage
  );

  if (target === nextButton) {
    currentPage++;

    if (currentPage < maxPage) {
      activePageNumber.textContent = currentPage;
      insertMarkup(currentPage);

      prevButton.disabled = false;
      firstButton.disabled = false;
    }
  } else if (target === prevButton) {
    currentPage--;
    if (currentPage > 1) {
      activePageNumber.textContent = currentPage;
      insertMarkup(currentPage);

      nextButton.disabled = false;
      lastButton.disabled = false;
    }
  } else if (target === lastButton) {
    currentPage = maxPage;
    insertMarkup(maxPage);
  } else if (target === firstButton) {
    currentPage = 1;
    insertMarkup(currentPage);
  }

  if (currentPage === maxPage) {
    activePageNumber.textContent = currentPage;
    disableButtons(nextButton);
    insertMarkup(maxPage);
  }

  if (currentPage === 1) {
    activePageNumber.textContent = currentPage;
    disableButtons(prevButton);
    insertMarkup(currentPage);
  }
}

function disableButtons(btn) {
  btn.disabled = true;
  if (btn === nextButton) {
    lastButton.disabled = true;
    firstButton.disabled = false;
    prevButton.disabled = false;
  } else if (btn === prevButton) {
    firstButton.disabled = true;
    lastButton.disabled = false;
    nextButton.disabled = false;
  }
}

const smallWidthMediaQuery = window.matchMedia('(max-width: 767px)');
const mediumWidthMediaQuery = window.matchMedia(
  '(min-width: 768px) and (max-width: 1279px)'
);
const largeWidthMediaQuery = window.matchMedia('(min-width: 1280px)');

function mediaEvent(e) {
  if (e.matches) {
    countCardsPerPage();
    currentPage = 1;
    activePageNumber.textContent = currentPage;
    disableButtons(prevButton);
    insertMarkup(currentPage);
  }
}
smallWidthMediaQuery.addEventListener('change', mediaEvent);
mediumWidthMediaQuery.addEventListener('change', mediaEvent);
largeWidthMediaQuery.addEventListener('change', mediaEvent);
