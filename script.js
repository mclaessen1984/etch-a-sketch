const CANVASSIZE = 800;

const canvas = document.querySelector('.canvas');
const DEFAULTSIZE = 16;

let currentCanvasSize = DEFAULTSIZE;

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetCanvas);

resetCanvas();

function resetCanvas() {
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
        square.style = `width: ${Math.floor(CANVASSIZE / size)}px; height: ${Math.floor(CANVASSIZE / size)}px;`;

        canvas.appendChild(square);
    }
}

function colorSquare(square) {
    // square.classList = '';
    // square.classList = `grid-square ${getSquareColor()}`;
    square.style.backgroundColor = `${getSquareColor()}`;
}

function getSquareColor() {
    return 'black';
}