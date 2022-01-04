const SNAKE_SPEED = 5;
const snakeBody = [
    {x:11, y:11},
    {x:11, y:10},
    {x:11, y:9}
];

const updateSnake = () => {
    // remove tail segment
    snakeBody.pop();

    // add new head segment
    const newHead = {...snakeBody[0]};
    const snakeDirection = getInputDirection();
    
    newHead.x += snakeDirection.x;
    newHead.y += snakeDirection.y;

    snakeBody.unshift(newHead);

}

// Don't change this function!
const drawSnake = (gameBoard) => {
    for (let i = 0; i < snakeBody.length; i++) {
        const segment = snakeBody[i];
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    }
}
