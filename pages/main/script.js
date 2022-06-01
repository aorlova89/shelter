// let expandNavBar = () => {
//   let navMenu = document.getElementById("nav-menu");
//   let navMenuIcon = document.getElementById('nav-menu-icon');
//   if (navMenu.style.display === "flex") {
//     //todo rotate burger icon transform: rotate(180deg);
//     //change opacity for not-only
//     navMenu.style.display = "none";
//
//     // navMenuIcon.style.transform = 'rotate(180deg);';
//   } else {
//     navMenu.style.display = "flex";
//     navMenuIcon.style.transform = 'rotate(180deg);';
//   }
// }

const popups = document.querySelectorAll('.card');
const body = document.querySelector("body");

popups.forEach(function (trigger) {
  trigger.addEventListener('click', function (event) {
    let id = event.target.classList.contains('card') ? event.target.id : event.target.parentNode.id;
    let pet = getPetById(id);

    let petImg = document.querySelector('.modal .popup-pet-img');
    let petName = document.querySelector('.modal .popup__pet-name');
    let petDescription = document.querySelector('.modal .popup__pet-description');
    let petHistory = document.querySelector('.modal h5');
    let petAge = document.querySelector('.modal .age');
    let petInoculations = document.querySelector('.modal .inoculations');
    let petDiseases = document.querySelector('.modal .diseases');
    let petParasites = document.querySelector('.modal .parasites');

    petImg.style.background = `url(\"/${pet[0].img}\") no-repeat`;
    petImg.style.backgroundSize = 'cover';
    petName.innerText = pet[0].name;
    petDescription.innerText = `${pet[0].type} - ${pet[0].breed}`;
    petHistory.innerText = pet[0].description;
    petAge.innerText = pet[0].age;
    petInoculations.innerText = pet[0].inoculations;
    petDiseases.innerText = pet[0].diseases;
    petParasites.innerText = pet[0].parasites;

    event.preventDefault();
    const popup = document.querySelector('.modal');
    popup.classList.add('open');
    body.style.overflow = "hidden";

    const exits = popup.querySelectorAll('.modal-exit');
    exits.forEach(function (exit) {
      exit.addEventListener('click', function (event) {
        event.preventDefault();
        popup.classList.remove('open');
        body.style.overflow = "auto";
      });
    });
  });
});

let petsJson = await fetch('../../assets/pets.json');
let pets = await petsJson.json();

let getPetById = (id) => {
  return pets.filter(pet => pet.name === id);
}


// export {expandNavBar};
