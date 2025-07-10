import sushiImage from './images/Sushi.png';
import paomoImage from './images/paomo.png';

export default function loadMenu() {
    const returnDiv = document.createElement('div');

    const title = document.createElement('h1');
    title.textContent = "Menu";
    
    const pElm = document.createElement('p');
    pElm.textContent = "These are what we like to eat";
    pElm.classList.add("intro");
    
    const pSushi = document.createElement('p');
    pSushi.appendChild(document.createTextNode('Crispy Chicken & Avocado Sushi'));
    pSushi.classList.add("intro");

    const sushi = new Image();
    sushi.src = sushiImage;
    sushi.classList.add("menuImage");

    const pPaomo = document.createElement('p');
    pPaomo.appendChild(document.createTextNode('This is the hometown famous food - Paomo'));
    pPaomo.classList.add("intro");

    const paomo = new Image();
    paomo.src = paomoImage;
    paomo.classList.add("menuImage");
    
    returnDiv.appendChild(title);
    returnDiv.appendChild(pElm);

    returnDiv.appendChild(pSushi);
    returnDiv.appendChild(sushi);

    returnDiv.appendChild(pPaomo);
    returnDiv.appendChild(paomo);
  
    return returnDiv;
}