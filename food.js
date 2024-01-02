let food = { x: 4, y: 16 };

const updateFood = () => {
  if (onSnake(food)) {
    growSnake();
    food = getNewFoodPosition();
  }
};

// Don't change me!
const drawFood = (gameBoard) => {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
};
