import emptyCircleIcon from '../images/circle.png';
import cardDeleteIcon from '../images/clear.png';
import checkedCirleIcon from '../images/circle_checked.png';
import createProjects from './createProjects';

export { createTodoItems };

function createTodoItems(todos) {
    let todoItemsDiv = document.querySelector('.todo-items');
    todoItemsDiv.textContent = "";

    for (let todo of todos) {
        createItem(todo, todoItemsDiv);
    }
}

function createItem(todo, todoItemsDiv) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    let emptyCircleImage = new Image();
    emptyCircleImage.src = emptyCircleIcon;
    emptyCircleImage.classList.add('card-circle-unchecked');
    emptyCircleImage.addEventListener('click', e => toggleCircle(e, '.card-circle-checked'));

    let checkedCircleImage = new Image();
    checkedCircleImage.src = checkedCirleIcon;
    checkedCircleImage.classList.add('card-circle-checked');
    checkedCircleImage.addEventListener('click', e => toggleCircle(e, '.card-circle-unchecked'));
    
    if (todo.checked) {
        emptyCircleImage.style.display = 'none';
        checkedCircleImage.style.display = 'block';        
    } else {
        checkedCircleImage.style.display = 'none';
        emptyCircleImage.style.display = 'block';
    }

    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    let cardTitleP = document.createElement('p');
    cardTitleP.classList.add('card-title');
    cardTitleP.textContent = todo.title;

    let cardDueDateP = document.createElement('p');
    cardDueDateP.classList.add('card-duedate');
    cardDueDateP.textContent = new Date(todo.dueDate).toLocaleString();

    let cardProjectP = document.createElement('p');
    cardProjectP.classList.add('card-project');
    cardProjectP.textContent = todo.project;

    let cardDeleteImage = new Image();
    cardDeleteImage.src = cardDeleteIcon;
    cardDeleteImage.classList.add('card-delete');
    cardDeleteImage.addEventListener('click', e => deleteTodoItem(e))

    cardDiv.append(cardTitleP);
    cardDiv.append(cardDueDateP);
    cardDiv.append(cardProjectP);
    cardDiv.append(cardDeleteImage);

    itemDiv.append(emptyCircleImage);
    itemDiv.append(checkedCircleImage);
    itemDiv.append(cardDiv);

    addPriorityColor(cardDiv, todo.priority);
    todoItemsDiv.append(itemDiv);
}

function addPriorityColor(itemDiv, priority) {
    switch(priority){
        case 0:
            itemDiv.classList.add('high-priority');
            break;
        case 1:
            itemDiv.classList.add('medium-priority');
            break;
        case 2:
            itemDiv.classList.add('low-priority');
            break;
    }
}

function toggleCircle(event, className) {
    let image = event.target;
    image.style.display = 'none';
    let divItem = image.parentNode;
    divItem.querySelector(className).style.display = 'block';
    divItem.classList.toggle('item-checked');
}

function deleteTodoItem(event) {
    let divItem = event.target.parentNode.parentNode;
    updateLocalStorage(divItem);
    divItem.remove();
}

function updateLocalStorage(divItem) {
    let dueDate = divItem.querySelector('.card-duedate');
    let dueDateUtc = new Date(dueDate.textContent).toUTCString();

    const todoList = localStorage.getItem('todoList');
    const todos = JSON.parse(todoList);

    let removeItemIndex = todos.findIndex(x => new Date(x.dueDate).toUTCString() == dueDateUtc);
    if (removeItemIndex != -1) {
        todos.splice(removeItemIndex, 1);
    }

    localStorage.setItem('todoList', JSON.stringify(todos));
    createProjects();
}


