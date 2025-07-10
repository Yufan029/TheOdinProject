import familyImage from './images/family.jpg';
import './style.css';

export default function loadPage() {  
  const returnDiv = document.createElement('div');

  const title = document.createElement('h1');
  title.textContent = "Yufan's Family Menu";
  
  const image = new Image();
  image.src = familyImage;
  image.classList.add('familyImage');
  
  returnDiv.appendChild(title);
  returnDiv.appendChild(image);

  return returnDiv;
}