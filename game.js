const SNAKE_SPEED = 5;

const main = () => {
    update();
    draw();
}

setInterval(main, 1000/SNAKE_SPEED);

const update = () => {
    console.log("Updating")
}

const draw = () => {
}
