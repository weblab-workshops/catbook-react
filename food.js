let food = { x: 10, y: 1 };
const EXPANSION_RATE = 1;

updateFood = () => {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        console.log("eate")
        food = getRandomFoodPosition()
    }
}

drawFood = (gameBoard) => {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

getRandomFoodPosition = () => {
    let newFoodPosition = null;
    while (newFoodPosition === null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}