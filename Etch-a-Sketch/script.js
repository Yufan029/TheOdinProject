let inputNumber = document.querySelector('#number');
let canvasNumber = 16;
let clear = document.querySelector('#clear');
let container = document.querySelector('.container');
let randomColorCheckbox = document.querySelector('#randomColorCheckbox');
let colorPicker = document.querySelector('#colorPicker');
let checkboxDiv = document.querySelector('.checkboxDiv');

const decreaseRate = 0.1;
const canvasWidth = 960;

colorPicker.value = "#e2e2e2";
clear.addEventListener('click', drawCanvas);

inputNumber.addEventListener('click', () => {
    while (true) {
        let number = prompt('Please input the number to draw the canvas, max 100');
        if (number === null) {
            break;
        }

        if (isNaN(number) || number < 1 || number > 100) {
            alert('Must input a number between 1 to 100.');
            continue;
        }

        canvasNumber = number;
        drawCanvas();
        break;
    }
});

document.body.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'escape') {
        drawCanvas();
    }
});

function drawCanvas() {
    removeAllChildren(container);

    let dimensionText = document.createTextNode(`${canvasNumber} X ${canvasNumber}`);
    let dimension = document.querySelector('.dimension');
    removeAllChildren(dimension);
    dimension.appendChild(dimensionText);

    for (let i = 0; i < canvasNumber * canvasNumber; i++) {
        let div = document.createElement('div');
        div.className = 'grid';
    
        div.style.width = `${canvasWidth/canvasNumber}px`;
        div.style.height = div.style.width;
        div.style.opacity = "1";

        div.addEventListener('mouseover', e => {
            if (randomColorCheckbox.checked) {
                e.target.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
            }
            else {
                let originOpacity = Number(e.target.style.opacity);
                let opacity = originOpacity-decreaseRate < 0 ? 0 : originOpacity-decreaseRate;

                e.target.style.backgroundColor = colorPicker.value;
                e.target.style.opacity = opacity.toString();
            }
        });
        
        container.appendChild(div);
    }
}

function randomColor() {
    return Math.floor(Math.random() * 256);
}

function removeAllChildren (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

drawCanvas();