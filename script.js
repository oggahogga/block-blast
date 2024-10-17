const grid = document.getElementById('grid');
const nextBlocks = document.getElementById('nextBlocks');
const restartButton = document.getElementById('restartButton');

const gridSize = 10; // 10x10 grid
let gridMatrix = [];

// Initialize the grid
function createGrid() {
    grid.innerHTML = ''; // Clear existing grid
    for (let i = 0; i < gridSize; i++) {
        gridMatrix[i] = [];
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            gridMatrix[i][j] = 0; // Empty cell
            grid.appendChild(cell);
        }
    }
}

// Generate random block shapes
function generateBlock() {
    const block = document.createElement('div');
    block.classList.add('block');
    block.innerText = 'Block'; // Add text so you can see the blocks
    block.addEventListener('click', () => placeBlock(block));
    nextBlocks.appendChild(block);
}

// Place block on grid (simplified logic)
function placeBlock(block) {
    // Randomly place on the first available empty space in the grid
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (gridMatrix[i][j] === 0) {
                const cellIndex = i * gridSize + j;
                grid.children[cellIndex].style.backgroundColor = '#0095DD'; // Show block placement
                gridMatrix[i][j] = 1; // Mark the cell as filled
                nextBlocks.removeChild(block);
                checkLineClear();
                generateBlock(); // Generate new block after placing one
                return;
            }
        }
    }
}

// Check if a line or column is filled
function checkLineClear() {
    for (let i = 0; i < gridSize; i++) {
        if (gridMatrix[i].every(cell => cell === 1)) {
            clearRow(i);
        }
    }
}

// Clear a filled row
function clearRow(rowIndex) {
    for (let i = 0; i < gridSize; i++) {
        gridMatrix[rowIndex][i] = 0; // Reset row in matrix
        const cellIndex = rowIndex * gridSize + i;
        grid.children[cellIndex].style.backgroundColor = '#555'; // Reset cell color
    }
}

// Restart the game
restartButton.addEventListener('click', () => {
    grid.innerHTML = '';
    nextBlocks.innerHTML = '';
    gridMatrix = [];
    createGrid();
    generateBlock();
});

// Initialize game
createGrid();
generateBlock();
