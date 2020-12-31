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

    const snakeDirection = getInputDirection();
    snakeBody[0].x += snakeDirection.x;
    snakeBody[0].y += snakeDirection.y;
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

const onSnake = (position) => {
    for (let i = 0; i < snakeBody.length; i++) {
        if (equalPositions(position, snakeBody[i])) {
            return true;
        }
    }
    return false;
}

const equalPositions = (pos1, pos2) => {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

const expandSnake = (amount) => {
    for (let i = 0; i < amount; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }
}

const snakeOutOfBounds = () => {
    return outOfBounds(snakeBody[0]);
}

const snakeIntersectSelf = () => {
    for (let i = 1; i < snakeBody.length; i++) {
        if (equalPositions(snakeBody[0], snakeBody[i])) {
            return true;
        }
    }
    return false;
}