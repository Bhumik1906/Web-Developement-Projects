const board = document.querySelector('.board');

const blockWidth = 45;
const blockHeight = 45;
let intervalID = null;
let timerInterval = null;

const columns = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * columns)}

const blocks = [];
const snake = [{
    x: 1, y: 3
}]

let direction = 'down';
let lastDirection = 'down';
let score = 0;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let startTime = Date.now();

const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const timeDisplay = document.getElementById('time');

scoreDisplay.textContent = score;
highScoreDisplay.textContent = highScore;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

function render() {
    // Clear all fills and food
    Object.values(blocks).forEach(block => {
        block.classList.remove("fill", "food");
    });

    // Render snake
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    });

    // Render food
    blocks[`${food.x}-${food.y}`].classList.add("food");
}

function generateFood() {
    food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * columns)};
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}-${seconds.toString().padStart(2, '0')}`;
}

function gameOver() {
    clearInterval(intervalID);
    clearInterval(timerInterval);
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = highScore;
    }
    alert(`Game Over! Your score: ${score}`);
    // Reset game
    snake.length = 0;
    snake.push({x: 1, y: 3});
    direction = 'down';
    lastDirection = 'down';
    score = 0;
    scoreDisplay.textContent = score;
    startTime = Date.now();
    render();
    intervalID = setInterval(gameLoop, 370);
    timerInterval = setInterval(updateTimer, 1000);
}

function gameLoop() {
    let head = null;

    if (direction === "left") {
        head = {x: snake[0].x, y: snake[0].y - 1};
    } else if (direction === "right") {
        head = {x: snake[0].x, y: snake[0].y + 1};
    } else if (direction === "up") {
        head = {x: snake[0].x - 1, y: snake[0].y};
    } else if (direction === "down") {
        head = {x: snake[0].x + 1, y: snake[0].y};
    }

    // Check collision with walls
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= columns) {
        gameOver();
        return;
    }

    // Check collision with self
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    render();
}

render(); // Initial render

intervalID = setInterval(gameLoop, 370);
timerInterval = setInterval(updateTimer, 1000);

addEventListener("keydown", (event) => {
    let newDirection = direction;
    if (event.key === 'ArrowUp' && lastDirection !== 'down') {
        newDirection = "up";
    } else if (event.key === 'ArrowDown' && lastDirection !== 'up') {
        newDirection = "down";
    } else if (event.key === 'ArrowRight' && lastDirection !== 'left') {
        newDirection = "right";
    } else if (event.key === 'ArrowLeft' && lastDirection !== 'right') {
        newDirection = "left";
    }
    if (newDirection !== direction) {
        direction = newDirection;
        lastDirection = direction;
    }
});
