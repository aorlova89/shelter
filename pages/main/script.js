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

let navMenuLinks = document.querySelectorAll('.nav-menu-link');

navMenuLinks.forEach(link => link.addEventListener('click', function (event){
  if (screenSize < 768) {
    expandNavBar();
  }
  })
);

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
let cardsContainer = document.querySelector('.cards');

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

buildCards(index);

let rightButton = document.querySelector('.right-arrow');
let leftButton = document.querySelector('.left-arrow');

rightButton.addEventListener('click', function(event){
  cardsContainer.style.transform = 'translateX(200%)';
  cardsContainer.style.removeProperty('transition');
  index += cardsPerPage;

  setTimeout(() => {
    buildCards((index + 8) % 8);
    cardsContainer.style.transform = 'translateX(0%)';
    cardsContainer.style.transition = '.5s ease-out';
  }, 0);
});

leftButton.addEventListener('click', function(event){
  cardsContainer.style.transform = 'translateX(-200%)';
  cardsContainer.style.removeProperty('transition');
  if (index === 0) {
    index = pets.length - cardsPerPage;
  } else {
    index -= cardsPerPage;
  }
  setTimeout(() => {
    buildCards((index + 8) % 8);
    cardsContainer.style.transform = 'translateX(0%)';
    cardsContainer.style.transition = '.5s ease-out';
  }, 0);
})
