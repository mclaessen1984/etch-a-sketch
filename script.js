const COLORS = {
    red: getStylesheetVariable('red'),
    green: getStylesheetVariable('green'),
    blue: getStylesheetVariable('blue'),
    black: getStylesheetVariable('black'),
    white: getStylesheetVariable('white'),
    grey: getStylesheetVariable('grey')
}

const DRAWING_MODES = ['mouseover', 'click'];
const COLOR_MODES = ['color_picker', 'random', 'gradient'];

const DEFAULT_COLOR = COLORS['grey'];
const GRADIENT_START_COLOR = 'rgb(255,255,255)';
const CANVAS_WIDTH_HEIGHT = 800;
const DEFAULT_CANVAS_SIZE = 16;

const canvas = document.querySelector('.canvas');

let currentCanvasSize = DEFAULT_CANVAS_SIZE;
let selectedColor = DEFAULT_COLOR;
let colorMode = COLOR_MODES[0];
let drawingMode = DRAWING_MODES[0];

setUpButtons();
resetCanvas();

function setUpButtons() {
    const keyListeners = document.addEventListener('keydown', (e) => {
        handleKeyPress(e.key);
    });

    const drawingModeButton = document.querySelector('#drawing-mode');
    drawingModeButton.addEventListener('click', setDrawingMode);

    const sizeButton = document.querySelector('#canvas-size');
    sizeButton.addEventListener('click', setCanvasSize);

    const colorButtons = document.querySelectorAll('.color-button');
    colorButtons.forEach((button) => {
        button.addEventListener('click', setSelectedColor);

        let span = button.lastElementChild;

        if (span.className.indexOf('rainbow-wheel') === -1 && span.className.indexOf('bw-gradient') === -1)
        span.style.backgroundColor = COLORS[button.id];
            //span.style.backgroundColor = COLORS[button.textContent.toLowerCase()];
    });

    const resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', resetCanvas);
}

function resetCanvas() {
    //selectedColor = DEFAULT_COLOR;
    colorMode = COLOR_MODES[0];
    canvas.innerHTML = "";

    drawCanvas(currentCanvasSize);
    setSquareListeners();
    setInfo();
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

function colorSquare(element) {
    const square = element.target;
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

function setSelectedColor(element) {
    const color = element.target.id;
    //const color = element.target.textContent.toLowerCase();

    setSelectedButton(element);

    if (color != COLOR_MODES[1] && color != COLOR_MODES[2]) {
        colorMode = COLOR_MODES[0];
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

function setSquareListeners() {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((gridSquare) => {
        gridSquare.addEventListener(drawingMode, colorSquare);
    });
}

function removeSquareListeners() {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((gridSquare) => {
        gridSquare.removeEventListener(drawingMode, colorSquare);
    });
}

function setDrawingMode() {
    removeSquareListeners();

    if (drawingMode == DRAWING_MODES[0]) {
        drawingMode = DRAWING_MODES[1];
    } else {
        drawingMode = DRAWING_MODES[0];
    }

    setSquareListeners();
    setInfo();
}

function setInfo() {
    const gridSizeElement = document.querySelector('#grid-size-info');
    gridSizeElement.textContent = `Grid size: ${currentCanvasSize} x ${currentCanvasSize}`;

    const drawingModeElement = document.querySelector('#drawing-mode-info');
    drawingModeElement.textContent = `Drawing mode: ${capitalizeFirst(drawingMode)}`;
}

function capitalizeFirst(string) {
    return string[0].toUpperCase() + string.substring(1).toLowerCase();
}

function setSelectedButton(element) {
    const buttonElements = document.querySelectorAll('.color-button');
    buttonElements.forEach((buttonElement) => {
        buttonElement.classList.remove('selected');
    });

    element.target.classList.toggle('selected');
}

function handleKeyPress(key) {
    if (key.toUpperCase() == "M") {
        setDrawingMode();
    }
}