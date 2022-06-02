import {expandNavBar, buildModal} from "./utils.js";


let petsJson = await fetch('../../assets/pets.json');
let pets = await petsJson.json();

let getPetById = (id) => {
  return pets.filter(pet => pet.name === id);
}

const cards = document.querySelectorAll('.card');
cards.forEach(function (trigger) {
  trigger.addEventListener('click', function (event) {
    let id = event.target.classList.contains('card') ? event.target.id : event.target.parentNode.id;
    let pet = getPetById(id);
    buildModal(pet);
  });
});

let navMenuIcon = document.getElementById('nav-menu-icon');
navMenuIcon.addEventListener('click', expandNavBar);
