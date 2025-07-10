import cookWithFamilyImage from './images/CookWithFamily.jpg'

export default function loadAbout() {
    const returnDiv = document.createElement('div');

    const title = document.createElement('h1');
    title.textContent = "About Yufan";
    
    const pElm = document.createElement('p');
    pElm.textContent = "Yufan like to cook with his family.";
    pElm.classList.add("intro");
    
    const image = new Image();
    image.src = cookWithFamilyImage;
    
    returnDiv.appendChild(title);
    returnDiv.appendChild(pElm);
    returnDiv.appendChild(image);
  
    return returnDiv;
}