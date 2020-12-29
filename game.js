let lastRenderTime = 0;
let gameOver = false;
let gameBoard = document.getElementById("game-board");

const main = (currentTime) => {
    window.requestAnimationFrame(main);
    let secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
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
}