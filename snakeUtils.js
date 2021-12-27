const GRID_SIZE = 21;

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

const growSnake = () => {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
}

const getNewFoodPosition = () => {
    let randomFoodPosition = randomGridPosition();
    while (onSnake(randomFoodPosition)) {
        randomFoodPosition = randomGridPosition();
    }
    return randomFoodPosition;
} 

const randomGridPosition = () => {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    };
}