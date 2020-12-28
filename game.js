let lastRenderTime = 0;

const gameBoard = document.getElementById('game-board')
main = (currentTime) => {
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    console.log('Render');
    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

update = () => {
    updateSnake();
}

draw = () => {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard);
}