const SNAKE_SPEED = 5;
const snakeBody = [
    { x: 11, y: 11 },
    { x: 11, y: 10 },
    { x: 11, y: 9 }
];

const updateSnake = () => {
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    snakeBody[0].x += 0;
    snakeBody[0].y += 1;
}

const drawSnake = () => {
    for (let i = 0; i < snakeBody.length; i++) {
        const segment = snakeBody[i];
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    }
}