// TODO: Create the food and a function to update the food

// Don't change me!
const drawFood = (gameBoard) => {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
};
