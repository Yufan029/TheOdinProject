import loadPage from "./loadPage";
import loadMenu from "./menu";
import loadAbout from "./about";

const contentDiv = document.querySelector('#content');
contentDiv.appendChild(loadPage());

const homeBtn = document.querySelector('#home');
const menuBtn = document.querySelector('#menu');
const aboutBtn = document.querySelector('#about');

homeBtn.addEventListener('click', () => {
    contentDiv.textContent = '';
    contentDiv.appendChild(loadPage());
});

menuBtn.addEventListener('click', () => {
    contentDiv.textContent = '';
    contentDiv.appendChild(loadMenu());
});

aboutBtn.addEventListener('click', () => {
    contentDiv.textContent = '';
    contentDiv.appendChild(loadAbout());
});

