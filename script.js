const COLORS = {
    red: getStylesheetVariable('red'),
    green: getStylesheetVariable('green'),
    blue: getStylesheetVariable('blue'),
    black: 'black',
    white: 'white',
    default: 'grey'
}

const DEFAULT_COLOR = COLORS['default'];

const CANVAS_WIDTH_HEIGHT = 800;

const canvas = document.querySelector('.canvas');
const DEFAULT_CANVAS_SIZE = 16;

let currentCanvasSize = DEFAULT_CANVAS_SIZE;
let selectedColor = DEFAULT_COLOR;

const sizeButton = document.querySelector('#canvas-size');
sizeButton.addEventListener('click', setCanvasSize);

const colorButtons = document.querySelectorAll('.color-button');
colorButtons.forEach((button) => {
    button.addEventListener('click', e => {
        setSelectedColor(e.target.textContent.toLowerCase());
    });

    button.lastElementChild.style.backgroundColor = COLORS[button.textContent.toLowerCase()];
});

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetCanvas);

resetCanvas();

function resetCanvas() {
    selectedColor = DEFAULT_COLOR;
    canvas.innerHTML = "";

    drawCanvas(currentCanvasSize);

    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((gridSquare) => {
        gridSquare.addEventListener('mouseover', e => {
            colorSquare(e.target)
        });
    });
}

function drawCanvas(size) {
    const numberOfSquares = size * size;

    for (let i = 0; i < numberOfSquares; i++) {
        const square = document.createElement('div');
        square.classList = 'grid-square';
        square.style.width = `${Math.floor(CANVAS_WIDTH_HEIGHT / size)}px`;
        square.style.height = `${Math.floor(CANVAS_WIDTH_HEIGHT / size)}px`;
        square.style.backgroundColor = 'white';

        canvas.appendChild(square);
    }
}

function colorSquare(square) {
    square.style.backgroundColor = `${getSquareColor()}`;
}

function getSquareColor() {
    return selectedColor;
}

function getStylesheetVariable(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`);
}

function setSelectedColor(color) {
    selectedColor = COLORS[color]
    console.log(selectedColor);
}

function setCanvasSize() {
    let validSize = false;
    let answer = "";

    while (!validSize) {
        answer = prompt(`Current canvas size is ${currentCanvasSize}x${currentCanvasSize}.` +
            `\nEnter a size or leave blank to leave at ${currentCanvasSize}x${currentCanvasSize}`);
        validSize = (answer >= 10 && answer <= 100);
    }
    currentCanvasSize = answer;
    resetCanvas();
}