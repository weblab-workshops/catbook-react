const SNAKE_SPEED = 5;

const gameBoard = document.getElementById('game-board');

const main = () => {
  update();
  draw();
  // TODO: Add Game Over Alert
};

setInterval(main, 1000 / SNAKE_SPEED);

const update = () => {
  console.log('Updating');
  updateSnake();
  updateFood();
  // TODO: Update Game State
};

const draw = () => {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

// TODO: Create a function that checks if the game is over
