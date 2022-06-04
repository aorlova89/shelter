import {buildCard, buildModal, buildBurgerMenu} from "../main/utils.js";

buildBurgerMenu();

let petsJson = await fetch('../../assets/pets.json');
let pets = await petsJson.json();

let numberOfPages;
let cardsPerPage;
let screenSize = window.screen.availWidth;

if (screenSize > 1279) {
  numberOfPages = 6;
} else if (screenSize > 767) {
  numberOfPages = 8;
} else {
  numberOfPages = 16;
}

if (screenSize > 1279) {
  cardsPerPage = 8;
} else if (screenSize > 767) {
  cardsPerPage = 6;
} else {
  cardsPerPage = 3;
}

let adjustedPets = [];

for (let i = 0; i < numberOfPages; i++) {
  let tmp = [...pets].sort( () => 0.5 - Math.random());
  adjustedPets.push(...tmp.slice(0, cardsPerPage));
}

function Pagination() {
  const prevButton = document.getElementById('go-back');
  const nextButton = document.getElementById('go-next');
  const firstButton = document.getElementById('go-to-first');
  const lastButton = document.getElementById('go-to-last');

  prevButton.setAttribute('disabled', '');
  firstButton.setAttribute('disabled', '');

  let currentPage = 1;

  this.init = function() {
    changePage(1);
    addEventListeners();
  }

  let changePage = (page) => {
    let cards = document.querySelector('.cards');

    if (page < 1) {
      page = 1;
    }

    if (page > (numPages() - 1)) {
      page = numPages();
    }

    cards.innerHTML = "";

    for (let i = (page - 1) * cardsPerPage; i < (page * cardsPerPage) && i < adjustedPets.length; i++) {
      let card = buildCard(adjustedPets[i]);

      card.addEventListener('click', function(event){
        let id = event.target.classList.contains('card') ? event.target.id : event.target.parentNode.id;
        let pet = getPetById(id);
        buildModal(pet);
      });
      cards.appendChild(card);
    }

    let currentPageNumber = document.getElementById('current');
    currentPageNumber.innerText = currentPage;
  }

  let goToPrevPage = () => {
    if(currentPage > 1) {
      currentPage--;
      changePage(currentPage);
    }

    switch (currentPage) {
      case 1: {
        prevButton.setAttribute('disabled', '');
        firstButton.setAttribute('disabled', '');
        break;
      }
      case numPages()-1: {
        nextButton.removeAttribute('disabled');
        lastButton.removeAttribute('disabled');
        break;
      }
    }
  }

  let goToNextPage = () => {
    if(currentPage < numPages()) {
      currentPage++;
      changePage(currentPage);
    }

    switch (currentPage) {
      case 2: {
        prevButton.removeAttribute('disabled');
        firstButton.removeAttribute('disabled');
        break;
      }
      case numPages(): {
        nextButton.setAttribute('disabled', '');
        lastButton.setAttribute('disabled', '');
        break;
      }
    }
  }

  let goToFirstPage = () => {
    currentPage = 1;
    changePage(1);
    prevButton.setAttribute('disabled', '');
    firstButton.setAttribute('disabled', '');
    nextButton.removeAttribute('disabled');
    lastButton.removeAttribute('disabled');

  }

  let goToLastPage = () => {
    currentPage = numPages();
    changePage(numPages());
    nextButton.setAttribute('disabled', '');
    lastButton.setAttribute('disabled', '');
    prevButton.removeAttribute('disabled');
    firstButton.removeAttribute('disabled');
  }

  let addEventListeners = () => {
    prevButton.addEventListener('click', goToPrevPage);
    nextButton.addEventListener('click', goToNextPage);
    firstButton.addEventListener('click', goToFirstPage);
    lastButton.addEventListener('click', goToLastPage);
  }

  let numPages = () => {
    return Math.ceil(adjustedPets.length / cardsPerPage);
  }
}

let pagination = new Pagination();
pagination.init();

let getPetById = (id) => {
  return pets.filter(pet => pet.name === id);
}

