// const { default: axios } = require("axios");

// const { createElement } = require("react");

// let btnCircle = document.getElementsByClassName("cricle");
const btn = document.getElementById("button");
let form = document.querySelector('#form');
let cardList = document.querySelector(".cards-list");
let newCardName = document.querySelector("#input-name");
let newCardTitle = document.querySelector("#input-title");
let newCardText = document.querySelector("#input-text");

// console.log(cardItem);
// let firstCardItem = cardItem[0];
// console.log(firstCardItem);


function addCard(event) {
  event.preventDefault();
  let cardItemAll = document.querySelectorAll(".card-item");
  let firstCardItem = cardItemAll[0];
  let cardItem = document.createElement('li');
  cardItem.className = 'card-item';
  let cardItemName = newCardName.value;
  let cardItemTitle = newCardTitle.value;
  let cardItemText = newCardText.value;
  cardItem.innerHTML = '<p class="card-name">'+cardItemName+'</p> <h2 class="card-title">'+cardItemTitle+'</h2> <p class="card-text">'+cardItemText+'</p>';
  cardList.insertBefore(cardItem, firstCardItem);

  let url = 'https://sheet.best/api/sheets/2c798965-3ead-48a5-aa4f-cf29b2a39e3d';
  console.log(url);

  axios.post(url, {
    name: cardItemName,
    title: cardItemTitle,
    text: cardItemText
  })
  .then(function (ressponse) {
    console.log(ressponse);
  })
  .then(function (error) {
    console.log(error);
  });
}

function validation() {
  let titleLength = newCardTitle.value.trim().length;
  if (titleLength !== 0) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', '');
  }
}

let url = 'https://sheet.best/api/sheets/2c798965-3ead-48a5-aa4f-cf29b2a39e3d';
console.log(url);

axios.get(url).then(res => {
  console.log(res.data);

  let dataLength = res.data.length;
  console.log(dataLength);

  for (let i = 0; i < res.data.length; i++) {
    let cardItemAll = document.querySelectorAll(".card-item");
    let lastItem = document.createElement('li');
    lastItem.className = 'card-item'
    let lastItemName = res.data[i].name;
    let lastItemTitle = res.data[i].title;
    let lastItemText = res.data[i].text;
    console.log(lastItemName, lastItemTitle, lastItemText);
    lastItem.innerHTML = '<p class="card-name">'+lastItemName+'</p> <h2 class="card-title">'+lastItemTitle+'</h2> <p class="card-text">'+lastItemText+'</p>';
    let firstTwoCardItem = cardItemAll[0];
    cardList.insertBefore(lastItem, firstTwoCardItem);
  }
})
.then(function (ressponse) {
  console.log(ressponse);
})
.then(function (error) {
  console.log(error);
});

newCardTitle.addEventListener('input', validation);
form.addEventListener("submit", addCard);