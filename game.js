const SNAKE_SPEED = 5;

const gameBoard = document.getElementById('game-board');
let gameOver = false;

const main = () => {
  update();
  draw();
  if (gameOver) {
    alert('Game Over');
    clearInterval(gameLoop);
  }
};

let gameLoop = setInterval(main, 1000 / SNAKE_SPEED);

const update = () => {
  console.log('Updating');
  updateSnake();
  updateFood();
  gameOver = isGameOver();
};

const draw = () => {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

const isGameOver = () => {
  return snakeOutOfBounds() || snakeIntersectSelf();
};
