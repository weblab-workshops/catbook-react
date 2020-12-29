let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board");

const main = (currentTime) => {
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
}

const draw = () => {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
}
