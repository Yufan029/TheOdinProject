import { createTodoItems } from './createTodoItems';

export default function createListItem(itemName, image) {
    let sideList = document.querySelector('.side-list');

    let newImage = new Image();
    newImage.src = image;
    newImage.classList.add('side-image');
    newImage.classList.add(itemName);

    sideList.appendChild(newImage);

    let pElem = document.createElement('p');
    pElem.appendChild(document.createTextNode(itemName));
    pElem.classList.add('side-text');
    pElem.classList.add(itemName);
    pElem.addEventListener('click', e => showToday(e));

    sideList.appendChild(pElem);
}

function showToday(event) {
    let today = event.target.textContent;
    if (today !== 'Today') {
        return;
    }

    let todoItems = JSON.parse(localStorage.getItem('todoList'));
    let todayTodos = todoItems.filter(x => new Date(x.dueDate).toDateString() === new Date().toDateString());

    createTodoItems(todayTodos);
}