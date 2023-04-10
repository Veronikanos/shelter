let pastArr = [];
let currArr = [];
let nextArr = [];
let numberOfCards = 0;
let allPets;

const petsCards = document.querySelector(
  '.our-friends-list.carousel'
);
const nextButton = document.querySelector('button.next');
const prevButton = document.querySelector('button.prev');

start();

async function start() {
  try {
    const res = await fetch('./assets/data.json');
    allPets = await res.json();
  } catch (err) {
    console.log(err.message);
  }
  init();
}

function init() {
  countCardsPerPage();
  generateArr(nextArr);
  currArr.push(...nextArr);
  nextArr = [];
  generateArr(nextArr);
  pastArr.push(...currArr);
  currArr = [];
  currArr.push(...nextArr);
  nextArr = [];
  generateArr(nextArr);
  petsCards.innerHTML = generateCards().join('');
}

nextButton.addEventListener('click', moveRight);
prevButton.addEventListener('click', moveLeft);

petsCards.addEventListener('animationend', (e) => {
  if (e.animationName === 'move-right') {
    petsCards.classList.remove('transition-right');
    forward();
  } else {
    petsCards.classList.remove('transition-left');
    backward();
  }
  petsCards.innerHTML = generateCards().join('');
  nextButton.addEventListener('click', moveRight);
  prevButton.addEventListener('click', moveLeft);
});

function generateCards() {
  let markup = [];

  const carouselCards = [...pastArr, ...currArr, ...nextArr];

  carouselCards.forEach((item) => {
    markup.push(`  	<li class="our-friends-item our-friends__pets">
  	<div class="our-friends-image">
  		<img
  			src=${item.img}
  			alt='${item.breed} ${item.name}' />
  	</div>
  	<span class="pet-name">${item.name}</span
  	><button class="btn transparent btn__learn-more">
  		Learn more
  	</button>
  </li>`);
  });

  return markup;
}

function moveRight() {
  petsCards.classList.add('transition-right');
  nextButton.removeEventListener('click', moveRight);
}

function moveLeft() {
  petsCards.classList.add('transition-left');
  nextButton.removeEventListener('click', moveLeft);
}

function forward() {
  pastArr = [];
  pastArr.push(...currArr);
  currArr = [];
  currArr.push(...nextArr);
  nextArr = [];
  generateArr(nextArr);
}

function backward() {
  nextArr = [];
  nextArr.push(...currArr);
  currArr = [];
  currArr.push(...pastArr);
  pastArr = [];
  generateArr(pastArr);
}

// // function changeToBackward() {
// //   // - 1. меняем местами значения в массивах pastArr и currArr;
// //   const temp = [];
// //   temp.push(...pastArr);
// //   pastArr.push(...currArr);
// //   currArr.push(...temp);

// //   // - 2. обнуляем значеничия массива nextArr;
// //   nextArr = [];
// //   // - 3. генерируем массив nextArr
// //   generateArr(nextArr);
// // }

// // function changeToForward() {
// //   const temp = [];
// //   temp.push(...nextArr);
// //   nextArr.push(...currArr);
// //   currArr.push(...temp);

// //   pastArr = [];
// //   generateArr(pastArr);
// // }

function generateArr(arr) {
  for (let i = 0; i < numberOfCards; i++) {
    let randomNumber = Math.floor(Math.random() * allPets.length);
    let elementFromData = allPets[randomNumber];

    if (
      arr.includes(elementFromData) ||
      currArr.includes(elementFromData)
    ) {
      i--;
    } else {
      arr.push(elementFromData);
    }
  }
}

function countCardsPerPage() {
  const width = document.body.offsetWidth;

  numberOfCards = 2;
  if (width < 768) {
    numberOfCards = 1;
  } else if (width >= 1280) {
    numberOfCards = 3;
  }
}

const smallWidthMediaQuery = window.matchMedia('(max-width: 767px)');
const mediumWidthMediaQuery = window.matchMedia(
  '(min-width: 768px) and (max-width: 1279px)'
);
const largeWidthMediaQuery = window.matchMedia('(min-width: 1280px)');

function mediaEvent(e) {
  if (e.matches) {
    pastArr = [];
    currArr = [];
    nextArr = [];
    numberOfCards = 0;
    init();
    console.log(document.body.offsetWidth);
  }
}
smallWidthMediaQuery.addEventListener('change', mediaEvent);
mediumWidthMediaQuery.addEventListener('change', mediaEvent);
largeWidthMediaQuery.addEventListener('change', mediaEvent);
