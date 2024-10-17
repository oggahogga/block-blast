const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let blocks = [];
let dragIndex = -1;
let dragging = false;
let offsetX, offsetY;

// Create a block object
function Block(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.isDragging = false;

    this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
}

// Create initial blocks
blocks.push(new Block(100, 100, 100, 100, "#FF0000"));
blocks.push(new Block(300, 100, 100, 100, "#00FF00"));
blocks.push(new Block(500, 100, 100, 100, "#0000FF"));

// Function to detect if the mouse is inside a block
function mouseInBlock(block, x, y) {
    return (x > block.x && x < block.x + block.width && y > block.y && y < block.y + block.height);
}

// Mouse event handlers
canvas.onmousedown = function(e) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    // Check if we clicked on a block
    for (let i = 0; i < blocks.length; i++) {
        if (mouseInBlock(blocks[i], mouseX, mouseY)) {
            dragging = true;
            dragIndex = i;
            offsetX = mouseX - blocks[i].x;
            offsetY = mouseY - blocks[i].y;
            blocks[i].isDragging = true;
            break;
        }
    }
};

canvas.onmousemove = function(e) {
    if (dragging) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        // Move the block with the mouse
        const block = blocks[dragIndex];
        block.x = mouseX - offsetX;
        block.y = mouseY - offsetY;

        draw();
    }
};

canvas.onmouseup = function() {
    dragging = false;
    if (dragIndex !== -1) {
        blocks[dragIndex].isDragging = false;
    }
};

// Draw all blocks
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    blocks.forEach(block => {
        block.draw();
    });
}

draw();
