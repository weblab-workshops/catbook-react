const SNAKE_SPEED = 5;

const gameBoard = document.getElementById('game-board');

const main = () => {
  update();
  draw();
  // TODO 5.3, 5.4: Add Game Over Alert, and clear interval!
};

// TODO 5.4: Define the interval ID
// HINT: ONLY EDIT THE LINE BELOW!
setInterval(main, 1000 / SNAKE_SPEED);

const update = () => {
  console.log('Updating');
  updateSnake();
  updateFood();
  // TODO 5.2: Update Game State
};

const draw = () => {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

// TODO 5.1: Create a function that checks if the game is over
