const gameBoard = document.getElementById("game-board");

const main = () => {
    update();
    draw();
}

setInterval(main, 1000/SNAKE_SPEED);

const update = () => {
    console.log("Updating");
    updateSnake();
}

const draw = () => {
    gameBoard.innerHTML = "";
    drawSnake();
}
