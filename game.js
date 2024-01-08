const SNAKE_SPEED = 5;

const gameBoard = document.getElementById('game-board');
let isGameOver = false;

const main = () => {
  update();
  draw();
  if (isGameOver) {
    alert('Game Over');
    clearInterval(gameLoop);
  }
};

let gameLoop = setInterval(main, 1000 / SNAKE_SPEED);

const update = () => {
  console.log('Updating');
  updateSnake();
  updateFood();
  isGameOver = checkGameOver();
};

const draw = () => {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

const checkGameOver = () => {
  return snakeOutOfBounds() || snakeIntersectSelf();
};

const resetGame = () => {
  // Make sure the game loop is not still running
  clearInterval(gameLoop);

  // Reset the snake's position and direction
  resetSnake();
  resetDirection();

  // Restart the interval
  gameLoop = setInterval(main, 1000 / SNAKE_SPEED);
};
