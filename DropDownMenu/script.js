const menuIcon = document.querySelector("#menu-icon");
const closeIcon = document.querySelector("#close-icon");
const ulMenu = document.querySelector("#menu");

closeIcon.style.display = "none";
ulMenu.style.display = "none";

const btn = document.querySelector("#dropDownBtn");
btn.addEventListener("click", toggleMenu);

function toggleMenu(e) {
  var target = e.target.id;
  e.target.style.display = "none";

  if (target === "menu-icon") {
    closeIcon.style.display = "block";
    ulMenu.style.display = "block";
  } else {
    menuIcon.style.display = "block";
    ulMenu.style.display = "none";
  }
}
