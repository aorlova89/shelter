import {expandNavBar, buildModal, buildCard} from "./utils.js";


let petsJson = await fetch('../../assets/pets.json');
let pets = await petsJson.json();
pets.sort( () => 0.5 - Math.random());

let getPetById = (id) => {
  return pets.filter(pet => pet.name === id);
}

let navMenuIcon = document.getElementById('nav-menu-icon');
navMenuIcon.addEventListener('click', expandNavBar);

let navMenuBackground = document.querySelector('.nav-menu-exit');
navMenuBackground.addEventListener('click', function (event){
  event.preventDefault();
  expandNavBar();
});


let cardsContainer = document.querySelector('.cards');
// cardsContainer.innerHTML = "";

let cardsPerPage;
let screenSize = window.screen.availWidth;
if (screenSize > 1279) {
  cardsPerPage = 3;
} else if (screenSize > 767) {
  cardsPerPage = 2;
} else {
  cardsPerPage = 1;
}

let index = 0;

let buildCards = (index) => {
  cardsContainer.innerHTML = "";
  for (let i = 0; i < cardsPerPage; i++) {
    let card = buildCard(pets[(index + i + 8) % 8]);

    card.addEventListener('click', function(event){
      let id = event.target.classList.contains('card') ? event.target.id : event.target.parentNode.id;
      let pet = getPetById(id);
      buildModal(pet);
    });
    cardsContainer.appendChild(card);
  }
}

buildCards(index); //on page load;

let rightButton = document.querySelector('.right-arrow');
let leftButton = document.querySelector('.left-arrow');

rightButton.addEventListener('click', function(event){
  index += 1;
  buildCards((index + 8) % 8);
})

leftButton.addEventListener('click', function(event){
  if (index === 0) {
    index = pets.length-1;
  } else {
    index--;
  }
  buildCards(index);
})
