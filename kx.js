const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = getRandomFood();
let direction = "ArrowRight";
let score = 0;

function getRandomFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };
}

function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function moveSnake() {
    const head = { ...snake[0] };

    if (direction === "ArrowUp") head.y -= boxSize;
    if (direction === "ArrowDown") head.y += boxSize;
    if (direction === "ArrowLeft") head.x -= boxSize;
    if (direction === "ArrowRight") head.x += boxSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = getRandomFood();
        score++;
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    // Collision avec les murs
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Collision avec soi-même
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function updateGame() {
    if (checkCollision()) {
        alert(`Game Over! Score: ${score}`);
        snake = [{ x: 200, y: 200 }];
        food = getRandomFood();
        direction = "ArrowRight";
        score = 0;
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    moveSnake();
    drawSnake();

    setTimeout(updateGame, 200);
}

document.addEventListener("keydown", (e) => {
    const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (validKeys.includes(e.key)) {
        if (
            (e.key === "ArrowUp" && direction !== "ArrowDown") ||
            (e.key === "ArrowDown" && direction !== "ArrowUp") ||
            (e.key === "ArrowLeft" && direction !== "ArrowRight") ||
            (e.key === "ArrowRight" && direction !== "ArrowLeft")
        ) {
            direction = e.key;
        }
    }
});

// Contrôles tactiles
document.querySelectorAll(".control-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
        const newDirection = e.target.getAttribute("data-direction");
        if (
            (newDirection === "ArrowUp" && direction !== "ArrowDown") ||
            (newDirection === "ArrowDown" && direction !== "ArrowUp") ||
            (newDirection === "ArrowLeft" && direction !== "ArrowRight") ||
            (newDirection === "ArrowRight" && direction !== "ArrowLeft")
        ) {
            direction = newDirection;
        }
    });
});

// Démarrer le jeu
updateGame();
