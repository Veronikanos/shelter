const getData = async (url) => {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};

let allPets = await getData('./assets/data.json');
console.log(allPets);
let pastArr = [];
let currArr = [];
let nextArr = [];

const petsCards = document.querySelector('.our-friends-list');

async function init() {
  const [sliderWidth, numberOfCards] = getSlidersWidth();

  // - 1. генерируем массив nextArr;
  generateArr(numberOfCards, nextArr);

  // - 2. перемещаем значения из массива nextArr (попутно его обнуляя) в массив currArr;
  currArr.push(...nextArr);
  nextArr = [];

  // - 3. генерируем массив nextArr (помним про проверку на наличие значений в currArr);
  generateArr(numberOfCards, nextArr);

  // - 4. перемещаем значения из массива currArr (попутно его обнуляя) в массив pastArr;
  pastArr.push(...currArr);
  currArr = [];

  // - 5. перемещаем значения из массива nextArr (попутно его обнуляя) в массив currArr;
  currArr.push(...nextArr);
  nextArr = [];

  // - 6. генерируем массив nextArr (помним про проверку на наличие значений в currArr);
  generateArr(numberOfCards, nextArr);

  console.log(pastArr, currArr, nextArr);

  petsCards.innerHTML = generateCards().join('');
  // return > (pastArr([1,2,3]), currArr([4,5,6]), nextArr([7,8,1]))
}

function generateCards() {
  let markup = [];

  console.log(currArr);

  currArr.forEach((item) => {
    console.log(item);

    markup.push(`  	<li class="our-friends-item our-friends__pets">
  	<div class="our-friends-image">
  		<img
  			src=${item.img}
  			alt=${item.breed} ${item.name} />
  	</div>
  	<span class="pet-name">${item.name}</span
  	><button class="btn transparent btn__learn-more">
  		Learn more
  	</button>
  </li>`);
  });

  return markup;
}

function forward() {
  // 	- 1. обнуляем массив pastArr;
  pastArr = [];

  // - 2. перемещаем значения из массива currArr (попутно его обнуляя) в массив pastArr;
  pastArr.push(...currArr);
  currArr = [];

  // - 3. перемещаем значения из массива nextArr (попутно его обнуляя) в массив currArr;
  currArr.push(...nextArr);
  nextArr = [];

  // - 4. генерируем массив nextArr (помним про проверку на наличие значений в currArr).
  generateArr(numberOfCards, nextArr);
}

function backward() {
  nextArr = [];
  nextArr.push(...currArr);
  currArr = [];
  currArr.push(...pastArr);
  pastArr = [];
  generateArr(numberOfCards, pastArr);
}

function changeToBackward() {
  // - 1. меняем местами значения в массивах pastArr и currArr;
  const temp = [];
  temp.push(...pastArr);
  pastArr.push(...currArr);
  currArr.push(...temp);

  // - 2. обнуляем значеничия массива nextArr;
  nextArr = [];
  // - 3. генерируем массив nextArr (помним про проверку на наличие значений в currArr).
  generateArr(numberOfCards, nextArr);
}

function changeToForward() {
  const temp = [];
  temp.push(...nextArr);
  nextArr.push(...currArr);
  currArr.push(...temp);

  pastArr = [];
  generateArr(numberOfCards, pastArr);
}

function generateArr(numberOfCards, arr) {
  for (let i = 0; i < numberOfCards; i++) {
    let randomNumber = Math.floor(Math.random() * allPets.length);
    let elementFromData = allPets[randomNumber];
    // console.log(arr.includes(elementFromData));

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

function getSlidersWidth() {
  const myDiv = document.querySelector('.our-friends__slider');
  const width = myDiv.offsetWidth;
  console.log('Width: ' + width);

  let numberOfCards = 2;
  if (width < 580) {
    numberOfCards = 1;
  } else if (width > 580) {
    numberOfCards = 3;
  }

  return [width, numberOfCards];
}

init();
