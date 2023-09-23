const COLORS = {
    red: getStylesheetVariable('red'),
    green: getStylesheetVariable('green'),
    blue: getStylesheetVariable('blue'),
    black: getStylesheetVariable('black'),
    white: getStylesheetVariable('white'),
    grey: getStylesheetVariable('grey')
}

const COLOR_MODES = ['color_picker', 'random', 'gradient'];

const DEFAULT_COLOR = COLORS['grey'];
const GRADIENT_START_COLOR = 'rgb(255,255,255)';
const CANVAS_WIDTH_HEIGHT = 800;
const DEFAULT_CANVAS_SIZE = 16;

const canvas = document.querySelector('.canvas');

let currentCanvasSize = DEFAULT_CANVAS_SIZE;
let selectedColor = DEFAULT_COLOR;
let colorMode = COLOR_MODES[0];

setUpButtons();
resetCanvas();

function setUpButtons() {
    const sizeButton = document.querySelector('#canvas-size');
    sizeButton.addEventListener('click', setCanvasSize);

    const colorButtons = document.querySelectorAll('.color-button');
    colorButtons.forEach((button) => {
        button.addEventListener('click', e => {
            let buttonName = e.target.textContent.toLowerCase();
            setSelectedColor(buttonName);
        });

        let span = button.lastElementChild;

        if (span.className.indexOf('rainbow-wheel') === -1 && span.className.indexOf('bw-gradient') === -1)
            span.style.backgroundColor = COLORS[button.textContent.toLowerCase()];
    });

    const resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', resetCanvas);
}

function resetCanvas() {
    selectedColor = DEFAULT_COLOR;
    colorMode = COLOR_MODES[0];
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
    square.style.backgroundColor = `${getSquareColor(square.style.backgroundColor)}`;
}

function getSquareColor(currentSquareColor) {
    if (colorMode == COLOR_MODES[2]) {
        return getGradientColor(currentSquareColor);
    } else if (colorMode == COLOR_MODES[1]) {
        return getRandomColor();
    }

    return selectedColor;
}

function getStylesheetVariable(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`);
}

function setSelectedColor(color) {
    if (color != COLOR_MODES[1] && color != COLOR_MODES[2]) {
        selectedColor = COLORS[color];
    } else {
        colorMode = color;
        selectedColor = colorMode == COLOR_MODES[2] ? GRADIENT_START_COLOR : getRandomColor();
    }
}

function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r},${g},${b})`;
}

function getGradientColor(currentColor) {
    let colorValues = currentColor.substring(4, currentColor.length - 1).split(',');
    console.log(colorValues);

    if (colorValues == "") {
        return GRADIENT_START_COLOR;
    } else if (colorValues[0] / 1 == colorValues[1] / 1 && colorValues[1] / 1 == colorValues[2] / 1) {
        let val = colorValues[0];
        val -= Math.floor(255 / 10);

        // When shade is hard to distinguish from black, change to black
        if (val < 12)
            val = 0;

        return `rgb(${val},${val},${val})`;
    }

    return GRADIENT_START_COLOR;
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