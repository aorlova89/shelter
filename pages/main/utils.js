let expandNavBar = () => {
  const body = document.querySelector("body");
  let navMenu = document.getElementById("nav-menu");
  let navMenuIcon = document.getElementById('nav-menu-icon');
  let mainLogo = document.querySelector('.shelter-logo');

  navMenu.classList.toggle('visible');
  navMenuIcon.classList.toggle('rotated');
  body.classList.toggle('scroll-disabled');
  mainLogo.classList.toggle('shelter-logo-hidden');
}

let buildModal = (pet) => {
  const body = document.querySelector("body");
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
  const modal = document.querySelector('.modal');
  modal.classList.add('open');
  body.style.overflow = "hidden";

  const exits = modal.querySelectorAll('.modal-exit');
  exits.forEach(function (exit) {
    exit.addEventListener('click', function (event) {
      event.preventDefault();
      modal.classList.remove('open');
      body.style.overflow = "auto";
    });
  });
}

export {expandNavBar, buildModal};
