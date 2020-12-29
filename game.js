let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

const main = (currentTime) => {
    if (gameOver) {
        const score = snakeBody.length;
        if (confirm(`Game over. Your score was ${score}. Play again?`)) {
            window.location = window.location;
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
        return;
    }

    lastRenderTime = currentTime;
    update();
    draw();
}

window.requestAnimationFrame(main);

const update = () => {
    updateSnake();
    updateFood();
    checkGameOver();
}

const draw = () => {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

const checkGameOver = () => {
    gameOver = snakeOutOfBounds() || snakeIntersectSelf();
}