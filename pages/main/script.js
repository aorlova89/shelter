let expandNavBar = () => {
  let navMenu = document.getElementById("nav-menu");
  let navMenuIcon = document.getElementById('nav-menu-icon');
  if (navMenu.style.display === "flex") {
    //todo rotate burger icon transform: rotate(180deg);
    //change opacity for not-only
    navMenu.style.display = "none";

    // navMenuIcon.style.transform = 'rotate(180deg);';
  } else {
    navMenu.style.display = "flex";
    navMenuIcon.style.transform = 'rotate(180deg);';
  }
}

export {expandNavBar};
