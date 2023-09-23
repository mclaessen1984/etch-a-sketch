const canvas = document.querySelector('.canvas');
const defaultCanvasSize = 16;

let currentCanvasSize = defaultCanvasSize;

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetCanvas);

resetCanvas();

function resetCanvas() {
    canvas.innerHTML = "";

    drawCanvas(currentCanvasSize);
}

function drawCanvas(size) {
    const numberOfSquares = size * size;

    for (let i=0; i < numberOfSquares; i++) {
        /* TODO: add logic to create square */    
    }
}