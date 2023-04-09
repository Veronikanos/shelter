let pastArr = [];
let currArr = [];
let nextArr = [];

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
// function init() {}

// init();
