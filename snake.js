const SNAKE_SPEED = 10;
const snakeBody = [
    { x: 11, y: 11 },
    { x: 10, y: 11 },
    { x: 9, y: 11 }
]
let newSegments = 0;

updateSnake = () => {

    addSegments();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { x: snakeBody[i].x, y: snakeBody[i].y }
    }

    snakeBody[0].y += inputDirection.y
    snakeBody[0].x += inputDirection.x

    console.log(snakeBody[0])
}

drawSnake = (gameBoard) => {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = -segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

expandSnake = (amount) => {
    newSegments += amount;
}

onSnake = (position) => {
    console.log(snakeBody)
    return snakeBody.some(segment => {
        return equalPositions(segment, position)
    })
}

equalPositions = (pos1, pos2) => {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

addSegments = () => {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ x: snakeBody[snakeBody.length - 1].x, y: snakeBody[snakeBody.length - 1].y })
    }
    newSegments = 0
}