import {buildCard, buildModal} from "../main/utils.js";


let petsJson = await fetch('../../assets/pets.json');
let pets = await petsJson.json();

let adjustedPets = [];

for (let i = 0; i < 6; i++) {
  adjustedPets.push(...[...pets].sort( () => 0.5 - Math.random()));
}
console.log(window.screen.availWidth);

(function () {
  "use strict";
  function Pagination() {
    const prevButton = document.getElementById('go-back');
    const nextButton = document.getElementById('go-next');
    const firstButton = document.getElementById('go-to-first');
    const lastButton = document.getElementById('go-to-last');

    prevButton.setAttribute('disabled', '');
    firstButton.setAttribute('disabled', '');

    let currentPage = 1;
    let cardsPerPage;
    let screenSize = window.screen.availWidth;
    if (screenSize > 1279) {
      cardsPerPage = 8;
    } else if (screenSize > 767) {
      cardsPerPage = 6;
    } else {
      cardsPerPage = 3
    }

    this.init = function() {
      changePage(1);
      addEventListeners();
    }

    let changePage = function(page) {
      let cards = document.querySelector('.cards-container');

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
    console.log(cardsPerPage)

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

    let addEventListeners = function() {
      prevButton.addEventListener('click', goToPrevPage);
      nextButton.addEventListener('click', goToNextPage);
      firstButton.addEventListener('click', goToFirstPage);
      lastButton.addEventListener('click', goToLastPage);
    }

    let numPages = function() {
      return Math.ceil(adjustedPets.length / cardsPerPage);
    }
  }
  let pagination = new Pagination();
  pagination.init();
})
();

let getPetById = (id) => {
  return pets.filter(pet => pet.name === id);
}
